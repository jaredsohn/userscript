// ==UserScript==
// @id             99cef8e1-ad3b-4b35-9578-3a4159651594
// @name           GGRM
// @description    Enhance Google Reader Mobile: Clicking image at the top left corner will bring you to front page without reloading the page, Clicking navigation title will redirect to desktop version.
// @author         Yus Uf <cakyus@gmail.com>
// @version        0.1
// @license        http://www.gnu.org/licenses/gpl-3.0.txt
// @include        http://www.google.com/reader/i/*
// @updateURL      https://raw.github.com/cakyus/userscripts/master/ggrm.meta.js
// @run-at         document-end
// ==/UserScript==

document.getElementsByClassName('logo')[0].href = '#sub-tree/0';
document.getElementById('nav-title').style.cursor = 'pointer';
document.getElementById('nav-title').addEventListener('click', function() {
	if (document.getElementById('nav-title').textContent.length > 0){
		location.href = location.href.replace('/i/', '/view/') ;
	}
}, false);
