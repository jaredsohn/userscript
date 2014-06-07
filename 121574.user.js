// ==UserScript==
// @name           Ikariam Redirect
// @author         gaLB
// @description    Redirect Ikariam Session Expire Page To Login Page
// @include        http://*.ikariam.com/*undefined
// @version        1.0  
// ==/UserScript==

setTimeout (function() {
    window.location.replace ("http://il.ikariam.com"); 
    },
    10000 //-- 10 seconds
);
