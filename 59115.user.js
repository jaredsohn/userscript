// ==UserScript==
// @name           UTmateEnterKey
// @namespace      http://kataho.net/
// @description    Enable enter key on UT-mate login screen.
// @include        https://ut-gakumu.adm.u-tokyo.ac.jp/websys/campus
// ==/UserScript==

function main() {
  var form = document.getElementsByTagName("form")[0];
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.addEventListener("click", function(e){login()}, false);
  submit.style.display = "none";
  form.appendChild(submit);
}

main();
