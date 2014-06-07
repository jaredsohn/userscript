// ==UserScript==
// @name           nickchild's FPL Gameweek Browser
// @namespace      nickchild@hotmail.com
// @include        http://fantasy.premierleague.com*
// ==/UserScript==

fixDiv = document.getElementById("ism_fixtures_left");
fixUL = fixDiv.getElementsByTagName("ul")[0];
fixLIs = fixDiv.getElementsByTagName("li");

gwNum = fixLIs[0].innerHTML.split("Gameweek ")[1].split(" Fixtures")[0];
var gwNavDiv = document.createElement("div");
gwNavDiv.id = "gwNavDiv";
gwNavDiv.innerHTML = "<table border='0' width='100%'><tr><td align='left' width='25%' style='text-align:left;padding-left:10px;'><input type='hidden' id='curGW' value='"+gwNum+"'><input type='hidden' id='newGW' value='"+gwNum+"'><a id='prevGWlink' href='javascript:void(0)'>Prev</a></td><td width='50%' align='center' style='text-align:center;padding-right:3px;'><a id='currentGWlink' href='javascript:void(0)'>Current</a></td><td align='right' style='text-align:right;padding-right:10px;' width='25%'><a id='nextGWlink' href='javascript:void(0)'>Next</a></td></tr></table><div id='myBody' style='display:none'>&nbsp;</div>";

fixDiv.parentNode.insertBefore(gwNavDiv,fixDiv);  

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

playerLinksIndex = 0;
playerIDs = new Array();
playerLinks = new Array();
playersArray = new Array();
		
if (document.URL.match("http://fantasy.premierleague.com/M/myteam.mc")) {
	dataTable = document.getElementsByClassName("ism_table")[0];
	dataTRs = dataTable.getElementsByTagName("tr");
	dataTRs[0].getElementsByTagName("th")[6].innerHTML = "<a href='javascript:void(0)' id='playerGWprev'>&lt; </a>" + dataTRs[0].getElementsByTagName("th")[6].innerHTML + " <a href='javascript:void(0)' id='playerGWnext'>&gt;</a><input type='hidden' id='datacurGW' value='"+gwNum+"'><input type='hidden' id='datanewGW' value='"+gwNum+"'>";
	for(i=1;i<dataTRs.length;i++) {
		tmpID = parseInt(dataTRs[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0].name.split("xselection_")[1]);
		playerIDs.push(tmpID)
	}
	for(p=0;p<15;p++) {
		playerLinks.push("http://fantasy.premierleague.com/element_json/"+playerIDs[p]+".json")
	}

	var docurlP = playerLinks[0];
	var xmlHttpP=GetXmlHttpObject();
	if (xmlHttpP==null) {
//		alert("no object");
		return;
	} 
	xmlHttpP.onreadystatechange=stateChangedP;
	xmlHttpP.open("GET",docurlP,true);
	xmlHttpP.send(null);
}

function stateChangedP()
{ 
	if (this.readyState==4)
	{
		var playerDetails = JSON.parse(this.responseText);
		playersArray.push(playerDetails.fixtures);
		playerLinksIndex++;
		if (playerLinksIndex < playerLinks.length) {
			var docurlP = playerLinks[playerLinksIndex];
			var xmlHttpP=GetXmlHttpObject();
			if (xmlHttpP==null)
			{
				alert("no object");
				return;
			}
			xmlHttpP.onreadystatechange=stateChangedP;
			xmlHttpP.open("GET",docurlP,true);
			xmlHttpP.send(null);
		}
	}
}

function stateChanged()
{ 
	if (this.readyState==4)
	{
		document.getElementById("myBody").innerHTML = this.responseText;
		myBodyDiv = document.getElementById("myBody");
		fixDivs = myBodyDiv.getElementsByClassName("ism_home_fixtures_wrapper")[0];
		fixTable = fixDivs.getElementsByTagName("table")[0];
		fixTRs = fixTable.getElementsByTagName("tr");
		fixString = "";
		for(i=0;i<fixTRs.length;i++) {
			fixTDs = fixTRs[i].getElementsByTagName("td");
			if(fixTDs.length>4) {
				if(fixTDs[2].className=="ism_v") {
					fixString+="<li><span>"+fixTDs[0].innerHTML + " v " + fixTDs[4].innerHTML+"</span></li>\n";
				}
			}
		}
		fixUL.innerHTML = '<li class="ism_first">Gameweek '+parseInt(newGWbox.value)+' Fixtures</li>' + fixString;
		newGWbox = document.getElementById("newGW");
		curGWbox = document.getElementById("curGW");
		if(parseInt(newGWbox.value)!=parseInt(curGWbox.value)) {
			fixLIs[0].style.color="red";
		} else {
			fixLIs[0].style.color="white";
		}
		lastFixLI=fixLIs[(fixLIs.length-1)];
		lastFixLI.className="ism_last";
		document.getElementById("myBody").innerHTML = "";
	}
}

