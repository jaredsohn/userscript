// ==UserScript==
// @name       NMC Moodle Login P1
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  Bookmarklet that logs you into the NMC moodle site
// @match      https://elearn.nmc.edu
// @copyright  2014+, Evanjs
// rewrote search function, should now work in Firefox, unsure about NinjaKit, will test shortly
// ==/UserScript==
x = document.getElementsByClassName('profilename')[0].textContent;
y = 'Click Here To Log In';
if (x.search(y) > 0) {window.location.href = "https://elearn.nmc.edu/login/index.php"};