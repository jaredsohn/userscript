// ==UserScript==
// @name           Revo+
// @namespace      Revo
// @version		0.0.7
// @description    A small start on a Revo+ script
// @include        http://revolutionofthegalaxy.com/*
// @include        http://www.revolutionofthegalaxy.com/*
// @include        http://edgeoftheempire.com/*
// @include        http://www.edgeoftheempire.com/*
//
// @author PiratePete
// @author Pimperish
//
//	THIS IS BASED ON EVO+ created by the following:
//
// @author		~ravenlord~ (r4v3n10rd@gmail.com) - original 1.0x source
// @author		HETMAN (kanarinios@gmail.com) - upgrades
// @author		mindfox & Fire - upgrades
// @author		MadFrog (mbfrog@gmail.com)
// @author		Roland
// @author		WhyteWolf (whytewolf1@gmail.com)
// @author		Gavry
// @author		Ressol
// @author		Pinky
// @author		Toby-Jug
// @author		Chief Trajan
// @author		TMX (adam@omega.org.uk)
// @author		judal
// ==/UserScript==

/*
*	VERSION 0.0.1
*	This first version of the script is aiming to get the framework up, and make one or two easy page mods.
*
*
*	VERSION 0.0.4
*	Added scripts to add a link on item creation pages showing max number possible to make, and auto entering the amount if clicked
*
*	VERSION 0.0.5
*	Added popup player box, rank column on rankings, tweaked research page to "dim" already researched items
*
*	VERSION 0.0.6
*	Upgraded to use new ids and formats of revo statpanel and numbers, added planet link to player rankings,
*	made player popup box links relative, added rank, average score, and averave structures columns to alliance rankings
*   made link colors more readable
*
*	VERSION 0.0.6a
*	Added player info drop down box to players listed on Overview page (attacking or being attacked) and fleets page (current missions)
*
*	VERSION 0.0.6b
*	Fixed max possible to make on pulses page
*	Restored player highlight on player rankings page
*	
*	VERSION 0.0.7
*	Fixed structure allcoate table that I broke
*	
*/


// ***************************************************************************
// ** Global Variables
// ***************************************************************************

const scriptversion = '0.0.7';
const scriptversionID = 'Revo+ ' + scriptversion;
const scriptTag = 'Not even alpha!!';
GM_log(scriptversionID + " start");

// xscript data sharing
unsafeWindow.revo_plus = new Array();

// page handlers
var pageHandlers = new Array();

var units = new Object(); // units :P
var contents = null; // pointer to the 'content' node in the page

// boosts

var pOrganic = 0, pMineral = 0, pEnergy = 0, pUnassigned = 0, pExtractors = 0, pGeneticLabs = 0, pPowerplants = 0, pFactories = 0; //player's resources and structures
var pPlayer = null, pRank = null, pScore = null; // player's name, ranking and score

// constants
//var FOODCOST = 91; //

var COLOR_CANT_RESEARCH = '#ff0000'; //color of proces for research you can't afford
var COLOR_ALREADY_RESEARCHED = '#609060'; //color of the text of researched items
var COLOR_YOU_CANT_ATTACK = 'ff0000'; //color of the scores of playes you can't attack
var COLOR_CANT_ATTACK_YOU = '#00ff00'; //color of the score of the players that can't attack you
var COLOR_LINK = '#ccccff'; //color of links
var COLOR_RANK_CELL = '#606060'; // background color of normals cells in the ranking list
var COLOR_RANK_HIGHLIGHT = '#808080'; //background color of a moused-over cell in the ranking list
var COLOR_RANK_HEADER = '#008000'; //background color of cells in the ranking list header row
var COLOR_RANK_HEADER_HIGHLIGHT = '#40B040'; //background color of moused-over cells in the ranking header
var COLOR_RANK_PLAYER = '#600000'; // background color of cells in the row of the current player
var COLOR_RANK_PLAYER_HIGHLIGHT = '#900000'; //background color of moused-over cells in the row of the current player
var COLOR_PLAYER_BOX_HEADER = '#204080'; //background color of a player box header
var COLOR_PLAYER_BOX_CELL = '#606060'; //background color of a player box cell
var COLOR_PLAYER_BOX_HIGHLIGHT = '#808080'; //background color of a moused-over player box cell

// mimimum score ratio for attacks
var minAttack = 0.5;

//
// ***************************************************************************
// ** Page handlers
// ***************************************************************************
//
// Add stuff to the scans and create pages
regPageHandler(/view=overview/i, function () { revoOverview(); });
regPageHandler(/view=rankings&subview=player/i, function () { revoPlayerRank(); });
regPageHandler(/\?view=rankings$/i, function () { revoPlayerRank(); });
regPageHandler(/view=alliances&subview=rankings/i, function () { revoAllianceRank(); });
regPageHandler(/view=rankings&subview=alliance/i, function () { revoAllianceRank(); });
regPageHandler(/view=fleets/i, function () { revoFleet(); });
regPageHandler(/view=creatures/i, function () { revoCreatures(); });
regPageHandler(/view=scans&subview=create/i, function () { revoScans(); });
regPageHandler(/view=forts/i, function () { revoForts(); });
regPageHandler(/view=bombs/i, function () { revoBombs(); });
regPageHandler(/view=pulses/i, function () { revoPulses(); });
regPageHandler(/view=structures/i, function () { revoStructures(); });
regPageHandler(/view=research(&subview=(creature|energy|materials))?$/i, function () { revoResearch(); });
regPageHandler(null, function () { revoUI(); });

function revoResearch() {
	highlightResearchCosts();
	grayOutResearchedItems();
}

