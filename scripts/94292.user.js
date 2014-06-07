// ==UserScript==
// @name          /mu/ + youtube
// @namespace     http://lucidchan.org
// @description   Looks at all youtube links currently posted on /mu/ and put them into a single place where you can view them.
// @include       http://boards.4chan.org/mu/*
// @include       http://www.boards.4chan.org/mu/*
// @author	  minute
// @version       1.0.1
// ==/UserScript==

(function() {
	
	var youtube = document.createElement("input");
	youtube.setAttribute("type", "button");
	youtube.setAttribute("name", "youtube");
	youtube.setAttribute("value", "Youtube Links");
	
	function setup() {
		document.getElementById("header").appendChild(youtube);
	}
	function readPosts(postURL, win) {
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: postURL,
			onload: function(response) {
				var regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/g;
				var matches = response.responseText.match(regex);
				if (matches != null) {
					for (var i = 0; i < matches.length; i++) {
						var youtubeID = matches[i].match(/http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/)[1];
						win.document.write(".");
						win.document.write("<iframe class='youtube-player' type='text/html' width='300' height='300' src='http://www.youtube.com/embed/"+youtubeID+"' frameborder='0'></iframe>");
					}
				}
			}
		});
	}
	function readPage(link, win) {
	
		GM_xmlhttpRequest({
			method: 'GET',
			url: link,
			headers: {
			   'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			   'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(response) {
				var matches = response.responseText.match(/\[<a href="res\/(\d+)">Reply<\/a>\]/g);
				for (var i = 0; i < matches.length; i++) {
					var postURL = 'http://boards.4chan.org/mu/res/' + matches[i].match(/\[<a href="res\/(\d+)">Reply<\/a>\]/)[1];
					readPosts(postURL, win);
				}
			}
		});
	}
	function getYoutubeLinks() {
		var counter = 0;
		youtube.addEventListener("click", (function() {
		
			document.getElementById("header").removeChild(youtube);
		
			var win = window.open("", "Youtube Links", "width=1000,height=400,scrollbars=yes");
			win.document.close();
			win.document.open();
			win.document.write("Page: " + counter);
			readPage('http://boards.4chan.org/mu/' + counter, win);
			var next = document.createElement("input");
			next.setAttribute("type", "button");
			next.setAttribute("value","Next Page");
			next.addEventListener("click", (function() {
				counter++;
				if (counter <= 15) {
					win.document.close();
					win.document.open();
					win.document.write("Page: " + counter);
					readPage('http://boards.4chan.org/mu/' + counter, win);
				} else {
					counter = 15;
				}
			}),false);
			var back = document.createElement("input");
			back.setAttribute("type", "button");
			back.setAttribute("value","Previous Page");
			back.addEventListener("click", (function() {
				counter--;
				if (counter >= 0) {
					win.document.close();
					win.document.open();
					win.document.write("Page: " + counter);
					readPage('http://boards.4chan.org/mu/' + counter, win);
				} else {
					counter = 0;
				}
			}),false);
			document.getElementById("header").appendChild(back);
			document.getElementById("header").appendChild(next);
		}),
		false);
	}
	setup();
	getYoutubeLinks();
})();