// ==UserScript==
// @name           йй
// @author         ololo
// @description    qqq
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

var mf = document.getElementById('myfriends');
var as = mf.getElementsByTagName('a');
as[0].setAttribute('href', '/friends.php');

document.getElementById('left_money_box').style.display = 'none';


// ==UserScript==
// @name AdBlock+
// @author Lyoha
// @include *
// @description AdBlock+. Press Alt+Shift+B for blocking ads and Alt+Shift+U for unblocking. Press Alt+Shift+E for editing styles.
// @ujs:download http://ruzanow.ru/userjs/adblock.js
// ==/UserScript==

(function(){
	var style, enabled = false, prefix = 'ujs_adblock';
	var none = '{display: none !important;}', highlight = '{background-color: #FF5555 !important; outline: 1px solid #FF1111 !important; opacity: 0.7 !important;}';

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
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		s.setAttribute('style', 'display: none !important;');
		s.appendChild(document.createTextNode(css));
		return (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
	};
	var replaceStyle = function(ele, css){
		if(ele){
			if(ele.firstChild)ele.removeChild(ele.firstChild);
			ele.appendChild(document.createTextNode(css));
		}
	};
	var splitCss = function(css){
		var rez = [];
		css.replace(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/g, function(s, m){rez.push(m.replace(/^\s+|\s+$/g, ''))});
		return rez;
	};
	var clearCss = function(css){
		var a = splitCss(css);
		for(var i = a.length; i--;){
			var rule = a[i]+'>';
			for(var j = a.length; j--;){
				if(a[j].indexOf(rule) == 0)a.splice(j, 1);
			}
		};
		return a.join(',');
	};
	var delCss = function(css, del){
		var a = splitCss(css);
		if(del){
			for(var i = a.length; i--;){
				if(del.indexOf(a[i]) == 0)a.splice(i, 1);
			}
		}
		else{
			a.pop();
		};
		return a.join(',');
	};
	var getAtt = function(el, tags){
		var rez = '';
		if(el.attributes){
			var r = new RegExp('^('+tags+')$');
			for(var i = 0, a; a = el.attributes[i]; i++){
				var n = a.nodeName.toLowerCase();
				if(r.test(n))rez += '['+n+'=\x22'+a.nodeValue.replace(/[\x22\x5C]/g, '\\$&')+'\x22]';
			}
		};
		return rez;
	};
	var getNth = function(el){
		var nth, n = 0, p = el.parentNode;
		for(var i = 0, c; c = p.childNodes[i]; i++){if(c.nodeType == 1){n++; if(c == el)nth = n}};
		return (!nth || n < 2) ? '' : ':nth-child('+nth+')';
	};
	var getCssRules = function(el, wide){
		var att, tag, rez = [];
		var ver = window.postMessage ? 9.5 : (window.getSelection ? 9 : 8);
		while(el){
			if(el.nodeType == 1){
				att = getAtt(el, 'src') || getAtt(el, 'href');
				tag = el.nodeName;
				if(att){
					rez.unshift(tag+((wide && ver >= 9) ? att.replace(/^(\[\w+)(=\x22[^?#]+\/).*(\x22\])$/, '$1^$2$3') : att));
					break;
				}
				else{
					rez.unshift(tag+getAtt(el, 'id|class|height|width|color|bgcolor'+(ver >= 9 ? '|align|valign|type' : ''))+((wide || ver < 9.5 || /^(html|body)$/i.test(tag)) ? '' : getNth(el)));
				}
			};
			el = el.parentNode;
		};
		return rez.join('>');
	};
	var setBlockStyle = function(){
		if(document.documentElement instanceof HTMLHtmlElement){
			var css = getValue(prefix);
			if(css)style = addStyle(css+none);
			return true;
		}
	};

	var editStyles = function(){
		var rez = prompt(window.navigator.language == 'ru' ? '\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u0442\u0438\u043B\u0438:' : 'Please, edit styles:', getValue(prefix));
		if(rez != null){
			setValue(prefix, rez);
			if(rez)rez += none;
			if(style){replaceStyle(style, rez)}else{style = addStyle(rez)};
		}
	};
	var unblockEle = function(latest){
		var css = getValue(prefix);
		if(enabled || !style || !css)return;

		var remove = function(){
			document.removeEventListener('click', click, false);
			document.removeEventListener('keyup', press, false);
			enabled = false;
		};
		var click = function(ev){
			ev.preventDefault();
			var oldCss = getValue(prefix);
			var css = delCss(oldCss, getCssRules(ev.target, false));
			if(css == oldCss)css = delCss(oldCss, getCssRules(ev.target, true));
			if(css != oldCss){
				setValue(prefix, css);
				replaceStyle(style, css ? css+none : '');
				remove();
			}
		};
		var press = function(ev){
			if(ev.keyCode == 27){
				var css = getValue(prefix);
				replaceStyle(style, css ? css+none : '');
				remove();
			}
		};

		if(latest){
			css = delCss(css);
			setValue(prefix, css);
			replaceStyle(style, css ? css+none : '');
		}
		else{
			enabled = true;
			replaceStyle(style, css+highlight);
			document.addEventListener('click', click, false);
			document.addEventListener('keyup', press, false);
		}
	};
	var blockEle = function(wide){
		if(enabled)return;
		var ele = '', outline = '', border = '', bgColor = '', title = '', reObjects = /^(iframe|object|embed)$/i;

		var remove = function(){
			document.removeEventListener('mouseover', over, false);
			document.removeEventListener('mouseout', out, false);
			document.removeEventListener('click', click, false);
			document.removeEventListener('keyup', press, false);
			enabled = false;
		};
		var over = function(ev){
			ele = ev.target;
			title = ele.title;
			ele.title = 'Tag: '+ele.nodeName+(ele.id ? ', ID: '+ele.id : '')+(ele.className ? ', Class: '+ele.className : '');
			if(reObjects.test(ele.nodeName)){
				border = ele.style.border;
				ele.style.border = '2px solid #306EFF';
			}
			else{
				outline = ele.style.outline;
				ele.style.outline = '1px solid #306EFF';
				bgColor = ele.style.backgroundColor;
				ele.style.backgroundColor = '#C6DEFF';
			}
		};
		var out = function(){
			if(ele){
				ele.title = title;
				if(reObjects.test(ele.nodeName)){
					ele.style.border = border;
				}
				else{
					ele.style.outline = outline;
					ele.style.backgroundColor = bgColor;
				}
			}
		};
		var click = function(ev){
			if(ele){
				ev.preventDefault();
				out();
				remove();
				var css = getCssRules(ele, wide || ev.altKey);
				var tmpCss = addStyle(css+highlight);
				css = prompt(window.navigator.language == 'ru' ? '\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442?' : 'Block this element(s)?', css);
				if(css){
					var oldCss = getValue(prefix);
					if(oldCss)css = clearCss(oldCss+','+css);
					setValue(prefix, css);
					if(style){replaceStyle(style, css+none)}else{style = addStyle(css+none)};
				};
				tmpCss.parentNode.removeChild(tmpCss);
			}
		};
		var press = function(ev){
			if(ev.keyCode == 27){
				out();
				remove();
			}
		};

		enabled = true;
		document.addEventListener('mouseover', over, false);
		document.addEventListener('mouseout', out, false);
		document.addEventListener('click', click, false);
		document.addEventListener('keyup', press, false);
	};


	// Set style at loading page (with workaround for Opera 8)
	if(!setBlockStyle())window.addEventListener('load', setBlockStyle, false);

	// Hotkeys
	document.addEventListener('keydown', function(e){
		if(e.shiftKey && !e.ctrlKey && e.altKey){
			switch(e.keyCode){
				// Edit styles with Alt+Shift+E
				case 69: editStyles(); break;
				// Unblock elements with Alt+Shift+U
				case 85: unblockEle(); break;
				 // Block element with Alt+Shift+B
				case 66: blockEle(); break;
				// Unblock latest element with Alt+Shift+L
				case 76: unblockEle(true); break;
				 // Block elements (don't use nth-child) with Alt+Shift+W
				case 87: blockEle(true); break;
			}
		}
	}, false);

	// For buttons
	window.navigator.ujs_adblock = {block: blockEle, edit: editStyles, unblock: unblockEle};
})();