// ==UserScript==
// @name           Podio style
// @namespace      Miinto
// @author         Matias Singers
// @version        0.9
// @include		   https://*.podio.com/*
// ==/UserScript==

cssString = "#header-global {background:#000}; .items-list {margin-top: 0 !important;} .field-type-contact img {height: 30px !important;} .field-type-contact img {width: 30px !important;} .field-type-contact {height: 30px !important;} .field-type-contact {margin: 0 !important;} .click-wrapper .footer {height: 30px !important;} .card-item .click-wrapper .body {font-weight: 700 !important;} .grid.sub .col.six {width: 100% !important;} #wrapper {margin: 0 !important;} .grid .col.eight {width: 100% !important;} .items-card {margin-top: 0 !important;} .navigation-arrow {display: none !important;} .floating {display: none !important;} .app-view-header-area {display: none !important;} .app-view-header-area {display: none !important;} .card-group-heading {display: none !important;} #footer-global {display: none !important;} .app-view-sidebar {display: none !important;} .subnav {display: none !important;} .col.two {display: none !important;} .left-nav {display: none !important;} #header-global {display: none;}"

insertCSS(cssString);
// Function to insert CSS
function insertCSS(cssToInsert) {
	var head=document.getElementsByTagName('head')[0];
	if(!head)
		return;
	var style=document.createElement('style');
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode(cssToInsert));
	head.appendChild(style);
}