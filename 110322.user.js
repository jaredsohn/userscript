// ==UserScript==
// @id             reddit_autolink@ulfurinn.net
// @version        0.3
// @name           reddit_autolink
// @namespace      http://userscript.ulfurinn.net/
// @author         Valeri Sokolov <ulfurinn@ulfurinn.net> http://ulfurinn.net/
// @description    Turns mentions of subreddits into links.
// @include        http://reddit.com/r/*
// @include        http://www.reddit.com/r/*
// ==/UserScript==

function rewrite(text) {
	var match;
	var before, subreddit, after;
	var next;
	var par = text.parentNode;
	if(( match = /(?:\b|\/)r\/\w+(\.\w+)?/.exec( text.textContent ) )) {
		before = text.textContent.substring(0, match.index);
		subreddit = match[0];
		after = text.textContent.substring( match.index + match[0].length );
		if(subreddit[0] != '/')
			subreddit = '/' + subreddit;
		var replacement = par.replaceChild( document.createTextNode(before), text );
		var link = document.createElement("a");
		var tail = document.createTextNode( after );
		link.setAttribute("href", subreddit);
		link.appendChild( document.createTextNode(subreddit) );
		if((next = replacement.nextSibling)) {
			par.insertBefore(link, next);
			par.insertBefore(tail, next);
		}
		else {
			par.appendChild(link);
			par.appendChild(tail);
		}
		rewrite( tail );
	}
}

function processTexts(comment) {
	//GM_log("Processing: " + comment.textContent);
	var children = document.evaluate(".//*[not(self::a)]/text()", comment, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for( var i = 0 ; i < children.snapshotLength ; i++ ) {
		rewrite( children.snapshotItem(i) );
	}
}

var paths = [ "//div[contains( @class, 'entry' )]//div[@class = 'usertext-body']" ];

paths.forEach(function(path) {
		//GM_log("Working with path " + path);
		var comments = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		//GM_log("items: " + comments.snapshotLength);
		for ( var i=0 ; i < comments.snapshotLength; i++ ) {
			var comment = comments.snapshotItem(i);
			//GM_log(comment.textContent);
			if( /(?:\b|\/)r\/\w+(\.\w+)?/.test( comment.textContent ) )
				processTexts( comment );
		}
});
