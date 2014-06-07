// ==UserScript==
// @name           RemoveFeaturedYoutubeVids
// @namespace      http://very.weirdly.net
// @description    The fuckers won't let me remove it through their web interface?  I'll delete it myself!
// @include        *.youtube.com*
// ==/UserScript==
var killElementList = [];
killElementList[0] = 'feedmodule-PRO';
killElementList[1] = 'feedmodule-POP';
killElementList[2] = 'ad_creative_1';
killElementList[3] = 'ad_creative_2';
killElementList[4] = 'ad_creative_3';
killElementList[5] = 'ad_creative_4';
killElementList[6] = 'ad_creative_5';
killElementList[7] = 'ad_creative_6';
killElementList[8] = 'homepage-whats-new-block';

// remove the elements listed in killElementList
for(n in killElementList){
	var fuckem = document.getElementById(killElementList[n]);
	if(fuckem != undefined){
		fuckem.parentNode.removeChild(fuckem);
	}
}

// delete the sidebar promo for videos
var fuckem = document.getElementById('sidebar-videos-PRO');
if(fuckem != undefined){
	fuckem = fuckem.parentNode.parentNode;
	fuckem.parentNode.removeChild(fuckem);
}