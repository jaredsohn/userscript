// ==UserScript==
// @name           Theta Atien's Ikariam Alliance Map
// @namespace      http://www.ohgeeks.com/ikariam/scripts/
// @description    Alliance Map.
// @include        http://*.ikariam.*/index.php?view=embassy*
// @include        http://*.ikariam.*/index.php?view=diplomacyAdvisorAlly*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// Please email Theta: Atien at wagner.234@gmail.com for problems or questions.

// To get rid of the annoying status and location bars from the popup window. Do the following:
// Type about:config
//
// Set the following to false:
// window.disable_window_open_feature.status
// window.disable_window_open_feature.location

// 0.1.1 Added different island colors depending on the number of towns on an island.
// 0.1.2 Added island mouse-overs to display a list of all towns and players on each island.
// 0.1.3 Changed the way the page is parsed so that the script works with Ikariam Alliance Sorter.
// 0.1.4 Added an options menu and the ability to toggle on a 4x4 grid.
// 0.1.5 Set a better font for town info mouse-overs. It should be easier to read now.
// 0.1.6 Added notice about online status being disabled. Having online status disabled will prevent the script
//       from being able to populate the map with islands and towns.
//
//       Enabled script to work with diplomacy advisor.
// 0.1.7 Added the ability to add enemy targets to the internal alliance page to add enemy towns to the map.
// The format is as follows:
// TARGET=team number,alliance name, player name, town name, x, y, island resource
// TARGET=9,F-UIN,atien,mytown,22,14,marble

var lversion   = "0.1.7";
var scale      = 8;
var xOffset    = -1;
var yOffset    = -1;
var mapWidth   = 800;
var mapHeight  = 800;
var islands    = new Object();

window.addEventListener('load',  function() {
    try {
        var page = document.getElementsByTagName('BODY')[0].id;

        if (page == 'embassy' || page == 'diplomacyAdvisorAlly') { addMapLink(); }
    } catch(er) {
        alert("Ikariam Map v"+lversion+"\n If you think this is a critical error, post it in the ikariamlibrary.com forums.\n\n\n" + er)
    }
}, true);

function addMapLink () {
   var mv = document.getElementById('mainview');

   if (mv != null) {
       var mapLink = document.createElement('A');
       mapLink.setAttribute('href', '#');
       mapLink.appendChild(document.createTextNode('[map]'));
       mapLink.style.marginLeft = '1em';
       mapLink.addEventListener('click', createMap, true);

       mv.getElementsByTagName('SPAN')[0].appendChild(mapLink);
   }
}

function getAllianceMembers () {
    var mlTbody = document.getElementById('memberList').tBodies[0];
    var members = new Array();

    if (mlTbody != null) {
        var alliance = getAllianceName();

        for ( var i = 1; i < mlTbody.rows.length; i++ ) {
            var member       = new Object();
            member._alliance = alliance;
            member._player   = mlTbody.rows[i].cells[1].innerHTML;
            member._towns    = getTowns(mlTbody.rows[i].cells[2]);
            member._points   = mlTbody.rows[i].cells[1].innerHTML;

            members.push(member);
        }
    }

    return members;
}

function getAllianceName () {
    var c = document.getElementById('mainview').getElementsByTagName('TABLE')[0].rows[0].cells[0];

    return (c != null) ? c.title : '';
}

function getTowns (tdNode) {
    var towns = new Array();

    if (tdNode != null ) {
        var anchors = tdNode.getElementsByTagName("A");

        for ( var i = 0; i < anchors.length; i++ ) {
            var town = new Object();

            if (/^\s*(.+)\s+\[(\d+)\:(\d+)\]\s*$/.test(anchors[i].innerHTML)) {
                town._name = RegExp.$1;
                town._x    = RegExp.$2;
                town._y    = RegExp.$3;

                towns.push(town);
            }
        }
    }

    return towns;
}

