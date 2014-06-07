// ==UserScript==
// @name            Moderator Icon Revert
// @author          Unknown_Mystery
// @version         1.0.0
// @description     Reverts the moderator icon back to the old M.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://kongregate.com/accounts/Unknown_Mystery
// ==/UserScript==

setTimeout(function() {
window.location.assign("javascript:(function(){var t = document.createElement('span');t.update(\"<style>.user_row .mod_icon {background: transparent url(http://images3.wikia.nocookie.net/__cb20090207004010/kongregate/images/6/6c/Moderator_icon.gif) no-repeat  !important;line-height:12px !important;margin-top:3px;width:14px !important;}</style>\");$('gamepage_header').appendChild(t)})();void(0)");
}, 1250);