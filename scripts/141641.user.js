// ==UserScript==
// @name			HWM_Personal_War_stat
// @author  	HAPblB
// @homepage 	http://userscripts.org/scripts/show/141641
// @namespace		heroeswm.ru/home.php*
// @include		http://www.heroeswm.ru/home.php
// @version		0.0.2
// ==/UserScript==

var version = '0.0.2';

var script_num = 140994;
var script_name = 'HWM_Personal_War_stat';
var string_upd = /141641=(\d+\.\d+\.\d+)/;

var tdd=document.getElementsByTagName('td');

for(var i=0; i < tdd.length; i++)
{
	if(tdd[i].innerHTML=='<b>\u0412\u0430\u0448 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436</b>')
	{
		var hero_space=tdd[i].parentNode.parentNode.childNodes[2].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0];

		var tmp_string=hero_space.innerHTML.split('&nbsp;\u00BB&nbsp;');
			
		var pattern=/(\d*)\+(\d*)\s(.*)(:\s)(\d*)(\/)(\d*)(<.*)/
		pattern.exec(tmp_string[2]);

		var result = '<b>\u041e\u0447\u043a\u0438 \u0437\u0430 \u0418\u043c\u043f\u0435\u0440\u0438\u044e: '+RegExp.$1 + '+' + RegExp.$2 + '</b><br>' +

'&nbsp;\u00BB&nbsp;<b>\u0411\u043E\u043D\u0443\u0441/\u041E\u0447\u043A\u0438: '+(Math.floor((RegExp.$2/RegExp.$1)*10000)/100)+'%</b><br>' +

'<br>' + 

'&nbsp;\u00BB&nbsp;<b>\u0411\u043e\u0438: ' + RegExp.$5 + '/' + RegExp.$7 + '</b><br>' +

'&nbsp;\u00BB&nbsp;<b>\u041F\u0440\u043E\u0446\u0435\u043D\u0442 \u043F\u043E\u0431\u0435\u0434: '+(Math.floor((RegExp.$5/RegExp.$7)*10000)/100)+'%</b><br>' + 

'<br>' 
		
		hero_space.innerHTML=hero_space.innerHTML.replace(tmp_string[2],result);
		
		break;
	}
}