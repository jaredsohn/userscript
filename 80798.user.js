// ==UserScript==
// @name           [DinoRPG] Collector of Missions
// @namespace      DinoRPG
// @description    This script will show additional tab for your dinno showing which missions you've completed and which not.
// @include        http://*.dinorpg.com/*
// @include        http://dinorpg.com/*
// ==/UserScript==

//Script verification
var SUC_script_num = 80798; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


var url = document.location.pathname;
var listMission = new RegExp("/dino/[0-9]+/act/mission/list");
var dinoz = new RegExp("/dino/[0-9]+/?$");
if (listMission.test(url))
{
	recup();
} else if (dinoz.test(url))
{
	addTab();
}

function addTab()
{
	var tabs = document.getElementsByClassName("tabs")[0];
	var ongletMission = document.createElement("li");
	var linkMission = document.createElement("a");
	linkMission.href = "#";
	linkMission.addEventListener("click", showMissions, false);
	linkMission.innerHTML = "Missions";
	ongletMission.appendChild(linkMission);
	tabs.appendChild(ongletMission);
}

function recup()
{
	// Gets the names of quests and their status
	var tableMissions = document.getElementsByClassName("mission")[0];
	tableMissions = tableMissions.childNodes[3];
	var node = tableMissions.lastChild.childNodes[2];
	var str = "";
	var nom;
	var statut;
	while (node != null)
	{
		if(node.childNodes[1].childNodes[3])
		{
			nom = node.childNodes[1].childNodes[3].firstChild.nodeValue;
			statut = node.childNodes[3].firstChild.nodeValue;
			statut = statut.replace(/\s*/g, "");
			if (statut == "Completed")
			{
				statut = "Completed";
			} else if (statut == "In progress...")
			{
				statut = "In progress...";
			}
			  else if (statut =="")
			{
				statut = "Available";
			}
		} else 
		{
			nom = node.childNodes[1].lastChild.nodeValue;
			statut = "Not Available";
		}
		str += nom+"="+statut+";";
		node = node.nextSibling.nextSibling;
	}
	str = str.substring(0, str.length-1);
	
	// Get the quest giver
	var dinozZone = document.getElementsByClassName("selected")[0];
	dinozZone = dinozZone.childNodes[1].childNodes[5].firstChild.nodeValue;
	switch(dinozZone)
	{
		case "Grandpa Joe's House": dinozZone = "Grandpa Joe";
			break;
		case "Lavapit": dinozZone = "Soft Shaman/Elemental Master";
			break;
		case "Forges du Grand Tout Chaud": dinozZone = "Rôdeur Etrange";
			break;
		case "Mr Bao Bob's House": dinozZone = "Bao Bob";
			break;
		case "L'orée de la Forêt": dinozZone = "Nicolas Mulot";
			break;
		case "Camp Korgon": dinozZone = "Dian Korgsey";
			break;
		case "Porte de Sylvenoire": dinozZone = "Gardien de la Forêt";
			break;
		case "Cimetière du Crépuscule": dinozZone = "Skully";
			break;
		case "Avant-poste Rocky": dinozZone = "Bureau des Requêtes";
			break;
		case "BrutForce": dinozZone = "Madam X";
			break;
		case "Port Monstreux": dinozZone = "Homme Louche";
			break;
		default: alert("Mission giver unknown!!!");
	}
	
	// Gets the number of Dinoz
	var url = document.location.pathname;
	var numDinoz = url.split("/");
	numDinoz = numDinoz[2];
	
	// Sauvegarde des valeurs
	GM_setValue(numDinoz+"/"+dinozZone, str);
}

