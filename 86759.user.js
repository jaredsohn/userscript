// ==UserScript==
// @name           Clean timetable
// @namespace      Anon1166
// @description    Cleans timetable on Plymouth.ac.uk
// @include        https://timetables.plymouth.ac.uk/timetable.aspx
// ==/UserScript==

window.setTimeout(function() {
						   
	var allCells = document.getElementsByTagName('td');
	var splitText;
	var moduleCodes = new Array("AINT201","CNET222","GGP2137","GGX2105","GGX2106","GGX2117","ISAD213","SOFT222","BPIE200","CNET226","COMP216","ISAD211","ISAD223","ISAD229","ISAD231","ISAD232","PRDC202");
	var moduleNames = new Array("AI", "Networks", "Coastal Environments.", "Fieldwork","Research","GIS","Information Retrieval","OOP","Placement prep", "Networks", "Web dev", "Databases","HCI","Ethics","Web Paradigms","System Reqs","C.I. Project");
	
	
	
	for (var i = 0;i < allCells.length; i++) {
		
		if(allCells[i].className == 'activity') {

				splitText = allCells[i].innerHTML.split('<br>');
				
				for (var  j = 0; j < moduleCodes.length; j++) {
				
					if (splitText[0].match(moduleCodes[j]) != null) {
						
						splitText[0] = "<strong>" + moduleCodes[j] + " - " + moduleNames[j] + "</strong>";
					
					}
					
				}
				
				allCells[i].innerHTML = splitText.join("<br>");
		 
		}
		
	}
						 
						 
						 
						 
}, 200);