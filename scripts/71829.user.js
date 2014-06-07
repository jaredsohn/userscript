// Madden 10 Team Stats
// version 3.0
// August 31st, 2009
// Copyright (c) 2009, Michael Jefferson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Madden 10 Team Stats
// @namespace     http://www.mjefferson.net/
// @description   team stats for madden 10 online franchise
// @include       http://*.easportsworld.com/*/madden/franchise/individualFranchise*
// @include       http://easportsworld.com/*/madden/franchise/individualFranchise*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require       http://tablesorter.com/jquery.tablesorter.min.js
// ==/UserScript==
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}
if(unsafeWindow.console) {
	//use firebug
   var GM_log = unsafeWindow.console.log;
}
var GM_Debug = 0;
var Table_Sort_Debug = 0;
if(!GM_Debug) {
	//turn off logging
   var GM_log = function(){};
}
/*
 Class to hold team stats.
 */
var TeamStats = function(teamid, name) {
	this.teamid = teamid;
	this.Name = name;
	
	//Offense Stats
	this.First_Ds = 0;
	this.First_Ds_per_G = 0;
	this.Games = 0;
	this.Total_Yds = 0;
	this.Total_Yds_per_G = 0;
	this.Total_Off = 0;
	this.Total_Off_per_G = 0;
	this.Pts = 0;
	this.Pts_per_G = 0;
	this.Time_of_Poss = 0;
	
	//Rushing Stats
	this.Rush_Yds_per_G = 0;
	this.Rush_Yds_per_A = 0;
	this.Rush_Atts = 0;
	this.Rush_Yds = 0;
	
	//Passing Stats
	this.Pass_Yds_per_G = 0;
	this.Pass_Yds_per_A = 0;
	this.Pass_Atts = 0;
	this.Pass_Yds = 0;
	this.Sacked = 0;
	
	//Turnover Stats
	this.Fumbles_Lost = 0;
	this.Ints_Thrown = 0;
	this.TOs = 0;
	this.TAs = 0;
	this.TO_Diff = 0;
	this.Fumbles_Rec = 0;
	this.Ints = 0;
	
	//Special Stats
	this.KR_Yds = 0;
	this.PR_Yds = 0;
	this.Penalties = 0;
	this.Penalty_Yds = 0;

	//Conversion Stats
	this.Third_D_Conv = 0;
	this.Third_D_Att = 0;
	this.Third_D_Perc = 0;
	this.Fourth_D_Conv = 0;
	this.Fourth_D_Att = 0;
	this.Fourth_D_Perc = 0;
	this.RZ_FGs = 0;
	this.RZ_TDs = 0;
	this.RZ_Att = 0;
	this.RZ_Perc = 0;
	this.Two_Pt_Conv = 0;
	this.Two_Pt_Att = 0;
	this.Two_Pt_Perc = 0;
	
	//defense stats
	this.Rush_Yds_All = 0;
	this.Rush_Yds_All_per_G = 0;
	this.Pass_Yds_All = 0;
	this.Pass_Yds_All_per_G = 0;
	this.Pts_All = 0;
	this.Pts_All_per_G = 0;
	this.Total_Off_All = 0;
	this.Total_Off_All_per_G = 0;
	this.Total_Yds_All = 0;
	this.Total_Yds_All_per_G = 0;
	this.Sacks = 0;
};
//Setup Player Arrays
var qbsStats = [
						"Name","Team_Name",
						"Games",
						"Comp",
						"Atts",
						"Comp_Perc",
						"Yds",
						"Yds_per_A",
						"Yds_per_G",
						"TDs",
						"Ints",
						"Rate"
							  ];
var QBs = {};		
var QBStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Games = 0;
	this.Atts = 0;
	this.Comp = 0;
	this.Comp_Perc = 0;
	this.TDs = 0;
	this.Yds = 0;
	this.Yds_per_A = 0;
	this.Yds_per_G = 0;
	this.Ints = 0;
	this.Rate = 0;
}
QBStats.prototype.calcRating = function() {
	r1=(this.Comp_Perc-30)*.05;
	if(r1<0) {
		r1=0;
	}
	if(r1>2.375) {
		r1=2.375;
	}
	
	r3=(parseFloat(this.Yds_per_A)-3)*.25;
	if(r3<0) {
		r3=0;
	}
	if(r3>2.375) {
		r3=2.375;
	}
	
	r2=calculatePercentage(this.TDs, this.Atts)*.2;
	if(r2<0) {
		r2=0;
	}
	if(r2>2.375) {
		r2=2.375;
	}
	
	r4=2.375-(calculatePercentage(this.Ints, this.Atts) *.25);
	if(r4<0) {
		r4=0;
	}
	if(r4>2.375) {
		r4=2.375;
	}

	r5=parseFloat(((r1+r2+r3+r4)/6) * 100).toFixed(2);
	this.Rate =  r5;
}
var rbsStats = [
						"Name","Team_Name",
						"Games",
						"Atts",
						"Yds",
						"Yds_per_A",
						"Yds_per_G",
						"Long",
						"TDs"
							  ];
var RBs = {};
var RBStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Games = 0;
	this.Atts = 0;
	this.Long = 0;
	this.TDs = 0;
	this.Yds = 0;
	this.Yds_per_A = 0;
	this.Yds_per_G = 0;
}
var wrsStats = [
						"Name","Team_Name",
						"Games",
						"Rec",
						"Yds",
						"Yds_per_R",
						"Yds_per_G",
						"Long",
						"TDs"
							  ];
var WRs = {};
var WRStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Games = 0;
	this.Rec = 0;
	this.TDs = 0;
	this.Yds = 0;
	this.Yds_per_R = 0;
	this.Yds_per_G = 0;
	this.Long = 0;
}
var dpsStats = [
						"Name","Team_Name",
						"Games",
						"Tackles",
						"Sacks",
						"Ints",
						"FF"
							  ];
var DPs = {};
var DPStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Games = 0;
	this.Tackles = 0;
	this.Sacks = 0;
	this.Ints = 0;
	this.FF = 0;
}
var krsStats = [
						"Name","Team_Name",
						"Games",
						"Atts",
						"Yds",
						"Yds_per_A",
						"Yds_per_G",
						"Long",
						"TDs"
							  ];
var KRs = {};
var KRStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Games = 0;
	this.Atts = 0;
	this.Long = 0;
	this.TDs = 0;
	this.Yds = 0;
	this.Yds_per_A = 0;
	this.Yds_per_G = 0;
}
var prsStats = [
						"Name","Team_Name",
						"Games",
						"Atts",
						"Yds",
						"Yds_per_A",
						"Yds_per_G",
						"Long",
						"TDs"
							  ];
var PRs = {};
var PRStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Games = 0;
	this.Atts = 0;
	this.Long = 0;
	this.TDs = 0;
	this.Yds = 0;
	this.Yds_per_A = 0;
	this.Yds_per_G = 0;
}
var ksStats = [
						"Name","Team_Name",
						"Games",
						"FGM",
						"FGA",
						"FG_Perc",
						"Long",
						"XPM",
						"XPA",
						"XP_Perc",
						"PTs"
							  ];
var Ks = {};
var KStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Games = 0;
	this.FGA = 0;
	this.FGM = 0;
	this.FG_Perc = 0;
	this.Long = 0;
	this.XPA = 0;
	this.XPM = 0;
	this.XP_Perc = 0;
	this.PTs = 0;
}

var psStats = [
						"Name","Team_Name",
						"Games",
						"Punts",
						"Yds",
						"Yds_per_P",
						"Long",
						"In_20"
							  ];
var Ps = {};
var PStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Games = 0;
	this.Punts = 0;
	this.Yds = 0;
	this.Yds_per_P = 0;
	this.Long = 0;
	this.In_20 = 0;
}

var olsStats = [
						"Name","Team_Name",
						"Games",
						"Pancakes",
						"Sacks_All"
							  ];
var OLs = {};
var OLStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Games = 0;
	this.Pancakes = 0;
	this.Sacks_All = 0;
}

var injStats = [
						"Name","Team_Name",
						"Position",
						"Injury_Type",
						"Injury_Length"
							  ];
