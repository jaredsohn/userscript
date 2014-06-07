// ==UserScript==
// @name       Reliance auto login
// @namespace  http://computechi.wordpress.com/
// @version    0.1
// @description  it will be useful
// @match      http://*/*
// @copyright  2013+, SaravanakumarSR
// ==/UserScript==

var p=window.location.href;
if((p==("http://www.reliancebroadband.co.in/reliance/login.do")))
     document.getElementsByTagName("a")[5].click();

