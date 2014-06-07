// Blogger DayOfTheWeek user script
// version 0.2
// 2008-December-1
// Copyright (c) 2008, Guillermo Casado Ariza
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// Configuration, you don't need to change anything in the code unless
// your region date format is diferent from dd/mm/yy. In that case is
// very easy to set up, you must edit only one line by changing its value
// from 1 to the proper value according to the reference. Actually 
// it supports two date formats dd/mm/yy (value 1) and mm/dd/yy (value 2). 
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Blogger Day Of The Week", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Blogger Day Of The Week
// @namespace     http://www.ikaru.net
// @description   adds day of the week name to dates on the Blogger manage post list.
// @include       http://www.blogger.com/posts.g*
// @include       http://draft.blogger.com/posts.g*
// ==/UserScript==



//Configuration Line
//Here you chose your blogger date format. Choose the right value accordingly to your blogger regional preference.
//BloggerDateFormat = 1   // if dd/mm/yy (Default) 
//BloggerDateFormat = 2   // if mm/dd/yy

BloggerDateFormat = 1

//End Configuration Line


/*
DEVELOPMENT NOTES
-----------------
Only works for years after 2000.
As Javascript type Date handles years with 4 digits we must add two digits before the value we get from Blogger because it only gives the last 2 digits of the year. 

I found quite problematic that Months on JavaScript type Date goes from 0 to 11 rather from 1 to 12. 
It took me some time to realize that it was the problem with my code, that's why I have to substract 1 to the month value I get from Blogger.

Works with all language with date format dd/mm/yy and mm/dd/yy date format

This script works by using two elements from Blogger's manage post web page: 
<td class="date">
<body id="posting" onload="bulkActions.Init();" class="pop lang_es">

The first one identifies the date and the second one the language.


NOTAS DE DESARROLLO
-------------------
Sólo válido para años posteriores al 2000.
Como el tipo de Javascript Date admite fechas de 4 dígitos tenemos que añadir dos dígitos delante al valor que obtenemos de Blogger porque solo nos da las dos últimas cifras del año.

Encontré problemas con que los meses del tipo Date de JavaScript vayan del 0 al 11 en vez del 1 al 12.
Me llevó algo de tiempo darme cuenta que ese era el problema que tenía con el código, por eso he tenido que restar 1 al valor del mes obtenido de Blogger.

Funciona en todos los idiomas con formato de fecha dd/mm/yy y mm/dd/yy.

Este script funciona usando dos elementos de la página del gestor de entradas de Blogger: 
<td class="date">
<body id="posting" onload="bulkActions.Init();" class="pop lang_es">

El primero identifica la fecha y el segundo el idioma.
*/




//First: determine the language.
//For that we use the class value from the element body.
//
//Primero: determinar el idioma.
//Para ello usamos el valor de clase del elemento body. 


nodos = document.getElementsByTagName("body");

