// ==UserScript==
// @name       Bypass Proxy Cache Redirection
// @namespace  http://www.101logic.co.uk/
// @version    0.1
// @description  Redirects to google cache if Access denied found
// @match      http://*/*
// @copyright  2012+, 101Logic.co.uk
// ==/UserScript==

if (document.title == "Access Denied"){
    //alert("found it");
    document.location.href='http://www.google.com/search?q=cache:'+document.location.href.replace(/http:\/\//,'');
}