// ==UserScript==
// @name          Tf2op Auto show notes!
// @namespace     
// @include       http://www.tf2outpost.com/*
// ==/UserScript==

//Settings
//EndSettings

function Bot()
{
		for(var i = 5; i < document.getElementsByClassName("tip").length; i++)
		{
            var Tip = document.getElementsByClassName("tip")[i];
			if(Tip != undefined)
			{
				if(Tip.getAttribute("caption") == "Show Notes")
				{
					Tip.click();   
                    Tip.parentNode.removeChild(Tip);
				}
			}
			else
			{
				break;
			}
		}	
    
}



document.onload = Bot();
