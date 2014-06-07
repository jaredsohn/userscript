// ==UserScript==
// @name           Vkontakte Mail Improver
// @namespace      http://www.openjs.com/
// @include        http://vkontakte.ru/mail.php*
// @include        http://www.vkontakte.ru/mail.php*
// ==/UserScript==
(function() {
	GM_addStyle('.mailbox table tr.newRow {background-color: pink !important;}') //Выставить на непрочтенное сообщение свой цвет фона и текста
})();
