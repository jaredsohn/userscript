// ==UserScript==
// @name          Facebook Age
// @version       1
// @date          2009-12-03
// @description   Shows ages next to birthdates in profiles.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2009 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/63370.js?maxage=5
// @include       http*://*.facebook.com/*
// ==/UserScript==

// strings used in this script - may be useful for translation

var months = new Array();     // array of month names
months[1]  = 'January';
months[2]  = 'February';
months[3]  = 'March';
months[4]  = 'April';
months[5]  = 'May';
months[6]  = 'June';
months[7]  = 'July';
months[8]  = 'August';
months[9]  = 'September';
months[10] = 'October';
months[11] = 'November';
months[12] = 'December';
var birthdayStr = 'Birthday'; // the word 'Birthday', as used in the Facebook profile
var beforeAgeStr = 'age ';    // text to go before the age
var afterAgeStr = '';         // text to go after the age

// the actual code follows

var leftBox = document.getElementById('basic_info_summary_box');
if (leftBox) {
   var ageStr = addAge(leftBox);
}
var infoSection = document.getElementById('info_section_info_basic');
if (infoSection) {
   var ageStr = addAge(infoSection);
}

function addAge(theContainer) {
   var fields = theContainer.getElementsByTagName('dt');
   for (var i = 0; i < fields.length; i++) {
      if (fields[i].innerHTML.indexOf(birthdayStr) >= 0) {
         var birthdayContainer = fields[i].nextSibling;
         break;
      }
   }
   if (birthdayContainer) {
      if (ageStr) { // save the work of having to calculate the age multiple times
         birthdayContainer.innerHTML += ageStr;
      }
      else {
         var birthYear = birthdayContainer.innerHTML.match(/\d{4}/);
         if (birthYear) {
            var birthMonthWords = birthdayContainer.innerHTML.match(/\D+/) + '';
            if (birthMonthWords) {
               for (i = 1; i <= 12; i++) {
                  if (birthMonthWords.indexOf(months[i]) >= 0) {
                     var birthMonth = i;
                     break;
                  }
               }
               if (birthMonth) {
                  var birthDay = birthdayContainer.innerHTML.match(/\d{1,2}/); // I'm making the fatal assumption that the day always precedes the year
                  var now = new Date();
                  var currentYear = now.getFullYear();
                  var currentMonth = now.getMonth() + 1;
                  var currentDay = now.getDate();
                  // calculate age
                  if ( (currentMonth > birthMonth) || ( (currentMonth == birthMonth) && (currentDay >= birthDay) ) ) {
                     var age = currentYear - birthYear;
                  }
                  else {
                     var age = (currentYear - 1) - birthYear;
                  }
                  ageStr = ' (' + beforeAgeStr + age + afterAgeStr + ')';
                  birthdayContainer.innerHTML += ageStr;
                  return ageStr;
               }
            }
         }
      }
   }
}