function createMap () {
    islands      = new Object();
    var members  = getAllianceMembers();
    var targets  = getTargets();
    var mapName  = 'map';
    var mapOpts  = 'width='+(mapWidth+40)+',height='+(mapHeight+65)+',status=no,toolbar=no,copyhistory=no,';
    mapOpts     += 'location=no,scrollbars=yes,menubar=no,directories=no';
    var mapRef   = window.open('', mapName, mapOpts);

    var mapHdr = (<r><![CDATA[
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
                "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
        <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Alliance Map</title>
        
    ]]></r>).toString();

    var mapCSS  = getMapCSS();
    var mapJS   = getMapJS();
    var mapHelp = getMapHelp();
    
    var mapOpts = (<r><![CDATA[
        <div id="options" class="options">
            <span style="position:relative; top:-3px;">O</span>
            <div class="optionsContent">
                <label FOR="gridcheck">
                    <input name="gridcheck" type="checkbox" id="gridcheck" onclick="toggleGrid(this);" />Grid 
                </label>
            </div>
        </div>
    ]]></r>).toString();
    
    mapRef.document.write(mapHdr);
    mapRef.document.write(mapCSS);
    mapRef.document.write(mapJS);

    mapRef.document.write('</head><body>');
    mapRef.document.write('<div><div id="map" style="width:'+mapWidth+'px; height:'+mapHeight+'px;" >');
    
    mapRef.document.write('<table id="grid" class="grid" style="display: none;" >');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
    mapRef.document.write('</table>');
    
    mapRef.document.write('<table id="hticks" class="hticks" style="display: none;" >');
    mapRef.document.write('<tr><td>10</td><td>20</td><td>30</td><td>40</td><td>50</td><td>60</td><td>70</td><td>80</td><td>90</td><td>100</td></tr>');
    mapRef.document.write('</table>');
    
    mapRef.document.write('<table id="vticks" class="vticks" style="display: none;" >');
    mapRef.document.write('<tr><td>10</td></tr>');
    mapRef.document.write('<tr><td>20</td></tr>');
    mapRef.document.write('<tr><td>30</td></tr>');
    mapRef.document.write('<tr><td>40</td></tr>');
    mapRef.document.write('<tr><td>50</td></tr>');
    mapRef.document.write('<tr><td>60</td></tr>');
    mapRef.document.write('<tr><td>70</td></tr>');
    mapRef.document.write('<tr><td>80</td></tr>');
    mapRef.document.write('<tr><td>90</td></tr>');
    mapRef.document.write('<tr><td>100</td></tr>');
    mapRef.document.write('</table>');
    
    mapRef.document.write(mapOpts);
    mapRef.document.write(mapHelp);
    
    var numTowns = 0;
    
    for (var i = 0; i < members.length; i++) {
        numTowns += addPlayer(mapRef, members[i]);
    }
    
    for (var i = 0; i < targets.length; i++) {
        numTowns += addPlayer(mapRef, targets[i]);
    }
    
    if (numTowns == 0) {
        mapRef.document.write('<div class="mapError">You do not have online status enabled. Please contact your alliance home secretary for help.</div>');
    }
    
    mapRef.document.write('<div class="mapContact"><a target="_blank" href="http://www.ohgeeks.com/ikariam/scripts/">- Theta Atien\'s Ikariam Tools -</a></div>');
    
    mapRef.document.write('</div></div>');
    mapRef.document.write('</body></html>');
    mapRef.document.close();
    
    for (var iLoc in islands) {
        if (islands.hasOwnProperty(iLoc)) {
            var island = islands[iLoc];
            var tNum   = island._towns.length;
            var iNode  = mapRef.document.getElementById(iLoc);
           
            if (iNode != null) {
                if (tNum < 5) {
                    iNode.style.backgroundColor = '#c1ffc1';
                } else if (tNum < 9) {
                    iNode.style.backgroundColor = '#7fff00';
                } else if (tNum < 13) {
                    iNode.style.backgroundColor = '#32cd32';
                } else {
                    iNode.style.backgroundColor = '#228b22';
                }
                
                var pMax  = 7;
                var aMax  = 9;
                var nMax  = 5;
                var pInfo = '';
                
                for (var i = 0; i < island._towns.length; i++) {
                    var p = island._towns[i]._player;
                    var n = island._towns[i]._name;
                    var a = island._towns[i]._alliance;
                    var s = island._towns[i]._status;
                    
                    var pStyle = '';
                    
                    if (s != null && s == 'enemy') {
                        pStyle = 'color:white;background-color:red;';
                    }
                    
                    pInfo += '<tr><td style="'+pStyle+'" >'+a+'</td><td>'+p+'</td><td>'+n+'</td></tr>';
                    
                    if (n.length > nMax) { nMax = n.length; }
                    if (p.length > pMax) { pMax = p.length; }
                    if (a.length > aMax) { aMax = a.length; }
                }
                
                var mWidth  = (aMax+pMax+nMax)*8.9+5;
                var mHeight = island._towns.length*20+40;
                
                var iLeft   = (island._l > mapWidth/2)        ? -mWidth  : 5;
                var iTop    = (island._t > mapHeight-mHeight) ? -mHeight : 5;

                var iInfo   = '<table class="infoContent" style="left:'+iLeft+'px; top:'+iTop+'px;" >';
                iInfo      += '<tr><th colspan="3" style="font-size:larger;">'+island._x+':'+island._y+'</th></tr>';
                iInfo      += '<tr><th>Alliance</th><th>Player</th><th>Town</th></tr>';
                iInfo      += pInfo;
                iInfo      += '</table>';
                
                iNode.innerHTML = iInfo;
            }
        }
    }
}