// Colors the cost of research red if player cannot currently afford it
function highlightResearchCosts() {
	// Get all of the table cells with prices
	var xPathTerm = "//td[contains(@style, 'rgb(64, 64, 64)')]/descendant::td[@class='RESEARCH-RIGHT']";
	
	var els = document.evaluate(xPathTerm, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	var el = els.iterateNext();
	var nodes = Array();
	var i = 0;
	
	// Store them in an array
	while (el) {
		var m = null;
		if(m = el.innerHTML.match(/([0-9]+)m[^0-9]+([0-9]+)o/))
		{
			nodes[i] = el;
			i++;
		}
		el = els.iterateNext();
	}
	
	// Go through the array and...
	for(i = 0; i<nodes.length;i++)
	{
		// If the node has the price in it, change the colors if they cost more than the player has
		if(m = nodes[i].innerHTML.match(/([0-9]+)m[^0-9]+([0-9]+)o/))
		{
			if(parseInt(m[1])>pMineral)
			{
				nodes[i].innerHTML = nodes[i].innerHTML.replace(m[1]+'m','<span style="color:' + COLOR_CANT_RESEARCH + ';">'+m[1]+'m</span>');
			}
			if(parseInt(m[2])>pOrganic)
			{
				nodes[i].innerHTML = nodes[i].innerHTML.replace(m[2]+'o','<span style="color:' + COLOR_CANT_RESEARCH + ';">'+m[2]+'o</span>');
			}
		}
	}
}

// Grays out the text for items the player has already researched
function grayOutResearchedItems() {
	// Get all of the table cells that have been researched (have green background)
	var xPathTerm = "//td[contains(@style, 'rgb(0, 96, 0)')]/descendant::td[contains(@class, 'RESEARCH')]";
	
	var els = document.evaluate(xPathTerm, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	var el = els.iterateNext();
	var nodes = Array();
	var i = 0;
	
	// Store them in an array
	while (el) {
		nodes[i] = el;
		i++;
		el = els.iterateNext();
	}
	var m = null;
	// Go through the array and...
	for(i = 0; i<nodes.length; i++)
	{
		//gray out the contents
		m = nodes[i].innerHTML;
		nodes[i].innerHTML = nodes[i].innerHTML.replace(m, '<span style="color:' + COLOR_ALREADY_RESEARCHED + ';">' + m + '</span>'); 
	}
}


function revoStructures() {
	//
	// Add links to enter max possible creation amount per item 
	//
	var table = document.getElementById("structures_table");

	if(table == null) 
		return false
		
	for(var i = 0;i<table.rows.length;i++)
	{
		var row = table.rows[i];
		if(row.cells.length==8)
		{
			var type = row.innerHTML.match(/type=([a-z_A-Z-]+)/)[1];
			row.cells[6].innerHTML = '1';
			row.cells[7].innerHTML = '5';
			row.appendChild(row.cells[5].cloneNode(false));
			var input = document.createElement('input');
			input.type='text';
			input.size=3;
			input.id = 'inp_'+type+i;
			row.cells[8].appendChild(input);
			var a = document.createElement('a');
			a.id = type+i;
			a.innerHTML = 'm';
			row.cells[8].appendChild(a);
			unsafeWindow.document.getElementById(type+i).onclick = function() {
				matches = this.id.match(/([a-zA-Z_-]+)([0-9]+)/);
				location.href = 'main_page.php5?view=structures&action=allocate&structure_type='+matches[1]+'&number='+document.getElementById('inp_'+this.id).value;
			};
			
		}
	}
/*	
	var a = 75.0;
	var b = parseInt(table.rows[5].innerHTML.match(/Cost to allocate 1 more structure: (\d+) mineral/)[1])+75.0;
	var c = -1.0 * 693750;//pMineral;
	alert((b*b));
	alert(4*a*c);
	alert(Math.sqrt((b*b)-(4*a*c)));
	maxamount = (-1*b + Math.sqrt((b*b)-(4*a*c)))/2*a;
*/
var oneland = parseInt(table.rows[5].innerHTML.match(/Cost to allocate 1 more structure: (\d+) mineral/)[1]);
var totalamount = parseInt(table.rows[5].innerHTML.match(/Cost to allocate 1 more structure: (\d+) mineral/)[1]);
var maxmake = 1;
while(totalamount<=pMineral)
{
	oneland = oneland + 150;
	totalamount = totalamount + oneland;
	maxmake++;
}
maxmake = maxmake-1;

th = document.createElement('th');
th.colSpan=5;
th.innerHTML = 'You can afford to allocate: '+maxmake;
th.style.textAlign = "right";
th.className = "STD";
table.rows[6].appendChild(th);
	
}

function revoOverview() {

	
	function openOverviewPlayerBox(evt) {
		var target = evt.target;
		var player = Array(target.innerHTML,target.innerHTML,'');
		var location = revoParseLocation(target.previousSibling.previousSibling.innerHTML);
		revoPlayerBox(player, location, evt, target.parentNode.parentNode);	
	}
	var xPathTerm = "//TD[contains(@onclick,'view=profile&profile_name=')]";
	cells = document.evaluate(xPathTerm, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	var cell = null;
	var i = 0;
	var els = Array();
	do	{
		cell = cells.iterateNext();
		if(cell)
		els[i] = cell;
		i++;
		
	}while(cell);

	for(i=0;i<els.length;i++)
	{
		els[i].setAttribute('onClick', '');
		els[i].addEventListener('click', openOverviewPlayerBox, false);
	}
}

function revoPulses() {
	//
	// Add links to enter max possible creation amount per item 
	//
	var table = document.getElementsByTagName("table")[document.getElementsByTagName("table").length-2];
	if(table == null) 
		return false
		
	for(var i = 0;i<table.rows.length;i++)
	{
		var row = table.rows[i];
		if(row.cells.length==4)
		{
			if(row.cells[3].innerHTML.match(/ticks/))
			{
				if(matches = row.cells[1].innerHTML.match(/(\d+)o[^0-9]+(\d+)e/))
				{
					maxmake = pMineral/matches[1];
					if(pEnergy/matches[2]<maxmake)
						maxmake = pEnergy/matches[2];
					input = row.cells[3].getElementsByTagName('input')[0];
					input.id = input.name;
					maxmake = Math.floor(maxmake);
					row.cells[3].innerHTML = row.cells[3].innerHTML+'<br>'+'<a style="color:#ffffff;" href="#" onClick="document.getElementById(\''+input.name+'\').value='+maxmake+';return false;">'+maxmake+'</a>';
				}
			}
		}
	}

}

function revoBombs() {
	//
	// Add links to enter max possible creation amount per item 
	//
	var table = document.getElementsByTagName("table")[document.getElementsByTagName("table").length-2];
	if(table == null) 
		return false
		
	for(var i = 0;i<table.rows.length;i++)
	{
		var row = table.rows[i];
		if(row.cells.length==4)
		{
			if(row.cells[3].innerHTML.match(/ticks/))
			{
				if(matches = row.cells[1].innerHTML.match(/(\d+)m[^0-9]+(\d+)o/))
				{
					maxmake = pMineral/matches[1];
					if(pOrganic/matches[2]<maxmake)
						maxmake = pOrganic/matches[2];
					input = row.cells[3].getElementsByTagName('input')[0];
					input.id = input.name;
					maxmake = Math.floor(maxmake);
					row.cells[3].innerHTML = row.cells[3].innerHTML+'<br>'+'<a style="color:#ffffff;" href="#" onClick="document.getElementById(\''+input.name+'\').value='+maxmake+';return false;">'+maxmake+'</a>';
				}
			}
		}
	}

}

function revoForts() {
	//
	// Add links to enter max possible creation amount per item 
	//
	var table = document.getElementsByTagName("table")[document.getElementsByTagName("table").length-1];
	if(table == null) 
		return false
		
	row = table.rows[1];
	if(matches = row.cells[1].innerHTML.match(/(\d+)m[^0-9]+(\d+)o/))
	{
		maxmake = pMineral/matches[1];
		if(pOrganic/matches[2]<maxmake)
			maxmake = pOrganic/matches[2];
		input = row.cells[3].getElementsByTagName('input')[0];
		input.id = input.name;
		maxmake = Math.floor(maxmake);
		row.cells[3].innerHTML = row.cells[3].innerHTML+'<br>'+'<a style="color:#ffffff;" href="#" onClick="document.getElementById(\''+input.name+'\').value='+maxmake+';return false;">'+maxmake+'</a>';
	}


}

function revoScans() {
	//
	// Add links to enter max possible creation amount per item 
	//
	var table = document.getElementsByTagName("table")[document.getElementsByTagName("table").length-1];
	if(table == null) 
	{
		return false
	}
	for(var i = 0;i<table.rows.length;i++)
	{
		var row = table.rows[i];
		if(row.cells.length==4)
		{
			if(row.cells[3].innerHTML.match(/ticks/) || true)
			{
				if(matches = row.cells[1].innerHTML.match(/(\d+)m[^0-9]+(\d+)e/))
				{
					maxmake = pMineral/matches[1];
					if(pEnergy/matches[2]<maxmake)
						maxmake = pEnergy/matches[2];
					maxmake = Math.floor(maxmake);
					input = row.cells[3].getElementsByTagName('input')[0];
					if(input)
					{
					input.id = input.name;
					maxmake = Math.floor(maxmake);
					row.cells[3].innerHTML = row.cells[3].innerHTML+'<br>'+'<a style="color:#ffffff;" href="#" onClick="document.getElementById(\''+input.name+'\').value='+maxmake+';return false;">'+maxmake+'</a>';
					} else {
						row.cells[3].innerHTML = 'max: '+maxmake;
					
					}
				}
			}
		}
	}

}

function revoCreatures() {
	//
	// Add links to enter max possible creation amount per item 
	//
	var table = null;
	var xPathTerm = "//TR/TH[contains(.,'Order Creatures')]";
	cell = document.evaluate(xPathTerm, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(cell)
		table = cell.parentNode.parentNode;
	if(table == null) 
		return false
	for(var i = 0;i<table.rows.length;i++)
	{
		var row = table.rows[i];
		if(row.cells.length==5)
		{
				var maxmake = pFactories+10;
				if(matches = row.cells[2].innerHTML.match(/(\d+)m[^0-9]+(\d+)o/))
				{
					if(pMineral/matches[1]<maxmake)
						maxmake = pMineral/matches[1];
					if(pOrganic/matches[2]<maxmake)
						maxmake = pOrganic/matches[2];
					if(input = row.cells[4].getElementsByTagName('input')[0])
						input.id = input.name;
					maxmake = Math.floor(maxmake);
					
					if(row.cells[4].innerHTML.match(/ticks/))
					{
						row.cells[4].innerHTML = row.cells[4].innerHTML+'<br>'+'<a style="color:#ffffff;" href="#" onClick="document.getElementById(\''+input.name+'\').value='+maxmake+';return false;">'+maxmake+'</a>';
					} else {
						row.cells[4].innerHTML = row.cells[4].innerHTML+'max: '+maxmake;
					}
					cost = matches[1]+matches[2];
					if(matches = row.cells[1].innerHTML.match(/att[^0-9]+(\d+).+def[^0-9]+(\d+)/))
					{
//						row.cells[1].innerHTML = row.cells[1].innerHTML + 'asd';
					}
					if(matches = row.cells[1].innerHTML.match(/int[^0-9]+(\d+).+dis[^0-9]+(\d+)/))
					{
//						row.cells[1].innerHTML = row.cells[1].innerHTML + '123';
					
					}
					if(matches = row.cells[1].innerHTML.match(/foc[^0-9]+(\d+)/))
					{
//						row.cells[1].innerHTML = row.cells[1].innerHTML + 'fgh';
					}
				}
				
				
				
		}
	}
}

//
// Add colors to the scores, add link to attackable, highlight current player,
// add player popup box, and rank column
//

function revoPlayerRank() {
	function openPlayerBox(evt) {
		var target = evt.target;
		var player = revoParsePlayer(target.innerHTML);
		var location = revoParseLocation(target.previousSibling.previousSibling.previousSibling.innerHTML);
		revoPlayerBox(player, location, evt, table);	
	}
	
	var table = null;
	// Get the last table on the page
	var table = document.getElementsByTagName("table")[document.getElementsByTagName("table").length-1];
	if(table == null || table.rows.length < 2) { 
		return false;
	}
	
	//Add a Rank Column
	var cell = table.rows[1].insertCell(0);
	cell.className = 'SIDEBAR'
	cell.style.backgroundColor = COLOR_RANK_HEADER;
	cell.innerHTML = "Rank";
	cell.setAttribute('onClick', "location.href='main_page.php5?view=rankings&subview=player&order=score'");
	cell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_RANK_HEADER_HIGHLIGHT;}, false);
	cell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_RANK_HEADER;}, false);
	
	for(var i = 2; i<table.rows.length;i++)
	{
		// Add Rank Column
		cell = table.rows[i].insertCell(0);
		cell.className = 'SIDEBAR'
		cell.style.backgroundColor = COLOR_RANK_CELL;
		cell.innerHTML = i - 1;
		
		//Here are the cells
		var locationCell = table.rows[i].cells[1];
		var allianceCell = table.rows[i].cells[2];
		var playerCell = table.rows[i].cells[3];
		var structureCell = table.rows[i].cells[4];
		var scoreCell = table.rows[i].cells[5];
		var onlineCell = table.rows[i].cells[6];
		
		//now let's pull some info
		var loc = revoParseLocation(locationCell.innerHTML);
		var player = revoParsePlayer(playerCell.innerHTML);
		
		// Add a link to the planet on the location cell
		locationCell.setAttribute('onClick', "location.href='main_page.php5?view=universe&galaxy=" + loc[1] + "&star=" + loc[2] + "&planet=" + loc[3] + "';");
		locationCell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_RANK_CELL;}, false);
		locationCell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_RANK_HIGHLIGHT;}, false);
		//Highlight the row if it is the current player
		if(player && (player[2]+player[3]) == pPlayer) {
			cell.style.backgroundColor = COLOR_RANK_PLAYER;
			locationCell.style.backgroundColor = COLOR_RANK_PLAYER;
			locationCell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_RANK_PLAYER;}, false);
			locationCell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_RANK_PLAYER_HIGHLIGHT;}, false);
			allianceCell.style.backgroundColor = COLOR_RANK_PLAYER;
			allianceCell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_RANK_PLAYER;}, false);
			allianceCell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_RANK_PLAYER_HIGHLIGHT;}, false);
			playerCell.style.backgroundColor = COLOR_RANK_PLAYER;
			playerCell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_RANK_PLAYER;}, false);
			playerCell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_RANK_PLAYER_HIGHLIGHT;}, false);
			structureCell.style.backgroundColor = COLOR_RANK_PLAYER;
			scoreCell.style.backgroundColor = COLOR_RANK_PLAYER;
			onlineCell.style.backgroundColor = COLOR_RANK_PLAYER;
		}
		
		//Change the score cells
		var score = scoreCell.innerHTML.replace(/,| /g, '') * 1;
		if(score < pMinScore) {
			scoreCell.style.color = COLOR_YOU_CANT_ATTACK;
		} else if(score > pMaxScore) {
				scoreCell.style.color = COLOR_CANT_ATTACK_YOU;
		}
		
		//Add the player box
		playerCell.setAttribute('onClick', '');
		playerCell.addEventListener('click', openPlayerBox, false);
	}
	//alert('rank');
};
	
