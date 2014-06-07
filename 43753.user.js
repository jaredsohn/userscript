// ==UserScript==
// @name         Nexus War Badge Sorter - Replacement Edition
// @namespace    http://nw.badge.sorter.replacement/arundor
// @description  Sorts badges on Nexus War profiles. Replacement Edition - completely removes the old uncategorized badge list, leaving only the categorized table.
// @include      http://*nexuswar.com/characters/view.do?characterID=*
// ==/UserScript==


//Prepare an array of all the badge names and types.
var badges = new Array();

badges[0] = new Array();
badges[0][0] = 'Alcohol Drunk';
badges[0][1] = 'Low Tolerance';
badges[0][2] = 'Frat Boy';
badges[0][3] = 'Alcoholic';
badges[0][4] = 'Sinatra';
badges[0][5] = 'Friend of Bill';

badges[1] = new Array();
badges[1][0] = 'Angels Killed';
badges[1][1] = 'Perverter';
badges[1][2] = 'Ruiner';
badges[1][3] = 'Nightmare Whisperer';
badges[1][4] = 'Voice of Armageddon';

badges[2] = new Array();
badges[2][0] = 'Books Read';
badges[2][1] = 'Reads at an 8th Grade Level';
badges[2][2] = 'Bookworm';
badges[2][3] = 'Librarian';
badges[2][4] = 'Bibliophile';
badges[2][5] = 'Teacher\'s Pet';

badges[3] = new Array();
badges[3][0] = 'Damage Dealt';
badges[3][1] = 'Crusher';
badges[3][2] = 'Smasher';
badges[3][3] = 'Bloodletter';
badges[3][4] = 'Assassin';
badges[3][5] = 'Surgeon\'s Lament';
badges[3][6] = 'Widowmaker';

badges[4] = new Array();
badges[4][0] = 'Damage Taken';
badges[4][1] = 'Punching Bag';
badges[4][2] = 'Bruised';
badges[4][3] = 'Crushed';
badges[4][4] = 'All Stitched-Up';
badges[4][5] = 'Keeping Healers in Business';
badges[4][6] = 'Constantly in Traction';

badges[5] = new Array();
badges[5][0] = 'Deaths';
badges[5][1] = 'Buried';
badges[5][2] = 'Wormfood';
badges[5][3] = 'Aspect Hunter';
badges[5][4] = 'Lich Pet';
badges[5][5] = 'Coffinmaker\'s Friend';

badges[6] = new Array();
badges[6][0] = 'Demons Killed';
badges[6][1] = 'Cleanser';
badges[6][2] = 'Demonslayer';
badges[6][3] = 'Hammer of Light';
badges[6][4] = 'Justicebringer';
badges[6][5] = 'Blade of the Word';

badges[7] = new Array();
badges[7][0] = 'Doors Destroyed';
badges[7][1] = 'Opportunity Knocks';
badges[7][2] = 'Big Bad Wolf';
badges[7][3] = 'Here\'s Johnny';
badges[7][4] = 'Landshark';
badges[7][5] = 'Homewrecker';

badges[8] = new Array();
badges[8][0] = 'Doors Repaired';
badges[8][1] = 'Apprentice Carpenter';
badges[8][2] = 'Woodworker';
badges[8][3] = 'Journeyman Carpenter';
badges[8][4] = 'Architect';
badges[8][5] = 'Master Carpenter';

badges[9] = new Array();
badges[9][0] = 'Food Eaten';
badges[9][1] = 'Taste Tester';
badges[9][2] = 'Gourmand';
badges[9][3] = 'Glutton';
badges[9][4] = 'Masticator';
badges[9][5] = 'Food Critic';

badges[10] = new Array();
badges[10][0] = 'HP Healed';
badges[10][1] = 'Medic';
badges[10][2] = 'Doctor';
badges[10][3] = 'Surgeon';
badges[10][4] = 'Healer';
badges[10][5] = 'Bodyweaver';
badges[10][6] = 'Lifesaver';

