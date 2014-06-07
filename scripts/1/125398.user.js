// This script is in public domain.
//
// ==UserScript==
// @name IStock Photo
// @namespace WEBSITE
// @description Modify image zoom of iStock
// @include http://www.istockphoto.com/*
// ==/UserScript==


// Inject your own CSS in the page.
// Example: Do not underline link:
// injectCSS("a{text-decoration: none;}")

function s(myStyle) {
    var head;
    var style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = myStyle;
    head.appendChild(style);
}
s('.column1         				{width: 2000px; height: auto;}');
s('#fileDisplayContainer          	{width: 2000px; height: auto;}');
s('#zoomCropContainer       		{width: 2000px; height: auto !important;}');
s('#ZoomImageDiv        			{height: auto !important;}');
s('#imageContainer        			{width: 2000px;}');
s('#ZoomDroppableDiv        		{width: 2000px !important; height: 1000px !important;}');


s('#ZoomControlDiv        	{display: none;}');

s('.fixedWidth        	{width: 2000px !important;}');


