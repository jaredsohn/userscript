// ==UserScript==
// @name           newgrounds.com - show voting panel
// @namespace      http://none.com
// @description    Shows the voting panel immediately on newgrounds.com UJ submissions
// @include        http://*newgrounds.com/portal/view*
// ==/UserScript==

var vote_panel = document.getElementById('vote_panel');
vote_panel.style.visibility = "visible";