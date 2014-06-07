// ==UserScript==
// @name          Naver Main Remapper
// @namespace     http://onedge.pe.kr
// @description	  Remap Naver main page
// @include       http://naver.com/*
// @include       http://www.naver.com/*
// @include       http://*search.naver.com/*
// ==/UserScript==

var CustomizeNaver = {
	// add arbitrary CSS styles to page
	addGlobalStyle: function(css) {
            style = document.createElement("style");
	    style.type = "text/css";
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        },
	removeAds: function() {

		var targetEls;
		var allEls = document.evaluate("//table/tbody/tr/td[@class='ln13']|//table/tbody/tr/td/a[starts-with(@href,'http://keywordshop.naver.com')]|//td/iframe[starts-with(@src,'http://search.ad.naver.com')]|//iframe[starts-with(@src,'http://nv')]", document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allEls.snapshotLength; i++) {
			targetEls = allEls.snapshotItem(i);
			if (targetEls.tagName == 'TD') {
				targetEls.parentNode.parentNode.parentNode.style['display'] = 'none';
			} else if (targetEls.tagName == 'A') {
				targetEls.parentNode.parentNode.parentNode.parentNode.style['display'] = 'none';
			} else if (targetEls.tagName == 'IFRAME') {
				if (targetEls.src.indexOf('http://nv') != -1) {
					targetEls.style['display'] = 'none';
				} else {
					targetEls.parentNode.style['display'] = 'none';
				}
			}
		}

		this.addGlobalStyle('#loginbox { left: -11px; width: 177px }');
		this.addGlobalStyle('#ll { width: 177px }');
		this.addGlobalStyle('#lc { width: 0px; display: none ! important }');
		this.addGlobalStyle('#lr { width: 0px; display: none ! important }');
		this.addGlobalStyle('#crstj { display: none ! important }');
		this.addGlobalStyle('#lwd2 { display: none ! important }');

		var beforeEl = document.getElementById('tmap');
		var parentEl = beforeEl.parentNode;
		var childEl = document.getElementById('loginbox');
		parentEl.insertBefore(childEl, beforeEl);

		this.addGlobalStyle('#ll2 { position:relative; margin-top: -79px }');

	}

};
CustomizeNaver.removeAds();