// ==UserScript==
// @author         rikuo
// @name           fliter for @tsuda's RT
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://twitter.com/*
// @exclude        http://twitter.com/account/*
// @exclude        http://twitter.com/following*
// @exclude        http://twitter.com/followers*
// @exclude        http://twitter.com/*/following*
// @exclude        http://twitter.com/*/followers*
// ==/UserScript==

var _doc = document;
var query = 'descendant-or-self::li[contains(concat(" ",@class," ")," u-tsuda ") and descendant::span[contains(concat(" ",@class," ")," entry-content ") and starts-with(text(), "RT @" )]]';

var filter = function (doc){
	var node = xpath(doc, query);
	if(node.snapshotLength){
		for(var i=0,nl = node.snapshotLength; i < nl; ++i){
			var tweet = node.snapshotItem(i);
			var parent = tweet.parentNode;
			parent.removeChild(tweet);
		}
	}
}

var section = e('timeline').parentNode;

section.addEventListener('DOMNodeInserted',function(evt){
	var li = evt.target;
	if(li.className && li.className.match(/(mine|hentry)/i)){
		filter(li);
	}
}, false);

section.addEventListener('DOMNodeRemoved',function(evt){
	if(evt.target.parentNode.id.match(/heading/i)){
		filter(e('timeline'));
	}
}, false);

filter(e('timeline'));

function e(id){
	return _doc.getElementById(id);
}
function xpath(context, query){
	return _doc.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	)
}
