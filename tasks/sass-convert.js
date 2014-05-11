/*
 * grunt-sass-convert
 * https://github.com/memolog/grunt-sass-convert
 *
 * Copyright (c) 2013 Yutaka Yamaguchi
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  'use strict';

  grunt.registerMultiTask('sass-convert', 'just execute sass-convert', function () {
    var cb = this.async();

    var options = this.options({
      from: 'scss',
      to: 'scss'
    });

    grunt.util.async.forEachSeries(this.files, function (file, nextfile) {
      grunt.util.async.forEachSeries(file.src, function (src, next) {
        var args = [];
        grunt.util._.forOwn(options, function (value, key) {
          args.push('--' + key, value);
        });
        var cwd = file.cwd ? file.cwd : '.';

        var input = cwd + '/' + src;
        args.push(input);

        var prefix = file.filePrefix || '';
        var dest = file.dest ? file.dest : './';

        dest = /\/$/.test(dest) ? dest : dest + '/';

        var filename, srcPath;
        var split = src.split(/\//);

        if (split.length === 1) {
          filename = split[0];
          srcPath = '';
        } else {
          var len = split.length;
          filename = split[len - 1];
          srcPath = split.slice(0, len - 1).join('/') + '/';
        }

        if (srcPath) {
          grunt.file.mkdir(dest + srcPath);
        }

        var out = dest + srcPath + prefix + filename.replace(/\.(css|scss|sass)/, '.' + options.to);
        args.push(out);

        grunt.verbose.writeln('\nexecute the following command:');
        grunt.verbose.writeln('sass-convert ' + args.join(' ') + '\n');
        var sass = grunt.util.spawn({
          cmd: 'sass-convert',
          args: args
        }, function (error, result, code) {
          if (error) {
            grunt.warn(error);
          }
          next(error);
        });
      }, nextfile);
    }, cb);
  });
};
