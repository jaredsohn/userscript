// ==UserScript==
// @name           4chan useful page (tab) title
// @namespace      4chanUsefulPageTtabTitle
// @description		Tries to get a useful thread title out of the thread's posts and shows it as the title tag
// @version			1.0.1
// @include        http://boards.4chan.org/*/res/*
// @include        https://boards.4chan.org/*/res/*
// ==/UserScript==


(function() {
	var init, findInfo;
	
	findInfo = function(el) {
		var tmp, tmp2, ret = false, i;
		if (el) {
			if ((tmp = el.querySelector(".subject")) && tmp.textContent.length !== 0) {
				ret = tmp.textContent;
			} else if ((tmp = el.querySelector(".postMessage")) && tmp.innerHTML.length !== 0) {
				tmp2 = document.createElement("div");
				tmp2.innerHTML = tmp.innerHTML.replace("<br>", "\n");
				tmp = tmp2.textContent.split("\n");
				i = 0;
				ret = tmp[i];
				while ((!ret || /^>>[0-9]+/.test(ret)) && tmp[i+1]) {
					i += 1;
					ret = tmp[i];
				}
				if (ret.length > 50) {
					ret = ret.substr(0, 49) + "...";
				} 
			}
		}
		return ret;
	};	
	init = function() {
		var board = location.pathname.split("/")[1],
			posts = document.querySelectorAll(".postContainer"),
			title, i = 0, insFunc;
		
		while (!title && posts[i]) {
			title = findInfo(posts[i]);
			i += 1;
		}
		if (title) { document.title = title + " (/"+board+"/)"; }
		else {
			insFunc = function(e) {
				if (!title && (e.target.className.indexOf("postContainer") !== -1 || e.target.className.indexOf("post") !== -1) && (title = findInfo(e.target))) {
					document.title = title + " (/"+board+"/)";
					document.removeEventListener('DOMNodeInserted', insFunc, false);
				}
			};
			document.addEventListener('DOMNodeInserted', insFunc, false);
		}
	};
	if(document.body) { init(); }
	else { window.addEventListener("DOMContentLoaded", init, false); }
}());