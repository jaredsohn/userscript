// ==UserScript==
// @name           YouTube MP4 Plug-in Player Replacement
// @description    Replaces the Flash YouTube player with your system's builtin MP4 player.
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @version        0.1alpha
// ==/UserScript==

// All the script is on one line to enable it to be taken out of the sandbox and run when the page loads to enable the script to access the swfArgs. Sorry for it being hard to read, but thats the only way I could get it to work so far.

 location.href = "javascript:(" + encodeURI(uneval(function () { var video_player = document.getElementById('watch-player-div'); if (video_player) { video_player.innerHTML = '<embed type="video/mp4" src="' + swfArgs['BASE_YT_URL'] + 'get_video?video_id=' + swfArgs['video_id'] + '&amp;t=' + swfArgs['t'] + '&amp;fmt=18" height="385" width="480" scale="aspect"></embed>';}})) + ")();";
