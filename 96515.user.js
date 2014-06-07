// ==UserScript==
// @name           ryomou_maido.ver
// @version        1.0.0
// @namespace      http://userscripts.org/scripts/show/87245
// @description    ブラウザ一騎当千の呂蒙イラストをメイドverに置き換えるスクリプトです。
// @include        http://*.1kibaku.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){

	var illust = {
		// りょもう
		"3016" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3020_5x8d83.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3020_5x8d83.png"},
		"3021" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3020_5x8d83.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3020_5x8d83.png"},
		"3022" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3020_5x8d83.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3020_5x8d83.png"},
	};

	var elements = document.getElementsByClassName('illust');
	for (i = 0; i < elements.length; i++) {
		// 大イラストの置き換え
		if (elements[i].nodeName == 'IMG') {
			var imgname = elements[i].src.substring(elements[i].src.lastIndexOf("/") + 1).substring(0, 4);
			if (illust[imgname] != undefined && illust[imgname] != null) {
				elements[i].src = illust[imgname].big;
			}
		}
		// サムネイルの置き換え
		if (elements[i].nodeName == 'TD' || elements[i].nodeName == 'DIV') {
			var img = elements[i].getElementsByTagName('img')[0];
			var imgname = img.src.substring(img.src.lastIndexOf("/") + 1).substring(0, 4);
			if (illust[imgname] != undefined && illust[imgname] != null) {
				img.src = illust[imgname].small;
			}
		}
	}

	// 小イラストの置き換え
	var minielements = document.getElementsByClassName('illustMini');
	for (i = 0; i < minielements.length; i++) {
		var img = minielements[i].getElementsByTagName('img')[0];
		var imgname = img.src.substring(img.src.lastIndexOf("/") + 1).substring(0,4);
		if (illust[imgname] != undefined && illust[imgname] != null) {
			img.src = illust[imgname].small;
		}
	}


}) ();
