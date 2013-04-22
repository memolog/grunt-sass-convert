# grunt-sass-convert

> sass-convert

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass-grunt');
```

## The "sass-grunt" task

### Overview
In your project's Gruntfile, add a section named `sass-grunt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sass-grunt: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  sass-grunt: {
    files: {
      src: ['path/**/*.scss']
    }
  },
})
```

#### Custom Options

```js
grunt.initConfig({
  sass-grunt: {
    options: {
      indent: 4
    },
    files: {
      src: ['path/**/*.scss']
      dest: 'dest'
    },
  },
})
```

## Release History
_(Nothing yet)_
