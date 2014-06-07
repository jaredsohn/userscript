// ==UserScript==
// @author         rikuo
// @name           all gunma
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://*
// @exclude        https://*
// ==/UserScript==

// cf. http://blog.livedoor.jp/news23vip/archives/3104298.html

var _doc = document;

const re1 = /東京(都)?/g;
const re2 = /都(知事|庁|内)/g;
const re3 = /とうきょう(と)?/g;

var gunma_conversion = function (doc){
	var txt = xpath(doc , 'descendant::text()[string-length(normalize-space(self::text())) > 0 and not(ancestor::textarea) and not(ancestor::script) and not(ancestor::style)]');

	for(var i=0,tl=txt.snapshotLength; i<tl; ++i){
		var df,item = txt.snapshotItem(i),
		text = item.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
		parent = item.parentNode, range = document.createRange(),
		newText = text.replace(re1,function(z){
			return '群馬' + ((RegExp.$1)?'県':'') ;
		}).replace(re2,function(z){
			return '県' + RegExp.$1;
		}).replace(re3,function(z){
			return 'ぐんま' + ((RegExp.$1)?'けん':'') ;
		});
		range.selectNode(item);
		df = range.createContextualFragment(newText);
		parent.replaceChild(df, item);
		range.detach();
	}
}

gunma_conversion(_doc);

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
		docs.forEach(gunma_conversion);
	});
}