// ==UserScript==
// @name           Team Page Update V2.0
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/showTeamStats.php?tid=*
// @description    This script calculates the post skill/chem/slider values for each player and presents it on the team page. NEW FEATURES: Request efficiency improved by 45%, loading timer, additional skills section (skills that do not directly affect sim points), unused skill point alerts for the entire team, and updates to include the sim changes for season 9.
// ==/UserScript==

var player1 = new Array(), player2 = new Array(), player3 = new Array(), player4 = new Array(), player5 = new Array(), player6 = new Array(), player7 = new Array(), player8 = new Array(), player9 = new Array(), player10 = new Array(), urls = new Array(), ids = new Array(), k = 1, progress = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0), chematt = new Array(), chemlevel = new Array(), extraskills = new Array(0,0,0,0,0,0,0,0,0,0,0,0), slot1 = new Array(), slot2 = new Array(), slot3 = new Array(), slot4 = new Array(), slot5 = new Array(), slot6 = new Array(), slot7 = new Array(), slot8 = new Array(), slot9 = new Array(), slot10 = new Array(), starterextra = new Array(0,"","","","","","","","","",""), benchextra = new Array(0,"","","","","","","","","",""), s = new Array(), b = new Array(), divider = document.createElement('div'), startertable = document.createElement('div'), skillsused = new Array(0,0,0,0,0,0,0,0,0,0,0), benchtable = document.createElement('div'), names = new Array();

