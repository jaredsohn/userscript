// ==UserScript==
// @name          Yahoo Cleanser
// @namespace     http://seifi.org
// @description	  Cleanses Yahoo main page
// @include       http://yahoo.com/*
// @include       http://www.yahoo.com/*
// @exclude       http://my.yahoo.com/*
// ==/UserScript==

var CustomizeYahoo = {
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
		this.addGlobalStyle('div[id="t"] { display: none ! important }');
		this.addGlobalStyle('div[id="em"] { display: none ! important }');
		this.addGlobalStyle('div[id="wm"] { display: none ! important }');
		this.addGlobalStyle('div[id="mm"] { display: none ! important }');
		this.addGlobalStyle('div[id="g"] { display: none ! important }');
		this.addGlobalStyle('div[id="as"] { display: none ! important }');
	}

};
CustomizeYahoo.removeAds();

