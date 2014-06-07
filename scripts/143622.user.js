// ==UserScript==
// @name           AMO redirect to en-US
// @version        2.0
// @include        https://addons.mozilla.org/*/firefox/*
// @include        https://addons.mozilla.org/*/thunderbird/*
// @include        https://addons.mozilla.org/*/seamonkey/*
// @include        https://addons.mozilla.org/*/mobile/*
// ==/UserScript==

 if (window.location.href.indexOf("en-US") == -1)
	{
		location.href = location.href.replace(/.org\/([\w\-]{2,5})\//, ".org/en-US/");
	}