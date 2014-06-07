// ==UserScript==
// @name           OpenAir with Brain
// @version        0.3b
// @auther         mailto:lothar.geisinger@softwareag.com
// @description    More user experience in OpenAir
// @date           2013-04-25                                                     }
// @license        GNU GPL v2.0
// @namespace      gev
// @include        http*://www.openair.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

var bOAWBdebugIsEnabled = true;

var bOAWBmainWasExecuted = false;
var bOAWBimproveUECreatingNewExpensive_SyncStartDates_EventListenerSetted = false;

var bOAWBImproveUECreatingNewExpensive_AddReceipt_RememberTask = false;
var bOAWBImproveUECreatingNewExpensive_AddReceipt_RememberReceiptDate = false;
function oawbMain() {
	jQuery(document).ready(function() {
		if (!bOAWBmainWasExecuted) {

			oawbImproveUECreatingNewExpensive();
			oawbImproveUECreatingNewExpensive_AddReceipt();

			bOAWBmainWasExecuted = true;
		}
	});
}

function oawbCreateCookie(name, value) {

	days = 1;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else
		var expires = "";
	document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function oawbReadCookie(name) {

	oawbDebug('Read cookie: ' + name);

	var nameEQ = escape(name) + "=";
	var ca = document.cookie.split(';');
	for ( var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) {
			val = unescape(c.substring(nameEQ.length, c.length));
			oawbDebug('	value: ' + val);
			return val;
		}
	}
	return null;
}

function oawbEraseCookie(name) {
	createCookie(name, "", -1);
}

function oawbDebug(sMessage) {
	if (bOAWBdebugIsEnabled) {
		console.log(sMessage);
	}
}

function oawbImproveUECreatingNewExpensive_AddReceipt() {

	bURLCondition = (window.location.href.indexOf("action=edit_ticket") > -1)
			&& (window.location.href.indexOf("www.openair.com/envelope.pl") > -1);
	if (bURLCondition) {
		$('#custom_157').val('DE - GERMANY');

		$('#date')
				.val(
						oawbReadCookie("oawbImproveUECreatingNewExpensive_SyncStartDates"));

		oawbImproveUECreatingNewExpensive_AddReceipt_RememberTask();
		oawbImproveUECreatingNewExpensive_AddReceipt_RememberReceiptDate();
	}
}

function oawbImproveUECreatingNewExpensive_AddReceipt_RememberReceiptDate() {
	if (!bOAWBImproveUECreatingNewExpensive_AddReceipt_RememberReceiptDate) {
		$('#date').blur(
				function() {
					oawbCreateCookie(
							"oawbImproveUECreatingNewExpensive_SyncStartDates",
							$('#date').val());
				});
		$('#date').focus($('#date').blur());
		$('#date').change($('#date').blur());
		$('#date').keypress($('#date').blur());
	}
}

function oawbImproveUECreatingNewExpensive_AddReceipt_RememberTask() {

	if (!bOAWBImproveUECreatingNewExpensive_AddReceipt_RememberTask) {
		$('select[name=_project_task_id]')
				.change(
						function() {
							oawbCreateCookie(
									"oawbImproveUECreatingNewExpensive_AddReceipt_RememberTask",
									$('select[name=_project_task_id]').val());
							oawbDebug($('select[name=_project_task_id]').val());
						});
	}

	sCookieVal = oawbReadCookie("oawbImproveUECreatingNewExpensive_AddReceipt_RememberTask");
	if (sCookieVal != null) {
		$('select[name=_project_task_id]').val(sCookieVal);
	}

}

function oawbImproveUECreatingNewExpensive_SyncStartDates() {
	if (!bOAWBimproveUECreatingNewExpensive_SyncStartDates_EventListenerSetted) {

		oawbDebug('oawbImproveUECreatingNewExpensive_SyncStartDates started');

		$('#date')
				.blur(
						function() {
							// Start Date
							$('#custom_85').val($('#date').val());
							// End Date
							$('#custom_87').val($('#date').val());

							oawbCreateCookie(
									"oawbImproveUECreatingNewExpensive_SyncStartDates",
									$('#date').val());

							oawbDebug('Synchronize Dates');
							oawbDebug('	LISTENER SET by oawbImproveUECreatingNewExpensive_SyncStartDates');
						});
		$('#date').focus($('#date').blur());
		$('#date').change($('#date').blur());
		$('#date').keypress($('#date').blur());

		$('#custom_85')
				.blur(
						function() {
							// Start Date
							$('#date').val($('#custom_85').val());
							// End Date
							$('#date').val($('#custom_87').val());

							oawbCreateCookie(
									"oawbImproveUECreatingNewExpensive_SyncStartDates",
									$('#custom_85').val());

							oawbDebug('Synchronize Dates');
							oawbDebug('	LISTENER SET by oawbImproveUECreatingNewExpensive_SyncStartDates');
						});
		$('#custom_85').focus($('#date').blur());
		$('#custom_85').change($('#date').blur());
		$('#custom_85').keypress($('#date').blur());

		bOAWBimproveUECreatingNewExpensive_SyncStartDates_EventListenerSetted = true;
	}

}

function oawbImproveUECreatingNewExpensive() {

	oawbDebug('oawbImproveUECreatingNewExpensive started');
	bURLCondition = (window.location.href.indexOf("_new_envelope=1") > -1)
			&& (window.location.href.indexOf("www.openair.com/envelope.pl") > -1);

	if (bURLCondition) {

		oawbImproveUECreatingNewExpensive_SyncStartDates();

		$('#custom_111').val('DE - Deutschland');
		$('#custom_112').val('DE - ALL');
	}
}
oawbMain();