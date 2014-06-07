// ==UserScript==
// @name         Hide TidesHaveTurned from WarriorsWorld Main
// @namespace    hide_TidesHaveTurned
// @include      http://forums.warriorsworld.net/main/*
// @include      https://forums.warriorsworld.net/main/*
// @author       Jim Barnett (The fake one) – revised by Flashfire
// @description  Improve the quality of your life and save time by hiding all posts written by TidesHaveTurned on WarriorsWorld.net.  This extension will also remove any responses to him because any time spent replying to him is a waste of time as well.  Just imagine how much better your life would be if he wasn't part of it.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  
	var e = $('b:contains(TidesHaveTurned)');
	var parents = e.closest('ul').remove();

	var post = $('a:contains(Post A Message)');

	if (post != null){

		var message = 'You have been saved from ' + e.length + ' posts by TidesHaveTurned!';
		post_parent = post.closest('table');
		post_parent.after('<p style="font-family: verdana; font-size: 12px; color: #666; font-weight: bold; text-align: center">' + message + '</p>');
	
	}
  
}

// load jQuery and execute the main function
addJQuery(main);