// ==UserScript==
// @id             youtubesortby@phob.net
// @name           YouTube Sort By
// @version        0.15
// @namespace      phob.net
// @author         wn
// @contributor    tomatolicious
// @description    Adds "Sort By" options to YouTube video search results
// @include        http://www.youtube.com/results*
// @include        https://www.youtube.com/results*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/154231.meta.js
// ==/UserScript==


// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  // Check for function input.
  if ("function" == typeof(source)) {
    source = "(" + source + ")();";
  }

  // Create a script node holding this source code.
  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


contentEval(function() {
  var searchTerm = encodeURIComponent(document.getElementById("masthead-search-term").value);
  var sortSection = "<div class='filter-col'>"
                  + "  <h4 class='filter-col-title'>Sort By</h4>"
                  + "  <ul>"
                  + "    <li class='filter'><a href='/results?search_type=videos&search_query=" + searchTerm + "&oq=" + searchTerm + "' class='filter-content'>Relevance</a></li>"
                  + "    <li class='filter'><a href='/results?search_type=videos&search_query=" + searchTerm + "&oq=" + searchTerm + "&search_sort=video_date_uploaded' class='filter-content'>Upload date</a></li>"
                  + "    <li class='filter'><a href='/results?search_type=videos&search_query=" + searchTerm + "&oq=" + searchTerm + "&search_sort=video_view_count' class='filter-content'>View count</a></li>"
                  + "    <li class='filter'><a href='/results?search_type=videos&search_query=" + searchTerm + "&oq=" + searchTerm + "&search_sort=video_avg_rating' class='filter-content'>Rating</a></li>"
                  + "  </ul>"
                  + "</div>";

  var pCol = document.getElementsByClassName("primary-col");
  for (var i = 0, e = pCol.length; i < e; ++i) {
    pCol[i].style.width = "auto";
  }

  document.getElementById("filter-dropdown").innerHTML += sortSection;
}); // end of call to contentEval
