// ==UserScript==
// @name		Facebook Games - back from error page
// @namespace		fixerror
// @description		go back a page when the common error page is encountered
// @version		0.1
// @include		http://www.facebook.com/common/error.html
// ==/UserScript==
//


if(document.body.innerHTML.indexOf("We're working on getting this fixed as soon as we can") != -1)
{
	window.history.back();
}




