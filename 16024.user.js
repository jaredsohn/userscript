// ==UserScript==
// @version 1
// @name arunim's pic signature button 4 scrapbook
// @author arunim
// @namespace
// @source http://orkut.com
// @description Signature 4 scrapbook by arunim
// @include http://www.orkut.com/Scrapbook.aspx*
// @include http://www.orkut.com/CommMsg*
// ==/UserScript==

// edit The 2 values of Sign Below for ur Own Signature...

// image link
var ilink="";

// profile or webpage link
var plink="";


// Dont Edit Anything Below this line

var signa="\n"+"*~ ..:: ♪ κεερ §miιiπG : geneous ♪ ::.. ~*";

addEventListener('load', function(event) {
function getTextArea(n) {
return document.getElementsByTagName('textarea')[n];