var attributes = document.evaluate(
	'//td[@colspan="14"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

if(attributes.snapshotItem(1) != null)
{
	// Names
	
	var players = document.evaluate(
		'//td[@width="150"]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	var i = 0; j = 0;
	player1[i] = players.snapshotItem(14 + j).innerHTML;
	j++;
	player2[i] = players.snapshotItem(14 + j).innerHTML;
	j++;
	player3[i] = players.snapshotItem(14 + j).innerHTML;
	j++;
	player4[i] = players.snapshotItem(14 + j).innerHTML;
	j++;
	player5[i] = players.snapshotItem(14 + j).innerHTML;
	j++;
	player6[i] = players.snapshotItem(14 + j).innerHTML;
	j++;
	player7[i] = players.snapshotItem(14 + j).innerHTML;
	j++;
	player8[i] = players.snapshotItem(14 + j).innerHTML;
	j++;
	player9[i] = players.snapshotItem(14 + j).innerHTML;
	j++;
	player10[i] = players.snapshotItem(14 + j).innerHTML;

	names[0] = 0;
	names[1] = player1[0].slice(player1[0].indexOf('">') + 2,player1[0].indexOf('</a'));
	names[2] = player2[0].slice(player2[0].indexOf('">') + 2,player2[0].indexOf('</a'));
	names[3] = player3[0].slice(player3[0].indexOf('">') + 2,player3[0].indexOf('</a'));
	names[4] = player4[0].slice(player4[0].indexOf('">') + 2,player4[0].indexOf('</a'));
	names[5] = player5[0].slice(player5[0].indexOf('">') + 2,player5[0].indexOf('</a'));
	names[6] = player6[0].slice(player6[0].indexOf('">') + 2,player6[0].indexOf('</a'));
	names[7] = player7[0].slice(player7[0].indexOf('">') + 2,player7[0].indexOf('</a'));
	names[8] = player8[0].slice(player8[0].indexOf('">') + 2,player8[0].indexOf('</a'));
	names[9] = player9[0].slice(player9[0].indexOf('">') + 2,player9[0].indexOf('</a'));
	names[10] = player10[0].slice(player10[0].indexOf('">') + 2,player10[0].indexOf('</a'));

	for(k = 1; k < 11; k++)
	{
		names[k] = names[k].slice(27,29) + '' + names[k].slice(56);
		names[k] = names[k].slice(0,2) + ' ' + names[k].slice(2,names[k].indexOf('         '));
	}

	//Start/Bench

	if(player1[i].slice(0,3) == '<b>')
	{
		player1[i + 1] = 1;
	}
	else
	{
		player1[i + 1] = 0;
	}
	if(player2[i].slice(0,3) == '<b>')
	{
		player2[i + 1] = 1;
	}
	else
	{
		player2[i + 1] = 0;
	}
	if(player3[i].slice(0,3) == '<b>')
	{
		player3[i + 1] = 1;
	}
	else
	{
		player3[i + 1] = 0;
	}
	if(player4[i].slice(0,3) == '<b>')
	{
		player4[i + 1] = 1;
	}
	else
	{
		player4[i + 1] = 0;
	}
	if(player5[i].slice(0,3) == '<b>')
	{
		player5[i + 1] = 1;
	}
	else
	{
		player5[i + 1] = 0;
	}
	if(player6[i].slice(0,3) == '<b>')
	{
		player6[i + 1] = 1;
	}
	else
	{
		player6[i + 1] = 0;
	}
	if(player7[i].slice(0,3) == '<b>')
	{
		player7[i + 1] = 1;
	}
	else
	{
		player7[i + 1] = 0;
	}
	if(player8[i].slice(0,3) == '<b>')
	{
		player8[i + 1] = 1;
	}
	else
	{
		player8[i + 1] = 0;
	}
	if(player9[i].slice(0,3) == '<b>')
	{
		player9[i + 1] = 1;
	}
	else
	{
		player9[i + 1] = 0;
	}
	if(player10[i].slice(0,3) == '<b>')
	{
		player10[i + 1] = 1;
	}
	else
	{
		player10[i + 1] = 0;
	}

	var startercount = player1[i + 1] + player2[i + 1] + player3[i + 1] + player4[i + 1] + player5[i + 1] + player6[i + 1] + player7[i + 1] + player8[i + 1] + player9[i + 1] + player10[i + 1];

	//Attributes

	var cells = document.evaluate(
		'//td',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for(var i = 0; i < cells.snapshotLength; i++)
	{
		if(cells.snapshotItem(i).innerHTML == 'Attributes')
		{
			i += 16;
			break;
		}
	}

	for(j = 2; j < 14; j++)
	{
		player1[j] = cells.snapshotItem(i).innerHTML;
		player2[j] = cells.snapshotItem(i + 14).innerHTML;
		player3[j] = cells.snapshotItem(i + 28).innerHTML;
		player4[j] = cells.snapshotItem(i + 42).innerHTML;
		player5[j] = cells.snapshotItem(i + 56).innerHTML;
		player6[j] = cells.snapshotItem(i + 70).innerHTML;
		player7[j] = cells.snapshotItem(i + 84).innerHTML;
		player8[j] = cells.snapshotItem(i + 98).innerHTML;
		player9[j] = cells.snapshotItem(i + 112).innerHTML;
		player10[j] = cells.snapshotItem(i + 126).innerHTML;
		i++;
	}

	var sp = new Array(), tpneeded = new Array();
	sp[0] = 0;
	tpneeded[0] = 0;

	for(j = 1; j < 11; j++)
	{
		sp[j] = Math.floor(cells.snapshotItem(i).innerHTML / 100) - 2;
		tpneeded[j] = Math.floor(cells.snapshotItem(i).innerHTML / 100) * 100 + 100 - cells.snapshotItem(i).innerHTML * 1;
		i += 14;
	}

	//Urls

	j = 1;
	urls[j] = 'http://www.courtrivals.com/' + player1[0].slice(player1[0].indexOf('href="') + 6, player1[0].indexOf('">'));
	j++;
	urls[j] = 'http://www.courtrivals.com/' + player2[0].slice(player2[0].indexOf('href="') + 6, player2[0].indexOf('">'));
	j++;
	urls[j] = 'http://www.courtrivals.com/' + player3[0].slice(player3[0].indexOf('href="') + 6, player3[0].indexOf('">'));
	j++;
	urls[j] = 'http://www.courtrivals.com/' + player4[0].slice(player4[0].indexOf('href="') + 6, player4[0].indexOf('">'));
	j++;
	urls[j] = 'http://www.courtrivals.com/' + player5[0].slice(player5[0].indexOf('href="') + 6, player5[0].indexOf('">'));
	j++;
	urls[j] = 'http://www.courtrivals.com/' + player6[0].slice(player6[0].indexOf('href="') + 6, player6[0].indexOf('">'));
	j++;
	urls[j] = 'http://www.courtrivals.com/' + player7[0].slice(player7[0].indexOf('href="') + 6, player7[0].indexOf('">'));
	j++;
	urls[j] = 'http://www.courtrivals.com/' + player8[0].slice(player8[0].indexOf('href="') + 6, player8[0].indexOf('">'));
	j++;
	urls[j] = 'http://www.courtrivals.com/' + player9[0].slice(player9[0].indexOf('href="') + 6, player9[0].indexOf('">'));
	j++;
	urls[j] = 'http://www.courtrivals.com/' + player10[0].slice(player10[0].indexOf('href="') + 6, player10[0].indexOf('">'));

	//ids

	for(j = 1; j < 11; j++)
	{
		ids[j] = urls[j].slice(urls[j].indexOf('=') + 1) * 1;
	}

	var loading = document.createElement('p');

	var tables = document.evaluate(
		'//p',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	var atttable = tables.snapshotItem(3);
	var createbutton = document.createElement('button');
	createbutton.innerHTML = '<input type="button" id="start">Calculate Sim Values</input>';
	atttable.parentNode.insertBefore(createbutton, atttable.nextSibling);
	createbutton.addEventListener('click', function()
	{
		createbutton.parentNode.removeChild(createbutton);
		if(startercount != 5)
		{
			alert("Error. The starting lineup currently has " + startercount + " players. Correct the problem and try again.");
		}
		else
		{
			loading.innerHTML = '<strong>Loading ...</strong>';
			atttable.parentNode.insertBefore(loading, atttable.nextSibling);

			for(var i = 1; i < 11; i++)
			{
				retrieve(urls[i], i);
			}

			retrievechems(i);
			wait();
		}
	}, false);
}

function retrieve(url, i)
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: url,
		headers:
		{
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails)
		{		
			if(i == 1)
			{
				var reference1 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference1 = reference1.slice(reference1.indexOf('Text">') + 6);
				var slidercell1 = reference1.slice(0, reference1.indexOf('</td>'));
				reference1 = reference1.slice(reference1.indexOf('<div align="right"><strong>Skills :'));
				reference1 = reference1.slice(reference1.indexOf('Text">') + 6);
				var skillcell1 = reference1.slice(0, reference1.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell1.indexOf('<br/>') != -1)
					{
						player1 = player1.concat(slidervalueextract(slidercell1));
						player1 = player1.concat(sliderdirectionextract(slidercell1));
						slidercell1 = slidertrim(slidercell1);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell1.indexOf('<br/>') != -1)
					{
						player1 = player1.concat(skillextract(skillcell1));
						player1 = player1.concat(skilllevelextract(skillcell1));
						skillcell1 = skilltrim(skillcell1);
					}
					else
					{
						break;
					}
				}
			}
			if(i == 2)
			{
				var reference2 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference2 = reference2.slice(reference2.indexOf('Text">') + 6);
				var slidercell2 = reference2.slice(0, reference2.indexOf('</td>'));
				reference2 = reference2.slice(reference2.indexOf('<div align="right"><strong>Skills :'));
				reference2 = reference2.slice(reference2.indexOf('Text">') + 6);
				var skillcell2 = reference2.slice(0, reference2.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell2.indexOf('<br/>') != -1)
					{
						player2 = player2.concat(slidervalueextract(slidercell2));
						player2 = player2.concat(sliderdirectionextract(slidercell2));
						slidercell2 = slidertrim(slidercell2);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell2.indexOf('<br/>') != -1)
					{
						player2 = player2.concat(skillextract(skillcell2));
						player2 = player2.concat(skilllevelextract(skillcell2));
						skillcell2 = skilltrim(skillcell2);
					}
					else
					{
						break;
					}
				}
			}
			if(i == 3)
			{
				var reference3 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference3 = reference3.slice(reference3.indexOf('Text">') + 6);
				var slidercell3 = reference3.slice(0, reference3.indexOf('</td>'));
				reference3 = reference3.slice(reference3.indexOf('<div align="right"><strong>Skills :'));
				reference3 = reference3.slice(reference3.indexOf('Text">') + 6);
				var skillcell3 = reference3.slice(0, reference3.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell3.indexOf('<br/>') != -1)
					{
						player3 = player3.concat(slidervalueextract(slidercell3));
						player3 = player3.concat(sliderdirectionextract(slidercell3));
						slidercell3 = slidertrim(slidercell3);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell3.indexOf('<br/>') != -1)
					{
						player3 = player3.concat(skillextract(skillcell3));
						player3 = player3.concat(skilllevelextract(skillcell3));
						skillcell3 = skilltrim(skillcell3);
					}
					else
					{
						break;
					}
				}
			}
			if(i == 4)
			{
				var reference4 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference4 = reference4.slice(reference4.indexOf('Text">') + 6);
				var slidercell4 = reference4.slice(0, reference4.indexOf('</td>'));
				reference4 = reference4.slice(reference4.indexOf('<div align="right"><strong>Skills :'));
				reference4 = reference4.slice(reference4.indexOf('Text">') + 6);
				var skillcell4 = reference4.slice(0, reference4.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell4.indexOf('<br/>') != -1)
					{
						player4 = player4.concat(slidervalueextract(slidercell4));
						player4 = player4.concat(sliderdirectionextract(slidercell4));
						slidercell4 = slidertrim(slidercell4);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell4.indexOf('<br/>') != -1)
					{
						player4 = player4.concat(skillextract(skillcell4));
						player4 = player4.concat(skilllevelextract(skillcell4));
						skillcell4 = skilltrim(skillcell4);
					}
					else
					{
						break;
					}
				}
			}
			if(i == 5)
			{
				var reference5 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference5 = reference5.slice(reference5.indexOf('Text">') + 6);
				var slidercell5 = reference5.slice(0, reference5.indexOf('</td>'));
				reference5 = reference5.slice(reference5.indexOf('<div align="right"><strong>Skills :'));
				reference5 = reference5.slice(reference5.indexOf('Text">') + 6);
				var skillcell5 = reference5.slice(0, reference5.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell5.indexOf('<br/>') != -1)
					{
						player5 = player5.concat(slidervalueextract(slidercell5));
						player5 = player5.concat(sliderdirectionextract(slidercell5));
						slidercell5 = slidertrim(slidercell5);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell5.indexOf('<br/>') != -1)
					{
						player5 = player5.concat(skillextract(skillcell5));
						player5 = player5.concat(skilllevelextract(skillcell5));
						skillcell5 = skilltrim(skillcell5);
					}
					else
					{
						break;
					}
				}
			}
			if(i == 6)
			{
				var reference6 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference6 = reference6.slice(reference6.indexOf('Text">') + 6);
				var slidercell6 = reference6.slice(0, reference6.indexOf('</td>'));
				reference6 = reference6.slice(reference6.indexOf('<div align="right"><strong>Skills :'));
				reference6 = reference6.slice(reference6.indexOf('Text">') + 6);
				var skillcell6 = reference6.slice(0, reference6.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell6.indexOf('<br/>') != -1)
					{
						player6 = player6.concat(slidervalueextract(slidercell6));
						player6 = player6.concat(sliderdirectionextract(slidercell6));
						slidercell6 = slidertrim(slidercell6);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell6.indexOf('<br/>') != -1)
					{
						player6 = player6.concat(skillextract(skillcell6));
						player6 = player6.concat(skilllevelextract(skillcell6));
						skillcell6 = skilltrim(skillcell6);
					}
					else
					{
						break;
					}
				}
			}
			if(i == 7)
			{
				var reference7 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference7 = reference7.slice(reference7.indexOf('Text">') + 6);
				var slidercell7 = reference7.slice(0, reference7.indexOf('</td>'));
				reference7 = reference7.slice(reference7.indexOf('<div align="right"><strong>Skills :'));
				reference7 = reference7.slice(reference7.indexOf('Text">') + 6);
				var skillcell7 = reference7.slice(0, reference7.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell7.indexOf('<br/>') != -1)
					{
						player7 = player7.concat(slidervalueextract(slidercell7));
						player7 = player7.concat(sliderdirectionextract(slidercell7));
						slidercell7 = slidertrim(slidercell7);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell7.indexOf('<br/>') != -1)
					{
						player7 = player7.concat(skillextract(skillcell7));
						player7 = player7.concat(skilllevelextract(skillcell7));
						skillcell7 = skilltrim(skillcell7);
					}
					else
					{
						break;
					}
				}
			}
			if(i == 8)
			{
				var reference8 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference8 = reference8.slice(reference8.indexOf('Text">') + 6);
				var slidercell8 = reference8.slice(0, reference8.indexOf('</td>'));
				reference8 = reference8.slice(reference8.indexOf('<div align="right"><strong>Skills :'));
				reference8 = reference8.slice(reference8.indexOf('Text">') + 6);
				var skillcell8 = reference8.slice(0, reference8.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell8.indexOf('<br/>') != -1)
					{
						player8 = player8.concat(slidervalueextract(slidercell8));
						player8 = player8.concat(sliderdirectionextract(slidercell8));
						slidercell8 = slidertrim(slidercell8);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell8.indexOf('<br/>') != -1)
					{
						player8 = player8.concat(skillextract(skillcell8));
						player8 = player8.concat(skilllevelextract(skillcell8));
						skillcell8 = skilltrim(skillcell8);
					}
					else
					{
						break;
					}
				}
			}
			if(i == 9)
			{
				var reference9 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference9 = reference9.slice(reference9.indexOf('Text">') + 6);
				var slidercell9 = reference9.slice(0, reference9.indexOf('</td>'));
				reference9 = reference9.slice(reference9.indexOf('<div align="right"><strong>Skills :'));
				reference9 = reference9.slice(reference9.indexOf('Text">') + 6);
				var skillcell9 = reference9.slice(0, reference9.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell9.indexOf('<br/>') != -1)
					{
						player9 = player9.concat(slidervalueextract(slidercell9));
						player9 = player9.concat(sliderdirectionextract(slidercell9));
						slidercell9 = slidertrim(slidercell9);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell9.indexOf('<br/>') != -1)
					{
						player9 = player9.concat(skillextract(skillcell9));
						player9 = player9.concat(skilllevelextract(skillcell9));
						skillcell9 = skilltrim(skillcell9);
					}
					else
					{
						break;
					}
				}
			}
			if(i == 10)
			{
				var reference10 = responseDetails.responseText.slice(responseDetails.responseText.indexOf('<div align="right"><strong>Coaching :'),responseDetails.responseText.indexOf('id="seasonstatpane">'));
				reference10 = reference10.slice(reference10.indexOf('Text">') + 6);
				var slidercell10 = reference10.slice(0, reference10.indexOf('</td>'));
				reference10 = reference10.slice(reference10.indexOf('<div align="right"><strong>Skills :'));
				reference10 = reference10.slice(reference10.indexOf('Text">') + 6);
				var skillcell10 = reference10.slice(0, reference10.indexOf('</td>'));

				for(j = 0; j > -1; j++)
				{
					if(slidercell10.indexOf('<br/>') != -1)
					{
						player10 = player10.concat(slidervalueextract(slidercell10));
						player10 = player10.concat(sliderdirectionextract(slidercell10));
						slidercell10 = slidertrim(slidercell10);
					}
					else
					{
						break;
					}
				}

				for(j = 0; j > -1; j++)
				{
					if(skillcell10.indexOf('<br/>') != -1)
					{
						player10 = player10.concat(skillextract(skillcell10));
						player10 = player10.concat(skilllevelextract(skillcell10));
						skillcell10 = skilltrim(skillcell10);
					}
					else
					{
						break;
					}
				}
			}
			progress[i] = 1;	
		}
	})
}

