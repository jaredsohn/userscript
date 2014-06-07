// ==UserScript==
// @name           yoroi.ver
// @version        1.0.0
// @namespace      http://userscripts.org/scripts/show/87245
// @description    ブラウザ一騎当千の武将イラストを甲冑verに置き換えるスクリプトです。
// @include        http://*.1kibaku.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){

	var illust = {
		// ちょうひ
		"1006" : {big :" http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1037_u0UU50.png",
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1037_u0UU50.png"},
		// ちょううん
		"1003" : {big :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1036_b505T2.png",
			small :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1036_b505T2.png"},
		// かんう
		"1013" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1035_32661I.png",
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1035_32661I.png"},
		// そんさく
		"3007" : {big :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3031_ZF8598.png",
			small :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3031_ZF8598.png"},
		"3008" : {big :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3031_ZF8598.png",
			small :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3031_ZF8598.png"},
		"3010" : {big :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3031_ZF8598.png",
			small :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3031_ZF8598.png"},
		"3011" : {big :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3031_ZF8598.png",
			small :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3031_ZF8598.png"},
		"3012" : {big :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3031_ZF8598.png",
			small :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3031_ZF8598.png"},
		"3013" : {big :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3031_ZF8598.png",
			small :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3031_ZF8598.png"},
		"3027" : {big :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3031_ZF8598.png",
			small :"http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3031_ZF8598.png"},		
		// りょもう
		"3016" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3032_143gfS.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3032_143gfS.png"},
		"3019" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3032_143gfS.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3032_143gfS.png"},
		"3020" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3032_143gfS.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3032_143gfS.png"},
		"3021" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3032_143gfS.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3032_143gfS.png"},
		"3022" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3032_143gfS.png",	
			small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3032_143gfS.png"},
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
