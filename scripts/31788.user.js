// ==UserScript==
// @name           Basecamp: Time Report
// @namespace      ro.grapefruit.basecamp
// @description    Adds extra functionality to the Basecamp Time Report view (version 4)
// @include        http://*.projectpath.com/time_entries/report*
// @include        http://*.basecamphq.com/time_entries/report*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { unsafeWindow.jQuery.noConflict(); withJQuery(unsafeWindow.jQuery); }
}
GM_wait();

// Rest of the GM code
function withJQuery($) {
	// Add link
	var $viewLink = $('<a id="view_link" class="admin project" href="#">Group by day</a>'); 
	$('#report_link').after($viewLink).after(', ');
    var $entries_by_project = $('#entries');
    var $entries_by_day = null;
	// Utility functions: Returns the date associated with an entry
	function dateAsNumberForEntry(entry) {
		return parseInt($(entry).find(' > td.date > a').get(0).href.split(/from=/)[1]); 
	}
	function dateForEntry(entry) {
		var dateAsString = $(entry).find(' > td.date > a').get(0).href.split(/from=/)[1]; 
		return new Date(parseFloat(dateAsString.substr(0, 4)), parseFloat(dateAsString.substr(4, 2))-1, parseFloat(dateAsString.substr(6, 2), 10)); 
	}
	function timeForEntry(entry) {
		return parseFloat($(entry).find(' > td.hours').text()); 
	}
	function groupByDay() {
        location.href = location.href.split('#')[0] + '#group_by_day';
		if ($viewLink.hasClass('day')) return; 
        $viewLink.attr('class', 'admin day').text('Group by project'); 
        $('#entry_adder table').remove();
        if ($entries_by_day) {
            $('#entry_adder').append($entries_by_day);
        } else {
            $entries_by_day = $entries_by_project.clone(true);
            $('#entry_adder').append($entries_by_day);
            var entries = $('#entry_list tr.entry').get(); 
            // Sort entries (insert-sort)
            for (var i = 1; i < entries.length; i++) {
                for (var j = i; j > 0; j--) {
                    if (dateAsNumberForEntry(entries[j-1]) <= dateAsNumberForEntry(entries[i])) break; 
                }
                if (i != j) {
                    entries.splice(j, 0, entries.splice(i, 1)[0]);
                }
            }
            // Create daily summaries
            var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
            for (var i = 0; i < entries.length; i++) {
                // skip the similar
                var dateAsNumber = dateAsNumberForEntry(entries[i]); 
                var totalTime = timeForEntry(entries[i]); 
                for (j = 1; i+j < entries.length; j++) {
                    if (dateAsNumberForEntry(entries[i+j]) != dateAsNumber) break;
                    totalTime += timeForEntry(entries[i+j]); 
                }
                // create and insert row
                var date = dateForEntry(entries[i]);
                entries.splice(i, 0, $('<tr><th class="project" colspan="5">'+dayNames[date.getDay()]+' <a><span>('+totalTime+' hours)</span></a></th></tr>').get(0)); 
                i += j; 
            }
            // Remove all the entries, and then insert them back in the sorted order
            $('#entry_list tr').remove(); 
            $('#entry_list').append(entries);
        }
	}
	function groupByProject() {
        location.href = location.href.split('#')[0] + '#group_by_project';
		if ($viewLink.hasClass('project')) return; 
        $viewLink.attr('class', 'admin project').text('Group by day'); 
        $('#entry_adder table').remove();
        $('#entry_adder').append($entries_by_project);
	}
    // Click functionality
    $viewLink.click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        if ($viewLink.hasClass('day')) groupByProject(); 
        else groupByDay(); 
        return false;
    });
    if (location.href.split('#')[1] == 'group_by_day') groupByDay();
}
