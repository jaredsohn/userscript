// ==UserScript==
// @author         rikuo
// @name           icon is added to ReTweet
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    The user's icon is added to ReTweet.
// @include        http://twitter.com/*
// @exclude        http://twitter.com/account/*
// @exclude        http://twitter.com/following*
// @exclude        http://twitter.com/followers*
// @exclude        http://twitter.com/*/following*
// @exclude        http://twitter.com/*/followers*
// ==/UserScript==

var _doc = document;
var query = 'descendant-or-self::li[contains(concat(" ",@class," ")," share ") and not(contains(concat(" ",@class," ")," share-with-details "))]/descendant::a[contains(concat(" ",@class," ")," timestamp-title ")]';

// cf. http://tweetimag.es/
var l = 'http://img.tweetimag.es/i/';

GM_addStyle(<><![CDATA[
	li.share a.timestamp-title{
		padding: 10px 0 3px 27px;
		background-repeat: no-repeat;
		display: -moz-inline-box;	/* for Firefox2 */
		display: inline-box;
	}
	li.share.share-with-details a.timestamp-title{
		padding: 0;
		display: inline;
	}
]]></>);

var filter = function (doc){
	var node = xpath(doc, query);
	if(node.snapshotLength){
		for(var i=0,nl = node.snapshotLength; i < nl; ++i){
			var username = node.snapshotItem(i);
			var userID = username.href.replace(/https?:\/\/twitter.com\//i,'');
			username.style.backgroundImage = 'url('+l+userID+'_m)';
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
