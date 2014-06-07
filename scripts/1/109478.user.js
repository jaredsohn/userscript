// ==UserScript==
// @name           SM_BlackList
// @namespace      fnx
// @include        http://forum.sibmama.ru/*
// @exclude        http://forum.sibmama.ru/showfull.php*
// @exclude        http://forum.sibmama.ru/posting.php*mode=smilies*
// @author         Fenex
// @version        0.5.2
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function getXmlHttp(){
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function checkMember(elem) {
	id = elem.parentNode.href.replace(/.+\&u=/, '');
	var black_ids = localStorage['SM_BL'].split(';');
	for(j=0;j<black_ids.length;j++) {
		if(black_ids[j].trim()==id) {
			insertExcl(elem);
			return;
		}
	}
	return;
}

function insertExcl(elem) {
	var e = document.createElement('a');
	e.setAttribute('href', 'http://forum.sibmama.ru/viewtopic.php?t=91760');
	e.setAttribute('target', '_blank');
	e.innerHTML = '<img style="height:18px;width:18px;margin:0px 3px 0px 3px;" src="http://www.uni-regensburg.de/images/pictograms/warnung.gif" />';
	elem.parentNode.parentNode.insertBefore(e, elem.parentNode);
	return;
}

function init_SM_BL() {
	var imgs = document.getElementsByClassName('forumline')[1].getElementsByTagName('img');
	if(!imgs) {
		alert('init failed');
		setTimeout('init_SM_BL();', 700);
		return;
	}
	for(i=0;i<imgs.length;i++) {
		if(imgs[i].getAttribute('alt')=='Посмотреть профиль') {
			checkMember(imgs[i]);
			i++;
		}
	}
}

function showUserInfo(name) {
	document.getElementById('SM_BL_img_ok').style.display = 'none';
	document.getElementById('SM_BL_img_loading').style.display = '';
	var e_result = document.getElementById('SM_BL_typetext_result');
	e_result.innerHTML = '';
	name = name.trim();
	var xmlhttp = getXmlHttp();
	xmlhttp.open('POST', '/memberlist.php?sname='+name+'&smode=1&search=1', true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				window.ttt = xmlhttp.responseText;
				var resp = xmlhttp.responseText;
				if(resp.indexOf('class="gen">'+name+'</a>')<0) {
					e_result.innerHTML = 'Пользователь <b>' + name + '</b> не найден.';
				} else {
					var id = (resp.substring(1+resp.lastIndexOf('>', resp.indexOf('class="gen">'+name+'</a>')), 4+resp.indexOf('</a>', resp.indexOf('class="gen">'+name+'</a>')))).replace(/.+u=/, '').replace(/[^\d]+/, '');
					e_result.innerHTML = '<span><b>ID:</b> <input type="text" value="'+id+'" /></span> <a href="http://forum.sibmama.ru/privmsg.php?mode=post&u='+id+'"><img src="http://forum.sibmama.ru/templates/subSilver/images/lang_russian/icon_pm.gif" /></a> <a href="http://forum.sibmama.ru/profile.php?mode=viewprofile&u='+id+'"><img src="http://forum.sibmama.ru/templates/subSilver/images/lang_russian/icon_profile.gif" /></a> <input type="button" style="float:right;" value="Добавить" onclick="addID2List(\''+id+'\')" />';
				}
				document.getElementById('SM_BL_img_loading').style.display = 'none';
				document.getElementById('SM_BL_img_ok').style.display = '';
			}
		}
	};
	xmlhttp.send(null);
}
function showStatusAdd(txt) {
	document.getElementById('SM_BL_status').innerHTML = txt;
	document.getElementById('SM_BL_status').style.display = '';
	setTimeout("document.getElementById('SM_BL_status').style.display = 'none';", 1700);
}
function addID2List(id) {
	var ids = document.getElementById('textLS').value.trim();
	var check = ids.split(';');
	for(i=0;i<check.length;i++) {
		if(check[i].trim()==id) {
			showStatusAdd('Уже есть в спистке...');
			return;
		}
	}
	if(ids.length==0||ids[ids.length]==';')
		ids += id;
	else
		ids += ';' + id;
	document.getElementById('textLS').value = ids;
	document.getElementById('SM_BL_set').style.display = '';
	showStatusAdd('Добавлен');
	
}

function Obj(a) {
	if((DragObj)&&(!a)) {		
		clearInterval(timeout_table);
		timeout_table = false;
		if(localStorage['tbl_MS_BL']=='1') {
			localStorage['SM_BL_Tab_Ypos'] = DragObj.style.left;
			localStorage['SM_BL_Tab_Xpos'] = DragObj.style.top;
		}
		DragObj = null;
		return;
	}
	if((!DragObj)&&(a)) {
	    DragObj = document.getElementById('tbl_MS_BL');
		//alert('timeout');
		timeout_table = setInterval('moveTbl()', 10);
		//alert(timeout_table);
		return;
    }
}

function moveTbl() {
	//alert('moveTbl');
	if(DragObj) {
		//alert('move_table_if: ok');
        DragObj.style.left = window.mouseX-(document.documentElement.scrollLeft || document.body.scrollLeft)-15+"px";
        DragObj.style.top = window.mouseY-(document.documentElement.scrollTop || document.body.scrollTop)-18+"px";
    }
}

