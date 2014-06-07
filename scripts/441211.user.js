// ==UserScript==
// @name        Improvements on FaceBook Chat!
// @namespace   http://userscripts.org/users/510421
// @description Improvements to the box on facebook chat!

// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @include     http://facebook.com/*
// @include     https://facebook.com/*

// @license     BSD License; http://www.opensource.org/licenses/bsd-license.php
// @version     0.3
// @grant       none
// ==/UserScript==

// Load prerequisites
loadGlobalCSS();

// Functions
function addGlobalStyle(device, css) {
	var elmHead, elmStyle;
	elmHead = document.getElementsByTagName('head')[0];
	elmStyle = document.createElement('style');
	elmStyle.type = 'text/css';
	elmStyle.media = device;
	elmHead.appendChild(elmStyle);
	elmStyle.innerHTML = css;
}

function loadGlobalCSS() {
	addGlobalStyle('screen',
		'div#pagelet_ego_pane { display: none !important; } ' +
		'.fbNubFlyoutFooter > ._552h { padding-bottom: 7px !important; } ' +
		'.fbNubFlyoutFooter > ._552h > .uiTextareaAutogrow { min-height: 35px !important; } '
	);
}
