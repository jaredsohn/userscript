// ==UserScript==
// @name       Form fill in
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Fill in form on Airservices NAIPS, change the codes to change the airports
// @match      https://www.airservicesaustralia.com/naips/Briefing/SpecialMetBriefing
// @copyright  Andrew Willersdorf
// ==/UserScript==

// set your airports/areas
var loc1  = 'AREA20';
var loc2  = 'YSTW';
var loc3  = 'YARM';
var loc4 = 'YQDI';
var checked = '1';

// fill in form
document.getElementById('Location1').value = loc1;
document.getElementById('Location2').value = loc2;
document.getElementById('Location3').value = loc3;
document.getElementById('Location4').value = loc4;
document.getElementById('SelectedMetTypes_0').checked = checked;
document.getElementById('SelectedMetTypes_4').checked = checked;
document.getElementById('SelectedMetTypes_5').checked = checked;
document.getElementById('SelectedMetTypes_7').checked = checked;

document.getElementById('btnSubmit').click();