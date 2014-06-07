// ==UserScript==
// @name           Автоматический переход по внешним ссылкам ВКонтакте
// @namespace      http://userscripts.org/scripts/show/26237
// @description    избавляет от необходимости нажимать на внешние ссылки по два раза :)
// @include        http://vkontakte.ru/away.php*
// ==/UserScript==

if( location.href.match(/^http:\/\/vkontakte\.ru\/away\.php/) ) { // чтобы не было проблем в Опере
document.location.href = unescape(document.location.href.substr(32));
}