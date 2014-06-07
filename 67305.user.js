// ==UserScript==
// @name			Pardus Building Ticks
// @namespace		pardus.at
// @author 			Satyap, updated/upgraded by Jarius, Tanika, Faziri and RatchetFreak
// @description 	Shows calculations concerning upkeep and ATP on your Buildings Overview with colors and percentages. 
// @include			http://*.pardus.at/overview_buildings.php
// ==/UserScript==

var minTicks=[10]; // comma-separated list of ticks you'd like to have calculated for you
var showATP = true;
var debug=false;

function log(msg) {
    if (debug) {
		debugArea.innerHTML += msg + '<br/>';
	}
}


var debugArea=document.createElement('p');

if (debug) {
    var table=document.getElementsByTagName('table');
    table[0].parentNode.insertBefore(debugArea,table[0]);
}

function replaceWithChat(comm){
	var inp = comm;
	comm = comm.replace(/Food/,":food:");
	comm = comm.replace(/Energy/,":energy:");
	comm = comm.replace(/Water/,":water:");
	comm = comm.replace(/Animal embryos/,":embryos:");
	comm = comm.replace(/Ore/,":ore:");
	comm = comm.replace(/Metal/,":metal:");
	comm = comm.replace(/Electronics/,":electronics:");
	comm = comm.replace(/Robots/,":robots:");
	comm = comm.replace(/Heavy plastics/,":plastics:");
	comm = comm.replace(/Hand weapons/,":weapons:");
	comm = comm.replace(/Medicines/,":med:");
	comm = comm.replace(/Nebula gas/,":gas:");
	comm = comm.replace(/Chemical supplies/,":chem:");
	comm = comm.replace(/Gem stones/,":gems:");
	comm = comm.replace(/Liquor/,":liquor:");
	comm = comm.replace(/Hydrogen fuel/,":fuel:");
	comm = comm.replace(/Exotic matter/,":ematter:");
	comm = comm.replace(/Optical components/,":optical:");
	comm = comm.replace(/Radioactive cells/,":radio:");
	comm = comm.replace(/Droid modules/,":droids:");
	comm = comm.replace(/Bio-waste/,":bio:");
	comm = comm.replace(/Nutrient clods/,":clods:");
	comm = comm.replace(/Battleweapon Parts/,":bweapons:");
	comm = comm.replace(/Drugs/,":drugs:");
	comm = comm.replace(/Slaves/,":slaves:");
	comm = comm.replace(/Blue Sapphire Jewels/,":jewels-fed:");
	comm = comm.replace(/Golden Beryl Jewels/,":jewel-uni:");
	comm = comm.replace(/Ruby Jewels/,":jewels-emp:");
	comm = comm.replace(/Cybernetic X-993 Parts/,":xparts:");
	comm = comm.replace(/X-993 Repair-Drone/,":drone:");
	comm = comm.replace(/Neural Stimulator/,":stimulator:");
	comm = comm.replace(/Leech baby/,":leech:");
	comm = comm.replace(/Package/,":package:");
	
	return comm;
}

function getComms(comms, cell) {
    // contains "image: number"
    var contents=cell.innerHTML.replace('<font color="red">', '').replace('</font>', '');
	if(contents.length<10)return;
    var x = contents.substring( contents.lastIndexOf(':') + 1);
    x=parseInt(x);
    var img=cell.firstChild.src;
    var alt=replaceWithChat(cell.firstChild.getAttribute('alt'));
	cell.firstChild.setAttribute('alt',alt);
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
			neededPercentageStr = "(" + diffs[cm][2] + "%)"; // defines how the percentages should be displayed, diffs[cm][2] is the percentage itself
			img.setAttribute('title', neededPercentageStr);
		}
		if (diffs[cm][2] <= 20) {
			td2.style.color = 'green'; // defines the colors the entire text (td2) should get upon reaching certain percentages
			}
		if (diffs[cm][2] > 50) {
			td2.style.color = 'orange';
			}
		if (diffs[cm][2] > 70) {
			td2.style.color = 'red';
			}
        td2.appendChild(document.createTextNode(": " + diffs[cm][1] /*+ " "+neededPercentageStr*/)); //displays the needed additional upkeep (diffs[cm][1]), followed by the text defined above
        tr.appendChild(td2);
        count--;
    }
    if(tr) {
        table.appendChild(tr);
    }
    td.appendChild(table);
    row.appendChild(td);
}