function slidervalueextract(info)
{
	var a = info.slice(0,info.indexOf('<b>') - 1);
	if(a.match('%') == '%')
	{
		a = a.slice(0,a.length - 1) * 1;
	}
	return a;
}

function sliderdirectionextract(info)
{
	var a = info.slice(info.indexOf('<b>') + 3, info.indexOf('</b>'));
	return a;
}

function slidertrim(info)
{
	var a = info.slice(info.indexOf('<br/>') + 5);
	return a;
}

function skillextract(info)
{
	var a = info.slice(info.indexOf('<b>') + 3, info.indexOf(':'));
	return a;
}

function skilllevelextract(info)
{
	var a = info.slice(info.indexOf('</b>') + 4, info.indexOf('<br/>')) * 1;
	return a;
}

function skilltrim(info)
{
	var a = info.slice(info.indexOf('<br/>') + 5);
	return a;
}

function retrievechems(i)
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
		headers:
		{
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails)
		{	
			var reference = responseDetails.responseText;
			chematt[0] = 0;
			chemlevel[0] = 0;
			for(j = 1; j < 11; j++)
			{
				chematt = chematt.concat(chemattributeextract(reference, ids[j]));
				chemlevel = chemlevel.concat(chemlevelextract(reference, ids[j]));
			}
			progress[i] = 1;
		}
	});
}

