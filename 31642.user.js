// ==UserScript==
// @name           SG helper
// @namespace      x
// @include        http://www.sg.hu/*
// ==/UserScript==

//default functions
function $(o)
{
	return document.getElementById(o);
}

function $cn(o)
{
	return document.getElementsByClassName(o);
}

function AddEvent(obj, evType, fn)
{
	if (obj.addEventListener) {
		obj.addEventListener(evType, fn, true);
		return true;
  	} else if (obj.attachEvent) {
		return  obj.attachEvent("on"+evType, fn);
	} else {
		return false;
	}
}

function GetModulCfg(name)
{
	var gm_value = GM_getValue(name);
	if ( gm_value != null) {
		if (gm_value.indexOf('¤') != -1) {
			return gm_value = gm_value.split('¤');
		} else {
			return new Array(gm_value);
		}
	} else {
		return false;
	}
}

function SetModulCfg(modulName, value)
{
	GM_setValue(modulName, value.join('¤')+'');
}

//main functions
var last_user;

function show_flamer_topic(event)
{
	$(event.target.id+'p').style.display = '';
	if ($(event.target.id+'f')) $(event.target.id+'f').style.display = '';
}

function show_user_flame_box(event)
{
	var obj = (event.target.tagName == 'A') ? event.target : event.target.parentNode;
	$('gmuserfloder').style.display = '';
	$('gmuserfloder').style.top = event.pageY+10;
	$('gmuserfloder').style.left = event.pageX;
	last_user = obj.search.substring(9);
	
}

function add_flamer_list(event)
{
	var flamers = GetModulCfg('FlamerKillerBeta');
	var duplicate_flamer = false;
	for(i=0;i<flamers.length;i++) {
		if (flamers[i] == last_user) duplicate_flamer = true;
	}
	if (duplicate_flamer) {
		alert('Felhasználó már a listádon van!');
	} else {
		flamers[flamers.length] = last_user;
		SetModulCfg('FlamerKillerBeta', flamers);
		alert('Felhasználó hozáadva a lisitához.\nVáltozások frissítés után lépnek életbe.');
	}
}
function del_flamer_list(event)
{
	var flamers = GetModulCfg('FlamerKillerBeta');
	alert(flamers)
	for(i=0;i<flamers.length;i++) {
		if (flamers[i] == last_user) flamers = flamers.splice(i+1,1)
	}
	alert(flamers)
	SetModulCfg('FlamerKillerBeta', flamers);
	alert('Felhasználó már nincs a listádon!\nVáltozások frissítés után lépnek életbe.');
}

document.body.innerHTML += '<div id="gmuserfloder" style="position: absolute;top:0px;left:0px;width:40px;height:25px;background:white;display:none;z-index:10;border:black 1px solid;font-weight:bold"><span style="cursor:pointer"id="gmuserfloder_p">+</span> / <span style="cursor:pointer" id="gmuserfloder_m">-</span></div>'
AddEvent($('gmuserfloder_p'), 'click', add_flamer_list);
AddEvent($('gmuserfloder_m'), 'click', del_flamer_list);

if (GetModulCfg('FlamerKillerBeta')) {
	var falmers = GetModulCfg('FlamerKillerBeta');
	topicheaders = $cn('topichead');
	var userids = ''
	var flamers = GetModulCfg('FlamerKillerBeta').join(',');
	for(i=0;i<topicheaders.length;i++) {
		AddEvent(topicheaders[i].childNodes[1].rows[0].cells[0].firstChild.rows[0].cells[0].lastChild, 'mouseover', show_user_flame_box);
		var userid = topicheaders[i].childNodes[1].rows[0].cells[0].firstChild.rows[0].cells[0].lastChild.search.substring(9);
		if (flamers.indexOf(userid) != -1) {
			topicheaders[i].nextSibling.nextSibling.firstChild.style.display = 'none';
			topicheaders[i].nextSibling.nextSibling.firstChild.id = 'gmid_'+i+'p';
			topicheaders[i].nextSibling.nextSibling.firstChild.nextSibling.nextSibling.style.display = 'none';
			topicheaders[i].nextSibling.nextSibling.firstChild.nextSibling.nextSibling.id = 'gmid_'+i+'f';
			topicheaders[i].nextSibling.nextSibling.innerHTML +='<div style="border-top:#aaaaaa solid 1px;cursor:pointer" id="gmid_'+i+'">Tiltott felhasználó üzenetének megjelenítéséhez kattints ide!</div>';
			AddEvent($('gmid_'+i), 'click', show_flamer_topic);
		}
	}
	topicheaders = $cn('hasab-head-o');
	for(i=0;i<topicheaders.length;i++) {
		if (topicheaders[i].firstChild.nodeName == 'A') {
			AddEvent(topicheaders[i].firstChild, 'mouseover', show_user_flame_box);
			var userid = topicheaders[i].firstChild.search.substring(9);
			if (flamers.indexOf(userid) != -1) {
				topicheaders[i].parentNode.nextSibling.nextSibling.style.display = 'none';
				topicheaders[i].parentNode.nextSibling.nextSibling.id = 'gmid_'+i+'p';
				topicheaders[i].parentNode.childNodes[4].innerHTML += ' | <span style="cursor:pointer" id="gmid_'+i+'">Üzenet megjelenítéséhez kattints ide!</span>';
				AddEvent($('gmid_'+i), 'click', show_flamer_topic);
			}
		}	
	}
} else {
	SetModulCfg('FlamerKillerBeta', new Array());
}
