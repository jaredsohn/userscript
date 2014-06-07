// ==UserScript==
// @name	Bochka Confirm
// @namespace
// @author	santik
// @description Подтверждение возраста
// @include	http://www.bochkavpechatleniy.com/choice
// @version	0.1
// ==/UserScript==
document.getElementById('s_language').value = 141;
document.getElementById('s_day').value = 10;
document.getElementById('s_month').value = 7;
document.getElementById('s_year').value = 1980;
document.getElementById('choice_form').submit();
