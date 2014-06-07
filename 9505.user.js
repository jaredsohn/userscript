// ==UserScript==
// @name          Newzbin IMDB Ratings (mouseover)
// @namespace     Yarble's scripts
// @description   Replaces URL icon with IMDB rating on mouseover
// @include       http://V3.newzbin.com/*
// @include       http://www.newzxxx.com/*
// @include       https://V3.newzbin.com/*
// @include       https://www.newzxxx.com/*
// ==/UserScript==


(function (){
var URLimages = document.evaluate(
	"//IMG[@alt='URL']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (var i = 0; i < URLimages.snapshotLength; i++) {
		link = URLimages.snapshotItem(i).parentNode;
	  var regex = new RegExp("http:\/\/(www)?.*imdb\.com\/title\/.+$");
		if (regex.test(link.href)) {
	  	URLimages.snapshotItem(i).addEventListener('mouseover', getRating, false);
		}
	}
})();


function getRating(evt) {
	if(evt.target.parentNode.href){
		var linkURL = evt.target.parentNode.href.replace(/^http.*?newz.*?\.com\/r\/\?/g,"")  // remove Newzbin referrer if present
		GM_xmlhttpRequest({
			method: 'GET',
			url: linkURL,
			onload: function (responseDetails) {
				if (responseDetails.status == 200) {
					var re = new RegExp("<b\\b[^>]*>[-+]?[0-9]*\\.?[0-9]+/[-+]?[0-9]*\\.?[0-9]+</b>");
					var m = re.exec(responseDetails.responseText);
					if (m != null) {
						evt.target.parentNode.innerHTML=(""+m).substring(0,6)+"</b>";
					}
					else evt.target.parentNode.innerHTML="<b\>NA</b>";
				}
			}
		});
	}
}