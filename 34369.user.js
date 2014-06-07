// ==UserScript==
// @name         RegExp Testing Script (replace method)
// @namespace    http://userscripts.org/users/23652
// @description  Test regular expressions on this with the replace method
// @include      *
// @exclude      about:*
// @exclude      chrome:*
// @copyright    JoeSimmons
// ==/UserScript==

var string = "Mary had a little lamb"; // string on which to use the regexp and put on the page
var rE = /lamb/; // Reg Expression
var rP = "pig"; // Replacement of the Reg Expression


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DON'T EDIT /////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
GM_addStyle("body {margin:5em !important;}");
// Change the title
document.title='Regular Expression Test Page';
// Erase the head tag to erase other stlyes and scripts
document.body.previousSibling.innerHTML='';
// Make the current page a testing page
document.body.innerHTML="\n<center>\nThe regular expression before processing...\n<br>\n<pre style=\"border:1px solid #000;\" id=\"before\"></pre>\n<br>\n<br>\nThe regular expression after processing...\n<br>\n<pre style=\"border:1px solid #000;\" id=\"after\"></pre>\n</center>\n";
document.getElementById('before').innerHTML = string;
document.getElementById('after').innerHTML = string.replace(rE,rP);
alert((rE.test(string)) ? "Match" : "No match");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////