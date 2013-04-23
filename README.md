# grunt-sass-convert

> run sass-convert with grunt. My own purpose is to format scss files with sass-convert, but you can use sass-convert for your own purpose of course.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sass-convert --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass-convert');
```

## The "sass-convert" task
This plugin requires [sass-convert](http://sass-lang.com/docs/yardoc/) installed. If you have alredy installed [Sass](http://sass-lang.com/), you might have already installed sass-convert also.

### Overview
In your project's Gruntfile, add a section named `sass-convert` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sass-convert: {
    options: {
      // command line options here
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

`sass-convert --help` to see the other options 

#### options.from
Type: `String`
Default value: `'scss'`

The format to convert to. Can be scss or sass.

#### options.to
Type: `String`
Default value: `'scss'`

The format to convert from. Can be css, scss, sass.

#### options.indent
Type: `Number`
Default value: `2`

How many spaces to use for each level of indentation.

### Usage Examples

#### Default Options

formatted scss files ('''caution: override your scss files''')

```js
grunt.initConfig({
  sass-convert: {
    files: {
      src: ['path/**/*.scss']
    }
  },
})
```

#### Custom Options

if you want to save formatted files to the another location, use dest property.

```js
grunt.initConfig({
  sass-convert: {
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
