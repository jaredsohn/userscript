// 11x11 add statistic quick link
// version 0.3 BETA!
// 2009-04-24
// Copyright (c) 2009, Mihail Ivankov
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.

// ==UserScript==
// @name          11x11 Add "Match History" menu
// @version       0.3
// @namespace     Copyright (c) 2009, Mihail Ivankov, http://www.11x11.ru/?ref=669135. Спасибо Aleh Krutsikau за скрипт "11x11 Show player info", который натолкнул меня на написание дополнительных скриптов
// @description   Добавляет в меню ссылку для прямого доступа к статистике пользователя в футбольной игре 11x11
// @include       http://*11x11.ru/users/*
// @include       http://*11x11.fm/users/*
// @include       http://*11x11.sportbox.ru/users/*
// ==/UserScript==



// получаем общую таблицу с результатами
var matchesUserName = document.evaluate(
	"/html/body/center/table/tbody/tr[2]/td[2]/table[2]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td[2]/span/a",    
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


if (matchesUserName.snapshotItem(0).textContent) {
	var UserName;
	var reg = /\(([^\)]+)\)/i;				
	if (UserName = matchesUserName.snapshotItem(0).textContent.match(reg)) {
		UserName = UserName[1];
	}
	else {
		UserName = matchesUserName.snapshotItem(0).textContent;		
	}
	document.getElementsByTagName('h3')[1].innerHTML += '   |   <a href="/xml/games/history.php?step=1&type=games%2Fhistory&firstpage=%2Fxml%2Fgames%2Fhistory.php%3F&act=search&UserLogin='+UserName+'&newact=fullhistory&oldact=search">[Архив игр]</a>';
}