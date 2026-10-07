'use strict';

const assert = require('assert');
const register = require('../tasks/sass-convert');

// Run the task without installing Grunt or invoking sass-convert.
async function runTask(files, options = {}, spawnError) {
  let task;
  let active = false;
  const calls = [];
  const directories = [];
  const warnings = [];
  register({
    registerMultiTask(name, description, handler) {
      assert.strictEqual(name, 'sass-convert');
      task = handler;
    },
    util: {
      async: {
        forEachSeries(items, iterate, done) {
          let index = 0;
          function next(error) {
            if (error || index === items.length) return done(error);
            iterate(items[index++], next);
          }
          next();
        }
      },
      _: {
        forOwn(object, iterate) {
          Object.keys(object).forEach(key => iterate(object[key], key));
        }
      },
      spawn(command, callback) {
        assert.strictEqual(active, false, 'conversions must run sequentially');
        active = true;
        calls.push(command);
        setImmediate(() => {
          active = false;
          callback(spawnError, {}, spawnError ? 1 : 0);
        });
      }
    },
    file: { mkdir(directory) { directories.push(directory); } },
    verbose: { writeln() {} },
    warn(error) { warnings.push(error); }
  });
  assert.strictEqual(typeof task, 'function');
  const error = await new Promise(resolve => {
    task.call({
      files,
      options(defaults) { return Object.assign({}, defaults, options); },
      async() { return resolve; }
    });
  });
  return { calls, directories, warnings, error };
}

async function main() {
  let result = await runTask([{ src: ['first.scss', 'second.scss'] }]);
  assert.deepStrictEqual(result.calls, ['first.scss', 'second.scss'].map(name => ({
    cmd: 'sass-convert', args: ['--from', 'scss', '--to', 'scss', './' + name, './' + name]
  })));
  assert.strictEqual(result.error, undefined);
  assert.deepStrictEqual(result.warnings, []);

  result = await runTask([
    { cwd: 'input', src: ['nested/style.css'], dest: 'output', filePrefix: '_' }
  ], { from: 'css', to: 'sass', indent: 2 });
  assert.deepStrictEqual(result.calls, [{
    cmd: 'sass-convert',
    args: ['--from', 'css', '--to', 'sass', '--indent', 2,
      'input/nested/style.css', 'output/nested/_style.sass']
  }]);
  assert.deepStrictEqual(result.directories, ['output/nested/']);
  assert.strictEqual(result.error, undefined);

  result = await runTask([]);
  assert.deepStrictEqual(result.calls, []);
  assert.strictEqual(result.error, undefined);

  const failure = new Error('conversion failed');
  result = await runTask([{ src: ['first.scss', 'second.scss'] }], {}, failure);
  assert.strictEqual(result.calls.length, 1, 'stop after a failed conversion');
  assert.strictEqual(result.error, failure);
  assert.deepStrictEqual(result.warnings, [failure]);
  console.log('sass-convert: all tests passed');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
