// ==UserScript==
// @name 	Hold-Tube : Download videos from Youtube, Google, Yahoo, Metacafe, DailyMotion, Myspace, AOL, Veoh and many more.
// @namespace 	http://hold-tube.com
// @description Download videos from Youtube, Google, Yahoo, Metacafe, DailyMotion, Myspace, AOL, Veoh and many more.
// @version     1.4
// @date 	2009-10-01
// @creator 	info@hold-tube.com
// @include	http://youtube.com/*v=*
// @include	http://www.youtube.com/*v=*
// @include	http://video.google.*docid=*
// @include	http://www.video.google.*docid=*
// @include	http://video.yahoo.*v=*
// @include	http://dailymotion.*video*
// @include	http://www.dailymotion.*video*
// @include	http://metacafe.*watch*
// @include	http://www.metacafe.*watch*
// @include	http://veoh.*watch*
// @include	http://www.veoh.*watch*
// @include	http://vids.myspace.com/*VideoID=*
// @include	http://video.aol.com*video-detail*
// @include	http://megavideo.com/*v=*
// @include	http://www.megavideo.com/*v=*
// @include	http://megavideo.com/*d=*
// @include	http://www.megavideo.com/*d=*
// @include	http://vimeo.com/*
// @include	http://www.vimeo.com/*
// @include	http://facebook.com/*video*
// @include	http://www.facebook.com/*video*
// @include	http://spike.com/*video*
// @include	http://www.spike.com/*video*
// @include	http://current.com/*
// @include	http://www.current.com/*
// @include	http://www.blip.tv/file/*
// @include	http://blip.tv/file/*
// @include	http://www.collegehumor.com/video:*
// @include	http://collegehumor.com/video:*
// @include	http://www.guba.com/watch*
// @include	http://guba.com/watch*
// @include	http://break.com/*
// @include	http://www.break.com/*
// @exclude	http://break.com/
// @exclude	http://www.break.com/
// @exclude	http://current.com/
// @exclude	http://www.current.com/
// @exclude	http://vimeo.com/
// @exclude	http://www.vimeo.com/
// @exclude	http://*googleads*
// @homepage	http://hold-tube.com
// ==/UserScript==



var vars = {};
var url = document.URL;

checkForUpdate(false);
addHoldTubeDownloadBox();
setHoldTubeValues();

function checkForUpdate(a) {
	var date = new Date();
	var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastCheck = GM_getValue('lastCheck');

	if (a || !lastCheck || lastCheck != today) {
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://userscripts.org/scripts/source/54167.user.js',
			onload: function(results) {
			var version = results.responseText.match(/version[ ]*([0-9.]+)/i)[1];
				if (version.length && version.length<5 && version != '1.4') {
					if (confirm('[ Greasemonkey ] Hold Tube : Version '+ version +' is now available. Update?')) {
						GM_openInTab('http://userscripts.org/scripts/show/54167');
					}
				}
				else if (a) {
					alert('[ Greasemonkey ] Hold Tube : No new version found.');
				}
			},
		});
	}
	GM_setValue('lastCheck',today);
}

function addHoldTubeDownloadBox() {
	var styles = [
		'#holdTubeBox {position: fixed; right: 5px; bottom: 5px; z-index: 1000;opacity: 0.7;}'
	];
	
	GM_addStyle(styles.join("\r\n"));

	var downloadBox = document.createElement('div');
	document.body.appendChild(downloadBox);
	downloadBox.id = 'holdTubeBox';
	downloadBox.innerHTML = '<form id="HoldTubeDownloadForm" name="HoldTubeDownloadForm" action="http://hold-tube.com?f=1.4" method="post" target="_blank" enctype="multipart/form-data" >' + "\r\n" +
							'<input type="submit" value="Hold-Tube Download" name="submit" id="submit"/>' + "\r\n" +
							'<input type="hidden" value="" name="urls" id="urls"/>' + "\r\n" +
							'<input type="hidden" value="" name="content" id="content"/>' + "\r\n" +
							'</form>';
}

function setHoldTubeValues()
{
	var f = document.getElementById("HoldTubeDownloadForm");
	f[1].value = url;
        var lowerurl = url.toLowerCase();

	if (lowerurl.indexOf('megavideo.com')!=-1 || lowerurl.indexOf('facebook.com')!=-1 || lowerurl.indexOf('dailymotion.')!=-1 || lowerurl.indexOf('youtube.com')!=-1){
		f[2].value = document.getElementsByTagName("html")[0].innerHTML;;
	}
}