var INJs = {};
var INJStats = function(athleteid, name, teamname) {
	this.athleteid = athleteid;
	this.Name = name;
	this.Team_Name = teamname;
	this.Position = "";
	this.Injury_Type = "";
	this.Injury_Length = 0;
}
  var INJURYMAN_LENGTH_VARIABLE_START = 24;
  var INJURYMAN_FIXEDWEEKRECOVERY = 20;
  var INJURYMAN_LENGTH_VARIABLE_END = 253;
  var INJURYMAN_LENGTH_OUTFORSEASON = 254;
  var INJURYMAN_LENGTH_CAREERENDING = 255;
  var INJURYMAN_LENGTH_INVALID = 256;
  
  var msgInjuriesData = [
    {id: 0, name: 'Bruised Ankle'},
    {id: 1, name: 'Mild Ankle Sprain'},
    {id: 2, name: 'Sprained Achilles'},
    {id: 3, name: 'High Ankle Sprain'},
    {id: 4, name: 'Broken Ankle'},
    {id: 5, name: 'Dislocated Ankle'},
    {id: 6, name: 'Complete Achilles Tendon Tear'},
    {id: 7, name: 'Bruised Forearm'},
    {id: 8, name: 'Strained Forearm'},
    {id: 9, name: 'Strained Bicep'},
    {id: 10, name:'Strained Tricep'},
    {id: 11, name:'Upper Arm Bruise'},
    {id: 12, name: 'Broken Forearm'},
    {id: 13, name: 'Torn Bicep'},
    {id: 14, name: 'Torn Tricep'},
    {id: 15, name: 'Upper Arm Fracture'},
    {id: 16, name: 'Back Spasms'},
    {id: 17, name: 'Low Back Strain'},
    {id: 18, name: 'Herniated Disk'},
    {id: 19, name: 'Fractured Vertebrae'},
    {id: 20, name: 'Bruised Elbow'},
    {id: 21, name: 'Swollen Elbow'},
    {id: 22, name: 'Sprained Elbow'},
    {id: 23, name: 'Dislocated Elbow'},
    {id: 24, name: 'Fractured Elbow'},
    {id: 25, name: 'Foot Contusion'},
    {id: 26, name: 'Sprained Foot'},
    {id: 27, name: 'Fractured Toe'},
    {id: 28, name: 'Turf Toe'},
    {id: 29, name: 'Fractured Foot'},
    {id: 30, name: 'Compound Stress Fracture'},
    {id: 31, name: 'Bruised Hand'},
    {id: 32, name: 'Broken Finger'},
    {id: 33, name: 'Dislocated Finger'},
    {id: 34, name: 'Broken Thumb'},
    {id: 35, name: 'Dislocated Thumb'},
    {id: 36, name: 'Dislocated Wrist'},
    {id: 37, name: 'Sprained Wrist'},
    {id: 38, name: 'Broken Hand'},
    {id: 39, name: 'Broken Wrist'},
    {id: 40, name: 'Pinched Nerve (neck)'},
    {id: 41, name: 'Broken Jaw'},
    {id: 42, name: 'Mild Concussion'},
    {id: 43, name: 'Severe Concussion'},
    {id: 44, name: 'Strained Hip'},
    {id: 45, name: 'Hip Pointer'},
    {id: 46, name: 'Broken Tailbone'},
    {id: 47, name: 'Dislocated Hip'},
    {id: 48, name: 'Fractured Hip'},
    {id: 49, name: 'Bruised Knee'},
    {id: 50, name: 'Prepatellar Bursitis (knee)'},
    {id: 51, name: 'Mild ACL Sprain'},
    {id: 52, name: 'Mild MCL Sprain'},
    {id: 53, name: 'Mild PCL Sprain'},
    {id: 54, name: 'Partial ACL Tear'},
    {id: 55, name: 'Meniscus Tear'},
    {id: 56, name: 'Dislocated Kneecap'},
    {id: 57, name: 'Partial MCL Tear'},
    {id: 58, name: 'Partial PCL Tear'},
    {id: 59, name: 'Strained Knee'},
    {id: 60, name: 'Complete ACL Tear'},
    {id: 61, name: 'Fractured Kneecap'},
    {id: 62, name: 'Complete MCL Tear'},
    {id: 63, name: 'Complete PCL Tear'},
    {id: 64, name: 'Calf Strain'},
    {id: 65, name: 'Leg Cramps'},
    {id: 66, name: 'Strained Hamstring'},
    {id: 67, name: 'Bruised Quad (leg)'},
    {id: 68, name: 'Quadricep Strain'},
    {id: 69, name: 'Partial Groin Tear'},
    {id: 70, name: 'Broken Fibula (leg)'},
    {id: 71, name: 'Torn Groin Muscle'},
    {id: 72, name: 'Torn Hamstring'},
    {id: 73, name: 'Torn Quadricep'},
    {id: 74, name: 'Broken Tibia (leg)'},
    {id: 75, name: 'Broken Femur (leg)'},
    {id: 76, name: ''},//TODO: Verify if this code has Description
    {id: 77, name: 'Abdominal Strain'},
    {id: 78, name: 'Bruised Ribs'},
    {id: 79, name: 'Bruised Sternum'},
    {id: 80, name: 'Pectoral Strain'},
    {id: 81, name: 'Dehydration'},
    {id: 82, name: 'Abdominal Tear'},
    {id: 83, name: 'Broken Ribs'},
    {id: 84, name: 'Broken Collarbone'},
    {id: 85, name: 'Torn Pectoral Muscle'},
    {id: 86, name: ''},//TODO: Verify if this code has Description
    {id: 87, name: 'Bruised Shoulder'},
    {id: 88, name: 'Shoulder Strain'},
    {id: 89, name: 'Dislocated Shoulder'},
    {id: 90, name: 'Torn Shoulder Labrum'},
    {id: 91, name: 'Fractured Shoulder Blade'},
    {id: 92, name: 'Torn Rotator Cuff (shoulder)'}
    ];
  
  var playerPositionStatic = [
    // 1 - Offensive             
    { code: "QB",   id: 0 , type: 1, statsType: 4, name: "Quarterback"},
    { code: "HB",   id: 1 , type: 1, statsType: 4, name: "Half Back"},
    { code: "FB",   id: 2 , type: 1, statsType: 4, name: "Full Back"},
    { code: "WR",   id: 3 , type: 1, statsType: 4, name: "Wide Receiver"},
    { code: "TE",   id: 4 , type: 1, statsType: 4, name: "Tight End"},
    { code: "LT",   id: 5 , type: 1, statsType: 4, name: "Left Tackle"},
    { code: "LG",   id: 6 , type: 1, statsType: 4, name: "Left Guard"},
    { code: "C",    id: 7 , type: 1, statsType: 4, name: "Center"},
    { code: "RG",   id: 8 , type: 1, statsType: 4, name: "Right Guard"},
    { code: "RT",   id: 9 , type: 1, statsType: 4, name: "Right Tackle"},
    // 2 - Defensive
    { code: "LE",   id: 10, type: 2, statsType: 0, name: "Left End"},
    { code: "RE",   id: 11, type: 2, statsType: 0, name: "Right End"},
    { code: "DT",   id: 12, type: 2, statsType: 0, name: "Defensive Tackle"},
    { code: "LOLB", id: 13, type: 2, statsType: 0, name: "Left Outside Linebacker"},
    { code: "MLB",  id: 14, type: 2, statsType: 0, name: "Middle Linebacker"},
    { code: "ROLB", id: 15, type: 2, statsType: 0, name: "Right Outside Linebacker"},
    { code: "CB",   id: 16, type: 2, statsType: 0, name: "Cornerback"},
    { code: "FS",   id: 17, type: 2, statsType: 0, name: "Free Safety"},
    { code: "SS",   id: 18, type: 2, statsType: 0, name: "Strong Safety"},
    // 3 - Special Team
    { code: "K",    id: 19, type: 3, statsType: 2, name: "Kicker"},
    { code: "P",    id: 20, type: 3, statsType: 2, name: "Punter"},
    { code: "KR",   id: 21, type: 3, statsType: 2, name: "Kick Returner"},
    { code: "PR",   id: 22, type: 3, statsType: 2, name: "Punt Returner"},
    { code: "KOS",  id: 23, type: 3, statsType: 2, name: "Kickoff Specialist"},
    { code: "LS",   id: 24, type: 3, statsType: 2, name: "Long Snapper"},
    { code: "TDRB", id: 25, type: 3, statsType: 2, name: "Third Down Runnning Back"}
  ];
  
  /**
   * Returns a string with the amount of time a player is out for due to
   * an injury
   * @param {Number} length - Length being returned by the BE.
   */
  var getDisplayInjuryLength = function(length) {
  	var displayLength = "";
	
  	if( length <= INJURYMAN_LENGTH_VARIABLE_END ) {
		displayLength = Math.floor(((length - INJURYMAN_LENGTH_VARIABLE_START)/ INJURYMAN_FIXEDWEEKRECOVERY) + 1);
		
		if( displayLength > 1) displayLength += " " + 'Wks';
		else displayLength +=  " " + 'Wk';
	}
	else if( length == INJURYMAN_LENGTH_OUTFORSEASON ){
		displayLength = " " + 'Season';
	}
	else if( length == INJURYMAN_LENGTH_CAREERENDING ) {
		displayLength = " " + 'Career';
	}
	return displayLength;
  }
