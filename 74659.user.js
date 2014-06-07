// ==UserScript==
// @name            Staff Icon Revert
// @author          Unknown_Mystery
// @version         1.0.1
// @description     Reverts the admin icon back to the old K.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://kongregate.com/accounts/Unknown_Mystery
// ==/UserScript==

setTimeout(function() {
window.location.assign("javascript:(function(){var t = document.createElement('span');t.update(\"<style>.user_row .admin_icon {background: transparent url(http://i44.tinypic.com/ykxnp.png) no-repeat  !important;line-height:12px !important;margin-top:3px;width:14px !important;}</style>\");$('gamepage_header').appendChild(t)})();void(0)");
}, 1250);

