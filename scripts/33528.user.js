// Copyright (c) 2008-2009, Thorsten Willert
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Fit Images", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name Fit Images
// @namespace http://userscripts.org/users/66002
// @version 3.1
// @date Mon Sep 14 16:09:00 CEST 2009 @631 /Internet Time/
// @description Fits all images to the inner window size.
// @include *
// ==/UserScript==

/*
V3.1	+ Changed: Doesn't resize imagemaps anymore.
V3.0	+ Added: Now it works if the content of the page is changed, too (e.g. AJAX, AutoPager)
V2.3	+ Changed: Border color is now the same like the link-color
V2.2	+ Changed: Now only pictures with "Height or Width> 250px" are fitted
	you can disable it with the menu
	+ Changed border from 2px to 0.25em
V2.1    + now every resized picture is marked with a small green border (var BorderStyle)
        You can disable it via the menu.
V2.0	+ now with Auto-mode (menu) to fit all images if you resize the browser window
	the maximum picture size is the original size
V1.4	+ added menu to change between "All" or "Height > 250px" images
V1.35	+ removed the leading "/" if there is no title
	+ changed "pixels" to "px"
V1.3	+ now only pictures with a height > 250px are resized
	* some optimizations
V1.0	inital release, Based on the script "Resize inline images in forums"
*/

makeMenuToggle("fit_images_auto", true, "Auto OFF", "Auto ON", "Fit Images");
makeMenuToggle("fit_images_250", false, "All", "Height or Width> 250px", "Fit Images");
makeMenuToggle("fit_images_border", true, "Border OFF", "Border ON", "Fit Images");

window.addEventListener("load",fitImg,false);
window.addEventListener("DOMNodeInserted",resizeImg,false);
if (fit_images_auto) window.addEventListener("resize",resizeImg,false);

function fitImg() {
	var LinkColor = window.getComputedStyle(document.getElementsByTagName('a')[0], null)['color'];
	var BorderStyle = "border: 0.25em groove " + LinkColor + ";";
	var Images = document.getElementsByTagName('img');
	var InnerWidth = window.innerWidth;
	var InnerHeight = window.innerHeight;
	var ImgHeight, ImgWidth, ImgTitle;
	var ratio, i;

	for(i in Images)
	{
		if ( Images[i].hasAttribute("usemap") ) continue;
		ImgHeight = Images[i].height;
		ImgWidth = Images[i].width;
		ImgTitle = Images[i].title;

		if( (ImgHeight > 250 && ImgWidth > 250 || fit_images_250) && (ImgWidth > InnerWidth-30 || ImgHeight > InnerHeight-30) )
		{
			if ( ImgTitle != "") ImgTitle += " / "
			ratio = Math.min(InnerWidth / ImgWidth, InnerHeight / ImgHeight);

			Images[i].setAttribute('title', ImgTitle + "Original Resolution - " + ImgWidth + "x" + ImgHeight + "px");
			Images[i].setAttribute('width', ImgWidth * ratio - 32);
			Images[i].setAttribute('height', ImgHeight * ratio - 32);

			if (fit_images_border) Images[i].setAttribute('style',BorderStyle);

			Images[i].addEventListener("click",function(){window.open(this.getAttribute('src'),'newwin');},false);
			Images[i].style.cursor = 'pointer';
		}

	}
}

function resizeImg() {
	var Images = document.getElementsByTagName('img');
	var ImgTitle;
	var RegEx = /Original Resolution - (\d+)x(\d+)px/;
	var i;

	for(i in Images)
	{
		ImgTitle = Images[i].title;

		if (ImgTitle.indexOf("Original Resolution - ") != -1)
		{
			RegEx.exec(ImgTitle)
			Images[i].setAttribute('width', RegExp.$1);
			Images[i].setAttribute('height', RegExp.$2);
			Images[i].title = ImgTitle.substr(0,ImgTitle.indexOf(" / Original") );
			if ( fit_images_border ) Images[i].setAttribute('style', "" );
		}

	}
	fitImg();
}

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  window[key] = GM_getValue(key, defaultValue);
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}