function revoAllianceRank() {
	var table = null;
	// Get the last table on the page
	var table = document.getElementsByTagName("table")[document.getElementsByTagName("table").length-1];
	if(table == null || table.rows.length < 2) { 
		return false;
	}
	
	//Add a Rank Column
	var cell = table.rows[1].insertCell(0);
	cell.className = 'SIDEBAR'
	cell.style.backgroundColor = COLOR_RANK_HEADER;
	cell.innerHTML = "Rank";
	cell.setAttribute('onClick', "location.href='main_page.php5?view=rankings&subview=alliance&order=score'");
	cell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_RANK_HEADER_HIGHLIGHT;}, false);
	cell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_RANK_HEADER;}, false);
	
	//Add an averace structures column
	cell = table.rows[1].insertCell(5);
	cell.className = 'SIDEBAR'
	cell.style.backgroundColor = COLOR_RANK_HEADER;
	cell.innerHTML = "Avg. Structures";
	//cell.setAttribute('onClick', "location.href='main_page.php5?view=rankings&subview=alliance&order=score'");
	//cell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_RANK_HEADER_HIGHLIGHT;}, false);
	//cell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_RANK_HEADER;}, false);
	
	//Add an averace score column
	cell = table.rows[1].insertCell(7);
	cell.className = 'SIDEBAR'
	cell.style.backgroundColor = COLOR_RANK_HEADER;
	cell.innerHTML = "Avg. Score";
	//cell.setAttribute('onClick', "location.href='main_page.php5?view=rankings&subview=alliance&order=score'");
	//cell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_RANK_HEADER_HIGHLIGHT;}, false);
	//cell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_RANK_HEADER;}, false);
	
	
	
	for(var i = 2; i<table.rows.length;i++)
	{
		// Add Rank Column
		cell = table.rows[i].insertCell(0);
		cell.className = 'STD'
		cell.innerHTML = i - 1;
		
		//Here are the cells
		var allianceCell = table.rows[i].cells[1];
		var tagCell = table.rows[i].cells[2];
		var membersCell = table.rows[i].cells[3];
		var structuresCell = table.rows[i].cells[4];
		var scoreCell = table.rows[i].cells[5];
		
		var members = membersCell.innerHTML.replace(/ /,'') * 1;
		var structures = structuresCell.innerHTML.replace(/ /,'') * 1;
		var score = scoreCell.innerHTML.replace(/ /,'') * 1;
		
		//convert the numbers
		structuresCell.innerHTML = evoNumber2String(structures);
		scoreCell.innerHTML = evoNumber2String(score);
		
		//Add an average structures column
		cell = table.rows[i].insertCell(5);
		cell.className = 'STD'
		cell.innerHTML = evoNumber2String(Math.round(structures/members));
		
		//Add an average score column
		cell = table.rows[i].insertCell(7);
		cell.className = 'STD'
		cell.innerHTML = evoNumber2String(Math.round(score/members));		
	}
}

