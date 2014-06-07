// ==UserScript==
// @name           Twitter MultiPlayer
// @namespace      http://d.hatena.ne.jp/os0x/
// @include        http://twitter.com/*
// @include        http://twitread.ss-o.net/*
// @version        0.5
// ==/UserScript==

(function(){
	var doing = $x('id("timeline timeline permalink")');
	if (!doing.length) return;
	var global = this;

	var PHOTO_INFO = {
		fotolife:{
			 url:'^http://f\\.hatena\\.ne\\.jp/([^/]+)/(\\d+)'
			,favicon:'http://f.hatena.ne.jp/favicon.ico'
			,Factory:Fotolife
		}
		,photo:{
			 url:'\\.(jpe?g|png|gif)$'
			,Factory:Photo
		}
		,flickr:{
			 url:'^http://www\\.flickr\\.com/photos/([^/]+)/(\\d+)/'
			,favicon:'http://www.flickr.com/favicon.ico'
			,Factory:Flickr
		}
		,youtube:{
			 url:'^http://\\w+\\.youtube\\.com/watch\\?(.*)?v=([\\w-]+)'
			,favicon:'http://www.youtube.com/favicon.ico'
			,Factory:YouTube
			,element:'div'
			,size:{width:425,height:355}
			,fixed:true
		}
		,kichikutter:{
			 url:'^http://kichiku\\.oq\\.la/show/(\\d*)'
			,Factory:Kichiku
			,pageElement:'.//div[@id="maincontent"]'
			,element:'div'
			,filter:function(elem){
				var imgs = elem.getElementsByTagName('img');
				Array.prototype.forEach.call(imgs,function(img){
					var src = img.getAttribute('src');
					if (!src.match(/^http:\/\//)) img.src = 'http://kichiku.oq.la/' + src;
				});
				var anchor = elem.getElementsByTagName('a');
				if (anchor) {
					Array.prototype.forEach.call(anchor,loader);
				}
			}
		}
		,hirameki:{
			 url:'^http://ryo\\.hayamin\\.com/idea/twit/(\\d+)'
			,Factory:Hirameki
			,favicon:'http://s3.amazonaws.com/twitter_production/profile_images/16725572/denkyu_mini.png'
			,pageElement:'.//div[@class="idea_twit"]'
			,element:'div'
			,filter:function(elem){
				var anchor = elem.getElementsByTagName('a');
				if (anchor) {
					Array.prototype.forEach.call(anchor,function(a){
						var href = a.getAttribute('href');
						if (!href.match(/^http:\/\//)) a.href = 'http://ryo.hayamin.com' + href;
						loader(a);
					});
				}
			}
			,style:{width:'540px'}
		}
		,twitter:{
			 url:'^http://twitter\\.com/(\\w*?)\/status\/(\\d+)'
			,favicon:'http://twitter.com/favicon.ico'
			,Factory:Twitter
			,element:'div'
			,pageElement:'.//div[@id="permalink"]'
			,filter:function(elem){
				var anchor = elem.getElementsByTagName('a');
				if (anchor) {
					Array.prototype.forEach.call(anchor,loader);
				}
			}
			,style:{width:'540px'}
		}
		,niconico:{
			 url:'http://www\\.nicovideo\\.jp/watch/(sm\\d+)'
			,favicon:'http://www.nicovideo.jp/img/favicon.ico'
			,Factory:Niconico
			,element:'div'
			,size:{width:350,height:200}
		}
		,ustream:{
			 url:'http://(www\\.)?ustream\\.tv/channel/([\\w\\-]+)'
			,favicon:'http://s1.ustream.tv/static/images/favicon.ico'
			,Factory:Ustream
			,element:'div'
			,size:{width:320,height:264}
			,fixed:true
		}
	};
	var FOTOLIFE_ICON = ['data:image/gif;base64,',
		'R0lGODlhEAAQAPcAAAQCBJyanPT29LS2tH4AACEAAAAAAAAAAD0AABwAAAAAAAAAAAAAAAAAABUA',
		'AAAAAAfU1AANDQAAAAAAAACoqAIMDAAAAAAAAAAAAAUAAAAAAAAAALQBAeMAABIAAAAAAOkAAOUA',
		'AIEAAHwAAAAAAAAAAAEAAAAAAFYAAAAAAAAAAAAAALy4CuIADhIAAgAAEnMAAAAAAAAAAAAAANxp',
		'aeMAABJfXwAAABh2du4AAJRpaXwAAHBlZQUAAJV3d3wAAP8zM/8AAP8yMv8AAG0AAAUAAJUAAHwA',
		'AIUAAOcAAIEAAHwAAAAAAAAAABUAAAAAAGAAAAMAAAAAAAAAAIAAAP4AABkAAAAAAJgAAGIAABUA',
		'AAAAAAAAAAAAAAAAAAAAAH4AAAAAAAAAAMAAAAAAAAAAAAAAAAAAAP8AAP8AAP8AAP8AAP8AAP8A',
		'AP8AAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUAAAAAAH0AYJwAngAAgAAAfOwA',
		'c+MACRIAGwAAAJ8AAOsAAIEAAHwAAEoAB+MAAIEAAHwAAKAAADoAAFAAAAAAAJgAAGIAAAEAFgAA',
		'AGwAAAAAAAAAAAAAACh9AOOcABIAAAAAADQEAADlAAASAMAAAJCFAPUrABKDAAB8ABgAaO4AnpQA',
		'gHwAfHAA/wUA/5UA/3wA//8AYP8Anv8AgP8AfG0AHgUBAJUAAHwAAErpHvQrAICDAHx8AAAobADl',
		'6xUSEgAAAADE/wAr/wCD/wB8/5gAAGIAABUAAAAAAAD/MAH/5gD/EgD/AAA0TgBkIQCDTAB8AFcA',
		'EPQA5oAAEnwAABQse+Xm4BISTgAAAJhtRGJk5hWDEgB8ALgQNADkZABOgwAAfHQgzscC5gRPEhAA',
		'ADgA4OQB/xIA/wAAfwAosADl5gASEgAAAAgAAAABALIAAAAAAAiINM5kZAGDgwB8fDwBAOAAAJQA',
		'AHwAAHgAfQIAnAAAAAAAAAAASAAABAAAFgAAAHgA8A8AqgAARwABACH5BAAAAAAALAAAAAAQABAA',
		'BwhOAAEIHEiwoEABCBMqTBjg4MKHAhoCgPhQ4sIBGAcotKgQY0WHCT0u5Bgy40aQCEWenNhR40iU',
		'AlQyhCkTIUmKNmFSlBigp8+fPw0KJRgQADs='
	].join('');
	var LOADING_ICON = ['data:image/gif;base64,',
		'R0lGODlhEAAQAPEAAP///xAmZUJThQAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5',
		'BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAACLYSPacLtvkA7U64qGb2C6gtyXmeJ',
		'HIl+WYeuY7SSLozV6WvK9pfqWv8IKoaIAgAh+QQACgABACwAAAAAEAAQAAACLYSPacLtvhY7DYhY',
		'5bV62xl9XvZJFCiGaReS1Xa5ICyP2jnS+M7drPgIKoaIAgAh+QQACgACACwAAAAAEAAQAAACLISP',
		'acLtvk6TE4jF6L3WZsyFlcd1pEZhKBixYOie8FiJ39nS97f39gNUCBEFACH5BAAKAAMALAAAAAAQ',
		'ABAAAAIshI9pwu2+xGmTrSqjBZlqfnnc1onmh44RxoIp5JpWN2b1Vdvn/ZbPb1MIAQUAIfkEAAoA',
		'BAAsAAAAABAAEAAAAi2Ej2nC7b7YaVPEamPOgOqtYd3SSeFYmul0rlcpnpyXgu4K0t6mq/wD5CiG',
		'gAIAIfkEAAoABQAsAAAAABAAEAAAAiyEj2nC7b7akSuKyXDE11ZvdWLmiQB1kiOZdifYailHvzBk',
		'o5Kpq+HzUAgRBQA7AAAAAAAAAAAA'
	].join('');
	var RESIZE_ICON = ['data:image/gif;base64,',
		'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA',
		'VElEQVQokZ3PywkAIAxEwfRfiIKdidhCFFHwFzXrIZDLwD5iIoKPOX0haxwIG8LggIKPSrggXaOA',
		'3lMP6A4v6Nz4QHKjAu1TlWiGAOqNIKqNH6j8GRf5wjIdNsbvAAAAAElFTkSuQmCC'
	].join('');
	function addFilter(filter) {
		if (window.AutoPagerize) init();
		else window.addEventListener('GM_AutoPagerizeLoaded',init,false);
		document.addEventListener('AutoPatchWork.DOMNodeInserted', function(e){
			filter(e.target);
		}, false);
		document.addEventListener('AutoPagerize_DOMNodeInserted', function(e){
			filter(e.target);
		}, false);

		function init(){
			window.AutoPagerize.addFilter(function(docs) {docs.forEach(filter);});
		}
	}
	function addMinibufferCommand(commands, i) {
		i = i || 4;
		if (window.Minibuffer) {
			commands.forEach(function(command){
				window.Minibuffer.addCommand(command);
			});
		} else if (i > 1) {
			setTimeout(arguments.callee, 1000, commands, i - 1);
		}
	}

	function addTinyFilter(filter, i) {
		i = i || 4;
		if (window.TinyURLTooltip && window.TinyURLTooltip.addFilter) {
			window.TinyURLTooltip.addFilter(filter);
		} else if (i > 1) {
			setTimeout(arguments.callee, 1000, filter, i - 1);
		}
	}
	function addTinyDecoderFilter(filter, i) {
		i = i || 4;
		if (window.TwitterDecodeTinyURL && window.TwitterDecodeTinyURL.addFilter) {
			window.TwitterDecodeTinyURL.addFilter(filter);
		} else if (i > 1) {
			setTimeout(arguments.callee, 1000, filter, i - 1);
		}
	}

	function ObjectExtend(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	}

	/*Array.each = function(arr,func,obj) {
		for (var i = 0,l = arr.length; i < l; ++i) {
			func.call(obj, arr[i], i);
		}
	};*/

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
	// utility functions.
	var isSafari = window.getMatchedCSSRules && typeof CharacterData != 'function';
	function createHTMLDocumentByString(str) {
		var html = str.replace(/^([\n\r]|.)*?<html.*?>|<\/html>([\n\r]|.)*$/ig, '');
		html = html.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>|<\/?(?:i?frame|html|script|object)(?:[ \t\r\n][^<>]*)?>/gi, ' ');
		if (isSafari) return createDocumentFromString(html);
		//var htmlDoc  = document.implementation.createDocument(null, 'html', null);
		var htmlDoc = document.implementation.createHTMLDocument ?
				document.implementation.createHTMLDocument('hogehoge') :
				document.implementation.createDocument(null, 'html', null);
		var fragment = createDocumentFragmentByString(html);
		htmlDoc.documentElement.appendChild(fragment);
		return htmlDoc;
	}
	function createDocumentFromString(str) {
		var d = document.createElement('div');
		d.appendChild(createDocumentFragmentByString(str));
		return d;
	}

	function getElementsByXPath(xpath, node) {
		var node = node || document;
		var doc = node.ownerDocument || node;
		var nodesSnapshot = doc.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var data = [];
		for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
			data.push(nodesSnapshot.snapshotItem(i));
		}
		return data;
	}

	function getFirstElementByXPath(xpath, node) {
		var node = node || document;
		return node.evaluate(xpath, node, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}

	function createDocumentFragmentByString(str) {
		var range = document.createRange();
		range.setStartAfter(document.body);
		return range.createContextualFragment(str);
	}

	var cumulativeOffset = function(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop  || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return {x:valueL, y:valueT};
	};

	var Drag = function(element,options){
		this.element = element;
		this.options = options || {position:'absolute'};
		this.fixed = this.options.position == 'fixed' ? 1 : 0;
		this.init();
	}

	Drag.prototype = {
		 init:function(){
			var self = this;
			var elem = this.element;
			elem.style.cursor = 'move';
			elem.style.position = this.options.position;
			elem.addEventListener ('mousedown',function(e){self.drag(e)}, false);
			document.addEventListener('mousemove',function(e){self.dragging(e)}, false);
			document.addEventListener('mouseup',  function(e){self.dragEnd(e)}, false);
			this.initialLocation = cumulativeOffset(elem);
		}
		,drag: function(e) {
			var elem = this.element;
			this.isDragging = true;  // ドラッグ開始
			this.currentX = e.pageX;
			this.currentY = e.pageY;
			// margin があると margin 分ズレていくため、0 にして調整
			var curLoc = cumulativeOffset(elem);
			//elem.style.position = 'absolute';
			elem.style.zIndex   = '1000';
			elem.style.margin = '0';
			elem.style.left = curLoc.x + 'px';
			elem.style.top  = curLoc.y + 'px';
			if( this.isDragging ) {
				e.preventDefault();
			}
		}
		,dragging: function(e) {
			// ドラッグが始まってなければ終了
			if( ! this.isDragging ) return;
			var elem = this.element;

			var currentLocation = cumulativeOffset(elem);
			var nextX = currentLocation.x + (e.pageX-this.currentX);
			var nextY = currentLocation.y + (e.pageY-this.currentY);

			elem.style.left = nextX + 'px';
			elem.style.top  = nextY + 'px';

			this.currentX = e.pageX;
			this.currentY = e.pageY;
			// for Opera.(redraw)
/*
			if(window.opera){
				elem.style.display = 'none';
				elem.style.display = '';
			}
*/
			return {x:nextX,y:nextY};
		}
		,dragEnd: function(e) {
			if( ! this.isDragging ) return;
			var elem = this.element;
			this.isDragging=false;
			elem.style.zIndex='1';
		}
	};

	var EXTS = [
		 '.jpg'
		,'.gif'
		,'.png'
	];

	function Photo(a,resexp,info){
		this.anchor = a;
		this.href = a.href;
		this.info = info;
	}
	function Fotolife(a,resexp,info){
		this.anchor = a;
		this.info = info;
		this.tryCount = 0;
		var usr = resexp[1];
		var id = resexp[2];
		var date = id.substr(0,8);
		this.uri = ['http://f.hatena.ne.jp/images/fotolife'
			,usr.charAt(0)
			,usr
			,date
			,id
		].join('/');
	}
	function Kichiku(a,resexp,info){
		this.anchor = a;
		this.info = info;
		this.tryCount = 0;
		this.uri = 'http://kichiku.oq.la/images/'+resexp[1];
		this.url = a.href;
	}
	function Hirameki(a,resexp,info){
		if (!global.GM_xmlhttpRequest) {
			this.init = function(){};
			return;
		}
		this.anchor = a;
		this.info = info;
		this.url = a.href;
	}
	function Flickr(a,resexp,info){
		this.anchor = a;
		this.info = info;
		var param = [
			 'api_key=b6a68808a414239d50f2a2f35a3575cd'
			,'method=flickr.photos.getInfo'
			,'format=json'
			,'photo_id='+resexp[2]
			].join('&');
		this.api = 'http://www.flickr.com/services/rest/?'+param;
	}
	function YouTube(a,resexp,info){
		this.anchor = a;
		this.info = info;
		this.href = 'http://www.youtube.com/v/' + resexp[2] + '&rel=1';
	}
	function Twitter(a,resexp,info){
		this.anchor = a;
		this.info = info;
		this.url = a.href;
	}
	function Niconico(a,resexp,info){
		this.anchor = a;
		this.info = info;
		this.href = 'http://www.nicovideo.jp/thumb/' + resexp[1];
	}
	function Ustream(a,resexp,info){
		this.anchor = a;
		this.info = info;
		this.username = resexp[2];
		var channel2json = 'http://blog.bulkneets.net/misc/ustream/channel2json.pl?';
		this.api = channel2json + 'channel_name=' + this.username;
	}
	Photo.prototype = {
		init:function(){
			var self = this;
			var icon = document.createElement('img');
			icon.className = 'player';
			icon.style.cursor = 'pointer';
			icon.style.width  = '16px';
			icon.style.height = '16px';
			this.icon = icon;
			icon.src = this.info.favicon || FOTOLIFE_ICON;
			this.fire = function(event){
				if (!self.element) {
					icon.src = LOADING_ICON;
					var element = document.createElement('div');
					var h3 = document.createElement('h3');
					h3.innerHTML = self.info.id;
					ObjectExtend(h3.style,{
						 background  : '#eeeeee'
						,borderBottom: '1px solid #888888'
						,paddingLeft : '5px'
					});
					element.appendChild(h3);
					self.element = element;
					self.x = (event.pageX + 15) * (self.info.fixed ? 0 : 1) + 'px';
					self.y = (event.pageY + 15) * (self.info.fixed ? 0 : 1)  + 'px';
					self.load();
				} else {
					self.toggle();
				}
			};
			icon.addEventListener('click',this.fire,false);
			this.anchor.parentNode.insertBefore(icon,this.anchor);
			return this;
		}
		,load:function(){
			var self = this;
			var img = this.img || document.createElement('img');
			img.addEventListener('load',function(){
				self.element.appendChild(self.img);
				self.success();
			},false);
/*
			img.addEventListener('click',function(){
				self.toggle();
			},false);
*/
			img.src = this.href;
			this.img = img;
		}
		,toggle:function(){
			var style = this.element.style;
			style.display = (style.display == 'block' ? 'none' : 'block');
		}
		,jsonCallback:function(obj){
		}
		,httpload:function(http){
			var self = this;
			if (http.status < 200 || http.status > 300) {
				return;
			}
			var tag = http.responseText;
			var htmlDoc = createHTMLDocumentByString(tag);
			var page = getElementsByXPath(this.info.pageElement, htmlDoc);
			page.forEach(function(elem){
				self.element.appendChild(document.importNode(elem, true));
				if (self.info.filter) {
					self.info.filter.call(self,self.element);
				}
			});
			self.success();
		}
		,httploader:function(){
			var self = this;
			var x = new XMLHttpRequest();
			x.onreadystatechange=function() {
				if(x.readyState == 4 && x.status == 200){
					self.httpload.call(self,x);
				}
			};
			x.open('GET',this.url,true);
			x.setRequestHeader('Content-Type','text/html; charset=' + document.characterSet);
			x.send(null);
		}
		,gmxloader:function(opt){
			var self = this;
			var opt = {
				method: 'GET',
				url: this.url,
				overrideMimeType: 'text/html; charset=' + document.characterSet,
				onload: function(http){
					self.httpload.call(self, http)
				}
			}
			setTimeout(function(){
				GM_xmlhttpRequest(opt);
			},0);
		}
		,jsonpLoader:function(opt){
			var self = this;
			var gm = opt.gm;
			var factory = opt.factory;
			var callback = opt.callback;
			var callname = opt.callname;
			var win = this.contentWindow||window;
			win[gm] = {};
			win[gm][factory] = {};
			win[gm][factory][callback] = function(obj){
				self.jsonCallback.call(self,obj);
			};
			var url = this.api + '&' + callname + '=' + [gm, factory, callback].join('.');
			var script  = document.createElement('script');
			script.type = 'text/javascript';
			script.src  = url;
			document.body.appendChild(script);
		}
		,success:function(){
			var self = this;
			var element = this.element;
			var style = element.style;
			ObjectExtend(style,{
				 position  : self.info.fixed ? 'fixed' : 'absolute'
				,top       : this.y
				,left      : this.x
				,display   : 'block'
				,background: '#ffffff'
				,border: '2px solid #888888'
				,textAlign: 'left'
				,zIndex: '5'
				//,padding: '0 2px 2px 0'
			});
			ObjectExtend(style,this.info.style);
			new Drag(element,self.info.fixed ? {position:'fixed'} : null);
			var close = element.appendChild(document.createElement('h3'));
			ObjectExtend(close.style,{
				 position  : 'absolute'
				,top       : '0px'
				,right     : '0px'
				,cursor    : 'pointer'
				,background: '#999999'
				,fontWeight: 'normal'
				,color     : '#ffffff'
				,width     : '2.0em'
				,textAlign : 'center'
				//,border    : '1px solid #888888'
			});
			close.innerHTML = '&nbsp;\u00D7&nbsp;';
			close.addEventListener('click',function(){
				self.toggle();
			},false);
			element.addEventListener('dblclick',function(){
				self.toggle();
			},false);
			document.body.appendChild(element);
			self.icon.src = self.info.favicon || FOTOLIFE_ICON;
		}
	}
	ObjectExtend(Fotolife.prototype,Photo.prototype);
	Fotolife.prototype.load = function() {
		var self = this;
		self.img = document.createElement('img');
		self.img.addEventListener('error',function(){
			self.tryCount++;
			if (self.tryCount < EXTS.length) {
				var href = self.uri + EXTS[self.tryCount];
				self.img.src = href;
			}
		},false);
		self.href = self.uri + EXTS[self.tryCount];
		Photo.prototype.load.call(self);
	};
	ObjectExtend(Flickr.prototype,Photo.prototype);
	Flickr.prototype.load = function() {
		var self = this;
		self.jsonCallback = function(obj){
			self.href = 'http://farm' + obj.photo.farm + '.static.flickr.com/' + obj.photo.server + '/' + obj.photo.id + '_' + obj.photo.secret + '.jpg';
			Photo.prototype.load.call(self);
		};
		if (global.GM_xmlhttpRequest) {
			setTimeout(function(){
				GM_xmlhttpRequest({
					 url:self.api
					,method:'get'
					,onload: function(res){
						if (res.status < 200 || res.status > 300) return;
						var obj = eval(res.responseText.replace(/jsonFlickrApi/,''));
						self.jsonCallback(obj);
					}
				});
			},0);
		} else {
			var gm = 'GM_Photoviewer';
			var factory = 'flickr';
			var callback = this.anchor.href.replace(/\W/g,'');
			var callname = 'jsoncallback';
			self.jsonpLoader({gm:gm,factory:factory,callback:callback,callname:callname});
		}
	}
	ObjectExtend(Ustream.prototype,Photo.prototype);
	Ustream.prototype.load = function() {
		var self = this;
		self.jsonCallback = function(ust){
			self.href = 'http://www.ustream.tv/' + ust[self.username] + '.usc';
			YouTube.prototype.load.call(self);
		};
		if (global.GM_xmlhttpRequest) {
			setTimeout(function(){
				GM_xmlhttpRequest({
					 url:self.api
					,method:'get'
					,onload: function(res) {
						if (res.status < 200 || res.status > 300) return;
						var obj = eval( '(' + res.responseText + ')' );
						self.jsonCallback(obj);
					}
				});
			},0);
		} else {
			var gm = 'GM_Photoviewer';
			var factory = 'ustream';
			var callback = this.anchor.href.replace(/\W/g,'');
			var callname = 'callback';
			self.jsonpLoader({gm:gm,factory:factory,callback:callback,callname:callname});
		}
	}
	ObjectExtend(YouTube.prototype,Photo.prototype);
	YouTube.prototype.load = function(){
		var self = this;
		var size = self.info.size;
		var player = document.createElement('div');
		if(window.opera) {
			player.innerHTML = [
				'<embed ',
				' width="' + size.width + '"',
				' height="' + size.height + '"',
				' src="' , this.href , '"',
				' type="application/x-shockwave-flash"',
				' allowScriptAccess="always" wmode="transparent" />'
			].join("");
		} else {
			var el = document.createElement('embed');
			el.width = size.width;
			el.height = size.height;
			el.src = this.href;
			el.type = "application/x-shockwave-flash";
			el.wmode = "transparent";
			el.allowScriptAccess = "always";
			player.appendChild(el);
		}
		self.element.appendChild(player);
		self.success();
	}
	ObjectExtend(Niconico.prototype,YouTube.prototype);
	Niconico.prototype.load = function(){
		var self = this;
		var ifm = document.createElement('iframe');
		ifm.frameborder = 'none';
		ifm.scrolling = 'no';
		ObjectExtend(ifm,self.info.size);
		ifm.src = this.href;
		self.element.appendChild(ifm);
		self.success();
	};
	ObjectExtend(Kichiku.prototype,Fotolife.prototype);
	if (global.GM_xmlhttpRequest) {
		Kichiku.prototype.load = Kichiku.prototype.gmxloader;
		ObjectExtend(Hirameki.prototype,Kichiku.prototype);
	}
	Twitter.prototype = {
		 callback:function(http){
			var self = this;
			var tag = http.responseText;
			var htmlDoc = createHTMLDocumentByString(tag);
			var page = getElementsByXPath(this.info.pageElement, htmlDoc);
			page.forEach(function(elem){
				self.element.appendChild(elem);
				var anchor = elem.getElementsByTagName('a');
				if (anchor) {
					anchor.forEach(loader);
				}
			});
			this.element.style.width = '530px';
			self.success();
		}
	}
	ObjectExtend(Twitter.prototype,Photo.prototype);
	if(window.chrome || typeof(GM_xmlhttpRequest) != 'function') {
		Twitter.prototype.load = Twitter.prototype.httploader;
	} else {
		Twitter.prototype.load = Twitter.prototype.gmxloader;
	}

	var LoadObject = {};
	var loader = function(anchr){
		for (var id in PHOTO_INFO) {
			var info = PHOTO_INFO[id];
			info.id = id;
			var resexp, exp = new RegExp(info.url,'gi');
			if ( (resexp = exp.exec(anchr.href))) {
				if(LoadObject[anchr.href]) {
					if (LoadObject[anchr.href].anchor == anchr) return;
				}
				LoadObject[anchr.href] = (new info.Factory(anchr, resexp, info)).init();
				return;
			}
		}
	};
	var FotoLoader = function(page) {
		var anchor = $x('descendant::*[contains(@class,"entry-content")]/a|div/div/p/a',page);
		if (anchor.length) {
			var metas = $x('descendant::*[contains(@class,"entry-meta")]/a[not(@class="entry-date")]',page);
			if (metas.length) anchor = anchor.concat(metas);
			anchor.forEach(loader);
		}
	}
	FotoLoader(doing[0]);
	var top = $x('//div[contains(@class,"desc hentry")]');
	if (top.length) FotoLoader(top[0]);

	addFilter(FotoLoader);
	addTinyDecoderFilter(function(a) {
		if(a) loader(a);
	});
	addTinyFilter(FotoLoader);

	if (window.Minibuffer) {
		var Minibuffer = window.Minibuffer;
		var commands = [];
		var openLinks = {
			name: 'player-start' // this name is going to type in minibuffer
			,command: function(stdin) {
				stdin.forEach(function(para,i) {
					var players = $x('descendant::*[contains(@class,"entry-content")]/a',para) || [];
					players.forEach(function(player){
						var player = LoadObject[player.href];
						if (player) player.fire();
					});
				});
			}
		}
		commands.push(openLinks)
		addMinibufferCommand(commands);
		window.Minibuffer.addShortcutkey({
			key: 'm',
			description: 'Player Start',
			command: function(){
				Minibuffer.execute('pinned-or-current-node | player-start');
			}
		});
	}
})();
