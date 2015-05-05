# wt-protractor-utils

## What's that for?

A simple module to help you generate your protractor and browserstack cross-browser testing configuration.

This should be combined with [wt-protractor-runner](https://github.com/wishtack/wt-protractor-runner).

This module is an abstraction and factoring tool for protractor configuration and browserstack capacities.
It will help you replace the following configuration:

```javascript
 var protractorRunner = require('wt-protractor-runner');
 var specPattern = __dirname + '/test/e2e/*.js';
 
 gulp.task('test-e2e', protractorRunner({
     configList: [
         /* Chrome. */
         {
             capabilites: {
                  acceptSslCerts: true,
                  browser: 'chrome'
                  'browserstack.debug': true,
                  'browserstack.user': process.env.YOUR_BROWSERSTACK_USER_ENV_VAR,
                  'browserstack.key': process.env.YOUR_BROWSERSTACK_KEY_ENV_VAR,
                  os: 'WINDOWS',
                  os_version: '8.1'
             },
             params: {
                 /* Tells your tests to not use `browser.manage().logs().get('browser')` to read browser logs
                  * as it doesn't seem to work on Windows. */
                 dumpLogs: false
             },
             seleniumAddress: 'http://hub.browserstack.com/wd/hub',
             specs: specPattern
         },
         /* Safari on browserstack. */
         {
              capabilities: {
                  acceptSslCerts: true,
                  browserName: 'safari',
                  'browserstack.debug': true,
                  'browserstack.user': process.env.YOUR_BROWSERSTACK_USER_ENV_VAR,
                  'browserstack.key': process.env.YOUR_BROWSERSTACK_KEY_ENV_VAR,
                  os: 'OS X',
                  os_version: 'Yosemite'
              },
              seleniumAddress: 'http://hub.browserstack.com/wd/hub',
              specs: specPattern
         }
     ]
 }));
```

with something more readable and with less duplication like this.

```javascript
 var protractorRunner = require('wt-protractor-runner');
 var protractorUtils = require('wt-protractor-utils');
 
 var protractorBaseConfig = {
     capabilities: {
         'browserstack.user': process.env.YOUR_BROWSERSTACK_USER_ENV_VAR,
         'browserstack.key': process.env.YOUR_BROWSERSTACK_KEY_ENV_VAR
     },
     specs: __dirname + '/test/e2e/*.js'
 };
 
 gulp.task('test-e2e', protractorRunner({
     configList: [
         /* OS X Chrome. */
         {
             protractorUtils.mergeConfig({
                 configList: [
                     protractorBaseConfig,
                     protractorUtils.platform.browserstack,
                     protractorUtils.os.windows,
                     protractorUtils.browser.chrome
                 ]
            }),
         },
         /* Windows Internet Explorer. */
         {
             protractorUtils.mergeConfig({
                 configList: [
                     protractorBaseConfig,
                     protractorUtils.platform.browserstack,
                     protractorUtils.os.osx,
                     protractorUtils.browser.safari
                 ]
            }),
         }
     ]
 }));
```
