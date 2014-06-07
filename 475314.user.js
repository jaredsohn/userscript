// ==UserScript==
// @name Intercept YouTube Links
// @namespace http://github.com/panzi
// @description Inserts a hop to all watch links on YouTube in order to disable auto-play. The link won't be inserted by a normal click, only middle-click/context menu/D'n'D.
// @include *
// @run-at document-end
// @version 1.0
// ==/UserScript==
var linkSelector;
var linkRegex;
var videoTitle;

if (/^https?:\/\/(www\.)?youtube(-nocookie)?\.com\//i.test(location.href)) {
	linkSelector = 'a[href^="/watch?"], a[href^="https://www.youtube.com/watch?"], a[href^="http://www.youtube.com/watch?"], '+
		'a[href^="https://www.youtube-nocookie.com/watch?"], a[href^="http://www.youtube-nocookie.com/watch?"]';
	linkRegex = /^(https?:\/\/(www\.)?youtube(-nocookie)?\.com)?\/watch\?/i;
	videoTitle = function (link) {
		var title = link.title;
		if (!title) {
			title = link.querySelector('.title');
			if (title) {
				title = title.title||title.textContent||link.href;
			}
			else {
				title = link.href;
				var elem = link.parentNode.parentNode;
				if (elem && elem.classList && elem.classList.contains('yt-lockup-video')) {
					elem = elem.querySelector('a[title]');
					if (elem) title = elem.title;
				}
			}
		}
		return title;
	};
}
else {
	linkSelector = 'a[href^="https://www.youtube.com/watch?"], a[href^="http://www.youtube.com/watch?"], '+
		'a[href^="https://www.youtube-nocookie.com/watch?"], a[href^="http://www.youtube-nocookie.com/watch?"]';
	linkRegex = /^https?:\/\/(www\.)?youtube(-nocookie)?\.com\/watch\?/i;
	videoTitle = function (link) {
		return link.title||link.textContent||link.href;
	};
}

function isVideoLink (elem) {
	return elem.nodeType === 1 && elem.nodeName === "A" && linkRegex.test(elem.href);
}

function insertHops (ctx) {
	var links = ctx.querySelectorAll(linkSelector);
	if (isVideoLink(ctx)) {
		links = Array.prototype.slice.call(links);
		links.push(ctx);
	}
	for (var i = 0; i < links.length; ++ i) {
		insertHop(links[i]);
	}
}

function parseParams (search) {
	var params = {};
	if (search) {
		search = search.split("&");
		for (var i = 0; i < search.length; ++ i) {
			var param = search[i].split("=");
			params[decodeURIComponent(param[0])] = decodeURIComponent(param.slice(1).join("="));
		}
	}
	return params;
}

function insertHop (link) {
	var url = link.href;
	var video_id = parseParams(/^[^\?]*\?([^#]*)/i.exec(url)[1]).v;
	var thumb = 'https://i1.ytimg.com/vi/'+video_id+'/hqdefault.jpg';
	var title = videoTitle(link);
	var reader = new FileReader();
	reader.onload = function () {
		link.href = this.result;
		link.addEventListener('click',function (event) {
			if ('buttons' in event ? event.buttons & 1 : event.button === 0) {
				location.href = url;
				event.preventDefault();
				event.stopPropagation();
			}
		}, false);
	};
	reader.readAsDataURL(new Blob(['<!DOCTYPE html>',
		'<html>',
		'<head>',
		'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>',
		'<title>',escapeHtml(title),'</title>',
		'<style type="text/css">html, body {margin:0;padding:0;}\n',
		'.main {width:100%;height:100%;position:absolute;left:0;right:0;top:0;bottom:0;display:table;}\n',
		'.title {display:block;margin-top:10px;font-size:26px;font-weight:bold;}\n',
		'a {display:table-cell;text-align:center;vertical-align:middle;margin:auto;text-decoration:none;}\n',
		'img {border:none;}</style>',
		'</head>',
		'<body>',
		'<div class="main">',
		'<a href="',escapeHtml(url),'">',
		'<img src="',escapeHtml(thumb),'"/>',
		'<span class="title">',escapeHtml(title),'</a></span>',
		'</a>',
		'</div>',
		'</body>',
		'</html>'],{encoding:"UTF-8",type:"text/html;charset=UTF-8"}));
}

var HTML_CHAR_MAP = {
	'<': '&lt;',
	'>': '&gt;',
	'&': '&amp;',
	'"': '&quot;',
	"'": '&#39;'
};
 
function escapeHtml (s) {
	return s.replace(/[<>&"']/g, function (ch) {
		return HTML_CHAR_MAP[ch];
	});
}

insertHops(document);

var observer = new MutationObserver(function (mutations) {
	for (var i = 0; i < mutations.length; ++ i) {
		var mutation = mutations[i];

		if (mutation.type === "childList") {
			for (var j = 0; j < mutation.addedNodes.length; ++ j) {
				var node = mutation.addedNodes[j];
				if (node.nodeType === 1) {
					insertHops(node);
				}
			}
		}
		else if (mutation.type === "attributes") {
			if (mutation.attributeName === "href" && isVideoLink(mutation.target)) {
				insertHop(mutation.target);
			}
		}
	}
});

observer.observe(document.body, {attributes: true, childList: true, subtree: true});
