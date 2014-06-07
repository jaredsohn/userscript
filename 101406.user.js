// ==UserScript==
// @name           Addictive over type
// @namespace      xpsdeset
// @include        *
// @description   Its easy and may be addictive. Keep your mouse over any text area or textbox and start typing immediately. Avoid the extra click. 
// ==/UserScript==
var textareas = document.getElementsByTagName('textarea');
for(var i = 0; i < textareas.length; i++) {
  textareas[i].addEventListener('mouseover', function(e) {  this.focus();        }, true);

}


input = document.getElementsByTagName('input');
for(var i = 0; i < input.length; i++) {
if(this.type=='text')
input[i].addEventListener('mouseover', function(e) {  this.focus();        }, true);

}

document.body.addEventListener("DOMSubtreeModified", 
function ()
{
var textareas = document.getElementsByTagName('textarea');
for(var i = 0; i < textareas.length; i++) {
textareas[i].addEventListener('mouseover', function(e) {this.focus();}, true);
}


input = document.getElementsByTagName('input');
for(var i = 0; i < input.length; i++) {
if(input[i].type=='text')
input[i].addEventListener('mouseover', function(e) { this.focus();},true);
}


}, false);
