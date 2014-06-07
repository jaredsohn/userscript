// ==UserScript==
// @name           trzcionga
// @namespace      whatever
// @include        http://*.wykop.pl/*
// ==/UserScript==

function main(){
body.style.fontFamily="arial";
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}
if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}
