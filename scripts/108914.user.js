// ==UserScript==
// @name cian_mod
// @source          http://userscripts.org/scripts/show/108914
// @identifier      http://userscripts.org/scripts/source/108914.user.js
// @version         1.1.3
// @date            2011-08-02
// @author          OR
// @namespace       cian_mod
// @description     скрипт для модификации страничек cian.ru 
// @include         http://www.cian.ru/cat.php*
// @include         http://www.cian.ru/showcart.php
// ==/UserScript==

var is_chrome = false, chrome_version = false;
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	is_chrome = true;
	chrome_version = navigator.userAgent.replace(/^.*Chrome\/([\d\.]+).*$/i, '$1')
}

//Добавляет ссылку на предложение к каждоме предложению в списке 
function addHreff() {
	var table_catalog = document.getElementsByClassName('cat')[0];
	var array_rows = table_catalog.getElementsByTagName('tr');
	var count = array_rows.length;
	for(var i = 1; i<=count; i++) {
		//if (is_chrome) i = i - 1;
		var row = array_rows[i];
		if (!row['id']) continue;
		id = row['id'].substr(3);
		array_rows[i].getElementsByTagName('td')[1].innerHTML += '<br /><br /><a href="http://www.cian.ru/showphoto.php?id_flat='+id+'">'+id+'</a>';
	}
}

addHreff();