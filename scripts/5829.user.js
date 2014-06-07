// ==UserScript==
// @name	Colbert On Demand Video Exposer
// @description	Makes title a link to the FLV file on ColbertOnDemand.com
// @include	http://*colbertondemand.com/*
// ==/UserScript==

var mVids = document.getElementsByTagName("embed");
if (mVids && mVids.length > 0) {
	var vidURL = mVids[0].getAttribute("flashvars").match(/\?v=([^&]+)/)[1];
	document.getElementById("videoPlayer").innerHTML += '<br><a href="' + vidURL + '">Download</a>';
}