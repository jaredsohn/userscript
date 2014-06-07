// ==UserScript==
// @name        Online citizens
// @namespace   http://www.erepublik.com
// @description	Online citizens
// @include   http://www.erepublik.com/*/main/online-users/Ukraine/all/*
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
		
		if($('.pager') == null) {
			return;
		}
		for (var i = 1; i <= __pageCount; i++){
			$.ajax({ url: 'http://www.erepublik.com/en/main/online-users/Ukraine/all/' + i, 
				success: function(data) 
				{ 
					var $html = $(data);
					$html.find('.dotted').each(function(index) {
					
					var id = $(this).attr('href').replace(/http:\/\/www\.erepublik\.com\/[a-z]*\/citizen\/profile\//, '');
					__users.push([id]);
					__curr++;
					if(__curr == __pageCount)
							addButton();
					});

				} 
			});
		}
	}
}
var __users = [];
var __pageCount = 10;
var __curr = 1;
function addButton() {


	var loc = $('#content > h1');
	
	var btn = document.createElement('button');
	btn.appendChild(document.createTextNode('Online citizens'));
	
	btn.addEventListener('click', showMembers, true);
	
	loc.append('<br />');
	loc.append(btn);
	
}

function showMembers() {
	
	$('* :not(html)').remove();
	
	__users.sort(sortFunction);
	
	var html = $('html');
	html.append('<p><b>Total de membros: ' + __users.length + '</b></p>');
	html.append('<p>');
	for(var i = 0; i<__users.length; i++) {
		html.append(__users[i][0] +'<br/>');
	}
	html.append('</p>');
}

function sortFunction(a, b) {
	if(a[0]<b[0]) return -1;
    if(a[0]>b[0]) return 1;
    return 0;
}


GM_wait();