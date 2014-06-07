// ==UserScript==
// @name           Disable autocompletion on vasttrafik.se
// @namespace      http://klargodut.com
// @include        *vasttrafik.se/*
// @description    Removes the browser's autocompletion on vasttrafik.se, since it conflicts with Västtrafik's own implementation. Based on http://userscripts.org/scripts/show/30884.
// ==/UserScript==

var inputs = [	'ctl00_FullRegion_RightRegion_TripSearchRegion_TripSearchStartPageBlock_AutocompleteFrom', 
		'ctl00_FullRegion_RightRegion_TripSearchRegion_TripSearchStartPageBlock_AutocompleteTo', 
		'ctl00_FullRegion_MainAndFooterRegion_MainRegion_TravelPlannerStandard_TravelPlannerTextBoxFrom_TravelPlannerTextBoxFromTextBox', 
		'ctl00_FullRegion_MainAndFooterRegion_MainRegion_TravelPlannerStandard_TravelPlannerTextBoxTo_TravelPlannerTextBoxToTextBox',
		'ctl00_FullRegion_MainAndFooterRegion_MainRegion_TextBoxStopAutocomplete'	];

for (var i in inputs) {
	var element;
	if  (element = document.getElementById(inputs[i]))
		element.setAttribute('autocomplete', 'off');
}