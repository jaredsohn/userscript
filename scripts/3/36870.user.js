// ==UserScript==
// @name           TopTeamAnalysis
// @namespace      Fantasy Analysis
// @description    Which players do the top teams have?
// @include        http://fantasy.premierleague.com/M/stats.mc?stat=table*
// @include        http://fantasy.premierleague.com/M/table.mc?id=*
// ==/UserScript==

// ************************ Get captains points when on History Page ***********************
var URLindex = 0;
var URLs = new Array();
var PlayerCount = new Array();
var captBonusTotal = 0;
var maxBonusTotal = 0;
var teamTotal = 0;
var benchTotal = 0;
var xmlHttp;
document.getElementById("ism_main_centre").innerHTML = document.getElementById("ism_main_centre").innerHTML.replace(/>#.*?</,"># <input id='kickOffTopTeamAnalysisButton' type='button' onClick='kickOffTopTeamAnalysis()' value='Grab team info'><");

function kickOffTopTeamAnalysis()
{
		document.getElementById("kickOffTopTeamAnalysisButton").style.display = "none";
		// Look for each url of gameweek history
		var patt = /(\/M\/eventhist\.mc\?id\=\d*(?:\&amp\;event\=\d*)?)"/ig;
		var result = patt.exec(document.body.innerHTML);

		// Add them all to an arry
		while (result != null)
		{
			URLs.push(result[1]);
			result = patt.exec(document.body.innerHTML);
		}

		// Create the temporary element for each gameweek page
		var newdiv = document.createElement('div');
		var divIdName = 'gameweek';
		newdiv.setAttribute('id',divIdName);
		newdiv.setAttribute('style',"display: none;");
		document.body.appendChild(newdiv);

		// Start getting the gameweek history pages begining with the 1st one
		var docurl = URLs[URLindex];
		xmlHttp=GetXmlHttpObject();
		if (xmlHttp==null)
		{
			alert("no object");
			return;
		} 
		xmlHttp.onreadystatechange=stateChanged;
		xmlHttp.open("GET",docurl,true);
		xmlHttp.send(null);
}
unsafeWindow.kickOffTopTeamAnalysis = kickOffTopTeamAnalysis;

function stateChanged()
{ 
	if (xmlHttp.readyState==4)
	{
		var downloadedHTML = xmlHttp.responseText;
		xmlHttp = null;
		// ed[1]=[82
		
		var patt = /ed\[\d+\]=\[(\d+),(.*?),/ig;
		var result = patt.exec(downloadedHTML);

		// Add them all to an arry
		while (result != null)
		{
			if (PlayerCount[result[1]] == null)
			{
				PlayerCount[result[1]] = new Array();
				PlayerCount[result[1]][0] = 0;
				PlayerCount[result[1]][1] = result[2];
			}
			PlayerCount[result[1]][0]++;
			result = patt.exec(downloadedHTML);
		}
			
		// Grab the next page
		URLindex++;
		if (URLindex < URLs.length && URLindex < 500)
		{
			var docurl = URLs[URLindex];
			xmlHttp=GetXmlHttpObject();
			if (xmlHttp==null)
			{
				alert("no object");
				return;
			} 
			xmlHttp.onreadystatechange=stateChanged;
			xmlHttp.open("GET",docurl,true);
			xmlHttp.send(null);
		}
		else
		{
			var PlayersDetails = "<table>";
			// We're done
			for(var i=0;i<1000;i++)
			{
				try
				{
					if (PlayerCount[i] != null)
					{
						
						PlayersDetails += "<tr><td>" + PlayerCount[i][1] + "</td><td>" + ((PlayerCount[i][0] * 100) / URLindex) + "</td></tr>"; 
					}
				}
				catch(e)
				{
					
				}
			}
			PlayersDetails += "</table>";
			document.body.innerHTML += PlayersDetails;
		}
		// Update the total as we run through the list
		document.getElementById("ism_main_centre").innerHTML = document.getElementById("ism_main_centre").innerHTML.replace(/>#.*?</,"># Teams Analysed=" + URLindex + "<");
		
	}
}


function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	  {
	  // Firefox, Opera 8.0+, Safari
	  xmlHttp=new XMLHttpRequest();
	  }
	catch (e)
	  {
	  // Internet Explorer
	  try
	    {
	    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
	    }
	  catch (e)
	    {
	    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	    }
	  }
	return xmlHttp;
}	
