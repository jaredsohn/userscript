// ==UserScript==
// @name           Shacknews Comment Filter 2: Filter Harder
// @namespace      http://userscripts.org/users/72838
// @include        http://www.shacknews.com/laryn.x?story=63750
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	// Get the filters object out of Greasemonkey storage
	var filterString = GM_getValue('shack_filters2', "{}");
	
	// Parse the string into a JSON object
	var filters = JSON.parse(filterString);
	
	//Add the pseudolink style to the page CSS
	function addGlobalStyle(css)
	{
		if(/microsoft/i.test(navigator.appName) && !/opera/i.test(navigator.userAgent))
		{
			document.createStyleSheet().cssText=css;
		}
		else
		{
			var ele=document.createElement('link');
			ele.rel='stylesheet';
			ele.type='text/css';
			ele.href='data:text/css;charset=utf-8,'+escape(css);
			document.getElementsByTagName('head')[0].appendChild(ele);
		}
	}
	
	// style the filterBar
	addGlobalStyle('span.pseudolink { color: #FFBB22; text-decoration: underline; cursor: pointer; } \
	div#filterBar input.text {font-family: verdana; font-size: 12px; background-color: #333333; border: 1px solid #778888; color: #eeeeee; width: 7em; } \
	div#filterBar input.button {font-family: verdana; font-size: 12px; } \
	div#filterBar span.listlabel { display: block; float: left; margin-right: 0.76em; } \
	div#filterOptions input { margin-left: 10px; } \
	div#filterOptions a { text-decoration: none; } \
	div#filterOptions a:hover { text-decoration: underline; } \
	div.commentsbar { margin-bottom: 10px; }');
	
	// Add the filter management container to the page
	$('.commentstools').after(' \
		<div id="filterBar"> \
			<span class="listlabel">Filters:</span> \
			<select id="filter_list" name="filter_list"> \
				<option></option> \
				<option>-- new --</option> \
			</select> \
			<input type="button" name="delete_filter" id="delete_filter" class="filter_control" style="display: none" value="x"> \
			<input type="text" name="new_filter" id="new_filter" class="filter_create_control" style="display: none"> \
			<input type="button" name="save_filter" id="save_filter" class="filter_create_control" style="display: none" value="save"> \
			&nbsp; \
			&nbsp; \
			<span class="pattern_control" style="display: none">Words:</span> \
			<select id="filter_patterns" name="filter_patterns" class="pattern_control" style="display: none"> \
			&nbsp; \
			<input type="button" name="delete_pattern" id="delete_pattern" class="pattern_control" style="display: none" value="x"> \
			&nbsp; \
			<input type="text" name="edit_pattern" id="edit_pattern" class="pattern_edit_control" style="display: none"> \
			<input type="button" name="save_pattern" id="save_pattern" class="pattern_edit_control" style="display: none" value="save"> \
		</div> \
	');
	
	// Style the filterbar
	$('#filterBar').css({
		'border-top'       : '1px solid rgb(174, 174, 155)',
		'background-color' : '#222',
		'line-height'      : '2.5em',
		'padding'          : '10px 0',
		'margin'           : '10px 0',
		'color'            : '#fff',
	});
	
	// Add filters to filter select box
	updateFilterList( filters );
	
	// Bind filter delete control
	// Bind control to pattern delete control
	$('#delete_filter').click(function () {
		// Get the current filter
		var filter = $('select#filter_list').val();
			if (filter == '') { return; }
		
		if (! confirm('Are you sure you want to delete the filter "' + filter + '"?')) {
			return;
		}
		
		// Remove the filter
		delete filters[ filter ];
		
		// Update the filters and the pattern list
		updateFilters(filters);
		updateFilterList(filters);
		
		// Hide the filter delete controls
		$('.filter_control').css('display', 'none');
		$('.pattern_control').css('display', 'none');
		
		// Re-run the filters
		runFilters(filters);
	});
	
	// Bind filter creation controls
	$('#save_filter').click(function () {
		var filter_name = $('#new_filter').val();
			if (filter_name == '') { return; }
			if (filter_name == '-- new --') { alert('Why are you trying to break your own shit?'); return; }
			
		filters[ filter_name ] = {};
		
		updateFilters(filters);
		updateFilterList(filters);
		
		$('.filter_create_control').css('display', 'none');
	});
	
	// Bind control to pattern delete control
	$('#delete_pattern').click(function () {
		// Get the current filter
		var filter = $('select#filter_list').val();
			if (filter == '') { return; }
			
		// Get the pattern name
		var pattern_name = $('select#filter_patterns').val();
		
		// Remove the pattern
		var pattern_obj = filters[ filter ];
		delete pattern_obj[ pattern_name ];
		
		// Update the filters and the pattern list
		updateFilters(filters);
		updatePatternList(filters, filter);
		
		// Hide the pattern controls
		$('.pattern_edit_control').css('display', 'none');
		
		// Re-run the filters
		runFilters(filters);
	});
	
	// When the filter selectbox is changed, load in the patterns
	$('select#filter_list').change(function () {
		var filter = $(this).val();
		
		// Show/hide filter and pattern controls
		if (filter == '') {
			$('.filter_control').css('display', 'none');
			$('.pattern_control').css('display', 'none');
			$('.filter_create_control').css('display', 'none');
			$('.pattern_edit_control').css('display', 'none');
			
			return;
		}
		// If the user selects the "-- new --" option, show controls to create a new filter
		else if (filter == "-- new --") {
			// Show the filter creation controls
			$('.filter_create_control').css('display', null);
			// Hide the pattern controls
			$('.pattern_control').css('display', 'none');
		}
		else {
			$('.filter_control').css('display', null);
			$('.filter_create_control').css('display', 'none');
			$('.pattern_control').css('display', null);
		}
		
		// Update the patterns select box
		updatePatternList(filters, filter);
		
		// When the pattern select box is changed, display an edit box
		$('select#filter_patterns').change(function () {
			var pattern = $(this).val();
			
			// Show/hide pattern editing controls
			if (pattern == '') {
				$('.pattern_edit_control').css('display', 'none');
				return;
			}
			// If the user selects the "-- new --" option, show controls to create a new pattern
			else if (pattern == "-- new --") {
				// Show the filter editing  controls
				$('.pattern_edit_control').css('display', null);
				
				$('#edit_pattern').val('');
				
				// Bind filter creation controls 
				$('#save_pattern').click(function () {
					// Get the current filter
					var filter = $('select#filter_list').val();
					
					// Get the pattern value
					var pattern_text = $('#edit_pattern').val();
						if (pattern == '') { return 1; }
					
					//console.log(pattern_text: %s", pattern_text);
					
					// Save the new pattern
					var pattern_obj = filters[ filter ];
					pattern_obj[ pattern_text ] = 1;
					
					// Update the filters and the pattern list
					updateFilters(filters);
					updatePatternList(filters, filter);
					
					// Hide the pattern controls
					$('.pattern_edit_control').css('display', 'none');
					
					runFilters(filters);
					
					// Unbind this event
					$('#save_pattern').unbind();
					
					// Hide the filter editing controls
					$('.pattern_edit_control').css('display', 'none');
				});
				
				return 1;
			}
			else {
				$('.pattern_edit_control').css('display', null);
			}
			
			// Populate the edit box with the pattern
			$('#edit_pattern').val( $('select#filter_patterns').val() );
			
			// Bind the control on the save button
			$('#save_pattern').click(function () {
				// Get the current filter
				var filter = $('select#filter_list').val();
				
				// Get the pattern name
				var pattern_name = $('select#filter_patterns').val();
				
				// Get the pattern value
				var pattern_text = $('#edit_pattern').val();
					if (pattern == '') { return; }
					
				//console.log("pattern_name: %s, pattern_text: %s", pattern_name, pattern_text);
				
				// Remove the old pattern
				var pattern_obj = filters[ filter ];
				delete pattern_obj[ pattern_name ];
				
				// Set the new pattern
				pattern_obj[ pattern_text ] = 1;
				
				// Update the filters and patterns
				updateFilters(filters);
				updatePatternList(filters, filter);
				
				// Clear the edit box
				$('#edit_pattern').val('');
				
				runFilters(filters);
				
				// Unbind this event
				$('#save_pattern').unbind();
				
				// Hide the pattern edit controls
				$('.pattern_edit_control').css('display', 'none');
			});
		});
	});
	
	// Run the filters
	runFilters(filters);
	
	function updateFilters (filters) {
		setTimeout(function() {
			var filter_string = JSON.stringify(filters);
			GM_setValue('shack_filters2', filter_string);
		}, 0);
	}
}

