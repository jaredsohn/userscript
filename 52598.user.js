// ==UserScript==
// @name           amazon_link_to_mediamarker
// @namespace      http://koropotton.jugem.jp
// @include        http://www.amazon.co.jp/*
// ==/UserScript==

(function (){
	if (document.getElementById("ASIN")) {
		var asinMM = document.getElementById("ASIN").value;
		var addHtml = '<a href="http://mediamarker.net/media/0/?asin=' + asinMM + '" style="font-size:1.5em;font-weight:bold;padding-right:0.5em;">MediaMarker商品ページへ</a>';
		addHtml += '<a href="http://mediamarker.net/reg?mode=marklet&url='+encodeURIComponent(location.href)+'" style="font-size:1.0em;font-weight:normal;">MediaMarkerへ登録</a>';
		document.getElementById("handleBuy").innerHTML += addHtml;
	}
}())
