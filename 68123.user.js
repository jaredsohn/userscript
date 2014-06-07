// ==UserScript==
// @name           Kill QD Pop up
// @namespace      db
// @include        http://*.duels.com/arena/?a=q
// @include        http://*.duels.com/arena/
// ==/UserScript==

var alert_script  = document.createElement("script");
alert_script.setAttribute("type", "text/javascript");
alert_script.innerHTML = "function alert(m) {}";
document.body.appendChild(alert_script);

var confirm_script  = document.createElement("script");
confirm_script.setAttribute("type", "text/javascript");
confirm_script.innerHTML = "function confirm(m) {}";
document.body.appendChild(confirm_script);