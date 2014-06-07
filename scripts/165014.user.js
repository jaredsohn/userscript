// ==UserScript==
// @name        Twitter Gomeifuku Changer
// @namespace   http://twitter.com/teraminato
// @description ご冥福　を おつかれ　に置き換えて、感謝の気持ちから宗教観を薄めます。 (Based on hiwihhihi by rikuo)
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @author      Teraminato
// @version     0.0.1
// ==/UserScript==

var _doc = document;

const twitterRE = /御冥福|ご冥福|御めいふく|ごめいふく|冥福|めいふく/ig;

var gomeifuku = function (doc){
	var txt = xpath(doc , 'descendant::text()[string-length(normalize-space(self::text())) > 0 and not(ancestor::textarea) and not(ancestor::script) and not(ancestor::style)]');

	for(var i=0,tl=txt.snapshotLength; i<tl; ++i){
		var df,item = txt.snapshotItem(i),
		text = item.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
		parent = item.parentNode, range = document.createRange(),
		newText = text.replace(twitterRE,function(z){
			return "おつかれ"
		});

		range.selectNode(item);
		df = range.createContextualFragment(newText);
		parent.replaceChild(df, item);
		range.detach();
	}
}

gomeifuku(_doc);

function xpath(context, query){
	return _doc.evaluate(
		query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	)
}

if(window.AutoPagerize) {
	boot();
}else{
	window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
}

function boot(){
	window.AutoPagerize.addFilter(function(docs){
		docs.forEach(gomeifuku);
	});
}
function e(id) {
	return _doc.getElementById(id);
}
