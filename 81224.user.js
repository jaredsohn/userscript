// ==UserScript==
// @name           fb_ad_analyzer_passive
// @namespace      fcbk
// @description    Analyzes the ads facebook shows to you
// @include        http://*.facebook.*
// ==/UserScript==


function processAd(ad) {

	var title = ad.getElementsByClassName('title')[0].getElementsByClassName('fbEmuLinkText')[0].innerHTML;
	var imgurl = ad.getElementsByClassName('image')[0].getElementsByClassName('img')[0].getAttribute('src');
	var adbody = ad.getElementsByClassName('body')[0].getElementsByClassName('fbEmuLinkText')[0].innerHTML;

	var userid = unsafeWindow.Env.user;


	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://box3.blogstylo.com/gm/save_ad_details.php?title=' + urlencode(title) + '&imgurl=' + urlencode(imgurl) + '&body=' + urlencode(adbody) + '&userid=' + urlencode(userid),
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible)',
		'Accept': 'application/xhtml+xml',
	    },
	    onload: function(responseDetails) {
		//alert('successful xmlhttp');
	    },
		onerror: function(responseDetails) {
			//alert('error in xmlhttp');
		}
	});
	//alert('after xmlhttp request sending');

}

function Remove_All_Facebook_Ads() {

	var sidebar_ads = document.getElementById('sidebar_ads');

	if (sidebar_ads && sidebar_ads.getAttribute('gmscript') != 'set') { //Prevents the visibility from being set multiple times unnecessarily

		sidebar_ads.setAttribute('gmscript','set');


		// change the dom to tell user that the saving is in progress and to let the script go on.


		var adNodes = sidebar_ads.getElementsByClassName('hover');
		for (var i = 0; i < adNodes.length; ++i) {
  			var ad = adNodes[i]; 
			setTimeout(processAd,0,ad);
		}
	}
}


function urlencode (str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
	                                                                       replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}


document.addEventListener("DOMNodeInserted", Remove_All_Facebook_Ads, true);

