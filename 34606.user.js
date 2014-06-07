// ==UserScript==
// @name           Travian Graph
// @namespace      travian
// @include        http://s*.travian.*/*
// ==/UserScript==

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
var newElement, JuuDiv;
JuuDiv = document.getElementById("lright1");
if (JuuDiv) {
    newElement = document.createElement('img');
    JuuDiv.parentNode.insertBefore(newElement, JuuDiv.nextSibling);
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