// ==UserScript==
// @name           Minibuffer Bookmark Command
// @namespace      http://white.s151.xrea.com/
// @description    bookmark command for minibuffer
// @include        *
// ==/UserScript==

var SCRIPT_VERSION = "2008.02.24"
var SCRIPT_URL     = "http://userscripts.org/scripts/show/14490"

// usage:
//
// location | bookmark -h --tag "--comment=this is test"
// pinned-node | bookmark -h --tag | clear-pin
// current-node | bookmark -h "--tag=firefox greasemonkey" --comment
// pinned-or-current-node | bookmark -h | clear-pin

// or use shortcutkey 'b' or 'B'
// 
// b  --- bookmark with no comment and no tags (default)
// B  --- bookmark with tags and comment

// in shortcut key, which SBM do you use?
// 
// --hatena    -h   ... hatena bookmark
// --livedoor  -l   ... livedoor clip
// --delicious -d   ... del.icio.us
var SBM = '-h'

// for 'b'
var TAG = ''

if(!document.body) return;
var runMinibufferBookmarkCommand = function(){

	var BookmarkL = {};
	var BookmarkS = {};
	var regexp       = new RegExp('^-');
	var regexp_short = new RegExp('^-\\w');
	var regexp_long  = new RegExp('^--\\w');

	var addBookmark = function(long_name, short_name, bookmark_class){
		BookmarkL[long_name]  = bookmark_class;
		BookmarkS[short_name] = bookmark_class;
	}
	
	// tags
	var setTags = function(tags){
		return GM_setValue('tags', tags.toSource());
	}
	var getTags = function(){
		return eval(GM_getValue('tags', '[]'))
	}

	/////////////////////////////////////////////////////////////////
	// hatena bookmark
	var hatenab = new function(){
		var self = this;
		this.checkLogin = function(html){
			var input = $X('//input', html);
			return input.length != 0;
		}
		this.post = function(async, opt){
			var comment = self.comment;
			if (self.tags.length) comment = '[' + self.tags.join('][') + ']' + comment;
			var request = [
				"mode=enter",
				"&eid=", opt.eid,
				"&url=", encodeURIComponent(opt.url),
				"&rkm=", encodeURIComponent(opt.rkm),
				"&is_bm=", opt.is_bm,
				"&title=", encodeURIComponent(opt.title),
				"&comment=", encodeURIComponent(comment)
				].join('');
			GM_xmlhttpRequest({
			  method: 'POST',
			  url: "http://b.hatena.ne.jp/add",
			  headers: {
				  'Content-Type': 'application/x-www-form-urlencoded'
				},
			  onload: function(res){
				  async.ready();
				},
			  onerror: function(res){log('onerror',res.responseText, '\n',res.responseHeaders)},
			  data: request
			});
		}
		this.getParam = function(async, arg){
			window.Minibuffer.status('bookmark.hatena'+self.time,'Bookmark ' + arg.progress + '%');
			var callback = function(res){
				var html = res.responseText.createHTML();
				if(!self.checkLogin(html)){
					async.error();
					return;
				}
				var inputs = $X('//input', html);
				var res = {};
				inputs.forEach(function(d){
					res[d.getAttribute('name')] = d.getAttribute('value');
				});
				if(keys(res).length == 1){
					// already bookmarked
					var a = $X('//ul[@class="entry"]/li[1]/a', html);
					var text = a[0].textContent;
					window.Minibuffer.message('<small>'+text+'</small><br/> has already bookmarked.', 2000);
					async.ready();
				}else{
					// not yet bookmarked
					self.post(async, res);
				}
			}
			GM_xmlhttpRequest({
			  method: 'GET',
			  url: "http://b.hatena.ne.jp/add?mode=confirm&is_bm=1&url="+encodeURIComponent(arg.url),
			  onload: callback,
			  onerror: function(res){log('onerror',res.responseText, '\n',res.responseHeaders)},
			});
		}
		this.bookmark = function(urls, tags, comment){
			if(!urls.length) return;
			self.tags = tags;
			self.comment = comment;
			var total = urls.length;
			self.time = new Date().getTime();
			AsyncOrderedList(self.getParam, urls.map(function(url,i){
				return {
				  url: url,
				  progress: Math.floor(i / total * 100)
				}
			})).ready(function(){
				window.Minibuffer.status('bookmark.hatena'+self.time,'Bookmark 100 %', 1000);
			}).error(function(){
				window.Minibuffer.status('bookmark.hatena'+self.time,'Bookmark failed. you are not logging hatena in.', 3000);
			})
		}
		this.getTags = function(){
			// orz
			var a = new Async();
			var callback = function(res){
				var html = res.responseText.createHTML();
				if(!self.checkLogin(html)) {
					a.ready([]);
					return;
				}
				var script = $X('//script[@type="text/javascript"]', html)[6];
				var re = new RegExp("'",'g');
				var lst = script.textContent.match(/new Array\((.*)\)/)[1].replace(re,'').split(',');
				a.ready(lst)
			}
			GM_xmlhttpRequest({
			  method: 'GET',
			  url: "http://b.hatena.ne.jp/add?mode=confirm&is_bm=1&url=http://aaaaaaaaaaaaaaaaaaaaaaaa",
			  onload: callback,
			  onerror: function(res){a.ready([])},
			});
			return a;
		}
	}

	/////////////////////////////////////////////////////////////////
	// livedoor clip
	var livedoorclip = new function(){
		var self = this;
		this.checkLogin = function(html){
			var login = $X('//form[@name="loginForm"]', html);
			return login.length == 0;
		}
		this.post = function(async, opt){
			var request = [
				"title=", encodeURIComponent(opt.title),
				"&postkey=", encodeURIComponent(opt.postkey),
				"&link=", encodeURIComponent(opt.link),
				"&tags=", encodeURIComponent(self.tags.join(' ')),
				"&notes=", encodeURIComponent(self.comment|''),
				].join('');
			GM_xmlhttpRequest({
			  method: 'POST',
			  url: "http://clip.livedoor.com/clip/add",
			  headers: {
				  'Content-Type': 'application/x-www-form-urlencoded'
				},
			  onload: function(res){
				  async.ready();
				},
			  onerror: function(res){log('onerror',res.responseText, '\n',res.responseHeaders)},
			  data: request
			});
		}
		this.getParam = function(async, arg){
			window.Minibuffer.status('bookmark.livedoor'+self.time,'Bookmark ' + arg.progress + '%');
			var callback = function(res){
				var html = res.responseText.createHTML();
				if(!self.checkLogin(html)){
					async.error();
					return;
				}
				var delete_form = $X('//form[@action="/clip/delete"]', html);
				if(delete_form.length){
					// already bookmarked
					var text = $X('id("my_title")', html)[0].value;
					window.Minibuffer.message('<small>'+text+'</small><br/> has already bookmarked.', 2000);
					async.ready();
				}else{
					// not yet bookmarked
					var add_form = $X('//form[@action="/clip/add"]//input | //form[@action="/clip/add"]//textarea', html);
					var res = {};
					add_form.forEach(function(d){
						res[d.getAttribute('name')] = d.getAttribute('value');
					});
					self.post(async, res);
				}
			}
			GM_xmlhttpRequest({
			  method: 'GET',
			  url: "http://clip.livedoor.com/clip/add?link="+encodeURIComponent(arg.url),
			  onload: callback,
			  onerror: function(res){log('onerror',res.responseText, '\n',res.responseHeaders)},
			});
		}
		this.bookmark = function(urls, tags, comment){
			if(!urls.length) return;
			self.tags = tags;
			self.comment = comment;
			var total = urls.length;
			self.time = new Date().getTime();
			AsyncOrderedList(self.getParam, urls.map(function(url,i){
				return {
				  url: url,
				  progress: Math.floor(i / total * 100)
				}
			})).ready(function(){
				window.Minibuffer.status('bookmark.livedoor'+self.time,'Bookmark 100 %', 1000);
			}).error(function(){
				window.Minibuffer.status('bookmark.livedoor'+self.time,'Bookmark failed. you are not logging livedoor in.', 3000);
			})
		}
		this.getTags = function(){
			var a = new Async();
			var callback = function(res){
				var html = res.responseText.createHTML();
				if(!self.checkLogin(html)) {
					a.ready([]);
					return;
				}
				var span = $X('id("tag_list")/span', html);
				a.ready(span.map(function(arg){return arg.textContent}));
			}
			GM_xmlhttpRequest({
			  method: 'GET',
			  url: "http://clip.livedoor.com/clip/add?link=http://aaaaaaaaaaaaaaaaaaaaaaaaaaa",
			  onload: callback,
			  onerror: function(res){a.ready([])},
			});
			return a;
		}
	}

	/////////////////////////////////////////////////////////////////
	// del.icio.us
	var delicious = new function(){
		var self = this;
		this.checkLogin = function(html){
			return $X('id("header-auth-links")/a[@href="/logout"]', html).length;
		}
		this.post = function(async, opt){
			var request = [
				"url=", encodeURIComponent(opt.url),
				"&oldurl=", encodeURIComponent(opt.url),
				"&private=", opt.private,
				"&description=", encodeURIComponent(opt.description),
				"&notes=", encodeURIComponent(self.comment),
				"&tags=", encodeURIComponent(self.tags.join(' ')),
				"&v=", opt.v,
				"&key=", opt.key,
				].join('');
			GM_xmlhttpRequest({
			  method: 'POST',
			  url: opt.action,
			  headers: {
				  'Content-Type': 'application/x-www-form-urlencoded'
				},
			  onload: function(res){
				  async.ready();
				},
			  onerror: function(res){log('onerror',res.responseText, '\n',res.responseHeaders)},
			  data: request
			});
		}
		this.getTitle = function(async, opt){
			var callback = function(res){
				var html = res.responseText.createHTML();
				opt.description = $X('//title', html)[0].text;
				self.post(async, opt);
			}
			GM_xmlhttpRequest({
			  method: 'GET',
			  url: opt.url,
			  onload: callback,
			  onerror: function(res){log('onerror',res.responseText, '\n',res.responseHeaders)},
			})
		}
		this.getParam = function(async, arg){
			window.Minibuffer.status('bookmark.del.icio.us'+self.time,'Bookmark ' + arg.progress + '%');
			var url  = arg.url;
			if(!url) return;
			var callback = function(res){
				var html = res.responseText.createHTML();
				if(!self.checkLogin(html)){
					async.error();
					return;
				}
				var date = $X('//form[@id="delForm"]//input[@name="date"]', html);
				if(date.length != 0){
					// already bookmarked
					var text = $X('id("description")', html)[0].value;
					window.Minibuffer.message('<small>'+text+'</small><br/> has already bookmarked.', 2000);
					async.ready();
				}else{
					// not yet bookmarked
					var form = $X('//form[@id="delForm"]', html)[0];
					var inputs = $X('//form[@id="delForm"]//input', html);
					var res = {};
					inputs.forEach(function(node){
						res[node.getAttribute('name')] = node.getAttribute('value');
					});
					var re = new RegExp('^https?://[^/]+/');
					res.action = 'http://del.icio.us/' + form.action.replace(re, '');
					self.getTitle(async, res);
				}
			}
			GM_xmlhttpRequest({
			  method: 'GET',
			  url: "http://del.icio.us/post?v=4&url="+encodeURIComponent(url),
			  onload: callback,
			  onerror: function(res){log('onerror',res.responseText, '\n',res.responseHeaders)},
			});
		}
		this.bookmark = function(urls, tags, comment){
			if(!urls.length) return;
			self.tags = tags;
			self.comment = comment;
			var total = urls.length;
			self.time = new Date().getTime();
			AsyncOrderedList(self.getParam, urls.map(function(url,i){
				return {
				  url: url,
				  progress: Math.floor(i / total * 100)
				}
			})).ready(function(){
				window.Minibuffer.status('bookmark.del.icio.us'+self.time,'Bookmark 100 %', 1000);
			}).error(function(){
				window.Minibuffer.status('bookmark.del.icio.us'+self.time,'Bookmark failed. you are not logging del.icio.us in.', 3000);
			})
		}
		this.getTags = function(){
			var a = new Async();
			var callback = function(res){
				var tags = $X('//tag', res.responseText.createHTML());
				var lst  = tags.length ? tags.map(function(d){return d.getAttribute('tag')}) : [];
				a.ready(lst);
			}
			GM_xmlhttpRequest({
			  method: 'GET',
			  url: "https://api.del.icio.us/v1/tags/get",
			  onload: callback,
			  onerror: function(res){a.ready([])},
			});
			return a;
		}
	}

	addBookmark('hatena',    'h', hatenab);
	addBookmark('livedoor',  'l', livedoorclip);
	addBookmark('delicious', 'd', delicious);

	window.Minibuffer.addCommand({
	  name: 'bookmark',
	  command: function(stdin){
		  var args = this.args;
		  var urls, nodes;
		  if(!stdin.length){
			  // command line is 'bookmark'
			  urls = [location.href];
			  nodes = new Array(1);
		  }else if(stdin.every(function(a){return typeof a == 'string'})){
			  // command line is 'location | bookmark' or 'pinned-link | bookmark'
			  urls = stdin;
			  nodes = new Array(urls.length);
		  }else if(window.LDRize){
			  if(stdin.every(function(a){return a.nodeName == 'A'})){
				  urls = stdin.map(function(node){return node.href});
				  nodes = new Array(urls.length);
			  }else{
				  // assuming that command line is 'current-node | bookmark' or 'pinned-node | bookmark'
				  var siteinfo = window.LDRize.getSiteinfo();
				  var link = siteinfo.link;
				  if(link){
					  nodes = stdin;
					  urls = nodes.map(function(node){
						  var res = $X(link,node);
						  if(!res.length) return;
						  return res[0].href
						});
				  }
			  }
		  }
		  var bookmark = function(tags, comment){
			  var idx = args.position(function(e){return !e.match(regexp)});
			  if(idx < 0) return stdin;
			  if(typeof(idx) == 'boolean' && idx == false) idx = args.length;
			  for(var i=0; i<idx; i++){
				  if(args[i].match(regexp_long)){ // long option
					  var clazz = BookmarkL[args[i].slice(2)];
					  if(clazz && clazz.bookmark) clazz.bookmark(urls, tags, comment);
				  }else if(args[i].match(regexp_short)){ // short option
					  var bookmarks = args[i].match(/\w/g);
					  for(var j=0; j<bookmarks.length; j++){
						  var clazz = BookmarkS[bookmarks[j]];
						  if(clazz && clazz.bookmark) clazz.bookmark(urls, tags, comment);
					  }
				  }
			  }
		  }
		  
		  // specify by commandline
		  var getUserTags = function(){
			  var re = new RegExp('--tag=.*');
			  var res = args.find(function(a){return a.match(re)});
			  if(res){
				  var tags = res.match(new RegExp('=(.*)'))[1];
				  if(tags.length){
					  return tags.split(' ');
				  }
			  }
			  return [];
		  }
		  var getUserComment = function(){
			  var re = new RegExp('--comment=.*');
			  var res = args.find(function(a){return a.match(re)});
			  return res ? res.match(new RegExp('=(.*)'))[1] : '';
		  }
		  var user_tags = getUserTags();
		  var user_comment = getUserComment();
		  
		  
		  // no tag no comment
		  if(!args.find("--tag") && !args.find("--comment")){
			  bookmark(user_tags, user_comment);
			  return stdin;
		  }
		  var m_comment = window.Minibuffer.getMinibuffer().setPrompt('Comment:');
		  m_comment.shortcutkey.addCommand({
			key:'|',
			command:function(){m_comment.bindInputChar.call(m_comment,'|')}});
		  var m_comment_callback = function(tags, comment){
			  if(typeof comment == 'undefined')return;
			  bookmark(tags, comment);
		  }
		  // comment only
		  if(!args.find("--tag") && args.find("--comment")){
			  m_comment.complete(function(comment){
				  m_comment_callback(user_tags, comment);
			  });
			  return stdin
		  }
		  
		  var m_tag = window.Minibuffer.getMinibuffer().setSeparator(' ').setPrompt('Tags:');
		  m_tag.bindSPC = function(){
			  var i=this.html.input, b=i.selectionStart, str=i.value;
			  var trim = function(str){
				  return str.replace(/^\s|\s$/g,'');
			  }
			  i.value = trim(str.slice(0,b)) + ' ' + trim(str.slice(b));
			  var p = i.selectionEnd + this.separator.length;
			  i.setSelectionRange(p,p);
			  // eliminate highlight
			  var c = this.html.completion;
			  var last = this.current != -1 && c.childNodes[this.current];
			  this.selectCandidate(null, last);
			  this.updateComplationList();
		  }
		  m_tag.shortcutkey.addCommand({key:'|',    command:function(){m_tag.bindInputChar('|')}});
		  m_tag.shortcutkey.addCommand({key:'SPC',  command:function(){m_tag.bindSPC.call(m_tag)}});
		  m_tag.shortcutkey.addCommand({key:'TAB',  command:function(){m_tag.bindSelectNext()}});
		  m_tag.shortcutkey.addCommand({key:'C-i',  command:function(){m_tag.bindSelectNext()}});
		  
		  var m_tag_callback = function(tags){
			  if(typeof tags == 'undefined')return;
                          tags = /^\s*$/.test(tags) ? [] : tags.split(/\s+/);
			  // tag and comment
			  if(args.find("--comment")){
			      m_comment.complete(function(comment){
				      m_comment_callback(tags, comment);
			      });
			  }else{
			      // tag only
			      bookmark(tags, user_comment);
			  }
		  }
		  var _tags = getTags();
		  if(!_tags.length){
			  window.Minibuffer.status('bookmark.gettag', 'Getting tags ...')
			  var arr = [];
			  keys(BookmarkL).forEach(function (name) {
				  if (typeof BookmarkL[name].getTags == 'function') arr.push(BookmarkL[name].getTags);
			  });
			  AsyncList(arr.map(function(fn){
				  return fn();
			  })).ready(function(tags_arr){
				  window.Minibuffer.status('bookmark.gettag', 'Getting tags done', 1000);
				  var tags = tags_arr.flatten().uniq().sort()
				  setTags(tags);
				  m_tag.setCandidates(tags).complete(m_tag_callback);
			  })
		  }else{
			  m_tag.setCandidates(_tags).complete(m_tag_callback);
		  }
		  return stdin;
	  },
	});

	var getTargetCommand = function(){
		var target_cmd = '';
		if(window.location.href == "http://fastladder.com/reader/" ||
		   window.location.href == "http://reader.livedoor.com/reader/"){
			target_cmd = 'pinned-or-current-link';
		}else if(window.scrollY == 0){
			target_cmd = 'location';
		}else if(window.LDRize){
			target_cmd = 'pinned-or-current-node';
		}else{
			target_cmd = 'location';
		}
		return target_cmd;
	}

	window.Minibuffer.addShortcutkey({
	  key: 'b',
	  description: 'Bookmark',
	  command: function(){
		  var target_cmd = getTargetCommand();
		  window.Minibuffer.execute(target_cmd + ' | bookmark ' + SBM + ' "--tag=' + TAG + '"');
	  }});
	window.Minibuffer.addShortcutkey({
	  key: 'B',
	  description: 'Bookmark with tags and comment',
	  command: function(){
		  var target_cmd = getTargetCommand();
		  window.Minibuffer.execute(target_cmd + ' | bookmark ' + SBM + ' --tag --comment');
	  }});
	window.Minibuffer.addCommand({
	  name: 'bookmark.update-tags',
	  command: function(){setTags([])}
	});

	// library
	Array.prototype.position = function(obj){
		var test = (typeof(obj) == 'function') ? obj : function(a){return a == obj};
		for(var i=0;i<this.length; i++) if(test(this[i], i)) return i;
		return false;
	}
	Array.prototype.find = function(obj){
		var i = this.position(obj);
		return typeof(i) == 'number' ? this[i] : false;
	}
	Array.prototype.uniq = function(){
		var tmp = {};
		for(var i=0,l=this.length; i<l; i++) tmp[this[i]] = true;
		return keys(tmp);
	}
	Array.prototype.flatten = function(){ // only 1 level
		var tmp = [];
		for(var i=0,l=this.length; i<l; i++){
			if(this[i] instanceof Array) tmp = tmp.concat(this[i]);
			else tmp.push(this[i]);
		}
		return tmp;
	}
	// from jautopagireze.user.js
	function createHTMLDocument (title) {
		// Firefox doesn't have createHTMLDocument
		if (!document.implementation.createHTMLDocument) {
			// Maybe this is the best way to create HTMLDocument, but not worked in any browser...
			// var html4dt = document.implementation.createDocumentType("HTML", "-//W3C//DTD HTML 4.01//EN", "http://www.w3.org/TR/html4/strict.dtd");
			// var d =  document.implementation.createDocument("", "HTML", html4dt);
			// return d;

			// In Firefox
			// Try to create HTMLDocument from XSLT with <xsl:output method='html'/>
			if (typeof XSLTProcessor != "undefined") {
				// Using createContextualFragment to avoid https://bugzilla.mozilla.org/show_bug.cgi?id=212362
				// (problem of URI of document created by DOMParser and XSLT URI)
				var x = new XSLTProcessor();
				var t = [
					"<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>",
					"<xsl:output method='html'/>",
					"<xsl:template match='/'>",
					"<html><head><title>", title, "</title></head><body/></html>",
					"</xsl:template>",
					"</xsl:stylesheet>",
					].join("");
				var d = document.implementation.createDocument("", "nice-boat", null);
				var r = d.createRange();
				r.selectNodeContents(d.documentElement);
				try {
					d.documentElement.appendChild(r.createContextualFragment(t));
				} catch(e) {
					// TODO: Firefox 2.0.0.10 does not work on this part.
					return null;
				}
				x.importStylesheet(d.documentElement.firstChild);
				var ret = x.transformToDocument(d);
				// if the returned value is not HTMLDocument, this function returns null.
				return ret.body ? ret : null;
			} else {
				return null;
			}
		} else {
			return document.implementation.createHTMLDocument(title);
		}
	}
	String.prototype.createHTML = function() {
		s = this;
		s = s.replace(/<script[^>]+>[\S\s]*?<\/script>/g, "");
		s = s.replace(/<\/?(i?frame|html|script|object)[^<>]+>/g, "");
		var d = createHTMLDocument();
		if (d) {
			while (d.documentElement.firstChild) d.documentElement.removeChild(d.documentElement.firstChild);
			var r = d.createRange();
			r.selectNodeContents(d.documentElement);
			d.documentElement.appendChild(r.createContextualFragment(s));
			return d;
		} else {
			function createDocumentFragmentByString(str) {
				var range = document.createRange();
				range.setStartAfter(document.body);
				return range.createContextualFragment(str);
			}
			var htmlDoc  = document.implementation.createDocument(null, 'html', null);
			htmlDoc.documentElement.appendChild(createDocumentFragmentByString(s));
			return htmlDoc;
		}
	}
	function keys(hash){
		var tmp = [];
		for(var key in hash)tmp.push(key);
		return tmp;
	}
	var $X = window.Minibuffer.$X
	function log() {if(console) console.log.apply(console, Array.slice(arguments));}
	function group() {if(console) console.group.apply(console, Array.slice(arguments))}
	function groupEnd() {if(console) console.groupEnd();}


	// original code by cho45
	// http://svn.coderepos.org/share/lang/javascript/userscripts/jautopagerize.user.js
	// Async is similar to Mochikit Deferred.
	function Async () { this.init.apply(this, arguments) }
	Async.prototype = {
		init : function () {
			this.chain = { ok: [], ng: [] };
		},
		ready : function (value) {
			return this.call("ok", value);
		},
		error : function (value) {
			return this.call("ng", value);
		},
		call : function (okng, value) {
			if (typeof value == "function") {
				this.chain[okng].push(value);
			} else { try {
				var c = this.chain[okng];
				for (var i = 0; i < c.length; i++) {
					c[i](value);
				}
			} catch (e) { this.call("ng", e) } }
			return this;
		}
	};
	function AsyncList (asyncs) {
		var ret = new Async();
		var values = [];
		asyncs.forEach(function (a, i) {
			a.ready(function (v) {
				asyncs.pop();
				values[i] = v;
				if (asyncs.length == 0) {
					ret.ready(values);
				}
			});
			a.error(function (v) {
				ret.error(v);
			});
			values.push(null);
		});
		return ret;
	}


	function AsyncOrderedList (func, arr) {
		var ret = new Async();
		var values = [];
		var asyncs = [];
		arr.forEach(function (x, i) {
			var a = new Async();
			a.ready(function (v) {
				values.push(v);
				if(asyncs.length == 0){
					ret.ready(values);
				}else{
					func(asyncs.shift(), arr.shift(), i, values);
				}
			});
			a.error(function (v) {
				ret.error(v);
			});
			asyncs.push(a);
		});
		func(asyncs.shift(), arr.shift(), values);
		return ret;
	}
	window.MinibufferBookmark = {
		$X : $X,
		log : log,
		addBookmark : addBookmark,
		setTags : setTags,
		getTags : getTags,
		keys : keys,
		group : group,
		groupEnd : groupEnd,
		Async : Async,
		AsyncList : AsyncList,
		AsyncOrderedList : AsyncOrderedList,
		createHTML : String.prototype.createHTML,
	};
};

// Based on AutoPagerize.addFilter workaround
var i=4;
function waitMinibuffer() {
	if(window.Minibuffer && window.Minibuffer.addCommand) {
		runMinibufferBookmarkCommand();
	} else if(i-- > 0) {
		setTimeout(arguments.callee, 500);
	}
}
waitMinibuffer();
