// ==UserScript==
// @name           Google Analytics - Include Today
// @author         Storm Consultancy
// @description    Include today in Google Analytic's default date
// @include        https://www.google.com/analytics/reporting*
// ==/UserScript==

// Function to add days to a date, use negative number to subtract
function addDays(myDate,days) {
  return new Date(myDate.getTime() + days*24*60*60*1000);
}

// Redirect the user to the new URL
function Redirect(newDateRange){
	//Only inject the new param is it's not in the querystring already  
	if(window.location.href.indexOf('&pdr') < 0){
		window.location.href += '&pdr=' + newDateRange;
	}
	else if(document.referrer.indexOf('https://www.google.com/analytics/settings/') >= 0){
		// If the referrer in the main page, then it already sets the date 
		// range we dont want. so we need to replace it
		var url = window.location.href.replace(/pdr=[0-9]{8}\-[0-9]{8}/, 'pdr=' + newDateRange)
		window.location.href = url;
	}
}

// Build an array of the date components, formatted for the querystring
function BuildDates(date){
	var array = new Array();
	array['day'] = (date.getDate() < 10) ? 
						'0' + date.getDate().toString() : 
						date.getDate().toString();
						
	array['month'] = (date.getMonth() < 9) ? 
						'0' + (date.getMonth()+1).toString() : 
						(date.getMonth()+1).toString();
						
	array['year'] = date.getFullYear().toString();
	return array;
}
 
var dateToday = new Date(); 
var today = BuildDates(dateToday);
var past  = BuildDates(addDays(dateToday, -30));
 
var dateRange = past['year'] + past['month'] + past['day'] + '-' + today['year'] + today['month'] + today['day'];  

Redirect(dateRange);
