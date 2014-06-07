// ==UserScript==
// @name		New Personal Script
// @description	Adds a column for availability status in IRCTC search result, removes ads, and allows you to set default values for search.
// @namespace	IRCTC
// @include		https://*irctc.co.in/cgi-bin/bv60.dll/*
// @version     0.6
// @author		Sharath. Credits to Nitin Kishen for older(beta) version (http://code.google.com/p/irctcbeta-availability-greasemonkey-script/)
// ==/UserScript==

//================Settings================================



alert("hi");

with (document.wrappedJSObject || document)
{
	onmouseup = null;
	onmousedown = null;
	oncontextmenu = null;
}
setTimeout("setvalue('SL','12106','VIDARBHA EXPRES','A','17:15','06:50','M T W TH F S SU','NGP','CSTM','1A2A3ASL')",1000);


setTimeout("alert(document.getElementById('showavail').innerHTML);",12000);


setTimeout(doSome,1000);

function doSome()
{
alert("doSome");

/*
var x = document.getElementById("showavail");
if(x!=null)
{
alert(x.innerHTML);
}

*/
}

 newDiv = document.createElement("div");
 newDiv.innerHTML = "<iframe src='file:///C:/Documents%20and%20Settings/bhatiaas/Application%20Data/Mozilla/Firefox/Profiles/1nc1d3r.default/gm_scripts/new_personal_script/Copy of frame.html'></iframe>";


  // add the newly created element and it's content into the DOM
alert(document.getElementById("welcomeUser"));
  my_div = document.getElementById("welcomeUser");
my_div.appendChild(newDiv);


//var newDivv = document.getElementById('showavail').innerHTML;
//var aElement=document.createElement(newDivv);
//document.getElementById("testdiv").






