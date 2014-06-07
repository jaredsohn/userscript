// ==UserScript==
// @name	Hi-Res YouTube Channel Background (Techjar)
// @namespace	Techjar
// @description	Loads hi-resolution background on Techjar's YouTube channel.
// @version 	1.0.1
// @include 	http://www.youtube.com/Techjar
// @include 	http://www.youtube.com/Techjar?*
// @include 	http://www.youtube.com/Techjar#*
// @include	http://www.youtube.com/user/Techjar
// @include	http://www.youtube.com/user/Techjar?*
// @include 	http://www.youtube.com/user/Techjar#*
// @include	http://www.youtube.com/profile?user=Techjar
// @include	http://www.youtube.com/profile?user=Techjar#*
// @include	http://www.youtube.com/profile?*&user=Techjar
// @include	http://www.youtube.com/profile?*&user=Techjar#*
// @include	http://www.youtube.com/profile?user=Techjar&*
// ==/UserScript==

/* var time = 0;


if(!GM_xmlhttpRequest) {
	alert('Please update Greasemonkey to load the hi-res background.');
}
else {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.stricklandautomotive.com/techjar/lastmod_time.php?url=http://techjar.synthasite.com/resources/Images/Other/YouTube_Channel_Background.jpg&t='+(new Date).getTime(),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/plain',
		},
		onload: function(xhr) {
			if(xhr.status == 200 || xhr.status == 301) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://techjar.synthasite.com/resources/Images/Other/YouTube_Channel_Background.jpg?t='+xhr.responseText,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'image/*',
					},
					onload: function(xhr2) {
						if(xhr2.status == 200 || xhr2.status == 301) {
							document.getElementById('channel-body').style.backgroundImage = "url('http://techjar.synthasite.com/resources/Images/Other/YouTube_Channel_Background.jpg?t="+xhr.responseText+"')";
						}
						else {
							GM_log('Could not load background image! '+xhr.status+' '+xhr.statusText);
						}
					}
				});
			}
			else {
				GM_log('Could not get last-modified time! '+xhr.status+' '+xhr.statusText);
			}
		}
	});

	if(GM_registerMenuCommand) {
		GM_registerMenuCommand('Reload Channel Background', function() {
			time = (new Date).getTime();
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://techjar.synthasite.com/resources/Images/Other/YouTube_Channel_Background.jpg?t='+time,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'image/*',
				},
				onload: function(xhr2) {
					if(xhr2.status == 200 || xhr2.status == 301) {
						document.getElementById('channel-body').style.backgroundImage = "url('http://techjar.synthasite.com/resources/Images/Other/YouTube_Channel_Background.jpg?t="+time+"')";
						alert('Channel background reloaded!');
					}
					else {
						GM_log('Could not load background image! '+xhr.status+' '+xhr.statusText);
					}
				}
			});
		});
	}
} */

GM_log('This script is deprecated and no longer supported.');