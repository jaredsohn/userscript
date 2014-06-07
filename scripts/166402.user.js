// ==UserScript==
// @name       Ultibot's PvP love finder
// @namespace  http://kol.ultimater.net/namespaces/ultibots_pvp_love_finder
// @version    1.0
// @description  Helps you find players you haven't won against yet to increase your spreading the love ranking
// @include	http://*.kingdomofloathing.com/searchplayer.php*
// @include	*127.0.0.1:*/searchplayer.php*
// @author  Ultibot<ultimater at gmail dot com>
// @license	GNU-GPL http://www.gnu.org/licenses/gpl.html
// @copyright May 1st 2013 
// ==/UserScript==

//Usage: Basically you click "Fight!" then for attack you select "a specific player" then you click search players.
//Then you click "search" and it will highlight all players which you've have an offensive win against in red.

function getRecordTable(e)
{
	var tables=e.getElementsByTagName('table'),l=tables.length;
	for(var i=0;i<l;i++)
	{
	    try{
	    if(tables[i].rows[0].cells[0].firstChild.data=='Who')return tables[i];
	    }catch(E){}
	}
	return {};
}


function makeRequest(method,url,callback)
{
	var x=new XMLHttpRequest();
	x.open('GET','/peevpee.php?place=logs&mevs=1&oldseason=0');
	x.onreadystatechange=function()
	{
		if(x.readyState!=4)return;
		callback(x);
	}
	x.send(null);
}


function lrtrim(str)
{
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

var crushedPlayerIdsList={};

function parseTable(tbl)
{
	var l=tbl.rows.length;
	for(var i=1;i<l;i++)
	{
		var anchors=tbl.rows[i].cells[0].getElementsByTagName('a');
		if(!anchors.length)continue;
		var playerId=anchors[0].getAttribute('href').match(/who=(\d+)/)[1];
		//var playerName=lrtrim(tbl.rows[i].cells[0].firstChild.data||"");
		var offensiveWins=tbl.rows[i].cells[2].firstChild.data.match(/(\d+):\d+/)[1]+0;
        if(offensiveWins>0){crushedPlayerIdsList[playerId+'']=playerId+'';}
	}
   
}

function getPlayerDataTable()
{
	var tables=unsafeWindow.document.getElementsByTagName('table'),l=tables.length;
	for(var i=0;i<l;i++)
	{
		if(tables[i].rows[0].cells[0].innerHTML=='<b><u>Name</u></b>')return tables[i];
	}
	return {};
}



var tbl1=getPlayerDataTable();
if(tbl1.rows&&tbl1.rows.length>1)
makeRequest('GET','/peevpee.php?place=logs&mevs=1&oldseason=0',
function(x)
{
	var d=document.createElement('div');
	d.innerHTML=x.responseText;
	parseTable(getRecordTable(d));
	highlightTable(tbl1);
    
}
);


function highlightTable(tbl)
{
    var l=tbl.rows.length;
	for(var i=1;i<l;i++)
	{
		if(typeof crushedPlayerIdsList[tbl.rows[i].cells[1].firstChild.data]!='undefined')
		{
            console.log(i);
            for(var j=0;j<tbl.rows[i].cells.length;j++)tbl.rows[i].cells[j].style.backgroundColor="red";
        }
	}
}