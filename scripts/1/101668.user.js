// ==UserScript==
// @name           Assess Recon Report
// @namespace      http://www.subbob.us
// @include        http://www.deorc.com/DarkExpanse/Message.jsp?messageID=*&listType=1
// ==/UserScript==

	function show_alert(ScriptLocation)
	{
		alert(ScriptLocation);
	}
	
    var DebugMode; // Used for debugging purposes, set to 1 to receive pop-up alerts
         
    DebugMode = 0;	
	
	var oRows = document.getElementsByTagName('tr');
	
	var iRowCount = oRows.length;
	var Personnel = 0;
	var Factories = 0;
	var Mines = 0;
	var PowerPlants = 0;
	var Hydroponics = 0;
	var Environment = 0;
	var Social = 0;
	var Soldier = 0;
	var Planets = -1;
	var PlanetNames = new Array();
	PlanetNames[0] = "-";
	PlanetNames[1] = "-";
	PlanetNames[2] = "-";
	PlanetNames[3] = "-";	

	var StrNodes = new Array();
	
		rowText = oRows[1].innerHTML;

		StrNodes = rowText.split("<br");
		
		
		var NodeCount = StrNodes.length;
		
		var PlanetFound = 0;
		
		for (var CurrentNode=0; CurrentNode < NodeCount; CurrentNode++) {

			if (DebugMode) {show_alert("CurrentNode is " + CurrentNode);}
			if (DebugMode) {"Node: " + show_alert(StrNodes[CurrentNode]);}
			

			var NodeTokens = StrNodes[CurrentNode].split(" ");
			
			if (NodeTokens.length > 2) {

				if (NodeTokens[1]=="is" && NodeTokens[2]=="a") { // A new planet

					PlanetFound = 1;
			
					Planets++; // increment number of planets
					
					PlanetNames[Planets] = NodeTokens[0];
				}
				else {  // Not a new planet
					switch (NodeTokens[0])
					{
					case ">Personnel":
					  Personnel = Personnel + parseInt(NodeTokens[4]);
					  break;
					case ">Factories":
					  Factories = Factories + parseInt(NodeTokens[4]);
					  break;
					case ">Mines":
					  Mines = Mines + parseInt(NodeTokens[4]);
					  break;
					case ">Power":
					  PowerPlants = PowerPlants + parseInt(NodeTokens[5]);
					  break;
					case ">Hydroponics":
					  Hydroponics = Hydroponics + parseInt(NodeTokens[4]);
					  break;
					case ">Environment":
					  Environment = Environment + parseInt(NodeTokens[4]);
					  break;
					case ">Social":
					  Social = Social + parseInt(NodeTokens[4]);
					  break;
					case ">Soldier":
					  Soldier = Soldier + parseInt(NodeTokens[4]);
					  break;

					  default:
					  if (DebugMode) {show_alert(NodeTokens[0]);};
					}
				}
			
			}
		}

		var Summary = "Factories: " + Factories + " Mines: " + Mines + " Power Plants: " + PowerPlants + " Hydroponics: " + Hydroponics;
		var DocBody = document.getElementsByTagName('body');		
		DocBody[0].innerHTML = "<p><h2>" + Summary + "</h2><p><p>" + DocBody[0].innerHTML;