// ==UserScript==
// @name        Bochka Confirm
// @namespace   http://promo.bochka.ru
// @author	santik
// @description Подтверждение возраста
// @include     http://www.bochkavpechatleniy.com/choice
// @include     http://promo.bochka.ru/choice
// @version     0.2
// ==/UserScript==
document.getElementById('s_day').value = 10;
document.getElementById('s_month').value = 7;
document.getElementById('s_year').value = 1980;
document.getElementById('choice_form').submit();