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
  'sass-convert': {
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

#### formatted scss files
formatted scss files ('''caution: override your scss files''')

```js
grunt.initConfig({
  'sass-convert': {
    files: {
      src: ['foo/**/*.scss']
    },{
      src: ['bar/**/*.scss']    
    }
  }
})
```

#### convert files with cwd option
you can use cwd option in files like that.

```js
grunt.initConfig({
  sass-convert: {
    files: {
      cwd: ['path/to'],
      src: ['*.scss'],
      dest: 'sass/'
    }
  }
})
```

In the above configuration, the task detects scss files in path/to, and then added converted files to the 'sass' directory (when the directories are not found, atutomatically make it)

#### prepend file prefix for the converted files
And supports file prefix

```js
grunt.initConfig({
  sass-convert: {
    files: {
      from: 'css',
      to: 'scss',
      cwd: ['path/to'],
      src: ['*.css'],
      filePrefix: '_',
      dest: 'sass/partials'
    }
  }
})
```

In the above configuration, the task detects scss files in path/to, and then added converted files prepaned prefix '_' to the 'sass' directory (when the directories are not found, atutomatically make it)

```
path/to/foo.css
path/to/bar.css
```

converted

```
sass/partials/_foo.scss
sass/partials/_bar.scss
```

#### Custom Options

if you want to save formatted files to the another location, use dest property.

```js
grunt.initConfig({
  'sass-convert': {
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
* 0.2.0 enable to set file prefix / support multiple file targets
