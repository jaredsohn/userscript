// ==UserScript==
// @name          Minimally Rotten Tomatoes
// @author        Michael Felix - gm@mfelix.allmail.net
// @namespace     http://felixfamily.net
// @description   Modifies the "box office" screen of Rotten Tomatoes to weed out movies with less than a minimum number of theaters or less than a specified T-meter.
// @include       http://rottentomatoes.com/movies/box_office.php*
// @include       http://www.rottentomatoes.com/movies/box_office.php*
// ==/UserScript==

(function(){

// Configure your minimum values here:
var screensMin = 1000;
var tMeterMin = 50;

function removeRows(col, min){
    for (var t = 8; t < table.childNodes.length; t++){
        var tr = table.childNodes[t];
        if (!tr.innerHTML) continue;
        testAndRemoveRow(tr, col, min);
    }
}

function testAndRemoveRow(tr, col, min){
    var td = tr.getElementsByTagName('td')[col];
    if (!td || !td.innerHTML) return;
    var match = td.innerHTML.match(/\d+/);

    if (parseInt(match) < parseInt(min))
        tr.parentNode.removeChild(tr);
}

function findColumn(name, newText){
    var links = document.evaluate("//a[@class='table-header-link' and  contains(@href, 'sort=" + name + "')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (links.snapshotLength == 0) return;
    var link = links.snapshotItem(0);
    var td = link.parentNode;
    link.style.color = 'red';

    if (!td) return undefined;

    link = td.getElementsByTagName('a')[0];
    link.innerHTML = newText;

    headerRow = td.parentNode;
    var tds = headerRow.getElementsByTagName('td');
    for (var col = 0; col < tds.length; col++){
        if (tds[col] == td)
            return col;
    }

    return undefined;
}

function hideMovies(){
    screensColumn = findColumn('screens', '> ' + screensMin + ' theaters');
    tMeterColumn = findColumn('t_meter', '> ' + tMeterMin + ' T-meter');

    //get the right table/tbody
    table = headerRow;
    while (table && table.nodeName.toUpperCase() != 'TBODY'){
        table = table.parentNode;
    }

    if (screensColumn)
        removeRows(screensColumn, screensMin);

    if (tMeterColumn)
        removeRows(tMeterColumn, tMeterMin);
}

var screensColumn = 0;
var tMeterColumn = 0;
var table, headerRow;

hideMovies();

})();
