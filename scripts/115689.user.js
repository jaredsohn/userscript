// ==UserScript==
// @id             YMailTabs
// @name           YMailTabs
// @name-es		   PestañaMail
// @version        1.0
// @namespace      sy1bzbn; BuhoSolitario
// @author         sy1bzbn; BuhoSolitario
// @description    Makeshift integration of Yahoo! Calendar and Yahoo! Notepad as application tabs in Yahoo! Mail
// @description-es Integra Yahoo! Calendario y Yahoo! Bloc de notas como pestañas en Yahoo! Mail
// @include        *.mail.yahoo.com/neo/launch*
// @include        *.notepad.yahoo.com/*
// @include        *.calendar.yahoo.com/*
// @run-at         document-end
// ==/UserScript==

//Switch language
GM_registerMenuCommand("YMailTabs - afrikaans", 'switchLang("af")');
GM_registerMenuCommand("YMailTabs - العربية", 'switchLang("ar")');
GM_registerMenuCommand("YMailTabs - Беларусь", 'switchLang("be")');
GM_registerMenuCommand("YMailTabs - българското", 'switchLang("bg")');
GM_registerMenuCommand("YMailTabs - český", 'switchLang("cs")');
GM_registerMenuCommand("YMailTabs - danske", 'switchLang("da")');
GM_registerMenuCommand("YMailTabs - deutsch", 'switchLang("de")');
GM_registerMenuCommand("YMailTabs - pilipino", 'switchLang("fo")');
GM_registerMenuCommand("YMailTabs - ελληνικά", 'switchLang("el")');
GM_registerMenuCommand("YMailTabs - english", 'switchLang("en")');
GM_registerMenuCommand("YMailTabs - español", 'switchLang("es")');
GM_registerMenuCommand("YMailTabs - eesti", 'switchLang("et")');
GM_registerMenuCommand("YMailTabs - suomalainen", 'switchLang("fi")');
GM_registerMenuCommand("YMailTabs - française", 'switchLang("fr")');
GM_registerMenuCommand("YMailTabs - עברית", 'switchLang("he")');
GM_registerMenuCommand("YMailTabs - hrvatski", 'switchLang("hr")');
GM_registerMenuCommand("YMailTabs - indonesia", 'switchLang("id")');
GM_registerMenuCommand("YMailTabs - íslenska", 'switchLang("is")');
GM_registerMenuCommand("YMailTabs - italiano", 'switchLang("it")');
GM_registerMenuCommand("YMailTabs - 日本語", 'switchLang("ja")');
GM_registerMenuCommand("YMailTabs - ייִדיש", 'switchLang("ji")');
GM_registerMenuCommand("YMailTabs - 한국", 'switchLang("ko")');
GM_registerMenuCommand("YMailTabs - lietuvos", 'switchLang("lt")');
GM_registerMenuCommand("YMailTabs - latviešu", 'switchLang("lv")');
GM_registerMenuCommand("YMailTabs - македонски", 'switchLang("mt")');
GM_registerMenuCommand("YMailTabs - nederlands", 'switchLang("nl")');
GM_registerMenuCommand("YMailTabs - norsk", 'switchLang("no")');
GM_registerMenuCommand("YMailTabs - polski", 'switchLang("pl")');
GM_registerMenuCommand("YMailTabs - português", 'switchLang("pt")');
GM_registerMenuCommand("YMailTabs - pоссия", 'switchLang("ru")');
GM_registerMenuCommand("YMailTabs - slovenská", 'switchLang("sk")');
GM_registerMenuCommand("YMailTabs - slovenski", 'switchLang("sl")');
GM_registerMenuCommand("YMailTabs - shqipe", 'switchLang("sq")');
GM_registerMenuCommand("YMailTabs - српски", 'switchLang("sr")');
GM_registerMenuCommand("YMailTabs - svenska", 'switchLang("sv")');
GM_registerMenuCommand("YMailTabs - ไทย", 'switchLang("th")');
GM_registerMenuCommand("YMailTabs - Türkçe", 'switchLang("tr")');
GM_registerMenuCommand("YMailTabs - українським", 'switchLang("uk")');
GM_registerMenuCommand("YMailTabs - Việt Nam", 'switchLang("vi")');
GM_registerMenuCommand("YMailTabs - 中国人", 'switchLang("zh")');
var lang = GM_getValue("lang", "en");
function switchLang(newLang){
	GM_setValue("lang", newLang);
}
var nomlngar = new Array("af", "ar", "sq", "bg", "be", "zh", "hr", "cs", "da", "nl", "en", "et", "fo", "fi", "fr", "de", "el", "he", "is", "id", "it", "ja", "ko", "lv", "lt", "mt", "no", "pl", "pt", "ru", "sr", "sk", "sl", "es", "sv", "th", "tr", "uk", "vi", "ji");
var nomclnar = new Array(
	"Kalender",					//af
	"تقويم",				//ar
	"Kalendar",					//sq
	"Каляндар",			//bg
	"Календар",			//be
	"日历",					//zh
	"Kalendar", 				//hr
	"Kalendář",				//cs
	"Kalender",					//da
	"Kalender",					//nl
	"Calendar",					//en
	"Kalender",					//et
	"Kalendaryo",				//fo
	"Kalenteri",				//fi
	"Calendrier",				//fr
	"Kalender",					//de
	"Ημερολόγιο",		//el
	"לוח שנה",			//he
	"Dagatal",					//is
	"Kalender",					//id
	"Calendario",				//it
	"カレンダー",			//ja
	"달력",					//ko
	"Kalendārs",				//lv
	"Kalendorius",				//lt
	"Kalendarju",				//mt
	"Kalender",					//no
	"Kalendarz",				//pl
	"Calendário",				//pt
	"Календарь",		//ru
	"Календар", 		//sr
	"Kalendár", 				//sk
	"Koledar", 					//sl
	"Agenda",	 				//es
	"Kalender", 				//sv
	"ปฏิทิน", 		//th
	"Takvim", 					//tr
	"Календар", 		//uk
	"Lịch", 					//vi
	"קאַלענדאַר" 		//ji
);
var nomntpar = new Array(
	"Notaboek", 				//af
	"المفكرة", 			//ar
	"Notepad", 					//sq
	"Нататнік", 			//bg
	"Notepad", 					//be
	"记事本", 				//zh
	"Blokčić za bilješke",	//hr
	"Poznámkový blok", 		//cs
	"Notesblok", 				//da
	"Blocnote", 				//nl
	"Notepad", 					//en
	"Notepad", 					//et
	"Notepad", 					//fo
	"Muistilehtiö", 			//fi
	"Bloc-notes", 				//fr
	"Notizblock", 				//de
	"Μπλοκ", 				//el
	"Notepad", 					//he
	"Notepad", 					//is
	"Notes", 					//id
	"Notepad", 					//it
	"メモ帳", 				//ja
	"메모장", 				//ko
	"Notepad", 					//lv
	"Užrašų knygelė", 		//lt
	"Notepad", 					//mt
	"Notepad", 					//no
	"Notatnik", 				//pl
	"Bloco de notas", 			//pt
	"Блокнот", 			//ru
	"Нотепад",  			//sr
	"Poznámkový blok",  		//sk
	"Notepad", 					//sl
	"Bloc de notas",  			//es
	"Anteckningar",  			//sv
	"Notepad", 					//th
	"Not Defteri",  			//tr
	"Блокнот",  			//uk
	"Notepad", 					//vi
	"Notepad"					//ji
);
var i = 0;
for(i = 0 ; i < nomlngar.length ; i++){
	if (nomlngar[i] == lang){
		nomcln = nomclnar[i];
		nomntp = nomntpar[i];
	}
}
//alert(i + " " + lang + "\n" + nomcln + " - " + nomntp); //Debug lang info


