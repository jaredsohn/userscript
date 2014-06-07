// ==UserScript==
// @name           ukin-ega.ver
// @version        1.0.0
// @namespace      http://userscripts.org/scripts/show/87245
// @description    ブラウザ一騎当千の于禁をエガちゃん(誰得？ｗ)に置き換えるスクリプトです。
// @include        http://*.1kibaku.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){

	var illust = {
		//于禁
		"2036" : {big : "https://lh4.googleusercontent.com/-gdJMVL_Kmh4/TnYvpjLjV7I/AAAAAAAAAF4/emCgkUAVYcQ/ega.png",	small : "https://lh3.googleusercontent.com/-4zCv8EQYLV8/TnYw9Zq7NQI/AAAAAAAAAGE/BjZfwKPw1KA/egas.png"},
		"2037" : {big : "https://lh4.googleusercontent.com/-gdJMVL_Kmh4/TnYvpjLjV7I/AAAAAAAAAF4/emCgkUAVYcQ/ega.png",	small : "https://lh3.googleusercontent.com/-4zCv8EQYLV8/TnYw9Zq7NQI/AAAAAAAAAGE/BjZfwKPw1KA/egas.png"},

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
