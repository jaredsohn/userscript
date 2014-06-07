// ==UserScript==
// @name           PSU Club Sports: Safety Officers
// @namespace      http://paul.rentschler.ws
// @description    Highlights current, expired, and about to expire safety officers
// @include        http://www.athletics.psu.edu/recreation/safetyofficer.asp*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==


// define the color codes
var almostExpired = '#FFFF99';
var almostExpiredCell = '#FFFF00';
var expired = '#FF9999';
var expiredCell = '#FF6666';

// define today
var today = new Date();

// define the almost expired date
var almostExpiredDate = new Date();
almostExpiredDate.setDate( today.getDate() + 45 );

// get rid of the borders on the table
$("table table td.newsarticle table td.newsarticle table").css('border-collapse', 'collapse').css('border', '0');

// color code the rows
var i = 0;
$("table table td.newsarticle table td.newsarticle table tr").each( function () {
  if (i == 0) {
    // color code the headers
    $(this).css('background-color', '#000099').css('color', '#FFFFFF');
  } else {
    // find the various dates
    var firstAid = new Date( $(this).find("td").eq(1).find("div").html() );
    var cpr = new Date( $(this).find("td").eq(2).find("div").html() );
    var aed = new Date( $(this).find("td").eq(3).find("div").html() );
    var form = new Date( $(this).find("td").eq(4).find("div").html() );
    
    // mark those who have expired
    if (firstAid < today || cpr < today || aed < today || form < today) {
      $(this).css('background-color', expired);
      
      // mark the individual offending cells
      if (firstAid < today) {
        $(this).find("td").eq(1).css('background-color', expiredCell);
      }
      if (cpr < today) {
        $(this).find("td").eq(2).css('background-color', expiredCell);
      }
      if (aed < today) {
        $(this).find("td").eq(3).css('background-color', expiredCell);
      }
      if (form < today) {
        $(this).find("td").eq(4).css('background-color', expiredCell);
      }
      
    // mark those who are about to expire
    } else if (firstAid < almostExpiredDate || cpr < almostExpiredDate || aed < almostExpiredDate || form < almostExpiredDate) {
      $(this).css('background-color', almostExpired);

      // mark the individual offending cells
      if (firstAid < almostExpiredDate) {
        $(this).find("td").eq(1).css('background-color', almostExpiredCell);
      }
      if (cpr < almostExpiredDate) {
        $(this).find("td").eq(2).css('background-color', almostExpiredCell);
      }
      if (aed < almostExpiredDate) {
        $(this).find("td").eq(3).css('background-color', almostExpiredCell);
      }
      if (form < almostExpiredDate) {
        $(this).find("td").eq(4).css('background-color', almostExpiredCell);
      }
    }
  }
  i += 1;

});
