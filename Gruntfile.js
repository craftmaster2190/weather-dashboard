module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: 'app',

        jshint: {
            all: [
                'Gruntfile.js',
                '<%= app %>/script/**/*.js'
            ]
        },

        sass: {
            app: {
                options: {
                    outputStyle: 'extended'
                },
                files: {
                    '<%= app %>/style/app.css': '<%= app %>/style/app.scss'
                }
            }
        },


        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    })
                ]
            },
            app: {
                src: '<%= app %>/css/app.css'
            }
        },

        wiredep: {
            app: {
                src: [
                    '<%= app %>/index.html'
                ],
                exclude: ['jquery']
            }
        },

        injector: {
            app: {
                files: {
                    '<%= app %>/index.html': ['<%= app %>/script/**/*.js', '<%= app %>/style/**/*.css'],
                }
            }
        },

        connect: {
            app: {
                options: {
                    base: "<%= app %>",
                    open: true,
                    liereload: true
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            
            sass: {
                files: '<%= app %>/scss/**/*.scss',
                tasks: ['sass', 'postcss']
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'sass', 'postcss', 'wiredep', 'injector']);
    grunt.registerTask('dev', ['default', 'connect', 'watch']);
};