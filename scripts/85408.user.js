// ==UserScript==
// @name Hide Twitter Sidebar Crap
// @namespace http://sketchyplace.biz
// @description Hides the stupid twitter sidebar stuff
// @include http://twitter.com/
// @include https://twitter.com/
// @include http://www.twitter.com/
// @include https://www.twitter.com/
// ==/UserScript==

// Add this nice HTML5 DOM function to document
if ( !document.getElementsByClassName ) {
	document.getElementsByClassName = function(cl) {
		var retnode = [];
		var myclass = new RegExp('\\b'+cl+'\\b');
		var elem = this.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
			var classes = elem[i].className;
			if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
	};
}

(function hide_twitter_crap(){
	/* Function to hide all elements passed in */
	var hider = function(el) {
		if (el && el.style) {
			el.style.display = "none";
		}
	};

	/* Function wrapping getElementById. Easier to read */
	var get = function(id) {
		return document.getElementById(id);
	};

	/* NewTwitter hiding */
	var newtwitter = function() {
		var components = document.getElementsByClassName("component");
		// Components 2 through 4 are Trending, Who To Follow, Twitter Advert
		for (var i = 2, len = components.length; i < 5 && i < len; i++) {
			hider(components[i]);
		}
	};

	/* Grab sidebar elements with ids */
	var trends = get("trends");
	var following = get("following");
	var lists = get("side_lists");
	var recommended = get("recommended_users");
	var profile = get("profile");
	var rssfeed = get("rssfeed");
	var after_follow = (following ? following.nextElementSibling : null);
	var hideall = [ following, after_follow, trends, lists, recommended, rssfeed ];
	/* Check for newtwitter */
	if (!hideall.every(function(a){return !!a})) {
		// new twitter is slow to load components
		setTimeout(newtwitter,1000);
		return;
	}
	/* Hide the sidebar divs and the <hr> after "Following" */
	hideall.forEach(hider);

	/* Put a little space where recommended was */

	profile.style["padding-bottom"] = "20px";

	/* Hide Promotions with CSS (no ids for this one) */
	var hidepromos = document.getElementsByClassName("promotion");
	for (var i = 0, len = hidepromos.length; i < len; i++) {
		hider(hidepromos[i]);
	}
})();
