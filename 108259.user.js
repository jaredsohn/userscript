// ==UserScript==
// @name           Clipconverter.cc auf Youtube
// @namespace      Youtube
// @language	   German
// @description    Fügt unter jedem Youtube-Video einen Download-Button hinzu!
// @include        http://www.youtube.com/watch?*

// @author         Marcel Bayer (D3rBay3r)
// @version        1.1
// ==/UserScript==


var melden_btn, newElement;
melden_btn = document.getElementById('watch-flag');

if (melden_btn) {
    download_btn = document.createElement('BUTTON');
    melden_btn.parentNode.insertBefore(download_btn, melden_btn.nextSibling);

	var a1 = document.createAttribute("class");
	var a2 = document.createAttribute("aria-pressed");
	var a3 = document.createAttribute("role");
	var a4 = document.createAttribute("style");
	var a5 = document.createAttribute("onclick");
	var a6 = document.createAttribute("type");
	var a7 = document.createAttribute("title");
	var a8 = document.createAttribute("data-tooltip");
	var a9 = document.createAttribute("data-tooltip-title");
	var a10 = document.createAttribute("data-tooltip-timer");
	var a11 = document.createAttribute("onmouseover");
	var a12 = document.createAttribute("onmouseout");

	a1.nodeValue = "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip active";
	a2.nodeValue = "false";
	a3.nodeValue = "button";
	a4.nodeValue = "margin-left: 3px;";
	a5.nodeValue = "window.open('http://www.clipconverter.cc/?ref=bookmarklet&url='+encodeURIComponent(location.href)); return false;";
	a6.nodeValue = "button";
	a7.nodeValue = "Dieses Video über ClipConverter.cc downloaden";
	a8.nodeValue = "Dieses Video über ClipConverter.cc downloaden";
	a9.nodeValue = "Dieses Video über ClipConverter.cc downloaden";
	a10.nodeValue = "204";
	a11.nodeValue = "document.getElementById('cc_img').src = 'http://img813.imageshack.us/img813/2968/cc2q.png'";
	a12.nodeValue = "document.getElementById('cc_img').src = 'http://img818.imageshack.us/img818/9084/cc1z.png'";

	download_btn.setAttributeNode(a1);
	download_btn.setAttributeNode(a2);
	download_btn.setAttributeNode(a3);
	download_btn.setAttributeNode(a4);
	download_btn.setAttributeNode(a5);
	download_btn.setAttributeNode(a6);
	download_btn.setAttributeNode(a7);
	download_btn.setAttributeNode(a8);
	download_btn.setAttributeNode(a9);
	download_btn.setAttributeNode(a10);
	download_btn.setAttributeNode(a11);
	download_btn.setAttributeNode(a12);


	var img = document.createElement('IMG');
	download_btn.appendChild(img);

	var a1 = document.createAttribute("src");
	var a2 = document.createAttribute("height");
	var a3 = document.createAttribute("id");

	a1.nodeValue = "http://img818.imageshack.us/img818/9084/cc1z.png";
	a2.nodeValue = "25";
	a3.nodeValue = "cc_img";

	img.setAttributeNode(a1);
	img.setAttributeNode(a2);
	img.setAttributeNode(a3);
}