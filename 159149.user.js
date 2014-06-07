// ==UserScript==
// @name       eZ Github URL Fix
// @namespace  http://psicofrenia.com/
// @version    1.1
// @description  Just fix github URL Links
// @include      https://github.com/ezsystems/ezpublish/*
// @include      https://github.com/ezsystems/ezpublish-ee/*
// @include      https://github.com/ezsystems/ezpublish5/*
// @include      https://github.com/ezsystems/ezp-next/*
// @copyright  2012+, Eduardo Fernandes
// @downloadURL    https://userscripts.org/scripts/source/159149.user.js
// @updateURL      https://userscripts.org/scripts/source/159149.meta.js
// @grant       none
// ==/UserScript==

var pathName = window.location.href;
switch(pathName.split("/")[4])
{
	case "ezpublish":
		pathName = pathName.replace("ezpublish","ezpublish-legacy");
		break;
	case "ezpublish-ee":
		pathName = pathName.replace("ezpublish-ee","ezpublish-legacy-ee");
		break;
	case "ezpublish5":
		pathName = pathName.replace("ezpublish5","ezpublish-community");
		break;
	case "ezp-next":
		pathName = pathName.replace("ezp-next","ezpublish-kernel");
		break;
}
window.location.href = pathName;