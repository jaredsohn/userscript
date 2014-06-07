// ==UserScript==
// @id             edX code color
// @name           edX code color
// @version        1.2
// @namespace
// @author         stranac <stranac@hotmail.com>
// @description    Adds code highlighting to edX forum for 6.00.1x
// @include        https://courses.edx.org/courses/MITx/6.00.1x/3T2013/discussion/forum*
// @run-at         document-end
// @require        https://google-code-prettify.googlecode.com/svn/loader/prettify.js
// @resource       PrettifyCSS https://raw.github.com/stranac/misc/master/github.css
// @updateURL      https://userscripts.org/scripts/source/180295.user.js
// @grant          GM_addStyle
// @grant          GM_getResourceText
// ==/UserScript==


function prettify() {
	var preElements = document.getElementsByTagName('pre');
	for (var i=0; i<preElements.length; i++) {
		preElements[i].className = 'prettyprint lang-py';
	}
	prettyPrint();
}

GM_addStyle(GM_getResourceText('PrettifyCSS'));


var prettifyButton = document.createElement('button');
prettifyButton.innerHTML = 'Prettify';
prettifyButton.style = 'position: fixed; bottom: 20px; right: 20px';
prettifyButton.onclick = prettify;
document.body.appendChild(prettifyButton);
