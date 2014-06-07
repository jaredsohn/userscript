// Active Collab - Better Page Titles
// version 0.5
// 2009-11-30
// Copyright (c) 2009, Adam Courtemanche
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          Active Collab - Better Page Titles
// @namespace     http://agileadam.com
// @description   Makes Active Collab page titles more descriptive
// @include       
// @exclude       
// ==/UserScript==

/**
 * Sets a better page title that includes the project name.
 * This is great for the Firefox AwesomeBar because you can
 * now just type in the address bar, for example:  ProjectX milestones
 * and if you've been to the milestones page for ProjectX it'll show up
 * as one of the options.
 */
var htmlRegExp = /<("[^"]*"|'[^']*'|[^'">])*>/gi;  
var dirtyPageTitle = document.getElementById("page_title").innerHTML;
var pageTitle = dirtyPageTitle
	.replace(htmlRegExp, "")
	.replace(/\&#039;/g, "'")
	.replace(/\&#39;/g, "'")
	.replace(/\&amp;/g, "&")
	.replace(/\&quot;/g, "\"")
	.replace(/\&apos;/g, "'")
	.replace(/\&lt;/g, "<")
	.replace(/\&gt;/g, ">")
document.title = pageTitle + " | Active Collab";