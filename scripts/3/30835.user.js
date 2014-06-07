// ==UserScript==
// @name           Runescape Stats Lookup Toolbar
// @namespace      www.hellboundhackers.org/profile/Simbanafsi.html
// @description    Makes it possible to check a user's stats from the game window
// @include        http://world*.runescape.com/*
// @version	   2.9
// ==/UserScript==

var stats, rawData, user, skill, element, newElement, allElements, thisElement, newToolbar;
newToolbar = document.createElement("div");
newToolbar.innerHTML = '<div style="position: relative; top: -4px; padding: 4px; right: -4px; bottom: -3px; width: 766px; margin: auto; height: 27px; font-size: 12px; background: transparent url(http://www.runescape.com/img/main/layout/menu_bg.png) left top no-repeat;">'+
'<div style="position: relative; padding: 34px; border-left: 1px solid black; text-align: left; background-position: right top; float: left; height: 19px; line-height: 19px; margin: 0; padding: 0; color: #e8d800; <!--dx850c9945y->font-weight: bold; text-decoration: none; background-image: url(\'http://www.runescape.com/img/playgame/menu.png\');"'+
'<text style="font-weight: bold; color: #E8D800;">Username: </text><input id="username" maxlength="12" style="top: 5px; width: 86px; height: 15px; line-height: 15px; border: none; padding: 0 0 0 1px; background: white;">'+
' <select id="skillsList" style="right: 645px; background-color: #e9dfc5; height: 19px; top: 550px; border: 1px solid black; color: black;"'+
'<option>Full Report</option>'+
'<option>Total Level</option>'+
'<option>Attack</option>'+
'<option>Defence</option>'+
'<option>Strength</option>'+
'<option>Hitpoints</option>'+
'<option>Ranged</option>'+
'<option>Prayer</option>'+
'<option>Magic</option>'+
'<option>Cooking</option>'+
'<option>Woodcutting</option>'+
'<option>Fletching</option>'+
'<option>Fishing</option>'+
'<option>Firemaking</option>'+
'<option>Crafting</option>'+
'<option>Smithing</option>'+
'<option>Mining</option>'+
'<option>Herblore</option>'+
'<option>Agility</option>'+
'<option>Thieving</option>'+
'<option>Slayer</option>'+
'<option>Farming</option>'+
'<option>Runecrafting</option>'+
'<option>Hunter</option>'+
'<option>Construction</option>'+
'<option>Summoning</option>'+
'<option>Dungeoneering</option>'+
'</select>'+
'<input type="button" value="OK" id="submit" style="top: 551px; width: 40px; height: 17px; line-height: 17px; padding: 2px; border: none; cursor: pointer; font-size: 11px; font-weight: bold; background: #d4d0c8 url(http://www.runescape.com/img/playgame/search.png) top left no-repeat;">'+
'</div>'+
'<text onClick="document.getElementById(\'printResult\').innerHTML=\'\'" id="printResult" style="font-weight: bold; text-align: left;"></text>'+
'</div>'; // Store the HTML used to generate the stats lookup toolbar
allElements = document.getElementsByTagName('div');

for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    result = thisElement.innerHTML.search('id="menu"')
    if (result !== -1){
	thisElement.parentNode.insertBefore(newToolbar, thisElement.nextSibling); // Insert the new toolbar into the page
    }
}
document.getElementById('game').style.top = -10 // Move the game window up to meet the toolbars at the top

