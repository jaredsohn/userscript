// ==UserScript==

// @name           PardusMemberInfo
// @namespace      PardusMemberInfo
// @description    Shows Statistics about Alliance Members
// @include        http://*.pardus.at/alliance_members.php
// ==/UserScript==
// Description: Adds a button to the alliance members page which shows
// alliance information on click.

// Currently displayed information: 

// Number of ships
// Ranks (Male and Female versions of rank titles are considered ;)
// Competency levels
// Number of Buildings per building type
// Number of Buildings per sector
// Number of open building slots per pilot
// Top 20 ranking for experience (Sum is over all pilots)
// Top 20 ranking for credits (Sum is over all pilots)
// Activeness of alliance
// Optional: If sector is selected, a detailed list of all buildings in this sector is shown.

// Author: Harrikiri
// email: harrikiri01@gmail.com

// JQ 2011-10-29: fixed ship recognition; added chip mill / neural lab; handle exception if pilot has no rank but is in syndicate
// Harrikiri 2012-10-24: Player name format (background, color, font) according to their activeness
// Harrikiri 2012-11-04: Added tables for reputation. Added option for maximal entries
//                       Fixed bug if alliance member has more than 1 billion credits

var html = document.body.innerHTML;
var starthtml;

var statistics;

var header;
var flag_getData = true;
var flag_initial = true;

var statstable;

//define used arrays for data
var ships = new Object();

var ranks = new Object();
var comps = new Object();
var sectors = new Object();
var bldgs = new Object();

var detail_sector = new Object();
var actives = new Object();
var slots = new Object();
var xp_sorted = new Object();
var cr_sorted = new Object();
var uni_dsc_sorted = new Object();
var fed_dsc_sorted = new Object();
var emp_dsc_sorted = new Object();

//count sectors; for sector select box

var init_regexp = /[^t]\S>(\w+\s?\w*-?\w*)<\/td></gi;	//Sectors
var sector;
var optEntries = [5,10,25,50,100];

while (result = init_regexp.exec(html)) {

	sector = result[1];
	if (sectors[sector] == null) {
		sectors[sector] = 1;
	} else {
		sectors[sector] = sectors[sector] + 1;
	}
}



//adding the button

statistics = document.createElement("div");

starthtml = "<div id='start'><br><input type='button' name='stats' value='Statistics'</button><br><br>";

//create options
//Dropdown for number of list entries
starthtml = starthtml + "Max. Entries: <select name='optentries' id='optentries' size='1'><option selected>25</option>"
for (key in optEntries) {
	starthtml = starthtml + "<option>" + optEntries[key] + "</option>";
}
starthtml = starthtml + "</select><br><br>"

//Dropdown for detailed Sector overview
starthtml = starthtml + "Sector Detail: <select name='optsectors' id='optsectors' size='1'><option selected></option>"
for (key in sectors) {
	starthtml = starthtml + "<option>" + key + "</option>";
}
starthtml = starthtml + "</select>"

starthtml = starthtml + "</select></div><br><br><div id='checkboxes'><form name=frmOptions><table><tr><td></td><td></td><td></td><td></td><td></td><td></td><td rowspan=7 valign='middle'><input type='button' name='save' value='Save'</button></td></tr><tr>";

var sOpt = GM_getValue("PardusAMI_Options","111111111111");
var options = new Array("Ships","Ranks","Competency","Sectors", "Buildings", "Open Slots","Pilot XP","Pilot Credits","Activeness","Fed Reputation","Emp Reputation","Uni Reputation");

for (var c = 0; c < options.length; c++) {
	if (c % 3 == 0) {
		starthtml = starthtml + "</tr><tr>";	
	}

	if (sOpt.substr(c,1) == "1") {
		starthtml = starthtml + "<td>" + options[c] + "</td><td><input type='checkbox' name='option' value='" + options[c] + "' checked/></td>";
	} else {
		starthtml = starthtml + "<td>" + options[c] + "</td><td><input type='checkbox' name='option' value='" + options[c] + "' /></td>";
	}
}



