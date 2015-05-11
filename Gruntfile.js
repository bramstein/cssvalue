module.exports = function (grunt) {
  var extend = require('extend');
      compilerOptions = {
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        warning_level: 'VERBOSE',
        summary_detail_level: 3,
        language_in: 'ECMASCRIPT5_STRICT',
        use_types_for_optimization: true
      };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    jshint: {
      all: ['src/**/*.js'],
      options: {
        // ... better written as dot notation
        "-W069": true,

        // type definitions
        "-W030": true,

        // Don't make functions within loops
        "-W083": true,

        // Wrap the /regexp/ literal in parens to disambiguate the slash operator
        "-W092": true
      }
    },
    closurecompiler: {
      compile: {
        files: {
          "build/cssvalue.js": ['src/**/*.js', 'exports.js'],
        },
        options: extend({}, compilerOptions)
      },
      debug: {
        files: {
          "build/cssvalue.debug.js": ['src/**/*.js', 'exports.js'],
        },
        options: extend({}, compilerOptions, {
          debug: true,
          formatting: ['PRETTY_PRINT', 'PRINT_INPUT_DELIMITER']
        })
      }
    }
  });

  grunt.loadNpmTasks('grunt-closurecompiler');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('compile', ['closurecompiler:compile']);
  grunt.registerTask('debug', ['closurecompiler:debug']);
  grunt.registerTask('default', ['compile']);
};
