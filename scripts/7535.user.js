// ==UserScript==
// @name             nicovideo status viewer
// @namespace        http://www.moaikids.net/
// @include          http://vision.ameba.jp/watch.do*
// @include          http://www.youtube.com/watch*
// @version          1.02
// ==/UserScript==

const NICOVIDEO_URL = 'http://www.nicovideo.jp/';
const NICOVIDEO_IMG_URL = 'http://www.nicovideo.jp/img/tpl/head/illust/000.gif';
const NICOVIDEO_WATCH_URL = 'http://www.nicovideo.jp/watch/';
const SIMPLEAPI_URL = 'http://img.simpleapi.net/small/';
const NICOVIDEO_API_VERSION = '20061206';
var NICOVIDEO_API_URLS = new Array();
NICOVIDEO_API_URLS.push('http://msg1.nicovideo.jp/api/');
NICOVIDEO_API_URLS.push('http://msg2.nicovideo.jp/api/');
NICOVIDEO_API_URLS.push('http://msg3.nicovideo.jp/api/');
NICOVIDEO_API_URLS.push('http://msg4.nicovideo.jp/api/');
NICOVIDEO_API_URLS.push('http://msg5.nicovideo.jp/api/');
NICOVIDEO_API_URLS.push('http://msg6.nicovideo.jp/api/');
NICOVIDEO_API_URLS.push('http://msg7.nicovideo.jp/api/');
NICOVIDEO_API_URLS.push('http://msg8.nicovideo.jp/api/');
NICOVIDEO_API_URLS.push('http://msg9.nicovideo.jp/api/');
NICOVIDEO_API_URLS.push('http://msg10.nicovideo.jp/api/');
var SITE = undefined;
var SITE_URL = undefined;

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

/**
 * XPath utility logic
 * special thanks this site -> http://lowreal.net/
 * @Reference URI http://lowreal.net/logs/2006/03/16/1
 * @Tags xpath js
 */
$X = function (exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
        case XPathResult.STRING_TYPE : return result.stringValue;
        case XPathResult.NUMBER_TYPE : return result.numberValue;
        case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
            result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var ret = [];
            for (var i = 0, len = result.snapshotLength; i < len ; i++) {
                ret.push(result.snapshotItem(i));
            }
            return ret;
        }
    }
    return null;
}


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

var Poster = Class.create();
Poster.extend({
	post: function(url,data,handler) {
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			onload: handler,
			data: data,
		});
	},
});

var Parser = Class.create();
Parser.extend({
	initialize: function() {
		this.head = undefined;
	},

	parse: function(data) {
		try {
			var wrap   = new XPCNativeWrapper(window, 'DOMParser()');
			var parser = new wrap.DOMParser();
			this.head  = parser.parseFromString(data, 'application/xhtml+xml');
		} catch(e) {
			throw 'parse error';
		}
	},
	
	getValue: function(name) {
		if(!this.head){
			return undefined;
		}
		
		var tags = this.head.getElementsByTagName(name);
		if(tags && tags[0]){
			var value = tags[0].childNodes[0].nodeValue;
		}

		return value;
	},
	
	getAttribute: function(name, attribute) {
		if(!this.head){
			return undefined;
		}
		
		var tags = this.head.getElementsByTagName(name);
		if(tags && tags[0]){
			var value = tags[0].getAttribute(attribute);
		}

		return value;
	}	
});


var SearchMap = {
	lists: new Array(),
	id: undefined,
	url: undefined,
	param: undefined,	
	prefix:undefined,
	suffix:undefined,

	add: function(m) {
		this.lists.push(m);
	},

	get: function(url) {
		for(var i = 0 ; i < this.lists.length ; i++) {
			var list = this.lists[i];
			if(list && list.url && url.indexOf(list.url) >= 0){
				return this.lists[i];
			}
		}
		
		return null;
   	},
};

