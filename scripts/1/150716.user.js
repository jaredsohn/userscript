// ==UserScript==
// @name          ADP No Embedded PDFs
// @version       1
// @date          2012-10-21
// @description   Changes embedded pay statment PDFs to links.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2012 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; ABSOLUTELY NO WARRANTY
// @resource      COPYING https://www.gnu.org/licenses/gpl-3.0.txt
// @grant         none
// @require       http://code.jquery.com/jquery-1.8.2.min.js
// @include       https://portal.adp.com/wps/myportal/sitemap/Employee/PayTax/NasPayStatements/*
// ==/UserScript==

var embed = $('#embedPdf');
if (embed) {
	pdfUrl = embed.attr('src');
	if (pdfUrl) {
		// get rid of the first back button (it's a series of tds in a tr)
		$('td.ADPUI-activeButtons').eq(0).parent().remove();

		// replace the embed with the link
		var link = $(document.createElement('a'));
		link.attr('href', pdfUrl).html('<b>View Statement</b>');
		embed.replaceWith(link);

		// add some space between the link and the lower back button
		link.append($(document.createElement('br')));
	}
}
