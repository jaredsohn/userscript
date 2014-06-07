// ==UserScript==
// @match http://code.google.com/p/chromium/issues/entry
// @name Autofill [Version number] on crbug.com i.e. code.google.com/p/chromium/issues/entry
// @description Tested 2010-05-14 for the Translation template
// @version        1.1
// ==/UserScript==

/*
As a bookmarklet (depending on browser, you might need to replace ' ' with '%20'):

javascript:var ver=navigator.appVersion.match(/Chrome\/[0-9.]+/)[0], d=document.forms[document.forms.length-1].elements['comment'], v=d.value, txt=v.replace(/(\[Language\])/,'$1\n'+navigator.language).replace(/(\[Version number\])/,'$1\n'+ver).replace(/(\[OS details\])/,'$1\nVista 32bit').replace(/Chrome Version : /,'$1'+ver); if(v==txt)alert('No change'); else if(confirm('Confirm replacing comment field with the following: '+ txt)) void(d.value=txt);
*/

try {

var d = document.forms[document.forms.length-1].elements['comment'];  //Any error here and we just bomb out to the catch below

var v = d.value;
var ver = navigator.appVersion.match(/Chrome\/[0-9.]+/)[0];

var txt = v.replace(/(\[Language\])/,'$1\n'+navigator.language);
txt=txt.replace(/(\[Version number\])/,'$1\n'+ver);
txt=txt.replace(/(\[OS details\])/,'$1\nVista 32bit');
txt=txt.replace(/Chrome Version : /,'$1'+ver);

if (v!=txt && confirm('Confirm replacing comment field with the following: '+ txt)) d.value=txt;

}
catch (e) {
  /*sorry, didnt work. Can a userscript give a ballon/mole/infobar just once per day? Anything else would be too disturbing. */
}