function addPlayer (mapRef, player) {
    for (var i = 0; i < player._towns.length; i++) {
        var town       = new Object();
        town._player   = player._player;
        town._status   = player._status;
        town._alliance = player._alliance;
        town._name     = player._towns[i]._name;
        town._x        = player._towns[i]._x;
        town._y        = player._towns[i]._y;
        
        addTown(mapRef, town);
    }
    
    return player._towns.length;
}

function addTown (mapRef, town) {
    var l  = ((parseInt(town._x, 10)+xOffset)*scale);
    var t  = ((parseInt(town._y, 10)+yOffset)*scale);
    var id = 't-'+town._x+'-'+town._y;

    if (!islands.hasOwnProperty(id)) {
        mapRef.document.write('<div class="island" id="'+id+'" style="left:'+l+'px; top:'+t+'px;" > </div>');
        islands[id]        = new Object();
        islands[id]._towns = new Array();
        islands[id]._x     = town._x;
        islands[id]._y     = town._y;
        islands[id]._l     = l;
        islands[id]._t     = t;
    }

    islands[id]._towns.push(town);
}

function getTargets () {
    var ip      = document.getElementById('internalPage');
    var targets = new Array();
    var tarObj  = new Object();

    if (ip != null) {
        var ipContent = ip.childNodes;

        for (var i = 0; i < ipContent.length; i++) {
            if (ipContent[i].nodeType == 1 && ipContent[i].className == 'content') {
                var content = ipContent[i].getElementsByTagName("P");
                
                if (content.length > 0) {
                    var lines = content[0].innerHTML.split("\n");
                    
                    for (var j = 0; j < lines.length; j++) {
                        if (/\s*TARGET\s*\=\s*(.+?)(\s*\<br\>\s*)?$/.test(lines[j])) {
                            var targetLine = RegExp.$1;
                            var delimeter  = new RegExp("\s*\,\s*");
                            var fields     = targetLine.split(delimeter);
                            
                            var town       = new Object();
                            var player     = fields[2];
                            
                            if (!tarObj.hasOwnProperty(player)) {
                                tarObj[player]           = new Object();
                                tarObj[player]._towns    = new Array();
                                tarObj[player]._team     = fields[0];
                                tarObj[player]._alliance = fields[1];
                                tarObj[player]._player   = fields[2];
                                tarObj[player]._status   = 'enemy';
                            }
                            
                            town._name     = fields[3];
                            town._x        = fields[4];
                            town._y        = fields[5];
                            town._resource = fields[6];
                            
                            tarObj[player]._towns.push(town);
                        }
                    }
                }
            }
        }
        
        for (var i in tarObj) {
            if (tarObj.hasOwnProperty(i)) {
                targets.push(tarObj[i]);
            }
        }
    }

    return targets;
}

// CSS/JS/HTML functions

function getMapHelp () {
    return (<r><![CDATA[
        <div id="help" class="help">
            <span style="position:relative; top:-3px;">?</span>
            <div class="helpContent">
                <table class="mapLegend">
                    <tr><th colspan="2">Island Color Legend</th></tr>
                    <tr><td style="width:40px;"># Players</td><td style="width:60px;">Color</td></tr>
                    <tr><td style="width:40px;">01-04</td><td style="background-color: #c1ffc1;width:50px;">&nbsp;</td></tr>
                    <tr><td style="width:40px;">05-08</td><td style="background-color: #7fff00;width:50px;">&nbsp;</td></tr>
                    <tr><td style="width:40px;">09-12</td><td style="background-color: #32cd32;width:50px;">&nbsp;</td></tr>
                    <tr><td style="width:30px;">13-16</td><td style="background-color: #228b22;width:50px;">&nbsp;</td></tr>
                </table>
            </div>
        </div>
    ]]></r>).toString();
}

