// ==UserScript==
// @name         Hide "Sponsored" from Etsy search results
// @namespace    henrik.nyh.se
// @include      http://www.etsy.com/search/*
// @author       Henrik Nyh
// @description  Hide "Sponsored" from Etsy search results.
// ==/UserScript==

// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
// jQuery already exists, but we must run in the page scope to use it.
function runInPage(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}
runInPage(function() {

  $("a[href=/searchads]").parents("#recent_showcase").remove();

});
