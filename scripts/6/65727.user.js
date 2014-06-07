// ==UserScript==
// @name           PageFlakesAdRemove
// @namespace      pageflakes
// @description    Remove the ads on pageflakes
// @include        http://www.pageflakes.com/default.aspx*
// ==/UserScript==


	//var body = document.getElementById('body');

	var ad = document.getElementById('adFlake');

	//body.removeChild(ad);

	ad.setAttribute('style','display: none;');