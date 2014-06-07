// ==UserScript==
// @name fixHuluLayout
// @namespace Personal
// @description   Fixes the layout of Hulu so that the bottom of the viewer is still above the fold
// @copyright Justin A. Tisi; justintisi@hotmail.com
// @include http://www.hulu.com/watch/*
// ==/UserScript==

var descriptionContent = document.getElementById('description-content');
if ( descriptionContent ) {
	descriptionContent.parentNode.style.minHeight = '0px';
	descriptionContent.style.height = 'auto';
	
	var descriptionContentChildren = descriptionContent.getElementsByTagName('div');
	if (descriptionContentChildren && descriptionContentChildren.length) {
		for (var i = 0, len = descriptionContentChildren.length; i < len; i++) {
			var childEl = descriptionContentChildren[i];
			if (childEl.style.height && childEl.style.height !== 'auto') {
				childEl.style.height = 'auto';
			}
		}
	}
}

var bannerAdContainer = document.getElementById('banner-ad-container');
if ( bannerAdContainer ) {
	bannerAdContainer.style.marginTop = '0px';
	bannerAdContainer.parentNode.style.paddingTop = '0px';
}
