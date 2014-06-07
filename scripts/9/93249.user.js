// ==UserScript==
// @name           gogetlinks
// @namespace      *
// @include        http://gogetlinks.net/web_task.ph*
// ==/UserScript==

var site = 'http://mysite.ru/'

var left =    "<a href='" + site + "script.php?url=[Задание для]&mode=new' target=_blank alt='Наличие в системе'>" + 
			 "<img src='" + site + "redirector.php?id=[curr_id]&type=double' /></a>";


var right1 =  "<a href='" + site + "script.php?url=[Задание для]&mode=paid' target=_blank>" +
			 "<img src='" + site + "redirector.php?id=[curr_id]&type=ext' alt='Внешние ссылки' /></a>";

var right2 = "<img src='" + site + "redirector.php?id=[curr_id]&type=int' alt='Внутренние ссылки' />";


var rows = document.getElementById('content_table').rows;
var names = rows[1].cells;
for (more = 1; more < names.length; more++) {if (names[more].textContent == "\u00a0Описание\u00a0") break;}

for (var i = 2; i < rows.length - 3; i++)
	{
	var row = rows[i];
	var link = row.querySelector("td[class^='row'] > a");
	var taskfor = encodeURI(link.textContent);
	var curr_id = link.parentNode.className.substring(4);
	
	var description = row.cells[more];
	
	description.innerHTML =
	left.replace('[curr_id]', curr_id).replace('[Задание для]', taskfor) + ' ' +
	description.innerHTML + ' ' +
	right1.replace('[curr_id]', curr_id).replace('[Задание для]', taskfor) + ' ' +
	right2.replace('[curr_id]', curr_id);
	}