// ==UserScript==
// @name           cool.ver
// @version        1.0.2
// @namespace      http://userscripts.org/scripts/show/87245
// @description    ブラウザ一騎当千の武将イラストをクール(微エロ？)verに置き換えるスクリプトです。
// @include        http://*.1kibaku.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){
	var illust = {
		// ちょううんばーすと
		"1003" :{big  : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZcQgrNQEI/AAAAAAAAABo/dGFFP44nuKY/0003.png",
			small : "https://lh4.googleusercontent.com/_TNSVW9T5s64/TXZciyLCYTI/AAAAAAAAAB4/U292VoJgd6Y/0003s.png"},
		// かんうばーすと
		"1013" :{big  : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZeT-QPUhI/AAAAAAAAACk/zFzpth1A-B8/2000.png",
			small : "https://lh4.googleusercontent.com/_TNSVW9T5s64/TXZebzcWGbI/AAAAAAAAAC0/Ypx88wN7Hyw/2000s.png"},
		// そんさくばーすと
		"3007" : {big : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZdAbbNGMI/AAAAAAAAACE/Y-lkX_ORZug/1001.png",	
			small : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZdOxfoIkI/AAAAAAAAACQ/EnVH47Yukcc/1001s.png"},
		"3008" : {big : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZdAbbNGMI/AAAAAAAAACE/Y-lkX_ORZug/1001.png",	
			small : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZdOxfoIkI/AAAAAAAAACQ/EnVH47Yukcc/1001s.png"},
		"3010" : {big : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZdAbbNGMI/AAAAAAAAACE/Y-lkX_ORZug/1001.png",	
			small : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZdOxfoIkI/AAAAAAAAACQ/EnVH47Yukcc/1001s.png"},
		"3011" : {big : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZdAbbNGMI/AAAAAAAAACE/Y-lkX_ORZug/1001.png",	
			small : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZdOxfoIkI/AAAAAAAAACQ/EnVH47Yukcc/1001s.png"},
		"3012" : {big : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZdAbbNGMI/AAAAAAAAACE/Y-lkX_ORZug/1001.png",	
			small : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZdOxfoIkI/AAAAAAAAACQ/EnVH47Yukcc/1001s.png"},
		"3013" : {big : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZdAbbNGMI/AAAAAAAAACE/Y-lkX_ORZug/1001.png",	
			small : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZdOxfoIkI/AAAAAAAAACQ/EnVH47Yukcc/1001s.png"},
		"3027" : {big : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZdAbbNGMI/AAAAAAAAACE/Y-lkX_ORZug/1001.png",	
			small : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZdOxfoIkI/AAAAAAAAACQ/EnVH47Yukcc/1001s.png"},
		// りょもうばーすと
		"3016" : {big : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZevk9VcVI/AAAAAAAAADE/bqbfcwlOVMw/3000.png",	
			small : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZe7tIknNI/AAAAAAAAADQ/7xmBuYEoElg/3000s.png"},
		"3019" : {big : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZevk9VcVI/AAAAAAAAADE/bqbfcwlOVMw/3000.png",	
			small : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZe7tIknNI/AAAAAAAAADQ/7xmBuYEoElg/3000s.png"},
		"3020" : {big : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZevk9VcVI/AAAAAAAAADE/bqbfcwlOVMw/3000.png",	
			small : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZe7tIknNI/AAAAAAAAADQ/7xmBuYEoElg/3000s.png"},
		"3021" : {big : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZevk9VcVI/AAAAAAAAADE/bqbfcwlOVMw/3000.png",	
			small : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZe7tIknNI/AAAAAAAAADQ/7xmBuYEoElg/3000s.png"},
		"3022" : {big : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZevk9VcVI/AAAAAAAAADE/bqbfcwlOVMw/3000.png",	
			small : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZe7tIknNI/AAAAAAAAADQ/7xmBuYEoElg/3000s.png"},
		// そんけんばーすと
		"3023" : {big : "https://lh4.googleusercontent.com/_TNSVW9T5s64/TXZfHNWV4pI/AAAAAAAAADc/MDM-qRz4JEY/4000.png",	
			small : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZfQfzazzI/AAAAAAAAADo/hdRhPupQPfw/4000s.png"},
		"3024" : {big : "https://lh4.googleusercontent.com/_TNSVW9T5s64/TXZfHNWV4pI/AAAAAAAAADc/MDM-qRz4JEY/4000.png",	
			small : "https://lh6.googleusercontent.com/_TNSVW9T5s64/TXZfQfzazzI/AAAAAAAAADo/hdRhPupQPfw/4000s.png"},
		// りょふばーすと(非公開)
		//"4016" : {big : "https://lh5.googleusercontent.com/_TNSVW9T5s64/TXZjsYiBm_I/AAAAAAAAAEA/x-N16Ay7xWU/5001.png",	
		//	small : "https://lh4.googleusercontent.com/_TNSVW9T5s64/TXZj422izFI/AAAAAAAAAEM/ERcp4bjxq1Y/5001s.png"},
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
