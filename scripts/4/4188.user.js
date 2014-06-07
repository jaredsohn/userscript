// ==UserScript==
// @name           Ynet ad remover
// @description    Ynet ad remover
// @include        http://www.ynet.co.il*
// ==/UserScript==

	aAds = document.body.getElementsByTagName('iframe');
	for (i = 0; i < aAds.length; i++) {	
		if (aAds[i].id.substr(0,3) == 'Ad_') {
			if (document.getElementById(aAds[i].id)) {
				aAds[i].style.display = 'none';
			}
		}
	}
	
	aAds = document.body.getElementsByTagName('td');
	for (i = 0; i < aAds.length; i++) {	
		if (aAds[i].id.substr(0,10) == 'AlmondCamp') {
			if (document.getElementById(aAds[i].id)) {
				aAds[i].style.display = 'none';
			}
		}
	}
	
	moreAds = new Array('left', 'banana_iframe', 'banana_div', 'Ad_Banana_Span', 'ad_top', 'hude_ad');
	for (i = 0; i < moreAds.length; i++) {	
		if (document.getElementById(moreAds[i])) {
			document.getElementById(moreAds[i]).style.display = 'none';
		}
	}