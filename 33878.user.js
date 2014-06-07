// ==UserScript==
// @name           New FB Age
// @description    Shows a person's age and sign on their Facebook profile using the New Facebook Layout.
// @include        http://new.facebook.com/profile.php?*
// @include        http://*.new.facebook.com/profile.php?*
// @include        http://facebook.com/profile.php?*
// @include        http://*.facebook.com/profile.php?*
// @author         Andrew Connor
// ==/UserScript==

// Last updated 09/17/2008
// Based off of script by Vaughan Chandler - "FB Age"


var info='';
var birthdayTD;
var bday = new Date();
var birthdayInfo

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

// Determine age, if possible.
birthdayDIV = getElementsByClass('birthday', document, '*')[0];
birthdayTD = birthdayDIV.getElementsByTagName('DD')[0];
var birthdayInfo = birthdayTD.innerHTML;  
var birthdaySplit = birthdayTD.innerHTML.split(',');
var monthDay = birthdaySplit[0];
try {
	var year = birthdaySplit[1];
	bday.setTime(Date.parse(birthdayInfo));
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

	var ageSpan = document.createElement('DD');
	ageSpan.innerHTML = info;
	birthdayDIV.appendChild(ageSpan);		