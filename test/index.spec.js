/**
 *
 * (c) 2013-2014 Wishtack
 *
 * $Id: $
 */

describe('wt-protractor-utils', function testProtractorUtils() {

    it("should merge configurations", function testMergeConfig() {

        var protractorUtils = require('../../wt-protractor-utils');

        expect(protractorUtils.mergeConfig({
            configList: [
                /* Base. */
                {
                    someParam: true
                },
                /* Platform. */
                protractorUtils.platform.browserstack,
                /* OS. */
                protractorUtils.os.osx,
                /* Browser. */
                protractorUtils.browser.chrome,
                /* Overrides. */
                {
                    capabilities: {
                        acceptSslCerts: false
                    }
                }
            ]
        })).toEqual({
            someParam: true,
            capabilities: {
                acceptSslCerts: false,
                'browserstack.debug': true,
                os: 'OS X',
                os_version: 'Yosemite',
                browserName: 'chrome'
            },
            seleniumAddress: 'http://hub.browserstack.com/wd/hub'
        });

    })
    ;

})
;
