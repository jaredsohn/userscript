// ==UserScript==
// @name        Sydsvenskan.se For Free
// @namespace   http://localhost
// @description Free reading of sydsvenskan.se
// @include     http://*.sydsvenskan.*/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
$("#ctl00_ctl00_ctlLimitPopup_pnlLimitPopup").remove();
$("#ctl00_ctl00_ctlWarningPopup_pnlWarningPopup").remove();
window.onload = function () { 
        $("#ctl00_ctl00_ctlWarningPopup_pnlWarningPopup").remove();
	$("#ctl00_ctl00_ctlWarningPopup_pnlWarningPopup").remove();
	$("body").css("max-height", "");
}
