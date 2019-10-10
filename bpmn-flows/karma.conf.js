// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('@angular-devkit/build-angular/plugins/karma'),
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage-istanbul-reporter'),
        require('karma-scss-preprocessor')
      ],
      client: {
        clearContext: false
      },
      files: [
        {
            pattern: './src/assets/**', watched: true, included: false, nocache: false, served: true
        },{ 
            pattern: './src/lib/bpmn-flows.variables.scss', watched: true,  included: true, served: true
        }, {
            pattern: './src/lib/bpmn-flows.component.scss', watched: true,  included: true, served: true
        }, {
            pattern: './src/lib/bpmn-flows.spec.scss', watched: true,  included: true, served: true
        }, {
            pattern: './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css', watched: true,  included: true, served: true
        }, {
            pattern: './node_modules/@fortawesome/fontawesome-free/css/solid.css', watched: true,  included: true, served: true
        }, {
            pattern: './node_modules/@fortawesome/fontawesome-free/webfonts/**', watched: false, nocache: false, included: false, served: true
        }
      ],
      preprocessors: {
        './src/lib/bpmn-flows.variables.scss': ['scss'],
        './src/lib/bpmn-flows.component.scss': ['scss'],
        './src/lib/bpmn-flows.spec.scss': ['scss']
      },
      coverageIstanbulReporter: {
          dir: require('path').join(__dirname, '../coverage'),
          reports: ['html', 'lcovonly'],
          fixWebpackSourcePaths: true,
          thresholds: {
              emitWarning: false,
              global: {
                  statements: 20,
                  lines: 20,
                  branches: 10,
                  functions: 20
              }
          }   
      },
      proxies: {
        '/assets/': '/base/src/assets/',
        '/node_modules/': '/base/node_modules/'
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome', 'CustomChromeHeadless'],
      customLaunchers: {
        CustomChromeHeadless: {
          base: 'ChromeHeadless',
          flags: [
            '--no-sandbox'
          ]
        }
      }
    });
  };
  