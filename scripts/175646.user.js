// ==UserScript==
// @name           pixiv_expand_thumbnails
// @version        1.3.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Expand thumbnails and links to the original illusts and pages on pixiv. / pixivのイラストページでサムネイルをオリジナルのイラストや各マンガページへ展開します。
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// ==/UserScript==

var container = document.getElementsByClassName('works_display')[0];
var thumb = container.getElementsByTagName('img')[0];
var linkNode = thumb.parentNode;
var linkParams = linkNode.href.split('?')[1];
if (!linkParams.indexOf('mode=big')) {
	thumb.src = linkNode.href = thumb.src.replace(/(\d+)_m(\.\w{3})(\?\d+)?/, '$1$2');
	thumb.style.maxWidth = '740px';
} else if (!linkParams.indexOf('mode=manga')) {
	var illustId = location.href.split('?')[1].split('&').filter(function (e) {return !e.indexOf('illust_id');})[0].split('=')[1];
	var request = new XMLHttpRequest();
	request.open('GET', location.href.replace('mode=medium', 'mode=manga'));
	request.onreadystatechange = function () {
		if (request.readyState != 4 || request.status != 200) {
			return;
		}
		var result = document.createElement('span');
		result.innerHTML = request.responseText;
		var nPages = result.getElementsByClassName('full-size-container').length;
		function retrievePages(page, srcs) {
			var request = new XMLHttpRequest();
			request.open('GET', 'http://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=' + illustId + '&page=' + page);
			request.onreadystatechange = function () {
				if (request.readyState != 4 || request.status != 200) {
					return;
				}
				var result = document.createElement('span');
				result.innerHTML = request.responseText;
				srcs[page] = result.getElementsByTagName('img')[0].src;
				if (page != 0) {
					retrievePages(page-1, srcs);
				} else {
					var html = [], h = -1;
					html[++h] = '<a href="';
					html[++h] = linkNode.href;
					html[++h] = '" target="_blank">';
					html[++h] = thumb.title;
					html[++h] = '</a>';
					for (var i = -1, src; src = srcs[++i]; ) {
						html[++h] = '<br/><a href="';
						html[++h] = src;
						html[++h] = '"><img style="max-width:740px;margin:20px 0 0;" src="';
						html[++h] = src;
						html[++h] = '"/></a>';
					}
					container.innerHTML = html.join('');
				}
			}
			request.send(null);
		}
		retrievePages(nPages-1, []);
	};
	request.send(null);
}