function chemattributeextract(info, playerid)
{
	var a = new Array();
	a[0] = info.slice(info.indexOf('showPlayerProfile.php?pid=' + playerid));
	a[0] = a[0].slice(0, a[0].indexOf('<td'));
	a[0] = a[0].slice(a[0].indexOf('\\') + 2, a[0].indexOf(' Level'));
	return a[0];
}

function chemlevelextract(info, playerid)
{
	var a = new Array();
	a[0] = info.slice(info.indexOf('showPlayerProfile.php?pid=' + playerid));
	a[0] = a[0].slice(0, a[0].indexOf('<td'));
	a[0] = a[0].slice(a[0].indexOf('_icon_') + 6, a[0].indexOf('.jpg')) * 1;
	return a[0];
}

function wait()
{
	var x = 11;
	for(var i = 1; i < 12; i++)
	{
		x -= progress[i];
	}
	if(x == 0)
	{
		loading.innerHTML = '<strong>Loading done</strong>';

		player1 = calculate(player1, 1);
		player2 = calculate(player2, 2);
		player3 = calculate(player3, 3);
		player4 = calculate(player4, 4);
		player5 = calculate(player5, 5);
		player6 = calculate(player6, 6);
		player7 = calculate(player7, 7);
		player8 = calculate(player8, 8);
		player9 = calculate(player9, 9);
		player10 = calculate(player10, 10);

		starterextra[0] = 0;
		benchextra[0] = 0;
		sort(player1, 1);
		sort(player2, 2);
		sort(player3, 3);
		sort(player4, 4);
		sort(player5, 5);
		sort(player6, 6);
		sort(player7, 7);
		sort(player8, 8);
		sort(player9, 9);
		sort(player10, 10);
		slot1.splice(1,1);
		slot2.splice(1,1);
		slot3.splice(1,1);
		slot4.splice(1,1);
		slot5.splice(1,1);
		slot6.splice(1,1);
		slot7.splice(1,1);
		slot8.splice(1,1);
		slot9.splice(1,1);
		slot10.splice(1,1);
		starters();
	}
	else
	{
		loading.innerHTML = '<strong>Loading ' + x + '</strong>';
		window.setTimeout( function()
		{
			wait();
		}, 500);
	}
}