function getMapJS () {
    return (<r><![CDATA[
        <script type="text/javascript">
        
        function toggleGrid (cb) {
            var g = document.getElementById('grid');
            
            if (g != null) {
                g.style.display = (cb.checked) ? 'inline' : 'none';
            }
            
            var h = document.getElementById('hticks');
            
            if (h != null) {
                h.style.display = (cb.checked) ? 'inline' : 'none';
            }
            
            var v = document.getElementById('vticks');
            
            if (v != null) {
                v.style.display = (cb.checked) ? 'inline' : 'none';
            }
        }
        
        </script>
    ]]></r>).toString();
}
function getMapCSS () {
    return (<r><![CDATA[
        <style type="text/css">
                    table { border-collapse: collapse; }
                    
                    #map {
                        position: relative;
                        border: 3px solid black;
                        background-color: #87cefa;
                        color: black;
                        margin-top:20px;
                        top: 10px;
                    }

                    .island {
                        position: absolute;
                        width: 5px;
                        height: 5px;
                        border: 1px solid black;
                    }
                    
                    .island:hover .infoContent {
                        display: block;
                    }
                    
                    .infoContent {
                        color: black;
                        font-size: 10px;
                        font-family: Courier, monospace;
                        position:relative;
                        display: none;
                        z-index: 100;
                    }
                    
                    .infoContent th,
                    .infoContent td {
                        border: 1px solid black;
                        text-align:center;
                        background-color: white;
                        white-space: nowrap;
                        padding: 2px 5px 2px 5px;
                    }
                    
                    .help {
                        position: absolute;
                        width: 10px;
                        height: 15px;
                        font-weight: bold;
                        background-color: white;
                        top: -22px;
                        left: 790px;
                        text-align:center;
                        border: 1px solid black;
                    }
                    
                    .help:hover .helpContent {
                        display: block;
                    }
                    
                    .helpContent {
                        display: none;
                        position:relative;
                        left: -145px;
                        top: -20px;
                        width: 140px;
                        height: 125px;
                        background-color: white;
                        border: 1px dashed gray;
                        z-index: 100;
                    }
                    
                    .mapLegend {
                        width: 130px;
                        color: black;
                        font-size: small;
                        position:relative;
                        top: 5px;
                        left: 5px;
                    }
                    
                    .mapLegend th,
                    .mapLegend td {
                        border: 1px solid black;
                        text-align:center;
                    }
                    
                    .mapError {
                        text-align: center;
                        margin: 75px 50px 0px 50px;
                        font-weight: bold;
                        border: 2px solid red;
                        background-color: #ffffff;
                        padding: 5px;
                    }
                    
                    .options {
                        position: absolute;
                        width: 12px;
                        height: 15px;
                        font-weight: bold;
                        background-color: white;
                        top: -22px;
                        left: 775px;
                        text-align:center;
                        border: 1px solid black;
                    }
                    
                    .options:hover .optionsContent {
                        display: block;
                    }
                    
                    .optionsContent {
                        display: none;
                        position:relative;
                        left: -60px;
                        top: -20px;
                        width: 50px;
                        height: 25px;
                        background-color: white;
                        border: 1px dashed gray;
                        z-index: 100;
                        text-align: left;
                        padding: 5px;
                        font-size: small;
                    }
                    
                    .grid {
                        position: absolute;
                    }
                    
                    .grid td {
                        border: 1px solid gray;
                        text-align:left;
                        padding-left: 3px;
                        padding-top: 3px;
                        color: gray;
                        width: 80px;
                        height: 80px;
                        font-size: 14px;
                        font-weight: bold;
                        vertical-align: top;
                    }
                    
                    .hticks {
                        position: absolute;
                        left: 6px;
                        top: 800px;
                        width:800px;
                    }
                    
                    .hticks td {
                        border: none;
                        text-align:right;
                        valign
                        padding-left: 3px;
                        padding-top: 3px;
                        color: gray;
                        width: 80px;
                        height: 10px;
                        font-size: 12px;
                        font-weight: bold;
                        vertical-align: top;
                    }
                    
                    .vticks {
                        position: absolute;
                        left: 802px;
                        top: 11px;
                        height:800px;
                    }
                    
                    .vticks td {
                        border: none;
                        text-align:left;
                        padding-left: 3px;
                        padding-bottom: 3px;
                        color: gray;
                        width: 10px;
                        height: 80px;
                        font-size: 12px;
                        font-weight: bold;
                        vertical-align: bottom;
                    }
                    
                    .mapContact {
                        position: absolute;
                        width: 175px;
                        height: 15px;
                        top: -26px;
                        left: -3px;
                        text-align:left;
                        color: black;
                        font-size: smaller;
                        padding: 2px 5px 2px 5px;
                    }
                    
                    .mapContact a {
                        text-decoration: none;
                    }
        </style>
    ]]></r>).toString();
}