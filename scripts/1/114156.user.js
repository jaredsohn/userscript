// ==UserScript==
// @name iDiva Comments Fixer
// @namespace http://userscripts.org/users/ravionline
// @description Fixes the display of comments on iDiva.com confessions page.
// @include http://idiva.com/confession/*
// @version 1.0
// ==/UserScript==

if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();
  return;
}

showPagingComment(
	document.getElementById('conId').value,
	'1', 'ds'
);