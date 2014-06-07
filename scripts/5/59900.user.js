// ==UserScript==
// @name           Don't save Webmin password
// @namespace      www.lionroo.dyndns.org
// ==/UserScript==

var passwordElements = document.getElementsByClassName('ui_password');

for(i=0;i<passwordElements.length;i++) {
	var j = passwordElements[i];
	j.setAttribute('autocomplete','off');
}
