module.exports = function(grunt) {

    grunt.initConfig({

        // uglify: {
        //     options: {
        //         mangle: false
        //     },

        //     my_target: {
        //         files: {
        //             'assets/js/main.js': ['assets/_js/scripts.js']
        //         }
        //     }
        // }, // uglify


        webfont: {
            icons: {
                src: 'assets/img/icon/*.svg',
                dest: 'assets/fonts',
                destCss: 'assets/_sass',
                options: {
                    engine: 'node',
                    font: 'senseicon',
                    hashes: false,
                    htmlDemo: true,
                    ligature: false,
                    stylesheet: 'scss',
                    template: 'assets/css/senseicon.css',
                    templateOptions: {
                        classPrefix: 'senseicon-',
                        baseClass: 'senseicon'
                    }
                }
            }
        },



        sass: {
            dist: {
                options: { style: 'compressed' },
                files: {
                    'assets/css/main.css': 'assets/_sass/main.scss'
                }
            }
        }, // sass


        connect: {
            server: {
                options: {
                    port: 9000
                }
            }
        },

        watch: {
            dist: {
                files: [
                    // 'assets/_js/**/*',
                    'assets/_sass/**/*'
                ],

                // tasks: ['uglify', 'sass']
                tasks: ['sass']
            }
        } // watch



    });


    // Plugins do Grunt
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-webfont');


    // Tarefas que serão executadas
    grunt.registerTask('default', ['uglify', 'sass']);
    grunt.registerTask('f', ['webfont']);
    grunt.registerTask('w', ['watch']);
    grunt.registerTask('s', ['connect', 'watch']);

};
