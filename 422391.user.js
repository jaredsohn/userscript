// ==UserScript==
// @name       Hackforums Auto-Tagger
// @version    0.1
// @description This userscript allows you to automatically set the font, size, and color.
// @include      *hackforums.net*
// ==/UserScript==

var font = "Century Gothic"; //Change the variables on line 10, 11, and 12 to your desired font, size, and color.
var size = "0";
var color = "#FFFFFF"; 
var closingTags = "[/font][/size][/color]";

//Full reply box and PM box
try {
if (document.getElementById("message_new").value.length === 0) {
     document.getElementById("message_new").value = "[font=" + font + "]" + "[size=" + size + "]" + "[color=" + color + "]" + "\n" + "\n"+ closingTags
}}
catch(e) {}

//Quick reply box
try {
if (document.getElementById("message").value.length === 0) {
     document.getElementById("message").value = "[font=" + font + "]" + "[size=" + size + "]" + "[color=" + color + "]" + "\n" + "\n"+ closingTags
}}
catch(e) {}