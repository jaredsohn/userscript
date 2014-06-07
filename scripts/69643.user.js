// ==UserScript==
// @name	PardusMemberSort
// @namespace	Pardus Sort Alliance Members
// @description Adds the possibility to sort the the Alliance Members page according to different values 
// @include	*.pardus.at/alliance_members.php*
// @version	1.1
// ==/UserScript==

var sorted = "Pilot";
var allyMemberTable;
var tabNumber;
var tab;
var tabSearch = 0;
var rowHTML;
var rowSort;
var rowSortSorted;
var rank;
var sortType;
var reps;
var sortDir = 0;
var i = 0;
var a;
var newHTML;

tabNumber = getMemberTableNumber();
newHTML = new Array(6);

newHTML[0] = "<div style=\"font-weight:bold\"> <div onclick=\"sortList(\'Comp\')\">Comp</div> <div onclick=\"sortList(\'Ship\')\">Ship</div> <div onclick=\"sortList(\'Pilot\')\">Pilot</div> <div onclick=\"sortList(\'Rank\')\">Rank</div> </div>";
newHTML[1] = "<div style=\"font-weight:bold\" onclick=\"sortList(\'Credits\')\">Credits</div>";
newHTML[2] = "<div style=\"font-weight:bold\" onclick=\"sortList(\'XP\')\">Experience</div>";
newHTML[3] = "<div style=\"text-align:right\">Reputation <div style=\"font-weight:bold\" onclick=\"sortList(\'fRep\')\">Federation</div> <div style=\"font-weight:bold\" onclick=\"sortList(\'eRep\')\">Empire</div> <div style=\"font-weight:bold\" onclick=\"sortList(\'uRep\')\">Union</div></div>";
newHTML[4] = "<div style=\"font-weight:bold\" onclick=\"sortList(\'freeSlots\')\">Buildings</div>";
newHTML[5] = "<div style=\"font-weight:bold\" onclick=\"sortList(\'Active\')\">Active</div>";

for(i=0;i < 6;i++) {
	document.getElementsByTagName("TABLE")[tabNumber].rows[0].cells[i].innerHTML= newHTML[i];
}

if(unsafeWindow)unsafeWindow.sortList = sortList;

function getMemberTableNumber() {
	for (i = 0; i < document.getElementsByTagName("TABLE").length;i++) {
		if(document.getElementsByTagName("TABLE")[i].rows[0].cells[0].textContent.replace(/Comp/,"").replace(/Ship/,"").replace(/Rank/,"").replace(/\ /g,"") == "Pilot") {
			return i;
		}
	}
}



function sortList(sortItem) {
	if(sorted == sortItem) { 
		if (sortDir == 0) {
			sortDir = 1;
		} else {
			sortDir = 0;
		}
	} else {
		sortDir = 0;
	}

	if (sortItem == "Comp" || sortItem == "Rank" || sortItem == "Credits" || sortItem == "XP" || sortItem == "fRep" || sortItem == "eRep" || sortItem == "uRep") {
		sortType = "Number" 
	} else {
		sortType = "Text";
	}
	sorted = sortItem;

	tabNumber = getMemberTableNumber();
	tab = document.getElementsByTagName("TABLE")[tabNumber];

	rowHTML = new Array(tab.rows.length -1);
	rowSort = new Array(tab.rows.length -1);
	rowSortSorted = new Array(tab.rows.length -1);

	for (i = 1; i < tab.rows.length; i++) {
		a = i -1;
		rowHTML[a] = tab.rows[i].innerHTML;
		switch (sortItem) {
			case "Comp":
				rowSort[a] = tab.rows[i].cells[0].getElementsByTagName("IMG")[1].alt.replace(/Competency\ /,"");
				break;
			case "Ship":
				rowSort[a] = tab.rows[i].cells[0].getElementsByTagName("IMG")[0].alt;
				break;
			case "Pilot":
				rowSort[a] = tab.rows[i].cells[0].getElementsByTagName("A")[0].textContent;
				break;
			case "Rank":
				rank = tab.rows[i].cells[0].getElementsByTagName("IMG")[2].alt;
				rowSort[a] = getRank(rank);
				break;
			case "Credits":
				rowSort[a] = tab.rows[i].cells[1].textContent.replace(/\,/g,"");
				break;
			case "XP":
				rowSort[a] = tab.rows[i].cells[2].textContent.replace(/\,/g,"");
				break;
			case "Active":
				rank = tab.rows[i].cells[5].textContent;
				rowSort[a] = getActivity(rank);
				break;
			case "fRep":
				rank = tab.rows[i].cells[3].textContent.replace(/\,/g,"");
			        rowSort[a] = getRep("f", rank);
				break;
			case "eRep":
				rank = tab.rows[i].cells[3].textContent.replace(/\,/g,"");
			        rowSort[a] = getRep("e", rank);
				break;
			case "uRep":
				rank = tab.rows[i].cells[3].textContent.replace(/\,/g,"");
			        rowSort[a] = getRep("u", rank);
				break;
			case "freeSlots":
				rowSort[a] = tab.rows[i].cells[2].textContent.replace(/\,/g,"").length-2 - tab.rows[i].cells[4].firstChild.rows[0].cells.length;
				break;
			case "Default":
				return;
				break;
		}	
		rowSortSorted[a] = rowSort[a];
	}

	if (sortType == "Number") {
		for(x=0;x<rowSortSorted.length;x++) {
			rowSortSorted[x] = parseInt(rowSortSorted[x]);
		}

		rowSortSorted.sort(sortNumbers);
	} else {
		rowSortSorted.sort();
	}

	if (sortDir == 1) {
		rowSortSorted.reverse();
	}

// Compare rowSortSorted with sowSortand change table

	for(i=0; i < rowSortSorted.length; i++) {
		for (j=0; j < rowSort.length; j++) {
			if(rowSortSorted[i] == rowSort[j]) {
				tab.rows[i+1].innerHTML = rowHTML[j];
				rowSort.splice(j,1);
				rowHTML.splice(j,1);
				break;
			}
		}
	}
	
}

