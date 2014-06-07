// ==UserScript==
// @name       Coliourshit
// @namespace  Coliourshit
// @version    0.1
// @description  LFColiourshit Coliourshit
// @include      http://leakforums.org*
// @include      http://*.leakforums.org*
// @match      http://leakforums.org*
// @match      http://*.leakforums.org*
// @copyright  2013+, Oscar Sanchez
// @icon http://www.leakforums.org/favicon.ico
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require https://googledrive.com/host/0B3djEhxHeikDNkR6MGM4Q3BLenc/cookie.js
// @run-at document-end
// ==/UserScript==

link = $("#panel a:first");
uid = link.attr("href").match(/[0-9]{0,6}$/);
usr = link.text();
style = $("a[href*='"+uid+"'] span:first").attr("style");
if (getCookie("usernamestyle") == null) { setCookie("usernamestyle", ""); usernamestyle = ""; } else { usernamestyle = getCookie("usernamestyle"); }
if (style == null) { link.attr("style",usernamestyle); }
else { setCookie("usernamestyle", style); link.attr("style",style); }