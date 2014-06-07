// ==UserScript==
// @name           Infinityward/Call of Duty Age Gate Skip
// @namespace      Kastro
// @description    Skip past the Infinityward and Call of Duty Age Gate requirement by auto-filling in an age of 1-1-1990.
// @include        http://www.infinityward.com/agegate.php
// @include        http://infinityward.com/agegate.php
// @include        http://www.callofduty.com
// ==/UserScript==


var month = 1;
var day = 1;
var year = 1990;
  if (location.href == "http://www.infinityward.com/agegate.php" || location.href == "http://infinityward.com/agegate.php") {
 document.getElementById("month").value = month; // Month Fill In
 document.getElementById("day").value = day; // Day Fill In
 document.getElementById("year").value = year; // Year Fill in
 
 document.getElementsByTagName("input")[3].click(); }

  else {
  var info = document.getElementById("age");
  info.value = "18"; // Auto-fill Age to 18 (minimum required age)
  document.getElementsByTagName("input")[3].click();
 }