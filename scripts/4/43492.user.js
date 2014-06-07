// ==UserScript==
// @name           i_ua_downloader
// @namespace      http://vkontakte.ru/id8510668
// @description    скачивание видео с video.i.ua by Koss
// @include        http://video.i.ua/*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.2.js
// ==/UserScript==

$(document).ready(function() {
	if ($('.codeShow')) {
		var link = document.getElementById('codeShow');
		var locations = location.href;
		//connect to 0downoal.ru and parse datalink
		GM_xmlhttpRequest({
		    method: 'GET',
			url: 'http://0download.ru/?url='+locations,
			headers: {
				'User-agent': 'Mozilla/5.0',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				if (responseDetails.status == 200) {  
					var odownlinkregexp = new RegExp(/<a href=\"(.*?)\.flv\">/gi);
					while(odownlink = odownlinkregexp.exec(responseDetails.responseText)) {
						$('<a href="'+odownlink[1]+'.flv">Скачать</a>').insertBefore(link);
					}
				}
			}
		});
	}
});