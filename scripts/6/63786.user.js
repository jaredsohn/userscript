// ==UserScript==
// @name          Install Enabler
// @description    Enable the "Install" button for extensions in Google Chrome for Mac
// @include        https://chrome.google.com/*
// @match        https://chrome.google.com/*
// ==/UserScript==

(function() {
	d = document;
	x = d.getElementById('cx-page');
	x.className = x.className.replace(/cx-cannot-install/,'');
	x = d.getElementById('cx-install-link');
	x.setAttribute('href','https://clients2.google.com/service/update2/crx?response=redirect&x='+encodeURIComponent('id=' + (''+location).replace(/.*\//,'') + '&uc'));
	x.removeAttribute('onclick');
})();