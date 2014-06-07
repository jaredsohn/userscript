// Last.fm Album Chart
// version 0.1
// 2006-02-16
// Copyright (c) 2006, Steven Rollasom [2006-01-19]
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Last.fm Album Chart", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Last.fm Album Chart
// @description	 Displays Overall Album Chart as a list.
// @namespace    http://www.userscripts.org/scripts/show/3397
// @include      http://www.last.fm/user/*/charts/&charttype=overall&subtype=album  
// ==/UserScript==


//Regular Expression to strip XML declaration prior to new XML()
var xmlDeclaration = /^<\?xml version[^>]+?>/;

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function nameOverallAlbumChart(pos) {
    chart = xpath("//div[@class='lastChart']", document).snapshotItem(pos);
    chart.id = "overallalbumchart";
}

function doChart() {
    var rows;
    var i;
    var albumRow;
    var maxplays = 0;
    var barwidth = 0;
    var lastplays = 0;
    var realchartpos = 0;
    var chartpos = 0;
    
    
    var table = document.createElement("table");
    table.setAttribute("cellpadding","0");
    table.setAttribute("cellspacing","0");
    table.border = 0;
    table.width = "100%";
    
        
    rows = xpath("//div[@id='overallcharts']//div//div");
    for(i=0; i < rows.snapshotLength; i++) {
        row = rows.snapshotItem(i);
        albumtext = row.firstChild.nextSibling.title;
        playspos = albumtext.lastIndexOf("-");
        
        albumplays = albumtext.substring(playspos + 1,albumtext.length);
        albumplays = albumplays.replace(" Plays","");
        albumplays = albumplays.replace(" Play","");
        
        if (maxplays == 0)
        {
           maxplays = albumplays;
        }
        barwidth = Math.round(((albumplays / maxplays) * 100));
        if (barwidth < 12)
        {
           barwidth = 12;
        }
    
    	realchartpos = realchartpos + 1;
    	if (albumplays != lastplays)
    	{
    	   chartpos = realchartpos;
    	   lastplays = albumplays;
    	}
    
        albumtext = albumtext.substring(0,playspos - 1);
        
        albumurl = row.firstChild.nextSibling.href;
        
        albumRow = document.createElement("tr");
        albumCol1 = document.createElement("td");
        albumCol1.setAttribute("class","tdposition");
        rowHTML =  "<span class=\"position star\">" + chartpos + "</span>";
        albumCol1.innerHTML = rowHTML;
        albumRow.appendChild(albumCol1);
        
        albumCol2 = document.createElement("td");
        albumCol2.width = "45%";
        albumCol2.setAttribute("class","chartlabel");
        rowHTML = "<div><a title=\"" + albumtext + "\" href=\"" + albumurl + "\">" + albumtext + "</a></div>";
        albumCol2.innerHTML = rowHTML;
        albumRow.appendChild(albumCol2);
        
              
        albumCol3 = document.createElement("td");
	albumCol3.width = "55%";
	albumCol3.setAttribute("class","chartbar");
	rowHTML = "<div class=\"bar\" style=\"width:" + barwidth + "%;\"><span>" + albumplays + "</span></div>";
	albumCol3.innerHTML = rowHTML;
        albumRow.appendChild(albumCol3);
        
        table.appendChild(albumRow);
        
	row.parentNode.removeChild(row);
    }
    rows = xpath("//div[@id='overallcharts']//div");
    firstdiv = rows.snapshotItem(0);
    firstdiv.setAttribute("class","lastChart");
    firstdiv.insertBefore(table,firstdiv.childNodes[0]);
}

(function() {
// nameOverallAlbumChart(0);
doChart();
})();

