// ==UserScript==
// @name           Youtube Notification Hider (hangout)
// @description    Hides the notification about youtube hangout. The Blue Bar that appear on top of your channel all the time again.
// @include        http://www.youtube.com/*
// 				   Version 1.2 (09.11.2012) (reduced to ".channel-notification" only, since other variables did suppress functioning)
// ==/UserScript==
/*
	A Script based on the code of Matthias Dailey (http://userscripts.org/users/97611)
	I, Dandare just changed the variables, so credits go to Matthias Dailey. 
	Dandare, 8th November 2012
	
	A script that hides the notification about youtube hangout in the blue bar on top of your youtube channel, if you found that annoying.
	I cannot guarantee that this may supress or alter other alert messages.
	
*/



if ( self == top )
if (document) {
	/*
		cssSelectorsHidden: an array of CSS selectors which match arrays to be hidden. You may comment out any line by putting "//" at the beginning.
			These selectors will all be joined with a comma and given the property of "display: none;". 
	*/
	var cssSelectorsHidden = [
	//	".yt-alert",				// hide the blue top bar, that show notifications about hangout for example
	//	".yt-alert-default",
	//	".yt-alert-info",
	//	".related-video-featured",
		".channel-notification",
	//	".ytg-alter-content"					

	];
	var cssHideSidebar = cssSelectorsHidden.join(", ") + " {display: none;}";
	var styleHideSidebar = document.createElement("style");
	styleHideSidebar.appendChild(document.createTextNode(cssHideSidebar));
	document.body.appendChild(styleHideSidebar);
	//alert("finished")
}


