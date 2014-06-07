// ==UserScript==
// @name            Redirect New Seesmic
// @author          Thomas Knoll
// @namespace       http://dydimustk.com/userscripts/
// @description     Automatically redirects standalone Seesmic videos to the logged in version
// @include         http://api.seesmic.com/*
// @version         1.0
// ==/UserScript==

window.location.replace(window.location.href.replace(/.*video/(.+)/, "http://new.seesmic.com/videos/$1"));
