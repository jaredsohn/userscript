// ==UserScript==
// @name          Print blocker
// @version       1.0.0
// @author        tChAd
// @description	  Remove those annoying automatic javascript print commands. Based on http://userscripts.org/scripts/show/4025 by Fredrik.
// @include       *
// ==/UserScript==

var print_script  = document.createElement("script");
print_script.setAttribute("type", "text/javascript");
print_script.innerHTML = "function print(m) {}";
document.body.appendChild(print_script);

