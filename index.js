/**
 *
 * (c) 2013-2014 Wishtack
 *
 * $Id: $
 */

/**
 *
 * (c) 2013-2014 Wishtack
 *
 * $Id: $
 */

var dejavu = require('dejavu');
var NamedParameters = require('named-parameters').NamedParameters;

var ProtractorUtils = dejavu.Class.declare({

    /* Platform settings. */
    platform: {

        browserstack: {
            capabilities: {
                acceptSslCerts: true,
                'browserstack.debug': true
            },
            seleniumAddress: 'http://hub.browserstack.com/wd/hub'
        },

        local: {
            params: {
                windowHeight: 768,
                windowWidth: 1024
            }
        }

    },

    /* OS settings. */
    os: {

        osx: {capabilities: {os: 'OS X', os_version: 'Yosemite'}},
        windows: {
            capabilities: {os: 'WINDOWS', os_version: '8.1'},
            params: {dumpLogs: false}
        }

    },

    /* Browser settings. */
    browser: {

        android: {capabilities: {browserName: 'android'}},
        chrome: {capabilities: {browserName: 'chrome'}},
        firefox: {capabilities: {browserName: 'firefox'}},
        iPad: {capabilities: {browserName: 'iPad'}},
        iPhone: {capabilities: {browserName: 'iPhone'}},
        internetExplorer: {capabilities: {browserName: 'internet explorer'}},
        safari: {capabilities: {browserName: 'safari'}}

    },

    mergeConfig: function mergeConfig(args) {

        var args = new NamedParameters(args)
            .require('configList')
            .values();

        var configList = args.configList;

        var extend = require('node.extend');
        var config = {};

        configList.forEach(function (configPartial) {

            if (configPartial != null) {
                config = extend(true /* Deep. */, config, configPartial);
            }

        });

        return config;

    }

});

module.exports = new ProtractorUtils();
