// ==UserScript==
// @name        縮圖剪剪樂!
// @namespace   http://userscripts.org/scripts/show/142115
// @version     1
// @description Auto-submit, auto-confirm, go to result url, focus url for copy.
// @include     http://ppt.cc/cut/
// @include     http://ppt.cc/cut/index.php?img=*
// @include     http://ppt.cc/cut/gen.php
// @include     http://ppt.cc/*
// ==/UserScript==
/*jshint
	curly:false
 */
/*global
	document:false
	location:true
 */
(function()
{
	"use strict";

	tweakHome();
	tweakIndex();
	tweakGen();
	tweakPPT();

	function tweakHome()
	{
		var uploaded;

		// enable auto-submit
		uploaded = document.forms[0].elements.uploaded;
		if (uploaded === undefined)
			return;
		uploaded.addEventListener("change", function(e)
		{
			e.target.form.submit();
		}, false);
	}

	function tweakIndex()
	{
		var form;

		// enable auto-cofirm
		form = document.forms[1];
		if (form === undefined)
			return;
		form.submit();
	}

	function tweakGen()
	{
		if (location.href !== "http://ppt.cc/cut/gen.php")
			return;

		location = document.forms[0].getElementsByTagName("a")[0].href;
	}

	function tweakPPT()
	{
		var linku;

		linku = document.getElementById("linku");
		if (linku === null)
			return;
		linku.focus();
		linku.select();
	}
})();
