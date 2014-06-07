// ImperaOnlineMouseOverInfoPlay
// 2008-10-10
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox.
// Under Tools, there will be a new menu item to "Add New User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select the User Script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// Benutzung auf eigene Gefahr!
//// ==UserScript==
// @name           GreaseImperaGame
// @namespace      GreaseImpera
// @description    Shows infoBox for Player in play.php
// @include        http://www.imperaonline.de/ingame/play.php*
// ==/UserScript==



var divContainer = document.getElementById('stats');

divContainer.addEventListener("click",   createMouseOverEffects(), false);

function createMouseOverEffects() {
   return function () 
   {
   		GM_xmlhttpRequest(
		{
		    method: 'GET',
		   	url: "http://www.imperaonline.de/game/detail.php?id_spiel="+document.getElementsByName('idspiel')[0].value,
		   // url: infoBoxContainer.parentNode.parentNode.cells[3].getElementsByTagName('a')[0].href,
		    headers: 
		    {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'text/html',
		    },
		    onload: function(responseDetails) 
		    {
		    
			    var divContainer = document.getElementById('stats');
			    var x = divContainer.getElementsByTagName('tr');
		    	if (x) 
		    	{
					for (var i=0; i<x.length; i++) 
					{
						if (x[i].className != 'head')
						{
							y = x[i].cells;
							
							var splittedName = y[0].innerHTML.split(";");
							var plName;
							if (splittedName[1])
								plName = splittedName[1];
							else
								plName = splittedName[0];
							
							var UID = getUIDoutofString (responseDetails.responseText,plName);
							
							if (y[0].getElementsByTagName('div').length == 0)
								y[0].appendChild(document.createElement('div'));
							
							var infoBoxDiv = y[0].getElementsByTagName('div')[0]
							
							y[0].addEventListener("mouseover",   createInfoBox(infoBoxDiv,UID), false);
							y[0].addEventListener("mouseout",   crushInfoBox(infoBoxDiv), false);
						}
						
					}
				}
		    }
		});
   }
}		
			
function createInfoBox(infoBoxContainer,uid){
    return function (){
        if (uid!=null)
        {
            var infoBox = document.createElement("div");
               var iBAttr = document.createAttribute("name");
               iBAttr.nodeValue = "infoBox";
               infoBox.setAttributeNode(iBAttr);
               
               infoBox.style.position = 'absolute';
               infoBox.style.zindex = '9';
                              
               infoBox.innerHTML = '<img src="http://www.imperaonline.de/extern.php?uid='+uid+'" />';
               var infoBoxes = document.getElementsByName("infoBox");
               
               for (j = 0;j<infoBoxes.length;j++)
                   infoBoxes[j].parentNode.innerHTML="";
               
               infoBoxContainer.innerHTML = "";
               infoBoxContainer.appendChild(infoBox);
        }
    }

}
function crushInfoBox(infoBoxContainer) {
   return function () {
   		//isOpening = false;
           infoBoxContainer.innerHTML = "";
   }
}
function getUIDoutofString (value,name) {
	var withoutUmlaut = name.split('ä')[0];
	withoutUmlaut = withoutUmlaut.split('ü')[0];
	withoutUmlaut = withoutUmlaut.split('ö')[0];
    var re = new RegExp("(\\d+).>"+withoutUmlaut,"");
    var result = re.exec(value);
    if (result!=null)
          return result[1];
      else return null;
}