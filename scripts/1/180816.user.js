// ==UserScript==
// @name Google Translate
// @author Lex1
// @version 1.7.8
// @description Google translate
// ==/UserScript==


if(window.location.hostname == 'gtl-proxy.appspot.com' || window.location.hostname == 'm.translate.ru')(function(){
	var h = window.location.href;
	if(h.indexOf('&ujs=gtt') == h.length-8){
		if(window.opera){
			window.opera.addEventListener('BeforeExternalScript', function(e){e.preventDefault()}, false);
			window.opera.addEventListener('BeforeScript', function(e){e.preventDefault()}, false);
			window.opera.addEventListener('BeforeEventListener.load', function(e){e.preventDefault()}, false);
		};
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		s.appendChild(document.createTextNode('img,object,embed{display:none !important}'));
		document.getElementsByTagName('head')[0].appendChild(s);
	}
})();

document.addEventListener('mouseup', function(e){
	if(e && e.button == 0){
		var lc = window.navigator.lastClick || (window.navigator.lastClick = {});
		lc.X = e.clientX;
		lc.Y = e.clientY;
		lc.element = e.target;
	}
}, false);

document.addEventListener('focus', function(e){
	if(e){
		var target = e.target, tag = target.nodeName.toLowerCase();
		if(tag == 'textarea' || (tag == 'input' && (target.type == 'text' || target.type == 'search'))){
			(window.navigator.lastClick || (window.navigator.lastClick = {})).textArea = target;
		}
	}
}, true);

window.navigator.ujs_createWindow = function(text, status, title, id, pos, size){
	var win = window, doc = win.document, wId = 'ujs_window'+(id || ''), w = doc.getElementById(wId);
	var keyDown = function(e){if(!e.shiftKey && !e.ctrlKey && !e.altKey && e.keyCode == 27)doc.getElementById(wId).closeWin()};
	if(w)w.closeWin();
	w = doc.createElement('div');
	w.setAttribute('style', 'position:fixed;display:block;visibility:hidden;left:0;top:0;width:auto;height:auto;border:1px solid gray;padding:3px;margin:0;z-index:99999;overflow:hidden;cursor:move;'+(typeof w.style.borderRadius === 'string' ? 'background-color:#f3f5f7;padding-top:4px;border-radius:4px;box-shadow:0 0 12px rgba(0,0,0,.4);' : 'background:-o-skin("Window Skin");'));
	w.id = wId;
	w.closeWin = function(){
		doc.removeEventListener('keydown', keyDown, false);
		this.parentNode.removeChild(this);
	};
	w.addEle = function(str, style){
		var ele = doc.createElement('div');
		ele.setAttribute('style', style);
		if(str){
			ele.innerHTML = str;
			for(var el, all = ele.getElementsByTagName('*'), i = all.length; i--;){
				el = all[i];
				if(/^(script|frame|iframe|applet|embed|object)$/i.test(el.nodeName)){
					el.parentNode.removeChild(el);
				}
				else{
					for(var att = el.attributes, j = att.length; j--;){
						if(/^on[a-z]+$/i.test(att[j].name))att[j].value = '';
					}
				}
			}
		};
		return this.appendChild(ele);
	};
	var img = doc.createElement('div');
	img.setAttribute('style', 'display:block;float:right;width:18px;height:18px;padding:0;margin:0;border:none;cursor:pointer;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAAZElEQVR42mNgGNyAGQixsVGU/AdCXjCbHczmxKaMFywlAlWiw6DAwIZNmQhYGqJEDWoqFiAGVmKKTwk73CRJ/Ep0GIyhbsPpO4hbIG4TwKaMk0EZ7hYBBk1cvmNDEmbDrmSwAADE8h10+qICXwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=");background:-o-skin("Caption Close Button Skin");');
	img.title = (win.navigator.language.indexOf('ru') == 0) ? '\u0417\u0430\u043A\u0440\u044B\u0442\u044C' : 'Close';
	img.addEventListener('click', function(){this.parentNode.closeWin()}, false);
	w.appendChild(img);
	w.addEle(title, 'display:table;color:#000;font:16px Times New Roman;width:auto;height:auto;padding:0;margin:0 2px;cursor:text;');
	var cnt = w.addEle(text, 'display:block;border:1px solid #aaa;margin:2px 0 1px 0;padding:4px;background-color:#fafcfe;color:#000;font:14px Times New Roman;width:240px;height:120px;overflow:auto;cursor:text;');
	w.addEle(status, 'display:table;color:#555;font:10px Times New Roman;width:auto;height:auto;padding:0;margin:0 2px;cursor:text;');
	w.addEventListener('mousedown', function(e){
		if(e.target == w){
			e.preventDefault();
			var grabX = e.clientX, grabY = e.clientY, origX = parseInt(w.style.left), origY = parseInt(w.style.top);
			var mouseMove = function(ev){
				w.style.left = origX+ev.clientX-grabX+'px';
				w.style.top = origY+ev.clientY-grabY+'px';
			};
			doc.addEventListener('mousemove', mouseMove, false);
			doc.addEventListener('mouseup', function(){doc.removeEventListener('mousemove', mouseMove, false)}, false);
		}
	}, false);
	doc.documentElement.appendChild(w);

	if(size){
		cnt.style.height = size.height;
		cnt.style.width = size.width;
	}
	else{
		for(var i = 3; i < 10; i++){
			if(cnt.scrollHeight > cnt.offsetHeight || cnt.scrollWidth > cnt.offsetWidth){
				cnt.style.height = 50*i+'px';
				cnt.style.width = 100*i+'px';
			}
			else break;
		}
	};
	var docEle = (doc.compatMode == 'CSS1Compat' && win.postMessage) ? doc.documentElement : doc.body;
	var mX = docEle.clientWidth-w.offsetWidth, mY = docEle.clientHeight-w.offsetHeight;
	if(mX < 0){cnt.style.width = parseInt(cnt.style.width)+mX+'px'; mX = 0};
	if(mY < 0){cnt.style.height = parseInt(cnt.style.height)+mY+'px'; mY =0};
	var hW = parseInt(w.offsetWidth/2);
	w.style.left = (pos && pos.X < mX+hW ? (pos.X > hW ? pos.X-hW : 0) : mX)+'px';
	w.style.top = (pos && pos.Y+10 < mY ? pos.Y+10 : mY)+'px';
	w.style.visibility = 'visible';
	doc.addEventListener('keydown', keyDown, false);
	return w;
};

