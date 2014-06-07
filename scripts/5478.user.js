// ==UserScript==
// @name          Webcat Search by Library Ajax Ver.
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description   shows whether specified library has a book or not on Webcat detail page
// @include       http://webcatplus-equal.nii.ac.jp/libportal/DocDetail*
// @version       1.0
// ==/UserScript==

(function(){
	var liblist = {'JAXA':'\u5b87\u5b99\u822a\u7a7a\u7814\u7a76\u958b\u767a\u6a5f\u69cb \u672c\u793e\u56f3\u66f8\u9928',
	               '\u611b\u6dd1\u5927\u661f\u304c\u4e18':'\u611b\u77e5\u6dd1\u5fb3\u5927\u5b66 \u56f3\u66f8\u9928 \u661f\u304c\u4e18\u5206\u9928',
	               '\u962a\u5e9c\u5927\u7fbd':'\u5927\u962a\u5e9c\u7acb\u5927\u5b66 \u7fbd\u66f3\u91ce\u56f3\u66f8\u30bb\u30f3\u30bf\u30fc',
	               };
	/*
	var liblist = {'JAXA':'宇宙航空研究開発機構 本社図書館',
	               '愛淑大星が丘':'愛知淑徳大学 図書館 星が丘分館',
	               '阪府大羽':'大阪府立大学 羽曳野図書センター',
	               };
	Unicodeエスケープしてください。http://piro.sakura.ne.jp/latest/entries/mozilla/xul/2005-09-28_unicode-escape.files/unicode.xul参照
	*/
	var ncid = location.href.match(/NCID(%3A|:)(.{10})$/)[2];
	var query = "//a[@href='/libportal/HolderList?txt_docid=NCID%3A" + ncid + "']";
	var insert_point = document.evaluate(query, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	var showlibrarylist = '';
	var insertobject = document.createElement('p');

	GM_xmlhttpRequest({
		method:"GET",
		url:"http://webcatplus-equal.nii.ac.jp/libportal/HolderList?txt_docid=NCID%3A" + ncid,
		onload:function(details){
			for(var key in liblist){
				if(details.responseText.match(key)){
					showlibrarylist += '<li>' + liblist[key] + '</li>';
				}
			}
			if(showlibrarylist){
				insertobject.innerHTML = '\u3053\u306e\u672c\u306f<ul>' + showlibrarylist + '</ul>\u306b\u3042\u308a\u307e\u3059\u3002';
				//この本は[図書館リスト]にあります。
			}
			else{
				insertobject.innerHTML = '\u3053\u306e\u672c\u306f\u767b\u9332\u3055\u308c\u3066\u3044\u308b\u56f3\u66f8\u9928\u306b\u306f\u3042\u308a\u307e\u305b\u3093\u3002';
				//この本は登録されている図書館にはありません。
			}
			insert_point.parentNode.insertBefore(insertobject, insert_point.nextSibling);
		}
	});
})();