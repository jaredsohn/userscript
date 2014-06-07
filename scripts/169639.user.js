// ==UserScript==
// @name       30s goodbye
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  remove 30s to enable modern browser to visit the site
// @match      http://210.35.72.21:8888/edu/student/login.do
// @require    http://code.jquery.com/jquery-1.10.0.min.js
// @copyright  2012+, You
// ==/UserScript==
$("document").ready(function(){
$("input").removeAttr("disabled");
});