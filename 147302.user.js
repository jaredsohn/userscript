// ==UserScript==
// @name            CrackHackForum - Shoutbox popup
// @namespace       Pl0xd/shoutbox
// @description     Shoutbox Popup
// @author          Pl0xd
// @include         http://crackhackforum.com/index.php/shoutbox
// @include         http://www.crackhackforum.com/index.php/shoutbox
// @version         1.0
// ==/UserScript==


document.getElementById('container').innerHTML='<iframe src=\"index.php\" onload=\"this.contentWindow.document.documentElement.scrollTop=280\" frameborder=\'0\' scrolling=\'no\' width=\'820\' height=\'400\'></iframe>';

