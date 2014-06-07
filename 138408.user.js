// ==UserScript==
// @name           Nordic-T
// @namespace      https://nordic-t.me
// @include 	   *nordic-t.me/forums.php*
// @description    Nordic-T image fix
// @version        1.2
// ==/UserScript==

function addFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = "-" + func + (exec ? "()" : "");
  document.body.appendChild(script);
}

function showTits () {
    jQuery('div[style="overflow: hidden; max-width:800px;"]').css({"overflow" : "visible", "max-height" : "none", "max-width" : "none"});
}

addFunction(showTits, true);