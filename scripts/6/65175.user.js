// ==UserScript==
// @name           3ptGAMES_NHL
// @namespace      www.google.com
// @description    Shows points for NHL teams if NHL had the 3 points/game system (3 regulation win/2 OT,SO win, 1, OT,SO loss)
// @include        http://espn.go.com/nhl/standings*
// @NOTES		   loading the page will take longer (much longer) than usual
//				   will only work for post lockout seasons. works for both division and conference standings
// @Author         thenuckman (user at canucks.com)
// ==/UserScript==




var xmlhttp;
var sendID = "";
function loadXMLDoc(url)
{
xmlhttp=null;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
//xmlhttp.onreadystatechange=state_Change;
xmlhttp.open("GET",url,false);
xmlhttp.send(null);
var val = xmlhttp.responseText.match(/W.*\d{1}-\d{1} \w{2}/g).length;
document.getElementById(sendID).innerHTML = val;
sendID = "";
return val;
}

function state_Change()
{
if (xmlhttp.readyState==4)
  {// 4 = "loaded"
  if (xmlhttp.status==200)
    {// 200 = "OK"
    document.getElementById(sendID).innerHTML =xmlhttp.responseText.match(/W.*\d{1}-\d{1} \w{2}/g).length;
	sendID = "";
    }
  else
    {
    alert("Problem retrieving data:" + xmlhttp.statusText);
    }
  }
}

function resetURL() {
schedURL = "http://espn.go.com/nhl/teams/schedule?team="}

var schedURL = "http://espn.go.com/nhl/teams/schedule?team=";
var loc = window.location.href;
var allTables = document.body.getElementsByTagName("table");

allTables[0].insertRow(0);
allTables[0].rows[0].insertCell(0);
allTables[0].rows[0].cells[0].colSpan = 14;
allTables[0].rows[0].cells[0].id = "T1";

for(var j = 0; j < allTables.length; j++)
{
	if(allTables[j].innerHTML.search(/Eastern Conference/) != -1)
	{
		for(var i = 0; i <(allTables[j].rows.length); i++)
		{
			if(allTables[j].rows[i].cells.length >5)
			{
				allTables[j].rows[i].insertCell(5);
				allTables[j].rows[i].cells[5].innerHTML = 'OTW';
				allTables[j].rows[i].insertCell(7);
				allTables[j].rows[i].cells[7].innerHTML = '3PT';
			}
			if(allTables[j].rows[i].cells.length <2)
			{
				allTables[j].rows[i].cells[0].colSpan += 2;
			}
			var teamURL;
			if(teamURL = allTables[j].rows[i].cells[0].innerHTML.match(/\/nhl\/clubhouse\?team=\w{3}/))
			{
				teamURL= teamURL[0].split("");
				var teamL = teamURL.length;
				var team = teamURL[teamL-3]+teamURL[teamL-2]+teamURL[teamL-1];
				resetURL();
				schedURL += team;
				if(loc.match(/\d{4}/))
				{
					schedURL += "&year="+loc.match(/\d{4}/)[0];
				}
				sendID = "hah"+team;
				allTables[j].rows[i].cells[5].id = sendID;
				var wins = loadXMLDoc(schedURL);
				var cells = allTables[j].rows[i].cells;
				cells[7].innerHTML = parseInt(cells[2].innerHTML)*3+parseInt(cells[4].innerHTML)-parseInt(cells[5].innerHTML);
			}			
		}
	}
}

