// ==UserScript==
// @name           CodebaseHQ v4 fixes
// @namespace      http://userscripts.org/users/330670
// @include        https*://*.codebasehq.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.js
// ==/UserScript==

// unbreak ticket search form so you can search repeatedly
var $editSearchForm = jQuery('.edit_tickets_report');
if ($editSearchForm.length) {
	// get a working form
	var currentUrl = window.location.toString();
	var rootTicketsUrl = currentUrl.split('?')[0];

	jQuery.get(rootTicketsUrl, function(data) {
		$page = jQuery(data);
		$newSearchForm = jQuery('#new_tickets_report', $page);

		// keep old search count
		$oldSearchCount = jQuery(".page_entries_info", $editSearchForm).clone();
		jQuery(".page_entries_info", $newSearchForm).replaceWith($oldSearchCount);
		
		$editSearchForm.after($newSearchForm);
		$editSearchForm.remove();
	});
}

// sort assigned users alphabetically
var $asigneeSelect = $('#tickets_update_updates_assignee_id');
if ($asigneeSelect.length) {
	var $options = $asigneeSelect.children('option');
	var previousSelectedValue = $asigneeSelect.val()
	var optionsArray = [];

	// collect up the options
	$options.each(function(index, element) {
		var $element = $(element);
		$element.detach();
		optionsArray.push($element);
	});

	optionsArray.sort(function($a, $b) {
		if ($a.text() < $b.text()) {
			return -1;
		} else if ($a.text() === $b.text()) {
			return 0;
		} else {
			return 1;
		}
	});

	$.each(optionsArray, function(index, $element) {
		$asigneeSelect.append($element);
	});

	$asigneeSelect.val(previousSelectedValue);
}