function revoFleet() {
	function openOverviewPlayerBox(evt) {
		var target = evt.target;
		var player = Array(target.innerHTML,target.innerHTML,'');
		var location = revoParseLocation(target.previousSibling.previousSibling.innerHTML);
		revoPlayerBox(player, location, evt, target.parentNode.parentNode);	
	}
	var xPathTerm = "//TD[contains(@onclick,'view=profile&profile_name=')]";
	cells = document.evaluate(xPathTerm, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	var cell = null;
	var i = 0;
	var els = Array();
	do	{
		cell = cells.iterateNext();
		if(cell)
		els[i] = cell;
		i++;
		
	}while(cell);

	for(i=0;i<els.length;i++)
	{
		els[i].setAttribute('onClick', '');
		els[i].addEventListener('click', openOverviewPlayerBox, false);
	}
	for(var i = 0;i<document.forms.length;i++)
	{
		document.forms[i].action = document.forms[i].action + '?view=fleets';
	}
	if(match = document.location.search.match(/(\d+):(\d+):(\d+):(\d+)/))
	{
		for(var i=2;i<5;i++)
		{
			var els = document.forms[i].elements;
			els[4].selectedIndex = match[1]-1;
			els[5].selectedIndex = match[2]-1;
			els[6].selectedIndex = match[3]-1;
			els[7].selectedIndex = match[4]-1;
		}

	}
	var xPathTerm = "//TR/TH[contains(.,'Fleets')]";
	cell = document.evaluate(xPathTerm, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(cell)
		table = cell.parentNode.parentNode;
	var h = f1 = f2 = f3 = 0;
	var totalrow = '';
	for(var i=0;i<table.rows.length;i++)
	{
		row = table.rows[i];
		if(row.cells.length==9)
		{
			if(row.cells[0].innerHTML != ' &nbsp; ')
			{
				if(m = row.cells[1].innerHTML.match(/([0-9]+)/))
				{
					h = h +   parseInt(m[1]);
					input = row.cells[2].getElementsByTagName('input')[0];
					input.id = input.name;
					row.cells[1].innerHTML = '<a href="#" onClick="document.getElementById(\''+input.name+'\').value='+m[1]+';return false;">' + m[1] + '</a>';
				}
				if(m = row.cells[3].innerHTML.match(/([0-9]+)/))
				{
					f1 = f1 +   parseInt(m[1]);
					input = row.cells[4].getElementsByTagName('input')[0];
					input.id = input.name;
					row.cells[3].innerHTML = '<a href="#" onClick="document.getElementById(\''+input.name+'\').value='+m[1]+';return false;">' + m[1] + '</a>';
				}
				if(m = row.cells[5].innerHTML.match(/([0-9]+)/))
				{
					f2 = f2 +   parseInt(m[1]);
					input = row.cells[6].getElementsByTagName('input')[0];
					input.id = input.name;
					row.cells[5].innerHTML = '<a href="#" onClick="document.getElementById(\''+input.name+'\').value='+m[1]+';return false;">' + m[1] + '</a>';
				}
				if(m = row.cells[7].innerHTML.match(/([0-9]+)/))
				{
					f3 = f3 +   parseInt(m[1]);
					input = row.cells[8].getElementsByTagName('input')[0];
					input.id = input.name;
					row.cells[7].innerHTML = '<a href="#" onClick="document.getElementById(\''+input.name+'\').value='+m[1]+';return false;">' + m[1] + '</a>';
				}
			} else {
				totalrow = row;
				row.cells[0].innerHTML = 'TOTAL';
				row.cells[1].innerHTML = h;
				row.cells[3].innerHTML = f1;
				row.cells[5].innerHTML = f2;
				row.cells[7].innerHTML = f3;
			
			
			}
		
		}
	}
		if(totalrow!='')
		{
			var most = f1;
			if(f2>most)
			{
				most = f2;
			}
			if(f3>most)
			{
				most = f3;
			}
			
			if((most - f1)>0)
				totalrow.cells[3].innerHTML = totalrow.cells[3].innerHTML + '<br>(' + (most - f1) + ' more)';
			if((most - f2)>0)
				totalrow.cells[5].innerHTML = totalrow.cells[5].innerHTML + '<br>(' + (most - f2) + ' more)';
			if((most - f3)>0)
				totalrow.cells[7].innerHTML = totalrow.cells[7].innerHTML + '<br>(' + (most - f3) + ' more)';
		
		}

};

// Changes the cursors on clickable cells
// Will probably do other things in the future
function revoUI() {
	// Get all of the cells with onclick handlers
	var xPathTerm = "//td[@onclick]";
	
	var els = document.evaluate(xPathTerm, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	var el = els.iterateNext();
	var nodes = Array();
	var i = 0;
	
	// Store them in an array
	while (el) {
		nodes[i] = el;
		i++;
		el = els.iterateNext();
	}
	
	//Go through and change the cursors
	for(i = 0; i<nodes.length;i++)
	{
		nodes[i].style.cursor = 'pointer';
	}
}

// Creates the player popup boxes on the rankings and universe pages
function revoPlayerBox(player, location, evt, parent) {
	function closePlayerBox() {
		boxDiv.style.visibility = 'hidden';
		parent.removeChild(boxDiv);
		table = null;
		boxDiv = null;
	}
		
	var boxDiv = document.createElement('DIV');
	boxDiv.id = player[2] + '_box';
	boxDiv.style.width = '177px';
	boxDiv.style.height = '150px';
	boxDiv.style.position = 'absolute';
	boxDiv.style.visibility = 'visible';
	boxDiv.style.top = evt.pageY;
	boxDiv.style.left = evt.pageX;
	
	var table = document.createElement('TABLE');
	table.className = 'STD';
	table.style.width = '177px';
	table.style.height = '150px';
	
	//header
	var row = table.insertRow(-1);
	var cell = row.insertCell(-1);
	cell.className = 'SIDEBAR';
	cell.style.backgroundColor = COLOR_PLAYER_BOX_HEADER;
	cell.innerHTML = player[1];

	revoAddPlayerBoxCell(table, 'Attack', 'main_page.php5?view=fleets&galaxy=' + location[1] + '&star=' + location[2] + '&planet=' + location[3] + '&continent=' + location[4]);
	revoAddPlayerBoxCell(table, 'Scan', 'main_page.php5?view=scans&subview=remote&galaxy=' + location[1] + '&star=' + location[2] + '&planet=' + location[3] + '&continent=' + location[4]);
	revoAddPlayerBoxCell(table, 'Monitor', 'main_page.php5?view=scans&subview=monitor&galaxy=' + location[1] + '&star=' + location[2] + '&planet=' + location[3] + '&continent=' + location[4]);
	revoAddPlayerBoxCell(table, 'Blast', 'main_page.php5?view=pulses&galaxy=' + location[1] + '&star=' + location[2] + '&planet=' + location[3] + '&continent=' + location[4]);
	
	row = table.insertRow(-1);
	cell = row.insertCell(-1);
	cell.className = 'SIDEBAR';
	cell.style.backgroundColor = COLOR_PLAYER_BOX_CELL;
	cell.style.cursor = 'pointer';
	cell.innerHTML = 'Close';	
	cell.addEventListener('click', closePlayerBox, false);
	cell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_PLAYER_BOX_HIGHLIGHT;}, false);
	cell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_PLAYER_BOX_CELL;}, false);
	
	boxDiv.appendChild(table);
	
	parent.appendChild(boxDiv);
	boxDiv.style.visibility = 'visible';
	
	return false;
}

