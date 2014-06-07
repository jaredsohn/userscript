// ==UserScript==
// @name          Tf2op Auto bumper!
// @namespace     Image.jpg.exe
// @include       http://www.tf2outpost.com/trade*
// ==/UserScript==

//Settings
//EndSettings

function Bot()
{
	if(document.getElementsByClassName("message error")[0] != undefined)
	{
		if(document.getElementsByClassName("message error")[0].childNodes[0].textContent.toLowerCase().indexOf("You must wait another".toLowerCase()) != -1)
		{
			window.location = "http://www.tf2outpost.com/trades";
		}
	}
	if(!Math.floor(Math.random()*25) && window.location == "http://www.tf2outpost.com/trades")
	{
		window.location = "http://www.tf2outpost.com/trades";
	}
	else
	{
		for(var i = 5; i < document.getElementsByClassName("tip").length; i++)
		{
			if(document.getElementsByClassName("tip")[i] != undefined)
			{
				if(document.getElementsByClassName("tip")[i].getAttribute("caption") == "Bump Trade")
				{
					document.getElementsByClassName("tip")[i].click();
				}
			}
			else
			{
				break;
			}
		}
	}
}


(document.onload = function Loop() {
    var rand = Math.floor((Math.random()*3000)+ 1000); 
    setTimeout(function() {
            Bot();
            Loop();  
    }, rand);
}());
