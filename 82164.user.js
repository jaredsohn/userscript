///////////////////////////////////////////////////////////////////////////////
//
// This is a Greasemonkey user script.
//
// Yahoo! TV Listings Auto-setup
// Version 1.3, 2010-08-21
// Coded by Maarten van Egmond.  See namespace URL below for contact info.
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name        Yahoo! TV Listings Auto-setup
// @namespace   http://userscripts.org/users/64961
// @author      Maarten
// @version     1.3
// @description v1.3: automatically sets up tv.yahoo.com listings for your area without needing to log in.
// @include     http://tv.yahoo.com/
// @include     http://tv.yahoo.com/;*
// @include     http://tv.yahoo.com/listings*
// ==/UserScript==
//
///////////////////////////////////////////////////////////////////////////////
//
// For install, uninstall, and known issues, see the namespace link above.
//
///////////////////////////////////////////////////////////////////////////////
//
// This script automatically sets up tv.yahoo.com listings for your area
// without needing to log in.
//
///////////////////////////////////////////////////////////////////////////////

"use strict";

// Satisfy JSLint.
/*global alert, document, GM_getValue, GM_setValue, setTimeout, window */

var tvListings = (function () {
    // Until Chrome supports GM_getValue, use these as defaults.
    // If you use Chrome, you'll have to edit this script to change these.
    var runEvenIfLoggedIn = false,
        autoRedirectFromTvPage = true,
        myZip = 90210,

        myServiceTypeId = 'cable',          // Valid values are cable,
                                            // satellite, ota.

        myServiceProviderId = 'p2238800',   // Find your value by inspecting
                                            // options on the listings setup
                                            // page.


        // Any lower than this could make the script select the next option
        // before it is ready.
        optionSelectDelay = 400;

    // Add support for document.getElementsByClassName, e.g. for FF2.
    function customGetElementsByClassName(elt, tag, name) {
        var result, elts, ii;

        if ("undefined" === typeof elt.getElementsByClassName) {
            result = [];

            if (undefined === tag) { 
                alert('Internal error: must pass tag name!');
            } else {
                elts = elt.getElementsByTagName(tag);
                for (ii = 0; ii < elts.length; ii += 1) {
                    if (elts[ii].className === name) {
                        result.push(elts[ii]);
                    }
                }
            }

            return result;
        } else {
            return elt.getElementsByClassName(name);
        }
    }

    function isTvPage() {
        var url, uu;

        url = window.location.toString();
        uu = url.indexOf(';');
        if (uu > 0) {
            url = url.substring(0, uu);
        }
        return url === 'http://tv.yahoo.com/';
    }

    function isListingsPage() {
        return 0 === window.location.toString().indexOf(
                'http://tv.yahoo.com/listings') &&
                -1 === window.location.toString().indexOf('listings_setup');
    }

    function isSetupPage() {
        return 0 === window.location.toString().indexOf(
                'http://tv.yahoo.com/listings_setup#mygm');
    }

    function isLoggedIn() {
        var elts = customGetElementsByClassName(document, 'li', 'me2');
        if (1 === elts.length) {
            elts = elts[0].getElementsByTagName('a');
            if (1 === elts.length) {
                return -1 !== elts[0].getAttribute('href').indexOf('logout');
            } else {
                alert('Could not find login link.  ' +
                        'Please contact the script\'s author.');
            }
        } else {
            alert('Could not determine user login status.  ' +
                        'Please contact the script\'s author.');
        }
        return false;
    }

    function loadSetupPage() {
        // Use anchor so we can tell if this script did the redirect.
        window.location = 'http://tv.yahoo.com/listings_setup#mygm';
    }

    function gotHereViaGmRedirect() {
        // If the anchor is present, this script did the redirect.
        return -1 !== window.location.toString().indexOf('#mygm');
    }

    function pressDone() {
        var elt = document.getElementById('btn-provdone');
        if (elt) {
            if (!elt.disabled) {
                elt.click();
            } else {
                setTimeout(pressDone, optionSelectDelay);
            }
        } else {
            alert('Could not find done button.  ' +
                    'Please contact the script\'s author.');
        }
    }

    function configureSetup() {
        var elt, elts, ee, found;

        // Don't use timezone.
        elt = document.getElementById('ck-timezone');
        if (elt) {
            if (elt.checked) {
                elt.click();
            }
        } else {
            alert('Could not uncheck timezone option.  ' +
                        'Please contact the script\'s author.');
        }

        // There is a small delay before the next option can be selected.
        // If the script is too fast, it cannot select the next option,
        // so add a delay.
        setTimeout(function () {
            // Enter ZIP code.
            elt = document.getElementById('choose-location');
            if (elt) {
                found = false;
                elts = elt.getElementsByTagName('input');
                for (ee = 0; ee < elts.length; ee += 1) {
                    if ('txt-zip' === elts[ee].name) {
                        // Clear zip to force a refresh of the next options.
                        elts[ee].value = '';
                        found = true;
                        break;
                    }
                }
                if (found) {
                    setTimeout(function () {
                        // Now set the target zip.
                        elts[ee].value = myZip;

                        setTimeout(function () {
                            // Make sure the service type options are enabled.
                            elt = document.getElementById('choose-service');
                            if (elt) {
                                elts = elt.getElementsByTagName('input');
                                for (ee = 0; ee < elts.length; ee += 1) {
                                    elts[ee].removeAttribute('disabled');
                                }

                                // Select service type.
                                elt = document.getElementById(myServiceTypeId);
                                if (elt) {
                                    elt.click();

                                    setTimeout(function () {
                                        // Select service provider.
                                        elt = document.getElementById(
                                                myServiceProviderId);
                                        if (elt) {
                                            elt.click();

                                            setTimeout(function () {
                                                // Done!
                                                pressDone();
                                            }, optionSelectDelay);
                                        } else {
                                            alert('Could not set service ' +
                                                    'provider option.  ' +
                                                    'Please contact the ' +
                                                    'script\'s author.');
                                        }
                                    }, optionSelectDelay);
                                } else {
                                    alert('Could not set service type ' +
                                            'option.  Please contact the ' +
                                            'script\'s author.');
                                }
                            } else {
                                alert('Could not find choose-service ' +
                                        'element.  Please contact the ' +
                                        'script\'s author.');
                            }
                        }, optionSelectDelay);
                    }, optionSelectDelay);
                } else {
                    alert('Could not find txt-zip element.  ' +
                            'Please contact the script\'s author.');
                }
            } else {
                alert('Could not find choose-location element.  ' +
                        'Please contact the script\'s author.');
            }
        }, optionSelectDelay);
    }
                
    function getPref(key, defaultValue) {
        var val = GM_getValue(key);
        if (undefined === val) {
            // Store keys so that users can change it via about:config.
            val = defaultValue;
            GM_setValue(key, val);
        }
        return val;
    }

    function loadPrefs() {
        runEvenIfLoggedIn = getPref('runEvenIfLoggedIn', runEvenIfLoggedIn);
        autoRedirectFromTvPage =
                getPref('autoRedirectFromTvPage', autoRedirectFromTvPage);
        myZip = getPref('myZip', myZip);
        myServiceTypeId = getPref('myServiceTypeId', myServiceTypeId);
        myServiceProviderId =
                getPref('myServiceProviderId', myServiceProviderId);
        optionSelectDelay = getPref('optionSelectDelay', optionSelectDelay);
    }

    function doInit() {
        loadPrefs();

        // Default is to run only if not logged in (as we don't want to
        // override a user's real settings), but this is overridable.
        if (runEvenIfLoggedIn || false === isLoggedIn()) {
            if (isTvPage() && autoRedirectFromTvPage) {
                loadSetupPage();
            } else if (isListingsPage()) {
                // Don't load forever.
                if (0 !== document.referrer.indexOf(
                        'http://tv.yahoo.com/listings_setup')) {
                    loadSetupPage();
                }
            } else if (isSetupPage()) {
                if (gotHereViaGmRedirect()) {
                    configureSetup();
                }
            }
            // Else do nothing.
        }
        // Else do nothing.
    }

    return {
        // Initialize this script.
        init: function () {
            doInit();
        }
    };
}());

tvListings.init();

///////////////////////////////////////////////////////////////////////////////