// Generated on 2014-03-14 using generator-webapp 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: {
            // Configurable paths
            app: 'src/app',
            dist:'dist',
            test: 'src/tests',
            tmp : '.tmp',
            config : 'config',
            lib : '../lib',
        },

        // Empties folders to start fresh
        clean: {
            test: ['<%= config.tmp %>', '<%= config.app %>/**/templates.js'],
        },

        ngtemplates:    {
            options:    {
                htmlmin:  {
                    collapseBooleanAttributes:      true,
                    collapseWhitespace:             true,
                    removeAttributeQuotes:          true,
                    removeComments:                 true, // Only if you don't use comment directives!
                    removeEmptyAttributes:          true,
                    removeRedundantAttributes:      true,
                    removeScriptTypeAttributes:     true,
                    removeStyleLinkTypeAttributes:  true
                },
                standalone : true
            },
            compiledTemplates: {
                cwd: '<%= config.app %>',
                src: '**/*.html',
                dest: '<%= config.tmp %>/templates.js',
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/components/**/*.js',
                '<%= config.app %>/assets/**/*.js',
                '<%= config.app %>/*.js',
                '<%= config.test %>/**/*.specs.js',
            ]
        },

        jasmine: {
            taskName: {
                src: [
                    '<%= config.app %>/*.js',
                    '<%= config.app %>/**/*.js',
                    '<%= config.tmp %>/*.js',
                ],
                options: {
                    specs: '<%= config.test %>/**/*.specs.js',
                    vendor: [
                        '<%= config.lib %>/jquery-2.1.1.js',
                        '<%= config.lib %>/jquery-ui-1.11.2/jquery-ui.js',
                        '<%= config.lib %>/jquery.cookie.js',
                        '<%= config.lib %>/angular-1.3.6/angular.js',
                        '<%= config.lib %>/angular-1.3.6/angular-mocks.js',
                        '<%= config.lib %>/angular-1.3.6/angular-cookies.js',
                        '<%= config.lib %>/angular-1.3.6/angular-resource.js',
                        '<%= config.lib %>/angular-1.3.6/angular-sanitize.js',
                        '<%= config.lib %>/angular-1.3.6/angular-route.js',
                        '<%= config.lib %>/angular-1.3.6/angular-animate.js',
                        '<%= config.lib %>/moment/moment.js',
                        '<%= config.lib %>/moment/locales/pt-br.js',

/*

                        '<%= config.lib %>/jquery-ui-1.11.0/jquery-ui.min.js',
                        '<%= config.lib %>/bootstrap/3.1.1/dist/js/bootstrap.min.js',
                        '<%= config.lib %>/angular-file-upload-html5-shim.min.js',
                        '<%= config.lib %>/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                        '<%= config.lib %>/jquery.mask.min.js',
                        '<%= config.lib %>/jquery.cookie.js',
                        '<%= config.lib %>/nvd3/d3.v3.js',
                        '<%= config.lib %>/nvd3/nv.d3.min.js',
                        '<%= config.lib %>/jquery.signalR-2.1.1.min.js',
                        '<%= config.lib %>/signalr-hub.min.js',
                        '<%= config.lib %>/angular-local-storage/dist/angular-local-storage.min.js',
                        '<%= config.lib %>/angular-file-upload.min.js'
*/
                    ],
                    helpers: [
                        '<%= config.test %>/config.tests.js',
                    ],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'bin/coverage/coverage.json',
                        report: 'bin/coverage',
                        thresholds: {
                            lines: 90,
                            statements: 90,
                            branches: 90,
                            functions: 90
                        }
                    }
                }
            }
        },
    });

    grunt.registerTask('test', function (target) {
        grunt.task.run([
            'clean:test',
            'ngtemplates',
            'jshint',
            'jasmine',
        ]);
    });

    grunt.registerTask('build', [
        'test',
    ]);


    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
