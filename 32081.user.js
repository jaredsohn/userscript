// ==UserScript==
// @name           Pardus Own Building Ticks
// @namespace      pardus.at
// @author         Satyap, modified by Jarius
// @version        1.1
// @description    Calculates the stuff required to bring your building's ticks remaining to 4 or better. Works on Overview -> Buildings. Makes capacity red if free space < 10% of total.
// @include        http://*.pardus.at/overview_buildings.php
// ==/UserScript==

//
//==Notes==

// Changelog
// 20070203: first release
// 20080327: fixed low commodity font issue
//                 added totals row

// --user options---------------------------------------------------

var minTicks=[10,15]; // comma-separated list of ticks

// --end user options-----------------------------------------------

var debug=true;

function log(msg) {
    if (debug) { debugArea.innerHTML += msg + '<br/>'; }
}

var debugArea=document.createElement('p');


function getComms(comms, cell) {
    // contains "image: number"
    var contents=cell.innerHTML.replace('<font color="red">', '').replace('</font>', '');
    var x = contents.substring( contents.lastIndexOf(':') + 1);
    x=parseInt(x);
    var img=cell.firstChild.src;
    var alt=cell.firstChild.getAttribute('alt');
    comms[alt]=[img, x];
}

function decomposeCommodities(cell) {
    // contains a table of commodities
    // 3 cols by x rows.
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

function calcDiffs(upkeeps, stocks, diff, totals, ticks) {
    for(var cm in upkeeps) {
        var onhand = stocks[cm][1];
        var pertick = upkeeps[cm][1];
        var d = (pertick * ticks) - onhand;
        if(d>0) {
            diff[cm]=[upkeeps[cm][0], d];
            if(totals[cm])
                totals[cm]=[upkeeps[cm][0], d + totals[cm][1]];
            else
                totals[cm]=[upkeeps[cm][0], d];
//            alert(totals[cm]);
        }
    }
}

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
        td2.appendChild(document.createTextNode(": " + diffs[cm][1]));
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
    if(rows.length > 2)
    {
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
        th.appendChild(document.createTextNode("" + ticks + "-tick needs") );
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
        if(rows.length > 2)
        {
            var th=document.createElement('th');
            th.appendChild(document.createTextNode("" + ticks + "-tick totals") );
            tr1.appendChild(th);
            addColumn(tr2, totals);
        }
    }
    if(rows.length > 2)
    {
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