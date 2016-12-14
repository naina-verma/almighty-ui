exports.config = {
    useAllAngular2AppRoots: true,
    getPageTimeout: 30000,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['src/tests/**/*.spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    maxInstances: 1,

    multiCapabilities: [
          { 'browserName': 'firefox', 
          'firefox.binary': "/usr/bin/firefox ",
          'firefox.cli.args': ['--webdriver-loglevel=ERROR', '--local-storage-path=/tmp/firefox_' + Math.random()] },
        { 'browserName': 'phantomjs',
          'phantomjs.binary.path': require('phantomjs-prebuilt').path,
          'phantomjs.cli.args': ['--webdriver-loglevel=ERROR', '--local-storage-path=/tmp/phantom_' + Math.random()] }
  ]
};