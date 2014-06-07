// ==UserScript==
// @name           KlavoEvents
// @namespace      fnx
// @include        http://klavogonki.ru*
// @author         Fenex, DIgorevich
// @version        2.2
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
var str_ver = "var KEobj = new Object();KEobj.ver = '2.2';KEobj.mode = 'user';\n";
var elem = document.getElementById('head').getElementsByClassName('menu')[0];
var createElem = document.createElement('a');
createElem.setAttribute('href', 'javascript:changeViewerEvents();');
createElem.innerHTML = 'События';
createElem.id = 'klavo_events';

var pos = elem.getElementsByTagName('a').length;
elem.insertBefore(createElem, elem.getElementsByTagName('a')[pos]);

var e_cnt = document.createElement('div');
e_cnt.id = 'content_0';
e_cnt.setAttribute('style', 'display:none;');
document.getElementById('content').parentNode.insertBefore(e_cnt, document.getElementById('content'));

var ev_load = document.createElement('div');
ev_load.id = 'event_load';
ev_load.style.display = 'none';
ev_load.innerHTML = '<div class="r tl"><div class="tr"><div class="bl"><div class="br"><div class="rc">	<div class="event_load-content">Загрузка событий...</div></div></div></div></div>';
document.getElementById('content').parentNode.insertBefore(ev_load, document.getElementById('content'));

