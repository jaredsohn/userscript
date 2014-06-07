// ==UserScript==
// @name        Party Members Script
// @namespace   http://www.erepublik.com
// @description	Plugin para a limpeza da lista de membros dos partidos
// @include     http://www.erepublik.com/*/main/party-members/*
// @version     0.2
// @updateURL	http://userscripts.org/scripts/source/154523.meta.js
// @downloadURL	https://userscripts.org/scripts/source/154523.user.js
// ==/UserScript==

function GM_wait() {

	//jQuery is already defined by eRep, waits for it to load
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		$ = unsafeWindow.jQuery;
		
		if($('.biggersection') == null) {
			return;
		}
		
		addButton();
		
	}
}

function addButton() {
	var loc = $('#profileholder > h1');
	
	var btn = document.createElement('button');
	btn.appendChild(document.createTextNode('Listar todos os membros'));
	
	btn.addEventListener('click', showMembers, true);
	
	loc.append('<br />');
	loc.append(btn);
	
}

function showMembers() {
	var list = [];
	$('.nameholder').each(function(index) {
		var title = $(this).attr('title');
		var id = $(this).attr('href').replace(/http:\/\/www\.erepublik\.com\/[a-z]*\/citizen\/profile\//, '');
		list.push([title, id]);
	});

	$('* :not(html)').remove();
	
	list.sort(sortFunction);
	
	var html = $('html');
	html.append('<p><b>Total de membros: ' + list.length + '</b></p>');
	html.append('<p>');
	for(var i = 0; i<list.length; i++) {
		html.append(list[i][0] + ';' + list[i][1] + '<br/>');
	}
	html.append('</p>');
}

function sortFunction(a, b) {
	if(a[0]<b[0]) return -1;
    if(a[0]>b[0]) return 1;
    return 0;
}


GM_wait();