// ==UserScript==
// @name           Narrow Translator
// @version        0.2
// @namespace      http://blog.livedoor.jp/hirogasa/
// @description    「英辞郎 on the WEB」及び「Google翻訳」を狭い画面でも見やすくします
// @include        http://eow.alc.co.jp*
// @include        http://translate.google.co*
// ==/UserScript==
if(location.href.indexOf("http://eow.alc.co.jp") != -1){
	document.getElementById("AreaUpperLeftContainer").style.width = "100%";
	document.getElementById("AreaUpperLeftContainer").style.maxWidth = "100%";
	document.getElementById("box").style.display = "none";
	document.getElementById("itemsNumber").style.display = "none";
	document.getElementById("AreaUpperRight").style.display = "none";
	if(document.body.innerHTML.match(/goFairWord\("([^"]+)"\)/)){
		location.href = "http://eow.alc.co.jp/" + RegExp.$1;
	}
}else if(location.href.indexOf("http://translate.google.co") != -1){
	document.getElementById("gt-c").style.minWidth = "100%";
}