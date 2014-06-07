// ==UserScript==
// @name           LDR - Add YouTube Thumbnail
// @namespace      http://userscripts.org/users/7010
// @include        http://reader.livedoor.com/reader/
// @updateURL      http://userscripts.org/scripts/source/12324.user.js
// @version        0.0.6
// ==/UserScript==

// http://userscripts.org/scripts/show/12324

// 08/01/28 正規表現バグフィックス
// 07/10/14 YouTube バグフィックス
// 07/10/13 ニコニコ
// 07/09/27 enclosure / 2重処理
// 07/09/21 02:36 jp.youtube
// 07/09/19 14:44 ADD YT_HATENA

var DEFINITIONS = {
	youtube : {
		pattern : 'http://[^"]*?youtube.com/watch\\?v=([\\w-]+)',
		thumb : function(tag, href, id){
			return [tag, A(href, [1, 2, 3].map(
				function(n){
					return IMG('http://img.youtube.com/vi/'+id+'/'+n+'.jpg');
			}).join(''))].join('<br>');
		},
	},
	nicovideo : {
		pattern : 'http://[^"]*?nicovideo.jp/watch/sm(\\d+)',
		thumb : function(tag, href, id){
			return [tag, A(href, IMG('http://tn-skr.smilevideo.jp/smile?i='+id))].join('<br>');
		},
	},
}

DEFINITIONS.youtube_hatena = {
	pattern : 'http://d.hatena\.ne\.jp/video/youtube/([^&;\\?]+?)',
	thumb : DEFINITIONS.youtube.thumb,
}

var processed = {};

with(unsafeWindow){
	register_hook('BEFORE_PRINTFEED', function(feed) {
		if(processed[feed.subscribe_id]) return;
		
		foreach(feed.items, function(item){
			checkLink(item) || 
				(item.body = appendThumb(item.body));
		})
		processed[feed.subscribe_id] = true;
	});
}


function appendThumb(html){
	for each(var d in DEFINITIONS)
		html = html.replace(new RegExp('<a[^>]+?href="(' + d.pattern + ')".*?</a>', 'g'), 
			d.thumb);
	return html;
}

function checkLink(item){
	var link;
	for each(var d in DEFINITIONS){
		var link = item.link.match(d.pattern) || item.enclosure.match(d.pattern);
		if(link){
			item.body = d.thumb('', link[0], RegExp.$1) + '<br>' + item.body;
			return true;
		}
	}
}

function A(href, text){
	return '<a href="' + href + '">' + text + '</a>';
}

function IMG(src){
	return '<img src="' + src + '" />';
}
