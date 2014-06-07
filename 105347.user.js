// ==UserScript==
// @name           vk-direct-link
// @namespace      http://userscripts.org/users/simplesmiler
// @description    Прямые ссылки
// @include        http://vkontakte.ru/away.php*
// @include        http://vk.com/away.php*
// @match          http://vkontakte.ru/away.php*
// @match          http://vk.com/away.php*
// @version			   0.1.1
// ==/UserScript==

// Основано на http://userscripts.org/scripts/review/26237
// и http://userscripts.org/scripts/review/50283

var reallink = location.href.split('away.php?to=')[1];
if (reallink) {
  reallink = reallink.split('&h=')[0];
  location.href = unescape(reallink);
}
