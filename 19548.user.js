// ==UserScript==
// @name            Redirect Seesmic
// @author          Thomas Knoll
// @namespace       http://dydimustk.com/userscripts/
// @description     Automatically redirects standalone Seesmic videos to the logged in version
// @include         http://www.seesmic.com/Standalone*
// @version         0.1
// ==UserScript==

window.location.replace(window.location.href.replace(/.*video=(.+)/, "http://www.seesmic.com/Seesmic.html?#/video/$1/watch"));
