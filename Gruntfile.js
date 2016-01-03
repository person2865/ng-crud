module.exports = function(grunt) {
    grunt.initConfig({

        connect: {

            app: {
                port: 8282,
                base: './app/'
            }

        }
    });
    
    grunt.loadNpmTasks('grunt-connect');
    
    grunt.registerTask('serve', ['connect:app']);
};
