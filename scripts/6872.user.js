// ==UserScript==
// @name          GG Changer
// @namespace     http://goofygoon.com
// @description	  Changes GG website.
// @include       http://www.garagegames.com/*
// ==/UserScript==

var fullWidthGG = {
	// add arbitrary CSS styles to page
	addGlobalStyle: function(css) {
            style = document.createElement("style");
	    style.type = "text/css";
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        },
	fullWidth: function() {
		this.addGlobalStyle('div[id="Container"] {width: 99% ! important}');
		this.addGlobalStyle('div[id="content"] {width:98% ! important}');
		this.addGlobalStyle('div[id="header"] {width:99% ! important}');
		this.addGlobalStyle('div[id="footer"] {width:98% ! important}');
		this.addGlobalStyle('div[id="navcontainer"] {width:98% ! important}');
		this.addGlobalStyle('div[class="forumpost"] {width:98% ! important; Overflow: Auto ! important}');
		this.addGlobalStyle('div[class="blogpost"] {width:98% ! important; Overflow: Auto ! important}');

		this.addGlobalStyle('div[id="feature"] {width: 99% ! important; padding: 0 15% 0 0 !important}');
		this.addGlobalStyle('table[class="sectionBody"] {width:100% !important}');
		this.addGlobalStyle('td[class="sectionTitle"] {width:100% !important}');
	}

};
fullWidthGG.fullWidth();


