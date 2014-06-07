// ==UserScript==
// @name          Happy Birthday
// @namespace  http://nothing.ex
// @description   Google says you Happy Birthday
// ==/UserScript==

var f = new Date();
var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(); 

if (document.location.href == "http://www.google.es"){
if (fecha == "29/07/2011"){
document.getElementById('lga').innerHTML = '<img src="https://lh6.googleusercontent.com/-70AuzkB0qvU/TiheP4Y-kQI/AAAAAAAAAGY/COEE6n9GOTA/happybirthday.png" alt="Happy Birthday" />';
}
}