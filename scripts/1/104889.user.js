// ==UserScript==
// @name           ytdeschavator
// @namespace      http://dbb.9hells.org
// @description    limpa pagina do youtu.be
// @include        http://www.youtube.com/*
// @include        http://youtu.be/*
// @include        http://www.youtu.be/*
// @include        http://www.youtu.be./*
// @include        http://youtube.be./*
// @include        http://www.youtube.be./*
// ==/UserScript==

(function() {
	function hide(id) {
		e = document.getElementById(id);
		if (e) e.style.display = "none";
	}

	hide("default-language-box");
	hide("logo");
	hide("watch-main");
	hide("masthead-utility");
	hide("masthead-user");
	hide("masthead-nav");
	hide("watch-headline-user-info");
	hide("footer");
	hide("ticker");
	
	// new youtube
	hide("watch7-main-container");
	hide("watch7-sidebar");
	hide("guide");
	hide("alerts");
	hide("footer-hh-container");
	hide("masthead-upload-button-group");
	hide("yt-masthead-signin");
})();
