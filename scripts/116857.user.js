// ==UserScript==
// @name		Facebook Love
// @namespace	http://www.pedrodevoto.com
// @description	Changes Facebook's 'Like' and 'Unlike' for 'Love' and 'Unlove'
// @include		http://www.facebook.com/*
// @include		https://www.facebook.com/*
// ==/UserScript==

document.addEventListener(
	'load',
	function() {
		var a = document.getElementsByClassName("default_message");
		for (var i = 0; i < a.length; i++) {
			if (a[i].innerHTML == "Like") a[i].innerHTML = "Love";
			else if (a[i].innerHTML == "Unlike") a[i].innerHTML = "Unlove";
		}
		a = document.getElementsByClassName("uiUfiLike");

		for (var i = 0; i < a.length; i++) {
			if (a[i].hasChildNodes()) {
				if (a[i].childNodes[0].hasChildNodes()) {
					var b = a[i].childNodes[0].childNodes[1];
					var html = b.innerHTML.replace(/likes/g, "loves").replace(/like/g, "love");
					a[i].childNodes[0].childNodes[1].innerHTML = html;
				}
			}
		}
		}, true
);