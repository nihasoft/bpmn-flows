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
    basePath: './src',
    files: [
      {
        pattern: './assets/**', watched: true, included: false, nocache: false, served: true
      },{ 
        pattern: './lib/bpmn-flows.variables.scss', watched: true,  included: true, served: true
      }, {
        pattern: './lib/bpmn-flows.component.scss', watched: true,  included: true, served: true
      }
    ],    
    preprocessors: {
      './lib/bpmn-flows.variables.scss': ['scss'],
      './lib/bpmn-flows.component.scss': ['scss']
    },
    proxies: {
      '/assets/': '/base/assets/'
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
