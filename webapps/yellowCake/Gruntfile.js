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
            commons : '../commons/src/app'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.app %>/*.js', '<%= config.app %>/assets/**/*.js', '<%= config.app %>/components/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            less: {
                files: ['<%= config.app %>/assets/styles/{,*/}*.less', '<%= config.app %>/components/{,*/}*.less'],
                tasks: ['less']
            },
            templates :{
                files: ['<%= config.app %>/index.html', '<%= config.app %>/assets/directives/*.html', '<%= config.app %>/components/**/*.html'],
                tasks: ['ngtemplates']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: []
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.tmp %>',
                        '<%= config.lib %>',
                        '<%= config.commons %>',
                        '<%= config.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            server: '<%= config.tmp %>',
            test: ['<%= config.tmp %>', '<%= config.app %>/**/templates.js'],
            dist: ['<%= config.tmp %>', '<%= config.dist %>']
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

        less: {
            development: {
                options: {
                    paths: ['<%= config.app %>/assets/styles']
                },
                files: {
                    '<%= config.tmp %>/assets/styles/yellowCake.css':'<%= config.app %>/assets/styles/yellowCake.less'
                }
            },
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/assets/styles/',
                    src: '*.css',
                    dest: '<%= config.tmp %>/assets/styles/'
                }]
            }
        },

        htmlmin: {
            options:    {
                collapseBooleanAttributes:      true,
                collapseWhitespace:             true,
                removeAttributeQuotes:          true,
                removeComments:                 true, // Only if you don't use comment directives!
                removeEmptyAttributes:          true,
                removeRedundantAttributes:      true,
                removeScriptTypeAttributes:     true,
                removeStyleLinkTypeAttributes:  true
            },

            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '**/*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: '**/*.{gif,jpg,png}',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: '**/*.svg',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        ngtemplates: {
            options: {
                htmlmin:  '<%= htmlmin.options %>',
            },
            compiledTemplates: {
                options :{
                    standalone : true
                },
                cwd: '<%= config.app %>',
                src: ['**/*.html'],
                dest: '<%= config.tmp %>/templates.js',
            },
            commonsTemplates: {
                options:{
                    module : 'compiledTemplates'
                },
                cwd: '<%= config.commons %>',
                src: ['**/*.html'],
                dest: '<%= config.tmp %>/zcommons-templates.js',
            }
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
                        '<%= config.test %>/assets/**/*.js',
                        '<%= config.commons %>/**/*.js',
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

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'assets/data/{,*/}*.json',
                        '*.html',
                    ]
                }]
            },
            config: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.config %>',
                    dest: '<%= config.tmp %>',
                    src:[
                        '*.js',
                    ]
                }]
            },
            scripts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.tmp %>',
                    src:[
                        '**/*.js',
                    ]
                }]
            },
            lib: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.lib %>',
                    dest: '<%= config.tmp %>',
                    src:[
                        '**/*.js',
                    ]
                }]
            },
            commons: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.commons %>',
                    dest: '<%= config.tmp %>',
                    src:[
                        '**/*.js',
                    ]
                }]
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/*.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/**/*.css']
        },
        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/yellowCake.min.js',
                        '<%= config.dist %>/assets/yellowCake.min.css'
                    ]
                }
            }
        },


    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run([ 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'less',
            'copy:config',
            'ngtemplates:compiledTemplates',
            'ngtemplates:commonsTemplates',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        grunt.task.run([
            'clean:test',
            'jshint',
            'less',
            'ngtemplates:compiledTemplates',
            'ngtemplates:commonsTemplates',
            'jasmine',
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'clean:test',
        'jshint',
        'ngtemplates:compiledTemplates',
        'ngtemplates:commonsTemplates',
        'jasmine',
        'less',
        'useminPrepare',
        'copy:config',
        'copy:scripts',
        'copy:lib',
        'copy:commons',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'imagemin',
        'svgmin',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin:dist'
    ]);


    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
