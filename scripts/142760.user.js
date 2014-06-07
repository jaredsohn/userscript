// ==UserScript==
// @name        FurAffinity Submission Download Rename
// @require     http://code.jquery.com/jquery-latest.min.js
// @namespace   http://userscripts.org/users/423875
// @include     *.furaffinity.net/view/*/
// @include     *.furaffinity.net/full/*/
// @version     8.2
// ==/UserScript==

var init = function() {
  var title  = jQuery("#submission .cat > b :eq(0)").text();
  var artist = jQuery("#submission .cat > a :eq(0)").text();
  var fname  = artist + " - " + title;
  jQuery('.actions b a[href*="facdn.net/"]').attr("title", fname).attr("download", fname);
}

if (typeof jQuery === "undefined") { // Chrome
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "jQuery.noConflict();(" + init.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
} else { // Greasemonkey
  init();
}

