// Stay Classy San Diego
// version 0.1
// Ben Katz
// 2013-08-21
// Released to the public domain.
//
// ==UserScript==
// @name          Stay Classy San Diego
// @description   Blocks Trash Masquerading to Be Journalism
// @include       http://*.sandiegoreader.com/*

// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.2:
// Released: 2013-08-21
// #FreeDorianHargove
// Version 0.3:
// Released: 2013-10-24
// #OldCoot
// ==/RevisionHistory==



(function () {
	var b = (document.getElementsByTagName("body")[0]);
	var bl = document.querySelector('.byline a:nth-of-type(1)').innerHTML;
	if (bl == 'Don Bauder')
	{
		window.location = "http://i.imgur.com/osSV8q3.jpg";
	}
	else if (!(bl == 'Dorian Hargrove'))
	{
		b.setAttribute('style', 'display:none!important');
		alert("Stay Classy San Diego -- Don't Read This Site");
		window.location = "http://www.google.com";	
	}
})();