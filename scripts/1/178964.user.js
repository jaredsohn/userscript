// ==UserScript==
// @name        Copy.com listview and download link
// @description Listeyi linkler gözükecek şekilde, linkleri de download linki ile değiştirir. Sağ tılayıp farklı kaydet diyerek yada download manager'lara ekle diyerek detay sayfasına gitmeden indirilebilir.
// @namespace   plugin.animetakvimi.com
// @include     https://www.copy.com/*
// @grant       GM_addStyle
// @version     2
// ==/UserScript==

function UrlAyarla(){
	var myregexp = /^(https:\/\/www\.copy\.com\/)browse\/s\/(.+?\/.+)$/im;
	var bulundu = false;
	var alar = document.getElementById('files-columns').getElementsByTagName("a");
	//alert(alar.length);
	for (var i=0;i<alar.length;i++) {
		var a = alar[i];
		var match = myregexp.exec(a.href);
		if (match != null) {
			a.href = 'https://copy.com/' + match[2] + '?download=1';
		}
	}
}
GM_addStyle('#short #files-columns .files-column .file {width:100%;height:20px;padding:3px;margin:0px;}' +
'.list-children .icon{display:none !important;}');
window.addEventListener('load',function(){setTimeout(UrlAyarla,2000);}, false);