function revoAddPlayerBoxCell(table, command, link) {
	var row = table.insertRow(-1);
	cell = row.insertCell(-1);
	cell.className = 'SIDEBAR';
	cell.style.backgroundColor = COLOR_PLAYER_BOX_CELL;
	cell.style.cursor = 'pointer';
	cell.innerHTML = command;	
	cell.addEventListener('click', function() {location.href=link}, false);
	cell.addEventListener('mouseover', function() { this.style.backgroundColor=COLOR_PLAYER_BOX_HIGHLIGHT;}, false);
	cell.addEventListener('mouseout', function() { this.style.backgroundColor=COLOR_PLAYER_BOX_CELL;}, false);
	
}

//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
(function () {
	var totalPlayers = null;
	var match;
	var node;
	var statpanel;

	var profiler = Date.now();

	// Initialization
	// -----------------------------------------------------------------------
	// contents node

	// initialize the units table
	revoUnitsInitialize();

	// grab player name and set revo+ version
	var temp = document.getElementById('player_name');
	if (temp) {
		match = temp.innerHTML.match(/\) ((\S[\S ]*) of ([\S ]*)\S)/);
		if (match) {
			unsafeWindow.revo_plus['pPlayer'] = pPlayer = match[1];
		}
		temp.innerHTML = temp.innerHTML.replace(/v0\.0\.0/, scriptversion);
	}
	
	

	//get player stats
	revoGetStat('score', 'pScore');
	revoGetStat('mineral', 'pMineral');
	revoGetStat('organic', 'pOrganic');
	revoGetStat('energy', 'pEnergy');
	revoGetStat('ratio', 'pRatio');
	revoGetStat('unassigned', 'pUnassigned');
	revoGetStat('extractor', 'pExtractor');
	revoGetStat('genetic_lab', 'pGeneticLabs');
	revoGetStat('powerplant', 'pPowerplants');
	revoGetStat('factory', 'pFactories');
	revoGetStat('min_score', 'pMinScore');
	revoGetStat('max_score', 'pMaxScore');

	
	// Dispatch
	// -----------------------------------------------------------------------
	for(var i = 0; i < pageHandlers.length; i++ ) {
		if( pageHandlers[i].urlRegEx == null || pageHandlers[i].urlRegEx.test(document.location.pathname+document.location.search) )
			pageHandlers[i].handler();
	}
	
	
	
	
	

	// THE revo+ bar
	// -----------------------------------------------------------------------
	/*if(document.getElementById('clock'))
	{
		node = document.createElement('DIV');
		node.style.textAlign="right";
		node.style.marginRight="5px";
		node.style.marginTop="3px";
		node.style.marginBottom="3px";
	
		function addItemToContent(c, text, className, html, isLastItem) {
			c.appendChild(document.createTextNode(text));
			var span = document.createElement('SPAN');
			span.className = className;
			if( isLastItem ) html += "&nbsp;|&nbsp;";
			span.innerHTML = html;
			c.appendChild(span);
		}
	
		addItemToContent(node, 'Min. Target Score: ', 't_normal b', evoNumber2String(Math.ceil(pScore * minAttack)), true);
		addItemToContent(node, 'Max. Attacker Score: ', 't_normal b', evoNumber2String(Math.floor(pScore / minAttack)), false);
	
		statpanel.appendChild(node);
	
		node2 = document.createElement('DIV');
		node2.style.color = "lawngreen";
		node2.style.fontSize = "8pt"; node2.style.fontWeight = "bold";
		node2.style.paddingLeft = "3px"; node2.style.paddingTop = "3px";
		node2.style.position = "absolute";
		node2.style.top = "63px";
		node2.innerHTML = scriptversionID;
		node2.title = scriptTag;
		node2.id = "revomagik";
		
	//	alert(document.body.table);
		
		
		statpanel.appendChild(node2);
	}*/
	
	
/*	var xPathTerm = "//TD[@onClick=\"location.href='main_page.php5?view=chat&subview=main&type=main&group=main&channel=debugging'\"]";
	cell = document.evaluate(xPathTerm, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	cell.id = 'debugging';
	unsafeWindow.document.getElementById('debugging').onclick = function()
	{
		unsafeWindow.chat_channel = 'debugging'
		unsafeWindow.document.getElementById('debugging').style.background = '#404040';
		return false;
	};
*/	
	

	profiler = Date.now() - profiler;
}) ();

