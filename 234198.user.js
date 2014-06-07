// ==UserScript==
// @id             nicosoundFix
// @name           Nicosound Player Fixer
// @version        1.0
// @namespace      simon
// @author         Simon Chan
// @description    Fix the bug that cannot add playlist item when player page is open.
// @include        http://nicosound.anyap.info/sound/*
// @run-at         document-end
// ==/UserScript==

unsafeWindow.playStreaming = function (a) {
    var c = unsafeWindow.openPlayerWindow();
    unsafeWindow.wStreamingPlayer = c;
    if (c.document.readyState == "complete") {
        c.Playlist.insertRangeSound([a]);
        c.Playlist.playSound(a.fullMovieId);
    }
}