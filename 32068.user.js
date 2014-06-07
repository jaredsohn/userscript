// ==UserScript==
// @name          Mega Download
// @author        Max Demian
// @namespace     http://www.flvresources.com/
// @description   Grabs flash videos from megavideo.com & megarotic.com for download
// @include       http://www.megarotic.com/video/?v=*
// @include       http://megarotic.com/video/?v=*
// @include       http://www.megaporn.com/video/?v=*
// @include       http://megaporn.com/video/?v=*
// @include       http://*.megavideo.com/?v=*
// @include       http://megavideo.com/?v=*
// @include       http://*.megavideo.com/xml/videolink.php?v=*
// ==/UserScript==

// Megavideo Video URL: http://www.megavideo.com/?v=[video_id]
// Megarotic Video URL: http://www.megarotic.com/video/?v=[video_id]
// Megaporn Video URL: http://www.megaporn.com/video/?v=[video_id]

if (location.href.substr(0, 45) == "http://www.megavideo.com/xml/videolink.php?v=") {
	megavideolink = "http://www.flvresources.com/downloader.php?flvsite=" + unescape("megavideo---" + /un="(.*?)"/.exec(document.body.innerHTML)[1] + "---" + /k1="(.*?)"/.exec(document.body.innerHTML)[1] + "---" + /k2="(.*?)"/.exec(document.body.innerHTML)[1] + "---" + / s="(.*?)"/.exec(document.body.innerHTML)[1]);
} else {
	megavideolink = "http://www.megavideo.com/xml/videolink.php?v=" + unescape(/\?v=(.*?)&/.exec(document.body.innerHTML)[1]);
}

var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 5px; background-color: #6B6B6B;">' +
	'<p style="margin:0px;padding: 5px;text-align:center;">' +
	'<a href="' + megavideolink + '"><font color="#FFFFFF" face="Verdana"><small><u>Click Here To Download Flash Video</u></small></font></a>' +
	'</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

document.body.style.margin = '0px';