badges[11] = new Array();
badges[11][0] = 'Items Crafted';
badges[11][1] = 'Sweat Shop Worker';
badges[11][2] = 'Journeyman Blacksmith';
badges[11][3] = 'Factory Foreman';
badges[11][4] = 'Artisan';
badges[11][5] = 'Artifex';

badges[12] = new Array();
badges[12][0] = 'Items Repaired';
badges[12][1] = 'Tinker';
badges[12][2] = 'Mender';
badges[12][3] = 'Fixer';
badges[12][4] = 'Handyman';
badges[12][5] = '80s Action Hero';

badges[13] = new Array();
badges[13][0] = 'Kills';
badges[13][1] = 'Killer';
badges[13][2] = 'Warrior';
badges[13][3] = 'Disciple of Death';
badges[13][4] = 'Master of Death';
badges[13][5] = 'Gravemaker';

badges[14] = new Array();
badges[14][0] = 'Lightning Generated';
badges[14][1] = 'Cloudseeder';
badges[14][2] = 'Weatherman';
badges[14][3] = 'Thunderbolt';
badges[14][4] = 'Static Grinder';
badges[14][5] = 'Ben Franklin\'s Kite';

badges[15] = new Array();
badges[15][0] = 'Locks Picked';
badges[15][1] = 'Thief';
badges[15][2] = 'Burglar';
badges[15][3] = 'Second-Story Man';
badges[15][4] = 'Locksmith';
badges[15][5] = 'Master of Tumblers';

badges[16] = new Array();
badges[16][0] = 'Pets Killed';
badges[16][1] = 'Dogkiller';
badges[16][2] = 'Exterminator';
badges[16][3] = 'Pest Control';
badges[16][4] = 'Trophy Hunter';
badges[16][5] = 'Director of Animal Testing';

badges[17] = new Array();
badges[17][0] = 'Power Removed';
badges[17][1] = 'Wiresnipper';
badges[17][2] = 'Fusebreaker';
badges[17][3] = 'Circuitbreaker';
badges[17][4] = 'Blackout';
badges[17][5] = 'Degenerate';

badges[18] = new Array();
badges[18][0] = 'Power Restored';
badges[18][1] = 'Apprentice Electrician';
badges[18][2] = 'Fusemaker';
badges[18][3] = 'Journeyman Electrician';
badges[18][4] = 'Circuitmaker';
badges[18][5] = 'Master Electrician';

badges[19] = new Array();
badges[19][0] = 'Targets Shot';
badges[19][1] = 'Barn Assassin';
badges[19][2] = 'Sharpshooter';
badges[19][3] = 'Deadeye';
badges[19][4] = 'Gunslinger';
badges[19][5] = 'Hickok';

badges[20] = new Array();
badges[20][0] = 'Ukkuhr-Makhai';
badges[20][1] = 'Wyrm Foe';
badges[20][2] = 'Dragonslayer';
badges[20][3] = 'Dragon\'s Bane';

badges[21] = new Array();
badges[21][0] = 'Haldos';
badges[21][1] = 'Warrior of Hashaa';
badges[21][2] = 'Lichslayer';
badges[21][3] = 'Master of the Tower';

badges[22] = new Array();
badges[22][0] = 'Harzath';
badges[22][1] = 'Foe of Dust';
badges[22][2] = 'Trollslayer';
badges[22][3] = 'Ender of Life Eternal';

badges[23] = new Array();
badges[23][0] = 'Iron Juggernaut';
badges[23][1] = 'Iron Foe';
badges[23][2] = 'Deconstructor';
badges[23][3] = 'Wrath of Stygian Iron';

badges[24] = new Array();
badges[24][0] = 'Cult';
badges[24][1] = 'Initiate';
badges[24][2] = 'Applicant';
badges[24][3] = 'Agent';
badges[24][4] = 'Hero';
badges[24][5] = 'Champion';
badges[24][6] = 'Avatar';
badges[24][7] = 'Incarnation';


//The badges section does not have its own ID.  The entire vitals section is composed of various table rows, so we need to search each row to find the badges.
var vitals = document.getElementById('profilevitals');
var rows = vitals.getElementsByTagName('tr');

