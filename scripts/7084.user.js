// ==UserScript==
// @name             AmebaVision Video Random Play Kicker
// @namespace        http://www.moaikids.net/
// @include          http://vision.ameba.jp/search/*
// @version          1.02
// ==/UserScript==

const WATCH_URL = 'http://vision.ameba.jp/watch.do'
const ELEMENT_TAGID = 'tagId';

var Class = {
   create: function() {
      var newClass = function() {
         this.initialize.apply(this, arguments);
      }
      newClass.prototype.initialize = function() {}
      return newClass;
   }
};

Function.prototype.extend = function(newClass) {
   var proto = this.prototype;
   for(var property in newClass)
      proto[property] = newClass[property];
}

Function.extend({
   bind: function(base) {
      var self = this;
      return function() {
         self.apply(base, arguments);
      }
   }
});


var Reader = Class.create();
Reader.extend({
	read: function(url,handler) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: handler,
		});
	}
});

var Parser = Class.create();
Parser.extend({
	initialize: function() {
		this.items = [];
	},

	parse: function(data) {
		try {
			var wrap   = new XPCNativeWrapper(window, 'DOMParser()');
			var parser = new wrap.DOMParser();
			this.head  = parser.parseFromString(data, 'application/xhtml+xml');
			this.items = this.head.getElementsByTagName('item');
		} catch(e) {
			throw 'parse error';
		}
	},
	
	getCount: function(name,count) {
		return this.items.length;
	},

	getValue: function(name,count) {
		if(!this.items){
			return undefined;
		}
		if(!count){
			count = 0;
		}
		
		var item = this.items[count];
		var value = (item.getElementsByTagName(name))[0].childNodes[0].nodeValue;

		return value;
	}
});

var Panel = Class.create();
Panel.extend({
	element: function(html) {
		var div = document.createElement('div');
		if(html) div.innerHTML = html;
		return div;
	},

	create: function(msg) {
		var GM_infoPanel = document.createElement('div');
		with(GM_infoPanel.style) {
			bottom   = 0;
			right    = 0;
			padding  = '1px';
			opacity  = 0.8;
			fontSize = 'x-small';
			color    = '#000000';
			backgroundColor = '#EEEEEE';
			border   = '1px solid #C0C0C0';
			zIndex   = 100;
			position = 'fixed';
		}

		document.body.appendChild(GM_infoPanel);
		var msgspace = this.element();
		msgspace.style.margin = '0.5em 1em';
		GM_infoPanel.appendChild(msgspace);

		this.panel = msgspace;
		this.insert(msg);
	},

	insert: function(msg) {
		if(typeof msg  == 'string') {
			this.panel.innerHTML = msg;
		} else {
			this.panel.innerHTML = '';
			this.panel.appendChild(msg);
		}
	},
});



var GLOBAL_PANEL = new Panel();
var SearchMap = {
	movie: undefined,
	keyword: undefined,
	user: undefined,
	tag: undefined,
	range: undefined,
	referer: undefined,
	result: undefined,
	activePage: undefined,

	lists: new Array(),
	add: function(m) {
		this.lists.push(m);
	},

	getApiUrl: function(currentUrl) {
		for(var i = 0 ; i < this.lists.length ; i++) {
			var search = this.lists[i];
			if(currentUrl.indexOf(search.url) >= 0){
				this.result = search;
				break;
			}
		}
		if(!this.result ){
			return null;
		}

		var url = this.result.api;
		url += this.getQuery(true);
		return url;
   	},

	getWatchUrl: function(nextMovie){
		var url = WATCH_URL + "?referer=" + this.result.referer;
		url += this.getQuery(false, nextMovie);

		return url;
	},

	getQuery: function(isFirst, nextMovie){
		var movie = nextMovie ? nextMovie : this.movie;
		var url = "";
		if(movie){
			url += isFirst ? "?" : "&";
			url +=  "movie=" + movie;
			isFirst = false;
		}
		if(this.keyword){
			url += isFirst ? "?" : "&";
			url +=  "keyword=" + this.keyword;
			isFirst = false;
		}
		if(this.user){
			url += isFirst ? "?" : "&";
			url +=  "user=" + this.user;
			isFirst = false;
		}
		if(this.tag){
			url += isFirst ? "?" : "&";
			url +=  "tag=" + this.tag;
			isFirst = false;
		}
		if(this.range){
			url += isFirst ? "?" : "&";
			url +=  "range=" + this.range;
			isFirst = false;
		}
		if(this.activePage){
			url += isFirst ? "?" : "&";
			url +=  "activePage=" + this.activePage;
			url += "&offset=" + ((this.activePage - 1) * this.result.page);
			isFirst = false;
		}
		return url;
	}
};

SearchMap.add({
	referer: 'popular',
	url:   'http://vision.ameba.jp/search/popular.do',
	api:   'http://vision.ameba.jp/api/get/search/popular.do',
	page:  20
});

SearchMap.add({
	referer: 'rating',
	url:   'http://vision.ameba.jp/search/rating.do',
	api:   'http://vision.ameba.jp/api/get/search/rating.do',
	page:  20
});
SearchMap.add({
	referer: 'comment',
	url:   'http://vision.ameba.jp/search/comment.do',
	api:   'http://vision.ameba.jp/api/get/search/comment.do',
	page:  20
});
SearchMap.add({
	referer: 'favorite',
	url:   'http://vision.ameba.jp/search/favorite.do',
	api:   'http://vision.ameba.jp/api/get/search/favorite.do',
	page:  20
});

