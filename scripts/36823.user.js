// ==UserScript==
// @name           add words for HatenaBookmark
// @author         rikuo
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    add words(ex. ...but I love you) for Hatena Bookmark Comment
// @include        http://b.hatena.ne.jp/entry/*
// ==/UserScript==
//
// http://userscripts.org/scripts/show/36823
//
// origin1 http://anond.hatelabo.jp/20080302214727
// origin2 http://anond.hatelabo.jp/20080308200619
// cf. http://twitter.com/yoneko/statuses/998347523
// cf. http://twitter.com/yoneko/statuses/998349628



// 末尾に追加する言葉
var AddWords = '・・・でも好きだよ！';

var filters = [

// 追記するブックマークのコメントを選択する条件を設定します。正規表現も可。
	'これはひどい',
	/バカ|馬鹿|あほ|アホ/,
	/ダメ/,

// ユーザーの指定 例 id:hoge
	'id:foo',
	'id:bar',
];


//*-----------------------------------------------------------------------------*//


var _doc = document,
bid = _doc.getElementById('bookmarked_user');

if(!bid)return;
var comment = 'li[not(contains(concat(" ",@class," "),"nocomment"))]/span[@class="comment"]';
filterComment();

function filterComment(){
	if(!filters.length)return;
	for(var i=0,f=filters.length; i<f; ++i){
		var filter = filters[i];
		var type = typeof filter;
		var regexp,xpath,UserID;
		if(type == 'string' && filter.match(/^id:([a-zA-Z][0-9a-zA-Z\-_]{2,30})/)){
			UserID = RegExp.$1;
		}else{
			xpath = comment;
			if(type == 'function'){
				regexp = filter;
			}else{
				regexp = new RegExp(_r(filter),'i');
			}
		}

		var nodes = makexpath(bid,xpath);
		for(var j=0,n=nodes.snapshotLength; j<n; ++j){
			var node = nodes.snapshotItem(j);
			var text = node.textContent;
			var liid = node.parentNode.id;
			var words = new RegExp(AddWords+'$');

			if( liid.match(RegExp('bookmark-user-' + UserID + '$')) || text.match(regexp)){
	        		if(!text.match(words)){
	          			node.insertBefore(_doc.createTextNode(AddWords),
					makexpath(node,'span[@class="hatena-star-star-container"]').snapshotItem(0));
	        		}
			}
		}
	}
}

function makexpath(context, query){
	return _doc.evaluate(
		query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
}

function _r(str){
	var r = (str + '').replace(/([\/()[\]{}|*+-.,^$?\\])/g, "\\$1");
	return r;
}
