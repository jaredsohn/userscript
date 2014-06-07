// ==UserScript==
// @name           LandGrab Games Waiting
// @namespace      LandGrab_Games_Waiting
// @description    Shows and Updates the status of other LandGrab games
// @include        http://landgrab.net/landgrab/ViewBoard*
// @include        http://landgrab.net/landgrab/ViewBoard
// ==/UserScript==

var oPanel = document.getElementById("control_panel_div")

GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://landgrab.net/landgrab/Home',
  onload: function(responseDetails) 
  {
    //Create a div to store the returned html in. We need to do this
    //so we can use the DOM to get at the topics
    var oDiv = document.createElement('div');
    oDiv.setAttribute('id', 'oMain');
    oDiv.setAttribute('name', 'oMain');
    oDiv.innerHTML = responseDetails.responseText;
	
	    //get all the divs in the returned html.
    var o = oDiv.getElementsByTagName('img');
	
	var oGameLinkTable = document.createElement("table");
	var oGameLinkRow = document.createElement("tr");
	
	oGameLinkTable.bgcolor = "black";
	oPanel.appendChild(oGameLinkTable);
	oGameLinkTable.appendChild(document.createElement("tr"));
	oGameLinkTable.appendChild(oGameLinkRow);
	
	oGameLinkRow.appendChild(document.createElement("td"));
	oGameLinkRow.firstChild.innerHTML = "Games";
	oGameLinkRow = oGameLinkRow.parentNode.appendChild(document.createElement("tr"));
		
    for(var i=0;i<=o.length-1;i++)
    {
      if(o[i].src=="http://landgrab.net/landgrab/images/homestar_yellow.png")
      {
		var oGameLink = o[i].parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1];
		var oGameLinkCell = document.createElement("td");
		oGameLinkRow.appendChild(oGameLinkCell);
		
		oGameLinkCell.appendChild(oGameLink);
		oGameLinkRow = oGameLinkRow.parentNode.appendChild(document.createElement("tr"));
		
      }
    }
	
/*	for(var i=g;i>0;i--)
	{
		var oImg = document.createElement("img");
		oImg.src = "http://landgrab.net/landgrab/images/homestar_yellow.png";
		oPanel.parentNode.appendChild(oImg);
		
	}
*/	
	
	
    /*
	//get all the divs in the returned html.
    var o = oDiv.getElementsByTagName("div");
    
    for(var i=0;i<=o.length-1;i++)
    {
      if(o[i].className=="gamename")
      {
        var oGames = o[i].getElementsByTagName("img");
        
        for(z=0;z<=oAnchors.length-1;z++)
        {
          aryTopics[z]=[oAnchors[z].href,oAnchors[z].text];
        }
		
      
        break;
      }
    }
  
	*/
	
    //createOptionsForSelect();
  }
});
