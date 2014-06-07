// ==UserScript==
// @name 	AntiProcrastination
// @namespace 	http://userscripts.org/users/176835
// @description Warns you before accessing procrastination content
// @version     0.2.7
// @date 	2012-02-15
// @creator 	rarspace01@arcor.de
// @include	http*://*youtube.com/*v=*
// @include	http*://video.google.*docid=*
// @include	http*://*vimeo.com/*
// @include	http*://www.vimeo.com/*
// @include	http*://*facebook.com/*
// @include	http*://*.failblog.org/*
// @include	http*://*.cheezburger.com/* 
// @include	http*://*.9gag.com/*
// @exclude	http://*googleads*
// ==/UserScript==
var local_version = '0.2.7';
var isShowed = false;
if(!isShowed){
alert('Procrastination!');
setTimeout("self.close();",10000)
isShowed=true;
}

checkForUpdate(false);

function checkForUpdate(a) {
	var date = new Date();
	var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastCheck = GM_getValue('lastCheck');

	if (a || !lastCheck || lastCheck != today) {
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://userscripts.org/scripts/source/138780.user.js',
			onload: function(results) {
			var global_version = results.responseText.match(/version[ ]*([0-9.]+)/i)[1];
				if (global_version.length && global_version != local_version) {
					if (confirm('[ Greasemonkey ] AntiProcrastination: Version '+ global_version +' is now available. Update?')) {
						GM_openInTab('http://userscripts.org/scripts/show/138780');
					}
				}
				else if (a) {
					alert('[ Greasemonkey ] Procast : No new version found.');
				}
			},
		});
	}
	GM_setValue('lastCheck',today);
}