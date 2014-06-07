// ==UserScript==
// @name Google accounts auto sign in (submit form)
// @description Automatically sign in to google accounts
// @include https://www.google.com/a/SelectSession?service=lso&continue=https://accounts.google.com/o/oauth2/auth?scope%3Dhttps://www.googleapis.com/auth/calendar*
// @version 0.1
// ==/UserScript==

//add event listener to call my anonymous function after the page loads
window.addEventListener('load',
function() {

if ((document.getElementById("Email0").value == "EMAILADDRESSFORLOGIN") && (radio=document.evaluate('//input[@type="radio" and @name="selectedSession" and @value="0"]',document,null,9,null).singleNodeValue)) {
radio.checked = true;
document.getElementById("gaia_loginform").submit();

}, true);