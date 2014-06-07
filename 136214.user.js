// ==UserScript==
// @name           Harvest Improvements
// @namespace      Harvest_Improvements
// @description    Improve Harvest Interface
// @include        https://*.harvestapp.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
if(typeof $.fn.jquery == 'string') {
	$.noConflict();
}

jQuery(document).ready(function() {
	jQuery('#add_day_entry_link').on('click', function () {
		thisSelect = jQuery('tr#add_day_entry_row .task .add_day_entry_form #project_tasks_selector_cont select#project_selector');
		if(jQuery(thisSelect).parent().prev().attr('id') != 'optgroup-filter') { 
			var selectBox = jQuery('<select id="optgroup-filter"><option value="view-all">View all</option></select>');
			var selectItems = jQuery(thisSelect).find('optgroup');
			
			//for each selectItems add as option 
			jQuery(selectItems).each(function(index) {
				var selectLabel = jQuery(this).attr('label');
				selectBox.append('<option value="' + selectLabel +'">' + selectLabel + '</option>');
			})
			
			selectBox.on('change', function() {
				var selectOutput = jQuery(this).val();
				if(selectOutput != 'view-all') {
					jQuery(thisSelect).find('optgroup').hide()
					jQuery(thisSelect).find('optgroup[label*="' + selectOutput + '"]').show().find('option:eq(0)').attr('selected', 'selected').change();
				} else {
					jQuery(thisSelect).find('optgroup').show()
				}
	    	}).css({'width': '290px', 'height' : '20px'}).insertBefore(jQuery(thisSelect).parent());
		}
	});
})