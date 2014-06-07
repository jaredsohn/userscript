// ==UserScript==
// @name           Team Page Update
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/showTeamStats.php?tid=*
// ==/UserScript==

var player1speed, player1end, player1ball, player1pass, player1shoot, player1three, player1free, player1dunk, player1rebound, player1block, player1def, player1lead, player2speed, player2end, player2ball, player2pass, player2shoot, player2three, player2free, player2dunk, player2rebound, player2block, player2def, player2lead, player3speed, player3end, player3ball, player3pass, player3shoot, player3three, player3free, player3dunk, player3rebound, player3block, player3def, player3lead, player4speed, player4end, player4ball, player4pass, player4shoot, player4three, player4free, player4dunk, player4rebound, player4block, player4def, player4lead, player5speed, player5end, player5ball, player5pass, player5shoot, player5three, player5free, player5dunk, player5rebound, player5block, player5def, player5lead, player6speed, player6end, player6ball, player6pass, player6shoot, player6three, player6free, player6dunk, player6rebound, player6block, player6def, player6lead;
var player7speed, player7end, player7ball, player7pass, player7shoot, player7three, player7free, player7dunk, player7rebound, player7block, player7def, player7lead, player8speed, player8end, player8ball, player8pass, player8shoot, player8three, player8free, player8dunk, player8rebound, player8block, player8def, player8lead, player9speed, player9end, player9ball, player9pass, player9shoot, player9three, player9free, player9dunk, player9rebound, player9block, player9def, player9lead, player10speed, player10end, player10ball, player10pass, player10shoot, player10three, player10free, player10dunk, player10rebound, player10block, player10def, player10lead;

