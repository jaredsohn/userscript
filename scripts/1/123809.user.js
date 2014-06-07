// ==UserScript==
// @name           Ikariam Redirect il
// @author         DOCTORLOL
// @description    Redirect Ikariam Session Expire Page To Login Page מפנה מדף  "ההתחברות שלך נגמרה" לדף הכנסת הפרטים
// @include        http://*.ikariam.*/*undefined
// @version        1.2 
// ==/UserScript==

setTimeout (function() {
    window.location.replace ("http://il.ikariam.com"); //
    },
    10000 //-- 10 seconds
);