function sortNumbers(a, b) {
	return a - b;
}

function getRep(faction, value) {
	reps = value.split(" ");
	if(faction=="f") value = reps[0];
	if(faction=="e") value = reps[2];
	if(faction=="u") value = reps[4];
	return value;
}


function getRank(rankName) {
	var rank;
	rankName = rankName.replace(/\ \(Union\)/,"").replace(/\ \(Federation\)/, "").replace(/\ \(Empire\)/, "").replace(/\ /g,"");
	switch (rankName) {
		case "Outsider": 
		case "Recruit": 
		case "Flunkey": 
			rank = 1;
			break;
		case "Serf": 
		case "Private": 
		case "Minion": 
			rank = 2;
			break;
		case "Master": 
		case "Mistress": 
		case "Corporal": 
		case "Acolyte": 
			rank = 3;
			break;
		case "Sir": 
		case "Dame": 
		case "Sergeant": 
		case "Bookie": 
			rank = 4;
			break;
		case "Squire": 
		case "Sgt-Major": 
		case "Collector": 
			rank = 5;
			break;
		case "Lord": 
		case "Lady": 
		case "Major": 
		case "Accountant": 
			rank = 6;
			break;
		case "Baron": 
		case "Baroness": 
		case "Colonel": 
		case "Cleaner": 
			rank = 7;
			break;
		case "Viscount": 
		case "Viscountess": 
		case "Lieutenant": 
		case "MadeMan": 
		case "MadeWoman": 
			rank = 8;
			break;
		case "Count": 
		case "Countess": 
		case "Lt.Commander": 
		case "Chief": 
			rank = 9;
			break;
		case "Earl": 
		case "Marchesa": 
		case "Captain": 
		case "Kingpin": 
			rank = 10;
			break;
		case "Marquis": 
		case "Marchioness": 
		case "Commodore": 
		case "Nephew": 
		case "Niece": 
			rank = 11;
			break;
		case "Duke":
		case "Duchess":
		case "RearAdmiral": 
		case "Son": 
		case "Daughter": 
			rank = 12;
			break;
		case "Prince":
		case "Princess":
		case "Admiral":
		case "Godfather": 
		case "Godmother": 
			rank = 13;
			break;
		case "King": 
		case "Queen": 
		case "FleetAdmiral": 
		case "Mogul": 
			rank = 14;
			break;
		default: rank =  999;
	}

	return rank;
}
		
function getActivity(activityLevel) {
	
	switch (activityLevel.replace(/ /g,"")) {
		case "within1week": 
			return 0;
			break;
		case ">1,<3weeks":
			return 1;
			break;
		case "notin3weeks": 
			return 2;
			break;
		case "deletedwithin3weeks": 
			return ;
			break;
		default: return 999;
	}
}



