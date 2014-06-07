// ==UserScript==
// @name           Wiley InterScience PDF Frame Killer
// @namespace      infiniteinjury.org
// @description    Busts the Frame when viewing full text pdf while respecting ezproxy
// @include        http://*interscience.wiley.com*/*/fulltext/*/PDFSTART
// ==/UserScript==

window.location.href=document.evaluate( '//frame[@name="main"]/@src', document,null,XPathResult.STRING_TYPE,null).stringValue;

// var match = window.location.href.match((.*?interscience\.wiley\.com.*?\/fulltext)\/(\d*)\/PDFSTART/);
// 	digits = /fulltext\/(\d*)\/PDFSTART/.exec(window.location.href);
	// window.location.href= "http://download.interscience.wiley.com.myaccess.library.utoronto.ca/cgi-bin/fulltext?ID="
	// + digits[1]
	// + "&PLACEBO=IE.pdf&mode=pdf";
// } else {
// 	articleID = /article\/(\w*\d+)\/current/.exec(window.location.href);
// 	window.location.href = window.location.href + '/' + articleID[1] + '.pdf';
// }