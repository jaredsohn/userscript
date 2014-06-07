// ==UserScript==
// @name        D3 :: ReTitle
// @namespace   http://userscripts.org/users/248610
// @include     http://dirty.ru/*
// @include     http://*.dirty.ru/*
// @version     1
// ==/UserScript==

(function(){

	if (top !== self) {
		return;
	}
	
	var name = document.getElementsByClassName('header_tagline_inner')[0].children[0].textContent;
	
	process = function () {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://dirty.ru/user/' + name,
			onload: function (resp) {
				var re = /Их\sобщий\sрейтинг\s(\d{1,})\./g;
				var res = re.exec(resp.responseText);
				var userRating = '-';
				if (res) {
					userRating = RegExp.$1;
					//GM_log('RATING: ' + userRating);
				}
				re = /<span>Мои\sвещи<\/span>\s*(\d{1,})<\/a>/g;
				res = re.exec(resp.responseText);
				var newThings = '-';
				if (res) {
					newThings = RegExp.$1;
					//GM_log('NEW REPLIES: ' + newThings);
				}
				re = /id:'\d{1,}'}\);">(\d{1,})<\/strong>/g;
				res = re.exec(resp.responseText);
				var userCarma = '-';
				if (res) {
					userCarma = RegExp.$1;
					//GM_log('NEW REPLIES: ' + newThings);
				}
				document.title = 'D3 | ' + newThings + ' | ' + userRating + ' | ' + userCarma;
				var ft = document.getElementById('js-header_my_things_link');
				if (ft.children[0].nextSibling) {
					ft.children[0].nextSibling.textContent = newThings;
				} else {
					var txt = document.createTextNode("\n" + newThings);
					ft.appendChild(txt);
				}
			}
		});
	}
	
	process();

	var ival = self.setInterval( function() {process()}, 60000);
	
})();