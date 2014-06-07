// ==UserScript==
// @name           EnterGE.
// @description    Skip goldesel.to Disclaimer Page
// @version        1.01
// @include        http://www.goldesel.to/*
// @include        http://goldesel.to/*
// ==/UserScript==



if ( (document.getElementById('ctl00_ctl00_rdzDisclaimer') ) || (document.getElementById('ctl00_rdzDisclaimer') ) ) {
	document.getElementById('aspnetForm').submit();
}
