// ==UserScript==
// @name            addStandingUnits
// @namespace       Bananaz
// @include         http://ae*.tribalwars.ae/game.php?*screen=report*view=*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://up.tw4me.com/uploads/plapl_13243213741.js');