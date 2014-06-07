// ==UserScript==
// @name           Google Docs Add Strikethrough Button (Jason's minor revision)
// @namespace      none
// @description    Add a strikethrough button to the toolbar of Google Docs word proccessing documents
// @include        *://docs.google.com/doc*
// ==/UserScript==

// Borrowing code from http://userscripts.org/scripts/show/68438


(function() {

document.addEventListener('keydown', function(e){
if(e.which == 113) {
replaceSelection();
return false;
}
}, true);
STinit();
})();

function replaceSelection() {
var t;
try {
t = document.getElementById("wys_frame").contentWindow.getSelection().toString();
if (t == '') { return false;}
var range = document.getElementById("wys_frame").contentWindow.getSelection().getRangeAt(0);
range.deleteContents();
var newNode = document.getElementById("wys_frame").contentWindow.document.createElement("strike");
newNode.appendChild(document.getElementById("wys_frame").contentWindow.document.createTextNode(t));
range.insertNode(newNode);
} 
catch (err) 
{
t = window.getSelection().toString();
if (t == '') { return false; }
var range = window.getSelection().getRangeAt(0);
range.deleteContents();
var newNode = document.createElement("strike");
newNode.appendChild(document.createTextNode(t));
range.insertNode(newNode);
}
}


function STinit() {
var underlnBtn = null;
if(underlnBtn = document.getElementById("+underline"))
{
var strikeBtn = underlnBtn.cloneNode(true);
strikeBtn.setAttribute("title", "Strikethrough (F2)");
strikeBtn.setAttribute("id", "+strikethrough");
strikeBtn.firstChild.firstChild.firstChild.addEventListener('click', replaceSelection, false);
strikeBtn.firstChild.firstChild.firstChild.setAttribute("class","goog-edit-strikeout");
strikeBtn.firstChild.firstChild.lastChild.innerHTML = "Strikethrough";
underlnBtn.parentNode.insertBefore(strikeBtn, document.getElementById("+foreColor"));
}
}