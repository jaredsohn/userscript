//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Base Uploader - Fleet Details
// @description   Fleet Overview. Shows Where The Credits Are Invested.
// @include       *.astroempires.com/*
// @exclude       *.astroempires.com/home.aspx*
// @exclude       *.astroempires.com/login.aspx*
// @exclude       forum.astroempires.com/*
// @exclude       support.astroempires.com/*
// @exclude       wiki.astroempires.com/*
// @exclude       wiki.astroempires.com/*/*
// @exclude       *.astroempires.com/upgrade.aspx*
// @exclude       *.astroempires.com/tables.aspx*
// @exclude       *.astroempires.com/register.aspx*
// @exclude       *.astroempires.com/smilies.aspx*
// ==/UserScript==


//================================================================
//====================START FLEET DETAILS=========================
//================================================================


unitCreditValue = {'Fighters':5,'Bombers':10,'Heavy Bombers':30,'Ion Bombers':60,'Corvette':20,'Recycler':30,'Destroyer':40
,'Frigate':80,'Ion Frigate':120,'Scout Ship':40,'Outpost Ship':100,'Cruiser':200,'Carrier':400,'Heavy Cruiser':500,'Battleship':2000
,'Fleet Carrier':2500,'Dreadnought':10000,'Titan':50000,'Leviathan':200000,'Death Star':500000};

//Fetching the rows
rows = document.evaluate("//table[@id='fleet_overview']//table[@class='layout listing']//tr",
document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
if(rows.snapshotLength==0)
	return;

fleetSizeTotal = 0;
unitTotalTDs = {};

//First loop, adding the credit totals of each row
//i=0 = TH, length = empty row;
for(i=1; i < rows.snapshotLength-2; i++)
{
	unitrow = rows.snapshotItem(i);
	unittype = unitrow.childNodes[0].childNodes[0].innerHTML;
	unitquantity = unitrow.childNodes[1].innerHTML.replace(/,/g,"").replace(/\./g,"");
	unitTotalTD = unitrow.childNodes[2];
	unitTotalTD.setAttribute("celltype", "credsize");
	unitSizeTotal = unitCreditValue[unittype] * unitquantity;
	unitTotalTD.innerHTML = unitCreditValue[unittype] * unitquantity;
	unitTotalTDs[i] = unitTotalTD;
	fleetSizeTotal  += unitSizeTotal;
}

//Second loop, adding the percentages using the credit totals of each row
for(i=1; i < rows.snapshotLength-2; i++)
{
	unitTotalTD=unitTotalTDs[i];
	perTD = document.createElement("td");
	perTD.setAttribute("celltype", "persize");

	perTD.innerHTML =  "("+Math.round(  unitTotalTD.innerHTML / fleetSizeTotal * 10000)/100+"%)";
	unitTotalTD.parentNode.appendChild(perTD);
}

//Total Row construction
totalRow = document.createElement("tr");
cell1 = document.createElement("td");
cell2 = document.createElement("td");
cell2.setAttribute("align","center");
cell2.innerHTML ="Size";
cell3 = document.createElement("td");
cell3.innerHTML = fleetSizeTotal;
totalRow.appendChild(cell1);
totalRow.appendChild(cell2);
totalRow.appendChild(cell3);
//Adding totalrow to the table
//rows.snapshotItem(0).parentNode.appendChild(totalRow);

//Credit Size header
credsizeLink = document.createElement("a");
credsizeLink.innerHTML = "Hide";
credsizeLink.setAttribute("id", "showHide-credsize");
credsizeLink.setAttribute("href", "javascript: void(0)");
credsizeLink.addEventListener('click',getShowHideColumnClosure("credsize"),true);

//Percentage Size header
persizeLink = document.createElement("a");
persizeLink.innerHTML = "Hide";
persizeLink.setAttribute("id", "showHide-persize");
persizeLink.setAttribute("href","javascript: void(0)");
persizeLink.addEventListener('click',getShowHideColumnClosure("persize"),true);
perTH= document.createElement("th");
perTH.appendChild(persizeLink);

//Add the headers
rows.snapshotItem(0).childNodes[2].appendChild(credsizeLink);
rows.snapshotItem(0).appendChild(perTH);


//Function to show/hide columns
function getShowHideColumnClosure(column) {
	function func(){
		var columnCells = document.evaluate("//td[@celltype='"+column+"']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < columnCells .snapshotLength; i++) {
			var row = columnCells .snapshotItem(i);
			row.style.display = (row.style.display=="none")? "":"none";
			row.style.visibility = (row.style.visibility=="hidden")? "":"hidden";
		}
		var link = document.getElementById("showHide-"+column);
		link.textContent= (link.textContent=="Show")? "Hide":"Show";
	};
  return func;
}


//================================================================
//=======================END FLEET DETAILS========================
//================================================================