// ==UserScript==
// @author         rikuo
// @name           changed to the iPad's Icon
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    All icons of twitter are changed to the iPad's pictures
// @include        http://twitter.com/*
// @exclude        http://twitter.com/account/*
// @exclude        http://twitter.com/following*
// @exclude        http://twitter.com/followers*
// @exclude        http://twitter.com/*/following*
// @exclude        http://twitter.com/*/followers*
// ==/UserScript==

var _doc = document;

var elm = 'descendant::span[contains(concat(" ",@class," ")," thumb ")]/a[not(descendant::img[contains(concat(" ",@class," ")," iPad-icon ")])]';

GM_addStyle(<><![CDATA[

.tweet-url.profile-pic.url{
  position:relative;
}

ol.statuses .thumb img:first-child{
  position: absolute;
  top: 36px;
  left: 8px;
  height: 23px;
  width: 16px;
}
.iPad-icon{
  position: absolute;
  top: 14px;
}
ol.statuses .search_result .thumb img:first-child{
  top: 21px;
}
.search_result .iPad-icon{
  top: 0px;
}

]]></>);

var data = 'data:image/png;base64,'+
    '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';

var iPadIcon = c('img');
iPadIcon.width = '48';
iPadIcon.height = '48';
iPadIcon.className = 'iPad-icon';
iPadIcon.src = data;


var filter = function (doc){
	var node = xpath(doc, elm);
	if(!node.snapshotLength)return;
	for(var i=0,nl = node.snapshotLength; i < nl; ++i){
		var author = node.snapshotItem(i);
		var Icon = iPadIcon.cloneNode(true);
		author.appendChild(Icon);
	}
}

if(!e('timeline'))return;
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
function c(tag_name) {
	return _doc.createElement(tag_name);
}

