// ==UserScript==
// @name           	Ikariam - General Aid Tool v2.0
// @namespace      http://ikariamlibrary.com/
// @description    Aids the general by highlighting blockades to the same player and give a purple general advisor when an ally is under attack
// @include        	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

function incomingAttacks(responseDetails) 
{
	var div = document.createElement('div');
		div.innerHTML = responseDetails.responseText;
		
	var attacksTable = div.getElementsByTagName('table')[0];
	
	var attacks = 0;	
	for (var i=1; i < attacksTable.rows.length; i++)
	{
		var attacker = attacksTable.rows[i].cells[3].getElementsByTagName('a')[0].innerHTML;
		var target = attacksTable.rows[i].cells[4].getElementsByTagName('a')[0].innerHTML;
		if (attacker != target)
			attacks++;
	}
	if (attacks > 0)
	{
		var milAdvisor = document.getElementById('advMilitary').getElementsByTagName('a')[0];
		milAdvisor.getElementsByTagName('span')[0].innerHTML = 'Military ('+attacks+')';
		milAdvisor.style.backgroundImage = "url('http://ikariam.feanturi.nl/general_alert_alliance.gif')";
	}
}

function getPage(page, onload)
{
	cityid = document.getElementById('citySelect')[document.getElementById('citySelect').selectedIndex].value;
	var gameServer = top.location.host;
	GM_xmlhttpRequest(
	{
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view="+page+"&id="+cityid+"&position=7",
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
				},
        onload:onload
    });
}


window.addEventListener('load',  function() 
{ 
try
{
	// Updates the general advisor with a purple color, when an ally us under attack
	getPage('embassyGeneralAttacksToAlly', incomingAttacks);

	// Ongoing attacks from alliance View
	if (document.getElementById('embassyGeneralAttacksFromAlly'))
	{
		var attacksTable = document.getElementsByTagName('table')[0];
		var blockadesTable = new Array();
		for (var i=1; i < attacksTable.rows.length; i++)
		{
			if (attacksTable.rows[i].cells[1].innerHTML == 'Blockade')
			{
				var target = attacksTable.rows[i].cells[4].innerHTML;
				for (var j = 0; j < blockadesTable.length; j++)
				{
					if (target == blockadesTable[j][0])
					{
						attacksTable.rows[i].style.backgroundColor = "#FF9999";
						attacksTable.rows[blockadesTable[j][1]].style.backgroundColor = "#FF9999";
					}
				}
				blockadesTable[blockadesTable.length] = new Array(target,i);
			}
		}
	}
}
catch(er){alert(er)}
},
    true);