var players = document.evaluate(
	'//td[@width="150"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var player1name = players.snapshotItem(3).innerHTML;
var player1 = players.snapshotItem(3).innerHTML.slice(players.snapshotItem(3).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(3).innerHTML.slice(0,3) == '<b>')
{
	var player1start = 1;
}
else
{
	var player1start = 0;
}
player1id = player1.slice(0,player1.indexOf('"'));
player1url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player1id;

var player2name = players.snapshotItem(4).innerHTML;
var player2 = players.snapshotItem(4).innerHTML.slice(players.snapshotItem(4).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(4).innerHTML.slice(0,3) == '<b>')
{
	var player2start = 1;
}
else
{
	var player2start = 0;
}
player2id = player2.slice(0,player2.indexOf('"'));
player2url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player2id;

var player3name = players.snapshotItem(5).innerHTML;
var player3 = players.snapshotItem(5).innerHTML.slice(players.snapshotItem(5).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(5).innerHTML.slice(0,3) == '<b>')
{
	var player3start = 1;
}
else
{
	var player3start = 0;
}
player3id = player3.slice(0,player3.indexOf('"'));
player3url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player3id;

var player4name = players.snapshotItem(6).innerHTML;
var player4 = players.snapshotItem(6).innerHTML.slice(players.snapshotItem(6).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(6).innerHTML.slice(0,3) == '<b>')
{
	var player4start = 1;
}
else
{
	var player4start = 0;
}
player4id = player4.slice(0,player4.indexOf('"'));
player4url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player4id;

var player5name = players.snapshotItem(7).innerHTML;
var player5 = players.snapshotItem(7).innerHTML.slice(players.snapshotItem(7).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(7).innerHTML.slice(0,3) == '<b>')
{
	var player5start = 1;
}
else
{
	var player5start = 0;
}
player5id = player5.slice(0,player5.indexOf('"'));
player5url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player5id;

var player6name = players.snapshotItem(8).innerHTML;
var player6 = players.snapshotItem(8).innerHTML.slice(players.snapshotItem(8).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(8).innerHTML.slice(0,3) == '<b>')
{
	var player6start = 1;
}
else
{
	var player6start = 0;
}
player6id = player6.slice(0,player6.indexOf('"'));
player6url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player6id;

var player7name = players.snapshotItem(9).innerHTML;
var player7 = players.snapshotItem(9).innerHTML.slice(players.snapshotItem(9).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(9).innerHTML.slice(0,3) == '<b>')
{
	var player7start = 1;
}
else
{
	var player7start = 0;
}
player7id = player7.slice(0,player7.indexOf('"'));
player7url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player7id;

var player8name = players.snapshotItem(10).innerHTML;
var player8 = players.snapshotItem(10).innerHTML.slice(players.snapshotItem(10).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(10).innerHTML.slice(0,3) == '<b>')
{
	var player8start = 1;
}
else
{
	var player8start = 0;
}
player8id = player8.slice(0,player8.indexOf('"'));
player8url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player8id;

var player9name = players.snapshotItem(11).innerHTML;
var player9 = players.snapshotItem(11).innerHTML.slice(players.snapshotItem(11).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(11).innerHTML.slice(0,3) == '<b>')
{
	var player9start = 1;
}
else
{
	var player9start = 0;
}
player9id = player9.slice(0,player9.indexOf('"'));
player9url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player9id;

var player10name = players.snapshotItem(12).innerHTML;
var player10 = players.snapshotItem(12).innerHTML.slice(players.snapshotItem(12).innerHTML.indexOf("pid=") + 4);
if(players.snapshotItem(12).innerHTML.slice(0,3) == '<b>')
{
	var player10start = 1;
}
else
{
	var player10start = 0;
}
player10id = player10.slice(0,player10.indexOf('"'));
player10url = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + player10id;

var testpremium = document.getElementById("frmPlayerId");
if(testpremium == null)
{
	var i = 11;
}
else
{
	var i = 10;
}

var findplayer = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var currentplayer = findplayer.snapshotItem(i).href;
var currentid = currentplayer.slice(currentplayer.indexOf("pid=") + 4);

if(currentid == player1id || currentid == player2id || currentid == player3id || currentid == player4id || currentid == player5id || currentid == player6id || currentid == player7id || currentid == player8id || currentid == player9id || currentid == player10id)
{
	create();
}

function create()
{
calculate1(player1url);
calculate2(player2url);
calculate3(player3url);
calculate4(player4url);
calculate5(player5url);
calculate6(player6url);
calculate7(player7url);
calculate8(player8url);
calculate9(player9url);
calculate10(player10url);


function calculate1(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player1speed = 0;
				player1end = 0;
				player1ball = 0;
				player1pass = 0;
				player1shoot = 0;
				player1three = 0;
				player1free = 0;
				player1dunk = 0;
				player1rebound = 0;
				player1block = 0;
				player1def = 0;
				player1lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;
			
			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	
		
			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player1id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player1id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player1speed = Math.floor(speed4);
					player1end = Math.floor(endurance1);
					player1ball = Math.floor(ballhandling4);
					player1pass = Math.floor(passing4);
					player1shoot = Math.floor(shooting4);
					player1three = Math.floor(threept4);
					player1free = Math.floor(freethrows4);
					player1dunk = Math.floor(dunking4);
					player1rebound = Math.floor(rebounding4);
					player1block = Math.floor(blocking4);
					player1def = Math.floor(defense4);
					player1lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}


function calculate2(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player2speed = 0;
				player2end = 0;
				player2ball = 0;
				player2pass = 0;
				player2shoot = 0;
				player2three = 0;
				player2free = 0;
				player2dunk = 0;
				player2rebound = 0;
				player2block = 0;
				player2def = 0;
				player2lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;
			
			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	

			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player2id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player2id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player2speed = Math.floor(speed4);
					player2end = Math.floor(endurance1);
					player2ball = Math.floor(ballhandling4);
					player2pass = Math.floor(passing4);
					player2shoot = Math.floor(shooting4);
					player2three = Math.floor(threept4);
					player2free = Math.floor(freethrows4);
					player2dunk = Math.floor(dunking4);
					player2rebound = Math.floor(rebounding4);
					player2block = Math.floor(blocking4);
					player2def = Math.floor(defense4);
					player2lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}


function calculate3(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player3speed = 0;
				player3end = 0;
				player3ball = 0;
				player3pass = 0;
				player3shoot = 0;
				player3three = 0;
				player3free = 0;
				player3dunk = 0;
				player3rebound = 0;
				player3block = 0;
				player3def = 0;
				player3lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;
			
			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	
		
			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player3id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player3id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player3speed = Math.floor(speed4);
					player3end = Math.floor(endurance1);
					player3ball = Math.floor(ballhandling4);
					player3pass = Math.floor(passing4);
					player3shoot = Math.floor(shooting4);
					player3three = Math.floor(threept4);
					player3free = Math.floor(freethrows4);
					player3dunk = Math.floor(dunking4);
					player3rebound = Math.floor(rebounding4);
					player3block = Math.floor(blocking4);
					player3def = Math.floor(defense4);
					player3lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}


function calculate4(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player4speed = 0;
				player4end = 0;
				player4ball = 0;
				player4pass = 0;
				player4shoot = 0;
				player4three = 0;
				player4free = 0;
				player4dunk = 0;
				player4rebound = 0;
				player4block = 0;
				player4def = 0;
				player4lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;
			
			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	
		
			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player4id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player4id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player4speed = Math.floor(speed4);
					player4end = Math.floor(endurance1);
					player4ball = Math.floor(ballhandling4);
					player4pass = Math.floor(passing4);
					player4shoot = Math.floor(shooting4);
					player4three = Math.floor(threept4);
					player4free = Math.floor(freethrows4);
					player4dunk = Math.floor(dunking4);
					player4rebound = Math.floor(rebounding4);
					player4block = Math.floor(blocking4);
					player4def = Math.floor(defense4);
					player4lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}


function calculate5(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player5speed = 0;
				player5end = 0;
				player5ball = 0;
				player5pass = 0;
				player5shoot = 0;
				player5three = 0;
				player5free = 0;
				player5dunk = 0;
				player5rebound = 0;
				player5block = 0;
				player5def = 0;
				player5lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;
			
			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	
		
			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player5id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player5id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player5speed = Math.floor(speed4);
					player5end = Math.floor(endurance1);
					player5ball = Math.floor(ballhandling4);
					player5pass = Math.floor(passing4);
					player5shoot = Math.floor(shooting4);
					player5three = Math.floor(threept4);
					player5free = Math.floor(freethrows4);
					player5dunk = Math.floor(dunking4);
					player5rebound = Math.floor(rebounding4);
					player5block = Math.floor(blocking4);
					player5def = Math.floor(defense4);
					player5lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}


function calculate6(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player6speed = 0;
				player6end = 0;
				player6ball = 0;
				player6pass = 0;
				player6shoot = 0;
				player6three = 0;
				player6free = 0;
				player6dunk = 0;
				player6rebound = 0;
				player6block = 0;
				player6def = 0;
				player6lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;
			
			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	
		
			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player6id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player6id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player6speed = Math.floor(speed4);
					player6end = Math.floor(endurance1);
					player6ball = Math.floor(ballhandling4);
					player6pass = Math.floor(passing4);
					player6shoot = Math.floor(shooting4);
					player6three = Math.floor(threept4);
					player6free = Math.floor(freethrows4);
					player6dunk = Math.floor(dunking4);
					player6rebound = Math.floor(rebounding4);
					player6block = Math.floor(blocking4);
					player6def = Math.floor(defense4);
					player6lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}


function calculate7(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player7speed = 0;
				player7end = 0;
				player7ball = 0;
				player7pass = 0;
				player7shoot = 0;
				player7three = 0;
				player7free = 0;
				player7dunk = 0;
				player7rebound = 0;
				player7block = 0;
				player7def = 0;
				player7lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;

			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	

			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player7id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player7id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player7speed = Math.floor(speed4);
					player7end = Math.floor(endurance1);
					player7ball = Math.floor(ballhandling4);
					player7pass = Math.floor(passing4);
					player7shoot = Math.floor(shooting4);
					player7three = Math.floor(threept4);
					player7free = Math.floor(freethrows4);
					player7dunk = Math.floor(dunking4);
					player7rebound = Math.floor(rebounding4);
					player7block = Math.floor(blocking4);
					player7def = Math.floor(defense4);
					player7lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}


function calculate8(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player8speed = 0;
				player8end = 0;
				player8ball = 0;
				player8pass = 0;
				player8shoot = 0;
				player8three = 0;
				player8free = 0;
				player8dunk = 0;
				player8rebound = 0;
				player8block = 0;
				player8def = 0;
				player8lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;
			
			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	
		
			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player8id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player8id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player8speed = Math.floor(speed4);
					player8end = Math.floor(endurance1);
					player8ball = Math.floor(ballhandling4);
					player8pass = Math.floor(passing4);
					player8shoot = Math.floor(shooting4);
					player8three = Math.floor(threept4);
					player8free = Math.floor(freethrows4);
					player8dunk = Math.floor(dunking4);
					player8rebound = Math.floor(rebounding4);
					player8block = Math.floor(blocking4);
					player8def = Math.floor(defense4);
					player8lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}


function calculate9(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player9speed = 0;
				player9end = 0;
				player9ball = 0;
				player9pass = 0;
				player9shoot = 0;
				player9three = 0;
				player9free = 0;
				player9dunk = 0;
				player9rebound = 0;
				player9block = 0;
				player9def = 0;
				player9lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;
			
			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	
		
			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player9id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player9id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player9speed = Math.floor(speed4);
					player9end = Math.floor(endurance1);
					player9ball = Math.floor(ballhandling4);
					player9pass = Math.floor(passing4);
					player9shoot = Math.floor(shooting4);
					player9three = Math.floor(threept4);
					player9free = Math.floor(freethrows4);
					player9dunk = Math.floor(dunking4);
					player9rebound = Math.floor(rebounding4);
					player9block = Math.floor(blocking4);
					player9def = Math.floor(defense4);
					player9lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}


function calculate10(url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {

			var reference = responseDetails.responseText.slice(responseDetails.responseText.indexOf('Speed:') + 16);
			if(reference.indexOf('Endurance:') == -1)
			{
				player10speed = 0;
				player10end = 0;
				player10ball = 0;
				player10pass = 0;
				player10shoot = 0;
				player10three = 0;
				player10free = 0;
				player10dunk = 0;
				player10rebound = 0;
				player10block = 0;
				player10def = 0;
				player10lead = 0;
			}
			else
			{

			//*********************************************************************
			// Get Attributes
			//*********************************************************************

			var speed1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var endurance1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var ballhandling1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var passing1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var shooting1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var threept1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var freethrows1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var dunking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var rebounding1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var blocking1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var defense1 = reference.slice(0,reference.indexOf("<")) * 1;
			reference = reference.slice(reference.indexOf('</strong>') + 9);
			var leadership1 = reference.slice(0,reference.indexOf("<")) * 1;


			//*********************************************************************
			// Get Sliders
			//*********************************************************************

			reference = reference.slice(reference.indexOf('Coaching :') + 141);
			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var threepercentage1 = 0;
			}
			else
			{
				var threepercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var threedirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var passshootpercentage1 = 0;
			}
			else
			{
				var passshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var passshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var attackshootpercentage1 = 0;
			}
			else
			{
				var attackshootpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var attackshootdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var crashbackpercentage1 = 0;
			}
			else
			{
				var crashbackpercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var crashbackdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('<br/>') + 5);

			if(reference.slice(0,reference.indexOf("<") - 2) == 'Neutra')
			{
				var chancespercentage1 = 0;
			}
			else
			{
				var chancespercentage1 = reference.slice(0,reference.indexOf("<") - 2) * 1;
			}
			var chancesdirection1 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("</"));
			reference = reference.slice(reference.indexOf('Skills :') + 20);
			reference = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf('</tr>'));

			//*********************************************************************
			// Get Skills
			//*********************************************************************

			var skill1 = reference.slice(0,reference.indexOf(':'));
			var skill1lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill1.indexOf('</td>') > 1)
			{
				skill1 = "";
				skill1lvl = 0;
			}
			var skill2 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill2lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill2.indexOf('</td>') > 1)
			{
				skill2 = "";
				skill2lvl = 0;
			}
			var skill3 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill3lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill3.indexOf('</td>') > 1)
			{
				skill3 = "";
				skill3lvl = 0;
			}
			var skill4 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill4lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill4.indexOf('</td>') > 1)
			{
				skill4 = "";
				skill4lvl = 0;
			}
			var skill5 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill5lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill5.indexOf('</td>') > 1)
			{
				skill5 = "";
				skill5lvl = 0;
			}
			var skill6 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill6lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill6.indexOf('</td>') > 1)
			{
				skill6 = "";
				skill6lvl = 0;
			}
			var skill7 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill7lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill7.indexOf('</td>') > 1)
			{
				skill7 = "";
				skill7lvl = 0;
			}
			var skill8 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill8lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill8.indexOf('</td>') > 1)
			{
				skill8 = "";
				skill8lvl = 0;
			}
			var skill9 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill9lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill9.indexOf('</td>') > 1)
			{
				skill9 = "";
				skill9lvl = 0;
			}
			var skill10 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill10lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill10.indexOf('</td>') > 1)
			{
				skill10 = "";
				skill10lvl = 0;
			}
			var skill11 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill11lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill11.indexOf('</td>') > 1)
			{
				skill11 = "";
				skill11lvl = 0;
			}
			var skill12 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill12lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill12.indexOf('</td>') > 1)
			{
				skill12 = "";
				skill12lvl = 0;
			}
			var skill13 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill13lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill13.indexOf('</td>') > 1)
			{
				skill13 = "";
				skill13lvl = 0;
			}
			var skill14 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill14lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill14.indexOf('</td>') > 1)
			{
				skill14 = "";
				skill14lvl = 0;
			}
			var skill15 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill15lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill15.indexOf('</td>') > 1)
			{
				skill15 = "";
				skill15lvl = 0;
			}
			var skill16 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill16lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill16.indexOf('</td>') > 1)
			{
				skill16 = "";
				skill16lvl = 0;
			}
			var skill17 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill17lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill17.indexOf('</td>') > 1)
			{
				skill17 = "";
				skill17lvl = 0;
			}
			var skill18 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill18lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill18.indexOf('</td>') > 1)
			{
				skill18 = "";
				skill18lvl = 0;
			}
			var skill19 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill19lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill19.indexOf('</td>') > 1)
			{
				skill19 = "";
				skill19lvl = 0;
			}
			var skill20 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill20lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill20.indexOf('</td>') > 1)
			{
				skill20 = "";
				skill20lvl = 0;
			}
			var skill21 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill21lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill21.indexOf('</td>') > 1)
			{
				skill21 = "";
				skill21lvl = 0;
			}
			var skill22 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill22lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill22.indexOf('</td>') > 1)
			{
				skill22 = "";
				skill22lvl = 0;
			}
			var skill23 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill23lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill23.indexOf('</td>') > 1)
			{
				skill23 = "";
				skill23lvl = 0;
			}
			var skill24 = reference.slice(reference.indexOf('<b>') + 3,reference.indexOf(':'));
			var skill24lvl = reference.slice(reference.indexOf('</b>') + 5,reference.indexOf('</b>') + 6) * 1;
			reference = reference.slice(reference.indexOf('</b>') + 6);
			if(skill24.indexOf('</td>') > 1)
			{
				skill24 = "";
				skill24lvl = 0;
			}

			//*********************************************************************
			// Athleticism
			//*********************************************************************

			if(skill1 == "Athleticism" || skill2 == "Athleticism" || skill3 == "Athleticism" || skill4 == "Athleticism" || skill5 == "Athleticism" || skill6 == "Athleticism" || skill7 == "Athleticism" || skill8 == "Athleticism" || skill9 == "Athleticism" || skill10 == "Athleticism" || skill11 == "Athleticism" || skill12 == "Athleticism" || skill13 == "Athleticism" || skill14 == "Athleticism" || skill15 == "Athleticism" || skill16 == "Athleticism" || skill17 == "Athleticism" || skill18 == "Athleticism" || skill19 == "Athleticism" || skill20 == "Athleticism" || skill21 == "Athleticism" || skill22 == "Athleticism" || skill23 == "Athleticism" || skill24 == "Athleticism")
			{
				var athleticism = endurance1 / 100;
			}
			else
			{
				var athleticism = 0;
			}

			//*********************************************************************
			// Skill Multipliers
			//*********************************************************************

			skill1mult = skillvert(skill1, skill1lvl);
			skill2mult = skillvert(skill2, skill2lvl);
			skill3mult = skillvert(skill3, skill3lvl);
			skill4mult = skillvert(skill4, skill4lvl);
			skill5mult = skillvert(skill5, skill5lvl);
			skill6mult = skillvert(skill6, skill6lvl);
			skill7mult = skillvert(skill7, skill7lvl);
			skill8mult = skillvert(skill8, skill8lvl);
			skill9mult = skillvert(skill9, skill9lvl);
			skill10mult = skillvert(skill10, skill10lvl);
			skill11mult = skillvert(skill11, skill11lvl);
			skill12mult = skillvert(skill12, skill12lvl);
			skill13mult = skillvert(skill13, skill13lvl);
			skill14mult = skillvert(skill14, skill14lvl);
			skill15mult = skillvert(skill15, skill15lvl);
			skill16mult = skillvert(skill16, skill16lvl);
			skill17mult = skillvert(skill17, skill17lvl);
			skill18mult = skillvert(skill18, skill18lvl);
			skill19mult = skillvert(skill19, skill19lvl);
			skill20mult = skillvert(skill20, skill20lvl);
			skill21mult = skillvert(skill21, skill21lvl);
			skill22mult = skillvert(skill22, skill22lvl);
			skill23mult = skillvert(skill23, skill23lvl);
			skill24mult = skillvert(skill24, skill24lvl);

			//*********************************************************************
			// Post Skill Values
			//*********************************************************************

			var speed2 = speed1 * skill1mult.slice(0,skill1mult.indexOf("a")) * skill2mult.slice(0,skill2mult.indexOf("a")) * skill3mult.slice(0,skill3mult.indexOf("a")) * skill4mult.slice(0,skill4mult.indexOf("a")) * skill5mult.slice(0,skill5mult.indexOf("a")) * skill6mult.slice(0,skill6mult.indexOf("a")) * skill7mult.slice(0,skill7mult.indexOf("a")) * skill8mult.slice(0,skill8mult.indexOf("a")) * skill9mult.slice(0,skill9mult.indexOf("a")) * skill10mult.slice(0,skill10mult.indexOf("a")) * skill11mult.slice(0,skill11mult.indexOf("a")) * skill12mult.slice(0,skill12mult.indexOf("a"));
			speed2 = speed2 * skill13mult.slice(0,skill13mult.indexOf("a")) * skill14mult.slice(0,skill14mult.indexOf("a")) * skill15mult.slice(0,skill15mult.indexOf("a")) * skill16mult.slice(0,skill16mult.indexOf("a")) * skill17mult.slice(0,skill17mult.indexOf("a")) * skill18mult.slice(0,skill18mult.indexOf("a")) * skill19mult.slice(0,skill19mult.indexOf("a")) * skill20mult.slice(0,skill20mult.indexOf("a")) * skill21mult.slice(0,skill21mult.indexOf("a")) * skill22mult.slice(0,skill22mult.indexOf("a")) * skill23mult.slice(0,skill23mult.indexOf("a")) * skill24mult.slice(0,skill24mult.indexOf("a")) + speed1 * athleticism;
			
			var ballhandling2 = ballhandling1 * skill1mult.slice(skill1mult.indexOf("a") + 1,skill1mult.indexOf("b")) * skill2mult.slice(skill2mult.indexOf("a") + 1,skill2mult.indexOf("b")) * skill3mult.slice(skill3mult.indexOf("a") + 1,skill3mult.indexOf("b")) * skill4mult.slice(skill4mult.indexOf("a") + 1,skill4mult.indexOf("b")) * skill5mult.slice(skill5mult.indexOf("a") + 1,skill5mult.indexOf("b")) * skill6mult.slice(skill6mult.indexOf("a") + 1,skill6mult.indexOf("b")) * skill7mult.slice(skill7mult.indexOf("a") + 1,skill7mult.indexOf("b")) * skill8mult.slice(skill8mult.indexOf("a") + 1,skill8mult.indexOf("b")) * skill9mult.slice(skill9mult.indexOf("a") + 1,skill9mult.indexOf("b")) * skill10mult.slice(skill10mult.indexOf("a") + 1,skill10mult.indexOf("b")) * skill11mult.slice(skill11mult.indexOf("a") + 1,skill11mult.indexOf("b")) * skill12mult.slice(skill12mult.indexOf("a") + 1,skill12mult.indexOf("b"));
			ballhandling2 = ballhandling2 * skill13mult.slice(skill13mult.indexOf("a") + 1,skill13mult.indexOf("b")) * skill14mult.slice(skill14mult.indexOf("a") + 1,skill14mult.indexOf("b")) * skill15mult.slice(skill15mult.indexOf("a") + 1,skill15mult.indexOf("b")) * skill16mult.slice(skill16mult.indexOf("a") + 1,skill16mult.indexOf("b")) * skill17mult.slice(skill17mult.indexOf("a") + 1,skill17mult.indexOf("b")) * skill18mult.slice(skill18mult.indexOf("a") + 1,skill18mult.indexOf("b")) * skill19mult.slice(skill19mult.indexOf("a") + 1,skill19mult.indexOf("b")) * skill20mult.slice(skill20mult.indexOf("a") + 1,skill20mult.indexOf("b")) * skill21mult.slice(skill21mult.indexOf("a") + 1,skill21mult.indexOf("b")) * skill22mult.slice(skill22mult.indexOf("a") + 1,skill22mult.indexOf("b")) * skill23mult.slice(skill23mult.indexOf("a") + 1,skill23mult.indexOf("b")) * skill24mult.slice(skill24mult.indexOf("a") + 1,skill24mult.indexOf("b")) + ballhandling1 * athleticism;
			
			var passing2 = passing1 * skill1mult.slice(skill1mult.indexOf("b") + 1,skill1mult.indexOf("c")) * skill2mult.slice(skill2mult.indexOf("b") + 1,skill2mult.indexOf("c")) * skill3mult.slice(skill3mult.indexOf("b") + 1,skill3mult.indexOf("c")) * skill4mult.slice(skill4mult.indexOf("b") + 1,skill4mult.indexOf("c")) * skill5mult.slice(skill5mult.indexOf("b") + 1,skill5mult.indexOf("c")) * skill6mult.slice(skill6mult.indexOf("b") + 1,skill6mult.indexOf("c")) * skill7mult.slice(skill7mult.indexOf("b") + 1,skill7mult.indexOf("c")) * skill8mult.slice(skill8mult.indexOf("b") + 1,skill8mult.indexOf("c")) * skill9mult.slice(skill9mult.indexOf("b") + 1,skill9mult.indexOf("c")) * skill10mult.slice(skill10mult.indexOf("b") + 1,skill10mult.indexOf("c")) * skill11mult.slice(skill11mult.indexOf("b") + 1,skill11mult.indexOf("c")) * skill12mult.slice(skill12mult.indexOf("b") + 1,skill12mult.indexOf("c"));
			passing2 = passing2 * skill13mult.slice(skill13mult.indexOf("b") + 1,skill13mult.indexOf("c")) * skill14mult.slice(skill14mult.indexOf("b") + 1,skill14mult.indexOf("c")) * skill15mult.slice(skill15mult.indexOf("b") + 1,skill15mult.indexOf("c")) * skill16mult.slice(skill16mult.indexOf("b") + 1,skill16mult.indexOf("c")) * skill17mult.slice(skill17mult.indexOf("b") + 1,skill17mult.indexOf("c")) * skill18mult.slice(skill18mult.indexOf("b") + 1,skill18mult.indexOf("c")) * skill19mult.slice(skill19mult.indexOf("b") + 1,skill19mult.indexOf("c")) * skill20mult.slice(skill20mult.indexOf("b") + 1,skill20mult.indexOf("c")) * skill21mult.slice(skill21mult.indexOf("b") + 1,skill21mult.indexOf("c")) * skill22mult.slice(skill22mult.indexOf("b") + 1,skill22mult.indexOf("c")) * skill23mult.slice(skill23mult.indexOf("b") + 1,skill23mult.indexOf("c")) * skill24mult.slice(skill24mult.indexOf("b") + 1,skill24mult.indexOf("c")) + passing1 * athleticism;
			
			var shooting2 = shooting1 * skill1mult.slice(skill1mult.indexOf("c") + 1,skill1mult.indexOf("d")) * skill2mult.slice(skill2mult.indexOf("c") + 1,skill2mult.indexOf("d")) * skill3mult.slice(skill3mult.indexOf("c") + 1,skill3mult.indexOf("d")) * skill4mult.slice(skill4mult.indexOf("c") + 1,skill4mult.indexOf("d")) * skill5mult.slice(skill5mult.indexOf("c") + 1,skill5mult.indexOf("d")) * skill6mult.slice(skill6mult.indexOf("c") + 1,skill6mult.indexOf("d")) * skill7mult.slice(skill7mult.indexOf("c") + 1,skill7mult.indexOf("d")) * skill8mult.slice(skill8mult.indexOf("c") + 1,skill8mult.indexOf("d")) * skill9mult.slice(skill9mult.indexOf("c") + 1,skill9mult.indexOf("d")) * skill10mult.slice(skill10mult.indexOf("c") + 1,skill10mult.indexOf("d")) * skill11mult.slice(skill11mult.indexOf("c") + 1,skill11mult.indexOf("d")) * skill12mult.slice(skill12mult.indexOf("c") + 1,skill12mult.indexOf("d"));
			shooting2 = shooting2 * skill13mult.slice(skill13mult.indexOf("c") + 1,skill13mult.indexOf("d")) * skill14mult.slice(skill14mult.indexOf("c") + 1,skill14mult.indexOf("d")) * skill15mult.slice(skill15mult.indexOf("c") + 1,skill15mult.indexOf("d")) * skill16mult.slice(skill16mult.indexOf("c") + 1,skill16mult.indexOf("d")) * skill17mult.slice(skill17mult.indexOf("c") + 1,skill17mult.indexOf("d")) * skill18mult.slice(skill18mult.indexOf("c") + 1,skill18mult.indexOf("d")) * skill19mult.slice(skill19mult.indexOf("c") + 1,skill19mult.indexOf("d")) * skill20mult.slice(skill20mult.indexOf("c") + 1,skill20mult.indexOf("d")) * skill21mult.slice(skill21mult.indexOf("c") + 1,skill21mult.indexOf("d")) * skill22mult.slice(skill22mult.indexOf("c") + 1,skill22mult.indexOf("d")) * skill23mult.slice(skill23mult.indexOf("c") + 1,skill23mult.indexOf("d")) * skill24mult.slice(skill24mult.indexOf("c") + 1,skill24mult.indexOf("d")) + shooting1 * athleticism;
			
			var threept2 = threept1 * skill1mult.slice(skill1mult.indexOf("d") + 1,skill1mult.indexOf("e")) * skill2mult.slice(skill2mult.indexOf("d") + 1,skill2mult.indexOf("e")) * skill3mult.slice(skill3mult.indexOf("d") + 1,skill3mult.indexOf("e")) * skill4mult.slice(skill4mult.indexOf("d") + 1,skill4mult.indexOf("e")) * skill5mult.slice(skill5mult.indexOf("d") + 1,skill5mult.indexOf("e")) * skill6mult.slice(skill6mult.indexOf("d") + 1,skill6mult.indexOf("e")) * skill7mult.slice(skill7mult.indexOf("d") + 1,skill7mult.indexOf("e")) * skill8mult.slice(skill8mult.indexOf("d") + 1,skill8mult.indexOf("e")) * skill9mult.slice(skill9mult.indexOf("d") + 1,skill9mult.indexOf("e")) * skill10mult.slice(skill10mult.indexOf("d") + 1,skill10mult.indexOf("e")) * skill11mult.slice(skill11mult.indexOf("d") + 1,skill11mult.indexOf("e")) * skill12mult.slice(skill12mult.indexOf("d") + 1,skill12mult.indexOf("e"));
			threept2 = threept2 * skill13mult.slice(skill13mult.indexOf("d") + 1,skill13mult.indexOf("e")) * skill14mult.slice(skill14mult.indexOf("d") + 1,skill14mult.indexOf("e")) * skill15mult.slice(skill15mult.indexOf("d") + 1,skill15mult.indexOf("e")) * skill16mult.slice(skill16mult.indexOf("d") + 1,skill16mult.indexOf("e")) * skill17mult.slice(skill17mult.indexOf("d") + 1,skill17mult.indexOf("e")) * skill18mult.slice(skill18mult.indexOf("d") + 1,skill18mult.indexOf("e")) * skill19mult.slice(skill19mult.indexOf("d") + 1,skill19mult.indexOf("e")) * skill20mult.slice(skill20mult.indexOf("d") + 1,skill20mult.indexOf("e")) * skill21mult.slice(skill21mult.indexOf("d") + 1,skill21mult.indexOf("e")) * skill22mult.slice(skill22mult.indexOf("d") + 1,skill22mult.indexOf("e")) * skill23mult.slice(skill23mult.indexOf("d") + 1,skill23mult.indexOf("e")) * skill24mult.slice(skill24mult.indexOf("d") + 1,skill24mult.indexOf("e")) + threept1 * athleticism;
			
			var freethrows2 = freethrows1 * skill1mult.slice(skill1mult.indexOf("e") + 1,skill1mult.indexOf("f")) * skill2mult.slice(skill2mult.indexOf("e") + 1,skill2mult.indexOf("f")) * skill3mult.slice(skill3mult.indexOf("e") + 1,skill3mult.indexOf("f")) * skill4mult.slice(skill4mult.indexOf("e") + 1,skill4mult.indexOf("f")) * skill5mult.slice(skill5mult.indexOf("e") + 1,skill5mult.indexOf("f")) * skill6mult.slice(skill6mult.indexOf("e") + 1,skill6mult.indexOf("f")) * skill7mult.slice(skill7mult.indexOf("e") + 1,skill7mult.indexOf("f")) * skill8mult.slice(skill8mult.indexOf("e") + 1,skill8mult.indexOf("f")) * skill9mult.slice(skill9mult.indexOf("e") + 1,skill9mult.indexOf("f")) * skill10mult.slice(skill10mult.indexOf("e") + 1,skill10mult.indexOf("f")) * skill11mult.slice(skill11mult.indexOf("e") + 1,skill11mult.indexOf("f")) * skill12mult.slice(skill12mult.indexOf("e") + 1,skill12mult.indexOf("f"));
			freethrows2 = freethrows2 * skill13mult.slice(skill13mult.indexOf("e") + 1,skill13mult.indexOf("f")) * skill14mult.slice(skill14mult.indexOf("e") + 1,skill14mult.indexOf("f")) * skill15mult.slice(skill15mult.indexOf("e") + 1,skill15mult.indexOf("f")) * skill16mult.slice(skill16mult.indexOf("e") + 1,skill16mult.indexOf("f")) * skill17mult.slice(skill17mult.indexOf("e") + 1,skill17mult.indexOf("f")) * skill18mult.slice(skill18mult.indexOf("e") + 1,skill18mult.indexOf("f")) * skill19mult.slice(skill19mult.indexOf("e") + 1,skill19mult.indexOf("f")) * skill20mult.slice(skill20mult.indexOf("e") + 1,skill20mult.indexOf("f")) * skill21mult.slice(skill21mult.indexOf("e") + 1,skill21mult.indexOf("f")) * skill22mult.slice(skill22mult.indexOf("e") + 1,skill22mult.indexOf("f")) * skill23mult.slice(skill23mult.indexOf("e") + 1,skill23mult.indexOf("f")) * skill24mult.slice(skill24mult.indexOf("e") + 1,skill24mult.indexOf("f")) + freethrows1 * athleticism;
			
			var dunking2 = dunking1 * skill1mult.slice(skill1mult.indexOf("f") + 1,skill1mult.indexOf("g")) * skill2mult.slice(skill2mult.indexOf("f") + 1,skill2mult.indexOf("g")) * skill3mult.slice(skill3mult.indexOf("f") + 1,skill3mult.indexOf("g")) * skill4mult.slice(skill4mult.indexOf("f") + 1,skill4mult.indexOf("g")) * skill5mult.slice(skill5mult.indexOf("f") + 1,skill5mult.indexOf("g")) * skill6mult.slice(skill6mult.indexOf("f") + 1,skill6mult.indexOf("g")) * skill7mult.slice(skill7mult.indexOf("f") + 1,skill7mult.indexOf("g")) * skill8mult.slice(skill8mult.indexOf("f") + 1,skill8mult.indexOf("g")) * skill9mult.slice(skill9mult.indexOf("f") + 1,skill9mult.indexOf("g")) * skill10mult.slice(skill10mult.indexOf("f") + 1,skill10mult.indexOf("g")) * skill11mult.slice(skill11mult.indexOf("f") + 1,skill11mult.indexOf("g")) * skill12mult.slice(skill12mult.indexOf("f") + 1,skill12mult.indexOf("g"));
			dunking2 = dunking2 * skill13mult.slice(skill13mult.indexOf("f") + 1,skill13mult.indexOf("g")) * skill14mult.slice(skill14mult.indexOf("f") + 1,skill14mult.indexOf("g")) * skill15mult.slice(skill15mult.indexOf("f") + 1,skill15mult.indexOf("g")) * skill16mult.slice(skill16mult.indexOf("f") + 1,skill16mult.indexOf("g")) * skill17mult.slice(skill17mult.indexOf("f") + 1,skill17mult.indexOf("g")) * skill18mult.slice(skill18mult.indexOf("f") + 1,skill18mult.indexOf("g")) * skill19mult.slice(skill19mult.indexOf("f") + 1,skill19mult.indexOf("g")) * skill20mult.slice(skill20mult.indexOf("f") + 1,skill20mult.indexOf("g")) * skill21mult.slice(skill21mult.indexOf("f") + 1,skill21mult.indexOf("g")) * skill22mult.slice(skill22mult.indexOf("f") + 1,skill22mult.indexOf("g")) * skill23mult.slice(skill23mult.indexOf("f") + 1,skill23mult.indexOf("g")) * skill24mult.slice(skill24mult.indexOf("f") + 1,skill24mult.indexOf("g")) + dunking1 * athleticism;
			
			var rebounding2 = rebounding1 * skill1mult.slice(skill1mult.indexOf("g") + 1,skill1mult.indexOf("h")) * skill2mult.slice(skill2mult.indexOf("g") + 1,skill2mult.indexOf("h")) * skill3mult.slice(skill3mult.indexOf("g") + 1,skill3mult.indexOf("h")) * skill4mult.slice(skill4mult.indexOf("g") + 1,skill4mult.indexOf("h")) * skill5mult.slice(skill5mult.indexOf("g") + 1,skill5mult.indexOf("h")) * skill6mult.slice(skill6mult.indexOf("g") + 1,skill6mult.indexOf("h")) * skill7mult.slice(skill7mult.indexOf("g") + 1,skill7mult.indexOf("h")) * skill8mult.slice(skill8mult.indexOf("g") + 1,skill8mult.indexOf("h")) * skill9mult.slice(skill9mult.indexOf("g") + 1,skill9mult.indexOf("h")) * skill10mult.slice(skill10mult.indexOf("g") + 1,skill10mult.indexOf("h")) * skill11mult.slice(skill11mult.indexOf("g") + 1,skill11mult.indexOf("h")) * skill12mult.slice(skill12mult.indexOf("g") + 1,skill12mult.indexOf("h"));
			rebounding2 = rebounding2 * skill13mult.slice(skill13mult.indexOf("g") + 1,skill13mult.indexOf("h")) * skill14mult.slice(skill14mult.indexOf("g") + 1,skill14mult.indexOf("h")) * skill15mult.slice(skill15mult.indexOf("g") + 1,skill15mult.indexOf("h")) * skill16mult.slice(skill16mult.indexOf("g") + 1,skill16mult.indexOf("h")) * skill17mult.slice(skill17mult.indexOf("g") + 1,skill17mult.indexOf("h")) * skill18mult.slice(skill18mult.indexOf("g") + 1,skill18mult.indexOf("h")) * skill19mult.slice(skill19mult.indexOf("g") + 1,skill19mult.indexOf("h")) * skill20mult.slice(skill20mult.indexOf("g") + 1,skill20mult.indexOf("h")) * skill21mult.slice(skill21mult.indexOf("g") + 1,skill21mult.indexOf("h")) * skill22mult.slice(skill22mult.indexOf("g") + 1,skill22mult.indexOf("h")) * skill23mult.slice(skill23mult.indexOf("g") + 1,skill23mult.indexOf("h")) * skill24mult.slice(skill24mult.indexOf("g") + 1,skill24mult.indexOf("h")) + blocking1 * athleticism;
			
			var blocking2 = blocking1 * skill1mult.slice(skill1mult.indexOf("h") + 1,skill1mult.indexOf("i")) * skill2mult.slice(skill2mult.indexOf("h") + 1,skill2mult.indexOf("i")) * skill3mult.slice(skill3mult.indexOf("h") + 1,skill3mult.indexOf("i")) * skill4mult.slice(skill4mult.indexOf("h") + 1,skill4mult.indexOf("i")) * skill5mult.slice(skill5mult.indexOf("h") + 1,skill5mult.indexOf("i")) * skill6mult.slice(skill6mult.indexOf("h") + 1,skill6mult.indexOf("i")) * skill7mult.slice(skill7mult.indexOf("h") + 1,skill7mult.indexOf("i")) * skill8mult.slice(skill8mult.indexOf("h") + 1,skill8mult.indexOf("i")) * skill9mult.slice(skill9mult.indexOf("h") + 1,skill9mult.indexOf("i")) * skill10mult.slice(skill10mult.indexOf("h") + 1,skill10mult.indexOf("i")) * skill11mult.slice(skill11mult.indexOf("h") + 1,skill11mult.indexOf("i")) * skill12mult.slice(skill12mult.indexOf("h") + 1,skill12mult.indexOf("i"));
			blocking2 = blocking2 * skill13mult.slice(skill13mult.indexOf("h") + 1,skill13mult.indexOf("i")) * skill14mult.slice(skill14mult.indexOf("h") + 1,skill14mult.indexOf("i")) * skill15mult.slice(skill15mult.indexOf("h") + 1,skill15mult.indexOf("i")) * skill16mult.slice(skill16mult.indexOf("h") + 1,skill16mult.indexOf("i")) * skill17mult.slice(skill17mult.indexOf("h") + 1,skill17mult.indexOf("i")) * skill18mult.slice(skill18mult.indexOf("h") + 1,skill18mult.indexOf("i")) * skill19mult.slice(skill19mult.indexOf("h") + 1,skill19mult.indexOf("i")) * skill20mult.slice(skill20mult.indexOf("h") + 1,skill20mult.indexOf("i")) * skill21mult.slice(skill21mult.indexOf("h") + 1,skill21mult.indexOf("i")) * skill22mult.slice(skill22mult.indexOf("h") + 1,skill22mult.indexOf("i")) * skill23mult.slice(skill23mult.indexOf("h") + 1,skill23mult.indexOf("i")) * skill24mult.slice(skill24mult.indexOf("h") + 1,skill24mult.indexOf("i")) + rebounding1 * athleticism;
			
			var defense2 = defense1 * skill1mult.slice(skill1mult.indexOf("i") + 1,skill1mult.indexOf("j")) * skill2mult.slice(skill2mult.indexOf("i") + 1,skill2mult.indexOf("j")) * skill3mult.slice(skill3mult.indexOf("i") + 1,skill3mult.indexOf("j")) * skill4mult.slice(skill4mult.indexOf("i") + 1,skill4mult.indexOf("j")) * skill5mult.slice(skill5mult.indexOf("i") + 1,skill5mult.indexOf("j")) * skill6mult.slice(skill6mult.indexOf("i") + 1,skill6mult.indexOf("j")) * skill7mult.slice(skill7mult.indexOf("i") + 1,skill7mult.indexOf("j")) * skill8mult.slice(skill8mult.indexOf("i") + 1,skill8mult.indexOf("j")) * skill9mult.slice(skill9mult.indexOf("i") + 1,skill9mult.indexOf("j")) * skill10mult.slice(skill10mult.indexOf("i") + 1,skill10mult.indexOf("j")) * skill11mult.slice(skill11mult.indexOf("i") + 1,skill11mult.indexOf("j")) * skill12mult.slice(skill12mult.indexOf("i") + 1,skill12mult.indexOf("j"));
			defense2 = defense2 * skill13mult.slice(skill13mult.indexOf("i") + 1,skill13mult.indexOf("j")) * skill14mult.slice(skill14mult.indexOf("i") + 1,skill14mult.indexOf("j")) * skill15mult.slice(skill15mult.indexOf("i") + 1,skill15mult.indexOf("j")) * skill16mult.slice(skill16mult.indexOf("i") + 1,skill16mult.indexOf("j")) * skill17mult.slice(skill17mult.indexOf("i") + 1,skill17mult.indexOf("j")) * skill18mult.slice(skill18mult.indexOf("i") + 1,skill18mult.indexOf("j")) * skill19mult.slice(skill19mult.indexOf("i") + 1,skill19mult.indexOf("j")) * skill20mult.slice(skill20mult.indexOf("i") + 1,skill20mult.indexOf("j")) * skill21mult.slice(skill21mult.indexOf("i") + 1,skill21mult.indexOf("j")) * skill22mult.slice(skill22mult.indexOf("i") + 1,skill22mult.indexOf("j")) * skill23mult.slice(skill23mult.indexOf("i") + 1,skill23mult.indexOf("j")) * skill24mult.slice(skill24mult.indexOf("i") + 1,skill24mult.indexOf("j")) + defense1 * athleticism;
			
			var leadership2 = leadership1 * skill1mult.slice(skill1mult.indexOf("j") + 1) * skill2mult.slice(skill2mult.indexOf("j") + 1) * skill3mult.slice(skill3mult.indexOf("j") + 1) * skill4mult.slice(skill4mult.indexOf("j") + 1) * skill5mult.slice(skill5mult.indexOf("j") + 1) * skill6mult.slice(skill6mult.indexOf("j") + 1) * skill7mult.slice(skill7mult.indexOf("j") + 1) * skill8mult.slice(skill8mult.indexOf("j") + 1) * skill9mult.slice(skill9mult.indexOf("j") + 1) * skill10mult.slice(skill10mult.indexOf("j") + 1) * skill11mult.slice(skill11mult.indexOf("j") + 1) * skill12mult.slice(skill12mult.indexOf("j") + 1);
			leadership2 = leadership2 * skill13mult.slice(skill13mult.indexOf("j") + 1) * skill14mult.slice(skill14mult.indexOf("j") + 1) * skill15mult.slice(skill15mult.indexOf("j") + 1) * skill16mult.slice(skill16mult.indexOf("j") + 1) * skill17mult.slice(skill17mult.indexOf("j") + 1) * skill18mult.slice(skill18mult.indexOf("j") + 1) * skill19mult.slice(skill19mult.indexOf("j") + 1) * skill20mult.slice(skill20mult.indexOf("j") + 1) * skill21mult.slice(skill21mult.indexOf("j") + 1) * skill22mult.slice(skill22mult.indexOf("j") + 1) * skill23mult.slice(skill23mult.indexOf("j") + 1) * skill24mult.slice(skill24mult.indexOf("j") + 1) + leadership1 * athleticism;	
		
			//*********************************************************************
			// Get Chem
			//*********************************************************************

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {

					var reference = responseDetails.responseText;

					var chem = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player10id + '"'));
					chem = chem.slice(chem.indexOf('(') + 1,chem.indexOf('Level') - 1);
					chem = chem.slice(chem.indexOf('(') + 1);
					chemlevel = reference.slice(reference.indexOf('showPlayerProfile.php?pid=' + player10id));
					chemlevel = chemlevel.slice(chemlevel.indexOf("Level") + 6,chemlevel.indexOf("Level") + 7);

					var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

					switch(chem)
					{
						case 'Speed':
							var speedmult = chemlevel * .5 + 1;
							break;
						case 'Ball Handling':
							var ballmult = chemlevel * .5 + 1;
							break;
						case 'Passing':
							var passmult = chemlevel * .5 + 1;
							break;
						case 'Shooting':
							var shootmult = chemlevel * .5 + 1;
							break;
						case '3 Point Shooting':
							var threemult = chemlevel * .5 + 1;
							break;
						case 'Free Throws':
							var freemult = chemlevel * .5 + 1;
							break;
						case 'Dunking':
							var dunkmult = chemlevel * .5 + 1;
							break;
						case 'Rebounding':
							var reboundmult = chemlevel * .5 + 1;
							break;
						case 'Blocking':
							var blockmult = chemlevel * .5 + 1;
							break;
						case 'Defense':
							var defmult = chemlevel * .5 + 1;
							break;
						case 'Leadership':
							var leadmult = chemlevel * .5 + 1;
							break;
					}

					var speed3 = speed2 * speedmult;
					var ballhandling3 = ballhandling2 * ballmult;
					var passing3 = passing2 * passmult;
					var shooting3 = shooting2 * shootmult;
					var threept3 = threept2 * threemult;
					var freethrows3 = freethrows2 * freemult;
					var dunking3 = dunking2 * dunkmult;
					var rebounding3 = rebounding2 * reboundmult;
					var blocking3 = blocking2 * blockmult;
					var defense3 = defense2 * defmult;
					var leadership3 = leadership2 * leadmult;

					var speed4 = speed3;
					var ballhandling4 = ballhandling3;
					var passing4 = passing3;
					var shooting4 = shooting3;
					var threept4 = threept3;
					var freethrows4 = freethrows3;
					var dunking4 = dunking3;
					var rebounding4 = rebounding3;
					var blocking4 = blocking3;
					var defense4 = defense3;
					var leadership4 = leadership3;

					if(threedirection1 == "Take More 3's")
					{
						threept4 = threept3 + threepercentage1 / 100 * ballhandling3;
						ballhandling4 = ballhandling3 * (1 - (threepercentage1 / 100));
					}
					else
					{
						threept4 = threept3 * (1 - (threepercentage1 / 100));
						leadership4 = leadership3 + threept3 * threepercentage1 / 200;
						ballhandling4 = ballhandling3 + threept3 * threepercentage1 / 200;
					}

					if(passshootdirection1 == 'Pass More')
					{
						ballhandling4 = ballhandling4 + freethrows4 * passshootpercentage1 / 200;
						passing4 = passing4 + freethrows4 * passshootpercentage1 / 200;
						freethrows4 = freethrows4 * (1 - (passshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + passing4 * passshootpercentage1 / 200;
						shooting4 = shooting4 + passing4 * passshootpercentage1 / 200;
						passing4 = passing4 * (1 - (passshootpercentage1 / 100));
					}

					if(attackshootdirection1 == "Take Jump Shots")
					{
						freethrows4 = freethrows4 + dunking4 * .25 * attackshootpercentage1 / 100;
						shooting4 = shooting4 + dunking4 * .75 * attackshootpercentage1 / 100;
						dunking4 = dunking4 * (1 - (attackshootpercentage1 / 100));
					}
					else
					{
						freethrows4 = freethrows4 + shooting4 * .25 * attackshootpercentage1 / 100;
						dunking4 = dunking4 + shooting4 * .75 * attackshootpercentage1 / 100;
						shooting4 = shooting4 * (1 - (attackshootpercentage1 / 100));					
					}

					if(crashbackdirection1 == "Get Back on Defense")
					{
						speed4 = speed4 + rebounding4 * crashbackpercentage1 / 100;
						rebounding4 = rebounding4 * (1 - (crashbackpercentage1 / 100));
					}
					else
					{
						rebounding4 = rebounding4 + speed4 * crashbackpercentage1 / 100;
						speed4 = speed4 * (1 - (crashbackpercentage1 / 100));
					}

					if(chancesdirection1 == 'Play Conservative Defense')
					{
						leadership4 = leadership4 + defense4 * chancespercentage1 / 100;
						defense4 = defense4 * (1 - (chancespercentage1 / 100));
					}
					else if(blocking1 > defense1)
					{
						blocking4 = blocking4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					else
					{
						defense4 = defense4 + leadership4 * chancespercentage1 / 100;
						leadership4 = leadership4 * (1 - (chancespercentage1 / 100));
					}
					
					player10speed = Math.floor(speed4);
					player10end = Math.floor(endurance1);
					player10ball = Math.floor(ballhandling4);
					player10pass = Math.floor(passing4);
					player10shoot = Math.floor(shooting4);
					player10three = Math.floor(threept4);
					player10free = Math.floor(freethrows4);
					player10dunk = Math.floor(dunking4);
					player10rebound = Math.floor(rebounding4);
					player10block = Math.floor(blocking4);
					player10def = Math.floor(defense4);
					player10lead = Math.floor(leadership4);
				}
			});
			}
		}
	});
}

