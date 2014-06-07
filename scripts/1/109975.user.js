// ==UserScript==
// @name           LoU City Stroika
// @description    Stroit goroda kogda ya ne igraju
// @namespace      bx2
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.2.3
// ==/UserScript==

function stroika
{
var event = document.createEvent('KeyboardEvent');
event.initKeyEvent("keypress", true, true, null, false, false, false, false, 76, 0);
this.input.focus()[0].dispatchEvent(event);
}


window.setInterval(stroika, 30000)

