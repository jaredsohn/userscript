// ==UserScript==
// @name       Scroll to up and down
// @namespace  none
// @version    0.1.1
// @description  It's easy to scroll to up and down.
// @match      *
// @copyright  2012+, yhben
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==
$(document).ready(function() {$("body").append("<div class='runtop'onclick='window.scrollTo(0,0);'style='position:fixed;color:#000;width:100px;opacity: 0.5;height:auto;bottom:20px;right:50%;font-size:40px;'>▲</div><div class='rundown'onclick='window.scrollTo(0,9999999);'style='position:fixed;height:auto;color:#000;bottom:20px;right:50%;opacity: 0.5;font-size:40px;'>▼</div>")});