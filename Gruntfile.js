module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['dist'],
		htmlmin : {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			dist : {
				files: {
					'dist/index.html' : 'src/index.html'
				}
			}
		},
		browserify: {
			options: {
				transform: [ require('grunt-react').browserify ]
			},
			dist: {
				files: {
					'build/app.js' : ['src/**/*.js', 'src/**/*.jsx']
				}
			}
		},
		uglify: {
			options: {
				
			},
			dist: {
				files: {
					'dist/app.min.js' : ['build/app.js']
				}
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/'
				}]
			}
		},
		sass: {
			dist: {
			  options: {
			  	style: 'compressed',
			  	loadPath: [
			  		'node_modules/'
			  	]
			  },
		      files: {
		        'dist/style.css': ['src/style.scss']
		      }
		    }
		},
		copy: {
			fonts: {
				flatten: true,
				expand: true,
				src: 'node_modules/font-awesome/fonts/*',
				dest: 'dist/lib/fonts/'
			}
		},
		watch: {
			html : {
				files: [
					'src/index.html'
				],
				tasks: ['htmlmin']
			},
			js: {
				files: [
					'src/**/*.js',
					'src/**/*.jsx',
				],
				tasks: ['js']
			},
			image: {
				files: [
					'src/**/*.{jpg,png,gif}'
				],
				tasks: ['imagemin']
			},
			css: {
				files: [
					'src/**/*.scss'
				],
				tasks: ['css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['clean','htmlmin','js','css','imagemin']);
	grunt.registerTask('css', ['sass','copy:fonts']);
	grunt.registerTask('js', ['browserify','uglify']);
}