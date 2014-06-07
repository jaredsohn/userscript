// ==UserScript==
// @name Hide js-popups
// @author Lex1
// @version 1.0.7
// @description Hide javascript popups.
// @include http://*
// @namespace http://ruzanow.ru/index/0-4
// ==/UserScript==

(function(){
	var topLevelDomainName = function(domain){
		if(!domain)return ''; if(/^(\d{1,3}\.){3}\d{1,3}$/.test(domain))return domain;
		var a = domain.split('.'); var l = a.length; return (l < 3) ? domain : (a[l - 2] + '.' + a[l - 1]);
	};
	var getHostName=function(url){
		if(!url)return '';
		var a = document.createElement('a');
		a.href = url;
		return a.hostname;
	};
	var checkExternal=function(ele){
		var h = topLevelDomainName(location.hostname);
		var a = ele.getElementsByTagName('*');
		for(var i = 0, e; e = a[i]; i++){var url = e.hostname || getHostName(e.src); if(url && topLevelDomainName(url) != h)return true};
	};
	var hideJsPopups=function(hide){
		var rez, ele = document.getElementsByTagName('div');
		for(var i = 0, e; e = ele[i]; i++){
			var style = e.style;
			var weight = 0;
			// nearby a script
			if(e.previousSibling instanceof HTMLScriptElement || e.nextSibling instanceof HTMLScriptElement)weight += 2;
			// bad id
			if(e.id.length > 10)weight += 1;
			if(/ad|pop/i.test(e.id))weight += 1;
			// exists onclick
			if(e.onclick)weight += 1;
			// exists size
			if(style.height || style.width)weight += 1;
			// exists position
			if(style.left || style.top)weight += 1;
			// speed optimisation
			if(weight > 1){
				// big zIndex
				if(style.zIndex > 10 || getComputedStyle(e, null).zIndex > 100)weight += 1;
			};
			if(weight > 2){
				// absolute positioning
				var p = style.position || getComputedStyle(e, null).position;
				if(p == 'absolute')weight += 1; else if(p == 'fixed')weight += 2;
			};
			if(weight > 4){
				// link on other site
				if(checkExternal(e))weight += 2;
			};
			if(weight > 6){
				if(hide){
					if(style.display != 'none'){style.display = 'none'; rez = true};
				}
				else{
					if(style.display == 'none'){style.display = 'block'};
				}
			}
		}
		return rez;
	};

	var timerId = 0;
	var timeout = 4000;
	var wId = 'ujs_show_blocked';

	var createButton=function(){
		var inp = document.getElementById(wId);
		if(inp)return;
		inp = document.createElement('input');
		inp.type = 'button';
		inp.value = (navigator.language == 'ru') ? '\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0438\u0435 \u043E\u043A\u043D\u0430' : 'Unblock popups';
		inp.id = wId;
		inp.setAttribute('style', 'display:inline-block;position:fixed;right:0;top:0;width:auto;height:auto;margin:0;font:14px Times New Roman;z-index:9999;cursor:pointer;');
		inp.addEventListener('click', function(){this.parentNode.removeChild(this); clearTimeout(timerId); hideJsPopups(false)}, false);
		document.documentElement.appendChild(inp);
		setTimeout(function(){var e = document.getElementById(wId); if(e)e.parentNode.removeChild(e)}, timeout);
	};

	if(hideJsPopups(true)){createButton()};
	timerId = setTimeout(function(){if(hideJsPopups(true))createButton()}, timeout);
})();
