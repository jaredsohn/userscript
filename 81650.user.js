// ==UserScript==
// @name          HTML Signatures for Gmail
// @namespace     http://blogs.zdnet.com/Google/htmlsignature/
// @description   Lets you use HTML signatures in Gmail
// @include       http://mail.google.com/*?view=page&name=htmlcompose*
// @include       https://mail.google.com/*?view=page&name=htmlcompose*
// ==/UserScript==

//edit this variable -- add the HTML for your signature
var htmlsignature = "<br><b>Edit the script to change this signature</b>";

//do not edit below here
top.window.setTimeout("top.window.frames['main'].frames['" + parent.name + "'].document.getElementById('hc_compose').contentWindow.document.getElementsByTagName('body')[0].innerHTML += '" + htmlsignature + "';",1000);