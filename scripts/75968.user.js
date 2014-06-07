// ==UserScript==
// @name		Better Steam Store News Block
// @namespace	http://userscripts.org/users/wxMichael
// @description	Moves the news block from the bottom of the Steam Store page to the right side, like the old store was, and rewrites its contents to show all news.
// @include		http://store.steampowered.com/
// ==/UserScript==

var news = document.getElementById('news_block');
var col = document.getElementsByClassName('rightcol')[0];

col.innerHTML = '<div class="block" id="news_block">' +
					'<div class="block_header">' +
						'<div class="right"><a href="http://store.steampowered.com/news/">See All</a></div>' +
						'<div>Steam Headlines</div>' +
					'</div>' +
					'<div class="block_content block_content_inner" id="customNews">' +
					'</div>' +
				'</div>' + col.innerHTML;
news.parentNode.removeChild(news);

var newsBox = document.getElementById('customNews');
newsBox.style.height = '196px';
newsBox.style.overflowY = 'scroll';

function setLink(e) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				e.getElementsByTagName('a')[0].href = 'http://store.steampowered.com/news/' + req.responseText.replace(/^[\s\S]+twitter\.com.+news%2F(.+)%2F" title[\s\S]+$/, '$1') + '/';
			}
		}
	}
	req.open('GET', 'http://store.steampowered.com/news/post/' + e.parentNode.id.substring(9), true);
	req.send();
}

function loadNews() {
	newsBox.innerHTML = 'Loading...';
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				newsBox.innerHTML = request.responseText;
				newsBox.innerHTML = '<div id="news">' + document.getElementById('news').innerHTML + '</div>';

				document.getElementById('more_posts_url').parentNode.removeChild(document.getElementById('more_posts_url'));

				while(document.getElementsByClassName('feed').length != 0) {
					var tmp = document.getElementsByClassName('feed')[0];
					tmp.parentNode.removeChild(tmp);
				}

				var tmp = document.getElementsByClassName('title');
				for (var i = 0; i < tmp.length; i++) {
					setLink(tmp[i]);
				}
			} else {
				newsBox.innerHTML = 'News failed to load.';
			}
		}
	}
	request.open('GET', 'http://store.steampowered.com/news/?headlines=1&noCache=' + Math.random(), true);
	request.send();
}
loadNews();
