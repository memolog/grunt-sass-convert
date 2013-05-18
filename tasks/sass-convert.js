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

    var files = this.files[0];
    grunt.util.async.forEachSeries(files.src, function (src, next) {
      var args = [];
      grunt.util._.forOwn(options, function (value, key) {
        args.push('--' + key, value);
      });
      var out = src;
      args.push(src);

      if (files.dest) {
        out = files.dest + '/' + src.replace(/\.(css|scss|sass)/, '.' + options.to);
      }
      var sass = grunt.util.spawn({
        cmd: 'sass-convert',
        args: args
      }, function (error, result, code) {
        if (!error) {
          if (result) {
            grunt.file.write(out, result);
          } else {
            grunt.warn('got no result from ' + src);
          }
        } else {
          grunt.warn(error);
        }
        next(error);
      });
    }, cb);
  });
};