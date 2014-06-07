// ==UserScript==
// @name PirateBay Search
// @description Allows the user to search PirateBay based on selected text by pressing "p".
// @namespace Nzo_Dev
// @include *
// ==/UserScript==

window.DT_checkKeys = function(e) 
{
var key;
key = e.which;

if(key == 112){
if(window.getSelection() != '')
{var newWin = window.open('http://thepiratebay.se/search/'+window.getSelection()+'/0/99/0','_new','');

if(!newWin){alert("Failed.  Please check your popup blocker settings.");}
}
}

if(key == 101){
if(window.getSelection() != '')
{var newWin = window.open('http://www.ebay.com/sch/i.html?_nkw='+window.getSelection()+'&_sacat=0&_from=R40','_new','');

if(!newWin){alert("Failed.  Please check your popup blocker settings.");}
}
}

if(key == 121){
if(window.getSelection() != '')
{var newWin = window.open('http://www.youtube.com/results?search_query='+window.getSelection(),'_new','');

if(!newWin){alert("Failed.  Please check your popup blocker settings.");}
}
}

if(key == 103){
if(window.getSelection() != '')
{var newWin = window.open('http://www.google.com/#hl=en&safe=off&output=search&sclient=psy-ab&q='+window.getSelection

()+'&oq=hal&as_qdr=all','_new','');

if(!newWin){alert("Failed.  Please check your popup blocker settings.");}
}
}


}

unsafeWindow.document.onkeypress = DT_checkKeys;