window.addEventListener('message', function(e){
	if(e.data == 'google-translate'){
		var result = '', status = '';
		if(window.location.hostname == 'gtl-proxy.appspot.com'){
			var r = document.getElementById('result_box'), s = document.getElementById('source'), d = document.getElementById('gt-res-dict');
			if(r){
				var p = r.getElementsByTagName('span');
				for(var i = 0, n; n = p[i]; i++){
					n.setAttribute('style', 'background-color:inherit;color:inherit;font-size:inherit;font-family:serif;');
				};
				result = r.innerHTML;
			};
			if(s && d && d.getElementsByTagName('ol').length){
				var a = d.getElementsByTagName('*');
				for(var i = a.length; i--;){
					var n = a[i];
					switch(n.nodeName.toLowerCase()){
						case 'ol': n.setAttribute('style', 'margin:1px 5px;padding:0;'); break;
						case 'li': n.setAttribute('style', 'margin:0;padding:1px 5px;font:12px Arial;list-style-type:none;float:left;font-weight:bold;'); break;
						case 'div': n.setAttribute('style', 'margin:0;padding:0 2px;font:12px Arial;white-space:nowrap;'); break;
						case 'a':
						case 'h3': n.parentNode.removeChild(n); break;
					}
				};
				result = '<b><q>'+s.value+'</q></b>'+d.innerHTML;
			};
			var sl = document.getElementById('nc_sl'), dl = document.getElementById('nc_dl'), tl = document.getElementById('nc_tl');
			if(sl && dl && tl){
				status = ((dl.value || sl.value)+' -\u203A '+tl.value).toUpperCase();
			};
		};
		if(window.location.hostname == 'm.translate.ru'){
			var v = document.getElementsByTagName('div');
			for(var i = 0, n; n = v[i]; i++){
				if(n.className == 'tblue')status = n.nextSibling.nodeValue.slice(0, -1)+' (PROMT)';
				if(n.className == 'tres')result = n.innerHTML;
			}
		};
		if(result || status){
			e.source.postMessage('google_translate'+encodeURI(result)+'|'+encodeURI(status)+'|'+encodeURI(window.location.href), '*');
		}
		else{
			alert('Error!\n\n'+(document.body.textContent || document.body.innerText));
		};
	};
	if(e.data && e.data.indexOf('google_translate') == 0){
		var origin = e.origin || 'http://'+e.domain;
		if(origin == 'http://gtl-proxy.appspot.com' || origin == 'http://m.translate.ru'){
			var msg = e.data.slice(16).split('|');
			window.navigator.ujs_createWindow(decodeURI(msg[0]), decodeURI(msg[1]), '<a href="'+decodeURI(msg[2]).replace(/&/g, '&amp;')+'" target="_blank" style="display:inline;padding:0;margin:0;text-decoration:none;border:none;color:#009;font:16px Times New Roman;">Google Translate</a>', '_gt', window.navigator.lastClick);
			var f = document.getElementById('ujs_googletranslateframe');
			if(f)f.parentNode.removeChild(f);
		}
	}
}, false);

