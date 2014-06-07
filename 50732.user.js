// ==UserScript==
// @name           Craigslist GmailTo
// @namespace      http://userscripts.org/users/23652
// @description    Makes craigslist emails go to Gmail instead of the default mail service
// @include        http://*.craigslist.org/*
// @include        http://craigslist.org/*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

function main() {
var array = window.document.evaluate("//a[starts-with(@href,'mailto:')]",document,null,6,null),
	sub_re = /subject=([^&]*)/,
	attr={to:'',subject:''}, href;
for(var i=array.snapshotLength-1; (item=array.snapshotItem(i)); i--) {
href=item.href;
attr['subject'] = (href.indexOf('subject=')!=-1) ? href.match(sub_re)[1] : '';
attr['to'] = (href.indexOf('@craigslist.org')!=-1) ? href.split('mailto:')[1].split('?')[0] : '';
if(attr['to']!='') {
item.setAttribute('target', '_blank');
item.href = 'https://mail.google.com/?view=cm&fs=1&tf=1&to='+attr['to']+(attr['subject']!=''?'&su='+attr['subject']:'');
}
}
}

main();

window.addEventListener('DOMSubtreeModified', main, false);