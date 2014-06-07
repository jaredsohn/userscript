// ==UserScript==
// @name           Disable autocompletion on vasttrafik.se
// @namespace      effata
// @include        http://vasttrafik.se/sv/*
// @description    Since Västtrafik haven't turned off browsers autocompletion on their search forms i wrote this fix to get rid of the annoying double autocomplete lists
// ==/UserScript==

var inputs = ['ctl00_FullRegion_RightRegion_TripSearchRegion_TripSearchStartPageBlock_AutocompleteFrom', 'ctl00_FullRegion_RightRegion_TripSearchRegion_TripSearchStartPageBlock_AutocompleteTo', 
'ctl00_FullRegion_MainAndFooterRegion_MainRegion_TravelPlannerStandard_TravelPlannerTextBoxFrom_TravelPlannerTextBoxFromTextBox', 'ctl00_FullRegion_MainAndFooterRegion_MainRegion_TravelPlannerStandard_TravelPlannerTextBoxTo_TravelPlannerTextBoxToTextBox',
'ctl00_FullRegion_MainAndFooterRegion_MainRegion_TextBoxStopAutocomplete'];

for (var i in inputs) {
	var element = document.getElementById(inputs[i]);
	if  (element) {
		element.setAttribute('autocomplete', 'off');
	}	
}