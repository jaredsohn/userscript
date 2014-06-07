// ==UserScript==
// @name	m0ar spaec 4 blogger!!1!
// @namespace		http://stylebot.me/styles/191
// @description 	Gives you more horizontal space for the Blogger Draft Editor. Customize the height of the compose box to make it fit your screen.
//Oh, and don't worry about the horizontal scrollbar, it has nothing.
// @include 	http://draft.blogger.com/*
// @include 	https://draft.blogger.com/*
// @author		noquierouser
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'iframe.composeBox.editable, div.boxes, textarea.htmlBox { height: 400px !important;}div.editorHolder { width: 100% !important;}';
document.documentElement.appendChild(styleEl);