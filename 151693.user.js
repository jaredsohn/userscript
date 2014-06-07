// ==UserScript==
// @name          Tf2lobby alert
// @namespace     WhySoMad.com
// @include       http://tf2lobby.com/
// ==/UserScript==

//document.getElementsByClassName("lobbyLink").length //Gets number of open lobbys
//document.getElementsByClassName("players")[i].textContent //Gets players of i lobby
//document.getElementsByClassName("map")[i].textContent //Gets map of i lobby
//alert(document.getElementsByClassName("region")[0].getAttribute('src')); ///img/flags/NA.png  /img/flags/EU.png
//alert(document.getElementsByClassName("title")[0].textContent);
//alert(document.getElementsByClassName("players")[0].textContent.split("/")[1]);


CrateTable();
//settings
var PlayerNumber = document.getElementById("PlayerCount").value; //alerts when you a new lobby with max players of PlayerNumber pops up. 0 = any amount, 12 = 6v6, 18 = 9v9, ect.
var Location = document.getElementById("Location").value; //Alerts only on lobby with this locaion, 0 = anywhere, 1 = NA only, 2 = EU only
var Map = document.getElementById("Map").value;
//END settings
var array = new Array();
var FirstRun = 0;
var FlashTrack = 0;
var hook;

function Bot()
{
    for(i = 0; i < document.getElementsByClassName("lobbyLink").length; i++)
    {
        if(!(SearchArray(document.getElementsByClassName("title")[i].textContent)))
        {
			array.push(document.getElementsByClassName("title")[i].textContent);
			if(PlayerNumber == 0 || PlayerNumber == parseInt(document.getElementsByClassName("players")[i].textContent.split("/")[1]))
			{
				if(Location == 0 || (Location == 1 && document.getElementsByClassName("region")[i].getAttribute('src') == "/img/flags/NA.png") || (Location == 2 && document.getElementsByClassName("region")[i].getAttribute('src') == "/img/flags/EU.png"))
				{
					if(Map == "" || document.getElementsByClassName("map")[i].textContent.toLowerCase().indexOf(Map.toLowerCase()) != -1)
					{
						window.focus();
						if(document.getElementById("Sound").checked)
						{
							playSound();
						}
						if(document.getElementById("Alert").checked)
						{
							alert("New lobby detected!");
						}
						if(document.getElementById("PageTitle").checked)
						{
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 1000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 2000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 3000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 4000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 5000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 6000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 7000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 8000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 9000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 10000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 11000);
							setTimeout(function(){SwitchTitle("New lobby detected!");}, 12000);
						}
					}
				}
			}
        }
    }
    CleanArray();
}

function SwitchTitle(newMsg)
{
	var original = "Team Fortress 2 Lobby";
	document.title = (document.title == original) ? newMsg : original;
}

function SearchArray(string)
{
    for(x = 0; x < array.length; x++)
    {
        if(document.getElementsByClassName("title")[x].textContent == string)
        {
            return true;
        }
    }
    return false;
}

function playSound()
{
	document.getElementById('dummy').innerHTML="<embed src =\"http://www.soundjay.com/button/sounds/button-2.mp3\" hidden = 'true' autostart = 'true'>";
}

function CleanArray()
{
    var flag;
    for(x = 0; x < array.length; x++)
    {
        flag = 0;
        for(i = 0; i < document.getElementsByClassName("lobbyLink").length; i++)
        {
            if(array[x] == document.getElementsByClassName("title")[i].textContent)
            {
                flag = 1;
            }
        }
        if(flag == 0)
        {
            array.splice(x, 1);
        }
    }
}

function CrateTable()
{
	var Head = document.createElement('script');
	var Target = document.getElementsByTagName('head')[0];
	Head.innerHTML = "function switchMenu(obj){var ele = document.getElementById(obj);if ( ele.style.display != \"none\"){ele.style.display = 'none';}else{ele.style.display = '';}}";
	Target.appendChild(Head);
	
	var table = document.createElement('div');
	table.setAttribute('id', "table");
	table.innerHTML =" <span id=\"dummy\"></span> <br/><br/><b><span onclick=\"switchMenu('settings')\"> Alert script settings</span></b><div id = 'settings'><br/><table><tr><td>Max player count</td><td><input type='text' id='PlayerCount' value = 0></td></tr><tr><td>Location</td><td><input type='text' id='Location' value = 0></td></tr><tr><td>Map</td><td><input type='text' id='Map'></td></tr></table>Sound <input type='checkbox' id = 'Sound'>  AlertBox <input type='checkbox' id = 'Alert'>  ChangePageTitle <input type='checkbox' id = 'PageTitle'></div><br /><span onclick=\"switchMenu('Instructions')\"><b>Instructions</b></span><br /><br /><div id = 'Instructions' style=\"width:450px; \">Maximum players alerts you when a new lobby with set max players is made. 0 = any amount, 12 = 6v6, 18 = 9v9.<br/ ><br />Location alerts only on lobby with set location 0 = anywhere, 1 = NA only, 2 = EU only <br /><br /> Map alerts only on typed map. This searches through the map name for a match so bad would match up with badwater. <br /><br /> Sound, Alertbox, and ChangePageTitle are the different ways you could be alerted check them to turn them on.</div>";
	var that = document.getElementById("header");
	that.appendChild(table);
}


(document.onload = function Loop() {
    var rand = Math.floor((Math.random()*3000)+ 1000); 
    setTimeout(function() {
			/*if(document.getElementsByClassName("lobbyLink").length != 0)
			{
				if(FirstRun == 0)
				{
					FirstRun = 1;
					for(i = 0; i < document.getElementsByClassName("lobbyLink").length; i++)
					{
						array.push(document.getElementsByClassName("title")[i].textContent);
					}
				}*/
				Location = document.getElementById("Location").value;
				PlayerNumber = document.getElementById("PlayerCount").value;
				Map = document.getElementById("Map").value;
				Bot();
				Loop(); 
			//}
    }, rand);
}());