// ==UserScript==
// @author         rikuo
// @name           nau-now
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://*
// @exclude        https://*
// ==/UserScript==


var _doc = document;

const twitterRE = /(.?.)?なう/g;

var nau = function (doc){
	var txt = xpath(doc , 'descendant::text()[string-length(normalize-space(self::text())) > 0 and not(ancestor::textarea) and not(ancestor::script) and not(ancestor::style)]');

	for(var i=0,tl=txt.snapshotLength; i<tl; ++i){
		var df,item = txt.snapshotItem(i),
		text = item.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
		parent = item.parentNode, range = document.createRange(),
		newText = text.replace(twitterRE,function(z){
			var t = RegExp.$1;
			// 「見損なう」回避
			if(t == 'そこ' || t.match(/損/)) return t + 'なう';
			return t + 'now';
		});

		range.selectNode(item);
		df = range.createContextualFragment(newText);
		parent.replaceChild(df, item);
		range.detach();
	}
}

nau(_doc);

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
		docs.forEach(nau);
	});
}
function e(id) {
	return _doc.getElementById(id);
}
