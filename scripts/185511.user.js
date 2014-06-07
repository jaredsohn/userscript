// ==UserScript==
// @name     ELSaver
// @include  http://*.earthlost.de/defense*
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

var fe = trimRess(document.getElementById("res12").innerHTML);
var ti = trimRess(document.getElementById("res22").innerHTML);
var wa = trimRess(document.getElementById("res32").innerHTML);
var h2 = trimRess(document.getElementById("res42").innerHTML);
var na = trimRess(document.getElementById("res52").innerHTML);

var impuls = {
	fe:4000,
	ti:800,
	wa:4200,
	h2:420,
	na:4200,
	count:0
}

var raks = {
	fe:10000,
	ti:5000,
	wa:0,
	h2:0,
	na:0,
	count:0
}

var plas = {
	fe:40000,
	ti:250000,
	wa:0,
	h2:0,
	na:0,
	count:0
}


// save NaWa

if(na < wa)
	impuls.count = na / impuls.na;
else
	impuls.count = wa / impuls.wa;

fe = fe - impuls.fe*impuls.count;
ti = ti - impuls.ti*impuls.count;
wa = wa - impuls.wa*impuls.count;
h2 = h2 - impuls.h2*impuls.count;
na = na - impuls.na*impuls.count;


// save ress

var T1Fe = raks.fe;
var T1Ti = raks.ti;

var T2Fe = plas.fe;
var T2Ti = plas.ti;

var x1;
var x2;


var z = T1Ti/T1Fe;

T1Ti = T1Ti - z*T1Fe;

T2Ti = T2Ti - z*T2Fe;

ti = ti - z*fe;

x2 = ti/T2Ti;

x1 = (fe - (T2Fe*x2)) / T1Fe;


raks.count = x1;
plas.count = x2;

// getByNames(s0) = impuls
// getByNames(s5) = raks
// getByNames(s6) = plas

if (document.getElementById("speedselect").value == 100) 
{
	// 100%
	if(document.getElementsByName("s5").length == 1)
	{
		document.getElementsByName("s5")[0].value = raks.count;
	}
	if(document.getElementsByName("s6").length == 1)
	{
		document.getElementsByName("s6")[0].value = plas.count;
	}
}
else if (document.getElementById("speedselect").value == 200)
{
	if(document.getElementsByName("s0").length == 1)
	{
		document.getElementsByName("s0")[0].value = impuls.count;
	}
}
document.getElementsByName("s0")[0].focus();


function trimRess(ress)
{
	var n = ress.search("&");
	ress = ress.substring(0,n);
	ress = ress.split('.').join('');
	return ress;
}