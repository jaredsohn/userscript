// ==UserScript==
// @name           Auto Pause the Video Player for Various Pod Sites
// @namespace      http://www.quchao.com/entry/auto-pause/
// @author         Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @description    To register web thunder as a possible handler for the following protocols: thunder, flashget, qqdl, magnet & ed2k.
// @include        http://v.youku.com/v_show/id_*
// @version        1.0.0
// ==/UserScript==
// ver 1.0.0 @ 2011-02-24
//  Initialize release

document.addEventListener("mozvisibilitychange", function(){unsafeWindow.PlayerPause(document.mozHidden)}, false); 