// ==UserScript==
// @name          Facebook poke war
// @namespace     http://www.facebook.com/
// @description   Never lose a poke war against your friends.
// @include       http*://*.facebook.tld/pokes*
// @require       http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

function pokeThemAll() {
  $('li[id^="poke_"] a[ajaxify][class!="uiCloseButton uiCloseButtonSmall"]').each(handlePoke);
  setTimeout(pokeThemAll, 1000);
}

function handlePoke(index, element) {
  if (element != null) {
    $(element).trigger('click');
  }
}

$(document).ready(pokeThemAll);
