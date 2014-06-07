// ==UserScript==
// @name          mixiチェック for Feedly Mini Toolbar
// @namespace     http://www.chipple.net/tools/gmscripts
// @include       http://*
// @include       https://*
// @version       1.0
// ==/UserScript==

var g_interval;

function gm_feedlymixi_onClick(event) {
	// 
	// ここにあるキーはこのユーザスクリプト専用に登録したものです。
	// 他の目的でキーが必要の場合は、 http://developer.mixi.co.jp/ で登録してください。
	//
	// The key embedded here is registered for this UserScript only.
	// If you need one for another purpose, make your own at http://developer.mixi.co.jp/
	//
	var u = 'http://mixi.jp/share.pl?u='+encodeURIComponent(location.href)+'&k=909cf9e7fc2e169d'+/*DO NOT USE THIS KEY ELSEWHERE*/'b0fda99f299578e7d0be2c98';
	window.open(u,'share','width=632,height=456,location=yes,resizable=yes,toolbar=no,menubar=no,scrollbars=no,status=no');
	return false;
}

function makeLink() {
	var aMixi = document.createElement("a");
	aMixi.style.textDecoration = "none";
	aMixi.style.display = "block";
	aMixi.href = "#";
	aMixi.onclick = gm_feedlymixi_onClick;
	var imgMixi = document.createElement("img");
	imgMixi.width = imgMixi.height = 32;
	imgMixi.align = "absmiddle";
	imgMixi.style.marginTop = "5px";
	imgMixi.style.border = "0";
	imgMixi.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKXRFWHRDcmVhdGlvbiBUaW1lAJCFIDIwIDMgMjAxMyAwMDoyNDo0MCArMDkwMMeNgsYAAAAHdElNRQfdAxMPHzJpqT/TAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAzBJREFUeNrVVltPE1EQPntrt9AblUsLaBtKmqqAYjBeEzUxISb6oGDiLT75B0z8Ez76oDHG6KMxAfXN4IsaMaKgNVGUSFEobSm1hd26bZdud+tsF0orW1hI++B0s53dc/abM9/MmTOY1+vN5kWSJFQ5wXGcVEQQBKPRODAwQBBEBQ2Iotjf389xHHI6nX6/P1cFAVgAx0EDdyq49mKWZHDQ4K8aBhTYqqy9xI9qGyC1uCmk42x4LLUwmeEiYpbHCZ2utrHW5jG37NfVNMAEDMO2YgDQM8loZPwxG/6AciW7hGdnEuHRufFH1tbDjs6LFF23aQOAzgTfhXz3JYFH5daXk5jZYS76xXXohqGuTdWPsjFYmH45O3pbypZHX5HsEvvr7c1Mcl51VCVN4ZGLTYQ+PwQVfiu3/FBhyqouiyhws2N3c6U0KrBqFOWkkO8Byomgmhzd1u1HYlND9l3ngWgm9D468bTe3Vu34yiE9rf/ORN4jfI+phZ+cNGvpqaujWPAzn1aSgQVZiiDzWzv1hvtYIMgDY7Oy/AISTX//YmxsaN137Vk7JuQiikfgnlNBhKQM0W846Q+MHonw4XBY5N9Lxjzv7oF/iUiPpvruMHiKhjgmWlNQU4zM6UxTCxxYZQnQsqmYTcgSWYP7kA6hq/WYFFIawqyKKRKI5ItDqgcyTJ5RVA1a4Os4gGpN6HNC6DRlh2aKKrZ5tmCAfDK3NyjyQCEDq2wkIpPRieeLa8RocXAMBMcKcyEKpJmA4quN7eYm/ao8LH2FSSGre1k/OcLDGF8IgCXUgLg/ifiK15zfGqo8NDcdbU44Ot5ACWlufOKxaHibzn2G71nYVuojqqfaDhBOQ9ct+++gJP0hgYaPKebdp5bW+nKlwrFDxxv8JyxuU4sBt7AnoL6LGaSciAwfLl0g0rqgRmI2RbPA/gMUra+/RRcMqAkwCZggyPBj/dgzNzS4+i4BCfPOuhowxMNFZ1WGKGT2SNpq/NYfXuvweJcH1qrgX/E2noQLu3z//+uAgceK9v2FgRgARxzu900TQ8ODla2gQT0vr4+nucxaN+hwYb2vbINpJziJElR1F9Gv8DEuIZMegAAAABJRU5ErkJggg==";
	aMixi.appendChild(imgMixi);
	return aMixi;
}

function init() {
	var miniPopup = document.getElementById("miniPopup");
	if (!miniPopup) return;
	if (miniPopup.className.indexOf("mixi-added") != -1) return;
	miniPopup.className += " mixi-added";
	clearInterval(g_interval);
	
	var as = miniPopup.getElementsByTagName("a");
	if (as.length < 1) return;
	var aPrefs = as[as.length-1];
	var parent = aPrefs.parentNode;
	parent.insertBefore(makeLink(), aPrefs);
}

function onLoad() {
	if (!document.getElementById("feedlyMiniIcon")) return;
	g_interval = setInterval(init, 500);
}

if (window.top == window) {
	window.addEventListener("load", onLoad);
}