function calculate(a, num)
{
	for(j = 0; j > -1; j++)
	{
		if(a.length > 24)
		{
			a = skillvert(a, num);
		}
		else
		{
			break;
		}
	}

	a = chemvert(a, num);
	a = slidevert(a);

	return a;
}

function skillvert(a, num)
{
	var level = a[25] * 1;
	skillsused[num] = skillsused[num] + level;
	var skill = a[24];
	a.splice(24,2);
	var endurance = a[3];
	var m_speed = 1, m_bh = 1, m_pass = 1, m_shoot = 1, m_three = 1, m_free = 1, m_dunk = 1, m_reb = 1, m_blk = 1, m_def = 1, m_lead = 1, athleticism = 0;
	switch(skill)
	{
		case 'Court Vision':
			m_pass = (1.5 * level + 1);
			break;
		case 'Inside Presence':
			m_dunk = (1.5 * level + 1);
			break;
		case 'Smooth Shooting':
			m_shoot = (1.5 * level + 1);
			break;
		case 'Above the Rim':
			m_reb = (1.5 * level + 1);
			break;
		case 'Blanket Defender':
			m_def = (1.5 * level + 1);
			break;
		case 'SWAT Team':
			m_blk = (1.5 * level + 1);
			break;
		case 'Perfect Form':
			m_free = (1.5 * level + 1);
			break;
		case 'Hand-in-Hand':
			m_bh = (1.5 * level + 1);
			break;
		case 'Natural Leader':
			m_lead = (1.5 * level + 1);
			break;
		case 'Sharpshooter':
			m_three = (1.5 * level + 1);
			break;
		case 'Triple Threat':
			m_dunk = (.25 * level + 1);
			m_shoot = (.25 * level + 1);
			m_three = (.25 * level + 1);
			break;
		case 'Quick Feet':
			m_speed = (1.5 * level + 1);
			break;
		case 'Total Coverage':
			m_reb = (.25 * level + 1);
			m_def = (.25 * level + 1);
			m_blk = (.25 * level + 1);
			break;
		case 'Fundamentals':
			m_free = (.25 * level + 1);
			m_bh = (.25 * level + 1);
			m_lead = (.25 * level + 1);
			break;
		case 'Infinite Range':
			m_pass = (.25 * level + 1);
			if(extraskills[num] == 0)
			{
				extraskills[num] = skill + ': ' + level + '<br>';
			}
			else
			{
				extraskills[num] = extraskills[num] + skill + ': ' + level + '<br>';
			}
			break;
		case 'Box Out':
			m_speed = (.25 * level + 1);
			if(extraskills[num] == 0)
			{
				extraskills[num] = skill + ': ' + level + '<br>';
			}
			else
			{
				extraskills[num] = extraskills[num] + skill + ': ' + level + '<br>';
			}
			break;
		case 'Athleticism':
			athleticism = endurance / 100;
		default:
			if(extraskills[num] == 0)
			{
				extraskills[num] = skill + ': ' + level + '<br>';
			}
			else
			{
				extraskills[num] = extraskills[num] + skill + ': ' + level + '<br>';
			}
	}

	a[2] = Math.floor(a[2] * m_speed + athleticism);
	a[4] = Math.floor(a[4] * m_bh + athleticism);
	a[5] = Math.floor(a[5] * m_pass + athleticism);
	a[6] = Math.floor(a[6] * m_shoot + athleticism);
	a[7] = Math.floor(a[7] * m_three + athleticism);
	a[8] = Math.floor(a[8] * m_free + athleticism);
	a[9] = Math.floor(a[9] * m_dunk + athleticism);
	a[10] = Math.floor(a[10] * m_reb + athleticism);
	a[11] = Math.floor(a[11] * m_blk + athleticism);
	a[12] = Math.floor(a[12] * m_def + athleticism);
	a[13] = Math.floor(a[13] * m_lead + athleticism);

	return a;
}

