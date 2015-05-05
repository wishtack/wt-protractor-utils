# wt-protractor-utils

## What's that for?

A simple module to help you generate your protractor and browserstack cross-browser testing configuration.

This should be combined with [wt-protractor-runner](https://github.com/wishtack/wt-protractor-runner).

This module will help you replace the following configuration:

```javascript
 var protractorRunner = require('wt-protractor-runner');
 var specPattern = __dirname + '/test/e2e/*.js';
 
 gulp.task('test-e2e', protractorRunner({
     configList: [
         /* Chrome. */
         {
             capabilites: {
                 browser: 'chrome'
             },
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
              seleniumAddress: 'http://hub.browserstack.com/wd/hub'
              specs: specPattern
         }
     ]
 }));
```

with something more readable like this.

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
                     protractorUtils.os.osx,
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
                     protractorUtils.os.windows,
                     protractorUtils.browser.internetExplorer
                 ]
            }),
         }
     ]
 }));
```
