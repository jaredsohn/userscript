// ==UserScript==
// @name           MSDN Blogs Captcha Remover
// @namespace      #aVg
// @description    Removes the poorly coded (like IE itself) captcha on the ieblog.
// @include        http://blogs.msdn.com/*
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
(function() {
if(!document.cookie.match(/AreYouHuman=(\d+)/)) return;
var a=document.evaluate(".//input[@class='codebox']", document.body, null, 9, null).singleNodeValue;
if(!a) return;
a.value = RegExp.$1;
a = a.parentNode;
a.style.display = "none";
a = a.previousSibling;
a.style.display = "none";
a = a.previousSibling.previousSibling;
a.parentNode.removeChild(a);
})();