function toTableHTML(nameArray, objectArray) {
	var tr = document.createElement('tr');
	//GM_log(objectArray);
	for(var i = 0; i < nameArray.length; i++) {
				var td = document.createElement('td');
				if(nameArray[i] == "Time_of_Poss") {
					td.appendChild(document.createTextNode(formatSeconds(objectArray[nameArray[i]])));
				} else if(nameArray[i].indexOf("_Perc") != -1) {
					td.appendChild(document.createTextNode(objectArray[nameArray[i]]+"%"));
				} else {
					td.appendChild(document.createTextNode(objectArray[nameArray[i]]));
				}
				tr.appendChild(td);
	}
	return tr;
}
/*
 Create the table headings.
 */
function toTableHTMLHeadings(nameArray) {
	var tr = document.createElement('tr');
	tr.className = " sortableHeader";

	for(var i = 0; i < nameArray.length; i++) {
				var th = document.createElement('th');
				if(nameArray[i] == "Name") {
					th.className = "name";
					var span = document.createElement('span');
					span.appendChild(document.createTextNode(getReplacedString(nameArray[i])));
					th.appendChild(span);
				} else {
					th.appendChild(document.createTextNode(getReplacedString(nameArray[i])));
				}
				tr.appendChild(th);
	}
	return tr;
}
/*
 Make the table headings nicer to read.
 */
function getReplacedString(toReplace) {
	return toReplace.replace("Perc", "%").replace("Two", "2").replace("Third", "3rd").replace("First", "1st").replace("Fourth", "4th").replace("_per_", "/").replace(/_/g, " ");
}
/*
 Create a empty stats table with the id and name given. use the array passed in.
 */
function createEmptyStatsTable(id, name, headingsArray) {
	var theTable = document.createElement('table');
	theTable.id = id;
	theTable.className=" standardTable teams ranking statsTableToHide";
	var div = document.createElement('div');
	div.className = "header";
	var h1 = document.createElement('h1');
	h1.appendChild(document.createTextNode(name));
	div.appendChild(h1);
	var thead = document.createElement('thead');
	thead.appendChild(toTableHTMLHeadings(headingsArray));
	theTable.appendChild(thead);
	var tbody = document.createElement('tbody');
	theTable.appendChild(tbody);
	div.appendChild(theTable);
	return div;
}
/*
 add stats to the table.
 */
function addStatsToTable(div, stats) {
		div.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].appendChild(stats);
}
/*
 Divide the two numbers keeping two decimal places.
 */
function divideNumbers(dividend, divisor, decimalPlaces) {
	return parseFloat(eval("("+dividend +"/"+divisor+".00000001)"), 10).toFixed(decimalPlaces);
}

function calculatePercentage(dividend, divisor) {
	return parseFloat(divideNumbers(dividend, divisor, 4)*100).toFixed(2);
}

//Setup arrays
var offenseStats = ["Name",
						"Games",
						"First_Ds",
						"First_Ds_per_G",
						"Total_Yds",
						"Total_Yds_per_G",
						"Total_Off",
						"Total_Off_per_G",
						"Pts",
						"Pts_per_G",
						"Time_of_Poss"
							  ];
var passingStats = ["Name",
						"Games",
						"Pass_Atts",
						"Pass_Yds",
						"Pass_Yds_per_A",
						"Pass_Yds_per_G",
						"Sacked"
							  ];
var rushingStats = ["Name",
						"Games",
						"Rush_Atts",
						"Rush_Yds",
						"Rush_Yds_per_A",
						"Rush_Yds_per_G"
							  ];
var turnoverStats = ["Name",
						"Fumbles_Lost",
						"Ints_Thrown",
						"TOs",
						"Fumbles_Rec",
						"Ints",
						"TAs",
						"TO_Diff"
						];
var specialStats = ["Name",
						"KR_Yds",
						"PR_Yds",
						"Penalties",
						"Penalty_Yds"
							  ];
var conversionStats = ["Name",
						"Third_D_Conv",
						"Third_D_Att",
						"Third_D_Perc",
						"Fourth_D_Conv",
						"Fourth_D_Att",
						"Fourth_D_Perc",
						"RZ_FGs",
						"RZ_TDs",
						"RZ_Att",
						"RZ_Perc",
						"Two_Pt_Conv",
						"Two_Pt_Att",
						"Two_Pt_Perc"
								 ];
var defenseStats = ["Name",
						"Games",
						"Rush_Yds_All",
						"Rush_Yds_All_per_G",
						"Pass_Yds_All",
						"Pass_Yds_All_per_G",
						"Total_Off_All",
						"Total_Off_All_per_G",
						"Total_Yds_All",
						"Total_Yds_All_per_G",
						"Pts_All",
						"Pts_All_per_G",
						"Sacks"
							  ];
					  
