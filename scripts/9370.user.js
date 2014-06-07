// ==UserScript==
// @name       Tumblr - Strobo
// @namespace  http://userscripts.org/users/7010
// @include    http://*.tumblr.com/
// ==/UserScript==

// 2007/08/21

var strobo;

GM_registerMenuCommand('Strobo - Start', function(){
	if(strobo){
		strobo.show();
		return;
	}
	
	// ----[Application]-------------------------------------------------
	var KEY_RIGHT = 39;
	var KEY_LEFT = 37;
	var KEY_UP = 38;
	var KEY_DOWN = 40;
	var KEY_ESC = 27;
	var KEY_ENTER = 13;
	
	unsafeWindow.imageCache = [];
	
	GM_addStyle(<><![CDATA[
		#SB_body {
			background-color : #222;
			height : 100%;
			width : 100%;
		}
		
		#SB_body *{
			margin : 0;
			padding : 0;
			overflow : hidden;
		}
		
		#SB_background {
			background-color : #222;
			position : absolute;
			height : 100%;
			width : 100%;
			left : 0;
			top : 0;
		}
		
		#SB_container {
			position : absolute;
			left : 0;
			top : 0;
			background-color : #fff;
			height : 100%;
			
			border : solid 5px #fff;
			margin-top : -5px;
			padding : 0 50px;
		}
		
		#SB_link img {
			border : none;
			margin-top : 50px;
		}
		
		#SB_total {
			margin-top : 50px;
			color : #222;
			text-align : center;
		}
		
		#SB_caption {
			position : absolute;
			left : 50px;
			bottom : 50px;
			
			font-size : 70%;
			color : #ccc !important;
		}
		
		#SB_caption a {
			text-decoration : none !important;
			color : #ccc !important;
		}
	]]></>);
	GM_addStyle(
		'#SB_container {width:'+400+'px;}' + 
		'#SB_caption {width:'+400+'px;}' + 
		'#SB_total {font-size:'+400/2.5+'px;}'
	);
	
	function Strobo(){
		this.loaded = [];
		
		this.onEachLoad = bind(this, 'onEachLoad');
		this.onKeyDown = bind(this, 'onKeyDown');
		this.nextImage = bind(this, 'nextImage');
		this.start = bind(this, 'start');
		this.hide = bind(this, 'hide');
		
		this.show();
	}
	
	Strobo.PARALLELS = 5;
	Strobo.SHUFFLE = true;
	Strobo.SHOW_CAPTION = false;
	Strobo.INITIAL_INTERVAL = 150;
	Strobo.MINIMAL_INTERVAL = 20;
	Strobo.KEY_REPEAT_WAIT = 50;
	
	// ???
	(document.getElementsByTagName('html')[0] == unsafeWindow.document.body.parentNode);
	
	Strobo.swapBody = swapper(unsafeWindow.document.body, E('body', {id:'SB_body'}));
	
	Strobo.prototype = {
		loaded : null,
		notLoaded : 0,
		pointer : 0,
		
		elmImage : null,
		elmLink : null,
		elmBackground : null,
		
		interval : Strobo.INITIAL_INTERVAL,
		
		show : function(){
			Strobo.swapBody();
			if(this.elmBackground)
				return;
			
			this.elmImage = new Image();
			this.elmCaption = E('div', {id:'SB_caption'});
			this.elmLink = E('a', {target:'_blank',id:'SB_link'}, this.elmImage, this.elmCaption);
			this.elmContainer = E('div', {id:'SB_container'}, this.elmLink);
			this.elmBackground = document.body.appendChild(E('div', {id:'SB_background'}, this.elmContainer));
			
			window.addEventListener('keydown', this.onKeyDown, false);
			
			var self = this;
			this.elmBackground.addEventListener('click', function(e){
				if(e.target == self.elmBackground)
					self.hide();
			}, false);
		}
		,
		hide : function(){
			Strobo.swapBody();
			this.stop();
		}
		,
		load : function(imgs){
			this.imgs = Strobo.SHUFFLE ? shuffle(imgs) : imgs.slice();
			this.notLoaded = imgs.length;
			this.loadImage(Strobo.PARALLELS);
		}
		,
		loadImage : function(num){
			num = num||1;
			var imgs = this.imgs;
			for(var i=num ; i && imgs.length ; i--){
				var img = imgs.shift();
				this.loaded.push(img);
				
				var elmImage = new Image();
				unsafeWindow.imageCache.push(elmImage);
				elmImage.src = img.src;
				elmImage.addEventListener('load', this.onEachLoad, false);
			}
		}
		,
		onEachLoad : function(e){
			this.notLoaded--;
			
			this.loadImage();
			this.refreshProgress();
			
			if(! this.elmImage.src)
				this.nextImage();
			
			if(!this.notLoaded)
				this.onLoad();
		}
		,
		onLoad : function(){
		}
		,
		refreshProgress : function(){
			var style = this.elmContainer.style;
			var color = pad(Math.ceil(0xff - (0xdd * this.getProgress())).toString(16), 2, '0');
			style.borderColor = '#' + repaet(color, 3);
		}
		,
		getProgress : function(){
			var all = this.imgs.length+this.loaded.length;
			return 1 - this.notLoaded/all;
		}
		,
		onKeyDown : function(e){
			switch(e.keyCode){
			case KEY_RIGHT:
				cancel(e);
				if(this.isPlaying()){
					this.interval = Math.max(Strobo.MINIMAL_INTERVAL, this.interval-20);
					return;
				}
				this.nextImage();
				return;
				
			case KEY_LEFT:
				cancel(e);
				if(this.isPlaying()){
					this.interval+=20;
					return;
				}
				this.previousImage();
				return;
				
			case KEY_UP:
			case KEY_ENTER:
				cancel(e);
				if(this.isPlaying()){
					this.stop();
					return;
				}
				GM_openInTab(this.loaded[this.pointer].link);
				return;
				
			case KEY_DOWN:
				cancel(e);
				this.toggle();
				return;
				
			case KEY_ESC:
				cancel(e);
				this.hide();
				return;
			}
		}
		,
		start : function(){
			this.nextImage();
			this.intervalId = setTimeout(this.start, this.interval);
		}
		,
		stop : function(){
			clearTimeout(this.intervalId);
			this.intervalId = null;
		}
		,
		toggle : function(){
			this.isPlaying() ? this.stop() : this.start();
		}
		,
		isPlaying : function(){
			return this.intervalId;
		}
		,
		nextImage : function(){
			if(this.wait())
				return;
			
			if(this.pointer==this.loaded.length-1)
				this.pointer=-1;
			this.changeImage(this.loaded[++this.pointer]);
		}
		,
		previousImage : function(){
			if(this.wait())
				return;
			
			if(this.pointer==0)
				this.pointer=this.loaded.length;
			this.changeImage(this.loaded[--this.pointer]);
		}
		,
		changeImage : function(img){
			if(!img)
				return;
			
			this.elmImage.src = img.src;
			this.elmLink.href = img.link;
			if(Strobo.SHOW_CAPTION)
				this.elmCaption.innerHTML = img.caption;
		}
		,
		wait : function(){
			var caller = arguments.callee.caller; 
			var now = (new Date()).getTime();
			if(caller.lastCall && (caller.lastCall+Strobo.KEY_REPEAT_WAIT)>now)
				return true;
			
			caller.lastCall = now;
			return false;
		}
	}
	
	Tumblr = {};
	Tumblr.PAGE_LIMIT = 50;
	Tumblr.photo = function(count, size, callback){
		Tumblr.read('photo', count, function(res){
			var imgs = [];
			res.forEach(function(tumblr){
				for each (var post in tumblr.posts.post){
					imgs.push({
						link    : ''+ post.@url, 
						src     : ''+ post['photo-url'].(@['max-width'] == size),
						caption : ''+ post['photo-caption'],
					});
				}
			});
			
			callback(imgs);
		})
	}
	
	Tumblr.read = function(type, count, callback){
		var pages = Tumblr.split(count);
		var res = [];
		
		(function me(){
			var page = pages.shift();
			var url = Tumblr.buildURL({
				type : type,
				start : page[0],
				num : page[1],
			}); 
			
			ajax(url, function(text){
				res.push(xml(text));
				if(pages.length){
					me();
				} else {
					callback(res);
				}
			})
		})()
	}
	
	Tumblr.getTotal = function(type, callback){
		var url = Tumblr.buildURL({
			type : type,
			start : 0,
			num : 0,
		}); 
		
		ajax(url, function(text){
			callback(1*xml(text).posts.@total);
		});
	}
	
	Tumblr.split = function(count){
		var res = [];
		var limit = Tumblr.PAGE_LIMIT;
		for(var i=0,len=Math.ceil(count/limit) ; i<len ; i++){
			res.push([i*limit, limit]);
		}
		count%limit && (res[res.length-1][1] = count%limit);
		return res;
	}
	
	Tumblr.buildURL = function(params){
		return Tumblr.getEndPoint() + queryString(params);
	}
	
	Tumblr.getEndPoint = function(){
		return 'http://'+location.host+'/api/read?';
	}
	
	
	// ----[Main]-------------------------------------------------
	strobo = new Strobo();
	var elmTotal = strobo.elmLink.appendChild(E('div', {id:'SB_total'}, '....'));
	Tumblr.getTotal('photo', function(total){
		elmTotal.innerHTML = total;
		Tumblr.photo(Math.min(total, 0x64), 400, function(imgs){
			strobo.load(imgs);
			removeElement(elmTotal);
		});
	});
	
	
	// ----[Utility]-------------------------------------------------
	function ajax(url, onload){
		GM_xmlhttpRequest({
			method : 'get',
			url : url,
			onload : function(res){
				onload(res.responseText);
			}
		})
	}
	
	function bind(obj, func) {
		func = (func instanceof Function)? func : obj[func];
		return function() {
			func.apply(obj, arguments);
		}
	}
	
	function log() {
		unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments))
		return arguments[0];
	}
	
	function shuffle(a){
		a = a.slice();
		var len = a.length;
		var res = [];
		while(len)
			res.push(a.splice(Math.floor(Math.random()*len--),1)[0]);
		return res;
	}
	
	function queryString(params){
		var qeries = [];
		for(var key in params)
			qeries.push(key + '='+ encodeURIComponent(params[key]));
		return qeries.join('&');
	}
	
	function pad(str, len, ch){
		return repaet(ch, len-(''+str).length) + str
	}
	
	function repaet(str, len){
		return new Array(len+1).join(str);
	}
	
	// ----[Utility - DOM / XML]-------------------------------------------------
	function cancel(e){
		e.preventDefault();
	}
	
	function xml(text){
		return new XML(text.replace(/<\?.*\?>/gm,''));
	}
	
	function dom(text){
		return (new DOMParser).parseFromString(text, "application/xml");
	}
	
	function removeElement(elm){
		return elm.parentNode.removeChild(elm);
	}
	
	function insertBefore(target, node){
		return target.parentNode.insertBefore(node, target)
	}
	
	function insertAfter(target, node){
		return target.parentNode.insertBefore(node, target.nextSibling)
	}
	
	function swapper(elmOld, elmNew){
		var toggle = function(){
			insertBefore(elmOld, elmNew);
			removeElement(elmOld);
			
			var temp = elmOld;
			elmOld = elmNew;
			elmNew = temp;
		}
		
		return toggle;
	}
	
	function E(){
		var tag = Array.prototype.shift.call(arguments);
		var elm = document.createElement(tag);
		
		var text = [];
		Array.prototype.forEach.call(arguments, function(value){
			if(!value) return;
			
			if(value && value.nodeType){
				elm.appendChild(value);
				return;
			}
			
			switch (typeof(value)) {
				case 'string':
				case 'number':
					elm.appendChild(document.createTextNode(value))
					break;
					
				default:
					for(var key in value){
						var attr = value[key];
						switch(key){
						case 'class': elm.className = attr;
						case 'style': elm.style.cssText = attr;
						default:      elm.setAttribute(key, attr);
						}
					};
					break;
			}
		});
		
		return elm;
	}
	
	// cho45 - http://lowreal.net/
	function $x(exp, context) {
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
	
	function redraw(elm){
		var style = elm.style;
		var old = style.backgroundColor;
		style.backgroundColor = 'transparent';
		style.backgroundColor = old;
	}
})
