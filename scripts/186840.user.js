// ==UserScript==
// @name         Hide gsw_hoops from Warriorsworld Politics
// @namespace    hide_gsw_hoops
// @include      http://forums.warriorsworld.net/politics/*
// @include      https://forums.warriorsworld.net/politics/*
// @author       Jim Barnett (The fake one) – revised by Flashfire
// @description  Improve the quality of your life and save time by hiding all posts written by gsw_hoops on Warriorsworld.net's politics board.  This extension will also remove any responses to him because any time spent replying to him is a waste of time as well.  Just imagine how much better your life would be if he wasn't part of it.
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
  
	var e = $('b:contains(gsw_hoops)');
	var parents = e.closest('ul').remove();

	var post = $('a:contains(Post A Message)');

	if (post != null){

		var message = 'You have been saved from ' + e.length + ' posts by gsw_hoops!';
		post_parent = post.closest('table');
		post_parent.after('<p style="font-family: verdana; font-size: 12px; color: #666; font-weight: bold; text-align: center">' + message + '</p>');
	
	}
  
}

// load jQuery and execute the main function
addJQuery(main);