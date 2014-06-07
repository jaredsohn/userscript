// ==UserScript==
// @id             won-format
// @name           World of Notch - Formatting
// @namespace      red-sheep.de
// @author         flying sheep
// @description    Formats Notch’s blog to contain e.g. bulleted lists
// @include        http://notch.tumblr.com/*
// ==/UserScript==
GM_addStyle(".postcontent ul {margin-left: 1.5em}");
var post = document.getElementsByClassName("postcontent")[0];

var newPars = new Array();
for each (var par in post.getElementsByTagName("p")) {if (par.nodeName) {
	var repl;
	if (par.firstChild === par.lastChild
		&& par.firstChild.tagName
		&& par.firstChild.tagName.toLowerCase() == "strong") {
		repl = document.createElement("h3");
		repl.innerHTML = par.firstChild.innerHTML;
	} else {
		var lines = par.innerHTML.split(/<br\s?\/?>/);
		repl = document.createElement("p");
		var list;
		for (var l=0; l<lines.length; l++) {
			var line = lines[l];
			if(/^\*\s/.test(line)) {
				if (!list) list = document.createElement("ul");
				var li = document.createElement("li");
				li.innerHTML = line.substring(2);
				list.appendChild(li);
			} else {
				if (list) {
					repl.appendChild(list);
					list = null;
				} else {
					var raw = document.createElement("div");
					raw.innerHTML = line;
					repl.appendChild(raw);
				}
			}
		}
		if (list) {
			repl.appendChild(list);
			list = null;
		}
	}
	newPars.push({"par": par, "repl":repl});
}}

newPars.forEach(function(pr) {
	pr.par.parentNode.replaceChild(pr.repl, pr.par);
});