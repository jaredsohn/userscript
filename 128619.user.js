// ==UserScript==
// @id             habrAllHub
// @name           habrAllHub
// @version        0.31_2012-03-19
// @namespace      http://spmbt.codingen.com/index.htm
// @author         spmbt0
// @description    Переключает режим чтения всех блогов на свои избранные и обратно
// update 0.3 закрыт консольный вывод (noConsole=1)
// @include        http://habrahabr.ru/*
// @run-at         document-end
// ==/UserScript==
(function(win, u, noConsole, FAST){try{ //=FAST- чтение настроек с неполн.сохр.имён блогов
var wcl = function(){ //консоль как метод строки или функция, с отключением по noConsole ==1
		if(win.console && !noConsole)
			win.console.log.apply(console, this instanceof String
				? ["'=="+this+"'"].concat([].slice.call(arguments))
				: arguments
			);
	};
String.prototype.wcl = wcl;
if(!win.JSON && !win.localStorage){'Er:'.wcl('No execute - No JSON');return;} //фильтр старых бр.

// Все || Свои || Э/И || Прочитать.  Загружено категорий: XXX. идёт загрузка...

// Все: сохраняет свои выбранные блоги, прочитав с сервера, если ранее не прочитано.
// Свои: восстанавливает на сервере свои выбранные блоги.
// Э/и: обмен с пользователем через строку
// Прочитать: повторение чтения; далее - сравнение и анализ изменений.

var ajax = function(type, url, p, callbackF, callbackErr){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState ==4 &&(xhr.status ==200 || xhr.status ==304) )
				callbackF(xhr.responseText);
			else if(xhr.readyState ==4 && callbackErr) callbackErr(xhr);
		}
		xhr.open(type==1?'POST': type ||'GET', url, !0);
		var typePost = type==1 || /^post$/i.test(type);
		if(typePost){
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("Content-length", p.length);
			xhr.setRequestHeader("Connection", "close");
		}
		xhr.send(typePost ? p : null);
	}
	,dQ = function(q){return document.querySelector(q);}
	,addRules = function(css){ //установить CSS
		if(typeof GM_addStyle !=u){ GM_addStyle(css);
		}else if(typeof PRO_addStyle !=u){ PRO_addStyle(css);
		}else if(typeof addStyle !=u){ addStyle(css);
		}else{
			var head = dQ('head');
			if(head){
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				head.appendChild(node);
		}}
	};
addRules(css());
wcl(1)
var allBlog //хеш настроек блогов с сервера
	,newL = dQ('#layout .content_left'); //тип раскладки страницы (на сайте)

(setButtons = function(buttPlace){ //==== разместить кнопки ====
	var hubs ='http://habrahabr.ru/json/hubs/'
		,waitMsgBase ='Сохранение настроек...'
		,butts = document.createElement('DIV')
		,clickHandler = function(clss, handl){
			buttPlace.querySelector(clss).addEventListener('click', handl, !1);
		}
		, wLH = win.localStorage.habrAllHub ||'' //.uploadReadAll = all | part --"что на сервере"
		, wLHU = wLH && JSON.parse(wLH).uploadReadAll =='all';
		'wLHU'.wcl(wLHU)
	butts.innerHTML ='<input type="button" class="buttC all'+ (wLHU?' active':'')
			+'" title="Показывать все блоги в лентах" value="Все"/>'
		+' <input type="button" class="buttC part'+ (wLHU?'':' active')
			+'" title="Показывать избранные свои блоги в лентах" value="Свои"/>'
		+' <button class="buttC expImp" title="Экспорт / Импорт" value="&gt;">&gt;</button>'
		+' <input type="button" class="buttC read" title="Прочитать настройки с сервера и сравнить" value="прочитать"/>'
		+' <div class="waitMsg"></div>'
		+'<input type="button" class="buttC go" onclick="history.go()" title="...чтобы настройки сервера вступили в силу" value="перезагрузить"/>';
	butts.className ='buttons';
	buttPlace.appendChild(butts);
	var waitMsg = buttPlace.querySelector('.waitMsg');
	for(var i in {all:1, part:2})
		(function(ii){
			clickHandler('.'+ii, function(ev){ //загрузить на сервер все или сохранённые настройки
				//if(/active/.test(this.className)) return;
				waitMsg.innerHTML = waitMsgBase;
				wcl(ii)
				if(!wLH || wLH.length <20)
					readAll(ii);
				else
					sendCatsAll(allBlog || JSON.parse(wLH), ii);
		})})(i);
	clickHandler('.expImp', function(ev){ //экспорт/импорт/удаление сохранённых настроек блогов
		var c = saveCats(wLH, 1)
			, s = prompt('Изменить/сохранить/стереть свои настройки блогов', c=='""'?'':c);
		if(s==null)
			return;
		if(s=='')
			s='{}';
		if(s != c)
			saveCats(s); //c проверкой на синтаксис хеша
	});
	clickHandler('.read', function(ev){ //читать настройки с сервера, переписав ранее сохр-ные
		readAll('');
	});
	setInterval(function(){ //слежение за хранилищем
		var wLH = win.localStorage.habrAllHub
			, wLHU = wLH && JSON.parse(wLH).uploadReadAll =='all'
			, bAll = buttPlace.querySelector('.all')
			, bPart = buttPlace.querySelector('.part');
		if(wLHU){ bAll.className ='buttC all active'; bPart.className ='buttC part';}
		else{ bAll.className ='buttC all'; bPart.className ='buttC part active';}
	}, 2999);
var readAll = function(next){ //==== прочитать все блоги ====
		ajax(0, hubs +'categories/', 0, function(txt){
			allBlog = JSON.parse(txt);
			if(allBlog && allBlog.categories && allBlog.categories.length!==undefined){
				var aCats = allBlog.categories
					, aCatL = aCats.length
					, stat ={cat: 0 //всего категорий
						, blog: 0 //подписанных блогов
						, allBlog: 0 //всего блогов
					}, fullSubs =0;
				allBlog.cat =[];
				for(var i in aCats) if(aCats[i].subscription ==2 || aCats[i].count==0)
					fullSubs++;
				if(aCatL == fullSubs)
					return;
				for(var i in aCats) if(aCats[i].title){
					var cat = aCats[i]
						, aCC = aCats[i].count; 
					if(aCC)
						stat.allBlog += +aCC;
					if(aCats[i].subscription ==2)
						stat.blog += +aCC ||0;
					if(!(aCats[i].subscription ==2 && FAST))
						(function(ii){
							ajax(0, hubs +'category/'+ cat.alias +'/', 0, function(txt){
								allBlog.cat[ii] = JSON.parse(txt);
								//if(allBlog.cat[ii].blogs) //не делать, т.к. бывают ошибки
								stat.cat++;
								var aCB = allBlog.cat[ii].blogs;
								if(aCats[ii].subscription ==1)
									if(aCB && aCB.length)
										for(var j =0, jL = aCB.length; j < jL; j++)
											if(aCB[j].subscription)
												stat.blog++;
								if(allBlog.cat[ii])
									'.cat'.wcl(stat.cat, allBlog.cat[ii], aCats[ii].title);
								if(waitMsg)
									waitMsg.innerHTML = waitMsgBase + stat.cat;
								if(stat.cat == aCatL){
									reportReadAll(allBlog, next);
									win.console.log('allBlog', stat, allBlog);
								}
							});
						})(i);
					else
						stat.cat++;
				}
			}
		});
		if(aCatL == fullSubs)
			alert('На сервере - выбран режим "Все хабы", записывать настройки в браузер нет смысла, операция прервана.');
	}
	,reportReadAll = function(allBlog, next){
		win.allBlog = allBlog;
		win.localStorage.habrAllHub = wLH = saveCats(allBlog, 1); //TEST затирает без проверки
		if(waitMsg) waitMsg.innerHTML ='сохранено в браузере';
		if(next =='all')
			sendCatsAll(allBlog, next);
		if(next =='part')
			sendCats(allBlog, next);
	}
	,saveCats = function(sett, ret){ try{ //запись настроек (в хранилище)
		var s = (typeof sett =='string') && sett || JSON.stringify(sett);
		if(!ret){
			's'.wcl(s)
			if(s !='{}' && s!='')
				win.localStorage.habrAllHub = wLH = s;
			else{
				delete win.localStorage.habrAllHub; wLH ='';}
		}else
			return s;
	}catch(er){'Er:'.wcl('saveSettings to localStorage:', er)}}
//Формат отправки:
// categories[<имя>]=(0|1|2) - все блоги не выбраны | без изменений | все выбраны
// blogs[<id блога>]=(0|1) - не выбран | выбран
// categories%5Bapi%5D=2&categories%5Badministration%5D=2&categories%5Bdatabases%5D=1&categories%5Bsecurity%5D=2&categories%5Bdesign-and-media%5D=1&categories%5Bhardware%5D=1&categories%5Bcompanies-and-services%5D=1&categories%5Bmanagement%5D=1&blogs%5B365%5D=1&blogs%5B17699%5D=1&blogs%5B474%5D=1&blogs%5B295%5D=1&blogs%5B560%5D=1&blogs%5B397%5D=1&blogs%5B492%5D=1&blogs%5B190%5D=0&blogs%5B137%5D=1&blogs%5B7023%5D=0&blogs%5B9%5D=1&categories%5Bprogramming%5D=1&categories%5Bsoftware%5D=1&categories%5Btelecommunications%5D=1&categories%5Bfw-and-cms%5D=1&categories%5Bfrontend%5D=1&categories%5Bothers%5D=1&categories%5Bcorporative_blogs%5D=0
	,sendCats = function(sBlogs, next){ //передать сохранённые настройки
		if(typeof sBlogs !='string'){
			wcl(sBlogs)
			var aC = sBlogs.categories
				, s ='';
			for(var i =0, iL = aC.length; i < iL; i++){
				s += (i?'&':'') +'categories%5B'+ aC[i].alias +'%5D='+ aC[i].subscription;
				if(aC[i].subscription ==1){
					var aCB = sBlogs.cat[i].blogs;
					if(aCB)
						for(var j =0, jL = aCB.length; j < jL; j++)
							s += (i?'&':'') +'blogs%5B'+ aCB[j].id +'%5D='+ aCB[j].subscription;
				}
			}
		}else
			s = sBlogs;
		'post'.wcl(s)
		ajax(1, hubs +'save_subscriptions/', s, function(txt){ //сохранение на сервере (Post)
			var h = JSON.parse(win.localStorage.habrAllHub);
			h.uploadReadAll = next;
			win.localStorage.habrAllHub = JSON.stringify(h); //'all', если на сервере - "Читать всё", иначе -'part'
			if(waitMsg) waitMsg.innerHTML ='установлено на сервере '+ s.length;
			buttPlace.querySelector('.go').style.display ='inline';
		});
	}
	,sendCatsAll = function(aBlog, next){ //передать "Все категории выбраны"
		if(next=='part'){ sendCats(aBlog, next); return;}
		var aC = aBlog.categories
			, s ='';
	wcl(aC.length)
		for(var i =0, iL = aC.length; i < iL; i++)
			if(aC[i].subscription !=null)
				s += (i?'&':'') +'categories%5B'+ aC[i].alias +'%5D=2';
		sendCats(s, next);
	};
})(dQ(newL?'.userpanel .charge':'.panel-personal #usercharge') );

}catch(er){wcl("~~ER_global: "+ er +' (line '+(er.lineNumber||'')+')')}
function css(){return'.buttC {padding:0 3px 1px!important;'
			+'border: 1px solid #777!important;'
			+'background: #c4c0b8!important;'
			+'border-radius: 5px!important;'
			+'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 1px 1px rgba(0, 0, 0, 0.2);'
			+'color: #999!important; -moz-transition-duration: 0.2s; cursor: pointer}'
	+'input.buttC{margin:2px 0!important}'
	+'.buttC:hover {border: 1px solid #999!important; text-decoration: none;'
			+'background: #ddd!important;'
			+'color: #777}'
	+'.buttC.active{border: 1px solid #aaa!important;'
			+'background: #eaecea!important;'
			+'color: #222; cursor: default}'
	+'.buttC + .buttC + .buttC, .buttC.go{display:none}'
	+'.buttC.go{padding:0 2px!important; font-size: 9px!important}'
	+'.buttons:hover >.buttC + .buttC + .buttC{display:inline}'
	+'body{text-align: inherit!important; font-family: Verdana,sans-serif!important}';}

})(typeof unsafeWindow !='undefined'? unsafeWindow: window,'undefined',1,1);