function showFirstPost(id_mess, _scroll1) {
	arr_scroll[id_mess] = _scroll1;
	if($('evtd_'+id_mess).innerHTML=='') {
		$('imgEventLoading_'+id_mess).show();
		new Ajax.Request($('link_'+id_mess).href, {
			method: 'get',
			onSuccess: function(transport)
			{
				$('imgEventLoading_'+id_mess).hide();
				var txt = transport.responseText;
				var txt_search = txt.toLowerCase();
				txt_search = txt_search.replace(/\'/g, "\"");
				var start_i = txt_search.indexOf('<tr class="posth ">');
				var end_i = txt_search.indexOf('<div class=post-opts');
				if(start_i>end_i)
					return;
				$('evtd_'+id_mess).innerHTML = txt.substring(start_i, end_i)+'</td></tr><tr><td><center><span class="showhide" onclick="hideFirstPost('+id_mess+',document.documentElement.scrollTop || document.body.scrollTop)">Скрыть</span></center></td></tr>';
				var elements = $('evtd_'+id_mess).getElementsByClassName('hidecont');
				for(i=0;i<elements.length;i++)
					elements[i].show();
				elements = $('evtd_'+id_mess).getElementsByClassName('post-opts');
				for(i=0;i<elements.length;i++)
					elements[i].hide();
				$('evtd_'+id_mess).getElementsByClassName('post-container')[0].getElementsByClassName('title')[0].getElementsByTagName('a')[1].hide();
				$('evtd_'+id_mess).getElementsByClassName('post-container')[0].getElementsByClassName('title')[0].getElementsByTagName('span')[0].hide();
				if($('evtd_'+id_mess).getElementsByClassName('post-container')[0].getElementsByClassName('text')[0].getElementsByClassName('modified')>0)
					$('evtd_'+id_mess).getElementsByClassName('post-container')[0].getElementsByClassName('text')[0].getElementsByClassName('modified')[0].hide();
			}});
	}
	$("href_func_show_"+id_mess).innerHTML = '';
	$('evtd_'+id_mess).show();
	$('href_func_hide_'+id_mess).show();
}

function hideFirstPost(id_mess) {
	$('href_func_show_'+id_mess).innerHTML = 'Показать';
	$('evtd_'+id_mess).hide();
	$('href_func_hide_'+id_mess).hide();
	if(document.documentElement.scrollTop)
		document.documentElement.scrollTop = arr_scroll[id_mess];
	if(document.body.scrollTop)
		document.body.scrollTop = arr_scroll[id_mess];
}

function changeViewerEvents() {
	if($('content_0').style.display=='none')
		showEventsInfo();
	else {
		$('content_0').hide();
		$('content_0').innerHTML = '';
		$('content').show();
		if(active_menu)
			active_menu.setAttribute('class', 'active');
		$('klavo_events').removeAttribute('class');
	}
}
function showEventsInfo() {
	active_menu = $('klavo_events').parentNode.getElementsByClassName('active')[0];
	if(active_menu)
		active_menu.removeAttribute('class');
	$('klavo_events').setAttribute('class', 'active');
	$('content').hide();
	$('content_0').show();
	$('event_load').show();
	
	microAjax('http://net.lib54.ru/KTS/KE/', {}, function(transport) {
		function checkVerKE(ver) {
			var s = ver.split('.');
			var u = KEobj.ver.split('.');
			for(var i=0;i<3;i++) {
				if((parseInt(u[i]))<(parseInt(s[i])))
					return true;
				else if((parseInt(u[i]))>(parseInt(s[i])))
					return false;
			}
			return false;
		}
		function go_next_system(data) {
			if(!data) {return;}
			var ver = data.version;
			if(!checkVerKE(ver))
				$('script_ver').innerHTML = '<span title="' + KEobj.ver + '">Установлена последняя версия скрипта ('+KEobj.ver+') <img src="/img/ok.gif" /></span>';
			else
				$('script_ver').innerHTML = '<span style="color:brown;">Доступно обновление: ' + KEobj.ver + " -> " + ver + ". <a href='http://userscripts.org/scripts/source/101238.user.js'>Установить</a> <img src='/img/bug.png' /></span>";
		}
		function createTr(event, i) {				
			var tr = '<tr>';
			var ev_bgcolor = event.bgcolor ? 'style="background:#' + event.bgcolor + ';"' : '';
			tr += '<tr onmouseout="$(\'href_func_show_'+i+'\').hide();" onmouseover="$(\'href_func_show_'+i+'\').show();" class="item " '+ev_bgcolor+'><td class="titlenote"><span class="topic-note">'+i+'</span></td><td class="tddate">['+event.date+']</td><td class="title">';
			var avatar = ' style="padding-left: 20px;"';
			tr += '<a' + avatar + ' id="link_'+i+'" href=http://klavogonki.ru/forum/events/'+event.href+'><noindex>'+event.name + '</noindex></a> <a href="/forum/events/'+event.post+'"><img src="/img/bullet_go.gif" /></a></td><td class="rightcol"><span class="showhide" style="display:none;" id="href_func_show_'+i+'" onclick="showFirstPost('+i+',document.documentElement.scrollTop || document.body.scrollTop)">Показать</span><span class="showhide" style="display:none;" id="href_func_hide_'+i+'" onclick="hideFirstPost('+i+')">Скрыть</span> <img style="display:none;" id="imgEventLoading_'+i+'" src="/img/small_loading.gif" /></td></tr><tr class="noitem"><td colspan="4" id="evtd_'+i+'" style="display:none;"></td></tr>';
			tr+= '</tr>';
			
			return tr;
		}
		
		var data = JSON.parse(transport);
		var events = data.events;
		var table = '<h4>Лента событий</h4><div id="scriptKE_message" style="display:none;"></div><table class="list"><tr style="color:#888888;" class="header"><td>№</td><td>Дата</td><td style="padding-left: 20px;">Название</td><td style="text-align:right;" id="script_ver"></td></tr>';
		for(var i=0; i<events.length; i++) {
			table += createTr(events[i], i+1);
		}
		table += '</table>';
		$('content_0').innerHTML = table;
		go_next_system(data.system);
		$('event_load').hide();
	});
}



function microAjax(url, params, callbackFunction) {
	this.bindFunction = function (caller, object) {
		return function() {
			return caller.apply(object, [object]);
		};
	};

	this.stateChange = function (object) {
		if (this.request.readyState==4)
			this.callbackFunction(this.request.responseText);
	};

	this.getRequest = function() {
		if (window.ActiveXObject)
			return new ActiveXObject('Microsoft.XMLHTTP');
		else if (window.XMLHttpRequest)
			return new XMLHttpRequest();
		return false;
	};

	this.params2Str = function(params) {
		if(!params)
			return;
			
		if(params.method=='POST') {
			this.method = 'POST';
		}

		var output = '';
		
		for(var name in params) {
			if(name=='method')
				continue;
			output += name + '=' + encodeURIComponent(params[name]) + '&';
		}
		
		return output;
	};
	
	this.method = 'GET';
	this.param_obj = params;
	this.params = this.params2Str(params);
	this.callbackFunction = callbackFunction;
	this.url = url;
	this.request = this.getRequest();
	
	if(this.request) {
		var req = this.request;
		req.onreadystatechange = this.bindFunction(this.stateChange, this);

		if (this.method == "POST") {
			req.open("POST", this.url, true);
			req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			//req.setRequestHeader('Connection', 'close');
			req.send(this.params);
		} else {
			req.open("GET", this.url + '?' + this.params, true);
			req.send(null);
		}
	}
}

var s = document.createElement('script');
s.innerHTML = "var arr_scroll = new Array();"+microAjax+str_ver+showEventsInfo+changeViewerEvents+showFirstPost+hideFirstPost;
document.body.appendChild(s);

var s = document.createElement('style');
s.innerHTML = "#event_load{background:#eee url('http://klavogonki.ru/img/gray_back.gif') no-repeat 0 0;width:300px;}#event_load .rc{padding:20px;}#event_load .event_load-content{font-size:20px;color:#dd6600;background:transparent url('http://klavogonki.ru/img/loading.gif') no-repeat left;padding:20px 60px;}";
s.innerHTML += "#content_0 .list .noitem{background:#FAF9F2;} #content_0 .list .noitem td{border-top: 1px solid #DDDDDD;border-bottom: 1px solid #DDDDDD;padding: 6px 6px;} #content_0 .list{border-collapse: collapse;width:100%;}#content_0 .list .item td{border-bottom: 1px solid #DDDDDD;border-top: 1px solid #DDDDDD;white-space: nowrap;padding: 6px 6px;}#content_0 .list .item td.tddate{color:#888888;width:1pt;}#content_0 .list .item td.topic-note{width:1%;}#content_0 .list .item td.titlenote{width:1pt;}#content_0 .list .item td.rightcol{text-align:left;}#content_0 .list .item td.title{width:1pt;}#content_0 span.showhide{cursor:pointer;color:#888888;}";
document.body.appendChild(s);
