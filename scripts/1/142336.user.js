// ==UserScript==
// @name       TinierMe Prevent Window Crashing
// @namespace  https://dl.dropbox.com/u/77596770/tinierme-crash-stopper.js
// @version    0.3
// @description  Adds a confirmation dialog when leaving a room in selfy town, prevents the window from crashing when you are disconnected
// @match      http://*.tinierme.com/tinierme/room.do?account_id=*
// @exclude      http://www.tinierme.dom/tinierme/room.do
// @exclude      http://www.tinierme.com/tinierme/room.do?account_id=600000002
// @copyright  2012+, Nora_Kisaragi
// ==/UserScript==

window.onbeforeunload = function () { return "Now disconnecting from a Selfy Town room. Do you wish to continue?"; };
