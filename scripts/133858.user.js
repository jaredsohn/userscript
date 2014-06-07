// ==UserScript==
// @name           4chan deleted post archive redirector
// @namespace      4chanDeletedPostArchiveRedirector
// @description    Deleted post archive redirector
// @version			1.0.6
// @updateURL		http://userscripts.org/scripts/source/133858.user.js
// @include        https://boards.4chan.org/*
// @include        http://boards.4chan.org/*
// ==/UserScript==


(function() {
	var init, fixQuotes, findTextNodes, getUrl, board;
	
	findTextNodes = function(el) {
		var i, els = [], rec = [];
		for (i = 0; i < el.childNodes.length; i += 1) {			
			if (el.childNodes[i].nodeName.toLowerCase() === "#text") {
				els.push(el.childNodes[i]);
			}
			if (el.childNodes[i].childNodes && el.childNodes[i].childNodes.length > 0) {
				rec = findTextNodes(el.childNodes[i]);
				if (rec && rec.length > 0) {
					els = els.concat(rec);
				}
			}
		}
		return els.length > 0 ? els : false;
	};
	fixQuotes = function(el) {
		var i, j, cn = [], tmp, app, ins, b, u;
		if (el) {
			cn = findTextNodes(el);
			for (i = 0; i < cn.length; i += 1) {
				if (cn[i].parentNode.nodeName.toLowerCase() !== "a") {
					tmp = cn[i].textContent.split(/>{2,3}(\/[a-z0-9]+\/)*([1-9][0-9]*)/i);
					if (tmp.length > 1) {
						app = cn[i].nextSibling;
						for (j = 0; j < tmp.length; j += 1) {
							ins = false;
							if (j % 3 === 1) {
								if (tmp[j]) { b = tmp[j].substr(1, tmp[j].length-2); }
							} else if (j % 3 === 2) {
								u = getUrl(b);
								if (u) { 
									ins = document.createElement("a");
									ins.textContent = ">>"+(b ? ">/"+b+"/" : "")+tmp[j];
									ins.href = u + tmp[j];
									ins.target = "_blank";
								} else {
									ins = document.createTextNode(">>"+(b ? ">/"+b+"/" : "")+tmp[j]);
								}
								b = "";
							} else {
								ins = document.createTextNode(tmp[j]);
							}
							if (ins && ins.textContent.length > 0) {
								if (app) {
									cn[i].parentNode.insertBefore(ins, app);
								} else {
									cn[i].parentNode.appendChild(ins);
								}
							}
						}
						cn[i].parentNode.removeChild(cn[i]);
					}
				}
			}
		}
	};
	
	getUrl = function(b) {
		var url;
		if (!b) { b = board; }
		switch(b) {
			case "jp":
			case "lit":
			case "tg":
			case "vg":
				url = "http://fuuka.warosu.org/"+b+"/?task=post&ghost=&post=";
				break;
			case 'diy':
			case 'g':
			case 'k':
			case 'sci':
				url = "http://archive.installgentoo.net/"+b+"/?task=post&ghost=&post=";
				break;
			case "a":
			case "m":
			case "tv":
			case "u":
			case "v":
				url = "http://archive.foolz.us/"+b+"/search/?submit_undefined=Undefined&text=";
				break;
		}
		return url;
	};
	
	init = function() {
		var posts = document.querySelectorAll(".postMessage"), tmp, url, i, thread;
		
		tmp = location.pathname.split("/");
		board = tmp[1];
		thread = tmp[tmp.length-1];
		if (document.title === "4chan - 404 Not Found" && posts.length === 0) {
			url = getUrl();
			if (url) { location.href = url + thread; }
			else { location.pathname = "/"+board+"/"; }
		} else {
			for (i = 0; i < posts.length; i += 1) {
				fixQuotes(posts[i]);
			}
			document.addEventListener('DOMNodeInserted', function(e) {
				var tmp, i;
				if (e.target.className.indexOf("postContainer") !== -1 || e.target.className.indexOf("post") !== -1) {
					fixQuotes(e.target.querySelector(".postMessage"));
				} else if (e.target.className.indexOf("thread") !== -1) {
					tmp = e.target.querySelectorAll(".postMessage");
					for (i = 0; i < tmp.length; i += 1) {
						fixQuotes(tmp[i]);
					}
				}
			}, false);
		}
	};
	
	if(document.body) { init(); }
	else { window.addEventListener("DOMContentLoaded", init, false); }
}());