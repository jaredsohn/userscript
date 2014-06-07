// ==UserScript==
// @name           Galaxy Mail
// @namespace      Baracs
// @version        1.00
// @date           4/16/2010
// @description    Fix mail button in galaxy view for OGame redesign
// @include        http://*.ogame.org/game/index.php?page=galaxy&*
// ==/UserScript==


(function ()
{
var mailDiv = document.createElement("div");
mailDiv.appendChild(document.getElementById("message_alert_box"));
document.getElementById("galaxyscroll").parentNode.insertBefore(mailDiv,document.getElementById("galaxyscroll"));
document.getElementById("showbutton").setAttribute("style","position:relative; left:0");
document.getElementById("expeditionbutton").setAttribute("style","position:relative; left:35px");
}) ();