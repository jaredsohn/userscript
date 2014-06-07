// ==UserScript==
// @name         YMail Calendar Tab
// @namespace    sy1bzbn
// @description  Makeshift integration of Yahoo! Calendar as application tab in YMail
// @include      *
// ==/UserScript==
// 
var attr=function(tgt,params){ var k,a; for(k in params){ if(params.hasOwnProperty(k)){ a=document.createAttribute(k); a.value=params[k]; tgt.setAttributeNode(a); } } }; function contentAdd(node, lead){ var anchor=lead?document.getElementsByTagName('head')[0]:lead || document.getElementsByTagName('body')[0]; if(lead) anchor.insertBefore(node, anchor.firstChild); else anchor.appendChild(node); } function contentEval(source, lead){ if ('function'==typeof source) source='('+source+')();'; var script=document.createElement('script'); script.setAttribute('type','text/javascript'); script.textContent=source; contentAdd(script, lead); script.parentNode.removeChild(script); }

if(/mail.yahoo.com\/neo\/launch/.test(location.href)){
	var appCalendar=function(){
		var paneshell=document.getElementById('paneshell');
		var shellgreasemonkey=document.getElementById('shellgreasemonkey');
		if(!shellgreasemonkey){
			shellgreasemonkey=document.createElement('div');
			attr(shellgreasemonkey,{ 'id':'shellgreasemonkey','style':'' });
			paneshell.appendChild(shellgreasemonkey);
		}
		var calcontainer=document.getElementById('calcontainer');
		if(!calcontainer){
			calcontainer=document.createElement('div');
			attr(calcontainer,{ 'id':'calcontainer', 'class':'hidetab' });
			calcontainer.style.visibility='hidden';
			var calContent=document.createElement('div');
			attr(calContent, { 'id':'calContent', 'class':'content', 'style':'width:100%; height:100%; position:relative; overflow:hidden;' });
			var calIframeTab=document.createElement('iframe');
			attr(calIframeTab, { 'id':'calIframeTab', 'frameborder':'0', 'style':'background-color:white; width:100%; height:100%', 'hspace':'0', 'vspace':'0' });
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
			tabCalendarLink.appendChild(document.createTextNode('Calendar'));
			tabcalendar.appendChild(tabCalendarLink);
			tablist.insertBefore(tabcalendar,tabs[3]);
			var tabCalendarClose=function(skip){
				var tabcalendar=document.getElementById('yui_3_2_0_1_calendar');
				tabcalendar.className=tabcalendar.className.replace(/\sactive/g, '');
				document.getElementById('calcontainer').style.visibility='hidden';
				if(skip); else {
					document.getElementById('paneshell').className='';
					document.getElementById('shellcontent').style.left='';
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
					setTimeout('document.getElementById("calcontainer").style.visibility="visible";', 2000);
				} else {
					var isOptionTab=function(obj){ return obj.id=='taboptions' || (obj.className=='uc' && /^t_\d+/.test(obj.id)); };
					tabCalendarClose(/\/app\/minty\/contacts/.test(e.target) || isOptionTab(e.target) || isOptionTab(e.target.parentNode))
				}
			}
			tablist.addEventListener('click', function(e){ dsphCalendar(e); }, true);
			document.getElementById('searchfield').addEventListener('keydown', function(e){
				var keycode;
				if(window.event) keycode=window.event.keyCode;
				else if(e) keycode=e.which;
				if(keycode==13) tabCalendarClose();
			}, false); 
			document.getElementById('search').getElementsByTagName('span')[1].addEventListener('click', function(e){ tabCalendarClose(); }, true);
		}
	};
	contentEval(appCalendar());
}
if(/calendar.yahoo.com\//.test(location.href)){
	GM_addStyle('#hd{ display:none !important; } #nemoRows{ height:100% !important; }');
	GM_addStyle('#welcomeLink,#buttonImgIcon_calendarToolbarNew,#buttonImgIcon_print,#buttonImgIcon_evListMove,#buttonImgIcon_evListDelete,#buttonImgIcon_cancelNX,#buttonImgIcon_saveNX,#buttonImgIcon_delete,#buttonImgIcon_save,#buttonImgIcon_cancel{ display:none !important; } #bd{ border-top:1px solid #e0e0e0 !important; } body,#toolbar,#todoWidgetFolders ol li h4:hover,.leftPaneToggleTop,.leftPaneToggleInner{ background-color:#e0e0e0 !important; } #leftColumn{ background-color:#c0c0c0 !important; } #todoWidgetFolders ol li h4,#fisheyeViewContainer,.hoveringFish,.hoveringFish div{ background-color:#f0f0f0 !important; }');
	GM_addStyle('#todoWidget li.todo span.title{ white-space:pre-wrap; } .hoverContent{ max-width:16em !important; } .calHoverTitle{ font-size:12px !important; } .calHoverDetail{ font-size:10px !important; } #todoWidgetDoneList li.todo span{ white-space:nowrap !important }');
	var resize=function(tgt, dH){
		if(tgt){
			tgt.style.height=parseInt(tgt.style.height)+dH+'px';
			window.addEventListener('resize', function(){
				tgt.style.height=parseInt(tgt.style.height)+dH+'px';
			}, false);
			}
	};
	resize(document.getElementById('bd'),79);
	resize(document.getElementById('subBody'),75);
	resize(document.getElementById('evListViewResults'),80);
	resize(document.getElementById('multiDayViewBody'),80);
	resize(document.getElementById('yearViewBody'),80);
}
