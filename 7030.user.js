// ==UserScript==
// @name             AmebaVision Movie Searcher
// @namespace        http://www.moaikids.net/
// @include          http://ja.wikipedia.org/wiki/*
// @include          http://www.youtube.com/results*
// @include          http://www.google.co.jp/search*
// @version          1.00
// ==/UserScript==

const WATCH_URL = 'http://vision.ameba.jp/watch.do?movie=';
const API_URL = 'http://vision.ameba.jp/api/get/search/keyword/new.do?keyword=';
const SEARCH_URL = 'http://vision.ameba.jp/search/keyword/new.do?keyword=';
const ELEMENT_THUMBNAIL = 'imageUrlSmall';
const ELEMENT_TITLE = 'title';
const ELEMENT_TAG_ID = 'tagId';
const MAX_MOVIE_LENGTH = 5;
var PANEL_ALIGN = 'left';
var SITE_QUERY = '';


function main() {
	var site = Site.get(location.href);

	if(!site){
		return;
	}

	if(site.align && site.align.length > 0){
		PANEL_ALIGN = site.align;
	}
	
	var query = location.href.substring(site.url.length);

	if(site.query && site.query.length > 0){
		query = query.replace('?','');
		var queryList = query.split('&');
		for(var i = 0 ; i < queryList.length ; i++){
			var param = queryList[i].split('=');
			if(!param || param.length < 2){
				continue;
			}
			if(param[0] == site.query){
				query = param[1];
				break;
			}
		}
	}
	SITE_QUERY = query;
	
	var reader = new Reader();
    reader.read(API_URL + query);

}

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
	initialize: function() {
		this.panel = new Panel();
	},

	read: function(url) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: this.onSuccess.bind(this),
			onerror: this.onError.bind(this)
		});
	},

   onSuccess: function(response) {
		if(!response.responseText)
			return this.onError();

		try {
			var parser = new Parser();
			parser.parse(response.responseText);
			
			var count = parser.getCount();
			if(count <= 0 ){
				return;
			}
			if(count > MAX_MOVIE_LENGTH){
				count = MAX_MOVIE_LENGTH;
			}
			
			var html = '<div id="ameba_vision_movie_search_result">';
			for(var i = 0 ; i < count ; i++){
				var thumbnail = parser.getValue(ELEMENT_THUMBNAIL, i);
				var title     = parser.getValue(ELEMENT_TITLE, i);
				var tagId     = parser.getValue(ELEMENT_TAG_ID, i);
				
				html += '<div id="ameba_vision_movie_info">' +
				        '<a href="' + WATCH_URL + tagId + '" target="_blank">' + 
				        '<div id="ameba_vision_movie_title"><b>' + title + '</b></div>' +
				        '<img src="' + thumbnail + '" />' + 
				        '</a>' +
				        '</div>';
			}
			html += '<a href="' + SEARCH_URL + SITE_QUERY + '" target="_blank">AmebaVision</a>' + 
			        '</div>';

			this.panel.create(html);
		} catch(e) {
			this.panel.create('Parse Error');
			return;
		}
   },

	onError: function() {
		this.panel.create('HTTP Load Error');
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

			if(PANEL_ALIGN == 'right'){
				right = 0;
			}else{
				left  = 0;
			}
			padding  = '2px';
			opacity  = 0.8;
			fontSize = 'x-small';
			color    = '#000000';
//			backgroundColor = '#EEEEEE';
			backgroundColor = '#98FB98';
			border   = '1px solid #C0C0C0';
			width = '150px'

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

   insertError: function(msg) {
      this.insert('<font color="red">' + msg + '</font>');
   }
});



var PatternMap = {
	lists: new Array(),

	add: function(m) {
		this.lists.push(m);
	},

	get: function(url) {
		if(this.result){
			return this.result;
		}

		for(var i = 0 ; i < this.lists.length ; i++) {
			var site = this.lists[i];
			if(url.indexOf(site.url) >= 0){
				return this.result = site;
			}
		}
		return null;
   },
};

var Site = PatternMap;
// Google(ja)
PatternMap.add({
   url:   'http://www.google.co.jp/search',
   query: 'q',
   align:   'right'
});
// Wikipedia(ja)
PatternMap.add({
   url:   'http://ja.wikipedia.org/wiki/',
   query: '',
   align:   'left'
});
// YouTube
PatternMap.add({
   url:   'http://www.youtube.com/results',
   query: 'search_query',
   align:   'right'
});


main();

