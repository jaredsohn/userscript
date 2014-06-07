// ==UserScript==
// @name          Alert blocker
// @version       0.0.1
// @author        Fredrik
// @description	  Remove annoying javascript alerts
// @include       *
// ==/UserScript==

var alert_script  = document.createElement("script");
alert_script.setAttribute("type", "text/javascript");
alert_script.innerHTML = "function alert(m) {}";
document.body.appendChild(alert_script);
