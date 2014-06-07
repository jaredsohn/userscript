// ==UserScript==
// @name           4chan deleted post/thread archive redirector
// @namespace      idklol
// @description    If a thread has 404'd on the specified boards, it redirects you to the thread on the archiver. Note: Only works on /g/,/tv/,/jp/,/a/,/m/, and /tg/. 
// @include        http://boards.4chan.org/*
// ==/UserScript==
//Need a better name and description. 
(function () {

	function $(S) {
		return document.querySelectorAll(S)
	}
	
	var boards = ["lit", "tv", "a", "jp", "m", "tg"];
	var board = location.pathname.split("/")[1]
	var ThreadID = location.pathname.split("/")[3];
	var URL = (board == "tv") || (board == "lit") ? "http://green-oval.net/cgi-board.pl/" + board + "/thread/" : "http://archive.easymodo.net/cgi-board.pl/" + board + "/thread/";
	for (x in boards) {
		if ((document.title == "4chan - 404") && (location.pathname.indexOf(boards[x] + "/res/") != -1)) {
			location.href = URL + ThreadID;
		} 
		if (location.pathname.indexOf("/" + boards[x] + "/") != -1) {
			function X() {
				var quotes = $(".unkfunc");
				for (var i = 0; i < quotes.length; i++) {
					if ((quotes[i].textContent.search(/\>\>\d+/) != -1) && (quotes[i].firstChild.nodeName != "A")) {
						var DeletedID = quotes[i].textContent.match(/\d+/)[0];
						quotes[i].innerHTML = "<a href='" + URL + DeletedID + "' target='_blank'>" + quotes[i].textContent + " </a>";
					}
				}
			}
			X()
			addEventListener("DOMNodeInserted", function (e) {
				var target = e.target;
				if (target.nodeName == "TABLE") {
					X()
				}
			}, true);
		}
	}
})()