// ==UserScript==
// @name          Alliance MSG MarkIt
// @namespace     Alliance MSG MarkIt
// @author        Ominous
// @description   Marking important msgs for alliance msgs 
// @version       0.3.1.2
// @include       http://*.ikariam.*/*
// ==/UserScript==

function jsGet(searchStr)
{
	var searchStr;
	var start = location.search.indexOf(searchStr)+searchStr.length+1;
	var end = (location.search.indexOf('&', start) == -1)? location.search.length : location.search.indexOf('&', start);
	return unescape(location.search.substring(start, end));
}
unsafeWindow.impMsg = function(checkbox)
{
	var txt = document.getElementById('text');
	if(txt.value.substr(0,3)!='imp')
	{
		txt.value = 'imp '+ txt.value;
	}
	else
	{
		txt.value = txt.value.substr(4);
	}
}
if(jsGet('view')=='sendIKMessage')
{
	var mailSubject = document.getElementById('mailSubject');
	var obj = document.createElement('span');
	obj.innerHTML = '<b>Important:</b> <input type="checkbox" id="importantMsg" onClick="impMsg(this);" />';
	mailSubject.appendChild(obj);
}
if(jsGet('view')=='diplomacyAdvisor'||document.getElementsByClassName('entry')[0].id.substr(0,7)=='message')
{
	var msgs = document.getElementsByClassName('entry');
	var msgIds = [];
	for (var i = 0; i < msgs.length; i++) {
		id = msgs[i].id;
		msgIds[i] = id.replace('message','');
	}

	for (var i = 0; i < msgIds.length; i++) {
		var header = document.getElementById('message'+msgIds[i]);
		var title = header.childNodes[7].innerHTML;
		var msg = document.getElementById('tbl_mail'+msgIds[i]).getElementsByTagName('div')[0];
		if(msg.innerHTML.substr(0,3)=='imp') { var isImp = true; } else { var isImp = false; }
		if(isImp) { header.style.backgroundColor = '#F39E9E'; msg.innerHTML = msg.innerHTML.substr(4,msg.innerHTML.length); }
		else if(!isImp && title.search('Savez')!=-1) { header.style.backgroundColor = '#AEDBE8'; }
		else if(!isImp && title.search('sporazum')!=-1) { header.style.backgroundColor = '#94A2D7'; }
		else { header.style.backgroundColor = '#AFE8AE'; }
	}
}
if(jsGet('view')=='diplomacyAdvisorOutBox')
{
	var inputs = document.getElementById('deleteMessages').getElementsByTagName('input');
	for  (var i in inputs)
	{
		if(inputs[i].type == 'checkbox')
		{
			var id = inputs[i].getAttribute('name').replace('deleteId[','').replace(']','');
			var header = inputs[i].parentNode.parentNode;        
			var title = header.childNodes[7].innerHTML;
			var msg = document.getElementById('tbl_mail'+id).getElementsByTagName('div')[0];
			if (msg.innerHTML.substr(0,3)=='imp') { var isImp = true; msg.innerHTML = msg.innerHTML.substr(4,msg.innerHTML.length); } else { var isImp = false; }
			if(isImp) { header.style.backgroundColor = '#F39E9E'; }
			else if(title.search('Savez')!=-1) { header.style.backgroundColor = '#AEDBE8'; }
			else if(title.search('sporazum')!=-1) { header.style.backgroundColor = '#94A2D7'; }
			else { header.style.backgroundColor = '#AFE8AE'; }
		}
	}
}