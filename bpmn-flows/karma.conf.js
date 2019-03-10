// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-scss-preprocessor')
    ],
    basePath: '.',
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
    proxies: {
      '/assets/': '/base/src/assets/',
      '/node_modules/': '/base/node_modules/'
    },
    client: {
      clearContext: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      'ChromeNoSandbox'
    ],
    customLaunchers: {
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};
