// ==UserScript==
// @name           @games benri tools
// @namespace      makinami_
// @include        http://*.atgames.jp/*
// ==/UserScript==
(function (d, func) {
	if (!window.jQuery) {
		var h = d.getElementsByTagName('head')[0];
		var s1 = d.createElement("script");
		s1.setAttribute("src", "http://www.atgames.jp/atgames/html/common/js/lib/jquery.js");
		s1.addEventListener('load', function() {
			var s2 = d.createElement("script");
			s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
			h.appendChild(s2);
		}, false);
		h.appendChild(s1);
	//google +1ライブラリ
	(function(){
	var h = d.getElementsByTagName('head')[0];
	var s1 = d.createElement("script");
	s1.setAttribute("src", "https://apis.google.com/js/plusone.js");
	s1.textContent = "{lang: 'ja'}";
	h.appendChild(s1);
	})();

	}
})(document, function($) {
//start
try{
var yourid = document.getElementById('myAvatarWindow').src;
yourid = yourid.match(/[0-9]+/);
}
catch(e){}
var makinamiTools;
makinamiTools = '<div id="makinamiTools" class="mod_contextColumnUnit01">\
<header class="header">\
<h2 class="mod_contextColumnUnit01_2011parts titlemypage devicetitle">便利ツール</h2>\
<!--//header -->\
</header>\
<div class="inner">\
<ul class="list01rv">\
<li><a href="http://image2.atgames.jp/selfy.swf?account_id=' + yourid + '&bgFlg=1&pBaseURL=http://img.atgames.jp/" target="_blank">自分のセルフィをブランクで開く</a></li>\
<li>サイト検索ツール<form action="http://www.google.co.jp/search"><input type="text" name="q" style="width: 145px;"><input type="hidden" name="as_sitesearch" value="atgames.jp"><input style="width:150px;" type="submit" value="検索"></form></li>\
<li><script src="http://platform.twitter.com/widgets.js" type="text/javascript"></script><a href="http://twitter.com/share" class="twitter-share-button">Tweet</a><g:plusone></g:plusone><a href="http://b.hatena.ne.jp/entry/' + encodeURIComponent(location.href) + '" class="hatena-bookmark-button" data-hatena-bookmark-title="' + document.title + '" data-hatena-bookmark-layout="standard" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only.gif" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>\
<iframe src="http://www.facebook.com/plugins/like.php?href=' + encodeURIComponent(location.href) + '&amp;send=false&amp;layout=standard&amp;width=170&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:170px; height:80px;" allowTransparency="true"></iframe>\
<a href="http://mixi.jp/share.pl" class="mixi-check-button" data-key="07d801df3989e0832a1b7008c24e3caece3f9c44" data-url="' + encodeURIComponent(location.href) + '" data-button="button-1">Check</a>\
<script type="text/javascript" src="http://static.mixi.jp/js/share.js"></script>\
<iframe src="http://plugins.mixi.jp/favorite.pl?href=' + encodeURIComponent(location.href) + '&service_key=07d801df3989e0832a1b7008c24e3caece3f9c44" scrolling="no" frameborder="0" allowTransparency="true" style="border:0; overflow:hidden; width:170px; height:30px;"></iframe>\
</li>\
</ul>\
<!--//inner -->\
</div>\
<!--//mod_contextColumnUnit -->\
</div>';
//ユニット入れ込み
jQuery('div.mod_profileavatar02').after(makinamiTools);
});