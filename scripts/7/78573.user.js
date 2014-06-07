// ==UserScript==
// @name NoAds
// @author Lex1
// @version 1.0.1
// @include http://*
// @description Blocks external scripts and imports Adblock Plus EHH subscriptions.
// @ujs:download http://ruzanow.ru/userjs/noads.js
// ==/UserScript==


(function(){
//storage begin
var storage = [];
//storage end

// whitelist at blocking external scripts
var whiteList = '~youtube.com,~metacafe.com,~lastfm.ru,~livegames.ru,~vkontakte.ru,~eurosport.ru,~imageshack.us,~britannica.com'
+ ',~wikipedia.org,~newegg.com,~yahoo.com,~facebook.com,~deviantart.com,~hotmail.com,~picasaweb.google.com,~playset.ru,~molotok.ru'
+ ',~piter.fm,~kinozal.tv,~tvshack.net,~anonym.to,~twitter.com,~flickr.com,~myspace.com,~bbc.co.uk,~ebay.com,~opera.com';

var skipScripts = '^data:|^http://ajax.googleapis.com/|^http://www.google.com/jsapi|^http://maps.google.com/|^http://www.google.com/recaptcha/'
+ '|^http://[0-9a-z-]+.gstatic.com/|^http://[0-9a-z-]+.appspot.com/|^http://yui.yahooapis.com/|^http://script.aculo.us/|^http://api.recaptcha.net/'
+ '|^http://css.yandex.net/|^http://api-maps.yandex.ru/|^http://s\\d+.ucoz.net/src/u.js|^http://[0-9a-z-]+.imgsmail.ru/|^http://62.105.135.100/|^https?://auth.tbn.ru'
+ '|swfobject.js$|show_afs_search.js$|chart.js$|ajax.js$|widgets.js$|common.js$|AC_RunActiveContent.js$|jquery[0-9a-z.-]*.js$';

// UserJS
if(typeof window == 'object' && window.location){
	var style, css = '', blocked = '', noreload = true, prefix = 'ujs_noads', none = '{display: none !important;}', domain = window.location.hostname;

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

	var addStyle = function(css){
		if(document.documentElement instanceof HTMLHtmlElement){
			var s = document.createElement('style');
			s.setAttribute('type', 'text/css');
			s.setAttribute('style', 'display: none !important;');
			s.appendChild(document.createTextNode(css));
			return (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
		}
	};

	var isCorrectDomain = function(domain, domains){
		if(!domains)return true;
		var d, a = domains.split(','), rez = false, reTrim = /^\s+|\s+$/g;
		while(domain){
			for(var i = 0, f = true, l = a.length; i < l; i++){
				d = a[i].replace(reTrim, '');
				if(d.charAt(0) != '~'){
					if(d == domain){return true}else{f = false};
				}
				else{
					if(d.slice(1) == domain){return false}else{if(f)rez = true};
				}
			};
			domain = domain.slice(domain.indexOf('.') + 1 || domain.length);
		};
		return rez;
	};

	var getRules = function(domain){
		var arr = [];
		for(var i = 0, rule; rule = storage[i]; i++){
			if(isCorrectDomain(domain, rule[0]))arr.push(rule[1]);
		};
		return arr.join(',');
	};

	var getTLD = function(domain, full){
		if(!domain)return '';
		var r = domain.match(/^((?:\d{1,3}\.){3})\d{1,3}$/); if(r)return r[1] + '0';
		var a = domain.split('.'); var l = a.length; if(l < 2)return domain;
		return full ? a[l - 2] + '.' + a[l - 1] : a[(l > 2 && /^(co|com|net|org|edu|gov|mil|int)$/i.test(a[l - 2])) ? l - 3 : l - 2];
	};

	var getLng = function(){
		switch(window.navigator.language){
			case 'ru': return {
				_s: function(count){return (count > 4) ? '\u043E\u0432' : ((count > 1) ? '\u0430' : '')},
				unblock: '\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C: ',
				disabled: '\u0411\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043E',
				blocked: '\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043E',
				script: '\u0441\u043A\u0440\u0438\u043F\u0442',
				and: ' \u0438 ',
				element: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442',
				reload: '\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443',
				nDisabled: 'NoAds \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D',
				nEnabled: 'NoAds \u0432\u043A\u043B\u044E\u0447\u0435\u043D',
				scripts: '\u0421\u043A\u0440\u0438\u043F\u0442\u044B:\n',
				styles: '\u0421\u0442\u0438\u043B\u0438:\n'
			};
			default: return {
				_s: function(count){return (count > 1) ? 's' : ''},
				unblock: 'Unblock: ',
				disabled: 'Blocking disabled',
				blocked: 'Blocked',
				script: 'script',
				and: ' and ',
				element: 'element',
				reload: 'This page must be reloaded',
				nDisabled: 'NoAds disabled',
				nEnabled: 'NoAds enabled',
				scripts: 'Scripts:\n',
				styles: 'Styles:\n'
			}
		}
	};

	var toggle = function(block){
		var setStatus = function(value){if(top == self){window.status = value; window.defaultStatus = value; window.setTimeout(function(){window.defaultStatus = ''}, 4000)}};
		var postMsg = function(msg){for(var i = 0, f = window.frames, l = f.length; i < l; i++)f[i].postMessage(msg)};
		var lng = getLng();
		if(arguments.length ? !block : getValue(prefix) != 'disabled'){
			setValue(prefix, 'disabled');
			if(style)style.parentNode.removeChild(style);
			setStatus(lng.nDisabled);
			postMsg(prefix + '_disable');
		}
		else{
			setValue(prefix, '', true);
			css = getRules(domain);
			if(css)style = addStyle(css + none);
			setStatus(lng.nEnabled);
			postMsg(prefix + '_enable');
		}
	};

	var createButton = function(){
		var enabled = getValue(prefix) != 'disabled';
		if(enabled && noreload && !blocked && !css)return;
		var sCount = blocked.split('; ').length;
		var eCount = (css.match(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/g) || '').length;
		var lng = getLng();
		var txt = noreload ? (enabled ? lng.blocked + ': ' + (blocked ? sCount + ' ' + lng.script + lng._s(sCount) + (css ? lng.and : '') : '') + (css ? eCount + ' ' + lng.element + lng._s(eCount) : '') : lng.disabled) : lng.reload;
		var title = (enabled && noreload) ? lng.unblock + (blocked ? blocked + (css ? '; ' : '') : '') + css : '';

		var b = document.getElementById(prefix + '_button');
		if(b){b.value = txt; b.title = title; return};
		b = document.createElement('input');
		b.type = 'button';
		b.value = txt;
		b.title = title;
		b.id = prefix + '_button';
		b.setAttribute('style', 'display:inline-block;position:fixed;visibility:hidden;right:0;bottom:0;width:auto;height:auto;margin:0;padding:1px 8px;font:12px Times New Roman;z-index:9999;cursor:pointer;');
		b.addEventListener('click', function(e){
			if(e.ctrlKey && !e.shiftKey && !e.altKey){alert((blocked ? lng.scripts + blocked.replace(/; /g, '\n') + (css ? '\n\n' : '') : '') + (css ? lng.styles + css : '')); return};
			if(noreload){
				toggle(!enabled);
				if(css && !blocked){this.parentNode.removeChild(this)}else{this.value = lng.reload; this.style.width = 'auto'; noreload = false};
			}
			else{
				window.location.reload();
			}
		}, false);
		b.addEventListener('mouseout', function(){
			b.setAttribute('style', 'visibility:hidden;');
			b.parentNode.removeChild(b);
		}, false);
		(document.body || document.documentElement).appendChild(b);
		var maxWidth = b.offsetWidth;
		b.style.width = 0;
		b.style.visibility = 'visible';
		var timer = window.setInterval(function(){
			var width = parseInt(b.style.width || maxWidth) + 20;
			if(width > maxWidth){clearTimeout(timer); width = maxWidth};
			b.style.width = width + 'px';
		}, 10);
	};

	// create button
	document.addEventListener('mousemove', function(e){
		var docEle = (document.compatMode == 'CSS1Compat' && window.postMessage) ? document.documentElement : document.body;
		if(docEle && docEle.clientHeight - e.clientY < 20 && docEle.clientWidth - e.clientX < 40)createButton();
	}, false);

	// permanent unblock/block for the site with Alt+Shift+D
	document.addEventListener('keydown', function(e){
		if(e.keyCode == 68 && e.shiftKey && !e.ctrlKey && e.altKey)toggle();
	}, false);

	// for buttons
	window.addEventListener('message', function(e){
		if(e.data == prefix + '_disable')toggle(false);
		if(e.data == prefix + '_enable')toggle(true);
	}, false);

	if(getValue(prefix) != 'disabled'){
		// block external scripts
		if(window.opera && isCorrectDomain(domain, whiteList)){
			var full = !/\.(com|[a-z]{2})$/i.test(domain);
			var reSkip = new RegExp(skipScripts.replace(/[.\/]/g, '\\$&'), 'i');

			window.opera.addEventListener('BeforeExternalScript', function(e){
				var src = e.element.src; if(!src || reSkip.test(src))return;
				var d = src.match(/^https?:\/\/([^\/]+@)?([^:\/]+)/i);
				if(getTLD(d ? d[2] : domain, full) != getTLD(domain, full)){
					e.preventDefault();
					if(blocked.indexOf(src) == -1)blocked += blocked ? '; ' + src : src;
					//if(window.opera)window.opera.postError('On <' + domain + '> blocked external script: ' + src);
				}
			}, false);
		};

		// add css rules
		css = getRules(domain);
		if(css)style = addStyle(css + none);
	};
	return;
};


// WSH
if(typeof WScript == 'object' && WScript.Arguments)(function(){
	// work with the adblock plus list
	function convertOldRules(tagName, attrRules){
		var rule, rules, sep, additional = '', id = null, reAttrRules = /\([\w\-]+(?:[$^*]?=[^\(\)"]*)?\)/g;
		if(tagName == '*')tagName = '';
		if(attrRules){
			rules = attrRules.match(reAttrRules);
			for(var i = 0; i < rules.length; i++){
				rule = rules[i].slice(1, -1);
				sep = rule.indexOf('=');
				if(sep > 0){
					rule = rule.slice(0, sep) + '="' + rule.slice(sep + 1) + '"';
					additional += '[' + rule + ']';
				}
				else{
					if(id){return ''}else{id = rule};
				}
			}
		};
		if(id){
			return tagName + '.' + id + additional + ',' + tagName + '#' + id + additional;
		}
		else{
			return (tagName || additional) ? tagName + additional : '';
		}
	};

	function isSiteOnly(domains){
		if(domains){
			var a = domains.split(',');
			for(var i = 0; i < a.length; i++){
				if(a[i].charAt(0) != '~')return true;
			}
		}
	};

	function getHidingRules(list, all){
		var rez = [], reTrim = /^\s+|\s+$/g, reElemHide = /^([^\/\*\|\@"]*?)#(?:([\w\-]+|\*)((?:\([\w\-]+(?:[$^*]?=[^\(\)"]*)?\))*)|#([^{}]+))$/;
		if(list){
			var rule, domains, tagName, attrRules, selector, a = list.split('\n');
			for(var i = 0; i < a.length; i++){
				rule = a[i].replace(reTrim, '');
				if(rule && rule.charAt(0) != '!' && rule.charAt(0) != '[' && rule.charAt(0) != '@' && !(rule.charAt(0) == '/' && rule.charAt(rule.length - 1) == '/')){
					if(reElemHide.test(rule)){
						domains = RegExp.$1;
						tagName = RegExp.$2;
						attrRules = RegExp.$3;
						selector = RegExp.$4 || convertOldRules(tagName, attrRules);
						if(selector && (all || isSiteOnly(domains)))rez.push([domains, selector]);
					}
				}
			}
		};
		return rez;
	};

	function getHidingRulesLength(a){
		var len = 0;
		for(var i = 0; i < a.length; i++){
			if(a[i][1])len += a[i][1].match(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/g).length;
		};
		return len;
	};

	// JSON support
	var jsonStringify = (function(){var g=/[\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff\"\\]/g;var h={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var j=function(b){return'"'+b.replace(g,function(a){if(!h[a])h[a]='\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);return h[a]})+'"'};var l=function(d){function f(v){return v<10?'0'+v:v}return'"'+d.getUTCFullYear()+'-'+f(d.getUTCMonth()+1)+'-'+f(d.getUTCDate())+'T'+f(d.getUTCHours())+':'+f(d.getUTCMinutes())+':'+f(d.getUTCSeconds())+'Z"'};var m=function(a,b,e){return a.length===0?b+e:b+'\n'+a.join(',\n').replace(/^/gm,'\t')+'\n'+e};var n=function(a,b){var i,k,v,p=[],o=b[a],t=typeof o,c=Object.prototype.toString.call(o);if(c==='[object Date]')return l(o);if(t==='string'||c==='[object String]')return j(o);if(t==='boolean'||c==='[object Boolean]')return String(o);if(t==='number'||c==='[object Number]')return isFinite(o)?String(o):'null';if(t==='object'){if(!o)return'null';if(Object.prototype.toString.apply(o)==='[object Array]'){for(i=0;i<o.length;i++){p[i]=n(i,o)||'null'};return m(p,'[',']')};for(k in o){if(Object.hasOwnProperty.call(o,k)){v=n(k,o);if(v){p.push(j(k)+': '+v)}}};return m(p,'{','}')}};return function(a){return n('',{'':a})}})();

	// read the files
	var f, fso = new ActiveXObject('Scripting.FileSystemObject');
	var scriptPath = WScript.ScriptFullName;
	var startDir = fso.GetParentFolderName(fso.GetFile(scriptPath));
	var defPath = startDir+'\\adblock.txt';
	var subscPath = WScript.Arguments.length > 0 ? WScript.Arguments(0) : defPath;
	var paramIn = function(str){for(var i = WScript.Arguments.length; i--;){if(WScript.Arguments(i) == str)return true}};
	var addRules = paramIn('/add'), allRules = paramIn('/all'), silent = paramIn('/silent');
	var alert = function(str){if(!silent)WScript.Echo(str)};

	if(/^https?:\/\//i.test(subscPath)){
		try{
			var shell = new ActiveXObject('WScript.Shell');
			shell.CurrentDirectory = startDir;
			shell.Run('wget.exe'+' --no-check-certificate -O "'+defPath+'" '+subscPath, 0, 1);
		}
		catch(e){
			var req = new ActiveXObject('WinHTTP.WinHttpRequest.5.1');
			req.Open('GET', subscPath, false);
			req.Option(4) = 0x3300;
			req.Option(6) = true;
			req.Send();
			if(req.Status == 200){
				var stream = new ActiveXObject('ADODB.Stream');
				stream.Type = 1;
				stream.Open();
				stream.Write(req.ResponseBody);
				stream.SaveToFile(defPath, 2);
				stream.Close();
			}
			else{
				alert('Error, cannot download a subscription!');
			}
		};
		subscPath = defPath;
	};

	if(!fso.FileExists(subscPath) || fso.GetFile(subscPath).Size == 0){
		alert('NoAds. Import Adblock Plus subscriptions...\n\nFile "'+subscPath+'" not found!');
		return;
	};
	f = fso.OpenTextFile(subscPath, 1, 0);
	var adblock = f.ReadAll().replace(/\0/g, '');
	f.Close();
	f = fso.OpenTextFile(scriptPath, 1, 0);
	var str = f.ReadAll().replace(/\0/g, '');
	f.Close();

	var startStr = '//storage begin\n', endStr = '\n//storage end', startLen = startStr.length;
	var startPos = str.indexOf(startStr);
	var endPos = str.indexOf(endStr, startPos+startLen);
	if(startPos != -1 && endPos != -1){
		storage = addRules ? storage.concat(getHidingRules(adblock, allRules)) : getHidingRules(adblock, allRules);
		storage.sort();
		for(var i = storage.length; i--;){
			var a = storage[i], b = storage[i-1];
			if(a && b && a[0] == b[0]){
				if(a[1] != b[1])b[1] += ','+a[1];
				storage.splice(i, 1);
			}
		};
		f = fso.OpenTextFile(scriptPath, 2, 0);
		f.Write(str.slice(0, startPos+startLen)+'var storage = '+jsonStringify(storage)+';'+str.slice(endPos));
		f.Close();
		alert(getHidingRulesLength(storage)+' rules for '+storage.length+' sites successfully imported!');
	}
})();
})();
