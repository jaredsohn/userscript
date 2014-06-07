// ==UserScript==
// @name           [Codeforces] Hide all non-AC submissions
// @copyright 	   evandrix~
// @namespace      evandrix
// @description    nondescript
// @include        http://codeforces.com/submissions/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
   $('span.verdict-rejected').parents('tr').hide();
   $('table.status-frame-datatable tr:nth-child(2)').show();
}

addJQuery(main);