//close selection table

starthtml = starthtml + "</tr></table></form><br><br></div>";

statistics.innerHTML = starthtml;

header = document.getElementsByTagName("div");
header[0].parentNode.insertBefore(statistics, header[0].nextSibling);

var button = document.getElementsByName("stats");

button[0].addEventListener("click", displayStats, true);

button = document.getElementsByName("save");

button[0].addEventListener("click", saveOptions, true);





function displayStats() {
	var i = 0;
	var wanted_sector = document.getElementById('optsectors').value;
	var maxEntries = document.getElementById('optentries').value; //Maximum entries for cut off lists

	//************************************************
	//************************************************
	
	//SHIPS
	
	//************************************************
	//************************************************

	if (flag_getData) {
		//var regexp = /title=\S(\w*\s?\w*\s?\w*\s?\w+)\S\sstyle/gi;	//Ships
		//var regexp = /alt=\S(\w*\s?\w*\s?\w*\s?\w+)\S\stitle/gi;	//JQ -- but this also captures buildings!
		var regexp = /alt=\S(\w*\s?\w*\s?\w*\s?\w+)\S\stitle=\SView/gi;	//JQ -- capture only the ones that are followed by 'View( profile')

		var ship;

		while (result = regexp.exec(html)) {

			ship = result[1];

			if (ships[ship] == null) {

				ships[ship] = 1;

			} else {

				ships[ship] = ships[ship] + 1;

			}

		}

		//************************************************
		//************************************************
		
		//RANKS
		
		//************************************************
		//************************************************

		var regexp = /[^>](<img.*factions.*>)<\/span>/gi;	//Ranks
		var ranktext = /title=\S(\w+\S?\s?\w*)\s\(/i;
		var ranknr = /factions\/(\w+).png/
		var rTemp;
		var rname;
		var rnr;
		var rtxt;
		var rankdata = new Object();
		var ranking = new Object();
		var rsearch;

		//alert(ranktext.exec(regexp.exec(html)[1])[1]);		
		//JQ -- so that should work; yields rank
		//alert(ranknr.exec(regexp.exec(html)[1])[1]);
		//JQ -- yields something like 'unirank5'
		//alert(ranks[ranknr.exec(regexp.exec(html)[1])[1]]);

		while (result = regexp.exec(html)) {

			rTemp = ranktext.exec(result[1]); 
			if (rTemp != null) { //JQ
			//results sometimes yield double record:
			//that's including the EPS/TSS tags (ok)
			//comes out null because of EPS but no rank
			//people without rank or EPS/TSS get ignored already
			//must create this or any such person ends the loop

				rtxt = rTemp[1];
				rTemp = ranknr.exec(result[1]);
				rnr = rTemp[1];

				if (ranks[rnr] == null) {
					ranks[rnr] = 1;
				} else {
					ranks[rnr] = ranks[rnr] + 1;
				}

				rsearch = new RegExp(rtxt);

				//create the object with the rank names. Add name of other gender if it is not in the ranktext already

				if (rankdata[rnr] == null) {
					rankdata[rnr] = rtxt;
				} else if (rankdata[rnr].search(rsearch) == -1){
					rankdata[rnr] = rankdata[rnr] + " / " + rtxt;
				}
			}
		}

		for (key in ranks) {
			ranking["<img src='http://static.pardus.at/images/factions/" + 
			key + ".png' title='" + rankdata[key] + "' alt='" + rankdata[key] + 
			"' style='vertical-align:middle'>&nbsp;&nbsp;&nbsp;" + rankdata[key]] = ranks[key];
		}

	
		//************************************************
		//************************************************
		
		//COMPETENCY
		
		//************************************************
		//************************************************

		var regexp5 = /(<img.*neurank\d[^\d].{44}|<img.*neurank\d\d.{47})/gi;	//Competency
		var comp;

		while (result = regexp5.exec(html)) {
			comp = result[1];

			//close bracket after image
			comp = comp + ">";
			if (comps[comp] == null) {
				comps[comp] = 1;
			} else {
				comps[comp] = comps[comp] + 1;
			}
		}

		
		//************************************************
		//************************************************
		
		//BUILDINGS
		
		//************************************************
		//************************************************

		var regexp4 = /title=\S(\w+\s?\w*\s?\w*)\S><\/td>/gi;	//Buildings
		regexp = /title=\S(.+)\S>/i;							//Buildings
		var regexp2 = /\w{2}\S>(\w+\s?\w*-?\w*)<\/td></gi;		//Sectors
		var regexp3 = /(<img.+?foregrounds.+?>)/gi;
		var bldg;

		//add building names to array object

		bldgs["Fuel Collector"] = 0;
		bldgs["Gas Collector"] = 0;
		bldgs["Space Farm"] = 0;
		bldgs["Energy Well"] = 0;
		bldgs["Chemical Laboratory"] = 0;
		bldgs["Asteroid Mine"] = 0;
		bldgs["Radiation Collector"] = 0;
		bldgs["Medical Laboratory"] = 0;
		bldgs["Brewery"] = 0;
		bldgs["Plastics Facility"] = 0;
		bldgs["Smelting Facility"] = 0;
		bldgs["Optics Research Center"] = 0;
		bldgs["Slave Camp"] = 0;
		bldgs["Electronics Facility"] = 0;
		bldgs["Recyclotron"] = 0;
		bldgs["Clod Generator"] = 0;
		bldgs["Nebula Plant"] = 0;
		bldgs["Drug Station"] = 0;
		bldgs["Dark Dome"] = 0;
		bldgs["Handweapons Factory"] = 0;
		bldgs["Battleweapons Factory"] = 0;
		bldgs["Robot Factory"] = 0;
		bldgs["Droid Assembly Complex"] = 0;
		bldgs["Leech Nursery"] = 0;
		//JQ
		bldgs["Neural Laboratory"] = 0;
		bldgs["Stim Chip Mill"] = 0;
		bldgs["Military Outpost"] = 0;
		bldgs["Trading Outpost"] = 0;
		bldgs["Alliance Command Station"] = 0;
		bldgs["Starbase"] = 0;

		detail_sector["Fuel Collector"] = 0;
		detail_sector["Gas Collector"] = 0;
		detail_sector["Space Farm"] = 0;
		detail_sector["Energy Well"] = 0;
		detail_sector["Chemical Laboratory"] = 0;
		detail_sector["Asteroid Mine"] = 0;
		detail_sector["Radiation Collector"] = 0;
		detail_sector["Medical Laboratory"] = 0;
		detail_sector["Brewery"] = 0;
		detail_sector["Plastics Facility"] = 0;
		detail_sector["Smelting Facility"] = 0;
		detail_sector["Optics Research Center"] = 0;
		detail_sector["Slave Camp"] = 0;
		detail_sector["Electronics Facility"] = 0;
		detail_sector["Recyclotron"] = 0;
		detail_sector["Clod Generator"] = 0;
		detail_sector["Nebula Plant"] = 0;
		detail_sector["Drug Station"] = 0;
		detail_sector["Dark Dome"] = 0;
		detail_sector["Handweapons Factory"] = 0;
		detail_sector["Battleweapons Factory"] = 0;
		detail_sector["Robot Factory"] = 0;
		detail_sector["Droid Assembly Complex"] = 0;
		detail_sector["Leech Nursery"] = 0;
		//JQ
		detail_sector["Neural Laboratory"] = 0;
		detail_sector["Stim Chip Mill"] = 0;
		detail_sector["Military Outpost"] = 0;
		detail_sector["Trading Outpost"] = 0;
		detail_sector["Alliance Command Station"] = 0;
		detail_sector["Starbase"] = 0;
		
		//************************************************
		//************************************************
		
		//DETAILED SECTOR INFORMATION
		
		//************************************************
		//************************************************

		if (wanted_sector != "") {
			while (result3 = regexp3.exec(html)) {
				result = regexp.exec(result3[1]);
				result2 = regexp2.exec(html);
				sector = result2[1];
				bldg = result[1];

				if (bldgs[bldg] != null) {
					bldgs[bldg] = bldgs[bldg] + 1;
				} else {
					bldgs["Starbase"] = bldgs["Starbase"] + 1;
				}

				if (sector == wanted_sector) {
					if (detail_sector[bldg] != null) {
						detail_sector[bldg] = detail_sector[bldg] + 1;
					} else {
						detail_sector["Starbase"] = detail_sector["Starbase"] + 1;
					}
				}
			}

		} else {

			while (result3 = regexp3.exec(html)) {
				result = regexp.exec(result3[1]);
				bldg = result[1];

				if (bldgs[bldg] != null) {
					bldgs[bldg] = bldgs[bldg] + 1;
				} else {
					bldgs["Starbase"] = bldgs["Starbase"] + 1;
				}
			}
		}
	
		//************************************************
		//************************************************
	
		//ACTIVENESS
		
		//************************************************
		//************************************************

		var regexp = /<td>(<span.*<\/span>)<\/td>/gi;	//get activeness but with format
		var active;

		while (result = regexp.exec(html)) {
			active = result[1];

			if (actives[active] == null) {
				actives[active] = 1;
			} else {
				actives[active] = actives[active] + 1;
			}
		}

		
		//************************************************
		//************************************************
		
		//OPEN BUILDING SLOTS
		
		//************************************************
		//************************************************

		//GENERAL IDEA
		//Get beginning of table row of a pilot to the point where the building pictures are displayed
		//Count how many times the word 'foreground' appears and get the XP. Compare the XP to the number of buildings.
		//If open slot, then show pilot with message link.

		//===============================================

		//create regular expressions

		var bldg_regexp = /(<table>.*<\/table><\/td>)/gi;
		var fg_regexp = /foregrounds/gi;
		var xp_regexp = />(\d*,?\d*,?\d*,?\d+)<\/td>/gi;
		var plt_regexp = />(<.*>)<\/span><\/td>/gi;
		var fed_rep_regexp = />(-?\d*,?\d*,?\d+)\s?\//gi;
		var emp_rep_regexp = /\/\s(-?\d*,?\d*,?\d+)\s?\//gi;
		var uni_rep_regexp = /\/\s(-?\d*,?\d*,?\d+)\s?<\/td>/gi;
		var format_regexp = /<td><span\Wstyle=.(.*px;)/gi;	//get format of activeness
		var plt_name = /<a href.*>(.*)<\/a>/;
		
		var xp;
		var cr;
		var format;
		var pltname;
		var xp_raw = new Object();	//top 20 xp
		var cr_raw = new Object();	//top 20 credits
		
		var rep;
		var fed_rep_raw = new Object(); //Fed Reputation
		var emp_rep_raw = new Object(); //Emp Reputation
		var uni_rep_raw = new Object(); //Uni Reputation
		var bldgdata;
		var pilotlink;
		
		while (bldgdata = bldg_regexp.exec(html)) {
			i = 0;
			//count bldgnumber
			while (result = fg_regexp.exec(bldgdata[1])) {
				i++;
			}

			//pilotlink
			result = plt_regexp.exec(html);
			pilotlink = result[1];

			var result = plt_name.exec(pilotlink);
			pltname = result[1];
			
			//Format
			var result = format_regexp.exec(html);
			format = result[1];
			
					
			//Replace color in pilotlink						
			var re = new RegExp(">" + pltname,"g");
			
			//change font 10px to 12 px
			format = format.replace("10px","12px");
			pilotlink = pilotlink.replace(re ,"><span style='" + format + "'>" + pltname + "</span>");			
			
			//first finding is credits!
			var result = xp_regexp.exec(html);
			cr = parseInt(result[1].replace(/,/g,""));
			cr_raw[pilotlink] = cr;
		
			//second finding is XP!
			var result = xp_regexp.exec(html);
			xp = parseInt(result[1].replace(/,/g,""));
			
			//Reputation
			var result = fed_rep_regexp.exec(html);
			rep = parseFloat(result[1].replace(/,/g,""));
			fed_rep_raw[pilotlink] = rep;
			
			var result = emp_rep_regexp.exec(html);
			rep = parseFloat(result[1].replace(/,/g,""));
			emp_rep_raw[pilotlink] = rep;
			
			var result = uni_rep_regexp.exec(html);
			rep = parseFloat(result[1].replace(/,/g,""));
			uni_rep_raw[pilotlink] = rep;
		
			//save data to calculate experience
			xp_raw[pilotlink] = xp;
			while ((xp) > 100) {
				xp = xp / 10
				i--;
			}

			if (i < 0) {
				slots[pilotlink] = (i * -1);
			}
		}

		//sort and cut off pilot tables after var MaxEntries
		//get sums before arrays are changed
		var cr_sum = getSum(cr_raw);
		var xp_sum = getSum(xp_raw);
		var fed_avg = getAvg(fed_rep_raw);
		var emp_avg = getAvg(emp_rep_raw);
		var uni_avg = getAvg(uni_rep_raw);
		
		var k;

		//if maxEntries is bigger than all pilots in alliance, reset
		//maxEntries to number of pilots in alliance
		if (maxEntries > getLength(cr_raw)) {
			maxEntries = getLength(cr_raw);
		}
		
		for (i = 0; i < maxEntries; i++) {
			k = getMax(cr_raw);
			cr_sorted[k] = cr_raw[k];
			cr_raw[k] = null;
		}

		//sort and cut off xp table after 20
		for (i = 0; i < maxEntries; i++) {
			k = getMax(xp_raw);
			xp_sorted[k] = xp_raw[k];
			xp_raw[k] = null;
		}
		
		//sort and cut off Fed reputation table after 20
		for (i = 0; i < maxEntries; i++) {
			k = getMax(fed_rep_raw);
			fed_dsc_sorted[k] = fed_rep_raw[k];
			fed_rep_raw[k] = null;
		}
		
		//sort and cut off Emp reputation table after 20
		for (i = 0; i < maxEntries; i++) {
			k = getMax(emp_rep_raw);
			emp_dsc_sorted[k] = emp_rep_raw[k];
			emp_rep_raw[k] = null;
		}
		
		//sort and cut off Uni reputation table after 20
		for (i = 0; i < maxEntries; i++) {
			k = getMax(uni_rep_raw);
			uni_dsc_sorted[k] = uni_rep_raw[k];
			uni_rep_raw[k] = null;
		}
		
		
		flag_getData = false;
	}

	
	//************************************************
	//************************************************
	
	//OUTPUT
	
	//************************************************
	//************************************************


	
	var statstable = document.createElement("div");
	var statshtml = "<div id='statstable'><table><tr>";
	var temp;

	if (flag_initial) {
		//create table for ships
		temp = "<td valign='top'><table><tr class='first'><td>Ship</td><td>Nr</td></tr>";

		temp = temp + createTable(ships,1);

		temp = temp + "</table></td>";
		GM_setValue(options[0],temp);

		//create table for ranks
		temp = "<td valign='top'><table><tr class='first'><td>Rank</td><td>Nr</td></tr>";

		temp = temp + createTable(ranking,1);

		temp = temp + "</table></td>";
		GM_setValue(options[1],temp);

		//create table for competency
		temp = "<td valign='top'><table><tr class='first'><td>Comp</td><td>Nr</td></tr>";

		temp = temp + createTable(comps,1);

		temp = temp + "</table></td>";
		GM_setValue(options[2],temp);

		//create table for sectors
		temp = "<td valign='top'><table><tr class='first'><td>Sector</td><td>Buildings</td></tr>";

		temp = temp + createTable(sectors,1);

		temp = temp + "</table></td>";
		GM_setValue(options[3],temp);

		//create table for detail sectors

		temp = "<td valign='top'><table><tr class='first'><td>" + wanted_sector + "</td><td>Buildings</td></tr>";

		temp = temp + createTable(detail_sector,1);

		temp = temp + "</table></td>";
		GM_setValue("detail_sector",temp);

		//create table for buildings
		temp = "<td valign='top'><table><tr class='first'><td>Buildings</td><td>Nr</td></tr>";

		temp = temp + createTable(bldgs,1);

		temp = temp + "</table></td>";
		GM_setValue(options[4],temp);

		//create table for slots
		temp = "<td valign='top'><table><tr class='first'><td>Pilot</td><td></td><td>Open Slots</td></tr>";

		temp = temp + createPilotTable(slots, getSum(slots),0);

		temp = temp + "</table></td>";
		GM_setValue(options[5],temp);

		//create table for experience
		temp = "<td valign='top'><table><tr class='first'><td>Pilot</td><td></td><td>XP</td><td>%</td></tr>";

		temp = temp + createPilotTable(xp_sorted, xp_sum,1);

		temp = temp + "</table></td>";
		GM_setValue(options[6],temp);

		//create table for credits
		temp = "<td valign='top'><table><tr class='first'><td>Pilot</td><td></td><td>Credits</td><td>%</td></tr>";

		temp = temp + createPilotTable(cr_sorted, cr_sum,1);

		temp = temp + "</table></td>";
		GM_setValue(options[7],temp);
		
		//create table for actives
		temp = "<td valign='top'><table><tr class='first'><td>Activeness</td><td>Nr</td></tr>";

		temp = temp + createTable(actives,1);

		temp = temp + "</table></td>";
		GM_setValue(options[8],temp);
		
		//create table for fed reputation
		//temp = "<td valign='top'><table><tr class='first'><td>Pilot</td><td></td><td><img src='http://static.pardus.at/img/std/factions/fedrank13.png' title='Federation Reputation' style='vertical-align:middle'> Rep. <img src='http://static.pardus.at/img/std/factions/fedrank13.png' title='Federation Reputation' style='vertical-align:middle'></td></tr>";
		temp = "<td valign='top'><table><tr class='first'><td>Pilot</td><td></td><td align='center'><img src='http://static.pardus.at/img/std/factions/fedrank13.png' title='Federation Reputation'  style='vertical-align:middle'></td></tr>";
		temp = temp + createPilotTable(fed_dsc_sorted,fed_avg,0,"Average: ");
		temp = temp + "</table></td>";
		GM_setValue(options[9],temp);
		
		//create table for emp reputation
		//temp = "<td valign='top'><table><tr class='first'><td>Pilot</td><td></td><td><img src='http://static.pardus.at/img/std/factions/emprank13.png' title='Empire Reputation' style='vertical-align:middle'> Rep. <img src='http://static.pardus.at/img/std/factions/emprank13.png' title='Empire Reputation' style='vertical-align:middle'></td></tr>";
		temp = "<td valign='top'><table><tr class='first'><td>Pilot</td><td></td><td align='center'><img src='http://static.pardus.at/img/std/factions/emprank13.png' title='Empire Reputation' style='vertical-align:middle'></td></tr>";
		temp = temp + createPilotTable(emp_dsc_sorted,emp_avg,0,"Average: ");
		temp = temp + "</table></td>";
		GM_setValue(options[10],temp);
		
		//create table for uni reputation
		//temp = "<td valign='top'><table><tr class='first'><td>Pilot</td><td></td><td><img src='http://static.pardus.at/img/std/factions/unirank13.png' title='Union Reputation' style='vertical-align:middle'> Rep. <img src='http://static.pardus.at/img/std/factions/unirank13.png' title='Union Reputation' style='vertical-align:middle'></td></tr>";
		temp = "<td valign='top'><table><tr class='first'><td>Pilot</td><td></td><td align='center'><img src='http://static.pardus.at/img/std/factions/unirank13.png' title='Union Reputation' style='vertical-align:middle'></td></tr>";
		temp = temp + createPilotTable(uni_dsc_sorted,uni_avg,0,"Average: ");
		temp = temp + "</table></td>";
		GM_setValue(options[11],temp);
	}

	if (document.getElementsByName("option")[0].checked ) {
		statshtml = statshtml + GM_getValue(options[0]);
	}
	
	if (document.getElementsByName("option")[1].checked ) {
		statshtml = statshtml + GM_getValue(options[1]);
	}
	
	if (document.getElementsByName("option")[2].checked ) {
		statshtml = statshtml + GM_getValue(options[2]);
	}
	
	if (document.getElementsByName("option")[3].checked ) {
		statshtml = statshtml + GM_getValue(options[3]);
	}
	
	if (wanted_sector != "") {
		statshtml = statshtml + GM_getValue("detail_sector");
	}

	
	if (document.getElementsByName("option")[4].checked ) {
		statshtml = statshtml + GM_getValue(options[4]);
	}
	
	if (document.getElementsByName("option")[5].checked ) {
		statshtml = statshtml + GM_getValue(options[5]);
	}
	
	if (document.getElementsByName("option")[6].checked ) {
		statshtml = statshtml + GM_getValue(options[6]);
	}

	if (document.getElementsByName("option")[7].checked ) {
		statshtml = statshtml + GM_getValue(options[7]);
	}
			
	if (document.getElementsByName("option")[8].checked ) {
		statshtml = statshtml + GM_getValue(options[8]);
	}
	
	if (document.getElementsByName("option")[9].checked ) {
		statshtml = statshtml + GM_getValue(options[9]);
	}
	
	if (document.getElementsByName("option")[10].checked ) {
		statshtml = statshtml + GM_getValue(options[10]);
	}
	
	if (document.getElementsByName("option")[11].checked ) {
		statshtml = statshtml + GM_getValue(options[11]);
	}
	
	//close and add table to page

	statshtml = statshtml + "</tr></table></div>";
	statstable.innerHTML = statshtml;

	//check if first call
	var optionsDiv = document.getElementById("checkboxes");
	if (flag_initial) {
		flag_initial = false;

	} else {

		//some code to recreate to import the new statistics table

		var removeDiv = document.getElementById("statstable");
		var DivParent = removeDiv.parentNode;
		DivParent.removeChild(removeDiv);
	}
	//insert table
	optionsDiv.parentNode.insertBefore(statstable, optionsDiv.nextSibling);

}



function getSum(a) {

	var sum = 0;

	for (key in a) {
		sum = sum + a[key];
	}

	return sum;
}

function getAvg(a) {

	var avg = 0;
	var sum = 0;
	var i = 0;
	
	for (key in a) {
		sum = sum + a[key];
		i++;
	}

	
	avg = sum / i;
	
	return Math.round(avg);
}

function getMax(a) {

	var max = parseFloat("-99999");
	var maxkey = "";

	for (key in a) {
		if (parseFloat(a[key]) > max) {
			max = parseFloat(a[key]);
			maxkey = key;
		} 
	}

	return maxkey;
}



function createTable(a, flag_func) {

	//Create the table. Sum will be calculated automatically
	//flag_func: 1 for SUM, 2 for AVG
	var tableHTML = "";
	var i = 0;
	var j = getLength(a);
	var func = 0;
	var func_text;
	var key;

	if(flag_func == 1) {
		func = getSum(a);
		func_text = "";
	} else if(flag_func == 2) {
		func = getAvg(a);
		func_text = "Average: ";
	}
	
	for (i = 0; i < j; i++) {

		key = getMax(a);
		if ((flag_initial == false) && (i == 1)) {
			alert(key);
		}

		if (i % 2) {
			tableHTML = tableHTML + "<tr class='alternating'>";
		} else {
			tableHTML = tableHTML + "<tr>";
		} 

		if (a[key] != null) {
			tableHTML = tableHTML + "<td align='left'>" + key + "</td><td align='right'>" + addCommas(String(a[key])) + "</td></tr>";
		}
		a[key] = null;
	}
		
	tableHTML=tableHTML + "<tr class='first'><td align='center' colspan='2'>" + func_text + addCommas(String(func)) + "</td></tr>"
		
	return tableHTML;

}



function createPilotTable(a, aggr, flag_percent,aggr_text) {

	//Create the table. Aggregation result is provided.
	//Parameter:
	// a   ... Object array
	// aggr ... Integer (is shown in last line of table)
	// flag_percent ... 1 = percent column is added, 0 = not added
	// aggr_text ... Text what aggregation is used (is shown in last line of table)

	var tableHTML = "";
	var i = 0;
	var j = getLength(a);
	var key;
	var percent;
	var result;
	var regexp_rank = /.(<img.*factions.*>)/i;
	var regexp_comp = /(<img.*neurank\d[^\d].{44}|<img.*neurank\d\d.{47})/i;
	var regexp_pilot = /(<a.*a>)/i;
	var img_rank;
	var img_comp;
	var pilot;

	if (!aggr_text) {
		aggr_text = "";
	}

	for (i = 0; i < j; i++) {
		key = getMax(a);
		if (i % 2) {
			tableHTML = tableHTML + "<tr class='alternating'>";
		} else {
			tableHTML = tableHTML + "<tr>";
		} 

		//get html code for pilotlink
		result = regexp_pilot.exec(key);
		pilot = result[1];

		//get html code for rank symbol out of the key to put in own column

		if (regexp_rank.test(key)) {
			result = regexp_rank.exec(key);	
			img_rank = result[1] + "&#160;&#160;";
		} else {
			img_rank = "";
		}

		//get html code for rank symbol out of the key to put in own column

		result = regexp_comp.exec(key);	
		img_comp = result[1] + ">";

		if (a[key] != null) {
			if (flag_percent == 1) {
				percent = a[key]/aggr * 100;
				percent = percent.toFixed(2);
				tableHTML = tableHTML + "<td align='left'>" + img_rank + pilot + "</td><td>" + img_comp + "</td><td align='right'>" + addCommas(String(a[key])) + "</td><td>" + percent + "</td></tr>";
			} else {
				tableHTML = tableHTML + "<td align='left'>" + img_rank + pilot + "</td><td>" + img_comp + "</td><td align='right'>" + addCommas(String(a[key])) + "</td></tr>";
			}
		}

		a[key] = null;
	}

	if (flag_percent == 1) {
		tableHTML=tableHTML + "<tr class='first'><td align='center' colspan='4'>All members: " + addCommas(String(aggr)) + "</td></tr>"
	} else {
		tableHTML=tableHTML + "<tr class='first'><td align='center' colspan='3'>" + aggr_text + addCommas(String(aggr)) + "</td></tr>"
	}

	return tableHTML;

}



function getLength(a) {

	var i = 0;
	for (key in a) {
		i++;
	}
	return i;
}



//Anonymous Source. 

//http://chiragrdarji.blogspot.com/2007/05/thousand-separator-function-for-java.html (comment section)

function addCommas(sValue) {

var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');

while(sRegExp.test(sValue)) {

sValue = sValue.replace(sRegExp, '$1,$2');

}

return sValue;

}



function saveOptions() {

	var sOpt = "";

	for (var c = 0; c < options.length; c++) {
		if (document.getElementsByName("option")[c].checked == true) {
			sOpt = sOpt + "1";
		} else {
			sOpt = sOpt + "0";
		}
	}
	GM_setValue("PardusAMI_Options",sOpt);
}
