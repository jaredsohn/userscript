// ==UserScript==
// @name		Tweeter Name Favstar Link
// @namespace	http://www.pedrodevoto.com
// @description	Adds a Favstar link to a Twitter profile's screen name
// @include		http://twitter.com/*
// @include		https://twitter.com/*
// ==/UserScript==

document.addEventListener(
	'load',
	function() { 

		var u = document.location.href;
		if ((u.substr(0, 22)=="http://twitter.com/#!/" && u.length > 22) || (u.substr(0, 23)=="https://twitter.com/#!/" && u.length > 23)){
			var a = document.getElementsByClassName("screen-name")[0];
			if (a && a.tagName=="SPAN" && a.innerHTML.indexOf("<a href=")==-1){
				a.innerHTML += "<a href='http://favstar.fm/users/"+a.innerHTML.substr(1)+"' target='_blank'><img src='http://i.imgur.com/lXp1m.png' /></a>";
			}
		}
	},
	true
);