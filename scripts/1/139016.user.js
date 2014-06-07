// ==UserScript==
// @name	promobochka
// @namespace
// @author	mi
// @description Вход на promobochka
// @include	http://promo.bochka.ru/choice
// @version	0.1
// ==/UserScript==
document.getElementById('s_country').value = 150;
document.getElementById('s_language').value = 141;
document.getElementById('s_day').value = 25;
document.getElementById('s_month').value = 7;
document.getElementById('s_year').value = 1975;
document.getElementById('choice_form').submit();
