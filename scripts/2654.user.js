// ==UserScript==
// @name          Standaard.be without most ads
// @namespace     http://
// @description	  cleans standaard.be from ads
// @include       http://standaard.be/*
// @include       http://www.standaard.be/*
// ==/UserScript==

var CustomizeStandaard = {
	// add arbitrary CSS styles to page
	addGlobalStyle: function(css) {
            style = document.createElement("style");
	    style.type = "text/css";
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        },
	removeAds: function() {
	    em = document.getElementById('em');
	    if (em) {
		var myp = em.parentNode;
		if (myp) {
			em.parentNode.removeChild(em);
		}
	    }
		this.addGlobalStyle('div[class="advertisement"] { display: none ! important }');
		this.addGlobalStyle('div[class="topbanner"] { display: none ! important }');
		this.addGlobalStyle('div[class="bottombanner"] { display: none ! important }');
		this.addGlobalStyle('div[id="padding"] { display: none ! important }');
		this.addGlobalStyle('a[href="http://www.spotter.be"] { display: none ! important }');
		this.addGlobalStyle('a[href="http://www.jobat.be"] { display: none ! important }');
		this.addGlobalStyle('script[language="Javascript"] { display: none ! important }');
		this.addGlobalStyle('object {display: none ! important }');
	}

};
CustomizeStandaard.removeAds();