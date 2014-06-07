// ==UserScript==
// @name        User
// @namespace    http://www.egov4you.info
// @description	User
// @include     http://www.egov4you.info/citizens/overview/*
// @version     0.1
// @updateURL	
// @downloadURL	
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
	var loc = $('#eWrapper ');
	
	var btn = document.createElement('button');
	btn.appendChild(document.createTextNode('Party Members'));
	
	btn.addEventListener('click', showMembers, true);
	
	loc.append('<br />');
	loc.append(btn);
	
}

function showMembers() {
	var list = [];
	$('.buttonLink').each(function(index) {
		
		var id = $(this).attr('href').replace(/http:\/\/www\.erepublik\.com\/[a-z]*\/main\/messages-compose\//, '');
		list.push([id]);
	});

	$('* :not(html)').remove();
	
	list.sort(sortFunction);
	
	var html = $('html');
	html.append('<p><b>Total de membros: ' + list.length + '</b></p>');
	html.append('<p>');
	for(var i = 0; i<list.length; i++) {
		html.append(list[i][0] + '<br/>');
	}
	html.append('</p>');
}

function sortFunction(a, b) {
	if(a[0]<b[0]) return -1;
    if(a[0]>b[0]) return 1;
    return 0;
}


GM_wait();