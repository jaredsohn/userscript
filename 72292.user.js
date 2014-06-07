// ==UserScript==
// @name            Muted and Away Colour Fix
// @author          skyboy
// @version         1.0.0
// @description     Fixes users who are both muted and AFK from appearing as though they are silenced.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/72292
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
window.location.assign("javascript:$(\"gamepage_header\").innerHTML+=\"<style>#kong_game_ui .user_row.away.muted .username{color:#844 !important}</style>\";void(0);");
}, 1250);