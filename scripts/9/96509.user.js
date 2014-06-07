// ==UserScript==
// @name           Valentine_2011.ver
// @version        1.0.0
// @namespace      http://userscripts.org/scripts/show/87245
// @description    ブラウザ一騎当千の武将イラストをバレンタインverに置き換えるスクリプトです。
// @include        http://*.1kibaku.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){

	var illust = {
		// ちょうひ
		"1006" : {big :" http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1030_B09831.png",
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1030_B09831.png"},
		// かんう
		"1013" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1033_H2082T.png",
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1033_H2082T.png"},
		// こうちゅう
		"1005" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1029_1X58hE.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1029_1X58hE.png"},
		// りゅうび
		"1008" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1031_h871R2.png",
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1031_h871R2.png"},
		"1007" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1031_h871R2.png",
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1031_h871R2.png"},
		// しょかつりょう
		"1011" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1032_75d301.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1032_75d301.png"},
		// りょふ
		"4016" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/4030_A4J031.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/4030_A4J031.png"},
		"4017" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/4030_A4J031.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/4030_A4J031.png"},
		// りょもう
		"3016" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3029_w3YW35.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3029_w3YW35.png"},
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
