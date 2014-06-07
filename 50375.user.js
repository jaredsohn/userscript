// ==UserScript==
// @name           Userscripts.org View Version Source on Versions page
// @namespace      http://userscripts.org/users/23652
// @description    Adds a link to view a version's source beside the install link
// @include        http://userscripts.org/scripts/versions/*
// @include        https://userscripts.org/scripts/versions/*
// @copyright      JoeSimmons
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var installs = document.evaluate("//a[contains(@href,'/scripts/version/') and .='install']",document,null,6,null);
for(var i=installs.snapshotLength-1; (item=installs.snapshotItem(i)); i--) {
var source = window.document.createElement('a');
	source.textContent = 'source';
	source.setAttribute('href', item.href+'?format=txt');
item.parentNode.insertBefore(source, item.nextSibling);
item.parentNode.insertBefore(window.document.createTextNode(' | '), item.nextSibling);
}