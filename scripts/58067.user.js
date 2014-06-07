// ==UserScript==

// @name           Airline Manager Auto Start All Routes

// @namespace      http://www.facebook.com/mmmmmmelih
// @include        http://apps.facebook.com/airline_manager/route.php
// @include        http://apps.facebook.com/airline_manager/flight_all.php

// ==/UserScript==






//Seconds before next try, you can edit that
var secondsToRetry=9;


function ucur(){
	
	document.getElementById('app93673891404_frmbtn').click();
	
}

function dusur(){
	var yeniSaniye=document.getElementById('adammioldun').value;
	yeniSaniye--;
	
	document.getElementById('adammioldun').value=yeniSaniye;

}




if(window.location.href=='http://apps.facebook.com/airline_manager/flight_all.php')
{
	window.location.href='http://apps.facebook.com/airline_manager/route.php';
	
}else
{

	document.getElementById('app93673891404_frmdsp').style.display='block';
	document.getElementById('app93673891404_frmdsp').innerHTML="<input id=\"adammioldun\" value=\""+secondsToRetry+"\"> seconds to auto start all routes";
	var sure=document.getElementById('adammioldun').value*1000;
	var saniye=document.getElementById('adammioldun').value;


	for(i=saniye;i>0;i=i-1)
	{
		setTimeout(dusur,(saniye-i)*1000);
	}
	setTimeout(ucur,sure);
}

if(window.location.href!='http://apps.facebook.com/airline_manager/flight_all.php')
{
	window.location.href='http://apps.facebook.com/airline_manager/route.php';
	
}

else
{

	document.getElementById('app93673891404_frmdsp').style.display='block';
	document.getElementById('app93673891404_frmdsp').innerHTML="<input id=\"adammioldun\" value=\""+secondsToRetry+"\"> seconds to auto start all routes";
	var sure=document.getElementById('adammioldun').value*1000;
	var saniye=document.getElementById('adammioldun').value;


	for(i=saniye;i>0;i=i-1)
	{
		setTimeout(dusur,(saniye-i)*1000);
	}
	setTimeout(ucur,sure);
}
