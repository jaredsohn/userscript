// ==UserScript==
// @name           Vkontakte Calculate Age
// @namespace      http://polkila.googlecode.com
// @author:        Васютинский Олег http://vasyutinskiy.ru
// @version:       9.05
// @include        http://vkontakte.ru/id*
// @include        http://vkontakte.ru/profile.php?id=*
// @include        http://*.vkontakte.ru/id*
// @include        http://*.vkontakte.ru/profile.php?id=*
// ==/UserScript==
/*
Installation: 
	1) Firefox: run with installed and enabled plugin Greasemonkey.
	(If it's not installed, You can get https://addons.mozilla.org/en-US/firefox/addon/748)
	Drag'n'drop userscript onto Firefox window.
	2) Opera: copy to userscripts folder.
*/
(function() {
	var t = document.getElementById('rightColumn').childNodes[3];
	var byear = /c[\[%5B]{1,3}byear[\]%5D]{1,3}=([0-9]{4})/.exec(t.innerHTML);
	if (!byear) return;
	var bdate = /c[\[%5B]{1,3}bday[\]%5D]{1,3}=([0-9]{1,2})[&amp;]{1,5}c[\[%5B]{1,3}bmonth[\]%5D]{1,3}=([0-9]{1,2})/.exec(t.innerHTML);
	var lang = parseInt(readCookie('remixlang')), _sign_ = '', now = new Date();
	var age = now.getFullYear() - byear[1];
	if (bdate && bdate[2]>now.getMonth()+1) age--;
	else if (bdate && bdate[2]==now.getMonth()+1 && bdate[1]>now.getDate()) age--;

	if (lang) _years_ = 'years old';
	else{
		last = age.toString().substr(1);
		if (last==1) _years_ = '&#1075;&#1086;&#1076;';
		if (last>1 && last<5) _years_ = '&#1075;&#1086;&#1076;&#1072;';
		if (last>4 || last==0) _years_ = '&#1083;&#1077;&#1090;';
		if (age>4 && age<21) _years_ = '&#1083;&#1077;&#1090;';
	}

	if (bdate){
		if (lang) var signs = new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius');
		else var signs = new Array('&#1050;&#1086;&#1079;&#1077;&#1088;&#1086;&#1075;','&#1042;&#1086;&#1076;&#1086;&#1083;&#1077;&#1081;','&#1056;&#1099;&#1073;&#1099;','&#1054;&#1074;&#1077;&#1085;','&#1058;&#1077;&#1083;&#1077;&#1094;','&#1041;&#1083;&#1080;&#1079;&#1085;&#1077;&#1094;&#1099;','&#1056;&#1072;&#1082;','&#1051;&#1077;&#1074;','&#1044;&#1077;&#1074;&#1072;','&#1042;&#1077;&#1089;&#1099;','&#1057;&#1082;&#1086;&#1088;&#1087;&#1080;&#1086;&#1085;','&#1057;&#1090;&#1088;&#1077;&#1083;&#1077;&#1094;');
		var lastD = new Array(19,18,20,19,20,21,22,22,22,22,21,21);
		var signN = bdate[2]-1;
		if (bdate[1]>lastD[signN]) signN = (signN+1) % 12;
		_sign_ = ', ' + signs[signN];
	}
	
	t.innerHTML = t.innerHTML.replace(/([0-9]{4})<\/a>/i,'$1</a> ('+age+' '+_years_+''+_sign_+')');
})();

function readCookie(name){
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (i=0; i<ca.length; i++){
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ)==0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
