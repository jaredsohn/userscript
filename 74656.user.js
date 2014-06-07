// ==UserScript==
// @name            Room Owner Icon Revert
// @author          Unknown_Mystery
// @version         1.0.0
// @description     Reverts the room owner icon back to the old R.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://kongregate.com/accounts/Unknown_Mystery
// ==/UserScript==

setTimeout(function() {
window.location.assign("javascript:(function(){var t = document.createElement('span');t.update(\"<style>.user_row .room_owner_icon {background: transparent url(http://images1.wikia.nocookie.net/__cb20090502081838/kongregate/images/2/2c/Owner.gif) no-repeat  !important;line-height:12px !important;margin-top:3px;width:14px !important;}</style>\");$('gamepage_header').appendChild(t)})();void(0)");
}, 1250);