function checkCapacity(row,upkeeps, prods) {
    var capcell=row.cells[2];
    var cap=capcell.innerHTML;
    var intCap = cap.substring(  0, cap.indexOf('('));
    var intCapRemain = cap.substring(  cap.indexOf('(')+1, cap.indexOf(')'));
    intCap=parseInt(intCap);
    intCapRemain=parseInt(intCapRemain);
	var netto = 0;
	for(var cm in upkeeps){
		netto+=upkeeps[cm][1];
	}
	for(var cm in prods){
		netto-=prods[cm][1];
	}
    if(netto < 0 && intCapRemain/-netto<5) {
        capcell.style.color="red";
    }
}

function decomposeTable(tbl) {
    var rows=tbl.rows;
	var rowsLength = rows.length;
    if(rows.length > 2) {
        var tr1=document.createElement('tr');
        var td1=document.createElement('th');
        td1.setAttribute('colspan', '11');
		td1.setAttribute('style','background: url(&quot;http://localhost:8080/bg.gif&quot;) repeat scroll 0% 0% transparent; font-weight: bold;');
        tr1.appendChild(td1);
        var tr2=document.createElement('tr');
        var td2=document.createElement('td');
        td2.setAttribute('colspan', '11');
        tr2.appendChild(td2);
    }
    for(var idx=0;idx<minTicks.length;idx++) {
        var ticks = minTicks[idx];
        var th=document.createElement('th');
        th.appendChild(document.createTextNode("Needed for " + ticks + " ticks") ); // column title, ticks = minTick currently being used to calculate
        rows[0].appendChild(th);
        var totals = new Object;
        for(var i=1;i<rowsLength;i++) {
            diff=new Object;
            var upkeeps = decomposeCommodities(rows[i].cells[6]);
            var stocks = decomposeCommodities(rows[i].cells[8]);
			var prods = decomposeCommodities(rows[i].cells[7]);
			
			decomposeCommodities(rows[i].cells[9]);
			checkCapacity(rows[i],upkeeps, prods);
			calcDiffs(upkeeps, stocks, diff, totals, ticks);
            addColumn(rows[i], diff);
        }
        if(rowsLength > 2) {
            var th=document.createElement('th');
            th.appendChild(document.createTextNode("needed add. stock for " + ticks + " ticks") ); // lower column title
            tr1.appendChild(th);
            addColumn(tr2, totals);
        }
    }
    if(rowsLength > 2) {
        tbl.appendChild(tr1);
        tbl.appendChild(tr2);
    }
}

var lowLvlBuildings = ['Fuel Collector', 'Gas Collector', 'Space Farm', 'Energy Well', 'Asteroid Mine', 'Chemical Laboratory', 'Radiation Collector'];
var midLvlBuildings = ['Electronics Facility', 'Medical Laboratory', 'Brewery', 'Plastics Facility', 'Smelting Facility', 'Optics Research Center', 'Slave Camp', 'Recyclotron', 'Clod Generator'];
var highLvlBuildings = ['Nebula Plant', 'Droid Assembly Complex', 'Handweapons Factory', 'Robot Factory', 'Drug Station', 'Dark Dome', 'Leech Nursery', 'Battleweapons Factory', 'Alliance Command Station'];

var tables=document.getElementsByTagName('table');
for(var i=0;i<tables.length;i++) {
    var cn = tables[i].className;
    if(cn && cn=='messagestyle') {
        decomposeTable(tables[i]);
		if(showATP){
			var rows = tables[i].rows;
			for(idx=1;idx<rows.length&&rows[idx].cells[4];idx++){
				var row = rows[idx];
				var links = row.getElementsByTagName('a');
				
				for(i2=0;i2<links.length;i2++){
				
					if(links[i2].href.match('building_trade_settings.php?')){
						var building = links[i2].innerHTML;
					}
				}
				var base = NaN;
				if( lowLvlBuildings.indexOf(building)!=-1){  base = 0.002;}
				if( midLvlBuildings.indexOf(building)!=-1){  base = 0.003;}
				if(highLvlBuildings.indexOf(building)!=-1){  base = 0.004;}
				if(row.cells[4].getElementsByTagName('td').length){
					base += 0.0002*parseInt(row.cells[4].getElementsByTagName('td')[0].innerHTML);
					base = Math.round(base*10000)/10000;
					if(base>0){
						var t = row.cells[4].getElementsByTagName('table')[0]
						var r = t.insertRow(1);
						r.innerHTML = '<td>'+base+'&nbsp;ATP/tick</td>';
						
					}
				}else{
					base += 0.0002*parseInt(row.cells[4].innerHTML);
					base = Math.round(base*10000)/10000;
					if(base>0)
						row.cells[4].innerHTML = row.cells[4].innerHTML + '<br>'+base+'&nbsp;ATP/tick';
				}
				
			}
		}
	}
}
