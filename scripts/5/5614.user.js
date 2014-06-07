// ==UserScript==
// @name			PC World Ad Remover
// @namespace		http://userscripts.org/scripts/show/5614
// @description		Removes ads from PC World and reuses the leftover space. (v1.2)
// @include			http://*pcworld.com/*
// ==/UserScript==

/* CHANGELOG
	+ Major overhaul. Enough said. =)
*/

(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	var cssMain = '.adMkt1Colw, .adMkt2Colw, .adMkt1Colg, .adMkt2Colg, .adYsm2Colw, .buttonAd, .buttonAd186, .buttonAd125, .buttonAd300, #downloadNow, .leaderboardAd, .navAd, .showcaseAd, .subscription, #subscribeForm, .textAds, #topAd, .ysmSponsored {display:none; !important} body {background-color: #D4D4D5;} .tout h2, .menu h2, .storyList h2, #categoryList h2, #downloads h2 {padding:0 10px 10px 5px; !important}';
	
	// Old CSS stuff that shouldn't be needed. Let's not delete it for now.
	// .towerAd, .halfpageAd, .printHide, .sponsored, .sponsoredShade, .adDiv, .sponsorAd, .sponsorAdDiv, .dlAllAd, .downloadSponsoredGrid, .searchSponsored, .modLeftNavPromo, .adSponsored

	addGlobalStyle(cssMain);
})()