//
// ***************************************************************************
// ** Helper functions
// ***************************************************************************
//
function gcf(a,b) {
	while( b != 0 ) {
		t = a%b;
		a = b;
		b = t;
	}
	return a;
}

function evoLayoutChanged() {
	alert('Oops.. Page layout was not recognized, Judal probably changed the page :(');
}

function evoNumber2String(num) {
	var re = /(\d+)(\d{3})/g;
	num = String(num);
	var decimalIdx = num.indexOf('.');
	var part1 = '1', part2="";
	if( decimalIdx != -1 ) {
		part1 = num.substring(0, decimalIdx);
		part2 = num.substring(decimalIdx + 1, num.length);
	} else {
		part1 = num;
	}
	while( re.test(part1) ) part1 = part1.replace(re, '$1,$2');
	return part2 == "" ? part1 : part1 + "." + part2;
}

function evoString2Number(num) {
	return Number(num.replace(/,/g,''));
}

function evoFormatNumberZ(num, zeros) {
	var str = "0000" + Math.floor(Math.abs(num));
	return str.substr(-zeros);
}

function revoParseLocation(location) {
	return location.match(/\s*(\d+):(\d+):(\d+):(\d+)\s*/);
}

function revoParsePlayer(player) {
	var p = player.match(/\s*((\S[^<]*)(?:<[^>]+>)+( of [\S ]*))/);
	return p;
}

function revoGetStat(stat, saveStat) {
	var num = null;
	temp = document.getElementById(stat);
	if (temp) {
		num = temp.innerHTML.replace(/,| /g,'');
		unsafeWindow.revo_plus[saveStat] = num;
		eval(saveStat + ' = "' + num + '"');
	}
}

//
// ***************************************************************************
// ** Objects
// ***************************************************************************

// revoUnit
function revoUnit(unitName, unitType, ticks, metal, mineral, attack, defense, intel, weight, defenseBoost, eats) {
	this.unitName = unitName;
	this.unitType = unitType;
	this.defense = defense;
	this.attack = attack;
	this.metal = metal;
	this.ticks = ticks;
	this.intel = intel;
	this.weight = weight;
	this.mineral = mineral;
	this.eats = eats;
	this.defenseBoost = defenseBoost/100 + 1;
	return this;
}

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
	this.urlRegEx = urlRegEx;
	this.handler = handler;
}
function regPageHandler(urlRegEx, handler) {
	pageHandlers.push(new pageHandler(urlRegEx,  handler));
}

//
// ***************************************************************************
// ** MISC
// ***************************************************************************

