// ==UserScript==
// @name           Reload page
// @namespace      localhost
// @description    Periodically attempts to reload a page after Firefox has been unable to do so.
// @include        *
// ==/UserScript==

// If document title matches "Problem loading page", attempt a 
// reload every 'reload' minutes.  It's OK for that to be fairly 
// often, as there's no burden on the remote server if the problem 
// persists.

var problem = /Problem loading page/;
var reload = 2;
if (document.title.match(problem)) {
	window.setTimeout("document.location.reload()", reload*60*1000);
}
