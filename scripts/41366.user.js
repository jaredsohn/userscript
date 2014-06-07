// ==UserScript==
// @name           Digg - Disable "People Who Dugg This Also Dugg"
// @namespace      http://www.koonkii.com
// @description    Removes the beta "People Who Dugg This Also Dugg" box above the comments.
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==

var box = document.getElementById('PRCP');

if (box) {
	box.parentNode.removeChild(box);
}