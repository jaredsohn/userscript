// ==UserScript==
// @name HabraKarmaView
// @version 2.41_2012-10-18
// @author spmbt
// @namespace spmbt.kodingen.com
// @description Подсказка кармы по наведению на ник, кроссбраузерно
// @update 2.4 QA и ссылки на юзеров везде изменили классы; новые пределы цветов по -5:0:15:30
// @icon http://habrahabr.ru/favicon.ico
// @include http://habrahabr.ru/*
// @exclude http://habrahabr.ru/api/*
// ==/UserScript==
(function(win, u, noConsole){
if(/ru\/api/.test(location.href)) return;
var wcl = function(){ //консоль как метод строки или функция, с отключением по noConsole ==1
	if(win.console && !noConsole)
		win.console.log.apply(console, this instanceof String
			? ["'=~"+this+"'"].concat([].slice.call(arguments)) : arguments);
	},
	extd = function(h, elem){for(var i in h) elem[i] = h[i]; return elem;};
String.prototype.wcl = wcl;
try{
var txLast, uNameLast, dateLast =0
	,rKarmColr = function(ka, x){var a = ka<-5 ? 0:(ka<15?1:(ka<30?2:3)); //цвета блока подсказки
		return[['#a77','#aa7','#8bb','#7a8'],['#966','#996','#7cc','#697']][x=='bg'?0:1][a];};
var writeKarma = function(ev, th){ //показ кармы (по наведению)
	var t = ev !=null ? this : th //текущий ник под указателем
		, tAuth = t.querySelector('a') || t
		, userName = tAuth.childNodes;
	for(var i in userName)
		if(userName[i].nodeType ==3 && userName[i].nodeValue.length >2){ //TEXT_NODE
			userName = userName[i].nodeValue;  break;}
	//'writeKarma'.wcl(t, userName)
	t.ww2 && clearTimeout(t.ww2);
	t.ww1 && clearTimeout(t.ww1);
	//'clearTimeoutWr '.wcl(t.ww2, t.ww1)
	t.ww1 =-1;
	var showValue = function(tx, t){ //показ рейтингов юзера
			//<habrauser>//пример dat, пришедшего по API
			//<login>Hint</login>
			//<karma>99.28</karma>
			//<rating>57.44</rating>
			//<ratingPosition>537</ratingPosition>
			//</habrauser>
		var rate ={};
		for(var i in {'karma':0,'rating':1,'ratingPosition':2}){
			var r = tx.match(RegExp('<'+ i +'>([^<]*)<\\/'+ i +'>','im'));
			rate[i] = r && r.length ==2 ? Math.floor(Number(r[1]) *10 +0.5) /10 : null;
		}
		var rPos = rate.ratingPosition;
		if(rate.karma==null && rate.rating==null)
			return;
		txLast = tx;
		uNameLast = userName;
		dateLast = +new Date();
		var pOut = document.createElement('p') //внутри ссылки (на юзера) или имени
			, pIn = document.createElement('p'); //внутри "pOut"
		extd({position:'absolute', height:'2px', display:'inline-block'}, pOut.style);
		pIn.style.cssText ='background: '+ rKarmColr(rate.karma,'bg')
			+'; position: relative; top:-20px; left: -2px; padding: 0.07em 0.7em; text-indent: 0; font: 1.3em Verdana; fontWeight: bold; border: 1px solid '+ rKarmColr(rate.karma)
			+'; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; color: #fff; z-index: 26; cursor: pointer';
		if(rate.rating !=null) tAuth.title = t.title = rate.rating +(rPos <=0
			?(rPos ==0 ?', #_X':''):', #_'+ rPos);
		pIn.innerHTML = typeof rate.karma=='number'? rate.karma :'=XXX=';
		pOut.addEventListener('click', function(ev){ //триггер постоянного показа кармы
			var t = ev.currentTarget
				, tShow = t.parentNode.getAttribute('triggerShow') ==1;
			t.style.cursor = tShow ?'default':'pointer';
			t.parentNode.setAttribute('triggerShow', 1- tShow);
			ev.stopPropagation();
			ev.preventDefault();
		},!1);
		pOut.appendChild(pIn);
		t.insertBefore(pOut, t.firstChild);
		t.ww1 =0;
		t.setAttribute('triggerShow',0); //постоянный показ выключен (только по наведению)
	};
	//(c) 2005, Reify Software, Inc.,www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js
	if(win.opera)
		GM_xmlhttpRequest = function(h){
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				var responseState ={
					responseXML: xhr.readyState==4 ? xhr.responseXML :''
					,responseText: xhr.readyState==4 ? xhr.responseText :''
					,readyState: xhr.readyState
					,responseHeaders: xhr.readyState==4 ? xhr.getAllResponseHeaders() :''
					,status: xhr.readyState==4 ? xhr.status : 0
					,statusText: xhr.readyState==4 ? xhr.statusText :''
				}
				h.onreadystatechange && h.onreadystatechange(responseState);
				if(xhr.readyState==4){
					if(h.onload && xhr.status>=200 && xhr.status<300)
						h.onload(responseState);
					if(h.onerror && (xhr.status<200 || xhr.status>=300))
						h.onerror(responseState);
			}};
			try{//cannot do cross domain
				xhr.open(h.method, h.url);
			}catch(er){
				if(h.onerror) //simulate a real error
					h.onerror({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
				return;
			}
			if(h.headers)
				for(var prop in h.headers)
					xhr.setRequestHeader(prop, h.headers[prop]);
			xhr.send((typeof(h.data) !=u) ? h.data : null);
		};
	var d = +new Date() -59000;
	if(uNameLast != userName && !(uNameLast == userName && d < dateLast) && !(t.getAttribute('tx') && d < t.getAttribute('date')) ){
		if(typeof GM_xmlhttpRequest !=u) //XHR
			(function(t){GM_xmlhttpRequest({
				url: apiProf + userName +'/'
				, method:'get'
				, onload: function(dat){
					//'dat.responseText'.wcl(dat.responseText);
					t.setAttribute('tx', dat.responseText);
					t.setAttribute('date', +new Date());
					showValue(dat.responseText, t);
				}, onerror: function(dat){}
			});})(t);
	}else if(!t.querySelector('p') && uNameLast == userName)
		showValue(txLast, t);
	else if(!t.querySelector('p'))
		t.getAttribute('tx') && showValue(t.getAttribute('tx'), t);
};
var removeKarma = function(ev){ //удаление блока кармы (по отведению)
	var t = this;
	t.clearValue = function(t){
		if(t.getAttribute('triggerShow') ==1) return;
		var pOut = t.querySelector('p');
	'pOut'.wcl(pOut)
		if(pOut && pOut.attributes)
			t.removeChild(pOut);
	};
	t.ww2 && clearTimeout(t.ww2);
	//'clearTimeoutRm '.wcl(t.ww2, t.ww1, t.querySelector('p'), t)
	if(t.querySelector('p') || t.ww1){
		t.ww2 = setTimeout( function(){(function(t){t.clearValue(t)})(t);}, 350); //скрывание кармы с задержкой, чтобы сгладить попадания границ внутри области
	}
	t.ww1 && clearTimeout(t.ww1);
	t.ww1 =0;
};
var addKarmEvent = function(blck){ //расстановка обработчиков на показ кармы
		var karmElems = blck.querySelectorAll('.infopanel >.author a, .dblAuthor >.author a, .info >.username, .comment_item >span.info a, .post .content .user_link, .comment_item .text .user_link, .comment_item .message .user_link, .comment_head .info a[href*="/users/"], .sidebar_right .user_name');
		for(var i in karmElems){var kEl = karmElems[i]; if(kEl.attributes){
			//'kEl'.wcl(kEl);
			//wcl(kEl.innerHTML, kEl)
			/*if(kEl.parentNode.parentNode.className =='comment_head'){ //релятив-обёртка
				var spEl = document.createElement('SPAN');
				spEl.className ='info';
				kEl.parentNode.insertBefore(spEl, kEl);
				spEl.appendChild(kEl);
			}*/
			if(kEl.parentNode.tagName =='SPAN'&& kEl.parentNode.className =='info')
				kEl.style.cssText +='position:relative; display: inline-block; text-indent:0';
			kEl.addEventListener('mouseover', function(ev){
				var t = this;
				if(!t.ww1)
					t.ww1 = setTimeout(function(){writeKarma(null, t);}, 250)
			}, !1);
			kEl.addEventListener('mouseout', removeKarma, !1);
		}}
	}
	,apiProf ='http://habrahabr.ru/api/profile/'
if(win.opera || /Firefox\/[345]/.test(navigator.userAgent))
	win.addKarmEvent = addKarmEvent; //win -д.Оперы|Fx3.6 - жёсткий плагин
addKarmEvent(document);
win.addEventListener('chgDom', function(ev){ //проверить блок по событию от модулей (Fx6+, Chrome,Safari)
	'chgDom'.wcl(1)
	addKarmEvent(ev.detail);
},!1);
}catch(er){
	win.console.log('~~ER_hKView: '+ er +' (line '+(er.lineNumber||'')+')')}; //для оповещения об ошибках в Fx
})(typeof unsafeWindow !='undefined'? unsafeWindow: window,'undefined',1)
