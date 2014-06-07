// ==UserScript==
// @name		POLEIGNORER
// @version		2.4
// @namespace	dummy
// @description	Elimina poles segun la base de datos
// @include		http://www.elotrolado.net/*
// @match		http://www.elotrolado.net/*
// ==/UserScript==

var NeverIgnore = [];
var AlwaysIgnore = [];

// PORTIONS FROM c2.js
// c2.js
// Marcos Vives Del Sol - 20/X/2012

if (Array.prototype.addAll == undefined) {
	Array.prototype.addAll = function(toAdd) {
		var ret = this.slice(0);
		toAdd.forEach(function(i) {
			ret.push(i);
		});
		return ret;
	};
};

if (Array.prototype.removeAll == undefined) {
	Array.prototype.removeAll = function(toRemove) {
		return this.filter(function(i) {
			return toRemove.indexOf(i) == -1;
		});
	};
};

var now = function() {
	return (new Date()).getTime();
};

var HTTPGET = function(url, callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url, true);

	req.onreadystatechange = function() {
		if (req.readyState == 4) callback(req);
	};
	req.send();
};

// END OF PORTIONS

var getNicks = function() {
	console.log("POLEIGNORER: Actualizando lista...");
	
	var handler = function(req) {
		if (req.status != 200) {
			console.log("POLEIGNORER: El servidor ha devuelto un error " + req.status);
			return;
		};
		
		var start = req.responseText.indexOf("||PI||") + 6;
		var end = req.responseText.indexOf("||", start);
		if (start < 6 || end < 0) {
			console.log("POLEIGNORER: No se ha encontrado los marcadores de POLEIGNORER");
			return;
		};
		
		var names = req.responseText.substring(start, end);
		console.log(names);
		localStorage["poleignorer-names"] = names;
		localStorage["poleignorer-lastupdate"] = now();
	};

	HTTPGET("http://www.elotrolado.net/hilo__1666986", handler);
};

if (
	(localStorage["poleignorer-lastupdate"] == undefined) ||
	(now() - localStorage["poleignorer-lastupdate"] > 5 * 60 * 1000)
) getNicks();

var ignore = new Array();
if (localStorage["poleignorer-names"] != undefined) {
	ignore = localStorage["poleignorer-names"].split("|").removeAll(NeverIgnore);
};
ignore = ignore.addAll(AlwaysIgnore)

console.log(ignore);

if (location.href.indexOf("http://www.elotrolado.net/hilo_") == 0) {
	var post;
	var quote;

	var postCount = 0;
	var userCount = 0;
	var quoteCount = 0;

	var useless = false;

	var postAuthor = "";
	var quoteAuthor = "";

	var post = document.getElementsByClassName("post");
	for (postCount = 0; postCount < post.length; postCount++) {
		useless = false;
		try {
			if (post[postCount].getElementsByClassName("ignore").length > 0) {
				useless = true;
			} else {
				postAuthor = post[postCount].getElementsByClassName("author")[0].getElementsByTagName("a")[0].innerHTML;
				useless = (ignore.indexOf(postAuthor) != -1);
			};
			if (useless) {
					post[postCount].style.display = "none";
			} else {
					var quote = post[postCount].getElementsByClassName("content")[0].getElementsByTagName("blockquote");
					for (quoteCount = 0; quoteCount < quote.length; quoteCount++) {
						quoteAuthor = quote[quoteCount].getElementsByTagName("cite")[0].innerHTML;
						quoteAuthor = quoteAuthor.substr(0, quoteAuthor.lastIndexOf(" "));
						if (ignore.indexOf(quoteAuthor) != -1) {
							quote[quoteCount].innerHTML = "<center>...</center>";
							break;
						};
					};
			};
		} catch(e) { };
	};
} else if (location.href.indexOf("http://www.elotrolado.net/foro_") == 0) {
	var post;

	var postCount = 0;
	var userCount = 0;

	var post = document.getElementsByClassName("row");
	for (postCount = 0; postCount < post.length; postCount++) {
		try {
			postAuthor = post[postCount].getElementsByTagName("dt")[0].getElementsByTagName("a");
			postAuthor = postAuthor[postAuthor.length - 1].innerHTML;
			if (ignore.indexOf(postAuthor) != -1) {
				post[postCount].style.display = "none";
				break;
			};
		} catch(e) { };
	};
};
