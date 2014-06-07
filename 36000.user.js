// Yahoo 4 factors boxscore
// version 0.3 
// 2009-10-31
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that adds team 4-factors stats
// to Yahoho NBA boxscores
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Yahoo4Factors", and click Uninstall.
//
//
// ==UserScript==
// @name          Yahoo4Factors
// @description   Adds team 4-factors stats to Yahoo NBA boxscores
// @include       http://sports.yahoo.com/nba/boxscore*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2008 cherokee_acb (cherokee_acb@yahoo.es)

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

var mainDiv = document.getElementById('boxscore');
mainDiv.addEventListener('DOMNodeInserted', update4factors, false);
update4factors()

function update4factors() {
	doc = window.document;

    var live = 0;

    // Read team names
  	var teamCells = doc.evaluate("//td[@class='yspscores team']", doc.body, null,  
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var awayTeam = teamCells.snapshotItem(0).textContent;
	var homeTeam = teamCells.snapshotItem(1).textContent;
	
	// Get team stats
  	var totals = doc.evaluate("//tr[@class='ysptblclbg5']", doc.body, null,  
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                    
    // First, the away team
	var fgcA = totals.snapshotItem(2).cells[3];
	var fgmA = parseInt(fgcA.textContent.substring(0, fgcA.textContent.indexOf("-")));
	var fgaA = parseInt(fgcA.textContent.substring(fgcA.textContent.indexOf("-")+1));

	var p3cA = totals.snapshotItem(2).cells[4];
	var p3mA = parseInt(p3cA.textContent.substring(0, p3cA.textContent.indexOf("-")));
	var p3aA = parseInt(p3cA.textContent.substring(p3cA.textContent.indexOf("-")+1));

	var ftcA = totals.snapshotItem(2).cells[5];
	var ftmA = parseInt(ftcA.textContent.substring(0, ftcA.textContent.indexOf("-")));
	var ftaA = parseInt(ftcA.textContent.substring(ftcA.textContent.indexOf("-")+1));

	var orcA = totals.snapshotItem(2).cells[7];
    var trcA = totals.snapshotItem(2).cells[8];
	var orA = parseInt(orcA.textContent);
	var trA = parseInt(trcA.textContent);
    var drA = trA-orA;
    
    var toA = parseInt(totals.snapshotItem(2).cells[10].textContent);


    // Now the home team
	var fgcH = totals.snapshotItem(3).cells[3];
	var fgmH = parseInt(fgcH.textContent.substring(0, fgcH.textContent.indexOf("-")));
	var fgaH = parseInt(fgcH.textContent.substring(fgcH.textContent.indexOf("-")+1));

	var p3cH = totals.snapshotItem(3).cells[4];
	var p3mH = parseInt(p3cH.textContent.substring(0, p3cH.textContent.indexOf("-")));
	var p3aH = parseInt(p3cH.textContent.substring(p3cH.textContent.indexOf("-")+1));

	var ftcH = totals.snapshotItem(3).cells[5];
	var ftmH = parseInt(ftcH.textContent.substring(0, ftcH.textContent.indexOf("-")));
	var ftaH = parseInt(ftcH.textContent.substring(ftcH.textContent.indexOf("-")+1));

	var orcH = totals.snapshotItem(3).cells[7];
	var trcH = totals.snapshotItem(3).cells[8];
	var orH = parseInt(orcH.textContent);
	var trH = parseInt(trcH.textContent);
    var drH = trH-orH;

    var toH = parseInt(totals.snapshotItem(3).cells[10].textContent);
    

	// Get minutes played
	var yspscores = doc.evaluate("//span[@class='yspscores']", doc.body, null,  
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var clock = yspscores.snapshotItem(1);
    var quarter = yspscores.snapshotItem(3);
	var min = 48;
    if (clock.textContent.match(/Final/)) {
    	if (quarter.textContent.match(/OT/)) {
    		if (quarter.textContent.charAt(0) == 'O' ) {
    			min = 53;
    		}
    		else {
    			min = 48 + 5*quarter.textContent.charAt(0);
    		}
    	}
    }
    else if (clock.textContent.match(/Half/)) {
        min = 24;
    }
    else if (clock.textContent.match(/End/)) {
        min = 12 * clock.textContent.charAt(4);
    }
    else {
        delimIndex = clock.textContent.indexOf(":");
		if (delimIndex==0) {
		 min = 11;
		}
        else {
            min = 11-parseInt(clock.textContent.substr(0, delimIndex));
        }
    	var secs = 60-parseInt(clock.textContent.substr(delimIndex+1, 2));
        quarter = parseInt(quarter.textContent.substr(0, 1));
        min += secs/60 + 12*(quarter-1);
    }

    // For possessions, we use the Hollinger formula with a 0.976 correction factor.
    //  Then we average both team estimates, and round to the nearest integer
	var possA = fgaA + 0.44*ftaA - orA + toA;
	var possH = fgaH + 0.44*ftaH - orH + toH;
	var poss = 0.976*(possH + possA)/2;
	poss = poss.toFixed(0);
	var pace = 48*poss/min;

    // Now, we compute efficiency and the four factors
	var effA = 100*(2*fgmA + p3mA + ftmA)/poss;
	var efgA = 100*(fgmA + 0.5*p3mA)/fgaA;
	var ftrA = 100*ftmA/fgaA;
	var orpA = 100*orA/(orA+drH);
	var torA = 100*toA/poss;

	var effH = 100*(2*fgmH + p3mH + ftmH)/poss;
	var efgH = 100*(fgmH + 0.5*p3mH)/fgaH;
	var ftrH = 100*ftmH/fgaH;
	var orpH = 100*orH/(orH+drA);
	var torH = 100*toH/poss;

    // Finally, we create the table, rows and cells where data will be displayed.
    // Format is the same as in the per-quarter score table
	var tdAux;	
	var bold;
	var cellWidth = '40px';  
	var teamWidth = '100px';  

	var factors = doc.createElement("table");
	// factors.setAttribute('align','center');

	var header = doc.createElement("tr");
	header.setAttribute('align', 'center');
    header.setAttribute('bgcolor',"#DEDEC6");
    tdAux = doc.createElement("td");
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    bold = doc.createElement("b");
    if (min == 48) {
        bold.textContent = "Pace";
        tdAux.setAttribute('width',cellWidth );
    }
    else {
        bold.textContent = "Pace (Poss)";
        tdAux.setAttribute('width',2*cellWidth );
    }
    tdAux.appendChild(bold);
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    bold = doc.createElement("b");
    bold.textContent = "Eff";
    tdAux.appendChild(bold);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    bold = doc.createElement("b");
    bold.textContent = "eFG";
    tdAux.appendChild(bold);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    bold = doc.createElement("b");
    bold.textContent = "FT/FG";
    tdAux.appendChild(bold);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    bold = doc.createElement("b");
    bold.textContent = "OREB%";
    tdAux.appendChild(bold);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    bold = doc.createElement("b");
    bold.textContent = "TOr";
    tdAux.appendChild(bold);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);


	var aRow = doc.createElement("tr");
	aRow.setAttribute('align', 'center');
    aRow.setAttribute('class', 'ysptblclbg5');
	tdAux = doc.createElement("td");
	tdAux.setAttribute('align', 'left');
	tdAux.setAttribute('width', teamWidth);
	tdAux.setAttribute('class','yspscores team');
    tdAux.innerHTML = teamCells.snapshotItem(0).innerHTML;
	aRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
    if (min == 48) {
        tdAux.textContent = pace.toFixed(1);
    }
    else {
        tdAux.textContent = pace.toFixed(1) + " (" + poss + ")";
    }
	aRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = effA.toFixed(1);
	aRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = efgA.toFixed(1) + "%";
	aRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = ftrA.toFixed(1);
	aRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = orpA.toFixed(1);
	aRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = torA.toFixed(1);
	aRow.appendChild(tdAux);

	var hRow = doc.createElement("tr");
	hRow.setAttribute('align', 'center');
    hRow.setAttribute('class', 'ysptblclbg5');
	tdAux = doc.createElement("td");
	tdAux.setAttribute('align', 'left');
	tdAux.setAttribute('width', teamWidth);
	tdAux.setAttribute('class','yspscores team');
    tdAux.innerHTML = teamCells.snapshotItem(1).innerHTML;
	hRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	// tdAux.textContent = pace.toFixed(1);
	hRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = effH.toFixed(1);
	hRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = efgH.toFixed(1) + "%";
	hRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = ftrH.toFixed(1);
	hRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = orpH.toFixed(1);
	hRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	tdAux.textContent = torH.toFixed(1);
	hRow.appendChild(tdAux);

	factors.appendChild(header);
	factors.appendChild(aRow);
	factors.appendChild(hRow);

    // We insert the 4 factors table into a <table> element, and this div just above the boxscore table
	var factorsTable = doc.createElement("table");
    factorsTable.setAttribute('align','center');
	factorsTable.appendChild(factors);

  	var tables = doc.evaluate("//table", doc.body, null,  
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var boxscore = tables.snapshotItem(9);
    boxscore.parentNode.insertBefore(factorsTable, boxscore);

    // As an add-on, I insert a link to the ESPN PbP. Hopefully, it works for all games
    // First of all, I insert a separation hyphen. I don't know how to do it except by creating a <span> element
    var separation = doc.createElement("span");
    separation.textContent = " - ";
    var pbpLink = doc.createElement("a");
    var gameId = window.location.toString().substring(window.location.toString().indexOf("=")+1);
    var espnGameId = "2" + gameId.substr(3, 5) + "0" + gameId.substr(8,2);
    pbpLink.setAttribute("href", "http://scores.espn.go.com/nba/playbyplay?gameId=" + espnGameId);
    pbpLink.textContent = "ESPN PbP";
    var links = tables.snapshotItem(4).rows[0].cells[0];
    var newline = links.getElementsByTagName('br')[0];
    links.insertBefore(separation, newline);
    links.insertBefore(pbpLink, newline);

    //mainDiv.addEventListener('DOMNodeInserted', update4factors, false);
}    

//
// ChangeLog
// 2008-10-24 - 0.1 - First draft
// 2009-10-31 - 0.3 - Updated to 2009-10 format
