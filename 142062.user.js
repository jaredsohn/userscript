// ==UserScript==
// @name           Nordic-T Logo Link
// @namespace      https://nordic-t.me
// @include 	   *nordic-t.me*
// @description    Nordic-T Logo Link
// @version        1.0
// ==/UserScript==

function addFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = "-" + func + (exec ? "()" : "");
  document.body.appendChild(script);
}

function addLink () {
	jQuery(".logo").wrap('<a href="https://nordic-t.me/"></a>');
}

addFunction(addLink, true)