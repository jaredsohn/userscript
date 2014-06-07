// ==UserScript==
// @name           HWM_Clickable_Links
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/pl_info.php?id=*
// @include        http://www.heroeswm.ru/forum_messages.php?tid=*
// ==/UserScript==

var url_cur = location.href;

pl_info();
forum();

function pl_info() {
	if (url_cur.indexOf("pl_info.php") == -1) {return;}
	var td_arr = document.getElementsByTagName('td');
	td_arr[td_arr.length - 2].innerHTML = replaceAll(td_arr[td_arr.length - 2].innerHTML.split('<br>'));
}

function forum() {
	if (url_cur.indexOf("forum_messages.php") == -1) {return;}
	var td_arr = document.getElementsByTagName('td');
	for (var i = 0; i < td_arr.length; i++) {
		var td = td_arr[i];
		var attr = td.getAttribute('style');
		if (attr == "padding: 5px; color: rgb(0, 0, 0); font-size: 13px;") {
			td_arr[i].innerHTML = replaceAll(td_arr[i].innerHTML.split('<br>'));
		}
	}
}

function replaceAll(lines) {
	for (var i = 0; i < lines.length; i++) {
		var words = lines[i].split(' ');
		for (var j = 0; j < words.length; j++) {
			words[j] = replace(words[j]);
		}
		lines[i] = words.join(' ');
	}
	return lines.join('<br>');
}

function replace(a) {
	var b = (a.indexOf("color=") == 0);
	var i = a.indexOf("http://");
	if (i > 1 && !b) {return a;}
	if (i != -1) {
		return a.substring(0, i) + "<a href=\"" + a.substring(i) + "\">" + a.substring(i) + "</a>";
	}
	i = a.indexOf("https://");
	if (i > 1) {return a;}
	if (i != -1 && !b) {
		return a.substring(0, i) + "<a href=\"" + a.substring(i) + "\">" + a.substring(i) + "</a>";
	}	
	i = a.indexOf("ftp://");
	if (i > 1) {return a;}
	if (i != -1 && !b) {
		return a.substring(0, i) + "<a href=\"" + a.substring(i) + "\">" + a.substring(i) + "</a>";
	}		
	return a;
}