function chemvert(a, num)
{
	var chem = chematt[num];
	var level = chemlevel[num];
	var m_speed = 1, m_bh = 1, m_pass = 1, m_shoot = 1, m_three = 1, m_free = 1, m_dunk = 1, m_reb = 1, m_blk = 1, m_def = 1, m_lead = 1;
	switch(chem)
	{
		case 'Passing':
			m_pass = (0.5 * level + 1) * 1;
			break;
		case 'Dunking':
			m_dunk = (0.5 * level + 1) * 1;
			break;
		case 'Shooting':
			m_shoot = (0.5 * level + 1) * 1;
			break;
		case 'Rebounding':
			m_reb = (0.5 * level + 1) * 1;
			break;
		case 'Defense':
			m_def = (0.5 * level + 1) * 1;
			break;
		case 'Blocking':
			m_blk = (0.5 * level + 1) * 1;
			break;
		case 'Free Throws':
			m_free = (0.5 * level + 1) * 1;
			break;
		case 'Ball Handling':
			m_bh = (0.5 * level + 1) * 1;
			break;
		case 'Leadership':
			m_lead = (0.5 * level + 1) * 1;
			break;
		case '3 Point Shooting':
			m_three = (0.5 * level + 1) * 1;
			break;
		case 'Speed':
			m_dunk = (0.5 * level + 1) * 1;
			break;
		default:
			// Nothing
	}

	a[2] = Math.floor(a[2] * m_speed);
	a[4] = Math.floor(a[4] * m_bh);
	a[5] = Math.floor(a[5] * m_pass);
	a[6] = Math.floor(a[6] * m_shoot);
	a[7] = Math.floor(a[7] * m_three);
	a[8] = Math.floor(a[8] * m_free);
	a[9] = Math.floor(a[9] * m_dunk);
	a[10] = Math.floor(a[10] * m_reb);
	a[11] = Math.floor(a[11] * m_blk);
	a[12] = Math.floor(a[12] * m_def);
	a[13] = Math.floor(a[13] * m_lead);

	return a;
}