function ujs_google_translate(dir){
	var selText = function(w){var t; return w ? w.document.getSelection().toString() || (t = w.navigator.lastClick && w.navigator.lastClick.textArea) && t.value.substring(t.selectionStart, t.selectionEnd) : ''};
	var selWin = function(w){if(selText(w))return w; for(var i = 0, f, r; f = w.frames[i]; i++){try{if(r = arguments.callee(f))return r}catch(e){}}};
	var winWait = function(w, lng){w.navigator.ujs_createWindow('', (lng == 'ru' ? '\u041F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u043C' : 'Translating')+'\u2026', 'Google Translate', '_gt', w.navigator.lastClick)};
	var createFrame = function(w, src){
		var fId = 'ujs_googletranslateframe';
		var f = w.document.getElementById(fId);
		if(f)f.parentNode.removeChild(f);
		f = w.document.createElement('iframe');
		f.width = 0;
		f.height = 0;
		f.frameBorder = 'no';
		f.scrolling = 'no';
		f.id = fId;
		f.name = fId;
		if(src)f.src = src;
		f.setAttribute('style', 'position:fixed;left:0;top:0;visibility:hidden;width:0;height:0;');
		f.addEventListener('load', function(){(window.postMessage ? f.contentWindow : f.contentDocument).postMessage('google-translate', '*')}, false);
		w.document.documentElement.appendChild(f);
	};
	var createForm = function(w, action, name, value){
		var f = w.document.createElement('form');
		f.action = action;
		f.method = 'POST';
		f.acceptCharset = 'UTF-8';
		f.target = 'ujs_googletranslateframe';
		f.style.display = 'none';
		var t = w.document.createElement('textarea');
		t.name = name;
		t.value = value;
		f.appendChild(t);
		w.document.documentElement.appendChild(f);
		f.submit();
		f.parentNode.removeChild(f);
	};

	var w = selWin(window);
	var txt = selText(w);
	var encTxt = encodeURIComponent(txt);
	var lng = window.navigator.language.slice(0, 2);
	var url = escape(window.location.href);
	if(dir.indexOf('|') != -1){
		if(w && w.location.hostname != 'translate.google.com'){
			winWait(w, lng);
			if(encTxt.length < 1900){
				createFrame(w, 'http://gtl-proxy.appspot.com/translate_t?text='+encTxt+'&hl='+lng+'&langpair='+dir+'&eotf=0&tbb=1&ujs=gtt');
			}
			else{
				var l = dir.split('|');
				createFrame(w, '');
				createForm(w, 'http://gtl-proxy.appspot.com/?sl='+l[0]+'&tl='+l[1]+'&hl='+lng+'&eotf=0&ujs=gtt', 'text', txt);
			}
		}
		else{
			window.open('http://translate.google.com/translate?u='+url+'&hl='+lng+'&langpair='+dir+'&tbb=1'+(document.charset ? '&ie='+document.charset : ''));
		}
	}
	else{
		if(w && w.location.hostname != 'm.translate.ru'){
			winWait(w, lng);
			createFrame(w, 'http://m.translate.ru/translator/result/?usev2=1&text='+encodeURIComponent(txt.slice(0, 600))+'&dirCode='+dir+'&ujs=gtt');
		}
		else{
			window.open('http://www.translate.ru/url/tran_url.asp?direction='+dir+'&template=General&autotranslate=true&url='+url);
		}
	}
};


// Hotkey Alt+Shift+T. Replace 'auto|ru' on 'er' (english to russian) to use translate.ru
document.addEventListener('keydown', function(e){
	if(e.shiftKey && !e.ctrlKey && !e.altKey && e.keyCode == 65)ujs_google_translate('auto|ru');
}, false);