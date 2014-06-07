// ==UserScript==
// @name           xda-developer Mouseover Remover
// @namespace      Jackalo
// @description    Remove 'title' mouseover tooltips from the forum thread lists to prevent them from blocking your view
// @version        1.0
// @updateURL      http://userscripts.org/scripts/source/116101.meta.js?1.0
// @include        http://forum.xda-developers.com/*
// ==/UserScript==

// id = td_threadtitle_######, where # is a unique numeric number for each thread

// querySelectorAll allows regular expression matching!  Match and make a list of any ID that starts with 'td_threadtitle_'
var idToFix = document.querySelectorAll('[id^=td_threadtitle_]');

// Iterate through that list of ID's that need to be fixed
for (i = 0; i < idToFix.length; i++)
{
	// Make a backup copy of the data in case someone needs to view it from the source code for whatever reason
	idToFix[i].setAttribute('title-backup', idToFix[i].title);

	// Remove the 'title' attribute from the <td>
	idToFix[i].removeAttribute('title');
}