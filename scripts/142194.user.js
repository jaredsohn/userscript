// ==UserScript==
// @name        Googler Reader Make Better
// @namespace   http://www.userscripts.org/users/intangible
// @description Just a little CSS cleanup, remove the overview, explore, and fix the search area size
// @include     http://www.google.com/reader/*
// @include     https://www.google.com/reader/*
// @version     1
// ==/UserScript==

//Overview Section
document.getElementById('home-section').style.display = 'none';
//Explore Recommendations Section
document.getElementById('lhn-recommendations').style.display = 'none';

//Get rid of the logo and make the sub section better
document.getElementById('logo-section').style.display = 'none';
document.getElementById('lhn-add-subscription-section').style.top = '0px';
document.getElementById('lhn-add-subscription-section').style.height = '43px';
document.getElementById('lhn-add-subscription-section').style.borderBottom = '1px solid rgb(235, 235, 235)';
document.getElementById('lhn-add-subscription').style.top = '50%';
document.getElementById('lhn-add-subscription').style.height = '27px';

//Google Plus Crap
document.getElementById('gb').style.height = '70px';
document.getElementById('gbq').style.height = '24px';
document.getElementById('gbq2').style.paddingTop = '8px';
document.getElementById('gbu').style.paddingTop = '8px';
document.getElementById('gbqlw').style.height = '45px';
document.getElementById('gbx1').style.top = '24px';
document.getElementById('gbx1').style.height = '48px';
document.getElementById('gbbw').style.top = '70px';


