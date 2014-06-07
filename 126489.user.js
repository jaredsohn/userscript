// ==UserScript==
// @name Flash Block
// @author Lex1
// @version 1.3.15
// @description Blocks Flash and shows images instead. For Opera 9.5+. Press Ctrl+Shift+F or Ctrl+Alt+F for permanent unblocking on the site.
// @ujs:documentation http://ruzanow.ru/index/0-5
// @ujs:download http://ruzanow.ru/userjs/FlashBlock.js
// @exclude file://*
// @exclude http://*.youtube.com/*
// @exclude http://*youtube.com/*
// ==/UserScript==



(function(){
  var flash = 'data:image/png;base64,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';
  var play = 'data:image/png;base64,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';
	var prefix = 'ujs_flashblock', cName = prefix+'_disabled';
	var css = 'object[classid$=":D27CDB6E-AE6D-11cf-96B8-444553540000"]:not(.'+cName+'),object[classid$=":d27cdb6e-ae6d-11cf-96b8-444553540000"]:not(.'+cName+'),object[codebase*="swflash.cab"]:not(.'+cName+'),object[data*=".swf"]:not(.'+cName+'),object[type="application/x-shockwave-flash"]:not(.'+cName+'),object[src*=".swf"]:not(.'+cName+'),object[codetype="application/x-shockwave-flash"]:not(.'+cName+'),embed[type="application/x-shockwave-flash"]:not(.'+cName+'),embed[src*=".swf"]:not(.'+cName+'),embed[allowscriptaccess]:not(.'+cName+'),embed[flashvars]:not(.'+cName+'),embed[wmode]:not(.'+cName+'),embed:not([type]):not(.'+cName+'),'
	// + 'object[classid$=":166B1BCA-3F9C-11CF-8075-444553540000"]:not(.'+cName+'),object[codebase*="sw.cab"]:not(.'+cName+'),object[data*=".dcr"]:not(.'+cName+'),object[type="application/x-director"]:not(.'+cName+'),object[src*=".dcr"]:not(.'+cName+'),embed[type="application/x-director"]:not(.'+cName+'),embed[src*=".dcr"]:not(.'+cName+'),'
	// + 'object[classid$=":15B782AF-55D8-11D1-B477-006097098764"]:not(.'+cName+'),object[codebase*="awswaxf.cab"]:not(.'+cName+'),object[data*=".aam"]:not(.'+cName+'),object[type="application/x-authorware-map"]:not(.'+cName+'),object[src*=".aam"]:not(.'+cName+'),embed[type="application/x-authorware-map"]:not(.'+cName+'),embed[src*=".aam"]:not(.'+cName+'),'
	+ 'object[classid$="32C73088-76AE-40F7-AC40-81F62CB2C1DA"]:not(.'+cName+'),object[type="application/ag-plugin"]:not(.'+cName+'),object[type="application/x-silverlight"]:not(.'+cName+'),object[type="application/x-silverlight-2"]:not(.'+cName+'),object[source*=".xaml"]:not(.'+cName+'),object[sourceelement*="xaml"]:not(.'+cName+'),embed[type="application/ag-plugin"]:not(.'+cName+'),embed[source*=".xaml"]:not(.'+cName+'),'
	+ 'applet:not(.'+cName+'),object[classid*=":8AD9C840-044E-11D1-B3E9-00805F499D93"]:not(.'+cName+'),object[classid^="clsid:CAFEEFAC-"]:not(.'+cName+'),object[classid^="java:"]:not(.'+cName+'),object[type="application/x-java-applet"]:not(.'+cName+'),embed[classid*=":8AD9C840-044E-11D1-B3E9-00805F499D93"]:not(.'+cName+'),embed[classid^="clsid:CAFEEFAC-"]:not(.'+cName+'),embed[classid^="java:"]:not(.'+cName+'),embed[type="application/x-java-applet"]:not(.'+cName+')'
	+ '{content: "" !important; display: inline-block !important; outline: 1px dotted #bbbbbb !important; min-width: 33px !important; min-height: 33px !important; cursor: pointer !important; background: url("'+flash+'") no-repeat center !important;}'
	+ 'object[classid$=":D27CDB6E-AE6D-11cf-96B8-444553540000"]:not(.'+cName+'):hover,object[classid$=":d27cdb6e-ae6d-11cf-96b8-444553540000"]:not(.'+cName+'):hover,object[codebase*="swflash.cab"]:not(.'+cName+'):hover,object[data*=".swf"]:not(.'+cName+'):hover,object[type="application/x-shockwave-flash"]:not(.'+cName+'):hover,object[src*=".swf"]:not(.'+cName+'):hover,object[codetype="application/x-shockwave-flash"]:not(.'+cName+'):hover,embed[type="application/x-shockwave-flash"]:not(.'+cName+'):hover,embed[src*=".swf"]:not(.'+cName+'):hover,embed[allowscriptaccess]:not(.'+cName+'):hover,embed[flashvars]:not(.'+cName+'):hover,embed[wmode]:not(.'+cName+'):hover,embed:not([type]):not(.'+cName+'):hover,'
	// + 'object[classid$=":166B1BCA-3F9C-11CF-8075-444553540000"]:not(.'+cName+'):hover,object[codebase*="sw.cab"]:not(.'+cName+'):hover,object[data*=".dcr"]:not(.'+cName+'):hover,object[type="application/x-director"]:not(.'+cName+'):hover,object[src*=".dcr"]:not(.'+cName+'):hover,embed[type="application/x-director"]:not(.'+cName+'):hover,embed[src*=".dcr"]:not(.'+cName+'):hover,'
	// + 'object[classid$=":15B782AF-55D8-11D1-B477-006097098764"]:not(.'+cName+'):hover,object[codebase*="awswaxf.cab"]:not(.'+cName+'):hover,object[data*=".aam"]:not(.'+cName+'):hover,object[type="application/x-authorware-map"]:not(.'+cName+'):hover,object[src*=".aam"]:not(.'+cName+'):hover,embed[type="application/x-authorware-map"]:not(.'+cName+'):hover,embed[src*=".aam"]:not(.'+cName+'):hover,'
	+ 'object[classid$="32C73088-76AE-40F7-AC40-81F62CB2C1DA"]:not(.'+cName+'):hover,object[type="application/ag-plugin"]:not(.'+cName+'):hover,object[type="application/x-silverlight"]:not(.'+cName+'):hover,object[type="application/x-silverlight-2"]:not(.'+cName+'):hover,object[source*=".xaml"]:not(.'+cName+'):hover,object[sourceelement*="xaml"]:not(.'+cName+'):hover,embed[type="application/ag-plugin"]:not(.'+cName+'):hover,embed[source*=".xaml"]:not(.'+cName+'):hover,'
	+ 'applet:not(.'+cName+'):hover,object[classid*=":8AD9C840-044E-11D1-B3E9-00805F499D93"]:not(.'+cName+'):hover,object[classid^="clsid:CAFEEFAC-"]:not(.'+cName+'):hover,object[classid^="java:"]:not(.'+cName+'):hover,object[type="application/x-java-applet"]:not(.'+cName+'):hover,embed[classid*=":8AD9C840-044E-11D1-B3E9-00805F499D93"]:not(.'+cName+'):hover,embed[classid^="clsid:CAFEEFAC-"]:not(.'+cName+'):hover,embed[classid^="java:"]:not(.'+cName+'):hover,embed[type="application/x-java-applet"]:not(.'+cName+'):hover'
	+ '{background-image: url("'+play+'") !important;}';

	var addStyle = function(css){
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		s.setAttribute('style', 'display: none !important;');
		s.appendChild(document.createTextNode(css));
		return (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
	};

	var getValue = function(name){
		if(window.localStorage){
			return window.localStorage.getItem(name) || '';
		}
		else{
			var eq = name+'=', ca = document.cookie.split(';');
			for(var i = ca.length; i--;){
				var c = ca[i];
				while(c.charAt(0) == ' ')c = c.slice(1);
				if(c.indexOf(eq) == 0)return unescape(c.slice(eq.length));
			};
			return '';
		}
	};

	var setValue = function(name, value, del){
		if(window.localStorage){
			if(del){window.localStorage.removeItem(name)}else{window.localStorage.setItem(name, value)};
		}
		else{
			if(document.cookie.split(';').length < 30 && document.cookie.length-escape(getValue(name)).length+escape(value).length < 4000){
				var date = new Date();
				date.setTime(date.getTime()+((del ? -1 : 10*365)*24*60*60*1000));
				document.cookie = name+'='+escape(value)+'; expires='+date.toGMTString()+'; path=/';
			}
			else{
				alert('Cookies is full!');
			}
		}
	};

	var getVideo = function(flashvars, src){
		var getLink = function(s){var rez = s.match(/[^\s\x22=&?]+\.[^\s\x22=&?\/]*(flv|mp4)/i); return rez ? rez[0] : ''};
		var getQuery = function(s, q){var rez = s.match(new RegExp('[&?]'+q+'=([^&]+)')); return rez ? rez[1] : ''};
		var getJson = function(s, q){var rez = s.match(new RegExp('\x22'+q+'\x22:\\s*(\x22.+?\x22)')); return rez ? eval(rez[1]) : ''};
		var getURL = function(f, s){return f.match(/^(\w+:\/\/|\/|$)/) ? f : s.replace(/[#?].*$/, '').replace(/[^\/]*$/, f)};
		var decodeURL = function(s){try{return decodeURIComponent(s)}catch(e){return unescape(s)}};

		var q = '', url = location.href, flv = decodeURL(flashvars);

		if( url.indexOf('youtube.com/watch?') != -1 && (q = getQuery(flv, 'video_id')) )return 'http://www.youtube.com/get_video?video_id='+q+'&t='+getQuery(flv, 't')+'&fmt=18';
		if( url.indexOf('video.google.com/videoplay?') != -1 && (q = getQuery(src, 'videoUrl')) )return decodeURL(q);
		if( url.indexOf('metacafe.com/watch/') != -1 && (q = getQuery(flv, 'mediaURL')) )return q+'?__gda__='+getQuery(flv, 'gdaKey');
		if( url.indexOf('dailymotion.com/') != -1 && (q = getJson(flv,'hqURL') || getJson(flv,'sdURL')) )return q;
		if( url.indexOf('my-hit.ru/film/') != -1 && (q = getLink(flv)) )return q+'?start=0&id='+getQuery(flv, 'id');

		return getURL(getLink(flv) || decodeURL(getLink(src)), src);
	};

	var getParam = function(e, n){
		var v = '', r = new RegExp('^('+n+')$', 'i');
		var param = e.getElementsByTagName('param');
		for(var i = 0, p; p = param[i]; i++){
			if(p.hasAttribute('name') && p.getAttribute('name').match(r)){v = p.getAttribute('value'); break};
		};
		return v;
	};

	var qualifyURL=function(url){
		if(!url)return '';
		var a = document.createElement('a');
		a.href = url;
		return a.href;
	};

	var addClassName = function(ele, cName){
		ele.className += (ele.className ? ' ' : '')+cName;
	};

	var delClassName = function(ele, cName){
		var a = ele.className.split(' ');
		for(var i = a.length; i--;){
			if(a[i] == cName)a.splice(i, 1);
		};
		ele.className = a.join(' ');
	};

	var isBlocked = function(ele){
		var tag = ele && ele.nodeName.toLowerCase();
		return (tag == 'embed' || tag == 'object' || tag == 'applet') && (ele.currentStyle.content || getComputedStyle(ele, null).content) == '""';
	};

	var setStatus = function(value){
		if(top == self){
			window.status = value;
			window.defaultStatus = value;
			window.setTimeout(function(){window.defaultStatus = ''}, 4000);
		}
	};

	var delStyle = function(css){
		var styles = document.getElementsByTagName('style');
		for(var i = styles.length; i--;){
			if(styles[i].innerHTML == css)styles[i].parentNode.removeChild(styles[i]);
		}
	};

	var getLng = function(){
		switch(window.navigator.language){
			case 'ru': return {
				fEnabled: 'FlashBlock \u0432\u043A\u043B\u044E\u0447\u0435\u043D',
				fDisabled: 'FlashBlock \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D'
			};
			default: return {
				fEnabled: 'FlashBlock enabled',
				fDisabled: 'FlashBlock disabled'
			}
		}
	};

	var unblockFlash = function(e){
		var ele = e && e.target; if(!ele)return;
		var embed = ele.getElementsByTagName('embed')[0];
		if(isBlocked(ele) && !e.shiftKey && !e.altKey){
			e.preventDefault();
			e.stopPropagation();

			var src = ele.getAttribute('src') || ele.getAttribute('source') || ele.getAttribute('data') || getParam(ele, 'movie|data|src|code|filename|url|source') || (embed && embed.getAttribute('src')) || '';
			if(e.ctrlKey){
				// Save video with Ctrl+Click
				if(src)location.href = getVideo(ele.getAttribute('flashvars') || getParam(ele, 'flashvars'), src) || src;
			}
			else{
				// Unblock flash
				addClassName(ele, cName);
				if(isBlocked(embed))addClassName(embed, cName);
				if(ele.getAttribute('title') == qualifyURL(src))ele.removeAttribute('title');
			}
		}
	};

	var showAddress = function(e){
		var ele = e && e.target; if(!ele)return;
		if(!ele.title && isBlocked(ele)){
			var src = ele.getAttribute('src') || ele.getAttribute('source') || ele.getAttribute('data') || getParam(ele, 'movie|data|src|code|filename|url|source');
			if(src)ele.setAttribute('title', qualifyURL(src));
		}
	};

	var toggle = function(block){
		var postMsg = function(msg){for(var i = 0, f = window.frames, l = f.length; i < l; i++)f[i].postMessage(msg, '*')};
		var lng = getLng();
		if(arguments.length ? !block : getValue(prefix) != 'unblocked'){
			delStyle(css);
			setValue(prefix, 'unblocked');
			postMsg(prefix+'_disable');
			document.removeEventListener('click', unblockFlash, true);
			document.removeEventListener('mouseover', showAddress, false);
			setStatus(lng.fDisabled);
		}
		else{
			addStyle(css);
			setValue(prefix, '', true);
			postMsg(prefix+'_enable');
			document.addEventListener('click', unblockFlash, true);
			document.addEventListener('mouseover', showAddress, false);
			setStatus(lng.fEnabled);
		};
		var unblockedEle = document.getElementsByClassName(cName);
		for(var i = unblockedEle.length; i--;){
			delClassName(unblockedEle[i], cName);
		}
	};

	var loadImages = function(){
		var embed = document.getElementsByTagName('embed');
		var obj = document.getElementsByTagName('object');
		var isShowImagesMode = function(){
			var imgs = document.images;
			var l = imgs && imgs.length;
			return l && imgs[0].complete && imgs[l-1].complete;
		};
		if((embed.length == 0 && obj.length == 0) || isShowImagesMode())return;

		var reloadImage = function(s){
			var f = document.createElement('iframe');
			f.src = s;
			f.width = 0;
			f.height = 0;
			f.frameBorder = 'no';
			f.scrolling = 'no';
			f.onload = function(){
				this.parentNode.removeChild(this);
			};
			document.documentElement.appendChild(f);
		};

		reloadImage(flash);
		reloadImage(play);
	};


	// Non html
	if(!(document.documentElement instanceof HTMLHtmlElement))return;

	// Blocking
	if(getValue(prefix) != 'unblocked'){
		addStyle(css);
		// unblock flash
		document.addEventListener('click', unblockFlash, true);
		// show title
		document.addEventListener('mouseover', showAddress, false);
		// load flashblock images in "cached images" mode
		window.addEventListener('load', loadImages, false);
	};

	// Unblock for the site with Ctrl+Shift+F or Ctrl+Alt+F
	document.addEventListener('keypress', function(e){
		if(e.keyCode == 70 && e.ctrlKey && (e.shiftKey != e.altKey))toggle();
	}, false);

	// For buttons
	window.addEventListener('message', function(e){
		if(e.data == prefix+'_disable')toggle(false);
		if(e.data == prefix+'_enable')toggle(true);
	}, false);
})();
