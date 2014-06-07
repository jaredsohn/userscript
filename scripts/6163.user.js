// ==UserScript==
// @name          DailyMotion mp4 Download
// @namespace     http://www.hurleur.com
// @description   Grabs mp4 from DailyMotion.com for download
// @include       http://www.dailymotion.com/*
// @include       http://dailymotion.com/*
// ==/UserScript==
// a mod of the 


var dmvideoid = unescape(/"url=(.*?)\.flv&duration=/.exec(document.body.innerHTML)[1]);
corrected = dmvideoid.replace(/flv/g,"mp4");

// add banner with download link

var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 5px; background-color: #2D5998;">' +
	'<p style="margin:0px;padding: 5px;text-align:center;">' +
	'<a href="' + corrected + '"><font color="#FFFFFF" face="Verdana"><small><small><u>"Save As" to download MP4</u></small></small></font></a>' +
	'</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

// clean up body margin

document.body.style.margin = '0px';