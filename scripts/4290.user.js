// ==UserScript==
// @namespace     http://www.splintor.com/userscript
// @name          Color Glob Posts
// @description   Change the glob posts colors based on writer. Edit the script to change the color for each writer.
// @include       http://*popup.co.il*
// ==/UserScript==

var writers = {
	Yuval: { color: "blue",		    name: "\u05D9\u05D5\u05D1\u05DC" },
	Mosif: { color: "orange",		name: "\u05DE\u05D5\u05E1\u05D9\u05E3" },
	Tamar: { color: "red",		    name: "\u05EA\u05DE\u05E8" },
	Johny: { color: "turquoise",    name: "\u05D2\u0027\u05D5\u05E0\u05D9 \u05D3\u05D5" },
	Roesh: { color: "purple",		name: "\u05E8\u05D5\u05D0\u05D4 \u05E9\u05D7\u05D5\u05E8\u05D5\u05EA" },
	Yalda: { color: "pink",			name: "\u05D9\u05DC\u05D3\u05D4" }
}

// update automatically -  // see http://userscripts.org/scripts/show/2296 for details
try {
	window.addEventListener("load", function () { try {
		(unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates({
			name: "Color Glob Posts",
			namespace: "http://www.splintor.com/userscripts",
			//description: "",
			source: "http://userscripts.org/scripts/show/4290",
			identifier: "http://userscripts.org/scripts/source/4290.user.js",
			version: "0.1",
			date: (new Date(2007, 8 - 1, 20)).valueOf()
		});
	} catch (ex) {} }, false);
} catch (ex) {}

var docTitle = "   \u00BB \u05E0\u05DB\u05EA\u05D1 \u05E2\"\u05D9 $author"; // "written by $author"

// to get a writer name in Javascript encoding, run the following expression in Firebug:
//   var a = "<writer name>".split(""); for(var i = 0; i < a.length; ++i) a[i] = "\\u" + ("0000" + a[i].charCodeAt(0).toString(16).toUpperCase()).slice(-4); a.join("");

var d = document;

function getStyleString()
{
	var result = [];
	var style = ".$writer small, .$writer H2 a { color: $color; } .$writer { padding-right: 10px; border-right: solid 3px $color; }";
	for(writer in writers)
		result.push(style.replace(/\$writer/g, writer).replace(/\$color/g, writers[writer].color));

	return result.join("");
}


var newStyleElement = d.createElement("style");
newStyleElement.innerHTML = getStyleString();
document.getElementsByTagName("head")[0].appendChild(newStyleElement);
var posts = d.evaluate('//div[@class="post"]', d, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < posts.snapshotLength; ++i)
{
	var post = posts.snapshotItem(i);
	var postTitle = post.getElementsByTagName("small")[0];
	if(postTitle)
		for(writer in writers)
			if(postTitle.innerHTML.indexOf(writers[writer].name) != -1)
				post.className += " " + writer;
}

if(posts.snapshotLength == 1)
{
	var singlePost = posts.snapshotItem(0);
	var singlePostClasses = singlePost.className.split(" ");
	d.getElementById("content").className += " " + singlePostClasses[1];
	document.title += docTitle.replace(/\$author/g, writers[singlePostClasses[1]].name);
	singlePost.className = singlePostClasses[0];
}
