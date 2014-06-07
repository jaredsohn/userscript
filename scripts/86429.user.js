// <![CDATA[
// ==UserScript==
// @name          larger cybton.com textarea
// @fullname      larger cybton.com textarea
// @author        Egon
// @version       1.0
// @namespace     http://userscripts.org/scripts/show/86429
// @description   makes the cybton.com textarea larger
// @include       http://userscripts.org/scripts/show/86429*
// @include       https://userscripts.org/scripts/show/86429*
// @include       http://www.cybton.com/*
// @unwrap
// ==/UserScript==

	function largerTextarea() {
		document.getElementById('text').rows = 20;
	}

	function middle() {
	    document.getElementsByTagName('body')[0].style.margin = '0px auto;';
	}

	largerTextarea();
	middle();