function skillvert(skill, level)
{
	var speedmult = 1, ballmult = 1, passmult = 1, shootmult = 1, threemult = 1, freemult = 1, dunkmult = 1, reboundmult = 1, blockmult = 1, defmult = 1, leadmult = 1;

	switch(skill)
	{
		case 'Court Vision':
			var passmult = 1.5 * level + 1;
			break;
		case 'Inside Presence':
			var dunkmult = 1.5 * level + 1;
			break;
		case 'Smooth Shooting':
			var shootmult = 1.5 * level + 1;
			break;
		case 'Above the Rim':
			var reboundmult = 1.5 * level + 1;
			break;
		case 'Blanket Defender':
			var defmult = 1.5 * level + 1;
			break;
		case 'SWAT Team':
			var blockmult = 1.5 * level + 1;
			break;
		case 'Perfect Form':
			var freemult = 1.5 * level + 1;
			break;
		case 'Hand-in-Hand':
			var ballmult = 1.5 * level + 1;
			break;
		case 'Natural Leader':
			var leadmult = 1.5 * level + 1;
			break;
		case 'Sharpshooter':
			var threemult = 1.5 * level + 1;
			break;
		case 'Triple Threat':
			var dunkmult = .25 * level + 1;
			var shootmult = .25 * level + 1;
			var threemult = .25 * level + 1;
			break;
		case 'Quick Feet':
			var speedmult = 1.5 * level + 1;
			break;
		case 'Total Coverage':
			var reboundmult = .25 * level + 1;
			var defmult = .25 * level + 1;
			var blockmult = .25 * level + 1;
			break;
		case 'Fundamentals':
			var freemult = .25 * level + 1;
			var ballmult = .25 * level + 1;
			var leadmult = .25 * level + 1;
			break;
		default:
			// Nothing
	}

	return speedmult + "a" + ballmult + "b" + passmult + "c" + shootmult + "d" + threemult + "e" + freemult + "f" + dunkmult + "g" + reboundmult + "h" + blockmult + "i" + defmult + "j" + leadmult;
}

