/*
 * 10bis Enhanced User Report
 * A simple Greasemonkey user script
 * version 1.0
 * October 2013
 * Copyright (c) 2013, Eran Egozi
 * 
 * -------------------------------------------------------
 */

// ==UserScript==
// @name        10bis Enhanced User Report
// @namespace   https://www.10bis.co.il/
// @description Enhanced User Report
// @include     https://www.10bis.co.il/Account/UserReport
// @grant       none
// ==/UserScript==



/*
 * Variables
 * You may change these according to your status.
 */
var cardValue = 800 // The real card value.
var vacation = 0 // The remaining vacation days this month.



/*
 * Code
 */
var totalDays = 0; // Number of total work days this month.
var days = 0; // Number of remaining work days this month.

// Calculate work days.
var today = new Date();
var dayIterator = new Date(today.getFullYear(), today.getMonth(), 1);
while (today.getMonth() == dayIterator.getMonth()) {
    // If day is from Sunday to Thursday
	if(dayIterator.getDay() < 5) {
        totalDays++;
        if(dayIterator.getDate() > today.getDate()){
            days++;
        }
    }
    dayIterator.setDate(dayIterator.getDate()+1);
}

// Remove vacation days.
totalDays -= vacation;
days -= vacation;

// Add another row.
var row = $('.totalsFieldNameTh:eq(0)').parent();
row.before('<tr>' + row.html() + '</tr>');

// Calculate values.
var fieldName = $('.totalsFieldNameTh');
var fieldValue = $('.totalsFieldValueTh');
var extendedCardValue = parseFloat(fieldValue[5].innerHTML.trim().slice(2,-3).replace(',',''));
var remaining = (parseFloat(fieldValue[3].innerHTML.trim().substr(2).replace(',','')) - extendedCardValue + cardValue);
var avg = (remaining / days).toPrecision(4);
var used = parseFloat(fieldValue[7].innerHTML.trim().substr(2).replace(',',''))

// Change labels.
$(fieldName[0]).html("יתרה יומית ממוצעת :");
$(fieldName[1]).html("יתרת ימי עבודה החודש :");
$(fieldName[2]).html("מספר ימי עבודה החודש :");
$(fieldName[8]).html("מסגרת יומית ממוצעת :");

// Change values.
$(fieldValue[0]).html('₪ ' + avg);
$(fieldValue[1]).html(days);
$(fieldValue[2]).html(totalDays);
$(fieldValue[3]).html('₪ ' + remaining);
$(fieldValue[5]).html('(' + fieldValue[5].innerHTML.trim().slice(0,-3) + ') ₪ ' + cardValue);
$(fieldValue[6]).html('₪ ' + (avg - used).toPrecision(4));
$(fieldValue[8]).html('₪ ' + (cardValue / totalDays).toPrecision(4));