document.getElementById("prevGWlink").addEventListener('click', function(ev) {
	
	newGWbox = document.getElementById("newGW");
	if(newGWbox.value>1) {
		fixLIs[0].innerHTML = "Loading...";
		newGWbox.value = parseInt(newGWbox.value) - 1;

		var docurl = "http://fantasy.premierleague.com/M/fixture.mc?event="+parseInt(newGWbox.value);
		var xmlHttp=GetXmlHttpObject();
		if (xmlHttp==null)
		{
//			alert("no object");
			return;
		} 
		xmlHttp.onreadystatechange=stateChanged;
		xmlHttp.open("GET",docurl,true);
		xmlHttp.send(null);
	}

	var docurl = "http://fantasy.premierleague.com/M/fixture.mc?event="+parseInt(newGWbox.value);

	
}, true);

document.getElementById("nextGWlink").addEventListener('click', function(ev) {
	
	newGWbox = document.getElementById("newGW");
	if(newGWbox.value<38) {
		fixLIs[0].innerHTML = "Loading...";
		newGWbox.value = parseInt(newGWbox.value) + 1;

		var docurl = "http://fantasy.premierleague.com/M/fixture.mc?event="+parseInt(newGWbox.value);
		var xmlHttp=GetXmlHttpObject();
		if (xmlHttp==null)
		{
//			alert("no object");
			return;
		} 
		xmlHttp.onreadystatechange=stateChanged;
		xmlHttp.open("GET",docurl,true);
		xmlHttp.send(null);
	}

}, true);

document.getElementById("currentGWlink").addEventListener('click', function(ev) {
	
	newGWbox = document.getElementById("newGW");
	curGWbox = document.getElementById("curGW");
	if(parseInt(newGWbox.value)!=parseInt(curGWbox.value)) {
		fixLIs[0].innerHTML = "Loading...";
		newGWbox.value = parseInt(curGWbox.value);

		var docurl = "http://fantasy.premierleague.com/M/fixture.mc?event="+parseInt(newGWbox.value);
		var xmlHttp=GetXmlHttpObject();
		if (xmlHttp==null)
		{
//			alert("no object");
			return;
		} 
		xmlHttp.onreadystatechange=stateChanged;
		xmlHttp.open("GET",docurl,true);
		xmlHttp.send(null);
	}

}, true);

if (document.URL.match("http://fantasy.premierleague.com/M/myteam.mc")) {

	document.getElementById("playerGWnext").addEventListener('click', function(ev) {

		curGWbox = document.getElementById("datacurGW");
		newGWbox = document.getElementById("datanewGW");
		if(newGWbox.value<38) {
			newGWbox.value = parseInt(newGWbox.value) + 1;

			for(i=1;i<dataTRs.length;i++) {
				tmpGW = parseInt(newGWbox.value)-parseInt(curGWbox.value);
				tmpStr = playersArray[(i-1)][tmpGW][2];
				if(playersArray[(i-1)][tmpGW][3]==0) {
					tmpStr+=" (H)";
				} else {
					tmpStr+=" (A)";
				}
				tmpStr+=" <span style='font-size:8px'>(GW"+parseInt(newGWbox.value)+")</span>";
				dataTRs[i].getElementsByTagName("td")[6].innerHTML = tmpStr;
			}

		}
	}, true);

	document.getElementById("playerGWprev").addEventListener('click', function(ev) {
	
		curGWbox = document.getElementById("datacurGW");
		newGWbox = document.getElementById("datanewGW");
		if(parseInt(newGWbox.value)>parseInt(curGWbox.value)) {
			newGWbox.value = parseInt(newGWbox.value) - 1;

			for(i=1;i<dataTRs.length;i++) {
				tmpGW = parseInt(newGWbox.value)-parseInt(curGWbox.value);
				tmpStr = playersArray[(i-1)][tmpGW][2];
				if(playersArray[(i-1)][tmpGW][3]==0) {
					tmpStr+=" (H)";
				} else {
					tmpStr+=" (A)";
				}
				tmpStr+=" <span style='font-size:8px'>(GW"+parseInt(newGWbox.value)+")</span>";
				dataTRs[i].getElementsByTagName("td")[6].innerHTML = tmpStr;
			}
		}
	}, true);
}