switch (nodos[0].className) {
case "pop lang_es": {DayOfTheWeek = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"]; break}
default: {DayOfTheWeek = ["Sun","Mon","Tue","Wed","Thr","Fri","Sat"]} //pop lang_en
	break
};

/*
Here is the list with all languages supported by Blogger, thou I only implemmented English and Spanish.
<option value="ar">Arabic — العربية
<option value="bn">Bengali 
<option value="bg">Bulgarian — български
<option value="ca">Catalan — Català
<option value="zh_CN">Chinese (Simplified) — 中文（简体）
<option value="zh_TW">Chinese (Traditional) — 中文 (繁體)
<option value="hr">Croatian — Hrvatski
<option value="cs">Czech — čeština
<option value="da">Danish — Dansk
<option value="nl">Dutch — Nederlands
<option value="en_GB" selected>English (UK)
<option value="en">English — English
<option value="fil">Filipino — Filipino
<option value="fi">Finnish — suomi
<option value="fr">French — Français
<option value="de">German — Deutsch
<option value="el">Greek — Ελληνικά
<option value="gu">Gujarati — ગુજરાતી
<option value="iw">Hebrew — עברית
<option value="hi">Hindi — हिन्दी
<option value="hu">Hungarian — magyar
<option value="in">Indonesian — Indonesia
<option value="it">Italian — Italiano
<option value="ja">Japanese — 日本語
<option value="kn">Kannada — ಕನ್ನಡ
<option value="ko">Korean — 한국어
<option value="lv">Latvian — Latviešu valoda
<option value="lt">Lithuanian — Lietuvių
<option value="ms">Malay — Bahasa Malaysia
<option value="ml">Malayalam — മലയാളം
<option value="mr">Marathi — मराठी
<option value="no">Norwegian — Norsk
<option value="or">Oriya
<option value="fa">Persian — پارسی
<option value="pl">Polish — polski
<option value="pt_BR">Portuguese (Brazil) — Português (Brasil)
<option value="pt_PT">Portuguese (Portugal) — Português (Portugal)
<option value="ro">Romanian — Română
<option value="ru">Russian — Русский
<option value="sr">Serbian — српски
<option value="sk">Slovak — Slovenčina
<option value="sl">Slovenian — Slovenščina
<option value="es">Spanish — Español
<option value="sv">Swedish — Svenska
<option value="ta">Tamil — தமிழ்
<option value="te">Telugu — తెలుగు
<option value="th">Thai — ไทย
<option value="tr">Turkish — Türkçe
<option value="uk">Ukrainian — Українська
<option value="vi">Vietnamese — Tiếng Việt
*/  



//Second: asign corresponding day of the week to the dates.
//
//Segundo: asignar el día correspondiente a cada fecha.


  nodos = document.getElementsByTagName("td");  


  for (var i = 0 ; i < nodos.length; i++) {
    if (nodos[i].className == "date") {
    texto = nodos[i].textContent  //This string, when is a date could be something like "aa/bb/cc" or "a/bb/cc" or "a/b/cc" or "aa/b/cc"
    							  //when is a time could be something like "aa:bb:cc" or "aa:bb:cc AM" or "aa:bb:cc PM" 
    							  //so we must pay attention to do a propper analysis on the string. 
    							  //They have different lenghts. Notice the diffent slashes positions on the string.
  
    if (texto.substr(-3) != ":00" && texto.substr(-2) != "AM" && texto.substr(-2) != "PM") {  //With this condition we avoid the hours
    	
    	if (BloggerDateFormat == 1){
		    ty = texto.substr(-2) 
		    tm = texto.substr(3,2) 
		    if (tm.substr(0,1) == "/"){ 
		    	tm = texto.substr(2,2)
		    	if (tm.substr(-1)=="/"){tm=texto.substr(2,1)}
				}
		    else
		    	{
		    		if (tm.substr(-1)=="/"){
			    		tm=texto.substr(2,2)
			    		if (tm.substr(0,1)=="/"){tm=texto.substr(3,1)}
		    		}
		    	}
		    td = texto.substr(0,2) 
		    if (td.substr(-1) == "/"){td=texto.substr(0,1)}
		    myDate = new Date("20"+ty, tm-1, td)
			nodos[i].textContent = DayOfTheWeek[myDate.getDay()] + "  " + nodos[i].textContent
		}
		else
		{
			ty = texto.substr(-2) 
		    td = texto.substr(3,2) 
		    if (td.substr(0,1) == "/"){ 
		    	td = texto.substr(2,2)
		    	if (td.substr(-1)=="/"){td=texto.substr(2,1)}
				}
		    else
		    	{
		    		if (td.substr(-1)=="/"){
			    		td=texto.substr(2,2)
			    		if (td.substr(0,1)=="/"){td=texto.substr(3,1)}
		    		}
		    	}
		    tm = texto.substr(0,2) 
		    if (tm.substr(-1) == "/"){tm=texto.substr(0,1)}
		    myDate = new Date("20"+ty, tm-1, td)
			nodos[i].textContent = DayOfTheWeek[myDate.getDay()] + "  " + nodos[i].textContent
		}
		
	    } 
    }
}

