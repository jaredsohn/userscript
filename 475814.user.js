// ==UserScript==
// @name        D2LLogin
// @namespace   com.deptuck.connor
// @description Login to D2L
// @include     http://d2l.cbe.ab.ca/
// @include     https://d2l.cbe.ab.ca/
// @include     http://d2l.cbe.ab.ca/index.asp*
// @include     https://d2l.cbe.ab.ca/index.asp*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementsByName("userName")[0].value = "<student_id>";
document.getElementsByName("password")[0].value = "<password>";
document.getElementsByName("processLogonForm")[0].submit();