SearchMap.add({
	referer: 'recent',
	url:   'http://vision.ameba.jp/search/new.do',
	api:   'http://vision.ameba.jp/api/get/recentMovie.do',
	page:  undefined
});
SearchMap.add({
	referer: 'keyword',
	url:   'http://vision.ameba.jp/search/keyword/new.do',
	api:   'http://vision.ameba.jp/api/get/search/keyword/new.do',
	page:  20
});
SearchMap.add({
	referer: 'keyword',
	url:   'http://vision.ameba.jp/search/keyword/popular.do',
	api:   'http://vision.ameba.jp/api/get/search/keyword/new.do',
	page:  20
});
SearchMap.add({
	referer: 'keyword',
	url:   'http://vision.ameba.jp/search/keyword/rating.do',
	api:   'http://vision.ameba.jp/api/get/search/keyword/new.do',
	page:  20
});
SearchMap.add({
	referer: 'keyword',
	url:   'http://vision.ameba.jp/search/keyword/comment.do',
	api:   'http://vision.ameba.jp/api/get/search/keyword/new.do',
	page:  20
});
SearchMap.add({
	referer: 'keyword',
	url:   'http://vision.ameba.jp/search/keyword/favorite.do',
	api:   'http://vision.ameba.jp/api/get/search/keyword/new.do',
	page:  20
});
SearchMap.add({
	referer: 'tag',
	url:   'http://vision.ameba.jp/search/tag.do',
	api:   'http://vision.ameba.jp/api/get/search/tag.do',
	page:  10
});
SearchMap.add({
	referer: 'user',
	url:   'http://vision.ameba.jp/search/user.do',
	api:   'http://vision.ameba.jp/api/get/search/user.do',
	page:  10
});
SearchMap.add({
	referer: 'userFavorite',
	url:   'http://vision.ameba.jp/search/userFavorite.do',
	api:   'http://vision.ameba.jp/api/get/search/userFavorite.do',
	page:  10
});
SearchMap.add({
	referer: 'privateMovie',
	url:   'http://vision.ameba.jp/search/privateMovie.do',
	api:   'http://vision.ameba.jp/api/get/search/privateMovie.do',
	page:  15
});

var LIST_HANDLER = function(response) {
	if(!response.responseText){
		return;
	}

	var parser = new Parser();
	parser.parse(response.responseText);

	var count = parser.getCount();
	if(count <= 0){
		return;
	}
	var nextMovieAsc = parser.getValue(ELEMENT_TAGID, 0);
	var nextMovieDesc = parser.getValue(ELEMENT_TAGID, count - 1);
	var nextMovieRandom = parser.getValue(ELEMENT_TAGID, Math.floor(Math.random() * count));

	var ascUrl = SearchMap.getWatchUrl(nextMovieAsc) + '&type=asc&pos=0' ;
	var descUrl = SearchMap.getWatchUrl(nextMovieDesc) + '&type=desc&pos=' + (count - 1);
	var randomUrl = SearchMap.getWatchUrl(nextMovieRandom) + '&type=random';
	var html = '';

	html += '<div id="forward_play">' + 
            '<a href="' + ascUrl + '" accesskey="a">forward play</a>' + 
            '</div>';
	html += '<div id="reverse_play">' + 
            '<a href="' + descUrl + '" accesskey="b">reverse play</a>' + 
            '</div>';
	html += '<div id="random_play">' + 
            '<a href="' + randomUrl + '" accesskey="r">random play</a>' + 
            '</div>';

	GLOBAL_PANEL.create(html);

	document.addEventListener(
		"keydown", 
		function(e){
			//alt + a(auto play) or r(random play) key
			//random play start
			if(e.altKey && (e.keyCode == 65 || e.keyCode == 82)){
				location.href = randomUrl;
			//alt + n(new) key
			//recent movie list page
			}else if(e.altKey && e.keyCode == 78){
				location.href = 'http://vision.ameba.jp/search/new.do';
			//alt + p(popular) key
			//popular movie list page
			}else if(e.altKey && e.keyCode == 80){
				location.href = 'http://vision.ameba.jp/search/popular.do?range=1';
			//alt + q(quit and go to the top) key
			//top page
			}else if(e.altKey && e.keyCode == 81){
				location.href = 'http://vision.ameba.jp/index.do';
			};
		}, 
		true);
}

function main() {
	var url = location.href.split('?');
	url[0] = url[0].split(';')[0];

	if(url && url.length >= 2){
		var queryList = url[1].split('&');

		for(var i = 0 ; i < queryList.length ; i++){
			var param = queryList[i].split('=');
			if(!param || param.length < 2){
				continue;
			}
			if(param[0] == 'movie'){
				SearchMap.movie = param[1]; 
			}else if(param[0] == 'user'){
				SearchMap.user = param[1];
			}else if(param[0] == 'tag'){
				SearchMap.tag = param[1];
			}else if(param[0] == 'keyword'){
				SearchMap.keyword = param[1];
			}else if(param[0] == 'referer'){
				SearchMap.referer = param[1];
			}else if(param[0] == 'range'){
				SearchMap.range = param[1] - 0;
			}else if(param[0] == 'activePage'){
				SearchMap.activePage = param[1] - 0;
			}
		}
	}

	var api = SearchMap.getApiUrl(url[0]);
	if(!api){
		return;
	}

   	var reader = new Reader();
	reader.read(api, LIST_HANDLER);

}

main();


