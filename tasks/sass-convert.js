/*
 * grunt-sass-convert
 * https://github.com/memolog/grunt-sass-convert
 *
 * Copyright (c) 2013 Yutaka Yamaguchi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sass-convert', 'just execute sass-convert', function() {
    var exec = require('child_process').exec;
    var cb = this.async();

    var options = this.options({
      from: 'scss',
      to: 'scss',
      indent: 2
    });


    var files = this.files[0];
    grunt.util.async.forEachSeries(files.src, function(src, next) {
      var args = [
        '--from', options['from'],
        '--to', options['to'],
        '--indent', options['indent']];
      var out = src;
      args.push(src);
      if (files.dest) {
        out = files.dest + '/' + src.replace(/\.(css|scss|sass)/, '.' + options['to']);
      }
      var sass = grunt.util.spawn({
        cmd: 'sass-convert',
        args: args
      }, function(error, result, code) {
        if (result) {
          grunt.file.write(out, result);
        } else {
          grunt.warn('got no result from '+src);
        }
        next(error);
      });
    }, cb);
  });

};