function showMissions()
{
	var tabs = document.getElementsByClassName("tabs")[0];
	var active = tabs.getElementsByClassName("active")[0];
	if (active.firstChild.firstChild.nodeValue != "Missions")
	{
		// Active Missions tab
		active.removeAttribute("class");
		tabs.lastChild.setAttribute("class", "active");
		var cust = document.getElementsByClassName("custom")[0];
		tabs.style.marginBottom = '15px';
		
		// Empty the div
		var div = cust.getElementsByTagName("div")[0];
		div.innerHTML = "";
		div.setAttribute("class", "mission");
		
		// Table quest givers
		var questGiver = new Array(
			Array("Grandpa Joe","Madam X","Skully"),
			Array("Soft Shaman/Elemental Master"),
			Array("Rôdeur Etrange","Bureau des Requêtes"),
			Array("Homme Louche","Nicolas Mulot","Bao Bob"),
			Array("Dian Korgsey","Gardien de la Fôret")
		);
		
		// Added li quests for each quest giver
		for (var j in questGiver)
		{
			// Display submenu
			var ulMissions = document.createElement("ul");
			ulMissions.setAttribute("class", "tabs");
			ulMissions.style.marginBottom = '10px';
			var text = div.nextSibling.cloneNode(false);
			cust.insertBefore(ulMissions, div);
			cust.insertBefore(text, div);
			for (var i in questGiver[j])
			{
				var liMissions = document.createElement("li");
				var link = document.createElement("a");
				link.href = "#";
				link.addEventListener("click", showList, false);
				link.innerHTML = questGiver[j][i];
				liMissions.appendChild(link);
				ulMissions.appendChild(liMissions);
			}
		}
		
		// Button to clear the cache
		/*var resetButton = document.createElement("a");
		resetButton.setAttribute("class", "button");
		resetButton.href = "#";
		resetButton.addEventListener("click", reset, false);
		resetButton.innerHTML = "Clear the cache";
		cust.appendChild(resetButton);*/
	}
}
/*
function reset()	// Function associated with the button to empty the cache 
{
	var keys = GM_listValues();
	for (var i in keys) {
	  GM_deleteValue(keys[i]);
	}
	location.reload();
}
*/
function showList(event)
{
	var tabs = document.getElementsByClassName("tabs")[1];
	tabs = tabs.parentNode;
	var active = tabs.getElementsByClassName("active")[0];
	if (active)
	{
		active.removeAttribute("class");
	}
	this.parentNode.setAttribute("class", "active");
	var ulActive = this.parentNode.parentNode;
	var div = tabs.parentNode.getElementsByClassName("mission")[0];
	tabs.insertBefore(ulActive, div);
	div.innerHTML = "";
	var url = document.location.pathname;
	var numDinoz = url.split("/");
	numDinoz = numDinoz[2];
	var donneurZone = this.firstChild.nodeValue;
	var str = GM_getValue(numDinoz+"/"+donneurZone);
	if (str != null)
	{
		var tableStr = str.split(";");
		var tableValue = new Array();
		var j = 0;
		for (var i in tableStr)
		{
			tableValue[j] = tableStr[i].split("=");
			j++;
		}
		var tableContent = "<table class='table'><tr><th>Mission</th><th>Status</th></tr>";
		for (i in tableValue)
		{
			if (tableValue[i][1] == "Completed")
			{
				tableValue[i][0] = "<tr><td style='font-size: 12px;'><img src='/img/icons/small_missDone.gif' style='vertical-align: center;'> "+tableValue[i][0];
			} else if (tableValue[i][1] == "Available")
			{
				tableValue[i][0] = "<tr class='select'><td style='font-size: 12px;'><img src='/img/icons/small_missNew.gif'> "+tableValue[i][0];
			} else if (tableValue[i][1] == "Inprogress...")
			{
				tableValue[i][0] = "<tr class='important'><td style='font-size: 12px;'><img src='/img/icons/small_missAct.gif'> "+tableValue[i][0];

			} else
			{
				tableValue[i][0] = "<tr class='off'><td style='font-size: 12px;'> "+tableValue[i][0];
			}
			tableContent += tableValue[i][0]+"</td><td style='font-size: 12px;'>"+tableValue[i][1]+"</td></tr>";
		}
		tableContent += "</table>";
	} else
	{
		var tableContent = "<p>Quest giver not visited, go see for a list of his quests.</p>";
	}
	div.innerHTML = tableContent;
}