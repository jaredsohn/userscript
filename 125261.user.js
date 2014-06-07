// ==UserScript==
// @name           Amazon Reader (Look Inside) Downloader
// @namespace      http://skoshy.com
// @description    Download images from Amazon Reader (Look Inside!)
// @include        http*://www.amazon.com/*
// @include        http*://www.amazon.co.uk/*
// @include        http*://www.amazon.fr/*
// @include        http*://www.amazon.it/*
// @include        http*://www.amazon.de/*
// @include        http*://www.amazon.ca/*
// @include        http*://www.amazon.es/*
// @include        http*://www.amazon.br/*
// @include        http*://www.amazon.co.jp/*
// @include        http*://www.amazon.cn/*
// ==/UserScript==

/*
	 * Changelog
	 * 
	 * Version 0.3.0 - 2013-10-01
	 * - Now will automatically apply the fix so you don't have to go to the Greasemonkey context menu
	 *
	 * Version 0.2.1 - 2013-02-22
	 * - Added in more Amazon domain names in the @includes (thanks johnnybgoode23!)
	 * 
	 * Version 0.2   - 2012-07-13
	 * - Now you can select text from Kindle Book previews or other books that use actual text
	 * 
	 * Version 0.1   - 2012-04-04
	 * - First version; allows right clicking on images to save them
	 * 
*/

GM_registerMenuCommand('Allow Download Pages in "Look Inside!"', go, "a");

function go() {
	unsafeWindow.jQuery('#sitbReaderPageScroll').unbind('contextmenu');
	unsafeWindow.jQuery('div#scrollElm-0').unbind('mouseover');
	unsafeWindow.jQuery('div#sitbReaderPageScroll').unbind('mouseover');
	unsafeWindow.jQuery('div#sitbReaderPageScroll').unbind('mousedown');
	unsafeWindow.jQuery('head').append('<style type="text/css">#sitbReaderPageScroll img {z-index: 10000;}</style>');
}

setInterval(go, 1000);