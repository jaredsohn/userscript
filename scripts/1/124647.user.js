// ==UserScript==
// @name           light.webmoney.ru "Логин и пароль" auth method _checked_
// @author         George L. Yermulnik
// @homepage       http://userscripts.org/scripts/show/124647
// @namespace      http://userscripts.org/
// @description    Выбирает по умолчанию метод авторизации "Логин и пароль" на странице входа на https://light.webmoney.ru/
// @include        http://light.webmoney.ru/login.aspx*
// @include        https://light.webmoney.ru/login.aspx*
// ==/UserScript==

//document.getElementById("radioCert").checked = false;
document.getElementById("radioSword").checked = true;

var focusTarget = document.getElementById("radioSword");
if (!focusTarget.disabled) focusTarget.focus();