// ==UserScript==
// @name           FB Age
// @namespace      http://userscripts.org/people/14536
// @description    Shows a person's age and sign on their Facebook profile.
// @include        http://facebook.com/profile.php?*
// @include        http://*.facebook.com/profile.php?*
// @author         Vaughan Chandler
// ==/UserScript==

// Last updated 2008-03-02


var info='';
var birthdayTD;
var bday = new Date();

// Determine age, if possible.
birthdayTD = document.getElementById('Birthday').getElementsByTagName('td')[1];
var monthDay = birthdayTD.getElementsByTagName('a')[0].innerHTML;
try {
	var year = birthdayTD.getElementsByTagName('a')[1].innerHTML;
	bday.setTime(Date.parse(monthDay+', '+year));
	var now = new Date();
	var age = now.getFullYear()-bday.getFullYear();
	if (now.getMonth()<bday.getMonth()) { age-=1; }
	else if (now.getMonth()==bday.getMonth() && now.getDate()<bday.getDate()) { age-=1; }
	info = age+' years old';
} catch(x) {
	bday.setTime(Date.parse(monthDay+', 2007'));
}

// Determine sign.
var signs = new Array("Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius");
var endDates = new Array(19,18,20,19,20,21,22,22,22,22,21,21);
var m = bday.getMonth();
var d = bday.getDate();
var sign = m;
if (d>endDates[m]) { sign = (sign + 1) % 12; }
info = (info=='' ? '' : info+', ') + signs[sign];

// Show age/sign.
if (info!='') {
	var ageSpan = document.createElement('span');
	ageSpan.innerHTML = info;
	birthdayTD.appendChild(ageSpan);		
}