// ==UserScript==
// @name           AngryFacebook
// @description    Simple script to improve usability of angry birds facebook games.
// @namespace      http://userscripts.org/users/dippi/scripts
// @author         Dippi
// @include        http*://apps.facebook.com/angrybirds/*
// @include        http*://angrybirds-facebook.appspot.com/*
// @include        http*://apps.facebook.com/angrybirdsstarwars/*
// @include        http*://angrybirds-starwars.appspot.com/*
// @grant          none
// @downloadURL    https://userscripts.org/scripts/source/161302.user.js
// @updateURL      http://userscripts.org/scripts/source/161302.meta.js
// @version        1.3
// ==/UserScript==
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/

// utility functions
var $id = function(id){ return document.getElementById(id); };
var $new = function(html) {
	var el = document.createElement('div');
	el.innerHTML = html;
	return el.firstChild;
};
var $style = function(element, properties) {
	for(var prop in properties) {
		element.style[prop] = properties[prop];
	}
};

window.onload = function(){
	// if it is the facebook page
	if(window.location.href.match(/https?:\/\/apps\.facebook\.com\/angrybirds(starwars)?\/.*/i))
	{
		// change css properties of the page layout
		$style($id("rightCol"), { display: "none" });
		$style($id("globalContainer"), { padding: 0 });
		$style($id("contentArea"), { padding: 0, border: "none" });
		$style($id("mainContainer"), { border: "none", margin: 0 });
		$style(document.body, { overflow: "hidden" });

		// add the link in the nav-bar to the other game
		var menu = $id('pageNav');
		var isStarwars = !! window.location.href.match(/https?:\/\/apps\.facebook\.com\/angrybirdsstarwars\/.*/i);
		var url = window.location.protocol + "//apps.facebook.com/angrybirds" + (isStarwars ? "" : "starwars");
		var text = "GO TO ANGRY BIRDS " + (isStarwars ? "FRIENDS" : "STARWARS");
		var newLink = $new('<li class="navItem firstItem"><a class="navLink" href="' + url + '" style="padding:0 8px;">' + text + '</a></li>');
		menu.insertBefore(newLink, menu.firstChild);

		// resize the frame height to fit between the nav-bar and the chat
		window.onresize = function(){
			var height = window.innerHeight;
			height -= $id("pagelet_bluebar") && $id("pagelet_bluebar").offsetHeight || 38;
			height -= $id("BuddylistPagelet") && $id("BuddylistPagelet").offsetHeight || 25;
			$style($id("iframe_canvas"), { height: height + "px" });
		}
		window.onresize();
	}
	//if it is the the game frame
	else if (window.location.href.match(/https?:\/\/angrybirds-(facebook|starwars)\.appspot\.com\/.*/i))
	{
		// change css properties of the page layout
		$style($id("topExtraContent"), { display: "none" });
		$style($id("bottomExtraContent"), { display: "none" });
		$style($id("allContent"), { height: "100%", width: "100%", minWidth: "none", maxWidth: "none", margin: 0 });
		$style($id("flashContent"), { height: "100%", width: "100%" });

		// resize the swf height to fit the frame
		var swf = $id("AngryBirdsFacebook") || $id("AngryBirdsBlack");
		swf.setAttribute("width", "100%");
		window.onresize = function(){
			swf.setAttribute("height", (window.innerHeight) + "px");
		}
	}
}