function runFilters (filters) {
	// Find all the postbody divs in the page
	$('.fullpost > .postbody').each(function () {
		// Loop through the filters
		for (filter in filters) {
			// If the filter matches, hide the postbody and collapse the replies
			if (filterThread(this, filters[filter])) {
				var reason = "Filter matched: " + filter;
				
				// Hide the thread text
				$(this).html('<span id="filteron' + $(this).attr('id') + '" class="pseudolink">' + reason + '</span><span class="savedtext" style="display:none">' + $(this).html() + '</span>');
				
				// Collapse the replies
				$(this).parent().siblings('.capcontainer').css('display', 'none');
				
				// Add bind for unfiltering this thread
				$('span.pseudolink').click(function () {
					// Unhide the replies
					$(this).parent().parent().siblings('.capcontainer').css('display', null);
					
					// Restore the original HTML
					$(this).parent().html( $(this).siblings('.savedtext').html() );
				});
				
				// Stop matching filters for this thread
				break;
			}
			else {
				// Unhide the replies
				$(this).parent().siblings('.capcontainer').css('display', null);
				// Restore the original HTML
				$(this).html( $(this).children('.savedtext').html() );
			}
		}
	});
}

function updateFilterList (filters) {
	$('select#filter_list').html('<option></option>');
	
	for (filter in filters) {
		$('select#filter_list').append('<option>' + filter + '</option>' );
	}
	
	$('select#filter_list').append('<option>-- new --</option>');
}

