
// ESPN 4 factors boxscore
// version 0.8.2
// 2010-02-07
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that adds team 4-factors stats
// to ESPN NBA boxscores
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ESPN4Factors", and click Uninstall.
//
//
// ==UserScript==
// @name          ESPN4Factors
// @description   Adds team 4-factors stats to ESPN NBA boxscores
// @include       http://*.espn.go.com/nba/boxscore?gameId=*
// @include       http://*.espn.go.com/nba/boxscore/_/id/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2007 cherokee_acb

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

	doc = window.document;

    var live = 0;

    // Read team names
  	var teamCells = doc.evaluate("//table[@class='linescore']//tr//td[@class='team']", doc.body, null,  
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var homeTeam = teamCells.snapshotItem(2).getElementsByTagName("a")[0].textContent;
	var awayTeam = teamCells.snapshotItem(1).getElementsByTagName("a")[0].textContent;
	
	// Get team stats
  	var colheads = doc.evaluate("//td[@colspan='2']", doc.body, null,  
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                    
    // First, the away team
	var fgcA = colheads.snapshotItem(0).nextSibling;
	if (fgcA.textContent.match(/FGM/)) {
		fgcA = colheads.snapshotItem(1).nextSibling;
        live = 1;
	}
	var fgmA = parseInt(fgcA.textContent.substring(0, fgcA.textContent.indexOf("-")));
	var fgaA = parseInt(fgcA.textContent.substring(fgcA.textContent.indexOf("-")+1));

	var p3cA = fgcA.nextSibling;
	var p3mA = parseInt(p3cA.textContent.substring(0, p3cA.textContent.indexOf("-")));
	var p3aA = parseInt(p3cA.textContent.substring(p3cA.textContent.indexOf("-")+1));

	var ftcA = p3cA.nextSibling;
	var ftmA = parseInt(ftcA.textContent.substring(0, ftcA.textContent.indexOf("-")));
	var ftaA = parseInt(ftcA.textContent.substring(ftcA.textContent.indexOf("-")+1));

	var orcA = ftcA.nextSibling;
	var drcA = orcA.nextSibling;
	var orA = parseInt(orcA.textContent);
	var drA = parseInt(drcA.textContent);
    if (live) {
        drA = drA-orA;
    }

    // Now the home team
	var fgcH = colheads.snapshotItem(2).nextSibling;
	if (live) {
		fgcH = colheads.snapshotItem(4).nextSibling;
	}
	var fgmH = parseInt(fgcH.textContent.substring(0, fgcH.textContent.indexOf("-")));
	var fgaH = parseInt(fgcH.textContent.substring(fgcH.textContent.indexOf("-")+1));

	var p3cH = fgcH.nextSibling;
	var p3mH = parseInt(p3cH.textContent.substring(0, p3cH.textContent.indexOf("-")));
	var p3aH = parseInt(p3cH.textContent.substring(p3cH.textContent.indexOf("-")+1));

	var ftcH = p3cH.nextSibling;
	var ftmH = parseInt(ftcH.textContent.substring(0, ftcH.textContent.indexOf("-")));
	var ftaH = parseInt(ftcH.textContent.substring(ftcH.textContent.indexOf("-")+1));

	var orcH = ftcH.nextSibling;
	var drcH = orcH.nextSibling;
	var orH = parseInt(orcH.textContent);
	var drH = parseInt(drcH.textContent);
    if (live) {
        drH = drH-orH;
    }

    // We use total team turnovers, instead of the sum of player turnovers in the boxscore
    var toCells = doc.evaluate("//td[@colspan='15']", doc.body, null, 
                                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
    if (live) {
          var toCells = doc.evaluate("//td[@colspan=14]", doc.body, null,
                                       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    var toRegEx = /Team TO \( points off \):\s+(\d+)/;
    var toHolderA = toCells.snapshotItem(1).textContent.match(toRegEx);
    var toHolderH = toCells.snapshotItem(3).textContent.match(toRegEx);

    var toA = parseInt(toHolderA[1]);
    var toH = parseInt(toHolderH[1]); 

	// Get minutes played
	var clock = doc.evaluate("//p[@class='game-state']", doc.body, null,  
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent;
	var min = 48;
    if (clock.match(/Final/)) {
    	if (clock.match(/OT/)) {
    		if (clock.charAt(10) == 'O' ) {
    			min = 53;
    		}
    		else {
    			min = 48 + 5*clock.charAt(10);
    		}
    	}
    }
    else if (clock.match(/Halftime/)) {
        min = 24;
    }
    else if (clock.match(/End of 1st/)) {
        min = 12;
    }
    else if (clock.match(/End of 3rd/)) {
        min = 36;
    }
    else {
        delimIndex = clock.indexOf(":");
        min = 11-parseInt(clock.substr(delimIndex-2, 2));
    	var secs = 60-parseInt(clock.substr(delimIndex+1, 2));
        var quarter = parseInt(clock.substr(delimIndex+6, 1));
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
    // Particularly good and bad stats are highlighted in green or red
    // I'm using percentiles P20 and P80 to set the thresholds
    var paceHigh = 96;  var paceLow = 86;
    var effHigh = 116;  var effLow = 96;
    var efgHigh = 55;   var efgLow = 45;
    var ftrHigh = 32;   var ftrLow = 18;
    var orpHigh = 34;   var orpLow = 20;
    var torHigh = 18;   var torLow = 12;
    var colorGood = '#C3FFC3';
    var colorBad = '#FFB6B6';
    
	var tdAux;	
	var bold;
	var cellWidth = '50px';

	var factors = doc.createElement("table");
	// factors.setAttribute('align','center');

	var header = doc.createElement("tr");
	header.setAttribute('align', 'center');
	tdAux = doc.createElement("td");
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    under = doc.createElement("u");
    if (min == 48) {
        under.textContent = "Pace";
        tdAux.setAttribute('width',cellWidth );
    }
    else {
        under.textContent = "Pace (Poss)";
        tdAux.setAttribute('width',2*cellWidth );
    }
    tdAux.appendChild(under);
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    under = doc.createElement("u");
    under.textContent = "Eff";
    tdAux.appendChild(under);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    under = doc.createElement("u");
    under.textContent = "eFG";
    tdAux.appendChild(under);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    under = doc.createElement("u");
    under.textContent = "FT/FG";
    tdAux.appendChild(under);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    under = doc.createElement("u");
    under.textContent = "OREB%";
    tdAux.appendChild(under);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);
	tdAux = doc.createElement("td");
    under = doc.createElement("u");
    under.textContent = "TOr";
    tdAux.appendChild(under);
	tdAux.setAttribute('width',cellWidth );
	header.appendChild(tdAux);


	var aRow = doc.createElement("tr");
	aRow.setAttribute('align', 'center');
	tdAux = doc.createElement("td");
	tdAux.setAttribute('align', 'left');
	tdAux.setAttribute('class','team');
	bold = doc.createElement("b");
	bold.textContent = awayTeam;
	tdAux.appendChild(bold);
	aRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
    if (min == 48) {
        tdAux.textContent = pace.toFixed(1);
    }
    else {
        tdAux.textContent = pace.toFixed(1) + " (" + poss + ")";
    }
    if (pace > paceHigh) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    } else if (pace < paceLow) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    }
	aRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = effA.toFixed(1);
    if (effA > effHigh) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    } else if (effA < effLow) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    }
	aRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = efgA.toFixed(1) + "%";
    if (efgA > efgHigh) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    } else if (efgA < efgLow) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    }
	aRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = ftrA.toFixed(1);
    if (ftrA > ftrHigh) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    } else if (ftrA < ftrLow) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    }
	aRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = orpA.toFixed(1);
    if (orpA > orpHigh) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    } else if (orpA < orpLow) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    }
	aRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = torA.toFixed(1);
    if (torA > torHigh) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    } else if (torA < torLow) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    }
	aRow.appendChild(tdAux);

    // Home team    
	var hRow = doc.createElement("tr");
	hRow.setAttribute('align', 'center');
	tdAux = doc.createElement("td");
	tdAux.setAttribute('align', 'left');
	bold = doc.createElement("b");
	bold.textContent = homeTeam;
	tdAux.appendChild(bold);
	hRow.appendChild(tdAux);
	tdAux = doc.createElement("td");
	// tdAux.textContent = pace.toFixed(1);
	hRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = effH.toFixed(1);
    if (effH > effHigh) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    } else if (effH < effLow) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    }
	hRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = efgH.toFixed(1) + "%";
    if (efgH > efgHigh) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    } else if (efgH < efgLow) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    }
	hRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = ftrH.toFixed(1);
    if (ftrH > ftrHigh) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    } else if (ftrH < ftrLow) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    }
	hRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = orpH.toFixed(1);
    if (orpH > orpHigh) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    } else if (orpH < orpLow) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    }
	hRow.appendChild(tdAux);
    
	tdAux = doc.createElement("td");
	tdAux.textContent = torH.toFixed(1);
    if (torH > torHigh) {
        tdAux.setAttribute('style', "background: " + colorBad + ";");
    } else if (torH < torLow) {
        tdAux.setAttribute('style', "background: " + colorGood + ";");
    }
	hRow.appendChild(tdAux);

	factors.appendChild(header);
	factors.appendChild(aRow);
	factors.appendChild(hRow);

    // We insert the 4 factors table into a <div> element, and this div just before the boxscore table
	var factorsDiv = doc.createElement("div");
    factorsDiv.setAttribute('align','center');
	factorsDiv.appendChild(factors);

  	var tabberNodes = doc.evaluate("//div[@class='gp-body']", doc.body, null,  
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var tabber = tabberNodes.snapshotItem(0);
    tabber.insertBefore(factorsDiv, tabber.firstChild);

//
// ChangeLog
// 2007-03-07 - 0.1 - First draft
// 2007-03-10 - 0.2 - Added support of live boxscores
// 2007-10-31 - 0.3 - Updated to 2007-08 format
// 2008-10-24 - 0.4 - Updated to 2008-09 preseason format & added good/bad stats highlighting
// 2008-11-01 - 0.5 - Fixed problem with live games in the new season
// 2009-01-10 - 0.6 - Updated to new ESPN format with a +/- column
// 2009-10-31 - 0.7 - Updated to 2009-10 format (fixes by philrl and Ben F. from the APBRmetrics board)
// 2010-02-07 - 0.8.2 - Updated to new 2010 format 



