// ==UserScript==
// @name           atgames bookmark
// @namespace      makinami_
// @description    bookmark unit
// @include        http://www.atgames.jp/*
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
	}
})(document, function($) {
//start
	var ib;
	ib = '<div id="makinamiBookmark" class="mod_contextColumnUnit01" style="position:absolute;right:-205px;">\
<header class="header">\
<h2 class="mod_contextColumnUnit01_2011parts titlemypage devicetitle">ブックマーク</h2>\
<ul class="absBtn">\
<li><input style="font-size:9px;" class="addurl" type="button" value="追加"></li>\
</ul>\
<!--//header -->\
</header>\
<div class="inner">\
<ul class="list01rv">\
</ul>\
<input style="font-size:9px;" class="alldelete" type="button" value="全部消す">\
<!--//inner -->\
</div>\
<!--//mod_contextColumnUnit -->\
</div>';


//ブクマユニット入れ込み
	jQuery('div.mod_userContextBtn02').before(ib);

//
	if (jQuery('#makinamiBookmark div.inner ul.list01rv li').length == 0) {
		jQuery('#makinamiBookmark div.inner ul.list01rv').append('<li class="nothing">まだ何もありません(\'A`\)</li>');
	}
	favload();


	function favload() {
		jQuery('#makinamiBookmark div.inner ul.list01rv .nothing').remove();
		var list = jQuery('#makinamiBookmark div.inner ul.list01rv');
		// ローカルストレージに格納されている全ての値を列挙
		for (var i = 0; i < localStorage.length; i++) {
			var urllist = localStorage.key(i);
			list.append('<li><a href="' + localStorage[urllist] + '">' + urllist + '</a></li>');
		}
		if (localStorage.length == 0) {
			jQuery('#makinamiBookmark div.inner ul.list01rv').append('<li class="nothing">まだ何もありません(\'A`\)</li>');
		}
		else {
			jQuery('#makinamiBookmark div.inner ul.list01rv .nothing').remove();
		}
	}

//["サービス｜＠games -アットゲームズ-"]


	function remove() {
		var list = document.getElementById("list");
		if (list.selectedIndex < 0) {
			return;
		}
		var selected = list.options[list.selectedIndex].value;
		// 選択された項目を削除
		localStorage.removeItem(selected);
		load();
	}

	function addstorage() {
		var title = document.title;
		var url = location.href;
		title = window.prompt('タイトルを入れてーなლ(╹◡╹ლ)', title);
		if (title != null && title != ""){
		localStorage[title] = url;
}

	}

	function removeallstorage() {
		if (window.confirm('全部消しますよ？')) {
			localStorage.clear();
			jQuery('#makinamiBookmark div.inner ul.list01rv li').remove();
			jQuery('#makinamiBookmark div.inner ul.list01rv').append('<li class="nothing">まだ何もありません(\'A`\)</li>')
		}
	}

	jQuery('.alldelete').click(function() {
		removeallstorage();
		return false;
	}
			);


	jQuery('.addurl').click(function() {
		jQuery('#makinamiBookmark div.inner ul.list01rv li').remove();
		addstorage();
		favload();
		return false;
	}
			);


});