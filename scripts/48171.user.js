// ==UserScript==
// @name           Durins's AE Extension
// @namespace      astrotools.co.cc
// @description    An AE extension
// @include        *.astroempires.com/*
// ==/UserScript==
	var TRs = document.getElementsByTagName("tr");
	var structure_names = new Array("Robotic%20Factories","Nanite%20Factories","Fusion%20Plants","Antimatter%20Plants","Research%20Labs","=Shipyards","Orbital%20Shipyards","Spaceports","Android%20Factories","Economic%20Centers","Terraform","Multi-Level%20Platforms","Orbital%20Base","Capital","Urban%20Structures","Solar%20Plants","Gas%20Plants","Crystal%20Mines","Metal%20Refineries");
	var structure_values = new Array();
	structure_values["Robotic%20Factories"] = 2;
	structure_values["Nanite%20Factories"] = 4;
	structure_values["Fusion%20Plants"] = 4;
	structure_values["Antimatter%20Plants"] = 10;
	structure_values["Research%20Labs"] = 6;
	structure_values["=Shipyards"] = 2;
	structure_values["Orbital%20Shipyards"] = 8;
	structure_values["Spaceports"] = 2;
	structure_values["Android%20Factories"] = 6;
	structure_values["Economic%20Centers"] = 3;
	structure_values["Terraform"] = 5;
	structure_values["Multi-Level%20Platforms"] = 10;
	structure_values["Orbital%20Base"] = 10;
	structure_values["Capital"] = 10;
	var structure_types = new Array();
	structure_types["Robotic%20Factories"] = "Con/Prod";
	structure_types["Nanite%20Factories"] = "Con/Prod";
	structure_types["Fusion%20Plants"] = "Energy";
	structure_types["Antimatter%20Plants"] = "Energy";
	structure_types["Research%20Labs"] = "Research";
	structure_types["=Shipyards"] = "Prod";
	structure_types["Orbital%20Shipyards"] = "Prod";
	structure_types["Spaceports"] = "Econ";
	structure_types["Android%20Factories"] = "Con/Prod";
	structure_types["Economic%20Centers"] = "Econ";
	structure_types["Terraform"] = "Area";
	structure_types["Multi-Level%20Platforms"] = "Area";
	structure_types["Orbital%20Base"] = "Pop";
	structure_types["Capital"] = "Econ";
	structure_types["Urban%20Structures"] = "Pop";
	structure_types["Solar%20Plants"] = "Energy";
	structure_types["Gas%20Plants"] = "Energy";
	structure_types["Crystal%20Mines"] = "Econ";
	structure_types["Metal%20Refineries"] = "Con/Prod";
	var logout = document.getElementsByTagName("a")[10];
	var link= document.createElement("A");
	var url = "http://www.astroempires-dwarf.co.nr";
	link.setAttribute("href",url);
	link.setAttribute("target","blank");
	var txt = document.createTextNode("Guild Forum");
	link.appendChild(txt);
	logout.parentNode.insertBefore(link,logout);
	var txt = document.createTextNode(" - ");
	logout.parentNode.insertBefore(txt,logout);
	for(i=21;i<25;i++)
	{
		var player = document.getElementsByTagName("a")[i];
		var guild = "DWARF";
		if(player.innerHTML.search(guild) != -1)
		{
			player.style.color="blue";
		}
	}
	var searchStr = "view=structures";
	var url = window.location.href;
	if(url.search(searchStr) != -1)
	{
		var TDs = document.getElementsByTagName("TD");
		for(var s in structure_names)
		{
			var searchStr = structure_names[s];
			var a = 43;
			for(i=7;i<TDs.length;i+=9)
			{
				if(TDs[i].innerHTML.search(searchStr) != -1)
				{
					var x = parseFloat(i);
					x++;
					if(searchStr == "Urban%20Structures" || searchStr == "Gas%20Plants" || searchStr == "Solar%20Plants" || searchStr == "Crystal%20Mines" || searchStr == "Metal%20Refineries")
					{
						i = parseFloat(i);
						if(searchStr == "Gas%20Plants" || searchStr == "Solar%20Plants")
						{
							i-=6;
						}
						var info = TDs[i+7].innerHTML;
						for(f=0;f<8;f++)
						{
							if(info.search(f) != -1)
							{
								structure_values[structure_names[s]] = f;
							}
						}	
					}						
					var cost = parseFloat(TDs[x].innerHTML);
					var value = structure_values[structure_names[s]];
					var ratio = cost/value;
					var title = Math.round(ratio)+' Per '+structure_types[structure_names[s]];
					document.getElementsByTagName("a")[a].setAttribute("title",title);
				}
				a++;
			}
		}

		var TRs = document.getElementsByTagName("tr");
//		for(var i in TRs)
//		{
//			alert(i+" "+TRs[i].innerHTML);
//		}
		for(i=12;i<TRs.length-2;i+=2)
		{
			var deleted = TRs[i].getElementsByTagName("td")[1];
			deleted.parentNode.removeChild(deleted);
		}
	}