// GM implementation of cookies :)
function evoSetCookie(name, value, hours) {
	GM_setValue('cv_' + name, value);
	var expire = new Date();
	expire.setUTCHours(expire.getUTCHours() + hours);
	GM_setValue('cx_' + name, expire.toGMTString());
}

function evoGetCookie(name) {
	var value = GM_getValue('cv_' + name);
	var expire = GM_getValue('cx_' + name);
	if( value != null && expire != null ) {
		expire = new Date(expire);
		if( expire.valueOf() >= Date.now() ) return value;
	}
	return null;
}

//
// ***************************************************************************
// ** Evo units stats
// ***************************************************************************
function revoUnitsInitialize() {
	revoUnit.prototype.getFoodCost = function(count) {
		return this.eats?count * (this.mineral+this.metal)/100:0;
	}

	revoUnit.prototype.getAttackScore = function(count) {
		return count * this.attack * this.attack;
	}

	revoUnit.prototype.getDefenseScore = function(count) {
		//Changed to reflect correct formula, Thanks to Mefisto of Alexandria
		return count * this.defense * this.defense * this.defenseBoost;
	}

	revoUnit.prototype.getMaxUnits = function (metal, mineral) {
		if( this.unitType == UT_NATURAL )
			return Math.min(Math.floor(metal / (this.metal * eeb)), Math.floor(mineral / (this.mineral * eeb)));
		else
			return Math.min(Math.floor(metal / this.metal), Math.floor(mineral / this.mineral));
	}

	revoUnit.prototype.getMetal = function() {
		return this.unitType == UT_NATURAL ? (this.metal * eeb) : this.metal;
	}

	revoUnit.prototype.getMineral = function() {
		return this.unitType == UT_NATURAL ? (this.mineral * eeb) : this.mineral;
	}

	revoUnit.prototype.getBoost = function() {
		return boosts[this.unitType];
	}

	revoUnit.prototype.getWeight = function() {
		return this.weight;
	}
	units = null;

/*		units['monkey']           = new revoUnit('Monkey'           ,UT_NATURAL ,3   ,500    ,250    ,4   ,4   ,3   ,0  ,40 ,true);

		units['sheep']            = new revoUnit('Sheep'            ,UT_NATURAL ,4   ,1500   ,750    ,11  ,11  ,6   ,0  ,40 ,true);
		units['wolf']             = new revoUnit('Wolf'             ,UT_NATURAL ,10  ,8000   ,4000   ,27  ,25  ,14  ,0  ,40 ,true);
		units['python']           = new revoUnit('Python'           ,UT_NATURAL ,12  ,12500  ,5000   ,36  ,30  ,7   ,1  ,40 ,true);
		units['kangaroo']         = new revoUnit('Kangaroo'         ,UT_NATURAL ,15  ,15000  ,8000   ,36  ,40  ,5   ,1  ,40 ,true);
		units['walrus']           = new revoUnit('Walrus'           ,UT_NATURAL ,18  ,26000  ,13000  ,52  ,51  ,4   ,2  ,40 ,true);

		units['cow']              = new revoUnit('Cow'              ,UT_NATURAL ,6   ,2500   ,1250   ,16  ,13  ,3   ,1  ,40 ,true);
		units['hyena']            = new revoUnit('Hyena'            ,UT_NATURAL ,9   ,8800   ,3300   ,28  ,27  ,9   ,1  ,40 ,true);
		units['ostrich']          = new revoUnit('Ostrich'          ,UT_NATURAL ,12  ,18000  ,8000   ,42  ,44  ,6   ,2  ,40 ,true);
		units['bear']             = new revoUnit('Bear'             ,UT_NATURAL ,15  ,30000  ,15000  ,60  ,57  ,12  ,3  ,40 ,true);
		units['elephant']         = new revoUnit('Elephant'         ,UT_NATURAL ,19  ,42000  ,21000  ,72  ,75  ,22  ,4  ,40 ,true);

		units['horse']            = new revoUnit('Horse'            ,UT_NATURAL ,5   ,2000   ,1000   ,13  ,13  ,4   ,1  ,40 ,true);
		units['fox']              = new revoUnit('Fox'              ,UT_NATURAL ,9   ,7200   ,3200   ,24  ,25  ,8   ,0  ,40 ,true);
		units['puma']             = new revoUnit('Puma'             ,UT_NATURAL ,13  ,11000  ,5000   ,32  ,32  ,5   ,1  ,40 ,true);
		units['lynx']             = new revoUnit('Lynx'             ,UT_NATURAL ,15  ,12000  ,5500   ,35  ,31  ,8   ,1  ,40 ,true);
		units['lion']             = new revoUnit('Lion'             ,UT_NATURAL ,15  ,12000  ,5000   ,31  ,35  ,8   ,1  ,40 ,true);
		units['cheetah']          = new revoUnit('Cheetah'          ,UT_NATURAL ,16  ,14000  ,7000   ,41  ,29  ,5   ,1  ,40 ,true);
		units['panther']          = new revoUnit('Panther'          ,UT_NATURAL ,16  ,14000  ,8000   ,32  ,41  ,6   ,1  ,40 ,true);
		units['tiger']            = new revoUnit('Tiger'            ,UT_NATURAL ,20  ,18000  ,9000   ,44  ,43  ,11  ,2  ,40 ,true);
		units['rhino']            = new revoUnit('Rhino'            ,UT_NATURAL ,24  ,28000  ,17000  ,66  ,51  ,3   ,3  ,40 ,true);
        
		units['centaur']          = new revoUnit('Centaur'          ,UT_ENG     ,5   ,4800   ,2400   ,22  ,23  ,10  ,1  ,40 ,true);
		units['unicorn']          = new revoUnit('Unicorn'          ,UT_ENG     ,8   ,7500   ,3750   ,31  ,26  ,6   ,1  ,40 ,true);
		units['gryphon']          = new revoUnit('Gryphon'          ,UT_ENG     ,12  ,10500  ,5250   ,36  ,36  ,8   ,2  ,40 ,true);
		units['minotaur']         = new revoUnit('Minotaur'         ,UT_ENG     ,18  ,19000  ,9500   ,54  ,43  ,13  ,2  ,40 ,true);
		units['dragon']           = new revoUnit('Dragon'           ,UT_ENG     ,24  ,30000  ,15000  ,76  ,67  ,9   ,3  ,40 ,true);

		units['fire sprite']      = new revoUnit('Fire Sprite'      ,UT_ENG     ,4   ,5000   ,2500   ,25  ,18  ,4   ,0  ,40 ,true);
		units['salamander']       = new revoUnit('Salamander'       ,UT_ENG     ,7   ,9000   ,4500   ,36  ,26  ,10  ,1  ,40 ,true);
		units['phoenix']          = new revoUnit('Phoenix'          ,UT_ENG     ,10  ,14600  ,7300   ,44  ,37  ,6   ,1  ,40 ,true);
		units['wyvern']           = new revoUnit('Wyvern'           ,UT_ENG     ,15  ,25000  ,12500  ,64  ,43  ,7   ,2  ,40 ,true);
		units['demon']            = new revoUnit('Demon'            ,UT_ENG     ,20  ,34000  ,17000  ,93  ,58  ,5   ,3  ,40 ,true);

		units['dryad']            = new revoUnit('Dyrad'            ,UT_ENG     ,7   ,3600   ,2700   ,21  ,21  ,13  ,1  ,40 ,true);
		units['basilisk']         = new revoUnit('Baskilisk'        ,UT_ENG     ,10  ,5800   ,4350   ,29  ,24  ,21  ,1  ,40 ,true);
		units['medusa']           = new revoUnit('Medusa'           ,UT_ENG     ,15  ,10000  ,7500   ,37  ,34  ,15  ,1  ,40 ,true);
		units['cockatrice']       = new revoUnit('Cockatrice'       ,UT_ENG     ,21  ,18000  ,13500  ,54  ,45  ,23  ,2  ,40 ,true);
		units['werewolf']         = new revoUnit('Werewolf'         ,UT_ENG     ,28  ,26000  ,19500  ,70  ,64  ,30  ,2  ,40 ,true);

		units['avimimus']         = new revoUnit('Avimimus'         ,UT_ENG     ,4   ,3600   ,1800   ,22  ,17  ,2   ,1  ,40 ,true);
		units['therizinosaurus']  = new revoUnit('Therizinosaurus'  ,UT_ENG     ,6   ,5300   ,2650   ,26  ,22  ,3   ,1  ,40 ,true);
		units['styracosaurus']    = new revoUnit('Styracosaurus'    ,UT_ENG     ,8   ,9400   ,4700   ,33  ,35  ,8   ,2  ,40 ,true);
		units['carnotaurus']      = new revoUnit('Carnotaurus'      ,UT_ENG     ,11  ,15200  ,7600   ,51  ,41  ,5   ,3  ,40 ,true);
		units['giganotosaurus']   = new revoUnit('Giganotosaurus'   ,UT_ENG     ,14  ,24000  ,12000  ,75  ,56  ,4   ,4  ,40 ,true);

		units['scarab beetle']    = new revoUnit('Scarab Beetle'    ,UT_ENG     ,8   ,6000   ,3000   ,25  ,25  ,7   ,0  ,40 ,true);
		units['mummy']            = new revoUnit('Mummy'            ,UT_ENG     ,12  ,12000  ,6000   ,38  ,35  ,1   ,1  ,40 ,true);
		units['sta']              = new revoUnit('Sta'              ,UT_ENG     ,18  ,19000  ,9500   ,46  ,44  ,12  ,1  ,40 ,true);
		units['sphinx']           = new revoUnit('Sphinx'           ,UT_ENG     ,24  ,28000  ,14000  ,67  ,57  ,14  ,3  ,40 ,true);
		units['anubis incarnate'] = new revoUnit('Anubis Incarnate' ,UT_ENG     ,32  ,42000  ,21000  ,93  ,78  ,7   ,3  ,40 ,true);

      		units['fort']             = new revoUnit('Fort'             ,UT_NONE    ,4   ,2000   ,1000   ,24  ,42  ,0   ,0  ,40 ,false);
      		units['satellite']        = new revoUnit('Satellite'        ,UT_NONE    ,6   ,7000   ,3500   ,57  ,49  ,0   ,0  ,40 ,false);
      		units['satellite mark 2'] = new revoUnit('Satellite Mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,57  ,65  ,0   ,0  ,40 ,false);
		units['test sat mark 2'] = new revoUnit('Test Sat mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,57  ,65  ,0   ,0  ,40 ,false);
      		units['nanowire wall']    = new revoUnit('Nanowire wall'    ,UT_NONE    ,9   ,10000  ,4000   ,66  ,61  ,0   ,0  ,40 ,false);

		units['wave reflector']   = new revoUnit('Wave Reflector'   ,UT_NONE    ,4   ,2000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);

		units['biochemical missile']     = new revoUnit('Biochemical Missile' ,UT_NONE ,12  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['nanovirus missile']       = new revoUnit('Nanovirus Missile' ,UT_NONE    ,12  ,30000  ,15000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['bombs']                   = new revoUnit('Bombs'            ,UT_NONE    ,12  ,11000  ,7000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['neural reorganiser bomb'] = new revoUnit('Neural Reorganiser Bomb' ,UT_NONE ,24,50000 ,32000 ,0  ,0   ,0   ,0  ,0  ,false);
		units['poison bombs']            = new revoUnit('Poison Bombs'     ,UT_NONE    ,16  ,16000  ,12000  ,0   ,0   ,0   ,0  ,0  ,false);

		units['land scan']        = new revoUnit('Land Scan'        ,UT_NONE    ,4   ,1000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['scan amplifier']   = new revoUnit('Scan Amplifier'   ,UT_NONE    ,4   ,1000   ,1000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['sector scan']      = new revoUnit('Sector Scan'      ,UT_NONE    ,8   ,2000   ,4000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['creature scan']    = new revoUnit('Creature Scan'    ,UT_NONE    ,8   ,3000   ,6000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['r&d scan']         = new revoUnit('R&D Scan'         ,UT_NONE    ,6   ,2000   ,3000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['news scan']        = new revoUnit('News Scan'        ,UT_NONE    ,18  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['military scan']    = new revoUnit('Military Scan'    ,UT_NONE    ,12  ,6000   ,12000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['microwave pulse']  = new revoUnit('Microwave Pulse'  ,UT_NONE    ,20  ,520000  ,1040000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['overload pulse']   = new revoUnit('Overload Pulse'   ,UT_NONE    ,24  ,1600000  ,3200000  ,0   ,0   ,0   ,0  ,0  ,false);
*/
	unsafeWindow.revo_plus['units'] = units;
}

GM_log("evo+ Finished");
