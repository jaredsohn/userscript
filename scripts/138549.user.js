// ==UserScript==
// @name           TPB Search Enhanced
// @namespace      http://zanloy.com/
// @version        1.1
// @downloadURL    https://zanloy.com/scripts/js/tbp_search_enhanced.user.js
// @updateURL      https://zanloy.com/scripts/js/tbp_search_enhanced.user.js
// @description    Order TPB search results by number of seeders.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match          http://thepiratebay.sx/*
// @match          https://thepiratebay.sx/*
// @copyright      2012+, Zan Loy
// ==/UserScript==

var html;
html = "<label for='orderby'>Order By:</label>";
html += "<select name='orderby'>";
html += "<option value='7'>Seeders</option>";
html += "<option value='3'>Uploaded</option>";
html += "<option value='5'>Size</option>";
html += "<option value='12'>Uled By</option>";
html += "<option value='9'>Leechers</option>";
html += "</select>";

// Home page
$("#chb").after("<p>"+html+"</p>")
$("input[name='orderby']").remove();

// Search results
$("#category").after(html)