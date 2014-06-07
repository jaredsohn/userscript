// ==UserScript==
// @name			Pardus Building Ticks
// @namespace		pardus.at
// @author			Satyap, updated/upgraded by Jarius, Tanika and Faziri
// @description		Shows calculations concerning upkeep on your Buildings Overview with colors and percentages.
// @include			http*://*.pardus.at/overview_buildings.php
// ==/UserScript==

var minTicks=[10]; // comma-separated list of ticks you'd like to have calculated for you

var debug=true;

function log(msg) {
    if (debug) {
	debugArea.innerHTML += msg + '<br/>';
	}
}

var debugArea=document.createElement('p');

function getComms(comms, cell) {
    // contains "image: number"
    var contents=cell.innerHTML.replace('<font color="red">', '').replace('</font>', '');
    var x = contents.substring( contents.lastIndexOf(':') + 1);
    x=parseInt(x);
    var img=cell.firstChild.src;
    var alt=cell.firstChild.getAttribute('alt');
    comms[alt]=[img, x]; // img is the image's path, x is the present amount of the commodity
}

function decomposeCommodities(cell) {
    var comms=new Object;
    var children = cell.childNodes;
    for(var i=0;i<children.length;i++) {
        if(children[i].tagName=='TABLE') {
            var rows=children[i].rows;
            for(var r=0; r<rows.length; r++) {
                var cells=rows[r].cells;
                for(var c=0; c<cells.length; c++) {
                    getComms(comms, cells[c]);
                }
            }
        }
    }
    return comms;
}

// the function below calculates all the numbers needed. The commodities are calculated and displayed one-by-one,
// so each variable here refers to only one commodity at a time and is assigned to the next commodity in the list after being displayed!

function calcDiffs(upkeeps, stocks, diff, totals, ticks) {
    for(var cm in upkeeps) {
        var onhand = stocks[cm][1]; // present amount of the commodity
        var pertick = upkeeps[cm][1]; // amount of the commodity needed per tick
        var d = (pertick * ticks) - onhand; // needed amount of the commodity to get it to each minTick amount set at the top
		var maxUpkeep = (pertick * ticks);
		var multiplier = (100 / maxUpkeep);
		var upkeepPercentage = Math.round(multiplier * onhand);
		neededPercentage = (100 - upkeepPercentage);
        if(d>0) {
            diff[cm]=[upkeeps[cm][0], d, neededPercentage];
            if(totals[cm])
                totals[cm]=[upkeeps[cm][0], d + totals[cm][1]];
            else
                totals[cm]=[upkeeps[cm][0], d];
        }
    }
	return neededPercentage;
}

// this function creates the area where the text will be displayed

function addColumn(row, diffs) {
    var td=document.createElement('td');
    var table=document.createElement('table');
    var count=0;
    var  tr;
    for(var cm in diffs) {
        if(count==0) {
            if(tr) {
                table.appendChild(tr);
            }
            count=3;
            tr=document.createElement('tr');
        }
        var img=document.createElement('img');
        img.src = diffs[cm][0];
        img.setAttribute('alt', cm);
        var td2=document.createElement('td');
        td2.appendChild(img);
		var neededPercentageStr = "";
		if (diffs[cm][2] !== undefined) {
			neededPercentageStr = " (" + diffs[cm][2] + "%)"; // defines how the percentages should be displayed, diffs[cm][2] is the percentage itself
		}
		if (diffs[cm][2] < 30) {
			td2.style.color = 'green'; // defines the colors the entire text (td2) should get upon reaching certain percentages
			}
		if (diffs[cm][2] > 60) {
			td2.style.color = 'orange';
			}
		if (diffs[cm][2] > 80) {
			td2.style.color = 'red';
			}
        td2.appendChild(document.createTextNode(": " + diffs[cm][1] + neededPercentageStr)); //displays the needed additional upkeep (diffs[cm][1]), followed by the text defined above
        tr.appendChild(td2);
        count--;
    }
    if(tr) {
        table.appendChild(tr);
    }
    td.appendChild(table);
    row.appendChild(td);
}

function checkCapacity(row) {
    var capcell=row.cells[2];
    var cap=capcell.innerHTML;
    var intCap = cap.substring(  0, cap.indexOf('('));
    var intCapRemain = cap.substring(  cap.indexOf('(')+1, cap.indexOf(')'));
    intCap=parseInt(intCap);
    intCapRemain=parseInt(intCapRemain);
    if(intCap <= parseInt(intCapRemain / 10) ) {
        capcell.style.color="red";
    }
}

function decomposeTable(tbl) {
    var rows=tbl.rows;
    if(rows.length > 2) {
        var tr1=document.createElement('tr');
        var td1=document.createElement('td');
        td1.setAttribute('colspan', '11');
        tr1.appendChild(td1);
        var tr2=document.createElement('tr');
        var td2=document.createElement('td');
        td2.setAttribute('colspan', '11');
        tr2.appendChild(td2);
    }
    for(var idx=0;idx<minTicks.length;idx++) {
        var ticks = minTicks[idx];
        var th=document.createElement('th');
        th.appendChild(document.createTextNode("Needed additional stock for " + ticks + " ticks") ); // column title, ticks = minTick currently being used to calculate
        rows[0].appendChild(th);
        var totals = new Object;
        for(var i=1;i<rows.length;i++) {
            diff=new Object;
            checkCapacity(rows[i]);
            var upkeeps = decomposeCommodities(rows[i].cells[6]);
            var stocks = decomposeCommodities(rows[i].cells[8]);
			calcDiffs(upkeeps, stocks, diff, totals, ticks);
            addColumn(rows[i], diff);
        }
        if(rows.length > 2) {
            var th=document.createElement('th');
            th.appendChild(document.createTextNode("Total needed additional stock for " + ticks + " ticks") ); // lower column title
            tr1.appendChild(th);
            addColumn(tr2, totals);
        }
    }
    if(rows.length > 2) {
        tbl.appendChild(tr1);
        tbl.appendChild(tr2);
    }
}

var tables=document.getElementsByTagName('table');
for(var i=0;i<tables.length;i++) {
    var cn = tables[i].className;
    if(cn && cn=='messagestyle') {
        decomposeTable(tables[i]);
    }
}

if (debug) {
    var table=document.getElementsByTagName('table');
    table[0].parentNode.insertBefore(debugArea,table[0]);
}