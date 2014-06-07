// ==UserScript==
// @name           Salman
// @namespace      Salman
// @description    Salman
// @include        https://www.irctc.co.in/*
// ==/UserScript==






x = window.setInterval(function () { curPer() }, 100);


function curPer() {
var d=new Date();
var gid = document.getElementsByName("gatewayIDV");
if (gid.length == 0)
{
}
else
{
	if (d.getHours() == "7" && d.getMinutes() == "59" && d.getSeconds() == "40")
	{
		
			sbk = "setBank(11,0,1)";
	
		var i=0;
		for (i=0;i<=(gid.length-1);i++)
		{
			if(gid.item(i).attributes.item(1).value == sbk)
			{
				gid.item(i).click();
				break;
			}	
		}
	}

	
}


}