//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           connection recorder
// @namespace      http://*.ogame.fr/game/index.php?page=buddy&*
// @description   
// @include        http://*.ogame.fr/game/index.php?page=buddy&*
// ==/UserScript==

//Sending the request to the recorder
var xhr_object = null; 

if(window.XMLHttpRequest) // Firefox 
	xhr_object = new XMLHttpRequest(); 
else { 
	alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
	return; 
} 

function addRegister(xhr_object, player_state_case)
{
	xhr_object.onreadystatechange = function()
	{
		if(xhr_object.readyState == 4)
		{
			player_state_case.innerHTML += " <span style='color:yellow'>[Logged]</span>";
		}
	}
}

if (xhr_object)
{
	var current_date = new Date();
	var date_string = current_date.toLocaleString();
	var trs = document.getElementById("content").getElementsByTagName("tr");
	var url = "http://developpementphp.free.fr/ogame/watcher.php?";

	for (var i = 0; i < trs.length; ++i)
	{
		ths = trs[i].getElementsByTagName("th");
		if (ths && ths.length == 6 && ths[5].innerHTML.indexOf("Effacer"))
		{
			player = ths[1].getElementsByTagName("a")[0].innerHTML;
			player_state_case = ths[4].getElementsByTagName("font")[0];
			player_state = player_state_case.innerHTML;
			register_url = url + "&type=record&player="+player+"&player_state="+player_state+"&date="+date_string;
			xhr_object.open("GET", register_url, true);
			addRegister(xhr_object, player_state_case);
			xhr_object.send(null);
		}
		
	}
}

