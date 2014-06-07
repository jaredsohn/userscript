// ==UserScript==
// @name           The Online Photographer - Main Page
// @namespace      http://userscripts.org/users/40332 
// @description    Make the main page of the site the true main page instead of the welcome page (come on Mike -- your readers are right!).
// @include        http://theonlinephotographer.typepad.com/the_online_photographer/
// ==/UserScript==

if (document.referrer == "http://theonlinephotographer.typepad.com/the_online_photographer/blog_index.html") {
    return;
}

if (window.location == "http://theonlinephotographer.typepad.com/the_online_photographer/") {
	window.location="http://theonlinephotographer.typepad.com/the_online_photographer/blog_index.html";
}
