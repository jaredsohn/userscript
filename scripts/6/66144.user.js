// ==UserScript==
// @name           RS Days Left
// @namespace      rapidshare
// @include        *rapidshare.com/*
// ==/UserScript==

var expdd = document.getElementById('p1').childNodes[1].childNodes[1].childNodes[0].childNodes[5].childNodes[0];
var todaydd = document.getElementById('p1').childNodes[1].childNodes[1].childNodes[2].childNodes[5].childNodes[0];

		//Convert expdd to Date
var expDate = expdd.innerHTML.split(" ")[1];
expDate = expDate.split(".")[0];

var expMonth = expdd.innerHTML.split(" ")[2];
  var toreplace = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  var withthis = ["1","2","3","4","5","6","7","8","9","10","11","12"];

  for (var i=0; i<toreplace.length; i++) {
     expMonth = expMonth.replace(toreplace[i], withthis[i]);
  }

var expYear = expdd.innerHTML.split(" ")[3];

var expD = new Date(expYear,expMonth-1,expDate);

		//Convert todaydd toDate
var todayDate = todaydd.innerHTML.split(".")[0];
var todayMonth = todaydd.innerHTML.split(".")[1];
var todayYear = todaydd.innerHTML.split(".")[2];
todayYear = todayYear.split(" ")[0];

var todayD = new Date(todayYear,todayMonth-1,todayDate);

	//Days left on the account
var days = (expD - todayD)/(1000*60*60*24);	
var daytext = "days";
if(days==1)
{
	daytext = "day";
}

var append = ' (' + days + ' ' + daytext + ')';

expdd.innerHTML = expdd.innerHTML + append;


//Fixes alignment of the row below
todaydd2 = document.getElementById('p1').childNodes[1].childNodes[1].childNodes[2].childNodes[5];
todaydd2.setAttribute('align', 'right');