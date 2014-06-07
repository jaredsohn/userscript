// ==UserScript==
// @id             stPe
// @name           SongTaste Player Enhancement
// @version        1.0
// @namespace      Jixun.Org
// @author         Jixun66
// @description    Arrow and Enter Key as shortcut key.
// @include        http://www.songtaste.com/playmusic.php?song_id=*
// @include        http://songtaste.com/playmusic.php?song_id=*
// @run-at         document-end
// ==/UserScript==

try { document.addEventListener('keydown', function (e) {
    	var key = e.which || e.keyCode,
    	    p = unsafeWindow.pu;
        
        if (key == 37) p.doPlayNext(-1); // <- 37, previous song.
        if (key == 13) p.doPlayNext( 0); // Enter 13, reload song.
        if (key == 39) p.doPlayNext( 1); // -> 39, next song.
    }, false);
} catch (e) { /* ERROR!! */ }