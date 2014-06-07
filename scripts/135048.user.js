// ==UserScript==
// @name        Clicktools - Remove Print Question Options
// @namespace   http://diveintogreasemonkey.org/download/helloworld.user.js
// @description Remove the question options in survey print view
// @include     https://sandbox.clicktools.com/dashboard/popups/printindividual*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function() {  
  $('.ct_qtable_picklist .tdquestion_alt').hide();
  $('.ct_qtable_multidrop .tdquestion_alt').hide();
  $('.ct_qtable_drop .tdquestion_alt').hide();
});

