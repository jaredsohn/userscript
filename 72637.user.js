// ==UserScript==
// @name           ekside bugunu ara
// @namespace      eksi
// @description    bugünün tarihini arayan bir butonu üst frame e koyar
// @include        http://sozluk.sourtimes.org/*
// ==/UserScript==
(function(top){
	function getBugun() {
		var aylar = new Array("ocak", "şubat", "mart", "nisan", "mayıs", "haziran", "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık");
		var d = new Date();
		return (d.getDate() + " " + aylar[d.getMonth()] + " " + d.getFullYear());	
	}
	function bugunuAra() {
		var t = top.sozbar.document.getElementById("t");
		t.value = getBugun();
		top.sozindex.location.href = "http://sozluk.sourtimes.org/index.asp?a=sr&kw=" + t.value;	
	}
	function butonEkle() {
		var button = top.sozbar.document.getElementById("baButton");
		if (button) {
			return;
		}
		var t = top.sozbar.document.getElementById("t");
		button = document.createElement("a");
		button.setAttribute("id", "baButton");
		button.setAttribute("title", "bugünü ara");
		button.innerHTML = "bugünü ara";
		button.addEventListener("click", bugunuAra, false)
		var tr = t.parentNode.parentNode;
		var td = tr.childNodes[0].cloneNode(false);
		td.removeAttribute("style");
		td.removeAttribute("onclick");
		td.appendChild(button);
		tr.appendChild(td);
	}
	if (unsafeWindow.top.sozbar && unsafeWindow.top.sozindex) {
		GM_registerMenuCommand("bugünü ara", bugunuAra);
		butonEkle();
	}
})(unsafeWindow.top);