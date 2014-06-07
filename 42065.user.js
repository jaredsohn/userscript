// ==UserScript==
// @name Word Lookup
// @description Allows the user to find a definition of selected text by pressing "d".
// @namespace Abyssal_Tools
// @include *
// ==/UserScript==

window.DT_checkKeys = function(e) 
{
var key;
key = e.which;
if(key == 100){
if(window.getSelection() != '' &&
confirm("Do you want to look up the word(s) \""+window.getSelection()+"?\""))
{var newWin = window.open('http://dictionary.reference.com/browse/'+window.getSelection(),'_blank','width=600,height=350,scrollbars=yes');
if(!newWin){alert("Failed.  Please check your popup blocker settings.");}
}
}
}

unsafeWindow.document.onkeypress = DT_checkKeys;