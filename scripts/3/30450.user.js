// ==UserScript==
// @name           Amebata Kaigi Alert Box
// @namespace      http://www.moaikids.net/
// @include        http://amebabbs.ameba.jp/
// @include        http://amebabbs.ameba.jp/list*
// @include        http://amebabbs.ameba.jp/thread/*
// ==/UserScript==

const STAFF_BLOG_RSS_URL = 'http://rssblog.ameba.jp/amebabbs-staff/rss20.xml';
const THREAD_API_URL = 'http://api.amebabbs.ameba.jp/xml/thread/res/';
const USER_THREAD_API_URL = 'http://api.amebabbs.ameba.jp/nocache/xml/thread/user/';
const USER_RES_API_URL = 'http://api.amebabbs.ameba.jp/nocache/xml/watchlist/user/';

const THREAD_RESULT_KEY = "thread_result";
const THREAD_RESULT_LIMIT = 10;

const AMEBA_ID = "";


/** common **/
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


/** api handling **/
var Reader = Class.create();
Reader.extend({
	read: function(url,handler,method,data) {
		if(!method){
			method = 'GET';
		}
		GM_xmlhttpRequest({
			method: method,
			url: url,
			onload: handler,
			data: data
		});
	},
});

var Parser = Class.create();
Parser.extend({
	initialize: function() {
		this.head;
	},

	parse: function(data) {
		try {
			var wrap   = new XPCNativeWrapper(window, 'DOMParser()');
			var parser = new wrap.DOMParser();
			this.head  = parser.parseFromString(data, 'application/xhtml+xml');
			return this.head;
		} catch(e) {
			throw 'parse error';
		}
	},

	getNode: function(name, count){
		if(!this.head){
			return undefined;
		}
		if(!count){
			count = 0;
		}
		
		var tag = (this.head.getElementsByTagName(name))[count];
		if(!tag){
			return "";
		}
		return tag.childNodes[0];

	},

	getValue: function(name, count) {
		if(!this.head){
			return undefined;
		}
		if(!count){
			count = 0;
		}
		
		var tag = (this.head.getElementsByTagName(name))[count];
		if(!tag){
			return "";
		}
		var node = tag.childNodes[0];

		return node ? node.nodeValue : "";

	}
});

/** view panel handling **/
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
		//if(typeof msg  == 'string') {
			this.panel.innerHTML += msg;
		//} else {
		//	//this.panel.innerHTML = '';
		//	this.panel.appendChild(msg);
		//}
	},
});

var GLOBAL_PANEL = new Panel();
var STAFF_BLOG_RSS_HANDLER = function (response) {
	if(!response.responseText){
		return;
	}

	var parser = new Parser();
	var data = parser.parse(response.responseText);

	var title = parser.getValue("title", 1);
	var url = parser.getValue("link", 1);
	if(title.length > 10){
		title = title.substring(0, 10) + "...";	
	}

	GLOBAL_PANEL.insert('<div><div>staff blog</div><div><a href="' + url + '" target="_blank">' + title  + '</a></div></div>');	
}

var RESULT_THREAD_HANDLER = function (response) {
	if(!response.responseText){
		return;
	}

	var parser = new Parser();
	var data = parser.parse(response.responseText);

	var title = parser.getValue("title", 0);
	var url = parser.getValue("url", 0);
	if(title.length > 10){
		title = title.substring(0, 10) + "...";	
	}

	GLOBAL_PANEL.insert('<div><div><a href="' + url + '">' + title  + '</a></div></div>');	
}

var MY_THREAD_HANDLER = function (response) {
	threadRendler(response, 'myself thread');
}

var RES_THREAD_HANDLER = function (response) {
	threadRendler(response, 'res thread');
}

function threadRendler(response, title){
	if(!response.responseText){
		return;
	}

	var parser = new Parser();
	var data = parser.parse(response.responseText);

	var html = '<div><div>' + title + '</div>';
	for(var i = 0 ; i < 3 ; i++){
		var title = parser.getValue("title", i);
		var url = parser.getValue("url", i);
		if(title.length > 10){
			title = title.substring(0, 10) + "...";	
		}
		html += '<div><a href="' + url + '">' + title  + '</a></div>'
	}
	html += '</div>';
	GLOBAL_PANEL.insert(html);
}


function removeHtmlTags(str){
        var result = "";
        var tagBuffer = "";
        var isTag = false; 
        for(var i=0; i < str.length ; i++){
	    var ch = str.charAt(i); 
            if(ch == '<'){ 
            	if(isTag){
            		result += tagBuffer;
            		tagBuffer = "";
            	}
                isTag = true; 
                tagBuffer += ch;
            }else if(ch == '>'){
            	if(isTag){
            		tagBuffer = "";
            	}else{
            		result += ch; 
            	}
                isTag = false;
            }else if(isTag){
            	tagBuffer += ch;
            }else if(!isTag){ 
            	result += ch; 
            }
        }
        result += tagBuffer;
        
        return result;

}

function main() {
	var threadKey = "";
	if(location.href.indexOf("http://amebabbs.ameba.jp/thread/") == 0){
		threadKey = location.href.substring("http://amebabbs.ameba.jp/thread/".length, (location.href.length - 1));
	}

	var results = GM_getValue(THREAD_RESULT_KEY);
	if(threadKey){
		if(results){
			if(results.indexOf(threadKey) >= 0){
				results = results.replace(threadKey + "," , "");	
			}
			results = threadKey + "," + results;
		}else{
			var resultList = results.split(",");
			resultList.pop();
			if(resultList.length >= THREAD_RESULT_LIMIT){
				resultList.pop();
			}
			results = threadKey + "," + resultList.join(",") + ",";
		}
		GM_setValue(THREAD_RESULT_KEY, results);
	}

	GLOBAL_PANEL.create("<div><div></div></div>");
  	var reader = new Reader();

	var resultList = results.split(",");
	resultList.pop();
	GLOBAL_PANEL.insert('<div><div>watch result</div></div>');	
	for(var i = 0 ; i < resultList.length && i < THREAD_RESULT_LIMIT; i++){
		var result = resultList[i];
		reader.read(THREAD_API_URL + result + "/", RESULT_THREAD_HANDLER);
	}
	
	if(AMEBA_ID){
		setTimeout(getMyThread, 1000);
		setTimeout(getResThread, 2000);
	}
	setTimeout(getStaffBlog, 5000);
}

function getMyThread(){
	var reader = new Reader();
	reader.read(USER_THREAD_API_URL + AMEBA_ID + "/", MY_THREAD_HANDLER);
}

function getResThread(){
	var reader = new Reader();
	reader.read(USER_RES_API_URL + AMEBA_ID + "/", RES_THREAD_HANDLER);
}

function getStaffBlog(){
	var reader = new Reader();
	reader.read(STAFF_BLOG_RSS_URL, STAFF_BLOG_RSS_HANDLER);
}

main();

