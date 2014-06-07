// ==UserScript==
// @name          Remove W3Schools Advertisements
// @namespace     http://ap3x.us/scripts
// @description   Removes annoying advertisements on W3Schools.org. Great when trying to focus on learning a coding language. WARNING:: THIS SCRIPT DOESNT WORK. I USED JQUERY AND I JUST FOUND OUT IT'S NOT SUPPORTED. I'LL WORK TO CORRECT THIS.
// @include       http://www.w3schools.org/*
// @include       http://www.w3schools.org/
// @exclude       http://www.example.org/foo
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(document).ready(function() {
$("[style='width:890px;height:94px;position:relative;margin-left:auto;margin-right:auto;margin:0px;padding:0px;overflow:hidden']").toggle();
$("td#rightcolumn").toggle();
$("[style='background-color:#ffffff;color:#000000;padding-bottom:8px;padding-right:5px']").css("width","729px");
});