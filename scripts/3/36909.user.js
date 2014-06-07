// Copyright (c) 2008 Ma Chenlei <http://www.machenlei.com>
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/zh-CN/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// --------------------------------------------------------------------
// 2008.12.09, update since douban homepage is modified
// --------------------------------------------------------------------
// ==UserScript==
// @name           Douban Say on home page
// @namespace      http://www.machenlei.com
// @include        http://www.douban.com/
// @include        http://www.douban.com/?old=1
// @include        http://www.douban.com/contacts/*
// ==/UserScript==


if(window.location.href == 'http://www.douban.com/' || window.location.href == 'http://www.douban.com/?old=1'){
	function ___submit(){
		window.location = 'http://www.douban.com/contacts/?__say=' + encodeURI(document.getElementById('__say_value').value);
	}

	var __h2 = document.createElement('h2');
	__h2.innerHTML = '我说   · · · · · · ';
	var __div = document.createElement('div');
	__div.align = 'center';
	var __textarea = document.createElement('textarea');
	__textarea.style.width = '260px';
	__textarea.rows = 5;
	__textarea.id = '__say_value';
	var __submit = document.createElement('input');
	__submit.type = 'button';
	__submit.value = '我说';
	__submit.addEventListener('click', ___submit,true);
	__div.appendChild(__textarea);
	__div.appendChild(document.createElement('br'));
	__div.appendChild(__submit);

	document.getElementById('tabler').insertBefore(document.createElement('br'),document.getElementById('tabler').firstChild);
	document.getElementById('tabler').insertBefore(__div,document.getElementById('tabler').firstChild);
	document.getElementById('tabler').insertBefore(__h2,document.getElementById('tabler').firstChild);
}

else{ // Under http://www.douban.com/contacts/*
	var __strHref = window.location.href;
	if(__strHref.indexOf('__say=') == -1){
		return;
	}
	var __content = __strHref.substr(parseInt(__strHref.indexOf('say=') + 4));
	document.getElementsByTagName('textarea')[0].value = decodeURI(__content);
	for ( i in document.getElementsByTagName('form')){
		if(document.getElementsByTagName('form')[i].name == 'mbform'){
			document.getElementsByTagName('form')[i].submit();
		}
	}
}