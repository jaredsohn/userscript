// Linkbucks Skipper
// Version: 0.02
// Last edit: 14-03-2011
// Developed by: Joe Chan Wing Yin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          LinkBucks Skipper
// @include       *.linkbucks.com*
// @include       *.tnabucks.com*
// @include       *.tubeviral.com*
// @include       *.picbucks.com*
// @include       *.allanalpass.com*
// @include       *.urlbeat.net*
// ==/UserScript==

var LinkbucksObj = Linkbucks.TargetUrl;
if (LinkbucksObj) {
	window.location.href = LinkbucksObj;	
}