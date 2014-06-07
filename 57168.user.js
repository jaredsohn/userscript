// ==UserScript==
// @name           Spice up the profile
// @namespace      none
// @author				 Laoujin / De Goede Fee
// @include http://nl*.tribalwars.nl/game.php?*village=*&screen=info_player&id=*
// @include http://nl*.tribalwars.nl/game.php?*village=*&screen=info_village&id=*
// ==/UserScript==

// Gebruik 'playerssgraph' (detail) of 'playergraph' (volledig)
var graphType = "playerssgraph";
var showPoints = true;
var showOD = false;
var showODA = true;
var showODD = true;
var showVillages = false;
var showRang = false;

// SCRIPT: uitfilteren van alle terugkeer dingen zodat we aanvallen+ondersteuning hebben
var server = 'nl';
var mainlist = findByInner(document, "Profiel")[0].parentNode;
var srv = document.location.href.match(/nl(\d+)\D*\.tribalwars\./)[1];
var playerid = document.location.href.match(/screen=info_player&id=(\d+)/)[1];

var imgd = document.createElement('div');
imgd.innerHTML = "TWStats";
addRow(imgd, mainlist, 'th');

var twLink = 'http://'+server+'.twstats.com/image.php?type=playerssgraph&id='+playerid+'&s='+server+srv;

if (showPoints)
{
	imgd = document.createElement('img');
	imgd.src = twLink + '&graph=points';
	addRow(imgd, mainlist, 'td');
}

if (showVillages)
{
	imgd = document.createElement('img');
	imgd.src = twLink + '&graph=villages';
	addRow(imgd, mainlist, 'td');
}

if (showOD)
{
	imgd = document.createElement('img');
	imgd.src = twLink + '&graph=od';
	addRow(imgd, mainlist, 'td');
}

if (showODA)
{
	imgd = document.createElement('img');
	imgd.src = twLink + '&graph=oda';
	addRow(imgd, mainlist, 'td');
}

if (showODD)
{
	imgd = document.createElement('img');
	imgd.src = twLink + '&graph=odd';
	addRow(imgd, mainlist, 'td');
}

if (showRang)
{
	imgd = document.createElement('img');
	imgd.src = 'http://'+server+'.twstats.com/image.php?type=playerssgraph&graph=rank&id='+playerid+'&s='+server+srv;
	addRow(imgd, mainlist, 'td');
}

//http://userscripts.org/topics/2026
//brr een hele miserie om cross domain call te doen blijkbaar..
//http://my.opera.com/community/forums/topic.dml?id=155224&t=1252203770&page=1#comment1706672
//http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js
/*if (GM_xmlhttpRequest)
{
	var imgd = document.createElement('div');
	imgd.innerHTML = "Overnames";
	addRow(imgd, mainlist, 'th');

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://'+server+'.twstats.com/'+server+srv+'/index.php?page=player&mode=conquers&id='+playerid,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/html,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
	        alert('Request for Atom feed returned ' + responseDetails.status +
	              ' ' + responseDetails.statusText + '\n\n' +
	              'Feed data:\n' + responseDetails.responseText);
	    }
	});
}
*/


function addRow(element, table, rowType)
{
	var tr = document.createElement('tr');
	var td = document.createElement(rowType);
	td.colSpan = 2;
	
	td.appendChild(element);
	tr.appendChild(td);
	table.parentNode.appendChild(tr,mainlist);
}


function findByInner(obj,value)
{
    var len = obj.getElementsByTagName('th');
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len.length; i++)
    {
        if(len[i].innerHTML.indexOf(value) != -1)
        {
          list[a] = len[i];
          a++;
        }
    }
    list['length'] = a;
    return list;
}