var marker = 0;
var badgetitle = 0;
var badgelist = 0;
var badgerow = 0;

//The page is organized so that one row contains the heading 'Badges' and the next row contains a list of the badges.
//This section looks for the 'Badges' heading, at which point it knows that the very next row contains the list of badges we want.
for (var i=0; i<rows.length; i++) {
	if (marker == 1) {
		badgerow = rows[i];
		badgelist = rows[i].getElementsByTagName('td')[0].innerHTML;
	}
	if (rows[i].getElementsByTagName('td')[0].innerHTML == 'Badges') {
		marker = 1;
		badgetitle = rows[i];
	}
}

if (badgelist != 0) {
	//Remove leading and trailing spaces in the badge list, and make sure everything is comma delimited. This is done so that badges like 'Assassin' and 'Barn Assassin' can be easily differentiated.
	badgelist = badgelist.replace(/^\s+|\s+$/g,'');
	badgelist = badgelist.replace(/,[ ]/g,',');
	badgelist = ',' + badgelist + ',';
	
	//Account for spelling errors in the game.
	badgelist = badgelist.replace(/Warrior or Hashaa/g,'Warrior of Hashaa');

	//The final output will be arranged into several columns, and we want these columns to be of roughly equal length. To organize this properly, we need to count out the number of items that will appear in the list.
	var totallength = 0;
	for (var x=0; x<badges.length; x++) {
		for (var y=0; y<badges[x].length; y++) {
			totallength++;
		}
		totallength++;	//Account for the blank line in between categories.
	}
	
	//Choose an appropriate number of columns, then calculate how many items should appear in each column.
	var numberofcolumns = 3;
	var itemspercolumn = Math.ceil(totallength / numberofcolumns);
	var itemsincolumn = 0;
	var modifier = 0;
	var newData = '<br />';

	//Iterate through the entire list of all possible badges, and along the way check if the player has each badge.
	for (var x=0; x<badges.length; x++) {
		//If we have just started a new badge category, print a heading for it.
		newData += '<span style="font-weight: bold">' + badges[x][0] + '</span><br />';
		
		//Search through all possible badges in this section. For each one, check if the player has it.  If the player does have the badge, add it to the table in a black colour.  Otherwise, add it to the table in a grey colour.
		for (var y=1; y<badges[x].length; y++) {
			if (badgelist.indexOf(',' + badges[x][y] + ',') != -1) {
				newData += badges[x][y] + '<br />';
			}
			else {
				newData += '<span style="color: #aaaaaa">' + badges[x][y] + '</span><br />';
			}
			itemsincolumn++;
		}
		itemsincolumn += 2	//Account for the title and the blank line in between categories.
		
		//We need to check if it is time to start a new column, but in order to do so we also need to take into account the length of the next category.
		//Here we account for half the length of the next column so that, on average, no column will be significantly longer or shorter than another.
		if ((x+1) < badges.length) {
			modifier = badges[x+1].length / 2;
		}
		else {
			modifier = 0;
		}
		
		//If the current column is long enough, start using a new column.
		if (x < (badges.length - 1)) {
			if ((itemsincolumn + modifier) >= itemspercolumn) {
				newData += '</td><td style="vertical-align: top"><br />'
				itemsincolumn = 0;
			}
			else {
				newData += '<br />';
			}
		}
	}
	
	//Contruct the badge table.
	var badges = document.createElement('tr');
	var td = document.createElement('td');
	var data = document.createElement('div');
	data.innerHTML = '<table style="width: 100%"><tr class="ph"><td>Badge Table</td></tr></table><table style="width: 100%"><tr><td style="vertical-align: top">' + newData + '</td></tr></table><table style="width: 100%"><tr class="ph"><td>&nbsp;</td></tr></table>';
	td.appendChild(data);
	badges.appendChild(td);
	
	//Insert the badge table.
	badgerow.parentNode.insertBefore(badges, badgerow.nextSibling);
	
	badgerow.style.display = 'none';
	badgetitle.style.display = 'none';
}