/*
 Create all the stats tables.
*/
function createStatsTable() {
	var div = document.createElement('div');
	div.className="content clearfix";

	var divo = createEmptyStatsTable("offtable", "Total Offensive Stats", offenseStats);
	var divp = createEmptyStatsTable("passtable", "Passing Stats", passingStats);
	var divr = createEmptyStatsTable("rushtable", "Rushing Stats", rushingStats);
	var divt = createEmptyStatsTable("turnovertable", "Turnover Stats", turnoverStats);
	var divs = createEmptyStatsTable("specialtable", "Special Teams/Misc Stats", specialStats);
	var divc = createEmptyStatsTable("convtable", "Conversion Stats", conversionStats);
	var divd = createEmptyStatsTable("deftable", "Defensive Stats", defenseStats);
	
	for(var teamsCount = 0; teamsCount < teamStatic.length; teamsCount++) {
		//Calculate per game/per attempt statistics
		teams[teamsCount].Pass_Yds_per_G = divideNumbers(teams[teamsCount].Pass_Yds, 
																	  teams[teamsCount].Games, 2);
		teams[teamsCount].Pass_Yds_per_A =  divideNumbers(teams[teamsCount].Pass_Yds,
																	  teams[teamsCount].Pass_Atts, 2);
		teams[teamsCount].Rush_Yds_per_G = divideNumbers(teams[teamsCount].Rush_Yds,
																	  teams[teamsCount].Games, 2);
		teams[teamsCount].Rush_Yds_per_A = divideNumbers(teams[teamsCount].Rush_Yds,
																	  teams[teamsCount].Rush_Atts, 2);
		teams[teamsCount].First_Ds_per_G = divideNumbers(teams[teamsCount].First_Ds,
																		teams[teamsCount].Games, 2);
		teams[teamsCount].Total_Yds_per_G = divideNumbers(teams[teamsCount].Total_Yds,
																		teams[teamsCount].Games, 2);
		teams[teamsCount].Total_Off_per_G = divideNumbers(teams[teamsCount].Total_Off,
																		teams[teamsCount].Games, 2);
		teams[teamsCount].Pts_per_G = divideNumbers(teams[teamsCount].Pts,
																teams[teamsCount].Games, 2);
		teams[teamsCount].Rush_Yds_All_per_G = divideNumbers(teams[teamsCount].Rush_Yds_All,
																		teams[teamsCount].Games, 2);
		teams[teamsCount].Pass_Yds_All_per_G = divideNumbers(teams[teamsCount].Pass_Yds_All,
																		teams[teamsCount].Games, 2);
		teams[teamsCount].Total_Off_All_per_G = divideNumbers(teams[teamsCount].Total_Off_All,
																		teams[teamsCount].Games, 2);
		teams[teamsCount].Total_Yds_All_per_G = divideNumbers(teams[teamsCount].Total_Yds_All,
																		teams[teamsCount].Games, 2);
		teams[teamsCount].Pts_All_per_G = divideNumbers(teams[teamsCount].Pts_All,
																teams[teamsCount].Games, 2);
		
		
		teams[teamsCount].Fourth_D_Perc =  calculatePercentage(teams[teamsCount].Fourth_D_Conv,
																teams[teamsCount].Fourth_D_Att);
		teams[teamsCount].RZ_Perc = calculatePercentage(
																teams[teamsCount].RZ_TDs,teams[teamsCount].RZ_Att);
		teams[teamsCount].Third_D_Perc = calculatePercentage(
																teams[teamsCount].Third_D_Conv,teams[teamsCount].Third_D_Att);
		teams[teamsCount].Two_Pt_Perc = calculatePercentage(
																teams[teamsCount].Two_Pt_Conv,teams[teamsCount].Two_Pt_Att);
					
		
		//Add row for team
		addStatsToTable(divo, toTableHTML(offenseStats, teams[teamsCount]));
		addStatsToTable(divp, toTableHTML(passingStats, teams[teamsCount]));
		addStatsToTable(divr, toTableHTML(rushingStats, teams[teamsCount]));
		addStatsToTable(divt, toTableHTML(turnoverStats, teams[teamsCount]));
		addStatsToTable(divs, toTableHTML(specialStats, teams[teamsCount]));
		addStatsToTable(divc, toTableHTML(conversionStats, teams[teamsCount]));
		addStatsToTable(divd, toTableHTML(defenseStats, teams[teamsCount]));
	}
	
	teams = [];
	
	//Players
	
	var divqbs = createEmptyStatsTable("qbtable", "QB Stats", qbsStats);
	for(var i in QBs) {
		QBs[i].Yds_per_G = divideNumbers(QBs[i].Yds,
																		QBs[i].Games, 2);
		QBs[i].Yds_per_A = divideNumbers(QBs[i].Yds,
																		QBs[i].Atts, 2);
		QBs[i].Comp_Perc = calculatePercentage(
																QBs[i].Comp,QBs[i].Atts);
		QBs[i].calcRating();
		addStatsToTable(divqbs, toTableHTML(qbsStats, QBs[i]));
	}
	QBs = {};
	var divrbs = createEmptyStatsTable("rbtable", "RB Stats", rbsStats);
	for(var i in RBs) {
		RBs[i].Yds_per_G = divideNumbers(RBs[i].Yds,
																		RBs[i].Games, 2);
		RBs[i].Yds_per_A = divideNumbers(RBs[i].Yds,
																		RBs[i].Atts, 2);
		addStatsToTable(divrbs, toTableHTML(rbsStats, RBs[i]));
	}
	RBs = {};
	var divwrs = createEmptyStatsTable("wrtable", "WR Stats", wrsStats);
	for(var i in WRs) {
		WRs[i].Yds_per_G = divideNumbers(WRs[i].Yds,
																		WRs[i].Games, 2);
		WRs[i].Yds_per_R = divideNumbers(WRs[i].Yds,
																		WRs[i].Rec, 2);
		addStatsToTable(divwrs, toTableHTML(wrsStats, WRs[i]));
	}
	WRs = {};
	var divdps = createEmptyStatsTable("dptable", "Defensive Player Stats", dpsStats);
	for(var i in DPs) {
		addStatsToTable(divdps, toTableHTML(dpsStats, DPs[i]));
	}
	DPs = {};
	
	var divkrs = createEmptyStatsTable("krtable", "KR Stats", krsStats);
	for(var i in KRs) {
		KRs[i].Yds_per_G = divideNumbers(KRs[i].Yds,
																		KRs[i].Games, 2);
		KRs[i].Yds_per_A = divideNumbers(KRs[i].Yds,
																		KRs[i].Atts, 2);
		addStatsToTable(divkrs, toTableHTML(krsStats, KRs[i]));
	}
	KRs = {};
	
	var divprs = createEmptyStatsTable("prtable", "PR Stats", prsStats);
	for(var i in PRs) {
		PRs[i].Yds_per_G = divideNumbers(PRs[i].Yds,
																		PRs[i].Games, 2);
		PRs[i].Yds_per_A = divideNumbers(PRs[i].Yds,
																		PRs[i].Atts, 2);
		addStatsToTable(divprs, toTableHTML(prsStats, PRs[i]));
	}
	PRs = {};
	
	var divks = createEmptyStatsTable("ktable", "K Stats", ksStats);
	for(var i in Ks) {
		Ks[i].FG_Perc = calculatePercentage(
																Ks[i].FGM,Ks[i].FGA);
		Ks[i].XP_Perc = calculatePercentage(
																Ks[i].XPM,Ks[i].XPA);
		addStatsToTable(divks, toTableHTML(ksStats, Ks[i]));
	}
	Ks = {};
	
	var divps = createEmptyStatsTable("ptable", "P Stats", psStats);
	for(var i in Ps) {
		Ps[i].Yds_per_P = divideNumbers(Ps[i].Yds,
																		Ps[i].Punts, 2);
		addStatsToTable(divps, toTableHTML(psStats, Ps[i]));
	}
	Ps = {};
	
	var divols = createEmptyStatsTable("oltable", "OL Stats", olsStats);
	for(var i in OLs) {
		addStatsToTable(divols, toTableHTML(olsStats, OLs[i]));
	}
	OLs = {};
	
	var divinjs = createEmptyStatsTable("injtable", "Injuries", injStats);
	for(var i in INJs) {
		addStatsToTable(divinjs, toTableHTML(injStats, INJs[i]));
	}
	INJs = {};
	
	div.appendChild(divo);
	div.appendChild(divp);
	div.appendChild(divr);
	div.appendChild(divd);
	div.appendChild(divs);
	div.appendChild(divt);
	div.appendChild(divc);
	
	
	div.appendChild(divqbs);
	div.appendChild(divrbs);
	div.appendChild(divwrs);
	div.appendChild(divdps);
	div.appendChild(divkrs);
	div.appendChild(divprs);
	div.appendChild(divks);
	div.appendChild(divps);
	div.appendChild(divols);
	div.appendChild(divinjs);
	return div;
}
/*
 team static from EA's javascript file that can't be accessed since it is inline.
 */
var teamStatic = [
	{id: 1, name: 'Chicago Bears', division: 'NCN'},
	{id: 2, name: 'Cincinnati Bengals', division: 'ACN'},
	{id: 3, name: 'Buffalo Bills', division: 'ACE'},
	{id: 4, name: 'Denver Broncos', division: 'ACW'},
	{id: 5, name: 'Cleveland Browns', division: 'ACN'},
	{id: 6, name: 'Tampa Bay Buccaneers', division: 'NCS'},
	{id: 7, name: 'Arizona Cardinals', division: 'NCW'},
	{id: 8, name: 'San Diego Chargers', division: 'ACW'},
	{id: 9, name: 'Kansas City Chiefs', division: 'ACW'},
	{id: 10, name: 'Indianapolis Colts', division: 'ACS'},
	{id: 11, name: 'Dallas Cowboys', division: 'NCE'},
	{id: 12, name: 'Miami Dolphins', division: 'ACE'},
	{id: 13, name: 'Philadelphia Eagles', division: 'NCE'},
	{id: 14, name: 'Atlanta Falcons', division: 'NCS'},
	{id: 15, name: 'San Francisco 49ers', division: 'NCW'},
	{id: 16, name: 'New York Giants', division: 'NCE'},
	{id: 17, name: 'Jacksonville Jaguars', division: 'ACS'},
	{id: 18, name: 'New York Jets', division: 'ACE'},
	{id: 19, name: 'Detroit Lions', division: 'NCN'},
	{id: 20, name: 'Green Bay Packers', division: 'NCN'},
	{id: 21, name: 'Carolina Panthers', division: 'NCS'},
	{id: 22, name: 'New England Patriots', division: 'ACE'},
	{id: 23, name: 'Oakland Raiders', division: 'ACW'},
	{id: 24, name: 'St. Louis Rams', division: 'NCW'},
	{id: 25, name: 'Baltimore Ravens', division: 'ACN'},
	{id: 26, name: 'Washington Redskins', division: 'NCE'},
	{id: 27, name: 'New Orleans Saints', division: 'NCS'},
	{id: 28, name: 'Seattle Seahawks', division: 'NCW'},
	{id: 29, name: 'Pittsburgh Steelers', division: 'ACN'},
	{id: 30, name: 'Tennessee Titans', division: 'ACS'},
	{id: 31, name: 'Minnesota Vikings', division: 'NCN'},
	{id: 32, name: 'Houston Texans', division: 'ACS'}
];
/*
 get a property from the url.
 */
