// ==UserScript==
// @name             AmebaVision Video Random Play
// @namespace        http://www.moaikids.net/
// @include          http://vision.ameba.jp/watch.do*
// @include          http://vision.ameba.jp//watch.do*
// @version          1.02
// ==/UserScript==

const WATCH_URL = 'http://vision.ameba.jp/watch.do'
const DETAIL_API_URL = 'http://vision.ameba.jp/api/get/detailMovie.do?movie='
const DEFAULT_LIST_API = 'relation';
const DEFAULT_TYPE = 'random';
const SUBSTITUTION_LIST_API = 'recent';
const ELEMENT_PLAYTIME = 'playTimeSecond';
const ELEMENT_TAGID = 'tagId';
const ELEMENT_TITLE = 'title';
const ELEMENT_AMEBA_ID = 'amebaId';
const DURATION = 10;

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
	},
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
	
	getCount: function() {
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
var VALUE_PLAYTIME = 120;
var VALUE_CURRENT_TAGID = 0;
var VALUE_NEXT_TAGID = 0;
var VALUE_NEXT_TITLE = "";
var VALUE_AMEBA_ID = "";
var SearchMap = {
	movie: undefined,
	keyword: undefined,
	user: undefined,
	tag: undefined,
	range: undefined,
	referer: undefined,
	result: undefined,
	type: undefined,
	activePage: undefined,
	pos: undefined,
		
	lists: new Array(),
	add: function(m) {
		this.lists.push(m);
	},

	getApiUrl: function() {
		if(!this.referer){
			this.referer = DEFAULT_LIST_API;
		}
		for(var i = 0 ; i < this.lists.length ; i++) {
			var search = this.lists[i];
			if(this.referer == search.referer){
				this.result = search;
				break;
			}
		}
		if(!this.result ){
			return null;
		}

		var url = this.result.api;
		url += this.getQuery(this.result.isFirst);
		return url;
   	},

	getWatchUrl: function(nextMovie){
		var url = WATCH_URL + "?referer=" + this.referer;
		url += this.getQuery(false, nextMovie);

		return url;
	},

	getListUrl: function(){
		var url = this.result.list;
		url += this.getQuery(this.result.isFirst);

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
		if(this.type){
			url += isFirst ? "?" : "&";
			url +=  "type=" + this.type;
			isFirst = false;
		}
		if(this.activePage){
			url += isFirst ? "?" : "&";
			url +=  "activePage=" + this.activePage;
			url += "&offset=" + ((this.activePage - 1) * this.result.page);
			isFirst = false;
		}
		if(this.pos >= 0){
			url += isFirst ? "?" : "&";
			url +=  "pos=" + this.pos;
			isFirst = false;
		}
		return url;
	}
};

SearchMap.add({
	referer: 'relation',
	api:   'http://vision.ameba.jp/api/get/relationMovie.do',
	list:  'http://vision.ameba.jp/search/new.do',
	isFirst: true,
	page:    0
});
SearchMap.add({
	referer: 'popular',
	api:   'http://vision.ameba.jp/api/get/search/popular.do',
	list:  'http://vision.ameba.jp/search/popular.do',
	isFirst: true,
	page:    20
});
SearchMap.add({
	referer: 'rating',
	api:   'http://vision.ameba.jp/api/get/search/rating.do',
	list:  'http://vision.ameba.jp/search/rating.do',
	isFirst: true,
	page:    20
});
SearchMap.add({
	referer: 'comment',
	api:   'http://vision.ameba.jp/api/get/search/comment.do',
	list:  'http://vision.ameba.jp/search/comment.do',
	isFirst: true,
	page:    20
});
SearchMap.add({
	referer: 'favorite',
	api:   'http://vision.ameba.jp/api/get/search/favorite.do',
	list:  'http://vision.ameba.jp/search/favorite.do',
	isFirst: true,
	page:    20
});
SearchMap.add({
	referer: 'recent',
	api:   'http://vision.ameba.jp/api/get/recentMovie.do',
	list:  'http://vision.ameba.jp/search/new.do',
	isFirst: true,
	page:    0
});
SearchMap.add({
	referer: 'keyword',
	api:   'http://vision.ameba.jp/api/get/search/keyword/new.do',
	list:  'http://vision.ameba.jp/search/keyword/new.do',
	isFirst: true,
	page:    20
});
SearchMap.add({
	referer: 'user',
	api:   'http://vision.ameba.jp/api/get/search/user.do',
	list:  'http://vision.ameba.jp/search/user.do',
	isFirst: true,
	page:    10
});
SearchMap.add({
	referer: 'tag',
	api:   'http://vision.ameba.jp/api/get/search/tag.do',
	list:  'http://vision.ameba.jp/search/tag.do',
	isFirst: true,
	page:    10
});
SearchMap.add({
	referer: 'userFavorite',
	api:   'http://vision.ameba.jp/api/get/search/userFavorite.do',
	list:  'http://vision.ameba.jp/search/userFavorite.do',
	isFirst: true,
	page:    10
});
SearchMap.add({
	referer: 'privateMovie',
	api:   'http://vision.ameba.jp/api/get/search/privateMovie.do',
	list:  'http://vision.ameba.jp/search/privateMovie.do',
	isFirst: true,
	page:    15
});

var LIST_HANDLER = function(response) {
	if(!response.responseText){
		return;
	}
	
	var parser = new Parser();
	parser.parse(response.responseText);

	var count = parser.getCount();
	
	if(count <= 0){
		SearchMap.referer = SUBSTITUTION_LIST_API;
	   	var reader = new Reader();
		var url = SearchMap.getApiUrl();
		SearchMap.referer = DEFAULT_LIST_API;
		SearchMap.type = DEFAULT_TYPE;
		reader.read(url, LIST_HANDLER);
		return;
	}
	
	var tagId;
	var title;
	if(SearchMap.type == 'asc'){
		var target = SearchMap.pos + 1;

		if(SearchMap.result.page <= target){
			if(count >= SearchMap.result.page){
				SearchMap.activePage = SearchMap.activePage ? SearchMap.activePage + 1 : 2;
			}else{
				SearchMap.activePage = 1;
			}
			target = 0;
		}
		tagId = parser.getValue(ELEMENT_TAGID, target);
		title = parser.getValue(ELEMENT_TITLE, target);
		SearchMap.pos = target;
	}else if(SearchMap.type == 'desc'){
		var target = SearchMap.pos - 1;
		if(target < 0){
			if(SearchMap.activePage && SearchMap.activePage > 1){
				SearchMap.activePage--;
			}
			target = count - 1;
		}
		tagId = parser.getValue(ELEMENT_TAGID, target);
		title = parser.getValue(ELEMENT_TITLE, target);
		SearchMap.pos = target;
	}else{
		for(var i = 0 ; i < 5 ; i++){
			var target = Math.floor(Math.random() * count);
			tagId = parser.getValue(ELEMENT_TAGID, target);
			title = parser.getValue(ELEMENT_TITLE, target);
			if(tagId == VALUE_CURRENT_TAGID){
				continue;
			}
		}
	}

	VALUE_NEXT_TAGID = tagId;
	VALUE_NEXT_TITLE = title;

	goNext();
}

var DETAIL_HANDLER = function (response) {
	if(!response.responseText){
		return;
	}

	var parser = new Parser();
	parser.parse(response.responseText);
	var playtimeString = parser.getValue(ELEMENT_PLAYTIME);
	var param = playtimeString.split(":");
	if(!param || param.length != 2){
		return;
	}
	VALUE_PLAYTIME = (param[0] * 60 - 0) + (param[1] - 0);
	VALUE_CURRENT_TAGID =  parser.getValue(ELEMENT_TAGID);
	VALUE_AMEBA_ID =  parser.getValue(ELEMENT_AMEBA_ID);

   	var reader = new Reader();
	reader.read(SearchMap.getApiUrl(), LIST_HANDLER);
	
}

function main() {
	var query = location.href.split('?')[1];
	var queryList = query.split('&');

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
		}else if(param[0] == 'type'){
			SearchMap.type = param[1];
		}else if(param[0] == 'pos'){
			SearchMap.pos = param[1] - 0;
		}else if(param[0] == 'activePage'){
			SearchMap.activePage = param[1] - 0;
		}
	}

  	var reader = new Reader();
	reader.read(DETAIL_API_URL + SearchMap.movie, DETAIL_HANDLER);

}