firsttimer();

function firsttimer()
{

window.setTimeout( function()
{
	if(player1speed != undefined && player2speed != undefined && player3speed != undefined && player4speed != undefined && player5speed != undefined && player6speed != undefined && player7speed != undefined && player8speed != undefined && player9speed != undefined && player10speed != undefined)
	{
		sortandtable();
	}
	else
	{
		firsttimer();
	}

	function sortandtable()
	{
		var slot1name = 0, slot1speed, slot1end, slot1ball, slot1pass, slot1shoot, slot1three, slot1free, slot1dunk, slot1rebound, slot1block, slot1def, slot1lead, slot1total;
		var slot2name = 0, slot2speed, slot2end, slot2ball, slot2pass, slot2shoot, slot2three, slot2free, slot2dunk, slot2rebound, slot2block, slot2def, slot2lead, slot2total;
		var slot3name = 0, slot3speed, slot3end, slot3ball, slot3pass, slot3shoot, slot3three, slot3free, slot3dunk, slot3rebound, slot3block, slot3def, slot3lead, slot3total;
		var slot4name = 0, slot4speed, slot4end, slot4ball, slot4pass, slot4shoot, slot4three, slot4free, slot4dunk, slot4rebound, slot4block, slot4def, slot4lead, slot4total;
		var slot5name = 0, slot5speed, slot5end, slot5ball, slot5pass, slot5shoot, slot5three, slot5free, slot5dunk, slot5rebound, slot5block, slot5def, slot5lead, slot5total;
		var slot6name = 0, slot6speed, slot6end, slot6ball, slot6pass, slot6shoot, slot6three, slot6free, slot6dunk, slot6rebound, slot6block, slot6def, slot6lead, slot6total;
		var slot7name = 0, slot7speed, slot7end, slot7ball, slot7pass, slot7shoot, slot7three, slot7free, slot7dunk, slot7rebound, slot7block, slot7def, slot7lead, slot7total;
		var slot8name = 0, slot8speed, slot8end, slot8ball, slot8pass, slot8shoot, slot8three, slot8free, slot8dunk, slot8rebound, slot8block, slot8def, slot8lead, slot8total;
		var slot9name = 0, slot9speed, slot9end, slot9ball, slot9pass, slot9shoot, slot9three, slot9free, slot9dunk, slot9rebound, slot9block, slot9def, slot9lead, slot9total;
		var slot10name = 0, slot10speed, slot10end, slot10ball, slot10pass, slot10shoot, slot10three, slot10free, slot10dunk, slot10rebound, slot10block, slot10def, slot10lead, slot10total;

		startbench(player1start, player1name, player1speed, player1end, player1ball, player1pass, player1shoot, player1three, player1free, player1dunk, player1rebound, player1block, player1def, player1lead);
		startbench(player2start, player2name, player2speed, player2end, player2ball, player2pass, player2shoot, player2three, player2free, player2dunk, player2rebound, player2block, player2def, player2lead);
		startbench(player3start, player3name, player3speed, player3end, player3ball, player3pass, player3shoot, player3three, player3free, player3dunk, player3rebound, player3block, player3def, player3lead);
		startbench(player4start, player4name, player4speed, player4end, player4ball, player4pass, player4shoot, player4three, player4free, player4dunk, player4rebound, player4block, player4def, player4lead);
		startbench(player5start, player5name, player5speed, player5end, player5ball, player5pass, player5shoot, player5three, player5free, player5dunk, player5rebound, player5block, player5def, player5lead);
		startbench(player6start, player6name, player6speed, player6end, player6ball, player6pass, player6shoot, player6three, player6free, player6dunk, player6rebound, player6block, player6def, player6lead);
		startbench(player7start, player7name, player7speed, player7end, player7ball, player7pass, player7shoot, player7three, player7free, player7dunk, player7rebound, player7block, player7def, player7lead);
		startbench(player8start, player8name, player8speed, player8end, player8ball, player8pass, player8shoot, player8three, player8free, player8dunk, player8rebound, player8block, player8def, player8lead);
		startbench(player9start, player9name, player9speed, player9end, player9ball, player9pass, player9shoot, player9three, player9free, player9dunk, player9rebound, player9block, player9def, player9lead);
		startbench(player10start, player10name, player10speed, player10end, player10ball, player10pass, player10shoot, player10three, player10free, player10dunk, player10rebound, player10block, player10def, player10lead);

		function startbench(start, name, speed, endurance, ballhandling, passing, shooting, threept, freethrows, dunking, rebounding, blocking, defense, leadership)
		{
			if(start == 1)
			{
				if(slot1name != 0)
				{
					if(slot2name != 0)
					{
						if(slot3name != 0)
						{
							if(slot4name != 0)
							{
								slot5name = name;
								slot5speed = speed;
								slot5end = endurance;
								slot5ball = ballhandling;
								slot5pass = passing;
								slot5shoot = shooting;
								slot5three = threept;
								slot5free = freethrows;
								slot5dunk = dunking;
								slot5rebound = rebounding;
								slot5block = blocking;
								slot5def = defense;
								slot5lead = leadership;
								slot5total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
							}
							else
							{
								slot4name = name;
								slot4speed = speed;
								slot4end = endurance;
								slot4ball = ballhandling;
								slot4pass = passing;
								slot4shoot = shooting;
								slot4three = threept;
								slot4free = freethrows;
								slot4dunk = dunking;
								slot4rebound = rebounding;
								slot4block = blocking;
								slot4def = defense;
								slot4lead = leadership;
								slot4total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
							}
						}
						else
						{
							slot3name = name;
							slot3speed = speed;
							slot3end = endurance;
							slot3ball = ballhandling;
							slot3pass = passing;
							slot3shoot = shooting;
							slot3three = threept;
							slot3free = freethrows;
							slot3dunk = dunking;
							slot3rebound = rebounding;
							slot3block = blocking;
							slot3def = defense;
							slot3lead = leadership;
							slot3total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
						}
					}
					else
					{
						slot2name = name;
						slot2speed = speed;
						slot2end = endurance;
						slot2ball = ballhandling;
						slot2pass = passing;
						slot2shoot = shooting;
						slot2three = threept;
						slot2free = freethrows;
						slot2dunk = dunking;
						slot2rebound = rebounding;
						slot2block = blocking;
						slot2def = defense;
						slot2lead = leadership;
						slot2total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
					}
				}
				else
				{
					slot1name = name;
					slot1speed = speed;
					slot1end = endurance;
					slot1ball = ballhandling;
					slot1pass = passing;
					slot1shoot = shooting;
					slot1three = threept;
					slot1free = freethrows;
					slot1dunk = dunking;
					slot1rebound = rebounding;
					slot1block = blocking;
					slot1def = defense;
					slot1lead = leadership;
					slot1total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
				}
			}
			else
			{
				if(slot6name != 0)
				{
					if(slot7name != 0)
					{
						if(slot8name != 0)
						{
							if(slot9name != 0)
							{
								slot10name = name;
								slot10speed = speed;
								slot10end = endurance;
								slot10ball = ballhandling;
								slot10pass = passing;
								slot10shoot = shooting;
								slot10three = threept;
								slot10free = freethrows;
								slot10dunk = dunking;
								slot10rebound = rebounding;
								slot10block = blocking;
								slot10def = defense;
								slot10lead = leadership;
								slot10total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
							}
							else
							{
								slot9name = name;
								slot9speed = speed;
								slot9end = endurance;
								slot9ball = ballhandling;
								slot9pass = passing;
								slot9shoot = shooting;
								slot9three = threept;
								slot9free = freethrows;
								slot9dunk = dunking;
								slot9rebound = rebounding;
								slot9block = blocking;
								slot9def = defense;
								slot9lead = leadership;
								slot9total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
							}
						}
						else
						{
							slot8name = name;
							slot8speed = speed;
							slot8end = endurance;
							slot8ball = ballhandling;
							slot8pass = passing;
							slot8shoot = shooting;
							slot8three = threept;
							slot8free = freethrows;
							slot8dunk = dunking;
							slot8rebound = rebounding;
							slot8block = blocking;
							slot8def = defense;
							slot8lead = leadership;
							slot8total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
						}
					}
					else
					{
						slot7name = name;
						slot7speed = speed;
						slot7end = endurance;
						slot7ball = ballhandling;
						slot7pass = passing;
						slot7shoot = shooting;
						slot7three = threept;
						slot7free = freethrows;
						slot7dunk = dunking;
						slot7rebound = rebounding;
						slot7block = blocking;
						slot7def = defense;
						slot7lead = leadership;
						slot7total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
					}
				}
				else
				{
					slot6name = name;
					slot6speed = speed;
					slot6end = endurance;
					slot6ball = ballhandling;
					slot6pass = passing;
					slot6shoot = shooting;
					slot6three = threept;
					slot6free = freethrows;
					slot6dunk = dunking;
					slot6rebound = rebounding;
					slot6block = blocking;
					slot6def = defense;
					slot6lead = leadership;
					slot6total = speed + endurance + ballhandling + passing + shooting + threept + freethrows + dunking + rebounding + blocking + defense + leadership;
				}
			}
		}

		var sspeed = slot1speed + slot2speed + slot3speed + slot4speed + slot5speed;
		var bspeed = slot6speed + slot7speed + slot8speed + slot9speed + slot10speed;

		var send = slot1end + slot2end + slot3end + slot4end + slot5end;
		var bend = slot6end + slot7end + slot8end + slot9end + slot10end;

		var sball = slot1ball + slot2ball + slot3ball + slot4ball + slot5ball;
		var bball = slot6ball + slot7ball + slot8ball + slot9ball + slot10ball;

		var spass = slot1pass + slot2pass + slot3pass + slot4pass + slot5pass;
		var bpass = slot6pass + slot7pass + slot8pass + slot9pass + slot10pass;

		var sshoot = slot1shoot + slot2shoot + slot3shoot + slot4shoot + slot5shoot;
		var bshoot = slot6shoot + slot7shoot + slot8shoot + slot9shoot + slot10shoot;

		var sthree = slot1three + slot2three + slot3three + slot4three + slot5three;
		var bthree = slot6three + slot7three + slot8three + slot9three + slot10three;

		var sfree = slot1free + slot2free + slot3free + slot4free + slot5free;
		var bfree = slot6free + slot7free + slot8free + slot9free + slot10free;

		var sdunk = slot1dunk + slot2dunk + slot3dunk + slot4dunk + slot5dunk;
		var bdunk = slot6dunk + slot7dunk + slot8dunk + slot9dunk + slot10dunk;

		var srebound = slot1rebound + slot2rebound + slot3rebound + slot4rebound + slot5rebound;
		var brebound = slot6rebound + slot7rebound + slot8rebound + slot9rebound + slot10rebound;

		var sblock = slot1block + slot2block + slot3block + slot4block + slot5block;
		var bblock = slot6block + slot7block + slot8block + slot9block + slot10block;

		var sdef = slot1def + slot2def + slot3def + slot4def + slot5def;
		var bdef = slot6def + slot7def + slot8def + slot9def + slot10def;

		var slead = slot1lead + slot2lead + slot3lead + slot4lead + slot5lead;
		var blead = slot6lead + slot7lead + slot8lead + slot9lead + slot10lead;

		var stotal = slot1total + slot2total + slot3total + slot4total + slot5total;
		var btotal = slot6total + slot7total + slot8total + slot9total + slot10total;

		var tables = document.evaluate(
			'//p',
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

		var atttable = tables.snapshotItem(3);

		var divider = document.createElement('div');
		divider.innerHTML = '<div><p><strong>Post-Skills / Chems / Sliders</strong></p></div>';
		atttable.parentNode.insertBefore(divider, atttable.nextSibling);

		var newtable = document.createElement('div');
		newtable.innerHTML = '<div><p>&nbsp;</p><table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">' +
			'<tr><td colspan="14" bgcolor="#000080" class="tableHeader2">Starters</td></tr>' +
				'<tr align="left"><td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>Name</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Spd</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>End</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Ball</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Pas</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Sht</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>3Pt</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Free</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Dunk</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Reb</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Blk</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Def</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Lead</strong></td>' +
				'<td bgcolor="#000000" class="loginBottomText"><strong><span class="tableHeader2">Total</span></strong></td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot1name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot1total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot2name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot2total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot3name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot3total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot4name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot4total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot5name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot5total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>Total:</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + sspeed + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + send + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + sball + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + spass + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + sshoot + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + sthree + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + sfree + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + sdunk + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + srebound + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + sblock + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + sdef + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + slead + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + stotal + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>Average:</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(sspeed * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(send * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(sball * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(spass * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(sshoot * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(sthree * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(sfree * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(sdunk * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(srebound * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(sblock * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(sdef * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(slead * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(stotal * 2) / 10 + '</td></tr></table></div>';

		divider.parentNode.insertBefore(newtable, divider.nextSibling);


		var newtable2 = document.createElement('div');
		newtable2.innerHTML = '<div><p>&nbsp;</p><table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">' +
			'<tr><td colspan="14" bgcolor="#800000" class="tableHeader2">Bench</td></tr>' +
				'<tr align="left"><td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>Name</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Spd</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>End</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Ball</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Pas</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Sht</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>3Pt</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Free</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Dunk</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Reb</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Blk</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Def</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText"><strong>Lead</strong></td>' +
				'<td bgcolor="#000000" class="loginBottomText"><strong><span class="tableHeader2">Total</span></strong></td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot6name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot6total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot7name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot7total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot8name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot8total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot9name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot9total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + slot10name + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10speed + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10end + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10ball + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10pass + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10shoot + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10three + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10free + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10dunk + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10rebound + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10block + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10def + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10lead + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + slot10total + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>Total:</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bspeed + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bend + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bball + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bpass + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bshoot + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bthree + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bfree + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bdunk + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + brebound + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bblock + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + bdef + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + blead + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + btotal + '</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>Average:</strong></td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bspeed * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bend * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bball * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bpass * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bshoot * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bthree * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bfree * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bdunk * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(brebound * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bblock * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(bdef * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(blead * 2) / 10 + '</td>' +
				'<td bgcolor="#C6C6A8" class="loginBottomText">' + Math.floor(btotal * 2) / 10 + '</td></tr></table></div>';

		newtable.parentNode.insertBefore(newtable2, newtable.nextSibling);
	}
}, 500);

}

}

