// ==UserScript==
// @name           Airline Manager Auto Start All Routes
// @namespace      http://apps.facebook.com/airline_manager/users.php?uID=689043403
// @include        http://apps.facebook.com/airline_manager/route.php
// @include        http://apps.facebook.com/airline_manager/flight_all.php
// ==/UserScript==
var secondsToRetry = 150;	//Seconds before next try
var secondsToGo = secondsToRetry;
if(window.location.href == 'http://apps.facebook.com/airline_manager/flight_all.php') 
{
	window.location.href = 'http://apps.facebook.com/airline_manager/route.php';
}
else
{
	var app93673891404_frmdsp = document.getElementById('app93673891404_frmdsp');
	app93673891404_frmdsp.style.display = 'block';
	app93673891404_frmdsp.innerHTML = "<nobr><input id=\"secondsToGo\" value=\""+secondsToGo+"\" size=\"5\">&nbsp;seconds&nbsp;to&nbsp;auto&nbsp;start&nbsp;all&nbsp;routes</nobr>";
	var miliSecondsToGo = secondsToGo * 1000;
	for(i=secondsToGo; i>0; i--)
		setTimeout(function(){document.getElementById('secondsToGo').value=--secondsToGo;}, miliSecondsToGo-(1000*i));
	setTimeout(function(){document.getElementById('app93673891404_frmbtn').click();}, miliSecondsToGo);
}
