// ==UserScript==
// @name            HKEPC Shortcut Disabler
// @namespace       mt@live.hk
// @description     Disable 'Previous Page' and 'Next Page' Shortcut of HKEPC
// @include         http://forum.hkepc.com/forumdisplay.php?*
// @include         http://forum.hkepc.com/viewthread.php?*
// @include         http://forum.hkepc.com/redirect.php?*
// @include         http://www.hkepc.com/forum/forumdisplay.php?*
// @include         http://www.hkepc.com/forum/viewthread.php?*
// @include         http://www.hkepc.com/forum/redirect.php?*
// ==/UserScript==

// Author:          FatTunG
// Contact:         mt@live.hk
// Version:         1.01
// Date:            2008-06-13

unsafeWindow.document.onkeyup = function(e){ return false; };