function updatePatternList (filters, filter) {
	// Clear out the patterns select box
	$('select#filter_patterns').html("<option></option>");
	
	// Add all the patterns to the select box
	for (pattern in filters[filter]) {
		$('select#filter_patterns').append('<option>' + pattern + '</option>');
	}
	
	$('select#filter_patterns').append('<option>-- new --</option>');
}

function filterThread (thread, filter) {
	// Loop through each pattern in the filter
	var matched = false;
	for (pattern in filter) {
		if (pattern == '') { continue; }
		
		pattern = '\\b' + pattern + '\\b';
		pattern = pattern.replace(/[*]/g, '.*');
		//console.log('pattern: %s', pattern);
		
		var regex = new RegExp(pattern, 'i');
		//console.log(regex);
		
		// If the postbody text doesn't match one of the patterns then it's a non-match, return
    	if (! $(thread).text().match( regex )) {
    		return false;
    	}
    	else {
    		matched = true;
    	}
	}
    
    if (matched) {
    	return true;
	}
	else {
		return false;
	}
}

// implement JSON.stringify serialization  
JSON.stringify = JSON.stringify || function (obj) {  
    var t = typeof (obj);  
    if (t != "object" || obj === null) {  
        // simple data type  
        if (t == "string") obj = '"'+obj+'"';  
        return String(obj);  
    }  
    else {  
        // recurse array or object  
        var n, v, json = [], arr = (obj && obj.constructor == Array);  
        for (n in obj) {  
            v = obj[n]; t = typeof(v);  
            if (t == "string") v = '"'+v+'"';  
            else if (t == "object" && v !== null) v = JSON.stringify(v);  
            json.push((arr ? "" : '"' + n + '":') + String(v));  
        }  
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");  
    }
};

// implement JSON.parse de-serialization  
JSON.parse = JSON.parse || function (str) {  
    if (str === "") str = '""';  
    eval("var p=" + str + ";");  
    return p;
};