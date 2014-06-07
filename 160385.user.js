// ==UserScript==
// @name           UsertTansfersColor [GW]
// @namespace      гном убийца
// @description    Подсвечивает цветом протокол (v. 1.5.04.03.11.2058)
// @include        http://www.ganjawars.ru/usertransfers.php*
// ==/UserScript==

(function() {

//настройки

var color_1='color: #FF5757'; // цвет передач для игрока
var color_2='color: #6363FF'; // цвет передач от игрока
var color_3='color: #ABABFF'; // цвет передач от синда
var color_4='color: #FFB7B7'; // цвет передач на синд
var color_5='color: #A2A62E'; // цвет передач с объекта
var color_6='color: #16B501'; // цвет передач на объект

// конец настроек



var str_1 = ' для ';
var str_2 = ' от ';
var str_3 = ' со счета ';
var str_4 = ' на счет ';
var str_5 = ' на объект ';
var str_6 = ' с объекта ';
var str_7 = ' из объекта ';

 var nob = document.getElementsByTagName('nobr');
 var l = nob.length;
 
 for (var i = 0 ; i < l; i++) {
 var stroka = nob[i].innerHTML;
 
	if (stroka.indexOf(str_1) != -1) {
		
		nob[i].setAttribute('style', color_1);
	  	paintA(nob[i], color_1);
	  	continue;
	  	
	}else if (stroka.indexOf(str_2) != -1) {
		
		nob[i].setAttribute('style', color_2);
	  	paintA(nob[i], color_2);
	  	continue;
	  	
	}else if (stroka.indexOf(str_3) != -1) {
		
		nob[i].setAttribute('style', color_3);
	  	paintA(nob[i], color_3);
	  	continue;
	  	
	}else if (stroka.indexOf(str_4) != -1) {
		
		nob[i].setAttribute('style', color_4);
	  	paintA(nob[i], color_4);
	  	continue;
	  	
	}else if (stroka.indexOf(str_5) != -1) {
		
		nob[i].setAttribute('style', color_5);
	  	paintA(nob[i], color_5);
	  	continue;
	  	
	}else if (stroka.indexOf(str_6) != -1 || stroka.indexOf(str_7) != -1) {
		
		nob[i].setAttribute('style', color_6);
	  	paintA(nob[i], color_6);
	  	
	 }
}

function paintA(elem, color){
	var a = elem.getElementsByTagName('a');
	
	for(var i=0, len = a.length; i < len; i++){
		a[i].setAttribute('style', color);
		
	}
}


})();