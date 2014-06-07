// ==UserScript==
// @name           HWM_Gnome_War_No_Blink
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/*
// @exclude        http://www.heroeswm.ru/
// @exclude       http://www.heroeswm.ru/warlog.php*
// @exclude       http://www.heroeswm.ru/war.php*
// @exclude       http://www.heroeswm.ru/brd.php
// @exclude       http://www.heroeswm.ru/rightcol.php
// @exclude       http://www.heroeswm.ru/ch_box.php
// @exclude       http://www.heroeswm.ru/chatonline.php*
// @exclude       http://www.heroeswm.ru/chat_line.php*
// @exclude       http://www.heroeswm.ru/chatpost.php*
// @exclude       http://www.heroeswm.ru/chat.php*
// @exclude       http://www.heroeswm.ru/ticker.php*
// @exclude       http://www.heroeswm.ru/cgame.php*
// ==/UserScript==

var a_arr = document.getElementsByTagName('a');
var url_cur = location.href;

for (var i = 0; i < a_arr.length; i++) {
	if (a_arr[i].href.indexOf('gnome_war.php') != -1) {
			clearA(a_arr[i]);
			if (url_cur.indexOf('bselect.php') == -1) {
				return;
			}
	}
}

function clearA(a){
//	if (a.childNodes[0]) {													//
//		a.childNodes[0].innerHTML = clearText(a.childNodes[0].innerHTML); 	//Раскомментировать, чтобы сделать надпись не жирной
//	}																		//
	if (a.childNodes[0] && a.childNodes[0].childNodes[0]) {												//
		a.childNodes[0].childNodes[0].innerHTML = clearText(a.childNodes[0].childNodes[0].innerHTML); 	// А это закомментировать
	}																									//
	if (a.childNodes[0]) {
		a.childNodes[0].color = ""; 	//Сделать цвет, как у остальных надписей
		//a.childNodes[0].color = "#444444"; //Сделать цвет требуемым
	}
}


function clearText(s){
    var i;
    while ((i = s.indexOf('<')) != -1) {
        s = s.substring(0, i) + s.substring(s.indexOf('>') + 1);
    }
    return s;
}