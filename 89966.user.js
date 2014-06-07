// ==UserScript==
// @name          Tweakers.net without IE9 Promo
// @namespace     http://
// @description	  cleans tweakers.net from ie9 buttons
// @include       http://tweakers.net/*
// @include       http://www.tweakers.net/*
// ==/UserScript==

var CustomizeTweakers = {
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
		this.addGlobalStyle('a[id="ie9logo"] { display: none ! important }');
		this.addGlobalStyle('a[id="ie9promo"] { display: none ! important }');
		this.addGlobalStyle('div[id="tracker-call2"] { display: none ! important }');
	}

};
CustomizeTweakers.removeAds();