function goNext(){
	var url = SearchMap.getWatchUrl(VALUE_NEXT_TAGID);
	var html = '<div id="next_movie">next:' + 
                   '<a href="' + url + '" accesskey="n">' + VALUE_NEXT_TITLE + '</a>' + 
                   '</div>';

	GLOBAL_PANEL.create(html);

	var timeout = (VALUE_PLAYTIME + DURATION) * 1000;
	setTimeout(function(){location.href = url;},timeout);

	document.addEventListener(
		"keydown", 
		function(e){
			//alt + c(change) key
			//play next movie
			if(e.altKey && e.keyCode == 67){
				location.href = url;
			//alt + a(all) or l(list) key
			//movie list page
			}else if(e.altKey && (e.keyCode == 65 || e.keyCode == 76)){
				location.href = SearchMap.getListUrl();
			//alt + n(new) key
			//recent movie list page
			}else if(e.altKey && e.keyCode == 78){
				location.href = 'http://vision.ameba.jp/search/new.do';
			//alt + p(popular) key
			//popular movie list page
			}else if(e.altKey && e.keyCode == 80){
				location.href = 'http://vision.ameba.jp/search/popular.do?range=1';
			//alt + u(user) key
			//popular movie list page
			}else if(e.altKey && e.keyCode == 85){
				location.href = 'http://vision.ameba.jp/search/user.do?user=' + VALUE_AMEBA_ID;
			//alt + q(quit and go to the top) key
			//top page
			}else if(e.altKey && e.keyCode == 81){
				location.href = 'http://vision.ameba.jp/index.do';
			}
		}, 
		true);

}


main();



