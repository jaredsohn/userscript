// ==UserScript==
// @name			Auto-reload
// @version			0.1
// @include			/^http:\/\/www\.jeuxvideo\.com/forums\/.*$/
// @include			/^http:\/\/m\.jeuxvideo\.com/forums\/.*$/
// ==/UserScript==

var autoreload = {

	currentPage: document.location.href,
	interval: 3500,

	init: function() {
		setInterval(function() {
			autoreload.reloadTopicList();
		}, this.interval);
	},

	reloadTopicList: function() {
		if(document.getElementById('liste_topics') != null) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', this.currentPage, false);
			xhr.onreadystatechange = function(e) {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var topicList = xhr.responseText
									.split('<table id="liste_topics" border="0" cellpadding="0" cellspacing="1" summary="">')[1]
									.split('</table>')[0];
					document.getElementById('liste_topics').innerHTML = topicList;
				}
			}
			xhr.send(null);
		}
	}
}
autoreload.init();