function saveSettings_SM_BL() {
	ids = document.getElementById('textLS').value;
	if(/[^0-9\; ]/.test(ids)) {
		if(confirm('Обнаружены недопустимые ID. Всё равно сохранить?')) {
			if(confirm('Отбросить недопустимые ID?')) {
				var tmp = ids.split(';');
				var txt = '';
				for(i=0;i<tmp.length;i++) {
					if(tmp[i]&&!(/[^0-9]/.test(tmp[i].trim()))) {
						txt += tmp[i].trim() + ';';
					}
				}
				localStorage['SM_BL'] = txt;
				showStatusAdd('Недопустимые ID отброшены.');
				document.getElementById('textLS').value = localStorage['SM_BL'];
				return;
			} else {
				localStorage['SM_BL'] = ids;
				showStatusAdd('Сохранено.');
			}
		} else {
			return;
		}
	} else {
		while(/\;\;/.test(ids))
			ids = ids.replace(/;;/g, ';');
		localStorage['SM_BL'] = ids;
		document.getElementById('textLS').value = ids;
		showStatusAdd('Сохранено.');
	}
}
function changeVisible(elem) {
	elem.style.display = elem.style.display == 'none' ? '' : 'none';
}

function testLS() {
	if(!localStorage['SM_BL_Tab_Ypos']||(!localStorage['SM_BL_Tab_Xpos'])||(!localStorage['SM_BL'])||(!localStorage['pinned_SM_BL'])) {
		localStorage['SM_BL_Tab_Ypos'] = '20px';
		localStorage['SM_BL_Tab_Xpos'] = '20px';
		localStorage['SM_BL'] = '' ;
	}		
}
function setPinnedTable(mode) {
	if(mode) {
		document.getElementById('SM_pinned_1').style.display = '';
		document.getElementById('SM_pinned_0').style.display = 'none';
		document.getElementById('tbl_MS_BL').style.position = 'fixed';
		localStorage['pinned_SM_BL'] = '1';
	} else {
		document.getElementById('SM_pinned_0').style.display = '';
		document.getElementById('SM_pinned_1').style.display = 'none';
		localStorage['pinned_SM_BL'] = '0';
		document.getElementById('tbl_MS_BL').style.top = '20px';
		document.getElementById('tbl_MS_BL').style.left = '20px';
		document.getElementById('tbl_MS_BL').style.position = 'absolute';
	}	
}
function insertTable() {
	var tbl = document.createElement('table');
	tbl.setAttribute('class', 'forumline');
	var imgs_pin = new Array('', '');
	if(localStorage['pinned_SM_BL']=='1') {
		tbl.setAttribute('style', 'position:fixed;left:'+localStorage['SM_BL_Tab_Ypos']+';top:'+localStorage['SM_BL_Tab_Xpos']);
		imgs_pin[0] = 'display:none;';
	} else {
		tbl.setAttribute('style', 'position:absolute;top:20px;left:20px');
		imgs_pin[1] = 'display:none;';
	}
	tbl.id = 'tbl_MS_BL';
	tbl.innerHTML = '<tbody><tr><th><span class="tbl_move" onmousedown="Obj(true);" onmouseup="Obj(false);"></span>Список<img src="http://forum.sibmama.ru/templates/subSilver/images/icon_report.gif" id="SM_pinned_1" onclick="setPinnedTable(false)" style="'+imgs_pin[1]+'" /><img src="http://forum.sibmama.ru/templates/subSilver/images/icon_del_report.gif" id="SM_pinned_0" onclick="setPinnedTable(true)" style="'+imgs_pin[0]+'" /></th></tr><tr><td class="row1"><span class="gen"><div>Пользователь: <input type="text" id="SM_BL_typetext" /><input onclick="showUserInfo(document.getElementById(\'SM_BL_typetext\').value.trim());" type="button" value="Найти" /> <img id="SM_BL_img_loading" style="display:none;float:right"; src="http://klavogonki.ru/img/small_loading.gif" /><img id="SM_BL_img_ok" style="display:none;float:right"; src="http://klavogonki.ru/img/ok.gif" /></div><div><span id="SM_BL_typetext_result" style="height:23px;"></span></div><div><input type="button" onclick="changeVisible(document.getElementById(\'SM_BL_set\'));" value="Настройки" /><span style="float:right;" id="SM_BL_status"></span><div id="SM_BL_set" style="display:none;"><textarea id="textLS"></textarea><div><input type="button" value="Сохранить" onclick="saveSettings_SM_BL()"/> <input type="button" value="Вернуть" onclick="document.getElementById(\'textLS\').value = localStorage[\'SM_BL\']"/></div></div></div></span></td></tr></tbody>';
	document.body.appendChild(tbl);
	document.getElementById('textLS').value = localStorage['SM_BL'];
	var style = document.createElement('style');
	style.innerHTML = '#tbl_MS_BL{width:430px;}#tbl_MS_BL .tbl_move{cursor:move;float:left;width:20px;height:16px;background: transparent url(http://forum.sibmama.ru/templates/subSilver/images/icon_mini_watch.gif) no-repeat scroll 5px 3px;}#tbl_MS_BL th img{cursor:pointer;float:right;margin-right:3px;}#tbl_MS_BL textarea{width:100%;height:150px;overflow:auto;}';
	document.body.appendChild(style);
}

var s = document.createElement('script');
s.innerHTML = 'document.captureEvents(Event.MOUSEMOVE);var mouseX=0;var mouseY=0;function getMouseXY(a){mouseX=a.pageX;mouseY=a.pageY;if(mouseX<0){mouseX=0}if(mouseY<0){mouseY=0}return true};window.onmousemove=getMouseXY;\n';
s.innerHTML += 'var timeout_table = false;var DragObj = null;'+testLS+insertTable+setPinnedTable+showStatusAdd+saveSettings_SM_BL+addID2List+changeVisible+showUserInfo+moveTbl+Obj+getXmlHttp+checkMember+insertExcl+init_SM_BL+';testLS();insertTable();init_SM_BL();';
document.body.appendChild(s);