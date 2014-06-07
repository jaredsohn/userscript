// ==UserScript==
// @name AdBlock+
// @author Lex1
// @version 1.0.7
// @run-at document-start
// @include *
// @description AdBlock+ for Chrome. Press Alt+B for blocking ads. Press Alt+E for editing styles.
// @namespace http://lexi.ucoz.ru/index/0-4
// ==/UserScript==

(function(){
	var getValue = function(name){
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i = 0, c; c = ca[i]; i++){
			while(c.charAt(0) == ' ')c = c.substring(1, c.length);
			if(c.indexOf(nameEQ) == 0)return unescape(c.substring(nameEQ.length, c.length));
		};
		return '';
	};
	var setValue = function(name, value, days){
		var date = new Date();
		date.setTime(date.getTime()+((days || 10*365)*24*60*60*1000));
		if(document.cookie.length < 3000)document.cookie = name+'='+escape(value)+'; expires='+date.toGMTString()+'; path=/'; else alert('Cookies is full!');
	};
	var addStyle = function(css){
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		s.setAttribute('style', 'display: none !important;');
		s.appendChild(document.createTextNode(css));
		return (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
	};

	// Set style at loading page
	var style; if(document.documentElement instanceof HTMLHtmlElement && (style = getValue('ujs_adblock'))){
		setTimeout(function(){addStyle(style + '{ display: none !important }')}, 1);
	};

	// Hotkeys
	document.addEventListener('keydown', function(e){
		// Edit styles with Alt+E
		if(e.keyCode == 69 && !e.shiftKey && !e.ctrlKey && e.altKey){
			var rez = prompt('Please, edit styles:', getValue('ujs_adblock'));
			if(rez != null){setValue('ujs_adblock', rez); location.reload(false)};
		};
		// Block elements with Alt+B
		if(e.keyCode == 66 && !e.shiftKey && !e.ctrlKey && e.altKey){
			if(window.navigator.ujs_AdBlock)return; else window.navigator.ujs_AdBlock = true;
			var ele = '', outline = '', border = '', bgColor = '', title = '', altPressed = false, reObjects = /^(iframe|object|embed)$/i;

			var clearCss = function(css){
				var a = css.split(',');
				for(var i = a.length - 1; i >= 0; i--){
					var rule = a[i] + '>';
					for(var j = a.length - 1; j >= 0; j--){
						if(a[j].indexOf(rule) == 0)a.splice(j, 1);
					}
				};
				return a.join(',');
			};
			var getAtt = function(el, tags){
				var rez = '';
				if(el.attributes){
					var r = new RegExp('^('+tags+')$');
					for(var i = 0, a; a = el.attributes[i]; i++){
						var n = a.nodeName.toLowerCase();
						if(r.test(n))rez += '['+n+'=\x22'+a.nodeValue+'\x22]';
					};
				};
				return rez;
			};
			var getNth = function(el){
				if(altPressed || /^(html|body|iframe|embed|img|a)$/i.test(el.nodeName))return '';
				var nth, n = 0;
				var p = el.parentNode;
				for(var i = 0, c; c = p.childNodes[i]; i++){if(c.nodeType == 1){n++; if(c == el)nth = n}};
				return (!nth || n < 2) ? '' : ':nth-child('+nth+')';
			};
			var block = function(el){
				var css = getAtt(el, 'src|href|id');
				if(css){
					css = el.nodeName+css;
				}
				else{
					var rez = [];
					while(el){if(el.nodeType == 1)rez.unshift(el.nodeName+getAtt(el, 'src|href|id|class|height|width|color|align')+getNth(el)); el = el.parentNode};
					css = rez.join('>');
				};
				var tmpCss = addStyle(css+'{background-color: #FF5555 !important; outline: 1px solid #FF1111 !important; opacity: 0.7 !important;}');
				css = prompt('Block this element(s)?', css);
				if(css){
					addStyle(css + '{display: none !important;}');
					var oldCss = getValue('ujs_adblock');
					setValue('ujs_adblock',  (oldCss ? clearCss(oldCss+ ',' + css) : css));
				};
				tmpCss.parentNode.removeChild(tmpCss);
			};
			var remove = function(){
				document.removeEventListener('mouseover', over, false);
				document.removeEventListener('mouseout', out, false);
				document.removeEventListener('click', click, false);
				document.removeEventListener('keyup', press, false);
				delete window.navigator.ujs_AdBlock;
			};

			var over = function(ev){
				ele = ev.target;
				title = ele.title;
				ele.title = 'Tag: '+ele.tagName+(ele.id ? ', ID: '+ele.id : '')+(ele.className ? ', Class: '+ele.className : '');
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
					altPressed = ev.altKey;
					ev.preventDefault();
					out();
					remove();
					block(ele);
				}
			};
			var press = function(ev){
				if(ev.keyCode == 27){
					out();
					remove();
				}
			};

			document.addEventListener('mouseover', over, false);
			document.addEventListener('mouseout', out, false);
			document.addEventListener('click', click, false);
			document.addEventListener('keyup', press, false);
		}
	}, false);
})();