function getURLProperty( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
/*
 Remove alphanumeric characters.
 */
function stripAlphaChars(pstrSource) { 
var m_strOut = new String(pstrSource); 
    m_strOut = m_strOut.replace(/[^0-9]/g, ''); 
    return m_strOut.substring(1); 
}
/*
 format the seconds, taken from Eas inline script.
 */
var formatSeconds = function(seconds) {
    var sec = (seconds % 60);
    var min = Math.floor(seconds / 60);
      
    return (min + ':' + ((sec < 10)?('0' + sec):sec));
};
/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm) {
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};
var teams = new Array(teamStatic.length);
for(var teamsCount = 0; teamsCount < teamStatic.length; teamsCount++) {
	teams[teamsCount] = new TeamStats(teamStatic[teamsCount].id, teamStatic[teamsCount].name);
}
var franchiseID = stripAlphaChars(getURLProperty('prefs'));

var containers = getElementsByClassName("container", "div", document.body);
var valueBeforeFranchise = "791A0001";

var currentWeek = 0;
var currentSeason = 0;
var currentFranchiseState = 0;

var teamStatsByGameCount = 0;
var athleteStatsByGameCount = 0;
var injByTeamCount = 0;
var gamesPerWeek = 16;
var gamesPerSeason = 266;
var gamesPerRegularSeason = 256;
var teamStatsResponseCount = 0;
var athleteStatsResponseCount = 0;
var noGameTeamStatsResponseCount = 0;
var noGameAthleteStatsResponseCount = 0;
var commish;
var baseURL;
var franchiseInfoURL;
var baseTeamStatsURL;
var baseAthleteStatsURL;
var baseGameBoxScoreByWeekURL;
var baseInjuryURL;
var gameIDEnd = 0;

if(containers.length > 0) {
	var td = containers[0].getElementsByTagName("td");
	if(td.length > 0) {
		commish = td[0].textContent.replace("Commissioner", "");
		var baseHandleURL = "http://www.easportsworld.com/p/madden/a/franchise/s/e/handles/"+commish+"/platforms/";
		var psURL = baseHandleURL+"PS3/large_avatar?EASW-Version=2.0";
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: psURL,
		    onload: determineSystem
		});
	}
} else {
	determineSystem();
}
function determineSystem(xhr) {
	if (xhr) {
		if (!xhr.responseText.match(/error/i)) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, "text/xml");
			var handle = doc.getElementsByTagName('handle');
			if(handle == commish) {
				GM_log("Commish is PS3 user, using PS3 string");
				valueBeforeFranchise = "791A0001";
			}
		}
	}
	baseURL = "http://www.easportsworld.com/p/madden/a/franchise/s/g/blaze/"+valueBeforeFranchise+"/franchise/";
	franchiseInfoURL = baseURL+"getFranchise?fid="+franchiseID;

	baseTeamStatsURL = baseURL+"getTeamStatsByGame?fid="+franchiseID+"&gid=";
	baseAthleteStatsURL = baseURL+"getAthleteStatsByGame?fid="+franchiseID+"&gid=";
	baseGameBoxScoreByWeekURL = baseURL+"getGameBoxScoresByWeek?fid="+franchiseID+"&wid=";
	baseInjuryURL = baseURL+"getInjuriesByTeam?fid="+franchiseID+"&tid=";
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: franchiseInfoURL,
	    onload: function(xhr) {

			GM_log("Start of processing");
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, "text/xml");
			var windowValue = doc.getElementsByTagName('currwindow');
			var seasonValue = doc.getElementsByTagName('currseason');
			var franchiseState = doc.getElementsByTagName('state');
			if(franchiseState.length < 1) {
				//not found
			} else {
				currentFranchiseState = parseInt(franchiseState.item(0).textContent, 10);
			}
			if(seasonValue.length < 1) {
				//not found
			} else {
				currentSeason = parseInt(seasonValue.item(0).textContent, 10);
			}
			if(!isValidState()) {
				alert("The franchise is currently in a state that has no stats (draft/setup/completed). If there are past stats available you can select them by season");
			} else {
				if(windowValue.length < 1) {
					alert("No stats are available because a week has not been played");
				} else {
					currentWeek = parseInt(windowValue.item(0).textContent, 10);
					if(currentWeek > 22) {
						currentWeek = 22;
					} else if(currentWeek < 0) {
						alert("No stats are available because a week has not been played");
					}
					for(; injByTeamCount <= teamStatic.length; injByTeamCount++) {
							GM_log("Callling injury for teamid : "+injByTeamCount);
							GM_xmlhttpRequest({
									'method':'GET',
									'url':baseInjuryURL+injByTeamCount,
									'onload':injuryProcessor
							});
					}

					GM_xmlhttpRequest({
							'method':'GET',
							'url':baseGameBoxScoreByWeekURL+currentWeek+"&sid="+currentSeason,
							'onload':retrieveAllStats
					});
				}
			}
			
	    }
	});
}
function isValidState() {
	if(currentSeason < 0 || currentFranchiseState < 4 || currentFranchiseState > 5) {
		return false;
	} else {
		return true;
	}
}

function retrieveAllStats(xhr) {
	if(xhr) {
			if (xhr.responseText.match(/error/i)) {
					GM_log('no game athlete');
					noGameAthleteStatsResponseCount++;
			} else {
				var parser = new DOMParser();
				var doc = parser.parseFromString(xhr.responseText, "text/xml");
				var gameBoxes = doc.getElementsByTagName('gameboxscore');
				var validGames = [];
				var gameIDStart = -1;
				$.each(gameBoxes,function() {
					var gameID = parseInt(this.getElementsByTagName('gameid')[0].textContent, 10);
					var gameState = parseInt(this.getElementsByTagName('gamestate')[0].textContent, 10);
					if(gameIDStart == -1) {
						gameIDStart = gameID;
					}
					if(gameIDStart > gameID) {
						gameIDStart = gameID;
					}
					if(gameID > gameIDEnd) {
						gameIDEnd = gameID;
					}
					if(gameState == 1) {
						validGames.push(gameID);
					}
				});
				for(var x = 0; x <= gameIDStart-1; x++) {
					validGames.push(x);
				}
				GM_log(validGames);
				gameIDEnd = validGames.length;
				if(gameIDEnd == 0) {
					alert("No stats are available because a week has not been played");
				} else {
					for(; athleteStatsByGameCount <= (validGames.length-1); athleteStatsByGameCount++) {
							GM_log("Callling for gamid : "+validGames[athleteStatsByGameCount]);
							GM_xmlhttpRequest({
									'method':'GET',
									'url':baseAthleteStatsURL+validGames[athleteStatsByGameCount],
									'onload':athleteStatsProcessor
							});
					}

					for(; teamStatsByGameCount <= (validGames.length-1); teamStatsByGameCount++) {
							GM_xmlhttpRequest({
									'method':'GET',
									'url':baseTeamStatsURL+validGames[teamStatsByGameCount],
									'onload':teamStatsProcessor
							});
					}
				}
			}
	}
}

function injuryProcessor(xhr) {
	if(xhr) {
			if (xhr.responseText.match(/error/i)) {
					GM_log('no injury');
			} else {
				var parser = new DOMParser();
				var doc = parser.parseFromString(xhr.responseText, "text/xml");
				var injuriesArray = doc.getElementsByTagName('athleteinjury');
				$.each(injuriesArray, function() {
					var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
					var INJStat;
					var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
					var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
					INJStat = new INJStats(athleteId, firstName+" "+lastName);
					INJStat.Injury_Type = msgInjuriesData[parseInt(this.getElementsByTagName('injurytype')[0].textContent, 10)].name;
					INJStat.Injury_Length = getDisplayInjuryLength(parseInt(this.getElementsByTagName('injurylength')[0].textContent, 10));
					INJStat.Position = playerPositionStatic[parseInt(this.getElementsByTagName('athleteposition')[0].textContent, 10)].code;
					
					var teamId = parseInt(this.getElementsByTagName('teamid')[0].textContent, 10) - 1;
					INJStat.Team_Name = teams[teamId].Name;
					INJs[athleteId] = INJStat;
				});
			}
	}
}

