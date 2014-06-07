// ==UserScript==
// @name           Select-date
// @namespace      net.rajeshsoni
// @description    Auto-Select from and to date in HDFC (Updated April 2013)
// @include        https://netbanking.hdfcbank.com/netbanking/entry
// ==/UserScript==

// Rajesh Soni  (rajeshgsoni@gmail.com)
// http://rajeshsoni.net


if( window.frames[2].document.body.innerHTML.match("View / Download Account Statement") )
{

	window.frames[2].document.forms[0]["selAcct"].value = window.frames[2].document.forms[0]["selAcct"].options[1].value

	var d = new Date();

	var monthIndex = "1";
	var lastDay = d.getDate();

	if( d.getMonth() < 10 )
	monthIndex = "0" + (d.getMonth() + 1);
	else
	monthIndex = (d.getMonth() + 1);


	window.frames[2].document.forms[0]["yearfldFromDate"].value=d.getFullYear()
	window.frames[2].document.forms[0]["yearfldToDate"].value=d.getFullYear()
	window.frames[2].document.forms[0]["monthfldFromDate"].value= monthIndex ;
	window.frames[2].document.forms[0]["monthfldToDate"].value= monthIndex;
	window.frames[2].document.forms[0]["datefldFromDate"].value="01";
	window.frames[2].document.forms[0]["datefldToDate"].value= lastDay ;

}