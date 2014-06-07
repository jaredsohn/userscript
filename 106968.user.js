// ==UserScript==
// @name           Search Flipper
// @version        1.0
// @author         Shepherd Shed
// @description    Flips the search results to where the last results are listed first.
// @namespace      http://www.starpirates.net/greasemonkey/
// @include        http://www.starpirates.net/search.php*
// ==/UserScript==

temp_results_table = document.getElementsByTagName('tbody');
results_table = temp_results_table[temp_results_table.length -3];
results = results_table.rows;
total_results = results.length;
for(i=0;i<total_results;i++){
	results_table.appendChild(results[total_results-i-1]);
}
