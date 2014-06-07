// ==UserScript==
// @author         rikuo
// @name           hiwihhihi-
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://*
// @exclude        https://*
// ==/UserScript==


var _doc = document;

const twitterRE = /twitter|ツイッター|ついったー|とぅいったー|トゥイッター|トゥウィッター/ig;

var hiwihhihi = function (doc){
	var txt = xpath(doc , 'descendant::text()[string-length(normalize-space(self::text())) > 0 and not(ancestor::textarea) and not(ancestor::script) and not(ancestor::style)]');

	for(var i=0,tl=txt.snapshotLength; i<tl; ++i){
		var df,item = txt.snapshotItem(i),
		text = item.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
		parent = item.parentNode, range = document.createRange(),
		newText = text.replace(twitterRE,function(z){
			return "ヒウィッヒヒー"
		});

		range.selectNode(item);
		df = range.createContextualFragment(newText);
		parent.replaceChild(df, item);
		range.detach();
	}
}

if(location.href.match(/^http:\/\/twitter.com\//)){
	var logo = xpath(_doc, 'id("logo")/img').snapshotItem(0);
	// cf. http://twitter.com/k_katsura
	// cf. http://f.hatena.ne.jp/k_katsura/20090723033905
	if(logo) logo.src = 'http://img.f.hatena.ne.jp/images/fotolife/r/rikuo/20090723/20090723183115.png';
}

hiwihhihi(_doc);

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
		docs.forEach(hiwihhihi);
	});
}
function e(id) {
	return _doc.getElementById(id);
}
