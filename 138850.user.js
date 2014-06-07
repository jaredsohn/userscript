// ==UserScript==
// @name       Twitter t.co to HTTPS links
// @namespace  https://www.twitter.com
// @version    0.1
// @description  replace t.co http url witth https
// @match      http://t.co*
// @copyright  2012+, Edd
// @require    
// ==/UserScript==

window.location.href = window.location.href.replace("http://", "https://")