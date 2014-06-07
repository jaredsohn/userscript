// ==UserScript==
// @name          Digg v4.0 Advertisements Remover
// @author        SpookyET
// @namespace     http://www.studioindustryllc.com
// @description	  Removes ads on all digg.com v4.0 pages.
// @version       1.3
// @include       http://digg.com/*
// @include       http://*.digg.com/*
// ==/UserScript==
	
(function(){
	var elementIdentifications = [
		'#top_ad',
		'#item_ad',
		'#comments_ad',
		'#search_ad',
		'.top_ad_image',
		'.comments_ad_image',
		'.single_add_unit',
		'.banner_add_unit',
		'.item_ad_image',
		'.rectangle_ad_image',
		'.vertical_ad_unit'];
	
	var headElement = document.getElementsByTagName('head')[0];
	var styleElement = document.createElement('style');
	var styleData = '';
	
	styleElement.type = 'text/css';
	
	for (var index = 0; index < elementIdentifications.length; index++)
	{
		styleData += elementIdentifications[index] + ' { display: none !important; } ' + '\n';
	}

	styleElement.appendChild(document.createTextNode(styleData));
	headElement.appendChild(styleElement);
})();
