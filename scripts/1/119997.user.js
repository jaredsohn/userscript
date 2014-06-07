// ==UserScript==
// @name           Ikariam Redirect
// @author         TemhAAhmeT
// @description    Redirect Ikariam Session Expire Page To Login Page
// @include        http://*.ikariam.*/*undefined
// @version        1.2 
// ==/UserScript==

setTimeout (function() {
    window.location.replace ("http://tr.ikariam.com"); //-- Change "tr" to your server.
    },
    10000 //-- 10 seconds
);