SearchMap.add({
	id: 'AmebaVision',
	url:   'http://vision.ameba.jp/watch.do',
	param: 'movie',	
	prefix:'am',
	suffix:''
});
SearchMap.add({
	id: 'YouTube',
	url:   'http://www.youtube.com/watch',
	param: 'v',	
	prefix:'ut',
	suffix:''	
});

var NICOPAGE_HANDLER = function (response) {
	if(!response.responseText){
		return;
	}
	
	response.responseText.match(/flvplayer.swf\?v=(.*)&/);
	var threadId = RegExp.$1;

	if(threadId > 0){
		var postdata = '<thread res_from="0" version="' + NICOVIDEO_API_VERSION + '" thread="' + threadId + '" />';
		var poster = new Poster();
		for(var i = 0 ; i < NICOVIDEO_API_URLS.length ; i++){ 
			poster.post(NICOVIDEO_API_URLS[i], postdata, NICOAPI_HANDLER);
		}
	}
}

var NICOAPI_HANDLER = function (response) {
	if(!response.responseText){
		return;
	}
	
	var parser = new Parser();
	parser.parse(response.responseText);
	
	var resCount = parser.getAttribute("thread", "last_res");
	var viewCount = parser.getAttribute("view_counter", "video");
	
	if(resCount || viewCount){
		resCount = resCount ? resCount : 0;
		viewCount = viewCount ? viewCount : 0;
		if(SITE.id == 'AmebaVision'){
			renderAmebaVisionHtml(resCount, viewCount);
		}else if(SITE.id == 'YouTube'){
			renderYouTubeHtml(resCount, viewCount);
		}
	}
}

function renderAmebaVisionHtml(resCount, viewCount){
	var information = $X("//div[@class='information']")[0];
	var nico = document.createElement('dl');
	nico.innerHTML = '<dt></dt><dd><a href="' + SITE_URL + '" target="_blank"><img src="' + SIMPLEAPI_URL + SITE_URL + '" width="64" align="left" /></a>&nbsp;&nbsp;\u8996\u8074\u56DE\u6570: ' + viewCount + '<br />&nbsp;&nbsp;\u30B3\u30E1\u30F3\u30C8\u6570: ' + resCount + '<br />&nbsp;&nbsp;&gt;&gt;<a href="' + NICOVIDEO_URL + '" target="_blank">\u30CB\u30B3\u30CB\u30B3\u52D5\u753B</a></dd>';
	information.appendChild(nico);
	
}

function renderYouTubeHtml(resCount, viewCount){
	var information = $X("//table[@id='vidFacetsTable']/tbody")[0];
	var nico = document.createElement('tr');
	var nicoTdImg = document.createElement('td');
	var nicoTdDescription = document.createElement('td');
	
	nicoTdImg.innerHTML = '<a href="' + SITE_URL + '" target="_blank"><img src="' + SIMPLEAPI_URL + SITE_URL + '" width="48"/></a>';
	nicoTdDescription.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;view: ' + viewCount + '<br />&nbsp;&nbsp;&nbsp;&nbsp;comment: ' + resCount + '<br />&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;<a href="' + NICOVIDEO_URL + '" target="_blank">http://www.nicovideo.jp/</a>';
	nico.appendChild(nicoTdImg);
	nico.appendChild(nicoTdDescription);
	information.appendChild(nico);
}

function main() {
	
	var site = SearchMap.get(location.href);
	if(!site){
		return;
	}

	var query = location.href.split('?')[1];
	var queryList = query.split('&');
	var nicoid = undefined;
	
	for(var i = 0 ; i < queryList.length ; i++){
		var param = queryList[i].split('=');
		if(!param || param.length < 2){
			continue;
		}
		if(param[0] == site.param){
			nicoid = param[1];
			break;
		}
	}
	if(!nicoid){
		return;
	}
	var nicourl = NICOVIDEO_WATCH_URL + site.prefix + nicoid + site.suffix;
	SITE     = site;
	SITE_URL = nicourl;
	
  	var reader = new Reader();
	reader.read(nicourl, NICOPAGE_HANDLER);
}

main();



