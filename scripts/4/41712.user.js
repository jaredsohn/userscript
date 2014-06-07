// ==UserScript==
// @name           mykillfile
// @namespace      yglesias
// @description    MY Think Progress Kill File
// @include        http://yglesias.thinkprogress.org/*
// ==/UserScript==

// Names now regular expressions so they should look like:
// /yglesi/		- match a part of name
// /^mygles/	- match start of name
// /lesias$/	- match end of name
// /^myglesias$/	- match entire name
// /\uABCD/		- match unicode character ABCD (hexadecimal)

// List the posters you want to block below, enclosed in between a set of forward slashes. 
// Separate multiple posters with commas
var idiots  = [/poster1/, /poster2/, /poster3/];

// If you want "peek" at the blocked user's post, change the peek variable to 1 instead of 0. 
// Then, put your cursor over the "An idiot" and the post will pop up.
var peek = 0;

var posts;
// get all posts
posts = document.evaluate("//*[@class='commentlist']/li",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		//XPathResult.ANY_TYPE,
		null);

for (var i = 0; i < posts.snapshotLength; i++) {
	var thisLink = posts.snapshotItem(i);
	var kids = thisLink.childNodes;

	// starting at 0, child node 1 is poster's name, and post body starts with child node 7
	var poster = kids[1].textContent;
	for (var j = 0; j < idiots.length; j++) {
		var idiot = idiots[j]
		if (poster.match(idiot)) {
			var msg = kids[7];
			var replacedPoster = kids[1].textContent;
//			alert('<a style="none" title="' + replacedPoster + '">An idiot</a>');
			var peekPost = '';
			for (var k = 7; k < kids.length; k += 2) {
				peekPost += kids[k].textContent + "\n";
				kids[k].innerHTML = "</p>";
			}
			if (peek) {
				peekPost.replace(/undefined/, "");
				kids[1].innerHTML = '<a style="none" title="' + replacedPoster + ': ' + peekPost + '">An idiot</a>';
			} else {
				kids[1].innerHTML = '<a style="none" title="' + replacedPoster + '">An idiot</a>';
			}
		}
	}
}