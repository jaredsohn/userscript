// ==UserScript==
// @name           GOLD
// @description    Button GOLD for bitefight.ru
// @version	   1.0
// @include        http://s*.ru.bitefight.gameforge.com/clan/*
// ==/UserScript==


(function() {
var strHTML = document.getElementsByTagName("html")[0].innerHTML;
var gold = strHTML.match(/золото\s+\:\s+([\d\.]+)/) [1].replace (/\./g, "");;

var Buttons = document.getElementsByTagName('th')[1];
if (!Buttons) return;
var form = document.createElement('form');
form.setAttribute("method", "post");
form.setAttribute("action", "/clan/donate");

form.innerHTML += 'Пожертвовать всё золото клану';
form.innerHTML += '<input type="text" name="donation" size="10" maxlength="10" value="'+gold+'"><img src="http://bitefight.ru/img/symbols/res2.gif" alt="" />';
form.innerHTML += '<div class="btn-left center"><div class="btn-right"><input class="btn" type="submit" name="donate" value="пожертвовать"></div></div>';

Buttons.appendChild(form);
})()