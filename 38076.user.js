// ==UserScript==
// @name            中国影视库视频搜索
// @namespace       http://userscripts.org/users/74146
// @description     为中国影视库(www.mdbchina.cn)的影片列表增加谷歌视频、土豆、迅雷等视频搜索链接。
// @include         http://www.mdbchina.cn/*
// @version         0.4
// @author          Yale Huang
// ==/UserScript==

var GlobalStyle = new(function() {
	this.add = function (css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	};
})();

var VideoSearchLinkBuilder = [
	function (text){
		// Google CN video
		return '<a href="http://video.google.cn/videosearch?q=' + encodeURI(text) +
			'&www_google_domain=www.google.cn&emb=0#" target="_blank">谷歌视频</a>';
	},

	function (text) {
		// Tudou video
		return '<a href="http://so.tudou.com/isearch/' + encodeURI(text) + '" target="_blank">土豆视频</a>';
	},

	function (text) {
		// Tudou playlist
		return '<a href="http://so.tudou.com/psearch/' + encodeURI(text) + '" target="_blank">土豆豆单</a>';
	},

	function (text) {
		// Gougou
		return '<a href="http://www.gougou.com/search?id=1&search=' + encodeURI(text) + '" target="_blank">狗狗</a>';
	},

	function (text) {
		// Gougou BT
		return '<a href="http://www.gougou.com/search?ty=1&search=' + encodeURI(text) + '" target="_blank">狗狗BT</a>';
	},

	function (text) {
		// Gougou eMule
		return '<a href="http://www.gougou.com/search?ty=2&search=' + encodeURI(text) + '" target="_blank">狗狗eMule</a>';
	},

	function (text) {
		// Youku video
		return '<a href="http://so.youku.com/search_video/q_' + encodeURI(text) + '" target="_blank">优酷</a>';
	},

	function (text) {
		// Youku playlist
		return '<a href="http://so.youku.com/search_playlist/q_' + encodeURI(text) + '" target="_blank">优酷列表</a>';
	}
];

var SearchMenu = new (function() {
	this.build = function(photolist) {
		for (var i=0; i<photolist.snapshotLength; i++) {
			var photo = photolist.snapshotItem(i);
		        var img = photo.getElementsByTagName("img").item(0);
			var title = img.attributes.getNamedItem("alt").value;
	
			var search_div = document.createElement("div");
			search_div.setAttribute("class", "mdbchina_playlist");
						var s = '<ul><li><a href="">Search it <font color="red"><b>!</b></font></a><ul>';

			for (var n=0; n<VideoSearchLinkBuilder.length; n++) {
		                s += '<li>' + VideoSearchLinkBuilder[n](title) +'</li>';
			}
	
		        s += '</ul></li></ul>';
			search_div.innerHTML = s;
			photo.appendChild(search_div);
		}
	};
})();

GlobalStyle.add(' \
.mdbchina_playlist{font-size:12px;position:relative;z-index:100;} \
.mdbchina_playlist ul{list-style:none;}    \
.mdbchina_playlist li {float:left;position:relative;}    \
.mdbchina_playlist ul ul {visibility:hidden;position:absolute;left:3px;top:23px;}    \
.mdbchina_playlist table {position:absolute; top:0; left:0;}    \
.mdbchina_playlist ul li:hover ul,   \
.mdbchina_playlist ul a:hover ul{visibility:visible;}    \
.mdbchina_playlist a{display:block;border:1px solid #aaa;background:#222;padding:2px 10px;margin:3px;color:#fff;text-decoration:none;}    \
.mdbchina_playlist a:hover{background:gray;color:white; background:#666; ;border:1px solid white;}    \
.mdbchina_playlist ul ul{}    \
.mdbchina_playlist ul ul li {clear:both;text-align:left;font-size:12px;}    \
.mdbchina_playlist ul ul li a{display:block;width:100px;height:13px;margin:0;border:0;border-bottom:1px solid white;}    \
.mdbchina_playlist ul ul li a:hover{border:0;background:#gray;border-bottom:1px solid #fff;}   \
');

var xpaths = [["//div[@class='photo_list']", "img", "alt"],
		["//div[@class='movie_photo']", "img", "alt"],
		["//div[@class='page_big_photo']", "img", "alt"],
		["//li/a[@class='mdbhb_img']/..", "img", "alt"]];

for (var i=0; i<xpaths.length; i++) {
	var photolist = document.evaluate(
	    xpaths[i][0],
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);

	SearchMenu.build(photolist);
}

// END FILE
