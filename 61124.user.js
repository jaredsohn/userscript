// ==UserScript==
// @name          Wheeler School ClassZone AutoLogin
// @namespace     http://www.classzone.com/cz/login.htm
// @description	  Automatically login to ClassZone
// @include       http://www.classzone.com/cz/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

(function() {
var Username="wheelerschool";
var Password="maryc2010";
document.getElementById("toplinks").style.display = 'none';
//document.getElementById("toplinks").innerHTML='<div align="center"><input maxlength="49" type="text" id="wheeleruser" value=""><input maxlength="49" type="text" id="wheelerpassword" value=""></div>';
document.getElementsByName("username")[0].value=Username;
document.getElementsByName("password")[0].value=Password;
})();