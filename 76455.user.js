// ==UserScript==

// @name          Szeroki Wykop

// @namespace     paziek/gm

// @description   Robi prawie płynną szerokość na wykopie

// @include       http://wykop.pl/*

// @include       https://wykop.pl/*

// @include       http://*.wykop.pl/*

// @include       https://*.wykop.pl/*

// ==/UserScript==



function init() {

	GM_addStyle(

	'.wrapper {width:100% !important;}'+

	'#body-container .wrapper #sidebar, #body-container .wrapper #sidebar-before {float:right !important;}'+

	'#body-container .wrapper #content, #body-container .wrapper #content-before {width: auto !important;}'+

	'#body-container .wrapper #content ol.entry > li blockquote > div > p {max-width: '+(document.width-360)+'px !important;}'+

	'#body-container .wrapper #content-entry {width:'+(document.width-360)+'px !important;}'+

	'#body-container .wrapper #content-entry blockquote.entry-details .entry-text {width:'+(document.width-441)+'px !important;}'+

	'#body-container .wrapper ul.comments-list > li blockquote {width:'+(document.width-441)+'px !important;}'+

	'#body-container .wrapper #user-info {float:right !important;}'+

	'body.full-size #header-container .wrapper ul#main-menu li#sub-list > ul > li.label {display:none;}'+

	'#header-container .wrapper ul#main-menu li#sub-list {padding:0;}'+

	'#body-container .wrapper #sidebar ul.comments-list > li.subcomment blockquote {width:260px !important;}'+

	'#body-container .wrapper #sidebar ul.comments-list > li blockquote {width:300px !important;}'

	);

}



document.addEventListener('DOMContentLoaded', init, false);

