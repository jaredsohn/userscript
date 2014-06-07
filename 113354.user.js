// ==UserScript==
// @name           ukin-qb.ver
// @version        1.0.0
// @namespace      http://userscripts.org/scripts/show/87245
// @description    ブラウザ一騎当千の于禁をQB(擬人化)に置き換えるスクリプトです。
// @include        http://*.1kibaku.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){

	var illust = {
		//于禁
		"2036" : {big : "https://lh5.googleusercontent.com/-o48543_EDW0/TnYgtwXrsFI/AAAAAAAAAFU/t5wEe5g2weA/QB-1.png",	small : "https://lh5.googleusercontent.com/-Ju9G7T9E7k4/TnYl1rrsgkI/AAAAAAAAAFc/o2JEGI9N4lg/QB-1s.png"},
		"2037" : {big : "https://lh5.googleusercontent.com/-o48543_EDW0/TnYgtwXrsFI/AAAAAAAAAFU/t5wEe5g2weA/QB-1.png",	small : "https://lh5.googleusercontent.com/-Ju9G7T9E7k4/TnYl1rrsgkI/AAAAAAAAAFc/o2JEGI9N4lg/QB-1s.png"},

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
