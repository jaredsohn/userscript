// ==UserScript==
// @name		Squiz Matrix Back-End Tools
// @namespace	daff.qld.gov.au
// @version		0.8
// @downloadURL	http://userscripts.org/scripts/source/185363.user.js
// @description	Squiz Matrix back-end enhancements
// @grant		none
// @run-at		document-start
// @match		*://*/*SQ_BACKEND_PAGE=main*
// @copyright	2013+, Department of Agriculture, Fisheries and Forestry
// @require		https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==



var style = document.createElement("style");
style.innerHTML = "\
	.sq-backend-nav-history-container { display: none; } \
	.sq-backend-section-heading-container td { border:none; } \
	.sq-backend-section-heading-container td table td.sq-backend-section-heading { background-color: transparent; color: #666; font-family: Verdana, Helvetica, sans-serif; font-size: 110%; padding: 1em .5em; } \
	.sq-backend-section-heading-container img { display: none; } \
	table.sq-backend-section-table { border-bottom: 1px dashed #80c0ff; } \
	table.sq-backend-section-table :last-chile { border-bottom: 1px dashed #80c0ff; } \
";

$(function() {
    // inject custom styles
    document.body.appendChild(style);
    
    // set size of multiple select controls to 10
    $("select[multiple='multiple']").attr('size', 10)
});