function athleteStatsProcessor(xhr) {
	if (xhr) {
			athleteStatsResponseCount++;
			if (xhr.responseText.match(/error/i)) {
					GM_log('no game athlete');
					noGameAthleteStatsResponseCount++;
			} else {
				var parser = new DOMParser();
				var doc = parser.parseFromString(xhr.responseText, "text/xml");
				var gameid = parseInt(doc.getElementsByTagName('gameid')[0].textContent, 10);
				GM_log("Athlete Stats, Game id = "+gameid);
				var teamsIds = doc.getElementsByTagName('teamid');
				var athleteStats1 = doc.getElementsByTagName('athletestatst1')[0];
				var athleteStats2 = doc.getElementsByTagName('athletestatst2')[0];
				var teamsArray = [athleteStats1, athleteStats2];
				for(var i = 0; i < 2; i++) {
					var teamId = parseInt(teamsIds.item(i).textContent, 10) - 1;
					var sacksArray = teamsArray[i].getElementsByTagName('sacks');
					var sacksTotal = 0;
					$.each(sacksArray,function() {
						sacksTotal += parseInt(this.textContent, 10);
					});
	    			teams[teamId].Sacks += sacksTotal;
	    			
					var rushAttArray = teamsArray[i].getElementsByTagName('rushing')[0].getElementsByTagName('attempts');
					var rushAttTotal = 0;
					$.each(rushAttArray,function() {
						rushAttTotal += parseInt(this.textContent, 10);
	    			});
	    			teams[teamId].Rush_Atts += rushAttTotal;
						
					var passAttArray = teamsArray[i].getElementsByTagName('passing')[0].getElementsByTagName('attempts');
					var passAttTotal = 0;
					$.each(passAttArray,function() {
	    				passAttTotal += parseInt(this.textContent, 10);
	    			});
	    			teams[teamId].Pass_Atts += passAttTotal;
					
					
					var qbsArray = teamsArray[i].getElementsByTagName('passingstats');
					$.each(qbsArray, function() {
						var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
						var QBStat;
						if(QBs[athleteId]) {
							QBStat = QBs[athleteId];
						} else {
							var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
							var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
							QBStat = new QBStats(athleteId, firstName+" "+lastName);
						}
						QBStat.Games++;
						QBStat.Atts += parseInt(this.getElementsByTagName('attempts')[0].textContent, 10);
						if(QBStat.Atts > 0) {
							QBStat.Comp += parseInt(this.getElementsByTagName('completes')[0].textContent, 10);
							QBStat.TDs += parseInt(this.getElementsByTagName('tds')[0].textContent, 10);
							QBStat.Yds += parseInt(this.getElementsByTagName('yards')[0].textContent, 10);
							QBStat.Ints += parseInt(this.getElementsByTagName('ints')[0].textContent, 10);
							QBStat.Team_Name = teams[teamId].Name;
							QBs[athleteId] = QBStat;
						}
					});
					
					
					var rbsArray = teamsArray[i].getElementsByTagName('rushingstats');
					$.each(rbsArray, function() {
						var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
						var RBStat;
						if(RBs[athleteId]) {
							RBStat = RBs[athleteId];
						} else {
							var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
							var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
							RBStat = new RBStats(athleteId, firstName+" "+lastName);
						}
						RBStat.Games++;
						RBStat.Atts += parseInt(this.getElementsByTagName('attempts')[0].textContent, 10);
						var currentLong = parseInt(this.getElementsByTagName('long')[0].textContent, 10);
						if(currentLong > RBStat.Long) {
							RBStat.Long = currentLong;
						}
						RBStat.TDs += parseInt(this.getElementsByTagName('tds')[0].textContent, 10);
						RBStat.Yds += parseInt(this.getElementsByTagName('yards')[0].textContent, 10);
						RBStat.Team_Name = teams[teamId].Name;
						RBs[athleteId] = RBStat;
					});
					
					var wrsArray = teamsArray[i].getElementsByTagName('receivingstats');
					$.each(wrsArray, function() {
						var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
						var WRStat;
						if(WRs[athleteId]) {
							WRStat = WRs[athleteId];
						} else {
							var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
							var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
							WRStat = new WRStats(athleteId, firstName+" "+lastName);
						}
						WRStat.Games++;
						WRStat.Rec += parseInt(this.getElementsByTagName('receptions')[0].textContent, 10);
						var currentLong = parseInt(this.getElementsByTagName('long')[0].textContent, 10);
						if(currentLong > WRStat.Long) {
							WRStat.Long = currentLong;
						}
						WRStat.TDs += parseInt(this.getElementsByTagName('tds')[0].textContent, 10);
						WRStat.Yds += parseInt(this.getElementsByTagName('yards')[0].textContent, 10);
						WRStat.Team_Name = teams[teamId].Name;
						WRs[athleteId] = WRStat;
					});
					
					var dpsArray = teamsArray[i].getElementsByTagName('defensestats');
					$.each(dpsArray, function() {
						var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
						var DPStat;
						if(DPs[athleteId]) {
							DPStat = DPs[athleteId];
						} else {
							var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
							var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
							DPStat = new DPStats(athleteId, firstName+" "+lastName);
						}
						DPStat.Games++;
						
						DPStat.Tackles += parseInt(this.getElementsByTagName('tackles')[0].textContent, 10);
						DPStat.Sacks += parseInt(this.getElementsByTagName('sacks')[0].textContent, 10);
						DPStat.Ints += parseInt(this.getElementsByTagName('ints')[0].textContent, 10);
						DPStat.FF += parseInt(this.getElementsByTagName('forcefumble')[0].textContent, 10);
						DPStat.Team_Name = teams[teamId].Name;
						DPs[athleteId] = DPStat;
					});
					
					var krsArray = teamsArray[i].getElementsByTagName('kickoffreturnstats');
					$.each(krsArray, function() {
						var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
						var KRStat;
						if(KRs[athleteId]) {
							KRStat = KRs[athleteId];
						} else {
							var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
							var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
							KRStat = new KRStats(athleteId, firstName+" "+lastName);
						}
						KRStat.Games++;
						var returns = parseInt(this.getElementsByTagName('returns')[0].textContent, 10);
						KRStat.Atts += returns;
						var currentLong = parseInt(this.getElementsByTagName('long')[0].textContent, 10);
						if(currentLong > KRStat.Long) {
							KRStat.Long = currentLong;
						}
						KRStat.TDs += parseInt(this.getElementsByTagName('tds')[0].textContent, 10);
						KRStat.Yds += (parseInt(this.getElementsByTagName('average')[0].textContent, 10) * returns);
						KRStat.Team_Name = teams[teamId].Name;
						KRs[athleteId] = KRStat;
					});
					
					var prsArray = teamsArray[i].getElementsByTagName('puntreturnstats');
					$.each(prsArray, function() {
						var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
						var PRStat;
						if(PRs[athleteId]) {
							PRStat = PRs[athleteId];
						} else {
							var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
							var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
							PRStat = new PRStats(athleteId, firstName+" "+lastName);
						}
						PRStat.Games++;
						var returns = parseInt(this.getElementsByTagName('returns')[0].textContent, 10);
						PRStat.Atts += returns;
						var currentLong = parseInt(this.getElementsByTagName('long')[0].textContent, 10);
						if(currentLong > PRStat.Long) {
							PRStat.Long = currentLong;
						}
						PRStat.TDs += parseInt(this.getElementsByTagName('tds')[0].textContent, 10);
						PRStat.Yds += (parseInt(this.getElementsByTagName('average')[0].textContent, 10) * returns);
						PRStat.Team_Name = teams[teamId].Name;
						PRs[athleteId] = PRStat;
					});
					
					var ksArray = teamsArray[i].getElementsByTagName('kickingstats');
					$.each(ksArray, function() {
						var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
						var KStat;
						if(Ks[athleteId]) {
							KStat = Ks[athleteId];
						} else {
							var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
							var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
							KStat = new KStats(athleteId, firstName+" "+lastName);
						}
						KStat.Games++;
						var fgatt = parseInt(this.getElementsByTagName('fgattempts')[0].textContent, 10);
						KStat.FGA += fgatt;
						var fgmade = parseInt(this.getElementsByTagName('fgmade')[0].textContent, 10);
						KStat.FGM += fgmade;
						var xpatt = parseInt(this.getElementsByTagName('xattempts')[0].textContent, 10);
						KStat.XPA += xpatt;
						var xpmade = parseInt(this.getElementsByTagName('xmade')[0].textContent, 10);
						KStat.XPM += xpmade;
						var points = parseInt(this.getElementsByTagName('points')[0].textContent, 10);
						KStat.PTs += points;
						var currentLong = parseInt(this.getElementsByTagName('long')[0].textContent, 10);
						if(currentLong > KStat.Long) {
							KStat.Long = currentLong;
						}
						KStat.Team_Name = teams[teamId].Name;
						Ks[athleteId] = KStat;
					});
					
					var psArray = teamsArray[i].getElementsByTagName('puntingstats');
					$.each(psArray, function() {
						var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
						var PStat;
						if(Ps[athleteId]) {
							PStat = Ps[athleteId];
						} else {
							var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
							var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
							PStat = new PStats(athleteId, firstName+" "+lastName);
						}
						PStat.Games++;
						var punts = parseInt(this.getElementsByTagName('punts')[0].textContent, 10);
						PStat.Punts += punts;
						var in20= parseInt(this.getElementsByTagName('puntsin20')[0].textContent, 10);
						PStat.In_20 += in20;
						var yards = parseInt(this.getElementsByTagName('average')[0].textContent, 10);
						yards = yards * punts;
						PStat.Yds += yards;
						var currentLong = parseInt(this.getElementsByTagName('long')[0].textContent, 10);
						if(currentLong > PStat.Long) {
							PStat.Long = currentLong;
						}
						PStat.Team_Name = teams[teamId].Name;
						Ps[athleteId] = PStat;
					});
					
					var olsArray = teamsArray[i].getElementsByTagName('blockingstats');
					$.each(olsArray, function() {
						var athleteId = this.getElementsByTagName('athleteid')[0].textContent;
						var OLStat;
						if(OLs[athleteId]) {
							OLStat = OLs[athleteId];
						} else {
							var firstName = this.getElementsByTagName('athletefirstname')[0].textContent;
							var lastName = this.getElementsByTagName('athletelastname')[0].textContent;
							OLStat = new OLStats(athleteId, firstName+" "+lastName);
						}
						OLStat.Games++;
						var pancakes = parseInt(this.getElementsByTagName('pancakes')[0].textContent, 10);
						OLStat.Pancakes += pancakes ;
						var sacksall = parseInt(this.getElementsByTagName('sacksallowed')[0].textContent, 10);
						OLStat.Sacks_All += sacksall;
						OLStat.Team_Name = teams[teamId].Name;
						OLs[athleteId] = OLStat;
					});
					
					//Defensive stats
					var j = (i+1) % 2;
					var sackedArray = teamsArray[j].getElementsByTagName('sacks');
					var sackedTotal = 0;
					$.each(sackedArray,function() {
	    				sackedTotal += parseInt(this.textContent, 10);
	    			});
	    			teams[teamId].Sacked += sackedTotal;
					
				}
			}
			if(athleteStatsResponseCount == gameIDEnd) {
				GM_log("done with athleteStats");
			}
  }
}

