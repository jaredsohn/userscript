// ==UserScript==
// @name Facebook Newsfeed Hider
// @description Hide the Facebook Newsfeed until requested by clicking to see it
// @namespace Facebook Newsfeed Hider
// @include http://facebook.com/*
// @include http://www.facebook.com/*
// @include https://facebook.com/*
// @include https://www.facebook.com/*
// @version 0.5
// @author LukeStanley
// ==/UserScript==
// License: BSD
window.doNotHideFeed = false;
function clean () {
  document.addEventListener("DOMNodeInserted", hideFeed, false);
}
function showFeed(){
		try{
			console.log('show Facebook feed clicked!');
		} catch(e){};
		stream = document.getElementById('pagelet_home_stream');
		stream.style.display='';
		window.doNotHideFeed = true;
};
function hideFeed() {    
	stream = document.getElementById('pagelet_home_stream');
	if (stream.style.display != 'none') {
		if (window.doNotHideFeed == false) {
			stream.style.display='none';
			var p = document.createElement("p");
			p.innerHTML = 'Click to see hidden newsfeed';
			p.onclick = showFeed;
			stream.parentNode.appendChild(p);
		};
	};
};
try{
	hideFeed();
} catch(e) {};

clean();
