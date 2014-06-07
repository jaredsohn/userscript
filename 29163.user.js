// ==UserScript==
// @name          Serials Solutions (jQuery)
// @description	  Makes Serials Solutions Client Center a little easier to work with.
// @author        Jason Ronallo
// @include       http://clientcenter.serialssolutions.com/*
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.3.min.js';
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
	$("tr.DetailsViewRowStyle td").filter(':contains(Subscribed)').css("color", "green").css("font-weight", "bold");	

	$("tr.DetailsViewRowStyle td").filter(':contains(Not Tracked)').css("color", "red").css("font-weight", "bold");


	$(".GridView td").filter(':contains(Tracked)').css("color","green").css("font-weight","bold");


	$("td").filter(':contains(Not Tracked)').css("color","black").css("font-weight","normal");

	$("tr.GridViewAlternateRow td").filter(':contains(Cancelled)').css("color","red");
	$("tr.GridView td").filter(':contains(Cancelled)').css("color","red");

	$("tr.GridViewAlternateRowBold td").filter(':contains(Subscribed)').css("color","green");
	$("tr.GridViewBold td").filter(':contains(Subscribed)').css("color","green");



	if ($("#ctl00__eCat_tbECatCriteria")) {
			$("#ctl00__eCat_tbECatCriteria").select();
			$("#ctl00__eCat_tbECatCriteria").click(function () {
  				this.select();
  				return false;
			});
	}





}

