// ==UserScript==
// @author         rikuo
// @name           hiwihhi- converted
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://*
// @exclude        https://*
// ==/UserScript==


var _doc = document;

const twitterRE = /ヒウィッヒヒー?/g;

var hiwihhihi_converted = function (doc){
	var txt = xpath(doc , 'descendant::text()[string-length(normalize-space(self::text())) > 0 and not(ancestor::textarea) and not(ancestor::script) and not(ancestor::style)]');

	for(var i=0,tl=txt.snapshotLength; i<tl; ++i){
		var df,item = txt.snapshotItem(i),
		text = item.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
		parent = item.parentNode, range = document.createRange(),
		newText = text.replace(twitterRE,function(z){
			return "Twitter"
		});

		range.selectNode(item);
		df = range.createContextualFragment(newText);
		parent.replaceChild(df, item);
		range.detach();
	}
}

hiwihhihi_converted(_doc);

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
		docs.forEach(hiwihhihi_converted);
	});
}
function e(id) {
	return _doc.getElementById(id);
}