//INITIALIZATION

	var attr=function(tgt,params){ var k,a; for(k in params){ if(params.hasOwnProperty(k)){ a=document.createAttribute(k); a.value=params[k]; tgt.setAttributeNode(a); } } }; function contentAdd(node, lead){ var anchor=lead?document.getElementsByTagName('head')[0]:lead || document.getElementsByTagName('body')[0]; if(lead) anchor.insertBefore(node, anchor.firstChild); else anchor.appendChild(node); } function contentEval(source, lead){ if ('function'==typeof source) source='('+source+')();'; var script=document.createElement('script'); script.setAttribute('type','text/javascript'); script.textContent=source; contentAdd(script, lead); script.parentNode.removeChild(script); }
	
	if(/mail.yahoo.com\/neo\/launch/.test(location.href)){
		putCalendarTab();
		putNotepadTab();
	}
	
	//NOTEPAD TAB

	function putNotepadTab(){
		var appNotepad=function(){
			var paneshell=document.getElementById('paneshell');
			var shellgreasemonkey=document.getElementById('shellgreasemonkey');
			if(!shellgreasemonkey){
				shellgreasemonkey=document.createElement('div');
				attr(shellgreasemonkey,{ 'id':'shellgreasemonkey','style':'' });
				paneshell.appendChild(shellgreasemonkey);
			}
			var notcontainer=document.getElementById('notcontainer');
			if(!notcontainer){
				notcontainer=document.createElement('div');
				attr(notcontainer,{ 'id':'notcontainer', 'class':'hidetab' });
				notcontainer.style.visibility='hidden';
				var notContent=document.createElement('div');
				attr(notContent, { 'id':'notContent', 'class':'content', 'style':'width:100%; height:100%; position:relative; overflow:hidden; draggable: false; tab-index:-2;' });
				var notIframeTab=document.createElement('iframe');
				attr(notIframeTab, { 'id':'notIframeTab', 'frameborder':'0', 'style':'background-color:white; width:100%; height:100%', 'hspace':'0', 'vspace':'0' });
				notContent.appendChild(notIframeTab);
				notcontainer.appendChild(notContent);
				shellgreasemonkey.appendChild(notcontainer);
				notIframeTab.src='http://notepad.yahoo.com';
			}
			var tabnotepad=document.getElementById('yui_3_2_0_2_notepad');
			if(!tabnotepad){
				var snapTabs=document.evaluate('//*[@class="nav-bar"]/div/ul', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var tablist=snapTabs.snapshotItem(0); attr(tablist, { 'id':'tablistUL' });
				var tabs=tablist.getElementsByTagName('li');
				var tabnotepad=document.createElement('li');
				attr(tabnotepad, { 'class':'unremovable','role':'presentation','id':'yui_3_2_0_2_notepad' });
				var tabNotepadLink=document.createElement('a');
				attr(tabNotepadLink, { 'class':'uc', 'id':'tabnotepad', 'role':'tab', 'href':'#/app/greasemonkey/notepad', 'data-action':'navigate' });
				tabNotepadLink.appendChild(document.createTextNode('Bloc de notas'));
				tabnotepad.appendChild(tabNotepadLink);
				tablist.insertBefore(tabnotepad,tabs[3]);
				var tabNotepadClose=function(skip){
					var tabnotepad=document.getElementById('yui_3_2_0_2_notepad');
					tabnotepad.className=tabnotepad.className.replace(/\sactive/g, '');
					document.getElementById('notcontainer').style.visibility='hidden';
					if(skip); else {
						document.getElementById('paneshell').className='';
						document.getElementById('shellcontent').style.left='';
						document.getElementById('shellnavigation').style.visibility = "visible";
						document.getElementById('rail-resize').style.visibility = "visible";
						document.getElementById('yui_3_2_0_1_13157834792111590').click();
					}
				};
				var dsphNotepad=function(e){
					if(/\/app\/greasemonkey\/notepad/.test(e.target)){
						var tablist=document.getElementById('tablistUL');
						var tabs=tablist.getElementsByTagName('li');
						document.getElementById('notIframeTab').src='http://notepad.yahoo.com';
						for(var t=0,l=tabs.length; t<l; t++)
							tabs[t].className=tabs[t].className.replace(/\s?active/g,'');
						var tabnotepad=document.getElementById('yui_3_2_0_2_notepad');
						tabnotepad.className+=' active';
						var contents=document.getElementById('shellcontent').childNodes;
						for(var i=0,l=contents.length; i<l; i++)
							if(contents[i].nodeName=='DIV' && contents[i].id!='rail-resize')
								contents[i].style.visibility='hidden';
						document.getElementById('paneshell').className='withouttoolbar withoutshellnavigation';
						document.getElementsByTagName('body')[0].className='panescroll withoutad';
						setTimeout('document.getElementById("notcontainer").style.visibility="visible";', 500);
						//setTimeout('document.getElementById("notcontainer").style.visibility="visible";', 2000);
						document.getElementById('shellnavigation').style.visibility = "hidden";
						document.getElementById('rail-resize').style.visibility = "hidden";
					} else {
						var isOptionTab=function(obj){ return obj.id=='taboptions' || (obj.className=='uc' && /^t_\d+/.test(obj.id)); };
						tabNotepadClose(/\/app\/minty\/contacts/.test(e.target) || isOptionTab(e.target) || isOptionTab(e.target.parentNode))
					}
				}
				tablist.addEventListener('click', function(e){ dsphNotepad(e); }, true);
				document.getElementsByClassName('sp yuhead-ico-mglass yuhead-search-hint yucs-search-hint-color yucs-search-field')[0].addEventListener('keydown', function(e){
					var keycode;
					if(window.event) keycode=window.event.keyCode;
					else if(e) keycode=e.which;
					if(keycode==13) tabNotepadClose();
				}, false); 
				document.getElementsByClassName('yucs-sprop-btn')[0].addEventListener('click', function(e){ tabNotepadClose(); }, true);
			}
		};
		contentEval(appNotepad());
	}
	
	//CALENDAR
	
	function putCalendarTab(){
		var appCalendar=function(){
			var paneshell=document.getElementById('paneshell');
			var shellgreasemonkey=document.getElementById('shellgreasemonkey');
			if(!shellgreasemonkey){
				shellgreasemonkey=document.createElement('div');
				attr(shellgreasemonkey,{'id':'shellgreasemonkey','style':''});
				document.getElementById("paneshell").appendChild(shellgreasemonkey);
			}
			var calcontainer=document.getElementById('calcontainer');
			if(!calcontainer){
				calcontainer=document.createElement('div');
				attr(calcontainer,{'id':'calcontainer', 'class':'hidetab'});
				calcontainer.style.visibility='hidden';
				var calContent=document.createElement('div');
				attr(calContent, {'id':'calContent', 'class':'content', 'style':'width:100%; height:100%; position:relative; overflow:hidden;'});
				var calIframeTab=document.createElement('iframe');
				attr(calIframeTab, {'id':'calIframeTab', 'frameborder':'0', 'style':'background-color:white; width:100%; height:100%', 'hspace':'0', 'vspace':'0'});
				calContent.appendChild(calIframeTab);
				calcontainer.appendChild(calContent);
				shellgreasemonkey.appendChild(calcontainer);
				calIframeTab.src='http://calendar.yahoo.com';
			}
			var tabcalendar=document.getElementById('yui_3_2_0_1_calendar');
			if(!tabcalendar){
				var snapTabs=document.evaluate('//*[@class="nav-bar"]/div/ul', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var tablist=snapTabs.snapshotItem(0); attr(tablist, { 'id':'tablistUL' });
				var tabs=tablist.getElementsByTagName('li');
				var tabcalendar=document.createElement('li');
				attr(tabcalendar, { 'class':'unremovable','role':'presentation','id':'yui_3_2_0_1_calendar' });
				var tabCalendarLink=document.createElement('a');
				attr(tabCalendarLink, { 'class':'uc', 'id':'tabcalendar', 'role':'tab', 'href':'#/app/greasemonkey/calendar', 'data-action':'navigate' });
				tabCalendarLink.appendChild(document.createTextNode(nomcln));
				tabcalendar.appendChild(tabCalendarLink);
				tablist.insertBefore(tabcalendar,tabs[3]);
				var tabCalendarClose=function(skip){
					var tabcalendar=document.getElementById('yui_3_2_0_1_calendar');
					tabcalendar.className=tabcalendar.className.replace(/\sactive/g, '');
					document.getElementById('calcontainer').style.visibility='hidden';
					if(skip){
						document.getElementById("rail-resize").style.display = "block";
						document.getElementById("shellnavigation").style.display = "block";
					} else {
						document.getElementById('paneshell').className='';
						document.getElementById('shellcontent').style.left='';
						document.getElementById("rail-resize").style.display = "block";
						document.getElementById("shellnavigation").style.display = "block";
					}
				};
				var dsphCalendar=function(e){
					if(/\/app\/greasemonkey\/calendar/.test(e.target)){
						var tablist=document.getElementById('tablistUL');
						var tabs=tablist.getElementsByTagName('li');
						document.getElementById('calIframeTab').src='http://calendar.yahoo.com';
						for(var t=0,l=tabs.length; t<l; t++)
							tabs[t].className=tabs[t].className.replace(/\s?active/g,'');
						var tabcalendar=document.getElementById('yui_3_2_0_1_calendar');
						tabcalendar.className+=' active';
						var contents=document.getElementById('shellcontent').childNodes;
						for(var i=0,l=contents.length; i<l; i++)
							if(contents[i].nodeName=='DIV' && contents[i].id!='rail-resize')
								contents[i].style.visibility='hidden';
						document.getElementById('paneshell').className='withouttoolbar withoutshellnavigation';
						document.getElementsByTagName('body')[0].className='panescroll withoutad';
						document.getElementById("shellnavigation").style.display = "none";
						document.getElementById("rail-resize").style.display = "none";
						setTimeout('document.getElementById("calcontainer").style.visibility="visible";', 500);
						//setTimeout('document.getElementById("calcontainer").style.visibility="visible";', 2000);
					} else {
						var isOptionTab=function(obj){ return obj.id=='taboptions' || (obj.className=='uc' && /^t_\d+/.test(obj.id)); };
						tabCalendarClose(/\/app\/minty\/contacts/.test(e.target) || isOptionTab(e.target) || isOptionTab(e.target.parentNode))
					}
				}
				tablist.addEventListener('click', function(e){ 
														dsphCalendar(e);
													}, true);
				document.getElementsByClassName('sp yuhead-ico-mglass yuhead-search-hint yucs-search-hint-color yucs-search-field')[0].addEventListener('keydown', function(e){
					var keycode;
					if(window.event) keycode=window.event.keyCode;
					else if(e) keycode=e.which;
					if(keycode==13) tabCalendarClose();
				}, false); 
				document.getElementsByClassName('yucs-sprop-btn')[0].addEventListener('click', function(e){ tabCalendarClose(); }, true);
			}
		};
		contentEval(appCalendar());
	}