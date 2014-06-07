// ==UserScript==
// @name           Travian Graph
// @namespace      travian
// @include        http://s*.travian.*/*
// ==/UserScript==

function alertVersion()
{
alert("The script is v.1.0.2");
}

function checkVersion()
{
var answer = confirm("Update from userscripts.org?")
	if (answer){
		window.location = "http://userscripts.org/scripts/source/34493.user.js";
	}
}

//parselord
function parseDays(data, city) {
var a, b, tablerow, temp, result;
a = data.indexOf(city);
b = data.indexOf("</tr>",a);
tablerow = data.substr(a,b-a);
temp = tablerow;
result = "";
for (var j = 1; j <= 7; j++) {
if (temp.indexOf('<td class="pop" >') != -1) {
temp = temp.substr(temp.indexOf('<td class="pop" >')+17);
	if (j == 7) {
		result = result+temp.substring(0,temp.indexOf('</td>'));
	} else {
		result = result+temp.substring(0,temp.indexOf('</td>'))+",";
	}
} else { 
result = "0,"+result;
}
}
return result;
}

//nimi
var allH1, village;
allH1 = document.getElementsByTagName('h1');
village = allH1[0].innerHTML;

//server
var allT, server;
allT = document.getElementsByTagName('title');
server = allT[0].innerHTML.substr(8);

//uid
var profileLink, allLinks, thisLink, uId;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
    if (allLinks[i].href.indexOf("spieler.php?uid=") != -1) {
    uId = allLinks[i].href.substr(allLinks[i].href.indexOf("uid=")+4);
	}
}

//addkuva
var newElement, JuuDiv, mapElement, brE;
JuuDiv = document.getElementById("lright1");
if (JuuDiv) {
JuuDiv.innerHTML = JuuDiv.innerHTML+"<br>";
    mapElement = document.createElement('img');
	newElement = document.createElement('img');
    JuuDiv.appendChild(newElement);
	JuuDiv.appendChild(mapElement);
}
//get dataz
var dataZ, htmlCode;
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.travian.ws/analyser.pl?s='+server+'&uid='+uId,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        if (responseDetails.status = "200") {
          htmlCode = responseDetails.responseText;
		  //parse
		  dataZ = parseDays(htmlCode, village);
		  //end
		} else  {
			//failage
		   dataZ = "Err";
		}
		if (dataZ != "Err") {
			newElement.src = "http://teemu.net78.net/travistat.php?n="+village+"&s="+dataZ;
		} else {
			newElement.src = "http://teemu.net78.net/travistat.php?n="+village;
		}
    }
});

var serv, num;
serv = server.substring(0,2);
num = server.substring(2);
mapElement.style.width = "384px";
mapElement.src = "http://travmap.shishnet.org/map.php?lang=en&server=s"+num+".travian."+serv+"&groupby=player&colby=player&zoom="+village+"%2C30&mindist=0&maxdist=10&casen=on&dotsize=1&order=dist&format=png&";

GM_registerMenuCommand("Travian Graph: Show Version data", alertVersion);
GM_registerMenuCommand("Travian Graph: Update the script", checkVersion);
