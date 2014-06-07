// ==UserScript==
// @name			deviantArt 'Monsters' Redirect
// @author			Gryphonvere
// @version			1.1.0
// @description		Redirects to links external to deviantArt from the "Out There Be Monsters" warning page.
// @include			http://www.deviantart.com/users/outgoing?*
// ==/UserScript==

/*
	Script History
	
	1.0.0	2011-12-20		Initial release (based upon a comment by eagleeyez in a discussion thread for the predecessor to this script: http://userscripts.org/scripts/discuss/63247 ).
	1.0.1	2011-12-20		Removed the main page from the @excludes list.  Who knows, there might just be some external links there sometime after all...?
	1.1.0	2012-01-02		Rewrite, given the inconsistent interaction between GreaseMonkey and deviantArt pages.
	
	Note: It's not perfect -- there are some external links (seemingly ones which have an image instead of text to click on) which will still send you to the nag screen.  But in the name of efficiency, hopefully this can be overlooked.  Otherwise, you might like to take a look at Sabin Iacob's original script [ http://userscripts.org/scripts/show/63247 ] which brute-force checks all links on the page and rewrites those matching the dA outgoing nag.  While eagleeyez's discussion post mentioned above suggests that it doesn't, it seems to run fine for me.
	
	
	UPDATE (2012-01-02): After some investigation, I am now rather confused/baffled.  When testing my script during development, I always force-refreshed the page, thus always causing the links to be rewritten on the page.  However, when actually *using* the script myself, I discovered that either GreaseMonkey or its scripts (I suspect the former) do not always seem to be triggered when deviantArt pages are loaded, after one has browsed around the site for a little while.  Since I can't seem to sort out the why (nor how I might be able to script around this), I'm resorting to the less ideal but dependable method of redirecting the browser once it loads the "nag screen."  Not my preferred choice, but the other options I've muddled around with just don't seem to be working.  Sorry. :(
*/

(function() {
	
	var monstersAhoy = window.document.location.toString();
	
	window.document.location.assign(monstersAhoy.substring(monstersAhoy.indexOf("?")+1));
	
})();