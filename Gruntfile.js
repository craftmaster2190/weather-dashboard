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
                ]
            }
        },

        injector: {
            app: {
                options: {
                    ignorePath: '<%= app %>'
                },
                files: {
                    '<%= app %>/index.html': ['<%= app %>/script/**/*.js', '<%= app %>/style/**/*.css'],
                }
            }
        },

        connect: {
            app: {
                options: {
                    port: 9100,
                    base: '<%= app %>/',
                    open: true,
                    livereload: true,
                    hostname: '127.0.0.1'
                }
            }
        },

        watch: {
            sass: {
                files: '<%= app %>/style/**/*.scss',
                tasks: ['sass', 'postcss']
            },
            js: {
            	files: '<%= app %>/script/**/*.js',
                tasks: ['injector']
            }, 
            livereload: {
                files: ['<%= app %>/**/*.html', '<%= app %>/script/**/*.js', '<%= app %>/style/**/*.css', '<%= app %>/image/**/*.{jpg,gif,svg,jpeg,png}'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'sass', 'postcss', 'wiredep', 'injector']);
    grunt.registerTask('dev', ['default', 'connect', 'watch']);
};
