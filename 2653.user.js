// ==UserScript==
// @name          Tweakers.net without ads
// @namespace     http://
// @description	  cleans tweakers.net from ads
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
                this.addGlobalStyle('div[class="leaderBoard"] { display: none ! important }');
                this.addGlobalStyle('div[class="textadContainer"] { display: none ! important }');
                this.addGlobalStyle('div[class="textadTop"] { display: none ! important }');
		this.addGlobalStyle('div[id="advertorial"] { display: none ! important }');
		this.addGlobalStyle('div[id="b_bigad_tmp"] { display: none ! important }');
		this.addGlobalStyle('div[id="b_468_bg"] { display: none ! important }');
		this.addGlobalStyle('div[id="b_msnbar_tmp"] { display: none ! important }');
		this.addGlobalStyle('div[id="b_textad_tmp"] { display: none ! important }');
		this.addGlobalStyle('div[id="b_advertorial_tmp"] { display: none ! important }');
		this.addGlobalStyle('div[id="b_728_bg"] { display: none ! important }');
		this.addGlobalStyle('div[id="b_sky"] { display: none ! important }');
		this.addGlobalStyle('div[id="bigad"] { display: none ! important }');
		this.addGlobalStyle('tr[id="bigad_holder"] { display: none ! important }');
		this.addGlobalStyle('div[id="adv"] { display: none ! important }');
		this.addGlobalStyle('div[id="b_sponsorlogo"] { display: none ! important }');
		this.addGlobalStyle('table[id="msnbar_holder"] { display: none ! important }');
		this.addGlobalStyle('table[id="textad_holder"] { display: none ! important }');
	}

};
CustomizeTweakers.removeAds();