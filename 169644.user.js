// ==UserScript==
// @name       Getchu Agree
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Getchu Agree
// @include http://www.getchu.com/soft.phtml*
// @run-at document-start
// @match  
// @copyright  2012+, GU
// ==/UserScript==
var url = window.location.toString();
if(url.indexOf("&gc=gc") == -1){
    window.location.href = url + "&gc=gc";
}