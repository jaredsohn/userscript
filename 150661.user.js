// ==UserScript==
// @name           Google Analytics - Include Today
// @author         Storm Consultancy & jibiel
// @description    Include today in Google Analytics' default date range
// @include        https://www.google.com/analytics/web/*
// @version		   1.1
// ==/UserScript==

// Function to add days to a date, use negative number to subtract
function addDays(myDate,days) {
  return new Date(myDate.getTime() + days*24*60*60*1000);
}
 
// Redirect the user to the new URL
function Redirect(){
  // This regex may have to be changed in the future alongside with Analytics update
  var re = /^https:\/\/www\.google\.com\/analytics\/web\/.*#report\/[a-z-]+\/[a-z0-9]{27}\/$/;

  // Expand date range only on _report_ pages and only if custom date range hasn't been already set
  if (re.test(window.location.href)) { 
    var dateToday = new Date();
    var today = BuildDates(dateToday);
    var past  = BuildDates(addDays(dateToday, -31));
     
    var newDateRange = '%3F_.date00%3D' + past['year'] + past['month'] + past['day'] +
                       '%26_.date01%3D' + today['year'] + today['month'] + today['day'];

    window.location.href += newDateRange;
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

window.onhashchange = function () {
  Redirect();
}

Redirect();