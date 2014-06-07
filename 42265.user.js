// ==UserScript==
// @name           removeBannerHotmail
// @namespace      removerBannerHotmail
// @include        http://*.mail.live.com/*
// ==/UserScript==

window.addEventListener("load",function() {
		document.getElementById("RadAd_Banner").setAttribute("style","display:none");
	}
,false);
