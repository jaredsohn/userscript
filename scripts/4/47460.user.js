// ==UserScript==
// @name           FullFieldView
// @namespace      monsterkill
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// ==/UserScript==

window.addEventListener('load', function() {
    unsafeWindow.positionFrame = function() { };
    document.getElementById('replay_container').style.height='1080px';
    document.getElementById('replay_area').style.top = '0px';
}, true);
