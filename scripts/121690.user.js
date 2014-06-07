(function(win, u){var alienFrame = /(plusone\.google\.com|userscripts\.org)/.test(location.host)
	,metaTx = !alienFrame && function(s){return(s=
//если Firefox+GreaseMonkey, требуется удалить "/*" перед "<!", чтобы читались многострочные данные!
/*<![CDATA[*//*
// ==UserScript==
// @name HabrAjax
// @version 127.2014.02.24
// @namespace spmbt.kodingen.com/index.htm
// @author spmbt0
// @description Cumulative script with over 60 functions for Fx-Opera-Chrome-Safari
// @include http://habrahabr.ru/*
// @include https://auth.habrahabr.ru/settings*
// @include https://plusone.google.com/*
// @include http://userscripts.org/scripts/source/*
// @include http://webcache.googleusercontent.com/search?q=cache:http://habrahabr.ru/*
// @include http://habrastorage.org/
// @include http://legacy.habrastorage.org/
// @include http://hbr/*
// @exclude http://habrahabr.ru/api/*
// @exclude http://habrahabr.ru/special/*
// @update 126 аналог ufoCorrect
// @update 126 "что бы"
// @resource meta 121690.meta.js
// @icon data:image/gif;base64,R0lGODlhIAAgAMMBAG6Wyv///2+NtIucstfY2b/FzpSmvY+QkM3Nzunp6fLy8qGwweDg4MbFxa2trrm6uiwAAAAAIAAgAAAE/xDISau9OM/AOe2edoHBBwqiRZodmrKhRLqXYFfrdmLCQBQGWk62swgOiERAQQgChs9iRZBMKDgEFGnbMi4YDMU1gNBytzSJDcGwXhUD4lmqZofFioZrPqMIDARtYksIAzZ8dAINgngJVgkLUH1qBmBuCgmBYA6SUgKBl0wICA6lk1FdAAIFjngKDAgEpKYgWXIcKH8EDQ0EVwmjsrycIA4FZl2rDwcHDgivow8ODwzEHca3ASgDpMylsrEOzdUkDk59AtOl07wIDcwNkDbzCy7z8xIDD8Ps3Q5hCQqscxBHgw0DbEY1WIbEkRtHZV6oMsAq0wNqrcQ4KihR1Z9YjzUeKjjWcYqABUoaJeBY0k8bAm5ItqxgANjFBnBmTgnTQNw0nVOSNBjQLA1QXdEMATVioGnJCAA7
// ==/UserScript==
*/s//]]>
)} // © licensed by LGPLv3 Open Source www.gnu.org/licenses/lgpl-3.0.en.html
,isFxScr = typeof GM_getMetadata !=u //-Scriptish
,readMeta = function(s, isFxScr){ //парсинг многострочного текста по мета-директивам
	if(typeof s !='string') //очистка оболочки функций, выделение мн-стр-комментария
		s = typeof s=='function'
			? ((/\*/.test(function(){/**/}+1) ? s : s(!1) )+'')
					.replace(/(^[\s\S]*\*\/\/\*\r?\n?|\r?\n?\*\/s[\s\S]*$)/gm,'')
			: (typeof s !=u && s!==null && s.toString ? s.toString() :''); //здесь же- 'xml'
	var metaD ={}, j =0;
	if(s==='false'&& isFxScr){ //получать ли данные средствами Scriptish
		metaD = GM_getMetadata();
		for(var i in metaD){ //приведение к нормальному виду
			if(metaD[i].length ==1)
				metaD[i] = metaD[i][0];
			j++;
		}
	}else{
		var meta = s.split('\n'), aa, a2;
		for(var i=0, mL = meta.length; i < mL; i++){
			if(( aa = /^.*?\/\/\s*@([\S]+)\s(\s*)(.*)/g.exec(meta[i]) )){
				a2 = aa[3] !==undefined && aa[3] || aa[2];
				if(metaD[aa[1]]===undefined)
					metaD[aa[1]] = a2;
				else{
					if(! (metaD[aa[1]] instanceof Array))
						metaD[aa[1]] = [metaD[aa[1]]];
					metaD[aa[1]].push(a2);
				}
				j++;
			}else if(!/^.*?\/\/\s*[\-=]*\s*\/?\s*UserScript\s*[\-=]*\s*$/i.test(meta[i]))
				metaD[j++] = meta[i];
		}
	}
	return j >1 && metaD || undefined; //хеш директив + нум.список простых строк + _length -чис.простых строк или und., если не найдено
},
extMeta = function(m, callback, callErr){ //или (url, callback, callErr)//получение внешних метаданных
	if(typeof m =='string')
		var shortNum = (/^\d+(\.meta\.js)?$/.test(m) ? m :'') + (/^\d+$/.test(m) ?'meta.js':'')
			,xUrl = shortNum ?'http://userscripts.org/scripts/source/'+ shortNum : m ;
	//wcl(m, shortNum, xUrl)
	if(typeof GM_xmlhttpRequest !=u){
		GM_xmlhttpRequest({
			url: xUrl
			,method:'get' //Chrome
			,onload: callback //параметр - req (для req.responseText)
			,onerror: callErr //параметр - req (для req.responseText)
		});
	}else if(win.opera && xUrl){ //load metadata for Opera
		var ifr = document.createElement('iframe');
		ifr.src = xUrl;
		ifr.style.display ='none';
		document.body.appendChild(ifr);
		ifr.name = ifr.id ='operaEmbedMeta';
		win.addEventListener('msg', function(ev){ //слушать приход Event
			callback({responseText: ev.data.replace(/\n?\noperaEmbedMeta$/,''), finalUrl: xUrl});
		},!1);
	}else
		wcl('~~No read metadata!'); //другой способ запроса внешнего сервера по ajax
	return {waitHandler: 0 //для немедленного таймаута
		,callback: callback, callErr: callErr} //для немедленного завершения
}
,DAY = 86400000
,CHKUPD = 15 //мин. период проверок обновлений скрипта (минут) при ошибках чтения
,NOWdate = new Date()
,NOW = +NOWdate,HSO='http://habrastorage.org',SHRU='https://auth.habrahabr.ru'
,HRU ='http://habrahabr.ru',sHQ='habr.statis.tk/img/qu' //37.230.115.43исп-ть ли сервер статистики
,userNameMaxLen = 25
,isFx = /Firefox/.test(navigator.userAgent)
,isChrome = /Chrome\//.test(navigator.userAgent)
,wcl = function(a){ a = a!==undefined ? a :''; //консоль как метод строки или функция, с отключением по hS.noConsole.val ==1
	if(win.console && typeof hS !=u && !hS.noConsole.val)
		win.console.log.apply(console, this instanceof String
			? ["'=="+ this +"'"].concat([].slice.call(arguments))
			: arguments);
}, strongCutImgMinH;
String.prototype.wcl = wcl;
String.prototype.trim = function(s){var s = this ||s;
	return s.replace(/(^\s+|\s+$)/g,'')};
//if(/userscripts\.org/.test(location.host)) wcl(document.body.innerHTML)
try{ //для оповещения об ошибках в Fx
var metaD = readMeta(metaTx, isFxScr) //metaTx == false ||'false'(строка) - если Fx|| строки метаданных
	,gPlusFrame = alienFrame && /plusone/.test(location.host);
win.adriver = function(){};
win.adriver.domReadyQueue ={execute: function(){},Plugin: function(){this.a =1;}};
//===============================================
//'testUScr'.wcl({isFxScr:isFxScr, unsafeWindow: typeof unsafeWindow !=u}); //win !==window при Greasemonkey|Scriptish
if(!alienFrame){
	//alert(addEventListener)
	win.addEventListener('message', function(ev){ //слушать приход данных
		//'start_parse'.wcl(win.JSON , win.JSON.parse, win.JSON.decode)
		if(win.JSON && !win.JSON.parse && win.JSON.decode) win.JSON.parse = win.JSON.decode; //habr - old //опера требует этого внутри хендлера
		//'decode'.wcl(win.JSON , !win.JSON.parse , win.JSON.decode, win.JSON && !win.JSON.parse);
		if(/likes/.test(ev.data) && /frme/.test(ev.data) && win.JSON && win.JSON.parse){ //поставить лайки снаружи
			var n = JSON.parse(ev.data);
			if(n){
				//'parsed_data'.wcl(n);
				var frs = document.getElementsByTagName('iframe');
				for(var i in frs)
					if(frs[i].name == n.frme){
						frs[i].setAttribute('likes', n.likes);
						var x = frs[i].parentNode.parentNode.querySelector('.likes div div');
						x && (x.innerHTML = n.likes);
					}
			}
		}
		if(/\noperaEmbedMeta$/.test(ev.data) && win.JSON && win.JSON.parse){
			//alert(ev.data)
			var evt = document.createEvent('Event'); //генерировать для перехвата на приёме файла
			evt.initEvent('msg',!0,!0);
			evt.data = ev.data;
			win.dispatchEvent(evt);}
	},!1);
}
if(gPlusFrame){
	/**
	 * evaluate script in window scope
	 * @param{Function} fs function or string is body of function
	 * @param{String|Array} s string or array of strings for arguments
	 * @param{Boolean} noOnce not delete script after exec
	 */
	var winEval = function(fs, s, noOnce){ //exec function/text in other scope
		s = (s ||[]) instanceof Array? s ||[] : [s]; //wrap by array
		alert(s +' '+ 'fs2')
		var fs2 = typeof fs=='function'
			? (fs +'').replace(/(^\s*function\s*\([^\)]*\)\s*\{\s*|\s*\}\s*$)/g,'') //clean wrapper
			: fs
			,as ='';
		for(var i =0, sL =s.length; i < sL; i++) //sequential array
			as += (i?',':'') +"'"+ s[i].replace(/'/g,"\\'").replace(/(\r\n|\r|\n)/g,"\\\n") +"'";
		fs = '(function(){'+ fs2 +'}).apply(window,['+ as +']);';
		//'fs'.wcl(fs, fs2)
		var d = document
			,scr = d.createElement('script');
		scr.setAttribute('type','application/javascript');
		scr.textContent = fs;
		var dPlace = d.body || d.getElementsByTagName('head') && d.getElementsByTagName('head')[0];
		dPlace.appendChild(scr);
		if(!noOnce) dPlace.removeChild(scr);
	};
	/**
	 * check occurrence of third-party event with growing interval
	 * @constructor
	 * @param{Number} t start period of check
	 * @param{Number} i number of checks
	 * @param{Number} m multiplier of period increment
	 * @param{Function} check event condition
	 * @param{Function} occur event handler
	 */
	var Tout = function(h){
		var th = this;
		(function(){
			if((h.dat = h.check() )) //wait of positive result, then occcurense
				h.occur();
			else if(h.i-- >0) //next slower step
				th.ww = win.setTimeout(arguments.callee, (h.t *= h.m) );
		})();
	};
	new Tout({t:320, i:6, m: 1.6
		,check: function(){
			return document && document.querySelector('#aggregateCount');
		}
		,occur: function(){
			var id = location.hash.match(/(\?|#|&)id=([^&]+)/) //frame id [or name]
				,w = win;
			id = id && id.length && id[2];
			var s = w.JSON && w.JSON.stringify && w.JSON.stringify( //must supported earlier
					{likes: this.dat.innerHTML, frme: id}) //data format
				,pHost = (function(a){ //host extract from parameter (#|&)parent
						if(!a.match(/^https?\:\/\//)) return'';
						var b = document.createElement('a');
						b.href = a;
						b.pathname = b.search = b.hash ='';
						return b.href.replace(/\/\??\#?$/,'')
					})( decodeURIComponent( (w.location.href.match(/.*(\?|#|&)parent=([^&]+)/) ||[])[2] ||'') );
			try{
				if(!isChrome || w.parent && w.parent.postMessage){
					s && w.parent.postMessage(s, pHost); //all browsers except Chrome
				}else if(s)
					winEval(function(args){
						var w = window
							,p1 = arguments[0]
							,p2 = arguments[1];
						if(w.postMessage && p1 && w != w.parent){
							function wpm(){
								w.parent.postMessage(p1, p2); //msg with a glance Chrome bug
							}
							w.document.all ? w.setTimeout(wpm, 0) : wpm();
						}
					}, [s, pHost]);
			}catch(er){wcl(er)}
		}
	});
}else if(alienFrame){ // для Оперы (только) в фрейме userscripts.org - отправка метаданных
	document.addEventListener('DOMContentLoaded',function(){
		var dd = document.querySelector('pre')
			,s = dd && dd.innerHTML;
		if(s && win.parent && win.parent.postMessage)
			win.parent.postMessage(s +'\noperaEmbedMeta', HRU);
	},!1);
} //(далее выполняется, если не в alienFrame)
if(alienFrame) return;
var setLocStor = function(name, hh){
		if(!localStorage) return;
		localStorage['habrAjax_'+ name] = JSON.stringify({h: hh});
	},
	getLocStor = function(name){
		return (JSON.parse(localStorage && localStorage['habrAjax_'+ name] ||'{}')).h;
	}
	,removeLocStor = function(name){localStorage.removeItem('habrAjax_'+ name);}
	,lh = location.href
	,$q = function(q, f, f2, args){ // контекстный DOM-селектор или условная функция с ним: (elem)q | ((str)q, f, args) | ((str)q, elem) | ((str)q, (elem)context, f, args)
		var Q = q && q.attributes && q || (!(f instanceof Function) && f||document).querySelector(q);
		return f instanceof Function ? f && Q ? f.apply(Q, f2 instanceof Array && f2 || [f2]) : Q
			: f2 instanceof Function ? f2 && Q ? f2.apply(Q, args instanceof Array && args || [args]) : Q : Q }
	,$qA = function(q, f, f2, args){
		var Q = q && q.attributes && q || (!(f instanceof Function) && f||document).querySelectorAll(q);
		return f instanceof Function ? f && Q.length ? f.apply(Q, f2 instanceof Array && f2 || [f2]) : Q
			: f2 instanceof Function ? f2 && Q.length ? f2.apply(Q, args instanceof Array && args || [args]) : Q : Q }
	previButt = $q('#post_form .buttons input[name="preview"]')
	wwPrevi =0;
	previButt && previButt.addEventListener('click',function(ev){
		wcl('previclick');
		win.clearTimeout(wwPrevi);
		textContentPrev ='00';
		fillLetter();$pd(ev);
	},!1);
var textContentPrev ='00'
	,fillLetter = function(){ //сформировать письмо в ЛС
		var aLHash = lh.replace(/^[^#]*#/,'').split('&')
			,hLHash ={}
			,lStor = getLocStor('composeLetter')
			,lStNoBq = lStor && !/<\/?blockquote>/.test(lStor.cite);
		if(/\/(add|edit)\//.test(lh)){ //страница редактирования (своей) статьи - по цитате
			var ta = $q('#text_textarea')
				,cite = lStor && lStor.cite
				,text = lStor && lStor.text
				,textContentDiv = $q('#preview_placeholder .content');
			if(textContentDiv)
				var textContent = textContentDiv.innerHTML; //содержимое статьи
			if(ta && typeof cite !=u){
				var tVal = ta.value
					,iS =[]
					,cL = cite.length;
				for(var i =0, tL = tVal.length; i < tL; i++)
					if(tVal.substr(i, cL) == cite)
						iS.push(i); //все индексы вхождения строк
				'cite'.wcl(iS, cite)
				if(iS.length){
					if(iS.length >1) //выделить найденное
						hN && hN.addNote(nSufRu(iS.length, ['образ','ец','ца','цов'])+' для правки; <a href=# data-match="'+ JSON.stringify(iS) +'" data-patrn="'+ cite.replace(/"/g,'&quot;') +'">следующий</a>',0,0,function(){
							var c1 = $q('a', this.o);
							c1.addEventListener('click', function(ev){
								var i = !c1.getAttribute('data-curr') ? 1: +c1.getAttribute('data-curr')
									,a = JSON.parse(c1.getAttribute('data-match') )
									,cite = c1.getAttribute('data-patrn');
								ta && ta.setSelectionRange && ta.setSelectionRange(a[i], a[i] + cite.length);
								c1.setAttribute('data-curr', (++i) % a.length);
								ta.blur();
								ta.focus();
								$pd(ev);
							},!1);
						});
					var i1 = iS[0];
				'citeEnd0'.wcl(nSufRu(iS.length, ['образ','ец','ца','цов']) )
					ta && ta.setSelectionRange && ta.setSelectionRange(i1, i1 + cL);
				'citeEnd'.wcl(iS, cite)
				}else
					hN && hN.addNote('не найдено образцов для правки');
				'citeEnd1'.wcl(iS, cite)
				ta.focus();
				removeLocStor('composeLetter');
			}
			if(textContentPrev !='00'&& textContent != textContentPrev){ //обработать подгруженное
				'renderOfAvaxTxt'.wcl(textContentPrev && textContentPrev.length, textContent && textContent.length)
				authorClicks(textContentDiv); //особые клики по авторам (напр. в фрейм)
				//blockBrs(textContentDiv); //сокращение верт.зазоров
				extLinks(textContentDiv); //ext.links и подписи к старым местным линкам
				handlImgViews(textContentDiv); //images
				byTextNodes(textContentDiv, haReplace); // --> XX
				 //обработка выделения текста
			}else
				wwPrevi = win.setTimeout(fillLetter, 1499); //проверка обновлений cite
			if(textContentPrev =='00')
				textContentPrev = textContent;
			return;
		}
		'conversations'.wcl(lStor, hLHash, lStNoBq, aLHash.length);
		if(aLHash[0] ==lh) aLHash =[];
		for(var i =0; i < aLHash.length; i++){
			var a = aLHash[i].split('=');
			hLHash[a[1]!==undefined && a[0]] = decodeURIComponent(a[1]!==undefined && a[1] || a[0]);
		}
		var fieldTo = $q('.conversation_page input[name="users-suggest"]')
			,fieldTheme ='<b>Тема</b>: '
			,fieldText = $q('#text_textarea');
		'fieldTo'.wcl(fieldTo, fieldTheme, fieldText);
		fieldTo &&(fieldTo.value = hLHash.to && hLHash.to.trim() || lStor && lStor.to ||'');
		fieldTheme += hLHash.subj && hLHash.subj.trim()
			|| (lStor ?(lStor.url ?'<a href="'+lStor.url+'">':'<i>')
				+ lStor.subj +(lStor.url ?'</a>':'</i>'):'<i></i>')
			+(!hLHash.subj && lStor && lStor.date && lStor.subj ?' ('+ lStor.date +')':'');

		if(fieldText) fieldText.value = (fieldTheme ? fieldTheme +'\n':'')
			+ (aLHash.length && !(/^(answer|comment)_\d+$/.test(aLHash[0])) && ( //по URL-параметрам
				hLHash.cite && ('<blockquote>'+ hLHash.cite +'</blockquote>') ||' '
			)|| (lStor ?( //по хранилищу, если нет URL-параметров
				(lStor.commId ?' # <a href='+ lStor.url +'#'+ lStor.commId +'>'+ lStor.commId +'</a> '
					+'@'+ lStor.commAuthor +'\n':'')
				+(lStNoBq?'<blockquote>':'')+ (lStor.cite ||'')
				+(lStor.commDate?' <i><font color=#999>('+lStor.commDate+')</font></i>':'')
				+(lStNoBq?'</blockquote>':'')
				+(lStor.text ? lStor.text :'')
			):'') );
		'lStor.cite'.wcl(lStor && '|'+lStor.cite+'|'+lStor.commAuthor)
		if(lStor && !aLHash.length && !lStor.noReceiver)
			removeLocStor('composeLetter');
		if(lStor && lStor.noReceiver){
			if(lStor && lStor.noReceiver ==2)
				delete lStor.noReceiver;
			'lStor'.wcl(lStor)
			lStor.noReceiver =2;
			setLocStor('composeLetter', lStor);
		}
		if(fieldTo)
			fieldTo.focus(),fieldTo.select(); //выделен адресат для быстрой смены
		if(fieldText){
			fieldText.focus(); //в поле ввода текста
			/*var evt = document.createEvent("KeyEvents");
			evt.initKeyEvent('keyup',!0,!0, win,!1,!1,!1,!1, 40,0);
			fieldText.dispatchEvent(evt);*/
		}
	},
	nSufRu = function(n, vocab){ //числительные склонения слов ("день" и др.)
		var an = Math.abs(n)
			,vocab = typeof vocab =='number'? [['д','ень','ня','ней']][vocab] : vocab;
		return n +' '+ vocab[0] + (an % 10 >0 && an % 10 <5 && Math.floor(an % 100 / 10) !=1
			? (an % 10 ==1 ? vocab[1] : vocab[2]) : vocab[3]);
	};
//===begin from Dollchan Extension Tools=== --группа функций просмотра изображений--
//wcl(114)
var doc = win.document
	,$pd = function(ev){ev.preventDefault();}
	,$sp = function(ev){ev.stopPropagation();},$pdsp = function(ev){ev.preventDefault();ev.stopPropagation();}
	,$dispTogl = function(el){el.style.display = el.style.display ==='none'?'':'none'; return el;}
	,$offset = function(el){
		var box = el.getBoundingClientRect(), aa;
			'offset'.wcl(aa={
			top: Math.round(box.top + win.pageYOffset),
			left: Math.round(box.left + win.pageXOffset) })
		return aa;
	},
addFullImg = function(a, sz, x2, isExp){ //построение изображения по клику на ссылке
	x2 = x2 || 1;
	var newW =''
		,newH =''
		,fullW = x2* sz[0]
		,fullH = x2* sz[1]
		,scrW = doc.documentElement.clientWidth -10
		,scrH = win.innerHeight -3
		,isA = a.tagName =='A'
		,full = isA ? $q('.de-img-full', a) : a.nextSibling;
	if(full && /de-img-full/.test(full.className) && isExp || !full && isExp === false)
		return;
	if(hS.viewImgs && hS.viewImgs.val && !hS.viewImgCenter.val && !$q('img[style*="fixed"]', a) )
		$dispTogl($q('img', a)); //TODO зкспериментально; отключено
	if(full && /de-img-full/.test(full.className)){
		if(full.moved)
			full.moved = false;
		else{
			$dispTogl(full);
			setTimeout(function(){full.parentNode.removeChild(full);},1);
		}
		return;
	}
	if(hS.viewImgs && hS.viewImgs.val && !hS.viewImgCenter.val)
		scrW -= $offset(a).left + 25; //TODO зкспериментально; отключено
	else{
		var el = $q('.de-img-center', doc);
		el && el.parentNode.removeChild(el);
	}
	if(fullW && fullH){
		newW = Math.min(fullW, scrW);
		newH = newW * fullH / fullW;
		if(hS.viewImgCenter.val && newH > scrH){
			newH = scrH;
			newW = newH * fullW / fullH;
		}
		if(newW/fullW < 1.13 && newW / fullW >0.88){
			newW = +fullW;
			newH = +fullH;
			var title = x2 +'00%';
		}
	}
	if(!title)
		title = Math.round(newW / fullW *100)* x2 +'%';
	var isViewUrl = !hS.addImgs.val && a.getAttribute('data-viewUrl')
		,url = isA ? a.href : isViewUrl || (a.previousSibling && a.previousSibling.firstChild.src)|| a.src;
	if(/#\.jpg/.test(url) )
		url = a.firstChild.src;
	if(isViewUrl)
		title ='100%';
	var ht ='<img class="de-img-full" src="'+ url +'" alt="'+
		url +'" width="'+(isViewUrl ?'': Math.floor(newW))+'" height="'+(isViewUrl ?'': Math.floor(newH)) +'" title="'+ title +'">'
	if(a.insertAdjacentHTML)
		a.insertAdjacentHTML(isA ?'beforeend':'afterend', ht); //Fx8+
	else
		$e( $x(isA?{apT: a}:{aft: a}, {ht:ht}) ); //неточно, и ошибки в Fx3.6
	if(hS.viewImgCenter.val){
		var resizeImg = function(ev){ //обработчик колеса мыши - масштаб картинки
			var curX = ev.clientX
				,curY = ev.clientY
				,oldL = parseInt(this.style.left, 10)
				,oldT = parseInt(this.style.top, 10)
				,oldW = parseFloat(this.style.width || this.width)
				,oldH = parseFloat(this.style.height || this.height)
				,d = isFx ? -ev.detail : ev.wheelDelta
				,newW = oldW * (d >0 ? 1.25 : 0.8)
				,newH = oldH * (d >0 ? 1.25 : 0.8)
				,sizes = full.getAttribute('data-sizes').split('x');
			if(newW/sizes[0] < 1.13 && newW / sizes[0] >0.88){
				newW = +sizes[0];
				newH = +sizes[1];
				this.title = x2 +'00%';
			}else
				this.title = Math.round(newW / fullW *100)* x2 +'%';
			$pd(ev);
			this.style.width = newW +'px';
			this.style.height = newH +'px';
			this.style.left = parseInt(curX - (newW/oldW) * (curX - oldL), 10) +'px';
			this.style.top = parseInt(curY - (newH/oldH) * (curY - oldT), 10) +'px';
		};
		full = $e({el: isA ? a.lastChild : a.nextSibling
			,clAdd:'de-img-center'
			,cs: {left: (scrW - newW)/2 +'px', top: (scrH - newH)/2 +'px'}
			,at: {'data-sizes': fullW +'x'+ fullH}
			,on: isFx ? {DOMMouseScroll: resizeImg}:{mousewheel: resizeImg}
		});
		!isA && full.addEventListener('click',function(ev){
			$pdsp(ev);
			if(full.moved)
				full.moved = false;
			else{
				$dispTogl(full);
				win.setTimeout(function(){full.parentNode && full.parentNode.removeChild(full);},1);
			}
		},!1);
		(function(el){ //makeMoveable --перетаскивание
			var elMove = function(ev){
					el.style.left = ev.clientX - el.curX +'px';
					el.style.top = ev.clientY - el.curY +'px';
					el.moved = true;
				},
				elStop = function(ev){
					var t = ev.target;
					$e({el: doc.body
						,revent:{mousemove: elMove, mouseup: elStop}});
					if(ev.ctrlKey && t.parentNode.tagName=='A')
						t.parentNode.click(); //нативный клик вынесен под Ctrl+
					if((Math.abs(ev.clientX - el.startX) + Math.abs(ev.clientY - el.startY) ||0) <5 && ev.which ==1){
						$dispTogl(t);
						win.setTimeout(function(){t.parentNode.removeChild(t);},1);
					}
				};
			el.onmousedown = function(ev){
				$pd(ev);
				el.curX = (el.startX = ev.clientX) - parseInt(el.style.left, 10);
				el.curY = (el.startY = ev.clientY) - parseInt(el.style.top, 10);
				$e({el: doc.body
					,on:{mousemove: elMove, mouseup: elStop}});
			};
		})(full);
	}
},
handlImgViews = function(el, selector){ //обработчики просмотров картинок
	var selector = selector ||'.content a[href$=".jpg"],.content a[href$=".jpeg"],.content a[href$=".png"],.content a[href$=".gif"], .message a[href$=".jpg"],.message a[href$=".png"],.message a[href$=".gif"], .comments .text a[href$=".jpg"],.comments .text a[href$=".png"],.comments .text a[href$=".gif"]'
		,els = $qA(selector, el); //все ссылки на картинки
	//'handlImgViews'.wcl(el, selector, els )
	for(var i =0, linkImg; linkImg = els[i++];){ //подгрузка картинок в рамках до 200 на 200 по расширениям файлов в ссылках
		var a = linkImg.cloneNode(false)
			,imgsInLink = $qA('img', linkImg);
		if(imgsInLink && imgsInLink.length !=1 && hS.addImgs.val){ //подгружать картинки-ссылки
			var lastLink = linkImg;
			$e({el:'img' //малая картинка со ссылкой перед найденной ссылкой
				,cl:'de-img-pre'
				,at:{src: a.href, alt: a.href.substr(0,200)}
				,on:{load: function(){
					var t = this
						,fullW = t.width
						,fullH = t.height
						,x2 = hS.viewX2.val && fullW *2 < win.innerHeight -3 ? 2:1; //признак "x2" - удваивать масштаб
					t.title = (x2 ==2 ?'/':'')+ fullW +'x'+ fullH;
					//'on:{load'.wcl(t.title, lastLink)
					if(lastLink.firstChild.tagName =='BUTTON'){var evt = document.createEvent('Event');evt.initEvent('loadImg',!0,!0); evt.data = t.title; win.dispatchEvent(evt);}
					t.style.cursor = x2 ?'ne-resize':'move';
					if(/^imgL$/.test(t.parentNode.className)|| t.parentNode.className =='lnk'){ //включить видимость копий, выключить - оригиналы ссылок
						t.parentNode.style.display ='inline-block';
						t.parentNode.nextSibling.style.display ='none';
						t.parentNode.title = t.title;
						if(t.parentNode.className =='lnk')
							t.parentNode.className ='lnk imgL';
					}else
						$dispTogl(t.parentNode);
					if(fullW <= 200 && fullH <= 200)
						return;
					var k = fullW/fullH;
					t.width = k < 1 ? 200 * k : 200;
					t.height = k < 1 ? 200 : 200/k;
				}},
				apT: $e({el: function(){
						var pImg = linkImg.previousSibling;
						if(pImg && pImg.className=='aPrevi imgL')
							pImg.parentNode.removeChild(pImg);
						pImg = linkImg.previousSibling;
						if(pImg && pImg.className=='aPrevi imgL')
							pImg.parentNode.removeChild(pImg);
						return $dispTogl(a);
					}
					,at:{target:'_blank'}
					,on:{click: function(ev){ //eventLinkImg(a);
						//'ev.button !==1'.wcl(ev.button,ev.button !==1, (hS.viewImgs.val || hS.viewImgCenter.val) && ev.button !==1)
						if((hS.viewImgs && hS.viewImgs.val || hS.viewImgCenter.val) && ev.button !==1){
							if(ev.ctrlKey)
								return;
							$pd(ev);
							if(showImgMenu(ev, ev.currentTarget.frstChild) ) //по Shift+клик
								return;
							var titl = this.firstChild.title
								,imgWH = titl.match(/(\d+)x(\d+)$/)
								,x2 = titl.charAt(0)=='/'? 2:1; //признак "x2"
							if(imgWH && imgWH.length ==3)
								addFullImg(this, imgWH.slice(1), x2);
						}
					}}
					,bef: linkImg
				})
			});
		}else //подготовка тамбнейла для просмотра по клику на нём ссылки
			imgsInLink && imgsInLink.length ==1 && $e({el: imgsInLink[0]
				,clAdd:'de-img-thumb'
				,at:{'data-viewUrl': linkImg.href} });
	}
	if(!(hS.viewImgs && hS.viewImgs.val) && !hS.viewImgCenter.val) //не просматривать картинки в странице
		return;
	for(var img, i =0, imgs = $qA('.content img:not(._noAddOwnView),.message img:not(._noAddOwnView),.message .text img:not(._noAddOwnView)', el); img = imgs[i++];){
	//'12'.wcl(img,img.width , img.height)
		if( (img.width >22 || img.height >22 || img.width==0 || img.height==0) && (!img.previousSibling || img.previousSibling && img.previousSibling.className !='de-img-hid') )
		(function(img){$e({el:'img' //полная картинка в невидимом диве с overflow
			,cl:'_noAddOwnView'
			,at:{src: hS.addImgs.val && img.getAttribute('data-viewUrl') || img.src}
			,cs:{position:'absolute', left:'-9999px'}
			,on:{load: function(ev){
				var fullW = this.width
					,fullH = this.height;
				this.title = fullW +'x'+ fullH;
				$dispTogl(this.parentNode);
				//'WHBig'.wcl(fullW, img.width, fullH, img.height, img);
				if(fullW == img.width && fullH == img.height){
					img.style.cursor ='ne-resize';
					if(hS.viewX2.val)
						this.title = '/'+ this.title; //признак "x2" (особый курсор)
				}else if(!hS.viewX2.val){
					img.style.cursor ='move';
					img.setAttribute('data-view',1);
				}
			}},
			apT: img.previousSibling && img.previousSibling.className =='de-img-hid' && img.previousSibling || $e({cl:'de-img-hid'
				,cs:{overflow:'hidden', width:0, height:'8px'}
				,bef: img
			})
		}) })($e({el: img //обработчик и смена курсора картинки
			,cs: hS.viewX2.val ?{cursor:'move'}:{}
			,on:{click: function(ev){ //eventLinkImg(a);
				//'ev.button !==1'.wcl(ev.button,ev.button !==1, (hS.viewImgs.val || hS.viewImgCenter.val) && ev.button !==1)
				var t = ev.currentTarget;
				if(!hS.viewX2.val && !t.getAttribute('data-view') )
					return; //не просматривать, если размер не изменится
				if((hS.viewImgs && hS.viewImgs.val || hS.viewImgCenter.val) && ev.button !==1){
					if(ev.ctrlKey)
						return;
					$pd(ev);
					if(showImgMenu(ev, t)) //по Shift+клик
						return;
					var titl = this.previousSibling.firstChild.title
						,imgWH = titl.match(/(\d+)x(\d+)$/)
						,x2 = titl.charAt(0)=='/'? 2:1; //признак "x2"
					if(imgWH && imgWH.length ==3)
						addFullImg(this, imgWH.slice(1), x2);
				}
			}}
		}));
	}
},
showImgMenu = function(ev, img){ //контекстное меню на картинке - поиск по изображению
	if(!ev.shiftKey) return;
	else{
		var srcD ={TinEye:{url:'tineye.com/search/?url='}
				,Google:{url:'google.com/searchbyimage?image_url='}
				,Yandex: {url:'images.yandex.ru/yandsearch?text=&rpt=imagedups&img_url='}
				,SauceNAO:{url:'saucenao.com/search.php?url='}
				,IQDB:{url:'iqdb.org/?url='} }
			,srcMenu = $e({cl:'de-menu'
				,on:{mouseout: function(){
					$dispTogl(srcMenu);
					win.setTimeout(function(){srcMenu.parentNode.removeChild(srcMenu);},1); }}
				,cs:{left: ev.pageX -30 +'px', top: ev.pageY -24 +'px'}
				,apT: doc.body
			});
		for(var i in srcD)
			$e({el:'A'
				,cl:'de-src'
				,at:{target:'_blank', href:'http://'+ srcD[i].url + img.src}
				,ht:'<img src="http://'+ srcD[i].url.replace(/\/.*/,'') +'/favicon.ico"> '+ i
				,on:{mouseout: function(ev){ $sp(ev);}}
				,apT: srcMenu
			});
	}
	return 1;
};//===end from Dollchan
var allASCII = function(s){ //все символы строки - ASCII
	for(var i =0; i < s.length; i++)
		if(s.charCodeAt(i) >127)
			return !1;
	return!0;
},
$x = function(el, h){if(h) for(var i in h) el[i] = h[i]; return el;}, //===extend===
$e = function(g){ //===создать или использовать имеющийся элемент===
//g={el|clone,elA,cl|(clAdd,clRemove),ht,cs,at,atRemove,on,revent,ap,apT,prT,bef,aft,f+fA}
	if(typeof g.el =='function') g.el = g.el.apply(g, g.elA);
	if(!g.el && g.el !==undefined && g.el !='') return g.el;
	g.el = g.el || g.clone && g.clone.cloneNode(!0) ||'DIV';
	var o = g.el = typeof g.el =='string'? document.createElement(g.el) : g.el;
	if(o){ //выполнять, если существует el или clone
		if(g.cl)
			o.className = g.cl;
		else{
			if(g.clAdd)
				o.classList.add(g.clAdd);
			if(g.clRemove)
				o.classList.remove(g.clRemove);}
		if(g.cs)
			$x(o.style, g.cs);
		if(g.ht || g.at){
			var at = g.at ||{}; if(g.ht) at.innerHTML = g.ht;}
		if(at)
			for(var i in at){
				if(i=='innerHTML') o[i] = at[i];
				else o.setAttribute(i, at[i]);}
		if(g.atRemove)
			for(var i in g.atRemove)
				o.removeAttribute(g.atRemove[i]);
		if(g.htT){ //подготовка шаблона
			if(!(typeof g.htTA =='object')) g.htTA =[g.htTA];
			for(var i in g.htTA)
				g.htT = g.htT.replace(RegExp('\\{\\{'+ i +'\\}\\}','g'), g.htTA[i])
			o.innerHTML = g.htT;}
		if(g.on)
			for(var i in g.on) if(g.on[i])
				o.addEventListener(i, g.on[i],!1);
		if(g.revent)
			for(var i in g.revent) if(g.revent[i])
				o.removeEventListener(i, g.revent[i],!1);
		if(g.ap){ //добавление нод
			if(g.ap instanceof Array){
				for(var i in g.ap) if(g.ap[i] && i !='length')
					o.appendChild(g.ap[i]);
			}else o.appendChild(g.ap);}
		g.apT && g.apT.appendChild(o); //ставится по ориентации, если новый
		g.prT && (g.prT.firstChild
			? g.prT.insertBefore(o, g.prT.firstChild)
			: g.prT.appendChild(o) );
		g.bef && g.bef.parentNode.insertBefore(o, g.bef);
		g.aft && (g.aft.nextSibling
			? g.aft.parentNode.insertBefore(o, g.aft.nextSibling)
			: g.aft.parentNode.appendChild(o) );
		if(typeof g.f =='function')
			g.f.apply(g, g.fA); //this - это g
	}
	return o;
/*
var x=
	{cl: function(){o.className = g.cl;}
	,clAdd: function(){o.classList.add(g.clAdd);}
	,clRemove: function(){o.classList.remove(g.clRemove);}
	,cs: function(){$x(o.style, g.cs);}
	,ht: function(){var at = g.at ||{}; at.innerHTML = g.ht;}
	,at: function(){var at = g.at ||{};
		for(var i in at){
			if(i=='innerHTML') o[i] = at[i];
			else o.setAttribute(i, at[i]);}}
	,ap:function(){if(g.ap instanceof Array){
		for(var i in g.ap) if(g.ap[i] && i !='length')
			o.appendChild(g.ap[i]);
	}else o.appendChild(g.ap);}
	,on:function(){for(var i in g.on) if(g.on[i])
		o.addEventListener(i, g.on[i],!1);}
	,revent:function(){for(var i in g.revent) if(g.revent[i])
		o.removeEventListener(i, g.revent[i],!1);}
	,apT:function(){g.apT.appendChild(o)}
	,prT:function(){g.prT.firstChild
		? g.prT.insertBefore(o, g.prT.firstChild)
		: g.prT.appendChild(o)}
	,bef:function(){g.bef.parentNode.insertBefore(o, g.bef)}
	,aft:function(){g.aft.nextSibling
		? g.aft.parentNode.insertBefore(o, g.aft.nextSibling)
		: g.aft.parentNode.appendChild(o)}
};
for(var i in g) //проход по числу параметров, проп-о объёму задачи
	g[i] && x[i] && x[i]();*/

},
addRules = function(css){
	if(typeof GM_addStyle !=u) GM_addStyle(css); //Fx,Chr
	else if(typeof addStyle !=u) addStyle(css);
	else{ //Op
		var heads = document.getElementsByTagName('head')
			,node = $e({el:'style'
				,apT: heads.length && heads[0]
			});
		node.appendChild(document.createTextNode(css)); //не проходит в Опере через $e
	}
},
getPosition = function(o){
	var x =0, y =0;
	while(o){
		x += o.offsetLeft ||0;
		y += o.offsetTop ||0;
		o = o.offsetParent || o.parentNode;
	}
	return {x:x, y:y};
},
parents = function(cl, elem){
	for(var el = elem; el!=null && !RegExp(cl).test(el.className); el = el.parentNode);
	return el;
},
parentsPrev = function(cl, elem){
	for(var el = elem, pr; el!=null && !RegExp(cl).test(el.className); el = el.parentNode)
		pr = el;
	el.prev = pr;
	return el;
},
prev = function(cl, elem){
	for(var el = elem; el!=null && !RegExp(cl).test(el.className); el = el.previousSibling);
	return el;
},
next = function(cl, elem){
	for(var el = elem; el!=null && !RegExp(cl).test(el.className); el = el.nextSibling); //el.className != cl
	return el;
},
evtChangeDom = function(voteA){ //===== сообщение о смене DOM, 'chgDom' ====
	var evt = document.createEvent("CustomEvent");
	if(evt && evt.initCustomEvent){ //TODO поддержку простых Event через хранилище или GM_setValue
		evt.initCustomEvent('chgDom',!0,!0, voteA);
		win.dispatchEvent(evt);
		return!0;
}};
if(/habrastorage\.org/.test(lh)){
	var hsoLogo = $q('.wrapper .header .logo'), hsoCloud = $q('.content #upload_cloud img');
	if(hsoLogo && hsoCloud){
		hsoCloud.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAACPCAMAAAAbfxOfAAABPlBMVEVOhrqrx95/qszW4u5fotmWttbE2OlkmMJipt/w9fpWlsqZw+p+st6w1vLE3/VtsupUksXg7/i3z+Kiwttwos1xq9+Evu7+/v7Q4OymyuaqzOqMs9JunsZam9BWjr2fvttmq+T1+vzo8fljncvS4/Nck7/g6vLK3uudy/FSjr2xzuWXvt+91ud3tup4pcqQw+5nos/K2ur29vqRut6myuJ/uuy72/Z/rtbX6fmWxvB2qtSGuuaOutpuruijzfKyyuFqnsa+0uamw9ys0vKSttJqreXq9v16uu6qyuaGrs6avtnE2u5qmsTw9v5alsyexua21/PK4fW50uqfw+JyptKKv+2KttpentZmrurq8v5qnsrQ5vpdlcZ6tu5ysupSjsK+1u5qotaGuuqGstZqrupOirrY5vFeptqYutgAAAD/YHsOAAAAanRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AvOTc4wAAAAFiS0dEAIgFHUgAAAgHSURBVHjaxZz7Y9JIEMdDwUDwSoEqm5OSkliwaS2IHrT1TmpbW18FWx8Hnhzcg+Tg//8HLhtCy2N3M3ky/mRV+Djz3dnXzHJjryYrelTEppcF5PXDOPf/VKlF7q3FtTkrbb3fzkblkHHkJ2cVSaMaF89nyygkHD1S0QBWyvNC4Djl7fnwqINBOp1OJpNt81fS+M1gMFCtP107FQLEEU6u5kjSyXah04kl5iwW6xQKBpbFlBdRMDjl/DxKIWaAFA0bzln3wviRQdUxmAb478ZPZP9xxDvBqBgFk3SHdMNMGAkTSZuCvzh3MBOWRZfQkSZEUCAQTnltCjNIg1ms0GGidlrVpAjyB0cY3cIkO45YpkSJWMEAivM+4KBsyYJJFwyY7tCNGS4qGLpeU7ziKGuznhm6NhNIlU6QJxxe8gVmAoRDtia4x5GtTKMmC27DtAg0KPFuccpXU9HEfIAxgRKdpLqNXOFYgVK9x2lulBXSjIDRcSLcRDWGa4Y+GnbQleIUB72xAuWja6ZAsUIv6gxHXrMC5Zdq5h1U6NWc4MgVK1C+u8YaYp0kD8cJmMYMWPspFMeiMWRzMRwGx8PDcCzdpDsByGZOQCIEB+XDoDF5dABOZEozDNiKiWeKLQ7PhUSDeV4+t8Epq6HRYJ4XiIkjxEPRzR3PHhPnvZVvwqHB411n4GTNmSG47EfgeShTcTLmkiIZIo3Bs0/DQWY2TsfCpDFWQCIFxwzVoBMqzUK4ZnAUaSKc7jBknk9EnLwz4eSaqYyMEJIvjxq7B554ygQcnXOQ/+qNSzRnmfO+e/n8ipZw0JYZKhBN7gdaNrnh2kXFmyUc3gwVZFT1U4hi6xsueQ7QAg66go6qagtRLVN3Ga7UAs7EOYBRtY6YduzNPdyMciAJsIFsrOmOJzWHI2LnFBLeaRDadYVTn8NZgznnHAGs6ornaAZH4UDOqUJokJz7Vq3mnKah4xmcbZBz+i3kwL6nnLmpdYuD8HlbO+GDcOat5UTX17c4NZxzbJ1TR84tk3MmZm46edrnnBRyY/CBlrFwZAkyW/WROwMHbN3C4UFCPneJA07UdQtnBBLykVsc+S2QR5ngxCGT5wZybUfwicLAKeNY2S4Cq+5xoHn62MTJgmJ17gEHZRoQoj7COHlArP68lpE3kxt1gHg4Uzo24+oghfywVN1WPNxYMHMgM052nslKJREE9IgdhKaBI9rkwAPbEY7Fp8J4dOZEnzNwImzp5FoQGjCPUGcmE278himdnAyjAfPI31ha5sYVnHWoiRtMA+f5h46zw+GBRVVy/xJOA48XXT8NTmYpGaRiDS/eJAc8Uao0zjmFoeSm3QefmjR4ltmqOeD5QOPZ5XT6QrBvJ5ynExqEcZADHuExhafKifSBZbc25i2aCQ56Auf5EiMvPXMcTx1Yds6Z+maKY/knCplSCzFyyuWy1IF1DvTNLc7EP5IOGOwj8nf2GTgZ9kea48mkucWZ+CcOcE+Z/KV9LkJb7LxFtjhTR9zimP5RIeqJa22SYDEOOe3YjfJa/EEZLeKgmqSdgMa6ppIGEHdCy4IO1jgzOIYuYFP7lpYk4WRpOBmXODATjDVogihlCk4rUBx52xAJAYen4aBAcdCJpKUJeUdcEU5W0lRCVtZXhIOvXAlzlrIinE0Szi6HaHknWCk//0DCOcerQfIkcRQojpIn4aTwWpmM0wgUR6+QcI648YiywDgOFIffMpZ9S995yY1PKDj9QHH28I6hS9hnRWmrwR/gzzYm94pD6ZzFjTl0Eecb3qNzlKU7PFpPpV7UGU4tX9IG/5H26OMrCs7GJQrKhEictCbGJxjjN7R9VjMwHHFE3N2Z5zun1F1oJiAama/g7dTSbsI8jFNoW4nig4Bw+DND/Okl5zyenJxe0TZaxc1AaDJYOWpnyTn71rkydVdcrAWh41N8e0ZYmpYnOCL9zOAi6j/N2WsJD6sl55SsU3dUop8NvtL9psm+Ni86lx3w7/TG5h7j+OuC95VGGZn1U6RdhD7FEQeMs8riyE8Vj0oa+aS227u77YuzTnKLf4h+BYrPl8xybNK3vbi7C40wz7mL6ns/FPRc3zZLGdrk71JmborZtwBFVatkBW+JWM/eq8QZlWXPZu/R8+xz9yKuJqxs8mU3NxNymd+sxK96ky4UWg3gx1mcqM2tRFHVfDCVURs+XxJSsbkLLU7bm1zbIMnqQvl5Hke0vSkuJmJt9z7CAma156CFcqJK4BVxrP/uL4vVTWIyMVydoaVStMOwCwZnbG+5Mq5cWJl7HpPqBrdjq3LPDglHeLYi9xySa075FalHphQI/x56vSm2z7R6ZeHvFbjnJb2a+8kK1Cwzat2/hB4ukVV6L/8Usnv22X0SysNQeb7adZHshBmunmzbY/NXiO5RAA1Rj0Lj2YH0Z6FPIfF8hHWvofuh8HyG9vaFwrMH73xE97ur8A21LxQ1u6HrhtnEe10Md0zZ9RTfXISYbwAd15mDgGAeuOm4NpY/1UBoXrjt1kfr/sNIHz28ZXBUDy9QkJce5KavNO88P8vho4O+2r5cAnglBDX6gaY+x2+otPyI2BcfX5hRdj3C7MPe4AG/v6M0XwUO4+h1IvnaXZruvYM/l+To7Sa047wb7FAP8mWrlpNGHu3rZ4evf7l490u+aUKi1jvknb9E5vKRNiXVzDFR9gRXn+vhzTik3Fw3q/UZT20c5KqHv+1lVvKE3V30Wsp35fulLHv/qP8BqHPfIquWK4UAAAAASUVORK5CYII=';

		$e({el:hsoLogo
			,cs:{backgroundImage:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAABblBMVEVorulnrednrObW5vX2+Pmhv9tTkcTm7/eVw+ygye681/LI3vS41vGCuemeutRNiLmKsdR0s+r1+Pn1+PihvtqGqsve6vb09vjt8fXi7PBakL6Vt9fz9vjr8fPR4OuRs9BNiblorua0yd3u8/iWuNhdkb6hu9aLsM9YjrxPibpOiLlNibtZmdForelOiruKr9PI1+WtyeNOiLpPibtRjL5cnNVorObE2/FPir5Xk8xkp95nrufl7PKpwdjN4PJwocxRi75cntVmrOVoruiIq83t8vXT3+yTstBOibxanNJmrOdNiLpUkshjp+Foreh6osfb5O3S3ulQjMBdnthnrOdOibtWlMtiqePk6/G+0OFQjr5gotlsmsJbnNNVlcpUkcVTkcZNirlXlstOiLxentXW5vRRjsBipNzU4e5Si75bmcxkqeNQjcBZmM5ko91nq+ZnrulOi7xVk8hcn9djpuJNibpQjb9jqN5lquVnrOicjUr2AAAAAWJLR0QAiAUdSAAAAWpJREFUeNrtlk1Lw0AQhgtdUCsGhVawfkCq1YuMejJ2G70YQ0+JCBVr0BxCsJSoh4J/39mPxB6kZLPBg+xz2ckGHt6ZLGwaDYPBYDAY/j2U1uNpEkLasZCtYL3Ky7UWYay3NqiiywIhY65NLLeapKBNVV1CxlwdLLcLk7fTjamqi8uEC3Zz097+gY9vbKV5gZBJVw+XwyPc6h+fdHE5VXahjLnOAM5xuYCCSWIr9shkfPbCdRnnKudqQNVdMBQ9umxW1zdyc5pQlR4XucUxeby680WuUWUX5oJOfiJ44PFcIxdAEMqn+z5A+kA1ciGWtIVYvzxWn70geOIyFw/Fs64LIAplsJG+CwIWjDVZg4t9Tw/X1+quiPRc9ugOZY+x5rnPsfR6DBdULJaTVHZF3o+KnVVIByVdb7/M3ueTIp7LP8Q0m5W9g2JYTpq9f3zWInPGydxWuB2XyCbZV+lQBoOh5j9XMwKD4S/4Bpvib4HQl4+eAAAAAElFTkSuQmCC)',opacity:1}
		});
		
	}
	var testLegacyFrame =0;
	$e({ht:'<h2>&rarr; Перетащи картинку сюда &larr;</h2>(куда-нибудь в это окно)<br>К сожалению, будет работать только для картинок размером менее 10КБ. Держатели сайта знают, а работа по устранению недостатка через клиент &mdash; ведётся.'
		,apT:$q('#bittonsHolder') });
	if(testLegacyFrame) $e({ht:'<iframe src='+ HSO.replace(/\/\/ha/,'//legacy.ha') +'>&rarr; Перетащи картинку сюда &larr;</h2>(куда-нибудь в это окно)'
		,apT:$q('#bittonsHolder') });
    addRules('.logo{margin-bottom:0; margin-top: -90px}');
	var doDrop //для Chrome
		,getKeyUser = function(){ alert(win.userKey +' '+ win.user); }
	,listenDrag = function(win){ $e({el: win, on:{
		dragover: function(ev){hS.noConsole.val =0;'dragover'.wcl();doc.body.style.backgroundColor ='#e8e8f2'; $pdsp(ev);}
		,mouseout: function(ev){doc.body.style.backgroundColor ='#fff';}
		,dragend: function(){'dragend'.wcl();'dragend'.wcl(); return!1;}
		,drop: doDrop = function(ev){'drop'.wcl('window.user');
			if(0&& isChrome){
				if(window.win != window){
					//winEval(getKeyUser);
					return;
				}
				win = window;
			}else
			$pdsp(ev);
				doc.body.style.backgroundColor ='#fff';
			if(isChrome) win = window;
				'drop2'.wcl(win.user, win.userKey,win, win.unsafeWindow && unsafeWindow)
			if(win.user && win.user.length >0){
				var xhr = new XMLHttpRequest()
					,file = ev.dataTransfer.files[0]
					,uploadsCount =0
					,formData = new FormData()
					,reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(ev){
					'fileDrop-target'.wcl(ev.target, ev.target.result);
				};
				'file'.wcl(file)
				xhr.open('POST', (!/legacy\.habrastorage\.org/.test(lh) ? HSO : HSO.replace(/\/\/ha/,'//legacy.ha') ) +'/uploadController/?username=' + win.user + '&userkey=' + win.userKey,!0);
				//formData.append('username', win.user);
				//formData.append('userkey', win.userKey);
				formData.append('Filedata', file);
				xhr.setRequestHeader('Origin', HSO);
				xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
				//xhr.setRequestHeader('Accept-Encoding', 'nogzip, deflate');
				xhr.send(formData);
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4 && xhr.status == 200){
						var mbJson = /\{/.test(xhr.responseText)
							,answer = mbJson && JSON.parse(xhr.responseText)||{}
							,upF = $q('#uploadedFiles'), upFI;
						$e({el: upFI = $q('#uploadedFilesItems')
							,ht: upFI.innerHTML +(mbJson ?'<div class="uploaded-item">'
								+'<div class="uploaded-thumbnail"><label for="file-name-0"><img src="'
								+ answer.crop +'" height="96" width="96" title="'+ answer.filename +', '
								+ file.size +' байт"></label></div>'
								+'<div class="uploaded-url"><input size=37 onclick=this.select() value="'
                                    +'&lt;img src=&quot;'+ answer.url +'&quot;/&gt;" id="file-name-0" title="'
                                    + file.mozFullPath +'"><input size=35 onclick=this.select() value="'
								+ answer.url +'" id="file-name-1" title="'+ file.lastModifiedDate +'"></div></div>': xhr.responseText)
						});
						upF.style.display ='block';
						$e({el: $q('#divStatus'), ht:'Загружено: '+ ++uploadsCount, cs:{display:'block'} });
						'message_0from_storage'.wcl(ev.data, win.parent,'<img src="'+ answer.url +'"/>');
						if(isChrome){ win = window;
						win.parent.postMessage('<img src="'+ answer.url +'"/>', HRU);
						}else{
							wcl(answer.url)
							try{
							win.parent && win.parent.habraWYG && win.parent.habraWYG.insertTag(/*h.taSaved.el*/ $q('textarea'), '<img src="'+ answer.url +'"/>');
							}catch(er){'er'.wcl(er)}
						}
				}};
			}
			return!1;
	}} }) };
	if(0&& isChrome){
		//winEval(evtChangeDom,'window');
		;//addEventListener('getWinJs', listenDrag,!1);
	}else
		listenDrag(win);
}else
	win.addEventListener('message', function(ev){ //слушать сторадж для вставки тега в поле ввода
		'message'.wcl(ev.origin);
		if(ev.origin !=HSO) return;
		'message_from_storage'.wcl(ev.data);
		win.habraWYG.insertTag(/*h.taSaved.el*/ $q('textarea'), ev.data);
	},!1);

var h = {}
,hNE, hNCloseButt, hNCiteList,
hN ={ //noteBar
	elem: hNE = $e({cl:'noteBar' //сервис замечаний и выделения текста
		,cs: window.innerWidth <600 ?{left:'50px', maxWidth:'85%'}:''
		,ap:[$e({cl:'closeButt'
				,ht:'X'
				,on:{click: function(ev){
					parents('^noteBar$', this).style.display ='none';
					var notes = $qA('.noteBar .notes .note');
					for(var i in notes)
						notes[i].parentNode && notes[i].parentNode.removeChild(notes[i]);
				}}
			})
			,$e({cl:'delim'})
			,hNCiteList = $e({cl:'list'})]
		,apT: document.body})
	,addNote: function(s, type, id, callb){ //==== добавить напоминание в бар ====
		var once = !type || type !='*'? 1:0; //noonce if type=='*'
		if(win.opera)
			$e({el: hNE, apT: document.body}); //т.к. при раннем старте не подгружается в .body
		var notes = $e({
			 el: $q('.notes', hNE) ||''
			,cl:'notes'
			,bef: $q('.delim', hNE)
		});
		wcl($q('.notes', hNE))
		$e({
			 el: $q('#'+ (id ||'id0'), notes) ||''
			,at:{id: id ||'id0'}
			,ht:'<span style="color:#a76">('+(once ?'!':'*')+')</span> '+ s
			,cl:'note' +(once?' once':'')
			,apT: notes
			,f: callb
		});
		hNE.style.display ='block';
	},
	retainView: function(){ //скрыть нотификатор, если внутри - только блоки однократного показа, + скрыть блоки однократного показа
		var t = this
			,notes = $qA('.note', t.elem)
			,noonce;
		//wcl(t.elem, notes.length, noonce)
		for(var i in notes){
			if(!/ once/.test(notes[i].className) && notes.length )
				noonce =1;
			else
				win.setTimeout(function(){notes[i].parentNode && notes[i].parentNode.removeChild(notes[i]);}, 99);
				//notes[i].style.display ='none';
		}
		//'noonce'.wcl(noonce)
		var selField = $q('.sele .selText', t.elem);
		selField && selField.parentNode.removeChild(selField);
		if(noonce) return;
		t.elem.style.display ='none';
	}
},
hideC2 = function(ev){ //скрыть содержание
	var topic = parents('^post($| )', this) || parents('^rotated_posts', this) //на контейнер статьи
		,cont = $q('.content',topic)
		,inln = / inln/.test(cont.className)
		,c2 = $q('.content.c2',topic);
	if(/ n2/.test(this.className)) //подкрутка окна
		(isChrome?document.body:document.documentElement)['scrollTop'] -= c2.offsetHeight - this.getAttribute('rel') +12; //qa +3
	cont.style.display = inln?'inline':'block'; //показать начало статьи (до ката)
	if(inln)
		cont.className = cont.className.replace(/ content/,'')
	$q('.btnBack:not(.showComm)',topic).style.display //скрытие верхнего "Свернуть"
		= $q('.btnBack.n2',topic).style.display //скрытие нижнего "Свернуть"
		= c2.style.display ='none'; //скрыть полную статью
	if(isChrome){
		var info = $q('.infopanel', topic);
		info.style.top =(h.inZen?'-':'')+'3px';
	}
},
hideComm = function(ev){
	var topic = parents('^post($| )', this)
		,c2 = $q('.comments.c2', topic);
	if(/ n2/.test(this.className)) //подкрутка окна
		(isChrome?document.body:document.documentElement)['scrollTop'] -= c2.offsetHeight - this.getAttribute('rel') +8; //QA -2, ес. не перед EV
	$q('.showComm.btnBack:not(.inln)', topic).style.display
		= $q('.comments.c2', topic).style.display
		= $q('.showComm.btnBack.n2', topic).style.display ='none';
},
addTaButtons = function(comms){ //добавление тегов в поле ввода
	var panels = $qA('.panel', comms.parentNode)
		,topicAdd = $q('.topic_add') || $q('.qa_add') ;
	//'addTaButtons/comms,panels=='.wcl(comms, panels)
	if(panels && panels.length){
		var win = (typeof unsafeWindow !=u)? unsafeWindow: window;
		//в Хроме window не видно, => прих-ся переписывать или вызывать через DOM
		if(!win.habraWYG) win.habraWYG ={};
		win.habraWYG.insertTag = function(link, startTag, endTag){
			var ta = $q('textarea', parents('editor', link));
			endTag = endTag ||'';
			if(ta){
				ta.focus();
				var scrtop = ta.scrollTop
					,cPos = ta.setSelectionRange
						?{start: ta.selectionStart, end: ta.selectionEnd}
						:{start:0, end:0}
					,sTag = ta.value.substring(0, cPos.start)
						+ startTag + ta.value.substring(cPos.start, cPos.end) + endTag
					,newCPos = cPos.start == cPos.end
						? cPos.start + startTag.length
						: sTag.length;
				ta.value = sTag + ta.value.substring(cPos.end);
				if(ta.selectionStart)
					ta.setSelectionRange(newCPos, newCPos);
				if(scrtop)
					ta.scrollTop = scrtop;
			}
			return!1;
		};
		for(var i in panels){ if(panels[i] && panels[i].appendChild){
			var panel = panels[i]
				,addBtn = function(tag, tag2, title, view, color, before){
					return $e({cl:'spanned', ht:'<b><a tabindex="-1" href="#" onclick="return habraWYG.insertTag(this, \''+tag+'\',\''+tag2+'\');" title="'+title+'"><font style="color:#'+(color||'79b')+';padding-left: 6px; top: 2px; position: relative">'+view+'</font></a></b>', apT: before?'':panel, prT: before?panel:''});
				};
			addBtn('<blockquote>','</blockquote>','Цитата','Q&nbsp;').className ='spanned quot'; //цитата
			var btnFo = addBtn('<font color=&quot;#223377&quot;>','</font>','Font color','F','a86'); //цветной текст
			var pTmp;
			if(pTmp = $q('a[onclick*="blockquote"]', panel) )
				pTmp.parentNode.removeChild(pTmp);
			if(pTmp = $q('a[onclick*="insertUser"]', panel) )
				pTmp.parentNode.removeChild(pTmp);
			if(pTmp = $q('a[onclick*="insertHabracut"]', panel) )
				pTmp.setAttribute('onclick','return habraWYG.insertTag(this,\'<habracut text=\"\',\'\">\')');
			addBtn('<hh user=&quot;','&quot;/>','User','<img width=12 height=12 src=/i/bg-user2.gif alt=U style="padding:0"/>').className ='spanned user'; //юзер
			addBtn('<spoiler title=&quot;&quot;>','</spoiler>','Спойлер','SP&nbsp;');
			if(topicAdd)
				addBtn('<h3>','</h3>','Заголовок','H3&nbsp;',null,1);
			if(pTmp = $q('a[onclick*="insertLink"]', panel) ) //ссылка; упрощение "a href"
				pTmp.setAttribute('onclick',"return habraWYG.insertTag(this, '<a href=\"\">','</a>');");
		//'pTmp insertImage'.wcl($q('a[onclick*="insertImage"]'), panel) //картинка
			if(pTmp = $q('a[onclick*="insertImage"]'), panel){ //упрощение IMG
				pTmp.setAttribute('onclick',"return habraWYG.insertTag(this, (event.ctrlKey || event.shiftKey ?'<nobr>':'') +'<img src=\"',(event.ctrlKey && event.shiftKey?'\" align=\"center': (event.ctrlKey?'\" align=\"right':'') +(event.shiftKey?'\" align=\"left':'') ) +'\"/>'+ (event.ctrlKey || event.shiftKey ?'</nobr>':'') );");
				pTmp.title ='IMG (Shift: left; Ctrl: right; Shift+Ctrl: center)';
			}
			if(!hS.tagsInput.val) return;
			var hoverMenu = function(btn, ht, type, el){ //всплывание меню
				for(var j =0; j < ht.length; j++)
					ht[j] = ht[j] =='br'?'<br/>': ['<b>','<span>','<span style=color:#'+ ht[j] +'>'][type]
						+ ht[j] + ['</b>','</span>','</span>'][type];
				var colrs,ww0,ww1;
				$e({cl: ['langs','langs2','colrs'][type]
					,ht: ht.join('')
					,on:{mouseover: colrs=function(ev, ths){
							var panelEcho = ev && parents('panel', ev.target) || ths; //ths - панель
							if(/qa_view/.test(comms.className))
								panelEcho = comms; //<= в QA - 2 панели на страницу
							var colrS = panelEcho && $qA('.'+['langs','langs2','colrs'][type], panelEcho);
							if(ww0) win.clearTimeout(ww1);
							if(ww1) win.clearTimeout(ww1);
							if(colrS){
								colrS[el &&(el-1) || 0].style.display = ev && ev.type=='mouseover'|| ev===0?'block':'none';
								colrS[el &&(el-1) || 0].style.top = -colrS[el &&(el-1) || 0].offsetHeight +2 +'px';
							}
						},
						mouseout: function(){win.clearTimeout(ww1);ww1 = win.setTimeout(function(){colrs(null, panel)}, 300)}
						,click: function(ev){return win.habraWYG.insertTag(ev.target, type <2
								?'<source lang="'+ ev.target.innerHTML.replace(/#/,'s') +'">\n'
								:'<font color=#'+ ev.target.innerHTML.replace(/(.)/g,'$1$1') +'>'
							,type <2 ?'\n</source>':'</font>') }
				}, apT: panel});
				btn && btn.addEventListener('mouseover', colrs,!1);
				btn && btn.addEventListener('mouseout', function(ev){ww1 = win.setTimeout(function(){colrs(null, panel)}, 300)},!1);
			};
			hoverMenu($q('.txt', panel),('bash,lisp,scala,tex,dos,br,ruby,python,php,perl,br,'
				+'xml,javascript,html,css,br,lua,java,cpp,c#,sql').split(','),0);
			hoverMenu($q('a[onclick*="\'s\'"]', panel),('actionscript,apache,cmake,diff,vbscript,br'
				+',coffeescript,django,delphi,erlang,erlang_repl,br'
				+',haskell,go,matlab,mel,markdown,nginx,vala,br'
				+',objectivec,vhdl,smalltalk,rust,axapta,1c').split(','),1);
			hoverMenu($q('.quot', panel), ('000,003,006,009,00c,00f,300,303,306,309,30c,30f,br,'
				+'030,033,036,039,03c,03f,330,333,336,339,33c,33f,br,'
				+'060,063,066,069,06c,06f,360,363,366,369,36c,36f,br,'
				+'090,093,096,099,09c,09f,390,393,396,399,39c,39f,br,'
				+'0c0,0c3,0c6,0c9,0cc,0cf,3c0,3c3,3c6,3c9,3cc,3cf,br,'
				+'0f0,0f3,0f6,0f9,0fc,0ff,3f0,3f3,3f6,3f9,3fc,3ff').split(','),2,1);
			hoverMenu(btnFo, ('600,603,606,609,60c,60f,900,903,906,909,90c,90f,br,'
				+'630,633,636,639,63c,63f,930,933,936,939,93c,93f,br,'
				+'660,663,666,669,66c,66f,960,963,966,969,96c,96f,br,'
				+'690,693,696,699,69c,69f,990,993,996,999,99c,99f,br,'
				+'6c0,6c3,6c6,6c9,6cc,6cf,9c0,9c3,9c6,9c9,9cc,9cf,br,'
				+'6f0,6f3,6f6,6f9,6fc,6ff,9f0,9f3,9f6,9f9,9fc,9ff').split(','),2,2);
			hoverMenu($q('.user', panel), ('c00,c03,c06,c09,c0c,c0f,f00,f03,f06,f09,f0c,f0f,br,'
				+'c30,c33,c36,c39,c3c,c3f,f30,f33,f36,f39,f3c,f3f,br,'
				+'c60,c63,c66,c69,c6c,c6f,f60,f63,f66,f69,f6c,f6f,br,'
				+'c90,c93,c96,c99,c9c,c9f,f90,f93,f96,f99,f9c,f9f,br,'
				+'cc0,cc3,cc6,cc9,ccc,ccf,fc0,fc3,fc6,fc9,fcc,fcf,br,'
				+'cf0,cf3,cf6,cf9,cfc,cff,ff0,ff3,ff6,ff9,ffc,fff').split(','),2,3);
		}}
	}
},
settOpera = function(i){
	return i>1||win.opera ?', <a class="ope'+i+'" href="#note">примеч.для Оперы</a>':'';
},
getVersionDate = function(vv){if(vv){ //чтение версии из метаданных "@version version_date"
	var mVer = vv.match(/([^\.]+)\.(\d{4})\.(\d{1,2})\.([1-3]0(?=0)|0?[1-3]0$|[1-3][1-9](?!0)|0?[1-9])[_\-\.]?(.*|$)/)
		,major, minor, date;
	return {major: major = mVer && mVer[1] //версия - основная часть
		,minor: minor = mVer && mVer[5].replace(/^0+/,'') //минор-версия
		,version: major + (minor ?'.'+ minor :'')
		,date: date = mVer && mVer[2] +'-'+ (mVer[3].length <2 ?0:'') + mVer[3] +'-'+ (mVer[4].length <2 ?0:'') + mVer[4] //версия, дата выпуска
		,days: 1? Math.floor( (new Date() - new Date(date)) /DAY) :'--' //прошло дней
	};
}else return {};};
if(typeof metaD !=u && !metaD.version) //для Firefox 3.6
	metaD.version = /@version/.test(metaD[1]) && metaD[1].replace(/^[^\d]+/,'');
var verDat = getVersionDate(typeof metaD !=u && metaD.version)
,hS ={ //настройки скрипта
	version: (verDat.version &&'<a class="hADotted current" href="#_show_version_info" style="color:#36a" title="Показать подробности о версии">'+ verDat.version +'</a>' || '<a class="hADotted note" href="#_no_read_metadata" onclick="return!1" title="Нет чтения метаданных;'+ (isFx?' для решения (Firefox) &mdash; удалить 2 символа &quot;/\*&quot; в скрипте перед &quot;<!&quot;, строка 4; или устанавливать скрипт через расширение Scriptish':'')+'"><i>???</i></a>')
	+'~ &mdash; версия; '+ verDat.date + ' &mdash; дата версии'
	,versionNumb: typeof metaD !=u && metaD.version && (metaD.version.replace(/\..*/,'') + metaD.version.replace(/(\.*?\d\d)\d+$/,'$1')) ||'???'
	,chkUpdate:'0~<span style="color:#b66;font-size:15px">&uparrow;</span> <a class="hADotted" href="#_check_update" title="кликнуть, чтобы проверить однократно">проверка</a> обновлений, <a href="#set_period" id="chkUpdateBtn" title="через сколько дней проверять">с периодом</a>'+settOpera(1)+'~2012-03-05'
	,chkUpdNoMinor:'~не уведомлять о <i style="color:#955" title="шаг подверсии не кратен 10">минорных версиях</i>~2012-03-05'
	,chkUpdPeriod: {val: 3, desc2:'(хранилище - период проверки обновлений, дней)'}
	,chkFailDate: {val: 0, desc2:'(хранилище - дата неуспешной проверки)'}
	,chkDate: {val:0, desc2:'дата последней проверки (вычисляемая)'}
	,noConsole:'1~без сообщений отладочной консоли wcl()~2011-12'
	,zenPresent:'0~подключены ли ВНЕШНИЕ стили ZenComment в <u>12-й Опере</u> (установить вручную)~2012-10-16'
//функции и оформление страницы
	,reformal:'1~<a href="http://habrajax.reformal.ru/" target="_blank" title="открыть в новом окне">идеи и замечания о скрипте</a> (reformal.ru)~2011-07'
	,inZen:'0~<i style="color:#955" title="встроенная версия стилей &mdash; @">встроенные в скрипт</i> стили <a href="http://userstyles.org/styles/36690" target="_blank" title="встроенная версия @; актуальная внешняя версия - в новом окне">ZenComment</a>~2011-08'
	,regimeNoZen:'1~режим комментариев "Компакт"/"Дзен"</i>~2011-11'
	,postsLinkNew:'1~сменить ссылку "Лента" на "Лента - новые"~2011-07'
	,allFeed:'0~-""- на "Все посты" (без QA и компаний)~2012-04-25'
	,gooYa:'1~поиск Гугла и Яндекса по сайту~2011-10'
	,killToTop:'0~скрывание поля "Прокрутить наверх"~2012-06-10'
//оформление аннотаций в ленте
	,underCut:'1~подгружать статьи без перехода на новую страницу (хабр-аякс)~2011-05'
	,colorTopic:'1~подкраска переводов, топиков-ссылок, новостей, компаний~2011-08' //с удалением слов "Б.к."
	,toBK:'1~вид заголовков в ленте: размер шрифта, подсказка ссылки~2011-08'
	,shortenHub:'1~короткие хабы и компании (до 13 симв.)~2012-10-15'
	,noBK:'0~свернуть аннотации БК~2011-05'
	,noPodcast:'1~свернуть подкасты~2011-05'
	,noNews:'1~свернуть новости~2013-03-01'
	,listNewsAuthors: {val:'alizar,marks,aleksandrit,ilya42,FakeFactFelis,DaryaZ,mayuxi,shifttstas,wwakabobik,sharamyshara,Captcha,Mairon'.split(','), desc2:'(авторы-новостники)'},a:0
	,noEvent:'1~сворачивать события в ленте~2012-08-20'
	,noAuthor:'1~свернуть <a id="showNoAuthor" href="#">по списку авторов</a>~2012-01-15'
		,listNoAuthor: {val:'', desc2:'(хранилище списка авторов)'}
	,noContent:'0~свернуть <a id="showNoContent" href="#" title="могут быть регекспы без слешей по краям">по списку содержимого</a>~2012-01-15'
		,listNoContent: {val:'', desc2:'(хранилище списка тел регекспов для статей)'}
	,noSmart:'0~... <a id="showNoSmart" href="#" title="могут быть регекспы без слешей по краям">по признакам обзора смартфонов</a>~2013-09-17'
		,listNoSmart: {val:'Asha,Lumia,HTC,Jolla,Nexus,Alcatel,Xperia,Galaxy,китайс.{1,,33}смартф,LG.{1,,15}Optimus', desc2:'(хранилище списка тел регекспов для признаков обзоров смартфонов)'}
	,strongCut:'1~принудительный кат, <a href="#" id="strongCutBtn">до высоты</a>~2012-03-05~2012-01-15'
	,hStrongCut: {val: 120, desc2:'(макс. высота для аннотаций при "StrongCut")'}
//статья или вопрос и их оформление:
	,noTwit:'0~не показывать кнопки Твиттера~2011-06'
	,noVk:'0~не показывать кнопки ВК~2011-06'
	,noFb:'0~не показывать кнопки ФБ~2011-06'
	,noGP:'0~не показывать Г+-шаринг~2012-04-19'
	,gPlus:'0~лайки Google Plus'+settOpera(2)+'~2011-07'
//тексты статей и комментариев:
	,shortDates:'1~короткие даты текущего года~2011-09'
	,extLinks:'1~внешние ссылки &mdash; в новом окне~2012-09-03'
	,justify:'1~выравнивание колонок в статьях и ответах~2012-01-12'
		//картинки в текстах:
	,viewImgCenter:'1~<u>просмотр картинок</u> в окне по центру~2013-01-21'
	,addImgs:'0~подгружать ссылки-картинки (увеличит траффик, будет переспрошено)~2013-01-20'
	,addImgsOK: 0 //для подтверждений addImgs (только =0)
	,viewX2:'1~смотреть увеличенные вдвое картинки~2013-01-17'
	,haReplace:'1~сокращение "хабра-" до "χ"~2012-09-03'
	,chtoBy:'0~исправление "что бы" на "чтобы"~2014-01-26'
//заголовок комментариев:
	,listAuthorsComms:'1~цвета активных комментаторов в начале~2011-09'
	,similarAfter:'1~похожие посты и вопросы &mdash; в заголовке комментариев, в виде спадающего списка~2012-10-06'
	,shortSubscribe:'1~"слеж." вместо "отслеживать новые"~2012-07-22~2011-09'
	,commInfo:'1~навигатор по веткам комментариев~2012-11-17'
//отдельный комментарий/ответ:
	,noAva:'1~без аватаров в ответах~2011-11'
	,brAsBlock:'1~серые блоки в просветах на месте BR~2011-11'
	,noExpiredVote:'1~скрыть неактивные стрелки голосования~2012-01-08'
	,colorAuthorTopic:'0~пометки постов автора (цвет фуксии)~2011-09'
	,colorAuthorTAH:'1~то же, розовым фоном заголовка~2012-04-14'
	,colorStyle1:'1~расцветка сообщений по авторам (0/8 цв)~2012-10-22~2011-09'
	,colorStyle2:'1~расцветка авторов, 2-я часть (20/16 цв.)~2012-10-21'
	,shortReply:'1~сокращения кнопок "отв|ответ"~2011-08'
//ввод ответа в поле ввода:
	,tagsInput:'1~поле ввода &mdash; &lt;source> и &lt;font>~2012-10~2011-09'
	,innerTab:'1~ввод <i title="нажимать Shift+Tab" style="color:#955">Tab</i> и <i title="для ввода - нажимать Ctrl+Пробел" style="color:#955">&amp;nbsp;</i> в textarea~2012-02-04~~1'
	,autoGrow:'1~авторост полей ввода textarea~2012-07-20'
	,contextSelect:'1~контекстные кнопки по выделению текста~2013-04-20'
	,correctCite:'0~контекстный цитатник-корректор [бета]~2012-04-15~2012-01'
	,hQuotes:'1~<a target=_blank title="инструкция с иллюстрациями" href=http://spmbt.kodingen.com/habrahabr/habrAjax/habraQuotes-support.htm>выделять и отправлять</a> на <a target=_blank href="http://habraQuotes.ru/" title="(новое окно)">HabraQuotes</a>~2013-01-03~2012-04-13'
//сайдбар:
	,hideBest24:'0~скрыть блок "лучшее за 24"~2011-08'
	,hideDirectBand:'0~скрыть "прямой эфир"~2011-08'
	,hideEmploy:'0~скрыть "работу"~2012-10-13'
	,hideFreel:'0~скрыть "фрилансим"~2012-11-07'
	,hideEve:'0~скрыть блок "события". <i>Если скрыть все 5 и выключен "сайдбар под статьями"...</i>~2011-08'
	,sidebarDown:'0~сайдбар &mdash; под статьями~2011-08'
	,noAlienScripts:'1~подавление посторонних виджетов~2011-09'
	,noSomeSideBlocks:'1~без лишних боковых блоков~2012-10-13'
//Футер:
	,underFooter:'1~прибитый к низу футер~2012-09-07'
	,stru:{ //структурирование настроек и дописывание описаний

	'Настройки скрипта <a href="//userscripts.org/scripts/show/121690" style="color:#36a" target="_blank">HabrAjax</a> (<a href="http://spmbt.kodingen.com/habrahabr/habrAjax/index.htm" target="_blank" title="на описание функций">что это</a>)':{sett:'version,chkUpdate,chkUpdNoMinor,noConsole,zenPresent'
		,desc:'Скрипт с рядом функций для сайта <b>habr.ru</b> и его оформления.<br><br>Есть отключаемые функции (настройки) и неотключаемые &mdash; элементы, отсутствие которых неудобно, а присутствие &mdash; не мешает.<br><br><b>Пример</b>: логотип скрипта (32x32) справа вверху каждой страницы вызывает данные настройки, помогает перейти на страницу хостинга скрипта и стилей и не отключается.<br><br><b>Пример 2</b>: если статьи на сайте не обнаружилось, пустая страница заполняется <a href="'+HRU+'/post/146200/"target=_blank>ссылками на сохранённые копии статей</a>. Точнее, на те места, где они могут быть. Гугл чаще всего сохраняет копии, поэтому страница <b>Гугл-кеша</b> по ссылке <i>тоже обрабатывается скриптом</i> HabrAjax и стилями ZenComment. Всё это неотключаемо, но никак не мешает остальным функциям просмотра сайта, потому что работает совсем на других страницах.<br><br><b>Пример 3</b>: в скрипте заложены 2 стиля оформления: HabrAjax <a href="'+HRU+'/post/135686/"target=_blank>со стилями ZenComment</a> (используется автором скрипта при просмотре сайта) и <a href="'+HRU+'/post/154923/"target=_blank>без</a> них. Но не имеется режима с полным отсутствием стилевых модификаций.'
		,descS:['Версии скрипта пишутся и обновляются, если на сайте произошло обновление, конфликтующее со скриптами, или если появилась новая функция в арсенале скрипта. В среднем получается, что обновляются версии довольно часто &mdash; раз в 5-15 дней.<br><br>Следить за обновлениями можно несколькими способами. Браузеры поддерживают <u>автообновление</u> и ручную проверку обновлений всех скриптов по кнопке.<br><br>HabrAjax имеет встроенную в скрипт <u>проверку обновлений</u>. 1 раз в сутки или реже, в 5 утра или позже он сравнивает версию в браузере с версией на сайте и сообщает, какие изменения произошли &mdash; причины обновления поясняются в специальном комментарии на 1-2 строчки.'
		,'Слежение скрипта за обновлениями на сайте. Не чаще раза в сутки, но если чтение не удалось, следующая попытка &mdash; через 15 минут. Кликом по ссылке &mdash; ручная проверка обновлений в любое время.'
		,'Версии, помеченные как минорные, не будут беспокоить сообщениями об обновлениях (на самом деле, <a href="'+HRU+'/post/175187/"target=_blank>механизм минорных версий</a> почти не используется, потому что редко, когда происходят невынужденные изменения скрипта &mdash; даже дополнения новых функций чаще идут вместе с исправлениями замеченных ошибок).'
		,'Не показывать сообщения отладочной консоли скрипта, которая постоянно используется для отладки и может выводить произвольную отладочную информацию, ненужную для пользователя.'
		,'Для Оперы 12: требуется установить вручную для корректной работы опознавателя стилей: установлены ли внешние стили ZenComment для сайта. Из-за того, что Опера 12 загружает стили очень рано, страница ещё не может знать этой информации, когда уже нужно делать некоторое форматирование со знанием про стили.']}
	,'функции и оформление страницы':{sett:'reformal,inZen,regimeNoZen,postsLinkNew,allFeed,gooYa,killToTop'
		,desc:'Группа настроек относится к почти каждой странице сайта, управляя общими элементами: стили, поля поиска, меню и т.д.'
		,descS:['Виджет сервиса замечаний и предложений отображается в виде кнопки, висящей справа на каждой странице. Впрочем, можно им пользоваться, переходя по ссылке из настроек, висение кнопки совершенно необязательно.'
		,'Стили, подгружаемые скриптом, появляются чуть позже (на 0.5-1 сек.), чем стили из Stylish, поэтому лучше включать через аддон Stylish, а здесь &mdash; только примерить для себя, удобны ли они.'
		,' "Компакт" менее зависим от мыши и отображается менее плотно, на белом фоне (рекомендуется). Чтобы работал режим "дзен", нужно поставить во внешних стилях пробел в 18-й строчке.<br><br>"Дзен" &mdash; это показ комментариев с минимумом лишней информации, на сером фоне страницы. Только имя комментатора и его текст. Существует 4 области размещения мыши, при которых в этом режиме появляется различная информация о комментариях. В целом, он излишне сложный для простого чтения.'
		,'Первая ссылка в меню сайта ведёт на "захабренные", но не все предпочитают этот режим показа ленты. Чтобы не ходить по цепочке ссылок каждый раз, просто ставим на первую ссылку ленту "Новые-все".'
		,'Как прежняя настройка, но лента &mdash; без вопросов и блогов компаний'
		,'К кнопке поиска по сайту добавляются 2 кнопки &mdash; поиск по сайту через Гугл и через Яндекс. Кроме того, смотреть результаты можно в 2-3 модификациях: фрейм половинной высоты, новое окно (Ctrl или Shift) или то же самое окно (только для местного поиска, если ввести Enter).<br><br>Поиск также выполняется через выделение текста и контекстные кнопки поиска (3 кнопки и их модификаторы Ctrl+клик).'
		,'Убрать навязчивую кнопку-колонку "Наверх". Актуально для неавторизованных, потому что у авторизованных пользователей имеется настройка пользователя для убирания этой кнопки.']}
	,'оформление аннотаций в ленте':{sett:'underCut,colorTopic,toBK,shortenHub,noBK,noPodcast,noNews,noEvent,noAuthor,noContent,noSmart,strongCut'
		,desc:'Аннотации (краткие описания) &mdash; это начала статей в списках статей и лентах, фрагменты результатов поиска.<br><br>Лент на сайте имеется несколько видов, и все они поддерживаются общими настройками из этого раздела.'
		,descS:['Аякс-подгрузка статей и комментариев.<br><br>Появляются дополнительные кнопки возле ссылки "Далее" и комментариев, которые приводят не к переходу, а к подгрузке страницы со статьёй или вопросом и комментариями.<br><br>После просмотра статью или комментарии можно свернуть, кликнув по специальной широкой кнопке над или под текстом.'
		,'Фон заголовков особенных статей немного подкрашивается в различные оттенки.'
		,'Шрифт заголовка становится тем меньше, чем длиннее заголовок, что сбалансирует место, занимаемое слишком длинными названиями.'
		,'Сокращаются длинные названия компаний и хабов до 13 символов; остальное &mdash; в подсказку.'
		,'Статьи из блогов компаний сворачиваются до одного названия. Если кликнуть по нему и развернуть, далее показ статьи ничем не отличается от других, отличие &mdash; только в начальном показе лишь одного заголовка статьи в лените.'
		,'Сворачивание подкастов до видимости одного названия без аннотации.'
		,'Новости, распознанные по формальным признакам (принадлежат фиксированному в скрипте кругу авторов или не имеют текста под катом), <a href="'+HRU+'/post/168147/"target=_blank>сворачиваются в аннотациях до названия</a>. После клика ведут себя далее как обычные статьи.'
		,'События в ленте <a href="'+HRU+'/qa/23089/"target=_blank>сворачиваются до слова "ev"</a> и пустой строки, наведение на которую показывает всё название, а клик делает переход на страницу события.'
		,'Сворачивание статей по списку авторов, составленному читателем (запоминается в хранилище).'
		,'Сворачивание <a href="'+HRU+'/post/136301/"target=_blank>по ключевым словам и буквосочетаниям</a> в заголовках и в аннотациях.'
		,'то же - по признакам обзора смартфонов, составленному читателем (запоминается в хранилище)'
		,'<a href="'+HRU+'/post/136301/"target=_blank>Ограничение высоты аннотации</a> размером, заданным читателем (выбор по ссылке в настройках).<br><br>Указывается половинная высота блока, потому что она определяет размер (высоту) картинок, получающихся в этом режиме (по умолчанию &mdash; 120 для ZenComment и 170 (но пишется 120) для обычного HabrAjax). Картинки и видео уменьшаются и переносятся вправо или влево от потока текста. Кликом по картинке их можно просматривать в натуральном или увеличенном виде, если включена настройка просмотра картинок ("просмотр картинок в окне по центру").']}
	,'статья или вопрос и их оформление':{sett:'noTwit,noVk,noFb,noGP,gPlus'
		,desc:'Стили и функции для текстов статей и вопросов.<br><br>Из неотключаемого: дата, автор и автор оригинала (имеется при переводах) дублируются вверху и внизу статьи.'
		,descS:['Убирание социальных кнопок из подписей к статье: Твиттер'
		,'Убирание соцкнопки ВКонтакте'
		,'Убирание соцкнопки Фейсбука'
		,'Убирание соцкнопки расшаривания в Гугл-плюс'
		,'Добавление кнопки, которой нет на сайте &mdash; <a href="'+HRU+'/post/124057/"target=_blank>лайк Гугл-плюса</a>. Позволяет смотреть, сколько лайков поставили статье читатели и ставить лайки самому, если авторизован в Г+. Выполняет подгрузку множества скриптов (50-100К на кнопку) с серверов Гугла.']}
	,'тексты статей и комментариев':{sett:'shortDates,extLinks,justify,viewImgCenter,addImgs,viewX2,haReplace,chtoBy'
		,desc:'действия, применяемые к текстам и картинкам; в отличие от прежней группы, эти настройки относятся не только к текстам статей'
		,descS:['Отображение дат укорачивается, оставаясь понятным и удобочитаемым: удаляется текущий год или год в датах последних 8 месяцев, добавляются дни недели (2 буквы) для всех дат, кроме "сегодня" и "вчера".'
		,'На все внешние ссылки ставит открывание в новом окне и специальный символ (двойная стрелка вправо-вверх) в конце ссылки.<br><br>Местные ссылки выдаются <u>с подсказками дат</u> (месяц и год ссылки). Даты вычисляются приблизительно, по номеру статьи или вопроса.'
		,'Колонка выравнивается стилем justify (левый и правый край текстов в колонке &mdash; ровный, пробелы в строке &mdash; переменной ширины).'
		,'<a href="'+HRU+'/post/166575/"target=_blank>Показывает картинки на сайте</a> на той же странице с возможностью перемещения и масштабирования (как в имаджбордах).<br><br>Shift+клик &mdash; меню поиска по картинкам на нескольких их сервисах.<br><br>Ctrl-клик — переход по ссылке с картинки.'
		,'Все ссылки, найденные с расширениями картинок, подгружаются и предварительно просматриваются в размере не более 200 пикс. Таких картинок могут быть многие мегабайты, поэтому на включение этой настройки в скрипте предусмотрено дополнительное подтверждение пользователем, происходящее один раз после установки настройки.'
		,'Картинки покажутся в удвоенном размере. Колесом мыши их можно и без того увеличить или уменьшить, но настройка нужна для комфортного начального просмотра в зависимости от монитора перед глазами.'
		,'Заменяет буквосочетания "хабр" греческими буквами "хи".'
		,'Заменяет грамматическую ошибку (большей частью) "что бы" на слитное написание.']}
	,'заголовок комментариев':{sett:'listAuthorsComms,similarAfter,shortSubscribe,commInfo'
		,desc:'Заголовок прячет и содержит ворох полезной информации: распределение популярности авторов комментариев, кнопка просмотра похожих статей, инфографика корневых веток комментариев. Кроме того, он сделан контрастным для лучшей распознаваемости в колонках длинных статей.'
		,descS:['Список авторов по количеству сделанных комментариев и раздача авторам цветов для расцветки их комментариев.'
		,'Из сайдбара сюда <a href="'+HRU+'/post/150954/"target=_blank>перенесены "Похожие посты"</a>. Можно отменить перенос и смотреть их традиционно, в сайдбаре.'
		,'сокращения слов, поясняющих назначения чекбоксов подписки на комментарии'
		,'Инфографика &mdash; навигатор по веткам комментариев. Показывает объёмы текстов, плюсов и минусов в ветках, ссылки и картинки в них. Появляется при наведении мыши на заголовок комментариев.']}
	,'отдельный комментарий/ответ':{sett:'noAva,brAsBlock,noExpiredVote,colorAuthorTopic,colorAuthorTAH,colorStyle1,colorStyle2,shortReply'
		,desc:'функции и стили для каждого комментария'
		,descS:['Аватары появляются при наведении мыши на место расположения аватара, а иначе &mdash; не отвлекают внимание. Размер аватара &mdash; 16х16, хотя на сайте они имеют больший размер.'
		,'Для более плотного расположения текстов комментариев и слитности комментариев одного человека из них убираются вертикальные пробелы, заменяясь небольшими серыми разделительными блоками высотой 3px, не занимающих высоты строки.'
		,'Там, где наличие стрелок голосования не имеет смысла, там они убраны, в том числе, с помощью стилей. Если стилей не установлено, можно отключать стрелки скриптом.'
		,'3 варианта выделения комментариев автора статьи или отключение выделения комментариев автора.<br><br>Первый чекбокс &mdash; выделяется фон под именем автора (площадь подсветки невелика, поэтому цвет фона &mdash; контрастный).'
		,'Выделение комментария автора статьи фоном заголовка комментария.'
		,'2 чекбокса &mdash; 4 варианта расцветки авторов комментариев, что, по идее, заменяет различение авторов по аватарам и по именам. по расцветкам видно, разные ли авторы участвуют в диалоге. (Кнопки "ответ" расцвечиваются теми же разными цветами.)<br><br>Если оба чекбокаса выключены, расцветки авторов нет. Если включен первый &mdash; используется палитра в 8 цветов. Они наиболее различимы, но слишком мало авторов выделяется своими цветами.'
		,'Второй чекбокс выбора палитр. Всего &mdash; 3 палитры: 8, 16 и 20 цветов или отключение расцветки.'
		,'Сокращения слов-кнопок "ответить", "комментировать". (Нужно для стилей ZenComment, потому что там эти кнопки располагаются вертикально и должны поместиться в высоту сообщения.)']}
	,'ввод ответа в поле ввода':{sett:'tagsInput,innerTab,autoGrow'
		,desc:'Ввод текстов &mdash; важные функции сайта, поэтому рядом настроек они сделаны более удобными.<br><br>Из ненастраиваемых: при вводе и редактировании статей размер поля ввода устанавливается размером с весь блок текста, но не более 80% высоты окна. Это же относится и ко всем остальным полям ввода, но более заметно на статьях, так как они обычно объёмны.<br><br>Перейти ко вводу текстов можно и через контекстные кнопки (включаются настройкой "контекстные кнопки"). Они помогают писать комментарии и цитировать прямо в контексте статьи или комментария, писать письма в ЛС, просто выделив цитату (автор определится сам или может быть изменён).<br><br>Для ввода статей модифицируются специфические кнопки: h3 &mdash; ввод тегов &lt;h3> для заголовков; атрибут text="" для ката; позиционирование рисунков слева, справа и по центру.'
		,descS:['Ввод <a href="'+HRU+'/post/141976/"target=_blank>кодов языков в теге Source</a>.<br>Всего можно указать 1 из более 40 языков для выбора подсветки ключевых слов. Для удобного выбора список языков разбит на 2 и показывается в виде дополнительных списков над баром кнопок.<br><br>Так же организованы и множество ссылок выбора цвета текста в теге FONT, разбитые на 3 подсписка.'
		,'Ctrl+пробел &mdash; вводится неразрывный пробел &amp;nbsp; в поле ввода. <br><br>Shift+Tab &mdash; вводится символ табуляции (обычно нужен для форматирования кодов программ).'
		,'Стилями отключена фиксация высоты поля ввода на сайте, поэтому всегда можно увеличить его вручную.<br><br>Но есть и <a href="'+HRU+'/post/148188/"target=_blank>автоматическое увеличение поля ввода</a> со вводом каждой новой строки (уменьшение не предусмотрено).<br><br>Работает для всех полей ввода текстов, кроме страниц настроек пользователя.']}
	,'контекстные кнопки':{sett:'contextSelect,correctCite,hQuotes'
		,desc:'Масса функций по вводу текстов добавляется при включении контекстных кнопок.<br><br>После выделения текста рядом с выделением появляется бледная полупрозрачная кнопка "<_>", а по наведению мыши на неё &mdash; остальные 9-15 кнопок-функций. Клик &mdash; выполнение. Модификатор &mdash; удержание Ctrl перед кликом.<br><br>Для правки собственных статей при выделении фрагмента собственной статьи (при условии авторизации на сайте) к контекстным кнопкам добавляется "<Е>", которая помогает <a href="'+HRU+'/post/177427/"target=_blank>редактировать свою статью</a> &mdash; выделяет цитату в поле ввода статьи в фрейме или новом окне.<br><br>Редактирование своей статьи работает и без фрейма, если выделение происходит на странице редактирования или создания статьи. Можно сделать несколько исправлений текста, переходя к фрагментам таким способом, прежде чем отправить его на сервер.'
		,descS:['Режим <a href="'+HRU+'/post/171777/"target=_blank>работы с контекстной кнопкой </a>"<_>", которая возникает после выделения текста на странице. По наведению мыши вокруг кнопки "<_>" появляются 9-15 других кнопок, помогающих в общении на сайте:<br> *) Ответ на комментарий прямо из места цитирования;<br>*) написание письма или переход к фрейму с формой написания письма автору статьи или комментария;<br>*) выбор имени автора из текста страницы, которому хочется написать письмо;<br>*) поиск по сайту;<br>*) редактирование собственных статей с переходом к месту редактирования.<br><br>Контекстное поле ввода и кнопки можно перемещать по странице перетаскиванием.'
		,'Функциональность "Корректора" &mdash; в стадии <a href="'+HRU+'/post/169761/"target=_blank>разработки</a>.'
		,'Быстро публикует копии интересных комментариев на стороннем сервисе, просто по выделению части комментария (опубликуется весь), или группы до 10. Достаточно 1 клика по кнопке "HQ". Успешность сообщается в примечании вверху окна, ссылка на публикацию &mdash; там же.']}
	,'сайдбар':{sett:'hideBest24,hideDirectBand,hideEmploy,hideFreel,hideEve,sidebarDown,noAlienScripts,noSomeSideBlocks'
		,desc:'Стилями ZenComment ширина сайдбара несколько уменьшена (до 26%), а настройками его можно вообще убрать или перенести вниз, что могло бы быть удобно на смартфонах и узких окнах менее 1000 пикселей. В зависимости от ширины окна применяется адаптивный дизайн &mdash; уменьшение отступов по краям, начиная с 640 пикс. и меньше. При более 1100 &mdash; наоборот, отступы размещаются несколько свободнее.<br><br>Имеется ненастраиваемая функция заполнения сайдбара блога компании, который обычно пуст, запомненным в прежней странице сайдбаром. Это сохраняет привычный для читателя баланс информации и ссылок справа.<br><br>Чтобы вернуть блок "Похожие посты" в сайдбар, отключают настройку "похожие посты и вопросы" в группе "заголовок комментариев". Сайдбар немного разрастётся, но названия статей будут перед глазами.'
		,descS:[' Скрывание различных блоков сайдбара. По настройке внизу &mdash; уже скрыты совсем ненужные, остались только 5, которые можно выборочно скрыть.<br><br>Блок "Лучшие за 24 часа" полезен показом ссылок на наиболее популярные статьи за последние сутки. Скрипт в этот блок также <a href="http://spmbt.github.io/haPages/sidebarLive2Dailybest.htm">переносит ссылки ответов на эти статьи</a> из блока "Прямой эфир".'
		,'Показывает самые последние комментарии и ответы на вопросы и их авторов. Блок показывает активность комментаторов и существование статей, которые ещё не стали "Лучшими" за день, но на них отвечают. Обычно содержимое блока очень часто меняется (каждые несколько минут) и может рассматриваться как список случайных комментируемых статей.<br><br>Если дата статьи старее месяца, фон ссылки делается чуть более тёмным, подсвеченным, а в подсказке <a href="'+HRU+'/qa/23257/"target=_blank>появляется приблизительная дата</a>, вычисленная по номеру статьи или вопроса. (Каждый месяц данные о дате статей дополняются в скрипте вручную.) Выделение показывает, что ответили на старую статью или вопрос, что бывает нечасто.'
		,'Если географическая локализованность предлагаемых работ или их тематика неинтересна читателю, есть смысл скрыть блок "Работа". Обычно в нём встречаются предложения из Москвы, Питера, Минска и намного реже &mdash; из других мест.'
		,'Если блок предложений по фрилансу неинтересен, он скрывается этой настройкой.'
		,'Если скрыть все 5 блоков и будет выключен "сайдбар под статьями", правый сайдбар будет скрыт; Из побочных эффектов &mdash; скрываются настройки ленты, которые бывают нужны.'
		,'Если "сайдбар под статьями", то настройки ленты не будут скрываться, а будут отображаться под статьями, лентами.<br><br>Для окон нормальной для десктопов ширины смысла переносить сайдбар особого нет &mdash; колонки становятся широкими и хуже читаемыми. Перенос полезен для окон смартфонов, ширин окна порядка 800 и меньше.'
		,'Подавление ненужных скриптов в сайдбаре, которые могут устанавливаться компаниями в рекламных целях или просто "потому что есть такая возможность".'
		,'Из всех блоков остаётся 5 наиболее полезных ("Похожие посты" в сайдбаре не считаются, так как перенесены скриптом в заголовок комментариев).']}
	,'футер':{sett:'underFooter'
		,desc:'В футере имеются ещё 3 неотключаемых и удобных функции: подгрузка для чтения 1 из 3 статей в футере, <a href="'+HRU+'/post/152055/"target=_blank>сбалансированное отображение названий</a> этих 3 ссылок, скрывание 4 постоянных ссылок на родственные ресурсы в футере.'
		,descS:['На коротких страницах располагает футер <a href="'+HRU+'/post/151320/"target=_blank>прилепленным к нижней кромке страницы</a>. В Хроме может работать некорректно, поэтому сделано отключаемым. ']}
	,desc2:'альтернативный способ просмотра настроек'

	}
	,defa:{} //для сохр_дефолтных
	,get: function(ret){ try{ //если настройки записаны, они читаются; иначе используются данные из скрипта
		var s = (function(){return this.GM_getValue('habrAjax_settings','{}');})(); //this -- доступ к текущему window
		if(s !=null && (function(){return this.JSON && JSON.parse;})()){
			var saved = JSON.parse(s)
				,addSett =0;
			if(ret)
				return saved ||{};
			for(var i in hS){var sI = hS[i]; if(typeof sI !='function'&& typeof sI !='object'&& sI.length >9){
				var sIA = sI.split('~')
					,vals =['val','desc','date','date0','noChrome'];
				hS[i] ={};
				for(var j =0; j < sIA.length;j++)
					hS[i][vals[j]] = j || i =='version'? sIA[j] : +sIA[j];
				}
				if(sI.val) hS.defa[i] = sI.val;
			}
			if(typeof saved =='object'){
				for(var i in saved){ var hSI = hS[i];
					if(hSI && (hSI.val ===undefined || hSI.val ==-1) || typeof hSI ==u && i!='sHQ'){ //стереть, если настройки нет или пусто, или -1
						delete saved[i];
						addSett =1;
					}
					if(saved[i] !==undefined && i !='version'){
						if(typeof hSI ==u)
							hS[i] ={};
						hS[i].val = saved[i]; //если настройка - другая, использовать из памяти
					}
				}
				if(hS.addImgs && hS.addImgs.val && !saved.addImgsOK)
					if(confirm('Включена настройка "Подгрузка рисунков",\nно не подтверждена. Согласны ли Вы\n'
							+'с увеличением траффика за счёт подгрузки рисунков?')){
						saved.addImgsOK =1; addSett =1;
					}else
						hS.addImgs.val =0;
				if(!saved.a){
					saved.a ={}; saved.a[nameGen()] = Math.floor(NOW/10e6); addSett =1;}
				for(var i in saved.a){sHQ +=/u$/.test(sHQ)?i+'.':''; /*(saved.a[i]+'').wcl(i,hS);*/}
				if(addSett)
					hS.save(saved);
			}
		}
	}catch(er){'!!err_getSettings()'.wcl(er +' '+ i, er.lineNumber||'')};
	return hS;
	},
	init: function(){ //создать блок для настроек
		var divSett = $e({cl:'habrAjaxSettings', apT: document.body}); //вывод настроек для просмотра
		$e({el:'BUTTON'
			,cs:{position:'relative', padding:'0 2px'}
			,ht:'X'
			,at:{title:'Без сохранения'}
			,on:{click: hS.edit}
			,apT: $e({cs:{cssFloat:'right', margin:'-4px 2px 0 -8px', height:'1px'}, apT: divSett})
		});
		var dScroll = $e({cs:{maxHeight: win.innerHeight - 50 - 25 +'px', overflow:'auto', marginBottom:'2px', paddingBottom:'2px'}, apT: divSett }) //ограниченный по высоте див со скроллингом
			,sGroupS =[], groupI =0;
		for(var i in hS.stru){ var hSSI = hS.stru[i]; //разброс описаний по массиву
			if(hSSI.sett)
				sGroupS.push({name: i, desc: hSSI.desc, settS: hSSI.sett.split(','), descS: hSSI.descS});
		}
		for(var i in hS){var hSI = hS[i]; if(hSI && hSI.val !==undefined && hSI.desc !==undefined //генерация списка настроек
				&& !(isChrome && hSI.noChrome)){
			//поиск элемента в группах; если в новой группе - выводится заголовок
			if(sGroupS[groupI])
				for(var j =0, sL = sGroupS[groupI].settS.length; j < sL; j++){
					var sGJ = sGroupS[groupI].settS[j];
					if(i == sGJ){
						var sGDJ = sGroupS[groupI].descS && sGroupS[groupI].descS[j];
						//'sGJ, sGDJ'.wcl(sGJ, sGDJ)
						break;}
					if(j == sL -1){ //элемент не найден в текущей группе (группы джб синхронизированы)
						j = -1;
						groupI++;}

				}
			if(j ==0){ var sGI = sGroupS[groupI];
				//'sGI'.wcl(j, sGI)
				$e({ht: sGI.name +' ('+ sGI.settS.length +')' //вывод заголовка группы
					,cl:'group'
					,on:{mouseover: sGI.desc ? hView :'', mouseout: sGI.desc ? hViewHide :''}
					,at:{'data-hView': sGI.desc ||''}
					,apT: dScroll} );
			}

			var dSettingsLine = $e({cl:'sett'
					,on:{mouseover: sGDJ ? hView :'', mouseout: sGDJ ? hViewHide :''}
					,at:{'data-hView': sGDJ ||''}
					,apT: dScroll}) //элемент настройки
				,isNew = hSI.date && NOW - (new Date(hSI.date)) < 31*DAY + 20*DAY*(!/\-\d+\-/.test(hSI.date))
				,chk0 = $e({el:'SPAN'
					,cl: (isNew ?'latest':'')+(hSI.val ==0 ?' notChecked':'')
					,cs:{verticalAlign:'middle'}
					,apT: dSettingsLine })
				,no1_1 = hSI.val !=1 && hSI.val !=0 && hSI.val !=-1
				,chk = $e({el: no1_1 ?'I':'INPUT'
					,ht: no1_1 ? hSI.val :''
					,at:{type:'checkbox'
						,title: i +(hSI.date?', '+ hSI.date + (isNew?', новое':''):'')
						,id: i
						,rel: i}
					,apT: chk0 })
			if(isNew)
				chk.style.top = !win.opera ?'1px':0;
			if(hSI.val ==-1) chk.setAttribute('disabled','disabled');
			if(hSI.val ==1 || hSI.val ==0) chk.checked = hSI.val;

			$e({el:'LABEL', at:{for: i}, ht: hSI.desc, apT: dSettingsLine});
		}}
		$e({el:'BUTTON', cs:{cssFloat:'right', marginRight:'6px', padding:'0 3px'}
			,ht:'>', at:{title:'экспорт/импорт/сброс'}
			,on:{'click': function(){
				var c = hS.save(hS.get(1), 1)
					,s = prompt('Изменить/сохранить/стереть настройки HabrAjax', c);
				if(s==null)
					return;
				if(s=='')
					s='{}';
				if(s != c){
					hS.save(s); //c проверкой на синтаксис хеша
					divSett.style.display ='none';
				}
			}}, apT: divSett});
		$e({el:'BUTTON', ht:'Сохранить', at:{title:'Изменения вступят в силу после обновления страницы (F5)'}
			, on:{click: hS.saveByHand}, apT: divSett});
		$e({el:'BUTTON', ht:'Без сохранения', at:{title:'закрыть блок'}, on:{click: hS.edit}, apT: divSett});

		for(i =1; i <= 2; i++){ //обработчики на "примеч. для Оперы"
			var dQO = $q('.ope'+i, divSett);
			dQO && dQO.addEventListener('click', function(){
			hN.addNote('<b>Примечание по необходимым настройкам <span class="hlp">браузера Opera</span> для работы отдельных настроек юзерскрипта</b><br>'
			+'&nbsp; &nbsp; <i>Установка скриптов в Опере требует <u>особых настроек</u> для некоторых обычных действий, связанных с кроссдоменным доступом скриптов. Они довольно длинны, и у других браузеров такого нет, но альтернатива для Оперы &mdash; только аддон, которого для HabrAjax не существует (можно сделать вручную). Если настроек не будет, ничего критического не произойдёт, просто не будут выполняться функции из тех пунктов настроек, в которых указана ссылка на это примечание.<br></i><div class="hlp">Все существенные иллюстрации приведены <a href="http://radikal.ru/F/s019.radikal.ru/i623/1203/82/306bfe31b142.png" target="_blank" title="в новом окне">на скриншоте настроек Оперы</a></div>'
			+'<div class="hlp"><b>1)</b> Чтобы стали отображаться <i><b>кнопки Google Plus</b> с количеством "лайков"</i> над кнопками, нужно прописать этот юзерскрипт (папку, в которой он расположен у вас на компьютере) <u>в настройках браузера</u> для сайта plusone.google.com:</div>'
			+'<div class="hlp"><b>1:А)</b> Открыть "Инструменты &mdash; Общие настройки &mdash; Расширенные - Содержимое - Настройки для сайтов - Добавить - Сайт - (ввести: "plusone.google.com") - Скрипты - Папка пользовательских файлов Javascript - (установить: каталог, в котором расположен скрипт HabrAjax) - ОК - Закрыть - ОК;</div>'
			+'<div class="hlp"><b>1:Б)</b> открыть настройки <a target="_blank" href="opera:config#User%20Prefs" title="в новом окне">opera: config  #User Prefs</a> - User JavaScript on HTTPS - (выбрать чекбокс) - кнопка "Сохранить внизу раздела(!); Проще - ввести "HTTPS" в поле "Найти" (фильтр на странице). После этого количества "лайков" в кнопках Google Plus начнут отображаться. К сожалению, после этого браузер будет периодически (при первом посещении любой страницы https:) спрашивать, разрешается работа юзерскриптов в защищённых страницах, даже если кнопок "лайков" на них не будет.</div>'
			+'<div class="hlp"><b>2.</b> Чтобы работали автообновления и просмотр мета-директив с сайта-хостера userscripts.org в Опере, нужно такие же действия, как в пункте <b>1:А</b>, сделать для сайта <b>userscripts.org</b>. <i>(Включения HTTPS по п. 1:Б для данной функциональности не требуется.)</i></div><div>&nbsp;</div>'
			+'&nbsp; &nbsp; Инструкция <a href="'+HRU+'/post/140643/">по установке юзерскриптов в Оперу</a>','*');
			hNE.style.opacity =1;
		},!1); }
		return divSett;
	},
	edit: function(ev){ //показать список настроек
		if(ev.ctrlKey ^ ev.shiftKey){
			window.open('http://userscripts.org/scripts/show/121690','_blank');return;}
		var sett = $q('.habrAjaxSettings');
		sett.style.display = sett.style.display !='block'?'block':'none';
		$q('.habrAjaxSettings>div+div').style.maxHeight = win.innerHeight - 50 - 25 +'px';
		if(ev.preventDefault) $pd(ev);
	},
	updSettings: function(hh){ //добавить|обновить настройки
		var sSaved = hS.get(1);
		for(var i in hh){
			sSaved[i] = hh[i];
			hS[i].val = hh[i];
		}
		hS.save(sSaved);
	},
	saveByHand: function(){ //сохранить из списка настроек
		var oi = $qA('.habrAjaxSettings input')
			,s={}, key;
		for(var i in oi){
			key = oi[i].getAttribute && oi[i].getAttribute('rel');
			if(!oi[i].disabled && key) //грузим только 0, 1 и не disabled
				s[key] = oi[i].checked ?1:0;
		}
		var sSaved = hS.get(1) //сохранённое ранее
			,sNew ={};
		if(typeof sSaved !='object') sSaved ={};
		for(var i in hS) //сохранить все сгенерированные ранее сохранённые настройки
			if(hS[i].desc2 && sSaved[i] !==undefined && hS[i] !==null)
				s[i] = hS[i].val;
		for(i in s) //сохранять ключи с отличными от прежних значениями или сохранённые ранее
			if(s[i] != hS[i].val || sSaved[i] !==undefined)
				sNew[i] = s[i];
		sNew.version = this.versionNumb;
		if(sNew.addImgs ==1)
			sNew.addImgsOK = sSaved.addImgsOK;
		hS.save(sNew);
		$q('.habrAjaxSettings').style.display ='none';
		hN.addNote('Изменения настроек вступят в силу после перезагрузки страницы (или при просмотре новых страниц в этом же браузере)', null,'chgSettings');
	},
	save: function(sett, ret){ try{ //запись настроек
		if( (function(){return this.JSON && JSON.stringify && this.GM_setValue;})() ){
			var s = (typeof sett =='string') && sett || JSON.stringify(sett);
			if(!ret)
				(function(){this.GM_setValue('habrAjax_settings', s);})();
			else
				return s;
		}}catch(er){alert(er +' _saveSettings()')}
	}
},
getDay = function(datArr, mon){return 'вспнвтсрчтптсб'.match(/../g)[new Date(datArr[3]
	+'-'+(mon >8?'':0)+(mon +1)+'-'+(datArr[1]>9?'':0)+datArr[1]).getDay()];},
datesShorten = function(blck, dateSelect, isQA){ //переработка вида дат: не показывать текущий год или год за последние 8 месяцев
	var dates = typeof blck=='string'?[{innerHTML:dates}]:$qA(dateSelect, blck) //(на вход - массив DOM-элементов с датами)
		,thYear = NOWdate.getFullYear()
		,thMonth = NOWdate.getMonth()
		,yestDate = new Date(NOW - 86400000)
		,datMonth ={'января':0,'февраля':1,'марта':2,'апреля':3,'мая':4,'июня':5,'июля':6,'августа':7,'сентября':8,'октября':9,'ноября':10,'декабря':11}
		,monthName = function(m){
			for(var i in datMonth)
				if(datMonth[i] == m) return ' '+ i;
		};
	if(isQA)
		dates = ([].slice.call(dates)).concat([].slice.call($qA('.info +span.time', blck)) );
	if(dates && dates.length)
		for(var i in dates){ var dat = dates[i]; if(dat.innerHTML){
			 //парсинг дат
			var datKBI = dat.attributes && ($q('.time_changed', dat) || $q('.changed', dat) );
			if(datKBI){
				datKBI.title = datKBI.innerHTML.replace(/( \(|\))/g,'');
				datKBI.innerHTML ='(изм)';
			}
			var datFull = dat.innerHTML
				,datQaToday = /сегодня/.test(datFull)
				,datQaYest = /вчера/.test(datFull)
				,dateText = datFull.replace(/ в /,' ').replace(/(сегодня |вчера )/,'')
				,datArr = dateText.match(/(\d+)\s+([а-яё]+)\s+(\d{4})?/i)
				,mon = datArr && datMonth[datArr[2]]
			if(datArr && !datArr[3])
				datArr[3] = thYear;
			var today = datQaToday || thYear == (datArr && datArr[3]) && thMonth == mon && NOWdate.getDate() == datArr[1]
				,todYest = today || datQaYest || datArr && (yestDate.getFullYear() == datArr[3] && yestDate.getMonth() == mon && yestDate.getDate() == datArr[1])
				,dateMon = datArr && (datArr[1]+' '+datArr[2]) || (today ? NOWdate.getDate() + monthName(thMonth) : yestDate.getDate() + monthName(yestDate.getMonth()))
				,day = datArr && !todYest ?','+ getDay(datArr, mon) : today ?'':',';
			if(todYest)
				dateText = dateText.replace(/(\d+)\s+([а-яё]+)\s*/i,'').replace(/$/, today ?'':'вчера');
			if(datArr && (datArr[3] == thYear //текущий год
					|| Number(datArr[3]) +1 == thYear && mon && thMonth +12 <= mon +8 ) || todYest) //последние 8 мес
				dateText = dateText.replace(/ ?\d{4}\s*/,'');
			//'datesShorten'.wcl(dateText, dateText.length, datArr, NOWdate.getDate(), thYear)
			dat.innerHTML = dateText.replace(/(.*?)(\d{1,2}:\d\d)(.*)/,'$2#$1$3').replace(/(#|$)/, day);
            if(typeof blck=='string') return dat.innerHTML;
			var dT = dat.getAttribute('datetime') ||''; // 2011-05-13T05:56:14+04:00
			if(!dT)
				dT = dat.title;
			if(todYest)
				dT +=' ';
			if(dT)
				dat.title = dT.replace(/\d*-\d*-\d*T/,'').replace(/:00$/,'').replace(/$/, todYest ?(dT.length >2?', ':'')+ dateMon :'');
		}}
},
blockBrs = function(replyM){
	var brs = $qA('br', replyM);
	if(brs && brs.length){
		var prevBR, prevPrevBR;
		for(var j in brs){ if(brs[j].parentNode){ //BR -> DIV + нек.удаления BR в концах сообщ.
			var brn = brs[j].nextSibling
				,brnn = brn ? brn.nextSibling :null;
			//wcl(!prevBR , brn && brn.tagName =='BR', brnn && brnn.tagName, brn && brn.nodeValue =='\n', brnn && brnn.nextSibling
			//		&& brnn.nextSibling.nodeValue);
			if(!prevBR && brn && (brn.tagName =='BR'
					|| brnn && brnn.tagName =='BR' && brn.nodeValue =='\n' && brnn.nextSibling
					&& (!/^\s+$/.test(brnn.nextSibling.nodeValue) || brnn.nextSibling.nextSibling) ) ){
				//wcl('val='+brn.nodeValue.charCodeAt(0)+' '+brn.nodeValue.charCodeAt(1)+' '+brn.nodeValue+' '+brnn.nextSibling.nodeValue)
				prevBR =1;
				$e({cl:'vSpace', bef: brs[j] });
				brs[j].parentNode.removeChild(brs[j]);
			}else{
				var brp = brs[j].previousSibling;
				//wcl(authorCommName, brp && brp.nodeValue, brp && brp.tagName, brn && !/^\s+$/.test(brn.nodeValue), brnn && !/^\s+$/.test(brnn.nodeValue));
				var setV = !prevBR && (brn && !/^\s+$/.test(brn.nodeValue) || brnn && !/^\s+$/.test(brnn.nodeValue))
						&& brp && (brp.nodeValue && brp.nodeValue.replace(/\s+/m,'') > 53 || /BLOCKQUOTE|H1|H2|H3|H4|H5|H6|UL|OL|IMG/i.test(brp.tagName)|| brp.className =='strongCutImgPlace');
				if(setV && /powerCut/.test(replyM.className) && (brp.tagName =='IMG' || brp.className =='strongCutImgPlace') ){
					brs[j].parentNode.removeChild(brs[j]);
					//'brs[j].previousSibling'.wcl(brp)
				}else if(setV){
					$e({cl:'vSpace3', bef: brs[j] });
					brs[j].parentNode.removeChild(brs[j]);
				}else if(prevPrevBR)
					brs[j].parentNode.removeChild(brs[j]);
			}
			prevPrevBR = prevBR;
			prevBR =0;
		}}
	}
},
correctCommentsBefore = function(comms){ //коррекции комментариев в тексте HTML, после подгрузки
	if(!hS.brAsBlock.val) return comms;
	return (comms.replace(/<br\/>\r?\n?<br\/>(?!\s+<\/div>)/gm, '\n<div class="vSpace"></div>')
		.replace(/<br\/>(?!\s+<\/div>)/gm, '\n<div class="vSpace3"></div>'));
},
correctCommentsAfter = function(comms, topic){ //коррекции в DOM после разворота комментов
//схема цветов: [colors:основные, pastelColors:пастельные, ge2Color:авторские, общие на оставшихся, общие пастельные, colorTAH:автора топика, colorTAHnew:новые от автора топика]
	var scheme ={sch0:'ccc,ebc,ea8,ed8,cf9,9da,9ed,abe,ebe0f5'
			,sch1:'ccc,ebb,eed5bb,eeedbb,d4eebb,beb,a6dfc1,bee,bbd6ee,bbe,cec0dd,e7c9d9,f5e0e0,f5eae0,f5f5e0,eaf5e0,e0f5e1,d0eddf,e0f5f5,e0ebf5,ebe0f5'
			,sch2:'ccc,c88fa5,d79a89,a4c57d,78aa8e,dec3ce,edd4ce,d6e3c7,b7cec1,eedae2,f8e7e1,e8f1dd,d3e3da,f2ebee,fcf4f2,f5f9ef,eaf3ee,fbf4f6'},
		pastel = function(colr){ //побледнение цвета
			var pastelK = 0.64
				,s ='#';
			colr = colr.substr(1).match(/../g);
			for(var i in colr)
				s += (function(x){return (Number(x) <= 9 ?'0':'')+ Number(x).toString(16)})
					(255 - Math.floor((255 - parseInt(colr[i], 16)) * pastelK));
			return s;
		},
		prepColors = function(colr){ //подготовка цветовой схемы //подсветки повторяющихся авторов (избранные цвета, по количеству ответов)
			colr = colr.split(',');
			for(var i in colr){
				var ci = colr[i];
				if(i ==0) //контрастирование автора
					ci = [ci,'eba2eb','f9ddec','f1d0f0'][hS.colorAuthorTAH.val *2 + hS.colorAuthorTopic.val];
				if(ci.length ==3)
					ci = ci.replace(/(.)/g,'$1$1');
				colr[i] ='#'+ ci;
				pastelColors.push(pastel(colr[i]) );
			}
			return colr;
		},
		pastelColors =[]
		,authorColors = hS.colorStyle2.val *2 + hS.colorStyle1.val
		,colors = prepColors(scheme['sch'+ (authorColors -(authorColors?1:0)) ]) //цветовая схема (8/20/16 цветов)
	//'pastelColors'.wcl(pastelColors)
		,ge2Color = colors[colors.length -1] //цвет кнопок для авторов без избранных цветов, но имеющих 2 и более ответа
		,pastelGe2Color = pastelColors[pastelColors.length -1]
		,c = comms, n =20, tp = topic
		,colorTAH ='#fee' //'#fdd' topicAuthorHighlight
		,colorTAHnew ='#f5ecf5' //'#efd9ef' topicAuthorHighlight New
		,oneLineHeight =25
		,isQA = $q('.title a[href*="/qa/"]', topic) || $q('.qa_view') || /\/qa\//.test(location.href)
		,newEntity = $q('.comment_item >.comment_body >.message', topic) //новая вёрстка комментариев
		,topicAuthor = $q('.post .infopanel .author a', topic) //===место автора топика
		,authorTopicName = topicAuthor ? topicAuthor.innerHTML :'(без автора)';
	//'isQA,topicAuthor'.wcl(isQA, newEntity, topicAuthor);
	(function(s){
		var replyMsgs = $qA('.message, .comment_item >span.text', c) //===сообщения - ответы
			,hght
			,authors =[{name: authorTopicName, n: 0}];
		if(!replyMsgs || !replyMsgs.length)
			replyMsgs = $qA(isQA ?'.message, .comment_holder':'.comment_item', c);
		for(var i in replyMsgs){if(replyMsgs[i].attributes){
			var replyMI = replyMsgs[i]
				,replyMP = replyMI.parentNode
				,repInfo = replyMP && $q('.info', replyMP)
				,replyButt = replyMP && (next('^reply$', replyMI) || $q('a.reply_link',replyMP) || $q('a.reply',replyMP) ) //===поиск кнопки ответа
				,author = $q('a.username', replyMP) //===поиск автора сообщ.
					|| isQA && ($q('.username', replyMP) || $q('.info a', replyMP) ); //для QA
			if(author && $q('a', author))
				author = $q('a', author);
			var authorCommName = author && author.innerHTML ||'===';
			//'author'.wcl(replyMP, author, replyButt)
			hght = replyMI.offsetHeight;
			if(!hght) continue;
			s += hght ||0; //контроль генерации блока
			if(authorColors){
				if(replyButt && replyButt.tagName !='A')
					replyButt = $q('a.reply_link',replyButt) || $q('a.reply',replyButt);
				//'replyMI, replyButt'.wcl(replyMI, replyButt, replyMP)
				//'BUTT'.wcl(replyButt, authorColors || hS.listAuthorsComms.val, replyMP.className)
				if(!replyButt && authorColors && next('^reply$', replyMI)){ //для неавторизованных - фантомные "ответы" для подсветки кнопок
					replyButt = $e({el: $q('.reply',replyMP)
						,ht:'<a class="reply_link" href="#" onclick="return!1">ответить</a>'});
					//wcl('reply_fake')
				}
				for(var j = authors.length -1; j >=0; j--) //===сбор данных об авторах
					if(authorCommName == authors[j].name){authors[j].n++; break;}
				if(j < 0)
					authors[authors.length] ={name: authorCommName, n: 1};
			}
			if(authorCommName == authorTopicName && (replyButt || isQA) ){ //===подсветка комментариев автора топика
				if(isQA && repInfo.parentNode.className =='comment_head')
					repInfo = repInfo.parentNode;
				if(hS.colorAuthorTAH.val){
					repInfo.style.backgroundColor = /is_new/.test(repInfo.className) ? colorTAHnew : colorTAH;
					repInfo.className +=' is_topicAuthor';
				}
			}
			if(authorCommName == authorTopicName && hS.colorAuthorTopic.val){ //цвет авторов по частоте сообщений
				author.style.backgroundColor = pastelColors[0] || pastelGe2Color;
				//author.style.color ='#569';
				if((newEntity || isQA) && /message/.test(replyMI.className)){
					replyMI.style.borderLeftWidth ='4px';
					replyMI.style.borderLeftStyle ='solid';
					replyMI.style.marginLeft ='-4px';
					replyMI.style.borderLeftColor = colors[0] || ge2Color;
				}
			}
			if(replyMP)
				var infoButt = prev('info', replyMI);
			if(hS.noAva.val && infoButt) //не показывать уменьшенные аватары
				$q('.avatar', infoButt).style.opacity =0;
			//'replyMsgs'.wcl(replyMI, replyMsgs.length, i)
			//'authorCommName,'.wcl(authorCommName, authors.length, j)
			if(hS.brAsBlock.val) //замена BR и BR-BR на прослойки
				blockBrs(replyMI);
			if(replyButt)
				replyButt.innerHTML = replyButt.innerHTML.replace(/(ответить|комментировать)/, hS.shortReply.val && hght < oneLineHeight ?'отв':'ответ'); //ес.одна строчка; меньше, чем примерно 18 пикс - сокращение высоты кнопок
			//'offsetHeight'.wcl(hS.shortReply.val && replyMI.offsetHeight)
			//=== точка "Каждый комментарий (свои и добавленные)" ===
			byTextNodes(replyMI, haReplace); // обработка слов комментария
			extLinks(replyMI);
		}}
		if(s < 20 && replyMsgs.length && --n >0){ win.setTimeout(arguments.callee, 200); return;} //ожидание генерации DOM-ветви TODO ош.с нулевой выс.
		if(authorColors){ //===== раздача цветов =====
			var k =1, s =' <tt style="background:'+ colors[0] +'" title="'+ authors[0].name +'">'+ authors[0].n +'</tt> '; //счёт цветов
			for(i =1; i < authors.length; i++){ //раздача цветов по количеству сообщений - сортировка
				var nMax =0, betterAuthor =0, aLen = authors.length;
				for(j =0; j < aLen; j++)
					if(authors[j].n > nMax && !authors[j].choice && authors[j].name != authorTopicName){
						nMax = authors[j].n;
						betterAuthor = j;
					}
				authors[betterAuthor].color = colors[k];
				authors[betterAuthor].pColor = pastelColors[k];
				s +='<tt style="background:'+ (colors[k] || (authors[betterAuthor].n >=2 ? ge2Color :'#f2f2f2'))
					+'" title="'+ authors[betterAuthor].name +'">'+ authors[betterAuthor].n +'</tt> ';
				authors[betterAuthor].choice = k++; //выбран наибольший параметр "n" из оставшихся
				if(k >= colors.length +3) break; //ограничение по длине списка
			}
			s +=(authors.length > colors.length +3 ?'<i>...</i>':'')+'<tt>('+ authors.length +')</tt>';
			authors[0].color = colors[0];
			authors[0].pColor = pastelColors[0];
			//for(i =0; i < authors.length; i++)
			//	'authors'.wcl(authors[i].n+' '+authors[i].name+' '+(authors[i].choice||''))
			for(i in replyMsgs){ //2-й проход  и расстановка цветов
				var replyMI = replyMsgs[i]
					,replyMP = replyMI.parentNode;
				//'replyMp'.wcl(replyMP, i)
				if(!replyMP) continue;
				var author = newEntity && $q('a.username', replyMP) //===поиск автора сообщ.
					|| isQA && ($q('.username', replyMP) || $q('.info a', replyMP) ); //для QA
				if(author && $q('a', author))
					author = $q('a', author);
				var authorCommName = author && author.innerHTML ||'===';
				//'author.innerHTML'.wcl(author && author.innerHTML, authors.length)
				if(!hS.colorAuthorTopic.val)
					authors[0].color = colorTAH;
				for(var j = authors.length -1; j >=0; j--){ //счёт всех авторов
					//'=='.wcl(j, authorCommName == authors[j].name , (authors[j].choice || authors[j].n >=2))
					if(authorCommName == authors[j].name && (authors[j].choice || authors[j].n >=2)){ //...и избранный цвет
						var replyButt = replyMP && (next('^reply$', replyMI) || $q('a.reply_link',replyMP) || $q('a.reply',replyMP) );
						//'replyButt'.wcl(replyButt, authorCommName)
						if(replyButt && replyButt.tagName !='A')
							replyButt = $q('a.reply_link',replyButt) || $q('a.reply',replyButt);
						if(replyButt)
							replyButt.style.backgroundColor = authors[j].color || ge2Color;
						if(author){ //цвет авторов по частоте сообщений
							author.style.backgroundColor = (!isQA && author.parentNode.className=='info'? authors[j].color : authors[j].pColor) || ge2Color;
						}
						//'replyMI'.wcl(replyMI, replyMP, author, !!newEntity, !!isQA, /message/.test(replyMI.className))
						var isMsg = /message/.test(replyMI.className);
						if(isMsg){
							replyMI.style.borderLeftStyle ='solid';
							replyMI.style.marginLeft ='-4px';
						}
						(isQA && !isMsg ? replyMP : replyMI).style.borderLeftColor = authors[j].pColor || ge2Color;
						(isQA && !isMsg ? replyMP : replyMI).style.borderLeftWidth ='4px';
						break;
					}
				}
			}
		}
		var o = $q('.comments_list .title', tp) || $q('.qa_view .answers .title', tp) || $q('.comments.c2 .title', tp)
			,oL = o && $q('label', o)
			,oL2 = o && $q('label + label', o);

		if(hS.shortSubscribe.val && oL){ //укорочение надписи "подписаться на комментарии"
			oL.title ='следить за новыми комментариями через почту';
			var aChilds = oL2 && oL.parentNode.childNodes || oL.childNodes;
			for(var i=0; i < aChilds.length; i++)
				if(/(подпи|отсл)/.test(aChilds[i].nodeValue)) aChilds[i].nodeValue ='слеж.';
			for(var i=0; i < oL.childNodes.length; i++)
				if(/почт/.test(oL.childNodes[i].nodeValue)) oL.childNodes[i].nodeValue ='';
			if(oL2){
				oL2.title ='... через трекер';
				for(var i=0; i < oL2.childNodes.length; i++)
					if(/трек/.test(oL2.childNodes[i].nodeValue)) oL2.childNodes[i].nodeValue ='';
				oL2.style.paddingRight ='6px';
			}
		}
		if(hS.listAuthorsComms.val)
			$e({el:'TT', ht: s, apT: o}); //активные комментаторы (с цветами, в заголовке комментариев)
		if(hS.commInfo && hS.commInfo.val){ //=== навигатор по веткам комментариев ===
			var isMail = /\/conversations\//.test(lh)
				,commInfo = $e({cl:'commInfo',prT: isQA &&!/ c2/.test(c.className) ? $q('.answers .title', c) : $q('.title', isMail ? c.parentNode : c)})
				,comRoots = $qA('.comments.c2 >.title, .comments_list >.title, .comments.c2 >.comment_item >.comment_body >.info, .comments_list >.comment_item >.comment_body >.info, #answers .answer >.info, #messages .info', c)
				,branch ={linksTo:[]};
			if(comRoots.length){
				for(var i in comRoots){ var cRI = comRoots[i]; if(cRI.attributes){ //по корневым веткам
					var nCom = $qA('.info', isQA ||isMail ? cRI.parentNode : cRI.parentNode.parentNode) //число ответов в корневой ветке
						,nP =0
						,nM =0
						,nSym =''
						,hash = cRI.getAttribute('rel') //якорь корневого коммента
						,linksRoot = $e({cl:'links root'})
						,imgsRoot = $e({cl:'imgs root'})
						,nImg =0
						,hrf = hash ? (isQA ?'#answer_':'#comment_')+ hash : (isQA ?'#answers':'#comments');
					for(var j in branch.linksTo){
						$e({el:'a'
							,cl:'nx branch'
							,ht:'>'
							,at:{href: hrf, title:'следующая ветка'}
							,aft: branch.linksTo[j]
						});
					}
					//'nCom'.wcl(nCom.length, cRI)
					branch.linksTo =[];
					for(var j in nCom){ var nCJ = nCom[j]; if(nCJ.attributes){ //по комментам
						var nCJS = $q('.mark .score', nCJ);
						if(nCJS){
							var nS = nCJS.title && nCJS.title.match(/\d+/g);
							if(nS.length ==3){
								nP += Number(nS[1]);
								nM += Number(nS[2]);
						}}
						var msg = isQA && nCJ.tagName=='SPAN'? $q('.text', nCJ.parentNode.parentNode) : $q(isMail?'.text':'.message', nCJ.parentNode);
						if(msg){
							nSym += msg.innerHTML;
							var kLnk = $qA('a', msg) //подсписок ссылок
								,kImg = $qA('img:not(._noAddOwnView)', msg); //подсписок рисунков
							for(var k in kLnk){ var kLK = kLnk[k]; if(kLK.attributes){ //ссылки
								if(!$q('img:not(._noAddOwnView)', kLK) )
									$e({el:'a', cl:'lnk'
										,at:{title: kLK.href.replace(/^https?:\/\/(habrahabr\.ru)?/,'')
											,href: kLK.href, target:'_blank'}
										,apT: linksRoot});
							}}
							for(var k in kImg){ var kIK = kImg[k]; if(kIK.attributes){ //рисунки
								if(kIK.parentNode.tagName !='A')
									$e({el:'a', cl:'imgL'
										,at:{href: kIK.src, target:'_blank'}
										,apT: imgsRoot});
								else //рисунок с внешней ссылкой
									$e({el:'a', cl:'imgLink'
										,at:{href: kIK.parentNode.href, target:'_blank'}
										,apT: imgsRoot});
								nImg++;
							}}
						}
						var toPar = $q('time', nCJ);
						if(!toPar)
							toPar = $q('.to_parent', nCJ);
						if(!toPar)
							toPar = $q('.to_chidren', nCJ);
						if(toPar && hash){ //переход к предыдущей ветке - кнопка
							if(branch.href)
								branch.linksTo.push( $e({el:'a'
									,cl:'prv branch'
									,ht:'<'
									,at:{href: branch.href, title:'предыдущая ветка'}
									,aft: toPar
								}) );
						}
					}}
					branch.href = hrf;
					if(nImg==0)
						imgsRoot.style.display ='none';
					var overLink = $e({cl:'overLink', apT: commInfo})
						,hLnk ={el:'a', cl:'root'
							,at:{href: hrf}
							,apT: overLink }
						,nVLink = $e(hLnk) // N's-Votes-link
						,pMLink = $e(hLnk); //plus-minus-link
					$e({el: linksRoot, apT: overLink});
					$e({el: imgsRoot, apT: overLink});
					if(comRoots.length ==1 && nCom.length ==0)
						break;
					if(nP !=0 || nM !=0){ //минусы +плюсы
						var pluses = boxBuild(nP,'nP',pMLink,'+')
							,minuses = boxBuild(nM,'nM',pMLink,'-');
						//'m-p'.wcl(parseInt(minuses.style.width), parseInt(pluses.style.width))
						if(parseInt(minuses.style.width) + parseInt(pluses.style.width) > 43){
							var hP = parseInt(pluses.style.height)
								,hM = parseInt(minuses.style.height)
							minuses.style.marginBottom ='-'+ (hM -3) +'px';
							if(hM - hP -3 >0)
								pluses.style.marginBottom = (hM - hP -3) +'px';
							pMLink.style.lineHeight =overLink.style.lineHeight ='4px';
						}
					}else
						pMLink.style.display ='none';
					//сообщения + объём
					var strings = boxBuild(Math.floor((nSym.length +75)/150),'nLin',nVLink,'"длинных строк" '); //вставка блока графики по объёму байтов
					var msgs = boxBuild(nCom.length,'nCom',nVLink,'Сообщений в ветке: '); //--по числу ответов в ветви
					//'strings'.wcl(parseInt(strings.style.width), parseInt(msgs.style.width))
					if(parseInt(strings.style.width) + parseInt(msgs.style.width) > 43 -4){
						msgs.style.marginBottom ='-'+ (parseInt(msgs.style.height) -3) +'px';
						nVLink.style.lineHeight = overLink.style.lineHeight ='4px';
					}
					if(i==0){ //общий счётчик
						overLink.style.marginTop ='-'+ Math.max(parseInt(msgs.style.height)+28, parseInt(strings.style.height)+28, minuses && (parseInt(minuses.style.height)+28), pluses && (parseInt(pluses.style.height)+28) ) +'px';
						overLink.style.marginBottom ='22px';
						nVLink.style.verticalAlign = pMLink.style.verticalAlign
							= linksRoot.style.verticalAlign= imgsRoot.style.verticalAlign ='bottom';
						overLink.title ='комментариев: число, объём (160-симв. строк), минусов, плюсов, ссылки, рисунки';
					}
				}}
				handlImgViews(commInfo,'.commInfo a[href$=".jpg"],.commInfo a[href$=".jpeg"],.commInfo a[href$=".png"],.commInfo a[href$=".gif"]'); //просмотр картинок
			}
		}
		if(hS.shortDates.val)
			datesShorten(c,'.info time', isQA);
		})(0);
},
boxBuild = function(n, cl, el, def){ //выдача DOM-объекта (блока) по правилам построения инфографики
//  (блок dim*dim есть 150 символов или 1 элемент; ar[ity]-кратное расширение влево, затем вниз)
	var dim = 4
		,ar = 4
		,logN2 = 2/ ar /Math.LN2 // 1/log4(1)
		,log = Math.log(n) *logN2 // log4( n )
		,flor = Math.floor(log) // [log4( n )]
		,flor12 = Math.floor((flor +1)/2 )
		,flor2 = Math.floor(flor /2)
		,growHoriz = flor12 == flor2 ?1:0 // делать рост по горизонтали/вертикали
		,fract = log - flor // { log4( n ) }
		,w = Math.pow(ar, flor12)
		,h = Math.pow(ar, flor2);
	//'commRootBlks'.wcl(w +' '+ h +' '+ n +' '+ Math.floor(dim*( w + growHoriz*(n-w)/ w )) +' '+ Math.floor(dim*( h + (1- growHoriz)*(n-h)/ w )));
	return $e({cl: cl
		,cs:{width: Math.floor(w ? dim*( w + growHoriz*(n -w* w)/ w ): 2)+'px'
			,height: Math.floor(w ? dim*( h + (1- growHoriz)*(n -h* w)/ w ): 3)+'px' //деление на 4 учтено через flor12
			,color:'#dd3'
			,verticalAlign:'top'}
		//,ht: '*'
		,at:{title: def + n}
		,prT: el
	});
},
imgWait = '<img src="data:image/gif;base64,R0lGODlhEAAQAMMGAG6WysLS6pKy2ubu9rXK5oKi0v7+/t7m8p622naezsra7oqq1qa+3u7y+gAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAOACwAAAAAEAAQAAAETNDJSau91SzAgSSEYWmdlADFkBWlo7CFOBHoNhksQW2KRimABYWDIU6MGaSDR2G4ghRa7MjIUXAohaQzpQxYiS1nIbuCxOMyZs2eRAAAIfkECQoADgAsAgAAAAwAEAAABFXQyZGCvNgVsE52BpEA5IANGwkwYANuRQAkjbEUIYA7C/EChAVAISEWOaQPSAUwKElCo8Go4BB0zuCPYCiwGqMAzOlyMJgF02WgSnA/B2FBeQkk1I4IACH5BAkKAA4ALAIAAAAMABAAAART0MnpmqDYBaCoIQsAJKMhDYWoioRjpEV3iElHAIXp3IwedhLCwKW4ATKSFdLAUpgGLYkCsJAYGIDoK+tQkAAHgwJmMq5wQxfpuyDopIAAciJoICMAIfkECQoADgAsAgABAA0ADQAABEXQyUmdMdKQBcAi13I4Q9GdQMEdhlkokmJ2B5FiGUcTCTzptIpQcigWcRUUg6JIEByn5aQFeJ5eF9kNipihCgPJUqP7ICMAIfkECQoADgAsAAACABAADAAABFTQSWfIAmARM3srWAgUQzcxhcIpYMFNJdUZIOGUB8A0phMAiULCcQFuJIoiJvALLRQTQgKzcASngV6DATjcHITRS2LgxMgtlYG1GMNAohGvVylq3BEAIfkECQoADgAsAAACABAADAAABFPQyUkAWMTMaUhwimUVw6YkQGJoYAEUrCACzGa4hNQEqFVOocXGciDkhgAkS2I8WDYLgGIzECUCDeZr6WDMBJLbS6FZoRLTycAlmioymzAhCjhuIgA7" title="подгрузка содержимого...">',
openInFrame = function(ev, t, blck, Li){ //открывать в фрейме (если ссылка не в фрейме)
	if(ev && ev.shiftKey ^ ev.ctrlKey){
		t.target ='_blank'; //в новой вкладке, если Ctrl+click
		win.setTimeout(function(){t.target ='';},200);
		return;
	}
	if(ev && ev.shiftKey && ev.ctrlKey){
		$pd(ev);
		location.href = t.href;
		return!1;
	}
	try{
	var name ='hA_userinfoView'
		,uFrm = document.getElementById(name);
	if(!uFrm){
		uFrm = document.createElement("iframe");
		uFrm.id = uFrm.name = name;
		uFrm.src ='';
		uFrm.style.position ='fixed'; uFrm.style.height ='200px'; uFrm.style.width = h.uFrmWid; uFrm.style.borderWidth =0;
		uFrm.style.backgroundColor ='#f4f6f7';
		uFrm.style.zIndex = 101; uFrm.style.top ='200px';
		document.body.appendChild(uFrm);
		if(isChrome)
			win.setInterval(function(){ //опрос ширины фрейма по сообщению изнутри
				var frameWidth = uFrm.contentDocument && uFrm.contentDocument.body && uFrm.contentDocument.body.getAttribute('frameWidth');
				if(frameWidth && uFrm.style.display =='block')
					uFrm.style.width = frameWidth;
			},250);
	}}catch(er){'Err_authorClicks: '.wcl(er)}
	var dFrm = $q('.imgWait');
	if(!dFrm) dFrm = $e({cl:'imgWait'
		,cs:{position:'fixed',width:'20px', height:'20px', zIndex: 101
			, top: Math.floor(win.innerHeight /2 +3) +'px'}
		,ht: imgWait
		,apT: document.body});
	else
		$x(dFrm.style, {display:'block',top: Math.floor(win.innerHeight /2 +3) +'px'} );
	uFrm.style.height = Math.floor(win.innerHeight /2 -20) +'px';
	win.setTimeout(function(){dFrm.style.display ='none';}, 2700);

	var srchField = $q('#search_form input[name="q"]')
		,noInFrame = Li && Li.parentNode == srchField.parentNode && srchField.getAttribute('keyLast')==13 //для непоказа фрейма при открывании в том же окне
		,ifTop = ev.clientY > win.innerHeight /2;
	//'Li'.wcl(ev.clientY)
	uFrm.style.top = ifTop ?'19px':'';
	uFrm.style.bottom = ifTop ?'':'-2px';
	if(h.uFrmPrevClick != t.href) //Url последней кликнутой ссылки, загруженной в фрейм
		uFrm.src = t.href;
	uFrm.style.display = (h.uFrmPrevClick == (t.href ||1) && uFrm.style.display =='block'
		|| noInFrame) && !/\/edit\//.test(t.href) ?'none':'block';
	h.uFrmPrevClick = t.href;
	if(Li && Li != blck)
		ev && $pd(ev);
},
openInFrmHndl = function(blck, Li){ //Li={href:ссылка, открываемая в фрейме}; {href:1} - признак откр.в фрейме со всеми данными в blck, +блокирование умолчательного поведения клика
	var a = Li.href.match(/(http:\/\/)(\w+)\.(habrahabr\.ru)(.*)/) //замена 3-го уровня на 2-й
		,c =0 //TEST
		,linNext;
	if(a && a.length && a[2] !='m')
		Li.href = a[1] + a[3] +'/users/'+ a[2] + a[4];
	else{
		a = Li.href.match(/(\/favorites\/)(.*)/); //замена в избранном //TODO .* -- .+
		//'favorites'.wcl(h.uName , h.uName2, a, Li.next)
		if(a && a.length){
			Li.href = '/users/'+ (linNext? h.uName2 : h.uName) + a[1] + (a[2] ? a[2] :'');
			linNext =1; //чтобы первый линк на избранное был на своё (если авторизован)
		}
	}
	a = Li.href.match(/(http:\/\/)(habrahabr\.ru)(\/users\/|\/job\/|\/tag\/)([^\/]+)(.+)/); //обработчик клика на юзере | */job/7671/ | теги -- открывать в фрейме
	//wcl(a);
	if(a && a.length >1 )
		c++; //TEST
	if(a && a.length ==6 && (a[5]=='/'|| a[5]=='/favorites/') && !inFrame
			|| RegExp(SHRU+'/settings/').test(Li.href) || Li.href==1){
		if(Li.href==='1')
			Li = blck; //вешать на кнопку
		Li && Li.addEventListener('click', function(ev){openInFrame(ev, this, blck, Li)},!1);
	//'writeListener'.wcl(a && a.length ==6 && (a[5]=='/'|| a[5]=='/favorites/') && !inFrame
	//		|| Li.href== HRU +'/settings/', Li.href)
	}
},
authorClicks = function(blck){ //расст.обраб.кликов по ссылкам; blck - блок, в кот.ищут ссылки
	if(!blck) return;
	var linx = $qA('a[href]',blck); //все ссылки в блоке
	if(linx || blck.tagName =='INPUT'){
		if(blck.tagName =='INPUT') //для подвешивания открывания поиска в фрейме на кнопке поиска
			linx =[{href:'1'}];
		for(var i in linx)
			if(linx[i].href)
				openInFrmHndl(blck, linx[i]);
	}
	if(win.opera || /Firefox\/[345]/.test(navigator.userAgent)){
		if(win.addKarmEvent) //показ кармы, если установлен HabraKarmaView.user.js
			win.addKarmEvent(blck);
		if(win.habrPercentageRing)
			win.habrPercentageRing(blck);
	}else
		evtChangeDom(blck); //CustomEvent в блоке
},
getHourMins = function(D){
	var date = D || new Date;
	return date.getHours() +':'+ (date.getMinutes()<=9?'0':'') + date.getMinutes();
},
showContent = function(ev){ //подгрузить и показать статью
	if(ev.ctrlKey ^ ev.shiftKey) return;
	var URL = location.href
		,isSearchPage = /\/search/.test(URL)
		,tLink = this.tagName.toUpperCase() !='SPAN' && this || this.parentNode
		,inFooter = parents('rotated_posts', tLink)
		,topic = parents('^post($| )', tLink) || inFooter //топик или блок в футере
		,info2 = $q('.infopanel', topic)
		,isQA = $q('.title a[href*="/qa/"]',topic)
		,clickComments = /comments|informative|infopanel/.test(this.parentNode.className); //признак клика по ссылке/кнопке комментариев
	//'~~topic'.wcl(tLink, topic, info2)
	if(!tLink.href && (clickComments || parents('habracut', this)) ) //поправка для малых правых кнопок
		tLink.href = $q('a', prev('(comments|informative)', this) || parents('habracut', this) ).href;
	var commLink = $q('.'+(isQA?'informative':'comments')+' a', info2);
	if(/ link/.test(topic.className) || isQA) //сменить ссылку для подгрузки (на ту, которая в комментариях)
		tLink = commLink;
	var topicTitle = $q('.post_title', topic) || parents('^grey$', tLink); //заголовок статьи
	//if(inFooter && !/infopanel/.test(this.parentNode.className) ) //нажатая кнопка в футере
	//	$q('span.inln',tLink).className +=' content';
	if(inFooter && !/^post($| )/.test(inFooter.className))
		inFooter.className ='post content_left '+  inFooter.className;
	if(!/blk2nd/.test(this.className)){ //защита от повторного клика
		this.setAttribute('class', this.className +' blk2nd'); //блокировка повторного клика
		try{
			var cnte = $qA('.content', topic)
				,topicHaCut = $q('a.habracut', topic)
				,commC2 = $q('.comments.c2', topic); //комментарии, если есть с прежней подгр.
			//'cnte'.wcl(this.tagName.toUpperCase() !='SPAN', this, this.parentNode, cnte[0],cnte[1],topicHaCut, commLink);
			//'commC2=='.wcl(commC2 && getComputedStyle(commC2, null).getPropertyValue('display'))
			var wasComms = commC2 && getComputedStyle(commC2, null).getPropertyValue('display') =='none'; //"были ли показаны комментарии"
			if(cnte.length >1 && !clickComments && !ev.ctrlKey && !ev.shiftKey){ //просто показать ранее загруженное
				cnte[0].style.display ='none';
				$q('.btnBack:not(.showComm)', topic).style.display //показ верхней кн."Свернуть"
					= cnte[isQA ?0:1].style.display //показ статьи
					= $q('.btnBack.n2', topic).style.display ='block'; //показ нижней кн."Свернуть"
			}
			//'commC2,clickComments,wasComms'.wcl(commC2, '/', clickComments, '/', wasComms)
			var isBtnBack = $q('.showComm.btnBack:not(.inln)', topic)
				,isBtnBack2 = $q('.showComm.btnBack.n2', topic);
			if(commC2 && clickComments && wasComms && !ev.ctrlKey && !ev.shiftKey
					&& isBtnBack && isBtnBack2){ //показ комментариев
				isBtnBack.style.display = commC2.style.display = isBtnBack2.style.display = 'block';
				if(/ noShowYet/.test(commC2.className)){ //корректировки отображения после вывода:
					//'>By NoShowYet'.wcl('');
					correctCommentsAfter(commC2, topic); //кнопки "Отв"; расцветка авторов; поправки дат
					authorClicks(commC2); //расст.обраб.кликов по ссылкам
					//'authorClicks2'.wcl(commC2, cnte[1])
					authorClicks(cnte[1]);
					commC2.className = commC2.className.replace(/ noShowYet/,'');
					handlImgViews(commC2); handlImgViews(cnte[1]); //показ увеличенных картинок
				}
			}
			//'cnte=='.wcl(cnte, topic, $q('.btnBack.n2', topic))
			if(cnte.length <=1 || ev.ctrlKey){ //подгрузить или пере-подгрузить страницу по ссылке - только при необходимости нарисовать содержимое (контент .content.c2 и .comments.c2)
				this.innerHTML = imgWait + this.innerHTML; //сигнал об ожидании Ajax
				var xhr = new window.XMLHttpRequest()
					,reGet = ev.ctrlKey && ev.shiftKey; //режим пере-подгрузки
				if(reGet){ //другой признак пере-подгрузки - $q('.btnBack.n2', topic)
					var cont = inFooter ? $q('.contentCell', inFooter) : topic;
					cont.removeChild($q('.content.c2', cont));
					cont.removeChild($q('.comments.c2', cont)); //контент удалён
					xhr.wasArrows =1; //(стрелки были - и остались)
				}
				//topicTitle && 'tLink'.wcl(topicTitle, tLink.href, topicTitle.link);
				var url = topicTitle && (tLink.href || commLink && commLink.href || topicTitle.link);
					//-обход заголовка-ссылки, не-ссылок, отсутствия ссылки на комментарии
				xhr.open('GET', url.replace(/_/g,'%5F'), true); //странно, но "_" не переваривает (FF)
				xhr.link = this; //активный элемент клика мыши
				xhr.onreadystatechange = function(){ //===показ статьи===

					if(this.readyState !=4) return;
					if(inFooter && !$q('.contentRow',inFooter)){ //область контента-c2 в над-футере для подгрузки
						var cntRow = $e({cl:'contentRow'
							,cs:{display:'table-row', backgroundColor:'#fff'}
							,aft: $q('.rotated_posts .rotTRow') });
						$e({cl:'contentCell', el:'td'
							,cs:{display:'table-cell', padding:'0 13%'}
							,at:{colspan:3}
							,ht:'<div class=content></div><div class=infopanel><span class="showComm btnBack inln" title="комментарии; Ctrl+Shift - пере-подгрузка">&rarr;</span></div><div class=clear></div>'
							,apT: cntRow});
						topic = inFooter = $q('.contentCell', cntRow);
						$q('.showComm', topic).addEventListener('click',showContent,!1);
					}
					xhr.link.removeChild($q('img', xhr.link)); //снять сигнал об ожидании Ajax
					var tContent = !inFooter
							? !isQA && cnte[0] || $q('.hubs', topic) || $q('.title', topic)
							: $q('.contentCell .content', topic) //начало статьи (аннотация)
						,contHeight = tContent.offsetHeight //для будущей подкрутки текста при сворачивании статьи
						,showComm = clickComments && !wasComms || !topicHaCut && !isSearchPage && !isQA && !inFooter;
					//'xhr.link'.wcl(xhr.link, tContent)
					//'clickComments'.wcl(clickComments, !wasComms, !topicHaCut);
					/*var state = new defineState();//!isQA ? ARTICLBEGIN : ALLHIDE;
					stateRoll(state, isQA, topicHaCut);*/
//wcl(tContent.style.display,'/', cnte[1] && cnte[1].style.display,'/', wasComms, 'showComm='+showComm, topicHaCut)
					if(!showComm || inFooter)
						tContent.style.display ='none'; //скрыть начало статьи
					var contEdge = $q(!xhr.wasArrows ?'.tags':'.btnBack.n2', topic); //контекст, перед кот.ставится содержание
					//'contEdge2'.wcl(contEdge, !xhr.wasArrows, !isQA) || info2; //если нет контекста (блока с тегами)- ориентир.на блок с подписями
				//'contEdge'.wcl(contEdge)
				//=== точка "ajax-парсинг страницы" ===
					var conte = this.responseText.match( // ====== парсинг страницы, шаблон ======
						/<div class="content html_format">([\s\S]*?)<div class="clear"><\/div>\s+?<\/div>[\s\S]+?(<ul class="tags">|<div class="tags">)\s*([\s\S]*?)\s*(<\/div>|<\/ul>)[\s\S]*?<div class="infopanel/m) //вся статья (до тегов или подписи)
						,tagPars = conte && conte.length ==5 ? conte[3] :''; //вытаскивание тегов
					//'conte~~'.wcl(conte.length, conte, info2)
					conte = conte ? conte[1] :''; //устранение ошибки пустого ответа
					conte = haReplace(conte); // обработка слов статьи (без комментариев)
					if(isQA){ //раздел вопросо-ответов - свои особенности
						var clarif = this.responseText.match(/(<div class="clarification" >)([\s\S]*?)<div class="answers"/);
						clarif = clarif ? clarif[1] + clarif[2] :'';
						clarif = haReplace(clarif);
					}
					var len2 = !conte ?'1': conte.replace(/<a name="habracut"><\/a>(.*|\r|\n)*/m,'') //статья до ката
						//чтобы было "0%" при отсут.текста
						,date = getHourMins()
						,percnt = Math.floor((1- len2.length / (conte.length+1))*100)
						,percent = '&nbsp;'+ percnt +'%, <i>'+ date +'</i>';
					if(!xhr.wasArrows){ //"Свернуть статью" (полоса внизу)
						var btnBackN2 = $e({cl:'btnBack n2'
							,ht:'<i>&larr; Свернуть</i><div class="percent" style=float:right>/'+date+'/</div>'
							,at:{rel: contHeight}
							,on:{click: hideC2}
							,aft: tContent});
						if(showComm && !isQA)
							$q('.btnBack:not(.showComm)', topic).style.display ='none';
					}else //...или показать её
						$q('.btnBack:not(.showComm)', topic).style.display ='block';
					var contC2 = $e({cl:'content c2' // ==== блок с полной статьёй (контентом)
						,ht: /<a name="habracut"><\/a>/.test(this.responseText)
							?'<div style="background: #efeff2; padding: 2px 3px 2px 7px; margin: -2px -3px -2px -7px; position: relative">'
								+ conte.replace(/<a name="habracut"><\/a>/,'</div>')
							:(isQA || !topicHaCut || conte.length >20 || clarif.length >20 ? conte + clarif :'<i style="color: #999">(пустой блок)</i>')
						,aft: tContent }); //(-бывает, что ката в результирующем блоке нет, а в начальном есть)
					extLinks(contC2);
					authorClicks(contC2); //расст.обраб.кликов по ссылкам
					handlImgViews(contC2); //показ увеличенных картинок
					if(showComm && !isQA)
						contC2.style.display ='none';
//wcl('trace_00')
					if(!xhr.wasArrows){
						var btnBack = $e({cl:'btnBack'
							,ht:'<i>&larr; Свернуть</i> <div class="percent"></div>'
							,on:{click: hideC2} //"Свернуть статью" (полоса вверху)
							,aft: tContent});
						if(showComm && !isQA)
							btnBackN2.style.display = btnBack.style.display ='none';
						else if(isChrome){
							var info = $q('.infopanel', topic);
							info.style.top ='-5px';
						}
					}else if(!showComm || isQA) //...или показать контент
						contC2.style.display ='block';
					var tags = $q('.tags', topic);
					if(tags)
						tags.style.display ='block';
					else if(tagPars){ //добавление тегов из парсинга, если нет исходных
						if(isQA)
							$e({cl:'clear',cs:{height:'3px'},bef: info2}); //для форматирования
						$e({el:'ul', cl:'tags'
							,ht: tagPars
							,bef: info2});
					}
					//'-*-'.wcl(tags, info2)
					//wcl('trace_01')
					//'!xhr.wasArrows ,showComm ,!topicHaCut'.wcl(!xhr.wasArrows ,showComm ,!topicHaCut)
					if(!xhr.wasArrows && showComm && !topicHaCut && !isQA) //скрыть статью, если надо только комм.
						hideC2.call(tLink);

					var infoDelim = $q('.infopanel +.clear', topic);
					//'infoDelim'.wcl(infoDelim)
					if(!xhr.wasArrows){ //создание кнопки над комментариями
						$e({cl:'showComm btnBack n2' //созд_кноп.сворач_ под комментариями
							,ht:'<i>&larr; Свернуть</i> <div class="percent0"><i></i> <div class="percent">/'+date+'/</div></div>'
							,at:{rel: -26}, on:{click: hideComm}
							,aft: infoDelim});
						var b = $q('.content_left .posts_list .showComm.btnBack:not(.inln)', topic.parentNode);
						if(b) b.style.marginTop ='25px';
						//'zenPresent'.wcl(hS.zenPresent.val, zenChecked, topic.querySelector('.btnBack:not(.inln):not(.n2)'), topic.querySelector('.comments.c2 ul.hentry'))
						var back1 = $q('.showComm.btnBack:not(.inln):not(.n2)', topic);
						if(!zenChecked && !$q('.comments.c2 ul.hentry', topic) && back1 ) //двигать вверх для новых внутренних вёрсток, но не для новых в старом окружении
							back1.style.top ='-22px';
					}

					if(topicHaCut){ //показ процентов при наличии (и возле) ката
						var prevLastInAnno = $q('.prevLastInAnno',topic)
							,gPercent = $e({cl:'gPercent'
								,ht:'<div style="width:'+(100 - percnt)+'px"></div>'
								,on:{click: showContent}
								,bef: prevLastInAnno});
						$e({cl:'percent'
							,ht: percent
							,bef: prevLastInAnno});
						$q('.btnBack:not(.showComm) .percent', topic).innerHTML = '<div class="gPercent"><div style="width:'+(100 - percnt)+'px"></div></div>'+ percent;
					}

					//wcl('trace_02')
					var matchComments; //шаблон, парсинг, комментарии
					var regComms = !isQA
						? /<div( class="comments_list " | )id="comments">([\s\S]*?)<\/div>\s+?<div (id|class)="sidebar/m //комменты
						: /<div class="answers"( +| )>([\s\S]*?)<\/div>\s+?<div( | )class="add_answer">/m ;

					var matchComments = this.responseText.match(regComms);
					//'matchComments'.wcl(matchComments);
					if(matchComments.length ==4)
						matchComments[1] = matchComments[2];
					if(matchComments && hS.shortReply.val){ //шаблон, парсинг
						matchComments[1] = matchComments[1].replace(/( class="reply_link">[\n\r\s]*<a[\s\S]+?)(ответить|комментировать)(<\/a>[\n\r\s]*<\/)/gm,'$1ответ$3').replace(/id="js-field-holder-with-help"/,'id="js-field-holder-with-help" class="hidden"');
					}
					var comms = correctCommentsBefore(matchComments[1])
						,comments = matchComments
							? $e({cl:'comments c2 noShowYet', ht: comms}) : null
						,replyA = $qA('.reply a',comments); //коррекция комментов для FF3.6
					for(var i in replyA){
						if(!replyA.getAttribute) continue;
						replyA[i].setAttribute('onclick','return!1;'+replyA[i].getAttribute('onclick'));
						replyA[i].addEventListener('click', function(ev){
							if(win.commentForm){
								//wcl(win.commentForm)
								win.commentForm.moveForm('reply_form_'+ this.getAttribute('onclick').replace(/\D/g,''));
							}
							$pd(ev);
						},!1);
					}

					//wcl('trace_021');
					if(!xhr.wasArrows){ //=====вывести комментарии=====
						//topic.appendChild(comments);
						$e({el: comments
							,aft: infoDelim});
						var id = url.replace(/\/([^\/]*)$/g,'').replace(/\D/g,'');
						//'_comment_id'.wcl(id); //номер сообщения (для оценок и комментариев)
					}else if(reGet){ //или вставка перед нижней кнопкой сворачивания
						topic.insertBefore(comments, $q('.showComm .btnBack.n2', topic));
					}

//wcl(tContent.style.display,'/', cnte[1] && cnte[1].style.display,'/', wasComms, 'showComm='+showComm, topicHaCut)
					//'trace_03: !xhr.wasArrows, win.commentForm, isQA:'.wcl(!xhr.wasArrows, win.commentForm, isQA)
					win.commentForm  ={};
					if(!xhr.wasArrows){ //&& win.commentForm
								//wcl('trace_04',	win.commentForm && win.commentForm.reloadCommentsOnload)
						//addTaButtons(comments); //добавл_ кнопок над полем ввода
						$e({cl:'showComm btnBack'
							,ht:'<i>&larr; Свернуть</i>'
							,on:{click: hideComm}
							,aft: infoDelim });
						//'.percent'.wcl(topic.querySelector('.showComm.btnBack.n2 .percent'))
						$q('.showComm.btnBack.n2 .percent', topic) //====подгрузка комментариев (обработчик)====
								.addEventListener('click', function(ev){
							//wcl('trace_05', win.commentForm && win.commentForm.reloadCommentsOnload)
							var fLoadCommentsBack = win.commentForm && win.commentForm.reloadCommentsOnload;
							win.commentForm && (win.commentForm.reloadCommentsOnload = function(data, contxt){ //коллбек - подгрузка комментариев
								var newComms = data.responseText.match(/<comment comment_id=/gm);
								newComms = newComms ? newComms.length :0; //число комментариев в подгрузке
							//wcl('trace_06', getHourMins() +', '+ newComms)
								$q('.showComm.btnBack.n2 .percent0 i', topic).innerHTML //...и выв.дату подгрузки
									= getHourMins() + ', (+'+ newComms+')';
							//wcl('trace_07')
								win.commentForm && fLoadCommentsBack.call(win.commentForm, data, contxt); //продолжение подгрузки
							//wcl('trace_08')
							});
							if(win.commentForm){
								win.commentForm.targetId = id;
								win.commentForm.targetType ='post';
								win.commentForm.reloadComments(); //-updateComments: добавление новых комментариев; далее это не работает, т.к. Mootools
								$sp(ev);
							}
						},!1);
						if(!isChrome)
							win.tm && win.tm.init && win.tm.init.add(function(){ //дубликат tm.init.add(function(){...}) под Greasemonkey для отправки коммента
								var c_form_node = $q('#comment_form', topic);
								//'c_form_node:'.wcl(c_form_node, ' win.commentForm:'+ (win.commentForm ? win.commentForm :'==no=='));
								if(c_form_node){ //если есть форма ответа...
									//c_form_node.input_preview = c_form_node.getElement('input.preview');
									c_form_node.input_preview = $q('input.preview', c_form_node); //определеяем кнопку предпросмотра
									if(c_form_node.input_preview){ //если она есть...
										c_form_node.input_preview.addEventListener('click',function(){ //обработчик клика
											//alert('preview')
											win.commentForm.sendComment(c_form_node, 'preview', $q('input.preview', c_form_node));
											//приход данных есть, но не идёт дальше (.fireEvent)
										},!1);
									}
									var comment_type = $q('#comment_type', c_form_node).getAttribute('title');
									var c_form_submit = function(){
										//'last_text=='.wcl(c_form_node.last_text, c_form_node['comment[message]'] && c_form_node['comment[message]'].value, win.comment_type);
										if(c_form_node.last_text && c_form_node.last_text == (c_form_node['comment[message]'] && c_form_node['comment[message]'].value) ){
											'--fff-найден дубликат сообщения'.wcl('') //(найден дубликат сообщения)
										}else{
											//TODO изолировать все одинаковые структуры по отображению, если есть
					//win.commentForm.sendComment(c_form_node, comment_type, c_form_node);
											'win.commentForm.sendComment(c_form_node, win.comment_type, c_form_node);'.wcl(comment_type);
											//TODO вернуть всё обратно

											//TODO область Saved_stuff
										}
										return false;
									}
									var postButt = $q('input.post', c_form_node);
									postButt.setAttribute('type','button'); //пассивность кнопки
									postButt.addEventListener('click', c_form_submit,!1); //обработчик клика на отправку
								}
							});
						//'win.commentForm:'.wcl(win.commentForm)
					}
					//'showComm'.wcl(showComm, isQA);
					if(showComm){ //показ комментариев
						var commC2 = $q('.comments.c2', topic);
						$q('.showComm.btnBack:not(.inln)', topic).style.display
							= commC2.style.display
							= $q('.showComm.btnBack.n2', topic).style.display = 'block';
						if(/ noShowYet/.test(commC2.className)){// корректировки отображения после вывода:
							//'comments,topic'.wcl(comments, topic)
							correctCommentsAfter(comments, topic); //кнопки "Отв"; расцветка авторов; поправки дат
							//'authorClicks21'.wcl(commC2)
							authorClicks(commC2); //расст.обраб.кликов по ссылкам
							var cont = $q('div.content', topic);
							//'authorClicks22'.wcl(commC2, cont)
							authorClicks(cont); //обраб кликов по созданному контенту
							handlImgViews(commC2); handlImgViews(cont); //показ увеличенных картинок
							//'authorClicks3'.wcl(commC2)
							commC2.className = commC2.className.replace(/ noShowYet/,'');
						}
					}
					xhr.link.setAttribute('class', xhr.link.className.replace(/ blk2nd/,'')); //снять блок повторного клика
					showSourceLang(topic); //показ языка кодов в подгруженном
				};
				xhr.send(null);
			}else
				this.setAttribute('class', this.className.replace(/ blk2nd/, '')); //снять блок повторного клика
		}catch(er){alert('error_HAjax_showContent()_'+url +' '+ er);}
	}
	$pdsp(ev);
	if(!win.comment_show_reply_form)
		win.comment_show_reply_form = function(){};
	//===== место подключения плагинов для showContent() =======
},
showSourceLang = function(area, addLabels){ //показать язык кода (в блоке показа кода), и подействовать hljs, ес.не addLabels
	if(!area) return;
	if(!area.length)
		area = [area];
	for(var j in area){if(area[j].childNodes){ //подсветка синтаксиса подгруж. блоков (не-Хром)
		var b0a = area[j].querySelectorAll('pre >code');
		for(var i in b0a){if(b0a[i].childNodes){
			var bi = b0a[i]
				biP = bi.parentNode
				,bL = document.createElement('DIV');
			if(win.hljs && win.$ && !addLabels)
				win.hljs.highlightBlock(bi,'    ');
			bL.className = biP.className ='hALang';
			if(biP.parentNode && /content/.test(biP.parentNode.className) && !/html_format/.test(biP.parentNode.className))
				biP.parentNode.className +=' html_format';
			bL.innerHTML = bi.className;
			biP.insertBefore(bL, bi);
	}}}}
},
zenChecked,
extLinks = function(node,oldChk,tops){ //внешние ссылки в новом окне
	if(!hS.extLinks.val || !node) return;
	var links = $qA('a', node)
		,monthRu ='январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь'.split(',');
	for(var i in links){var LI = links[i]; if(LI.attributes && LI.attributes['href']){
		var lH = LI.attributes['href'].nodeValue;
		if(!RegExp('^('+ HRU.replace(/\/\//,'//(\\w+\\.)*').replace(/ahabr/,'(ahabr)?\\') +'|/(?!\/)|#)','i').test(lH) && !/^textDecorationColor/.test(LI.className) ){
			LI.className ='textDecorationColor'+(LI.className ?' '+LI.className:'');
			LI.setAttribute('target','_blank');
			$e({el:'SPAN', ht:"⇗", cs:{color:'#248'}, aft: LI}); //стрелк2 верх-прав
		}else if(/\/(post|blog)\/\d+\//.test(lH) && !/habracut/.test(LI.className)){// посты-даты
			var postNum = (lH.match(/\/(post|blog)\/(\d+)\//) )[2]
				,postY =[1,4909,18277,48215]
				,postYM =[79815,82680,85884,89552,92535,95099,97893,100688,103185,105320,107313,109124
					,111037,112913,114666,116587,118465,120339,123152,125327,127474,129518,131623,133750
					,135593,137388,139154,141161,143096,145002,146858,148825,150655,152897,156927,160927
					,164511,167841,171141,174897,178523,181712,185178,188544,192134,195908,200442,204302
					,207968, 211020, 214000]; //мар.2014 -прогноз
				//.!обновлять каждый месяц, писать последнее число как прогноз
				for(var j = postYM[postYM.length -1]; --j >=0;) //получение примерной даты - 2-й способ
					if(postNum >= postYM[j]){
						var txt = monthRu[j % 12] +' '+ (2010 + (0|j/12)); break;}
				if(j <0)
					for(var k = postY[3]; --k >=0;)
						if(postNum >= postY[k]){ txt = (2006 + k) +'';break;}
			if(!oldChk)
				LI.title = LI.title && txt +'; '+ LI.title || txt;
			else if(LI.className =='post_name'){
				if(j < postYM.length -3 || j == postYM.length -3 && NOWdate.getDate() >5){ //признак новизны статьи, для отметок в "Прямом эфире" (прошлый месяц и старее, но не моложе 5 дней)
					LI.title = LI.title && txt +'; '+ LI.title || txt;
					LI.style.backgroundColor ='#f4f4fa';
				}
				if(tops){ //перенос комментария к лучшим
					//'LI'.wcl(LI,postNum, tops)
					var topComm = tops['p'+ postNum]
						,lsiP = parents(/post_item/, LI);
					if(topComm && lsiP){
						$e({el:'span', ht:' ', apT: topComm});
						$e({el: $q('.count',lsiP), apT: topComm});
						$e({el:'span', ht:' ', apT: topComm});
						$e({el: $q('.user_name',lsiP), apT: topComm.parentNode});
						lsiP.parentNode.removeChild(lsiP);
				}}
			}
		}else if(/\/(qa)\/\d+\//.test(lH) && !/habracut/.test(LI.className)){ //вопросы-даты
			var postNum = (lH.match(/\/(qa)\/(\d+)\//) )[2]
				,postYM =[0,0,0,0,0,0,0,0,1,983,1804,2711 //по 12 чисел с янв 2010
					,3525,4389,5295,6332,7178,8084,9057,9979,10931,11992,13072,14030
					,14973,15959,17004,17983,18936,20058,21103,22184,23422,24724,27161,29583
					,31593,33727,35603,37596,39471,41108,42742,44390,46050,47746,49552,54096]; //дек.2013 qa -прогноз
			for(var j = postYM[postYM.length -1]; --j >=0;) //получение примерной даты - 2-й способ
				if(postNum >= postYM[j]){
					var txt = monthRu[j % 12] +' '+ (2010 + (0|j/12)); break;}
			if(!oldChk)
				LI.title = LI.title && txt +'; '+ LI.title || txt;
			else if((j < postYM.length -3 || j == postYM.length -3 && NOWdate.getDate() >5)
					&& LI.className =='post_name'){
				LI.title = LI.title && txt +'; '+ LI.title || txt;
				LI.style.backgroundColor ='#f2fbf6';}
		}
	}}
},
nameGen = function(len){ len = len || 6; //ген.имён
	var syl ='a,ab,ba,abb,bab,bba'.split(','),L ={a:'aeiouy',b:'bcdfghjklmnprstvwxz'},s ='',sy =''
		,rnd = function(n){return Math.floor(Math.random() * n);};
	wh:while(1){ sy = sy.length ==1 ? syl[rnd(syl.length -1) +1] : syl[rnd(syl.length)];
		for(var i =0; i < sy.length; i++){
			var ab = L[sy.charAt(i) ]; //тип буквы
			s += ab.charAt(rnd(ab.length)); //случайная буква
			if(s.length == len) break wh;
	}}
	return s;
},
haReplace = function(txt){
	var t = hS.chtoBy.val ? txt.replace(/([Чч])то бы(\s)/gi,'$1тобы$2') : txt;
	t = hS.haReplace.val ? t.replace(/хабра/gi,'χ·').replace(/χ·хабр/gi,'χα').replace(/хабр/gi,'χ·') : t;
	return t;
},
byTextNodes = function(node, ff){ //рекурсивный проход по всем текстовым нодам
	if(!hS.haReplace.val)
		return;
	if(node && node.hasChildNodes())
		for(j in node.childNodes){var ch = node.childNodes[j]; if(ch.parentNode){
			if((ch.nodeType ==3 || ch.nodeType ==2 && ch.nodeName =='title') && ch.nodeValue && ch.nodeValue.length >8)
				ch.nodeValue = ff(ch.nodeValue);
			else if(ch.nodeType ==1 || ch.nodeType ==11){
				arguments.callee(ch, ff);
			}
		}}
};
var inFrame = top != window,
scanAliens = function(time){ if(!document && !document.querySelectorAll) return;
	var anyScript = document.querySelectorAll('script'), aL;
	if(anyScript && (aL=anyScript.length))
		for(var i in anyScript) if(anyScript[i].childNodes){
			if(!/(habrahabr.ru\/|apis.google.com\/)/.test(anyScript[i].src))
				anyScript[i].src ='';
			if(/(_gaq|analytics.com|an.yandex.ru|pink.habralab.ru)/.test(anyScript[i].innerHTML))
				anyScript[i].innerHTML ='';
		}
},
checkInZen = function(){
	if($q('#header .userpanel'))
		var cssGet = win.getComputedStyle($q('#header .userpanel'), null);
	if(!cssGet && $q('.panel-personal'))
		cssGet = win.getComputedStyle($q('.panel-personal'), null);
	//for(var i in cssGet)
	//	'getComputedStyle'.wcl(i+' = ', cssGet[i], cssGet.getPropertyValue(cssGet[i]))
	var zenChecked = cssGet && (cssGet.getPropertyValue('z-index')=='10026'); //индикатор подключения юзерстилей ZenComment
	return zenChecked;
},
wwHV =0, //для setTimeout
hView = function(ev){ //просмотр блока (подсказки, меню) по наведению, с удержанием, задержкой
	//blckMajor, blckMinr, sett, fClick, fMsMove
	var tg = ev.currentTarget, tgHVi, hView;
	win.clearTimeout(wwHV);
	win.setTimeout(function(){
		if((tgHVi = tg.getAttribute('data-hView')) || tg.className =='habrAjaxSettings hView'){
			var xywh = $x(getPosition(tg), {w: tg.offsetWidth, h: tg.offsetHeight});
			hView = $e({el: $q('.habrAjaxSettings.hView')||''
				,cl:'habrAjaxSettings hView'+ (tg.className =='group'?' group':'')
				,ht: tgHVi
				,cs:{display:'block', left: xywh.x + xywh.w +'px', top: xywh.y + xywh.h /2 +'px'
					,width: Math.min(320, win.innerWidth - 61 - 320 - 10) +'px'}
				,on:{mouseover: function(){win.clearTimeout(wwHV)}, mouseout: hViewHide}
				,apT: document.body
			});
			hView.style.top = Math.min(win.innerHeight - hView.offsetHeight, Math.max(0, xywh.y + xywh.h /2 - hView.offsetHeight/2 - $q('.habrAjaxSettings >div+div').scrollTop )) +'px'
		}
	},100);
},
hViewHide = function(ev){
	win.clearTimeout(wwHV);
	wwHV = win.setTimeout(function(){
		$e({el: $q('.habrAjaxSettings.hView')
			,cs:{display:'none'} });
	},590);
}
,selS ={} //окружение выделенного текста (всё, что вычислили, исходя из текущего выделения)
,citeS =[] //список цитат данной статьи
,citeA =[]; //список статей, имеющих цитаты в хранилище

(function(){ //внедрение функций GM_... для Хрома, FF4+
	if(!this.GM_getValue || this.GM_getValue.toString && /not supported/.test(this.GM_getValue.toString()) ){
		this.GM_getValue = function(key, deflt){ return localStorage[key] || deflt };
		this.GM_setValue = function(key, value){ return localStorage[key] = value };
		this.GM_deleteValue = function(key){ return delete localStorage[key] };
}})();

hS = hS.get(); //settings; взять настройки из памяти (GM), если есть
if(/\/(conversations|edit|add)\//.test(lh) && !win.opera) //заполнение полей письма
	fillLetter();
var vers = navigator.userAgent.match(/Version\/(\d+)/);
if(vers && vers[1])
	vers = parseInt(vers[1]);
if(!(win.opera && vers >11)) //ручной zenPresent - для Оперы 12+, для остальных скрыть в еастройках
	delete hS.zenPresent.desc;
if(win.getComputedStyle)
	zenChecked = checkInZen();
h.inZen = (typeof zenChecked!=u ? zenChecked : hS.zenPresent.val) || hS.inZen.val;
var ZenNCh = h.inZen && !isChrome; //случаи приоритетности стилей из скриптов в Хроме
//'zenChecked'.wcl(typeof zenChecked, zenChecked && zenChecked.length, hS.zenPresent.val, hS.inZen.val, h.inZen)
strongCutImgMinH = hS.hStrongCut.val;
if(!h.inZen)
	strongCutImgMinH +=50;
var css='body{text-align: inherit!important; font-family: Verdana,sans-serif!important}'
	+'.posts_list .blog_title.small{font-size:14px!important}'
	+'.post div.btnBack, .btnBack{position: relative; height: 12px; margin: 3px 1px 5px 0; padding:0 3px!important; border: 1px solid #b3d2ee;border-radius:3px; font-size: 12px; background: #d3e2f0;color:#8ac;cursor:pointer}.post.qa div.btnBack{border: 1px solid #b4ebee;background: #c4e8ea}'
	+'.content+.btnBack.n2{margin-top:-5px!important}'
	+'.comments.c2{clear: both; position: relative; display:none; border-bottom: 2px solid #fff!important}'
	+'.comments.c2:hover{border-bottom: 2px solid #eee!important}'
	+'.comments.c2:hover >.comment_item:not(:hover){margin-right:-2px!important;border-right: 2px solid #eee!important;background:#eee}'
	+'.comments.c2 .comment_item:hover{background:#fff}'
	+'.comments.c2 >h2.title,.posts_list .comments.c2 >h2.comments-header{'
		+'margin: -0.8em 0 4px!important;padding: 0.5em 0 3px 0.4em!important; border: 1px solid #e8e8ee!important;-moz-border-radius: 8px;-webkit-border-radius: 8px; border-radius: 8px; background-color: #f0f0e7!important}'
	+'.comments.c2 h2.title span,.comments.c2 h2.comments-header span{position: relative;margin-bottom: 32px;height: 34px;font-size: 26px;vertical-align: 0%}'
	+'h2.title .subscribe_comments{font-size: 12px!important}'
	+'#wrapper .comments.c2 >h2.title{margin: 0 0 4px 6px!important;}'
	+'.comments_list .comment_item .reply_comments{margin-top:10px!important}'
	+'.comments.c2 >.comment_item,#wrapper .comments.c2 .reply_comments >.comment_item,.content_left .comments.c2 .reply_comments >.comment_item{'
		+'position:relative;margin-top: 8px!important;margin-left: -4px!important;padding-top: 0!important;padding-left: 24px!important}'
	+'#wrapper .comments.c2 >.comment_item,.content_left .comments.c2 >.comment_item{'
		+'margin-left: -24px!important;border-left: 1px solid #dddde2!important}'
	+'.comments.c2 .info{height:16px}'
	+'.comments.c2 .info a.username{top:-11px!important;margin-top:-5px!important}'
	+'.post.qa .comments.c2 .answer .info a.username{position:relative}'

	+'.post.qa div.posts .comments.c2 #answers .answer .info time{top:0!important}'
	+'.comments.c2 .info time{position:relative; top:'+(h.inZen?-10:0)+'px!important}'
	+'.comments.c2 >.comment_item:hover .info .voting{display:block!important}'
	+'.comments.c2 >.comment_item:hover .comment_item:not(:hover) .info a.username'
		+',.comments.c2:hover >.comment_item:not(:hover) .info a.username'
		+',.comments.c2 >.comment_item:hover .comment_item:not(:hover) .info time'
		+',.comments.c2:not(:hover) .reply >a.reply_link'
		+',.comments_list:not(:hover) .reply >a.reply_link'
		+',.comments.c2:hover >.comment_item:not(:hover) .reply >a.reply_link'
		+',.comments_list:hover >.comment_item:not(:hover) .reply >a.reply_link'
		+',.comments.c2 >.comment_item:hover .comment_item:not(:hover) a.reply_link'
		+',.comments_list >.comment_item:hover .comment_item:not(:hover) a.reply_link{visibility:hidden}'
	+'.comments.c2 >comment_item_plain >.comment_item .info time'
		+',.comments.c2 >.comment_item:hover .info time'
		+',.comments.c2 >.comment_item:hover .reply a.reply_link{visibility:visible}'
	+'.content.c2 table{width: 100%; margin: 6px 0!important; border: 1px solid #ccc; clear: both; border-collapse: collapse; border-spacing: 0}.content.c2 table td, .content.c2 table th{border: 1px solid #ccc; padding: 2px 3px!important}.content.c2 .polling table.result,.content.c2 .polling table.result td{border:0}'

	+'.eventLine .eventHid, .eventLine .date{visibility:hidden}.eventLine:hover .eventHid, .eventLine:hover .date{visibility:visible}'
	+'.eventLine .date{color:#999}'

	+'.commInfo{position: absolute; z-index: 4; display: inline-block; visibility:hidden; left:0; max-width:43px; margin-top: 6px; border: 1px dotted #d97;'
		+'-webkit-transition:visibility 0s linear 1s,opacity 1s linear;'
		+'-moz-transition:visibility 0s linear 1s,opacity 1s linear;'
		+'-o-transition:visibility 0s linear 1s,opacity 1s linear;'
		+'opacity: 0;}'
	+'.title:hover .commInfo{visibility:visible; opacity: 1; transition-delay:0s;}'
	+'.commInfo .root{display: inline-block; margin: 1px 0 1px 2px; text-decoration: none; line-height:4px; white-space: normal;}'
	+'.commInfo .overLink{line-height:6px; white-space: nowrap'+(isChrome?';font-size:0':'')+'}'
	+'.commInfo .overLink:hover{background-color:#eee}'
	+'.commInfo .root .nCom{display: inline-block; background:#9ab;opacity:0.7}.commInfo .root .nLin{display: inline-block; margin-left: 3px; background:#88c;opacity:0.7}'
	+'.commInfo .root .nP{display: inline-block; background:#7d7;opacity:0.8}.commInfo .root .nM{display: inline-block; margin-left: 3px; background:#c87046;opacity:0.8}'
	+'.commInfo .links.root{min-height: 4px; vertical-align: top}'
	+'.commInfo .imgs.root{min-height: 6px; vertical-align: top}'
	+'.commInfo .links.root .lnk{display: inline-block; width: 5px; height: 2px; margin:1px 0 0 1px; line-height:2px; vertical-align: top; border:1px solid #24f}'
	+'.commInfo .links.root .imgL,' //перекраска для просмотра
	+'.commInfo .imgs.root .imgL{display: inline-block; width: 6px; height: 4px; margin:-1px 0 -1px 1px; line-height:4px; vertical-align: top; border:1px solid red; background-color:#ff4}'
	+'.commInfo .links.root .lnk:visited{border:1px solid #e4d}'
	+'.comment_item .info .branch,.answer .info .branch{Visibility: hidden; position: relative; top:-7px; text-decoration: none}'
	+'.comment_item .info:hover .branch,.answer .info:hover .branch{Visibility: visible}'

	+'.post div.btnBack.inln{display: inline-block; vertical-align: middle; overflow: hidden; height: 14px; line-height: 14px!important; margin: 0 2px 3px}'
	+'.post .btnBack:not(.inln):not(.n2){position: relative;z-index: 1}'
	+'.post .content .percent,.post .btnBack .percent,.post .btnBack >i{display: inline-block;vertical-align:top; line-height:10px}'
	+'.post .content .percent{font-size:12px;color:#8ac}'
	+'.post .content .gPercent,.post .btnBack .gPercent'
		+'{display: inline-block; width: 100px; height: 10px; vertical-align: top; margin-left: 9px; border: 1px solid #b3d2ee; background-color: #ecefee; cursor: pointer}'
	+'.post .content .gPercent div,.post .btnBack .gPercent div'
		+'{display: inline-block; height: 10px; vertical-align: top;border-right: 1px solid #b3d2ee; background-color: #e0e5e8}'
	+'.post .content .gPercent div{background-color: #f4f8fb}'
	+'.post .dblAuthor .published{float:none}'
	+'.showComm.btnBack:not(.inln), .showComm.btnBack.n2{display: none; clear: both}'
	+'.showComm.btnBack:not(.inln):not(.n2){margin-top: 22px}'
	+'.showComm.btnBack.n2 .percent0{float:right} .showComm.btnBack.n2 .percent{vertical-align: top; border: 1px solid #b3d2ee; margin: -1px 3px 0; padding: 0 13px 1px; line-height:11px; background-color: #ecefee}.post.qa .showComm.btnBack.n2 .percent{border-color:#b5e5e7; background-color: #d7eeef}'
	+'#poxupih a{color:#7ab}.gertuik{font-size: 16px!important;color:#eee}'
	+'#header .main_menu a.date{display:inline-block; text-align:center; text-decoration: none!important; font: 11px/8px Verdana,Tahoma,sans-serif!important;'+ (ZenNCh?'margin: 11px 6px 0 -1px!important; color:#479!important':'')+'}'
	+'#header .search form input[type="text"]{margin-right: 21px;}'
	+'#header .search form input[type="submit"],.panel-search .in-submit{display:none;clear: right;float: right!important;margin: 0 0 0 -21px!important}#header .search:hover form input[type="submit"],.panel-search:hover .in-submit{display:block}'
	+'.panel-search .panel-search-label{margin-right: 24px}.panel-search .js-autosuggest-output-container{clear: left!important}'

	+'.comments.c2 .answer >.comments >.comment_item{padding-left: 4px!important}'
	+'.content.c2 .clarification >.comments >.comment_item{border-left: 4px solid #ddd}'
	+'#layout img[align="middle"],#layout img[align="center"]{display:block;margin:0 auto 2px!important}' //Fx fix
	+'.comments.c2{position: static!important;overflow: visible!important;min-height: 2em; padding-left: 32px!important;border-right: 2px solid #fff!important;background:#fff}'
	+'#header .userpanel:hover .habrauser-newmail{margin-right: -4px!important; margin-left: 6px!important}'
	+'.header .user_panel +.logo{margin:0!important; background-position:0 0!important; width:75px!important; height:71px!important}'

	+'.comments.c2 .answer-sort{padding: 3px 0 5px 25px!important}'
	+'.comments.c2 .info-text{display:none!important}'
	+'.comments.c2 h2.comments-header{margin:0 0 0 -12px!important}'
	+'.comments.c2 .comment-preview{font: 1.08em Verdana,sans-serif!important}'
	+'.info a.link_to_comment{float:right;position:relative;visibility:hidden;left:35px}.comments.c2 .answer .info a.link_to_comment{margin-top:0}.comment_item .to_parent,.comment_item .show_tree{display:none!important}.info:hover a.link_to_comment{visibility:visible}'
	+'.hAjaxLogo{position: relative; z-index: 6; float: right; width:0; height: 32px; opacity: 0.6}.hAjaxLogo:hover{opacity: 1}.hAjaxLogo .hLogo{position: absolute; float: right; right: 0; min-width: 32px; height: 32px; border-radius: 5px; background-color: #6e96ca; color: #e0e4e8; cursor: pointer}.hAjaxLogo span.hLogo{padding: 2px 3px!important}.hAjaxLogo:hover .hLogo{background-color: #c42;color: #fcb}#reg-wrapper{padding-right:10px;}#reg-wrapper .hAjaxLogo{margin-top:16px}'

	+'.comments.c2 .comment_holder .mark{left:0}'
	+'.g-plusone >iframe[id^="I"][src^="https://plusone.google.com"]{display:block!important;width:width:24px!important; margin-right: 6px!important}'
	+'.infopanel .g-plusone,.infopanel div[id*="__plusone"]{float: left!important;overflow:hidden; width: 24px!important; margin-top: 5px!important; margin-right: 6px!important}.infopanel >.g-plusone:hover{overflow:inherit}'

	+'.infopanel >.g-plusone +.likes{position: relative; float: left; left: -33px; width: 0; height: 16px; padding: 0!important; text-align: center}'
	+'.infopanel >.g-plusone +.likes >div{float: none; width: 30px; height: 10px; margin-top: '+(isChrome?8:2)+'px!important; padding: 0; line-height: 10px; font-size:12px;}'
	+'.infopanel >.g-plusone +.likes >div >div{display: inline-block; float: none; min-width: 12px; height: 10px; line-height: 10px; padding: 0; padding-left: 2px!important; background: #efefef!important; border-radius: 2px}'
	+'.infopanel >.g-plusone:hover +.likes{display: none}'//, .infopanel >.g-plusone +.likes:hover
	+'.comments.c2 .answer .info .accept_link.accepted .reject{position: relative; top:-10px; display:inline}'
	+'.answer .info .accept_link.accepted .reject .label{padding:1px 3px;font-weight:normal; background:#84B18A;color: white}.answer .info .accept_link span.accept span.label, .answer .info .accept_link .reject{display:none}.answer .info .accepted, .answer .info .accept_link{display:inline-block!important; position:relative; height: 12px; margin-top:0!important}'
	+'.comment_item .info .comma,.answer .info .comma{display:none!important}'
	+'.content_left .post .infopanel.qa{position:relative;left:9px;top:'+(h.inZen?'-':'')+'3px;min-width:0;margin-bottom:-4px!important;border:1px dotted #f0f9f3;background-color:#fafdfb}'

	+'#comment_form .panel .spanned, #comments_form .panel .spanned, .clarify_form .panel .spanned, .add_answer_form .panel .spanned,.editor .panel .spanned{display:block; float:left}'
	+'.editor .panel .spanned{padding: 0!important}'
	+'.panel .langs, .panel .langs2,.panel .colrs{display: none; position: absolute; top:-6.3em; left: 6em; padding: 2px; text-align: center; background: #EAECEA; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; opacity:0.8}.tm-form.ajax .panel .langs{left:22em}'
	+'.panel .langs b, .panel .langs2 span, .panel .colrs span{display: inline-block; margin: 0; padding: 2px 8px; line-height: normal!important; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; cursor: pointer}'
	+'.panel .colrs{top:-6.3em;left:7.6em;line-height:1!important; white-space: nowrap;background: #fff}.panel .colrs span{min-width:3ex;padding: 0 1px;line-height:1!important}.panel .colrs:hover{opacity:1}'
	+'.panel .langs b:hover, .panel .langs2 span:hover{background: #fff} .panel .colrs span:hover{background: #eee}'
	+'.panel .langs i{display: inline-block;}'
	+'.panel .langs2{text-align: left;z-index: 12; white-space: nowrap; opacity:1}'
	+'.panel .langs2 span{padding: 2px; font-weight: normal}.panel .langs2 span:nth-child(even){color:#00a}'
	+'pre.hALang{position: relative; margin-top:-0.5em; padding-top:0.5em;}pre >.hALang{position: absolute; top:0; right:'+(h.inZen?5.7:1)+'em; padding: 0 4px 1px; border: 1px solid #e1e1e8; border-radius: 4px; background: #f1f1f3; line-height: 0.8; color:#aaa}pre:hover >.hALang{display:none}'

	+'.powerCut{max-height: '+(strongCutImgMinH*2 +4)+'px; overflow-y: auto!important;padding-right:3px!important; padding-bottom:1px!important}'
	+'.content.powerCut .pressed{line-height: '+(h.inZen ? 1.08 : 1.24)+'!important}'
	+'.content.powerCut .showComm img{margin-top:-1px!important}'
	+'.post .content.powerCut blockquote{clear:none}'
	+'.content.powerCut img{clear:right; max-width: '+(strongCutImgMinH*2)+'px;  max-height: '+strongCutImgMinH+'px; margin-top:2px!important}'
	+'.powerCut img:not([align]){float:right; margin-left:6px!important}'
	+'.powerCut img[align="center"], .powerCut img[align="middle"]{float:left; clear:left; padding-right:6px!important; padding-left:6px!important; border-left: 1px dotted #aaa!important}'
	+'.strongCutImgPlace{border:1px solid #99e; min-width:14px; float: right; margin: -4px -1px -1px 2px; padding: 0 1px 0 3px; background: #ee6; opacity: 0.3}#layout img.youtub,#wrapper img.youtub{border-left: 3px dotted #833!important}'
	+'.powerCut +.tags{max-height: 1.5em; overflow:hidden}.powerCut +.tags:hover{overflow:inherit}.powerCut +.tags li{position:relative; z-index:2}'
	+'textarea{font: 12px/15px Verdana,Arial,Helvetica,sans-serif!important;resize:vertical!important}'
	//нотификатор, панель цитат
	+'.noteBar{display:none;position: fixed; overflow: auto; min-width: 96px; max-width: 65%; top: 0; left: 96px; min-height: 20px; max-height: 250px; margin:-5px 0 0!important; padding: 1px 4px 0!important; border: 1px solid #999!important;border-radius:5px; z-index: 3025;background-color: #dcc;font-size: 13px; opacity:0.85}'
	+'.noteBar .closeButt{float:right; margin-right:-3px!important; padding: 0 2px!important; border: 1px solid #999!important;border-radius:5px;cursor: pointer}'
	+'.noteBar .list:nth-child(2){margin-right:16px!important}.noteBar .notes{margin:0!important}'
	+'.noteBar .notes .note{color:#622}.noteBar .notes a{color:#a66}.noteBar .notes img{padding-top:3px; vertical-align: baseline}.noteBar .delim{height: 2px; background:#a88}'
	+'.noteBar .hlp{text-indent:2em; margin:0 2px 1px;padding:0 3px; background:#f6f8fa}'
	//контекстное меню для цитат (выделений текста)
	+'.citeBtns{position: absolute; display: none; z-index: 101; width: 3em;-webkit-user-select: none;-moz-user-select: -moz-none;-o-user-select: none; user-select: none}'
		+'.citeBtns .citeCmdBase{position: relative; left:-3px;width:2.5em; opacity:0.5}'
		+'.citeBtns:hover .citeCmdBase{opacity:1}'
	+'.citeBtns button{display:none; margin:0!important; padding: 0 2px!important;background-color:#e6dada; border-width: 1px;border-radius:3px}'
	+'.citeBtns button:first-child{display: block}'
	+'.citeBtns .citeCmdBase button{float: left; width: 2.5em; margin: 0 3px}'
	+'.citeBtns .citeTxTa{position: relative; display: none; min-height: 26px; margin:-22px -2em -4px;}' //буфер для перетаскивания
		+'.citeBtns .citeTx{position: absolute; text-align: center; bottom: 12px; min-height: 1.4em; margin: 0 -10em 0 -7em; padding: 0 2px 0 3px; border: #bbb dotted 1px; background: #f8f7f5; opacity:0.9}' //блок цитат
		+'.citeBtns .citeLst{position: absolute; left: -1px; text-align: left}'
		+'.citeBtns .citeLst2{border: 1px solid #ddd; background: #f8f7f1}'
		+'.citeBtns .citeLst .cite{margin:0 1px; padding; 1px 2px; border: 1px solid #ddd; background: #f8f7f1}'
			+'.citeBtns .citeTx .selText{position: relative; left: 1.1em; padding: 0 3px!important; background: #fae7e5;}'
		+'.citeBtns .citeTa{position: absolute; bottom:-2px; margin: 0 10px!important; min-height: 1.4em;}' //буфер д.перетаск.
			+'.citeBtns .citeTa .ta, .citeBtns .citeTa .taAbs {position: relative; bottom: 0; min-height: 1.4em; margin: -1px; margin-top:-2px; padding-left: 2px; padding-bottom: 2px; border:#bbb solid 1px; background:#f5f7f8; opacity:0.9}'
			+'.citeBtns .citeTa .taAbs{position: absolute; left: -10098px; opacity:1}'
			+'.citeBtns .citeTx,.citeBtns .citeTa .ta {-webkit-user-select: text; -moz-user-select: text;-o-user-select: text; user-select: text}'
	+'.citeBtns .citeCmdTop{height: 6px; cursor:move}.citeBtns .citeCmdTop:hover{border-color:#137; background-color:#137}'
	+'.citeBtns .pre{border-color:#dae4da; background-color:#dae4da}'

	+'.citeBtns .citeCmdLeft{position:absolute; display:none; float: left; width: 1px}'
	+'.citeBtns .citeCmdLeft button{position:relative; display: block; float: right}'
	+'.citeBtns .citeCmdRight{position:absolute; display:none; float: right; width: 1px; margin-left: '+(isFx?'2.2':'2')+'em}'
	+'.citeBtns .citeCmdRight button{position:relative; display: block; float: left}'
	+'.citeBtns:hover .citeCmdLeft, .citeBtns:hover .citeCmdRight, .citeBtns:hover button{display:block}'
	+'.citeBtns .hov button{display:none}.citeBtns .hov:hover button{display:block}'
	+'.citeCmds2{}' //2-й плавающий блок
	//подсветки выделений текстов для цитирования:
	+(hS.contextSelect.val ?'.content::-moz-selection{background-color: #66e;color:#fff} .content::selection{background-color: #66e;color:#fff}'
		+'.content *::-moz-selection{background-color: #33b;color:#eef} .content *::selection{background-color: #33b;color:#eef}'
		+'.message::-moz-selection{background-color: #c96;color:#fff} .message::selection{background-color: #c96;color:#fff}'
		+'.message *::-moz-selection{background-color: #963;color:#fee}.message *::selection{background-color: #963;color:#fee}'
		+'.comment_item .text::-moz-selection{background-color: #c98;color:#eff}.comment_item .text::selection{background-color: #c98;color:#eff}'
		+'.comment_item .text *::-moz-selection{background-color: #965;color:#ffe}.comment_item .text *::selection{background-color: #965;color:#ffe}' //под-ответы в QA
	:'')+'.textDecorationColor{text-decoration: underline;text-decoration-color:#248!important}'
	+'.content_left .similar_posts .even,.content_left .similar_questions .even{width:99%}.content_left .similar_posts .even .post_item,.content_left .similar_posts .when,.content_left .similar_questions .even .post_item{padding:0 3px;border-radius:3px;background:#f2f2f2}.content_left .similar_posts .even .when{background:#f8f8f8}'
	+'.content_left .similar_posts .posts_list .post_item:nth-child(4n+1),.content_left .similar_questions .posts_list .post_item:nth-child(4n+1){clear:none!important}'

	+'.tutor1{display: inline-block; position: relative; top:-2px; height: 1.2em; margin:0 -2px 0 1px; padding: 0 0 0 3px; border-bottom: 1px solid #ffc3dd; border-bottom-left-radius: 2px; border-top-left-radius: 2px; line-height: 1em; font-size: 10px; background-color: #ffc3dd;color: #ffc3dd}'
	+'.tutor2{position: relative;left: 0.2em;float: right;width: 1px; height: 1px; border-color: #ffc3dd #fff #ffc3dd #ffc3dd; border-style:solid; border-width: 0.6em 0.5em 0.6em 0;}'
	+'.tutor3{color: #d36992;position: absolute;}'

	+'.decision1{display: inline-block; position: relative; top:-2px; height: 1.2em; margin:0 -2px 0 1px; padding: 0 0 0 3px; border-bottom: 1px solid #d4ecb2; border-bottom-left-radius: 2px; border-top-left-radius: 2px; line-height: 1em; font-size: 10px; background-color: #d4ecb2;color: #d4ecb2}'
	+'.decision2{position: relative;left: 0.2em;float: right;width: 1px; height: 1px; border-color: #d4ecb2 #fff #d4ecb2 #d4ecb2; border-style:solid; border-width: 0.6em 0.5em 0.6em 0;}'
	+'.decision3{color: #684;position: absolute;}'

	+'.sand1{display: inline-block; position: relative; top:-2px; height: 1.2em; margin:0 -2px 0 1px; padding: 0 0 0 3px; border-bottom: 1px solid #eeedd8; border-bottom-left-radius: 2px; border-top-left-radius: 2px; line-height: 1em; font-size: 10px; background-color: #eeedd8;color: #eeedd8}'
	+'.sand2{position: relative;left: 0.2em;float: right;width: 1px; height: 1px; border-color: #eeedd8 #fff #eeedd8 #eeedd8; border-style:solid; border-width: 0.6em 0.5em 0.6em 0;}'
	+'.sand3{color: #8c896b;position: absolute;text-decoration:none;border-bottom:1px dotted #aa8}'

	+'.trans1{display: inline-block; position: relative; top:-2px; height: 1.2em; margin:0 -2px 0 1px; padding: 0 0 0 3px; border-bottom: 1px solid #b3d5ea; border-bottom-left-radius: 2px; border-top-left-radius: 2px; line-height: 1em; font-size: 10px; background-color: #b3d5ea;color: #b3d5ea}'
	+'.trans2{position: relative;left: 0.2em;float: right;width: 1px; height: 1px; border-color: #b3d5ea #fff #b3d5ea #b3d5ea; border-style:solid; border-width: 0.6em 0.5em 0.6em 0;}'
	+'.trans3{color: #6a7fa3;position: absolute;}'

	+'.recov1{display: inline-block; position: relative; top:-2px; height: 1.2em; margin:0 -2px 0 1px; padding: 0 0 0 3px; border-bottom: 1px solid #f4ddae; border-bottom-left-radius: 2px; border-top-left-radius: 2px; line-height: 1em; font-size: 10px; background-color: #f4ddae;color: #f4ddae}'
	+'.recov2{position: relative;left: 0.2em;float: right;width: 1px; height: 1px; border-color: #f4ddae #fff #f4ddae #f4ddae; border-style:solid; border-width: 0.6em 0.5em 0.6em 0;}'
	+'.recov3{color: #a28546;position: absolute;text-decoration:none;border-bottom:1px dotted #b97}'
	+'#write_message_form [name=recipients]::-moz-selection{background-color: #66e;color:#ffa} #write_message_form input[name=recipients]::selection{background-color: #66e;color:#ffa}'

	//поддержка отсутствия стилей:

	+'.content_left .post h1.title .post_title{display: inline-block;margin: -1px -3px!important; padding: 0 2px 1px 3px!important; border-radius: 2px;background-image: none!important}h1{letter-spacing:0!important}'
	+'.content_left table.menu .profile a{position:relative; z-index:2; opacity:0.4}'
	+'.content_left table.menu .profile a:hover{opacity:0.9}'
	+'.content_left .post{margin: 12px 0 32px !important;overflow: inherit !important}'
	+'.content_left .posts .post.qa{margin:2px 0 8px!important}'
	+'.content_left .company_post .post{margin-bottom: -5px!important}'
	+'.company_header .company_icon img{position: absolute; margin-top:'+(h.inZen?29:43)+'px!important}'
	+'.content_left .post h1.title{margin: 3px 0 -3px!important;font: 16px/188% normal Verdana,Tahoma,sans-serif!important}'
	+'.content_left .post h1.title .post_title{	line-height: 16px;font-size: 16px;text-decoration: none!important;color: #48a!important}'
	+'.post h1.title a.post_title[href*="/qa/"]{font-size: 13px!important;font-style:italic!important;color: #699!important}'
	+'.post h1.title .locked{background-position: 2px 0px!important}'
	+'.sidebar_right .block .all a:visited,.content_left .post h1.title .post_title:visited{color: #b99!important}'
	+'.content_left .company_post h1.title .post_title{font-size: 18px!important;font-weight: normal}'
	+'.content_left :not(.company_post) .post h1.title .post_title:hover{color: #84b18a!important}'
	+'.content_left .post .hubs{float: right; position: relative; z-index:2; margin: 1px 8px 2px -12px!important;opacity: 0.7; background: 0 0!important; color: transparent!important}.content_left .hubs +.content{clear: both}'
	+'.content_left .hubs .profiled_hub{display: inline-block; vertical-align: top!important; height: 9px!important; margin:0 -4px 0 1px!important; font-size:5px!important; background-color: #cbd6ce}'

	+'.content_left .stats{margin-left: 3em}.content_left .stats .item{display: inline-block}'
	+'.content_left .stats .item a{padding:0 2px; font-style: italic; color:#668}.content_left .stats .item a:hover{color:#4D7285}'
		+'.content a,.content_left .comments_list a,.comments.c2 a,.answers a{color:#497da5!important}'
		+'.content a:hover,.comments_list a:hover,.comments.c2 a:hover,.answers a:hover{color:#4d7285!important}'
	+'.comment_item .info .voting{float: right; margin: 2px 0 -6px!important; padding-right: 16px; position: relative}'
	+'.comment_item .info a.avatar{position: relative; float: left; top:-8px; margin-right: 10px!important; padding-top: 5px!important}.comment_item .info a.avatar{padding-top: 0!important}'
	+'.comment_item .info a.avatar img{width:24px;height:24px}'
	+'.qa_view .answer .reply a.reply_link, .comment_item .reply a.reply_link, .comment_holder .reply a.reply_link{ -moz-transform: rotate(-90deg);-o-transform: rotate(-90deg);-webkit-transform: rotateZ(-90deg);transform : rotate(-90deg); -moz-transform-origin: 0 20px; -o-transform-origin: 0% 20px;-webkit-transform-origin: 0% 20px; -moz-box-shadow: inset 2px -2px 3px #dde;-webkit-box-shadow: inset 2px -2px 3px #dde;box-shadow: inset 2px -2px 3px #dde; border-bottom: 2px solid transparent !important; border-radius:4px; color: #acc!important; display: inline-block; height: auto; left:0; opacity:0.5; padding: 1px 1px 0!important; position: relative; top:-14px; width:auto}'
	+'.reply .edit_link,answer .edit_link{position: relative; z-index: 1; top:-5px; margin-top: 0!important}'
	+'.qa_view .answer .reply a.reply_link:hover, .comment_item .reply a.reply_link:hover{opacity:1}'
	+'.vote .positive,.voting .positive{color: #390!important}.vote .negative,.voting .negative{color:#c00!important}'
	+'.comment_holder .vote{top: -3px}.comment_holder .reply{height:0}'
	+'.translation .topic,.podcast .topic,.link .topic{background-position: 0 0!important}'
	+'.answers .answer .message{padding-left: 5px!important}'
	+'.search-results{margin: 30px 0 0 -22px!important;padding-left: 22px!important}'
	+'.content_left .qa_view .answers >h2.title,.comments_list .answer-sort,body.company .comments_list h2.comments-header,.content_left .comments_list h2.title{max-width: 1200px;padding: 15px 0 2px 25px!important;border-radius:8px;background: #f0f0e7!important;'+(ZenNCh?'margin:0 -3px 0 -17px!important;':'')+(h.inZen?'border: 1px solid #e8e8ee!important':'border-radius:16px;box-shadow: 0 0 8px #fff inset, 0 0 6px  #eed!important')+'}'
	+'.comments.c2 .answer .info .voting{position: relative; float: right; top:-6px; margin-right: 7px; margin-top: 4px;padding-right: 36px} .comments.c2 #answers div.reply, .content.c2 .clarification .clarify_the_issue{display: none}'
	+'.comments.c2 .comment_item .info div.voting{top:'+(h.inZen?3:'-2')+'px}'
	+'.answer >.message, .answer >.comments >.comment_item{padding-left: 4px!important}'
	+'.comments.c2 .answer >.message{padding-top:2px!important; line-height: 1.22}'
	+'.clarification .comments .comment_item{margin: 0 0 2px 19px !important; min-width: 78%; padding: 0 2px 0 5px !important}'
	+'.comments_list{overflow:visible!important; margin-top:50px!important; padding-left:17px!important; padding-right:3px!important}'
	+'.comment_item .info a.favorite{visibility:hidden}'+(h.inZen?'':'.comment_item .info:hover a.favorite,')+'.comment_item .info a.favorite:hover{visibility:visible}'

	+'#js-field-holder-with-help{overflow: inherit!important}'
	+'.editor .panel{position: relative!important; overflow: inherit!important; z-index: 11; width: 98%!important; min-height: 22px}'
	+'.editor .panel .wysiwyg_wrapper{float:left}.panel select.with-title{display:none!important}'
	+'.editor .panel .can_use_html{right: -4px; position: absolute; z-index:10; white-space: nowrap; color: #999!important}.editor .panel .can_use_html a{position: relative; z-index: 12}'
	+'.habrAjaxSettings{position: fixed; display: none; text-align:left; left: 61px; top: 47px; width: 320px; padding: 1px 2px 4px 2px; border: 1px solid #668; font-size:12px; background: #eee; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;z-index: 1001}'
	+'.habrAjaxSettings .group{margin: 1px 1px 1px -6px; padding: 2px 2px 2px 8px; font-weight: bold; background:#ddd}'
	+'.habrAjaxSettings .sett{padding-left:6px}.habrAjaxSettings .sett:hover{background:#f4f4f4}'
	+'.habrAjaxSettings input[type="checkbox"]{position:relative; margin:1px; top:3px}'
	+'.habrAjaxSettings span{border:2px solid transparent; border-radius:2px}'
	+'.habrAjaxSettings span.latest{margin-right:2px; border-color:#ca9!important} .habrAjaxSettings span.latest input{margin-top:-2px!important}'
	+'.habrAjaxSettings span.notChecked ~label{color:#999}'
	+'.habrAjaxSettings >div>div:not(:first-child) label:hover{border-bottom:1px dotted #bbb}'
	+'.habrAjaxSettings.hView{padding-left: 6px}.habrAjaxSettings a{color:#25a}.habrAjaxSettings a:hover{color:#57a}.habrAjaxSettings.hView.group{background: #ddd; padding: 6px 0 8px 7px}'

	+'a.hADotted{text-decoration: none; border-bottom:1px dotted transparent}a.hADotted:hover{border-bottom:1px dotted #69d}.hADotted.note{color:#d00}'
	+'.qa_view .answers >.title tt tt,.comments-header tt tt,.comments_list >.title tt tt,.comments.c2 >.title tt tt{padding: 1px 5px 0; font-size: 14px!important; color: #666;-moz-border-radius:3px; -webkit-border-radius:3px; border-radius:3px}.qa_view .answers >.title tt i,.qa_view .answers >.title tt,.comments-header tt i, .comments-header tt,.comments_list >.title tt i,.comments_list >.title tt,.comments.c2 >.title tt i,.comments.c2 >.title tt{font-size: 9px}'
	+'.comment_item .message{margin-left:-4px!important;'
	+'  margin-right:-3px!important; padding: 0 3px 0!important;border-left:4px solid transparent}'
	+'.comments.c2 .voting .plus, .comments.c2 .voting .minus, .comments.c2 .comments_form,#wrapper  .comments_form,.comments.c2 .add-comment, .comments.c2 .sort{display:none}'//TODO до починки ввода
	+'.info a.username,.comments >.comment_item span.username a{color: #569!important;letter-spacing: 1px}'
	+'.info a.username{line-height: 11px!important;'+(ZenNCh?'margin:6px 8px 0 2px !important;':'')+'padding:0 3px 1px 4px!important;border-radius:4px;text-decoration: none!important;font-size: 10px!important;font-weight:normal!important}'
	+'#wrapper .comments.c2 .info{position: relative}'
	+'.comments.c2 .comment_item >span.info{background:url("'+HRU+'/i/bg-user2.gif") no-repeat 1px 7px!important; font-size: 11px; font-weight: bold; padding-left: 14px;}'
	+'.comments .comment_item >span.info a{padding:0 3px 1px 4px; border-radius:3px; color:#666!important}'
	+'.userpanel .count,.user_panel .count,.userpanel .bottom a.newmail,.user_panel .bottom a.newmail{display: inline-block!important; margin: 0 4px!important; background-color: #eee!important; background-position: 3px 3px!important; padding: 0 4px 1px!important; font-weight: bold!important; color: #d63!important; border: 1px solid #999!important;border-radius:5px}.userpanel .count[href*=tracker],.user_panel .count[href*=tracker]{color: #68a!important}.userpanel:hover .count,.user_panel:hover .count{border: 1px solid #999!important}.userpanel .count:empty,.user_panel .count:empty{display: none!important}'
	+'.panel-personal dd a.habrAjaxSettButt, #header .userpanel a.habrAjaxSettButt, #header .user_panel a.habrAjaxSettButt{display: none}'
	+'.panel-personal:hover dd a.habrAjaxSettButt, #header .userpanel:hover a.habrAjaxSettButt, #header .user_panel:hover a.habrAjaxSettButt{display: inline-block}.userpanel .charge a,.user_panel .charge a{margin: 0 3px!important; text-decoration:none}'
	+'.editor .panel a{display: inline-block!important;float:none!important;min-width: 20px;height: 20px;line-height:18px;padding: 0 6px!important;text-decoration: none!important;margin: 0!important;border-radius:5px}'
	+'.editor .panel .can_use_html{margin-top:0!important}.editor .panel{padding: 2px 5px 0!important}'
	+'.editor .panel >.wysiwyg_wrapper >a:hover,.editor .panel >div >b >a:hover,.comment_item .reply .editor .panel >div >a:hover,.qa_view .editor .panel >div >a:hover,.content_left #comments_form .editor .panel a:hover{background:#fff}'
	+'.post .infopanel >div.informative{background:#f4eced!important;padding:0!important;border-radius:4px}'
	+'.post .infopanel >div.informative:not(.positive) a, .post .infopanel >div.informative.ans1 a{padding:3px 10px 4px!important}' //+с 1 ответом
	+'.post .infopanel >div.informative a{padding: 3px 4px 4px!important}.post .infopanel >div.informative.positive a{color:#274!important}'
	+'.post .infopanel >div{line-height:20px!important}.post .infopanel .voting{margin: 2px 26px 2px 0!important}.post .infopanel .voting a.plus{z-index: 5}'
	+'.post .infopanel .original-author,.post .infopanel .author,.post .infopanel .comments{padding-top:2px!important;padding-bottom:3px!important; font-weight:normal!important}'
	+'.infopanel .original-author a{font-size:12px!important; color:#a33!important}.post .infopanel .author a{font-size:12px!important}'
	+'.post .infopanel .comments{margin-left:8px!important; background-position:4px 7px!important;'+ (ZenNCh?'padding:0!important;background-color:#f4f6ff!important':'')+'}.post .infopanel .comments a{display: inline-block;padding:2px 4px 3px 21px!important;font-size:12px!important}'
	+'.post .infopanel .informative.positive,.post .infopanel .informative.accepted{background:#dff3ec!important}'
	+'.post .infopanel .informative.accepted a{color: #8b9!important}'
	+'.i-am-your-father-luke .post .infopanel{width: 94%; margin: 3px 0 0 4px!important;border: 1px solid #ddd;letter-spacing: -1px;border-radius: 5px;font-size:11px;line-height:1.7}'
	+'p img[src*="error-404-monster"]{display:none}#write_message_form, #write_message_form .item{margin-bottom:0!important}'
	+'#write_message_form label[for="text"]{display:none!important}'
	+'.rotated_posts .rotTRow a{display: table-cell; padding:0 12px 4px!important; text-align: center;text-decoration: none!important; font-size: 13px!important; line-height:1.1!important}'
	+'.rotated_posts .rotated_post{display:none!important}.rotated_posts .rotTRow a span{position:relative}'
	+(isChrome?'.content_left .similar_posts{position:relative!important; top:-1.5em;border-top:0!important}':'')
	+'.content_left .similar_posts .posts_list,.content_left .similar_questions .posts_list,'
	+'.rotated_posts{margin-top:0!important;margin-bottom:0!important;padding-top:0!important;border-top:1px solid #eee!important;background:#f8f8f8}'
	+'.daily_best_posts .posts_list .post_item a.user_name{color:#ddd!important}.daily_best_posts .posts_list .post_item:hover a.user_name{color:#999!important}'
	+(h.inZen?'':'.sidebar_right .block{border-radius:28px; box-shadow: 0 0 20px #fff inset, 0 0 16px  #eed!important}') //размытые границы сайдбара
	+'.sidebar_right .block .all{text-align: right}'
	+'.sidebar_right .block.float_block{position:static!important}'
	+'.sidebar_right .block a{text-decoration: none!important}'
	+'.sidebar_right .block .post_item,.vacancies .job_item,.tasks .task{margin-left:1.6ex!important;margin-bottom:0!important;line-height: 1.18!important;text-indent:-2ex}.vacancies .job_item,.tasks .task{margin-left:0!important}'
	+'.sidebar_right .live_broadcast .qa_activity{margin-top: 0.8em!important; display:block!important}.sidebar_right .freelansim .title,.sidebar_right .block.new_vacanies .title{display:inline-block!important; margin-bottom: 6px!important; opacity:0.3}'
	+'.vacancies .job_item,.freelansim .tasks .task{padding-left:2ex!important}'
	+'.sidebar_right .block.freelansim .tasks .task a, .sidebar_right .block.new_vacanies .vacancies .job_item a{font-size: 12px!important}'
	+'.sidebar_right .block{font-family:Verdana,Arial,Helvetica,sans-serif!important}'

	+'.rotated_posts .rotated_post a,.content_left .similar_posts .title,.content_left .similar_questions .title{display:block;padding:0 3px 2px!important;text-decoration:none!important;font-size: 13px!important;line-height:1.1!important;background:#f8f8f8}'
	+'.content_left .similar_posts .title,.content_left .similar_questions .title,.content_left .similar_posts .post_item .when{padding-bottom:0!important;font: 12px Arial,Helvetica,sans-serif!important}'
	+'.content_left .similar_posts .posts_list,.content_left .similar_questions .posts_list{display:none;max-width:1540px;margin:-6px 4px 0!important;padding: 0 12px 2px!important}.content_left .similar_posts .posts_list{margin-top:14px!important}'
	+'.content_left .similar_posts,.content_left .similar_questions{margin:-4px 0 0!important; padding-top:0!important}'
	+'.content_left .similar_posts .title,.content_left .similar_questions .title{float:right;height:1.2em;margin: -3px 24px 0 12px!important;padding:2px 5px 4px!important;border-radius:5px}.content_left .similar_questions .title{position:relative;z-index:2;top:-1.6em;background:#ecedf2}'
	+'.content_left .similar_posts >.title,.content_left .similar_posts .post_item,.content_left .similar_questions .post_item, .content_left .similar_posts .post_item .when{margin-bottom:0!important}'
	+'.content_left .similar_posts .post_item .when{font-size: 12px!important;color:#777}'
	+'.content_left .similar_posts:hover,.content_left .similar_questions:hover{float:none;position:static}'
	+'.content_left .similar_posts:hover .posts_list,.content_left .similar_posts .posts_list:hover,'
	+'.content_left .similar_questions:hover .posts_list,.content_left .similar_questions .posts_list:hover{position:absolute;z-index:12;display:block}'
	+'.content_left .similar_posts .post_item .when, .content_left .similar_posts .post_item .post_name, .content_left .similar_questions .post_item .post_name{display:inline;text-decoration:none!important}'
	+'.content_left .similar_posts .post_item,.content_left .similar_questions .post_item{display:inline-block;vertical-align: middle!important;width:24%!important;margin-right:0%!important;padding-bottom:1px!important;line-height:1.14!important;text-indent:0}'
	+'.post .published{float:right;margin:3px 0 -4px 4px!important}'
	+'.post .content .buttons{display:inline-block!important;padding:0!important}'
	+'.post .content .buttons a.button,.post .content .buttons input[type="button"]{position: relative;padding:0 2px 1px!important;border:0!important; border-radius:2px!important; background:transparent!important;color:#6da3bd!important;box-shadow: 0 0 2px rgba(255,255,255,0.4) inset, 0 0 2px rgba(0,0,0,0.2)!important}'
	+'.buttons a.button{height: 1.3em!important;top:-1px!important; line-height: 1.3em!important}'
	+'.post .content .buttons input[type="button"]{color:#367!important;}'
	+'#clarify_form input.submit, #add_answer input.submit, .add_answer input.submit, #comment_form #send_msg, #post_form #send_msg, #write-post #send_msg, #comments_form input.submit, #write_message_form input.submit, #add_message_form input.submit{margin-left: 60px !important}'
	+'.post .content .buttons a.button:hover{background:#f4f4f9!important}'
	+'.post .content .buttons a.button:visited{color:#b98!important}'
	//футер
+'.page-nav #nav-pages,.page-nav{margin: 0 40px 0!important;padding: 0 0 1px 1px!important}'
+'.page-nav ul.next-prev li{padding-right: 0.3em!important}'
+'.page-nav #nav-pages{position: fixed;z-index: 1001;left: 0;bottom: -1px;margin: 6px 0!important;opacity: 0.5;filter: alpha(opacity=50)}'
+'.page-nav #nav-pages:hover{opacity: 1; filter:none}'
+'.page-nav #nav-pages li{margin: 0!important}'
+'.page-nav #nav-pages li a,.page-nav #nav-pages li em{margin: 0 1px!important;padding: 2px 24px!important;border: 1px solid #ddc!important;border-radius:5px;text-decoration: none!important;font: 18px Verdana,Arial,Helvetica!important;background-color: #fdfdf4}'
+'.page-nav #nav-pages li em{border: 1px solid #3E8592!important; background-color: #7a9bac}'
+'.page-nav #nav-pages li a:hover{margin: -1px!important;padding: 3px 26px!important;border: 1px solid #8ab!important;background:#C5DAE5!important}'
	+'#footer{position:relative; width: auto!important;min-width: 314px!important;overflow: visible!important;margin: 0 2px 20px 6px!important;padding: 6px 0 0!important}'
	+'#footer .bottom_menu{width: 100%!important}'
	+'#footer a{text-decoration: none!important}'
	+'#footer dl{width: 50%!important; float:right}'
	+'#footer dl:last-child{display:none}'
	+'#footer dt{float:left; width: 4em; margin: 0!important; line-height: 120%!important}'
	+'#footer dt:after{content:":"}'
	+'#footer dd:not(:last-child):after{content:","}'
	+'#footer dd{float:left; margin: 0 0 0 6px!important; line-height: 120%!important}'
	+'#footer .copyright{position: relative; left: 12px; width: auto!important; float: none!important; margin-right: 12px!important}'
	+'#footer .copyright .footer_logo{margin:0!important; position:absolute; left: -21px!important}'
	+'#footer .copyright .about{float:left!important; width: auto!important; vertical-align: middle!important; margin:0 0 0 2px!important}'
	+'#footer .about br,#footer .copyright .about br{display: none}'
	+'#footer .about >a{margin-left: 10px!important}'
	+'#footer .about div,#footer .social_accounts{display: inline-block; height: 1.2em!important; margin: 0!important}'
	+'#footer .social_accounts a{margin-bottom: -8px!important}'
	//просмотр картинок
	+'.de-img-pre, .de-img-full{border: medium none; cursor: pointer; display: block; margin: 2px 6px; outline: medium none}'
	+'.de-img-thumb{cursor:move}.commInfo .imgL .de-img-pre,.commInfo .lnk .de-img-pre{margin: 4px 0;display:none}.commInfo .imgL:hover .de-img-pre,.commInfo .lnk:hover .de-img-pre{display:inline}'
	+'.content ._noAddOwnView,.html_format img.de-img-full,.html_format img.de-img-pre,.post .content img.de-img-full,.post .content img.de-img-pre{max-width: none!important; max-height: none!important}.de-img-pre{background-color: rgba(230,230,230,0.6)}'
	+'.de-img-full{float: left}'
	+'.aPrevi .de-img-pre{display:none}'
	+'.de-img-center{background-color: rgba(244,244,244,0.9); border: 1px solid black; position: fixed; z-index: 9999}'
	+'.de-menu{position: absolute; z-index: 10; display: inline-block; padding:3px 6px; background:rgba(238,238,238,0.76); border-radius: 4px}'
	+'.de-menu a{display:block}.de-menu a:hover{background:#ddd}'
	+'.de-menu a img{height:16px; vertical-align:middle}'
	+'.comments.c2 .comment_item .comment_body >.reply a.abuse_link,.answer .info .abuse_link_wrapper{display:none; margin-top:0!important}.info a.link_to_comment{left: 15px!important;top:-5px}'
	+'.comments_list .comment_item .comment_body:hover >.reply a.abuse_link{position: relative; display: inline-block!important; float: right; width: 2.3em; height: 15px; overflow: hidden; left: 1.7em; top:-2px; margin-top:-15px!important; border-radius: 4px; background-color:#f2f2e4; color: #8ca!important}.comments_list .comment_item .comment_body:hover >.reply a.abuse_link:hover{width: auto; overflow: inherit}'
	+'body[bgcolor="white"]{min-width: 624px!important}body[bgcolor="white"] .stars{max-width: 640px!important}#habr_center_universe{left: 312px!important}.hajax404{width: 99%; padding: 4px 2px; border: 1px solid #ddd; background: #eee;}.under404{margin-bottom:60px; background-color:rgba(230,230,230,0.5)}'
    +'.hoverView{display: inline; line-height: 1.3; color:#862}'
    +'.hoverView a{font-style:italic; text-decoration: none; color:#ccc}'
    +'.hoverView .hovered,.hoverView +.hovered,.hoverView.hovered{position: absolute; visibility: hidden; margin:-1px 3px 0 -12px; padding-left: 2px; background-color:#fff; border:1px solid #ddd; border-radius:5px}'
    +'.hoverView:hover .hovered,.hoverView:hover +.hovered,.hoverView:hover.hovered{visibility:visible; line-height:1.2}'
	+'.habrAjaxInfo{margin:2px 2px 0; padding-top:2px; background-color:#fff; border:1px solid #ddd; border-radius:5px; font-size: 12px; color:#999}.habrAjaxInfo a{color:#497DA5;text-decoration: none}'
    +'.habrAjaxInfo button{height: 1.4em; margin:-2px 2px 0 2px; padding: 0 11px 1px; line-height: 1.2em;'
    	+'box-shadow: 0 0 2px rgba(255, 255, 255, 0.4) inset, 0 0 2px rgba(0, 0, 0, 0.2); transition-duration: 0.2s; text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8); border-radius: 4px; border: 1px solid #9d9471; border-color: #9d9471 #8596aa #7b8a9d; background-color: #b4cbe6/*#cfe8c4*/;color:#237}.habrAjaxInfo button:hover{background-color: #def2fd/*#fcfcfc*/;}'
    +'.habrAjaxInfo .imgDimens{text-align: center}'
    +'.habrAjaxInfo button.previ{float:left; width:60px; height:2.6em; line-height: 1em; margin:-1px 0 0 -11px; border:1px solid #ead7b6; background-color:#fff3d2}.habrAjaxInfo button:hover.previ{background-color:#fffcf8}'
    +'.habrAjaxInfo button.previCancel{width:40px;border:1px solid #dee7fd; background-color:#effeff}'
    +'.habrAjaxInfo input{width: 4.5em; border:1px solid #bcd; margin:-1px 14px 0 4px; text-align: center}'
    +'.habrAjaxInfo input[type=radio]{width:auto; margin:-1px 3px 0;vertical-align:middle;}'
	+'.habrAjaxInfo .radios span,.habrAjaxInfo .radios label{display: inline!important;font-weight: normal!important;background:#ede7e4;color:#999}'
    +'#resizeWidth::-moz-placeholder,#resizeWidth2::-moz-placeholder, #aUrl::-moz-placeholder{color:#aac; background:#efeff8}#resizeWidth::-webkit-input-placeholder,#resizeWidth2::-webkit-input-placeholder,#aUrl::-webkit-input-placeholder{color:#ddd; background-color:#fafafa}'
    +'#resizeHeight::-moz-placeholder,#resizeHeight2::-moz-placeholder{color:#aac; background:#efeff8}#resizeHeight::-webkit-input-placeholder,#resizeHeight2::-webkit-input-placeholder{color:#ddd; background-color:#fafafa}'
	+'.preImgSend{position: absolute; display:none; width:98%; top:-4.2em; margin-left:3px; text-align: justify; background:#ede7e4;}'
    +'#header_mouse_activity{display: block!important; height:12px!important}#header_bg{height:7px!important}'
	+'.radios >.radios2 >.rAll{display:none!important}.radios >.radios2:hover >.rAll{display:inline!important}'
    +'.habrAjaxInfo.droppedF{position:absolute; display:none; top:0; min-height:110px}'
    +'.habrAjaxInfo.pixList{min-height:110px}'
	+'.habrAjaxInfo .imgDate{position: absolute; display:none; top:-1.46em; padding:0 6px; border: 1px solid #ada7a4; white-space:nowrap; background: #ede7e4}'
	+'.habrAjaxInfo .overUrl{position:relative; display:inline-block; line-height: 0.03}.content_left .habrAjaxInfo{line-height: 0.03}'
	+'.habrAjaxInfo .overUrl:hover .imgDate{display:inline-block; line-height: 1.3}';
var zz = hS.inZen ||{}; //встроенная версия ZenComment
zz.desc = zz && zz.desc && typeof zz.desc =='string' && zz.desc.replace(/@/g,"3.08");
addRules((hS.inZen.val ?'body{text-align:inherit!important;font-family:Verdana,sans-serif!important}#layout{width:auto!important;min-width:314px!important;max-width:1420px!important;margin-right:auto!important;margin-left:auto!important;overflow:hidden;padding-top:0!important;padding-right:0!important;padding-left:0!important;}#wrapper{margin:-15px 0 1px!important;width:auto!important;padding:20px 0 4px 6px!important;overflow:hidden;min-width:314px!important}.header,#header{width:100%;height:13px;top:1px;min-width:314px!important;margin:0;padding:5px 0 0!important}#header .userpanel,#header .user_panel{ position:fixed!important;top:0!important;right:0;left:auto!important;z-index:10026;float:right;width:auto!important;height:15px;padding:0 6px 2px!important;font-size:12px;border-bottom:1px solid #999!important;border-left:2px solid #666!important;border-bottom-left-radius:5px;background-color:#ccc;opacity:0.5;filter:alpha(opacity=50);*width:150px!important}#header .user_panel{font:12px/14px Arial,Helvetica,sans-serif!important}#header .userpanel:hover,#header .user_panel:hover{background-color:#fff;*width:350px!important;opacity:1;filter:none}#header .userpanel .top,#header .user_panel .top{ float:right;display:inline-block;white-space:nowrap;text-align:right}#header .userpanel sup{vertical-align:baseline!important}#header .userpanel a,#header .user_panel a{text-decoration:none!important}#header .userpanel a.username,#header .user_panel a.username{margin-left:1px}#header .userpanel a.nav-settings,#header .user_panel a.nav-settings{ display:none;float:left;margin:0 0 0!important}#header .userpanel:hover .top a.nav-settings{display:inline-block;position:relative;top:0}*|html[xmlns*=""] #header .userpanel:hover .top a.nav-settings{position:relative;top:-1.3em}*|html[xmlns*=""] #header .user_panel:hover .top a.nav-settings{position:relative;top:-1.3em}#header .userpanel a[href*="login"],#header .user_panel a[href*="login"]{display:inline-block!important;float:right}#header .userpanel a[href*="logout"],#header .user_panel a[href*="logout"]{display:inline-block;width:12px;margin-right:3px!important;background:no-repeat 0% 50% url(data:image/gif;base64,R0lGODlhDAAKAIABAN3d3f///yH5BAEAAAEALAAAAAAMAAoAAAIYhB+plhyw4JPOqQbZ2XvyfmGTOJZVBF4FADs=);color:transparent!important}#registration_page,#login_page{padding:0 22px!important}#header .userpanel .bottom,#header .user_panel .bottom{float:left;margin-right:6px!important}#header .userpanel a[href*="sandbox/add"],#header .userpanel a[href*="register"],#header .user_panel a[href*="register"]{display:none;float:left}.userpanel .bottom a,.user_panel .bottom a{display:none;margin:-1px 0 0!important;padding:1px 3px 2px!important}.userpanel:hover .bottom a,.user_panel:hover .bottom a{display:inline-block}.userpanel .bottom a:hover,.user_panel .bottom a:hover{display:inline-block;background-color:#f2f4f8!important}.userpanel:hover .bottom a.nav-settings,.user_panel:hover .bottom a.nav-settings{display:inline!important}#header .userpanel:hover a[href*="register"],#header .user_panel:hover a[href*="register"]{display:block}.userpanel .count,.user_panel .count{ display:inline-block!important;margin:0 4px!important;background-color:#eee!important;background-position:3px 3px!important;padding:0 4px 1px!important;font-weight:bold!important;color:#d63!important;border:1px solid #999!important;border-radius:5px}.userpanel .count[href*=tracker],.user_panel .count[href*=tracker]{color:#68a!important}.userpanel:hover .count,.user_panel:hover .count{border:1px solid #999!important}.userpanel .count:empty,.user_panel .count:empty{display:none!important}#header .userpanel .charge,#header .user_panel .charge{ position:absolute;display:none!important;width:10.5em;right:10px;margin:0!important;padding:0 3px 1px!important;border:1px solid #999!important;border-radius:3px;text-align:right;font-size:9px;font-family:Tahoma,Arial;color:#59d!important;opacity:0.5!important}#header .userpanel:hover .charge,#header .user_panel:hover .charge{ float:right!important;display:inline-block!important;white-space:normal;top:16px;background:#fff}#header .userpanel .charge:hover,#header .user_panel .charge:hover{opacity:1!important}.header .logo,#header a.logo{ position:fixed;z-index:10027;width:86px!important;height:78px!important;left:0;top:0;margin:-60px -55px 0!important;background-position:50% -144px!important;border-bottom-right-radius:5px;background-color:#ccc!important;opacity:0.5;filter:alpha(opacity=50)}.header .logo:hover,#header .logo:hover{background-position:50% -274px!important}#header .search,#header .search_panel{ position:absolute!important;top:-1px!important;right:178px!important;z-index:25!important;width:240px!important;margin:0!important}#header .search #search_form input[name="q"],#header .search_panel #search_form input[name="q"]{ float:none!important;width:214px!important;margin-right:0!important;padding:0 3px 1px!important;border-radius:3px;-moz-box-shadow:0 2px 10px #eee inset;box-shadow:0 2px 10px #eee inset;-webkit-box-shadow:0 2px 10px #eee inset;font-size:14px!important;opacity:0.8;filter:alpha(opacity=80)}#header .search input[name="q"]:focus,#header .search_panel input[name="q"]:focus{ border-color:#5699D8!important;outline:0!important;-moz-box-shadow:0 2px 10px #eee inset,0 0 2px #5ec6fb;box-shadow:0 2px 10px #eee inset,0 0 2px #5ec6fb;-webkit-box-shadow:0 2px 10px #eee inset,0 0 2px #5ec6fb;color:#333!important;opacity:1;filter:none}#header .search #search_form input[type="submit"],#header .search_panel #search_form input[type="submit"]{display:none!important;float:right!important;margin-left:-21px!important;padding:1px 3px!important;color:#666!important}#header .search #search_form input[type="submit"]:not([value=""])#header .search_panel #search_form input[type="submit"]:not([value=""]){clear:both}form#search_form{width:245px!important;height:21px}#header .search form#search_form:hover input[type="submit"]{display:block!important}#header .search form#search_form:hover input[type="submit"],.autocomplete{ z-index:25!important;margin:-2px 0 0 1px!important;border:0!important;border-radius:0 0 5px 5px;-moz-box-shadow:0 0 10px rgba(0,0,0,.3);box-shadow:0 0 10px rgba(0,0,0,.3);-webkit-box-shadow:0 0 10px rgba(0,0,0,.3)}.autocomplete{*border:1px solid #e7e7e7!important}.autocomplete div{position:relative!important;border:0!important;z-index:50!important}.autocomplete div:hover{border-bottom-color:#fff!important}.autocomplete >div:last-child{border-radius:0 0 5px 5px}#header .main_menu{ position:fixed!important;width:16px!important;height:20px;min-width:1.4em!important;top:0;left:0;overflow:hidden;z-index:10027;margin:-5px 0 0 7px!important;padding:1px 0 0!important;border:1px solid #999!important;border-right:2px solid #666!important;border-bottom-right-radius:5px;font-size:18px!important;background-color:#ccc;opacity:0.5;filter:alpha(opacity=50)}#header .main_menu:hover{width:auto;overflow:visible;width:auto!important;background-color:#fff;opacity:1;filter:none}#header .main_menu a{font-size:18px!important;margin-right:10px!important}#header .main_menu a.date{margin:3px 6px 0 -1px!important;letter-spacing:-1px;font-size:11px!important;color:#000!important}.main_menu a[href*="companies"]{display:inline-block;width:1.25ex;overflow:hidden}.main_menu a:hover[href*="companies"]{width:auto;margin-right:3px!important}#header_bg{position:absolute!important}.company_header,.profile-header{height:28px!important;margin-bottom:0!important;padding:3px 0 0 5px!important;font-size:inherit!important}.company_header .company_icon img{position:absolute;margin-top:29px!important}.company_header .name a,.company_header .rating{font-size:180%!important}.profile-header .profile-actions dt{font-size:220%!important;padding-top:6px!important}.profile-header h1{margin:0!important}.profile-header h1 .favicon{margin-top:6px!important}.profile-header dt{margin-bottom:-3px!important}#js-addFan,#js-addWorker{margin:6px 0 0!important}.profile-karma-holder{margin:-10px 8px!important}.company-header .profile-karma-holder{margin:0 12px 0 0!important}.profile-header .vote_holder .mark span{position:relative!important;top:5px!important;font-size:75%!important}.profile-header .profile-actions dt,.profile-karma-holder .karma{background:transparent!important}.profile-karma-holder >dl >dt,.profile-header .habraforce >dt{font-size:9px!important}.profile-header .habraforce .number{ height:30px!important;margin:-13px 0 -4px!important;padding:15px 0 0!important;font-size:220%!important}.profile-header .karma .total{margin-top:-2px!important}.profile-header .karma .total em{padding:0 2px;background:#fff;font-size:9px!important}.habraforce{background:transparent!important}.profile-header .karma a{margin-top:4px!important}.profile-header .karma dt,.profile-header .karma .total,.profile-header .habraforce dt,.profile-header .habraindex dt,.habraindex dt{color:#999!important}.profile-header .habraindex .number{font-size:200%!important}.profile-header .karma dd.vote{overflow:visible!important}.user-actions dd,.user-actions dt{border-radius:5px!important}.profile-actions-menu{padding:2px 3px!important;border-radius:5px!important;-moz-box-shadow:0 0 15px rgba(0,0,0,.3);-webkit-box-shadow:0 0 15px rgba(0,0,0,.3);box-shadow:0 0 15px rgba(0,0,0,.3);border-color:#397dbd!important}.profile-actions-menu .cor-1px{border-radius:5px!important;border:0!important}.popup-text-field{border:1px #ceceaf solid;border-radius:5px;background-image:none!important;-moz-box-shadow:0 0 15px rgba(0,0,0,.3);-webkit-box-shadow:0 0 15px rgba(0,0,0,.3);box-shadow:0 0 15px rgba(0,0,0,.3)}.popup-text-field div{background-image:none!important}.user_profile{width:99%!important}.user_profile dl{margin-bottom:5px!important}.user_profile .fullname{margin:0 0 5px!important;padding:2px 0 0 36px!important}.user_profile #people-tags li{margin-bottom:0!important}.user_profile .dl_logic_wrap{margin:0 0 2px!important}.user_profile .hubs_list ul,.user_profile .dl_logic_wrap ul,.user_profile .friends_list ul{max-height:120px;overflow-y:auto!important}.user_profile #people-tags a{height:auto!important;min-height:28px}.user_profile #people-tags a.habred{display:none!important}.user_profile #people-tags li{padding-bottom:5px!important}.user_profile #people-tags{padding-top:2px!important}.user_profile dl{margin:0 0 3px!important}.page-navigation{overflow:inherit!important;margin-bottom:5px!important}.hub_header{margin:-6px 0 0 26px!important;padding:0!important}.hub_header h2 a{font-size:20px!important}.hub_header h2 span.profiled_blog{z-index:3}.hub_header .hub-index .label{line-height:18px!important}.hub_header .hub-index .value{font-size:18px!important;line-height:6px!important}.user_header h2.username a,.hub_header .hub_title{color:#6da3bd!important}.user_header h2.username,.user_header .karma .score .num,.user_header .rating .num{font-size:24px!important}.user_header h2.username a:hover,.hub_header h2 .hub_title:hover{color:#84b18a!important}.content_left{min-width:74%;margin-right:0!important;padding:0!important}.content_left .add_post{position:relative;left:35px;opacity:0.5;filter:alpha(opacity=50)}.content_left table.menu{word-wrap:break-word}.content_left table.menu tr td a{padding:9px 0 7px!important;display:inline-block!important;width:100%;font-size:inherit!important}.content_left table.menu .profile a{position:relative;z-index:2;opacity:0.4}.content_left table.menu .profile a:hover{opacity:0.9}.content_left .submenu{margin-bottom:4px!important}.content_left .post{overflow:inherit!important;margin:12px 0 32px!important}.content_left .post.qa{margin:2px 0 8px!important}.content_left .company_post .post{margin-bottom:-5px!important}h1{letter-spacing:0!important}.content_left .post h1.title{ margin:3px 0 -3px!important;padding-left:25px!important;font:16px/118% normal Verdana,Tahoma,sans-serif!important}.content_left .post h1.title .post_title{ line-height:16px;font-size:16px;text-decoration:none!important;color:#257!important}.post h1.title a.post_title[href*="/qa/"]{font-size:13px!important;font-style:italic!important;color:#278!important}.post h1.title .locked{background-position:2px 0px!important}.content_left .post h1.title .post_title:visited{color:#977!important}.content_left .company_post h1.title .post_title{font-size:18px!important;font-weight:normal}.content_left :not(.company_post) .post h1.title .post_title:hover{color:#84b18a!important}.title sup{ padding:0 4px!important;font:13px/118% normal Verdana,Tahoma,sans-serif !important;font-size-adjust:0.45;font-variant:small-caps;vertical-align:2px!important;border-radius:4px;}.post h1.title .translation{background-color:#def!important}.content_left .post .hubs{float:right;position:relative;z-index:2;margin:-1px 8px -3px -12px!important;opacity:0.7;background:0 0!important;color:transparent!important}.content_left .hubs +.content{clear:both}.content_left .hubs .profiled_hub{display:inline-block;vertical-align:top!important;height:9px!important;margin:0 -4px 0 1px!important;font-size:5px!important;background-color:#cbd6ce}.content .poll table.answer{margin:0!important}.content .poll .answer .label,.content .poll .answer td{padding:0!important}.post .content ul li,.post .content ol li{position:relative;left:11px;margin:0 6px 0 0!important;padding-left:6px!important}.aaaa{margin:-2px -3px -2px -7px;padding:2px 3px 2px 7px;}.content_left .event,.content_left .post .content,.content_left.post .content{ max-width:1200px;min-height:2px;margin:6px 4px 6px 9px!important;padding-right:2px!important;padding-left:24px!important;word-wrap:break-word;line-height:1.31!important;font-size:13px!important}.content.html_format >h3{font-size:14px!important}.content.html_format >h2,.content.html_format >h1{font-size:16px!important}.content_left .post >.hubs +.content{margin:0 4px 0 9px!important}.comment_item .message img[align="left"],.comment_item .message img[align="right"],.content img[align="left"],.content img[align="right"]{max-width:50%!important}.comment_item .message img[align="left"],.content img[align="left"]{margin:2px 15px 2px -2px!important}.comment_item .message img[align="right"],.content img[align="right"]{margin:2px -2px 2px 15px!important}.post .content ul,.post .content ol{margin:6px 9px 6px 18px!important;list-style:decimal inside none!important;text-indent:-0.75em}#wrapper .comment_item .message pre,#wrapper .comment_item .message code,.content_left .comments_list .comment_item .message pre,.content_left .comments_list .comment_item .message code,.content_left .post .content pre,.content_left .post .content code{ max-width:100%;overflow:auto;line-height:1.3!important;font-size:100%!important}.content_left .post .content br+br,.content_left .post .content h4+br,.content_left .post .content pre+br{display:inline-block!important;height:10px!important;line-height:10px!important}*|html[xmlns*=""] .content_left .post .content br+br,.content_left .post .content h4+br,.content_left .post .content pre+br{display:block!important}.comment_item >.message br+br,.comment_item >.message blockquote+br{display:inline-block!important;height:6px!important;line-height:6px!important}*|html[xmlns*=""] .comment_item >.message br+br,.comment_item >.message blockquote+br{display:block!important}.content >blockquote,.message >blockquote{margin:2px 0!important;padding-left:6px!important}.content .vSpace,.comments .vSpace,.content .vSpace3,.comments .vSpace3,.comments_list .vSpace,.comments_list .vSpace3{width:3.6em;height:4px;margin:-1px 0 -3px 1.6em!important;background:#ddd}.content .vSpace3,.comments .vSpace3,.comments_list .vSpace3{width:2.8em;height:2px;margin:0 0 -2px 1.6em!important}.content_left .post .content iframe{max-width:100%}.post .content a[name="habracut"] .btnBack{margin:1px 12px -1px 0;padding-left:3px;border:1px solid #b3d2ee;border-radius:3px;background:#d3e2f0;cursor:pointer}.content_left .post .content a[name="habracut"] .btnBack.inln{display:inline-block;width:1.2em;height:16px;margin:0 2px;overflow:hidden;vertical-align:middle}.post div.btnBack,.btnBack{margin:3px 1px -8px 0}#layout >.content_left .post div.tags,.content_left .post ul.tags{ position:relative;float:right;max-width:1200px;margin:-5px 10px -10px 52px!important;padding:.2em 0 3px 19px!important;background-position:2px 3px!important;background-color:transparent!important;color:#888!important}ul.tags li a,ul.tags li{font-size:10px!important}ul.tags li a{text-decoration:none!important}.post ul.tags li a:hover{background-color:#fffcf8;color:#333!important}.content_left >.post .tags +.infopanel{background-color:#f9fbf8}.content_left .post .infopanel{ min-width:93%;min-height:15px;top:2px;margin:-2px 10px -26px 17px!important;padding:0 10px 0!important;ilne-height:1.6!important;border-color:#edede0!important;border-radius:6px;background-color:#f6f6fb}.i-am-your-father-luke .post .infopanel{width:94%;margin:3px 0 0 4px!important;border:1px solid #ddc;border-radius:5px;font-size:11px;line-height:1.7}.company_post .post .infopanel{min-width:0%;margin-top:11px!important}.post .infopanel >div{ max-height:17px;margin-top:0!important;margin-bottom:0!important;padding-top:0!important;padding-bottom:0!important;line-height:16px!important;background-position:0 0!important}.post .published{float:right;margin:3px 4px -4px!important;font-size:10px!important}.post .infopanel.qa .published{float:right!important}.post .infopanel .comments,.post .infopanel >div.informative,.post .infopanel >div.informative.ans1{width:auto!important;margin:0 0 0 4px!important;padding:0!important;background:#e8eae4!important}.post .infopanel .comments a,.post .infopanel >div.informative a{display:block;width:100%;padding:3px 4px 4px!important}.post .infopanel .comments img,.post .infopanel >div.informative img{max-height:12px}.post .infopanel >div.informative.positive a{color:#274!important}.post .infopanel >div.informative:not(.positive) a,.post .infopanel >div.informative.ans1 a{padding:3px 10px 4px!important;font-size:10px!important;color:#a33!important}.post .infopanel .informative.positive{background:#e8eae8!important}.post .infopanel .informative.accepted{background:#eaf2dc!important}.post .infopanel .informative.accepted a{color:#8b9!important}.post .infopanel .voting{margin-right:7px!important}.post .infopanel .voting .mark{font-weight:normal!important}.post .infopanel .favorite{padding-right:3px!important}.post .infopanel .favs_count{height:1.5em!important;padding-right:12px!important}.post .infopanel .twitter{margin-left:5px!important}.post .infopanel .googleplus{margin-right:5px!important}.post .infopanel .share{margin:2px 0 0 6px!important}.post .infopanel .share >div{width:16px!important;height:16px!important;margin:-2px 2px 0!important;padding:0!important}.post .infopanel a{font-weight:normal!important;font-size:12px!important;line-height:12px!important}.infopanel .original-author{color:#a33!important}.post .infopanel .author{margin-left:6px!important}.post .infopanel .author .rating{top:auto!important;vertical-align:-3px!important;font-weight:normal!important}.post .infopanel .comments{margin-left:5px!important;background:url(data:image/gif;base64,R0lGODlhDAAOANQVAIGhtsHU2uLq79Tv8qbE0dLh6/f//+z6+9/09r/c8Nru+rfL2O3y9sbY4+Pz+4movMjk8K/K0svc59Xr+r3P3P7//4WkuQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAMAA4AAAVRIFOMJCmJVaqukmS8cNxIxxHceN00SO//u8EgQiwKKRShcjmgLCAQgnQKXSwG0Gx2YHXUDgpozRERPM6PhiJhaQsu8AsjPQHE7/K0HR9nSOMhADs=) no-repeat 2px 2px #e5e4eb!important}.post .infopanel .comments a{padding:3px 4px 4px 17px!important}.page-nav #nav-pages,.page-nav{ margin:0 40px 0!important;padding:0 0 1px 1px!important}.page-nav ul.next-prev li{padding-right:0.3em!important}.page-nav #nav-pages{ position:fixed;z-index:1001;left:0;bottom:-1px;margin:6px 0!important;opacity:0.5;filter:alpha(opacity=50)}.page-nav #nav-pages:hover{opacity:1;filter:none}.page-nav #nav-pages li{margin:0!important}.page-nav #nav-pages li a,.page-nav #nav-pages li em{ margin:0 1px!important;padding:2px 24px!important;border:1px solid #ddc!important;border-radius:5px;text-decoration:none!important;font:18px Verdana,Arial,Helvetica!important;background-color:#fdfdf4}.page-nav #nav-pages li em{border:1px solid #3E8592!important;background-color:#7a9bac}.page-nav #nav-pages li a:hover{ margin:-1px!important;padding:3px 26px!important;border:1px solid #8ab!important;background:#C5DAE5!important}.content_left .post #edit_tags_form{margin:0 0 -6px!important;padding:5px!important}.content_left .qa_view,.content_left .comments_list{ position:static!important;overflow:visible!important;min-height:2em;margin:-5.6em -2px 0 0!important;padding-top:5.6em!important;padding-left:30px!important;border-right:2px solid #fff!important;background:#fff}.content_left .comments_list{border-bottom:2px solid #fff!important}.content_left .comments_list:hover{border-bottom:2px solid #eee!important}.comments_list:hover >.comment_item:not(:hover){ margin-right:-2px!important;border-right:2px solid #eee!important;background:#eee}.comments_list .comment_item:hover{background:#fff}.content_left .qa_view .answers >h2.title,.comments_list .answer-sort,body.company .comments_list h2.comments-header,.content_left .comments_list h2.title{ max-width:1200px;margin:-25px 1px 0 -26px!important;padding:15px 0 0 25px!important;border:1px solid #e8e8dd!important;border-radius:8px;background:#f0f0e7!important}.company_post .comments_list h2.title{margin-top:0!important;padding-top:22px!important;}h2.title .subscribe_comments{font-size:12px!important;cursor:inherit!important}.comments_list .comment_item .reply_comments{margin-top:0!important}.conversation_page .title{margin-top:0.8em!important}.conversation_page .messages .message,.comments_list .comment_item,.user_qa .comments_list .answer{position:relative;margin-top:8px!important;margin-bottom:0!important;margin-left:-4px!important;padding-top:0!important;padding-bottom:2px!important;padding-left:24px!important;border-top:0!important}.user_qa .answer{margin-bottom:0!important}.comments_list .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item{padding-left:10px!important}.comments_list .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item .comment_item{padding-left:4px!important}.content_left .comments_list >.comment_item{margin-left:-24px!important;border-left:1px solid #dddde2!important}.comment_item .info,.user_qa .answer .info{ position:static!important;max-width:1016px;height:9px!important;overflow:inherit!important;margin:-2px 0!important;padding-top:5px !important;padding-right:4px!important;line-height:11px!important;font-family:tahoma,sans-serif!important;background-position:1px 7px!important}.user_qa .answer .info{margin-bottom:4px!important}.comment_item >.info >a:not(.username):not(.favorite),.user_qa .answer .info >a:not(.username):not(.favorite),.comment_item .info >div:not(.clear){ position:relative;height:3px!important}.conversation_page .message.new .info,.comment_item .info.is_new{background:#f0f0fc}.conversation_page .message .info{background:#ecefef}.my-reply,.qa_view .info.is_author,.conversation_page .message.my .info,.comment_item .info.is_author{background:#e5f7e7!important}.comment_item .info .comma,.answer .info .comma{display:none!important}.comment_item .info div.voting,.user_qa .info .voting{position:absolute!important;z-index:2;display:none;height:18px!important;top:-7px;right:2.2em;padding-right:16px}.user_comments .comment_item .info .voting,.user_qa .answer .info .voting{display:block}.answers .answer .info .voting .plus,.comment_item .info .voting .plus{position:absolute;z-index:2;float:left!important;min-width:11px;min-height:15px;left:-31px}.answers .answer .info .voting .minus,.comment_item .info .voting .minus{position:absolute;z-index:2;min-width:11px;min-height:16px;left:20px;margin-left:0!important}.answers .answer .info .voting .mark span.score,.comment_item .info .voting .mark span.score{ position:absolute;width:3.2em;left:-15px;top:-1px;text-align:center}.conversation_page .messages .message .info a.avatar,.comment_item .info a.avatar{ position:absolute;overflow:visible!important;width:16px!important;height:16px!important;left:-20px;top:0px;border:1px solid transparent!important;z-index:3;opacity:0;filter:alpha(opacity=0)}.comment_item .info a.avatar img[src*="stub-user-small"]{display:none!important}.comment_item .info a.avatar img{position:relative;width:16px!important;height:16px!important}.comment_item .info a.avatar:hover{border:1px solid #ddd!important;opacity:1!important;filter:none!important}.comment_item .info a.avatar img:hover:not([src*="stub-ser-small"]){ display:block!important;width:24px!important;height:24px!important;top:-8px;left:0px}.answer .info a.avatar{height:18px!important}.answer .info a.avatar img{max-width:24px}.answers .answer .info a.avatar:hover{height:24px!important;margin-bottom:-7px!important;opacity:0.8!important;filter:alpha(opacity=80)}.comments.c2 .comment_item .comment_body >.reply a.abuse_link,.answer .info .abuse_link_wrapper{display:none;margin-top:0!important}.comments_list .comment_item .comment_body{display:inline-block}.comments_list .comment_item .reply .abuse_success{display:inline-block;position:relative;top:-4px;line-height:0.8}.comments_list .comment_item .comment_body:hover >.reply a.abuse_link{ position:relative;display:inline-block!important;float:right;width:2.3em;height:15px;margin-top:-15px!important;overflow:hidden;left:1.7em;top:-2px;border-radius:4px;background-color:#f2f2e4;color:#8ca!important}.comments_list .comment_item .comment_body >.reply a.abuse_link:hover{width:auto;overflow:inherit}.buttons .orange,.post .abuse_form{width:94%!important}.post .abuse{position:relative;float:right;margin:-2px 12px -24px!important}.post .abuse.cancel_abuse{margin:11px 10px -24px 2px!important}.comment_head span.info a,.info a.username,.messages .message .info .login a{ visibility:visible;display:inline-block;position:relative;height:13px;line-height:11px!important;margin:-6px 8px -4px 2px!important;padding:0 3px 0 4px!important;border-radius:4px;text-decoration:none!important;font-size:10px!important;letter-spacing:1px;font-weight:normal!important}.messages .message .info .login{visibility:hidden;}#answers .comments a[href*="users/"]{margin-right:2px!important}.answers .info a.username{top:6px;padding-bottom:3px!important}.comments >.comment_item span.username a{padding:0 3px 1px 4px!important;border-radius:4px;text-decoration:none!important}.comments_list >.comment_item:hover .comment_item:not(:hover) .info a.username,.comments_list:hover >.comment_item:not(:hover) .info a.username{visibility:hidden}.reply_comments:hover .comment_item:not(:hover) .info time,.comments_list >.comment_item:hover .comment_item:not(:hover) .info time{visibility:hidden}.comment_item .info time,.user_qa .answer_plain .info time,.messages .message .info .time{ display:inline-block!important;visibility:hidden;position:relative;float:none!important;top:-7px;height:10px;margin-top:1px!important;padding-right:1px!important;white-space:nowrap;font-style:italic!important;color:#a97!important}.clarification .comment_item >.time,.answer .comment_item .time,#answers .answer .info time{ position:relative;margin-top:2px!important;white-space:nowrap;font:12px tahoma,sans-serif!important;font-style:italic!important;color:#a97!important}.posts #answers .answer .info time{position:relative;top:-8px}.comment_item .info .show_tree,.comment_item .info a.link_to_comment,.user_qa .answer .info a.link_to_comment{ position:absolute!important;top:-2px;left:auto!important;right:2px!important;display:none!important;margin:-3px 0 0!important}.answers .answer .info a.link_to_comment{position:relative;display:none!important;float:right!important;left:40px!important;margin:0!important;padding-left:12px!important}.comment_item .info a.favorite{ position:absolute;z-index:2;float:right!important;visibility:hidden;width:15px!important;height:13px!important;top:-8px;right:2px!important;left:auto!important;margin:0 6px -12px 0!important}.comment_item .info .voting:hover ~ a.favorite{visibility:visible!important}.comment_item .info a.favorite:hover{visibility:visible}.comments_list >.comment_item:hover .info .voting,.answer .info:hover a.link_to_comment,.question_info:hover +.answer .info a.link_to_comment,.comment_item .info:hover a.link_to_comment{display:block!important}.answer .info .accept_link span.accept span.label,.answer .info .accept_link .reject{display:none}.answer .info .accepted,.answer .info .accept_link{position:relative;height:12px;margin-top:0!important}.comments_list >.comment_item_plain >.comment_item .info time,.comments_list >.answer_plain >.answer .info time,.user_qa .answer_plain .comments_list >.comment_item:hover .info time{visibility:visible}.user_qa .reply,.comment_item .info a.to_parent,.comment_item .info .show_tree{display:none!important}.qa_view .message,.qa_view .comment_item,.comment_item div.message,.conversation_page .messages .message .text,.user_qa .answer .message{ display:inline-block!important;overflow:inherit !important;max-width:840px;margin-top:-3px!important;margin-bottom:-2px!important;padding:0 2px 2px!important;word-wrap:break-word;line-height:1.25!important;font-size:12px!important;background:#fff;font-family:Verdana,Arial,Helvetica,sans-serif!important}.comments .comment_item .username{font:10px Verdana,sans-serif normal!important}.comments.c2 .answer,.qa_view .answer{margin-bottom:0!important}#answers .answer .comments,.answers .answer .comments .comment_item:first-child,.qa_view .comments{margin-top:0!important}.qa_view .post{margin-left:-24px!important}.qa_view .clarification{margin-right:6px!important;margin-bottom:2px!important}.clarification .comments .comment_item,.qa_view .answers{margin-right:6px!important}.answer .comments .comment_item{ min-width:78%;overflow:inherit!important;margin:0 0 2px 19px!important;padding:0 2px 0 5px!important;border-bottom:2px solid #eee!important}.clarification .comments .comment_item:last-child,.answer .comments .comment_item:last-child{border-bottom:0!important}.comment_item .message a{word-wrap:break-word}.comments_list .comment_item .message.bad1,.comments_list .comment_item .message.bad2,.comments_list .comment_item .message.bad3,.comments_list .comment_item .message.bad4,.comments_list .comment_item .message.bad5{ margin-top:1px!important;background-color:#fff!important}.qa_view .reply,.qa_view .reply_link,.comments.c2 .comment_item .reply,.comments.c2 .comment_item .reply_link,.comments_list .comment_item .reply,.comments_list .comment_item .reply_link{ min-height:19px;margin:-1px 0 -18px!important;border-top:1px solid #fff!important}.comments.c2:hover >.comment_item:not(:hover) div.reply,.comments_list:hover >.comment_item:not(:hover) div.reply{border-top:1px solid #eee!important}.comments.c2:hover div.reply,.comment_item:hover div.reply{border-top:1px solid #fff!important}.comments.c2:not(:hover) .reply >a.reply_link,.comments_list:not(:hover) .reply >a.reply_link,.comments.c2:not(:hover) .reply >a.reply,.comments_list:not(:hover) .reply >a.reply,.comments.c2:hover >.comment_item:not(:hover) .reply >a.reply_link,.comments_list:hover >.comment_item:not(:hover) .reply >a.reply_link,.comments.c2:hover >.comment_item:not(:hover) .reply >a.reply,.comments_list:hover >.comment_item:not(:hover) .reply >a.reply,.comments.c2 >.comment_item:hover .comment_item:not(:hover) a.reply_link,.comments_list >.comment_item:hover .comment_item:not(:hover) a.reply_link,.comments.c2 >.comment_item:hover .comment_item:not(:hover) a.reply,.comments_list >.comment_item:hover .comment_item:not(:hover) a.reply{visibility:hidden}.comments_list >.comments_list .comment_item:hover .reply a.reply_link,.comments_list >.comments_list .comment_item:hover .reply a.reply{visibility:visible}.comment_item .reply a.reply_link,.comment_item .reply a.reply,.comment_holder .reply a{ padding:2px 7px 5px!important;border-radius:5px;background-color:#f2f2f2}div.comment_item.answer,li.comment_holder.answer{margin-top:0!important}.comment_item .reply a.reply_link:hover,.comment_item .reply a.reply:hover,.comment_holder .reply a:hover{background-color:#f6f6f6}.comments .comment_item .comment_head{margin-bottom:0!important}.qa_view .reply a.reply_link,.qa_view .reply a.reply,.comment_item .reply a.reply_link,.comment_item .reply a.reply{ position:relative;display:inline-block;width:auto;height:auto;-moz-transform:rotate(-90deg);-o-transform:rotate(-90deg);-webkit-transform:rotateZ(-90deg);transform :rotate(-90deg);filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);left:-4px;padding:1px 1px 0!important;-moz-transform-origin:0% 20px;-o-transform-origin:0% 20px;-webkit-transform-origin:0% 20px;-moz-box-shadow:inset 2px -2px 3px #dde;-webkit-box-shadow:inset 2px -2px 3px #dde;box-shadow:inset 2px -2px 3px #dde;border-bottom:2px solid transparent!important;color:#acc!important;top:-16px;*left:-28px;*top:-6px;opacity:0.5;left:-23px\9;top:-48px\9;}.qa_view .answer >.reply a.reply_link,.qa_view .answer >.reply a.reply{top:-19px!important;border-radius:5px;color:#689!important}.comment_holder .reply a.js-serv{left:-1px;top:-20px}.qa_view .answer .reply a.reply_link:hover,.qa_view .answer .reply a.reply:hover,.comment_item .reply a.reply_link:hover,.comment_item .reply a.reply:hover{opacity:1}.answer .edit_link{position:relative;z-index:1;top:-5px;margin-top:0!important}.comment_item:last-child:not(:only-of-type) >.reply_comments{ margin-bottom:-1px!important;margin-left:-25px!important;padding-left:25px!important;border-top:1px solid #dddde2!important}.comments.c2 .comment_item:last-child:not(:only-of-type) >.reply_comments,.comments_list .comment_item:last-child:not(:only-of-type) >.reply_comments{border-left:2px solid white!important}.comments_list{position:relative;top:-0.6em;margin:0 -8px 0 0!important;padding:0.6em 8px 0 25px!important}.comments.c2:hover >.comment_item:not(:hover) .comment_item:last-child:not(:only-of-type) >.reply_comments,.comments_list:hover >.comment_item:not(:hover) .comment_item:last-child:not(:only-of-type) >.reply_comments{border-left:2px solid #eee!important}.comments.c2 .comment_item:last-child:not(:only-of-type):hover >.reply_comments,.comments_list .comment_item:last-child:not(:only-of-type):hover >.reply_comments{border-left:2px solid #fff!important;clear:both}.comments.c2 .comment_item[id^="comment_"] +.comment_item,.comments_list .comment_item +.comment_item{border-left:1px solid transparent!important}.comments.c2 .comment_item[id^="comment_"]:not(:only-of-type),.comments_list .comment_item:not(:only-of-type){border-left:1px solid #dddde2!important}.comments.c2 .folding-dot-holder,.comments_list .folding-dot-holder,.comment_item .info .folding-dot-holder{visibility:hidden}.comments_list .comment_item_plain,.user_qa .answer_plain{overflow:inherit!important}.comments_list .comment_item_plain .post_info,.user_qa .answer_plain .question_info{width:auto!important;position:relative;z-index:2;height:0.3em}.user_comments .comments_list,.user_qa .comments_list{padding-left:9px!important}.user_comments .post_info a{text-decoration:none!important}.user_comments .comment_item_plain .post_info{height:auto}.postoffice .comments_list{margin:-70px -8px 0 0 !important;overflow:inherit!important}.postoffice .editor{margin:9px 0 -10px -4px!important}.content_left .add_answer,.content_left .comments_form{margin-bottom:19px!important}.content_left .add_answer h2.title,.content_left .comments_form h2.title{position:relative;margin-bottom:-20px!important;background-position:0.3em 0.45em!important}.content_left .comments_form h2.title a{ border-bottom:1px dashed!important;font:20px normal Verdana,Tahoma,sans-serif!important;color:#AFA56A!important;text-decoration:none!important}.comment_item .reply >form,.content_left .comments_form form#comments_form{ margin-bottom:21px!important;margin-left:3px!important;padding-top:0px!important}#preview_placeholder{margin:4px -2px 2px -1px!important;padding:3px 8px 4px 3px!important}.preview_placeholder,#clarify_form{margin:-2px 0 -2px!important;padding:5px!important}.add_answer .preview_placeholder,.comments_form #preview_placeholder{margin-top:20px!important;padding:5px!important}.company_post >.comments_form >form >#preview_placeholder{margin:18px -2px 2px -1px!important;padding:3px 8px 4px 3px!important}.editor .panel{ position:relative!important;overflow:inherit!important;z-index:11;width:98%!important;min-height:22px;margin:0 -7px -1px 3px!important;padding:2px 1px 0!important;border-radius:5px;opacity:0.2;background-color:#eee}.editor .panel:hover{opacity:1}.editor .panel a{ display:inline-block!important;float:none!important;min-width:20px;height:20px;line-height:18px;padding:0 6px!important;text-decoration:none!important;margin:0!important;border-radius:5px}.editor .panel .spanned,.editor .panel >div >a{position:relative;float:left;z-index:11}.editor .panel >a:first-child,.editor .panel >div >a:first-of-type{margin-left:3px!important}.editor .panel .spanned{padding:0!important}#js-topic-form-holder .editor .panel .spanned a >font{top:0!important}.editor .panel >.wysiwyg_wrapper >a:hover,.editor .panel >div >b >a:hover,.comment_item .reply .editor .panel >div >a:hover,.qa_view .editor .panel >div >a:hover,.content_left #comments_form .editor .panel a:hover{background:#fff}.editor .panel .with-title{margin:1px 6px 0 3px!important}.editor .panel .can_use_html{right:-8px;position:absolute;z-index:10;white-space:nowrap;color:#999!important}.editor .panel .can_use_html a{ position:relative;display:inline;margin-right:7px!important;padding:0 3px!important;z-index:12}.text-holder textarea,form#comments_form .editor .text-holder textarea#comment_text{ border-width:0!important;border-style:none!important;width:99.4%!important;font:12px/15px Verdana,Arial,Helvetica,sans-serif!important;-moz-appearance:none;resize:vertical!important}div.inbox_page_write .editor textarea#text_textarea{height:auto!important}.inbox_page_read2 h2,.inbox_page_read2 #add_message_form{margin-left:7px!important}#write_message_form,#write_message_form .item{margin-bottom:0!important}#write_message_form label[for="text"]{display:none!important}.content_left #write_message_form,#reply_form_0 .text-holder textarea{margin-left:17px!important}h3+ #reply_form_0 .text-holder textarea{margin-left:0!important}#clarify_form input.submit,#add_answer input.submit,.add_answer input.submit,#comment_form #send_msg,#post_form #send_msg,#write-post #send_msg,#comments_form input.submit,#write_message_form input.submit,#add_message_form input.submit{margin-left:60px!important}#post_form >.item,#question_form >.item{margin:0!important}.conversation_page{margin-left:3px!important}#sidebar,.sidebar_right{overflow:hidden;float:none!important;width:auto!important;margin-top:0!important}.sidebar_right .block.float_block{position:static!important}.sidebar_right .block.user_info .join{float:right;padding-top:0!important}.sidebar_right .block.user_info .stats{width:auto!important}.sidebar_right .block.user_info .stats .item{margin-bottom:0!important}.sidebar_right .block{background:transparent!important;box-shadow:none}.block.blog_info{position:relative;margin:-2px 0 -12px 2px!important;padding:0 30px!important}.habralenta_settings >.title+p{text-indent:2.2ex}.block.blog_info{margin-bottom:4px!important}.block.blog_info >.title{display:none!important}.block.blog_info .stats >div{padding-top:3px!important;font-size:12px!important}.block.blog_info .info .join{float:none!important;overflow:hidden!important}.block.blog_info .info .join a#addBlogMember,.block.blog_info .info .join a#removeBlogMember,a#js-addBlogMember,a#js-removeBlogMember{ position:absolute!important;float:none!important;z-index:2;overflow:hidden;top:9px;left:0;width:0;height:18px;padding:4px 0 2px 32px!important;background-image:url(data:image/gif;base64,R0lGODlhLgAoANU/AFZ6lq7K3trm6u7y9oamusbW4p6+0trq9pKuwvr6+sre8ubu9m6Squ76/tLe5q7O5qbK4sbe7uLy+uLq7qbG4pK2yury/vb6+rbS4trq8qbC1tLm9r7a6uby9rbO4oqqwtru9vr+/pq6znqetqK+0rrW6naarpq2ytbq9oKiur7W5qrG2mqOppKyxs7i8vb+/sLa5vL29t7u+rLK3ur+/t7q9vr6/uLu+vb6/t7q8s7a5v7+/uru8rbS6vL2+v///yH5BAEAAD8ALAAAAAAuACgAAAb/wAiH4/oZj8ikcslUKhqNUnNKrUZoNAxHUe16f4pQCEMrmc+R3XdtTO9mrw12DoKF2F/YbhfYyV6AgTIld3hVKnsrOxJ7jXsdGIWGTRiAGjs3jo41HpNTM1AkDS6BpYAknk0BNzciFioWLLKzFhYGGRk5ujcLCx0WAz7CFzg2IY1NKwcHJwczB7OzMswFBTrXDg4C2xMTPAMDMT4XNntNJC4uFQoGES4b8PDvFalMIhERCCUVPf3+PQoiiKi35ES/Dw9SUFjI0MwJSQSPtHjw4AMEhBQpluBQAWJEIx8WEuihAYRJkwpaePz4A2MKDiNiyvyQgKUSfSVSmCBgs8oH/3wjenYhYMJEC6FWhhRBOuVJFKZTrmRhomAL0jBjmJQoc8ZMGoJuZmiNMwdLnZVs9PAxAgNDCbcYPPgx9WIQ2i+IdqwwIkLGDRAyZPRhpGkHpLtdKr3QYISAzJiKMu0p2oiTJ1ANUC0RRQpQ0VKMJ626YYCJgVexWDBYzaKWhhw1FvDyBUzYsGLGGiljxqTZs2iypomwlk3btgwTFnwLNy5BuR3o1DFZ1+6drAMbXKAYOOlePiNE0qXTx68fAAAKAEbQbMhgjw9GTgSej1DhwgclepgRgbjKxIogPTYCARdR1MMDbnHUn08iMZECSSeZFIFK9bjExAgwCUgTQTilwBEEUTwJ9VMEQUH1YVFHmbhEEAA7)!important;background-position:0 -20px!important;background-repeat:no-repeat!important;background-color:transparent!important;border:0!important;border-radius:0!important;color:#ccc!important}.sidebar_right .block:not(.blog_info):not(.habralenta_settings){ overflow:visible!important;margin:0 0 0 3px!important;padding:0 0 0 2.2ex!important}.posts_list .post_item a,.sidebar_right .links .link,.block .post_item{margin-bottom:0!important;padding-bottom:0!important;line-height:1.1!important;text-indent:-2ex;font-face:Verdana,Helvetica,sans-serif}.sidebar_right .block .all a:visited,.posts_list .post_item a:not(.blog_name):not(.user_name):visited{color:#a88!important}.block .event,.new_vacanies .vacancies,.freelansim .tasks{ margin-left:-2ex!important;padding-left:2ex!important;word-wrap:break-word;text-indent:-2ex}.block.live_broadcast .posts_list,.block.qa_activity .posts_list{margin-left:-1.8ex!important}.sidebar_right .block a{margin:0!important;padding:0!important;text-decoration:none!important;border-bottom:1px dotted transparent!important}.sidebar_right .block a:hover{padding:10px;border-bottom:1px dotted #666!important;color:#333!important}.block a.user_name{background-position:2px 50%!important}.block >.title{margin:3px 0 3px 2ex!important;font-size:18px!important;color:#5699d8!important}.block .all{position:relative;margin:-2px 2px!important;text-align:right}.block >div >div{overflow:inherit!important}.block.habralenta_settings,.block.habralenta_settings p{margin:0!important;padding:0!important}.habralenta_settings .hub.subscription a{margin-left:20px!important}.block .category-list .category{margin-bottom:3px!important}.block .category-list .category .blogs{padding-top:4px!important}.block .category-list .category .blogs .blog{margin-bottom:3px!important;padding-left:18px!important}.block .category-list .category .blogs .blog .checkbox{margin:0!important}.block.daily_best_posts h1 sup{vertical-align:baseline!important}.block.daily_best_posts .posts_list .post_item{margin:0!important}.block .posts_list .post_item a.user_name{padding-left:2.5ex!important}.block.new_vacanies h1,.block.new_vacanies .title{display:none}.vacancies .job_item,.tasks .task{padding-left:4px!important;text-indent:-1.6ex!important}.block.freelansim .task,.block.new_vacanies .job_item{margin:0 0 0 -0.5ex!important}.best_company +.block.new_vacanies .vacancies .job_item{display:block}.block .vacancies .job_item >div{float:none!important;background-color:transparent!important;color:#666}.block .vacancies .job_item .title a{font:inherit!important}.block .vacancies .job_item .pay{font:inherit!important;font-style:italic!important;color:#84b18a!important}.block .events_items .event_item{margin:0 0 2px -2.5ex!important;overflow:hidden}.block.similar_events .title{margin-left:15px!important}.block.similar_events .date{ position:static!important;width:99px!important;height:1.1em!important;overflow:inherit!important;clear:left;color:#999!important}.block .date .day{font-size:18px!important;line-height:20px!important;color:#aaa;font-weight:normal!important}.block .date .title{overflow:hidden!important;margin-left:auto!important}.block.favorite_tags .top-tags{margin:0 4px 0 0!important}.block.favorite_tags .top-tags a .name{text-decoration:none!important}.block.favorite_tags .top-tags a:hover,.block.favorite_tags .top-tags a.current{background:#e4e7e4!important}.block.last_links .links .link small{color:#84b18a!important}.content_left .topic_add,.content_left .qa_add{margin-left:10px!important}.content_left .similar_posts,.content_left .similar_posts .posts_list,.content_left .similar_questions .posts_list,.rotated_posts{margin-top:0!important;margin-bottom:0!important;padding-top:0!important;border-top:1px solid #eee!important;background:#f8f8f8}.rotated_posts .rotated_post a,.content_left .similar_posts .title,.content_left .similar_questions .title{display:block;padding:0 3px 2px!important;text-decoration:none!important;font-size:13px!important;line-height:1.1!important;background:#f8f8f8}.content_left .similar_posts .title,.content_left .similar_questions .title,.content_left .similar_posts .post_item .when{padding-bottom:0!important;font:12px Arial,Helvetica,sans-serif!important}.content_left .similar_posts .posts_list,.content_left .similar_questions .posts_list{display:none;max-width:1540px;margin:-6px 4px 0!important;padding:0 12px 2px!important}.content_left .similar_posts .posts_list{margin-top:14px!important}.content_left .similar_posts,.content_left .similar_questions{margin-top:-4px!important}.content_left .similar_posts .title,.content_left .similar_questions .title{float:right;height:1.2em;margin:-3px 24px 0 12px!important;padding:2px 5px 4px!important;border-radius:5px}.content_left .similar_questions .title{position:relative;z-index:2;top:-1.6em;background:#ecedf2}.content_left .similar_posts >.title,.content_left .similar_posts .post_item,.content_left .similar_questions .post_item,.content_left .similar_posts .post_item .when{margin-bottom:0!important}.content_left .similar_posts .post_item .when{font-size:12px!important;color:#777}.content_left .similar_posts:hover,.content_left .similar_questions:hover{float:none;position:static}.content_left .similar_posts:hover .posts_list,.content_left .similar_posts .posts_list:hover,.content_left .similar_questions:hover .posts_list,.content_left .similar_questions .posts_list:hover{position:absolute;z-index:12;display:block}.content_left .similar_posts .post_item .when,.content_left .similar_posts .post_item .post_name,.content_left .similar_questions .post_item .post_name{display:inline;text-decoration:none!important}.content_left .similar_posts .post_item,.content_left .similar_questions .post_item{display:inline-block;vertical-align:middle!important;width:24%!important;margin-right:0%!important;padding-bottom:1px!important;line-height:1.14!important;text-indent:0}#footer{width:auto!important;min-width:314px!important;overflow:visible!important;margin:0 2px 20px 6px!important;padding:6px 0 0!important}#footer:before{position:relative;display:block;float:right;height:0;top:-4px;right:2px;white-space:nowrap;margin-top:-4px!important;font-size:9px;color:#888;content:"ZenComment by spmbt"}#footer .bottom_menu{width:100%!important}#footer a{text-decoration:none!important}#footer dl{width:50%!important;float:right}#footer dl:last-child{display:none}#footer dt{float:left;width:4em;margin:0!important;line-height:120%!important}#footer dt:after{content:":"}#footer dd:not(:last-child):after{content:","}#footer dd{float:left;margin:0 0 0 6px!important;line-height:120%!important}#footer .copyright{position:relative;left:12px;width:auto!important;float:none!important;margin-right:12px!important}#footer .copyright .footer_logo{margin:0!important;position:absolute;left:-21px!important}#footer .copyright .about{float:left!important;width:auto!important;vertical-align:middle!important;margin:0 0 0 2px!important}#footer .about br,#footer .copyright .about br{display:none}#footer .about >a{margin-left:10px!important}#footer .about div,#footer .social_accounts{display:inline-block;height:1.2em!important;margin:0!important}#footer .social_accounts a{margin-bottom:-8px!important}#xpanel a.change{background-color:#999!important}#xsidebar,#xpanel,#xpanel a:last-child{border-bottom-left-radius:5px}#xsidebar,#xpanel a:first-child{border-top-left-radius:5px}@media (max-width:1100px){ .content_left .post .content,.content_left.post .content{padding-left:10px!important}.content_left .post .infopanel.qa{left:0!important}.content_left{width:240px!important;}}@media (max-width:640px){ .content_left .post .content,.content_left.post .content{padding-left:0px!important}.daily_best_posts .posts_list{margin-left:-12px!important}.daily_best_posts .post_item{text-indent:-1ex!important}.sidebar_right .block .post_item,.vacancies .job_item,.tasks .task{margin-left:0.2ex!important}.vacancies .job_item,.tasks .task{padding-left:0px!important;text-indent:-1.6ex!important}.content_left .post .infopanel{margin-left:2px!important}.content_left{width:240px;}}.header .panel-nav-top .banner_special,div[id^="dd_"],div[id^="topline"],#header .main_menu .banner_special,.post_inner_banner,.top_banner,.right_panel,body >iframe[width="100%"],iframe[src*="//www.facebook.com/plugins"],.sidebar_right .banner_240x400,.posts_list .post_item img{display:none!important}.sidebar_right .block[class*="htmlblock"],body >a,.sidebar_right .block:not(.blog_info):not(.user_info):not(.habralenta_settings):not(.fast_navigator):not(.similar_posts):not(.daily_best_posts):not(.live_broadcast):not(.similar_questions):not(.new_vacanies):not(.freelansim):not(.similar_events):not(.events_search_filter):not(.user_info):not(.favorite_tags),.sidebar_right .company_widgets,.sidebar_right div[class*=banner]{display:none!important}#header_mouse_activity,.sidebar_right .block.daily_best_posts .posts_list .post_item a:not(.blog_name):not(.user_name):not(.post_name),iframe[src*="facebook"],.footer_logos{display:none}.sidebar_right .block.daily_best_posts .posts_list .post_item a.user_name{color:#ddd!important}.sidebar_right .block.daily_best_posts .posts_list .post_item:hover a.user_name{color:#999!important}.sidebar_right .live_broadcast .qa_activity{display:block!important}.sidebar_right .block.freelansim .title,.sidebar_right .block.new_vacanies .title{opacity:0.3}.sidebar_right .block.freelansim .tasks .task a,.sidebar_right .block.new_vacanies .vacancies .job_item a{font-size:12px!important}.author_banned,.ufo-was-here{ max-width:900px;height:14px;margin:1px 0 1px 12px!important;font-size:6px!important;background:#f0f0f0;color:#fff!important;}.author_banned:hover,.ufo-was-here:hover{background:#d8d8d8}.author_banned:before,.ufo-was-here:before{content:"_удалено:`"}.i-am-your-father-luke{font:20px/110% Arial,Helvetica,sans-serif!important;letter-spacing:-1px!important;margin-bottom:-4px!important;padding:0 0 0 12px!important}.post .content .poll dl{margin-bottom:3px!important}.post .content .poll dl dt{width:5em!important}.post .content .poll .total{padding:0 0 4px!important}#layout img[align="middle"],#layout img[align="center"]{display:block;margin:0 auto 2px!important}.sidebar_right .block{font-family:Verdana,Arial,Helvetica,sans-serif!important}.content_left .qa_view .answers >h2.title .sort,.answer-sort .comments-header,.answer-sort .sort-order{display:inline-block!important}.content_left .qa_view .answers >h2.title .sort,.answer-sort .sort-order{position:relative;float:right;top:-8px;margin:-5px 6px -10px -9em!important}.content_left .peoples_list,.content_left .hubs_list .hub{margin-left:24px!important}#layout .wrapper .inner{ border-radius:0;padding:0!important}.buttons a.button,.buttons input:disabled:active,.buttons input{padding:0 10px!important}.post .content .buttons{display:inline-block!important;padding:0!important}.post .content .buttons a.button,.post .content .buttons input[type="button"]{position:relative;top:-2px;padding:0 2px 1px!important;border:0!important;border-radius:2px!important;background:transparent!important;color:#6da3bd!important;box-shadow:0 0 2px rgba(255,255,255,0.4) inset,0 0 2px rgba(0,0,0,0.2)!important}.buttons a.button{height:1.3em!important;top:-1px!important;line-height:1.3em!important}.post .content .buttons input[type="button"]{color:#367!important}.post .content .buttons a.button:hover{background:#f4f4f9!important}.post .content .buttons a.button:visited{color:#b98!important}.to_top{top:16px!important}.to_top.mini{width:3px!important}.user_settings{margin:0 0 8px 24px!important}.user_profile .twitter .text{word-wrap:break-word}.content a,.content_left .comments_list a,.comments.c2 a,.answers a{color:#497da5!important}.content a:hover,.comments_list a:hover,.comments.c2 a:hover,.answers a:hover{color:#4d7285!important}.profile #main-content >.items{margin-left:-7px!important}.profile #main-content .user_profile,.company #main-content .user_profile{padding-left:0!important}.comments_list .comment_item .info{font-family:tahoma,sans-serif!important}.answers .answer .info .voting:not(.voted_plus):not(.voted_minus) .loading,.comments_list .info .voting:not(.voted_plus):not(.voted_minus) .loading{background-color:#dd7!important}.comments_list h2.comments-header{margin:0!important;background:transparent!important}.comments_list h2.title span,.comments_list h2.comments-header span{ position:relative;margin-bottom:32px;height:34px;font-size:26px;vertical-align:0%}.comment_holder .vote{margin-top:6px!important}.comment_holder .mark{position:relative;left:21px;min-height:12px;margin:4px 0 0 12px!important;font-size:12px!important}.add-comment input,.reply_form input{margin:3px 0!important}#answers .answer .info{position:relative;left:-26px;line-height:16px!important;height:18px;color:transparent!important}.answers .answer .info a.avatar{margin-right:2px!important}.answers .answer .message{ margin:-3px -2px 0 0!important;padding:0 0 0 5px!important;border-left:4px solid #f2f2f2;padding:0 0 3px 5px!important}.editor .text-holder{border:0!important;clear:both}.editor .text-holder textarea,#js-field-comment,#report_form_container_textarea,.textfield{ width:99.4% !important;border:0!important;border-radius:5px;padding:3px;-moz-box-shadow:0 1px 6px #ddd inset;-webkit-box-shadow:0 1px 6px #ddd inset;box-shadow:0 1px 6px #ddd inset}.editor .text-holder textarea:focus,#js-field-comment:focus,#report_form_container_textarea:focus,.textfield:focus{-moz-box-shadow:0 1px 6px #ddd inset,0 0 2px #5ec6fb;-webkit-box-shadow:0 1px 6px #ddd inset,0 0 2px #5ec6fb;box-shadow:0 1px 6px #ddd inset,0 0 2px #5ec6fb;border-color:#5699d8!important;outline:0!important}'
	/*+ (isFx?'#header .userpanel a.nav-settings,#header .user_panel a.nav-settings{margin-top: 0!important}#header .userpanel:hover a.nav-settings, #header .user_panel:hover a.nav-settings{position: relative; top: -1.3em}':'')*/
	+ (isChrome?'#header .userpanel:hover a.nav-settings,#header .user_panel:hover a.nav-settings{position: relative; top: -1.3em}.answers .answer .info .voting.voted_plus .plus,#comments .info .voting.voted_plus .plus{background-position:1px -1px!important}.answers .answer .info .voting.voted_minus .minus,#comments .info .voting.voted_minus .minus{background-position:-11px 1px!important}.answers .answer .info .voting .plus,.comments_list .info .voting .plus{margin-right:30px;background-position: 1px -16px!important}.answers .answer .info .voting .minus,.comments_list .info .voting .minus{background-position:-11px -16px!important}':'')
 :'')+ css
	+ (hS.regimeNoZen.val ?'.comments.c2 >.comment_item .info .voting,#comments >.comment_item .info .voting,'
	+'#layout .comments.c2 >.comment_item .info a.link_to_comment,'
	+'	#layout #comments >.comment_item .info a.link_to_comment{display:block!important}'
	+'#layout .comments.c2 >.comment_item .info time, #layout #comments >.comment_item .info time{display:inline-block!important;visibility: visible!important}'
	+'.clarification .comment_item >.time,#answers .answer time, .comment_item .info time{padding-left:6px!important; white-space: nowrap; font: 12px tahoma,sans-serif!important; font-style: italic!important; color:#a97!important}'
	+'.comments.c2 .comment_item .info a.username, #comments .comment_item .info a.username'
	+'	{visibility: visible!important}'
	+'#layout .content_left .comments.c2 .comment_item, #layout .content_left #comments .comment_item{'
	+'	margin-top: 1px!important;'
	+'	margin-right: -2px!important;'
	+(ZenNCh?'	padding-top: 9px!important;':'')
	+'	border-right: 2px solid #fff!important;'
	+'	background:#fff!important}'
	+'#layout .content_left .user_comments #comments .comment_item{margin-right:0!important}'
	+'#layout .comment_item:last-child:hover:not(:only-of-type) >div.reply_comments,'
	+'#layout #comments:hover >.comment_item:not(:hover) .comment_item:last-child:not(:only-of-type) >div.reply_comments{border-left-color: #fff!important}'
	+'#layout #comments >.comment_item .reply{border-top: 1px solid transparent!important}'
	+'#layout #comments:hover >.comment_item:not(:hover) .reply{border-top: 1px solid #fff!important}'
	+'.comment_item .message{width: 100%}':'')
	+ (hS.noAva.val ?'.comment_item .info a.avatar:hover{opacity:0.8!important}':'')
	+ (hS.justify.val?'.content_left .event .text, .post .content, .comment_item >.comment_body >.message, .answer >.message, .comments .comment_item, form >.preview_placeholder, form >#preview_placeholder{text-align: justify}':'')

	+'.answers .answer .info .voting:not(.voted_plus) span.plus,'
	+'.comments_list .info .voting:not(.voted_plus) span.plus,'
	+'.post .infopanel .voting:not(.voted_plus) span.plus,'
	+'.vote_holder .vote.expired:not(.voted_plus) .vote_plus,'
	+'.vote_holder .voting.expired:not(.voted_plus) .vote_plus,'
	+'.vote_holder .vote.no_auth .vote_plus,'
	+'.vote_holder .voting.no_auth .vote_plus,'
	+'.answers .answer .info .voting.voted_minus .plus,'
	+'#comments .info .voting.voted_minus .plus,'
	+'.vote_holder .vote.voted_minus .vote_plus{visibility:'
		+ (hS.noExpiredVote.val ?'hidden':'visible!important') +'}'
	+'.answers .answer .info .voting:not(.voted_minus) span.minus,'
	+'.comments_list .info .voting:not(.voted_minus) span.minus,'
	+'.post .infopanel .voting:not(.voted_minus) span.minus,'
	+'.vote_holder .vote.expired:not(.voted_minus) .vote_minus,'
	+'.vote_holder .voting.expired:not(.voted_minus) .vote_minus,'
	+'.vote_holder .vote.no_auth .vote_minus,'
	+'.vote_holder .voting.no_auth .vote_minus,'
	+'.answers .answer .info .voting.voted_plus .minus,'
	+'#comments .info .voting.voted_plus .minus,'
	+'.vote_holder .vote.voted_plus .vote_minus{visibility:'
		+ (hS.noExpiredVote.val ?'hidden':'visible!important') +'}'

	+(h.inZen ?'.comment_item .info a.favorite{left:-3px}':'.entry-info-wrap .btnBack{top:7px}'
		+'.infopanel >.g-plusone +.likes{margin-top: 5px}')
	+(hS.noSomeSideBlocks.val && !h.inZen?'.sidebar_right .block:not(.blog_info):not(.user_info):not(.habralenta_settings):not(.fast_navigator):not(.similar_posts):not(.similar_questions):not(.daily_best_posts):not(.live_broadcast):not(.new_vacanies):not(.freelansim):not(.similar_events):not(.events_search_filter):not(.user_info):not(.for_authors_help):not(.for_authors),.sidebar_right .company_widgets,#header .main_menu .banner_special,div[id^="topline"],.post_inner_banner,.top_banner,.right_panel,body >iframe[width="100%"],iframe[src*="//www.facebook.com/plugins"],.sidebar_right .banner_240x400,.posts_list .post_item img{display:none!important}.sidebar_right .block.daily_best_posts .posts_list .post_item a:not(.blog_name):not(.post_name):not(.user_name),iframe[src*="facebook"],.footer_logos{display:none}':''));
if(hS.colorAuthorTAH.val) addRules('.comment_item .info.is_new.is_topicAuthor, .comment_item .comment_head.is_new.is_topicAuthor{background:#F5ECF5!important}');
h.uFrmWid = h.inZen || win.opera ?'74%':'66%';

var dSettings = hS.init() //элементы DOM для настроек
	,showUpdate = function(mD){ //сообщения о новом в версиях
		var a = mD && mD.update
			,s ='';
		if(a){
			if(!(a instanceof Array) &&!(a[0] && typeof a[0]=='string')) a =[a];
			for(var i=0, aL = a.length; i < aL; i++){
				var d1 = Number(a[i].replace(/ .*/,''))
					,d2 = a[i].replace(/^[^ ]* /,'');
				s +='<div class="hlp">'+ (d1 && d2
					?'<b>Новое по сравнению с '+ d1 +'</b>: ' + d2 +'</div>'
					:'<b>Новое</b>: '+ a[i]) +'</div>';
			}
		}
		if(mD['uso:installs'])
			s += '<a href="//userscripts.org/tags/habrahabr" target="_blank">installs</a>: '+ mD['uso:installs'];
		if(mD['uso:reviews'] || mD['uso:discussions'] )
			s += ', <a href="//userscripts.org/scripts/discuss/121690" target="_blank">talks</a>: '+ ((Number(mD['uso:reviews'])||0) + (Number(mD['uso:discussions'])||0) );
		if(mD['uso:script'])
			s += ', '+ '<a href="//userscripts.org/scripts/versions/'+ mD['uso:script'] +'" target="_blank"><b>версии</b></a>.';
		return s;
	};
//document.body && document.body.appendChild(hNE) || document.documentElement && document.documentElement.appendChild(hNE);

if($q('.userpanel .username')) h.uName = $q('.userpanel .username').innerHTML;
var linksBug = 'Сообщить об ошибке в скрипте или идею <a href="http://habrajax.reformal.ru/" target="_blank">на Reformal</a>'
		+(h.uName ?', <a href="/conversations/spmbt/#subj=HabrAjax%20notes" target="_blank">в личное сообщение</a> автору (в новом окне).':'') +'<br/>'
	,chkUpdElem = $q('.hADotted:not(.note):not(.current)', dSettings)
	,now5am = function(dte, hour){ //число в секундах, соответствующее последним 5 часам утра
		if(!hour) hour =5;
		if(dte && dte instanceof Date) dte = +dte;
		dte = dte && new Date(dte - DAY/24 * hour) || NOWdate;
		return (+new Date(dte.getFullYear(), dte.getMonth(), dte.getDate()) + DAY/24 * hour) /1000;
	}
,chkUpdate = function(ev){ //пров.обновление скрипта
	var a = metaD && metaD.resource, url;
	if(a){ //значение ресурса с ключом "meta" (число, имя файла на "USO" или URL)
		if(!(a instanceof Array)) a =[a];
		for(var i=0, aL = a.length; i < aL; i++)
			if(a[i].replace(/ .*/,'') =='meta'){
				url = a[i].replace(/[^ ]* /,''); break;}
	}
	if(url){
		//способы задания важности обновл_: 1) явно в метаданных: severity  minor | major | critical;
		// 2) номером версии: если минорный номер кратен 10, то critical; если нет, то minor
		if(!hS.chkUpdate.val)
			hN.addNote(imgWait +'&nbsp;'); //знак ожидания Ajax - только для ручной проверки
		extMeta(url, function(dat){ //==читать внешние метаданные==, dat - прочитано с сервера (хеш)
			var urlUpd = dat.finalUrl.replace(/meta\.js$/,'user.js')
				,metaDExt = readMeta(dat.responseText)
				,vD = getVersionDate(metaDExt.version) //версия на сервере //проверка версии
				,vDCur = getVersionDate(metaD.version) //установленная версия
				,severity = metaDExt.severity || (vD.major == vDCur.major //важность/критичность
					? vD.minor ? (+vD.minor % 10 ?'minor':'critical') :'minor'
					:'major')
		//vDCur = getVersionDate('105.2013.03.14'); //TEST
		//metaDExt.update =['104 новые новые новые','103 снова снова снова', '01dfsfgs']; //TEST
		//severity ='minor'; //TEST
			if(!(severity=='minor' && hS.chkUpdNoMinor.val)){
				'vDCur'.wcl(vDCur, vD)
				if(vDCur.version > vD.version || vDCur.version == vD.version && vDCur.days <= vD.days){
					var s = (vDCur.version == vD.version && vDCur.date == vD.date
						?'Обновлений скрипта на хостинге <b class="hlp">нет':'На сервере - версия <b>с более ранн'
						+(vDCur.days==vD.days ?'им номером '+ vD.version:'ей датой'))
					+' с '+ vD.date +'</b> ('+ nSufRu(vD.days,0) +')'
					+ (vDCur.version == vD.version && vDCur.date == vD.date ?', загружена последняя версия':'')+'.<br>';
				}else{
					s ='<a href="'+ urlUpd +'" target="_blank" class="hlp"><b>Установить</b></a> '+ (severity=='minor'
						?'незначительные обновления в версии':(severity=='critical'?'важное обновление'
						:'новую версию')) +' <b class="hlp">'+ vD.version +'</b>, от '+ vD.date
							+' ('+ nSufRu(vD.days,0) +' назад).<br>';
				}
				s += linksBug
				+'<div><i><b>Справка</b>: автопроверка обновлений &mdash; не чаще 1 раза кажды'
				+(hS.chkUpdPeriod.val==1 ?'й день':'е '+ nSufRu(hS.chkUpdPeriod.val,0))
				+'; настройки: период проверок; не сообщать о минорных версиях; отключить автопроверку; проверить обновление вручную.</i></div>';
				s += showUpdate(metaDExt);
				if(hS.chkUpdate.val){
					hN.addNote(imgWait +'&nbsp;'); //поиск директив "@update version text"
					win.setTimeout(function(){hN.addNote(s,'*');},1999);
				}else
					hN.addNote(s,'*');
				//'updS'.wcl(hS.chkFailDate.val , now5am())
			}
			hS.updSettings({chkFailDate: 0, chkDate: now5am()}); //"прочитано", запомнена дата проверки обновления
		}, function(er){
			if(!hS.chkUpdNoMinor.val){
				var s2='~~Ошибка чтения обновлений. '+ (hS.chkUpdate.val ?'<br/>Будет повторено не ранее, чем через '+ CHKUPD +' мин.':'');
				if(hS.chkUpdate.val){
					hN.addNote(imgWait +'&nbsp;');
					win.setTimeout(function(){hN.addNote(s2,'*');},999);
				}else
					hN.addNote(s2,'*');
			}
			'er'.wcl(er)
			hS.updSettings({chkFailDate: Math.floor(+new Date() /1000)}); //дата неуспешной проверки обновлений
		});
	}else
		hN.addNote('Не прочитан элемент meta и адрес серверного скрипта в ресурсе метаданных');
	ev && $pd(ev);
};
if(chkUpdElem) chkUpdElem.addEventListener('click', chkUpdate,!1); //ручная проверка обновлений
if(hS.chkUpdate.val && !win.opera &&(!hS.chkFailDate.val && Math.floor((NOW - hS.chkDate.val *1000) /DAY) >= hS.chkUpdPeriod.val //опера не может проверять очень рано
		|| hS.chkFailDate.val && NOW - hS.chkFailDate.val *1000 > CHKUPD *60000 )  )
	chkUpdate(); //автопроверка обновлений скрипта
var showVersionInfo = $q('.hADotted.current', dSettings);
if(showVersionInfo) showVersionInfo.addEventListener('click', function(ev){ //инф.о текущей версии
	var vDCur = getVersionDate(metaD.version);
//metaD.update =['0.80 новые новые новые','0.812 снова снова снова', 'dfgdgdfh dhg hsd']; //TEST
	hN.addNote('Версия <b>'+ vDCur.version +'</b>, появилась '+ vDCur.date +', '+ nSufRu(vDCur.days,0) +' назад.<br>' + linksBug + showUpdate(metaD));
	$pd(ev);
},!1);
if(hS.noAlienScripts.val){ //сканер сторонних скриптов (поможет иногда; лучше делать "чистую загрузку")
	var n =7
		,timeCheckAli = NOW
		,wwAli = win.setTimeout(function(){
			scanAliens(timeCheckAli);
			if(new Date() - timeCheckAli < 1300 && --n >0) win.setTimeout(arguments.callee,30); //ограничение активного сканирования кода по времени
		}, 30);
}
habrAjax = h; //внешнее имя для детектирования повторных загрузок
try{if(typeof GM_registerMenuCommand !=u) //настройки HabrAjax [и тест юзерскрипта до загрузки страницы]
	GM_registerMenuCommand('HabrAjax: settings', hS.edit); //settings
}catch(e){'_err_'.wcl('habrAjax = h;')};
//return h;})());//собрание уникальных для window имён и их внутренние имена (переименование)

//===============================================
titleBase ='подгрузка статьи; Ctrl- или Shift+клик - новая страница';
titleAdd ='; Ctrl+Shift - пере-подгрузка';
	//==========для подгрузки скриптов=================
//Форматы: addJs(URL, тело тега SCRIPT, имя ожидаемого объекта после подгр.скрипта, функция коллбека, имя коллбека)
//addJs(строка (не URL) или функция с явным именем) - просто выполнение через подгрузку; нужно для юзер-скрипта
function addJs(url, inner, sObject, callback, callbackName){ //подгрузка скрипта. sObject - имя для поиска в window
	if(url){
		var elemScript = document.createElement('SCRIPT')
			,willExecAny = sObject && callback //"будет выполнено нечто из кода по url"
			,urlIsFunc = typeof url =='function';
		elemScript.setAttribute('type', 'application/javascript'); //text/..?
		if(!urlIsFunc){
			if(!willExecAny && !/^https?:\/\//.test(url)) //передача функции на загрузку
				inner = url;
			if(/^https?:\/\//.test(url)) //будет подгружен скрипт по ссылке
				elemScript.src = url;
			if(inner)
				elemScript.appendChild(document.createTextNode(inner));
	//'addJS'.wcl.apply(this,['arguments', elemScript])
			document.getElementsByTagName('head')[0].appendChild(elemScript); //загрузить и выполнить скрипт
		}
		if(willExecAny || urlIsFunc){
			if(!callback) callback = url;
			var callbackString = callback.toString().replace(/\(@\)/g, inner||'');
			if(!callbackName) callbackName = callbackString.match(/^\s*function\s*(\w+)/)[1];
			//'addJs2== '.wcl('*');
			/*'addJs2== '.wcl(callbackName +'='+ callbackString +'; '
					+ (urlIsFunc
						? callbackName +'();'
						: execCallback.toString().replace(/callback\(window\[sObject\]\);/m
							,callbackName +'("'+ sObject +'");')
					+'; execCallback(null,"'+ sObject +'")'));*/
			addJs(
				callbackName +'='+ callbackString +'; '
					+ (urlIsFunc
						? callbackName +'();'
						: execCallback.toString().replace(/callback\(window\[sObject\]\);/m
							,callbackName +'("'+ sObject +'");')
					+'; execCallback(null,"'+ sObject +'")') //дождаться и выполнить функцию из внеш.скрипта
			);
		}
	}
}
function execCallback(t, sObject, callback){ //выполнение коллбека при обнаружении целевого объекта в window
	if(!t) t =200;//период попыток обнаружить window.sObject
	var win = (typeof unsafeWindow !='undefined')? unsafeWindow: window
		,wcl = function(){if(win.console) return win.console.log.apply(console, arguments)};
	//''.wcl(sObject+'_timeShift==', t, window[sObject]);
	//wcl(t)
	if(window[sObject]){ //далее будет подмена строки (в addJs). "callback" - чисто формальный аргумент
		//wcl('callb', window[sObject], callback) //====undefined====TODO
		callback(window[sObject]);
	}else if(t*1.4 < 4000){ //пров. на макс интервал [мс] (они суммируются)
		var f=arguments.callee;
		win.setTimeout(function(){f(Math.floor(t * 1.4), sObject, callback);}, t); //повторения с увеличением интервала
	}else
		wcl('=Not load script or function== ',sObject);
}
function loadGPlus(sObject){ //загрузка своей ф. как скрипта для выполнения чужой
	var blckBrief = function(cl, ht, url){ //создание кнопки (класс, название)
		var o = document.createElement("DIV");
		o.className = cl;
		o.innerHTML = ht;
		o.setAttribute('data-size','small');
		o.setAttribute('data-href', url);
		return o;
	}
	,catchCss = function(eI, j, topicTitle){ //несколько проверок объекта, пока не появится; в рендере полезен callback; скрипты работают почему-то с ошибками внутри gPlus, поэтому отключены; кнопки также периодически не загружаются (?)
		var eIp = eI && eI.querySelector('div[id*="__plusone"]')
			,thisF = arguments.callee;
			//console.log('==[[==')
		if(eIp){
			//window[sObject].plusone.render(gPlus, {"size": "small", "href": topicTitle.href});
			eIp.style.cssFloat ='left';
			eIp.className ='g-plusone';
			var likesG = document.createElement("DIV");
			likesG.className ='likes';
			var likesGS = document.createElement("DIV");
			likesGS.innerHTML ='<div></div>';
			likesG.appendChild(likesGS);
			if(eIp.nextSibling)
				eIp.parentNode.insertBefore(likesG, eIp.nextSibling);
		}else if(j < 1999 && eI)
			win.setTimeout(function(){
				thisF(eI, Math.floor(j*1.6), topicTitle);
			}, j*1.6);
	};
	window.___gcfg = {lang: 'ru'};
	var $q = function(q,x){return (x||document).querySelector(q);}
	if(!document.querySelectorAll('#comments').length && !$q('.qa_view')){
		var post = document.querySelectorAll('.post');
		for(var i =0; i < post.length; i++){
			var topicTitle = $q('.title a.post_title', post[i])
				,info = $q('.infopanel', post[i])
				,vcard = $q('.original-author', info) //поиск места прикрепления кнопки G+
					|| $q('.author', info)
					|| $q('.link', info)
					|| $q('.favorite', info)
				,gPlus = vcard && topicTitle && vcard.parentNode.insertBefore(blckBrief('g-plusone','G+1',topicTitle.href), vcard);
			//gPlus.style.cssFloat ='left';
			if(gPlus && topicTitle)
				window[sObject].plusone.render(gPlus, {"size": "small", "href": topicTitle.href.replace(/#.*$/,'')});
			//console.log(vcard, gPlus, info, info.querySelector('div[id*="__plusone"]'));
		//wcl(1, location.href)
			try{
			catchCss(info, 300, $q('.title a.post_title') );
			}catch(e){alert('loadGPlus_err_')}
		}
	}else{
		var info = $q('.infopanel')
			,vcard = $q('.author', info)
				|| $q('.favorite', info)
				|| $q('.favs_count', info)
			,gPlus = vcard && vcard.parentNode.insertBefore(blckBrief('g-plusone', 'G+1'), vcard);
		//console.log('G+', vcard, gPlus)
		if(gPlus)
			window[sObject].plusone.render(gPlus, {"size": "small", "href": location.href.replace(/#.*$/,'')});
		//wcl(2, location.href)
		//console.log(vcard.parentNode, 300, location.href)
		try{catchCss(vcard.parentNode, 300, location);}catch(e){'loadGPlus_err2_'}
	}
}
//================ начало работы (ready) ===============================
var readyLoad;
document.addEventListener("DOMContentLoaded", readyLoad = function(){ //обработка страницы
	try{
		habrAjax.wasLoad =1;
	}catch(e){return;} //opera
	var h = habrAjax
		//детектор повторных загрузок
		,wrss = $q('.wrss');
	if(h.gPlusFrame) return;
	if(wrss && wrss.innerHTML=='777') return; //не срабатывает
	$e({cl:'wrss'
		,ht: 777
		,cs:{display:'none'}
		,apT: $q('#layout') || $q('.register') || $q('body[bgcolor="white"]') || $q('body >.stars')
	});
	var wrss = $q('.wrss');
	if((!(wrss && wrss.innerHTML) || /habrahabr\.ru\/static\/widgets/.test(lh)
			)&& $q(doc.body) && $q(doc.body).childNodes.length >=4 ||!doc.body)
		return; //отказ второй загрузки; (нелогично, но работает)
	if($q('body >.stars') && $q('body >.stars +script')) //если 404-я
		location.href = HRU +'/i/#  '+ lh;
	var nginxMsg = $q('body[bgcolor="white"] >center');
	$e({el: function(){return nginxMsg}, ht:'<link href="/styles/system/404.css" rel="stylesheet" media="all" /><div class="h"></div><div class="stars"><div class="page404"><div class="title"><div class="label_top">404</div>Страница не найдена<div class="label_bottom"></div></div><div class="state">слетайте на другие наши планеты</div><div id="habr_center_universe"><a href="/" class="habr"></a><div class="planet brainstorage"><a href="http://brainstorage.ru/" class="name">Мозгохранилище</a><a href="http://brainstorage.ru/" class="picture"></a></div><div class="planet hantim"><a href="http://hantim.ru/" class="picture"></a><a href="http://hantim.ru/" class="name">Хантим</a></div><div class="planet freelansim"><a href="http://freelansim.ru/" class="picture"></a><a href="http://freelansim.ru/" class="name">Фрилансим</a></div></div><div class="button"><a href="/">На главную</a></div></div></div>'.replace(/>404</,/\/#(%20%20|  )/.test(lh)?'>404<':' style="width:auto; position: static; margin:-24px 0 -10px">'+ (nginxMsg && nginxMsg.innerHTML) +'<')
	});
	if(/\/(conversations|edit|add)\//.test(lh) && win.opera) //заполнение полей письма
		fillLetter();
	if(hS.noAlienScripts.val){
		var alienWidgets = $qA('.company_widget');
		if(alienWidgets && alienWidgets.length)
			for(var i in alienWidgets) if(alienWidgets[i].childNodes)
				alienWidgets[i].innerHTML ='';
		scanAliens(+new Date());
	}
	var fWrapAnno = function(aut, ev){
		var sSaved = hS.get(1) //сохранённые настройки
			,a_co = aut<3 ?'listNo'+(!aut?'Content':(aut==1?'Author':'Smart')) :(aut==3?'hStrongCut':'chkUpdPeriod')
				,valForSave = prompt( (aut<3 ?'Ввести список (через зпт) '+(!aut?'содержимого':(aut==1?'авторов':'признаков смартфонов'))+' для сворачивания в ленте':(aut==3? 'Макс. высота рисунков в аннотации:':'Через сколько дней проверять обновления (после 5  часов утра, однократно)?') ) +(hS.defa[a_co] ?'\nПо умолчанию: '+ hS.defa[a_co] :'')
					,aut==3 ? Math.floor(sSaved[a_co] + (h.inZen?0:50) || (aut<3 ?'':  strongCutImgMinH +(h.inZen?0:50))+0.5) : sSaved[a_co] || hS.chkUpdate.val );
			if((valForSave || valForSave==='') && valForSave != sSaved[a_co]){
				sSaved[a_co] = aut==3 ? Math.floor(valForSave-(h.inZen?0:50) ) : valForSave;
				hS.save(sSaved);
			}
			$pd(ev);
		};
	$e({el: $q('#showNoContent') //строки или тела регекспов, разделенные ","
		,on:{click: function(ev){fWrapAnno(0, ev);}} //сворачивание аннотаций по содержимому
	});
	$e({el: $q('#showNoAuthor') //строки или тела регекспов, разделенные ","
		,on:{click: function(ev){fWrapAnno(1, ev);}}
	});
	$e({el: $q('#showNoSmart') //строки или тела регекспов, разделенные ","
		,on:{click: function(ev){fWrapAnno(2, ev);}} //сворачивание аннотаций по признакам обзора смартфонов
	});
	$e({el: $q('#strongCutBtn') //число
		,on:{click: function(ev){fWrapAnno(3, ev);}}
	});
	$e({el: $q('#chkUpdateBtn') //число
		,on:{click: function(ev){fWrapAnno(4, ev);}} //период пров.обнов.
	});
	var fillCompaSide =1 //заполнять правое поле компаний
		,sidebar = $q('.sidebar_right')
		,isCompa = /\/company\//.test(lh);
	if(isCompa && fillCompaSide){
		var savedSide = getLocStor('saveCompaSide');
		if(savedSide){
			$e({
				ht: savedSide
				,apT: sidebar
			});
		}
	}
	var hsh ={hideBest24:'.daily_best_posts'
			,hideDirectBand:'.live_broadcast'
			,hideEmploy:'.new_vacanies'
			,hideFreel:'.freelansim'
			,hideEve:'.similar_events'}
		,isHideAllRight =1;
	for(var i in {new_vacanies:1, freelansim:2})
		if($q('.'+ i, sidebar) )
			extLinks($q('.'+ i, sidebar) );

	if(win.opera)
		$e({el: dSettings, apT: document.body});
	var zc = checkInZen();
	if(zc != zenChecked && zc != !!hS.zenPresent.val && win.opera){
		zenChecked = zc;
		hN.addNote('В браузере наличие юзерстилей определено НЕВЕРНО (особенность скрипта'+(win.opera?'':', например,')+' в Опере 12). Для правильного определения необходимо в настройках (внизу списка) указать чекбокс "подключены ли ВНЕШНИЕ стили ZenComment"');
	}
	for(var i in hsh){ //скрывание блоков справа
		if(hS[i].val){
			var hiding = $q(('.sidebar_right ')+ hsh[i]);
			if(hiding) hiding.style.cssText =';display: none!important;';
		}else isHideAllRight =0;
	}
	if(!isHideAllRight && fillCompaSide && !isCompa){
		var saveCompaSideOver = saveCompaSideOver && (saveCompaSideOver.innerHTML='') || $e({cs:{position:'absolute'} });
		for(var i in hsh){ if( !hS[i].val){ //скрывание блоков справа
			var saveCompaSide = $q(('.sidebar_right ')+ hsh[i]);
			if(saveCompaSide){ //подготовка для HTML для сохр_ в locStor для блогов компаний
				var sCSClone = saveCompaSide.cloneNode(!0);
				if(sCSClone)
					saveCompaSideOver.appendChild(sCSClone);
			}
		}}
		var saveCSText = saveCompaSideOver.innerHTML.replace(/\t/g,'').replace(/\n+/g,'\n');
		//'saveCSText'.wcl(saveCSText.length)
		setLocStor('saveCompaSide', '<div><i style=padding-left:6px;color:#aaa>Информеры от: '+ getHourMins().replace(/(\d\d):/,'$1') +', '+ getDay([0,NOWdate.getDate(),0,NOWdate.getFullYear()], NOWdate.getMonth()) +'</i></div>'+ saveCSText);
	}
	var uN = $q('.userpanel .username') || $q('.user_panel .username')
		,RO = $q('.userpanel a[href*="settings/upgrade"]');
	h.uName = uN? uN.innerHTML : '';
	if(isHideAllRight && sidebar && !hS.sidebarDown.val || inFrame){ // скрыть правую панель + стили на всю шир.окна
		var rBlock =1;
		if(inFrame){ //скрыть (для стр. favorities), если .dailybest - только одна в сайдбаре
			document.body.style.backgroundColor ='#f4f6f7';
			var bUserInfo = $q('.sidebar_right .block.user_info');
			if(bUserInfo){
				var bUserInfoStat = $q('.stats', bUserInfo)
					,contMenuDelim = $q('.content_left .menu +.clear');
				if(!contMenuDelim)
					contMenuDelim = $q('.content_left .submenu +.clear');
				if(contMenuDelim){
					var nextCont = contMenuDelim.nextSibling;
					if(nextCont){
						nextCont.parentNode.insertBefore(bUserInfoStat, nextCont); //блок перемещён под меню
						bUserInfo.parentNode.removeChild(bUserInfo);
					}
				}
			}
			rBlock = $qA('.sidebar_right .block');
			rBlock = rBlock && rBlock.length;
			rBlock = rBlock ==1 && $q('.sidebar_right .block.daily_best_posts')
				|| sidebar && !$q('.sidebar_right .block')
				|| isHideAllRight;
			if(isChrome)
				document.body.setAttribute('frameWidth', !rBlock || isHideAllRight ?'98%':h.uFrmWid); //для чтения из top
		}
		if(rBlock){
			sidebar.style.display ='none';
			addRules('.content_left{width: 99%}');
		}
		var uFrm;
		try{
			uFrm = top && top.location.host == lh && top.document.getElementById('hA_userinfoView');
		}catch(er){};
		if(uFrm) //для не-Хрома
			uFrm.style.width = !rBlock || isHideAllRight ?'98%':h.uFrmWid;
	}
	var regW = $q('#reg-wrapper');
	if( (sidebar || regW) && !isHideAllRight){ //вставить лого из метаданных
		var blogLinks = sidebar && $qA('.blog_name', sidebar); //укорочение имён хабов
		if(blogLinks) // (в правой колонке)
			for(var i in blogLinks) if(blogLinks[i].parentNode){
				var blogNameText0 = blogLinks[i].innerHTML
					,blogNameText = blogNameText0.replace(/^Блог компании /,'БК ');
				if(hS.shortenHub.val)
					blogNameText = blogNameText.replace(/^(.{16})..+/,'$1..'); //16 символов на хабы и 13 - на БК
				if(blogNameText != blogNameText0)
					blogLinks[i].innerHTML = blogNameText; //.replace(/^БК /,'<span style="font-variant:small-caps">БК</span> ');
				var linkA = blogLinks[i];
			}
		var blogUser = sidebar && $qA('.user_name', sidebar);
		if(blogUser)
			for(var i in blogUser) if(blogUser[i].parentNode){
				var airComm = blogUser[i].parentNode
					,blogLink = $q('.user_name', airComm)
					,hrefHash = $q('.post_name', airComm).getAttribute('href');
				blogUser[i].setAttribute('href', hrefHash);
				$q('.post_name', airComm).setAttribute('href', hrefHash.replace(/\#.*/,''));
			}
		var h3p = sidebar && $q('.habralenta_settings >.title +p', sidebar);
		if(h3p) h3p.parentNode.removeChild(h3p);
	}
	var noPage = $q(doc.body) && ($q(doc.body).childNodes.length <=3 || $q('body[bgcolor="white"] >center'));
	if(regW && regW.className !='register_form'|| noPage){ //восстановление страниц
		var postNumb = win.location.toString().replace(/[^\d]/g,''), copiersMsg;
		extLinks( copiersMsg = $e({cs: {
				fontSize:'13px', cssFloat:'right', textAlign:'right'}
			,ht: (noPage ?'<div class="hajax404"><u><i>HabrAjax сообщает о загрузке пустой страницы вместо сайта и предлагает временно посетить копию этой страницы на ресурсах копировщиков в Сети:</i></u></div><br><br>':'')
				+'<div class=under404><i style=color:#37a>Найти сохранённые данные (вероятность мала):</i><br>'
				+'<a target=_blank href="'
				+'http://webcache.googleusercontent.com/search?q=cache:'
					+ win.location +'" style=font-size:18px>Google search cache</a> *<br>'
				+'(<a class=pLink href='+ HRU +'/post/'+ postNumb +'/>'+ postNumb
					+'</a>) <a target=_blank href="'
				+'http://savepearlharbor.com/?p='+ win.location.toString().replace(/[^\d]/g,'')
					+'">хранение полных RSS статей на savepearlharbor</a>, <font color=#cc6666>с 17.10.2012</font> *<br> <a href="'
				+'http://liveweb.archive.org/' + win.location
				+'" target=_blank>archive.org</a> *<br>'
				+'<a href="http://yandex.ru/yandsearch?text='+ win.location +'&site=habrahabr.ru&wordforms=exact'
					+'" target=_blank>Яндекс (далее посмотреть ссылку "копия")</a> *<br>'
				+'<a href="http://hl.mailru.su/gcached?q=cache:'+ win.location +'" target=_blank>mail.ru</a> *<br>'
				+'<a href="http://www.bing.com/search?q='+ win.location
					+'+site%3Ahabrahabr.ru" target=_blank>Bing.com (далее смотреть ссылку "Cached page" под треугольником, если такая будет)</a>&nbsp;*<br>'
				+'<a href="'+ win.location.toString().replace(/habrahabr\.ru/,'m.habrahabr.ru')
					+'" target=_blank>микрохабр (иногда остаётся удалённое автором)</a> *<br><br>'

				+'<i style=color:#37a>Известные клонировщики, работавшие на 20.06.2012 (без целевого поиска по адресу, искать по названию):</i><br>'
				+'<a href="http://vk.com/habr" target=_blank title="Для поиска и открывания кеша по кнопкам &quot;Посмотреть&quot; нужна авторизация VK; для просмотра по прямым ссылкам - не обязательно, но возможны баги зависаний">vk.com/habr (искать поиском - в разделе "Новости"; прим. в подсказке)</a> *<br>'
				+'<a href="http://www.pvsm.ru/'
					+'" target=_blank>www.pvsm.ru</a> *<br>'
				+'<a href="http://archives.maillist.ru/97865/'
					+'" target=_blank>http://archives.maillist.ru/97865/</a> *<br>'
				+'<a href="http://www.informatica.md/habrahabr'
					+'" target=_blank>http://www.informatica.md/habrahabr</a> *<br>'
				+'<a href="http://trak.spb.ru/aggregator/sources/1'
					+'" target=_blank>http://trak.spb.ru/aggregator/sources/1</a> *<br>'
				+'<a href="http://gliffer.ru/articles'
					+'" target=_blank>http://gliffer.ru/articles</a> *<br></div>'
			,apT: regW || doc.body}) );
		$q('.pLink',copiersMsg).innerHTML += ',~'+ $q('.pLink',copiersMsg).title;
	}
	if( (sidebar || regW || $q('.hajax404')) && !isHideAllRight){
		var isHLogo = metaD && metaD.icon
  			,hAjaxLogo = $e({cl:'hAjaxLogo'
				,cs:{width: (sidebar || regW ?0:34)+'px'}
  				,bef: sidebar && sidebar.childNodes[0] || regW && regW.childNodes[0]
				,prT: $q('.hajax404')})
					.appendChild($e({
						 el: isHLogo ?'DIV':'SPAN'
						,cl:'hLogo'
						,ht: (isHLogo ?'':'HabrAjax')
						,cs: (isHLogo ? {backgroundImage:'url('+ metaD.icon +')'}:{height:'auto'})
						,at: {title:'настройки HabrAjax; Ctrl - описание скрипта в новом окне'+ (metaD?'':'; (!) не прочитаны метаданные'),rel:1234}
						,on: {click: hS.edit}
					}) );
	}
	if(hS.sidebarDown.val)
		addRules('.content_left{width: 99%!important; max-width: 99%}.sidebar_right{min-width: 98%}');
	if(hS.shortReply.val){
		var replyA = $qA('#comments a.reply'); //'ответить'->'ответ' в одиночн.стр.
		for(var i in replyA) if(replyA[i].innerHTML && /комментировать|ответить/.test(replyA[i].innerHTML) )
			replyA[i].innerHTML ='ответ';
	}
	document.title = document.title.replace(/Захабренные \/ /,'χ/ ').replace(/Новые \/ (Посты|Всё) /,'χν').replace(/Входящие \/ Q&A/,'Q&A').replace(/Хабрахабр/,'χα'+(/\/new\//.test(lh)?'ν':'')+(/\/unhabred\//.test(lh)?'ο':'')+'/'); //удаление лишних букв
	var nan,uN='\x2f\x2f'+sHQ.replace(/qu/,zc?'qz':'qu')+'png\x67ifjpgbmp'.match(/.../g)[+!h.uName+!RO],hQ0=function(){hS.hQuotes.val =0;};
	//'h.uName,RO'.wcl(h.uName,RO)
	//if(sHQ&&!hS.sHQ)if(nan=$q('img[src*="mobtop.ru"]')){nan.src=uN; nan.onError=hQ0;}else $e({el:'img',at:{src:uN}, apT: doc.body, on:{error: hQ0}}); //проверка HQ
	var srchBut = $q('#header #search_form input[type="submit"]') //расширение поиска
		,srchField = srchBut && $q('input[name="q"]', srchBut.parentNode);
	if(srchField){
		srchField.addEventListener('keydown', function(ev){this.setAttribute('keyLast', ev.keyCode);}, !1);
		srchBut.addEventListener('click', function(ev){
			var t = this;
			if(!(ev.ctrlKey && ev.shiftKey)){
				t.form.target = srchField.getAttribute('keyLast') !=13 ?(!ev.ctrlKey && !ev.shiftKey
					?"hA_userinfoView":"_blank"): '';
				win.setTimeout(function(){t.form.target ='';}, 300);
			}else return!1;
			$pd(ev);
			win.setTimeout(function(){t.form.submit();}, 200); //TODO проверку наличия фрейма и всю обвязку с target
		},!1);
		srchBut.title ='Ctrl | Shift - в новом окне';
		if(hS.gooYa.val && srchBut){ //поиск по сайту
			var srchInFav = function(ev, srch){
				var topic = $q('.post')
					,topicTitle = topic && $q('h1.title .post_title', topic);
				var topicTitleVal = topicTitle && ('"'+ topicTitle.innerHTML.replace(/"/g,'&quot;').replace(/&nbsp;/g,' ') +'"');
				var tValue = $q('input[name="q"]', ev.target.parentNode).value
					,valEmpt = tValue=="" || tValue=="поиск по сайту"
					,t = srch
						+ (valEmpt ? topicTitleVal : tValue)
						+"+site%3Ahabrahabr.ru"+ (valEmpt ?'/users':'')
						+ (valEmpt ?"+inurl%3Afavorites":"");
				if(ev.ctrlKey ^ ev.shiftKey)
					window.open(t,"_blank");
				else
					location.href = t;
				$pd(ev);
				return!1;
			},
			srchButGoo = $e({el: srchBut.cloneNode(!0)
				,at:{title:'Google search in site', value:'Go'}
				,on:{click: function(ev){srchInFav(ev,'http://www.google.ru/search?q=');}}
				,apT: srchBut.parentNode
			}),
			srchButYa = $e({el: srchBut.cloneNode(!0)
				,at:{title:'поиск Яндекса по сайту', value:'Ya'}
				,on:{click: function(ev){srchInFav(ev,'http://yandex.ru/yandsearch?text=');}}
				,apT: srchBut.parentNode
			});
		}
	}
	var comments = $qA('#comments, #messages')
		,isQA = $qA('.qa_view')
		,underCut = hS.underCut.val;
	if(hS.underFooter.val /*&& !isChrome*/){ //прибитый к низу футер
		var topL = $q('#topline')
			,wrp = $q('body .wrapper')
			,lay = $q('#layout')
			,footer = $q('#footer')
			,rotaP = $q('.rotated_posts')
			,fLogos = $q('.footer_logos');
		if(topL && lay && lay.firstChild)
			lay.insertBefore(topL, lay.firstChild);
		if(footer){
			$e({cl:'clear', apT: footer});
			var footH = footer.offsetHeight +(fLogos?52:0);
			if(rotaP)
				footH += rotaP.offsetHeight ;
		}
		//'footH'.wcl(footH, footer, document.body.parentNode)
		if(lay && footer && lay.nextSibling){
			lay.style.minHeight ='100%';
			addRules('#layout{margin-bottom:-'+ footH +'px!important}html, body, body >.wrapper{height:100%}'); //52 --поправка на наличие подфутера в 51 пикс и картинки в 1 пикс
			$e({cl:'clear', cs:{height: (footH +3 ||0) +'px'}, apT: lay});
			lay.parentNode.insertBefore(footer, lay.nextSibling);
		}
		if(rotaP && lay.nextSibling)
			lay.parentNode.insertBefore(rotaP, lay.nextSibling);
	}
	var rotaP = $q('.rotated_posts');
	if(rotaP){
		rotaP.style.display ='table';
		rotaP.style.width ='100%';
		var rotRow = $e({cl:'rotTRow', cs:{display:'table-row'}, apT: rotaP});
		for(var i=0;i<3;i++){
			var rotCell = $q('a', rotaP);
			rotCell.style.verticalAlign ='middle';
			rotRow.appendChild(rotCell);
		}
		extLinks(rotaP); //даты по URL
	}
	var simil = $q('.similar_posts',sidebar) || $q('.similar_questions',sidebar); //похожие посты - после статьи в виде ссылки и выпадающего списка
	if(simil && hS.similarAfter.val){
		$e({el: simil, bef: $q('#comments') || $q('.clarification')});
		var simIs = $q('.posts_list', simil)
			,simEls = $qA('.post_item', simIs);
		if(simIs && simEls && simEls.length){
			var sEL8 = Math.floor((simEls.length - 5)/8);
			for(var j = sEL8 +1; j >=0; j--){ //чересполосица строк списка (по 4 инлайновых блока)
				var sE8_4 = simEls[j*8 + 4];
				//'simil'.wcl(simil, simEls.length, sE8_4)
				var simIsEven = $e({cl:'even',cs:{backgroundColor:'#f2f2f2', margin:'2px -12px', padding:'2px 14px 2px 10px'}, bef: sE8_4});
				for(var i = j *8; i < j *8 + 4; i++){ //в невыделенных 4-ках - дату вперёд
					var sE8 = simEls[i];
					if(sE8){
						var date = $q('.when', sE8);
						if(date)
							$e({el: date, prT: sE8});
						else
							extLinks(sE8); //подсказки примерных дат
					}
				}
				for(var i = j *8 + 4; i < j *8 + 8; i++){
					if(!sE8_4) break;
					var date = $q('.when', sE8_4);
					if(date)
						$e({el: date, prT: sE8_4}); //дату вперёд
					else
						extLinks(sE8_4);
					simIsEven.appendChild(sE8_4);
					sE8_4 = next('post_item', simIsEven);
				}
				if(i > j *8 + 4){
					$e({cl:'clear', apT: simIsEven});
					$e({cl:'clear', bef: simIsEven});
				}
			}
		}
	}else if(isQA)
		extLinks(simil);
	var acvity = $q('.live_broadcast_activity',sidebar) //пометки обуждений старого в "Прямом эфире"
		,acvityQA = $q('.qa_activity',sidebar)
		,dbp = $q('.daily_best_posts',sidebar)
		,tops ={};
	if(dbp){ //хеш лучших 10, для перекидывания комментариев в них, если есть в "прямом эфире"
		var dbpA = $qA('.post_name', dbp);
		for(var j in dbpA){ var dbpAJ = dbpA[j]; if(dbpAJ.attributes)
			tops['p'+ dbpAJ.getAttribute('href').match(/\d{5,}/)[0]] = dbpAJ;
		}
	}else
		tops = null;
	acvity && extLinks(acvity,'old_labels',tops);
	acvityQA && extLinks(acvityQA,'old_labels');
	if(win.show_float_block)
		win.show_float_block = function(){}; //убрать анимацию фиксации блока (не Хром)
	//'simIsEven'.wcl(simIsEven)
	if(!comments || !comments.length)
		comments = isQA;
	if(!comments || !comments.length){ //обработка, если =====лента анонсов=====
		var topics = $qA('.posts >.post, .posts >.event');
		//'topics'.wcl(topics)
		for(var i =0; i < topics.length; i++){
			var topic = topics[i]
				,linkA = $q('.link .link a', topic)
				,origA = $q('.original-author a', topic)
				,author = $q('.author a', topic)
				,autName = author && $q('.author a', topic).innerHTML
				,published = $q('.published', topic)
				,topicTitle = $q('h1.title .post_title', topic)
				,hubs = $qA('.hubs >.hub', topic)
				,content = $q('.content', topic)
				,topicHaCut = $q('a.habracut', topic)
				,info = $q('.infopanel', topic)
				,inQA = /\/qa\//.test(topicTitle.href)
				,news =0
				,commLink = $q('.infopanel .'+(inQA ?'informative':'comments')+' a', topic);
				//заголовок+-
			if(hS.colorTopic.val){
				for(var j in hubs){
					if(hubs[j].innerHTML =='Переводы')
					topicTitle.style.backgroundColor ='#f0f4fa'; //топик-перевод (светло-синий)
					if(hubs[j].innerHTML =='Смартфоны и коммуникаторы')
						topicTitle.style.backgroundColor ='#e8f6f0'; //о смартфонах (зелёный)
				}
				if(/ translation/.test(topic.className) && topicTitle)
					topicTitle.style.backgroundColor ='#f0f4fa'; //топик-перевод (светло-синий)
				var lNAV = hS.listNewsAuthors.val;
				//'topicHaCut'.wcl(isQA , topicHaCut)
				for(var j in lNAV) if(autName == lNAV[j] || !inQA && !topicHaCut){
					topicTitle.style.backgroundColor ='#fafdf2'; //новость (жёлтый)#f2f6e8
					news = content; //для свёртки
					$e({cl:'recov1'
						,cs:{marginLeft:'8px'}
						,at:{title:'новость'}
						,ht:'<div class="recov2"></div><div class="recov3">н</div>н'
						,aft: topicTitle
					});
					break;
				}
				if(/ link/.test(topic.className) && topicTitle)
					topicTitle.style.backgroundColor ='#f0faf4'; //топик-ссылка (зеленоватый)
			}
			if(underCut && topicTitle)
				topicTitle.title = titleBase + titleAdd;
			//'toBK'.wcl(hS.toBK.val , topicTitle)
			if((hS.toBK.val || hS.noBK.val || hS.noNews.val) && topicTitle){ //"БК" и другая обработка заголовков
				var topicTitleText = topicTitle.innerHTML;
				for(var j in hubs){if(hubs[j].parentNode){
					var blogName = hubs[j]
						,blogNameText0 = blogName.innerHTML
						,regexBK = /^Блог компании /
						,isCorp = regexBK.test(blogNameText0)
						,blogNameText = blogNameText0.replace(regexBK,'');
					if(isCorp || hS.shortenHub.val){
						$e({el: blogName
							,cs: isCorp ?{backgroundColor:'#def', paddingLeft:'3px', paddingRight:'3px'}:{}
							//,at: blogNameText.length >13 ?{title: blogNameText}:{}
						});
						blogNameText = blogNameText.replace(/^(.{12})..+/,'$1..'); //до 13 символов на БК

					}
					if(blogNameText != blogNameText0){
						blogName.innerHTML = blogNameText;
						blogName.title = blogNameText0;}
					blogName.style.fontSize ='13px';
					blogName.style.lineHeight ='11px';
					if(blogNameText.length >18)
						blogName.className +=' small'; //корректировано с 16px и bold на 15px из-за sans-serif
					if(hS.noBK.val){ //свернуть БК
						var blogNameText0 = blogName.innerHTML;
						if(content && isCorp || regexBK.test(blogNameText0))
							content.style.display ='none';
						var tags = next('tags', content);
						if(tags)
							tags.style.display ='none';
					}
					$e({el: hS.noNews.val && news, cs:{display:'none'}, f:function(){ //свернуть новости
						$e({el: next('tags', content), cs:{display:'none'} });
					} });
				}}
				topicTitle.innerHTML ='<span>'+ topicTitle.innerHTML.replace(/<br>/g,' ') +'</span>';
				var topicTitleSpan = $q('span', topicTitle);
				topicTitleSpan.title = topicTitle.title;

				//wcl(linkA, origA, linkA && linkA.title)
				if(linkA || origA)
					topicTitle.title = linkA ? linkA.title : origA.href;
				var s = linkA && linkA.getElementsByTagName('span')[0]
					,fromSand = !!$q('a[href*="/sandbox"]', topicTitle.parentNode);
				if(linkA && s){
					linkA.innerHTML ='<span>'
						+ s.title.match(/\d+/)[0] +' '
						+ linkA.title.replace(/http:\/\//,'')
							.replace(/\/.+/,'') +'</span>';
					s = s.title;
					linkA.getElementsByTagName('span')[0].title = s;
				}
				if(topicTitleText.replace(/<[^>]*>/g,'').length +12* fromSand >40 || inQA){
					topicTitle.style.fontSize ='13px';
					topicTitleSpan.style.fontSize ='14px';
					topicTitleSpan.style.lineHeight ='14px';
				}else{
					topicTitle.style.cssText +=';font-size:15px!important;line-height:15px';
					topicTitleSpan.style.cssText +=';font-size: 16px!important';
				}
				if(topicTitleText.length +12* fromSand >80 ){
					topicTitle.style.cssText +=';font-size:11px!important;line-height:11px;vertical-align: middle!important';
					topicTitleSpan.style.fontSize ='12px';
					topicTitleSpan.style.lineHeight ='12px';
				}
				if(inQA){
					topicTitleSpan.style.fontFamily ='Arial,Helvetica,sans-serif';
					info.className +=' qa';
					topic.className +=' qa';
					$e({el: info, bef: content});
					$e({cl:'clear', cs:{height:'1px'}, bef: content});
					if(commLink){
						var nAns = commLink.innerHTML.match(/\d+/);
						if(nAns && nAns[0]){
							var nAns = parseInt(nAns[0]);
							if(nAns < 5){
								var s ='';
								for(var j=0; j < nAns; j++)
									s +=' ☑'; //==Избирательная урна с галочкой
								commLink.innerHTML = s;
							}
							if(nAns ==1)
								commLink.parentNode.className +=' ans1';
						}else
							commLink.innerHTML =0;

					}
				}
			}//конец toBK
			if(hS.strongCut.val && $q('.content:not(.c2)', topic)){ //ограничение высоты начал статей (244px)
				topic.querySelector('.content:not(.c2)').className +=' powerCut';
				blockBrs($q('.content:not(.c2)', topic));
			}
			if(underCut && topicTitle)
				(!hS.toBK.val ? topicTitle : topicTitle.getElementsByTagName('span')[0])
					.addEventListener('click', showContent,!1); //показ статьи или комментариев
			if((linkA || origA) && topicTitle){
				topicTitle.setAttribute('target','_blank'); //переход с начала заголовка на ссылку в новом окне
				topicTitle.addEventListener('click', function(ev){
					ev.target.href = ev.target.title;
				},!1);
			}
			var cssSite ='tutorial,solution,sandbox,translation,recovery'.split(',') //смена флагов на чистый CSS
				,cssHA ='tutor,decision,sand,trans,recov'.split(',')
				,txtHA ='обуч.,реш.,пес.,перевод,восст.'.split(',');
			for(var j=0; j < 5; j++){
				var flag = $q('.flag_'+ cssSite[j], parents('^title$', topicTitle));
				if(flag){
					var txtHAJ = flag.tagName !='A' ? '<div class='+ cssHA[j] +'3>'+ txtHA[j] +'</div>'
						: '<a class='+ cssHA[j] +'3 href="'+ flag.href +'">'+ txtHA[j] +'</a>';
					$e({cl: cssHA[j] +1
						,ht:'<div class='+ cssHA[j] +'2></div>'+txtHAJ + txtHA[j]
						,aft: flag});
					flag.style.display ='none';
				}
			}
			if(origA){
				extLinks(origA.parentNode);
				origA.style.color ='#a33';
			}
			var topicHaCut = $q('a.habracut', topic);
			//''.wcl(underCut, topicHaCut)
			if(underCut && topicHaCut){ //есть хабракат
				topicHaCut.addEventListener('click', showContent,!1); //показ статьи или комментариев
				topicHaCut.title = titleBase;
				$e({cl:'showComm btnBack inln'
					,ht:'&rarr;'
					,at:{title: titleAdd}
					,on:{click: showContent} //показ статьи или комментариев
					,apT: topicHaCut.parentNode }); //кнопка справа от ката
			}
			if(underCut && commLink){ //ссылка на комментарии (или ответы в QA)
				commLink.addEventListener('click', showContent,!1); //показ комментариев
				commLink.title ='подгрузка комментариев';
				var commSpan = $q('span', commLink);
				if(commSpan && commSpan.innerHTML =='Комментировать')
					commSpan.innerHTML ='Комм.', commSpan.style.fontStyle ='italic';
			}
			if(underCut)
				$e({cl:'showComm btnBack inln' //показ комментариев
					,ht:'&rarr;'
					,at:{title: titleAdd}
					,on:{click: showContent} //показ статьи или комментариев
					,apT: info }); //кнопка показа комментариев
			var voting = info && $q('.voting', info);
			(function(voteA){if(voteA)
				voteA.addEventListener('click',function(){ //место события "проверка оценок"
					if(!$q('canvas', this))
						win.setTimeout(function(){evtChangeDom(voteA);}, 2499);
			}, !1);})(voting);
		//'chkVote'.wcl(win.habrPercentageRing , !info.querySelector('.voting').querySelector('canvas'))
			if(hS.noPodcast.val || hS.noAuthor.val || hS.noContent.val || hS.noSmart.val || hS.noEvent.val){ //свернуть подкасты, фильтр по авторам, по содержимому
				if(hS.noAuthor.val){
					var aAut = hS.listNoAuthor.val.split(',');
					for(var j =0, aL = aAut.length; j < aL; j++)
						if(aAut[j].replace(/(^ *| *$)/g,'') == autName) break;
					var isToHide = (j!=aL);
				}
				if(hS.noContent.val || hS.noSmart.val){ //"контент" - это заголовок, хабы и текст
					var aAut = hS.noContent.val ? hS.listNoContent.val.split(',') : [];
					if(hS.noSmart.val){
							aAut = aAut.concat(hS.defa.listNoSmart.replace(/([^,]),(?!,)/g,'$1@@').replace(/,,/g,',').split('@@') )
						if(!(hS.listNoSmart.val.split(',').length ==1 && hS.listNoSmart.val.split(',')[0]==''))
							aAut = aAut.concat(hS.listNoSmart.val.replace(/([^,]),(?!,)/g,'$1@@').replace(/,,/g,',').split('@@') );
					}
					var topicTitleI = topicTitle && topicTitle.innerHTML.replace(/<.*?>/g,'');
					var aHubs =[], s =!1;
					for(var j in hubs) //проверка набора хабов на включение строк
						if(hubs[j].parentNode) aHubs[j] = hubs[j].innerHTML;
					for(var j =0, aL = aAut.length, j0 = aL; j < aL; j++){
						var r = RegExp(aAut[j],'im');
						for(var kk=0, aHL = aHubs.length; kk < aHL; kk++)
							s = s || r.test(aHubs[kk]);
						if(r.test(topicTitleI) || s || r.test(content && content.innerHTML)){ //найден фильтр
							var o = document.createElement('SPAN');
							o.innerHTML = '<i style="color:#aaa">/</i>'+ aAut[j] +'<i style="color:#aaa">/i</i>';
							o.title ='стоп-строка (рег. выражение)';
							info.appendChild(o);
							var j0 = j;
						}
					}
					isToHide = isToHide || j0 != aL;
					//'isToHide'.wcl(j, topicTitleI, isToHide)
				}
				//'noContent'.wcl(isToHide, hubs)
				if(hS.noPodcast.val && content || isToHide){
					var isPodcast = /подкаст/i.test(topicTitle.innerHTML); //обнаружение подкаста
					if(isPodcast || isToHide){
						content.style.display ='none';
						var ifrPres = $q('iframe', content);
						if(ifrPres){
							if(!isChrome)
								ifrPres.style.display ='none';
							else{
								ifrPres.style.position ='absolute'; //баг хрома
								ifrPres.style.left ='-999px';}
						}
						var tags = next('tags', content);
						if(tags)
							tags.style.display ='none';
					}
				}
				if(hS.noEvent.val && /event/.test(topic.className) && topicTitle){
					topic.style.display ='none';
					datesShorten($e({cl:'eventLine', cs:{marginLeft:'3px'}, ht:'<a href="'+ topicTitle.href +'" target="_blank">ev <span class="eventHid">'+ $q('span', topicTitle).innerHTML +'</span></a> <i class="date">&mdash; '+ $q('.date', topic).getAttribute('title').replace(/^0(\d)/,'&nbsp;$1') +'</i>', bef: topic}), '.date');
				}
				isToHide =0;
			}
			if(published && info){
				$e(isChrome && inQA ?{el: published.cloneNode(!0), prT: info}:{el: published.cloneNode(!0), cs:{cssFloat:'none',display:'inline-block'}, apT: info}); //дубль дат
				if(inQA)
					published.innerHTML ='';
			}
			//=== точка "каждая аннотация" ===
			byTextNodes(topic, haReplace);
			var aut = $q('.author', topic) //округление рейтинга
				,rating = aut && $q('.rating', aut);
			if(rating)
				rating.innerHTML = Math.round(parseFloat(rating.innerHTML.replace(/,/,'.').replace(/–/,'-') ));
			if(content) //обработчики контента (вызов событием)
			if(win.opera || /Firefox\/[345]/.test(navigator.userAgent)){
				if(win.addKarmEvent) //показ кармы, если установлен HabraKarmaView.user.js
					win.addKarmEvent(content);
				if(win.habrPercentageRing)
					win.habrPercentageRing(content);
			}else
				evtChangeDom(content); //CustomEvent в блоке
			extLinks(content); //внешние ссылки в подгруженном
			showSourceLang(content); //показ языка кодов в подгруженном
		}
		if(hS.strongCut.val){ //перенос изображений вверх после их загрузки
			var sCutI =0, sCutWw;
			sCutWw = win.setTimeout(function(){
				var imgsUp = function(topic){ //==подъём висящих рисунков==
					var imgs = $qA('img:not(._noAddOwnView)', topic)
						,prevImg =0;
					for(var j =0, iL = imgs.length; j < iL; j++){ //по картинкам в аннотации
						var img = imgs[j];
						if(img.offsetHeight ==0)
							noAllImgLoaded =1;
						if(img.offsetHeight && (!img.getAttribute('viewed') || img.getAttribute('viewed')==1) && (
								img.offsetTop - topic.offsetTop >= strongCutImgMinH
									|| img.offsetHeight + img.offsetTop - topic.offsetTop > tT + 20
										&& img.offsetTop - topic.offsetTop >5)){
							var pCut = parentsPrev(' powerCut$', img)
								,nu = Number(img.getAttribute('number') || j)
								,c = $e({el:'SPAN' //метка рисунка
									,cl:'strongCutImgPlace'
									,ht:'рис.'+ (nu+1)
									,cs: img.align=='left'|| img.align=='center'|| img.align=='middle'
										? {cssFloat:'left', margin:'-4px 4px -1px -2px'}
										: {}
								}),
								prevImg0 = parentsPrev(' powerCut$', img).prev;
							if(prevImg0.tagName =='A'){ //перекрашивание метки рисунка, если ссылка
								var a = document.createElement('A');
								a.href = prevImg0.href;
								a.appendChild(c);
								c.style.background ='#9ce';
								c.style.color ='#148';
								c = a;
							}
							if(pCut.prev && pCut.prev.nextSibling){ //вставка метки рисунка
								pCut.insertBefore(c, pCut.prev.nextSibling);
								if(pCut.prev.nextSibling.nextSibling && pCut.prev.nextSibling.nextSibling.tagName=='BR') //удаление лишних BR
									pCut.removeChild(pCut.prev.nextSibling.nextSibling);
							}else
								pCut.appendChild(c);
							var movedHid = prevImg0 && prevImg0.tagName=='IMG' && prevImg0.previousSibling && prevImg0.previousSibling.className =='de-img-hid' && prevImg0.previousSibling; //привязанный к IMG блок для просмотра
							//'movedHid'.wcl(movedHid, prevImg0, prevImg0.previousSibling && prevImg0.previousSibling.tagName)
							if(prevImg0 && pCut && prevImg && prevImg.nextSibling) //поднятие рисунка
								pCut.insertBefore(prevImg0, prevImg.nextSibling);
							else
								pCut.insertBefore(prevImg0, pCut.childNodes[0]);
							if(movedHid) //совместный перенос блока с IMG
								pCut.insertBefore(movedHid, prevImg0);
							img.title = 'рис.'+(nu+1) +' '+ (img.title ||'');
							img.setAttribute('viewed','upped');
						}else{
							if(img.getAttribute('viewed')!='upped')
								img.setAttribute('viewed',1);
							var f2 = function(topic){
								//'22loaded'.wcl(topic);
								return function(){imgsUp(topic);};
							}
							img.addEventListener('load',new f2(topic) ,!1);
						}
						if(!img.getAttribute('number'))
							img.setAttribute('number',j);
						prevImg = prevImg0;
					}
				};
				var topics = $qA('.powerCut')
					,tO = strongCutImgMinH *2 +4
					,noAllImgLoaded =0;
				for(var i =0; i < topics.length; i++){
					var topic = topics[i]
						,ifrs = $qA('iframe[src*="youtube.com/"]', topic);
					if(ifrs.length){
						for(var j=0; j < ifrs.length; j++){
							var ifr = ifrs[j]
								,srcCode = ifr.getAttribute('src').match(/\/([\w-]*)($|\?)/);
							if(srcCode.length >1){
								srcCode = 'http://i3.ytimg.com/vi/'+ srcCode[1] +(strongCutImgMinH <=120?'/default.jpg':'/sddefault.jpg');
								if(!isChrome)
									ifr.style.display ='none'; //обход бага
								else{
									ifr.style.position ='absolute';
									ifr.style.left ='-999px';}
								$e({el:'IMG' //превью-картинка ютуба
									,cl:'youtub'
									,at:{src: srcCode, title:'=youtube=', align:'center'}
									,apT: $e({el:'A'
										,at:{href:ifr.getAttribute('src').replace(/embed\//,'watch?v='), target:'_blank'}
										,bef: ifr}) });
							}
						}
						//youtube.com/watch?v=jq_WaOLjdyQ http://www.youtube.com/embed/jq_WaOLjdyQ
						//i3.ytimg.com/vi/jq_WaOLjdyQ/hqdefault.jpg // /default - 120x90
					}else{
						ifr = $q('object[data*="vimeo.com/"]', topic);
						if(ifr){
							ifr.setAttribute('width', Math.floor(ifr.getAttribute('width')/2) );
							ifr.setAttribute('height', Math.floor(ifr.getAttribute('height')/2) );
							ifr.style.cssFloat ='left';
							ifr.style.marginRight ='6px';
							if(ifr.nextSibling && ifr.nextSibling.tagName=='BR')
								ifr.parentNode.removeChild(ifr.nextSibling);
						}
					}
					$e({cl:'prevLastInAnno'
						,bef: $q('div.clear', topic) }); //индикатор висящих рис.
					var tT = $q('.prevLastInAnno', topic).offsetTop - topic.offsetTop;
					imgsUp(topic); //подъём висящих рисунков
					var koefPress =1.14; //коэффициент для сжатия интерлиньяжа (захват 2 строк)
					(function(topic2, j){win.setTimeout(function(){
						var tS = topic2.scrollHeight
							,p = document.createElement('DIV')
							,tT = $q('.prevLastInAnno', topic2).offsetTop - topic2.offsetTop;
					//'sett-topic2'.wcl(topic2, (+new Date())-j, tO, tT, tS, tT >= tO && tT < tO *koefPress && tS < tO *koefPress, tS - tT);
						if(tT >= tO && tT < tO *koefPress && tS < tO *koefPress){
							p.className ='content powerCut'; //дополнительное сжатие по высоте на 10%
							topic2.className ='pressed';
							topic2.parentNode.insertBefore(p, topic2.nextSibling);
							p.appendChild(topic2);
						}
						imgsUp(topic2); //(повторный) подъём висящих рисунков
					}, 600);})(topic, +new Date()); //TODO делать по onload рисунков
				}
				if(++sCutI <1 && !noAllImgLoaded) win.setTimeout(arguments.callee, 499 + sCutI *400);
			},499);
		}
	}
	var rotPosts = $q('.rotated_posts .rotTRow');
	if(rotPosts){ //обработка ===== нижних 3 ссылок =====
		var rPostA = $qA('a.grey', rotPosts);
		//'rPost'.wcl(rPostA)
		for(var i in rPostA){ var rPAI = rPostA[i]; if(rPAI.attributes){
			rPAI.innerHTML = '<span>'+ rPAI.innerHTML +'</span> ';
			$e({el:'span'
				,cl:'showComm btnBack inln'
				,ht:'&rarr;'
				,at:{title:'подгрузить статью с комментариями'}
				,on:{click: showContent} //показ статьи или комментариев
				,apT: rPAI }); //кнопка справа от ката
			//'rPAI'.wcl(rPAI.innerHTML);
		}}
	}
//===== далее - простая одиночная страница с комментариями =======

	var lukes = $qA('.i-am-your-father-luke'); //добавление подписей к Вн.Голосу
	if(lukes && lukes.length){
		var o = document.createElement('DIV');
		o.className ='post';
		o.innerHTML ='<div class="infopanel">(это сообщение в формате "<a style="color:#888" target="_blank" href="'+HRU+'/info/help/tools/" title="описание на странице помощи">Внутренний Голос ⇗</a>" от лидера рейтинга пользователей или администрации)</div>';
		for(var i in lukes){ //скрытие ненужных шаринг-кнопок
			var lui = lukes[i];
			if(lui.parentNode)
				lui.appendChild(o);
		}
	}
	var hsh ={noTwit:'twitter', noVk:'vkontakte', noFb:'facebook', noGP:'googleplus'};
	for(var i in hsh){	if(hS[i].val){ //скрытие ненужных шаринг-кнопок
		var shars = $qA('.infopanel .'+ hsh[i]);
		if(shars && shars.length)
			for(var j in shars)
				if(shars[j].style)
					shars[j].style.display ='none';
	}}
	if(hS.shortDates.val) //укорочение дат
		datesShorten(document,'.post .published, .conversation_page .messages .info .time');
	if(comments && comments.length){
		correctCommentsAfter(comments[0], document.body); //==== обработка комментариев ====
		var topic = $q('.post')
			,panel = $q('.infopanel')
			,date = topic && $q('.published', topic)
			,author = panel && $q('.author', panel)
			,issue = panel && $q('.original-author', panel)
			,topicTitle = topic && $q('.title', topic)
			,doubleDataAuthor = document.createElement('SPAN')
			,voting = panel && $q('.voting', panel)
			,voteRO = voting && $q('.plus', voting)
			,isRO = voteRO && /read-only/i.test(voteRO.title);
		//=== точка "одна статья" ===
		byTextNodes(topic, haReplace); // обработка слов статьи (без комментариев)
		extLinks($q('.content', topic));
		extLinks($q('.original-author', topic));
		(function(voteA){if(voteA)
			voteA.addEventListener('click',function(){ //место события "проверка оценок"
				if(!$q('canvas', this))
					win.setTimeout(function(){evtChangeDom(voteA);}, 2999);
		}, !1);})(voting);
		doubleDataAuthor.className ='dblAuthor';	//дублирование даты-автора вверху
		if(date){
			doubleDataAuthor.appendChild($e({clone: date, cs:{display:'inline'} }) );
			$e({el: date
				,aft: !issue && author ? author : issue && author ? issue : $q('.share', panel) });
		}
		if(author){
			var rating = $q('.rating', author);
			if(rating)
				rating.innerHTML = Math.round(parseFloat(rating.innerHTML.replace(/,/,'.').replace(/–/,'-') ));
			doubleDataAuthor.appendChild(document.createTextNode(' — '));
			doubleDataAuthor.appendChild($e({clone: author, cs:{display:'inline'} }) );
		}
		if(issue){
			$q('a', issue).style.color ='#a33';
			/*issue.querySelector('a').setAttribute('target','_blank'); //ссылка в новое окно*/
			doubleDataAuthor.appendChild(document.createTextNode('; '));
			doubleDataAuthor.appendChild($e({clone: issue, cs:{display:'inline'} }) );
		}
		doubleDataAuthor.style.cssFloat ='right';
		doubleDataAuthor.style.marginLeft ='-100%';
		doubleDataAuthor.style.position ='relative';
		doubleDataAuthor.style.top ='-1.1em';
		topicTitle && topicTitle.parentNode.insertBefore(doubleDataAuthor, topicTitle);
		var lnkA = topic && $qA('.dblAuthor a', topic);
		if(lnkA)
			for(var i =0, lA = lnkA.length; i < lA; i++){
				lnkA[i].style.color = i <1 ?'#cf0000':'#a33';
				lnkA[i].style.textDecoration ='none';
				if(i ==1) lnkA[i].setAttribute('target','_blank'); //ссылка в новое окно
			}
		var topicTitleSpan = topicTitle && $q('span.post_title', topicTitle)
			,author = topic && $q('.author a', topic)
			,autName = topic && author && $q('.author a', topic).innerHTML
			,hubs = topic && $qA('.hubs >.hub', topic);
	//'lNAV'.wcl(autName, topicHaCut, topicTitle, hubs, !isQA.length)
		if(hS.colorTopic.val && topicTitle && hubs && !isQA.length){
			for(var j in hubs) if(hubs[j].innerHTML =='Переводы'){
				topicTitleSpan.style.backgroundColor ='#f0f4fa'; //топик-перевод (светло-синий)
				break;
			}
			if(topic && / translation/.test(topic.className) && topicTitleSpan){
				topicTitleSpan.style.backgroundColor ='#f0f4fa'; //топик-перевод (светло-синий)
				topicTitleSpan.style.paddingRight ='8px';
			}
			var lNAV = hS.listNewsAuthors.val
				,topicHaCut = $q('a[name="habracut"]', topic);
			for(var j in lNAV) if(autName == lNAV[j] || !topicHaCut){
				topicTitleSpan.style.backgroundColor ='#fafdf2'; //новость (жёлтый)#f2f6e8
				$e({cl:'recov1'
					,cs:{marginLeft:'8px'}
					,at:{title:'новость'}
					,ht:'<div class="recov2"></div><div class="recov3">н</div>н'
					,aft: topicTitleSpan
				});
				break;
			}
			if(topic && / link/.test(topic.className) && topicTitleSpan){
				topicTitleSpan.style.backgroundColor ='#f0faf4'; //топик-ссылка (зеленоватый)
				topicTitleSpan.style.backgroundImage ='url(http://456)';
				topicTitleSpan.style.paddingRight ='8px';
			}
		}
		if(isRO){ //скрыть стрелки оцениваний для read-only
			var votes = $qA('.comments_list .info .voting a');
			if(votes) for(var i in votes) if(votes[i].attributes)
				votes[i].style.display ='none';
		}
	}
	var fileBase64Post = function(){
		var dataURL = this.canvas.toDataURL(this.getImageType()) // grab the snapshot as base64
			,imgData = atob(dataURL.substring(13 + this.getImageType().length)) // convert to binary
			,filenameTimestamp = (new Date().getTime())
			,separator = '----------12345-multipart-boundary-' + filenameTimestamp;
		// Javascript munges binary data when it undergoes string operations (such as concatenation), so we need
		//   to jump through a bunch of hoops with streams to make sure that doesn't happen
		// Create a string input stream with the form preamble
		var prefixStringInputStream = Components.classes['@mozilla.org/io/string-input-stream;1']
			.createInstance(Components.interfaces.nsIStringInputStream);
		var formData ='--'+ separator +'\\r\\nContent-Disposition: form-data; name="data"; filename="snapshot_'
			+ filenameTimestamp + (this.getImageType() =='image/jpeg'?'.jpg':'.png') +'"\\r\\nContent-Type: '
			+ this.getImageType() +'\\r\\n\\r\\n';
		prefixStringInputStream.setData(formData, formData.length);
		// write the image data via a binary output stream, to a storage stream
		var binaryOutputStream = Components.classes['@mozilla.org/binaryoutputstream;1']
			.createInstance(Components.interfaces.nsIBinaryOutputStream);
		var storageStream = Components.classes['@mozilla.org/storagestream;1']
			.createInstance(Components.interfaces.nsIStorageStream);
		storageStream.init(4096, imgData.length, null);
		binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));
		binaryOutputStream.writeBytes(imgData, imgData.length);
		binaryOutputStream.close();
		// write out the rest of the form to another string input stream
		var suffixStringInputStream = Components.classes['@mozilla.org/io/string-input-stream;1']
			.createInstance(Components.interfaces.nsIStringInputStream);
		formData ='\\r\\n--'+ separator +'\\r\\nContent-Disposition: form-data; name="description"\\r\\n\\r\\n'
			+ description +'\\r\\n--'+ separator +'--\\r\\n';
		suffixStringInputStream.setData(formData, formData.length);

		// multiplex the streams together
		var multiStream = Components.classes['@mozilla.org/io/multiplex-input-stream;1']
			.createInstance(Components.interfaces.nsIMultiplexInputStream);
		multiStream.appendStream(prefixStringInputStream);
		multiStream.appendStream(storageStream.newInputStream(0));
		multiStream.appendStream(suffixStringInputStream);

		// post it
		req.open('POST','http://yoursite.com/upload_endpoint', true);
		req.setRequestHeader('Accept','*/*, application/xml');
		req.setRequestHeader('Content-type','multipart/form-data; boundary='+ separator);
		req.setRequestHeader('Content-length', multiStream.available());
		req.setRequestHeader('Authorization','Basic '+ btoa(username +':'+ password));
		req.setRequestHeader('User-Agent','YourUserAgent/1.0.0');
		req.send(multiStream);
	};
/*
var addAdReq = new XMLHttpRequest();
addAdReq.open('POST', postAdUrl, false);
addAdReq.setRequestHeader("Content-Type", "multipart/form-data; boundary="+boundary);
var stringStream = Components.classes["@mozilla.org/io/string-input-stream;1"].createInstance(Components.interfaces.nsIStringInputStream);
var data = "";
data += boundary;
data += "\r\n";
data += 'Content-Disposition: form-data; name="category_id"\r\n\r\n';
data += categoryId;
data += "\r\n";
data += boundary;
data += "\r\n";
.......[и т.д.].......
data += boundary;
data += "--\r\n";
stringStream.setData(data, data.length);
addAdReq.send(stringStream);//в хедере строка boundary должна содержать на два символа '-' меньше чем в остальных случаях.

http://igstan.ro/posts/2009-01-11-ajax-file-upload-with-pure-javascript.html */

    var fPanel = $q('form .panel')
        ,formTA;
    if(fPanel)
        for(formTA = fPanel; formTA !=null && !/form/i.test(formTA.tagName); formTA = formTA.parentNode);
	if((comments && comments.length || $q('#post_form') )&& !isRO && h.uName && typeof window.FileReader !=u){
        $e({cl:'habrAjaxInfo droppedF for_authors'
			,cs:{paddingLeft:'14px'}
			,ht:'<div style="display:inline-block"><div style="float:left; width:22px; height:12px;"><div class=hAjaxLogo style="float:none; width:32px; top:-15px; left:-12px;border-radius: 5px;'+ (isHLogo ? 'background-image:url('+ metaD.icon +')':'height:auto') +'"></div></div>'
                +'<div class=hoverView style=float:right;padding-bottom:0.2em>(?)</div><div class="hoverView hovered" style=margin-top:1.3em>'
                    +'разместить на <a href='+HSO+' target=_blank>habrastorage.org</a>; Макс. ширина без ужатия - 1920'
                +'</div>'
                +'<button>Публиковать</button>'
                +'<div class=fileName>abcde.png</div>'
                +'<div class=imgDimens>1234567 <span style=font-variant:small-caps>б.</span></div>'
                +'<button class=previ>пре-<br>вью</button><button class="previ previCancel" style=float:right title=отмена>X</button>'
                +'<input id=resizeWidth placeholder=1028 title="ресайз до ширины" /><br>'
      				+'<input id=resizeHeight placeholder=2006 title="ресайз до высоты" /></div>'
            +''
      			,apT: $e({cs:{position:'relative', height:0}
                          ,apT: sidebar})
      		});
		$e({cl:'habrAjaxInfo pixList for_authors'
			,cs:{paddingLeft:'14px'}
			,ht:'<div style="float:left; width:22px; height:12px;"><div class=hAjaxLogo style="float:none; width:32px; top:-15px; left:-12px;border-radius: 5px;'+ (isHLogo ? 'background-image:url('+ metaD.icon +')':'height:auto') +'"></div></div>'
				+' затащите файл&nbsp;картинки&nbsp;<div class=hoverView>(?)<div class=hovered>'
				+'сюда или в поле ввода комментария (статьи, вопроса, ответа, письма), чтобы разместить на <a href='+HSO+' target=_blank>habrastorage.org</a> (тег появится под курсором).'
					+'<div>Макс. ширина - 1920 без ужатия</div>'
				+'</div></div><br>'
				+' &nbsp; <a href=#>последние</a> (NN),<br>'
				+'&nbsp; <a href=#>избранные</a> (N),<br>'
				+'&nbsp; <a href=#>удалённые</a> (NNN).<br>'
			,apT: sidebar
		});
        if(formTA){
			var preImgSend = $e({cl:'preImgSend habrAjaxInfo'
                ,ht:'<div class=radios style="position:relative;"><div class=radios2 style="position:absolute;bottom:3px;"><input type=radio name=r1 id=r1n1 /><label for=r1n1>слева</label><input type=radio name=r1 id=r1n2 /><label for=r1n2>по центру</label><input type=radio name=r1 id=r1n3 /><label for=r1n3>справа /</label><input class=rAll type=radio name=r1 id=r1n4 /><label for=r1n4 class=rAll>в строке</label></div></div>'
                    +'<button class="previ previCancel" style="float:right; width:7%; height:3.9em" title=отмена>X</button>'
                    +'<div class=hoverView style="float:right; text-align:center">'
						+'<div class=imgDimens><span class=weight>-1</span> <span style=font-variant:small-caps>б.</span></div>'
						+'<input id=resizeWidth2 placeholder=width title="ресайз до ширины" /><br>'
						+'<input id=resizeHeight2 placeholder=height title="ресайз до высоты" />'
                    +'</div><div class=imgPrevi style="position:relative;float:right;width:94px; height:4.2em">'
                        +'<div class=fit style="position:absolute;bottom:0;width:94px; height:94px; border:1px solid #ddd; background:#F0F0F0"></div>'
                    +'</div>'
                    +'</div><div class=imgPrevi style="position:relative;float:right;width:94px; height:4.2em">'
                        +'<div class=centered style="position:absolute;bottom:0;width:94px; height:94px; border:1px solid #ddd; background:#F0F6F0"></div>'
                    +'</div>'
					+'<div class=overUrl><div class=imgDate></div><input id=aUrl placeholder=URL title="ссылка на рисунке" style="margin-left:-11px; text-align:left"/></div>'
						+'<span class=overName><span class=fileName>(имя файла)</span> . <img src=/images/favorite.gif style=width:150px;height:1px /></span>'
					+'<a href="#.jpg" class="aPrevi imgL"><button class=previ style="width:10%" title="в плавающем блоке">пре-<br>вью</button></a>'
					+'<button class=publish style="width:30%;height:2.6em" title="центровка по радиокнопкам или Shift/Ctrl+Shift/Ctrl">Публиковать</button>'
                ,bef: fPanel
            });
        }
		var fileDrop3 = $q('#text_textarea')||$q('#comment_text')||$q('#answer_text')||$q('#clarify_form #text')
			,centPrevi = $q('.imgPrevi .centered'), fitPrevi = $q('.imgPrevi .fit');
		if(fileDrop3){
			$e({
				el: fileDrop3
				,on:{
					dragover: function(ev){'dragover0'.wcl();this.classList.add('hover'); $pdsp(ev);}
					,dragend: function(){'dragend0'.wcl();this.className =''; return!1;}
					,drop: function(ev){
						this.classList.remove('hover');
						$pdsp(ev);
						var file = ev.dataTransfer.files[0]
							,reader = new FileReader();
						reader.onload = function(ev){
							'fileDrop3-target'.wcl(ev.target);
							preImgSend.style.display ='block';
							fileDrop3.style.background = centPrevi.style.background = fitPrevi.style.background ='url('+ ev.target.result +') no-repeat center';
							centPrevi.style.backgroundColor ='#F0F6F0';
							fitPrevi.style.backgroundSize ='contain';
							fitPrevi.style.backgroundColor ='#F0F0F0';
							var resu = ev.target.result;
							handlImgViews(preImgSend,'.aPrevi.imgL');
							var previLink = $q('.aPrevi img', preImgSend)
							previLink &&(previLink.src = resu);
							win.addEventListener('loadImg',function(){
								var dimS = previLink.title.match(/(\d+)x(\d+)$/);
								if(dimS){
									dimS = dimS.slice(1);
									$q('#resizeWidth2', preImgSend).setAttribute('placeholder',dimS[0]);
									$q('#resizeHeight2', preImgSend).setAttribute('placeholder',dimS[1]);
							}},!1);
							$q('.imgDimens .weight',preImgSend).innerHTML = file.size;
							$q('.fileName',preImgSend).innerHTML = file.name;
                            var fD = new Date(file.lastModifiedDate);
                            $q('.imgDate',preImgSend).innerHTML = fD.getFullYear()
                                +'-'+ (fD.getMonth()+1<=9?'0':'') +(fD.getMonth()+1)
                                +'-'+(fD.getDate()<=9?'0':'')+ fD.getDate()
                                +','+ getDay([0,fD.getDate(),0,fD.getFullYear()], fD.getMonth())
                                +' '+ (fD.getHours()<=9?'0':'') + getHourMins(fD)+
                                ':'+(fD.getSeconds()<=9?'0':'')+fD.getSeconds();
						};
						var formData = new FormData();
						formData.append('Filedata', file);
						'fileDrop3-file'.wcl(file.size, file.lastModifiedDate, file.mozFullPath, formData);
						reader.readAsDataURL(file);
						return!1;
					}
				}
			});
			$e({el:$q('.aPrevi.imgL button', preImgSend)
				,on:{click:function(ev){
					var img = this.parentNode.previousSibling.firstChild
						dimS = img.title.match(/(\d+)x(\d+)$/);
					dimS && addFullImg(img, dimS.slice(1));
					$pdsp(ev);
					return!1}
				} });
			$e({el:$q('.previCancel', preImgSend)
				,on:{click:function(ev){
					fileDrop3.style.backgroundImage ='none';
					preImgSend.style.display ='none';
					$pdsp(ev);
			}} });
			$e({el:$q('.publish', preImgSend)
				,on:{click:function(ev){
                    openInFrame({clientY: ev.clientY}, {href:HSO+'/'});
					$pdsp(ev);
			}} });
		}
	}
	var menuA = $qA('.main_menu a');
	menuA && menuA[0] && $e({el: menuA[0]
		,cl:'date'
		,at:{title:'лента'+(hS.postsLinkNew.val ?'-все-новое':'')}
		,ht: getHourMins().replace(/(\d\d):/,'$1') +'<br>'+ getDay([0,NOWdate.getDate(),0,NOWdate.getFullYear()], NOWdate.getMonth())});
	if(menuA && menuA[0] && hS.postsLinkNew.val || hS.allFeed.val){
		if(menuA[0].href)
			menuA[0].href = HRU + (/(\/feed\/)/.test(menuA[0].href) ?'/feed/'
				+ (hS.allFeed.val ?'/posts/':''): (h.uName ?'':'/posts') + (hS.allFeed.val && hS.postsLinkNew.val ?'/corporative/':'/collective/') );
		if(hS.postsLinkNew.val && menuA[0].href)
			menuA[0].href +='new/'; //ссылки 'Лента", "Посты" - на "новые"
	}
	if(comments && comments.length || fPanel )
		addTaButtons(comments[0] || formTA ); //добавление кнопок над полем ввода
	h.uName2 = $q('.user_header .username') || h.uName; //выбор чужого юзера с приоритетом
	h.uName2 = h.uName2 && h.uName2.innerHTML;
	authorClicks(document); //обраб-к кликов на авторах, избранном, настройках, авторизации
	authorClicks($q('#search_form input[type="submit"][value=""]')); //на кнопке поиска
	handlImgViews(document); //показ увеличенных картинок

	if(inFrame){ //удаление персонального меню в фрейме
		var footer = $q('#footer');
		if(footer) footer.style.display ='none';
		var panelPers = $q('#header .userpanel');
		if(panelPers){
			panelPers.style.display ='none';
			$e({ //кнопка закрывания фрейма
				 cl:'closeButt'
				,ht: '<b style="padding:1px 3px; border:1px solid #bbc; border-bottom-left-radius: 4px; color:#bbc"'
                    +' onclick="try{top.location && (top.document.getElementById(&quot;hA_userinfoView&quot;).style.display=&quot;none&quot);}catch(er){alert(er)}">X</b>'
				//document.activeElement.removeChild(document.activeElement.firstChild);
				,cs:{cssText:'position: fixed; z-index:2; right:0; top:2px; cursor:pointer'}
				,bef: panelPers.parentNode
			});
		}
	}
	if(win.commentForm)
		win.commentForm.sendOnEnter = function(){}; //убрать отправку по Ctrl+Enter (устарело, но может работать в блогах компаний (?))
	if(hS.innerTab.val){ // ====== вставка спецсимволов =======
		var tArea = $qA('.editor textarea')
			,inTag = win.habraWYG && win.habraWYG.insertTag;
		if(tArea.length && inTag)
			for(var j in tArea){var taJ = tArea[j]; if(taJ.attributes){
				$e({el: taJ, on:{keydown: function(ev){
					var th = ev.target;
					if(ev.shiftKey && ev.keyCode ==9){ //вставка таба по Shift-Tab
						inTag(th,'    ');
						$pd(ev);
					}
					if(ev.ctrlKey && ev.keyCode ==32){ //вставка NBSP по Ctrl-Space
						inTag(th,'&nbsp;');
						$pd(ev);
					}
				}} });
	}}}
	if(hS.autoGrow.val){
		var tAGrow = function(tA){ //авторост-обработчик
			if(!tA) return;
			var tSHPrev =0, tAInh, tATout
				,maxH = Math.floor(win.innerHeight *0.8)
				,tAF = function(ev){
					if(tSHPrev < maxH && tAInh)
						win.clearTimeout(tATout), tA.style.overflow ='hidden', tAInh =0;
					var tSH = tA.scrollHeight - (isChrome?6:!isFx?win.opera?2:6:0);
					//'tA'.wcl(tSHPrev, tSH, ev.type, tA.offsetHeight);
					if(win.opera){
						tA.blur();
						tA.style.height = 0;
						tA.style.marginBottom = tSH +'px';
						tSH = tA.scrollHeight -2;
						tA.style.height = tSH +'px';
						tA.style.marginBottom = 0;
						tA.focus();
					}
					if(tSHPrev <= tSH && tSHPrev < maxH){
						tA.style.height = tSH +'px';
						if(tSHPrev < maxH && tAInh)
							win.clearTimeout(tATout), tA.style.overflow ='hidden', tAInh =0;
					}else if(!tAInh)
						win.clearTimeout(tATout), tATout = win.setTimeout(function(){tA.style.overflow ='inherit'; tAInh =1}, 230);
					tSHPrev = tSH;
				};
			tA.addEventListener('keypress',tAF,!1); //контроль за ростом блока данных
			tA.addEventListener('keyup',tAF,!1);
			tA.style.maxHeight = maxH +'px';
		};
		tAGrow($q('.editor #comment_text')||$q('.editor #answer_text')||$q('.editor #text_textarea') );
		tAGrow($q('.editor #text') );
	}
	$q('.inbox_page_write')&&($q('.inbox_page_write').className ='inbox_page_write2'); //разблок_ресайза поля ввода в почте
	$q('.inbox_page_read')&&($q('.inbox_page_read').className ='inbox_page_read2');
	if(hS.reformal.val && !inFrame){ // добавление виджета reformal.ru для отправки багрепортов (можно то же из настроек)
		addJs(function reformal_preload(){
			reformal_wdg_w	= "713";
			reformal_wdg_h	= "460";
			reformal_wdg_domain	= "habrajax";
			reformal_wdg_mode	= 0;
			reformal_wdg_title   ='<a href="//userscripts.org/scripts/show/121690" target="_blank">HabrAjax</a> - чтобы сайт стал удобным';
			reformal_wdg_ltitle  = "БАГИ";
			reformal_wdg_lfont   = "";
			reformal_wdg_lsize   = "";
			reformal_wdg_color   = "#269bd1";
			reformal_wdg_bcolor  = "#73859e";
			reformal_wdg_tcolor  = "#FFFFFF";
			reformal_wdg_align   = "right";
			reformal_wdg_charset = "utf-8";
			reformal_wdg_waction = 0;
			reformal_wdg_vcolor  = "#559ecf";
			reformal_wdg_cmline  = "#d3d8df";
			reformal_wdg_glcolor  = "#105895";
			reformal_wdg_tbcolor  = "#FFFFFF";
			reformal_wdg_tcolor_aw4  = "#3F4543";
			reformal_wdg_bimage = "cac7b640e87a20ba02df24d613d54a1d.png";
			reformal_html ='';
			document.write = function(a){reformal_html +=a;};//обход doc.write
		});
		addJs('http://reformal.ru/tabn2v4.js?charset=utf-8' //виджет reformal.ru и его постобработчик
			,hS.versionNumb
			,'MyOtziv'
			,function reformal_postload(){ //загрузка после doc.write и подгонка стилей, текстов
			var elem = document.createElement('DIV');
			elem.id ='reformal_holder';
			elem.innerHTML = reformal_html;
			document.body.insertBefore(elem, document.body.childNodes[0]);
			document.getElementById('myotziv_box').style.zIndex = 3001;
			var reformal_butt = document.querySelector('#reformal_holder .frgtd'); //кнопка открывания виджета, |.frby
			reformal_butt.style.right='-4px';reformal_butt.style.width ='17px';
			reformal_butt.querySelector('img').style.position='relative';
			reformal_butt.querySelector('img').style.left='-4px';
			reformal_butt.style.overflow ='hidden';
			reformal_butt.querySelector('a').title ='Пожелания и баги HabrAjax';
			reformal_butt.querySelector('a').style.marginBottom ='3em';
			var reformal_closeButt = document.querySelector('#reformal_holder .pokusijy'); //кнопка закрытия
			var reformal_goto = document.createElement('DIV');
			reformal_goto.innerHTML ='<a href="http://habrajax.reformal.ru/" target="_blank">смотреть всё</a>';
			reformal_closeButt.parentNode.insertBefore(reformal_goto, reformal_closeButt.nextSibling);
			reformal_goto.style.cssFloat ='right';
			reformal_goto.style.marginRight ='10px';
			var reformal_foot1 = document.querySelector('#reformal_holder .drsdtf');
			reformal_foot1.style.width ='auto';
			var reformal_note1 = document.createElement('DIV');
			reformal_note1.innerHTML ='<span title="скопируйте после клика" onclick="prompt(&quot;'+'скопируйте для сообщения&quot;, &quot;Браузер: '+ navigator.userAgent +'; ОС: '+ navigator.platform +'; HabrAjax v. (@)&quot;)">При баге пишите <u title="'+navigator.userAgent+'">браузер</u>, <u>версию</u>, <u title="'+navigator.platform+'">ОС</u> и версию скрипта (@).</span>';
			reformal_foot1.parentNode.appendChild(reformal_note1);
			reformal_note1.style.padding ='3px 0 0 5px';
			reformal_note1.style.cursor ='pointer';
		});
	}
	if(hS.gPlus.val && !/\/sandbox/.test(location.href && !inFrame)) // добавление скрипта Google+
		addJs('https://apis.google.com/js/plusone.js','{"parsetags": "explicit"}', 'gapi', loadGPlus);
	//linkCommFavor(); //дин.ссылки избранного и комментариев
	var submenu = $q('.submenu')
		,forSand = $qA('.item a[href*="/sandbox/"],.item a[href*="/notes/"]', submenu);
	//'forSand'.wcl(forSand , !forSand.length , !isCompa , !isQA.length)
	if(forSand && !forSand.length && !isCompa && !isQA.length)
		$e({cl:'item'
			,ht:'<a href="http://habrahabr.ru/sandbox/"><span class="name">Песочница</span></a>'
			,apT: submenu
		});
	var userpanel = $q('.userpanel');
	if(userpanel){ //кнопка настроек [и тест ошибок юзерскрипта]
		var hMailLink = $q('a[href*="conversations/"]', userpanel)
			,favors = $q('a[href*="favorites/"]', userpanel)
			,trac = $q('a[href*="tracker/"]', userpanel)
			,nastr = $q('a.nav-settings', userpanel)
			,exit = $q('a[href*="logout"]', userpanel)
			,cntTrac = $q('a.count[href*="tracker"]', userpanel)
			,cntMail = $q('a.count[href*="conversations"]', userpanel)
			,bottom = $q('.bottom', userpanel);
		if(exit)
			exit.title ='выход';
		if(trac)
			trac.innerHTML ='трек';
		if(cntTrac && trac){
			trac.style.display ='none';
			cntTrac.title ='трекер';
		}
		if(cntMail && hMailLink){
			hMailLink.style.display ='none';
			cntMail.title ='сообщения в почте';
		}
		if(RO){
			RO.title = RO.innerHTML; RO.innerHTML ='RO';}
		if(hMailLink){
			hMailLink.innerHTML ='сооб';
			$e({el: hMailLink, prT: bottom});
		}
		var habrAjaxSettButt = $e({el:'A'
				,cl:'habrAjaxSettButt'
				,at:{href:'http://userstyles.org/styles/36690', title:'Настройки просмотра сайта'}
				,ht:'HAjax'
				,on:{click: hS.edit} });
		h.inZen ? $e({el: habrAjaxSettButt, prT: bottom}) : $e({el: habrAjaxSettButt, apT: bottom});
		if(favors){
			favors.innerHTML ='избр';
			favors.title ='Избранные мною статьи';
			$e({el: favors, prT: bottom});
		}
		var login = $q('.userpanel >a[href*="login/"]');
		if(nastr){
			nastr.innerHTML ='настр';
			nastr.title ='настройки пользователя на сайте';
			$e({el: nastr, prT: bottom});
		}else //для неавторизованных
			login && login.parentNode.insertBefore(habrAjaxSettButt, login);
		if(login && !nastr && /googleusercontent.com/.test(lh))
			login.innerHTML ='googleUserContent';
		var chargeDiv, replaceCharge;
		if( chargeDiv = $q('.charge', userpanel) ){
			(replaceCharge = function(){ //перевод описания оставшихся голосов в иное представление
				var chrgNums = chargeDiv.innerHTML.match(/\d+/g);
				if(chrgNums && !chrgNums[1]) chrgNums[1] ='--';
				chargeDiv.style.fontSize ='12px';
				var dd = $e({ht:'<span title="имеется голосов за статьи и карму">'
					+ (chrgNums && chrgNums.length ? chrgNums[0]:'') +'</span> '
					+'<a href="/users/'+ h.uName +'/topics/">&nbsp;Блог&nbsp;</a>'
					+' <a href="/users/'+ h.uName +'/qa/questions/">QAQ</a><br>'
					+'<span title="за комментарии">'
					+ (chrgNums && chrgNums.length ? chrgNums[1]:'') +'</span> '
					+'<a href="/users/'+ h.uName +'/comments/">Комм.</a>'
					+' <a href="/users/'+ h.uName +'/qa/answers/">QAA</a>'});
				var chlds = chargeDiv.childNodes;
				//'chlds'.wcl(chlds, chlds.length);
				for(var i in chlds){ var chI = chlds[i]; if(chI.parentNode){
					//'chldsI'.wcl(chI, chI.nodeType, chI.nodeValue)
					if(chI.nodeType ==3 && chI.nodeValue && chI.nodeValue.length >19)
						chargeDiv.replaceChild(dd, chI);
				}}
			})();
		}
	}
	var panelNav = $q('#header .main_menu')
		,tops = panelNav && $q('a[href*=top]', panelNav)
		,events = panelNav && $q('a[href*=events]', panelNav);
	if(tops) tops.innerHTML ='хит';
	if(events) events.innerHTML ='соб';
	var contSelect;

	  //{ Данные цитаты:
		//contextBefore //примерно строка до выделенного (в письме отображается серым)
		//contextAfter //примерно строка после выделенного
		//author //автор статьи-комментария
		//date //дата (статьи, комментария)
		//title //название статьи (для использ. в письме)
		//link: //ссылка URL на элемент
		//source //источник (перевода, ссылки)
		//sourceLink
		//тип контекста цитаты: статья, коммент, QA, песочн.};
//(contSelect = function(){ //========== обработка выделения текста ================

	if(hS.contextSelect.val || hS.hQuotes && hS.hQuotes.val || hS.correctCite.val){ //=== контролы на выделения текста ===
		var selectOp = function(ev){ //сбор данных по выдел_
			if(parents('^citeBtns$',ev.target))
				return;
			if(parents('citeBtns', ev.target) && ev.target.tagName !='A'){
				$pdsp(ev);
			}
			if(win.getSelection && hNE && !parents('js-field-data', ev.target) /*&& !parents('topic_add', ev.target)*/ ){
				var sR = win.getSelection();
				//sR.modify && sR.modify("extend", "forward", "word"); //граница слова в конце выделения
				var sRA = sR.anchorNode
					,sRF = sR.focusNode
					,commElemStart = parents('^comment_item', sRA) || parents('^answer$', sRA)
					,commElemEnd = parents('^comment_item', sRF) || parents('^answer$', sRF)
					,artiElemStart = parents('^content[^_]', sRA) || parents('^qa_view$', sRA) && $q('.content', parents('^qa_view$', sRA) ) || parents(' qa$', sRA) && $q('.content', parents(' qa$', sRA) )
					,artiElemEnd = parents('^content[^_]', sRF) || parents('^qa_view$', sRF) && $q('.content', parents('^qa_view$', sRF) ) || parents(' qa$', sRF) && $q('.content', parents(' qa$', sRF) )
					,sel ={commCount: 1 //параметры выделения
						,elemTop: 9e9, elemRight: -9e9, elemBottom: -9e9, elemLeft: 9e9}
				try{
					var sRR = sR.getRangeAt && sR.getRangeAt(0)
						,nodeAncestor = sRR.commonAncestorContainer
						,nodeStart = sRR.startContainer
						,nodeEnd = sRR.endContainer
					// вычисление текстового сдвига относительно общей ноды, чтобы:
					//   1) найти контекст; 2) отвязаться от пересекающих нод. Корневая нода - сообщение
						,rAncestorStart = sRR.cloneRange();
					rAncestorStart.selectNodeContents(nodeAncestor);
					//rAncestorStart.setStartAfter(nodeAncestor);
					//rAncestorStart.setEndBefore(nodeStart);
						//,rAncestorEnd = (document.createRange()).selectNode(nodeAncestor);
						//rAncestorStart.setEndBefore(nodeStart);
						//rAncestorEnd.setEndBefore(nodeEnd);

				}catch(er){;}
				if(sRR && sRR.getClientRects && sRR.getClientRects()[0]){ //границы выделения
					var sRRB = sRR.getClientRects();
					for(var i=0, iL = sRRB.length; i < iL; i++){
						if(sRRB[i].top < sel.elemTop) sel.elemTop = sRRB[i].top;
						if(sRRB[i].right > sel.elemRight) sel.elemRight = sRRB[i].right;
						if(sRRB[i].bottom > sel.elemBottom) sel.elemBottom = sRRB[i].bottom;
						if(sRRB[i].left < sel.elemLeft) sel.elemLeft = sRRB[i].left;
					}
					$x(sel, {startX: sRRB[0].left //координаты "старта-конца" (верха-низа)
						,startY: sRRB[0].top
						,endX: sRRB[sRRB.length-1].right
						,endY: sRRB[sRRB.length-1].bottom
				});}
				//TEST
				/*sel.posStart = sRR.startOffset;
				sel.posEnd = sRR.endOffset;
				sel.nodeAncestor = nodeAncestor;
				sel.rAncestorStart = rAncestorStart.startOffset +'/'+ rAncestorStart.endOffset;*/

				if(sRA ==sRF) //направление выделения
					sel.direction = sR.anchorOffset < sR.focusOffset;
				else{
					var posA = getPosition(sRA), posF = getPosition(sRF);
					sel.direction = posA.y == posF.y ? posA.x < posF.x : posA.y < posF.y;
				}
				//'direction'.wcl(sel.direction, sel.elemTop, sel.elemBottom)
				$x(sel, {commElemTop: sel.direction ? commElemStart || commElemEnd
						: commElemEnd || commElemStart //тег с идом первого коммента или ответа в QA
					,commElemBottom: !sel.direction ? commElemStart || commElemEnd
						: commElemEnd || commElemStart
					,artiElemTop: sel.direction ? artiElemStart || artiElemEnd
						: artiElemEnd || artiElemStart
					,artiElemBottom: !sel.direction ? artiElemStart || artiElemEnd
						: artiElemEnd || artiElemStart
				});
				sel.postElem = parents('^post($| )', sel.artiElemTop || sel.commElemTop)
					|| prev('^post($| )', parents('^(comments_list( )?|comments c2)', sel.artiElemTop || sel.commElemTop)); //тег с идом поста - !!!будет сильно зависеть от вида записи класса!, источник ошибок волатильности
				if(commElemStart && commElemEnd && commElemStart != commElemEnd){
					var commsStart = parents('^(comments_list|comments c2|answers|clarification)', sel.commElemTop) || parents('^comments c2$', sel.commElemTop)
						,commsEnd = parents('^(comments_list|comments c2|answers|clarification)', sel.commElemBottom) || parents('^comments c2$', sel.commElemBottom);
					if(commsStart == commsEnd){ //если в одной статье - считать выделенные комм-ы
						var cInArt = $qA('.comment_item', commsStart)
							,j =0;
						for(var i in cInArt){
							if(j >0)
								j++;
							if(j && cInArt[i] == sel.commElemBottom)
								j = -j;
							if(!j && cInArt[i] == sel.commElemTop)
								j =1;
						}
						sel.commCount = -j; //число выделенных комментариев (для "HQ")
					}
				}
				if(sR)
					var s = '<span class="selText">'+ sR +'</span>'
						,sTechLen = s.length - (sR+'').length;
				if(s && (sR+'').length >0){
					var sele = $q('.list .sele', hNE) //строка выделения - в список цитат
						,newSele = $e({el: sele
							,cl:'sele'
							,ht: s +' <span style="color:#999">'+ ((sR+'').length||'') +'</span>'});
					if(newSele != sele)
						$q('.list', hNE).appendChild(newSele);
					//'commElemTop'.wcl(sel.commElemTop , sel.artiElemTop)
					var commTime = $q('.info time', sel.commElemBottom) || $q('.info .time', sel.commElemBottom);
					$x(sel, {text: s //выделение; и далее - сопутствующая инф.
						,textR: sR+'' //чистый текст выделения
						,dateCopy: +new Date() //дата снятия копии пользователем
						,articleId: sel.postElem && sel.postElem.id && sel.postElem.id.replace(/\D/g,'')
						,item: sel.commElemTop || sel.artiElemTop // ссылка на элемент с идом - статью или комментарий
						,commAuthor: sel.commElemBottom
							? ($q('.info .username', sel.commElemBottom) ||  $q('.info a', sel.commElemBottom) ).textContent.trim()
							: undefined
						,commDate: sel.commElemBottom && commTime
							? commTime.textContent.trim() + (commTime.title ?', '+ commTime.title.replace(/,/,', ') :'')
							: undefined
						,author: sel.postElem
							? $q('.infopanel .author a[href*="/users/"]', sel.postElem) && $q('.infopanel .author a[href*="/users/"]', sel.postElem).textContent.trim()
							: undefined
						,title: sel.postElem
							? $q('.title span', sel.postElem) && $q('.title span', sel.postElem).textContent.trim()
							: undefined
						,date: sel.postElem
							? $q('.infopanel .published', sel.postElem) && $q('.infopanel .published', sel.postElem).textContent.trim() + ($q('.infopanel .published', sel.postElem).title ?', '+ $q('.infopanel .published', sel.postElem).title :'')
							:undefined
					});
					'sel'.wcl(sel);
					if(sel.articleId)
						sel.url = HRU +(sel.artiElemBottom && parents('( qa$|^qa_view$)', sel.artiElemBottom)
							?'/qa/':'/post/')+ sel.articleId +'/';
					if(sel.commElemBottom)
						sel.commId = sel.commElemBottom.id.replace(/\D+/,'');
					//разместить контекстную кнопку
					var edit = $q('.title .edit', sel.postElem); //===== кнопка "Edit" ========
					$q('.edit', hNBs).style.display
						= (!edit || sel.commElemBottom) && !/\/(edit|add)\//.test(lh)
						?'none':'';
					$x(hNBs.style, {left: ((ev.type=='keyup'&& ev.pageX + sel.endX || ev.pageX) +6) +'px'
						,top: ((ev.type=='keyup'&& ev.pageY + sel.endY || ev.pageY) +16) +'px'
						,display:'block'});
					selS.ww && win.clearTimeout(selS.ww);
					var hideNBs;
					selS.ww = win.setTimeout(hideNBs = function(){
						if(!selS.noAutoHide && ! selS.hover) hNBs.style.display ='none';
					}, 2999); //hide
					hNBs.style.display ='block';
					$q('.citeTxTa', hNBs) && ($q('.citeTxTa', hNBs).style.display ='none');
					selS.noAutoHide =0; //автоскрытие через 3 с.
				}else{ //===== сохранение прежде набранного при нулевом выделении =====
					hNBs.style.display ='none';
					if(!selS.prev) selS.prev ={};
					$x(selS.prev, { //сохранение прежде набранного
						citeComm: $q('.ta', hNBs).value
						,textR: selS && selS.textR ||''
						//TODO  и много другого контекста
					});
					$q('.ta', hNBs).value = $q('.taAbs', hNBs).value =''; //очистка по закрытию
					selS.ww && win.clearTimeout(selS.ww);
				}
				$e({el: hNBs, on:{ //поведение автоскрытия кнопки при неактивности
					 mouseover: function(){selS.ww && win.clearTimeout(selS.ww); selS.hover =1;}
					,mouseup: function(){selS.noAutoHide =1;}
					,mouseout: function(){
						selS.hover =0;
						selS.ww && win.clearTimeout(selS.ww);
						selS.ww = win.setTimeout(hideNBs, 2999);
				}} });
				selS = sel; //всё о выделении
				if(s.replace(/^\s+/,'').length <= sTechLen) //если пустая строка выделения
					hN.retainView(); //скрыть, если внутри нет блоков...
				else
					hNE.style.display ='block';
				hNE.style.opacity = s.length >22 || $q('.hlp', hNE) ? 1 : 0.85;
			}
		}
		$e({el: document.body, on:{mouseup: selectOp, keyup: selectOp} });
	}
	var bt ='	<button type="button" title="' //команды работы с цитатой
	,citeButF = function(ev){ //===== движение - drag =====
		hNBs.style.left = (citeButF.xy.x -= citeButF.mou.x - (citeButF.mou.x = ev.pageX)) +'px';
		hNBs.style.top = (citeButF.xy.y -= citeButF.mou.y - (citeButF.mou.y = ev.pageY)) +'px';
		$pdsp(ev);
	},
	hNBs = $e({cl:'citeBtns',
		ht:'<div class="citeCmdLeft">'
			+bt+'Комментарий с цитатой" data="reply">Ответ</button>'
			+bt+'Начать письмо с цитатой; Ctrl - в новой вкладке" data="letter">Письмо</button>'
			+bt+'Начать письмо выделенному или контекстному автору" data="toUser">Юзеру</button>'
			+'<div class=hov>'+bt+'Поиск по сайту (вывод в фрейме)" data="search" style="display:block">Поиск</button>'
			+bt+'Поиск по сайту через Google; Ctrl - в новой вкладке" data="searchGoo">Goo</button>'
			+bt+'Поиск по сайту через Yandex" data="searchYa">Ya</button></div>'
			+'</div>'
			+(hS.correctCite.val ? '<div class="citeCmdRight">'
			+bt+'Отметить как ошибку" data="mistake" class="pre">Грамматика</button>'
			+bt+'Ошибка в знаках препинания" data="punctuation" class="pre">Пунктуация</button>'
			+bt+'" data="misprint" class="pre">Опечатка</button>'
			+bt+'Ошибка в стилистике" data="stylistic" class="pre">Стиль</button>'
			+'</div>':'')
			+'<div class="citeTxTa">'
				+'<div class="citeTx">'
					+'<div class="citeLst"><span class="citeLst2">'
						+'<b class="cite"></b><b class="cite"></b></span></div>'
					+'<div class="citeTxt"></div></div>'
				+'<div class="citeTa"><textarea class="taAbs"></textarea>'
					+'<textarea class="ta"></textarea></div>'
			+'</div>'
			+'<div class="citeCmdTop" class="pre"></div><div class="citeCmdBase">'
			+bt+'Подготовка цитаты" data="citeComm" class="pre">&lt;_></button>'
			+'<button type=button class=edit title="Редактировать" data="edit">&lt;E></button>'
			+(hS.correctCite.val ? bt+'Ошибка содержания" data="wrongData" class="pre">Ош.</button>':'')
			+(hS.hQuotes && hS.hQuotes.val ? bt+'Отправить в HabraQuotes (выделенные 1-10 комментариев)" data="hQuotes">HQ</button>':'')
			+bt+'восстановить набранное в прежнем контексте" data="repair">&lt;_</button>'
		+'</div>',
		on:{
			mousedown: function(ev){ //перемещение конт.кнопок
				if(ev.target.className =='ta'|| parents('^citeTxTa$',ev.target))
					return;
				document.addEventListener('mousemove', citeButF,!1);
				document.addEventListener('mouseup', function(ev){
					document.removeEventListener('mousemove', citeButF)});
				citeButF.xy = {x: parseInt(hNBs.style.left), y: parseInt(hNBs.style.top)};
				$x(citeButF.mou0={}, citeButF.mou ={x: ev.pageX, y: ev.pageY});
				//'citeButF.mou0'.wcl(citeButF.mou0)
			},
			mouseup: function(ev){
				'33'.wcl(ev.target)
				selS.cmd = ev.target.getAttribute('data'); //имя кликнутой кнопки

				selS.subSelect = parents('^citeTxTa$',ev.target) ?1:0; //выделение в цитате или в поле ввода
					/*return;*/
				//hN.ciCom = {misType: ev.target.getAttribute('data')};
				document.removeEventListener('mousemove', citeButF);
				hN.moveMin =4;
				hNBs.wasMoved = Math.abs(citeButF.mou0.x - ev.pageX) + Math.abs(citeButF.mou0.y - ev.pageY) /*< hN.moveMin*/; //признак перемещения
				'44'.wcl('tx',hNBs.wasMoved)
			},
			click: function(ev){
				selS.hN = hN; //TODO обратная ссылка
				if(!h.uName && !(hS.hQuotes && hS.hQuotes.val))
					hN.addNote(this.title +' - требуется авторизация на сайте.');
				else{ //передвижение или исполнение по кнопке
					selS.ww && win.clearTimeout(selS.ww);
					if(hNBs.wasMoved > hN.moveMin){
						'moved'.wcl(hNBs.wasMoved);
					}else{
						'hN.sel0'.wcl(selS, selS.subSelect)
						if(!selS.subSelect)
							cmd[ selS.cmd ](selS, ev); //=== действие (клик кнопки) ===
					}
				}
			}
		},apT: document.body
	}),
	cmd ={ //=== команды обработки выделений ===
		insertComm: function(s, clarifShow){
			var repl = s.commElemBottom
				? $q('.reply .reply_link', s.commElemBottom) || $q('.reply >a.reply', s.commElemBottom) || parents('^answer$', s.commElemBottom) && $q('.reply >a.reply', parents('^answer$', s.commElemBottom) ) //цитата из комментария
				: $q('.comments_form .title a') || $q('.add_answer .title span'); //..из статьи
			'isRepl'.wcl(repl, s.commElemBottom)
			var tA = $q('textarea#'+ (clarifShow || s.commElemBottom && isQA.length
					?'':(isQA.length ?'answer_':'comment_') ) +'text')
				, taVal = tA.value;
			if(repl){
				'+|+'.wcl($q('.clarify_form:not(.hidden)', repl.parentNode), !clarifShow, !$q('textarea', repl.parentNode.parentNode), isQA.length)
				/*if(!isQA.length || s.commElemBottom && ($q('.clarify_form.hidden', repl.parentNode)|| !$q('textarea', repl.parentNode.parentNode) || !clarifShow) || !s.commElemBottom && !clarifShow);*/
				if(!(parents('^answer$', repl) && $q('.clarify_form:not(.hidden)', parents('^answer$', repl)) ))
					repl.click(); //раскрыть поле ответа; стирает поле, поэтому далее восст_
				tA.value = taVal;
			}
			'cshow'.wcl(clarifShow, s.commElemBottom, isQA.length)
			tA.value += (/\n$/.test(tA.value) || tA.value.length ==0 ?'':'\n') //с новой строки
				+ (s.textR.trim().length <=1 ?'':'<blockquote>'+ s.textR +'</blockquote>\n') //удалять 0-1-символьные цитаты
				+ (s.text0 || this.citeComm() ||''); //текст из плавающего комментария
			tA.focus();
		},
		reply: function(s, ev){ //ответ в корневой комм., или раскр.отв. в текущий (последн.выд.), прокрут.
			if(s==0){
				var lStor = getLocStor('composeLetter');
				'lStor'.wcl(lStor);
				if(lStor){
					var sRF = $q('#reply_comments_'+ lStor.commId) || $q('#answer_'+ lStor.commId) || $q('#comment_'+ lStor.commId);
					s ={
						commElemBottom: parents('^answer$', sRF) || parents('^comment_item', sRF)
						,textR: lStor.cite ||''
						,text0: lStor.text ||''
					};
					removeLocStor('composeLetter');
				}}
			var tAs = $qA('textarea#comment_text, .clarify_form textarea#text, textarea#answer_text')
				,clarifShow = $q('.clarification_form_placeholder .clarify_form:not(.hidden)'); //в QA открыто уточн.или отв.в комм
			'repl'.wcl(tAs, s);
			if(s !=0 && (s.commElemBottom && parents('comments c2', s.commElemBottom) //цитата с комм.
					|| s.artiElemBottom && /content c2/.test(s.artiElemBottom.className)
					|| topics && topics.length && s.artiElemBottom && /^content /.test(s.artiElemBottom.className) ))
				this.letter(s, ev,'comm');
			else if(tAs.length)
				this.insertComm(s, clarifShow);
		},
		letter: function(s, ev, isComm){ //письмо с одиночной цитатой
			if(selS)
				this.initLetter(ev, {to: s.author, subj: s.title ?'Re: '+ s.title :'', cite: s.textR}, isComm);
			else
				this.initLetter(ev,{cite: s.textR}, isComm);
		},
		toUser: function(s, ev){ //письмо пользователю (явное имя или контекстное)
			'selS'.wcl(selS, s.textR, userNameMaxLen, allASCII(s.textR))
			var shortSel = s.textR.length >2 && s.textR.length <= userNameMaxLen && allASCII(s.textR);
			if(selS){
				'++'.wcl(shortSel ? s.textR.trim().replace(',$','') : s.commAuthor || s.author, s.title ?'Re: '+ s.title :'', !shortSel ? s.textR : null)
				this.initLetter(ev, {to: shortSel ? s.textR.trim().replace(',$','') :'Enter username'
					, subj: s.title ?'Re: '+ s.title :'', cite: !shortSel ? s.textR : null} ); //контекстному автору из преж. команды
				// (оформляются все цитаты и ошибки автора, отмеченные в чекбоксах)
			}else
				this.initLetter(ev, {to: shortSel ? s.textR.trim().replace(',$','') : null
					, cite: !shortSel ? s.textR : null} );
		},
		search: function(s, ev, FFind){
			if(srchBut){
				if(srchField) srchField.value = s.textR;
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent('click',!0,!0, window, 0, 0, 0, 0, ev.clientY,
					ev.ctrlKey, !1, ev.shiftKey, !1, 0, null);//(type, canBubble, cancelable, view,
				//  detail, screenX, screenY, clientX, clientY,
				//  ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget)
				(FFind || srchBut).dispatchEvent(evt);
		}},
		searchGoo: function(s, ev){
			this.search(s, ev, srchButGoo);
		},
		searchYa: function(s, ev){
			this.search(s, ev, srchButYa);
		},
		hQuotes: function(s, ev){ //комментарий - ->на habraQuotes.ru
			'hQuotes'.wcl(0, win.GM_xmlhttpRequest);
			if(typeof GM_xmlhttpRequest !=u){
				hN.addNote(imgWait +'&nbsp;');
				var itemId = s.item && s.item.id
					,linkHQ =' <a href="http://habraquotes.ru/fresh/" title="новое окно" target="_blank">Перейти на сайт</a>';
				'items'.wcl(s, s.postElem, s.articleId, s.commCount, itemId);
				if(itemId){
					var waitHQ = win.setTimeout(function(){ //таймаут по неответу
						//alert(305)
						hN.addNote('Ошибка: нет ответа от habraquotes.ru долгое время. '+ linkHQ);
					}, 14000);
					GM_xmlhttpRequest({ //отправка данных для публикации
						url: 'http://habraquotes.ru/api/2.0/quotes/add'
						,method:'post'
						,data:'link='+ HRU +(isQA.length ?'/qa/':'/post/')+ s.articleId +'/#'+ itemId +'&count='+ s.commCount +'&is_habrajax=1'
						,headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With":"XMLHttpRequest"}
						,onload: function(dat2){
							if(/"url":/.test(dat2.responseText) && !/"error":/i.test(dat2.responseText) ||/{"state":"ok"}/i.test(dat2.responseText) ){
								win.clearTimeout(waitHQ);
								'dat2'.wcl(dat2.responseText,'{"state":"ok"}'==dat2.responseText)
								if(/"url":/.test(dat2.responseText) || /{"state":"ok"}/i.test(dat2.responseText) ){
									datJson = win.JSON.parse(dat2.responseText);
								hN.addNote('Публикация выполнена успешно. <a href="http://habraQuotes.ru/'+ (datJson.url ? datJson.url+'/':'fresh/') +'" title="новое окно" target="_blank">Посетить сайт с&nbsp;местом публикации</a>');
							}}else if(/"err":/.test(dat2.responseText)){
								win.clearTimeout(waitHQ);
								datJson = win.JSON.parse(dat2.responseText);
								hN.addNote('Ошибка: '+ datJson.error +'. '+ linkHQ);
							}else
								hN.addNote('Неопознанный ответ: ', dat2.responseText, linkHQ);
						}, onerror: function(dat2){
							win.clearTimeout(waitHQ);
							'Err:'.wcl('habraQuotes ', dat2); //TODO по таймауту - повторить
							hN.addNote('<i>Err: ошибка обмена (2-й запрос) с сервисом habraQuotes</i>'+ linkHQ);
						},
						onreadystatechange: function(datRS){
							if(datRS && datRS.readyState ==4 && datRS.status !='200'&& datRS.status !='304' || /error/i.test(datRS.responseText) ){
								win.clearTimeout(waitHQ);
								'Error habraquotes.ru: status='.wcl(datRS.status +', ошибка ответа. '+ datRS.responseText +' '+ linkHQ);
								hN.addNote(' Ошибка: статус ответа - '+ datRS.status +'. '+ linkHQ);
							}
						}
					});
				}else
					hN.addNote('<i>(был выбран не комментарий, действия нет)</i>');
		}},
		repair: function(s, ev){ if(selS.prev){ //восст_контекста и набранного, случайно закрытого ранее
			var ss = $q('.ta', hNBs).value;
			s.citeComm = selS.prev.citeComm;
			selS.prev.citeComm = ss; //swap
			ss = s.textR;
			s.textR = selS.prev.textR;
			s.text = '<span class="selText">'+ s.textR +'</span>';
			selS.prev.textR = ss; //swap
			this.citeComm(s, ev,'repair');
		}},
	//Дополненное к цитате:
	//copier //пользователь-копировщик (автор цитаты и дополнений к ней)
	//misType: //тип ошибки (5 типов или просто цитата) - предваряющая или заверш-я кнопка
	//subSels: [] //суб-выделения - детализации ошибок или выделений в цитате
	//removes: [] //удаления (исправления)
	//adds: [] //добавления пользователя (исправления)
	// тип оценки (к цитате): -3 - свернуть и никому не показывать; -2 - свернуть; -1 - не очень; 0 - ну, смотрел; 1 - интересно, 2 - надо вернуться 3 - смотреть всем
	//оценка - эмоции, оценка - содержание
	//userComments: [] //ответы пользователя - текст, дата
		mistake: function(a, b){this.citeComm(a, b)}, //группа обработки ошибок (отмеч-с тип)
		punctuation: function(a, b){this.citeComm(a, b)},
		misprint: function(a, b){this.citeComm(a, b)},
		stylistic: function(a, b){this.citeComm(a, b)},
		wrongData: function(a, b){this.citeComm(a, b)},
		citeComm: function(s, ev, noFill){ //=== комментирование цитаты (и субвыделения) =(s==selS)
			var citeTxTa = $q('.citeTxTa', hNBs) //блок контекстного ввода (общий)
				,citeTx = $q('.citeTx', citeTxTa) //блок цитат
				,citeLst = $q('.citeLst', citeTxTa) //список цитат
				,citeLst2 = $q('.citeLst2', citeLst) //список цитат
				,citeTxt = $q('.citeTxt', citeTxTa) //цитата
				,citeTa = $q('.citeTa', citeTxTa) //блок комментария
				,citeTaT = $q('.ta', citeTa); //поле контекстного комментария
			if(!ev && !s) //вернуть написанное в комментарии
				return citeTaT.value;
			var citeTaA = $q('.taAbs', citeTa)
				,areaSymb = 140 //средняя площадь символа
				,areaTaSymb = 130
				,areaText = s.text && Math.sqrt(areaSymb * s.textR.length) ||0
				,areaTaText = s.comm && Math.sqrt(areaTaSymb * s.comm.length) || 1;
			s.hN.ciCom ={copier: h.uName, misType: s.cmd} //дополнения копировщика к цитате
			$x(citeTx.style, {width: Math.floor(areaText)+50 +'px'
				,marginLeft: -Math.floor(areaText /2 -10) +'px'
				,marginRight: -Math.floor(areaText /2 +10) +'px'
			});
			citeTxt.innerHTML = s.text;
			/*$e({el:'b', cl:'cite'
				,ht:'='+ s.posStart +'_'+ s.posEnd +';'+ s.nodeAncestor.textContent +';'+ s.rAncestorStart
				,apT: citeLst2});*/
			//this.normTa(areaTaText, citeTaT);
			//this.normTa(areaTaText, citeTaA);
			$x(citeTxt.style, {textAlign: s.textR.length >13 ?'left':'center'
				,wordWrap: s.textR.length >13 || /\s/.test(s.text) ?'normal':'break-word'
			});
			$q('.selText', citeTx).style.left = s.textR.length >13 ?'1.1em':'0'
			var hh;
			$x(citeTaT.style, hh={width: Math.floor(areaTaText)+50 +'px'
				//, height:'1em'
				//, marginLeft: -Math.floor(areaTaText /2 -10) +'px'
				//, marginRight: -Math.floor(areaTaText /2 +10) +'px'
				,overflow:'hidden'
			});
			$x(citeTaA.style
				,{width: Math.floor(areaTaText)+50 +'px'
					,height:'1em', overflow:'hidden'});
			var initCite
				,selC = selS;
			(initCite = function(){ //сброс набора прежней цитаты
				citeTaT.value = citeTaA.value = s.citeComm ||''; //восстановление поля
				if(!selC)
					selC ={chgLenPrev:0};
				selC.taH1 =0;
			})();
			selC.tFI =0; //состояние selC.taFloat[]
			var taH1 = selC.taH1 ||16 //высота _одной_ строки в textarea
				,taParams;
			(taParams = function(ev){ //подгонка размеров растущей области ввода в контексте
				var tx = selC.val = ev ? citeTaT.value : s.citeComm||''
					,txL = tx.length
					,tASH = citeTaA.scrollHeight; //реальная высота введённого текста
				citeTaA.value = tx;
				s.hN.ciCom.userComments = tx; //фиксация набранного
				selC.taFloat =[{h:{n:4,w:50}},{h:{n:10,w:128}},{h:{n:16,w:159}},{h:{n:24,w:238}}
					,{v:{r:4,w:238}},{v:{r:5,w:375}},{v:{r:12,w:530}},{v:{r:16,w:690}}]; //Правила: 1) сохранять равенство ширин (w) соседних h и v; 2) состояния (h, v) располагать по возрастанию; 3) вначале всегда h (однострочные градации ширины). w - ширина поля, n - число символов, r - число строк
				selC.taFlNmax =0; //поиск максимума .h.n
				for(var i =0, iL = selC.taFloat.length; i < iL; i++)
					if(selC.taFloat[i].h && selC.taFloat[i].h.n > selC.taFlNmax){
						selC.taFlNmax = selC.taFloat[i].h.n;
						selC.taFlImax = i;
					}
				if(!ev && selC){ //начальная установка (taH1 и фокус)
					citeTa.style.left =0;
					selC.lenPrev2 = selC.lenPrev = txL;
					win.setTimeout(function(){
						//citeTaT.focus();
						selC.taH1 = citeTaA.scrollHeight -1 -2*isFx;
					},1);
				}
				//'ev'.wcl(ev, !ev, {tx:tx, tASH:tASH || taH1},selC.tFI)
				if( (function(h2){ //chkGrow=== проверка размеров содержимого поля ввода ===
						var taS = selC.taFloat[selC.tFI];
						for(var j in taS) var taSkey = j; //имя ключа состояния
						if(taSkey !='h' && taSkey !='v')
							wcl('Err: '+ 'ош. в выборе типа поля ввода');
						txL = h2.tx.length;
						taNS = Math.floor((h2.tASH +0.5)/ taH1); //(реальное) чис.строк поля ввода
				//'taNS,tx'.wcl(taNS,tx, selC.taH1, taH1)
						if(txL <= selC.taFlNmax){ //выбор 1-строчного варианта поля
							for(var i =0, iL = selC.taFlImax +1; i < iL; i++)
								if(txL <= selC.taFloat[i].h.n && (i==0 || i >0 && txL > selC.taFloat[i-1].h.n)){
									selC.tFINew = i; break;}
						}else{
							for(var i = selC.taFlImax+1, iL = selC.taFloat.length+1; i < iL; i++)
								if(taNS <= selC.taFloat[i].v.r && (i==selC.taFlImax+1 || i >selC.taFlImax+1 && taNS > selC.taFloat[i-1].v.r) ){
									selC.tFINew = i; break;}
						}
						if(s.citeComm)
							selC.tFI = Math.max(0, selC.tFINew -1);
						//'i,txL,taFlNmax'.wcl(i, txL, selC.taFlNmax)
						if( (selC.lenPrev2 < txL ^ selC.tFINew > selC.tFI) || Math.abs(txL - selC.chgLenPrev) < txL/8){ //консервативность смены
							selC.tFINew = selC.tFI;
							selC.lenPrev2 = selC.lenPrev;
							selC.lenPrev = txL;
						}
						//'taNS'.wcl(h2.tASH, taNS, selC.tFINew)
						if(selC.tFINew != selC.tFI){
							selC.chgLenPrev = txL;
							return!0;}
					})({tx:tx, tASH:tASH || taH1})
						|| !ev || Math.abs(tASH - selC.taHprev) < 6 ){ //обновл_ размеров
					var taH2 = tASH ||16; //далее - высота (px) всех строк в поле ввода
					citeTaA.style.height = (taH1 -1) +'px';
					win.setTimeout(function(){
						citeTaT.style.height = citeTa.style.height = ((selC.taHprev = citeTaA.scrollHeight) -1)+'px';
						//'=citeTaA'.wcl(tASH, citeTaA.scrollHeight, citeTaA.value, selC.taHprev
						//	,'||',taS, selC.tFINew);
						citeTa.style.width = (taS && (taS.h && taS.h.w || taS.v.w))+'px';
						citeTx.style.bottom = (selC.taHprev -3) +'px';
					},1);
					citeTa.style.height = (taH2 -1) +'px';
					citeTx.style.bottom = (taH2 -3) +'px';
					//'tFINew==='.wcl(selC.tFINew, taS, tASH, selC.taHprev, tASH / selC.taH1, selC.taH1)
					if(typeof selC.tFINew =='number'&& ev || s.citeComm){
						var taS = selC.taFloat[selC.tFINew];
						citeTaT.style.width = citeTaA.style.width
							= citeTa.style.width = (taS && (taS.h && taS.h.w || taS.v.w))+'px';
						citeTa.style.left = Math.min(-((taS && (taS.h && taS.h.w || taS.v.w))/2 -43),0) +'px';
						selC.tFI = selC.tFINew;
					}
					selC.taHprev = taH2;
				}
			})();
			citeTaT.addEventListener('keypress',taParams,!1); //контроль за вводом символов
			citeTaT.addEventListener('keyup',taParams,!1);
			$x(citeTa.style, hh);
			citeTxTa.style.display ='block';
			$x(citeLst.style, {MaxWidth: Math.floor(areaText)+54 +'px'
				,top: -citeLst.offsetHeight -2 +'px'});
		},
		normTa: function(s, t){ //нормализация поля ввода: вычисление ширины и высоты по содержимому
			var citeTa = t.parentNode
				,citeTxTa = citeTa.parentNode;
			if(s !=null)
				t.value = s;
		},
		htmlSelect: function(s, ev){ //===== оформить с захваченным HTML =====

			$sp(ev);
		},
		edit: function(s, ev){ //===== редактировать область цитаты =====
			setLocStor('composeLetter', {cite: s.textR});
			if(/\/topic\/(add|edit)\//.test(lh)){
				win.clearTimeout(wwPrevi);
				fillLetter();
				return;}
			if((ev.ctrlKey || ev.cmdKey) ^ ev.shiftKey)
				win.open(HRU +'http://habrahabr.ru/topic/edit/'+ s.articleId +'/','_blank');
			else
				openInFrame({clientY: ev.clientY},{href: HRU +'/topic/edit/'+ s.articleId +'/'});
			$sp(ev);
		},
		mis: function(s){ //оформление ошибки
			//hN.selContext = s; //сохранено состояние выделения (для след.оп. типа "письма")
			var misType = s.misType = {mistake: 0, punctuation: 1, misprint: 2, stylistic: 3, wrongData: 4, citeComm: -1}
				,selField = $q('.sele .selText', hNCiteList)
				,selText = selField && selField.innerHTML; //текст выделения (возм-о, обраб-ный)
			hNCiteList.removeChild($q('.sele', hNCiteList)); //удалить копию выделения
			if(!hN.misId)
				hN.misId = 1;
			s.misId = hN.misId; //очередной Id выделения
			$e({cl:'item'
				,ht:'<input type="checkbox" id="mis'+ hN.misId++
					+'" name="'+ s.author +'" value="" checked="checked"/>'
					+ '<font style="background-color:#dbb; color:#964">'
					+ (misType[s.cmd] >=0 ? misType[s.cmd]:'') +'</font> '
					+'<span class="selText">'+ (selText || s.textR) +'</span>'
				,apT: hNCiteList });
		},
		initLetter: function(ev, g, isComm){ //===== составить письмо ===== //g:{to,subj,cite}
				//text, addressee, date, title, link, source, sourceLink	//загрузить форму отправки письма
			//для публикации письма в другом окне передаётся адрес с меткой времени и создаётся элемент хранилища с той же меткой. По получению элемент проверяется, используется и  удаляется. Одновременно существует не более 1 объекта публикации письма. Формирование письма - ПЕРЕД отправкой, поэтому передаются 3 поля и метка времени. На случай отсутствия хранилища передаются 2 поля (укороченный текст и автор) и метка времени.
			g = $x({to:'', subj:'', cite:'' }, g);
			var s = selS
				,receiver = g.to=='Enter username' || g.to== h.uName ?''
					: (g.to && !g.cite && g.to || s.commAuthor || g.to);
			'initLet'.wcl(g, receiver)
			setLocStor('composeLetter',
				$x(g, {cite: g.cite
					+ (/\n$/.test(g.cite) || g.cite && g.cite.length ==0 || !g.cite ?'':'\n')
				,noReceiver: !receiver
				,text: s.val ||'' //введённый комментарий
				,date: s.date
				,commDate: s.commDate
				,url: s.url
				,commId: s.commId
				,commAuthor: s.commAuthor}) );
			var timeStmp = (+new Date()+'').replace(/(^\d{3}|\d{3}$)/g,'')
				,hrf = (!isComm
					? HRU +'/conversations/'+(receiver?receiver+'/':'')
					: s.url
				)+'?time33='+ timeStmp
				+(isComm ?'&cmd=insertComm':'')
				+(!win.localStorage?'#'
					+(g.to?'to='+ encodeURIComponent(g.to):'')
					+(g.cite?(g.to?'&':'')+'text='+ encodeURIComponent( g.cite
						+(g.cite && g.cite.length >500?'...':'') ):'')
					:(s.commElemBottom ?'#'+ s.commElemBottom.id :'') );
		'letter'.wcl(s, hrf)
			if((ev.ctrlKey || ev.cmdKey) ^ ev.shiftKey)
				win.open(hrf,'_blank');
			else
				openInFrame({clientY: ev.clientY},{href: hrf});
			//внести шаблон данных
		},
		buildCite: function(s){
			var cLIs = $qA('.item', hNCiteList);
			for(var i =0, iL = cLIs.length; i < iL; i++)
				$q('input[type="checkbox"][checked="checked"]', cLIs[i]);
			var subj ='Замечания к "'+ s.title.substr(0, 40)+ (s.title.length >40?'...':'')+'"'
				,foundMulti = 0//более 1 или тип 4
				,foundSemi = 0 //не по одной ош. в категориях 1-3
				,foundShe = 0 //1 шт. и ж. рода (тип 1-2)
				,mistakE = 0
				,misPrinT = 0
				,stylisT = 0.0
				,isSubSel =0 //есть ли суб-селекты
				,isWrongSel =0 //есть ли механизм подчёркиваний и пометок ошибок
				,mistSel =['ошибк'+ (mistakE?'а':'и') //перечислитель типов ошибок
						,'опечатк'+ (misPrinT?'а':'и')
						,'неверны'+ (stylisT?'й':'е') +' стилистически'+ (stylisT?'й':'е') +' оборот'+ (stylisT?'':'ы')
						,'неверные данные'];
			for(var i=3; i >= 0; i--) //удаление пустых строк
				if(0)
					mistSel.splice(i, 1);
			var x = '&nbsp; &nbsp; Здравствуйте, '+ s.author +'!\n'
				+'&nbsp; &nbsp; В Вашей статье &quot;<a href="'+ s.link +'"><b>'
				+ s.title.substr(0, 60) + (s.title.length >60 ?'...':'')
				+'</b></a>&quot; от <i>'+ s.date +'</i> обнаружен'
					+ (foundMulti ?'ы'+ (foundSemi ?':':''):(foundShe ?'а':''))
				+ mistSel.split(', ')
				+ (isSubSel ?'(выделено синим цветом в цитате)':'') +'.\n'
				+'&nbsp; &nbsp; На мой взгляд, текст следовало бы писать так, как отмечено'
					+ (isWrongSel ?' красным цветом или подчёркиванием':'') +' в последующей строке.';

			var aa='текст-цитата   скорректированный текст   (<текст_дополнительных пояснений>)'
			 +'С уважением, <своё_имя>.'
			 +'(К|Поправки к) статье|комментарию "<название>", <дата>';

		}
	};
	if(/cmd=insertComm/.test(lh) && !win.opera) //дообработка комментария из localStorage
		cmd.reply(0);
	if(hS.killToTop.val)
		addRules('.to_top{display:none!important}');
	showSourceLang(topic,'add_label_lang'); //только метки языков к блокам кодов
	showSourceLang(comments,'add_label_lang');

	(function(){ //единый таймер контроля: показ оставшихся голосов после отправки оценок и т.д.
		if(chargeDiv && !/</.test(chargeDiv.innerHTML) && replaceCharge)
			replaceCharge(); //восстановить правку описания оставшихся голосов
		win.setTimeout(arguments.callee, 2630);
	})();
	'(endParse)topicTitle'.wcl(topicTitle);
	if($q(doc.body) && $q(doc.body).childNodes.length <=3 ){

		//win.location = 'http://webcache.googleusercontent.com/search?q=cache:'+ win.location;
	}
//})(); //=======/ end contSelect() ========

},!1); //=======/ end readyLoad() ========

if(typeof habrAjax !=u && (!habrAjax.wasLoad||/(Chrome\/|Opera\/)/.test(navigator.userAgent))) //для Хрома: эти события не существуют для юзер-скрипта
	readyLoad();
}catch(er){
	wcl('~~ER_global: '+ er +' (line '+(er.lineNumber||'')+')')}; //для оповещения об ошибках в Fx
})(typeof unsafeWindow !='undefined'? unsafeWindow: window,'undefined')
