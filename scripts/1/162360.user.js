// ==UserScript==
// @id             habrActivity@spmbt.codingen.com/index.htm
// @name           habrActivity
// @version        2.2013.3.19
// @author         spmbt0
// @description    view user activity in Habr site for Fx-Opera-Chrome-Safari
// @include        http://habrahabr.ru/*
// @update 1 многострочная диаграмма; Исправление user lowercase из строки адреса; число прочитанных комментариев и период их опубликования; удаление пользователей по одному;
// @icon data:image/gif;base64,R0lGODlhIAAgAMMBAG6Wyv///2+NtIucstfY2b/FzpSmvY+QkM3Nzunp6fLy8qGwweDg4MbFxa2trrm6uiwAAAAAIAAgAAAE/xDISau9OM/AOe2edoHBBwqiRZodmrKhRLqXYFfrdmLCQBQGWk62swgOiERAQQgChs9iRZBMKDgEFGnbMi4YDMU1gNBytzSJDcGwXhUD4lmqZofFioZrPqMIDARtYksIAzZ8dAINgngJVgkLUH1qBmBuCgmBYA6SUgKBl0wICA6lk1FdAAIFjngKDAgEpKYgWXIcKH8EDQ0EVwmjsrycIA4FZl2rDwcHDgivow8ODwzEHca3ASgDpMylsrEOzdUkDk59AtOl07wIDcwNkDbzCy7z8xIDD8Ps3Q5hCQqscxBHgw0DbEY1WIbEkRtHZV6oMsAq0wNqrcQ4KihR1Z9YjzUeKjjWcYqABUoaJeBY0k8bAm5ItqxgANjFBnBmTgnTQNw0nVOSNBjQLA1QXdEMATVioGnJCAA7
// ==/UserScript==
(function(win, noConsole, css, hActHelp){
var $q = function(q, f){return (f||document).querySelector(q)}
	,uHead = $q('.user_header')
	,uName2a = $q('.username a', uHead)
	,uName2 = uName2a && uName2a.innerHTML
	,comms = $q('.comments_list');
if(uHead && uName2 && comms){ //=====(основные операции скрипта, только на странице некоторого пользователя)=====

try{ //для оповещения об ошибках в Fx
var NOWdate = new Date()
,lStorRoot ='habrAct_'
,setLocStor = function(name, hh){ if(!localStorage) return;
	localStorage[lStorRoot + name] = JSON.stringify({h: hh});
}
,getLocStor = function(name){
	return (JSON.parse(localStorage && localStorage[lStorRoot + name] ||'{"h":{}}')).h;
}
,HRU ='http://habrahabr.ru'
,removeLocStor = function(name){localStorage.removeItem(lStorRoot + name);}
,lh = location.href
,$qA = function(q, f){return (f||document).querySelectorAll(q)}
,$pd = function(ev){ev.preventDefault();}
,$sp = function(ev){ev.stopPropagation();}
,$x = function(el, h){ //===extend===
	if(h)
		for(var i in h)
			el[i] = h[i];
	return el;
}
,$e = function(g){ //===создать или использовать имеющийся элемент===
	//g={el|clone,IF+ifA,q|[q,el],cl|(clAdd,clRemove),ht,cs,at,on,revent,apT,prT,bef,aft,f+fA}
	if(g.ht || g.at){
		var at = g.at ||{}; if(g.ht) at.innerHTML = g.ht;}
	if(typeof g.IF =='function')
		g.IF = g.IF.apply(g, g.ifA ||[]);
	g.el = g.el || g.clone || g.IF && g.IF.attributes && g.IF ||'DIV';
	var o = g.clone && g.clone.cloneNode(!0)
			|| (typeof g.el =='string' ? document.createElement(g.el) : g.el);
	if(o && (g.IF===undefined || g.IF) && (!g.q || g.q && (g.dQ = g.q instanceof Array ? $q(g.q[0], g.q[1]) : $q(g.q)) ) ){ //выполнять, если существует; g.dQ - результат селектора для функций IF,f
		if(g.cl)
			o.className = g.cl;
		else{
			if(g.clAdd)
				o.classList.add(g.clAdd);
			if(g.clRemove)
				o.classList.remove(g.clRemove);
		}
		if(g.cs)
			$x(o.style, g.cs);
		if(at)
			for(var i in at){
				if(i=='innerHTML') o[i] = at[i];
				else o.setAttribute(i, at[i]);}
		if(g.on)
			for(var i in g.on)
				o.addEventListener(i, g.on[i],!1);
		if(g.revent)
			for(var i in g.revent)
				o.removeEventListener(i, g.revent[i],!1);
		g.apT && g.apT.appendChild(o); //ставится по ориентации, если новый
		g.prT && (g.prT.firstChild
			? g.prT.insertBefore(o, g.prT.firstChild)
			: g.prT.appendChild(o) );
		g.bef && g.bef.parentNode.insertBefore(o, g.bef);
		g.aft && (g.aft.nextSibling
			? g.aft.parentNode.insertBefore(o, g.aft.nextSibling)
			: g.aft.parentNode.appendChild(o) );
		if(typeof g.f =='function')
			g.f.apply(g, g.fA ||[]); //this - это g
	}
	return o;
}
,addRules = function(css){ var u = 'undefined';
	if(typeof GM_addStyle !=u){ GM_addStyle(css);
	}else if(typeof PRO_addStyle !=u){ PRO_addStyle(css);
	}else if(typeof addStyle !=u){ addStyle(css);
	}else{
		var heads = document.getElementsByTagName('head');
		if(heads.length){
			var node = document.createElement('style');
			node.type ='text/css';
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node);
	}}
}
,parents = function(cl, elem){
	for(var el = elem; el!=null && !RegExp(cl).test(el.className); el = el.parentNode);
	return el;
}
,prev = function(cl, elem){
	for(var el = elem; el!=null && !RegExp(cl).test(el.className); el = el.previousSibling);
	return el;
}
,next = function(cl, elem){
	for(var el = elem; el!=null && !RegExp(cl).test(el.className); el = el.nextSibling);
	return el;
}
,toTime = function(dat){
	var yestDate = new Date(+NOWdate - 86400000)
		,datMonth ={"января":0,"февраля":1,"марта":2,"апреля":3,"мая":4,"июня":5,
			"июля":6,"августа":7,"сентября":8,"октября":9,"ноября":10,"декабря":11}
		,datFull = dat.innerHTML
		,datQaToday = /сегодня/.test(datFull)
		,datQaYest = /вчера/.test(datFull)
		,dateText = datFull.replace(/ в /,' ').replace(/(сегодня |вчера )/,'')
		,datArr = dateText.match(/(\d+)\s+([а-яё]+)\s+(\d{4})?/i);
	if(!datArr)
		datArr =[0,(datQaYest ? yestDate : NOWdate).getDate(),(datQaYest ? yestDate : NOWdate).getMonth(),(datQaYest ? yestDate : NOWdate).getFullYear()];
	var altArr = dateText.match(/(\d+)\:(\d+),([а-яё]+)\s*(\d+)\s*([а-яё]+)\s*(\d{4})?/i); //ччммддЧЧММГГГГ?
	if(altArr)
		datArr =[0,altArr[4],altArr[5],altArr[6]];
	//'altArr'.wcl(altArr)
	var mon = datArr && datMonth[datArr[2]] || datMonth[datArr[2]] !=0 && datArr[2] || datMonth[datArr[2]];
	//'datArr'.wcl(datArr, mon)
	if(datArr && !datArr[3])
		datArr[3] = NOWdate.getFullYear();
	var ret2 = new Date(datArr[3], mon, datArr[1], dateText.replace(/(.*?)(\d{1,2}):(\d\d)(.*)/,'$2'), dateText.replace(/(.*?)(\d{1,2}):(\d\d)(.*)/,'$3') ).getTime();
	if(+NOWdate < ret2)
		ret2 = new Date(datArr[3] -1, mon, datArr[1], dateText.replace(/(.*?)(\d{1,2}):(\d\d)(.*)/,'$2'), dateText.replace(/(.*?)(\d{1,2}):(\d\d)(.*)/,'$3') ).getTime();
	return ret2
}
,getYearWeekDay = function(dd){
	//wcl(new Date(dd).getFullYear())
	var d = new Date(dd), jan1 = new Date(d.getFullYear(),0,1);
	return [d.getFullYear(), Math.ceil(((dd - jan1) /86400000 + jan1.getDay() -1)/7)
		, d.getDay() + 7*(d.getDay()==0), d.getDate(), d.getMonth()];
}
,wcl = function(a){ a = a ||''; //консоль как метод строки или функция, с отключением по noConsole
	if(win.console && !noConsole)
		win.console.log.apply(console, this instanceof String
			? ["'=="+ this +"'"].concat([].slice.call(arguments)) : arguments);
};
String.prototype.wcl = wcl;
addRules(css);

var hActUsersTmpl ={ //шаблон основной (индексной) записи в хранилище
		dataLen: 0 //число записей в хранилище вида habrActDataNNNNN, где NNNNN - число
		,dataCount: 25 //огранчитель цикла чтения, страниц
		,dateStart: 1000 //ограничитель периода чтения, до 365 дней, сравнивает дату начала цикла и посл.
		,userS: []  //массив имён пользователей, для которых имеются данные
	}
,readAutoIntervalMax = 365
,hActDataTmpl ={ //шаблон записи данных в хранилище; запись имеет вид habrActData[число], от 1 до dataLen
	user:'' //пользователь, для которого со страницы комментариев сняли данные
	,data: [] //массив дат (или сложнее)
};

var readPage
	,ww =0
	,startButt = $e({el:'button', ht:'Старт'
		,on:{click: readPage = function(ev){ //читать статистику со страницы и переходить к следующей
			if(ev){
				var handStart =1;
				hActUsers = getLocStor('users');
				hActUsers.userS = hActUsers.userS ||[];
				hActUsers.dataLen = hActUsers.dataLen ||0;
			}
			var infoS = $qA('.info', comms)
				,datC =[];
			clearTimeout(ww);
			if(startButt.innerHTML =='Стоп'){
				startButt.innerHTML ='Старт';
				hActUsers.dataCount =0;
				setLocStor('users', hActUsers);
				return;
			}
			hActUsers.dataLen++
			startButt.innerHTML ='Стоп';
			if(handStart)
				hActUsers.dataCount = hActUsersTmpl.dataCount;
			for(var i in infoS){ var iI = infoS[i]; if(iI.attributes){
				var sco = $q('.voting .score',iI)
					,apm = sco && sco.title.match(/\d+/g)
					,text = $q('.message', iI.parentNode);
				datC.push(//{date: 
					toTime($q('time',iI))/1000
					//,plus: apm && apm[1]
					//,minus: apm && apm[2]
					//,textLen: text && text.innerHTML.replace(/\t/g,'').length}
				);
			}}
			var pageA = lh.match(/^.+?page(\d+).*/);
			'datC'.wcl(datC, pageA, ( + NOWdate/1000 - datC[datC.length -1]) /86400)
			$e({el: $q('.msg', startButt.parentNode) ||'span'
				,cl:'msg'
				,ht:'<br>&nbsp; До '+(0|((NOWdate/1000 - datC[datC.length -1]) /86400))
					+' дней от сегодня; интервал - '+ (0|((datC[0] - datC[datC.length -1]) /86400))+' дней'
				,bef: $q('.clear',uHead)
			});
			if(handStart)
				hActUsers.dateStart = datC[0];
			if((hActUsers.dateStart - datC[datC.length -1]) /86400 < readAutoIntervalMax)
				ww = setTimeout(function(){
					location.href = pageA
						? lh.replace(/page(\d+)/,'page'+ (+pageA[1] +1))
						: lh +'page2/';
				}, 3000);
			else{
				startButt.innerHTML ='Старт';
				hActUsers.dataCount =0;
			}
			if(!handStart)
				hActUsers.dataCount--;
			var noNewUser =0;
			for(var i in hActUsers.userS){ var uI = hActUsers.userS[i];
				if(uI == uName2){
					noNewUser =1; break;}
			}
			if(!noNewUser)
				hActUsers.userS.push(uName2);
			setLocStor('users', hActUsers); //накапливать статистику в хранилище
			wcl('2nd', hActUsers.dataLen);
			setLocStor('data'+ hActUsers.dataLen, {user: uName2, data: datC});
		}}
		,bef: $q('.clear', uHead)
	}),
	hActUsers = getLocStor('users');
hActUsers.userS = hActUsers.userS ||[];
hActUsers.dataLen = hActUsers.dataLen ||0;
if(hActUsers.dataCount >0){ //автозапуск анализа страницы
	wcl('1st');readPage();}

var helpHAct,
helpButt = $e({el:'button', ht:'Подробности'
	,on:{click: function(ev){ if(!helpHAct || helpHAct.style.display=='none'){
		if(!helpHAct){
			helpHAct = $e({cl:'helpHAct'
				,ht: hActHelp
				,on:{click: function(){this.style.display ='none';}}
				,apT: document.body
			});
			$q('.in', helpHAct).addEventListener('click', function(ev){$sp(ev);},!1);
		}else
			helpHAct.style.display ='block';
	}else helpHAct.style.display ='none'; } }
	,aft: startButt
}),
eraseButt = $e({el:'button', ht:'Стереть'
	,on:{click: function(ev){
		var hActUsers = getLocStor('users');
		if(confirm('Удалить всю статистику комментариев пользователей ('+ hActUsers.dataLen +' записей)?')){
			if(hActUsers.dataLen){
				for(var i = +hActUsers.dataLen; i >=1; i--)
					removeLocStor('data'+ i);
				removeLocStor('users');
			}
			$q('.diag', selUser) && $q('.diag', selUser).classList.add('empty');
		}
	}}
	,aft: startButt
}),
dataButt = $e({el:'button', ht:'Данные'
	,on:{click: function(ev){
		hActUsers = getLocStor('users');
		selectUser(showData);
		this.blur();
	}}
	,aft: startButt
}),
selUser,
selectUser = function(f){ //предложить выбор пользователей
	if(!selUser || selUser.style.display=='none'){
		if(!selUser){
			selUser = $e({cl:'selUser'
				,ht: '<div class=under></div><div class=in><h2><input class="inUser" title="на комментарии польователя; Ctrl-Enter - в новом окне"><span class="titl">Выбрать пользователя</span></h2><div class="diag empty"></div></div>'
				,on:{click: function(){this.style.display ='none';}}
				,apT: document.body
			});
			$q('.in', selUser).addEventListener('click', function(ev){$sp(ev);},!1);
			hActUsers.userElemS =[];
			for(var i in hActUsers.userS){ var uI = hActUsers.userS[i];
				hActUsers.userElemS[i] = $e({el:'button'
					,ht: uI
					,on:{click: function(){
						var bS = $qA('button', this.parentNode);
						for(var j in bS) if(bS[j].attributes)
							bS[j].classList.remove('hAActive');
						this.classList.add('hAActive');
						f(this.innerHTML);
						this.blur();
					}}
					,bef: $q('.diag', selUser)
				});
				$e({el:'button',cl:'hADel'
					,ht:'X'
					,at:{title:'Удалить из хранилища','data-user': uI}
					,on:{click: function(){
						var t = this, u;
						del1user(u = this.getAttribute('data-user'));
						t.previousSibling.parentNode.removeChild(t.previousSibling);
						setTimeout(function(){t.parentNode.removeChild(t);},1);
						for(var i in hActUsers.userS){ var uI = hActUsers.userS[i];
							if(u == uI){
								hActUsers.userS.splice(i, 1); break;
						}}
						delete hActUsers.userElemS;
						setLocStor('users', hActUsers);
					}}
					,bef: $q('.diag', selUser)
				});
			}
			$q('.inUser',selUser).addEventListener('keyup',function(ev){ if(ev.keyCode ==13){
				var lnk = HRU +'/users/'+ this.value +'/comments/';
				if(!ev.ctrlKey)
					location.href = lnk;
				else
					window.open(lnk,"_blank")
			}},!1);
		}else
			selUser.style.display ='block';
		var hU = hActUsers.userS;
		'hU'.wcl(hU,uName2)
		if(hU && hU.length ==1)
			f(hU[0]),$q('button',selUser).classList.add('hAActive');
		else if(hU && uName2){
			var bS = $qA('button', hU[0].parentNode);
			for(var i in bS) if(bS[i].attributes){
				bS[i].classList.remove('hAActive');
				if(bS[i].innerHTML == uName2)
					f(uName2),bS[i].classList.add('hAActive');
			}
		}
	}else selUser.style.display ='none';
},
showData = function(user){ //показать диаграмму активности
	var dA =[]
		,diag = $q('.diag', selUser)
		,dC = diag.childNodes;
	for(var i = dC.length -1; i>=0 ; i--){ var dI = dC[i]; if(dI.attributes)
		diag.removeChild(dI);}
	for(var i =1; i <= +hActUsers.dataLen; i++){ //всё ранее прочитанное по юзеру
		if(!RegExp(' '+ i +' ').test(hActUsers.removed ||'') ){
			var dat = getLocStor('data'+ i);
			if(user == dat.user)
				dA = dA.concat(dat.data);
	}}
	diag.style.height ='100px'
	dA.sort(function(a, b){return a - b});
	var ymd0 = getYearWeekDay(dA[0]*1000), ymdE =[] //год, неделя, день, число, месяц, кол-во комм.
		,diagLeftMargin =7
		,diagTopMargin =7
		,stripeN =1 //число полос для диаграммы
		,stripePeriod = 110
		,nComm =0
		,diagInnerWid = diag.offsetWidth -diagLeftMargin *2 -10 //ограничения ширины 1 полосы
		,wasDoubles =0, dAClean =[]; //слежение за дублями
	for(var i in dA){
		var ymd = getYearWeekDay(dA[i]*1000);
		ymd[5] = ymdE[0]==ymd[0] && ymdE[1]==ymd[1] && ymdE[2]==ymd[2] ? ymdE[5]+1 : 1;
		if(dA[i] == ymdE[6]){ //игнор дублей чтения
			wasDoubles =1; continue;}
		dAClean.push(dA[i]);
		nComm++;
		ymdE = [ymd[0], ymd[1], ymd[2], ymd[3], ymd[4], ymd[5], dA[i]];
		var leftFirstShift = ((ymd[0]-ymd0[0])*52 + (ymd[1]-ymd0[1]) )*10
			,iStripe = Math.floor(leftFirstShift / diagInnerWid);
		stripeN = Math.max(stripeN, iStripe +1);
		$e({cl:'comm'
			,cs:{left: (leftFirstShift % diagInnerWid) + diagLeftMargin +'px'
				,top: iStripe * stripePeriod + ymd[2] *10 + diagTopMargin +'px'}
			,at:{title: ymd[5] +' / '+ ymd[3]+'янвфевмарапрмайиюниюлавгсеноктноядек'.match(/.../g)[ymd[4]]+(ymd[0] +'').substr(2,2) }
			,apT: diag
		});
	}
	if(wasDoubles){ //удалить юзера и записать его же из очищенного от дублей массива dAClean
		del1user(user);
		wcl('delU')
		setLocStor('data'+ ++hActUsers.dataLen, {user: uName2, data: dAClean});
		delete hActUsers.userElemS; //(был хак использ_, удал_следов)
		setLocStor('users', hActUsers); //сохранить .removed
	}
	if(stripeN >1)
		diag.style.height = 110 * stripeN +'px';
	diag.classList.remove('empty');
	var hActTitle = '%N комментари%W <span title="%T">с %D0 по %D1</span>', days;
	if(ymd)
		$q('h2 .titl', selUser).innerHTML = hActTitle
			.replace(/%N/,nComm).replace(/%W/, nComm % 10 >0 && nComm % 10 <5 && Math.floor(nComm % 100 / 10) !=1 ? (nComm % 10 ==1 ?'й':'я'):'ев')
			.replace(/%D0/,ymd0[3] +'.'+ (ymd0[4]+1) +'.'+ (ymd0[0] +'').substr(2,2))
			.replace(/%D1/,ymd[3] +'.'+ (ymd[4]+1) +'.'+ (ymd[0] +'').substr(2,2))
			.replace('%T', Math.ceil(days = (dA[dA.length-1] - dA[0]) /86400) +' дней, '+ (nComm/days).toFixed(2) +' комм./д.' );
},
del1user = function(user){ //удалить данные 1 пользователя
	for(var i =1; i <= +hActUsers.dataLen; i++){ //всё ранее прочитанное по юзеру
		if(!RegExp(' '+ i +' ').test(hActUsers.removed ||'') ){
			var dat = getLocStor('data'+ i);
			if(user == dat.user){
				var dat = removeLocStor('data'+ i);
				hActUsers.removed = (hActUsers.removed ||' ')+ i +' ';
	}}}
};


}catch(er){
	wcl('~~ER_global: '+ er +' (line '+(er.lineNumber||'')+')')}; //для оповещения об ошибках в Fx
}} //=====/(конец основных операций)=====
)(typeof unsafeWindow !='undefined'? unsafeWindow: window, !'noConsole',

	/*===== css =====*/

'.helpHAct,.selUser{position: absolute; z-index: 1201; top: 0; width: 100%; height: 100%;}'
+'.helpHAct .under,.selUser .under{position: fixed; z-index: 1200; width: 100%; height: 100%; opacity:0.1; background:#777}'
+'.helpHAct .in, .selUser .in{position: relative;  z-index: 1201;max-width: 48em; margin: 120px auto 280px; padding: 12px; border: 1px solid #bbb; box-shadow: 0 0 7px 4px #a4b39D/*#afb6af*/;  background: #fff;}'
+'.selUser .in .inUser{float: right; padding: 1px 1px 3px; border: 1px solid #ccc;}'
+'.selUser .in h2{margin-bottom: 6px;}'
+'.selUser .diag{position: relative; height: 100px; margin-top: 12px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABuAgMAAACsF16hAAAADFBMVEXu7u7x8fHz8/MAAACwIVgQAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAIgFHUgAAAA9SURBVHjaY2AYBYMahCKBsDQkgCITtQoBVuKUWTUqMyozKjMqMyozKjMMZJABoyACCIw2G6gO/uMCI0cGAF7MVC7yox7wAAAAAElFTkSuQmCC) 6px 0;}'
+'.selUser .comm{position: absolute; width: 8px; height: 8px; opacity: 0.2; background: #8b4;}'
+'.selUser .hAActive, .user_header .hAActive{background-color: #f6f8e0/*#fff2d8*/}'
+'.selUser button, .user_header button{height: 1.6em; margin: 10px 0 0 1px; padding: 0 4px 1px; line-height: 1.3em;'
	+'box-shadow: 0 0 2px rgba(255, 255, 255, 0.4) inset, 0 0 2px rgba(0, 0, 0, 0.2); transition-duration: 0.2s; text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8); border-radius: 3px; border: 1px solid #e9d8e8; border-color: #e9DeD8 #bccbbb #9eae9e; background-color: #c8ead0/*#cfe8c4*/;}'
+'.selUser button{margin-top: 5px}.user_header .rating{margin-right: 14px;}'
+'.selUser button:hover,.user_header button:hover{background-color: #f2fddb/*#fcfcfc*/;}'
+'.selUser .diag.empty{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAASFBMVEXu7u708uv7+PP7+fP28+z38+z08ev7+PLy8Oz69/H6+PP7+PHx8Oz69/L49Ovs7+749Oz38+v28uz18uz49O328+v49O78+fSGxIqmAAAAAWJLR0QAiAUdSAAAAE9JREFUeNqVzjEOwCAMA0BLWbqEASn0/z8F2lpKIaDW4w22AcaEyb/t0MDku2nUp6vdtDUEVhCYYLIsRPP24NtuHOzC0TpO1tDcF6Kzk1gBDdAFF3BuHgsAAAAASUVORK5CYII=)}'
+'.selUser .hADel{position: relative; height: 14px; line-height: 1px; border-radius: 6px; margin:-0.6em; top:-0.9em; left: -3px; padding:0 0 1px; border: 1px solid #d99; font-size:10px; background-color: #ea7852; opacity: 0.15;}.selUser .hADel:hover{background-color: #E65E30; color: #fbb; opacity: 0.8}'
+'.selUser button:hover +.hADel{opacity: 0.5}',

	/*===== help string =====*/

'<div class=in><h2>Просмотр активности комментариев пользователей</h2><br><br>После установки юзерскрипта <b>habrActivity</b> на страницах комментариев пользователей (и только на них) появляются 4 кнопки: "Старт", "Данные", "Стереть", "Подробности".<br><br>'

+'При нажатии на "<b>Старт</b>" запускается цикл чтения данных с перебором страниц комментариев для данного пользователя, а кнопка меняет название на "Стоп". Прочитывается не более 25 страниц в автоматическом режиме и читается интервал комментариев за не более 365 дней. В любой момент цикл автоматического чтения страниц останавливается вручную кнопкой "<b>Стоп</b>". Если нужно читать больше 365 дней, чтение возобновляется по кнопке "Старт".<br><br>'

+'С каждой страницы собирается информация о датах создания комментариев и, возможно, впоследствии более сложная, и запоминается в хранилище. Таким образом, накапливается информация о комментариях разных пользователей в разные периоды времени. Хранятся только массивы чисел - например, даты написания комментариев. В последующих версиях возможно расширить статистику на сбор оценок, объёма текстов, количество ссылок и картинок и подобное.<br><br>'

+'Чтобы просмотреть накопленные данные, нажимают кнопку "<b>Данные</b>". Если в браузере на данный момент хранится информация о более 1 пользователе, появится список кнопок с именами пользователей. Нажав одну из кнопок, переходим на просмотр статистики.<br><br>'

+'Просмотр статистики по датам комментариев организован аналогично инфографике Гитхаба - показ активности комментариев пользователя по дням года и дням недели. Отображается не более 420 последних дней (60 недель). Данные подготовлены для "музыкальной иллюстрации активности" http://habrahabr.ru/post/173085/ .<br><br>'

+'В результате, получаются 3 полезные вещи: смотрим активность любого пользователя в комментариях, видим наглядный график, прослушиваем в задумчивости озвучивание его. Делаем выводы.<br><br>'

+'Чтобы стереть все данные пользователя, нажимается кнопка "<b>Стереть</b>". Память браузера очищается от накопленных данных.<br><br></div>')
