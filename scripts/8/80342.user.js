// ==UserScript==
// @name           Youtube Element Hider
// @description    Hides Suggested Videos and other elements. Blocks sections of the youtube page.
// @version        1.3
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// ==/UserScript==
/*
	A Script
	by Matthias Dailey
	
	A script that hides certain elements of a YouTube page, like suggested videos and the like.
	For people who don't want to get distracted....
	
*/



if ( self == top )
if (document) {
	/*
		cssSelectorsHidden: an array of CSS selectors which match arrays to be hidden. You may comment out any line by putting "//" at the beginning.
			These selectors will all be joined with a comma and given the property of "display: none;". 
	*/
	var cssSelectorsHidden = [
		".homepage-side-block",		// the right-hand side of the homepage
		"#search-pva",				// the right-hand side of the search results
		".search-related",			// related search terms, at the bottom of the search results.
		".promoted-videos",			// in search results. They are yellow and they say "Promoted video at the bottom"
		".watch-module",			// the right-hand Suggested videos when watching a video
		"#feedmodule-FRI",			// your friends' recent activity
		"#feedmodule-REC",			// "Recommended for You"
		"#feedmodule-PRO",			// "Spotlight"
		"#feedmodule-POP",			// "Featured Videos"
		".feedmodule-data .ytg-box",			// "Most Popular" heading
		".fm-title-underlined",		// "Most Popular" videos
		"#feedmodule-TOP",			// "Videos Being Watched now" - on front page. Appears when not logged in
		"#ad_creative_1",			// box that takes up space
		".top-videos-module",		// top videos at the bottom
		"#watch-sidebar",      // The related videos when watching a video. 11/8/2011
		"#homepage-side-rec",   // The sidebar of the home page. has recommended channels. 11/8/2011
		".watch-sidebar-body",   // The sidebar of the watch page. 2013-Jan-17
		".watch-sidebar-foot"   // The sidebar of the watch page. 2013-Jan-17
	];
	var cssHideSidebar = cssSelectorsHidden.join(", ") + " {display: none;}";
	var styleHideSidebar = document.createElement("style");
	styleHideSidebar.appendChild(document.createTextNode(cssHideSidebar));
	document.body.appendChild(styleHideSidebar);
	//alert("finished")
}


