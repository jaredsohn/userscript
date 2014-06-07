// ==UserScript==
// @name	Bochka
// @namespace
// @author	makilik
// @description Вход на ЗОБО
// @include	http://www.bochkavpechatleniy.com/choice
// @version	0.3
// ==/UserScript==
document.getElementById('s_country').value = 150;
document.getElementById('s_language').value = 141;
document.getElementById('s_day').value = 10;
document.getElementById('s_month').value = 7;
document.getElementById('s_year').value = 1980;
document.getElementById('choice_form').submit();