function slidevert(a)
{
	for(var k = 0; k < 5; k++)
	{
		if(a[14 + 2 * k] > 0) //== 'Neutral' || a[14 + 2 * k] == '                Neutral')
		{
			
		}
		else
		{
			a[14 + 2 * k] = 0;
		}
	}

	if(a[15] == "Take More 3's")
	{
		a[7] += Math.floor(a[14] / 100 * a[4]);
		a[4] = Math.floor((1 - a[14] / 100) * a[4]);
	}
	else
	{
		a[13] += Math.floor(a[14] / 200 * a[7]);
		a[4] += Math.floor(a[14] / 200 * a[7]);
		a[7] = Math.floor((1 - a[14] / 100) * a[7]);
	}

	if(a[17] == "Pass More")
	{
		a[4] += Math.floor(a[16] / 200 * a[8]);
		a[5] += Math.floor(a[16] / 200 * a[8]);
		a[8] = Math.floor((1 - a[16] / 100) * a[8]);
	}
	else
	{
		a[8] += Math.floor(a[16] / 200 * a[5]);
		a[6] += Math.floor(a[16] / 200 * a[5]);
		a[5] = Math.floor((1 - a[16] / 100) * a[5]);
	}

	if(a[19] == "Take Jump Shots")
	{
		a[8] += Math.floor(a[18] / 400 * a[9]);
		a[6] += Math.floor(a[18] * 3 / 400 * a[9]);
		a[9] = Math.floor((1 - a[18] / 100) * a[9]);
	}
	else
	{
		a[8] += Math.floor(a[18] / 400 * a[6]);
		a[9] += Math.floor(a[18] * 3 / 400 * a[6]);
		a[6] = Math.floor((1 - a[18] / 100) * a[6]);
	}

	if(a[21] == "Get Back on Defense")
	{
		a[2] += Math.floor(a[20] / 100 * a[10]);
		a[10] = Math.floor((1 - a[20] / 100) * a[10]);
	}
	else
	{
		a[10] += Math.floor(a[20] / 100 * a[2]);
		a[2] = Math.floor((1 - a[20] / 100) * a[2]);
	}

	if(a[23] == "Play Conservative Defense")
	{
		a[13] += Math.floor(a[22] / 100 * a[12]);
		a[12] = Math.floor((1 - a[22] / 100) * a[12]);
	}
	else
	{
		if(a[11] > a[12])
		{
			a[11] += Math.floor(a[22] / 100 * a[13]);
		}
		else
		{
			a[12] += Math.floor(a[22] / 100 * a[13]);
		}
		a[13] = Math.floor((1 - a[22] / 100) * a[13]);
	}
	
	for(k = 0; k < 10; k++)
	{
		a.pop();
	}
	
	a[14] = 0;
	for(k = 2; k < 14; k++)
	{
		a[14] += a[k] * 1;
	}

	return a;
}

function sort(a, num)
{
	loading.innerHTML = '<strong>Sorting ...</strong>';

	if(a[1] == 1)
	{
		if(slot1[0] == undefined)
		{
			slot1 = a;
		}
		else if(slot2[0] == undefined)
		{
			slot2 = a;
		}
		else if(slot3[0] == undefined)
		{
			slot3 = a;
		}
		else if(slot4[0] == undefined)
		{
			slot4 = a;
		}
		else if(slot5[0] == undefined)
		{
			slot5 = a;
		}

		if(extraskills[num] != 0)
		{
			starterextra[extraskills[0] + 1] = a[0];
			starterextra[extraskills[0] + 2] = extraskills[num];
			extraskills[0] += 2;
		}
	}
	else
	{
		if(slot6[0] == undefined)
		{
			slot6 = a;
		}
		else if(slot7[0] == undefined)
		{
			slot7 = a;
		}
		else if(slot8[0] == undefined)
		{
			slot8 = a;
		}
		else if(slot9[0] == undefined)
		{
			slot9 = a;
		}
		else if(slot10[0] == undefined)
		{
			slot10 = a;
		}

		if(extraskills[num] != 0)
		{
			benchextra[extraskills[11] + 1] = a[0];
			benchextra[extraskills[11] + 2] = extraskills[num];
			extraskills[11] += 2;
		}
	}
}

