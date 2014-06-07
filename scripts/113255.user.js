// ==UserScript==
// @name           onsen.ver
// @version        1.0.0
// @namespace      http://userscripts.org/scripts/show/87245
// @description    ブラウザ一騎当千のカードの柄を温泉verに置き換えるスクリプトです。
// @include        http://*.1kibaku.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){

	var illust = {
		//関羽
		"1013" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1054_KGBFDK.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1054_KGBFDK.png"},
		//諸葛亮
		"1011" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1055_Jt4jry.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1055_Jt4jry.png"},
		//張飛
		"1006" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1056_A8KRpB.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1056_A8KRpB.png"},
		//趙雲
		"1003" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1057_AoF5i7.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1057_AoF5i7.png"},
		//劉備
		"1007" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1058_HWygy7.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1058_HWygy7.png"},
		"1008" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/1058_HWygy7.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/1058_HWygy7.png"},
		//典韋
		"2020" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/2044_d7f5Qy.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/2044_d7f5Qy.png"},
		"2021" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/2044_d7f5Qy.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/2044_d7f5Qy.png"},
		//孫策
		"3007" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3057_LvAGmu.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3057_LvAGmu.png"},
		"3008" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3057_LvAGmu.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3057_LvAGmu.png"},
		//呂蒙
		"3016" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/3058_FJqJ2o.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/3058_FJqJ2o.png"},
		//呂布
		"4016" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/4061_kcWvVX.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/4061_kcWvVX.png"},
		"4017" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/4061_kcWvVX.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/4061_kcWvVX.png"},
		"4023" : {big : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/illust/4061_kcWvVX.png",	small : "http://s1.1kibaku.jp/20101201-02/extend_project/ikki/img/card/deck/4061_kcWvVX.png"},

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
