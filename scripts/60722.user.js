// ==UserScript==
// @name           TwitTag
// @namespace      http://twitter.com/rokudenashi
// @include        http://twitter.com/*
// @exclude        http://twitter.com/*/*
// @exclude       http://twitter.com/#*
// @exclude       http://twitter.com/
// @description        TwitTag for b.hatena.ne.jp
// ==/UserScript==
// bookmarklet:
//  javascript:(function(){var%20url='http://userscripts.org/scripts/source/60722.user.js';if(!url.match(/\?/))url+='?t='+(new%20Date()).getTime();var%20d=document;var%20e=d.createElement('script');e.charset='utf-8';e.src=url;d.getElementsByTagName('head')[0].appendChild(e);})();

(function(){
	var w = this.unsafeWindow || window
	var consoleWindow = null
	var log = function(s) {
		if(!consoleWindow)consoleWindow = open('','console')
		consoleWindow.console.log(s)
	}

	var tags = []
	var names = w.$('.screen-name')
	if (names.length != 1) return
	var name = names.text();

	w.$('.thumb').after('<a href="http://b.hatena.ne.jp/entry/twitter.com/'+name+'">タグ追加</a>');
	w.$.getJSON(
		'http://b.hatena.ne.jp/entry/jsonlite/?url='+
		'http%3A%2F%2Ftwitter.com%2F'+name+
		'&callback=?',
		function(data) {
			if (!data) return;
			w.$(data['bookmarks']).each(function() {
				w.$(this['tags']).each(function() {
					if(tags.indexOf(this.toString())==-1)
						tags.push(this.toString())})})
			tag_list = w.$.map(tags,function(n, i){return '['+n+']';});
			w.$('.thumb').after('<div class="taglist">'+tag_list.join('')+'</div>');
		})

})()