function statsLookup(){
    if (document.getElementById('username').value !== ''){ // Make sure a username has been entered
	document.getElementById('printResult').innerHTML = "Retrieving data from hiscores... Please wait";
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://hiscore.runescape.com/index_lite.ws?player=' + document.getElementById('username').value, onload: 
	    function(responseDetails) {
		rawData = responseDetails.responseText;
		stats = rawData.split('\n');
		user = document.getElementById('username').value;
		if (stats[0].search('404 - Page not found') == -1){ // Make sure the user appears in the hiscores. If they don't a 404 error is returned.
		    stats = rawData.split('\n');
		    for (i = 0; i < stats.length; i++){
			stats[i] = stats[i].split(',');
		    }
		    var skills = ['Total Level', 'Attack', 'Defence', 'Strength', 'Hitpoints', 'Ranged', 'Prayer', 'Magic', 'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking', 'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility', 'Thieving', 'Slayer', 'Farming', 'Runecrafting', 'Hunter', 'Construction', 'Summoning', 'Dungeoneering'];
		    document.getElementById('submit').value = 'OK';
		    switch(document.getElementById('skillsList').value){
			case 'Total Level':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[0][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[0][2].replace('-1', 'Not Ranked') + '">' + skills[0] + ': ' + stats[0][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Attack':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[1][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[1][2].replace('-1', 'Not Ranked') + '">' + skills[1] + ': ' + stats[1][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Defence':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[2][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[2][2].replace('-1', 'Not Ranked') + '">' + skills[2] + ': ' + stats[2][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Strength':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[3][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[3][2].replace('-1', 'Not Ranked') + '">' + skills[3] + ': ' + stats[3][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Hitpoints':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[4][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[4][2].replace('-1', 'Not Ranked') + '">' + skills[4] + ': ' + stats[4][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Ranged':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[5][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[5][2].replace('-1', 'Not Ranked') + '">' + skills[5] + ': ' + stats[5][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Prayer':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[6][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[6][2].replace('-1', 'Not Ranked') + '">' + skills[6] + ': ' + stats[6][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Magic':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[7][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[7][2].replace('-1', 'Not Ranked') + '">' + skills[7] + ': ' + stats[7][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Cooking':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[8][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[8][2].replace('-1', 'Not Ranked') + '">' + skills[8] + ': ' + stats[8][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Woodcutting':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[9][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[9][2].replace('-1', 'Not Ranked') + '">' + skills[9] + ': ' + stats[9][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Fletching':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[10][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[10][2].replace('-1', 'Not Ranked') + '">' + skills[10] + ': ' + stats[10][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Fishing':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[11][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[11][2].replace('-1', 'Not Ranked') + '">' + skills[11] + ': ' + stats[11][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Firemaking':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[12][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[12][2].replace('-1', 'Not Ranked') + '">' + skills[12] + ': ' + stats[12][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Crafting':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[13][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[13][2].replace('-1', 'Not Ranked') + '">' + skills[13] + ': ' + stats[13][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Smithing':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[14][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[14][2].replace('-1', 'Not Ranked') + '">' + skills[14] + ': ' + stats[14][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Mining':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[15][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[15][2].replace('-1', 'Not Ranked') + '">' + skills[15] + ': ' + stats[15][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Herblore':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[16][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[16][2].replace('-1', 'Not Ranked') + '">' + skills[16] + ': ' + stats[16][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Agility':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[17][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[17][2].replace('-1', 'Not Ranked') + '">' + skills[17] + ': ' + stats[17][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Thieving':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[18][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[18][2].replace('-1', 'Not Ranked') + '">' + skills[18] + ': ' + stats[18][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Slayer':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[19][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[19][2].replace('-1', 'Not Ranked') + '">' + skills[19] + ': ' + stats[19][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Farming':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[20][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[20][2].replace('-1', 'Not Ranked') + '">' + skills[20] + ': ' + stats[20][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Runecrafting':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[21][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[21][2].replace('-1', 'Not Ranked') + '">' + skills[21] + ': ' + stats[21][1].replace('-1', 'Not Ranked') + "</span>";
			break;				
			case 'Hunter':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[22][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[22][2].replace('-1', 'Not Ranked') + '">' + skills[22] + ': ' + stats[22][1].replace('-1', 'Not Ranked') + "</span>";
			break;				
			case 'Construction':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[23][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[23][2].replace('-1', 'Not Ranked') + '">' + skills[23] + ': ' + stats[23][1].replace('-1', 'Not Ranked') + "</span>";
			break;				
			case 'Summoning':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[24][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[24][2].replace('-1', 'Not Ranked') + '">' + skills[24] + ': ' + stats[24][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Dungeoneering':
			    document.getElementById('printResult').innerHTML = '<span title="Rank: ' + stats[25][0].replace('-1', 'Not Ranked') + ', XP: ' + stats[25][2].replace('-1', 'Not Ranked') + '">' + skills[25] + ': ' + stats[25][1].replace('-1', 'Not Ranked') + "</span>";
			break;
			case 'Full Report':
				report = window.open("", "Window3", "width=200,height=500"); // Create popup window
				report.document.write('<script>opener.document.getElementById(\'printResult\').innerHTML = \'\'</script>');
				report.document.write('<script>function toggleHidden(element){rows=document.getElementsByName(element); if(rows[0].style.display=="none"){rows[0].style.display="";rows[1].style.display=""}else{rows[0].style.display="none";rows[1].style.display="none";};}</script>');
				report.document.write('<body style="background-color:#202020; color:#ffffff; font-family:arial; font-size:12px;">User stats for <b>' + user + '</b><br>');
				report.document.write('<hr><table style="font-size:10px;">');
				for (skill = 0; skill < skills.length; skill++){
					report.document.write('<tr onClick="toggleHidden(\'hidden' + skill + '\')"><td align="right">' + skills[skill] + ':</td><td>' + stats[skill][1].replace('-1', 'Not Ranked') + '</td></tr>');
					report.document.write('<tr style="display:none;" name="hidden' + skill + '"><td align="right">Rank:</td><td>' + stats[skill][0].replace('-1', 'Not Ranked') + '</td></tr>');
					report.document.write('<tr style="display:none;" name="hidden' + skill + '"><td align="right">XP:</td><td>' + stats[skill][2].replace('-1', 'Not Ranked') + '</td></tr>');
				}
				report.document.write('</table></body>');	
			break;
			default:
			    document.getElementById('printResult').innerHTML=stats[25].replace('-1', 'Not Ranked');
		    }
		}
		else{
		    document.getElementById('submit').value = 'OK';
		    document.getElementById('printResult').innerHTML = "User does not appear in hiscores";
		}
	    }
	});
    }
}
document.getElementById('submit').addEventListener("click", statsLookup, true); // Wait for user to click the button before running script