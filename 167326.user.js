// ==UserScript==

// @name            gw2timer
// @namespace       categoryfilter
// @description     Makes the timers less shitty.
// @include         http://guildwarstemple.com/dragontimer*
// @include         https://guildwarstemple.com/dragontimer*


// ==/UserScript==

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

addGlobalStyle('#dragoncalc{width: 572px;} #dragoncalc2 {padding-top:0px;} #timer-content{width: 1280px;} #timer-image-div { display:none; } #timer-ads { display:none; } .eventTimeBox {float: right;}');