function teamStatsProcessor(xhr) {
	if (xhr) {
		teamStatsResponseCount++;
		if (xhr.responseText.match(/error/i)) {
				GM_log('no game team stats');
				noGameTeamStatsResponseCount++;
		} else {
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, "text/xml");

			var gameid = parseInt(doc.getElementsByTagName('gameid')[0].textContent, 10);
			GM_log("Team Stats, Game id = "+gameid);
			var teamsIds = doc.getElementsByTagName('teamid');
			var passingYardsFromData = doc.getElementsByTagName('passyards');
			var rushingYardsFromData = doc.getElementsByTagName('rushyards');
			var totalOffenseFromData = doc.getElementsByTagName('totaloffense');
			
			var fourthDownConversionAttFromData = doc.getElementsByTagName('fourthdownconvatt');
			var fourthDownConversionConvFromData = doc.getElementsByTagName('fourthdownconv');
			var fumblesLostFromData = doc.getElementsByTagName('fumbleslost');
			var kickReturnYardsFromData = doc.getElementsByTagName('kickreturnyards');
			var firstDownsFromData = doc.getElementsByTagName('firstdowns');
			var passIntsThrownFromData = doc.getElementsByTagName('passints');
			var puntReturnYardsFromData = doc.getElementsByTagName('puntreturnyards');
			var redZoneAttFromData = doc.getElementsByTagName('redzoneatt');
			var redZoneFgsFromData = doc.getElementsByTagName('redzonefgs');
			var redZoneTdsFromData = doc.getElementsByTagName('redzonetds');
			var totalPtsFromData = doc.getElementsByTagName('score');
			var thirdDownConversionAttFromData = doc.getElementsByTagName('thirddownconvatt');
			var thirdDownConversionConvFromData = doc.getElementsByTagName('thirddownconv');
			var twoPointConversionAttFromData = doc.getElementsByTagName('twopointconvatt');
			var twoPointConversionConvFromData = doc.getElementsByTagName('twopointconv');
			var timeOfPossesionFromData = doc.getElementsByTagName('timeofpossession');
			var totalYardsFromData = doc.getElementsByTagName('totalyards');
			var penaltyCountFromData = doc.getElementsByTagName('penaltycount');
			var penaltyYardsFromData = doc.getElementsByTagName('penaltyyards');
			for(var i = 0; i < 2; i++) {
				var teamId = parseInt(teamsIds.item(i).textContent, 10) - 1;
				teams[teamId].Games++;
				//Offense
				teams[teamId].First_Ds += parseInt(firstDownsFromData.item(i).textContent, 10);
				teams[teamId].Pts += parseInt(totalPtsFromData.item(i).textContent, 10);
				teams[teamId].Total_Off += parseInt(totalOffenseFromData.item(i).textContent, 10);
				teams[teamId].Time_of_Poss += parseInt(timeOfPossesionFromData.item(i).textContent, 10);
				teams[teamId].Total_Yds += parseInt(totalYardsFromData.item(i).textContent, 10);
				
				//Passing
				teams[teamId].Pass_Yds += parseInt(passingYardsFromData.item(i).textContent, 10);
				
				//Rushing
				teams[teamId].Rush_Yds += parseInt(rushingYardsFromData.item(i).textContent, 10);
				
				//Conversion
				teams[teamId].Fourth_D_Att += parseInt(fourthDownConversionAttFromData.item(i).textContent, 10);
				teams[teamId].Fourth_D_Conv += parseInt(fourthDownConversionConvFromData.item(i).textContent, 10);
				teams[teamId].RZ_Att += parseInt(redZoneAttFromData.item(i).textContent, 10);
				teams[teamId].RZ_FGs += parseInt(redZoneFgsFromData.item(i).textContent);
				teams[teamId].RZ_TDs += parseInt(redZoneTdsFromData.item(i).textContent, 10);
				teams[teamId].Third_D_Att += parseInt(thirdDownConversionAttFromData.item(i).textContent, 10);
				teams[teamId].Third_D_Conv += parseInt(thirdDownConversionConvFromData.item(i).textContent, 10);
				teams[teamId].Two_Pt_Att += parseInt(twoPointConversionAttFromData.item(i).textContent, 10);
				teams[teamId].Two_Pt_Conv += parseInt(twoPointConversionConvFromData.item(i).textContent, 10);
				
				//Turnovers
				teams[teamId].Fumbles_Lost +=  parseInt(fumblesLostFromData.item(i).textContent, 10);
				teams[teamId].Ints_Thrown += parseInt(passIntsThrownFromData.item(i).textContent, 10);
				
				//Special
				teams[teamId].KR_Yds += parseInt(kickReturnYardsFromData.item(i).textContent, 10);
				teams[teamId].Penalties += parseInt(penaltyCountFromData.item(i).textContent, 10);
				teams[teamId].Penalty_Yds += parseInt(penaltyYardsFromData.item(i).textContent, 10);
				teams[teamId].PR_Yds += parseInt(puntReturnYardsFromData.item(i).textContent, 10);
				
								
								
				//defense stats
				var j = (i+1) % 2;
				teams[teamId].Fumbles_Rec += parseInt(fumblesLostFromData.item(j).textContent, 10);
				teams[teamId].Ints += parseInt(passIntsThrownFromData.item(j).textContent, 10);
				teams[teamId].Rush_Yds_All += parseInt(rushingYardsFromData.item(j).textContent, 10);
				teams[teamId].Pass_Yds_All += parseInt(passingYardsFromData.item(j).textContent, 10);
				teams[teamId].Pts_All += parseInt(totalPtsFromData.item(j).textContent, 10);
				teams[teamId].Total_Off_All += parseInt(totalOffenseFromData.item(j).textContent, 10);
				teams[teamId].Total_Yds_All += parseInt(totalYardsFromData.item(j).textContent, 10);
				
				//Turnovers
				teams[teamId].TOs = teams[teamId].Fumbles_Lost + teams[teamId].Ints_Thrown;
				teams[teamId].TAs = teams[teamId].Fumbles_Rec + teams[teamId].Ints;
				teams[teamId].TO_Diff = teams[teamId].TAs - teams[teamId].TOs;
				
			}
		}
		if(teamStatsResponseCount == gameIDEnd) {
			GM_log("done with team stats");
			
			
			if(noGameTeamStatsResponseCount == teamStatsResponseCount) {
				alert("No stats to display");
			} else {
				var contents = getElementsByClassName("content", "div", document.body);
				if(contents == null || contents.length == 0) {
					alert("Couldn't find contents to insert stats, let dev know");
				} else {
					contents[0].parentNode.appendChild(createStatsTable());
				}
				$(document).ready(function()  {
			    GM_log("Setting up table sorting");
					$.tablesorter.defaults.cssAsc = "headerSortUp  sorting-column";
					$.tablesorter.defaults.cssDesc = "headerSortDown  sorting-column";
					$.tablesorter.defaults.sortList = [[0,0]];
					$.tablesorter.defaults.debug = Table_Sort_Debug;
					//var headerTimeOfPoss = parseInt(offenseStats.indexOf("Time_of_Poss"));
					$("#offtable").tablesorter({
						headers: {
							//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
							1: { 
								sorter: 'digit' 
							},
							2: { 
								sorter: 'digit' 
							},
							3: { 
								sorter: 'digit' 
							},
							4: { 
								sorter: 'digit' 
							},
							5: { 
								sorter: 'digit' 
							},
							6: { 
								sorter: 'digit' 
							},
							7: { 
								sorter: 'digit' 
							},
							8: { 
								sorter: 'digit' 
							},
							9: { 
								sorter: 'digit' 
							},
							10: { 
								sorter: 'digit' 
							}
						} 
					}); 
					$("#passtable").tablesorter({
						headers: {
							//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
							1: { 
								sorter: 'digit' 
							},
							2: { 
								sorter: 'digit' 
							},
							3: { 
								sorter: 'digit' 
							},
							4: { 
								sorter: 'digit' 
							},
							5: { 
								sorter: 'digit' 
							},
							6: { 
								sorter: 'digit' 
							}
						} 
					}); 
					$("#rushtable").tablesorter({
						headers: {
							//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
							1: { 
								sorter: 'digit' 
							},
							2: { 
								sorter: 'digit' 
							},
							3: { 
								sorter: 'digit' 
							},
							4: { 
								sorter: 'digit' 
							},
							5: { 
								sorter: 'digit' 
							}
						} 
					}); 
					$("#deftable").tablesorter({
						headers: {
							//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
							1: { 
								sorter: 'digit' 
							},
							2: { 
								sorter: 'digit' 
							},
							3: { 
								sorter: 'digit' 
							},
							4: { 
								sorter: 'digit' 
							},
							5: { 
								sorter: 'digit' 
							},
							6: { 
								sorter: 'digit' 
							},
							7: { 
								sorter: 'digit' 
							},
							8: { 
								sorter: 'digit' 
							},
							9: { 
								sorter: 'digit' 
							},
							10: { 
								sorter: 'digit' 
							},
							11: { 
								sorter: 'digit' 
							},
							12: { 
								sorter: 'digit' 
							}
						} 
					}); 
					$("#specialtable").tablesorter({
						headers: {
							//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
							1: { 
								sorter: 'digit' 
							},
							2: { 
								sorter: 'digit' 
							},
							3: { 
								sorter: 'digit' 
							},
							4: { 
								sorter: 'digit' 
							}
						} 
					}); 
					$("#turnovertable").tablesorter({
						headers: {
							//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
							1: { 
								sorter: 'digit' 
							},
							2: { 
								sorter: 'digit' 
							},
							3: { 
								sorter: 'digit' 
							},
							4: { 
								sorter: 'digit' 
							},
							5: { 
								sorter: 'digit' 
							},
							6: { 
								sorter: 'digit' 
							},
							7: { 
								sorter: 'digit' 
							}
						} 
					});
					$("#convtable").tablesorter({
						headers: {
							//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
							1: { 
								sorter: 'digit' 
							},
							2: { 
								sorter: 'digit' 
							},
							3: { 
								sorter: 'percent' 
							},
							4: { 
								sorter: 'digit' 
							},
							5: { 
								sorter: 'digit' 
							},
							6: { 
								sorter: 'percent' 
							},
							7: { 
								sorter: 'digit' 
							},
							8: { 
								sorter: 'digit' 
							},
							9: { 
								sorter: 'digit' 
							},
							10: { 
								sorter: 'percent' 
							},
							11: { 
								sorter: 'digit' 
							},
							12: { 
								sorter: 'digit' 
							},
							13: { 
								sorter: 'percent' 
							}
						} 
					});
				
					if(noGameAthleteStatsResponseCount== teamStatsResponseCount) {
						alert("No athlete stats to display");
					} else {
						//Player Stats
					
						$("#qbtable").tablesorter({
							headers: {
								//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
								2: { 
									sorter: 'digit' 
								},
								3: { 
									sorter: 'digit' 
								},
								4: { 
									sorter: 'digit' 
								},
								5: { 
									sorter: 'percent' 
								},
								6: { 
									sorter: 'digit' 
								},
								7: { 
									sorter: 'digit' 
								},
								8: { 
									sorter: 'digit' 
								},
								9: { 
									sorter: 'digit' 
								},
								10: { 
									sorter: 'digit' 
								},
								11: { 
									sorter: 'digit' 
								}
							} 
						});
						$("#rbtable").tablesorter({
							headers: {
								//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
								2: { 
									sorter: 'digit' 
								},
								3: { 
									sorter: 'digit' 
								},
								4: { 
									sorter: 'digit' 
								},
								5: { 
									sorter: 'digit' 
								},
								6: { 
									sorter: 'digit' 
								},
								7: { 
									sorter: 'digit' 
								},
								8: { 
									sorter: 'digit' 
								}
							} 
						});
						$("#wrtable").tablesorter({
							headers: {
								//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
								2: { 
									sorter: 'digit' 
								},
								3: { 
									sorter: 'digit' 
								},
								4: { 
									sorter: 'digit' 
								},
								5: { 
									sorter: 'digit' 
								},
								6: { 
									sorter: 'digit' 
								},
								7: { 
									sorter: 'digit' 
								},
								8: { 
									sorter: 'digit' 
								}
							} 
						});
						$("#dptable").tablesorter({
							headers: {
								//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
								2: { 
									sorter: 'digit' 
								},
								3: { 
									sorter: 'digit' 
								},
								4: { 
									sorter: 'digit' 
								},
								5: { 
									sorter: 'digit' 
								},
								6: { 
									sorter: 'digit' 
								}
							} 
						});
						$("#krtable").tablesorter({
							headers: {
								//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
								2: { 
									sorter: 'digit' 
								},
								3: { 
									sorter: 'digit' 
								},
								4: { 
									sorter: 'digit' 
								},
								5: { 
									sorter: 'digit' 
								},
								6: { 
									sorter: 'digit' 
								},
								7: { 
									sorter: 'digit' 
								},
								8: { 
									sorter: 'digit' 
								}
							} 
						});
						$("#prtable").tablesorter({
							headers: {
								//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
								2: { 
									sorter: 'digit' 
								},
								3: { 
									sorter: 'digit' 
								},
								4: { 
									sorter: 'digit' 
								},
								5: { 
									sorter: 'digit' 
								},
								6: { 
									sorter: 'digit' 
								},
								7: { 
									sorter: 'digit' 
								},
								8: { 
									sorter: 'digit' 
								}
							} 
						});
						$("#ktable").tablesorter({
							headers: {
								//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
								2: { 
									sorter: 'digit' 
								},
								3: { 
									sorter: 'digit' 
								},
								4: { 
									sorter: 'digit' 
								},
								5: { 
									sorter: 'percent' 
								},
								6: { 
									sorter: 'digit' 
								},
								7: { 
									sorter: 'digit' 
								},
								8: { 
									sorter: 'digit' 
								},
								9: { 
									sorter: 'percent' 
								},
								10: { 
									sorter: 'digit' 
								}
							} 
						});
						$("#ptable").tablesorter({
							headers: {
								//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
								2: { 
									sorter: 'digit' 
								},
								3: { 
									sorter: 'digit' 
								},
								4: { 
									sorter: 'digit' 
								},
								5: { 
									sorter: 'digit' 
								},
								6: { 
									sorter: 'digit' 
								},
								7: { 
									sorter: 'digit' 
								}
							} 
						});
						$("#oltable").tablesorter({
							headers: {
								//TODO: Make this not use a hard-coded # doesn't seem like i can just use the variable..
								2: { 
									sorter: 'digit' 
								},
								3: { 
									sorter: 'digit' 
								},
								4: { 
									sorter: 'digit' 
								}
							} 
						});
						$("#injtable").tablesorter({
						});
					}
			    GM_log("Hiding tables");
					$(".statsTableToHide").hide();
					$(".header").click(function () {
						$(this).children("table").toggle();
					});
				});
			}
		}
	}
}
