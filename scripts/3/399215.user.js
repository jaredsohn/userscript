// ==UserScript==
// @name ILGA Easy Witness
// @description my.ilga.gov easy witness slips
// @namespace ilcarry
// @author s0beit
// @include http://my.ilga.gov/WitnessSlip/Create/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version 1.0
// ==/UserScript==

function doesWitnessDataExist() {
	return !(GM_getValue('FirmBusinessOrAgency', 'THISISAFAKEVALUE_1932842947839') == 'THISISAFAKEVALUE_1932842947839');
}

function saveWitnessData() {
	GM_setValue('Name', $('#Name').val());
	GM_setValue('Address', $('#Address').val());
	GM_setValue('City', $('#City').val());
	GM_setValue('State', $('#State').val());
	GM_setValue('Zip', $('#Zip').val());
	GM_setValue('FirmBusinessOrAgency', $('#FirmBusinessOrAgency').val());
	GM_setValue('Title', $('#Title').val());
	GM_setValue('Email', $('#Email').val());
	GM_setValue('Phone_AreaCode', $('#Phone_AreaCode').val());
	GM_setValue('Phone_FirstDigits', $('#Phone_FirstDigits').val());
	GM_setValue('Phone_LastDigits', $('#Phone_LastDigits').val());
	GM_setValue('Representation', $('#Representation').val());
}

function restoreWitnessData() {
	if(doesWitnessDataExist() == false) return;
	
	$('#Name').val(GM_getValue('Name'));
	$('#Address').val(GM_getValue('Address'));
	$('#City').val(GM_getValue('City'));
	$('#State').val(GM_getValue('State'));
	$('#Zip').val(GM_getValue('Zip'));
	$('#FirmBusinessOrAgency').val(GM_getValue('FirmBusinessOrAgency'));
	$('#Title').val(GM_getValue('Title'));
	$('#Email').val(GM_getValue('Email'));
	$('#Phone_AreaCode').val(GM_getValue('Phone_AreaCode'));
	$('#Phone_FirstDigits').val(GM_getValue('Phone_FirstDigits'));
	$('#Phone_LastDigits').val(GM_getValue('Phone_LastDigits'));
	$('#Representation').val(GM_getValue('Representation'));
	$('#Testimonies_2__IsSelected').prop('checked', true);
	$('#AgreeToTermsCheckBox').prop('checked', true);
	$('#CreateButton').prop("disabled", false);
}

$(document).ready(function() {
	restoreWitnessData();

	$('#CreateButton').bind('click', function() {
		saveWitnessData();
	});
});