// ==UserScript==
// @name           Repareer alles (Schuur, Garage, Hangaar)
// @namespace      Repareer alles (Schuur, Garage, Hangaar)
// @include        http://www.gangcity.nl/*
// @ author		Daylight (Jordy Kroeze)
// ==/UserScript==

// begin repareer alles in schuur.
if (window.location.pathname == '/schuur.php') {
var link = document.getElementsByTagName('tbody')[1];
var alles = document.body.innerHTML;

var i=1;
for (i=1;i<=500;i++)
{
var link2 = link.rows[i].cells[0].textContent;
var link3 = '<iframe frameborder="0" heigth="1" width="1" src="http://www.gangcity.nl/schuur.php?repair=' + link2 + '></iframe>';
document.body.innerHTML = alles + link3;
}
}

// begin repareer alles in garage.
if (window.location.pathname == '/garage.php') {
var link = document.getElementsByTagName('tbody')[1];
var alles = document.body.innerHTML;

var i=1;
for (i=1;i<=500;i++)
{
var link2 = link.rows[i].cells[0].textContent;
var link3 = '<iframe frameborder="0" heigth="1" width="1" src="http://www.gangcity.nl/garage.php?repair=' + link2 + '></iframe>';
document.body.innerHTML = alles + link3;
}
}

// begin repareer alles in hangaar.
if (window.location.pathname == '/hangaar.php') {
var link = document.getElementsByTagName('tbody')[1];
var alles = document.body.innerHTML;

var i=1;
for (i=1;i<=500;i++)
{
var link2 = link.rows[i].cells[0].textContent;
var link3 = '<iframe frameborder="0" heigth="1" width="1" src="http://www.gangcity.nl/hangaar.php?repair=' + link2 + '></iframe>';
document.body.innerHTML = alles + link3;
}
}

// Repareer alles script.
// Gemaakt door Daylight (Jordy Kroeze)