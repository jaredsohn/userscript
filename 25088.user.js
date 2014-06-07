// ==UserScript==
// @name           Transport Direct assisstant
// @namespace      geological-supplies.com
// @description    Makes using transportdirect.info a little easier
// @include        http://www.transportdirect.info/*
// ==/UserScript==

if (document.getElementById("planAJourneyControl_fromDropDownLocationGazeteerOptions")){
document.getElementById("planAJourneyControl_fromDropDownLocationGazeteerOptions").value = "StationAirport";
document.getElementById("planAJourneyControl_toDropDownLocationGazeteerOptions").value = "StationAirport";
}
else if (document.getElementById("planAJourneyControl_toDropDownLocationGazeteerOptions")){
document.getElementById("planAJourneyControl_toDropDownLocationGazeteerOptions").value = "StationAirport";
document.getElementById("planAJourneyControl_fromDropDownLocationGazeteerOptions").value = "StationAirport";
}
else if (document.getElementById("originControl_locationAmbiguous_SelectOptionDropDown")){
	document.getElementById("originControl_locationAmbiguous_SelectOptionDropDown").selectedIndex = 1;
	document.getElementById("destinationControl_locationAmbiguous_SelectOptionDropDown").selectedIndex = 1;
}