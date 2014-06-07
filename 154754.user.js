// ==UserScript==
// @name         千軍萬馬免驗證碼
// @namespace    http://jixun.org/
// @version      0.1
// @description  jqwm No Varify Code
// @include      *://*.qjwm.com/download_*.html
// @include      *://qjwm.com/download_*.html
// @copyright    2012+, Jixun
// ==/UserScript==

try { (function () {
    var d = document;
    function removeElement (elementNode) { try { elementNode.parentNode.removeChild (elementNode); } catch (e) { /* Do nothing */ } }
    d.getElementById('downtc').innerHTML = unsafeWindow.downurl;
    removeElement(d.getElementById('my_yzm'));
    removeElement(d.getElementById('inputyzm'));
    var m = d.querySelectorAll ('a[href$="money.html"]');
    for(i in m) { removeElement (m [i].parentNode); }
}) (); } catch (e) { /* Do nothing */ }