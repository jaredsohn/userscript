// ==UserScript==
// @name           Mixi Owner Highlight
// @namespace      http://www.ohaco.jp
// @include        http://mixi.jp/view_diary.pl*
// @version        1.0.1
// ==/UserScript==

(function() {
	var ownerId = document.getElementsByName('owner_id')[0].value;
	var allDt = document.getElementsByTagName('dt');

	var reg = new RegExp('show_friend.pl.\?id=' + ownerId + '$');

	for (i = 0; i < allDt.length; i++ ) {
		if (allDt[i].className == 'commentTitle') {
			if (allDt[i].getElementsByTagName('a')[0].getAttribute('href').match(reg)) {
				allDt[i].style.background = '#ffdad3';
			}
		}
	}
})();