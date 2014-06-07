// ==UserScript==
// @name          Alliance MSG MarkIt
// @description   Marking important msgs for alliance msgs edit by fleske for ikariam.rs
// @include       http://*.*.ikariam.*/*
// @include 	http://s1.ikariam.rs/*
// ==/UserScript==

function jsGet(type)
{
	if(location.href.match(type))
	{
		return location.href.split(type+'=')[1].split('&')[0];
	}
}

	var msgs = document.getElementsByClassName('entry');
	var msgIds = [];
	for (var i = 0; i < msgs.length; i++) {
		id = msgs[i].id;
		msgIds[i] = id.replace('message','');
	}

	for (var i = 0; i < msgIds.length; i++) {
		if(document.getElementById('tbl_mail'+msgIds[i]).getElementsByTagName('div')[0].innerHTML.substr(0,3)=='imp')
		{
			document.getElementById('message'+msgIds[i]).style.backgroundColor = '#F39E9E';
		}
		else if(document.getElementById('tbl_mail'+msgIds[i]).getElementsByTagName('div')[0].innerHTML.substr(0,3)!='imp'&&document.getElementById('message'+msgIds[i]).childNodes[7].innerHTML.substr(16,5)=='Savez')
		{
			document.getElementById('message'+msgIds[i]).style.backgroundColor = '#AEDBE8';
		}
		else if(document.getElementById('tbl_mail'+msgIds[i]).getElementsByTagName('div')[0].innerHTML.substr(0,3)!='imp'&&document.getElementById('message'+msgIds[i]).childNodes[7].innerHTML.search('sporazum')!=-1)
		{
			document.getElementById('message'+msgIds[i]).style.backgroundColor = '#94A2D7';
		}
		else
		{
			document.getElementById('message'+msgIds[i]).style.backgroundColor = '#AFE8AE';
		}
	}

if(jsGet('view')=='sendIKMessage')
{
	var nodes = document.getElementsByClassName('maillabels');
	nodes[nodes.length-1].innerHTML = '<select onChange="var select = document.getElementById(\'imp_lvls\');var option = select.options[select.selectedIndex].value;var txt = document.getElementById(\'text\');if(option==\'imp\'){if(txt.value.substr(0,3)!=\'imp\'){txt.value = option +\' \'+ txt.value;}else{txt.value = txt.value.substr(4);}}else{if(txt.value.substr(0,3)==\'imp\'){txt.value = txt.value.substr(4);}}" id="imp_lvls"><option value="nop">Poruka<\/option><option value="imp">Vazhna poruka<\/option><\/select>';
}