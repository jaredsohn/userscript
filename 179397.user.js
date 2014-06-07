// ==UserScript==
// @name        AJAX fetch
// @namespace   http://userscripts.org/users/529186
// @include     https://www.google.com/
// @version     1
// @grant GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({
  method: "GET",
  url: "http://csv-dev.safl.umn.edu/spit.php",
  onload: function(response) {
    alert(response.responseText);
  }
});