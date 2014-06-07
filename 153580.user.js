// ==UserScript==
// @name            Youtube Sort Options
// @namespace       oldmanclub.org
// @version         0.2
// @author          tomatolicious
// @description     Brings back the old Youtube search/sort options to the new layout rolled out in December 2012, also expands the main layout column 
// @license         Public Domain
// @include         http*://www.youtube.com/results*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @updateURL       http://userscripts.org/scripts/source/153580.user.js
// @downloadURL     http://userscripts.org/scripts/source/153580.user.js
// ==/UserScript==
$(document).ready(function () {
    var searchTerm = encodeURIComponent($("#masthead-search-term").val());
    var sortElement = "<div class=\"filter-col\">\n<h4 class=\"filter-col-title\">\nSort by</h4>\n<ul><li class=\"filter\"><a href=\"/results?search_type=videos&search_query=" + searchTerm + "&oq=" + searchTerm + "\" class=\"filter-content\">Relevance</a></li><li class=\"filter\"><a href=\"/results?search_type=videos&search_query=" + searchTerm + "&oq=" + searchTerm + "&search_sort=video_date_uploaded\" class=\"filter-content\">Upload date</a></li><li class=\"filter\">    <a href=\"/results?search_type=videos&search_query=" + searchTerm + "&oq=" + searchTerm + "&search_sort=video_view_count\" class=\"filter-content\">View count</a></li><li class=\"filter\">    <a href=\"/results?search_type=videos&search_query=" + searchTerm + "&oq=" + searchTerm + "&search_sort=video_avg_rating\" class=\"filter-content\">Rating</a></li></ul>  </div>";
    $(".primary-col").css("width", "auto"); // this expands the main column so that the "new" options fit again...
    $("#filter-dropdown").append(sortElement);
});