function starters()
{
	loading.parentNode.removeChild(loading);
	for(k = 1; k < 14; k++)
	{
		s[k] = slot1[k] * 1 + slot2[k] * 1 + slot3[k] * 1 + slot4[k] * 1 + slot5[k] * 1;
	}

	var tables = document.evaluate(
		'//p',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	var atttable = tables.snapshotItem(3);

	divider.innerHTML = '<div><p><strong>Post-Skills / Chems / Sliders</strong></p></div>';
	atttable.parentNode.insertBefore(divider, atttable.nextSibling);

	startertable.innerHTML = '<div><p>&nbsp;</p><table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">' +
			'<tr><td colspan="14" bgcolor="#000080" class="tableHeader2">Starters</td></tr>' +
				'<tr align="left"><td width="210" bgcolor="#C6C6A8" class="loginBottomText"><strong>Name</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Spd</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>End</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Ball</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Pas</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Sht</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>3Pt</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Free</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Dunk</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Reb</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Blk</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Def</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Lead</strong></td>' +
				'<td width="98" bgcolor="#000000" class="loginBottomText"><strong><span class="tableHeader2">Total</span></strong></td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot1[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot2[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot3[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot4[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot5[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#C6C6A8" class="loginBottomText"><strong>Total:</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[1] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[2] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[3] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[4] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[5] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[6] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[7] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[8] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[9] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[10] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[11] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + s[12] + '</td>' +
				'<td width="98" bgcolor="#C6C6A8" class="loginBottomText">' + s[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#C6C6A8" class="loginBottomText"><strong>Average:</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[1] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[2] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[3] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[4] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[5] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[6] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[7] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[8] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[9] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[10] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[11] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[12] * 2) / 10 + '</td>' +
				'<td width="98" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(s[13] * 2) / 10 + '</td></tr></table></div>';

	divider.parentNode.insertBefore(startertable, divider.nextSibling);

	bench();
}

function bench()
{
	for(k = 1; k < 14; k++)
	{
		b[k] = slot6[k] * 1 + slot7[k] * 1 + slot8[k] * 1 + slot9[k] * 1 + slot10[k] * 1;
	}

	benchtable.innerHTML = '<div><p>&nbsp;</p><table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">' +
			'<tr><td colspan="14" bgcolor="#800000" class="tableHeader2">Bench</td></tr>' +
				'<tr align="left"><td width="210" bgcolor="#C6C6A8" class="loginBottomText"><strong>Name</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Spd</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>End</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Ball</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Pas</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Sht</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>3Pt</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Free</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Dunk</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Reb</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Blk</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Def</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText"><strong>Lead</strong></td>' +
				'<td width="98" bgcolor="#000000" class="loginBottomText"><strong><span class="tableHeader2">Total</span></strong></td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot6[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot7[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot8[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot9[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[0] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[1] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[2] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[3] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[4] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[5] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[6] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[7] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[8] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[9] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[10] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[11] + '</td>' +
				'<td width="60" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[12] + '</td>' +
				'<td width="98" bgcolor="#F1E7C5" class="loginBottomText">' + slot10[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#C6C6A8" class="loginBottomText"><strong>Total:</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[1] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[2] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[3] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[4] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[5] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[6] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[7] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[8] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[9] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[10] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[11] + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + b[12] + '</td>' +
				'<td width="98" bgcolor="#C6C6A8" class="loginBottomText">' + b[13] + '</td></tr>' +
			'<tr align="left"><td width="210" bgcolor="#C6C6A8" class="loginBottomText"><strong>Average:</strong></td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[1] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[2] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[3] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[4] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[5] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[6] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[7] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[8] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[9] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[10] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[11] * 2) / 10 + '</td>' +
				'<td width="60" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[12] * 2) / 10 + '</td>' +
				'<td width="98" bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(b[13] * 2) / 10 + '</td></tr></table></div>';

	startertable.parentNode.insertBefore(benchtable, startertable.nextSibling);

	additionalskills();
}

function additionalskills()
{
	var starterextratable = document.createElement('table');
	starterextratable.innerHTML = '<table><tr><td width="200" align="center">' + starterextra[1] + '</td><td width="200" align="center">' + starterextra[3] + '</td><td width="200" align="center">' + starterextra[5] + '</td><td width="200" align="center">' + starterextra[7] + '</td><td width="200" align="center">' + starterextra[9] + '</td></tr>' +
		'<tr><td width="200" align="center">' + starterextra[2] + '</td><td width="200" align="center">' + starterextra[4] + '</td><td width="200" align="center">' + starterextra[6] + '</td><td width="200" align="center">' + starterextra[8] + '</td><td width="200" align="center">' + starterextra[10] + '</td></tr></table>';
	startertable.parentNode.insertBefore(starterextratable, startertable.nextSibling);	

	var benchextratable = document.createElement('table');
	benchextratable.innerHTML = '<table><tr><td width="200" align="center">' + benchextra[1] + '</td><td width="200" align="center">' + benchextra[3] + '</td><td width="200" align="center">' + benchextra[5] + '</td><td width="200" align="center">' + benchextra[7] + '</td><td width="200" align="center">' + benchextra[9] + '</td></tr>' +
		'<tr><td width="200" align="center">' + benchextra[2] + '</td><td width="200" align="center">' + benchextra[4] + '</td><td width="200" align="center">' + benchextra[6] + '</td><td width="200" align="center">' + benchextra[8] + '</td><td width="200" align="center">' + benchextra[10] + '</td></tr></table>';
	benchtable.parentNode.insertBefore(benchextratable, benchtable.nextSibling);	

	skillanalysis();
}

function skillanalysis()
{
	var skillpointalert = "";

	for(k = 1; k < 11; k++)
	{
		var differential = sp[k] - skillsused[k];

		if(differential > 1)
		{
			skillpointalert = skillpointalert + names[k] + ' has ' + differential + ' unused skill points.\n';
		}
		else if(differential > 0)
		{
			skillpointalert = skillpointalert + names[k] + ' has an unused skill point.\n';
		}
	}

	if(skillpointalert != "")
	{
		alert(skillpointalert);
	}
}