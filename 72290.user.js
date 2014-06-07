// ==UserScript==
// @name            Friend Icon Revert
// @author          skyboy
// @version         1.0.0
// @description     Reverts the friend icon back to the star.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/72290
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
window.location.assign("javascript:(function(){var t = document.createElement('span');t.update(\"<style>.user_row .friend_icon {background: transparent url(/images/presentation/yourrating.gif) no-repeat scroll 0px -12px !important;line-height:12px !important;margin-top:2px;width:14px !important;}</style>\");$('gamepage_header').appendChild(t)})();void(0)");
}, 1250);