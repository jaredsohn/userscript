// ==UserScript==
// @name           TurboShare
// @namespace      http://userscripts.org/users/42897
// @description    turboshare.com auto download
// @include        http://*turboshare.com/*
// ==/UserScript==

function getTime()
{
	var dTime = new Date();
	var hours = dTime.getHours();
	var minute = dTime.getMinutes();
	var seconds = dTime.getSeconds();
	var period = "AM";

if (hours > 12)
	{
		period = "PM"
	}

else 
{
	period = "AM";
}

	hours = ((hours > 12) ? hours - 12 : hours)
	return hours + ":" + minute + ":" + seconds + " " + period
}


function my_main()
{
	//document.getElementsByTagName("head")[0].innerHTML=content;
	//document.getElementById("countdown_str").style.display='none';
	
	var x="";
	var count=0;
	
	x=document.getElementsByName("method_free")[0];
	if(x){ 
		x.click();
	}
	
	x="";
	x=document.getElementById("btn_download");
	if(x){
		x.disabled=false;
	}
	
	count++;
	document.title="["+count+"] "+getTime();
	window.setTimeout(function() {x="";x=document.getElementsByName("F1")[0];if(x){x.submit();} }, 30000);
		
}

//window.addEventListener('load',my_main,true);
my_main();