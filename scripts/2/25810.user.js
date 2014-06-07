// ==UserScript==
// @name           DeScape FSTDT
// @namespace      metascape
// @description    Fixes FSTDT escaping issues
// @include        http://fstdt.com/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML
	.replace(/\\n/g,'<br>')
	.replace(/\\"/g,'&quot;');