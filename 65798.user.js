// Elance Proposal Calc
// Version 1.1 BETA
// 2010-01-06
// Copyright (c) 2010, thinkingparts.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Domains By Volume", and click Uninstall.
//
//-----------------------------------------------------------------------
//
// ==UserScript==
// @name           Elance Proposal Calc
// @namespace      http://www.thinkingparts.com/greasemonkey/scripts
// @description    Auto calculates Proposal Amount for selected Approximate Delivery Date
// @include        http://www.elance.com/c/rfp/main/rfpBid*
// ==/UserScript==


//Global Configuration, modify following as applicable

//hourly rates
var hrRate=5;
//working hours per day
var hrsPerDay=8;
//total working days per week
var workDaysPerWeek=7;
//total working days per month
var workDaysPerMonth=30;
//elance processing fees
var processFee=8.57;


function deliveryCodeChange(){
	var totalDays=0;
	var amount = document.evaluate("//input[@name='amount']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (amount.snapshotLength == 1){
		if(this.value == '13001'){
			totalDays=1;
		}else if(this.value == '13002'){
			totalDays=3;
		}else if(this.value == '13003'){
			totalDays=1*workDaysPerWeek;
		}else if(this.value == '13010'){
			totalDays=2*workDaysPerWeek;
		}else if(this.value == '13011'){
			totalDays=3*workDaysPerWeek;
		}else if(this.value == '13004'){
			totalDays=workDaysPerMonth;
		}else if(this.value == '13012'){
			totalDays=workDaysPerMonth*2;
		}else if(this.value == '13005'){
			totalDays=workDaysPerMonth*3;
		}else if(this.value == '13006'){
			totalDays=workDaysPerMonth*6;
		}	
		var cost = (totalDays*hrsPerDay)*hrRate;
		var fees = (cost*processFee)/100;
		var finalAmount = cost+fees;
		amount.snapshotItem(0).value = Math.round(finalAmount);
	}
}

var deliveryCode = document.evaluate("//select[@name='delivery_code_id']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (deliveryCode.snapshotLength == 1){
	deliveryCode.snapshotItem(0).addEventListener("change", deliveryCodeChange, true);
}