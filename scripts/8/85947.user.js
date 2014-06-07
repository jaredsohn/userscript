// ==UserScript==
// @name           UD Internal Map
// @namespace      www.ray3k.com
// @description    Adds an internal map to Urban Dead.
// @include        http://www.urbandead.com/map.cgi*
// @include        http://*urbandead.com/map.cgi*
// @exclude        http://www.urbandead.com/map.cgi?logout
// @exclude        http://*urbandead.com/map.cgi?logout
// ==/UserScript==

//wait for the page to render before calling code.
window.addEventListener(
'load', function() {
    developInternalMap();
}, true);

//returns the player's gps location in a two element array
function getGPSLoc() {
    var position = new Array();
    
    //find all inputs within the map table
    var allInputs;
    allInputs = document.evaluate(
        "//table[@class='c']//input[@type='hidden']",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    //when all of the map is visible, there should be 8 nodes
    if (allInputs.snapshotLength == 8) {
        var gpsString = allInputs.snapshotItem(0).value;
        position[0] = parseInt(gpsString.match(/\d+/)) + 1;
        position[1] = parseInt(gpsString.replace(/\d+-/, "")) + 1;
    }
    //when at an edge and not a corner, there would be 5 nodes
    else if (allInputs.snapshotLength == 5) {
        var gpsString = allInputs.snapshotItem(0).value;
        //place the first reading as the gps location
        position[0] = parseInt(gpsString.match(/\d+/));
        position[1] = parseInt(gpsString.replace(/\d+-/, ""));
        
        //if at a left edge
        if (position[0] == 0) {
            if (position[1] < 1) {
                gpsString = allInputs.snapshotItem(1).value;
                position[0] = parseInt(gpsString.match(/\d+/));
                if (position[0] == 2) {
                    position[0] = 1;
                    position[1] = 0;
                }
                else {
                    position[0] = 0;
                    position[1] = 1;
                }
            }
            else if (position[1] == 98) {
                position[0] = 1;
                position[1] = 99;
            }
            else {
                position[1] += 1;
            }
        }
        //if at right edge
        else if (position[0] == 98) {
            //correct the x coordinate
            position[0] = 99;
            //correct the y coordinate
            position[1] += 1;
        }
        //if at a top edge
        else if (position[1] == 0) {
            //correct the x coordinate
            position[0] += 1;
        }
        //if at bottom edge
        else if (position[1] == 98) {
            //correct the x coordinate
            position[0] += 1;
            //correct the y coordinate
            position[1] = 99;
        }
    }
    //when in a corner, there would be only 3 nodes
    else if (allInputs.snapshotLength == 3) {
        var gpsString = allInputs.snapshotItem(0).value;
        //place the first reading as the gps location
        position[0] = parseInt(gpsString.match(/\d+/));
        position[1] = parseInt(gpsString.replace(/\d+-/, ""));
        
        //correct the x coordinate
        if (position[0] == 98)  position[0] = 99;
        else if (position[0] == 1) position[0] = 0;
        
        //correct the y coordinate
        if (position[1] == 98) position[1] = 99;
        else if (position[1] == 1) position[1] = 0;
    }
    //error handling
    else {
        position[0] = -1;
        position[1] = -1;
    }
    
    return position;
}

function getSuburbName(x, y) {
    var suburb = "";
    
    if (y < 10) {
        if (x < 10) {
            suburb = "Dakerstown";
        }
        else if (x < 20) {
            suburb = "Jensentown";
        }
        else if (x < 30) {
            suburb = "Quarlesbank";
        }
        else if (x < 40) {
            suburb = "West Boundwood";
        }
        else if (x < 50) {
            suburb = "East Boundwood";
        }
        else if (x < 60) {
            suburb = "Lamport Hills";
        }
        else if (x < 70) {
            suburb = "Chancelwood";
        }
        else if (x < 80) {
            suburb = "Earletown";
        }
        else if (x < 90) {
            suburb = "Rhodenbank";
        }
        else if (x < 100) {
            suburb = "Dulston";
        }
    }
    else if (y < 20) {
        if (x < 10) {
            suburb = "Roywood";
        }
        else if (x < 20) {
            suburb = "Judgewood";
        }
        else if (x < 30) {
            suburb = "Gatcombeton";
        }
        else if (x < 40) {
            suburb = "Shuttlebank";
        }
        else if (x < 50) {
            suburb = "Yagoton";
        }
        else if (x < 60) {
            suburb = "Millen Hills";
        }
        else if (x < 70) {
            suburb = "Raines Hills";
        }
        else if (x < 80) {
            suburb = "Pashenton";
        }
        else if (x < 90) {
            suburb = "Rolt Heights";
        }
        else if (x < 100) {
            suburb = "Pescodside";
        }
    }
    else if (y < 30) {
        if (x < 10) {
            suburb = "Peddlesden Village";
        }
        else if (x < 20) {
            suburb = "Chudleyton";
        }
        else if (x < 30) {
            suburb = "Darvall Heights";
        }
        else if (x < 40) {
            suburb = "Eastonwood";
        }
        else if (x < 50) {
            suburb = "Brooke Hills";
        }
        else if (x < 60) {
            suburb = "Shearbank";
        }
        else if (x < 70) {
            suburb = "Huntley Heights";
        }
        else if (x < 80) {
            suburb = "Santlerville";
        }
        else if (x < 90) {
            suburb = "Gibsonton";
        }
        else if (x < 100) {
            suburb = "Dunningwood";
        }
    }
    else if (y < 40) {
        if (x < 10) {
            suburb = "Dunell Hills";
        }
        else if (x < 20) {
            suburb = "West Becktown";
        }
        else if (x < 30) {
            suburb = "East Becktown";
        }
        else if (x < 40) {
            suburb = "Richmond Hills";
        }
        else if (x < 50) {
            suburb = "Ketchelbank";
        }
        else if (x < 60) {
            suburb = "Roachtown";
        }
        else if (x < 70) {
            suburb = "Randallbank";
        }
        else if (x < 80) {
            suburb = "Heytown";
        }
        else if (x < 90) {
            suburb = "Spracklingbank";
        }
        else if (x < 100) {
            suburb = "Paynterton";
        }
    }
    else if (y < 50) {
        if (x < 10) {
            suburb = "Owsleybank";
        }
        else if (x < 20) {
            suburb = "Molebank";
        }
        else if (x < 30) {
            suburb = "Lukinswood";
        }
        else if (x < 40) {
            suburb = "Havercroft";
        }
        else if (x < 50) {
            suburb = "Barrville";
        }
        else if (x < 60) {
            suburb = "Ridleybank";
        }
        else if (x < 70) {
            suburb = "Pimbank";
        }
        else if (x < 80) {
            suburb = "Peppardville";
        }
        else if (x < 90) {
            suburb = "Pitneybank";
        }
        else if (x < 100) {
            suburb = "Starlingtown";
        }
    }
    else if (y < 60) {
        if (x < 10) {
            suburb = "Grigg Heights";
        }
        else if (x < 20) {
            suburb = "Reganbank";
        }
        else if (x < 30) {
            suburb = "Lerwill Heights";
        }
        else if (x < 40) {
            suburb = "Shore Hills";
        }
        else if (x < 50) {
            suburb = "Galbraith Hills";
        }
        else if (x < 60) {
            suburb = "Stanbury Village";
        }
        else if (x < 70) {
            suburb = "Roftwood";
        }
        else if (x < 80) {
            suburb = "Edgecombe";
        }
        else if (x < 90) {
            suburb = "Pegton";
        }
        else if (x < 100) {
            suburb = "Dentonside";
        }
    }
    else if (y < 70) {
        if (x < 10) {
            suburb = "Crooketon";
        }
        else if (x < 20) {
            suburb = "Mornington";
        }
        else if (x < 30) {
            suburb = "North Blythville";
        }
        else if (x < 40) {
            suburb = "Brooksville";
        }
        else if (x < 50) {
            suburb = "Mockridge Heights";
        }
        else if (x < 60) {
            suburb = "Shackleville";
        }
        else if (x < 70) {
            suburb = "Tollyton";
        }
        else if (x < 80) {
            suburb = "Crowbank";
        }
        else if (x < 90) {
            suburb = "Vinetown";
        }
        else if (x < 100) {
            suburb = "Houldenbank";
        }
    }
    else if (y < 80) {
        if (x < 10) {
            suburb = "Nixbank";
        }
        else if (x < 20) {
            suburb = "Wykewood";
        }
        else if (x < 30) {
            suburb = "South Blythville";
        }
        else if (x < 40) {
            suburb = "Greentown";
        }
        else if (x < 50) {
            suburb = "Tapton";
        }
        else if (x < 60) {
            suburb = "Kempsterbank";
        }
        else if (x < 70) {
            suburb = "Wray Heights";
        }
        else if (x < 80) {
            suburb = "Gulsonside";
        }
        else if (x < 90) {
            suburb = "Osmondville";
        }
        else if (x < 100) {
            suburb = "Penny Heights";
        }
    }
    else if (y < 90) {
        if (x < 10) {
            suburb = "Foulkes Village";
        }
        else if (x < 20) {
            suburb = "Ruddlebank";
        }
        else if (x < 30) {
            suburb = "Lockettside";
        }
        else if (x < 40) {
            suburb = "Dartside";
        }
        else if (x < 50) {
            suburb = "Kinch Heights";
        }
        else if (x < 60) {
            suburb = "West Grayside";
        }
        else if (x < 70) {
            suburb = "East Grayside";
        }
        else if (x < 80) {
            suburb = "Scarletwood";
        }
        else if (x < 90) {
            suburb = "Pennville";
        }
        else if (x < 100) {
            suburb = "Fryerbank";
        }
    }
    else if (y < 100) {
        if (x < 10) {
            suburb = "New Arkham";
        }
        else if (x < 20) {
            suburb = "Old Arkham";
        }
        else if (x < 30) {
            suburb = "Spicer Hills";
        }
        else if (x < 40) {
            suburb = "Williamsville";
        }
        else if (x < 50) {
            suburb = "Buttonville";
        }
        else if (x < 60) {
            suburb = "Wyke Hills";
        }
        else if (x < 70) {
            suburb = "Hollomstown";
        }
        else if (x < 80) {
            suburb = "Danversbank";
        }
        else if (x < 90) {
            suburb = "Whittenside";
        }
        else if (x < 100) {
            suburb = "Miltown";
        }
    }
    
    return suburb;
}

function getSuburbCoordinates(suburbName) {
    var x =0;
    var y = 0;
    
    if (suburbName.toLowerCase().match("dakerstown")) {
        x = 5;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("jensentown")) {
        x = 15;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("quarlesbank")) {
        x = 25;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("west boundwood")) {
        x = 35;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("east boundwood")) {
        x = 45;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("lamport hills")) {
        x = 55;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("chancelwood")) {
        x = 65;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("earletown")) {
        x = 75;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("rhodenbank")) {
        x = 85;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("dulston")) {
        x = 95;
        y = 5;
    }
    else if (suburbName.toLowerCase().match("roywood")) {
        x = 5;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("judgewood")) {
        x = 15;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("gatcombeton")) {
        x = 25;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("shuttlebank")) {
        x = 35;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("yagoton")) {
        x = 45;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("millen hills")) {
        x = 55;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("raines hills")) {
        x = 65;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("pashenton")) {
        x = 75;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("rolt heights")) {
        x = 85;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("pescodside")) {
        x = 95;
        y = 15;
    }
    else if (suburbName.toLowerCase().match("peddlesden village")) {
        x = 5;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("chudleyton")) {
        x = 15;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("darvall heights")) {
        x = 25;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("eastonwood")) {
        x = 35;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("brooke hills")) {
        x = 45;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("shearbank")) {
        x = 55;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("huntley heights")) {
        x = 65;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("santlerville")) {
        x = 75;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("gibsonton")) {
        x = 85;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("dunningwood")) {
        x = 95;
        y = 25;
    }
    else if (suburbName.toLowerCase().match("dunell hills")) {
        x = 5;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("west becktown")) {
        x = 15;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("east becktown")) {
        x = 25;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("richmond hills")) {
        x = 35;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("ketchelbank")) {
        x = 45;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("roachtown")) {
        x = 55;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("randallbank")) {
        x = 65;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("heytown")) {
        x = 75;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("spracklingbank")) {
        x = 85;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("paynterton")) {
        x = 95;
        y = 35;
    }
    else if (suburbName.toLowerCase().match("owsleybank")) {
        x = 5;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("molebank")) {
        x = 15;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("lukinswood")) {
        x = 25;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("havercroft")) {
        x = 35;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("barrville")) {
        x = 45;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("ridleybank")) {
        x = 55;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("pimbank")) {
        x = 65;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("peppardville")) {
        x = 75;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("pitneybank")) {
        x = 85;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("starlingtown")) {
        x = 95;
        y = 45;
    }
    else if (suburbName.toLowerCase().match("grigg heights")) {
        x = 5;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("reganbank")) {
        x = 15;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("lerwill heights")) {
        x = 25;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("shore hills")) {
        x = 35;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("galbraith hills")) {
        x = 45;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("stanbury village")) {
        x = 55;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("roftwood")) {
        x = 65;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("edgecombe")) {
        x = 75;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("pegton")) {
        x = 85;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("dentonside")) {
        x = 95;
        y = 55;
    }
    else if (suburbName.toLowerCase().match("crooketon")) {
        x = 5;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("mornington")) {
        x = 15;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("north blythville")) {
        x = 25;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("brooksville")) {
        x = 35;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("mockridge heights")) {
        x = 45;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("shackleville")) {
        x = 55;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("tollyton")) {
        x = 65;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("crowbank")) {
        x = 75;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("vinetown")) {
        x = 85;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("houldenbank")) {
        x = 95;
        y = 65;
    }
    else if (suburbName.toLowerCase().match("nixbank")) {
        x = 5;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("wykewood")) {
        x = 15;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("south blythville")) {
        x = 25;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("greentown")) {
        x = 35;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("tapton")) {
        x = 45;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("kempsterbank")) {
        x = 55;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("wray heights")) {
        x = 65;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("gulsonside")) {
        x = 75;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("osmondville")) {
        x = 85;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("penny heights")) {
        x = 95;
        y = 75;
    }
    else if (suburbName.toLowerCase().match("foulkes village")) {
        x = 5;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("ruddlebank")) {
        x = 15;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("lockettside")) {
        x = 25;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("dartside")) {
        x = 35;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("kinch heights")) {
        x = 45;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("west grayside")) {
        x = 55;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("east grayside")) {
        x = 65;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("scarletwood")) {
        x = 75;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("pennville")) {
        x = 85;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("fryerbank")) {
        x = 95;
        y = 85;
    }
    else if (suburbName.toLowerCase().match("new arkham")) {
        x = 5;
        y = 95;
    }
    else if (suburbName.toLowerCase().match("old arkham")) {
        x = 15;
        y = 95;
    }
    else if (suburbName.toLowerCase().match("spicer hills")) {
        x = 25;
        y = 95;
    }
    else if (suburbName.toLowerCase().match("williamsville")) {
        x = 35;
        y = 95;
    }
    else if (suburbName.toLowerCase().match("buttonville")) {
        x = 45;
        y = 95;
    }
    else if (suburbName.toLowerCase().match("wyke hills")) {
        x = 55;
        y = 95;
    }
    else if (suburbName.toLowerCase().match("hollomstown")) {
        x = 65;
        y = 95;
    }
    else if (suburbName.toLowerCase().match("danversbank")) {
        x = 75;
        y = 95;
    }
    else if (suburbName.toLowerCase().match("whittenside")) {
        x = 85;
        y = 95;
    }
    else if (suburbName.toLowerCase().match("miltown")) {
        x = 95;
        y = 95;
    }
    else {
        return null;
    }
    
    var returnArray = new Array();
    returnArray[0] = x;
    returnArray[1] = y;
    
    return returnArray;
}

function getSuburbColorString(x, y) {
    return "rgb(30," + Math.floor(Math.floor(x/10)*10 / 100 * 150 + 50) + "," + Math.floor(Math.floor(y/10)*10 / 100 * 150 + 50) + ")";
}

function developInternalMap() {
    var position = getGPSLoc();
    var gpsX = position[0];
    var gpsY = position[1];
    var mapX = gpsX;
    var mapY = gpsY;
    var mapInfoArray = getMapInfoArray();
    var tableWidth = Math.floor((document.body.clientWidth - 100) / 100);
    var tableHeight = Math.floor((document.body.clientHeight - 50) / 100);
    
    var mapAnchor = addButton();
    
    if (mapAnchor != null) {
        addAnchorListener(mapAnchor)
    }
    
    function addButton() {
        //Find the suburb text node
        var allTDs, suburbTextNode;
        allTDs = document.evaluate(
        "//td[@class='sb']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
        
        if (allTDs.snapshotLength > 0) {
            //get the text node
            suburbTextNode = allTDs.snapshotItem(0).firstChild;
            suburbTextNode.nodeValue += " (" + gpsX + "," + gpsY + ")";
            
            //add an anchor inside the td
            var mapLink = document.createElement("a");
            mapLink.href = "http://www.urbandead.com/map.cgi";
            mapLink.id = "MapLink";
            suburbTextNode.parentNode.appendChild(mapLink);
            mapLink.appendChild(suburbTextNode);
            return mapLink;
        }
        else {
            return null;
        }
    }
    
    function createTable() {
        var map = document.createElement("table");
        map.className = "c";
        map.style.color = "rgb(238,255,238)"
        map.style.position = "absolute";
        map.style.minWidth = "100%";
        map.style.minHeight = "100%";
        map.style.left = 0;
        map.style.top = 0;
        var caption = map.createCaption();
        caption.appendChild(document.createTextNode("Malton Map- provided by "));
        var zooLink = document.createElement("a");
        zooLink.href = "http://www.maltoncityzoo.com";
        zooLink.appendChild(document.createTextNode("maltoncityzoo.com"));
        caption.appendChild(zooLink);
        caption.appendChild(document.createElement("br"));
        caption.appendChild(document.createTextNode("Click on any block to reposition the map."))
        caption.style.backgroundColor = "gray";
        
        for (var i = 0; i < tableHeight; i++) {
            var row = map.insertRow(i);
            for (var j = 0; j < tableWidth; j++) {
                var currentX = mapX+j - Math.floor(tableWidth / 2);
                var currentY = mapY+i - Math.floor(tableHeight / 2);
                
                if (currentX >= 0 && currentX <= 99 && currentY >= 0 && currentY <= 99) {
                    var cell = row.insertCell(j);
                    var button = document.createElement("input");
                    button.type = "submit";
                    button.className = "md";
                    button.value = getCoordinateInfo(mapInfoArray, currentX, currentY)[0].replace(/\s/g, "\n");
                    if (getCoordinateInfo(mapInfoArray, currentX, currentY)[2] == "c20") {
                        button.value += "\n(NT)";
                    }
                    cell.appendChild(button);
                    cell.appendChild(document.createElement("br"));
                    var gpsSpan = document.createElement("span");
                    var cellCoordinates = getCoordinateInfo(mapInfoArray, currentX, currentY)[1];
                    gpsSpan.appendChild(document.createTextNode(cellCoordinates));
                    gpsSpan.style.backgroundColor = "rgb(85,102,85)";
                    cell.appendChild(gpsSpan);
                    //if the cell is the same coordinates as the player's location
                    if (cellCoordinates == gpsX + "," + gpsY) {
                        gpsSpan.style.backgroundColor = "rgb(255,0,0)";
                    }

                    cell.className = "b";
                    cell.style.maxWidth = "100";
                    cell.style.maxHeight = "100";
                    var testCell = document.createElement("td");
                    testCell.className = "b " + getCoordinateInfo(mapInfoArray, currentX, currentY)[2];
                    cell.style.backgroundColor = document.defaultView.getComputedStyle(testCell,null).getPropertyValue("background-color");
                    cell.style.backgroundImage = document.defaultView.getComputedStyle(testCell,null).getPropertyValue("background-image");
                    testCell = null;

                    addCellListener(cell, map);

                    //cell.style.width = 100 * zoom;
                    //cell.style.height = 100 * zoom;
                }
                else {
                    var cell = row.insertCell(j);
                    cell.className = "b";
                    cell.style.maxWidth = "100";
                    cell.style.maxHeight = "100";
                    cell.style.backgroundColor = "black";
                }
            }
        }
        var controlsCell = map.rows[0].insertCell(map.rows[0].cells.length);
        modifyControlsCell(map, controlsCell);
        return map;
    }
    
    function updateTable(mt) {
        tableWidth = Math.floor((document.body.clientWidth - 100) / 100);
        tableHeight = Math.floor((document.body.clientHeight - 50) / 100);
        document.body.removeChild(mt);
        mt = createTable();
        document.body.appendChild(mt);
    }
    
    function createYouAreHereImg() {
        var image = document.createElement("img");
        image.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%18%08%06%00%00%00%FE%BE%0DK%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01oIDATx%DA%C4U%D1M%031%0CMQ%FF%C3%06a%83%B2%C1%B1A%D9%20%DD%20b%82%83%09%8E%0D%0E%26%80%0D%02%13%5C7(L%90n%D0%3A%92-%5C%9F%D3%84%0A%89H%AF%B9s%ECg%D7%B1%7D%0B%D3%B0%0E%C6t%B0%DD%D1%FB%C2%98'%F3%17%0B%88%7B%C0%81%D0bse%FEcAh%2B%8Cv%E2%11%03%06%C0%FAR%C2(%C84%EC%00%BE%954%08%E3Iq%F2%A6%BC%DBs%A4%83%20%ECJ%97%07%3F%0E0%0A%7D%AB%91%AE%99%D2%D8Z%159%15%3CrIj%01I%3Dl(7A%DEi%86%09%9D%D0%E5%11v%22%A7%FC%CC%23%07%E5%3Drb2%ECEe%A4JU%04%A6%EF%98%DCQ%1A~%04%F3%B2%2B%91%0EJJ%A8%DEC%EE%BC%5B%94%EFa%06%7C%0B%DD%0D%E0%19%F0%C2d%5B%C0%3DB%AE-%EE%D7KE%C8Wv%FA%08%0E%3F!%8A%8F%FC%0E%CF%0F%18%DD%BB%A2%FF%A5%CD%8A%1BEqOr%20%7Ce%A4%0E%CF%AA%EDKy%B3r%5C%E2%C5J%F9(k%1D%E5%F1%A4%08%D8%ED%FBB7%26%DC%7B4%9E%14gvV%CB%AC5ce%CA%F5%A5%A1%C3%7B%C1%14j0%5C8%0D%93%EC%05m%00%F9_%90ZV%BF%B3%FB%90%0As%CF%85o!%8B4%EF%AB%16%EF%14A%E0%06%986%2Fft%99%F4%DC4%AB%20%CAQP%23w%85%EF%1D%FD%93%F1dD%8Au%14%60%00Dy%9C%97%B5D%0BH%00%00%00%00IEND%AEB%60%82";
        image.style.opacity = ".75";
        //image.style.position = "relative";
        //image.style.left = -20;
        return image;
    }
    
    function modifyControlsCell(mt, controlsCell) {
        controlsCell.rowSpan = mt.rows.length;
        controlsCell.style.verticalAlign = "top";
        controlsCell.appendChild(createCloseLink(mt));
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(createGoToLink(mt));
        
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(createResourcesLink(mt));
        
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(createWhereAmILink(mt));
        
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(createShowSuburbsLink(mt));
        
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(document.createTextNode("Viewing:"));
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(createWikiBlockLink());
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(document.createElement("br"));
        controlsCell.appendChild(createWikiSuburbLink());
        
        function createCloseLink(mt) {
            var link = document.createElement("a");
            link.href = "http://www.urbandead.com/map.cgi";
            link.appendChild(document.createTextNode("CLOSE"));
            link.style.fontWeight = "bold";
            link.addEventListener('click', function(event) {
                document.body.removeChild(mt);
                
                var selectSpan = document.getElementById("selectionSpan");
                if (selectSpan != null) document.body.removeChild(selectSpan);

                //stop the click from activating the anchor
                event.stopPropagation();
                event.preventDefault();
            }, true);
            return link;
        }
        
        function createGoToLink(mt) {
            var link = document.createElement("a");
            link.href = "http://www.urbandead.com/map.cgi";
            link.appendChild(document.createTextNode("Go\u00a0To..."));
            link.addEventListener('click', function(event) {
                goTo(prompt("Enter the GPS coordinates or location name.\n\nExample:\n58,38\nstickling mall\n\nSearch results are sorted by distance."), mt);

                //stop the click from activating the anchor
                event.stopPropagation();
                event.preventDefault();
            }, true);
            return link;
        }
    
        function createResourcesLink(mt) {
            var link = document.createElement("a");
            link.href = "http://www.urbandead.com/map.cgi";
            link.appendChild(document.createTextNode("Rescources..."));
            link.addEventListener('click', function(event) {
                
                //destroy any existing selectionSpan
                var selectSpan = document.getElementById("selectionSpan");
                if (selectSpan != null) document.body.removeChild(selectSpan);
                
                var selectionSpan = document.createElement("span");
                var cancelAnchor = document.createElement("a");
                cancelAnchor.appendChild(document.createTextNode("CANCEL"));
                cancelAnchor.href = "http://www.urbandead.com/map.cgi";
                cancelAnchor.addEventListener('click', function(event) {
                    document.body.removeChild(selectionSpan);
                    selectionSpan = null;
                    
                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(cancelAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                
                //malls
                var newAnchor = document.createElement("a");
                newAnchor.href = "http://www.urbandead.com/map.cgi";
                newAnchor.appendChild(document.createTextNode("Malls"));
                newAnchor.addEventListener('click', function(event) {
                    findLocationByClass("c6", 100, mt);
                    
                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(newAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                
                //hospitals
                newAnchor = document.createElement("a");
                newAnchor.href = "http://www.urbandead.com/map.cgi";
                newAnchor.appendChild(document.createTextNode("Hospitals"));
                newAnchor.addEventListener('click', function(event) {
                    findLocationByClass("c9", 20, mt);
                    
                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(newAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                
                //police departments
                newAnchor = document.createElement("a");
                newAnchor.href = "http://www.urbandead.com/map.cgi";
                newAnchor.appendChild(document.createTextNode("Police Departments"));
                newAnchor.addEventListener('click', function(event) {
                    findLocationByClass("c12", 20, mt);
                    
                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(newAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                
                //Necrotechs
                newAnchor = document.createElement("a");
                newAnchor.href = "http://www.urbandead.com/map.cgi";
                newAnchor.appendChild(document.createTextNode("Necrotech Buildings"));
                newAnchor.addEventListener('click', function(event) {
                    findLocationByClass("c20", 20, mt);
                    
                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(newAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                
                //Factories
                newAnchor = document.createElement("a");
                newAnchor.href = "http://www.urbandead.com/map.cgi";
                newAnchor.appendChild(document.createTextNode("Factories"));
                newAnchor.addEventListener('click', function(event) {
                    findLocationByClass("c18", 20, mt);
                    
                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(newAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                
                //Auto Repairs
                newAnchor = document.createElement("a");
                newAnchor.href = "http://www.urbandead.com/map.cgi";
                newAnchor.appendChild(document.createTextNode("Auto Repairs"));
                newAnchor.addEventListener('click', function(event) {
                    findLocationByClass("c15", 20, mt);
                    
                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(newAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                
                //Fire Station
                newAnchor = document.createElement("a");
                newAnchor.href = "http://www.urbandead.com/map.cgi";
                newAnchor.appendChild(document.createTextNode("Fire Station"));
                newAnchor.addEventListener('click', function(event) {
                    findLocationByClass("c13", 20, mt);
                    
                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(newAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                
                selectionSpan.style.position = "absolute";
                selectionSpan.style.left = 0;
                selectionSpan.style.top = 0;
                selectionSpan.style.backgroundColor = "gray";
                selectionSpan.style.borderStyle = "solid";
                selectionSpan.style.borderColor = "black";
                selectionSpan.style.padding = "10px";
                selectionSpan.id = "selectionSpan";
                document.body.appendChild(selectionSpan);
                
                //stop the click from activating the anchor
                event.stopPropagation();
                event.preventDefault();
            }, true);
            return link;
        }
    
        function createWhereAmILink(mt) {
            var link = document.createElement("a");
            link.href = "http://www.urbandead.com/map.cgi";
            link.appendChild(document.createTextNode("Where\u00a0am\u00a0I?"));
            link.addEventListener('click', function(event) {
                mapX = gpsX;
                mapY = gpsY;
                updateTable(mt);
                
                //stop the click from activating the anchor
                event.stopPropagation();
                event.preventDefault();
            }, true);
            return link;
        }
    
        function createShowSuburbsLink(mt) {
            
            var link = document.createElement("a");
            link.href = "http://www.urbandead.com/map.cgi";
            link.appendChild(document.createTextNode("Show\u00a0suburbs"));
            link.id = "showSuburbs";
            link.addEventListener('click', function(event) {
                if (link.firstChild.nodeValue == "Show\u00a0suburbs") {
                    link.firstChild.nodeValue = "Hide\u00a0suburbs";
                    for (var i = 0; i < mt.rows.length; i++) {
                        for (var j = 0; j < mt.rows[i].cells.length; j++) {
                            if (!(i == 0 && j == mt.rows[i].cells.length - 1)) {
                                var gpsSpan = mt.rows[i].cells[j].getElementsByTagName("span")[0];
                                if (gpsSpan != null) {
                                    var cellX = gpsSpan.firstChild.nodeValue.split(",")[0];
                                    var cellY = gpsSpan.firstChild.nodeValue.split(",")[1];
                                    //hide the gps span
                                    gpsSpan.style.display = "none";
                                    var suburbSpan = document.createElement("span");
                                    suburbSpan.appendChild(document.createTextNode(getSuburbName(cellX, cellY)));
                                    suburbSpan.style.backgroundColor = getSuburbColorString(cellX, cellY);
                                    mt.rows[i].cells[j].appendChild(suburbSpan);
                                }
                            }
                        }
                    }
                }
                else {
                    updateTable(mt);
                }
                
                
                //stop the click from activating the anchor
                event.stopPropagation();
                event.preventDefault();
            }, true);
            return link;
        }
    
        function createWikiBlockLink() {
            var blockName = getCoordinateInfo(mapInfoArray, mapX, mapY)[0];
            var blockLink = document.createElement("a");
            blockLink.href = "http://wiki.urbandead.com/index.php/";
            blockLink.href += blockName.replace(/\s/g, "_");
            blockLink.target = "_blank";
            blockLink.appendChild(document.createTextNode("(" + mapX + "," + mapY + ")"));
            blockLink.appendChild(document.createElement("br"));
            blockLink.appendChild(document.createTextNode(blockName));
            return blockLink
        }
    
        function createWikiSuburbLink() {
            var suburbName = getSuburbName(mapX, mapY);
            var wikiLink = document.createElement("a");
            wikiLink.href = "http://wiki.urbandead.com/index.php/";
            wikiLink.href += suburbName.replace(/\s/g, "_");
            wikiLink.target = "_blank";
            wikiLink.appendChild(document.createTextNode(suburbName));
            return wikiLink;
        }
    }
    
    function goTo(locationString, mt) {
        //if the user did not hit cancel
        if (locationString != null) {
            //if the user entered gps coordinates
            var parsedGPS = locationString.match(/\d+/g);
            if (parsedGPS != null && parsedGPS.length > 0) {
                parsedGPS[0] = parseInt(parsedGPS[0]);
                parsedGPS[1] = parseInt(parsedGPS[1]);
                if (parsedGPS[0] >= 0 && parsedGPS[0] <= 99 && parsedGPS[1] >= 0 && parsedGPS[1] <= 99) {
                    mapX = parsedGPS[0];
                    mapY = parsedGPS[1];
                    updateTable(mt);
                }
            }
            else {
                //if the user entered a suburb name
                var suburb = getSuburbCoordinates(locationString);
                if (suburb != null) {
                    mapX = suburb[0];
                    mapY = suburb[1];
                    updateTable(mt);
                }
                else {
                    //check if the user entered a block name
                    findLocation(locationString, mt);
                }
            }
        }
    }
    
    function findLocation(locationName, mt) {
        //if the location name is valid
        if (locationName != null && locationName != "") {
            //create an array to store each match from the mapInfoArray
            var coordArray = new Array();
            //go through the mapInfoArray and check for matches to the locationName
            for (var i = 0; i < mapInfoArray.length; i++) {
                var info = mapInfoArray[i].split("|");
                if (info[0].toLowerCase().match(locationName.toLowerCase()) != null) {
                    //store the info into the new array
                    coordArray.push(mapInfoArray[i]);
                }
            }
            
            if (coordArray.length > 0) {
                //sort the array by distance from the map position
                for (var i = 0; i < coordArray.length; i++)  {
                    for (var j = 0; j < coordArray.length - i - 1; j++) {
                        var info = coordArray[j].split("|");
                        var currentX = info[1].split(",")[0];
                        var currentY = info[1].split(",")[1];
                        var currentDistance = UDBlockDistance(mapX, mapY, currentX, currentY);

                        info = coordArray[j + 1].split("|");
                        var nextX = info[1].split(",")[0];
                        var nextY = info[1].split(",")[1];
                        var nextDistance = UDBlockDistance(mapX, mapY, nextX, nextY);

                        //if the current object needs to bubble down
                        if (currentDistance > nextDistance) {
                            //bubble down
                            var temp = coordArray[j];
                            coordArray[j] = coordArray[j+1];
                            coordArray[j+1] = temp;
                        }
                    }
                }
                
                //destroy any existing selectionSpan
                var selectSpan = document.getElementById("selectionSpan");
                if (selectSpan != null) document.body.removeChild(selectSpan);
                
                var selectionSpan = document.createElement("span");
                var cancelAnchor = document.createElement("a");
                cancelAnchor.appendChild(document.createTextNode("CANCEL"));
                cancelAnchor.href = "http://www.urbandead.com/map.cgi";
                cancelAnchor.addEventListener('click', function(event) {
                    document.body.removeChild(selectionSpan);
                    selectionSpan = null;

                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(cancelAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                for (var i = 0; i < coordArray.length; i++) {
                    var info = coordArray[i].split("|");
                    var x = info[1].split(",")[0];
                    var y = info[1].split(",")[1];
                    var newAnchor = document.createElement("a");
                    newAnchor.href = "http://www.urbandead.com/map.cgi";
                    newAnchor.title = info[1];
                    newAnchor.appendChild(document.createTextNode((i + 1) + ". (" + info[1] + ") " + info[0] + " in " + getSuburbName(x, y) + ", " + Math.round(UDBlockDistance(mapX, mapY, x, y)) + " blocks away\n"));
                    newAnchor.addEventListener('click', function(event) {
                        document.body.removeChild(selectionSpan);
                        selectionSpan = null;
                        mapX = parseInt(event.target.title.split(",")[0]);
                        mapY = parseInt(event.target.title.split(",")[1]);
                        updateTable(mt);

                        //stop the click from activating the anchor
                        event.stopPropagation();
                        event.preventDefault();
                    }, true);
                    selectionSpan.appendChild(newAnchor);
                    selectionSpan.appendChild(document.createElement("br"));
                }
                selectionSpan.style.position = "absolute";
                selectionSpan.style.left = 0;
                selectionSpan.style.top = 0;
                selectionSpan.style.backgroundColor = "gray";
                selectionSpan.style.borderStyle = "solid";
                selectionSpan.style.borderColor = "black";
                selectionSpan.style.padding = "10px";
                selectionSpan.id = "selectionSpan";
                document.body.appendChild(selectionSpan);
            }
            //there were no block matches
            else {
                alert("No matches!\n\nSearches are not case sensitive but must be spelled properly. Please try again.")
            }
        }
        else {
            //the user didn't type anything into the search box
            alert("Please enter a valid search");
        }
    }
    
    function findLocationByClass(className, limit, mt) {
        if (className != null && className != "") {
            var coordArray = new Array();
            for (var i = 0; i < mapInfoArray.length; i++) {
                var info = mapInfoArray[i].split("|");
                if (info[2].toLowerCase().match(className.toLowerCase()) != null) {
                    coordArray.push(mapInfoArray[i]);
                }
            }
            
            if (coordArray.length > 0) {
                //sort the array by distance from the map position
                for (var i = 0; i < coordArray.length; i++)  {
                    for (var j = 0; j < coordArray.length - i - 1; j++) {
                        var info = coordArray[j].split("|");
                        var currentX = info[1].split(",")[0];
                        var currentY = info[1].split(",")[1];
                        var currentDistance = UDBlockDistance(mapX, mapY, currentX, currentY);

                        info = coordArray[j + 1].split("|");
                        var nextX = info[1].split(",")[0];
                        var nextY = info[1].split(",")[1];
                        var nextDistance = UDBlockDistance(mapX, mapY, nextX, nextY);

                        //if the current object needs to bubble down
                        if (currentDistance > nextDistance) {
                            //bubble down
                            var temp = coordArray[j];
                            coordArray[j] = coordArray[j+1];
                            coordArray[j+1] = temp;
                        }
                    }
                }
                
                if (coordArray.length > limit) coordArray.length = limit;
                
                //destroy any existing selectionSpan
                var selectSpan = document.getElementById("selectionSpan");
                if (selectSpan != null) document.body.removeChild(selectSpan);
                
                var selectionSpan = document.createElement("span");
                var cancelAnchor = document.createElement("a");
                cancelAnchor.appendChild(document.createTextNode("CANCEL"));
                cancelAnchor.href = "http://www.urbandead.com/map.cgi";
                cancelAnchor.addEventListener('click', function(event) {
                    document.body.removeChild(selectionSpan);
                    selectionSpan = null;

                    //stop the click from activating the anchor
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
                selectionSpan.appendChild(cancelAnchor);
                selectionSpan.appendChild(document.createElement("br"));
                for (var i = 0; i < coordArray.length; i++) {
                    var info = coordArray[i].split("|");
                    var x = info[1].split(",")[0];
                    var y = info[1].split(",")[1];
                    var newAnchor = document.createElement("a");
                    newAnchor.href = "http://www.urbandead.com/map.cgi";
                    newAnchor.title = info[1];
                    newAnchor.appendChild(document.createTextNode((i + 1) + ". (" + info[1] + ") " + info[0] + " in " + getSuburbName(x, y) + ", " + Math.round(UDBlockDistance(mapX, mapY, x, y)) + " blocks away\n"));
                    newAnchor.addEventListener('click', function(event) {
                        document.body.removeChild(selectionSpan);
                        selectionSpan = null;
                        mapX = parseInt(event.target.title.split(",")[0]);
                        mapY = parseInt(event.target.title.split(",")[1]);
                        updateTable(mt);

                        //stop the click from activating the anchor
                        event.stopPropagation();
                        event.preventDefault();
                    }, true);
                    selectionSpan.appendChild(newAnchor);
                    selectionSpan.appendChild(document.createElement("br"));
                }
                selectionSpan.style.position = "absolute";
                selectionSpan.style.left = 0;
                selectionSpan.style.top = 0;
                selectionSpan.style.backgroundColor = "gray";
                selectionSpan.style.borderStyle = "solid";
                selectionSpan.style.borderColor = "black";
                selectionSpan.style.padding = "10px";
                selectionSpan.id = "selectionSpan";
                document.body.appendChild(selectionSpan);
            }
            else {
                alert("No matches!\n\nSearches are not case sensitive but must be spelled properly. Please try again.")
            }
        }
    }
    
    function addCellListener(cell, mt) {
        cell.addEventListener('click', function(event) {
            var gpsSpanText = cell.getElementsByTagName("span")[0].firstChild.nodeValue;
            mapX = parseInt(gpsSpanText.split(",")[0]);
            mapY = parseInt(gpsSpanText.split(",")[1]);
            updateTable(mt);
            
            //stop the click from activating the anchor
            event.stopPropagation();
            event.preventDefault();
        }, true);
    }
    
    function addAnchorListener(ma) {
        ma.addEventListener('click', function(event) {
            mapX = gpsX;
            mapY = gpsY;
            tableWidth = Math.floor((document.body.clientWidth - 100) / 100);
            tableHeight = Math.floor((document.body.clientHeight - 50) / 100);
            var mt = createTable();
            document.body.appendChild(mt);
            
            //stop the click from activating the anchor
            event.stopPropagation();
            event.preventDefault();
        }, true);
    }
}

function getMapInfoArray() {
    var mapInfo = "Bird Boulevard|0,0|c0*Palprey Road Police Dept|1,0|c12*St Danilo's Church|2,0|c7*a cemetery|3,0|c37*a carpark|4,0|c3*Hewett Library|5,0|c11*Geldart Square|6,0|c0*Hardwick Row Railway Station|7,0|c35*the Bullimore Arms|8,0|c10*Bourdillon Library|9,0|c11*Dickason Towers|10,0|c17*Sindercombe Park|11,0|c4*the Akehurst Building|12,0|c2*a factory|13,0|c18*the Selley Building|14,0|c20*Spark Crescent|15,0|c0*Alaway Cinema|16,0|c14*Capel Drive|17,0|c0*the Gingell Building|18,0|c2*Hobhouse Drive|19,0|c0*Burchill Alley|20,0|c0*Pitman Mansion|21,0|c25*Pitman Mansion|22,0|c25*Sibree Plaza|23,0|c0*the Bearnard Museum|24,0|c34*Pottenger Plaza|25,0|c0*Halse Place Railway Station|26,0|c35*the Buckenham Building|27,0|c2*wasteland|28,0|c8*Baber Towers|29,0|c17*Exell Cinema|30,0|c14*Wilkes Boulevard|31,0|c0*Leaves Avenue|32,0|c0*Dalley Drive|33,0|c0*Train Row Police Dept|34,0|c12*the Purt Motel|35,0|c30*Club Lenton|36,0|c27*New Auto Repair|37,0|c15*Madill Towers|38,0|c17*St Marcellin's Church|39,0|c7*wasteland|40,0|c8*Carner Way Police Dept|41,0|c12*a carpark|42,0|c3*Nursey Bank|43,0|c21*Wolsey Crescent Fire Station|44,0|c13*St Alfred's Hospital|45,0|c9*Ivyleafe Way|46,0|c0*wasteland|47,0|c8*a junkyard|48,0|c29*a warehouse|49,0|c38*wasteland|50,0|c8*a factory|51,0|c18*the Sheehan Building|52,0|c2*a factory|53,0|c18*a junkyard|54,0|c29*Carr Place|55,0|c0*Maber Avenue|56,0|c0*Tolman Lane|57,0|c0*a carpark|58,0|c3*Hird Grove|59,0|c0*a junkyard|60,0|c29*the Mallows Building|61,0|c2*Geyskens Alley|62,0|c0*a factory|63,0|c18*Gillow Drive|64,0|c0*a carpark|65,0|c3*the Harry Motel|66,0|c30*Foan Drive|67,0|c0*the Syred Motel|68,0|c30*Prickett Street Fire Station|69,0|c13*the Blount Monument|70,0|c28*Murrell Avenue|71,0|c0*the Waltham Arms|72,0|c10*Bruce Boulevard Railway Station|73,0|c35*Simpkins Bank|74,0|c21*Tipper Road|75,0|c0*wasteland|76,0|c8*Yea Bank|77,0|c21*Finn Alley|78,0|c0*Cooke Cinema|79,0|c14*St Alfred's Hospital|80,0|c9*a junkyard|81,0|c29*the Elcomb Building|82,0|c2*Club Meatyard|83,0|c27*Mor Road|84,0|c0*Luffman Grove|85,0|c0*Club Farrel|86,0|c27*St Dunstan's Church|87,0|c7*Nash Park|88,0|c4*Barlow Avenue|89,0|c0*Club Mold|90,0|c27*wasteland|91,0|c8*a factory|92,0|c18*Oake Walk Police Dept|93,0|c12*the Naisbitt Building|94,0|c2*Clewett Alley Police Dept|95,0|c12*Spicer Row Police Dept|96,0|c12*the Beale Building|97,0|c20*Leeson Alley|98,0|c0*Troubridge Cinema|99,0|c14*the Norgan Building|0,1|c2*Patridge Grove|1,1|c0*Club Ogburn|2,1|c27*Gatley Drive|3,1|c0*Seamour Crescent|4,1|c0*Merivale Crescent|5,1|c0*St Ansgar's Hospital|6,1|c9*a warehouse|7,1|c38*a warehouse|8,1|c38*Cuthbert Auto Repair|9,1|c15*wasteland|10,1|c8*Firth Square|11,1|c0*Dike Avenue|12,1|c0*a warehouse|13,1|c38*Haw Library|14,1|c11*wasteland|15,1|c8*Pople Avenue Railway Station|16,1|c35*the Barclay Museum|17,1|c34*Peres Library|18,1|c11*Shilling Place|19,1|c0*Duggan Auto Repair|20,1|c15*Pitman Mansion|21,1|c25*Pitman Mansion|22,1|c25*a warehouse|23,1|c38*Chitty Cinema|24,1|c14*the Murley Building|25,1|c2*Eastmont Street|26,1|c0*the Evett Building|27,1|c20*the Yea Building|28,1|c2*the Haslock Building|29,1|c20*Yeatman Boulevard Fire Station|30,1|c13*Cribb Cinema|31,1|c14*Club Gaze|32,1|c27*Seaward Road|33,1|c0*Guttridge Park|34,1|c4*a carpark|35,1|c3*Lavor Park|36,1|c4*Pyncombes Plaza|37,1|c0*Gapper Street|38,1|c0*Tigwell Street|39,1|c0*the Spankling Building|40,1|c2*Mahoney Plaza Police Dept|41,1|c12*Codman Alley Railway Station|42,1|c35*the Genge Monument|43,1|c28*the Gilmore Motel|44,1|c30*Schonlau Walk|45,1|c0*a junkyard|46,1|c29*a junkyard|47,1|c29*Club Hefferin|48,1|c27*Merson Street|49,1|c0*Barrat Lane|50,1|c0*Chadwick Lane|51,1|c0*wasteland|52,1|c8*Broad Boulevard Railway Station|53,1|c35*Swearse Road|54,1|c0*a carpark|55,1|c3*Adlam Cinema|56,1|c14*Fenwyk Plaza Police Dept|57,1|c12*the Bareham Arms|58,1|c10*Stranks Walk Railway Station|59,1|c35*the Thompson Building|60,1|c2*Peppe Alley|61,1|c0*Samuel Boulevard|62,1|c0*the Gaffney Building|63,1|c2*Cutler Towers|64,1|c17*the Dobin Building|65,1|c2*Sommerfield Grove|66,1|c0*Coutts Park|67,1|c4*Crees Avenue|68,1|c0*Leighton Way|69,1|c0*a junkyard|70,1|c29*Shuffery Cinema|71,1|c14*Lynewraye Auto Repair|72,1|c15*the Mooney Building|73,1|c2*a junkyard|74,1|c29*Izzard Walk|75,1|c0*Doig Avenue|76,1|c0*McCandy Avenue|77,1|c0*Fooks Alley|78,1|c0*Angus Towers|79,1|c17*Underhill Square|80,1|c0*Moberly Library|81,1|c11*the Otero Building|82,1|c2*the Higgdon Museum|83,1|c34*a junkyard|84,1|c29*Cull Avenue Police Dept|85,1|c12*Tikanoff Park|86,1|c4*Mallard Towers|87,1|c17*a cemetery|88,1|c37*a junkyard|89,1|c29*Howell Library|90,1|c11*Andow Towers|91,1|c17*Lovel Way|92,1|c0*the Perryn Building|93,1|c2*Cullen Way|94,1|c0*a warehouse|95,1|c38*Bellot Street|96,1|c0*Mogridge Drive|97,1|c0*Hamerton Road|98,1|c0*the Trood Building|99,1|c20*Sinkins Auto Repair|0,2|c15*Scorse Plaza|1,2|c0*Voules Walk|2,2|c0*Pavey Place School|3,2|c36*Cranton Library|4,2|c11*Glastonbury Alley|5,2|c0*Ditcher Lane|6,2|c0*Heward Towers|7,2|c17*Bedford Street|8,2|c0*the Boucher Arms|9,2|c10*the Haley Arms|10,2|c10*Hardyman Library|11,2|c11*a factory|12,2|c18*the Phillipps Building|13,2|c2*Dawney Grove Railway Station|14,2|c35*Craig Park|15,2|c4*the Deanesly Museum|16,2|c34*Maney Drive|17,2|c0*St Vladimir's Church|18,2|c7*Hambridge Park|19,2|c4*Ethelwyn Plaza|20,2|c0*Winters Place|21,2|c0*Stiby Boulevard|22,2|c0*Moudry Grove|23,2|c0*St Alberic's Church|24,2|c7*a cemetery|25,2|c37*Augarde Street Police Dept|26,2|c12*Gully Walk|27,2|c0*Stambury Plaza School|28,2|c36*Pulling Road|29,2|c0*Jacquet Way|30,2|c0*the Lombard Monument|31,2|c28*Club Hannam|32,2|c27*the Sandy Building|33,2|c2*the Every Building|34,2|c2*the Fowle Museum|35,2|c34*Godfry Street|36,2|c0*Clement Park|37,2|c4*Coole Avenue|38,2|c0*the Hamlin Building|39,2|c2*a junkyard|40,2|c29*Wescombe Cinema|41,2|c14*Hateley Avenue|42,2|c0*the Herridge Hotel|43,2|c30*the Eastwood Building|44,2|c2*a junkyard|45,2|c29*the Scarman Building|46,2|c2*Meade Walk Railway Station|47,2|c35*Whalen Place School|48,2|c36*a junkyard|49,2|c29*Lockwood Park|50,2|c4*Club Bussicott|51,2|c27*Whittle Row|52,2|c0*the Corless Arms|53,2|c10*Luckraft Avenue|54,2|c0*Clarkson Lane|55,2|c0*Dennett Lane|56,2|c0*Latter Walk Railway Station|57,2|c35*Hamlin Way|58,2|c0*Duckworth Drive|59,2|c0*Dann Drive|60,2|c0*Gamlen Square School|61,2|c36*a warehouse|62,2|c38*Alven Crescent|63,2|c0*Colles Park|64,2|c4*a carpark|65,2|c3*Cembrowicz Cinema|66,2|c14*Pattle Way|67,2|c0*Smeeth Library|68,2|c11*Gotobed Library|69,2|c11*Purchase Road|70,2|c0*Elphick Walk|71,2|c0*the Hockin Building|72,2|c2*Perry Library|73,2|c11*a factory|74,2|c18*Stoy Avenue Fire Station|75,2|c13*the Kilpatrick Motel|76,2|c30*wasteland|77,2|c8*Stammers Drive Railway Station|78,2|c35*the Molton Hotel|79,2|c30*Cowgall Avenue|80,2|c0*Lahey Towers|81,2|c17*Meetcham Drive Fire Station|82,2|c13*wasteland|83,2|c8*Devenish Avenue|84,2|c0*Sawtell Road|85,2|c0*Tinkler Plaza School|86,2|c36*the Floyd Monument|87,2|c28*a factory|88,2|c18*Attrell Avenue|89,2|c0*Purt Avenue|90,2|c0*the Bridgman Building|91,2|c20*Muncey Street|92,2|c0*Beach Walk|93,2|c0*the Turvill Building|94,2|c2*Weston Crescent Fire Station|95,2|c13*Anne General Hospital|96,2|c9*the Much Arms|97,2|c10*St Barbara's Church|98,2|c7*a cemetery|99,2|c37*the Emberson Building|0,3|c2*the Dibbin Building|1,3|c2*wasteland|2,3|c8*Dovey Boulevard Fire Station|3,3|c13*a warehouse|4,3|c38*Owens Walk|5,3|c0*Tomkins Bank|6,3|c21*McDougall Cinema|7,3|c14*the Yelling Building|8,3|c2*the Hodgkins Arms|9,3|c10*Sillence Walk Police Dept|10,3|c12*Freake Grove|11,3|c0*Putt Library|12,3|c11*Rhodes Grove|13,3|c0*Trafford Way|14,3|c0*Gulliver Alley|15,3|c0*a factory|16,3|c18*Kemble Alley School|17,3|c36*a cemetery|18,3|c37*Kening Square|19,3|c0*the Balchin Building|20,3|c20*Farmer Boulevard|21,3|c0*Ponder Auto Repair|22,3|c15*the Milnerr Building|23,3|c20*Club Furnell|24,3|c27*the Elson Building|25,3|c2|p*Summers Towers|26,3|c17*Kembry Boulevard Fire Station|27,3|c13*the Bendall Building|28,3|c2*the Norcliffe Building|29,3|c2*Estlin Square|30,3|c0*the Dalgliesh Monument|31,3|c28*Crost Avenue|32,3|c0*Dorothey Plaza Police Dept|33,3|c12*St Andrew's Church|34,3|c7*a cemetery|35,3|c37*Club Cranfield|36,3|c27*Maskell Plaza|37,3|c0*the Pepperell Monument|38,3|c28*the Fowles Museum|39,3|c34*a carpark|40,3|c3*the Brazey Building|41,3|c2*Baynton Park|42,3|c4*the Hocking Monument|43,3|c28*Cookesley Walk Fire Station|44,3|c13*Plummer Library|45,3|c11*Rago Cinema|46,3|c14*Trott Plaza|47,3|c0*Kemys Way School|48,3|c36*wasteland|49,3|c8*Club Bennetts|50,3|c27*the Lethbridge Building|51,3|c2*Hooke Auto Repair|52,3|c15*a junkyard|53,3|c29*St Maximillian's Church|54,3|c7*Trickey Lane|55,3|c0*Frankham Avenue School|56,3|c36*a junkyard|57,3|c29*Hoskins Place|58,3|c0*Sindercombe Grove|59,3|c0*the Roadnight Building|60,3|c2*Atkinson Walk|61,3|c0*Blom Crescent|62,3|c0*Younge Lane|63,3|c0*Reeve Alley|64,3|c0*wasteland|65,3|c8*Ruse Library|66,3|c11*Webley Crescent|67,3|c0*Helliar Place|68,3|c0*the Clack Building|69,3|c2*the Nickells Building|70,3|c2*Kellett Row|71,3|c0*a factory|72,3|c18*Clare General Hospital|73,3|c9*Blandy Lane|74,3|c0*the Acourt Arms|75,3|c10*Lancey Row|76,3|c0*the Bruce Building|77,3|c2*wasteland|78,3|c8*Dymock Alley|79,3|c0*Darbey Cinema|80,3|c14*Hindmarsh Row Police Dept|81,3|c12*Standfast Plaza|82,3|c0*a junkyard|83,3|c29*Billinghurst Place Police Dept|84,3|c12*St Matheos's Church|85,3|c7*the Brain Museum|86,3|c34*the Garard Building|87,3|c2*Bargery Square|88,3|c0*the Wallbutton Building|89,3|c20*Townsend Bank|90,3|c21*Waddington Towers|91,3|c17*a warehouse|92,3|c38*St Anacletus's Hospital|93,3|c9*wasteland|94,3|c8*Downe Towers|95,3|c17*a carpark|96,3|c3*a factory|97,3|c18*Nott Auto Repair|98,3|c15*wasteland|99,3|c8*Club Magee|0,4|c27*Wilmott Row|1,4|c0*Turpin Crescent|2,4|c0*the Tobit Arms|3,4|c10*the Doyne Hotel|4,4|c30*a junkyard|5,4|c29*Bissley Bank|6,4|c21*Turnock Place|7,4|c0*Hopes Library|8,4|c11*Alderson Street|9,4|c0*Stowell Road|10,4|c0*a factory|11,4|c18*the Govier Arms|12,4|c10*Delacombe Street|13,4|c0*wasteland|14,4|c8*Stowell Crescent|15,4|c0*a junkyard|16,4|c29*Cavendish Towers|17,4|c17*a junkyard|18,4|c29*Kilburn Drive|19,4|c0*a warehouse|20,4|c38*Holloms Boulevard Railway Station|21,4|c35*a carpark|22,4|c3*Cleal Cinema|23,4|c14*Mare Way|24,4|c0*Weaver Auto Repair|25,4|c15*Gulledge Walk|26,4|c0*the Willmott Motel|27,4|c30*Cornford Cinema|28,4|c14*a warehouse|29,4|c38*wasteland|30,4|c8*Liminton Plaza|31,4|c0*the Badman Building|32,4|c2*Neot General Hospital|33,4|c9*Bowerman Way|34,4|c0*a carpark|35,4|c3*Game Bank|36,4|c21*a factory|37,4|c18*the Read Museum|38,4|c34*Hartleys Lane|39,4|c0*Gimblett Bank|40,4|c21*Yeriod Bank|41,4|c21*a warehouse|42,4|c38*Challenger Crescent Police Dept|43,4|c12*Chitty Walk|44,4|c0*the Pegrum Monument|45,4|c28*a warehouse|46,4|c38*the Channing Building|47,4|c2*wasteland|48,4|c8*Troake Road|49,4|c0*Nutt Avenue|50,4|c0*a factory|51,4|c18*Adalbert General Hospital|52,4|c9*Bulleid Square|53,4|c0*Gillycuddy Boulevard|54,4|c0*the Braddick Building|55,4|c2|p*Courage Avenue|56,4|c0*a warehouse|57,4|c38*wasteland|58,4|c8*wasteland|59,4|c8*Willy Auto Repair|60,4|c15*Tame Way School|61,4|c36*Bentley Street|62,4|c0*Heywood Walk|63,4|c0*Ford Cinema|64,4|c14*Bagehot Cinema|65,4|c14*Jelly Alley|66,4|c0*Curton Mansion|67,4|c25*Curton Mansion|68,4|c25*Hingley Cinema|69,4|c14*Buckenham Road|70,4|c0*Coathupe Library|71,4|c11*a factory|72,4|c18*Box Plaza|73,4|c0*the Flowar Building|74,4|c2|p*Battell Walk|75,4|c0*a factory|76,4|c18*Gaisford Cinema|77,4|c14*Sivewright Boulevard|78,4|c0*Club Webley|79,4|c27*Thorp Towers|80,4|c17*the Bizzell Building|81,4|c2*Pask Walk|82,4|c0*wasteland|83,4|c8*a junkyard|84,4|c29*Lockwood Walk|85,4|c0*wasteland|86,4|c8*Salter Grove Railway Station|87,4|c35*Orome Avenue|88,4|c0*the Carlyle Building|89,4|c20*wasteland|90,4|c8*the Pepperell Museum|91,4|c34*Duport Avenue|92,4|c0*Silley Plaza|93,4|c0*Parrott Towers|94,4|c17|p*the Speak Motel|95,4|c30*the Holdway Museum|96,4|c34*Midelton Crescent Police Dept|97,4|c12*Clerck Walk|98,4|c0*Byers Walk|99,4|c0*Wale Walk Police Dept|0,5|c12*Buckinham Lane|1,5|c0*a warehouse|2,5|c38*St Bartholomew's Hospital|3,5|c9*the Buttle Building|4,5|c2|p*Montacute Place|5,5|c0*the Oakes Museum|6,5|c34*Andow Square|7,5|c0*wasteland|8,5|c8*Imber Road Railway Station|9,5|c35*Club Normandare|10,5|c27*Club Gayler|11,5|c27*Philp Drive|12,5|c0*Alven Boulevard|13,5|c0*Holton Lane|14,5|c0*the Grime Arms|15,5|c10*Haile Street|16,5|c0*a factory|17,5|c18*wasteland|18,5|c8*a warehouse|19,5|c38*the Hellear Building|20,5|c2*wasteland|21,5|c8*wasteland|22,5|c8*Roche Plaza|23,5|c0*the Boait Monument|24,5|c28*Heward Square|25,5|c0*St Alcuin's Church|26,5|c7*a cemetery|27,5|c37*wasteland|28,5|c8*a junkyard|29,5|c29*the Lax Museum|30,5|c34*Cowen Road Fire Station|31,5|c13*St Ethelbert's Church|32,5|c7*the Pearl Arms|33,5|c10*the Overton Museum|34,5|c34*Ashcroft Way|35,5|c0*Shire Crescent|36,5|c0*Bozon Road School|37,5|c36*the Pridham Building|38,5|c2*Woolf Park|39,5|c4*the Flynn Motel|40,5|c30*Havenhand Boulevard|41,5|c0*St Jude's Hospital|42,5|c9*a warehouse|43,5|c38*Colsworthy Street|44,5|c0*Alphege General Hospital|45,5|c9*the Havill Motel|46,5|c30*Weary Library|47,5|c11*Sparey Plaza|48,5|c0*Ireland Drive|49,5|c0*wasteland|50,5|c8*St Barnabas's Church|51,5|c7*the McLean Monument|52,5|c28*Costen Way|53,5|c0*Steeds Bank|54,5|c21*Muxlow Lane|55,5|c0*Henniker Road|56,5|c0*Bollans Walk|57,5|c0*Gainard Place Police Dept|58,5|c12*the Chafy Monument|59,5|c28*Vince Lane|60,5|c0*Hanna Drive|61,5|c0*Rickett Plaza|62,5|c0*Briant Lane|63,5|c0*Hathway Park|64,5|c4*Woodard Square|65,5|c0*St Louis's Hospital|66,5|c9*Curton Mansion|67,5|c25*Curton Mansion|68,5|c25*the Haslock Building|69,5|c20*Mee Library|70,5|c11*the Adney Hotel|71,5|c30*the Finlay Building|72,5|c2*St Telesphorus's Church|73,5|c7*St Telesphorus's Church|74,5|c7*Goodwyn Avenue School|75,5|c36*Meecham Towers|76,5|c17*Devonshire Square|77,5|c0*Sheapperd Library|78,5|c11*the Wortley Building|79,5|c20*Wilmut Crescent|80,5|c0*St Alban's Hospital|81,5|c9*Milne Park|82,5|c4*the Devonshire Building|83,5|c20*a carpark|84,5|c3*the Guiday Monument|85,5|c28*a factory|86,5|c18*St Mark's Hospital|87,5|c9*a factory|88,5|c18*Gable Walk Fire Station|89,5|c13*Club Cocker|90,5|c27*Gibb Plaza Railway Station|91,5|c35*the Whitlock Building|92,5|c20*MacKlin Park|93,5|c4*the Gouger Arms|94,5|c10*Noblett Drive|95,5|c0*Woodborn Avenue|96,5|c0*wasteland|97,5|c8*Newnam Avenue|98,5|c0*wasteland|99,5|c8*a warehouse|0,6|c38*the Gristwood Hotel|1,6|c30*Swearse Lane Police Dept|2,6|c12*a factory|3,6|c18*Owsley Alley|4,6|c0*Petvin Place|5,6|c0*a warehouse|6,6|c38*a carpark|7,6|c3*Woolsett Avenue|8,6|c0*Rodges Grove|9,6|c0*Wells Towers|10,6|c17*the Oxenbury Building|11,6|c2*Courage Library|12,6|c11*the Borland Museum|13,6|c34*a junkyard|14,6|c29*Woodroffe Grove|15,6|c0*the Shears Building|16,6|c20*the Grenter Building|17,6|c2*Riggs Plaza|18,6|c0*Copless Lane School|19,6|c36*Pittey Way|20,6|c0*Mounter Cinema|21,6|c14*Hedges Avenue School|22,6|c36*Bridger Towers|23,6|c17*the Gunningham Motel|24,6|c30*Gurden Drive|25,6|c0*Sowth Auto Repair|26,6|c15*St Benedict's Hospital|27,6|c9*Foy Towers|28,6|c17*Toomer Auto Repair|29,6|c15*the Humpfries Arms|30,6|c10*wasteland|31,6|c8*Wilsdon Row|32,6|c0*Bowdage Auto Repair|33,6|c15*Lowther Lane Fire Station|34,6|c13*the Lapley Building|35,6|c2|p*Caffin Street|36,6|c0*the Edgar Museum|37,6|c34*St Francis's Church|38,6|c7*a junkyard|39,6|c29*Anastasius General Hospital|40,6|c9*Vimpany Auto Repair|41,6|c15*St Anthony's Church|42,6|c7*a cemetery|43,6|c37*the Digby Building|44,6|c2|p*the Southworth Arms|45,6|c10*the Mays Monument|46,6|c28*wasteland|47,6|c8*Silwood Row|48,6|c0*Tidcombe Plaza|49,6|c0*the Parsons Hotel|50,6|c30*Spare Grove|51,6|c0*Montgomery Towers|52,6|c17*Liddiard Towers|53,6|c17*the Hollwey Arms|54,6|c10*the Rothwell Hotel|55,6|c30*the Wheadon Museum|56,6|c34*Counsell Auto Repair|57,6|c15*the Deller Arms|58,6|c10*Stoodely Street|59,6|c0*Rodges Stadium|60,6|c16*Rodges Stadium|61,6|c16*the Henshaw Monument|62,6|c28*Kempe Way School|63,6|c36|p*Sweetapple Boulevard|64,6|c0*wasteland|65,6|c8*Gapper Place Railway Station|66,6|c35*a carpark|67,6|c3*the Firminger Hotel|68,6|c30*the Surtees Building|69,6|c2*a warehouse|70,6|c38*the Gage Museum|71,6|c34*Etheldreda General Hospital|72,6|c9*a factory|73,6|c18*the Chandler Monument|74,6|c28*Comins Street|75,6|c0*Shufflebotham Boulevard Fire Station|76,6|c13*the Eldredge Building|77,6|c2*Weeks Crescent School|78,6|c36*Ames Plaza|79,6|c0*St Helier's Hospital|80,6|c9*the Uglow Building|81,6|c2*the Upshall Monument|82,6|c28*the Parks Building|83,6|c2*Lindell Grove|84,6|c0*the Anstruther Building|85,6|c2|p*the Ablett Arms|86,6|c10*Sealy Grove|87,6|c0*the Cabble Monument|88,6|c28*the Starr Building|89,6|c20*the Nurley Museum|90,6|c34*a factory|91,6|c18*Bruorton Drive|92,6|c0*Heddington Walk Railway Station|93,6|c35*Thornhill Alley|94,6|c0*Bullor Avenue|95,6|c0*Marsh Avenue|96,6|c0*Oatley Bank|97,6|c21*Rayfield Lane|98,6|c0*the Gatehouse Building|99,6|c2*Hogue Street|0,7|c0*a junkyard|1,7|c29*Lomas Boulevard Fire Station|2,7|c13*Woodborne Crescent|3,7|c0*wasteland|4,7|c8*Tossell Walk|5,7|c0*a junkyard|6,7|c29*Tolly Library|7,7|c11*Ledger Avenue|8,7|c0*the Blackman Building|9,7|c2*Freake Avenue|10,7|c0*Batton Row Railway Station|11,7|c35*Board Walk|12,7|c0*Smallwood Crescent School|13,7|c36*the MacVicar Building|14,7|c2|p*St Paschal's Church|15,7|c7*Club Febrey|16,7|c27*Campbell Road|17,7|c0*Shilling Place|18,7|c0*the Crang Hotel|19,7|c30*St Marcellin's Church|20,7|c7*Club Beauchamp|21,7|c27*Marshfield Auto Repair|22,7|c15*Hellear Alley|23,7|c0*the Cator Museum|24,7|c34*a junkyard|25,7|c29*Prankard Road|26,7|c0*St Cunigunde's Church|27,7|c7*Emerson Plaza Police Dept|28,7|c12*Chilcott Auto Repair|29,7|c15*Purnell Avenue|30,7|c0*the Cowie Museum|31,7|c34*Whelton Row|32,7|c0*the Brandon Building|33,7|c2*Coate Boulevard School|34,7|c36*a junkyard|35,7|c29*St Columba's Hospital|36,7|c9*St Wulfstan's Church|37,7|c7*a cemetery|38,7|c37*Wickstead Cinema|39,7|c14*the Porcher Building|40,7|c2*the Stapellton Arms|41,7|c10*the Lynn Monument|42,7|c28*Donovan Square|43,7|c0*Dawes Walk|44,7|c0*Poulet Grove|45,7|c0*Packham Alley|46,7|c0*a factory|47,7|c18*the Sheppard Building|48,7|c20*a junkyard|49,7|c29*the Leary Building|50,7|c2*Martha General Hospital|51,7|c9*the Smith Arms|52,7|c10*a carpark|53,7|c3*wasteland|54,7|c8*a warehouse|55,7|c38*the Sidney Arms|56,7|c10*Grimstead Boulevard Police Dept|57,7|c12*the Little Motel|58,7|c30*a carpark|59,7|c3*Rodges Stadium|60,7|c16*Rodges Stadium|61,7|c16*Melbourne Way|62,7|c0*a junkyard|63,7|c29*a junkyard|64,7|c29*wasteland|65,7|c8*Bealey Boulevard School|66,7|c36*Cradock Row Fire Station|67,7|c13*Club Budd|68,7|c27*wasteland|69,7|c8*Dudoc Street|70,7|c0*Club Swabey|71,7|c27*Boord Place|72,7|c0*Sweet Grove|73,7|c0*Doveton Alley|74,7|c0*Attewill Bank|75,7|c21*the Greswell Museum|76,7|c34*Pullinger Auto Repair|77,7|c15*Seton Road|78,7|c0*the Coomer Building|79,7|c2*Amatt Boulevard|80,7|c0*Club Hagan|81,7|c27*wasteland|82,7|c8*Wickett Place|83,7|c0*a factory|84,7|c18*Tompsett Library|85,7|c11*Spirrell Street|86,7|c0*Craske Park|87,7|c4*Fitzgerald Lane|88,7|c0*the Spenser Museum|89,7|c34*Fleming Library|90,7|c11*a carpark|91,7|c3*Treweeke Mall|92,7|c6*Treweeke Mall|93,7|c6*Thresh Row|94,7|c0*Spencer Row|95,7|c0*a carpark|96,7|c3*a junkyard|97,7|c29*Hinge Drive|98,7|c0*the Pilton Building|99,7|c2*St Matthias's Church|0,8|c7*Jeffries Auto Repair|1,8|c15*Britton Park|2,8|c4*wasteland|3,8|c8*the Beal Building|4,8|c2*the Chitty Hotel|5,8|c30*Leeworthy Park|6,8|c4*the Pask Building|7,8|c20*Calderwood Plaza|8,8|c0*Meleady Plaza|9,8|c0*Gargery Crescent|10,8|c0*the Huish Building|11,8|c2*wasteland|12,8|c8*the Duane Building|13,8|c2*the Perren Hotel|14,8|c30*a cemetery|15,8|c37*the Shelmerdine Building|16,8|c2*the Orman Building|17,8|c2*the Ready Building|18,8|c2*Hogue Street|19,8|c0*wasteland|20,8|c8*a cemetery|21,8|c37*Rapps Alley|22,8|c0*the Coymer Museum|23,8|c34*the Rason Hotel|24,8|c30*Whalen Drive|25,8|c0*Springford Drive|26,8|c0*Penney Way|27,8|c0*Ramsdale Lane|28,8|c0*Rowley Road|29,8|c0*Ivyleafe Row Police Dept|30,8|c12*Bessant Auto Repair|31,8|c15*Club Backholer|32,8|c27*the Brundrit Building|33,8|c2*Cooling Avenue|34,8|c0*Blandy Avenue|35,8|c0*Lyne Road|36,8|c0*Reaston Plaza|37,8|c0*Bromwich Cinema|38,8|c14*Abot Drive|39,8|c0*Huddleston Avenue|40,8|c0*a carpark|41,8|c3*Braddon Way|42,8|c0*Cassell Auto Repair|43,8|c15*Knyps Drive|44,8|c0*Bayley Street|45,8|c0*wasteland|46,8|c8*Ambrose Lane|47,8|c0*Beedall Cinema|48,8|c14*Southall Mansion|49,8|c25*Southall Mansion|50,8|c25*Rolls Road Police Dept|51,8|c12*Whitin Drive|52,8|c0*St Henry's Church|53,8|c7*the Classey Monument|54,8|c28*Gully Library|55,8|c11*Clothier Lane|56,8|c0*Tozer Auto Repair|57,8|c15*the Lambley Building|58,8|c20*the Godwin Motel|59,8|c30*Frognal Park|60,8|c4*Oatley Street|61,8|c0*Parrott Plaza|62,8|c0*the Harenc Building|63,8|c20*the Bythesea Monument|64,8|c28*the Cheatle Motel|65,8|c30*the Bucknall Motel|66,8|c30*Roger Plaza|67,8|c0*a junkyard|68,8|c29*Boobyer Walk|69,8|c0*Dauncey Park|70,8|c4*a carpark|71,8|c3*Horrigan Street Fire Station|72,8|c13*Combe Lane|73,8|c0*a factory|74,8|c18*Westmacott Row|75,8|c0*Royal Way Railway Station|76,8|c35*Franks Avenue|77,8|c0*St Adrian's Hospital|78,8|c9*Bean Square|79,8|c0*the Edridge Museum|80,8|c34*a carpark|81,8|c3*Woodland Cinema|82,8|c14*Club Knyps|83,8|c27*Woodman Grove|84,8|c0*Club Greene|85,8|c27*a factory|86,8|c18*the Rendell Monument|87,8|c28*Marcellus General Hospital|88,8|c9*a factory|89,8|c18*Club Dowell|90,8|c27*Ray Alley|91,8|c0*Treweeke Mall|92,8|c6*Treweeke Mall|93,8|c6*Pirrie Place|94,8|c0*Tovey Place|95,8|c0*the Slade Arms|96,8|c10*Hagger Way|97,8|c0*Blaise General Hospital|98,8|c9*McNally Park|99,8|c4*Stobbart Walk Police Dept|0,9|c12*Freeth Auto Repair|1,9|c15*the Crespin Building|2,9|c2*Tyack Row|3,9|c0*Chadwick Towers|4,9|c17*Atkinson Square|5,9|c0*Hazeldine Square|6,9|c0*the Troakes Monument|7,9|c28*Snook Alley Railway Station|8,9|c35*Whitesides Row|9,9|c0*the Perrott Museum|10,9|c34*wasteland|11,9|c8*wasteland|12,9|c8*Retallick Walk|13,9|c0*Sartin Row|14,9|c0*Elmund Cinema|15,9|c14*Greenway Place|16,9|c0*the Sibree Building|17,9|c2*St Humphrey's Hospital|18,9|c9*the Devonshire Building|19,9|c2*Tuckwood Cinema|20,9|c14*the Whitehouse Monument|21,9|c28*Maddocks Drive Fire Station|22,9|c13*a carpark|23,9|c3*Verrell Crescent|24,9|c0*Calvert Mall|25,9|c6*Calvert Mall|26,9|c6*Anstruther Road|27,9|c0*a factory|28,9|c18*Dowell Library|29,9|c11*Nikolai General Hospital|30,9|c9*Boulting Avenue|31,9|c0*Durston Walk School|32,9|c36*the Haskett Building|33,9|c2*Eaglesfield Library|34,9|c11*Self Avenue|35,9|c0*the Goodridge Building|36,9|c2*the Longman Monument|37,9|c28*Dolling Road|38,9|c0*wasteland|39,9|c8*Latcham Library|40,9|c11*Anning Avenue|41,9|c0*Nation Library|42,9|c11*Bale Mall|43,9|c6*Bale Mall|44,9|c6*St Matthew's Hospital|45,9|c9*Barton Lane|46,9|c0*the Loveless Building|47,9|c2*St Philip's Church|48,9|c7*Southall Mansion|49,9|c25*Southall Mansion|50,9|c25*a warehouse|51,9|c38*Hammet Way|52,9|c0*a cemetery|53,9|c37*Hiscock Alley|54,9|c0*a junkyard|55,9|c29*the Terrill Arms|56,9|c10*Sambone Library|57,9|c11*Club Sheapperd|58,9|c27*Church Square|59,9|c0*the Norgate Monument|60,9|c28*a warehouse|61,9|c38*the Crooker Arms|62,9|c10*Millward Street|63,9|c0*St Timothy's Church|64,9|c7*the Wester Building|65,9|c2*Hibberd Avenue|66,9|c0*Dunstan General Hospital|67,9|c9*a carpark|68,9|c3*Haskett Alley|69,9|c0*the Carslake Monument|70,9|c28*a warehouse|71,9|c38*Clinker Drive|72,9|c0*Swansborough Road Fire Station|73,9|c13*the Eddington Motel|74,9|c30*Martlew Park|75,9|c4*the Hemore Building|76,9|c2*wasteland|77,9|c8*Orlando Square|78,9|c0*Tossell Lane|79,9|c0*Attewill Way|80,9|c0*the Robotier Building|81,9|c2*the Fletcher Motel|82,9|c30*wasteland|83,9|c8*Pownall Cinema|84,9|c14*Doswell Lane|85,9|c0*Nichols Drive|86,9|c0*Clipper Grove Railway Station|87,9|c35*Nulty Auto Repair|88,9|c15*Brittan Walk|89,9|c0*Club Garrett|90,9|c27*Hoskyns Alley|91,9|c0*the Masters Museum|92,9|c34*Pegrum Place Police Dept|93,9|c12*Muirhead Avenue Railway Station|94,9|c35*Caffin Library|95,9|c11*the Dycer Hotel|96,9|c30*Maud Walk|97,9|c0*Roadnight Towers|98,9|c17*Stembridge Crescent Fire Station|99,9|c13*a carpark|0,10|c3*a warehouse|1,10|c38*Jelly Avenue|2,10|c0*a factory|3,10|c18*Newport Alley|4,10|c0*Kilpatrick Cinema|5,10|c14*Sowth Road|6,10|c0*Nositer Crescent|7,10|c0*the Pilling Building|8,10|c20*Applegate Alley|9,10|c0*a carpark|10,10|c3*wasteland|11,10|c8*a factory|12,10|c18*Pippen Grove|13,10|c0*the Methuen Monument|14,10|c28*Wilmott Row|15,10|c0*St Joachim's Church|16,10|c7*a junkyard|17,10|c29*Brodribb Way|18,10|c0*a carpark|19,10|c3*Lean Drive|20,10|c0*Syms Road|21,10|c0*Eyres Way|22,10|c0*Huckman Alley|23,10|c0*McEvoy Drive Railway Station|24,10|c35*Calvert Mall|25,10|c6*Calvert Mall|26,10|c6*Club Wadman|27,10|c27*Club Henley|28,10|c27*Theodore General Hospital|29,10|c9*Milard Park|30,10|c4*a factory|31,10|c18*Chadwick Park|32,10|c4*Holly Cinema|33,10|c14*the Cholmondeley Hotel|34,10|c30*Merryweather Plaza|35,10|c0*Lock Boulevard Police Dept|36,10|c12*Borrows Bank|37,10|c21*Berrow Road Fire Station|38,10|c13*Norris Bank|39,10|c21*the Innalls Museum|40,10|c34*Band Square|41,10|c0*St Spyridon's Church|42,10|c7*Bale Mall|43,10|c6*Bale Mall|44,10|c6*the Dawbin Museum|45,10|c34*Boyes Park|46,10|c4*Ainslie Auto Repair|47,10|c15*Dorrington Road Railway Station|48,10|c35*a factory|49,10|c18*Ames Row|50,10|c0*Helliar Alley|51,10|c0*Elkins Plaza Railway Station|52,10|c35*the Harris Museum|53,10|c34*St Dionysius's Hospital|54,10|c9*a factory|55,10|c18*the Odingsells Building|56,10|c2*Bide Bank|57,10|c21*Dawes Street|58,10|c0*the Lazenbury Building|59,10|c20*Mander Plaza School|60,10|c36*the Hoddinott Motel|61,10|c30*the Morgane Building|62,10|c20*the Toop Building|63,10|c2*St Anastasius's Church|64,10|c7*Barling Boulevard Fire Station|65,10|c13*Harbin Square|66,10|c0*Orders Crescent Police Dept|67,10|c12*a warehouse|68,10|c38*Abraham General Hospital|69,10|c9*the Peete Museum|70,10|c34*Westley Row|71,10|c0*wasteland|72,10|c8*a warehouse|73,10|c38*the Vickery Arms|74,10|c10*Crudge Walk|75,10|c0*Fleay Road|76,10|c0*Pask Way|77,10|c0*Preddy Grove|78,10|c0*the Lentill Museum|79,10|c34*Phillipps Grove Railway Station|80,10|c35*Tennear Lane|81,10|c0*Broke Bank|82,10|c21*Goringe Way|83,10|c0*a factory|84,10|c18*a carpark|85,10|c3*Wray Towers|86,10|c17*Eaves Drive|87,10|c0*a carpark|88,10|c3*Dennehy Lane|89,10|c0*Dancey Alley|90,10|c0*Brokbury Row Fire Station|91,10|c13*Tanner Auto Repair|92,10|c15*Sirl Plaza|93,10|c0*St Odile's Church|94,10|c7*a factory|95,10|c18*Whish Way|96,10|c0*Lentell Walk Police Dept|97,10|c12*Leigh Walk|98,10|c0*the Prior Monument|99,10|c28*Membry Grove|0,11|c0*Bodilly Alley Railway Station|1,11|c35*Smythe Alley School|2,11|c36*wasteland|3,11|c8*Gillow Drive|4,11|c0*Meacham Bank|5,11|c21*the Carse Building|6,11|c2*Murtaugh Towers|7,11|c17*Lowndes Square|8,11|c0*Club Santler|9,11|c27*a warehouse|10,11|c38*Howard Towers|11,11|c17*Nugent Walk|12,11|c0*Meecham Plaza|13,11|c0*the Perceval Building|14,11|c20*Colglough Library|15,11|c11*a cemetery|16,11|c37*a junkyard|17,11|c29*Ormrod Avenue Railway Station|18,11|c35*the Walbridge Monument|19,11|c28*a junkyard|20,11|c29*Dunster Lane|21,11|c0*Sawtell Walk Railway Station|22,11|c35*St Cyprian's Hospital|23,11|c9*Fyfe Drive|24,11|c0*the Challes Museum|25,11|c34*Hains Street|26,11|c0*Clinton Way|27,11|c0*the Clack Monument|28,11|c28*wasteland|29,11|c8*Aplin Towers|30,11|c17*Barton Avenue|31,11|c0*Reginaldus Square Railway Station|32,11|c35*Fooks Lane|33,11|c0*Vagg Road|34,11|c0*Baillie Square|35,11|c0*Vivian Walk|36,11|c0*Stringfellow Plaza|37,11|c0*Dennett Walk School|38,11|c36*wasteland|39,11|c8*St Celestine's Church|40,11|c7*Club Botting|41,11|c27*the Surridge Building|42,11|c2*Orders Street|43,11|c0*a junkyard|44,11|c29*Bolwell Walk|45,11|c0*a factory|46,11|c18*the Beckey Arms|47,11|c10*Moorhouse Place Police Dept|48,11|c12*the Eatwell Hotel|49,11|c30*Vauden Road|50,11|c0*a factory|51,11|c18*the Bumbrough Building|52,11|c2*a factory|53,11|c18*Powlett Road Police Dept|54,11|c12*the Rowe Building|55,11|c2*Hoby Walk|56,11|c0*Faulkner Way|57,11|c0*the Stoward Monument|58,11|c28*Pinchen Road Police Dept|59,11|c12*Holway Crescent|60,11|c0*Elwes Drive|61,11|c0*St Henry's Hospital|62,11|c9*Skarin Way Fire Station|63,11|c13*the Sawday Arms|64,11|c10*the Marshall Monument|65,11|c28*Haggard Towers|66,11|c17*Dimmock Square|67,11|c0*Club Bellam|68,11|c27*St Paschal's Church|69,11|c7*a cemetery|70,11|c37*the Spurrier Arms|71,11|c10*the Roynon Building|72,11|c2*a warehouse|73,11|c38*Whitlock Boulevard School|74,11|c36*Mays Way|75,11|c0*Lacey Walk|76,11|c0*the Griffen Building|77,11|c2*Attrill Boulevard School|78,11|c36*a carpark|79,11|c3*Bird Lane|80,11|c0*a factory|81,11|c18*Merchant Bank|82,11|c21*a factory|83,11|c18*Scammell Park|84,11|c4*Kerswill Street|85,11|c0*Risdon Towers|86,11|c17*Powell Square|87,11|c0*a warehouse|88,11|c38*Cruickshank Square|89,11|c0*the Backholer Museum|90,11|c34*the Sunderland Museum|91,11|c34*Farmer Walk|92,11|c0*the Waish Building|93,11|c20*Spitter Walk Railway Station|94,11|c35*Sadley Way Fire Station|95,11|c13*Huddlestone Square|96,11|c0*the Jewell Museum|97,11|c34*Bearcrofte Bank|98,11|c21*the Petvin Museum|99,11|c34*Henslow Street School|0,12|c36*Warley Alley|1,12|c0*Beard Place|2,12|c0*a warehouse|3,12|c38*Gazzard Avenue School|4,12|c36*the Frauley Building|5,12|c20*Club Whitelock|6,12|c27*Milard Lane|7,12|c0*Date Row Railway Station|8,12|c35*a warehouse|9,12|c38*Hewlett Boulevard Railway Station|10,12|c35*St Arnold's Church|11,12|c7*Hollard Park|12,12|c4*wasteland|13,12|c8*the Bubwith Hotel|14,12|c30*Brentnall Grove Police Dept|15,12|c12*the Hebdon Museum|16,12|c34*Busby Walk|17,12|c0*Maria General Hospital|18,12|c9*Boggis Avenue|19,12|c0*Eatwell Walk Fire Station|20,12|c13*Hillard Walk|21,12|c0*Luch Road|22,12|c0*a carpark|23,12|c3*Grenter Square|24,12|c0*a carpark|25,12|c3*a carpark|26,12|c3*a junkyard|27,12|c29*Hagger Way|28,12|c0*the Gulledge Museum|29,12|c34*a factory|30,12|c18*Newis Drive Railway Station|31,12|c35*Merchant Crescent Police Dept|32,12|c12*Dalzell Square|33,12|c0*Club Cust|34,12|c27*Cobden Way|35,12|c0*St Piran's Church|36,12|c7*Perrie Square Fire Station|37,12|c13*Wheare Boulevard|38,12|c0*a junkyard|39,12|c29*a cemetery|40,12|c37*Harkness Street|41,12|c0*the Style Building|42,12|c20*a warehouse|43,12|c38*a warehouse|44,12|c38*a warehouse|45,12|c38*Bergman Square|46,12|c0*Willmington Towers|47,12|c17*Purcell Avenue|48,12|c0*Milnerr Crescent School|49,12|c36*a factory|50,12|c18*a junkyard|51,12|c29*Nestle Way|52,12|c0*Vines Place|53,12|c0*Ridyard Plaza|54,12|c0*the Talbott Arms|55,12|c10*the Mewburn Arms|56,12|c10*Chicke Walk|57,12|c0*Cavendish Bank|58,12|c21*Prigg Alley|59,12|c0*St Athanasius's Church|60,12|c7*Mussabini Square|61,12|c0*the Harnett Building|62,12|c20*Bares Park|63,12|c4*wasteland|64,12|c8*St Paul's Church|65,12|c7*Southall Library|66,12|c11*Lovibond Towers|67,12|c17*a carpark|68,12|c3*Birt Crescent Fire Station|69,12|c13*Newbould Place|70,12|c0*Tratham Place|71,12|c0*Dungey Alley Police Dept|72,12|c12*wasteland|73,12|c8*Sambone Walk Railway Station|74,12|c35*Rodham Grove|75,12|c0*the Lance Building|76,12|c20*Homer Street|77,12|c0*the Lyman Motel|78,12|c30*Maiden Towers|79,12|c17*Horsford Park|80,12|c4*Broadbent Plaza Railway Station|81,12|c35*wasteland|82,12|c8*a carpark|83,12|c3*Cayley Library|84,12|c11*a carpark|85,12|c3*St Anne's Church|86,12|c7*St Peter's Church|87,12|c7*the McMurtrie Building|88,12|c2*Younghusband Square Police Dept|89,12|c12*Chaffie Lane School|90,12|c36*Liminton Plaza|91,12|c0*Bamford Park|92,12|c4*Batten Drive|93,12|c0*Club Godfry|94,12|c27*Flooks Grove|95,12|c0*St Matthias's Church|96,12|c7*the Squires Building|97,12|c2*Newcombe Towers|98,12|c17*a junkyard|99,12|c29*a carpark|0,13|c3*Ladd Park|1,13|c4*the Hoddinott Building|2,13|c2*the Pollard Building|3,13|c2*Maddaford Square|4,13|c0*the Millett Building|5,13|c2*Havercroft Park|6,13|c4*the Stretchbury Monument|7,13|c28*the Wadden Building|8,13|c2*the Claines Building|9,13|c2*Dancey Towers|10,13|c17*a cemetery|11,13|c37*Loaring Grove|12,13|c0*Alaway Row|13,13|c0*the Boylin Arms|14,13|c10*Shervord Place|15,13|c0*Budgen Lane|16,13|c0*the Ive Museum|17,13|c34*Bickersteth Row|18,13|c0*the Furneaux Building|19,13|c2*wasteland|20,13|c8*Israel Walk|21,13|c0*Maundrill Grove|22,13|c0*Scobell Crescent|23,13|c0*Lamport Walk Police Dept|24,13|c12*Trebble Lane|25,13|c0*Don Cinema|26,13|c14*Woolacott Street|27,13|c0*Tillard Street|28,13|c0*St Silverius's Church|29,13|c7*wasteland|30,13|c8*Applin Towers|31,13|c17*a junkyard|32,13|c29*Fedden Park|33,13|c4*Gready Street|34,13|c0*Sampson Lane|35,13|c0*a cemetery|36,13|c37*Club Roles|37,13|c27*Saywell Towers|38,13|c17*Morrow Park|39,13|c4*Deverell Walk|40,13|c0*a warehouse|41,13|c38*Birfutt Walk|42,13|c0*Wallen Alley|43,13|c0*a carpark|44,13|c3*Shippard Walk|45,13|c0*Workman Towers|46,13|c17|p*Hockey Way|47,13|c0*Wilmington Cinema|48,13|c14*a junkyard|49,13|c29*the Combs Building|50,13|c2*Empson Lane|51,13|c0*Walmsley Lane|52,13|c0*Club Groom|53,13|c27*the Holborn Monument|54,13|c28*the Saint Building|55,13|c20*Club Spirod|56,13|c27*the Leggatt Hotel|57,13|c30*Grenville Street|58,13|c0*Carse Street|59,13|c0*St Irenaeus's Church|60,13|c7*St Irenaeus's Church|61,13|c7*St Juan's Church|62,13|c7*the Mansbridge Building|63,13|c2*the Goldsworthy Building|64,13|c20*Headford Way School|65,13|c36*a cemetery|66,13|c37*St Mary's Church|67,13|c7*Hanson Lane|68,13|c0*Morrow Lane|69,13|c0*McDonnell Cinema|70,13|c14*a warehouse|71,13|c38*Evelyn Square|72,13|c0*Denbee Bank|73,13|c21*the Carew Museum|74,13|c34|p*Curtice Avenue|75,13|c0*Perrot Cinema|76,13|c14*a warehouse|77,13|c38*Cocker Boulevard Fire Station|78,13|c13*the Jacobi Hotel|79,13|c30*Sonven Towers|80,13|c17*Dunsdon Lane|81,13|c0*a junkyard|82,13|c29*Brewin Lane|83,13|c0*Brymer Avenue|84,13|c0*Baylie Library|85,13|c11*wasteland|86,13|c8*a cemetery|87,13|c37*a cemetery|88,13|c37*wasteland|89,13|c8*Witherell Crescent|90,13|c0*the Lancastle Building|91,13|c2*Willett Square|92,13|c0*the Farbrother Building|93,13|c2|p*a warehouse|94,13|c38*Medway Street|95,13|c0*Acott Crescent|96,13|c0*Lanning Lane|97,13|c0*Wyld Towers|98,13|c17*Morliere Towers|99,13|c17*Burke Place|0,14|c0*the Donaldson Building|1,14|c2*Minall Lane|2,14|c0*the Ashcroft Hotel|3,14|c30*Garson Towers|4,14|c17|p*the Martland Museum|5,14|c34*Botreux Bank|6,14|c21*Limberye Walk|7,14|c0*Club Tarring|8,14|c27*a junkyard|9,14|c29*Mules Walk Railway Station|10,14|c35*the Drewer Monument|11,14|c28*Higgin Square Fire Station|12,14|c13*the MacCarthy Building|13,14|c2|p*the Organ Arms|14,14|c10*St Wilfrid's Hospital|15,14|c9*Cridge Alley Railway Station|16,14|c35*Burcham Bank|17,14|c21*wasteland|18,14|c8*the Partington Monument|19,14|c28*a junkyard|20,14|c29*Terrill Lane|21,14|c0*Dolbridge Street|22,14|c0*Dorman Way|23,14|c0*Pinchin Plaza|24,14|c0*a carpark|25,14|c3*Flower Park|26,14|c4*a warehouse|27,14|c38*a junkyard|28,14|c29*Boorman Way Police Dept|29,14|c12*Hain Library|30,14|c11*wasteland|31,14|c8*Upsdale Plaza|32,14|c0*Banton Lane|33,14|c0*Killinger Walk|34,14|c0*the Darknell Museum|35,14|c34*Thair Place|36,14|c0*a warehouse|37,14|c38*Ayliffe Drive|38,14|c0*Poulet Place|39,14|c0*the Hampton Arms|40,14|c10*Hambridge Alley School|41,14|c36*Cator Drive|42,14|c0*Hume Walk|43,14|c0*wasteland|44,14|c8*a warehouse|45,14|c38*Tazewell Walk|46,14|c0*Childs Park|47,14|c4*Pantling Towers|48,14|c17*St Alexander's Church|49,14|c7*a cemetery|50,14|c37*a factory|51,14|c18*a factory|52,14|c18*a warehouse|53,14|c38*the Markes Hotel|54,14|c30*Restrick Auto Repair|55,14|c15*the Prangnell Building|56,14|c2*the Arch Building|57,14|c2*a carpark|58,14|c3*Sanderson Plaza|59,14|c0*the Cummings Building|60,14|c2*Farthing Way|61,14|c0*Club Markey|62,14|c27*the Vacher Building|63,14|c2*wasteland|64,14|c8*the Hasell Museum|65,14|c34*a factory|66,14|c18*Bant Lane|67,14|c0*Dullea Way|68,14|c0*Cambridge Walk|69,14|c0*the Stewkely Arms|70,14|c10*Dyer Avenue|71,14|c0*Mellish Way|72,14|c0*Pincombe Grove|73,14|c0*Helland Cinema|74,14|c14*St Mark's Church|75,14|c7*St Luke's Church|76,14|c7*Mist Library|77,14|c11*the Dickin Building|78,14|c2*the Stanley Monument|79,14|c28*Whitlock Road|80,14|c0*Vyse Crescent|81,14|c0*Hartley Library|82,14|c11*the Gummer Arms|83,14|c10*Kelloway Drive Railway Station|84,14|c35*Bullor Library|85,14|c11*Lugg Street|86,14|c0*the Batt Arms|87,14|c10*Lovell Auto Repair|88,14|c15*St Herman's Hospital|89,14|c9*Kempshaw Street|90,14|c0*the Clewett Building|91,14|c20*Youl Avenue Railway Station|92,14|c35*the Holt Building|93,14|c2*Mermagen Street|94,14|c0*Millerd Walk Fire Station|95,14|c13*Croom Towers|96,14|c17*the Mapstone Building|97,14|c2*St Bartholomew's Hospital|98,14|c9*Hewitt Way|99,14|c0*Walrond Place Fire Station|0,15|c13*a factory|1,15|c18*Grist Crescent Railway Station|2,15|c35*the Gilesi Building|3,15|c20*Hecks Street|4,15|c0*Esgar Auto Repair|5,15|c15*a junkyard|6,15|c29*Ratcliffe Street|7,15|c0*the Whitlock Monument|8,15|c28*Hackwell Drive|9,15|c0*the Perriam Museum|10,15|c34*Scievell Place|11,15|c0*the Farnol Arms|12,15|c10*Maney Library|13,15|c11*Flynn Road|14,15|c0*wasteland|15,15|c8*wasteland|16,15|c8*Bargery Square|17,15|c0*the Critchell Building|18,15|c2*MacDonald Way|19,15|c0*Club Pears|20,15|c27*Conybear Road|21,15|c0*the Pounsett Building|22,15|c2*Elin Way|23,15|c0*Pulsford Road|24,15|c0*a carpark|25,15|c3*St Godric's Hospital|26,15|c9*Rankin Road|27,15|c0*a junkyard|28,15|c29*Club Hallson|29,15|c27*the Talbot Museum|30,15|c34*a factory|31,15|c18*the Legg Museum|32,15|c34*the Marfell Building|33,15|c20*Look Road|34,15|c0*Bu Crescent Railway Station|35,15|c35*a factory|36,15|c18*Obern Library|37,15|c11*Kevern Row Police Dept|38,15|c12*Budden Street|39,15|c0*Pittey Towers|40,15|c17*Club Dallimore|41,15|c27*Peterken Grove|42,15|c0*the Garnsey Building|43,15|c2*Hinks Crescent Police Dept|44,15|c12*a warehouse|45,15|c38*Goodfellow Way|46,15|c0*Garner Row|47,15|c0*a warehouse|48,15|c38*Creeber Drive|49,15|c0*a junkyard|50,15|c29*wasteland|51,15|c8*Mallows Walk|52,15|c0*Harford Avenue|53,15|c0*Retallick Walk Police Dept|54,15|c12*Burman Street|55,15|c0*the Jeffrey Building|56,15|c20*Doe Avenue Police Dept|57,15|c12*the Prankerd Building|58,15|c2*Baggs Cinema|59,15|c14*the Stollery Arms|60,15|c10*a factory|61,15|c18*the Bertrand Building|62,15|c2*Minchinton Alley|63,15|c0*Moncrieffe Cinema|64,15|c14*St Romuald's Church|65,15|c7|p*Dunk Avenue|66,15|c0*the Heale Building|67,15|c2*Rollings Lane|68,15|c0*the Pattin Building|69,15|c2*Sharkey Bank|70,15|c21*Hardinge Row Railway Station|71,15|c35*a factory|72,15|c18*Stringer Street|73,15|c0*the Quinton Monument|74,15|c28*Bidgway Walk|75,15|c0*wasteland|76,15|c8*Marsh Alley|77,15|c0*Pillinger Auto Repair|78,15|c15*St Seraphim's Hospital|79,15|c9*St Romuald's Church|80,15|c7*Collis Street|81,15|c0*Goodson Towers|82,15|c17*Banfield Park|83,15|c4*Roles Way Railway Station|84,15|c35*Mare Towers|85,15|c17|p*Club Tompson|86,15|c27*Club Webbe|87,15|c27*Land Park|88,15|c4*a junkyard|89,15|c29*St Ninian's Hospital|90,15|c9*Gilles Park|91,15|c4*Ludwell Lane Fire Station|92,15|c13*the Keats Museum|93,15|c34*Wedmore Grove|94,15|c0*the Inman Building|95,15|c20*a factory|96,15|c18*Sands Road|97,15|c0*Foulkes Street|98,15|c0*Greenley Alley|99,15|c0*a factory|0,16|c18*a junkyard|1,16|c29*Withy Walk|2,16|c0*Row Drive|3,16|c0*Cleeves Way|4,16|c0*the Gatley Building|5,16|c2*a junkyard|6,16|c29*Melbourne Square Fire Station|7,16|c13*Cosway Bank|8,16|c21*the Purt Building|9,16|c20*Galvin Plaza|10,16|c0*a warehouse|11,16|c38*a warehouse|12,16|c38*Bampfield Road|13,16|c0*Griffen Way|14,16|c0*St Josephine's Church|15,16|c7*Veresmith Boulevard School|16,16|c36*the Ludlow Building|17,16|c20*the Gibbens Building|18,16|c2*Hiscock Walk|19,16|c0*Egleton Walk|20,16|c0*Bignal Lane|21,16|c0*Dover Way|22,16|c0*a junkyard|23,16|c29*St Maximillian's Church|24,16|c7|p*Monk Walk|25,16|c0*Sly Way|26,16|c0*Scard Grove|27,16|c0*Smyth Boulevard|28,16|c0*wasteland|29,16|c8*Garmston Bank|30,16|c21*the Keats Hotel|31,16|c30*the Cope Building|32,16|c2*Besly Avenue Police Dept|33,16|c12*Fabian General Hospital|34,16|c9*the Buckrell Building|35,16|c2|p*William Avenue Police Dept|36,16|c12*Club Haber|37,16|c27*the Stoodely Museum|38,16|c34*a junkyard|39,16|c29*Club Taviner|40,16|c27*Catherine General Hospital|41,16|c9*Collins Avenue|42,16|c0*Pippen Auto Repair|43,16|c15*Littlehales Road|44,16|c0*the Whatmore Building|45,16|c20*the Garrett Building|46,16|c2*Edgerton Cinema|47,16|c14*the Toller Monument|48,16|c28*Newbould Place Police Dept|49,16|c12*wasteland|50,16|c8*Club Hinge|51,16|c27*Winsloe Towers|52,16|c17*Ferrington Way School|53,16|c36*Hector Square|54,16|c0*Smith Towers|55,16|c17|p*Barford Way|56,16|c0*St William's Church|57,16|c7*Horner Way|58,16|c0*wasteland|59,16|c8*Higgins Place|60,16|c0*Club Collyer|61,16|c27*Willmot Place|62,16|c0*Donegan Bank|63,16|c21*Pashen Way|64,16|c0*Webb Library|65,16|c11*the Jack Building|66,16|c20*Rowlings Row|67,16|c0*Simper Towers|68,16|c17*Wootton Square|69,16|c0*Farrer Grove|70,16|c0*the Trigg Arms|71,16|c10*the Woolven Building|72,16|c20*Blaxall Auto Repair|73,16|c15*Obern Plaza|74,16|c0*the Peerless Arms|75,16|c10*Blatcher Lane School|76,16|c36*MacKenzie Place|77,16|c0*the Mines Building|78,16|c2*Grove Boulevard|79,16|c0*a cemetery|80,16|c37*wasteland|81,16|c8*a factory|82,16|c18*the Lanhdon Building|83,16|c2*wasteland|84,16|c8*Club Brien|85,16|c27*the Fevin Monument|86,16|c28*Rolls Avenue|87,16|c0*wasteland|88,16|c8*Schreiber Drive Police Dept|89,16|c12*a factory|90,16|c18*Otto Street|91,16|c0*Headland Street Fire Station|92,16|c13*Club Hardyman|93,16|c27*Featherstone Library|94,16|c11*Toombs Row|95,16|c0*Bourder Square|96,16|c0*Thick Park|97,16|c4*the Biggs Arms|98,16|c10*a junkyard|99,16|c29*St Cyprian's Church|0,17|c7*St Mary's Church|1,17|c7*Wyatt Cinema|2,17|c14*a carpark|3,17|c3*Monica General Hospital|4,17|c9*a carpark|5,17|c3*Gerrard Place Police Dept|6,17|c12*the Speak Motel|7,17|c30*Meaden Bank|8,17|c21*St Linus's Hospital|9,17|c9*Inder Park|10,17|c4*Corrie Square|11,17|c0*Hurford Alley|12,17|c0*Hyde Walk|13,17|c0*Garwood Road Railway Station|14,17|c35*the Hamlen Monument|15,17|c28*McDonnell Library|16,17|c11*Edmund General Hospital|17,17|c9*Herne Plaza|18,17|c0*Walmsley Lane|19,17|c0*Crawshaw Road|20,17|c0*Alder Cinema|21,17|c14*a warehouse|22,17|c38*Marriott Place School|23,17|c36*Mahagan Square Railway Station|24,17|c35*Gates Avenue|25,17|c0*Lightfoot Alley|26,17|c0*St Matthew's Hospital|27,17|c9*Blabey Park|28,17|c4*Brocklesby Boulevard|29,17|c0*the McDonnell Arms|30,17|c10*Wooman Avenue Railway Station|31,17|c35*wasteland|32,17|c8*Boddy Place|33,17|c0*Club Brookeman|34,17|c27*Wild Walk Police Dept|35,17|c12*Drake Walk|36,17|c0*Naish Square|37,17|c0*the Pattemore Building|38,17|c2*MacCarthy Square|39,17|c0*Fray Alley|40,17|c0*the Sambone Monument|41,17|c28*Holsgrove Row Police Dept|42,17|c12*Club Basson|43,17|c27*Thresh Grove School|44,17|c36*St Swithun's Church|45,17|c7*Beckley Walk|46,17|c0*Tinkler Street|47,17|c0*St Hugh's Church|48,17|c7*Rounsefell Library|49,17|c11*Alaway Place|50,17|c0*Noonan Avenue|51,17|c0*Cole Avenue|52,17|c0*Henslowe Park|53,17|c4*Tatchell Way|54,17|c0*the Muller Building|55,17|c20*Hind Grove|56,17|c0*Urben Towers|57,17|c17*Puckard Park|58,17|c4*the Henning Arms|59,17|c10*Sheehan Lane Police Dept|60,17|c12*the Pitcher Arms|61,17|c10*Fruin Alley|62,17|c0*Wey Row|63,17|c0*Sherwen Crescent|64,17|c0*the Halay Building|65,17|c20*the Dudridge Museum|66,17|c34*Freake Walk|67,17|c0*Mees Walk|68,17|c0*Burch Road School|69,17|c36*Breeden Way Police Dept|70,17|c12*Coopey Bank|71,17|c21*Montagu Cinema|72,17|c14*a factory|73,17|c18*wasteland|74,17|c8*wasteland|75,17|c8*Holwell Avenue|76,17|c0*Sykes Boulevard|77,17|c0*Goverd Park|78,17|c4*Rawkins Row Police Dept|79,17|c12*Salsbury Walk|80,17|c0*Downs Boulevard Fire Station|81,17|c13*Ayliffe Street Police Dept|82,17|c12*Club Cosenes|83,17|c27*Bromilow Library|84,17|c11*Horder Avenue School|85,17|c36*wasteland|86,17|c8*a carpark|87,17|c3*a warehouse|88,17|c38*the Burchell Arms|89,17|c10*Kitchingman Street Railway Station|90,17|c35*the Warner Building|91,17|c2*wasteland|92,17|c8*the Love Building|93,17|c2*wasteland|94,17|c8*the Rayment Arms|95,17|c10*Gatehouse Road|96,17|c0*Sellick Lane|97,17|c0*the Rowson Building|98,17|c2*the Adkins Motel|99,17|c30*the Grace Arms|0,18|c10*Buffery Street|1,18|c0*wasteland|2,18|c8*the Pinfield Building|3,18|c2*Weakley Square|4,18|c0*the Carslake Museum|5,18|c34*the Willia Hotel|6,18|c30*a carpark|7,18|c3*wasteland|8,18|c8*wasteland|9,18|c8*the Conybeare Monument|10,18|c28*the Billows Building|11,18|c2*the Halliday Building|12,18|c2*Joliffe Way|13,18|c0*wasteland|14,18|c8*wasteland|15,18|c8*Parrott Alley|16,18|c0*Park Way|17,18|c0*the Cuss Arms|18,18|c10*Fennessy Road Railway Station|19,18|c35*Barstow Walk|20,18|c0*Douglas Lane|21,18|c0*Edgar Alley|22,18|c0*Plummer Bank|23,18|c21*the Simons Building|24,18|c2*Smethurst Walk|25,18|c0*Spirrell Auto Repair|26,18|c15*Pedel Avenue Railway Station|27,18|c35*Spekington Drive|28,18|c0*Warrne Cinema|29,18|c14*the Frappell Building|30,18|c20*Riden Avenue|31,18|c0*Underwood Street Railway Station|32,18|c35*Catton Square|33,18|c0*Caudwell Road|34,18|c0*Rollason Crescent|35,18|c0*Bubcar Road Fire Station|36,18|c13*Adler Crescent|37,18|c0*the Godden Building|38,18|c20*a carpark|39,18|c3*Goodfellow Boulevard|40,18|c0*Faber Lane Fire Station|41,18|c13*St Godric's Church|42,18|c7*a cemetery|43,18|c37*a warehouse|44,18|c38*a cemetery|45,18|c37*Baillie Walk|46,18|c0*Club McClean|47,18|c27*Gatchell Alley|48,18|c0*the Serrell Building|49,18|c20*a warehouse|50,18|c38*Digby Towers|51,18|c17*Bodd Library|52,18|c11*Southerwood Square|53,18|c0*Garnsey Cinema|54,18|c14*Donnan Drive|55,18|c0*Bayley Lane|56,18|c0*Wilks Road|57,18|c0*Ingham Avenue|58,18|c0*Poulet Grove|59,18|c0*Club Jeffreys|60,18|c27*Peaty Avenue Railway Station|61,18|c35*Tabor Plaza|62,18|c0*Bastard Street|63,18|c0*the Hebditch Building|64,18|c2*Tindell Walk|65,18|c0*Chibbett Lane Fire Station|66,18|c13*Brendon Auto Repair|67,18|c15*Lyde Drive|68,18|c0*a carpark|69,18|c3*Freke Square|70,18|c0*Balmain Cinema|71,18|c14*a warehouse|72,18|c38*Bagehot Way Police Dept|73,18|c12*St Michael's Church|74,18|c7*Fynn Drive|75,18|c0*Ambrose Avenue|76,18|c0*Birfutt Square|77,18|c0*the Egleton Building|78,18|c2*Uttermare Grove|79,18|c0*St Arnold's Church|80,18|c7*a cemetery|81,18|c37*Hardy Row|82,18|c0*Windle Crescent|83,18|c0*the Riddell Museum|84,18|c34*a warehouse|85,18|c38*Copeland Alley|86,18|c0*Beele Walk|87,18|c0*wasteland|88,18|c8*Armstead Library|89,18|c11*Morrhall Alley|90,18|c0*the Margetts Museum|91,18|c34*wasteland|92,18|c8*Groser Crescent Police Dept|93,18|c12*Rawle Alley|94,18|c0*a warehouse|95,18|c38*a carpark|96,18|c3*Boone Place|97,18|c0*Couch Boulevard School|98,18|c36*Caple Library|99,18|c11*Flew Lane School|0,19|c36*a junkyard|1,19|c29*Wyche Bank|2,19|c21*the Vellacott Museum|3,19|c34*St Dismas's Hospital|4,19|c9*Owers Way|5,19|c0*Hemburrow Library|6,19|c11*" +
        "the Dudoc Hotel|7,19|c30*a warehouse|8,19|c38*the Cavendish Building|9,19|c2*Jesse Place|10,19|c0*the Osbaldeston Building|11,19|c2*Horn Drive School|12,19|c36*Thom Grove|13,19|c0*the Peet Building|14,19|c20*St Basil's Church|15,19|c7*a warehouse|16,19|c38*the Westover Monument|17,19|c28*Bennett Way|18,19|c0*Tripick Lane|19,19|c0*the Whish Building|20,19|c2*Sayce Park|21,19|c4*Chudleigh Library|22,19|c11*the Allford Arms|23,19|c10*wasteland|24,19|c8*Bates Park|25,19|c4*Blanford Auto Repair|26,19|c15*Glass Library|27,19|c11*St John's Church|28,19|c7*wasteland|29,19|c8*Mounter Avenue|30,19|c0*St Marcellus's Church|31,19|c7*Fishwick Park|32,19|c4*Obern Towers|33,19|c17*Tennear Lane|34,19|c0*Ayliffe Row Railway Station|35,19|c35*Temperley Drive|36,19|c0*the Blyth Building|37,19|c2*Vezard Towers|38,19|c17*a junkyard|39,19|c29*the Rostron Monument|40,19|c28*Tyson Auto Repair|41,19|c15*Club Nanning|42,19|c27*the Godolphin Building|43,19|c2*Caseley Cinema|44,19|c14*a junkyard|45,19|c29*Hanlon Square|46,19|c0*the Humpfries Arms|47,19|c10*Sliney Row|48,19|c0*the Tincknell Building|49,19|c2*Pester Way|50,19|c0*Berners Square|51,19|c0*Phillipps Row|52,19|c0*the Hitchcock Building|53,19|c2*the Hawksley Building|54,19|c20*Prouse Avenue School|55,19|c36*a carpark|56,19|c3*Voules Road|57,19|c0*the Teasdale Museum|58,19|c34*a carpark|59,19|c3*Ramsey Auto Repair|60,19|c15*Rousell Plaza|61,19|c0*Norie Bank|62,19|c21*the Fildes Building|63,19|c2*Templeton Bank|64,19|c21*Steed Crescent|65,19|c0*Meads Walk Railway Station|66,19|c35*Potts Bank|67,19|c21*Wetherell Row School|68,19|c36*wasteland|69,19|c8*wasteland|70,19|c8*Club Riste|71,19|c27*Mold Walk|72,19|c0*Atthill Street|73,19|c0*Gambling Place|74,19|c0*the Putt Building|75,19|c2*a factory|76,19|c18*a warehouse|77,19|c38*Walwyn Bank|78,19|c21*Merryweather Cinema|79,19|c14*the Gold Monument|80,19|c28*the Margesson Hotel|81,19|c30*a factory|82,19|c18*Silverius General Hospital|83,19|c9*Fanning Cinema|84,19|c14*Gillman Road Railway Station|85,19|c35*the Gwinn Building|86,19|c2*Giverd Street|87,19|c0*the Snooke Arms|88,19|c10*Pettey Square|89,19|c0*St Josephine's Church|90,19|c7*Kemble Lane Railway Station|91,19|c35*Kearney Drive|92,19|c0*the Sinclair Motel|93,19|c30*Tredger Place|94,19|c0*a junkyard|95,19|c29*the Mayled Arms|96,19|c10*a carpark|97,19|c3*wasteland|98,19|c8*Winsor Boulevard|99,19|c0*the Orr Building|0,20|c2*a junkyard|1,20|c29*the Coss Building|2,20|c2*Alkin Cinema|3,20|c14*the Hockey Museum|4,20|c34*Powell Place|5,20|c0*Tufton Lane|6,20|c0*Wookey Towers|7,20|c17*Peitevin Alley Railway Station|8,20|c35*Red Alley|9,20|c0*a factory|10,20|c18*Petty Place School|11,20|c36*the Purchas Building|12,20|c2*Pasker Place|13,20|c0*Gamlen Plaza|14,20|c0*a factory|15,20|c18*Lockwood Crescent School|16,20|c36*Rawlins Row|17,20|c0*Goudie Drive|18,20|c0*Kington Row|19,20|c0*Halse Crescent Police Dept|20,20|c12*the Brodribb Building|21,20|c2*Burdock Walk|22,20|c0*Howel Bank|23,20|c21*a factory|24,20|c18*Crossman Grove Police Dept|25,20|c12*Williames Bank|26,20|c21*Dustan Towers|27,20|c17*the Goodson Motel|28,20|c30*Taylor Bank|29,20|c21*Pauley Bank|30,20|c21*Shippard Place|31,20|c0*St Chad's Church|32,20|c7*a cemetery|33,20|c37*a warehouse|34,20|c38*Coplestone Bank|35,20|c21*the Butterell Arms|36,20|c10*the Coutts Building|37,20|c20*Holman Library|38,20|c11*a carpark|39,20|c3*Swallow Lane Police Dept|40,20|c12*Spence Row Police Dept|41,20|c12*Pattinson Plaza|42,20|c0*Olsen Plaza|43,20|c0*St Ita's Church|44,20|c7*a cemetery|45,20|c37*McCormack Square|46,20|c0*a factory|47,20|c18*Cherington Row|48,20|c0*the Higdon Building|49,20|c2*Honeycombe Drive|50,20|c0*Nurton Walk Fire Station|51,20|c13*Chenery Cinema|52,20|c14*Edmund General Hospital|53,20|c9*Nulty Lane|54,20|c0*Dunham Way|55,20|c0*Holroyd Bank|56,20|c21*Club Bu|57,20|c27*the Sowler Monument|58,20|c28*a junkyard|59,20|c29*Tope Way School|60,20|c36*the Ha Monument|61,20|c28*Club Scanlon|62,20|c27*Gleed Walk|63,20|c0*Langrishe Street|64,20|c0*Roft Park|65,20|c4*a factory|66,20|c18*Veryard Crescent|67,20|c0*the Vicari Building|68,20|c20*wasteland|69,20|c8*wasteland|70,20|c8*Elswood Bank|71,20|c21*the Stower Building|72,20|c2*Elgar Bank|73,20|c21*the Holmshaw Hotel|74,20|c30*Pullinger Boulevard|75,20|c0*Wain Auto Repair|76,20|c15*Ledward Auto Repair|77,20|c15*Club Pledger|78,20|c27*wasteland|79,20|c8*Ramsden Way Fire Station|80,20|c13*the Patterson Building|81,20|c20*Houlet Lane|82,20|c0*Harp Walk|83,20|c0*St Arnold's Hospital|84,20|c9*wasteland|85,20|c8*the Henson Museum|86,20|c34*the Eades Building|87,20|c2*a factory|88,20|c18*Mylrea Walk Police Dept|89,20|c12*a cemetery|90,20|c37*Morrhall Place School|91,20|c36*Abrahams Way|92,20|c0*Griff Grove|93,20|c0*Madden Library|94,20|c11*McKay Drive|95,20|c0*Rabani Way School|96,20|c36*the Douch Arms|97,20|c10*the Crampton Building|98,20|c20*the Cutte Building|99,20|c2*Habgood Avenue|0,21|c0*Mattick Walk Fire Station|1,21|c13*Channell Lane Fire Station|2,21|c13*Tipton Road|3,21|c0*the Stockham Monument|4,21|c28*Burchall Way|5,21|c0*Rush Grove|6,21|c0*Butson Boulevard School|7,21|c36*a carpark|8,21|c3*Kelher Park|9,21|c4*Newton Walk|10,21|c0*Lasbury Cinema|11,21|c14*Roadnight Auto Repair|12,21|c15*Lawrance Crescent School|13,21|c36*wasteland|14,21|c8*Regan Plaza|15,21|c0*Nettley Drive|16,21|c0*Strachan Lane|17,21|c0*Fowler Crescent Railway Station|18,21|c35*Golden Row|19,21|c0*Altham Row|20,21|c0*Yorke Grove|21,21|c0*Postlethwaite Crescent Fire Station|22,21|c13*the Cranfield Museum|23,21|c34*Dandison Auto Repair|24,21|c15*Nurten Avenue|25,21|c0*Freeman Towers|26,21|c17*the Stothert Building|27,21|c2*the Scaife Building|28,21|c2*Shehan Way Fire Station|29,21|c13*Roadnight Walk|30,21|c0*the Pears Building|31,21|c2*Troman Lane|32,21|c0*St Simon's Hospital|33,21|c9*St Anselm's Hospital|34,21|c9*Brabner Row School|35,21|c36*Attrell Road Fire Station|36,21|c13*Norvell Avenue Railway Station|37,21|c35*the Lewarn Arms|38,21|c10*the Fortt Monument|39,21|c28*a factory|40,21|c18*the Dampier Museum|41,21|c34*Nicks Grove|42,21|c0*Winstone Road|43,21|c0*the Hames Building|44,21|c2*Keane Street|45,21|c0*Fifoot Park|46,21|c4*Axworthy Way|47,21|c0*Selwood Row|48,21|c0*wasteland|49,21|c8*Hatchard Road|50,21|c0*Rodford Plaza|51,21|c0*a warehouse|52,21|c38*Allder Row|53,21|c0*Ranahan Library|54,21|c11*Farrant Crescent Police Dept|55,21|c12*a factory|56,21|c18*a junkyard|57,21|c29*Giffard Square|58,21|c0*the Gabe Building|59,21|c20*the Bogie Building|60,21|c2*Belgrave Library|61,21|c11*the Passley Building|62,21|c2*a warehouse|63,21|c38*Tett Road|64,21|c0*a junkyard|65,21|c29*Morriss Way|66,21|c0*a junkyard|67,21|c29*Keen Park|68,21|c4*James Street School|69,21|c36*Grime Walk|70,21|c0*Brearley Way|71,21|c0*Stallworthy Row|72,21|c0*Willington Row|73,21|c0*a junkyard|74,21|c29*Heskins Walk|75,21|c0*the Fishlock Monument|76,21|c28*the Cosenes Building|77,21|c2*wasteland|78,21|c8*a factory|79,21|c18*wasteland|80,21|c8*Morgane Auto Repair|81,21|c15*the Veasey Building|82,21|c2*a junkyard|83,21|c29*Barker Avenue|84,21|c0*the Chanter Museum|85,21|c34*Dimon Alley Railway Station|86,21|c35*Brooke Street|87,21|c0*the Vick Museum|88,21|c34*Rounds Grove|89,21|c0*Cranston Park|90,21|c4*the Hewetson Building|91,21|c2*the Feltham Monument|92,21|c28*Uglow Lane|93,21|c0*a warehouse|94,21|c38*Devenish Auto Repair|95,21|c15*a junkyard|96,21|c29*Horler Square|97,21|c0*the Hanrahan Building|98,21|c2*Milnerr Plaza|99,21|c0*the Baboneau Arms|0,22|c10*Finlay Walk|1,22|c0*Prouse Towers|2,22|c17*Bondfield Road|3,22|c0*the Elderfield Building|4,22|c2*Gidley Street|5,22|c0*Drave Walk|6,22|c0*Herrin Way|7,22|c0*Jayne Walk|8,22|c0*St Edith's Church|9,22|c7*the Rodges Building|10,22|c2*Carritt Drive|11,22|c0*St Luke's Hospital|12,22|c9*Barter Row Railway Station|13,22|c35*Pottenger Boulevard|14,22|c0*Bulmer Avenue|15,22|c0*Dight Walk|16,22|c0*a carpark|17,22|c3*Zuryk Lane|18,22|c0*Somerville Boulevard|19,22|c0*Bussell Way|20,22|c0*Wenmouth Park|21,22|c4*Lilly Square|22,22|c0*Piers Park|23,22|c4*the Rugvie Monument|24,22|c28*Lascelles Library|25,22|c11*Doon Avenue|26,22|c0*Teek Road|27,22|c0*Cottingham Plaza|28,22|c0*the Smithfield Building|29,22|c2*the Stonnard Building|30,22|c20*Yeatman Bank|31,22|c21*Wyles Bank|32,22|c21*Coley Towers|33,22|c17*a carpark|34,22|c3*wasteland|35,22|c8*Rutt Square Fire Station|36,22|c13*the Cheeke Building|37,22|c20*the Knyps Monument|38,22|c28*Hayes Place Railway Station|39,22|c35*Grandon Place Police Dept|40,22|c12*the Heathcote Building|41,22|c20*the Johnston Museum|42,22|c34*wasteland|43,22|c8*Stodgell Cinema|44,22|c14*the Hellyer Building|45,22|c20*the Ledamun Monument|46,22|c28*Blann Avenue|47,22|c0*Brent Place Fire Station|48,22|c13*Bridle Drive|49,22|c0*the Fifield Motel|50,22|c30*a junkyard|51,22|c29*wasteland|52,22|c8*the Whippey Building|53,22|c20*St Christopher's Church|54,22|c7*a junkyard|55,22|c29*Borde Bank|56,22|c21*Club Williames|57,22|c27*Greedy Street|58,22|c0*Grandfield Walk|59,22|c0*Peppe Street|60,22|c0*Solomon Lane Police Dept|61,22|c12*Notley Walk Fire Station|62,22|c13*St Wolfeius's Church|63,22|c7*the Hanna Monument|64,22|c28*a junkyard|65,22|c29*Haggett Place|66,22|c0*Adolphy Row Railway Station|67,22|c35*a warehouse|68,22|c38*Greenaway Way School|69,22|c36*Timmins Place|70,22|c0*a junkyard|71,22|c29*the Knight Arms|72,22|c10*Elbro Drive|73,22|c0*Brassington Plaza|74,22|c0*St Simplicius's Church|75,22|c7*Thicke Towers|76,22|c17*Club Birch|77,22|c27*Cotterrell Crescent Police Dept|78,22|c12*Beer Place School|79,22|c36*Larnach Bank|80,22|c21*a warehouse|81,22|c38*Bowdich Square|82,22|c0*Gwinn Walk|83,22|c0*the Buckrell Arms|84,22|c10*Gentles Square|85,22|c0*Curle Street|86,22|c0*Club Popham|87,22|c27*the Fone Arms|88,22|c10*the Mounter Arms|89,22|c10*Skarin Row Police Dept|90,22|c12*Hellear Boulevard Railway Station|91,22|c35*Morley Walk Police Dept|92,22|c12*Phippen Alley|93,22|c0*a warehouse|94,22|c38*the Hamblett Monument|95,22|c28*Hansford Street|96,22|c0*McDonell Towers|97,22|c17*the Tracey Arms|98,22|c10*Haggas Square Fire Station|99,22|c13*Fitkin Auto Repair|0,23|c15*Rainey Grove|1,23|c0*Pallaye Plaza|2,23|c0*Swinnerton Square Police Dept|3,23|c12*the Steel Motel|4,23|c30*the Harbord Arms|5,23|c10*wasteland|6,23|c8*the Avery Arms|7,23|c10*the Huxtable Building|8,23|c2*the Giblin Arms|9,23|c10*a cemetery|10,23|c37*St Mark's Church|11,23|c7*a cemetery|12,23|c37*the Loder Museum|13,23|c34*Apsey Library|14,23|c11*Kenefie Lane Police Dept|15,23|c12*Cuthbert General Hospital|16,23|c9*a junkyard|17,23|c29*Shutler Lane|18,23|c0*the Bowell Museum|19,23|c34*a junkyard|20,23|c29*the Farris Building|21,23|c2*Butt Road Railway Station|22,23|c35*Caplen Way|23,23|c0*the Hallett Building|24,23|c2*St Eutychian's Hospital|25,23|c9*Wheelhouse Auto Repair|26,23|c15*Sherriff Place|27,23|c0*the Waddington Building|28,23|c2*Tayler Lane Police Dept|29,23|c12*the Oakes Arms|30,23|c10*Goodhall Avenue|31,23|c0*Club Burningham|32,23|c27*the Tryme Building|33,23|c20*a warehouse|34,23|c38*Elers Auto Repair|35,23|c15*the Furlonger Building|36,23|c2*the Broadfoot Building|37,23|c2*Symmons Towers|38,23|c17*Luellin Lane Fire Station|39,23|c13*Heckworthy Drive|40,23|c0*Osmonton Road|41,23|c0*Pudsey Park|42,23|c4*a junkyard|43,23|c29*a warehouse|44,23|c38*a carpark|45,23|c3*the Crabbe Arms|46,23|c10*Prickett Road|47,23|c0*Say Square|48,23|c0*St Luke's Cathedral|49,23|cathedral*St Luke's Cathedral|50,23|cathedral*the Bridle Museum|51,23|c34*Stickling Mall|52,23|c6*Stickling Mall|53,23|c6*wasteland|54,23|c8*Lessey Lane Police Dept|55,23|c12*Bryan Walk|56,23|c0*Cleall Walk|57,23|c0*a carpark|58,23|c3*Hambeln Alley|59,23|c0*Riddick Plaza|60,23|c0*the Plowright Building|61,23|c20*the Hippisley Museum|62,23|c34*the Hanson Museum|63,23|c34*the Eadie Building|64,23|c2*Benjamin Alley|65,23|c0*the Muttlebury Arms|66,23|c10*the Scaife Building|67,23|c2*Tompsett Walk|68,23|c0*wasteland|69,23|c8*the Gaskell Building|70,23|c2*the Oxley Building|71,23|c2*Bythesea Alley|72,23|c0*Wharton Towers|73,23|c17*Cookesley Avenue|74,23|c0*Hands Row|75,23|c0*Chester Alley|76,23|c0*Sleeman Row|77,23|c0*Appelby Park|78,23|c4*Hambro Lane|79,23|c0*a warehouse|80,23|c38*the Lumb Building|81,23|c2*Oram Walk Police Dept|82,23|c12*the Brockliss Building|83,23|c2*Bending Auto Repair|84,23|c15*Edge Alley Railway Station|85,23|c35*Howse Street|86,23|c0*Wybrants Road|87,23|c0*France Grove|88,23|c0*St Aidan's Hospital|89,23|c9*St Odile's Hospital|90,23|c9*wasteland|91,23|c8*wasteland|92,23|c8*Danger Alley|93,23|c0*Upton Towers|94,23|c17*Gaiger Plaza|95,23|c0*a carpark|96,23|c3*a warehouse|97,23|c38*Davers Avenue|98,23|c0*Lord Boulevard Police Dept|99,23|c12*Haberfeild Drive|0,24|c0*a factory|1,24|c18*Fernie Walk|2,24|c0*Vasey Lane|3,24|c0*Houghton Towers|4,24|c17|p*Metcalfe Library|5,24|c11*Phipps Library|6,24|c11*the Lenthall Motel|7,24|c30*Chick Street|8,24|c0*the Brickenden Monument|9,24|c28*Coollen Lane School|10,24|c36*Baring Auto Repair|11,24|c15*Ramsey Road|12,24|c0*Downton Square|13,24|c0*Club Hodson|14,24|c27*Carpenter Grove|15,24|c0*Tennant Auto Repair|16,24|c15*Stringer Street|17,24|c0*wasteland|18,24|c8*Custard Lane School|19,24|c36*wasteland|20,24|c8*the Papps Building|21,24|c2*Hallinan Towers|22,24|c17*a junkyard|23,24|c29*Clissold Road|24,24|c0*Pirrie Park|25,24|c4*St Pius's Hospital|26,24|c9*Edbrooke Street|27,24|c0*Lance Towers|28,24|c17*the Bathe Building|29,24|c2*Club Vagg|30,24|c27*a carpark|31,24|c3*Darke Walk|32,24|c0*Evans Row Fire Station|33,24|c13*the Nettleton Building|34,24|c20*Postlethwaite Drive|35,24|c0*Hugo Walk|36,24|c0*Chidley Drive|37,24|c0*Battersby Road|38,24|c0*the Stoy Building|39,24|c2*Botting Square|40,24|c0*the Wormald Building|41,24|c2*the Chamberlain Building|42,24|c2*Wakeley Grove|43,24|c0*Author Avenue|44,24|c0*Vigour Walk|45,24|c0*Davie Walk|46,24|c0*the Schalch Building|47,24|c2*Kitting Walk Railway Station|48,24|c35*St Luke's Cathedral|49,24|cathedral*St Luke's Cathedral|50,24|cathedral*Slatter Crescent|51,24|c0*Stickling Mall|52,24|c6*Stickling Mall|53,24|c6*Hulme Park|54,24|c4*Deanesly Park|55,24|c4*Keedwell Plaza School|56,24|c36|p*the Soper Motel|57,24|c30*Aslin Crescent|58,24|c0*St Herman's Church|59,24|c7*the Sellar Building|60,24|c2*the Ingham Hotel|61,24|c30*Club Aisthorpe|62,24|c27*Monks Avenue|63,24|c0*Pask Crescent School|64,24|c36*the Amos Building|65,24|c2|p*wasteland|66,24|c8*Club Gapper|67,24|c27*St Marcus's Church|68,24|c7*Wolters Square|69,24|c0*Club Routh|70,24|c27*Club Bowerman|71,24|c27*Jarvie Road|72,24|c0*Forrest Park|73,24|c4*St Columbanus's Hospital|74,24|c9*Fox Street|75,24|c0*the Finch Monument|76,24|c28*a junkyard|77,24|c29*Botting Towers|78,24|c17*Sturmey Row|79,24|c0*Story Boulevard|80,24|c0*the Bradnam Arms|81,24|c10*Greensill Street|82,24|c0*a carpark|83,24|c3*Lang Drive|84,24|c0*Langford Way|85,24|c0*Yeatman Library|86,24|c11|p*the Cottell Arms|87,24|c10*Bray Boulevard|88,24|c0*Clift Drive|89,24|c0*Brentnall Walk School|90,24|c36*Sparrow Row|91,24|c0*Corp Boulevard Railway Station|92,24|c35*a warehouse|93,24|c38*Fyfe Avenue|94,24|c0*a warehouse|95,24|c38*the Halberry Museum|96,24|c34*a junkyard|97,24|c29*Carew Avenue|98,24|c0*Carrott Alley|99,24|c0*Rawlings Road|0,25|c0*Hutson Crescent|1,25|c0*a factory|2,25|c18*St Humphrey's Church|3,25|c7*a carpark|4,25|c3*Sibree Plaza|5,25|c0*Smethes Crescent|6,25|c0*Julian Lane|7,25|c0*Dommett Road|8,25|c0*Beagly Lane|9,25|c0*the Fiddes Monument|10,25|c28*Spalding Walk|11,25|c0*Willshire Towers|12,25|c17*the Harraway Building|13,25|c20*a junkyard|14,25|c29*the Hawtrey Museum|15,25|c34*Ivens Park|16,25|c4*the Vetch Building|17,25|c2*Thristle Bank|18,25|c21*Fanning Street|19,25|c0*Lorgh Walk|20,25|c0*Hibbert Walk|21,25|c0*Pilcher Avenue|22,25|c0*the Chubb Building|23,25|c2*Silley Park|24,25|c4*the Nurcombe Building|25,25|c2*a carpark|26,25|c3*St Matheos's Hospital|27,25|c9*the Rippon Building|28,25|c2*the Henslow Arms|29,25|c10*Hacker Way|30,25|c0*St Antheros's Church|31,25|c7*a carpark|32,25|c3*the Ellicott Building|33,25|c2*the Hosken Building|34,25|c2|p*Pooll Crescent Police Dept|35,25|c12*Cottrell Alley|36,25|c0*the Whaits Hotel|37,25|c30*the Dukes Hotel|38,25|c30*wasteland|39,25|c8*the Portass Museum|40,25|c34*the Parsley Building|41,25|c2*McNally Walk|42,25|c0*Shipp Alley Railway Station|43,25|c35*a warehouse|44,25|c38*a carpark|45,25|c3*Budgett Alley Railway Station|46,25|c35*Beckley Square|47,25|c0*Connor Park|48,25|c4*St Arnold's Church|49,25|c7*the Mallows Building|50,25|c2*Lord Road|51,25|c0*the Dundas Building|52,25|c2*Owsley Crescent Police Dept|53,25|c12*MacGilvray Alley|54,25|c0*Polden Way|55,25|c0*Lazarus General Hospital|56,25|c9*Clewlow Drive|57,25|c0*Belben Lane|58,25|c0*the Newnam Motel|59,25|c30*the Horner Monument|60,25|c28*Club Robson|61,25|c27*the Swears Museum|62,25|c34*Hutchins Lane|63,25|c0*Labarte Library|64,25|c11*Heward Square|65,25|c0*a factory|66,25|c18*Barnete Street|67,25|c0*a cemetery|68,25|c37*Wallace Grove|69,25|c0*St Spyridon's Hospital|70,25|c9*Grene Boulevard|71,25|c0*Steel Crescent|72,25|c0*Fliney Avenue|73,25|c0*Yandle Plaza|74,25|c0*the Hall Building|75,25|c20*Novell Walk|76,25|c0*Heckworthy Towers|77,25|c17|p*Waddon Towers|78,25|c17*Braker Cinema|79,25|c14*Sawday Bank|80,25|c21*the Cahill Building|81,25|c2*the Goulding Hotel|82,25|c30*Eelms Alley|83,25|c0*St Alcuin's Hospital|84,25|c9*Amatt Place School|85,25|c36*wasteland|86,25|c8*wasteland|87,25|c8*the Verrier Arms|88,25|c10*the Peerless Museum|89,25|c34*a carpark|90,25|c3*the Harper Building|91,25|c2*Grimmer Square Fire Station|92,25|c13*Hitchings Square|93,25|c0*a carpark|94,25|c3*Newell Crescent School|95,25|c36*the Halliday Building|96,25|c2|p*Farr Library|97,25|c11*the Faknaham Monument|98,25|c28*Plaister Boulevard|99,25|c0*Golde Avenue|0,26|c0*Beale Walk|1,26|c0*Donagan Alley|2,26|c0*the Bascombe Building|3,26|c20*Hart Grove|4,26|c0*Tooze Bank|5,26|c21*Nich Library|6,26|c11*Frengrove Walk|7,26|c0*Messiter Place School|8,26|c36*the Hookins Building|9,26|c2*the Minshull Building|10,26|c20*a warehouse|11,26|c38*Roadnight Cinema|12,26|c14*Reid Library|13,26|c11*the Binney Monument|14,26|c28*Clifden Way|15,26|c0*Howard Library|16,26|c11*Cother Square|17,26|c0*a carpark|18,26|c3*Silwood Crescent|19,26|c0*a warehouse|20,26|c38*Coker Avenue|21,26|c0*Stocker Lane|22,26|c0*Tompson Walk|23,26|c0*the Herman Building|24,26|c20|p*Priddy Bank|25,26|c21*Stockham Towers|26,26|c17*Hebdidgh Road|27,26|c0*Scallon Crescent|28,26|c0*the Davidge Building|29,26|c2*Felix General Hospital|30,26|c9*a cemetery|31,26|c37*a factory|32,26|c18*the Sankey Monument|33,26|c28*Masey Drive|34,26|c0*the Harold Building|35,26|c20*Matcham Walk|36,26|c0*a factory|37,26|c18*Club Poulter|38,26|c27*Timewell Drive Police Dept|39,26|c12*Twitt Row Police Dept|40,26|c12*the Chap Building|41,26|c2*Ryley Road Police Dept|42,26|c12*wasteland|43,26|c8*the Welsford Museum|44,26|c34*a junkyard|45,26|c29*Swaffield Plaza|46,26|c0*Donoran Road|47,26|c0*the Duckworth Motel|48,26|c30*Pomroy Place|49,26|c0*the Derrington Building|50,26|c2*Robey Avenue|51,26|c0*Meaker Lane Fire Station|52,26|c13*Chalderwood Way|53,26|c0*wasteland|54,26|c8*the Thorne Arms|55,26|c10*Krinks Boulevard|56,26|c0*Denmead Walk School|57,26|c36*Gay Avenue|58,26|c0*a factory|59,26|c18*Daubeny Road|60,26|c0*the Henry Building|61,26|c2*St Birinus's Church|62,26|c7*the Tompkins Building|63,26|c2*Humphreys Library|64,26|c11*Rollinson Lane|65,26|c0*Parry Drive Fire Station|66,26|c13*Bohin Avenue|67,26|c0*Club Lambe|68,26|c27*wasteland|69,26|c8*Peden Drive|70,26|c0*Burrough Row Fire Station|71,26|c13*Tewkesbury Square|72,26|c0*Pinchin Avenue|73,26|c0*a junkyard|74,26|c29*the Goodridge Building|75,26|c2*the Sweatman Motel|76,26|c30*St Emelia's Church|77,26|c7*a cemetery|78,26|c37*Franks Grove|79,26|c0*Jermyn Lane|80,26|c0*St Matthew's Cathedral|81,26|cathedral*St Matthew's Cathedral|82,26|cathedral*Sprod Boulevard|83,26|c0*Cattle Bank|84,26|c21*the Wardle Building|85,26|c2*Burke Place|86,26|c0*the Burcham Arms|87,26|c10*Germain Way|88,26|c0*the Canner Building|89,26|c20*the Sutcliffe Monument|90,26|c28*Courtier Square|91,26|c0*the Carner Hotel|92,26|c30*the Vetch Building|93,26|c20*Penni Street|94,26|c0*Brashier Alley|95,26|c0*Fewtrell Crescent|96,26|c0*wasteland|97,26|c8*the Shoemark Monument|98,26|c28*Tossell Park|99,26|c4*Lyne Lane|0,27|c0*Book Boulevard|1,27|c0*Kray Walk|2,27|c0*Honeyben Drive|3,27|c0*Crossley Road|4,27|c0*Club Veal|5,27|c27*Parrott Cinema|6,27|c14*Jaques Drive|7,27|c0*the Wootton Building|8,27|c2*Demack Row Fire Station|9,27|c13*the Stothert Monument|10,27|c28*Sletery Cinema|11,27|c14*Rodwell Row Police Dept|12,27|c12*Younghusband Square|13,27|c0*the Donovan Building|14,27|c2|p*Knyfton Row Fire Station|15,27|c13*Fords Lane|16,27|c0*the Glastonbury Motel|17,27|c30*Eden Library|18,27|c11*Caiger Mall|19,27|c6*Caiger Mall|20,27|c6*Holloms Auto Repair|21,27|c15*the Wagner Building|22,27|c2*St Isidore's Church|23,27|c7*a cemetery|24,27|c37*the Gadd Motel|25,27|c30*a warehouse|26,27|c38*Nettleton Way Railway Station|27,27|c35*Cundham Library|28,27|c11*the Jillard Museum|29,27|c34*the Corrie Building|30,27|c2*a factory|31,27|c18*Courtney Lane Fire Station|32,27|c13*Thickett Plaza Fire Station|33,27|c13*Bissell Walk|34,27|c0*Sleeman Towers|35,27|c17*the Dalzell Building|36,27|c2*the Surrage Building|37,27|c2*Budmead Way|38,27|c0*wasteland|39,27|c8*a carpark|40,27|c3*Blatcher Avenue|41,27|c0*the Griff Museum|42,27|c34*St Wulfstan's Hospital|43,27|c9*Cade Place Fire Station|44,27|c13*the Norvell Building|45,27|c2|p*Holcombe Lane|46,27|c0*Sheldon Lane Police Dept|47,27|c12*Hellear Walk|48,27|c0*Croxford Road|49,27|c0*Fritz Lane|50,27|c0*the Parkinson Hotel|51,27|c30*the Stacey Monument|52,27|c28*Borrer Street Police Dept|53,27|c12*Abrahall Auto Repair|54,27|c15*Male Way|55,27|c0*the McMahon Motel|56,27|c30*Club Pengelly|57,27|c27*Waddon Crescent|58,27|c0*wasteland|59,27|c8*the Organ Museum|60,27|c34*Bourne Avenue|61,27|c0*Springford Avenue Railway Station|62,27|c35*Fir Street|63,27|c0*Michell Avenue|64,27|c0*Schandua Bank|65,27|c21*Highton Place|66,27|c0*Woodward Lane|67,27|c0*the Carder Building|68,27|c2*Gyllet Drive|69,27|c0*St Matthew's Hospital|70,27|c9*Club Shelley|71,27|c27*a warehouse|72,27|c38*the Binning Monument|73,27|c28*wasteland|74,27|c8*a carpark|75,27|c3*Chivers Avenue|76,27|c0*the Anthony Building|77,27|c2*the Pace Monument|78,27|c28*Ayling Road School|79,27|c36*a warehouse|80,27|c38*St Matthew's Cathedral|81,27|cathedral*St Matthew's Cathedral|82,27|cathedral*a factory|83,27|c18*Harold Square|84,27|c0*the Ducat Building|85,27|c20*the Smethurst Motel|86,27|c30*Lumber Bank|87,27|c21*a carpark|88,27|c3*wasteland|89,27|c8*Heighmore Library|90,27|c11*St Innocent's Church|91,27|c7*Wooman Boulevard|92,27|c0*Caunt Lane|93,27|c0*MacEy Avenue|94,27|c0*the Carrow Building|95,27|c2*a junkyard|96,27|c29*Risdon Boulevard|97,27|c0*Club Milton|98,27|c27*Wood Towers|99,27|c17*Burnley Square|0,28|c0*Club Verncomb|1,28|c27*the Geldeard Monument|2,28|c28*the Bondfield Building|3,28|c2*Edmund General Hospital|4,28|c9*Haw Alley|5,28|c0*Culmstock Park|6,28|c4*Bunter Street Police Dept|7,28|c12*McCormack Square Fire Station|8,28|c13*Savidge Grove School|9,28|c36*the Bristol Building|10,28|c2*Mant Library|11,28|c11*Craven Way|12,28|c0*the Ratcliffe Motel|13,28|c30*Rome Way|14,28|c0*Doyne Street|15,28|c0*the Mapledoram Monument|16,28|c28*Ogilvie Place|17,28|c0*the Tynte Building|18,28|c2*Caiger Mall|19,28|c6*Caiger Mall|20,28|c6*the Latrobe Building|21,28|c20*Cockle Street|22,28|c0*Yeandill Towers|23,28|c17*Perram Avenue School|24,28|c36*Mudford Plaza|25,28|c0*Sherman Road|26,28|c0*Allan Square|27,28|c0*Keevil Walk|28,28|c0*Bonville Drive|29,28|c0*the Mart Motel|30,28|c30*the Strang Monument|31,28|c28*the Fysh Monument|32,28|c28*the Drayton Building|33,28|c2*Back Bank|34,28|c21*Stitson Library|35,28|c11*Pattin Place|36,28|c0*wasteland|37,28|c8*the Gunson Building|38,28|c2*Vasey Lane|39,28|c0*Chafie Bank|40,28|c21*Redpath Alley School|41,28|c36*Heaveb Way|42,28|c0*a carpark|43,28|c3*Wiles Cinema|44,28|c14*Moorman Plaza|45,28|c0*St Methodius's Church|46,28|c7*Gillycuddy Boulevard|47,28|c0*Perin Alley|48,28|c0*the Redwood Museum|49,28|c34*Upham Auto Repair|50,28|c15*Manuel Towers|51,28|c17*the Sartin Monument|52,28|c28*Sage Avenue|53,28|c0*the Eford Motel|54,28|c30*the Nisbet Building|55,28|c20*St Athanasius's Church|56,28|c7*Pledger Alley|57,28|c0*Bridell Square|58,28|c0*wasteland|59,28|c8*Stretchbury Cinema|60,28|c14*Baxter Boulevard School|61,28|c36*a carpark|62,28|c3*Robbins Place|63,28|c0*Geddes Plaza|64,28|c0*the Spare Motel|65,28|c30*Eford Way|66,28|c0*the Howlett Building|67,28|c2*Essell Plaza Railway Station|68,28|c35*St Joachim's Church|69,28|c7*Paice Street|70,28|c0*Dennis Row Fire Station|71,28|c13*Bowyer Auto Repair|72,28|c15*Syme Avenue|73,28|c0*the Dewes Building|74,28|c20*Dowdney Mall|75,28|c6*Dowdney Mall|76,28|c6*Marston Walk|77,28|c0*St Boniface's Hospital|78,28|c9*St Wilfrid's Church|79,28|c7*the Kebby Hotel|80,28|c30*the Burne Motel|81,28|c30*Churchey Road|82,28|c0*a warehouse|83,28|c38*Munday Lane|84,28|c0*Noyce Plaza School|85,28|c36*Towill Crescent|86,28|c0*Julian Lane|87,28|c0*the Tagg Arms|88,28|c10*Cowling Alley|89,28|c0*Darnell Square|90,28|c0*wasteland|91,28|c8*Barstow Way|92,28|c0*Burley Street|93,28|c0*wasteland|94,28|c8*the Mullen Building|95,28|c2*a junkyard|96,28|c29*the Cater Building|97,28|c20*the Gill Building|98,28|c2*the Hocking Building|99,28|c2*wasteland|0,29|c8*the Broadrick Arms|1,29|c10*Bergman Square|2,29|c0*Crosse Boulevard Fire Station|3,29|c13*Herick Lane|4,29|c0*a warehouse|5,29|c38*Hersant Auto Repair|6,29|c15*Softley Park|7,29|c4*Goodford Avenue|8,29|c0*Lecrus Alley|9,29|c0*Pirrie Way|10,29|c0*Hevey Row|11,29|c0*wasteland|12,29|c8*the Waugh Arms|13,29|c10*Rowse Cinema|14,29|c14*the Tiplot Museum|15,29|c34*a warehouse|16,29|c38*Bernard Towers|17,29|c17*the Hussey Monument|18,29|c28*the Hearne Building|19,29|c2*Pagram Library|20,29|c11*Salopia Row|21,29|c0*the Blackholler Arms|22,29|c10*Selwood Crescent|23,29|c0*Snygge Boulevard|24,29|c0*Adney Auto Repair|25,29|c15*a factory|26,29|c18*the Desmond Monument|27,29|c28*Club Colridge|28,29|c27*North Library|29,29|c11*Rooke Bank|30,29|c21*Garret Row|31,29|c0*Popham Place|32,29|c0*Sherwell Place|33,29|c0*Booth Row|34,29|c0*the Mahagan Building|35,29|c2*Besley Lane|36,29|c0*Patriarch General Hospital|37,29|c9*Warry Road|38,29|c0*Hardy Street|39,29|c0*Wakely Alley|40,29|c0*St Pius's Church|41,29|c7*Hearne Lane|42,29|c0*the Joce Building|43,29|c2*Membery Avenue|44,29|c0*Stallworthy Square|45,29|c0*a cemetery|46,29|c37*a factory|47,29|c18*a factory|48,29|c18*a warehouse|49,29|c38*wasteland|50,29|c8*Josaphat General Hospital|51,29|c9*the Turner Building|52,29|c20*a factory|53,29|c18*the Rush Building|54,29|c2*the Fitkin Hotel|55,29|c30*Gajewski Avenue|56,29|c0*a warehouse|57,29|c38*the Pratt Building|58,29|c2*Leigh Library|59,29|c11*Club Dodds|60,29|c27*the Roode Building|61,29|c2*Kirby Boulevard Police Dept|62,29|c12*Thurlow Drive Railway Station|63,29|c35*Hammond Library|64,29|c11*St Elisabeth's Church|65,29|c7*the Horder Motel|66,29|c30*the Maitland Building|67,29|c2*Club Bucke|68,29|c27*the Chetwind Arms|69,29|c10*Pincoffs Boulevard|70,29|c0*Gable Crescent Railway Station|71,29|c35*Dwelly Alley|72,29|c0*Fortune Street|73,29|c0*Austwick Square|74,29|c0*Dowdney Mall|75,29|c6*Dowdney Mall|76,29|c6*wasteland|77,29|c8*Popham Auto Repair|78,29|c15*wasteland|79,29|c8*Elston Auto Repair|80,29|c15*wasteland|81,29|c8*Club Humphries|82,29|c27*the Keitch Building|83,29|c2*St John's Hospital|84,29|c9*Alsford Bank|85,29|c21*a carpark|86,29|c3*Samways Lane|87,29|c0*Cleave Street|88,29|c0*the Gowing Building|89,29|c2*Ryder Plaza|90,29|c0*Maule Row|91,29|c0*Woolmyngton Alley Fire Station|92,29|c13*Healing Alley|93,29|c0*Jeanes Lane|94,29|c0*a warehouse|95,29|c38*the Louch Building|96,29|c2*Brampton Drive|97,29|c0*Horwood Place|98,29|c0*Bussell Way|99,29|c0*Tharratt Road|0,30|c0*Squires Crescent|1,30|c0*Catherine General Hospital|2,30|c9*Side Alley|3,30|c0*Studley Towers|4,30|c17*Hakens Way|5,30|c0*Dalwood Lane|6,30|c0*the Pettman Museum|7,30|c34*Salt Towers|8,30|c17*wasteland|9,30|c8*Stranger Grove Fire Station|10,30|c13*the Sell Monument|11,30|c28*the Acott Arms|12,30|c10*Feaver Walk|13,30|c0*Vyse Row|14,30|c0*Paisley Road|15,30|c0*Maggs Bank|16,30|c21*Flemming Lane|17,30|c0*a junkyard|18,30|c29*the Sweeney Building|19,30|c20*the Kinsman Monument|20,30|c28*Sharland Walk|21,30|c0*Sergeant Street|22,30|c0*the Kening Building|23,30|c20*a factory|24,30|c18*Dewey Way|25,30|c0*a carpark|26,30|c3*the Darley Museum|27,30|c34*wasteland|28,30|c8*wasteland|29,30|c8*the Laimbeer Building|30,30|c20*wasteland|31,30|c8*wasteland|32,30|c8*Mallack Walk|33,30|c0*the Withy Motel|34,30|c30*St Francis's Hospital|35,30|c9*Poncione Grove|36,30|c0*Hemmins Cinema|37,30|c14*the Futcher Museum|38,30|c34*a junkyard|39,30|c29*Turle Bank|40,30|c21*City Zoo|41,30|c22*the Lion Enclosure|42,30|c23*City Zoo|43,30|c22*City Zoo|44,30|c22*the Reptile House|45,30|c23*Allerton Street|46,30|c0*wasteland|47,30|c8*the Ponsford Arms|48,30|c10*the Whittard Monument|49,30|c28*the Wagland Building|50,30|c2*a carpark|51,30|c3*Trotter Place|52,30|c0*Luckraft Cinema|53,30|c14*Worcester Library|54,30|c11*Rumble Crescent|55,30|c0*Bathe Boulevard Railway Station|56,30|c35*St Helena's Hospital|57,30|c9*the Gifford Motel|58,30|c30*the Manly Motel|59,30|c30*Kay Library|60,30|c11*the Faber Motel|61,30|c30*a junkyard|62,30|c29*the Littlehales Building|63,30|c20*Kingdom Park|64,30|c4*Jarvis Lane|65,30|c0*Pigeon Way|66,30|c0*Chiles Auto Repair|67,30|c15*Kelreher Walk Police Dept|68,30|c12*Robinson Road|69,30|c0*the Wrigley Building|70,30|c2*Oakley Crescent|71,30|c0*the Haynes Monument|72,30|c28*Satchell Place|73,30|c0*Sixtus General Hospital|74,30|c9*Surridge Place|75,30|c0*Club Hesse|76,30|c27*wasteland|77,30|c8*Horwill Park|78,30|c4*Swale Grove|79,30|c0*the Wiles Motel|80,30|c30*the Mackworth Museum|81,30|c34*a carpark|82,30|c3*a factory|83,30|c18*Mornington Way Railway Station|84,30|c35*a warehouse|85,30|c38*Eastwick Drive|86,30|c0*the Rycroft Building|87,30|c2*Mauger Towers|88,30|c17*Ham Lane|89,30|c0*a junkyard|90,30|c29*Swabey Grove Railway Station|91,30|c35*Club Osmonton|92,30|c27*Caines Cinema|93,30|c14*Thorp Way Fire Station|94,30|c13*McDonald Alley|95,30|c0*a junkyard|96,30|c29*wasteland|97,30|c8*the Cottrell Building|98,30|c2*Agathius General Hospital|99,30|c9*the Moon Building|0,31|c2*Club Swain|1,31|c27*St Justin's Hospital|2,31|c9*Woodgate Avenue|3,31|c0*the Roger Hotel|4,31|c30*Clarry Towers|5,31|c17*Main Walk|6,31|c0*Club Illing|7,31|c27*Henderson Boulevard|8,31|c0*Prinn Drive|9,31|c0*Worner Crescent|10,31|c0*the Ackermen Hotel|11,31|c30*wasteland|12,31|c8*Ross Avenue School|13,31|c36*Chorley Drive|14,31|c0*the Oxley Building|15,31|c20*Whippey Place Fire Station|16,31|c13*a junkyard|17,31|c29*wasteland|18,31|c8*Bentley Cinema|19,31|c14*Colquhoun Boulevard|20,31|c0*the Preston Arms|21,31|c10*Pikes Towers|22,31|c17*Willcocks Grove|23,31|c0*Hampton Place|24,31|c0*Northup Place School|25,31|c36*Heathman Row Railway Station|26,31|c35*Mitchell Drive Fire Station|27,31|c13*James General Hospital|28,31|c9*Greenley Place|29,31|c0*Gawade Bank|30,31|c21*a factory|31,31|c18*wasteland|32,31|c8*Wippell Row|33,31|c0*Burwold Way|34,31|c0*the Stuart Building|35,31|c2*a warehouse|36,31|c38*a junkyard|37,31|c29*the Bibby Monument|38,31|c28*Wadds Walk|39,31|c0*the Staples Building|40,31|c20*City Zoo|41,31|c22*City Zoo|42,31|c22*the Bear Pit|43,31|c23*City Zoo|44,31|c22*City Zoo|45,31|c22*Broadbear Road|46,31|c0*Laycock Grove|47,31|c0*the Shalmer Building|48,31|c2*Bockett Street|49,31|c0*Robinson Lane|50,31|c0*a warehouse|51,31|c38*Croom Towers|52,31|c17*Sonvico Cinema|53,31|c14*Matraves Crescent Police Dept|54,31|c12*Club Willshire|55,31|c27*Haig Grove|56,31|c0*the Duke Hotel|57,31|c30*the Cosway Building|58,31|c2*Chisholm Square|59,31|c0*a junkyard|60,31|c29*St Columbanus's Hospital|61,31|c9*Simeon General Hospital|62,31|c9*Staite Plaza|63,31|c0*MacMillan Library|64,31|c11*a carpark|65,31|c3*Birkett Way|66,31|c0*Club Polkinghorne|67,31|c27*Hambling Road|68,31|c0*Seamour Walk Railway Station|69,31|c35*French Avenue|70,31|c0*Saddington Alley|71,31|c0*the Ryan Building|72,31|c2*Taylour Street|73,31|c0*Harry Row|74,31|c0*the Syms Museum|75,31|c34*wasteland|76,31|c8*Warren Bank|77,31|c21*wasteland|78,31|c8*Hayte Row|79,31|c0*the Silcox Museum|80,31|c34*a carpark|81,31|c3*Hellings Park|82,31|c4*wasteland|83,31|c8*Tambling Library|84,31|c11*Ashman Row|85,31|c0*Slann Boulevard|86,31|c0*Sparey Boulevard|87,31|c0*a junkyard|88,31|c29*Mechel Drive Railway Station|89,31|c35*Moorhouse Way|90,31|c0*Dobson Avenue|91,31|c0*St Isidore's Hospital|92,31|c9*Stokell Road|93,31|c0*Fowin Cinema|94,31|c14*the Robbins Building|95,31|c20*the Woollacott Building|96,31|c2*Whetcombe Towers|97,31|c17*the Beater Building|98,31|c2*Brunskill Lane|99,31|c0*St Luke's Church|0,32|c7*Raynols Boulevard|1,32|c0*the Puckle Monument|2,32|c28*Bigg Boulevard|3,32|c0*Stephen General Hospital|4,32|c9*Polley Grove|5,32|c0*Brimson Alley Railway Station|6,32|c35*Powlet Grove|7,32|c0*Yea Drive Police Dept|8,32|c12*Lolley Library|9,32|c11*Tuchings Park|10,32|c4*a carpark|11,32|c3*Mather Bank|12,32|c21*Ker Way|13,32|c0*Curle Street Police Dept|14,32|c12*Pullin Square|15,32|c0*Damon Way|16,32|c0*St Lazar's Hospital|17,32|c9*a junkyard|18,32|c29*the Ayliffee Building|19,32|c2*Riglar Grove|20,32|c0*Coymer Square|21,32|c0*a warehouse|22,32|c38*the Fish Building|23,32|c2*the Sugg Building|24,32|c20*the Doggrell Hotel|25,32|c30*Downing Towers|26,32|c17*the Herbert Museum|27,32|c34*Bergman Walk|28,32|c0*a factory|29,32|c18*a junkyard|30,32|c29*Adams Square|31,32|c0*Lea Boulevard Railway Station|32,32|c35*Deacon Bank|33,32|c21*a factory|34,32|c18*a factory|35,32|c18*wasteland|36,32|c8*a carpark|37,32|c3*Borland Way|38,32|c0*the Lockwood Building|39,32|c20*the Kempson Building|40,32|c2*the Elephant House|41,32|c23*City Zoo|42,32|c22*City Zoo|43,32|c22*the Giraffe House|44,32|c23*City Zoo|45,32|c22*Gunson Row|46,32|c0*Silcock Row|47,32|c0*Jarrom Street|48,32|c0*Fishwick Way|49,32|c0*the Chidgey Building|50,32|c2*Schever Towers|51,32|c17*Woodford Road|52,32|c0*Fellowes Lane|53,32|c0*the Weary Building|54,32|c2*St Dionysius's Church|55,32|c7*Starling Street|56,32|c0*Bignal Lane|57,32|c0*a warehouse|58,32|c38*the Bingham Museum|59,32|c34*a junkyard|60,32|c29*a carpark|61,32|c3*the Brimblecombe Arms|62,32|c10*Parslow Cinema|63,32|c14*Pynny Drive|64,32|c0*the Broadfoot Building|65,32|c2*Butler Avenue|66,32|c0*wasteland|67,32|c8*Duckworth Cinema|68,32|c14*Challenger Library|69,32|c11*the Ashment Building|70,32|c2*Chavasse Bank|71,32|c21*Fitzmaurice Park|72,32|c4*St Onuphrius's Church|73,32|c7*Chaffey Alley Police Dept|74,32|c12*Rawkins Plaza|75,32|c0*Burchall Cinema|76,32|c14*the Morris Building|77,32|c2*the Dymond Monument|78,32|c28*Windham Street Railway Station|79,32|c35*a carpark|80,32|c3*wasteland|81,32|c8*the Montagu Arms|82,32|c10*Hecks Library|83,32|c11*Millett Walk Fire Station|84,32|c13*the Coss Building|85,32|c2*Whittingham Lane|86,32|c0*the Simper Building|87,32|c2*Rawlinson Drive Railway Station|88,32|c35*Clements Library|89,32|c11*Santler Road|90,32|c0*Moorman Park|91,32|c4*the Sumption Museum|92,32|c34*Burrough Way|93,32|c0*the Montacute Building|94,32|c20*St Pius's Church|95,32|c7*a factory|96,32|c18*Martland Bank|97,32|c21*Wares Plaza|98,32|c0*Leo General Hospital|99,32|c9*the Jacomb Arms|0,33|c10*Cotty Street Police Dept|1,33|c12*a factory|2,33|c18*the Neate Monument|3,33|c28*Parsley Road|4,33|c0*Craigie Alley|5,33|c0*St Marcus's Church|6,33|c7*Hilborn Walk|7,33|c0*Eckersley Cinema|8,33|c14*Bendle Drive|9,33|c0*Sroud Crescent|10,33|c0*Mears Auto Repair|11,33|c15*wasteland|12,33|c8*Goldsworthy Avenue|13,33|c0*Uppill Library|14,33|c11*Creese Way|15,33|c0*Ripley Park|16,33|c4*Hardstaff Bank|17,33|c21*the Caddick Monument|18,33|c28*Coss Cinema|19,33|c14*Lush Auto Repair|20,33|c15*wasteland|21,33|c8*Cheal Lane|22,33|c0*Middleditch Crescent|23,33|c0*Hagerty Avenue|24,33|c0*Brittan Towers|25,33|c17*Weech Way|26,33|c0*St Ethelbert's Hospital|27,33|c9*the Redly Monument|28,33|c28*the Spinks Hotel|29,33|c30*the Giffard Arms|30,33|c10*Belsten Square|31,33|c0*the Lazenbury Museum|32,33|c34*Club Beastall|33,33|c27|p*Storrow Lane|34,33|c0*Scanlon Crescent|35,33|c0*Snaydon Crescent|36,33|c0*Edgcumbe Cinema|37,33|c14*wasteland|38,33|c8*Skilliter Library|39,33|c11*Boniface Drive|40,33|c0*City Zoo|41,33|c22*City Zoo|42,33|c22*the Aquarium|43,33|c23*City Zoo|44,33|c22*City Zoo|45,33|c22*St Matthias's Church|46,33|c7*Bethell Square|47,33|c0*the Salisbury Motel|48,33|c30*St Joachim's Church|49,33|c7*Traves Lane Police Dept|50,33|c12*Sires Boulevard Police Dept|51,33|c12*St Paul's Church|52,33|c7*Doneghue Walk|53,33|c0*a factory|54,33|c18*a factory|55,33|c18*a cemetery|56,33|c37*Coome Drive|57,33|c0*James Alley|58,33|c0*a junkyard|59,33|c29*Paddon Square|60,33|c0*Martin General Hospital|61,33|c9*wasteland|62,33|c8*the Winlsey Building|63,33|c2*the Burbidge Arms|64,33|c10*St Vitalian's Church|65,33|c7*Higley Avenue School|66,33|c36*Farewell Library|67,33|c11*a factory|68,33|c18*Streeten Lane|69,33|c0*wasteland|70,33|c8*Outram Drive|71,33|c0*wasteland|72,33|c8*Keyford Grove School|73,33|c36*Maishman Crescent|74,33|c0*a warehouse|75,33|c38*Woollcombe Way|76,33|c0*the Bowles Museum|77,33|c34*Coomb Park|78,33|c4*St Swithun's Church|79,33|c7*Runcieman Lane|80,33|c0*Neave Grove|81,33|c0*the Banks Arms|82,33|c10*Rennie Auto Repair|83,33|c15*Grandfield Alley School|84,33|c36*Fackerell Auto Repair|85,33|c15*a factory|86,33|c18*a carpark|87,33|c3*Dawney Cinema|88,33|c14*Dewell Way|89,33|c0*Balman Towers|90,33|c17*wasteland|91,33|c8*Douch Street|92,33|c0*wasteland|93,33|c8*the Donovan Motel|94,33|c30*Harp Walk|95,33|c0*Morton Lane Fire Station|96,33|c13*Crosswell Walk|97,33|c0*a junkyard|98,33|c29*Braham Boulevard School|99,33|c36*Gould Walk|0,34|c0*the Heal Museum|1,34|c34*Combe Lane|2,34|c0*Inclesdon Drive|3,34|c0*a junkyard|4,34|c29*North Lane|5,34|c0*Hartry Crescent|6,34|c0*the Fortune Building|7,34|c2*Blight Park|8,34|c4*the Golling Building|9,34|c2*Help Bank|10,34|c21*Capper Alley Railway Station|11,34|c35*a junkyard|12,34|c29*Freeguard Walk|13,34|c0*Piegsa Place Police Dept|14,34|c12*Boon Crescent|15,34|c0*Nicols Plaza|16,34|c0*wasteland|17,34|c8*Griffen Square|18,34|c0*the McDougall Building|19,34|c2*wasteland|20,34|c8*Pudden Place|21,34|c0*Club Bragge|22,34|c27*the Backhouse Monument|23,34|c28*St Eleutherius's Hospital|24,34|c9*Spirod Row|25,34|c0*a warehouse|26,34|c38*Moseley Library|27,34|c11*the Smail Museum|28,34|c34*Cosh Row|29,34|c0*a junkyard|30,34|c29*Torrington Place|31,34|c0*Mahon Avenue|32,34|c0*Wood Grove Fire Station|33,34|c13*Snow Plaza|34,34|c0*wasteland|35,34|c8*Cunningham Cinema|36,34|c14*Melrose Way|37,34|c0*Alkin Crescent|38,34|c0*Birkley Walk|39,34|c0*Edgcumbe Street|40,34|c0*Getsom Drive Fire Station|41,34|c13*Edson Bank|42,34|c21*a warehouse|43,34|c38*wasteland|44,34|c8*Banbury Square|45,34|c0*the Telfer Building|46,34|c20*Stalling Street|47,34|c0*Pridham Avenue|48,34|c0*Bindon Lane|49,34|c0*the Bourder Building|50,34|c2*a junkyard|51,34|c29*a cemetery|52,34|c37*the Novell Arms|53,34|c10*Stonnard Lane|54,34|c0*Cyril General Hospital|55,34|c9*Bateson Street|56,34|c0*the Chudley Building|57,34|c20*Hegarty Bank|58,34|c21*a carpark|59,34|c3*Gough Library|60,34|c11*Gillett Place Police Dept|61,34|c12*a carpark|62,34|c3*Paterson Auto Repair|63,34|c15*Chaldecott Auto Repair|64,34|c15*a cemetery|65,34|c37*Threadgold Square|66,34|c0*St Leo's Church|67,34|c7*a cemetery|68,34|c37*Flaherty Cinema|69,34|c14*the Dyett Arms|70,34|c10*Cull Boulevard Railway Station|71,34|c35*the Bustin Building|72,34|c2*Gwilliam Boulevard Railway Station|73,34|c35*McMullen Crescent|74,34|c0*Hussey Lane|75,34|c0*the Self Hotel|76,34|c30|p*Demack Way|77,34|c0*Inder Library|78,34|c11*Jarnell Walk|79,34|c0*a cemetery|80,34|c37*the Sharman Building|81,34|c2*St Clare's Church|82,34|c7*Shelley Road|83,34|c0*Ritchie Plaza|84,34|c0*Cowdry Walk|85,34|c0*the Dobson Motel|86,34|c30|p*Stollery Street|87,34|c0*Marshalsey Road|88,34|c0*Herne Street|89,34|c0*Club MacKerel|90,34|c27*Stanfield Road|91,34|c0*Tolly Grove Railway Station|92,34|c35*the Milligan Museum|93,34|c34*Pasker Square|94,34|c0*Armytage Walk|95,34|c0*Oldroyd Way|96,34|c0*Chiswick Cinema|97,34|c14*a carpark|98,34|c3*the Barter Building|99,34|c2*Coffins Drive|0,35|c0*Heming Way|1,35|c0*Dewfall Plaza Railway Station|2,35|c35*Swonnell Walk|3,35|c0*Anderson Row School|4,35|c36*Shilling Walk|5,35|c0*Billet Auto Repair|6,35|c15*Broadbelt Grove Police Dept|7,35|c12*wasteland|8,35|c8*Ainslie Road Fire Station|9,35|c13*the Travers Building|10,35|c2*the Tatchell Building|11,35|c2*St Tsarevna's Church|12,35|c7*Enright Boulevard|13,35|c0*the Gotch Museum|14,35|c34|p*the Gass Monument|15,35|c28*Bridgewater Drive|16,35|c0*Beel Boulevard|17,35|c0*Lockie Row|18,35|c0*Edgerton Drive|19,35|c0*wasteland|20,35|c8*McLennan Street|21,35|c0*Crate Auto Repair|22,35|c15*Kemball Avenue|23,35|c0*Davies Avenue|24,35|c0*the Percival Building|25,35|c2|p*the Daubeney Building|26,35|c20*Dinmead Lane|27,35|c0*the Barlow Museum|28,35|c34*Banfield Alley|29,35|c0*Timmins Cinema|30,35|c14*Brownsey Avenue|31,35|c0*Joycey Drive|32,35|c0*Annesley Street|33,35|c0*a junkyard|34,35|c29*Green Walk|35,35|c0*a junkyard|36,35|c29*Freeguard Cinema|37,35|c14*a warehouse|38,35|c38*wasteland|39,35|c8*Heckworthy Auto Repair|40,35|c15*a junkyard|41,35|c29*Rawling Boulevard|42,35|c0*a factory|43,35|c18|p*the Trick Museum|44,35|c34*the Russell Building|45,35|c20*Riddell Way Fire Station|46,35|c13*wasteland|47,35|c8*Mickleburgh Way School|48,35|c36*a carpark|49,35|c3*the Portman Building|50,35|c2*Date Drive|51,35|c0*Hasell Way|52,35|c0*Tar Auto Repair|53,35|c15*Marriott Crescent|54,35|c0*St Dymphna's Church|55,35|c7|p*a cemetery|56,35|c37*Sparkes Towers|57,35|c17*Gilbert Square|58,35|c0*Furber Auto Repair|59,35|c15*the Heddington Museum|60,35|c34*Harewood Drive|61,35|c0*a junkyard|62,35|c29*Mylrea Street|63,35|c0*Hawke Street|64,35|c0*Westbrook Boulevard|65,35|c0*Pewters Avenue|66,35|c0*Erghum Alley|67,35|c0*wasteland|68,35|c8*a junkyard|69,35|c29*Preller Road|70,35|c0*Gunningham Square|71,35|c0*the Billingham Hotel|72,35|c30*Dupe Cinema|73,35|c14*St Miltiades's Church|74,35|c7*Polgrahan Grove Railway Station|75,35|c35*a carpark|76,35|c3*Mester Square|77,35|c0*Club Swabey|78,35|c27*Nuttycombe Auto Repair|79,35|c15*the Vellacott Building|80,35|c2*Woolf Auto Repair|81,35|c15*a carpark|82,35|c3*Bowles Street|83,35|c0*the Wardropper Arms|84,35|c10*Raesin Grove|85,35|c0*the Mickelson Museum|86,35|c34*wasteland|87,35|c8*Hines Plaza|88,35|c0*a carpark|89,35|c3*Saunders Walk|90,35|c0*Reakes Towers|91,35|c17*the Bissex Monument|92,35|c28*the Smither Building|93,35|c2|p*Germain Park|94,35|c4*Kershaw Row|95,35|c0*Hyman Street|96,35|c0*Dunford Lane Fire Station|97,35|c13*Marchetti Towers|98,35|c17*Warnel Library|99,35|c11*Newten Cinema|0,36|c14*Wakley Boulevard|1,36|c0*Ostrehan Towers|2,36|c17|p*Godsland Street School|3,36|c36*the McGarth Building|4,36|c2*the Dury Building|5,36|c20*Zephyrinus General Hospital|6,36|c9*Club Meade|7,36|c27*Coorte Square|8,36|c0*Standen Row|9,36|c0*the Fennessy Building|10,36|c2*Tibbs Row|11,36|c0*the Nolan Hotel|12,36|c30*Dorey Way|13,36|c0*wasteland|14,36|c8*a junkyard|15,36|c29*Mallard Library|16,36|c11*Duport Alley|17,36|c0*Bowle Place|18,36|c0*Kempthorne Cinema|19,36|c14*the Attwell Building|20,36|c20*wasteland|21,36|c8*a factory|22,36|c18*Bennet Auto Repair|23,36|c15*the Stenhouse Arms|24,36|c10*Carritt Grove Railway Station|25,36|c35*a warehouse|26,36|c38*St Elisabeth's Hospital|27,36|c9*the Commins Monument|28,36|c28*Tupp Grove|29,36|c0*Hobson Way|30,36|c0*the Rhoades Building|31,36|c2*Dodge Square|32,36|c0*Enwright Park|33,36|c4*Wawer Way|34,36|c0*a carpark|35,36|c3*Symonds Lane|36,36|c0*Shehan Boulevard|37,36|c0*Eelms Way|38,36|c0*Buckett Walk|39,36|c0*the Hepton Motel|40,36|c30*Darch Square|41,36|c0*the Bater Arms|42,36|c10*Cowan Street|43,36|c0*a junkyard|44,36|c29*the Horder Motel|45,36|c30*Chafey Walk|46,36|c0*St Eusebius's Hospital|47,36|c9*Feathers Lane|48,36|c0*the Kirkby Building|49,36|c2*Mussabini Way|50,36|c0*Alner Mansion|51,36|c25*Alner Mansion|52,36|c25*Vaux Grove School|53,36|c36*McCann Lane|54,36|c0*the Scott Motel|55,36|c30*the Spinks Monument|56,36|c28*Newbery Street|57,36|c0*Cass Row|58,36|c0*the Connor Arms|59,36|c10*a factory|60,36|c18*Stanser Row|61,36|c0*wasteland|62,36|c8*Woolsett Way Railway Station|63,36|c35|p*Skuse Boulevard|64,36|c0*Christian Boulevard|65,36|c0*wasteland|66,36|c8*Mole Way|67,36|c0*Towner Lane Police Dept|68,36|c12*Inggs Towers|69,36|c17*the Orledge Arms|70,36|c10*Lax Place|71,36|c0*Ladner Avenue|72,36|c0*the Scadding Building|73,36|c2*a cemetery|74,36|c37*a warehouse|75,36|c38*a factory|76,36|c18*the Steeds Building|77,36|c2*the Usher Building|78,36|c20*the Godson Arms|79,36|c10*Cornelius General Hospital|80,36|c9*Leggatt Square|81,36|c0*Cary Bank|82,36|c21*Club Storer|83,36|c27*Salvage Cinema|84,36|c14*Cudworth Lane Fire Station|85,36|c13*Barstow Square|86,36|c0*Pargitter Boulevard|87,36|c0*Cundham Alley|88,36|c0*Henslow Library|89,36|c11*Shadwick Walk Police Dept|90,36|c12*Garret Park|91,36|c4*Sidney Row|92,36|c0*the Denning Museum|93,36|c34*Hollbrook Square|94,36|c0*Jennings Avenue|95,36|c0*Club Freestone|96,36|c27*Farrent Street|97,36|c0*Thicke Row|98,36|c0*Kelly Lane|99,36|c0*the Stone Motel|0,37|c30*Neyens Avenue|1,37|c0*Newbury Library|2,37|c11*Arbuthnot Park|3,37|c4*a factory|4,37|c18*Molesworth Road|5,37|c0*St Lorenzo's Church|6,37|c7*Comer Avenue|7,37|c0*St Mary's Church|8,37|c7*Glass Park|9,37|c4*McDermott Park|10,37|c4*Graham Towers|11,37|c17*St Osyth's Church|12,37|c7*Ayre Place Railway Station|13,37|c35*Pownall Alley|14,37|c0*wasteland|15,37|c8*the Bawn Museum|16,37|c34*Farlow Drive School|17,37|c36*Ash Walk|18,37|c0*the Mitchener Monument|19,37|c28*the Samuels Hotel|20,37|c30*wasteland|21,37|c8*the Rideout Museum|22,37|c34*Gresley Cinema|23,37|c14*the Powe Arms|24,37|c10*the Hussey Building|25,37|c2*Pym Grove|26,37|c0*Gomm Auto Repair|27,37|c15*Ray Alley|28,37|c0*a junkyard|29,37|c29*Caple Avenue|30,37|c0*Nicholls Square|31,37|c0*Keniston Grove|32,37|c0*Bowerman Park|33,37|c4*wasteland|34,37|c8*Snow Road|35,37|c0*a carpark|36,37|c3*a warehouse|37,37|c38*wasteland|38,37|c8*St Odile's Church|39,37|c7*Blunt Boulevard Railway Station|40,37|c35*Pine Walk|41,37|c0*Mulock Drive Railway Station|42,37|c35*Club Lazenbury|43,37|c27*Catcott Auto Repair|44,37|c15*Burlton Bank|45,37|c21*Heddington Alley|46,37|c0*Club Mothersele|47,37|c27*Breay Avenue|48,37|c0*Riddick Boulevard|49,37|c0*Townsend Walk|50,37|c0*Alner Mansion|51,37|c25*Alner Mansion|52,37|c25*Hoffman Walk|53,37|c0*Bayfield Drive|54,37|c0*Pegrum Square Fire Station|55,37|c13*Stiles Row|56,37|c0*the Hepburn Building|57,37|c2*Failand Street|58,37|c0*the Pither Building|59,37|c2*the Rookey Arms|60,37|c10*Dowsett Alley|61,37|c0*the Edmondson Building|62,37|c2*Hiskett Alley|63,37|c0*Clothier Lane|64,37|c0*the Roberts Building|65,37|c2*the Williames Building|66,37|c2*the Cocker Museum|67,37|c34*Lumley Alley|68,37|c0*the Hindley Building|69,37|c2*Shackle Walk Railway Station|70,37|c35*St Cynllo's Church|71,37|c7*Riste Avenue|72,37|c0*" +
        "Marchant Crescent|73,37|c0*Glenmore Boulevard Railway Station|74,37|c35*Dotin Park|75,37|c4*wasteland|76,37|c8*the Tudgay Museum|77,37|c34*a warehouse|78,37|c38*the Craske Museum|79,37|c34*Burns Place|80,37|c0*Hickling Auto Repair|81,37|c15*McDougall Park|82,37|c4*Opalinska Road|83,37|c0*wasteland|84,37|c8*Manktelow Square|85,37|c0*a warehouse|86,37|c38*Faraker Plaza|87,37|c0*the Jago Building|88,37|c2*the Pepperd Museum|89,37|c34*the Thurtle Building|90,37|c2*the Bath Building|91,37|c2*Gamlen Row|92,37|c0*Gargery Lane|93,37|c0*Charteris Avenue|94,37|c0*the Pender Building|95,37|c20*a junkyard|96,37|c29*Longmate Plaza|97,37|c0*Aris Towers|98,37|c17*Robins Crescent|99,37|c0*the Hatson Building|0,38|c2*the Mashman Building|1,38|c2*a carpark|2,38|c3*Horn Walk|3,38|c0*Brendan General Hospital|4,38|c9*Penny Crescent|5,38|c0*Fullaway Crescent|6,38|c0*the Tibbs Monument|7,38|c28*a cemetery|8,38|c37*a factory|9,38|c18*Emes Walk|10,38|c0*Sevior Plaza|11,38|c0*a cemetery|12,38|c37*Dunstone Walk Fire Station|13,38|c13*Powers Avenue School|14,38|c36*Quaney Alley|15,38|c0*Doggrell Avenue|16,38|c0*a junkyard|17,38|c29*a carpark|18,38|c3*Swetman Park|19,38|c4*Coombe Park|20,38|c4*Templeton Park|21,38|c4*the Hutchinson Building|22,38|c2*Barbara General Hospital|23,38|c9*Billett Row School|24,38|c36*Nicholls Square|25,38|c0*Tikanoff Walk|26,38|c0*a carpark|27,38|c3*the Berkeley Museum|28,38|c34*wasteland|29,38|c8*Club Rainey|30,38|c27*Sabine Plaza|31,38|c0*Gasper Plaza|32,38|c0*the Lumber Building|33,38|c2*Alington Street|34,38|c0*Carle Street Police Dept|35,38|c12*Bracher Street|36,38|c0*Bayley Row Railway Station|37,38|c35*Club Woodard|38,38|c27*Cardwell Plaza Railway Station|39,38|c35*Thick Plaza|40,38|c0*wasteland|41,38|c8*Gyls Walk School|42,38|c36*Budden Avenue|43,38|c0*Doutch Towers|44,38|c17*Huggins Towers|45,38|c17*Keedwell Grove|46,38|c0*a carpark|47,38|c3*St Jude's Church|48,38|c7*Arscott Road Fire Station|49,38|c13*the Haim Building|50,38|c20*Club Pearce|51,38|c27*Glanfield Cinema|52,38|c14*Fey Alley Railway Station|53,38|c35*Slape Way School|54,38|c36*Gore Lane|55,38|c0*wasteland|56,38|c8*wasteland|57,38|c8*Newstead Street Railway Station|58,38|c35*Peacock Road|59,38|c0*the Pridham Building|60,38|c2*Tagg Road|61,38|c0*Sleway Row|62,38|c0*the Finnerty Building|63,38|c2*Ludlam Alley|64,38|c0*a warehouse|65,38|c38*a warehouse|66,38|c38*the Parslow Building|67,38|c2*a factory|68,38|c18*Dibben Bank|69,38|c21*Newberry Way|70,38|c0*Crees Lane|71,38|c0*a cemetery|72,38|c37*a junkyard|73,38|c29*Dyment Row Fire Station|74,38|c13*Lettey Drive|75,38|c0*Preen Drive|76,38|c0*wasteland|77,38|c8*Ostler Towers|78,38|c17*Goldney Place Police Dept|79,38|c12*Schreiber Walk|80,38|c0*Saltrow Library|81,38|c11*Harnap Cinema|82,38|c14*Peryer Place|83,38|c0*Langford Avenue|84,38|c0*Chippett Grove Police Dept|85,38|c12*St Barnabas's Church|86,38|c7*a cemetery|87,38|c37*Wisby Plaza|88,38|c0*a carpark|89,38|c3*wasteland|90,38|c8*St Abraham's Church|91,38|c7*the Packe Building|92,38|c20*St Lazarus's Church|93,38|c7*the Heginbothom Arms|94,38|c10*wasteland|95,38|c8*the Genge Museum|96,38|c34*the Maxwell Museum|97,38|c34*wasteland|98,38|c8*Theirs Crescent|99,38|c0*Bowley Lane|0,39|c0*Summers Row|1,39|c0*Basher Street|2,39|c0*wasteland|3,39|c8*Ritchie Boulevard|4,39|c0*Lucius General Hospital|5,39|c9*wasteland|6,39|c8*Leader Drive|7,39|c0*Bush Crescent Fire Station|8,39|c13*a carpark|9,39|c3*Urben Alley Fire Station|10,39|c13*the Cavill Building|11,39|c2*Cottam Way Police Dept|12,39|c12*the Flowar Building|13,39|c20*St Werburgh's Hospital|14,39|c9*Verrall Park|15,39|c4*Blaimen Street|16,39|c0*St Marcus's Church|17,39|c7*a cemetery|18,39|c37*Gibbins Towers|19,39|c17*Cross Auto Repair|20,39|c15*Haslock Walk|21,39|c0*Edward General Hospital|22,39|c9*Club Normandare|23,39|c27*Loney Row Police Dept|24,39|c12*a warehouse|25,39|c38*Bowen Towers|26,39|c17*the Dimond Motel|27,39|c30*Kirkwood Lane Fire Station|28,39|c13*a carpark|29,39|c3*Bungay Towers|30,39|c17*Powles Cinema|31,39|c14*Cozens Street|32,39|c0*wasteland|33,39|c8*St Mark's Hospital|34,39|c9*the Lavers Motel|35,39|c30*the Splain Arms|36,39|c10*Picton Way|37,39|c0*Roe Crescent|38,39|c0*the Froom Building|39,39|c2*Eaton Avenue|40,39|c0*a junkyard|41,39|c29*a warehouse|42,39|c38*Carroll Bank|43,39|c21*Hayes Street|44,39|c0*Petheram Boulevard|45,39|c0*Coaker Square|46,39|c0*a carpark|47,39|c3*the Keeffe Building|48,39|c2*wasteland|49,39|c8*Thynne Walk Railway Station|50,39|c35*Club Rookes|51,39|c27*Gullick Towers|52,39|c17*Sealby Place|53,39|c0*the Travis Building|54,39|c2*Herne Drive|55,39|c0*a junkyard|56,39|c29*wasteland|57,39|c8*Hewlett Alley|58,39|c0*Veal Lane Police Dept|59,39|c12*Budge Cinema|60,39|c14*Gale Lane|61,39|c0*Crockford Grove|62,39|c0*a warehouse|63,39|c38*the Feadon Building|64,39|c2*the Hopjohns Building|65,39|c2*Pinder Square|66,39|c0*Tufton Auto Repair|67,39|c15*Balkwill Auto Repair|68,39|c15*Pennecard Bank|69,39|c21*Smythies Lane|70,39|c0*the Rust Monument|71,39|c28*Bulmer Lane|72,39|c0*Lessey Row|73,39|c0*a junkyard|74,39|c29*a warehouse|75,39|c38*wasteland|76,39|c8*Vigors Road|77,39|c0*Wyse Walk|78,39|c0*the Manninge Building|79,39|c2*Elphick Walk|80,39|c0*a warehouse|81,39|c38*Blest Place|82,39|c0*a carpark|83,39|c3*the Stanser Arms|84,39|c10*the Dewell Building|85,39|c20*a carpark|86,39|c3*Hopping Boulevard Railway Station|87,39|c35*the Mees Building|88,39|c2*Crosland Lane|89,39|c0*Krinks Boulevard|90,39|c0*Garwood Way|91,39|c0*the Gracewood Building|92,39|c20*a cemetery|93,39|c37*a junkyard|94,39|c29*Faulkner Avenue School|95,39|c36*Tilly Plaza|96,39|c0*a carpark|97,39|c3*a junkyard|98,39|c29*Darnell Plaza Railway Station|99,39|c35*a warehouse|0,40|c38*Leggetter Library|1,40|c11*a junkyard|2,40|c29*Parkhouse Way Fire Station|3,40|c13*the Hyson Museum|4,40|c34*Varder Walk|5,40|c0*the Pile Building|6,40|c2*the Hellyer Building|7,40|c2*the Cribb Building|8,40|c2*Smallwood Plaza|9,40|c0*Mitchel Walk|10,40|c0*Dauncey Square|11,40|c0*a junkyard|12,40|c29*Foyle Lane|13,40|c0*a carpark|14,40|c3*wasteland|15,40|c8*Bletso Cinema|16,40|c14*the Hambidge Building|17,40|c20*a warehouse|18,40|c38*Montgomery Avenue Fire Station|19,40|c13*the Edson Building|20,40|c2*Jensen Boulevard Police Dept|21,40|c12*Rousel Road|22,40|c0*a carpark|23,40|c3*Somerville Cinema|24,40|c14*Wayper Library|25,40|c11*the Shea Arms|26,40|c10*Brooke Drive|27,40|c0*the Tonkin Monument|28,40|c28*the Cake Building|29,40|c2*Chisholm Alley|30,40|c0*the Husted Building|31,40|c2*Landsey Grove|32,40|c0*Walling Bank|33,40|c21*McGarth Walk Fire Station|34,40|c13*Garner Drive|35,40|c0*a factory|36,40|c18*Bryan Place Fire Station|37,40|c13*Club Traves|38,40|c27*wasteland|39,40|c8*Brownsell Plaza Railway Station|40,40|c35*Gaze Library|41,40|c11*the Gumm Building|42,40|c2*the Tapp Motel|43,40|c30*a junkyard|44,40|c29*the Neagle Building|45,40|c20*Bassett Way|46,40|c0*a junkyard|47,40|c29*Wyndham Auto Repair|48,40|c15*wasteland|49,40|c8*the Lawson Building|50,40|c2*Bush Boulevard|51,40|c0*Elphick Walk|52,40|c0*St Jude's Hospital|53,40|c9*Hailstone Way|54,40|c0*Coat Road School|55,40|c36*Club Dury|56,40|c27*the Reaston Monument|57,40|c28*Burney Avenue|58,40|c0*Scarpendale Street Railway Station|59,40|c35*Cates Boulevard School|60,40|c36*a junkyard|61,40|c29*Payne Drive|62,40|c0*Hewett Place Police Dept|63,40|c12*the Nunn Building|64,40|c20*wasteland|65,40|c8*Voules Plaza Fire Station|66,40|c13*the Trubridge Arms|67,40|c10*Stedham Auto Repair|68,40|c15*Silvester Crescent School|69,40|c36*Godfrey Lane|70,40|c0*Procter Alley|71,40|c0*Gwilliam Alley|72,40|c0*the Sellwood Motel|73,40|c30*Club Dupe|74,40|c27*a factory|75,40|c18*the Chubb Monument|76,40|c28*Donagan Lane|77,40|c0*Wallis Square Police Dept|78,40|c12*Fliney Boulevard|79,40|c0*Mazzie Towers|80,40|c17*Baum Bank|81,40|c21*Maggs Cinema|82,40|c14*Harman Lane|83,40|c0*a warehouse|84,40|c38*the MacMillan Hotel|85,40|c30*the Shaa Monument|86,40|c28*a warehouse|87,40|c38*a junkyard|88,40|c29*Davies Avenue|89,40|c0*wasteland|90,40|c8*Crump Cinema|91,40|c14*Partridge Row|92,40|c0*the Casely Building|93,40|c2*Watkins Square|94,40|c0*Caddy Lane|95,40|c0*the Stephens Building|96,40|c2*Fudge Square|97,40|c0*Quekett Park|98,40|c4*Bulleid Square|99,40|c0*Goodson Square|0,41|c0*the Armastrong Monument|1,41|c28*the Barber Building|2,41|c2*Borthwick Alley|3,41|c0*Hopes Row|4,41|c0*St Columbanus's Church|5,41|c7*wasteland|6,41|c8*Mains Alley|7,41|c0*the Troakes Museum|8,41|c34*the Cother Museum|9,41|c34*the Bayford Building|10,41|c2*Tasker Park|11,41|c4*Aston Lane|12,41|c0*St Paulinus's Church|13,41|c7*the Hippesley Building|14,41|c20*Hamm Walk Fire Station|15,41|c13*Pattinson Row|16,41|c0*Trimble Lane|17,41|c0*the Barstow Building|18,41|c20*Loveridge Drive|19,41|c0*wasteland|20,41|c8*Shuffery Street|21,41|c0*a junkyard|22,41|c29*Garton Library|23,41|c11*the George Arms|24,41|c10*the Checketts Arms|25,41|c10*Caller Way|26,41|c0*Martindale Park|27,41|c4*a warehouse|28,41|c38*Withyman Street Police Dept|29,41|c12*Staddon Library|30,41|c11*Wakley Drive|31,41|c0*Horsford Lane|32,41|c0*Martha General Hospital|33,41|c9*the Sands Building|34,41|c2*a factory|35,41|c18*St Eligius's Church|36,41|c7*a warehouse|37,41|c38*Wine Place|38,41|c0*Club Swyer|39,41|c27*a junkyard|40,41|c29*Trick Plaza|41,41|c0*Masey Auto Repair|42,41|c15*the Membery Arms|43,41|c10*Club Whitting|44,41|c27*Brendon Library|45,41|c11*Cazalet Library|46,41|c11*a carpark|47,41|c3*Hagerty Place|48,41|c0*the Furze Building|49,41|c2*the Combe Building|50,41|c2*Lewellen Way|51,41|c0*a factory|52,41|c18*Camidge Drive|53,41|c0*Chap Place|54,41|c0*Dufferin Park|55,41|c4*the Sumption Arms|56,41|c10*Alkin Road Railway Station|57,41|c35*the Reay Arms|58,41|c10*Pescod Bank|59,41|c21*Rowley Boulevard Police Dept|60,41|c12*the Hind Building|61,41|c20*Coward Cinema|62,41|c14*Frederick Place|63,41|c0*Shave Crescent|64,41|c0*wasteland|65,41|c8*Breddy Park|66,41|c4*Derrick Cinema|67,41|c14*the Carpendale Arms|68,41|c10*Seamour Road|69,41|c0*Learcroft Alley|70,41|c0*Baldon Drive|71,41|c0*a factory|72,41|c18*Robilliard Walk|73,41|c0*St Paschal's Hospital|74,41|c9*Alkin Boulevard|75,41|c0*Conolly Park|76,41|c4*Swansborough Plaza|77,41|c0*a carpark|78,41|c3*Whetcombe Auto Repair|79,41|c15*Blackholler Street|80,41|c0*Boxall Road Fire Station|81,41|c13*Boutcher Alley Police Dept|82,41|c12*a warehouse|83,41|c38*Giddings Mall|84,41|c6*Giddings Mall|85,41|c6*Lancey Drive|86,41|c0*Beaman Boulevard School|87,41|c36*wasteland|88,41|c8*Raper Plaza|89,41|c0*Club Humphries|90,41|c27*wasteland|91,41|c8*Atkinson Street|92,41|c0*Devonshire Square|93,41|c0*Christopher Way|94,41|c0*Mountford Way|95,41|c0*Wortley Place|96,41|c0*Courtney Square|97,41|c0*the Gristwood Arms|98,41|c10*the Chadburn Museum|99,41|c34*Bird Boulevard|0,42|c0*a carpark|1,42|c3*wasteland|2,42|c8*Hazzard Walk|3,42|c0*Deed Lane|4,42|c0*wasteland|5,42|c8*the Dennis Motel|6,42|c30*Jervis Auto Repair|7,42|c15*Club Burns|8,42|c27*Caff Road School|9,42|c36*the Pankhurst Building|10,42|c20*Wadden Boulevard|11,42|c0*a carpark|12,42|c3*Cottey Way|13,42|c0*a cemetery|14,42|c37*the Wakeford Motel|15,42|c30*a carpark|16,42|c3*Lettey Row Fire Station|17,42|c13*a warehouse|18,42|c38*the Pridham Building|19,42|c2*Wadman Bank|20,42|c21*Pearcey Street School|21,42|c36*the Mester Arms|22,42|c10*Lacey Walk|23,42|c0*a carpark|24,42|c3*Dales Boulevard Fire Station|25,42|c13*the Melhuish Monument|26,42|c28*Collinns Park|27,42|c4*St Elisabeth's Hospital|28,42|c9*Lukins Auto Repair|29,42|c15*Hemore Auto Repair|30,42|c15*Stovin Row|31,42|c0*a warehouse|32,42|c38*Ephrem General Hospital|33,42|c9*Ray Library|34,42|c11*Mountstephens Bank|35,42|c21*a cemetery|36,42|c37*Mogg Square|37,42|c0*a warehouse|38,42|c38*Shipton Crescent|39,42|c0*the Scorse Building|40,42|c2*Highmore Street|41,42|c0*St Philomena's Church|42,42|c7*a carpark|43,42|c3*Gilling Crescent|44,42|c0*a factory|45,42|c18*Bealey Towers|46,42|c17*Head Grove|47,42|c0*wasteland|48,42|c8*a junkyard|49,42|c29*Morton Lane|50,42|c0*Club Capps|51,42|c27*a factory|52,42|c18*Cribb Row Railway Station|53,42|c35*the Purnell Building|54,42|c2*Owens Crescent School|55,42|c36*Donn Boulevard School|56,42|c36*Cantrill Alley|57,42|c0*Priestley Grove Railway Station|58,42|c35*a warehouse|59,42|c38*Parfit Towers|60,42|c17*the Turpin Building|61,42|c2*Alvis Boulevard|62,42|c0*Self Plaza|63,42|c0*Rapps Road|64,42|c0*Ottery Drive|65,42|c0*Hardin Square|66,42|c0*Mare Auto Repair|67,42|c15*Culliford Avenue|68,42|c0*Amesbury Walk|69,42|c0*Club Coghlan|70,42|c27*Pual Cinema|71,42|c14*a factory|72,42|c18*wasteland|73,42|c8*a factory|74,42|c18*a junkyard|75,42|c29*Sanson Cinema|76,42|c14*Dalley Library|77,42|c11*the Maine Building|78,42|c20*wasteland|79,42|c8*Woollmington Place|80,42|c0*Walden Drive|81,42|c0*Stidston Street|82,42|c0*wasteland|83,42|c8*Giddings Mall|84,42|c6*Giddings Mall|85,42|c6*Sage Way Railway Station|86,42|c35*the Chetham Building|87,42|c2*Couch Avenue|88,42|c0*Tewkesbury Square|89,42|c0*Club Passmore|90,42|c27*Goodday Park|91,42|c4*Yearworth Alley|92,42|c0*wasteland|93,42|c8*the Waldron Monument|94,42|c28*wasteland|95,42|c8*a junkyard|96,42|c29*Dryall Drive|97,42|c0*wasteland|98,42|c8*Haselshaw Square|99,42|c0*Hardie Square|0,43|c0*Garson Row|1,43|c0*Polley Way|2,43|c0*the Pers Monument|3,43|c28*Garland Library|4,43|c11*Aloysius General Hospital|5,43|c9*a carpark|6,43|c3*McNamara Drive|7,43|c0*Tailer Row|8,43|c0*Hawtrey Alley|9,43|c0*Seear Auto Repair|10,43|c15*Emms Walk|11,43|c0*Tidball Library|12,43|c11*Ryles Avenue|13,43|c0*Chaning Alley|14,43|c0*Shenton Crescent|15,43|c0*Hollyman Lane|16,43|c0*Bustin Auto Repair|17,43|c15*Cotty Bank|18,43|c21*Tarzwell Road|19,43|c0*the Brailey Building|20,43|c2*a carpark|21,43|c3*the Coram Building|22,43|c2*wasteland|23,43|c8*Piele Alley|24,43|c0*a warehouse|25,43|c38*a carpark|26,43|c3*Shadwick Walk|27,43|c0*Warburton Crescent|28,43|c0*Binney Lane|29,43|c0*a junkyard|30,43|c29*the Swinnerton Monument|31,43|c28*Cuss Place|32,43|c0*Rolls Cinema|33,43|c14*Auston Auto Repair|34,43|c15*the Axworthy Hotel|35,43|c30*St Callistus's Church|36,43|c7*Haines Square|37,43|c0*a factory|38,43|c18*Wicksted Avenue|39,43|c0*the Nix Building|40,43|c20*Mawdley Walk|41,43|c0*a cemetery|42,43|c37*Wheare Boulevard|43,43|c0*Willies Square|44,43|c0*Davies Alley|45,43|c0*Forshaw Towers|46,43|c17*Floyde Stadium|47,43|c16*Floyde Stadium|48,43|c16*Blackman Drive|49,43|c0*Rountree Crescent|50,43|c0*Moggridge Place Police Dept|51,43|c12*the Whalen Arms|52,43|c10*Caswill Lane School|53,43|c36*Club Vaughan|54,43|c27*a warehouse|55,43|c38*a factory|56,43|c18*Hollwey Street School|57,43|c36*the Kenworthy Building|58,43|c2*Acreman Road Fire Station|59,43|c13*the Gillman Museum|60,43|c34*a factory|61,43|c18*a carpark|62,43|c3*Hippisley Park|63,43|c4*Applegate Alley Police Dept|64,43|c12*wasteland|65,43|c8*McDougall Way|66,43|c0*Bradbury Library|67,43|c11*Mills Avenue|68,43|c0*Reid Place|69,43|c0*the Empson Monument|70,43|c28*wasteland|71,43|c8*the Kerle Arms|72,43|c10*the Brymer Building|73,43|c2*the Chichester Monument|74,43|c28*Club Minchinton|75,43|c27*Marshment Place Police Dept|76,43|c12*the MacKenzie Arms|77,43|c10*Scorse Cinema|78,43|c14*Heritage Lane|79,43|c0*a junkyard|80,43|c29*Davenport Cinema|81,43|c14*Bathe Row|82,43|c0*Byrne Auto Repair|83,43|c15*the Morrish Building|84,43|c20*Bromley Auto Repair|85,43|c15*the Sprod Building|86,43|c2*the Heeks Motel|87,43|c30*Greatwood Road|88,43|c0*a warehouse|89,43|c38*a warehouse|90,43|c38*Batten Drive|91,43|c0*St Joachim's Church|92,43|c7*a cemetery|93,43|c37*the Ponting Building|94,43|c2*the Nix Arms|95,43|c10*the Lorgh Building|96,43|c2*Shervey Crescent|97,43|c0*wasteland|98,43|c8*Janes Alley|99,43|c0*the Woodborne Building|0,44|c20*the Dawney Building|1,44|c2*wasteland|2,44|c8*Dobin Auto Repair|3,44|c15|p*Sankey Boulevard|4,44|c0*Holide Way|5,44|c0*Eelms Avenue|6,44|c0*the Goode Building|7,44|c2*Howard Auto Repair|8,44|c15*Ruggevale Walk Police Dept|9,44|c12*Bere Towers|10,44|c17*Riste Alley|11,44|c0*Frekee Walk|12,44|c0*Burrell Way Police Dept|13,44|c12*Julian Lane|14,44|c0*Rodeney Plaza|15,44|c0*the Bampfyld Arms|16,44|c10*the Eglen Building|17,44|c20*a factory|18,44|c18*Bygrave Cinema|19,44|c14*Cunningham Towers|20,44|c17*wasteland|21,44|c8*Dickinson Square School|22,44|c36*Watson Boulevard|23,44|c0*the Madill Museum|24,44|c34*Lasbury Auto Repair|25,44|c15*Houghton Street|26,44|c0*Doyne Street|27,44|c0*Rayner Crescent|28,44|c0*Terry Place|29,44|c0*the Pitter Building|30,44|c2*wasteland|31,44|c8*Ackland Mall|32,44|c6*Ackland Mall|33,44|c6|p*Huddy Drive|34,44|c0*Mallack Avenue|35,44|c0*Moseley Plaza Police Dept|36,44|c12*a carpark|37,44|c3*wasteland|38,44|c8*Crape Bank|39,44|c21*a factory|40,44|c18*Twycrosse Place School|41,44|c36*Roe Crescent|42,44|c0*St Egbert's Church|43,44|c7*Moran Drive|44,44|c0*Olivey Library|45,44|c11|p*Peat Way|46,44|c0*Floyde Stadium|47,44|c16*Floyde Stadium|48,44|c16*Club Dibsdall|49,44|c27*Wisby Walk|50,44|c0*Riglar Boulevard|51,44|c0*Gaskell Lane|52,44|c0*a junkyard|53,44|c29*a warehouse|54,44|c38|p*Margaret General Hospital|55,44|c9*Selwyn Boulevard|56,44|c0*Blomfield Grove Police Dept|57,44|c12*Glanvile Towers|58,44|c17*the Bagley Building|59,44|c2*Snook Towers|60,44|c17*Warfield Lane|61,44|c0*the Towker Building|62,44|c2*the Brittan Building|63,44|c2|p*Batt Cinema|64,44|c14*Wolters Cinema|65,44|c14*the Nuttall Museum|66,44|c34*Tynte Mall|67,44|c6*Tynte Mall|68,44|c6*Cohen Avenue|69,44|c0*Brodripp Auto Repair|70,44|c15*Ammonds Street|71,44|c0*wasteland|72,44|c8*Purchas Auto Repair|73,44|c15*Stirling Towers|74,44|c17|p*Crockett Square|75,44|c0*Tutcher Walk|76,44|c0*Hoyle Street|77,44|c0*Titley Park|78,44|c4*the Higgdon Building|79,44|c2*St Lucy's Church|80,44|c7*Nalder Plaza|81,44|c0*Teek Road|82,44|c0*Mann Walk|83,44|c0*Walrond Square|84,44|c0*Kitch Park|85,44|c4*Billet Road Fire Station|86,44|c13*Halberry Boulevard Police Dept|87,44|c12*Hecks Street|88,44|c0*a factory|89,44|c18*Stibbs Row|90,44|c0*the Peryer Monument|91,44|c28*Imber Square|92,44|c0*the Veryard Building|93,44|c20*Sheat Boulevard|94,44|c0*Hacker Way|95,44|c0*a carpark|96,44|c3*a warehouse|97,44|c38*the Finchley Museum|98,44|c34*a factory|99,44|c18*Ellicott Place Railway Station|0,45|c35*Hodgkinson Drive|1,45|c0*Dalgliesh Cinema|2,45|c14*Beale Library|3,45|c11*Matcham Square Railway Station|4,45|c35*Vesey Cinema|5,45|c14*McCullough Avenue|6,45|c0*a carpark|7,45|c3*the Crosswell Building|8,45|c2*Verrell Crescent|9,45|c0*Perham Park|10,45|c4*Wallbutton Way|11,45|c0*the Austwick Museum|12,45|c34*Warner Boulevard|13,45|c0*Falvey Walk Fire Station|14,45|c13*Ewins Row Fire Station|15,45|c13*Hind Boulevard|16,45|c0*Sorton Way Fire Station|17,45|c13*Rumbell Grove Railway Station|18,45|c35*Sherman Alley Fire Station|19,45|c13*Gower Auto Repair|20,45|c15*Judd Crescent|21,45|c0*St Perpetua's Church|22,45|c7*Withnail Road|23,45|c0*Fone Drive|24,45|c0*Chick Street|25,45|c0*the Shortman Building|26,45|c2|p*St Swithun's Church|27,45|c7*the Goodland Monument|28,45|c28*Bennet Row Railway Station|29,45|c35*Woollacot Boulevard Fire Station|30,45|c13*Club Kick|31,45|c27*Ackland Mall|32,45|c6*Ackland Mall|33,45|c6*Michaud Walk Fire Station|34,45|c13*Leigh Way|35,45|c0*Beare Avenue|36,45|c0*Killinger Walk|37,45|c0*Rawles Bank|38,45|c21*Venables Row|39,45|c0*a factory|40,45|c18*Keane Boulevard Police Dept|41,45|c12*Strange Bank|42,45|c21*a carpark|43,45|c3*Kitting Alley|44,45|c0*wasteland|45,45|c8*the Radnedge Arms|46,45|c10*a junkyard|47,45|c29*Derryman Plaza Police Dept|48,45|c12*the Start Arms|49,45|c10*Club Priscott|50,45|c27*Wootten Towers|51,45|c17*the Hollbrook Motel|52,45|c30*St George's Hospital|53,45|c9*Buttery Row School|54,45|c36*Phillips Road|55,45|c0*Adalbert General Hospital|56,45|c9*Boniface Library|57,45|c11*Eugene General Hospital|58,45|c9*a carpark|59,45|c3*a junkyard|60,45|c29*Forse Square|61,45|c0*St Dorotheus's Church|62,45|c7*a cemetery|63,45|c37*Hugo Crescent Railway Station|64,45|c35*Evershed Cinema|65,45|c14*Barwood Walk|66,45|c0*Tynte Mall|67,45|c6*Tynte Mall|68,45|c6*Weakley Square|69,45|c0*the Howdell Monument|70,45|c28*Kemball Avenue|71,45|c0*Denbury Square|72,45|c0*the Wheals Arms|73,45|c10*Gaffney Crescent|74,45|c0*Crees Drive|75,45|c0*the Way Monument|76,45|c28*Mussell Way|77,45|c0*Russell Row|78,45|c0*a carpark|79,45|c3*Elers Park|80,45|c4*a cemetery|81,45|c37*Beall Avenue|82,45|c0*Wylde Road|83,45|c0*the Powys Monument|84,45|c28*Rodd Grove|85,45|c0*wasteland|86,45|c8*a factory|87,45|c18*Griffith Alley|88,45|c0*Chetwynd Square|89,45|c0*Brendan General Hospital|90,45|c9*Buller Boulevard School|91,45|c36*Snell Auto Repair|92,45|c15*Grist Bank|93,45|c21*Flower Walk Fire Station|94,45|c13*a factory|95,45|c18*the Biles Monument|96,45|c28*Woodforde Crescent|97,45|c0*the Hartry Arms|98,45|c10*the Pillinger Building|99,45|c2*Waller Auto Repair|0,46|c15*Thirlby Walk|1,46|c0*Randell Boulevard|2,46|c0*a carpark|3,46|c3*Wild Place|4,46|c0*Griff Drive School|5,46|c36*the Pitts Museum|6,46|c34*a carpark|7,46|c3*Mitchard Park|8,46|c4*a junkyard|9,46|c29*Harrison Park|10,46|c4*Jouxson Cinema|11,46|c14*Stallworthy Square|12,46|c0*a factory|13,46|c18|p*the Farrant Monument|14,46|c28*Blockwood Auto Repair|15,46|c15*Holland Alley|16,46|c0*wasteland|17,46|c8*the Lee Building|18,46|c2*the Snee Building|19,46|c2*Silwood Walk Railway Station|20,46|c35*Ormrod Drive|21,46|c0*a cemetery|22,46|c37*a junkyard|23,46|c29*Wasson Auto Repair|24,46|c15*the Galavin Museum|25,46|c34*Whittle Place|26,46|c0*Woodthorpe Plaza|27,46|c0*the Probert Building|28,46|c2*Latham Cinema|29,46|c14*Cort Row|30,46|c0*St Blaise's Church|31,46|c7*Chaffe Cinema|32,46|c14*a junkyard|33,46|c29*the Herring Monument|34,46|c28*Maria General Hospital|35,46|c9*Shalle Plaza|36,46|c0*Beaver Towers|37,46|c17*Clipper Avenue|38,46|c0*Crick Lane|39,46|c0*Greenhow Alley|40,46|c0*St Wilfrid's Hospital|41,46|c9*Kebby Auto Repair|42,46|c15*the Eagan Building|43,46|c2*Burchall Way|44,46|c0*Brunt Row|45,46|c0*Elvins Road|46,46|c0*the Gaston Building|47,46|c2*St Agnes's Hospital|48,46|c9*Lavis Walk|49,46|c0*a junkyard|50,46|c29*a factory|51,46|c18*the Chilwell Museum|52,46|c34*a carpark|53,46|c3*Hubbard Boulevard Railway Station|54,46|c35*Acourt Library|55,46|c11*the Rodgers Building|56,46|c2*Nother Plaza|57,46|c0*Paisley Alley|58,46|c0*the Scudamore Arms|59,46|c10*Primrose Bank|60,46|c21*Bray Square|61,46|c0*the Pyncombes Monument|62,46|c28*Manning Plaza|63,46|c0*wasteland|64,46|c8*Gingell Road Railway Station|65,46|c35*Villis Road|66,46|c0*the Retallick Building|67,46|c2*Prew Way|68,46|c0*the Lasder Building|69,46|c2*Swaine Towers|70,46|c17*the Marks Building|71,46|c20*Kray Towers|72,46|c17*Baring Lane|73,46|c0*Albyn Bank|74,46|c21*a junkyard|75,46|c29*a carpark|76,46|c3*the Kitchingman Monument|77,46|c28*Raikes Bank|78,46|c21*Sebright Drive Railway Station|79,46|c35*Gumm Alley|80,46|c0*Norgan Library|81,46|c11*the Farmer Building|82,46|c20*Stockwell Road|83,46|c0*Deverell Grove|84,46|c0*Hewlett Place|85,46|c0*Howland Street School|86,46|c36|p*the Murly Monument|87,46|c28*Livius Row|88,46|c0*Lewarn Alley|89,46|c0*Crosbie Grove Railway Station|90,46|c35*Rodeney Plaza|91,46|c0*the Woolven Motel|92,46|c30*the Trivola Building|93,46|c2*St Holy's Church|94,46|c7*Veazey Towers|95,46|c17|p*St Alban's Hospital|96,46|c9*Daunton Square|97,46|c0*Club Firminger|98,46|c27*Ollerhead Crescent|99,46|c0*the Sendall Monument|0,47|c28*Howord Way|1,47|c0*Percifull Plaza|2,47|c0*Bisshop Square|3,47|c0*the Dunning Motel|4,47|c30*a factory|5,47|c18*Cudworth Alley|6,47|c0*Harewood Library|7,47|c11*Harington Boulevard|8,47|c0*Much Boulevard|9,47|c0*the Vaughan Arms|10,47|c10*the Hateley Arms|11,47|c10*St Jude's Cathedral|12,47|cathedral*St Jude's Cathedral|13,47|cathedral*Cape Towers|14,47|c17*the Blackburn Arms|15,47|c10*Hanlon Park|16,47|c4*Denbury Road|17,47|c0*Felix General Hospital|18,47|c9*the Hamilton Arms|19,47|c10*Chaffe Bank|20,47|c21*Ackerman Towers|21,47|c17*the Banbury Monument|22,47|c28*Burchill Drive|23,47|c0*Kelher Park|24,47|c4*Satherley Road|25,47|c0*the Stagg Building|26,47|c20*Hemborrow Walk|27,47|c0*Angerstein Alley|28,47|c0*Kenward Towers|29,47|c17*wasteland|30,47|c8*a cemetery|31,47|c37*Spurdell Walk Police Dept|32,47|c12*a warehouse|33,47|c38*Club Wistow|34,47|c27*Adey Plaza Fire Station|35,47|c13*Saltrow Alley Fire Station|36,47|c13*Gyllet Park|37,47|c4*Club Maule|38,47|c27*Brickenden Grove|39,47|c0*wasteland|40,47|c8*Westropp Bank|41,47|c21*Baverstock Park|42,47|c4*Knill Road|43,47|c0*the Woolsett Building|44,47|c20*Reginaldus Plaza Fire Station|45,47|c13*Earlham Grove|46,47|c0*Dalwood Alley|47,47|c0*Sowler Boulevard|48,47|c0*Coombes Auto Repair|49,47|c15*wasteland|50,47|c8*a junkyard|51,47|c29*Snooke Towers|52,47|c17*the Musgrove Museum|53,47|c34*Margery Avenue|54,47|c0*the Blackmore Building|55,47|c20*Billings Lane School|56,47|c36*Wriford Bank|57,47|c21*wasteland|58,47|c8*St Silverius's Church|59,47|c7*the Cabble Monument|60,47|c28*Bhore Cinema|61,47|c14*Clements Square|62,47|c0*Chamberlaine Alley|63,47|c0*wasteland|64,47|c8*Belham Avenue|65,47|c0*a carpark|66,47|c3*a factory|67,47|c18*Eeles Way|68,47|c0*Weaver Drive|69,47|c0*a factory|70,47|c18*Keirl Towers|71,47|c17*Higley Crescent|72,47|c0*the Snee Arms|73,47|c10*the Gibbons Building|74,47|c2*St Helena's Church|75,47|c7*Nositer Drive Fire Station|76,47|c13*the Canning Motel|77,47|c30*Fort Creedy Infirmary|78,47|c43*Fort Creedy Storehouse|79,47|c43*Fort Creedy Barracks|80,47|c43*a junkyard|81,47|c29*Mumford Towers|82,47|c17*St Benedict's Hospital|83,47|c9*a carpark|84,47|c3*Membery Way|85,47|c0*Buckinham Square|86,47|c0*Frizzell Lane|87,47|c0*Leith Way|88,47|c0*Cabbell Lane School|89,47|c36*Hemborrow Lane Railway Station|90,47|c35*Tidd Cinema|91,47|c14*Club Sweeney|92,47|c27*the Rivers Monument|93,47|c28*a cemetery|94,47|c37*the Dunham Building|95,47|c2*Cook Place|96,47|c0*Snaydon Walk Railway Station|97,47|c35*Dering Drive|98,47|c0*wasteland|99,47|c8*a junkyard|0,48|c29*St Daniel's Hospital|1,48|c9*wasteland|2,48|c8*the Willison Building|3,48|c2*a junkyard|4,48|c29*a factory|5,48|c18*Shattock Plaza School|6,48|c36*Scudamore Plaza Fire Station|7,48|c13*the Duncan Monument|8,48|c28*a carpark|9,48|c3*Stockley Walk Police Dept|10,48|c12*Maishman Bank|11,48|c21*St Jude's Cathedral|12,48|cathedral*St Jude's Cathedral|13,48|cathedral*Copleston Library|14,48|c11*the Dimon Museum|15,48|c34*the Collings Building|16,48|c2*St Elisabeth's Hospital|17,48|c9*Badman Cinema|18,48|c14*Brundrit Towers|19,48|c17*Burdwood Bank|20,48|c21*Bown Crescent|21,48|c0*St Theophan's Church|22,48|c7*Massey Lane Fire Station|23,48|c13*Nossiter Place|24,48|c0*Channing Square|25,48|c0*How Lane|26,48|c0*Boon Boulevard|27,48|c0*the Cull Monument|28,48|c28*Club Hill|29,48|c27*Vearncombe Alley Railway Station|30,48|c35*Cayme Drive|31,48|c0*a junkyard|32,48|c29*the Limbery Arms|33,48|c10*wasteland|34,48|c8*Floyer Boulevard|35,48|c0*Yapp Square Police Dept|36,48|c12*Ofield Drive|37,48|c0*Sheil Alley Railway Station|38,48|c35*Pask Square Railway Station|39,48|c35*a warehouse|40,48|c38*Ranson Road|41,48|c0*a factory|42,48|c18*Tordoffe Way|43,48|c0*St Symmachus's Church|44,48|c7*Frederick Walk|45,48|c0*Voke Row|46,48|c0*Gerrish Place Police Dept|47,48|c12*Zinnecker Boulevard|48,48|c0*Withyman Road Fire Station|49,48|c13*Twycrosse Alley|50,48|c0*St Luke's Hospital|51,48|c9*Frappel Street|52,48|c0*a warehouse|53,48|c38*St Theodore's Church|54,48|c7*the Mesney Museum|55,48|c34*Woodland Towers|56,48|c17*Dunster Road|57,48|c0*Highton Place|58,48|c0*Tardew Row|59,48|c0*Porter Library|60,48|c11*a warehouse|61,48|c38*Lambley Library|62,48|c11*Blakeman Towers|63,48|c17*Clyde Towers|64,48|c17*Frayne Walk Fire Station|65,48|c13*the Goodrich Building|66,48|c2*Blackham Drive|67,48|c0*Carpinter Walk|68,48|c0*Whitten Place Fire Station|69,48|c13*Midelton Drive|70,48|c0*the Terdre Hotel|71,48|c30*Dodington Auto Repair|72,48|c15*wasteland|73,48|c8*a junkyard|74,48|c29*Meyrick Plaza Police Dept|75,48|c12*Fennessy Place Police Dept|76,48|c12*Tennear Bank|77,48|c21*Fort Creedy Barracks|78,48|c43*Fort Creedy Armoury|79,48|c32*Fort Creedy Gatehouse|80,48|c43*Ebdon Drive|81,48|c0*Rowlatt Row|82,48|c0*Pallaye Library|83,48|c11*the Schonlau Motel|84,48|c30*the Dill Monument|85,48|c28*the Lowther Building|86,48|c2*McCorquodale Row|87,48|c0*Creasy Walk|88,48|c0*Woolcott Plaza|89,48|c0*Wakely Drive|90,48|c0*Sharland Lane|91,48|c0*the Leofric Monument|92,48|c28*St Cyril's Church|93,48|c7*Maskell Park|94,48|c4*the Matthews Museum|95,48|c34*the Ogbourn Hotel|96,48|c30*Burlinson Alley|97,48|c0*Jeffrey Walk|98,48|c0*Club Silvey|99,48|c27*Kittle Alley School|0,49|c36*Boyer Boulevard Railway Station|1,49|c35*Prideaux Street Fire Station|2,49|c13*Wilshe Drive|3,49|c0*Comitty Alley|4,49|c0*the Whyte Monument|5,49|c28*the Challes Building|6,49|c20*Collis Library|7,49|c11*Lye Alley|8,49|c0*the Russel Museum|9,49|c34*Martindale Road|10,49|c0*the Curme Building|11,49|c20*Coffins Lane School|12,49|c36*Donnan Alley|13,49|c0*Thorburn Way|14,49|c0*a factory|15,49|c18*Neary Bank|16,49|c21*the Reginaldus Museum|17,49|c34*Crowly Library|18,49|c11*St Columba's Church|19,49|c7*a cemetery|20,49|c37*the McMullen Museum|21,49|c34*a carpark|22,49|c3*Shalle Place|23,49|c0*Ledger Row|24,49|c0*Hinchly Avenue|25,49|c0*Stanbury Lane|26,49|c0*Seviour Crescent|27,49|c0*the Huttenbach Arms|28,49|c10*Shelper Park|29,49|c4*the Gilling Museum|30,49|c34*St Eutychian's Hospital|31,49|c9*Fensome Street|32,49|c0*Lane Road|33,49|c0*Bousfield Alley|34,49|c0*Fothergill Towers|35,49|c17*Glisson Lane|36,49|c0*Vernoum Drive|37,49|c0*Attrell Avenue|38,49|c0*the Mules Monument|39,49|c28*the Pinney Hotel|40,49|c30*Deanesly Drive School|41,49|c36*a carpark|42,49|c3*a warehouse|43,49|c38*Patriarch General Hospital|44,49|c9*a cemetery|45,49|c37*a carpark|46,49|c3*the Chiles Monument|47,49|c28*Crossing Lane|48,49|c0*the Eyles Building|49,49|c2*Esain Drive|50,49|c0*Blakey Street|51,49|c0*the Allsop Arms|52,49|c10*Evill Avenue|53,49|c0*Gunningham Walk|54,49|c0*Stuart Library|55,49|c11*St Simon's Hospital|56,49|c9*the Dibbings Building|57,49|c2*the Clementina Monument|58,49|c28*the Spring Building|59,49|c2*a junkyard|60,49|c29*Blocksidge Crescent Railway Station|61,49|c35*the Pretty Museum|62,49|c34*Ffych Alley|63,49|c0*Buckmaster Crescent Railway Station|64,49|c35*Moreby Square|65,49|c0*Barry Row|66,49|c0*Shepard Lane|67,49|c0*a factory|68,49|c18*Mathams Avenue|69,49|c0*the Sage Building|70,49|c2*the Hancox Building|71,49|c2*Beele Boulevard Railway Station|72,49|c35*the Parry Motel|73,49|c30*Wilkin Boulevard|74,49|c0*Cheatle Avenue|75,49|c0*Kinsman Cinema|76,49|c14*St Benedict's Hospital|77,49|c9*Fort Creedy Exercise Yard|78,49|c43*Fort Creedy Training Ground|79,49|c43*Fort Creedy Vehicle Depot|80,49|c43*the Hunter Building|81,49|c2*Lavor Alley School|82,49|c36*Pigeon Way|83,49|c0*Crowcombe Park|84,49|c4*Rostron Plaza|85,49|c0*Colier Walk|86,49|c0*Muirhead Bank|87,49|c21*Rees Square|88,49|c0*Derham Bank|89,49|c21*the Cantle Building|90,49|c2*Comer Towers|91,49|c17*Bastick Walk|92,49|c0*the Geyskens Hotel|93,49|c30*Tolson Row|94,49|c0*the Snygge Building|95,49|c2*a junkyard|96,49|c29*the Mackworth Building|97,49|c2*Penn Avenue|98,49|c0*Briggs Lane|99,49|c0*Gilbey Street|0,50|c0*the Loveridge Arms|1,50|c10*the Wriford Museum|2,50|c34*Kitchingman Place|3,50|c0*Colmer Way|4,50|c0*Markess Bank|5,50|c21*St Seraphim's Hospital|6,50|c9*the Ripley Building|7,50|c2*the Burtoft Arms|8,50|c10*the Shiplow Building|9,50|c2*the Cope Building|10,50|c2*Buckett Walk|11,50|c0*Prisk Alley|12,50|c0*Clare Lane|13,50|c0*Wray Lane|14,50|c0*Club Loaring|15,50|c27*Pettman Alley|16,50|c0*a warehouse|17,50|c38*Dyett Walk|18,50|c0*Creyghton Drive School|19,50|c36*Holley Square|20,50|c0*the Staveley Monument|21,50|c28*Gunson Street|22,50|c0*Bence Auto Repair|23,50|c15*the Levett Motel|24,50|c30*Shaw Avenue Fire Station|25,50|c13*a factory|26,50|c18*Bind Place School|27,50|c36*the Hamlett Monument|28,50|c28*Blackborow Boulevard|29,50|c0*the Kemmis Building|30,50|c2*the Lodge Motel|31,50|c30*Gwinn Bank|32,50|c21*the Barrell Monument|33,50|c28*Simper Row|34,50|c0*Havenhand Walk|35,50|c0*Came Place|36,50|c0*Herrington Drive|37,50|c0*a carpark|38,50|c3*Grayland Street School|39,50|c36*Sainsbury Road|40,50|c0*Cummins Avenue|41,50|c0*Moran Alley|42,50|c0*Summerhayes Row|43,50|c0*Philip General Hospital|44,50|c9*the Hume Arms|45,50|c10*Mattravers Way Railway Station|46,50|c35*Wasson Square Police Dept|47,50|c12*Croft Lane|48,50|c0*Luckraft Bank|49,50|c21*the Corfield Arms|50,50|c10*Rebus Plaza|51,50|c0*the Heard Building|52,50|c2*Whetcombe Park|53,50|c4*the Christie Monument|54,50|c28*Rumble Crescent|55,50|c0*wasteland|56,50|c8*Mannell Walk|57,50|c0*Guell Bank|58,50|c21*Gooden Street|59,50|c0*Dalziel Road|60,50|c0*Blunden Row School|61,50|c36*wasteland|62,50|c8*a warehouse|63,50|c38*Witherington Auto Repair|64,50|c15*Neal Cinema|65,50|c14*St Ethelbert's Hospital|66,50|c9*a factory|67,50|c18*the Copeland Building|68,50|c2*Pratley Road Police Dept|69,50|c12*wasteland|70,50|c8*Tayler Row|71,50|c0*Copless Grove Railway Station|72,50|c35*Sargent Crescent|73,50|c0*Dummett Alley|74,50|c0*Club Guilford|75,50|c27*wasteland|76,50|c8*a junkyard|77,50|c29*Club Noake|78,50|c27*a warehouse|79,50|c38*Hamlen Auto Repair|80,50|c15*Promel Towers|81,50|c17*Osbert Street|82,50|c0*a warehouse|83,50|c38*the Ludwell Building|84,50|c2*a factory|85,50|c18*a warehouse|86,50|c38*Willia Alley|87,50|c0*a factory|88,50|c18*a carpark|89,50|c3*London Park|90,50|c4*the Blackburn Monument|91,50|c28*the Grose Museum|92,50|c34*Atway Lane|93,50|c0*the Reade Hotel|94,50|c30*the Hatchard Building|95,50|c2*Billing Way|96,50|c0*the Shoebrooks Building|97,50|c2*Winsley Avenue Police Dept|98,50|c12*Gwatkin Crescent|99,50|c0*Haddock Road Police Dept|0,51|c12*Edmund General Hospital|1,51|c9*the Bengefield Hotel|2,51|c30*Wrentmore Bank|3,51|c21*Grey Bank|4,51|c21*Abney Boulevard|5,51|c0*Forshaw Drive|6,51|c0*a junkyard|7,51|c29*a carpark|8,51|c3*the Monks Arms|9,51|c10*the Capps Monument|10,51|c28*a carpark|11,51|c3*the Hutchfield Arms|12,51|c10*Hammatt Alley|13,51|c0*Creasy Walk|14,51|c0*the Steed Monument|15,51|c28*Farthing Library|16,51|c11*Tidy Boulevard|17,51|c0*Percival Cinema|18,51|c14*Lewer Way|19,51|c0*Farewell Place Police Dept|20,51|c12*Dibbin Park|21,51|c4*Laimbeer Way|22,51|c0*Frodsham Lane|23,51|c0*a factory|24,51|c18*Norvill Drive|25,51|c0*Jouxson Walk|26,51|c0*Grime Boulevard|27,51|c0*the Tennant Building|28,51|c2*Ebsworth Row|29,51|c0*Fih Bank|30,51|c21*Stroude Bank|31,51|c21*Shearston Walk|32,51|c0*the Horner Building|33,51|c2*a junkyard|34,51|c29*Ponting Plaza|35,51|c0*the Botting Building|36,51|c2*Stower Row|37,51|c0*Lanhdon Grove|38,51|c0*Rio Avenue Railway Station|39,51|c35*the Ponsonby Motel|40,51|c30*Adney Towers|41,51|c17*the Rhoden Museum|42,51|c34*Speke Boulevard|43,51|c0*Bornard Walk|44,51|c0*Timewell Way|45,51|c0*Burredg Row School|46,51|c36*a warehouse|47,51|c38*the Jacquet Building|48,51|c2*Pittard Plaza|49,51|c0*the Higgs Arms|50,51|c10*Bunney Street Police Dept|51,51|c12*Axworthy Square|52,51|c0*Pound Place School|53,51|c36*Hillier Walk|54,51|c0*the Stollery Building|55,51|c2*wasteland|56,51|c8*Halsey Auto Repair|57,51|c15*Holdsworth Towers|58,51|c17*wasteland|59,51|c8*Benson Lane|60,51|c0*Turpin Road|61,51|c0*the Greenhow Building|62,51|c20*Wadham Library|63,51|c11*Micklewright Plaza|64,51|c0*Train Plaza|65,51|c0*Henslowe Park|66,51|c4*Fernie Grove|67,51|c0*Chinnock Auto Repair|68,51|c15*Membry Lane Fire Station|69,51|c13*Morrow Lane|70,51|c0*the Browne Building|71,51|c20*a junkyard|72,51|c29*Whitehead Park|73,51|c4*the Fruin Building|74,51|c2*Twitt Plaza|75,51|c0*a warehouse|76,51|c38*St Laurence's Hospital|77,51|c9*Hussey Lane|78,51|c0*Mattravers Cinema|79,51|c14*a warehouse|80,51|c38*St Bruno's Church|81,51|c7*a cemetery|82,51|c37*Spridell Walk|83,51|c0*Chaning Auto Repair|84,51|c15*Sellek Way Fire Station|85,51|c13*Beagly Auto Repair|86,51|c15*McDonald Drive Fire Station|87,51|c13*Harden Park|88,51|c4*a warehouse|89,51|c38*Barnete Row School|90,51|c36*the Trotman Arms|91,51|c10*Knollys Bank|92,51|c21*the Christensen Building|93,51|c2*McKay Park|94,51|c4*the Payn Monument|95,51|c28*Ashbee Boulevard Railway Station|96,51|c35*a warehouse|97,51|c38*Mesney Drive Railway Station|98,51|c35*Beckwith Library|99,51|c11*Besant Avenue|0,52|c0*Sherring Place|1,52|c0*the Wakeford Motel|2,52|c30*Victor General Hospital|3,52|c9*the Linnett Museum|4,52|c34*Adam Plaza|5,52|c0*Dauncey Towers|6,52|c17*Lansdowne Crescent|7,52|c0*Shortman Lane|8,52|c0*McIlhargey Plaza|9,52|c0*Club Bridgeman|10,52|c27*Dallimore Street|11,52|c0*a warehouse|12,52|c38*Ruddle Alley Railway Station|13,52|c35*the Haste Museum|14,52|c34*the Maudley Building|15,52|c2*Nuth Row Fire Station|16,52|c13*Bently Drive|17,52|c0*Hewish Library|18,52|c11*St Margaret's Church|19,52|c7*a cemetery|20,52|c37*Sidey Alley Railway Station|21,52|c35*the Morrish Motel|22,52|c30*St Columbanus's Hospital|23,52|c9*the Selley Building|24,52|c2*Nalder Way|25,52|c0*the Culverwell Building|26,52|c2*the Dinwiddy Monument|27,52|c28*Ings Street|28,52|c0*Speak Cinema|29,52|c14*the Brennand Building|30,52|c20*Yelling Street|31,52|c0*the Paull Building|32,52|c2*Bassence Row Fire Station|33,52|c13*Arbery Walk|34,52|c0*Burlton Walk|35,52|c0*the Ashford Arms|36,52|c10*Orman Way|37,52|c0*Sandy Towers|38,52|c17*a warehouse|39,52|c38*a carpark|40,52|c3*Style Boulevard|41,52|c0*the Hiscock Arms|42,52|c10*Beele Auto Repair|43,52|c15*Silcock Auto Repair|44,52|c15*a factory|45,52|c18*Priddice Road|46,52|c0*Gaffney Lane|47,52|c0*a warehouse|48,52|c38*the Kellett Building|49,52|c2*wasteland|50,52|c8*Sheil Park|51,52|c4*Lyman Square|52,52|c0*a junkyard|53,52|c29*Club Brine|54,52|c27*Bently Towers|55,52|c17*Boyd Bank|56,52|c21*Brougham Way|57,52|c0*Nichols Mall|58,52|c6*Nichols Mall|59,52|c6*Hebditch Drive|60,52|c0*Missen Street|61,52|c0*Grimshaw Road Police Dept|62,52|c12*Byshop Avenue|63,52|c0*Sheppard Walk|64,52|c0*the Kirkby Building|65,52|c2*Quartly Library|66,52|c11*Philpotts Towers|67,52|c17*Cator Drive|68,52|c0*the Pendell Arms|69,52|c10*Hardisty Auto Repair|70,52|c15*Abot Towers|71,52|c17*Cadbury Bank|72,52|c21*Tredger Towers|73,52|c17*the Prankerd Building|74,52|c2*Lintorn Park|75,52|c4*Vale Towers|76,52|c17*a factory|77,52|c18*Clapcott Cinema|78,52|c14*a junkyard|79,52|c29*Fowles Plaza Police Dept|80,52|c12*Eeles Avenue|81,52|c0*the Linney Museum|82,52|c34*the Pargiter Monument|83,52|c28*the Whicher Building|84,52|c2*the Rowcliffe Building|85,52|c20*Pyke Auto Repair|86,52|c15*Errington Way|87,52|c0*wasteland|88,52|c8*Parkhouse Towers|89,52|c17*Maney Lane Police Dept|90,52|c12*Widdows Cinema|91,52|c14*Davis Way|92,52|c0*the Bowell Museum|93,52|c34*a junkyard|94,52|c29*wasteland|95,52|c8*Lax Cinema|96,52|c14*Shadwick Place|97,52|c0*Horler Crescent|98,52|c0*Hollwey Place|99,52|c0*Moodborn Library|0,53|c11*Gilles Street|1,53|c0*Paillet Alley|2,53|c0*McGarth Plaza|3,53|c0*Redfern Boulevard|4,53|c0*Pople Street|5,53|c0*Tozer Place|6,53|c0*Rayment Row|7,53|c0*St Julius's Hospital|8,53|c9*Cornelius General Hospital|9,53|c9*Wedderburn Place|10,53|c0*Ridge Avenue Fire Station|11,53|c13*Rex Crescent|12,53|c0*Chatterton Row|13,53|c0*the Prentis Hotel|14,53|c30*Takle Auto Repair|15,53|c15*the Ogbourne Monument|16,53|c28*the Moberly Building|17,53|c2*Rawling Boulevard|18,53|c0*Cooley Walk|19,53|c0*Beament Auto Repair|20,53|c15*Kene Avenue|21,53|c0*a carpark|22,53|c3*the Sebright Museum|23,53|c34*a carpark|24,53|c3*Corrie Walk|25,53|c0*Dibben Auto Repair|26,53|c15*the Matraves Building|27,53|c2*Imeson Walk|28,53|c0*Cholmondeley Towers|29,53|c17*a factory|30,53|c18*the Cran Monument|31,53|c28*the Sainsbury Building|32,53|c2*wasteland|33,53|c8*the Reading Building|34,53|c2*Clegg Cinema|35,53|c14*Tompsett Walk|36,53|c0*wasteland|37,53|c8*Beable Lane|38,53|c0*Wing Street|39,53|c0*a warehouse|40,53|c38*the Beachem Hotel|41,53|c30*Beach Place|42,53|c0*Fritz Cinema|43,53|c14*Beckey Street|44,53|c0*the Smart Arms|45,53|c10*Thomas General Hospital|46,53|c9*the Bares Building|47,53|c2*Holmshaw Bank|48,53|c21*Club Colkes|49,53|c27*the McCulloch Building|50,53|c2*Stanbury Place|51,53|c0*Toms Road|52,53|c0*St Ambrose's Church|53,53|c7*a junkyard|54,53|c29*Bateman Way|55,53|c0*Brome Library|56,53|c11*Stribling Library|57,53|c11*Nichols Mall|58,53|c6*Nichols Mall|59,53|c6*the Whale Building|60,53|c2*Naylor Walk|61,53|c0*the Truell Museum|62,53|c34*Piegsa Way|63,53|c0*Dempsey Grove Police Dept|64,53|c12*wasteland|65,53|c8*Guilford Avenue Fire Station|66,53|c13*Maiden Auto Repair|67,53|c15*Swansborough Park|68,53|c4*Draper Way|69,53|c0*Moon Way|70,53|c0*wasteland|71,53|c8*the Peek Arms|72,53|c10*a warehouse|73,53|c38*Muirhead Drive|74,53|c0*Pavy Plaza Police Dept|75,53|c12*Digby Walk|76,53|c0*the Baxter Building|77,53|c2*Wenmouth Lane|78,53|c0*Lawley Walk Railway Station|79,53|c35*Osment Drive|80,53|c0*Gyles Library|81,53|c11*wasteland|82,53|c8*Club Randell|83,53|c27*wasteland|84,53|c8*Cowing Way Police Dept|85,53|c12*Somerville Boulevard|86,53|c0*Hubbard Avenue|87,53|c0*Edmondson Square|88,53|c0*Newstead Library|89,53|c11*Burye Avenue|90,53|c0*Ludlow Auto Repair|91,53|c15*Capleton Library|92,53|c11*a carpark|93,53|c3*Denner Towers|94,53|c17|p*Harman Square|95,53|c0*Kidner Park|96,53|c4*Hebditch Library|97,53|c11*a warehouse|98,53|c38*wasteland|99,53|c8*Low Walk|0,54|c0*Leighton Way|1,54|c0*Ackerman Walk|2,54|c0*Waugh Road|3,54|c0*Haygarth Row Railway Station|4,54|c35*Campain Drive|5,54|c0*Mack Auto Repair|6,54|c15*Whish Walk|7,54|c0*the Watherston Hotel|8,54|c30*a factory|9,54|c18*Tabor Place|10,54|c0*York Bank|11,54|c21*Philpott Grove|12,54|c0*a factory|13,54|c18*the William Museum|14,54|c34*St Humphrey's Church|15,54|c7*Jacquet Walk|16,54|c0*wasteland|17,54|c8*Paynter Avenue|18,54|c0*the Tytherleigh Motel|19,54|c30*St Julie's Church|20,54|c7*St Julius's Church|21,54|c7*Lillycrap Street|22,54|c0*a junkyard|23,54|c29*the Peach Museum|24,54|c34*Derrington Cinema|25,54|c14*a carpark|26,54|c3*Collis Bank|27,54|c21*the Mountain Motel|28,54|c30*the Jelley Museum|29,54|c34*St Hormisdas's Church|30,54|c7*a cemetery|31,54|c37*Auston Walk|32,54|c0*the Locock Building|33,54|c2*Comber Walk|34,54|c0*the Barwood Building|35,54|c2|p*Butson Boulevard School|36,54|c36*Crawley Auto Repair|37,54|c15*the Hardinge Arms|38,54|c10*Wadham Cinema|39,54|c14*Burdekin Alley Police Dept|40,54|c12*Clearey Drive|41,54|c0*the Gillings Building|42,54|c2*Conybear Road|43,54|c0*Club Chappell|44,54|c27*Larcombe Plaza|45,54|c0*Grace Grove|46,54|c0*Tulk Grove|47,54|c0*Beauchamp Bank|48,54|c21*Firminger Walk|49,54|c0*Clear Street|50,54|c0*Wickenden Grove|51,54|c0*the Modeford Building|52,54|c2*St Eusebius's Church|53,54|c7*Duffill Alley|54,54|c0*Burgess Street|55,54|c0*Maxwell Walk|56,54|c0*a warehouse|57,54|c38*Hatwell Place|58,54|c0*Anstruther Alley|59,54|c0*Vere Cinema|60,54|c14*Lovebridge Way|61,54|c0*Joyner Boulevard Police Dept|62,54|c12*a carpark|63,54|c3*Napier Plaza|64,54|c0*Eligius General Hospital|65,54|c9*Turpin Crescent|66,54|c0*a carpark|67,54|c3*the Herbert Building|68,54|c20*the Wotton Building|69,54|c2*a junkyard|70,54|c29*Rathbone Cinema|71,54|c14*Gynn Bank|72,54|c21*the Blencowe Arms|73,54|c10*a warehouse|74,54|c38|p*wasteland|75,54|c8*a warehouse|76,54|c38*the Caffin Building|77,54|c20*Stanbridge Park|78,54|c4*Vine Grove School|79,54|c36*Winscombe Crescent|80,54|c0*Carver Street|81,54|c0*the Isgar Museum|82,54|c34*the Bratt Museum|83,54|c34*the Biddescombe Monument|84,54|c28*the Bennett Building|85,54|c2|p*Pattin Square|86,54|c0*St Matthew's Hospital|87,54|c9*the Burrell Building|88,54|c2*Mules Drive|89,54|c0*the Gyles Monument|90,54|c28*Swale Towers|91,54|c17*Horsey Square Fire Station|92,54|c13*Rake Way|93,54|c0*a factory|94,54|c18*Colquhoun Avenue|95,54|c0*Spenser Road|96,54|c0*Simplicius General Hospital|97,54|c9*the Hawtrey Museum|98,54|c34*Rowbotham Walk|99,54|c0*Club Whittem|0,55|c27*Kempe Auto Repair|1,55|c15*Ivins Towers|2,55|c17*the MacGilvray Hotel|3,55|c30*Brower Lane|4,55|c0*a carpark|5,55|c3*a carpark|6,55|c3*Bowers Boulevard School|7,55|c36*the Sankey Arms|8,55|c10*Murrey Square|9,55|c0*the Gallington Building|10,55|c2*St Lucius's Church|11,55|c7*Hollard Boulevard Railway Station|12,55|c35*a factory|13,55|c18*the Corben Museum|14,55|c34*the Lantrowe Building|15,55|c2|p*St Theodore's Church|16,55|c7*a factory|17,55|c18*Garde Avenue|18,55|c0*the Wall Monument|19,55|c28*a cemetery|20,55|c37*a cemetery|21,55|c37*Crosbie Way|22,55|c0*the Belsten Arms|23,55|c10*Davenport Drive|24,55|c0*Clynton Alley|25,55|c0*Cunstone Alley|26,55|c0*the Doddimeade Motel|27,55|c30*a junkyard|28,55|c29*Salt Street School|29,55|c36*Kirwan Alley School|30,55|c36*Hawke Row|31,55|c0*Rason Auto Repair|32,55|c15*Nurse Lane|33,55|c0*Fathers Street|34,55|c0*wasteland|35,55|c8*a warehouse|36,55|c38*Chyke Avenue|37,55|c0*Ayshe Boulevard|38,55|c0*the Poulter Building|39,55|c20*Gass Lane|40,55|c0*Aires Crescent Fire Station|41,55|c13*Club Creeber|42,55|c27*Spiers Place|43,55|c0*the Gush Monument|44,55|c28*the Singer Building|45,55|c2|p*Gorham Place Railway Station|46,55|c35*Finchley Lane|47,55|c0*the Pers Arms|48,55|c10*Estens Alley|49,55|c0*Stampfordham Avenue|50,55|c0*the Carr Arms|51,55|c10*Markey Square|52,55|c0*a cemetery|53,55|c37*Lacy Cinema|54,55|c14*Beacham Cinema|55,55|c14*the Dann Hotel|56,55|c30*the Batson Museum|57,55|c34*Yeoman Park|58,55|c4*the Went Building|59,55|c20*Hunn Avenue|60,55|c0*the Amis Building|61,55|c2*Cake Walk|62,55|c0*a factory|63,55|c18*the Summer Building|64,55|c2|p*Purchas Alley|65,55|c0*Hildebrand Mall|66,55|c6*Hildebrand Mall|67,55|c6*Gall Lane|68,55|c0*Vivian Cinema|69,55|c14*the Somerton Building|70,55|c2*Gilesi Plaza|71,55|c0*Bragg Row|72,55|c0*St Louis's Hospital|73,55|c9*Fathers Drive|74,55|c0*Chanter Alley Police Dept|75,55|c12*Coomer Square|76,55|c0*a carpark|77,55|c3*a junkyard|78,55|c29*the Collinns Building|79,55|c2*Webber Boulevard|80,55|c0*St Birgitta's Church|81,55|c7*Dinham Alley Police Dept|82,55|c12*Aldhous Drive|83,55|c0*Whale Road|84,55|c0*Macaulay Library|85,55|c11*St Siricius's Hospital|86,55|c9*Norton Square Railway Station|87,55|c35*Club Aldrich|88,55|c27*Laghelegh Drive|89,55|c0*Attrill Lane|90,55|c0*a carpark|91,55|c3*Neale Street|92,55|c0*Edkins Auto Repair|93,55|c15*Moorse Cinema|94,55|c14*Slack Bank|95,55|c21*Elvins Auto Repair|96,55|c15*the Sinnott Monument|97,55|c28*Deny Street|98,55|c0*the Silcock Building|99,55|c2*a warehouse|0,56|c38*the Timmins Building|1,56|c2*the Mees Monument|2,56|c28*the Ashwin Building|3,56|c2|p*Sullivan Walk|4,56|c0*the Heneage Monument|5,56|c28*the Lane Monument|6,56|c28*the Estmond Museum|7,56|c34*the Crawshaw Building|8,56|c2*Cleverly Lane|9,56|c0*Schandua Auto Repair|10,56|c15*a cemetery|11,56|c37*the Egan Museum|12,56|c34*St Innocent's Church|13,56|c7*Beckett Walk|14,56|c0*wasteland|15,56|c8*a cemetery|16,56|c37*Downing Library|17,56|c11*the Whitmey Arms|18,56|c10*the Roach Arms|19,56|c10*wasteland|20,56|c8*Cornwall Park|21,56|c4*Pegg Avenue|22,56|c0*a warehouse|23,56|c38*Club Cother|24,56|c27*the Hayler Building|25,56|c2|p*the Pollitt Monument|26,56|c28*wasteland|27,56|c8*a junkyard|28,56|c29*Sturmey Lane|29,56|c0*Fudge Road|30,56|c0*Crape Drive|31,56|c0*Mitchell Drive|32,56|c0*Gridley Crescent|33,56|c0*the Boait Arms|34,56|c10*a warehouse|35,56|c38*Maul Row Police Dept|36,56|c12*the Waddams Arms|37,56|c10*the Randle Monument|38,56|c28*a junkyard|39,56|c29*Ore Drive|40,56|c0*the Vimpany Building|41,56|c2*" +
        "English Drive School|42,56|c36*a junkyard|43,56|c29*a factory|44,56|c18*Donne Library|45,56|c11*wasteland|46,56|c8*a factory|47,56|c18*Henning Place|48,56|c0*Rippon Library|49,56|c11*Club Twycrosse|50,56|c27*Catherine General Hospital|51,56|c9*St Augustine's Church|52,56|c7*Dorey Walk|53,56|c0*wasteland|54,56|c8*the Sertin Building|55,56|c2|p*Salvage Row|56,56|c0*Club Bartin|57,56|c27*Forse Walk School|58,56|c36*Frye Way|59,56|c0*a carpark|60,56|c3*the Sage Building|61,56|c2*Mayo Row Police Dept|62,56|c12*wasteland|63,56|c8*the Wrench Hotel|64,56|c30*Sloper Row|65,56|c0*Hildebrand Mall|66,56|c6*Hildebrand Mall|67,56|c6*Rawlins Row Police Dept|68,56|c12*the Gregors Building|69,56|c2*wasteland|70,56|c8*Denis General Hospital|71,56|c9*Whitehorn Boulevard|72,56|c0*a junkyard|73,56|c29*Forbes Boulevard|74,56|c0*Frye Auto Repair|75,56|c15*Pegg Square Railway Station|76,56|c35*Sarell Plaza|77,56|c0*Cape Avenue Police Dept|78,56|c12*Bunt Place School|79,56|c36*a warehouse|80,56|c38*Perks Avenue Railway Station|81,56|c35*Howes Square School|82,56|c36*the Norvell Arms|83,56|c10*Dolbridge Street|84,56|c0*Youngan Boulevard|85,56|c0*Glynn Bank|86,56|c21*St Martin's Church|87,56|c7*St Elisabeth's Hospital|88,56|c9*Shum Plaza|89,56|c0*Rogers Road|90,56|c0*Fenwyk Avenue|91,56|c0*a warehouse|92,56|c38*the Kingham Building|93,56|c2*Toller Lane|94,56|c0*Darnell Square|95,56|c0*St Irenaeus's Church|96,56|c7*the Barynes Monument|97,56|c28*Martine Avenue|98,56|c0*the Alcock Building|99,56|c2*Spry Road Police Dept|0,57|c12*Woof Plaza School|1,57|c36*Viney Place|2,57|c0*Lees Boulevard Police Dept|3,57|c12*a warehouse|4,57|c38*Veazey Plaza|5,57|c0*Greatwood Road|6,57|c0*a warehouse|7,57|c38*a factory|8,57|c18*Spooner Lane|9,57|c0*the Schandua Museum|10,57|c34*Hamblin Park|11,57|c4*Connor Walk|12,57|c0*St Vladimir's Church|13,57|c7*the Pope Museum|14,57|c34*Waggott Row|15,57|c0*a carpark|16,57|c3*Adams Lane|17,57|c0*Ord Alley|18,57|c0*the Anning Building|19,57|c2*a factory|20,57|c18*Nutl Drive|21,57|c0*Mear Auto Repair|22,57|c15*wasteland|23,57|c8*Furzey Park|24,57|c4*St Willibrord's Hospital|25,57|c9*Beer Towers|26,57|c17*Mellier Plaza|27,57|c0*the Shiel Building|28,57|c2*Club Trebley|29,57|c27*Shorey Place|30,57|c0*Tyrrell Plaza School|31,57|c36*the Longman Building|32,57|c2*the Pittman Building|33,57|c20*the Spurway Hotel|34,57|c30*Towning Street|35,57|c0*wasteland|36,57|c8*Teek Boulevard Police Dept|37,57|c12*Auston Walk|38,57|c0*James General Hospital|39,57|c9*Gillam Street|40,57|c0*Hollester Boulevard Fire Station|41,57|c13*Kingslake Walk Fire Station|42,57|c13*Pigitt Square Fire Station|43,57|c13*Kerswill Square|44,57|c0*Dustan Avenue|45,57|c0*Whitehorn Street|46,57|c0*wasteland|47,57|c8*Budgell Walk|48,57|c0*Munford Cinema|49,57|c14*Maddaford Grove|50,57|c0*the Moseley Building|51,57|c20*Dix Row|52,57|c0*St Maria's Church|53,57|c7*a cemetery|54,57|c37*Skemp Road|55,57|c0*a factory|56,57|c18*the Sprackett Building|57,57|c2*the Cabell Arms|58,57|c10*the Betty Building|59,57|c2*Priscott Grove|60,57|c0*Dunlap Way|61,57|c0*the Dafforn Building|62,57|c2*Gillman Lane|63,57|c0*Woodland Lane|64,57|c0*Forward Cinema|65,57|c14*Drewitt Road|66,57|c0*Chalderwood Road Railway Station|67,57|c35*a factory|68,57|c18*the Kirkland Arms|69,57|c10*Margaret General Hospital|70,57|c9*Alderson Walk|71,57|c0*Cornelius Walk|72,57|c0*a warehouse|73,57|c38*the Champneys Building|74,57|c2*Club Somerton|75,57|c27*St Ethelbert's Church|76,57|c7*Southcott Plaza Fire Station|77,57|c13*a warehouse|78,57|c38*Stadling Walk Police Dept|79,57|c12*Tilly Row Police Dept|80,57|c12*Bellis Park|81,57|c4*Herick Bank|82,57|c21*Jotcham Bank|83,57|c21*a warehouse|84,57|c38*wasteland|85,57|c8*the Paviour Building|86,57|c2*a cemetery|87,57|c37*Weatherhead Park|88,57|c4*Lakey Way|89,57|c0*Durban Library|90,57|c11*St Hilary's Church|91,57|c7*Trechmann Boulevard|92,57|c0*Cowley Walk|93,57|c0*the Baylis Building|94,57|c2*Edmonds Boulevard|95,57|c0*Wingate Park|96,57|c4*a cemetery|97,57|c37*the Bransom Building|98,57|c2*Tolman Power Station|99,57|c19*wasteland|0,58|c8*Higdon Crescent|1,58|c0*Falvey Boulevard|2,58|c0*Riddles Place|3,58|c0*Blaxall Way Police Dept|4,58|c12*a warehouse|5,58|c38*St Wolfgang's Hospital|6,58|c9*Pye Street|7,58|c0*the Whitcombe Hotel|8,58|c30*Club Allerston|9,58|c27*Maidment Drive|10,58|c0*the Bles Building|11,58|c2*Essexe Lane Fire Station|12,58|c13*a cemetery|13,58|c37*a carpark|14,58|c3*Gunnynghame Alley|15,58|c0*the Mullen Monument|16,58|c28*Allerston Park|17,58|c4*Merryweather Plaza|18,58|c0*Strike Plaza|19,58|c0*Lomax Alley School|20,58|c36*the Mees Building|21,58|c2*a warehouse|22,58|c38*wasteland|23,58|c8*Wedderburn Auto Repair|24,58|c15*the Tryon Building|25,58|c2*Clayton Cinema|26,58|c14*Phillipps Plaza|27,58|c0*the Metcalfe Museum|28,58|c34*a factory|29,58|c18*Doyle Street|30,58|c0*the Flagg Monument|31,58|c28*Gaye Towers|32,58|c17*Club Chalderwood|33,58|c27*Stephens Street|34,58|c0*Carslake Towers|35,58|c17*Squibbs Row|36,58|c0*Bushrod Square|37,58|c0*St Teresa's Church|38,58|c7*wasteland|39,58|c8*Haggett Place|40,58|c0*Stedham Crescent|41,58|c0*St Herman's Church|42,58|c7*a carpark|43,58|c3*Deem Drive|44,58|c0*Burch Walk|45,58|c0*Crowly Way|46,58|c0*a junkyard|47,58|c29*Abarough Park|48,58|c4*wasteland|49,58|c8*a junkyard|50,58|c29*Wiseman Place|51,58|c0*Rowson Cinema|52,58|c14*Daynes Alley Police Dept|53,58|c12*a warehouse|54,58|c38*wasteland|55,58|c8*Back Place School|56,58|c36*Kersley Mansion|57,58|c25*Kersley Mansion|58,58|c25*Lorenzo General Hospital|59,58|c9*Line Street|60,58|c0*Templeton Boulevard|61,58|c0*Oatley Drive|62,58|c0*Lynham Bank|63,58|c21*Culling Auto Repair|64,58|c15*Tetley Road|65,58|c0*a factory|66,58|c18*St Arnold's Church|67,58|c7*the Nicks Arms|68,58|c10*Poultney Street Fire Station|69,58|c13*Roynon Road|70,58|c0*Chudleigh Walk|71,58|c0*the Podger Hotel|72,58|c30*Keeffe Square|73,58|c0*the Mallack Museum|74,58|c34*the Clatworthy Arms|75,58|c10*the Tredaway Building|76,58|c2*Pellatt Auto Repair|77,58|c15*Oldidge Way|78,58|c0*the Maver Building|79,58|c20*the Custard Museum|80,58|c34*the Breay Building|81,58|c2*Keppel Towers|82,58|c17*William Grove|83,58|c0*Bidgway Way|84,58|c0*a factory|85,58|c18*the Rosser Museum|86,58|c34*the Downes Building|87,58|c2*a carpark|88,58|c3*Guttridge Drive|89,58|c0*Whatmore Lane|90,58|c0*Studham Row|91,58|c0*the Wimble Museum|92,58|c34*a junkyard|93,58|c29*the Rye Arms|94,58|c10*the Pape Motel|95,58|c30*Dorlan Drive|96,58|c0*a carpark|97,58|c3*Burges Towers|98,58|c17*Tolman Power Station|99,58|c19*St Laurence's Church|0,59|c7*Wigfield Avenue|1,59|c0*Club Whittard|2,59|c27*Upsdale Bank|3,59|c21*the Merson Building|4,59|c20*the Langner Building|5,59|c2*the Maidment Building|6,59|c2*the Pincoffs Building|7,59|c2*Bastable Alley|8,59|c0*a carpark|9,59|c3*a carpark|10,59|c3*Southern Lane|11,59|c0*the Holly Building|12,59|c2*St Maximillian's Hospital|13,59|c9*the Henstridge Arms|14,59|c10*Rutter Grove|15,59|c0*a junkyard|16,59|c29*the Sparke Monument|17,59|c28*Gervais Lane|18,59|c0*Dampier Lane|19,59|c0*the Potts Motel|20,59|c30*a carpark|21,59|c3*Club Lynn|22,59|c27*Braund Lane|23,59|c0*Question Place|24,59|c0*Lawrance Avenue|25,59|c0*the Linley Monument|26,59|c28*the Hambro Building|27,59|c2*Lock Street|28,59|c0*Tarasius General Hospital|29,59|c9*Templer Street|30,59|c0*the Colesworthy Monument|31,59|c28*the Crofts Arms|32,59|c10*the Zeally Arms|33,59|c10*Burlton Park|34,59|c4*the Thornhill Museum|35,59|c34*Foote Park|36,59|c4*wasteland|37,59|c8*Danford Square|38,59|c0*a cemetery|39,59|c37*Hiblett Alley|40,59|c0*Cread Towers|41,59|c17*the Latchem Hotel|42,59|c30*a cemetery|43,59|c37*Moffat Grove|44,59|c0*Club Record|45,59|c27*Deed Library|46,59|c11*the Sulley Monument|47,59|c28*the Butland Arms|48,59|c10*Cornick Way|49,59|c0*the Tomalin Building|50,59|c2*wasteland|51,59|c8*Templeton Crescent|52,59|c0*Johnstone Towers|53,59|c17*wasteland|54,59|c8*Youings Towers|55,59|c17*the Hervey Building|56,59|c2*Kersley Mansion|57,59|c25*Kersley Mansion|58,59|c25*the Higgs Monument|59,59|c28*Brabner Square|60,59|c0*Alaway Row|61,59|c0*Mist Cinema|62,59|c14*Shwalbe Lane|63,59|c0*Blaimen Square|64,59|c0*Crooker Bank|65,59|c21*Keyford Row|66,59|c0*the Drewe Building|67,59|c2*the Ker Building|68,59|c2*Rillie Bank|69,59|c21*Pardoe Square Fire Station|70,59|c13*Trezise Library|71,59|c11*Brendon Walk|72,59|c0*Guilford Alley|73,59|c0*a junkyard|74,59|c29*St Deusdedit's Hospital|75,59|c9*the Corp Building|76,59|c2*Cottrill Square|77,59|c0*Taverner Towers|78,59|c17*Pollitt Street School|79,59|c36*Leaman Grove School|80,59|c36*Whitlock Way Railway Station|81,59|c35*Jacquet Walk|82,59|c0*Pasmore Alley|83,59|c0*Blobole Park|84,59|c4*a warehouse|85,59|c38*the Argile Arms|86,59|c10*the Meatyard Building|87,59|c2*the Hanne Arms|88,59|c10*the Theirs Monument|89,59|c28*the Parkinson Building|90,59|c2*Clear Drive|91,59|c0*Bidgood Square|92,59|c0*Gibbs Avenue|93,59|c0*Capron Way|94,59|c0*Hood Walk|95,59|c0*Cowdry Walk|96,59|c0*Uppill Place|97,59|c0*Bridgewater Square School|98,59|c36*the Colbourne Arms|99,59|c10*a cemetery|0,60|c37*the Hardin Monument|1,60|c28*Blacktop Way|2,60|c0*the Gillham Monument|3,60|c28*Club Bolt|4,60|c27*Coffin Park|5,60|c4*a warehouse|6,60|c38*Henning Alley|7,60|c0*Mountstevens Boulevard|8,60|c0*the Woolf Monument|9,60|c28*a warehouse|10,60|c38*Dye Boulevard Railway Station|11,60|c35*the Davies Building|12,60|c2*a carpark|13,60|c3*Pain Way|14,60|c0*Stokes Boulevard|15,60|c0*England Grove|16,60|c0*a factory|17,60|c18*a junkyard|18,60|c29*Spiers Boulevard|19,60|c0*Hoy Square|20,60|c0*Worthington Library|21,60|c11*the Gaze Building|22,60|c2*Nicks Square|23,60|c0*the Kiddell Monument|24,60|c28*a factory|25,60|c18*Bugby Bank|26,60|c21*the Kelland Motel|27,60|c30*Langman Lane Fire Station|28,60|c13*Gilling Road Railway Station|29,60|c35*Bragg Park|30,60|c4*Naisbitt Auto Repair|31,60|c15*Kippins Row Fire Station|32,60|c13*Dodimead Bank|33,60|c21*St John's Hospital|34,60|c9*Langbrick Street|35,60|c0*Guyatt Plaza|36,60|c0*the Revell Arms|37,60|c10*Club Spordel|38,60|c27*the Turpin Hotel|39,60|c30*Mapletoft Way|40,60|c0*the Mycock Building|41,60|c2*the Perriott Museum|42,60|c34*Anne General Hospital|43,60|c9*the Abraham Museum|44,60|c34*Wheaton Avenue Police Dept|45,60|c12*Tuckey Crescent|46,60|c0*the Hort Hotel|47,60|c30*Lay Road Police Dept|48,60|c12*the Vearncombe Building|49,60|c2*Finnerty Auto Repair|50,60|c15*Jarrett Towers|51,60|c17*a factory|52,60|c18*wasteland|53,60|c8*a warehouse|54,60|c38*Carye Drive|55,60|c0*Dugan Way|56,60|c0*the Geake Building|57,60|c2*Batting Way|58,60|c0*Chalderwood Bank|59,60|c21*Dean Lane|60,60|c0*wasteland|61,60|c8*St Oswald's Church|62,60|c7*a cemetery|63,60|c37*Candy Avenue|64,60|c0*Wyche Plaza|65,60|c0*Power Towers|66,60|c17*a junkyard|67,60|c29*Garrow Drive Fire Station|68,60|c13*Paskin Square Fire Station|69,60|c13*wasteland|70,60|c8*Lindsey Square|71,60|c0*the Blocksidge Building|72,60|c20*the Burfield Motel|73,60|c30*the Curtice Building|74,60|c2*Scallon Lane|75,60|c0*the Leggetter Motel|76,60|c30*a carpark|77,60|c3*Dinwoodie Auto Repair|78,60|c15*Peter General Hospital|79,60|c9*Club Threadgould|80,60|c27*Shyar Cinema|81,60|c14*Chatwin Library|82,60|c11*Gelasius General Hospital|83,60|c9*the Dinovan Monument|84,60|c28*the Cork Building|85,60|c2*a junkyard|86,60|c29*wasteland|87,60|c8*Monck Auto Repair|88,60|c15*Standfield Towers|89,60|c17*Trett Bank|90,60|c21*Hembury Boulevard Railway Station|91,60|c35*the Pirie Motel|92,60|c30*Vallis Plaza Fire Station|93,60|c13*wasteland|94,60|c8*the Tribe Building|95,60|c20*the Wellstead Building|96,60|c2*Elford Lane|97,60|c0*Potenger Library|98,60|c11*Hossam Crescent|99,60|c0*Fennell Plaza|0,61|c0*Souden Plaza|1,61|c0*the Dewberry Building|2,61|c2*the Lawler Museum|3,61|c34*the Farley Monument|4,61|c28*Gorham Row|5,61|c0*Foreman Drive|6,61|c0*St Matheos's Hospital|7,61|c9*Wakeham Street Railway Station|8,61|c35*wasteland|9,61|c8*Westcott Avenue|10,61|c0*Aylmer Row|11,61|c0*Cooksley Bank|12,61|c21*Coleridge Crescent Railway Station|13,61|c35*wasteland|14,61|c8*Grandier Place|15,61|c0*Chidley Row Fire Station|16,61|c13*the Woodyatt Museum|17,61|c34*Howord Way|18,61|c0*Leat Street|19,61|c0*Brittan Row School|20,61|c36*Somerfield Drive|21,61|c0*Judge Road Police Dept|22,61|c12*wasteland|23,61|c8*the Bewley Building|24,61|c2*Masey Drive|25,61|c0*Puckard Cinema|26,61|c14*the Boulting Building|27,61|c2*wasteland|28,61|c8*Luttrell Plaza|29,61|c0*Montague Alley|30,61|c0*Spurling Street|31,61|c0*Hellear Alley|32,61|c0*Mattick Towers|33,61|c17*Robertson Walk Police Dept|34,61|c12*Gristwood Lane|35,61|c0*the Brookman Arms|36,61|c10*the Bridge Museum|37,61|c34*Mawdley Avenue|38,61|c0*a carpark|39,61|c3*Club Androwes|40,61|c27*Eustace Avenue|41,61|c0*Anstice Avenue|42,61|c0*Stewart Crescent|43,61|c0*St Piran's Church|44,61|c7*St Lucius's Church|45,61|c7*the Hall Arms|46,61|c10*Harenc Lane|47,61|c0*the Willcocks Building|48,61|c2*a junkyard|49,61|c29*Calvert Grove Railway Station|50,61|c35*Wilcox Crescent|51,61|c0*Lunn Lane|52,61|c0*a junkyard|53,61|c29*Pardoe Grove|54,61|c0*Lucy Cinema|55,61|c14*Club Skardon|56,61|c27*Ashcroft Library|57,61|c11*Doben Square|58,61|c0*the Keane Museum|59,61|c34*the Bryant Building|60,61|c2*Sweetapple Park|61,61|c4*the Starr Monument|62,61|c28*Wimbridge Boulevard Fire Station|63,61|c13*the Fielding Monument|64,61|c28*Coy Cinema|65,61|c14*Kemys Towers|66,61|c17*Godwin Square School|67,61|c36*Kelher Walk|68,61|c0*Dotin Walk|69,61|c0*the Grinham Building|70,61|c2*a factory|71,61|c18*Whitesides Bank|72,61|c21*Willington Plaza|73,61|c0*Hepplethwaite Place School|74,61|c36*Dane Street Police Dept|75,61|c12*Pullinger Auto Repair|76,61|c15*Morrell Bank|77,61|c21*Court Street|78,61|c0*Rillie Cinema|79,61|c14*wasteland|80,61|c8*Goddard Way|81,61|c0*Club Atthill|82,61|c27*St John's Cathedral|83,61|cathedral*St John's Cathedral|84,61|cathedral*Goodford Road Police Dept|85,61|c12*wasteland|86,61|c8*Pearson Road|87,61|c0*wasteland|88,61|c8*wasteland|89,61|c8*Yeandill Way|90,61|c0*a factory|91,61|c18*Wharam Towers|92,61|c17*the Grisewood Monument|93,61|c28*wasteland|94,61|c8*Bending Walk|95,61|c0*Bellhouse Road|96,61|c0*Hubbard Avenue|97,61|c0*Newstead Place|98,61|c0*Drury Auto Repair|99,61|c15*Vann Road|0,62|c0*wasteland|1,62|c8*a factory|2,62|c18*Tyler Boulevard|3,62|c0*Hayce Auto Repair|4,62|c15*Club Greswell|5,62|c27*Bampfyld Drive|6,62|c0*the Breeden Arms|7,62|c10*Youl Drive|8,62|c0*the Shenton Museum|9,62|c34*Ashenden Way Police Dept|10,62|c12*Sheridan Street|11,62|c0*the Plummer Arms|12,62|c10*Rourke Grove|13,62|c0*a carpark|14,62|c3*Megamax Cinema|15,62|c14*Maunder Walk|16,62|c0*Craig Drive|17,62|c0*Farrand Plaza|18,62|c0*Philips Bank|19,62|c21*Bromwich Park|20,62|c4*the Boddy Motel|21,62|c30*wasteland|22,62|c8*Club Burney|23,62|c27*Letham Avenue|24,62|c0*the Backer Building|25,62|c2*Pullin Avenue School|26,62|c36*St Barnabas's Church|27,62|c7*Herbert Road Police Dept|28,62|c12*Checketts Walk|29,62|c0*Heal Walk|30,62|c0*Wester Boulevard|31,62|c0*a junkyard|32,62|c29*Hewlet Park|33,62|c4*Turner Walk Railway Station|34,62|c35*Lowndes Park|35,62|c4*Grills Cinema|36,62|c14*Rolls Road|37,62|c0*the Uzzell Museum|38,62|c34*a carpark|39,62|c3*the Saturley Building|40,62|c2*Dollen Alley|41,62|c0*Yendole Grove|42,62|c0*wasteland|43,62|c8*the Silvester Monument|44,62|c28*Rayfield Crescent|45,62|c0*Chaffie Library|46,62|c11*Luckwell Plaza|47,62|c0*Pickering Boulevard|48,62|c0*Landucci Walk|49,62|c0*the Rayfield Building|50,62|c2*wasteland|51,62|c8*Milne Library|52,62|c11*Club Vicary|53,62|c27*Rush Way|54,62|c0*Lewington Street|55,62|c0*Sletery Row|56,62|c0*Doman Park|57,62|c4*Hemore Auto Repair|58,62|c15*Burnley Way|59,62|c0*Peter General Hospital|60,62|c9*Cossins Way|61,62|c0*Woodroffe Mall|62,62|c6*Woodroffe Mall|63,62|c6*a junkyard|64,62|c29*a warehouse|65,62|c38*a warehouse|66,62|c38*Burnham Way|67,62|c0*Annesley Way|68,62|c0*Witheroll Crescent|69,62|c0*Club Head|70,62|c27*Willshire Boulevard|71,62|c0*St Gregory's Hospital|72,62|c9*the Nott Museum|73,62|c34*St Lorenzo's Church|74,62|c7*Stickling Park|75,62|c4*Burt Square Police Dept|76,62|c12*the Elsbury Arms|77,62|c10*the Rishton Building|78,62|c2*Birkbeck Alley|79,62|c0*the Godfry Museum|80,62|c34*the Buckett Building|81,62|c2*Boulter Way|82,62|c0*St John's Cathedral|83,62|cathedral*St John's Cathedral|84,62|cathedral*the Daniels Museum|85,62|c34*a warehouse|86,62|c38*a junkyard|87,62|c29*Copperthwaite Street|88,62|c0*wasteland|89,62|c8*Pettyfer Towers|90,62|c17*Bowell Boulevard School|91,62|c36*Ralph Street School|92,62|c36*Owen Lane|93,62|c0*Peake Drive|94,62|c0*Mounty Street|95,62|c0*a junkyard|96,62|c29*the Tibbotts Building|97,62|c2*Richard General Hospital|98,62|c9*Philips Plaza|99,62|c0*a junkyard|0,63|c29*a carpark|1,63|c3*Dymock Drive|2,63|c0*Squibbs Crescent|3,63|c0*Devonish Avenue|4,63|c0*Margaret General Hospital|5,63|c9*Mesney Drive Railway Station|6,63|c35*Gwilliam Cinema|7,63|c14*a warehouse|8,63|c38*MacDonald Square|9,63|c0*St Andrew's Hospital|10,63|c9*Sixtus General Hospital|11,63|c9*Linttell Plaza|12,63|c0*a junkyard|13,63|c29*Hudleston Walk|14,63|c0*Millington Towers|15,63|c17|p*Feltham Place Railway Station|16,63|c35*Luff Way School|17,63|c36*Toley Grove Railway Station|18,63|c35*a warehouse|19,63|c38*Leonard Street|20,63|c0*Bently Auto Repair|21,63|c15*the Fear Building|22,63|c2*the Ogborn Building|23,63|c2*the Pilgrim Hotel|24,63|c30*a warehouse|25,63|c38*the Travers Building|26,63|c2*a cemetery|27,63|c37*Bullimore Road|28,63|c0*the Patterson Hotel|29,63|c30*the Hewlet Museum|30,63|c34*Bidgood Way Police Dept|31,63|c12*Matthias General Hospital|32,63|c9*Waggott Grove|33,63|c0*Aldworth Walk|34,63|c0*Langbrick Street|35,63|c0*the Estlin Building|36,63|c2|p*Beavis Drive|37,63|c0*a factory|38,63|c18*Banjafield Grove|39,63|c0*the Tulk Motel|40,63|c30*Alphege General Hospital|41,63|c9*the Bratt Arms|42,63|c10*Purlewent Library|43,63|c11*the Shuttle Building|44,63|c2*St Gall's Church|45,63|c7*a cemetery|46,63|c37*the Beable Monument|47,63|c28*the Naper Building|48,63|c2*Brookeman Lane|49,63|c0*a junkyard|50,63|c29*the Stanbury Monument|51,63|c28*Club Cummings|52,63|c27*Potter Park|53,63|c4*the Baskcomb Museum|54,63|c34*Grey Library|55,63|c11|p*Oliver Alley|56,63|c0*Dimond Lane School|57,63|c36*Denty Walk|58,63|c0*wasteland|59,63|c8*a warehouse|60,63|c38*Corpe Park|61,63|c4*Woodroffe Mall|62,63|c6*Woodroffe Mall|63,63|c6*Conolly Row Fire Station|64,63|c13*St Joachim's Hospital|65,63|c9*Prowse Way|66,63|c0*Cunningham Street|67,63|c0*the Sequeira Motel|68,63|c30*Humpfries Walk|69,63|c0*St Emelia's Church|70,63|c7*Harewood Park|71,63|c4*Gear Alley|72,63|c0*Wootton Square|73,63|c0*Club Dowdall|74,63|c27*Nickols Drive|75,63|c0*the Mydleham Building|76,63|c20*Plummer Avenue|77,63|c0*Bruton Lane|78,63|c0*Vautier Place School|79,63|c36*wasteland|80,63|c8*the Pearson Monument|81,63|c28*Ling Boulevard Police Dept|82,63|c12*Attrill Bank|83,63|c21*Lister Alley|84,63|c0*Baker Walk|85,63|c0*the Yapp Building|86,63|c2*Cureton Lane School|87,63|c36*Pople Place School|88,63|c36*Colwill Grove Railway Station|89,63|c35*Essell Road|90,63|c0*a factory|91,63|c18*Routh Bank|92,63|c21*Ford Drive|93,63|c0*a junkyard|94,63|c29*Blatchly Avenue|95,63|c0*Bendell Walk|96,63|c0*Wagstaff Lane|97,63|c0*Mallett Towers|98,63|c17*a factory|99,63|c18*the Dewberry Building|0,64|c2*the Wensleydale Arms|1,64|c10*a junkyard|2,64|c29*Antheros General Hospital|3,64|c9*the Theobald Building|4,64|c2|p*Levy Drive|5,64|c0*Clement Library|6,64|c11*Hewson Crescent|7,64|c0*Herman Square|8,64|c0*Deacon Drive|9,64|c0*Classey Drive|10,64|c0*Hope Crescent Railway Station|11,64|c35*Hardstaff Way|12,64|c0*Priscott Cinema|13,64|c14*St Basil's Hospital|14,64|c9*Bulford Auto Repair|15,64|c15*the Noakes Arms|16,64|c10*the Curme Building|17,64|c2*Pyle Crescent School|18,64|c36*Graver Park|19,64|c4*a junkyard|20,64|c29*Hannam Crescent|21,64|c0*Male Boulevard|22,64|c0*Gatford Towers|23,64|c17|p*Julie General Hospital|24,64|c9*a carpark|25,64|c3*Dear Street Police Dept|26,64|c12*Seage Boulevard|27,64|c0*Dawbin Lane School|28,64|c36*Kennington Crescent|29,64|c0*Tickle Row|30,64|c0*the Flooks Building|31,64|c20*Nottidge Way|32,64|c0*a warehouse|33,64|c38*St Callistus's Church|34,64|c7*McNally Cinema|35,64|c14*a factory|36,64|c18*the Culling Building|37,64|c20*a factory|38,64|c18*the Harrold Museum|39,64|c34*a carpark|40,64|c3*Daubeney Avenue|41,64|c0*Cullen Library|42,64|c11*wasteland|43,64|c8*Ewer Auto Repair|44,64|c15*Venner Library|45,64|c11*wasteland|46,64|c8*wasteland|47,64|c8*Candy Row Railway Station|48,64|c35*the Loader Motel|49,64|c30*the Elcomb Building|50,64|c2*Grizel Plaza|51,64|c0*Rodgers Boulevard|52,64|c0*Dinsdale Auto Repair|53,64|c15*Swithun General Hospital|54,64|c9*the Williames Building|55,64|c2*Hickey Square|56,64|c0*Brocbury Alley|57,64|c0*Bengefield Towers|58,64|c17*Elliot Alley|59,64|c0*Zeally Grove|60,64|c0*a factory|61,64|c18*the Wakley Building|62,64|c2*Powsell Road|63,64|c0*the Prangnell Arms|64,64|c10*Tavener Library|65,64|c11*the Pearson Building|66,64|c2*Diaper Library|67,64|c11*Club Shearly|68,64|c27*a warehouse|69,64|c38*Gajewski Boulevard Railway Station|70,64|c35*Beer Place School|71,64|c36*Kening Walk|72,64|c0*Blight Park|73,64|c4*Templar Place|74,64|c0*Whitehorn Grove|75,64|c0*Exon Alley Railway Station|76,64|c35|p*Brely Avenue|77,64|c0*Billings Way|78,64|c0*the Beville Hotel|79,64|c30*Bickley Street|80,64|c0*Stanbury Lane|81,64|c0*Blabey Drive|82,64|c0*Bubcar Towers|83,64|c17|p*the Pilyer Hotel|84,64|c30*a junkyard|85,64|c29*Club Izzard|86,64|c27*Beall Boulevard Railway Station|87,64|c35*Kidner Walk|88,64|c0*Chidgey Avenue|89,64|c0*Cunliffe Lane|90,64|c0*a carpark|91,64|c3*St Willibrord's Church|92,64|c7*Caldecott Library|93,64|c11*the Owsley Building|94,64|c20*Hooker Bank|95,64|c21*Gummer Bank|96,64|c21*the Hawarden Building|97,64|c2*Guppy Boulevard|98,64|c0*the Hosken Building|99,64|c20*Leggatt Grove|0,65|c0*Crew Road School|1,65|c36*Hame Park|2,65|c4*Herick Crescent|3,65|c0*Eason Drive|4,65|c0*Furneaux Square Fire Station|5,65|c13*a warehouse|6,65|c38*Lutman Row|7,65|c0*Caselley Road|8,65|c0*MacRae Park|9,65|c4*the Pullman Building|10,65|c2*Pincher Library|11,65|c11*a warehouse|12,65|c38*a warehouse|13,65|c38*a carpark|14,65|c3*Rodman Auto Repair|15,65|c15*Pring Bank|16,65|c21*St Tsarevna's Church|17,65|c7*Gilpin Plaza|18,65|c0*the Perratt Building|19,65|c2*Neot General Hospital|20,65|c9*the Saul Arms|21,65|c10*the Neary Monument|22,65|c28*Corbin Alley Railway Station|23,65|c35*the Hebditch Building|24,65|c20*a factory|25,65|c18*Empson Park|26,65|c4*a carpark|27,65|c3*Shipp Way School|28,65|c36*the Geldeard Building|29,65|c2*Ludlow Avenue|30,65|c0*a factory|31,65|c18*a warehouse|32,65|c38*Chidzey Way|33,65|c0*a cemetery|34,65|c37*Piegsa Street Railway Station|35,65|c35*Ludlow Alley|36,65|c0*Mays Boulevard Fire Station|37,65|c13*wasteland|38,65|c8*Chamberlaine Street School|39,65|c36*Goodson Crescent|40,65|c0*a junkyard|41,65|c29*Tancock Park|42,65|c4*Strutt Towers|43,65|c17|p*Haskins Alley|44,65|c0*Pantling Crescent|45,65|c0*Semple Place|46,65|c0*Pavey Street|47,65|c0*Hook Park|48,65|c4*Brockway Row Fire Station|49,65|c13*the Walter Building|50,65|c2*Passco Avenue School|51,65|c36*Copp Avenue|52,65|c0*the Dodd Monument|53,65|c28*Dempsey Lane Fire Station|54,65|c13*the Horsey Museum|55,65|c34*Harkness Auto Repair|56,65|c15*a factory|57,65|c18*Heath Drive|58,65|c0*the Bowle Museum|59,65|c34*Basher Row Railway Station|60,65|c35*Sears Auto Repair|61,65|c15*the Pettey Monument|62,65|c28*a warehouse|63,65|c38*the Sherren Building|64,65|c2|p*Kingslake Way|65,65|c0*St Boniface's Hospital|66,65|c9*Bailward Way|67,65|c0*Collis Towers|68,65|c17*a carpark|69,65|c3*Wine Street|70,65|c0*the Lathom Building|71,65|c2*the Lawley Motel|72,65|c30*the Spragge Building|73,65|c20*Gerrish Square Fire Station|74,65|c13*Pearse Grove|75,65|c0*Kerby Street|76,65|c0*Commins Bank|77,65|c21*the Toop Motel|78,65|c30*Billett Way|79,65|c0*a factory|80,65|c18*Culling Drive|81,65|c0*Waite Plaza|82,65|c0*wasteland|83,65|c8*a warehouse|84,65|c38*Mitchem Mall|85,65|c6*Mitchem Mall|86,65|c6*Ludlam Drive|87,65|c0*Loveiband Auto Repair|88,65|c15*Feldstein Place|89,65|c0*Firminger Alley|90,65|c0*Ripley Grove|91,65|c0*a warehouse|92,65|c38*the Pitney Building|93,65|c2*the Meacham Motel|94,65|c30|p*a factory|95,65|c18*Solomon Lane Police Dept|96,65|c12*Sellwood Drive Railway Station|97,65|c35*Waggott Cinema|98,65|c14*the Greatorex Building|99,65|c20*Club Guyatt|0,66|c27*Latcham Square|1,66|c0*Moffat Square|2,66|c0*the Standen Building|3,66|c2*the Ganden Monument|4,66|c28*the Antell Building|5,66|c2*Kirby Auto Repair|6,66|c15*Barnicott Walk School|7,66|c36*Crabbe Street|8,66|c0*Surmon Auto Repair|9,66|c15*the Ripley Motel|10,66|c30*the Question Building|11,66|c2*Nancolas Park|12,66|c4*a carpark|13,66|c3*Mainstone Auto Repair|14,66|c15*a carpark|15,66|c3*St Osyth's Church|16,66|c7*a warehouse|17,66|c38*Cupper Walk|18,66|c0*Tanner Crescent|19,66|c0*Horner Avenue School|20,66|c36*a carpark|21,66|c3*Matraves Alley|22,66|c0*Krinks Auto Repair|23,66|c15*the Snelgrove Motel|24,66|c30*Shallet Crescent|25,66|c0*a warehouse|26,66|c38*Knowles Cinema|27,66|c14*Blesley Library|28,66|c11*the Dooley Building|29,66|c2*Rowles Way School|30,66|c36*Dore Street Police Dept|31,66|c12*a junkyard|32,66|c29*the Tassell Monument|33,66|c28*Locket Walk Railway Station|34,66|c35*Eglen Drive|35,66|c0*Hembury Avenue|36,66|c0*the Prangnell Building|37,66|c2*St Sixtus's Church|38,66|c7*Greig Walk|39,66|c0*Cane Row|40,66|c0*Braham Lane|41,66|c0*Gillings Walk|42,66|c0*wasteland|43,66|c8*Moxham Bank|44,66|c21*Cullingford Square|45,66|c0*Luckcraft Drive|46,66|c0*Whitehart Crescent|47,66|c0*Prentice Alley Railway Station|48,66|c35*Johnstone Library|49,66|c11*a factory|50,66|c18*Doig Road Fire Station|51,66|c13*Brickenden Grove|52,66|c0*Langmead Way|53,66|c0*Clarkson Lane Fire Station|54,66|c13*the Raymond Building|55,66|c20*Maybee Cinema|56,66|c14*the Duggan Building|57,66|c2*Carder Row School|58,66|c36*the Rickard Building|59,66|c2*a factory|60,66|c18*Lovering Avenue|61,66|c0*Winward Avenue Police Dept|62,66|c12*the Sidoli Building|63,66|c2*Friend Plaza Police Dept|64,66|c12*Vann Road|65,66|c0*Errington Crescent|66,66|c0*Cowing Walk|67,66|c0*Turford Street|68,66|c0*wasteland|69,66|c8*St Eugene's Church|70,66|c7*Style Towers|71,66|c17*St Piran's Church|72,66|c7*Reay Park|73,66|c4*Club Ainslie|74,66|c27*Lavour Row|75,66|c0*Shore Grove|76,66|c0*Clinch Way Police Dept|77,66|c12*Farbrother Cinema|78,66|c14*the Meade Museum|79,66|c34*a carpark|80,66|c3*Dudd Park|81,66|c4*the Tynte Building|82,66|c2*the Bhore Monument|83,66|c28*Corless Bank|84,66|c21*Mitchem Mall|85,66|c6*Mitchem Mall|86,66|c6*Gregory Crescent|87,66|c0*Reason Towers|88,66|c17*Hodgkins Lane|89,66|c0*Shearstone Boulevard|90,66|c0*the Ramsay Museum|91,66|c34*Knoyle Walk|92,66|c0*Hemmings Auto Repair|93,66|c15*the Kitting Museum|94,66|c34*a factory|95,66|c18*Tancock Walk|96,66|c0*Barens Row Railway Station|97,66|c35*Gifford Way|98,66|c0*Marsh Avenue|99,66|c0*Garton Row|0,67|c0*wasteland|1,67|c8*Derges Drive|2,67|c0*Sinclair Walk|3,67|c0*Osbert Street|4,67|c0*Stevenson Crescent School|5,67|c36*Harmar Library|6,67|c11*Jefferson Square|7,67|c0*Atthill Lane|8,67|c0*the Eelms Building|9,67|c2*the Edgecombe Museum|10,67|c34*Edson Alley|11,67|c0*Bolson Park|12,67|c4*Prangnell Plaza|13,67|c0*Riches Boulevard|14,67|c0*Lowther Square|15,67|c0*Leay Bank|16,67|c21*a cemetery|17,67|c37*Club Perrot|18,67|c27*the Shepard Hotel|19,67|c30*Chubb Auto Repair|20,67|c15*Hayce Auto Repair|21,67|c15*the Anglin Arms|22,67|c10*Smythies Walk|23,67|c0*a junkyard|24,67|c29*a carpark|25,67|c3*Horditch Road|26,67|c0*a carpark|27,67|c3*a carpark|28,67|c3*the Butson Arms|29,67|c10*Holdsworth Row Fire Station|30,67|c13*St Anastasius's Church|31,67|c7*Vaugham Cinema|32,67|c14*Palterman Boulevard|33,67|c0*Strafford Road|34,67|c0*Horton Towers|35,67|c17*wasteland|36,67|c8*Gamis Auto Repair|37,67|c15*a cemetery|38,67|c37*the Edmond Building|39,67|c2*the Bentley Building|40,67|c2*Howarth Library|41,67|c11*Grandfield Row Police Dept|42,67|c12*wasteland|43,67|c8*Ashley Auto Repair|44,67|c15*Hendrich Park|45,67|c4*a carpark|46,67|c3*Boyland Bank|47,67|c21*Hucker Lane|48,67|c0*a carpark|49,67|c3*a carpark|50,67|c3*Broadbery Square|51,67|c0*Clark Row Railway Station|52,67|c35*Luckwell Plaza Police Dept|53,67|c12*wasteland|54,67|c8*Swaffield Plaza|55,67|c0*the Attle Building|56,67|c2*Nash Alley|57,67|c0*Gilles Drive|58,67|c0*a warehouse|59,67|c38*Handel Square|60,67|c0*Keys Cinema|61,67|c14*Tatler Lane|62,67|c0*the Wisby Monument|63,67|c28*Reeves Bank|64,67|c21*wasteland|65,67|c8*the Rayfield Building|66,67|c20*wasteland|67,67|c8*Martine Plaza|68,67|c0*Hamlyn Lane|69,67|c0*Club Ravenhill|70,67|c27*Frauley Row|71,67|c0*Hely Avenue|72,67|c0*a cemetery|73,67|c37*Manaton Way|74,67|c0*Pennecard Park|75,67|c4*wasteland|76,67|c8*the Mahon Building|77,67|c2*Brogan Boulevard School|78,67|c36*Huttenbach Drive|79,67|c0*Clitsome Square|80,67|c0*Hartland Bank|81,67|c21*Caunt Street Police Dept|82,67|c12*Shaft Grove|83,67|c0*wasteland|84,67|c8*Doddington Towers|85,67|c17*Taswell Towers|86,67|c17*Club Quarman|87,67|c27*Dibsdale Avenue|88,67|c0*Whish Towers|89,67|c17*a warehouse|90,67|c38*Lavour Alley|91,67|c0*a carpark|92,67|c3*Isgar Square|93,67|c0*Mace Towers|94,67|c17*the Ridyard Building|95,67|c2*the Wrigley Building|96,67|c2*Organ Avenue|97,67|c0*the Ogborn Arms|98,67|c10*the Richard Museum|99,67|c34*Cherington Drive Fire Station|0,68|c13*Oland Plaza|1,68|c0*the Woolaway Building|2,68|c2*Barker Boulevard School|3,68|c36*the Whitbye Building|4,68|c2*Mores Lane Police Dept|5,68|c12*Methodius General Hospital|6,68|c9*the Bees Building|7,68|c2*St Dorotheus's Church|8,68|c7*a factory|9,68|c18*Sambone Park|10,68|c4*wasteland|11,68|c8*St Innocent's Hospital|12,68|c9*Sedgbeer Auto Repair|13,68|c15*Bently Bank|14,68|c21*wasteland|15,68|c8*the Delamont Building|16,68|c2*Jearum Road|17,68|c0*the Catcott Building|18,68|c2*Turland Bank|19,68|c21*Harold Crescent|20,68|c0*Chorley Way|21,68|c0*the Way Arms|22,68|c10*Kennard Drive|23,68|c0*the Rugg Building|24,68|c2*the Mardon Hotel|25,68|c30*Rollason Towers|26,68|c17*Coghlan Avenue|27,68|c0*Donagan Park|28,68|c4*Woodroffe Crescent|29,68|c0*the Plucknett Building|30,68|c2*Ellison Cinema|31,68|c14*Loweth Avenue|32,68|c0*Cogle Library|33,68|c11*the Piele Building|34,68|c2*the Burrows Museum|35,68|c34*Healy Drive Fire Station|36,68|c13*Rhoden Park|37,68|c4*the Charbonnier Building|38,68|c2*Banting Towers|39,68|c17*the Kening Motel|40,68|c30*Mechel Street|41,68|c0*a carpark|42,68|c3*the Blabey Museum|43,68|c34*Cole Park|44,68|c4*St Ninian's Church|45,68|c7*Harrington Avenue|46,68|c0*the Frognal Motel|47,68|c30*the Parker Building|48,68|c2*Cockle Cinema|49,68|c14*Parris Square|50,68|c0*Whittle Street Railway Station|51,68|c35*Club Goodenough|52,68|c27*Henstridge Avenue|53,68|c0*Empson Alley|54,68|c0*the Charlesworth Hotel|55,68|c30*Raggett Plaza|56,68|c0*St Anselm's Church|57,68|c7*Plumley Alley|58,68|c0*the Willcox Motel|59,68|c30*Keeble Towers|60,68|c17*St Ambrose's Church|61,68|c7*the Mooney Monument|62,68|c28*Pattmore Road|63,68|c0*the Wells Building|64,68|c2*the Chetwynd Monument|65,68|c28*Lake Street Fire Station|66,68|c13*Augarde Lane|67,68|c0*the Ferguson Arms|68,68|c10*Vann Lane|69,68|c0*Curdel Street|70,68|c0*Floyde Walk|71,68|c0*MacLaverty Road|72,68|c0*Gayler Library|73,68|c11*St Birinus's Church|74,68|c7*Blockwood Auto Repair|75,68|c15*the Doubting Building|76,68|c20*Rankin Grove|77,68|c0*a carpark|78,68|c3*Brickenden Park|79,68|c4*Challenger Street|80,68|c0*Sartain Row|81,68|c0*Druce Walk|82,68|c0*Hartleys Boulevard Police Dept|83,68|c12*wasteland|84,68|c8*Paul Plaza|85,68|c0*the Durand Monument|86,68|c28*Sperril Lane|87,68|c0*a warehouse|88,68|c38*a junkyard|89,68|c29*St John's Church|90,68|c7*the Banks Monument|91,68|c28*the Frappell Motel|92,68|c30*St Maurice's Hospital|93,68|c9*Hagopian Lane|94,68|c0*Grey Road|95,68|c0*Colles Street|96,68|c0*a warehouse|97,68|c38*Rabbitts Park|98,68|c4*a carpark|99,68|c3*the Pasker Building|0,69|c2*Pointing Road|1,69|c0*Moberly Cinema|2,69|c14*Willshere Row School|3,69|c36*a junkyard|4,69|c29*a warehouse|5,69|c38*the Ketchell Building|6,69|c2*MacRae Bank|7,69|c21*a junkyard|8,69|c29*Penning Way Railway Station|9,69|c35*Hagger Auto Repair|10,69|c15*Buck Road Railway Station|11,69|c35*Merewether Road Police Dept|12,69|c12*Riglar Road|13,69|c0*Glister Crescent|14,69|c0*Becket Lane|15,69|c0*wasteland|16,69|c8*the Olding Museum|17,69|c34*Maher Park|18,69|c4*wasteland|19,69|c8*Wigglesworth Boulevard|20,69|c0*St Bruno's Hospital|21,69|c9*Club Wricht|22,69|c27*St Joseph's Hospital|23,69|c9*the Lovel Museum|24,69|c34*Whyt Plaza School|25,69|c36*a junkyard|26,69|c29*Mor Street|27,69|c0*the Claxton Museum|28,69|c34*Glass Avenue|29,69|c0*a warehouse|30,69|c38*Lambley Square|31,69|c0*Gawler Row|32,69|c0*Trew Boulevard|33,69|c0*McCreadie Avenue School|34,69|c36*Gummer Bank|35,69|c21*Crespin Grove Railway Station|36,69|c35*the Beckley Hotel|37,69|c30*Thicke Crescent|38,69|c0*the Foreman Building|39,69|c20*Gatley Row|40,69|c0*St Perpetua's Hospital|41,69|c9*the Sillence Monument|42,69|c28*a factory|43,69|c18*the Osment Museum|44,69|c34*a cemetery|45,69|c37*Summers Lane|46,69|c0*the Bowdich Building|47,69|c2*Augarde Lane|48,69|c0*Graddon Way|49,69|c0*Snelgrove Walk|50,69|c0*St Helier's Church|51,69|c7*Sweatman Walk Police Dept|52,69|c12*Gazzard Way|53,69|c0*a junkyard|54,69|c29*Macaulay Cinema|55,69|c14*Terrell Cinema|56,69|c14*a cemetery|57,69|c37*Vines Plaza School|58,69|c36*Dedeystere Square|59,69|c0*the Hellier Monument|60,69|c28*Welsford Park|61,69|c4*a cemetery|62,69|c37*Norvell Crescent|63,69|c0*St Odile's Church|64,69|c7*Cheal Street|65,69|c0*Marcus General Hospital|66,69|c9*Bawden Towers|67,69|c17*Priestly Grove|68,69|c0*the Southcott Building|69,69|c2*the Horwill Hotel|70,69|c30*Peryer Auto Repair|71,69|c15*Chambers Alley|72,69|c0*Anstee Towers|73,69|c17*Waish Plaza|74,69|c0*Hitchfield Alley|75,69|c0*a carpark|76,69|c3*a junkyard|77,69|c29*the Crape Building|78,69|c2*Spinney Alley Fire Station|79,69|c13*the Shortis Building|80,69|c2*Podger Avenue School|81,69|c36*wasteland|82,69|c8*the Salisbury Museum|83,69|c34*wasteland|84,69|c8*the Kirk Building|85,69|c2*the Lees Hotel|86,69|c30*a factory|87,69|c18*Brien Place|88,69|c0*Vellacott Road|89,69|c0*Hyde Avenue|90,69|c0*a cemetery|91,69|c37*St Lorenzo's Church|92,69|c7*a cemetery|93,69|c37*wasteland|94,69|c8*Cawley Square|95,69|c0*the Chicke Building|96,69|c2*Laurel Drive|97,69|c0*Parfet Grove|98,69|c0*Lucius General Hospital|99,69|c9*Castle Library|0,70|c11*Harvey Lane|1,70|c0*the Woolmonton Arms|2,70|c10*Clapp Lane|3,70|c0*the Jeandle Monument|4,70|c28*St Patriarch's Church|5,70|c7*Gawen Avenue|6,70|c0*Lawrance Way|7,70|c0*a junkyard|8,70|c29*a factory|9,70|c18*Bristol Way|10,70|c0*Moon Bank|11,70|c21*Rudman Boulevard|12,70|c0*Massey Drive Railway Station|13,70|c35*Frederick Cinema|14,70|c14*a carpark|15,70|c3*Gilling Lane|16,70|c0*a warehouse|17,70|c38*a carpark|18,70|c3*Retter Crescent|19,70|c0*Marton Park|20,70|c4*Munckton Bank|21,70|c21*Slocombe Street|22,70|c0*Atway Auto Repair|23,70|c15*Elson Way|24,70|c0*the Panes Building|25,70|c2*the Hazeldine Building|26,70|c20*Woolfry Row|27,70|c0*Lenthall Plaza|28,70|c0*Smallwood Cinema|29,70|c14*Tribe Park|30,70|c4*wasteland|31,70|c8*Denton Park|32,70|c4*a warehouse|33,70|c38*wasteland|34,70|c8*Bellhouse Alley|35,70|c0*the Ayling Building|36,70|c2*Perryman Grove|37,70|c0*Rounds Boulevard Police Dept|38,70|c12*Swanton Row|39,70|c0*a factory|40,70|c18*the Stoate Building|41,70|c2*a factory|42,70|c18*Moxham Grove|43,70|c0*Pearcy Bank|44,70|c21*the Merewether Monument|45,70|c28*Marston Way|46,70|c0*a warehouse|47,70|c38*St Paul's Church|48,70|c7*the Jenys Building|49,70|c2*Isherwood Cinema|50,70|c14*Haynes Square|51,70|c0*a factory|52,70|c18*Elliott Grove|53,70|c0*Boorman Walk|54,70|c0*the Vigors Motel|55,70|c30*St Matheos's Hospital|56,70|c9*Minchington Crescent|57,70|c0*Hosken Crescent|58,70|c0*Hook Avenue|59,70|c0*St Danilo's Church|60,70|c7*Whitchurch Cinema|61,70|c14*the Bourder Building|62,70|c2*Beagly Bank|63,70|c21*Blaxall Library|64,70|c11*wasteland|65,70|c8*wasteland|66,70|c8*Kennea Way|67,70|c0*Crossman Auto Repair|68,70|c15*Oates Bank|69,70|c21*Rabbage Place|70,70|c0*Chown Bank|71,70|c21*Dike Lane|72,70|c0*the Podger Building|73,70|c2*Cottrill Square|74,70|c0*Lea Street School|75,70|c36*Pavitt Cinema|76,70|c14*Genin Auto Repair|77,70|c15*wasteland|78,70|c8*the Wetherall Building|79,70|c20*Nicols Way|80,70|c0*wasteland|81,70|c8*Radbourne Walk|82,70|c0*Skyrme Plaza|83,70|c0*Mabey Towers|84,70|c17*Hounsell Street|85,70|c0*Denman Alley|86,70|c0*Bythese Auto Repair|87,70|c15*Burne Bank|88,70|c21*the Lapwood Building|89,70|c2*the Gracewood Building|90,70|c2*wasteland|91,70|c8*Derham Alley|92,70|c0*a junkyard|93,70|c29*Isherwood Avenue|94,70|c0*Eeles Way|95,70|c0*Keeling Walk Railway Station|96,70|c35*the Sevier Building|97,70|c2*Peterson Auto Repair|98,70|c15*Vaughan Drive|99,70|c0*the Rickard Hotel|0,71|c30*the Seaman Museum|1,71|c34*a junkyard|2,71|c29*Waddon Boulevard|3,71|c0*a carpark|4,71|c3*Castlehow Boulevard|5,71|c0*Dolbridge Plaza|6,71|c0*St Daniel's Hospital|7,71|c9*Mellish Towers|8,71|c17*wasteland|9,71|c8*Norvell Library|10,71|c11*Line Library|11,71|c11*Casson Bank|12,71|c21*a factory|13,71|c18*the Smithfield Arms|14,71|c10*Maul Walk|15,71|c0*the Ross Building|16,71|c2*Adler Boulevard|17,71|c0*Martland Library|18,71|c11*the Quaney Hotel|19,71|c30*a carpark|20,71|c3*wasteland|21,71|c8*Deverell Walk Fire Station|22,71|c13*the Honeyfield Motel|23,71|c30*Busfield Towers|24,71|c17*Porcher Auto Repair|25,71|c15*the Lawrance Building|26,71|c2*Ebbutt Square|27,71|c0*Robins Cinema|28,71|c14*Athay Boulevard|29,71|c0*a warehouse|30,71|c38*St George's Hospital|31,71|c9*Blomberg Drive|32,71|c0*a carpark|33,71|c3*Dixon Way Police Dept|34,71|c12*Skilliter Way|35,71|c0*Wicks Plaza|36,71|c0*the Lynch Monument|37,71|c28*Whithed Row|38,71|c0*Lush Lane|39,71|c0*Bragge Cinema|40,71|c14*the Streets Building|41,71|c2*Clelford Square|42,71|c0*Gawen Grove|43,71|c0*Dineen Park|44,71|c4*Chetwind Lane|45,71|c0*Reid Square|46,71|c0*the Osler Building|47,71|c2*Larkins Square|48,71|c0*a carpark|49,71|c3*Rodd Square|50,71|c0*Tipper Crescent|51,71|c0*a junkyard|52,71|c29*the Shortland Arms|53,71|c10*St George's Hospital|54,71|c9*the Norwood Building|55,71|c2*Hensler Walk|56,71|c0*the Kilminster Monument|57,71|c28*Leader Avenue|58,71|c0*Knapman Row|59,71|c0*Bewsey Lane|60,71|c0*a cemetery|61,71|c37*Fairclough Drive|62,71|c0*Turnock Park|63,71|c4*the Fram Building|64,71|c20*Beviss Library|65,71|c11*wasteland|66,71|c8*Gentle Drive Fire Station|67,71|c13*Trevelyan Crescent|68,71|c0*Stapleton Park|69,71|c4*Spire Cinema|70,71|c14*Cundham Drive|71,71|c0*McInerney Avenue School|72,71|c36*Hutchin Boulevard Railway Station|73,71|c35*St Polycarp's Hospital|74,71|c9*the Cockell Building|75,71|c2*Stephens Park|76,71|c4*Doble Auto Repair|77,71|c15*Mather Lane|78,71|c0*Hooke Row|79,71|c0*Drury Street|80,71|c0*wasteland|81,71|c8*Cording Grove Railway Station|82,71|c35*the Dibben Motel|83,71|c30*a warehouse|84,71|c38*Lea Park|85,71|c4*Pickford Cinema|86,71|c14*a factory|87,71|c18*Woolmonton Row|88,71|c0*Dufall Drive|89,71|c0*Stuart Boulevard|90,71|c0*Coome Lane|91,71|c0*Saltrow Park|92,71|c4*St Danilo's Church|93,71|c7*a carpark|94,71|c3*a warehouse|95,71|c38*the Voules Museum|96,71|c34*Buglar Boulevard School|97,71|c36*Stacey Plaza|98,71|c0*Club Croxford|99,71|c27*wasteland|0,72|c8*a warehouse|1,72|c38*Mapson Towers|2,72|c17*Chetwind Alley|3,72|c0*Muttlebury Road|4,72|c0*wasteland|5,72|c8*a carpark|6,72|c3*Deakin Alley Police Dept|7,72|c12*Pyatt Crescent|8,72|c0*Poddy Street|9,72|c0*Hillburn Road|10,72|c0*Kelloway Grove|11,72|c0*a carpark|12,72|c3*the Boston Monument|13,72|c28*Castleman Walk Fire Station|14,72|c13*Halberry Lane|15,72|c0*St Fabian's Church|16,72|c7*a cemetery|17,72|c37*a carpark|18,72|c3*Pegg Plaza|19,72|c0*Mudford Plaza Police Dept|20,72|c12*Gregory Park|21,72|c4*Obern Towers|22,72|c17*Dabinett Library|23,72|c11*a warehouse|24,72|c38*the Moodborn Museum|25,72|c34*Gee Avenue|26,72|c0*Land Bank|27,72|c21*Driscoll Avenue|28,72|c0*the Pippard Building|29,72|c20*Nicols Avenue|30,72|c0*Seeney Row|31,72|c0*Churchous Avenue|32,72|c0*English Boulevard|33,72|c0*Teasdale Plaza|34,72|c0*Club Antell|35,72|c27*Hathaway Drive|36,72|c0*Mounty Bank|37,72|c21*St Sixtus's Church|38,72|c7*the Colyer Monument|39,72|c28*the Bruford Building|40,72|c2*the Honeybone Building|41,72|c2*Attkings Square|42,72|c0*Swithun General Hospital|43,72|c9*Earle Towers|44,72|c17*Thomson Lane|45,72|c0*the Wagner Building|46,72|c2*Whittaker Boulevard Fire Station|47,72|c13*Kentisber Plaza|48,72|c0*Bythesea Drive|49,72|c0*Sanford Towers|50,72|c17*Beatty Boulevard School|51,72|c36*Spreat Alley School|52,72|c36*Neot General Hospital|53,72|c9*the Kitchen Monument|54,72|c28*Laimbeer Plaza|55,72|c0*Club Crook|56,72|c27*St Ferreol's Hospital|57,72|c9*Chalk Street|58,72|c0*Huckle Way|59,72|c0*Jukes Auto Repair|60,72|c15*the Setter Building|61,72|c2*Lewyes Auto Repair|62,72|c15*a carpark|63,72|c3*Trivola Street|64,72|c0*the Byers Building|65,72|c2*a junkyard|66,72|c29*Broderip Avenue|67,72|c0*Ennever Library|68,72|c11*McInerney Grove|69,72|c0*the Belbin Arms|70,72|c10*St Lazarus's Church|71,72|c7*Minall Square|72,72|c0*the Conybear Building|73,72|c2*Biddlecom Road|74,72|c0*Huttenbach Drive|75,72|c0*St Holy's Church|76,72|c7*Showers Park|77,72|c4*wasteland|78,72|c8*the Menhennet Museum|79,72|c34*Malcolm Avenue|80,72|c0*Vawer Walk Police Dept|81,72|c12*Grylls Crescent Police Dept|82,72|c12*a warehouse|83,72|c38*St Isidore's Church|84,72|c7*a cemetery|85,72|c37*Clerck Park|86,72|c4*Fifoot Crescent Railway Station|87,72|c35*Manuel Park|88,72|c4*Connor Street|89,72|c0*the Murtaugh Motel|90,72|c30*Digby Walk|91,72|c0*Tuxill Alley Fire Station|92,72|c13*Pike Plaza|93,72|c0*Akehurst Walk|94,72|c0*Rossiter Crescent|95,72|c0*Kettner Drive|96,72|c0*Manuel Park|97,72|c4*Fowke Lane Fire Station|98,72|c13*Leekey Bank|99,72|c21*wasteland|0,73|c8*wasteland|1,73|c8*Chenery Cinema|2,73|c14*Mugford Bank|3,73|c21*Haggie Square|4,73|c0*wasteland|5,73|c8*the Edghill Hotel|6,73|c30*Club Shelley|7,73|c27*Meany Avenue|8,73|c0*Foulkes Place Railway Station|9,73|c35*the Fearnsides Arms|10,73|c10*Pretor Cinema|11,73|c14*the Godfry Building|12,73|c2*Banger Cinema|13,73|c14*Semple Plaza|14,73|c0*Haile Street|15,73|c0*Spraggon Drive Railway Station|16,73|c35*a warehouse|17,73|c38*Trott Alley School|18,73|c36*the Snaydon Building|19,73|c2*St Caius's Church|20,73|c7*the Veel Building|21,73|c2*Galbraith Lane|22,73|c0*Bobbett Street|23,73|c0*the Rutter Motel|24,73|c30*Brymer Auto Repair|25,73|c15*Harnap Bank|26,73|c21*Sedgbeer Park|27,73|c4*Studley Row|28,73|c0*Mear Cinema|29,73|c14*the Anderson Monument|30,73|c28*the Deed Museum|31,73|c34*Ewerne Lane|32,73|c0*Club Harnap|33,73|c27*Mist Alley School|34,73|c36*Whitcherell Walk School|35,73|c36*Seekins Row|36,73|c0*the Becky Building|37,73|c2*a cemetery|38,73|c37*Morle Row|39,73|c0*St Matheos's Hospital|40,73|c9*Rhodes Park|41,73|c4*Cullingford Road Railway Station|42,73|c35*Durand Drive|43,73|c0*Hibbert Place|44,73|c0*Longmate Walk|45,73|c0*St Luke's Hospital|46,73|c9*the Byfield Museum|47,73|c34*Douglass Park|48,73|c4*Cread Boulevard School|49,73|c36*Cave Walk|50,73|c0*Crampton Road|51,73|c0*the Bearns Arms|52,73|c10*McNeil Towers|53,73|c17|p*Courage Cinema|54,73|c14*Barnett Boulevard Fire Station|55,73|c13*Titus General Hospital|56,73|c9*Nunn Row Fire Station|57,73|c13*Byewell Bank|58,73|c21*Sheldrake Road|59,73|c0*wasteland|60,73|c8*Hudson Place Police Dept|61,73|c12*the Hickey Building|62,73|c2*Diaper Auto Repair|63,73|c15*Clevely Way|64,73|c0*the Cherington Building|65,73|c2*a junkyard|66,73|c29*the Gooch Building|67,73|c2*Sinkins Library|68,73|c11*Shearston Square Railway Station|69,73|c35*Gurney Park|70,73|c4*wasteland|71,73|c8*Dinovan Alley|72,73|c0*a warehouse|73,73|c38*Shearley Place|74,73|c0*the Bane Museum|75,73|c34*St Patrick's Church|76,73|c7*a cemetery|77,73|c37*Blesley Mall|78,73|c6*Blesley Mall|79,73|c6*Club Simpson|80,73|c27*Hagger Square|81,73|c0*a warehouse|82,73|c38*Mallows Towers|83,73|c17*Panton Place|84,73|c0*the Ayliffee Museum|85,73|c34*Doveton Towers|86,73|c17|p*Brailey Walk|87,73|c0*Trevelyan Crescent|88,73|c0*the Cundham Motel|89,73|c30*Carye Drive|90,73|c0*Coombe Library|91,73|c11*Shillito Drive Railway Station|92,73|c35*Milard Auto Repair|93,73|c15*a factory|94,73|c18*the Rothwell Building|95,73|c20*Dunlap Bank|96,73|c21*Dredge Alley|97,73|c0*a factory|98,73|c18*Jordan Park|99,73|c4*Starcy Library|0,74|c11*Swallow Auto Repair|1,74|c15*a carpark|2,74|c3*a carpark|3,74|c3*Club Staley|4,74|c27|p*Sambone Lane|5,74|c0*Prye Walk|6,74|c0*a warehouse|7,74|c38*Ripper Bank|8,74|c21*the Grandfield Monument|9,74|c28*the Poynter Hotel|10,74|c30*Samuel Park|11,74|c4*a carpark|12,74|c3*Salter Place|13,74|c0*Toller Lane|14,74|c0*Rusher Boulevard|15,74|c0*Bunstone Way|16,74|c0*the Curtis Arms|17,74|c10*Colmer Street|18,74|c0*Mallack Walk|19,74|c0*a cemetery|20,74|c37*wasteland|21,74|c8*Bennet Cinema|22,74|c14*Rome Grove|23,74|c0*Dingley Library|24,74|c11*a junkyard|25,74|c29*St Ethelbert's Church|26,74|c7*the Preston Building|27,74|c20*Club Doran|28,74|c27*the Brely Building|29,74|c2*Hayes Plaza|30,74|c0*the Turrell Arms|31,74|c10*Milton Drive Railway Station|32,74|c35*Llewellin Alley|33,74|c0*Lerwill Towers|34,74|c17|p*Polwhiele Way Fire Station|35,74|c13*the Bannister Arms|36,74|c10*wasteland|37,74|c8*Riggs Road|38,74|c0*Cassell Way|39,74|c0*Millbanks Way|40,74|c0*the Boobyer Building|41,74|c2*Gilson Plaza|42,74|c0*the Sayce Building|43,74|c2*the Shartman Monument|44,74|c28*the Bainton Arms|45,74|c10*Morrhall Drive Fire Station|46,74|c13*Brookman Alley|47,74|c0*Haag Plaza Police Dept|48,74|c12*Hobbs Row|49,74|c0*Bramwell Auto Repair|50,74|c15*Ware Walk|51,74|c0*Furneaux Lane|52,74|c0*Doran Square|53,74|c0*Tyack Plaza|54,74|c0*a warehouse|55,74|c38*the Bornard Building|56,74|c2*a junkyard|57,74|c29*Barne Place|58,74|c0*wasteland|59,74|c8*wasteland|60,74|c8*Hocknell Way School|61,74|c36*the Counter Motel|62,74|c30*Standlick Walk|63,74|c0*the Golde Building|64,74|c2*John Way|65,74|c0*the Silwood Building|66,74|c20*St Seraphim's Hospital|67,74|c9*a carpark|68,74|c3*Daunt Square|69,74|c0*Budgett Walk|70,74|c0*Mosedale Crescent|71,74|c0*Billings Row Fire Station|72,74|c13*the Gollop Building|73,74|c2|p*the Crump Museum|74,74|c34*Ponder Grove|75,74|c0*Train Boulevard|76,74|c0*Club Wadman|77,74|c27*Blesley Mall|78,74|c6*Blesley Mall|79,74|c6*Mechel Grove|80,74|c0*Godolphin Drive|81,74|c0*wasteland|82,74|c8*Pyke Way|83,74|c0*St Spyridon's Church|84,74|c7*a cemetery|85,74|c37*Dymock Avenue|86,74|c0*wasteland|87,74|c8*the Goldney Motel|88,74|c30*Laurence Walk|89,74|c0*Wyatt Way|90,74|c0*Naish Park|91,74|c4*Halfacree Square|92,74|c0*Buteby Avenue|93,74|c0*the Tomkyns Building|94,74|c2|p*a junkyard|95,74|c29*Maddaford Square|96,74|c0*Club Crosland|97,74|c27*the Pester Building|98,74|c2*the Baggaley Building|99,74|c2*Carder Row School|0,75|c36*the Harbord Building|1,75|c20*wasteland|2,75|c8*Heale Drive|3,75|c0*Bowles Avenue|4,75|c0*Stelling Lane|5,75|c0*a warehouse|6,75|c38*Stewart Road|7,75|c0*wasteland|8,75|c8*" +
        "Rossiter Bank|9,75|c21*Dix Row|10,75|c0*the Paris Motel|11,75|c30*Mather Library|12,75|c11*the Dufferin Building|13,75|c2*the Skilliter Motel|14,75|c30|p*Garde Drive School|15,75|c36*St Egbert's Church|16,75|c7*a cemetery|17,75|c37*Holt Walk|18,75|c0*Blight Street|19,75|c0*Purchell Road|20,75|c0*Linck Bank|21,75|c21*the Crawley Building|22,75|c2*the Tomkyns Motel|23,75|c30*the Seager Monument|24,75|c28*Shiplow Library|25,75|c11*Isgar Towers|26,75|c17|p*Club Penfold|27,75|c27*Somerside Plaza|28,75|c0*Pattison Park|29,75|c4*Sloper Plaza|30,75|c0*wasteland|31,75|c8*Schonlau Park|32,75|c4*Morey Alley|33,75|c0*Borland Square|34,75|c0*Pankhurst Alley School|35,75|c36*Cleal Library|36,75|c11*Weightman Boulevard Fire Station|37,75|c13*Waddington Way|38,75|c0*Marcary Way|39,75|c0*Sherston Grove Fire Station|40,75|c13*wasteland|41,75|c8*Zuryk Bank|42,75|c21*the Crang Building|43,75|c2|p*Brimacombe Grove|44,75|c0*a warehouse|45,75|c38*Dix Place|46,75|c0*Sabine Towers|47,75|c17*Florence Lane|48,75|c0*Gullifer Walk|49,75|c0*the Dobbs Building|50,75|c20*a factory|51,75|c18*a junkyard|52,75|c29*Club Blackburn|53,75|c27*Penni Drive Fire Station|54,75|c13*a warehouse|55,75|c38*the Jillard Building|56,75|c20*the Whitenoll Building|57,75|c2*Burdett Way Police Dept|58,75|c12*Jenys Place|59,75|c0*Norris Square Railway Station|60,75|c35*Whitemore Boulevard|61,75|c0*Keirle Walk|62,75|c0*Silvey Towers|63,75|c17|p*Colborne Cinema|64,75|c14*Flynn Alley|65,75|c0*Bingham Walk|66,75|c0*Firminger Walk|67,75|c0*Monck Avenue|68,75|c0*Broad Avenue Police Dept|69,75|c12*Kingdom Row|70,75|c0*Veale Towers|71,75|c17*Eaton Drive|72,75|c0*Tatchel Street|73,75|c0*Jewell Lane|74,75|c0*Shean Alley Railway Station|75,75|c35*the Wybrants Museum|76,75|c34*wasteland|77,75|c8*Northcote Avenue Fire Station|78,75|c13*the Broadbear Monument|79,75|c28*the Pimm Building|80,75|c2*Club Adam|81,75|c27*Hole Drive School|82,75|c36*Club Single|83,75|c27*the Pepperell Monument|84,75|c28*the Salsbury Museum|85,75|c34*a warehouse|86,75|c38*Wornel Cinema|87,75|c14*the Dallimore Building|88,75|c2*Jago Way|89,75|c0*Normandare Boulevard Police Dept|90,75|c12*Churchous Avenue|91,75|c0*Fairfield Library|92,75|c11*a junkyard|93,75|c29*St Martha's Church|94,75|c7*a junkyard|95,75|c29*Shelley Grove School|96,75|c36*Roberson Library|97,75|c11*Pyncombes Auto Repair|98,75|c15*Oakeley Park|99,75|c4*the Hellard Monument|0,76|c28*Christopher Lane|1,76|c0*Galpin Towers|2,76|c17*Meacham Way|3,76|c0*Holmshaw Lane|4,76|c0*Ennitt Square|5,76|c0*Grinstead Drive|6,76|c0*the Penning Building|7,76|c20*Monro Row|8,76|c0*Evershed Auto Repair|9,76|c15*Crabbe Bank|10,76|c21*Josephine General Hospital|11,76|c9*Adalbert General Hospital|12,76|c9*Ellacott Plaza|13,76|c0*Smith Boulevard|14,76|c0*Wilton Drive|15,76|c0*the Dement Museum|16,76|c34*the Maguire Building|17,76|c2*Skuse Crescent|18,76|c0*Oldroyd Avenue School|19,76|c36*Bertrand Avenue|20,76|c0*Cridlin Avenue|21,76|c0*Park Walk|22,76|c0*the Nich Building|23,76|c20*Doswell Lane|24,76|c0*Lovelock Plaza Police Dept|25,76|c12*Folaquier Place|26,76|c0*Gotch Plaza Police Dept|27,76|c12*Marven Mall|28,76|c6*Marven Mall|29,76|c6*St Holy's Church|30,76|c7*Seaman Boulevard|31,76|c0*the Chafy Arms|32,76|c10*wasteland|33,76|c8*North Square|34,76|c0*Hemburrow Square|35,76|c0*the Heddington Motel|36,76|c30*the Bruton Hotel|37,76|c30*Frekee Grove|38,76|c0*Tyley Boulevard|39,76|c0*Prankhard Plaza|40,76|c0*a factory|41,76|c18*Clay Place|42,76|c0*the Passant Monument|43,76|c28*Beastall Drive|44,76|c0*Osbert Bank|45,76|c21*a warehouse|46,76|c38*Compton Park|47,76|c4*Beville Auto Repair|48,76|c15*Rugg Auto Repair|49,76|c15*the Rawle Monument|50,76|c28*Pattemore Grove Railway Station|51,76|c35*Mundy Alley|52,76|c0*wasteland|53,76|c8*Barnerd Way Police Dept|54,76|c12*Boggis Avenue|55,76|c0*Julie General Hospital|56,76|c9*Ebbutt Road|57,76|c0*a junkyard|58,76|c29*Rolle Library|59,76|c11*the Uncles Building|60,76|c2*Notton Avenue|61,76|c0*St Wolfgang's Hospital|62,76|c9*Domet Row School|63,76|c36*Brancker Alley Police Dept|64,76|c12*Cheek Road Fire Station|65,76|c13*Newborough Road|66,76|c0*a junkyard|67,76|c29*Club Tinney|68,76|c27*Solomon Cinema|69,76|c14*the Pledger Hotel|70,76|c30*the Perrior Arms|71,76|c10*Wolseley Lane|72,76|c0*Welsford Towers|73,76|c17*a carpark|74,76|c3*Methringham Boulevard|75,76|c0*the Hemphill Hotel|76,76|c30*the Perryn Building|77,76|c20*Howarth Boulevard Railway Station|78,76|c35*Ivens Lane|79,76|c0*wasteland|80,76|c8*Clive Auto Repair|81,76|c15*Millard Crescent School|82,76|c36*Cowlin Street|83,76|c0*the Axtence Building|84,76|c20*Burden Road Fire Station|85,76|c13*Club Kidder|86,76|c27*the Graddon Building|87,76|c2*St Aloysius's Church|88,76|c7*a cemetery|89,76|c37*Sargent Row|90,76|c0*Hagger Square Fire Station|91,76|c13*the Craddy Building|92,76|c20*Rundle Auto Repair|93,76|c15*the Humphrys Building|94,76|c2*Gannett Auto Repair|95,76|c15*the Coker Monument|96,76|c28*Sargent Crescent|97,76|c0*a junkyard|98,76|c29*the Shalle Building|99,76|c2*the Lord Museum|0,77|c34*Lindsey Lane Fire Station|1,77|c13*Sugar Boulevard|2,77|c0*Page Plaza Police Dept|3,77|c12*the Buskin Building|4,77|c2*Kensington Alley|5,77|c0*wasteland|6,77|c8*St Eugene's Church|7,77|c7*a cemetery|8,77|c37*Thomson Drive Railway Station|9,77|c35*Braund Park|10,77|c4*Merryweather Park|11,77|c4*the McDonald Motel|12,77|c30*Willson Place|13,77|c0*Ware Walk|14,77|c0*a carpark|15,77|c3*Townshend Crescent|16,77|c0*Hogue Street|17,77|c0*St Julie's Church|18,77|c7*Lawes Way|19,77|c0*the Dommett Museum|20,77|c34*Lutterell Place School|21,77|c36*Brownsey Alley|22,77|c0*Marshalsea Plaza|23,77|c0*the Harington Monument|24,77|c28*wasteland|25,77|c8*Gibb Road|26,77|c0*wasteland|27,77|c8*Marven Mall|28,77|c6*Marven Mall|29,77|c6*a warehouse|30,77|c38*St Simeon's Church|31,77|c7*Newland Crescent|32,77|c0*Olsen Bank|33,77|c21*a warehouse|34,77|c38*Ainslie Row Railway Station|35,77|c35*Hames Drive|36,77|c0*wasteland|37,77|c8*Staples Road|38,77|c0*the Febrey Monument|39,77|c28*a factory|40,77|c18*Fearns Grove|41,77|c0*Kenworthy Plaza|42,77|c0*Bonfield Alley|43,77|c0*St Piran's Church|44,77|c7*Snelgrove Way|45,77|c0*St Emelia's Church|46,77|c7*the Kene Building|47,77|c2*Pester Square|48,77|c0*Hayte Library|49,77|c11*Cridlin Drive|50,77|c0*Crawford Towers|51,77|c17*Whittern Towers|52,77|c17*wasteland|53,77|c8*a carpark|54,77|c3*Pipe Plaza|55,77|c0*Southall Place|56,77|c0*Firth Alley|57,77|c0*wasteland|58,77|c8*the Dike Building|59,77|c2*Lerwill Square|60,77|c0*Pyne Crescent School|61,77|c36*Bailey Cinema|62,77|c14*the Willment Building|63,77|c2*wasteland|64,77|c8*Hutton Avenue School|65,77|c36*the Bagot Arms|66,77|c10*Tresidder Alley|67,77|c0*St Margaret's Church|68,77|c7*St John's Church|69,77|c7*the Brien Arms|70,77|c10*St Francis's Church|71,77|c7*Butt Boulevard|72,77|c0*wasteland|73,77|c8*Allan Bank|74,77|c21*a warehouse|75,77|c38*Hame Crescent Railway Station|76,77|c35*the Bullen Building|77,77|c2*Eason Library|78,77|c11*Case Row|79,77|c0*Sabine Place|80,77|c0*Glyde Avenue|81,77|c0*Justice Walk|82,77|c0*the Hollwey Building|83,77|c2*Barrington Walk|84,77|c0*a junkyard|85,77|c29*English Avenue|86,77|c0*Spragge Towers|87,77|c17*Club Fortescue|88,77|c27*Neyens Avenue|89,77|c0*the Cholmondeley Building|90,77|c2*Deacon Alley Police Dept|91,77|c12*Adler Crescent Fire Station|92,77|c13*the Roger Arms|93,77|c10*Brimblecombe Auto Repair|94,77|c15*the Willmington Monument|95,77|c28*Langsford Drive Fire Station|96,77|c13*Josephine General Hospital|97,77|c9*Cracknell Towers|98,77|c17*Lumber Mall|99,77|c6*Lafone Alley|0,78|c0*Brandon Way Police Dept|1,78|c12*Forde Road|2,78|c0*Forward Plaza|3,78|c0*Meloney Square Railway Station|4,78|c35*Fenner Walk|5,78|c0*Morrel Grove|6,78|c0*Mullins Avenue|7,78|c0*Bissell Bank|8,78|c21*the Lettey Building|9,78|c2*Lawford Lane|10,78|c0*Chilcott Auto Repair|11,78|c15*Haggard Alley|12,78|c0*Amatt Cinema|13,78|c14*Mudford Walk|14,78|c0*Barwood Row School|15,78|c36*Strong Alley School|16,78|c36*wasteland|17,78|c8*Ogbourn Way|18,78|c0*McNamara Cinema|19,78|c14*the Lawrie Arms|20,78|c10*the Simkins Monument|21,78|c28*Ridley Crescent|22,78|c0*Morton Square|23,78|c0*Bastable Alley|24,78|c0*Fearey Avenue|25,78|c0*Matcham Way|26,78|c0*Staddon Crescent|27,78|c0*Voules Square Railway Station|28,78|c35*Duckett Lane|29,78|c0*a factory|30,78|c18*a warehouse|31,78|c38*the Maudslay Museum|32,78|c34*St Dionysius's Church|33,78|c7*St Etheldreda's Church|34,78|c7*St Gelasius's Church|35,78|c7*Daley Street|36,78|c0*the Cornelius Museum|37,78|c34*Stroud Grove Railway Station|38,78|c35*Kerswill Auto Repair|39,78|c15*Laverton Walk|40,78|c0*the Chaffin Building|41,78|c20*Hills Drive|42,78|c0*Clanfield Boulevard|43,78|c0*Garven Drive|44,78|c0*Merewether Park|45,78|c4*Templeman Auto Repair|46,78|c15*Priestly Street Fire Station|47,78|c13*Triggs Auto Repair|48,78|c15*St Cyprian's Church|49,78|c7*Cayley Walk|50,78|c0*Nunn Alley|51,78|c0*Cheal Lane|52,78|c0*a warehouse|53,78|c38*Bant Park|54,78|c4*Rowson Library|55,78|c11*Otto Square|56,78|c0*Styles Bank|57,78|c21*Wheaton Square|58,78|c0*St Luke's Church|59,78|c7*a junkyard|60,78|c29*the Pincott Building|61,78|c2*Eason Library|62,78|c11*Last Road|63,78|c0*St Polycarp's Church|64,78|c7*Mayer Cinema|65,78|c14*Meany Auto Repair|66,78|c15*Braham Boulevard School|67,78|c36*Whitcherell Bank|68,78|c21*a cemetery|69,78|c37*a cemetery|70,78|c37*the Creek Building|71,78|c20*Durand Drive|72,78|c0*a junkyard|73,78|c29*a warehouse|74,78|c38*Eliot Avenue|75,78|c0*the Mapledoram Hotel|76,78|c30*a warehouse|77,78|c38*Prinn Alley|78,78|c0*the Markes Monument|79,78|c28*Brockliss Grove Police Dept|80,78|c12*Slowley Lane|81,78|c0*Tempest Plaza School|82,78|c36*Doe Place|83,78|c0*a junkyard|84,78|c29*Bastable Alley|85,78|c0*St Deusdedit's Church|86,78|c7*wasteland|87,78|c8*the Buttle Building|88,78|c2*the Norgate Monument|89,78|c28*Neave Auto Repair|90,78|c15*wasteland|91,78|c8*the Orome Arms|92,78|c10*Windey Towers|93,78|c17*the Browton Building|94,78|c2*a junkyard|95,78|c29*Murless Way|96,78|c0*Odo General Hospital|97,78|c9*Sulley Bank|98,78|c21*Lumber Mall|99,78|c6*the Brower Building|0,79|c2*wasteland|1,79|c8*a factory|2,79|c18*Mapey Avenue|3,79|c0*St Ninian's Church|4,79|c7*Codrington Square School|5,79|c36*Chicke Bank|6,79|c21*the Byfield Building|7,79|c2*Estmond Park|8,79|c4*the Delay Building|9,79|c20*Lavington Crescent Police Dept|10,79|c12*the Fursman Building|11,79|c2*Chaning Drive|12,79|c0*Westway Park|13,79|c4*a junkyard|14,79|c29*Samborne Walk Police Dept|15,79|c12*Fir Street|16,79|c0*Catcott Row Fire Station|17,79|c13*Cull Walk|18,79|c0*Defrates Walk|19,79|c0*Rudduck Row|20,79|c0*a carpark|21,79|c3*Sankey Bank|22,79|c21*Burdwood Alley|23,79|c0*wasteland|24,79|c8*Club Balchin|25,79|c27*Nurton Avenue|26,79|c0*Shinner Row|27,79|c0*the Brinklow Arms|28,79|c10*a factory|29,79|c18*the Storke Building|30,79|c2*Puckle Bank|31,79|c21*Branagan Row Fire Station|32,79|c13*Eley Way Police Dept|33,79|c12*Tomlin Crescent|34,79|c0*Dibsdall Grove|35,79|c0*a carpark|36,79|c3*the Francois Arms|37,79|c10*Dadson Grove Railway Station|38,79|c35*a factory|39,79|c18*the Ikiff Motel|40,79|c30*the Waggott Monument|41,79|c28*Humphreys Boulevard|42,79|c0*Club Townsend|43,79|c27*Club Broadbelt|44,79|c27*the Winwright Building|45,79|c2*the Lewen Museum|46,79|c34*a carpark|47,79|c3*Tutcher Place|48,79|c0*the Deny Hotel|49,79|c30*Carpendale Bank|50,79|c21*Cundham Drive|51,79|c0*Purt Walk Fire Station|52,79|c13*Keppel Boulevard|53,79|c0*Club Tremlett|54,79|c27*Wawer Cinema|55,79|c14*Alsoop Avenue|56,79|c0*wasteland|57,79|c8*Galloway Park|58,79|c4*a cemetery|59,79|c37*the Sonven Museum|60,79|c34*the Darnell Building|61,79|c20*St Hilarion's Hospital|62,79|c9*Weeks Auto Repair|63,79|c15*Shufflebotham Street|64,79|c0*Davey Way|65,79|c0*Sollas Cinema|66,79|c14*Steed Road|67,79|c0*Dallaway Avenue|68,79|c0*the Burdekin Building|69,79|c2*Gullifer Avenue|70,79|c0*a junkyard|71,79|c29*Zacharias General Hospital|72,79|c9*Stanbury Towers|73,79|c17*Bowditch Avenue|74,79|c0*Furzer Crescent Railway Station|75,79|c35*Beagly Lane|76,79|c0*Simister Street|77,79|c0*Tipney Bank|78,79|c21*Club Emes|79,79|c27*Mountstephen Grove Railway Station|80,79|c35*a warehouse|81,79|c38*Bythese Bank|82,79|c21*Bennett Way|83,79|c0*a factory|84,79|c18*Piper Alley|85,79|c0*a cemetery|86,79|c37*Chetle Way|87,79|c0*the Spong Building|88,79|c2*Rumler Way School|89,79|c36*Joachim Mall|90,79|c6*Joachim Mall|91,79|c6*Earlham Walk|92,79|c0*Grist Grove|93,79|c0*the Hazeldine Museum|94,79|c34*Shickell Drive Railway Station|95,79|c35*War Crescent|96,79|c0*Oakley Drive|97,79|c0*Chedgey Drive|98,79|c0*Club Frossard|99,79|c27*the Buttle Building|0,80|c2*Stephens Cinema|1,80|c14*Clipper Drive|2,80|c0*the Powlet Building|3,80|c2*wasteland|4,80|c8*a cemetery|5,80|c37*Capes Street|6,80|c0*Club Clement|7,80|c27*Chalker Park|8,80|c4*Vincent Square Police Dept|9,80|c12*the Bozon Monument|10,80|c28*the Hansell Hotel|11,80|c30*Club Meteyard|12,80|c27*Jack Way|13,80|c0*the Dudden Building|14,80|c2*the Connelley Building|15,80|c2*Roncoroni Place|16,80|c0*Dolbridge Street|17,80|c0*Hammond Place|18,80|c0*Poncione Grove|19,80|c0*St Alexander's Hospital|20,80|c9*Ingram Avenue|21,80|c0*Jenner Lane|22,80|c0*the Whitmarsh Arms|23,80|c10*a warehouse|24,80|c38*a junkyard|25,80|c29*the Doran Arms|26,80|c10*a carpark|27,80|c3*the Hayden Building|28,80|c2*Vine Cinema|29,80|c14*Broadway Drive|30,80|c0*St Matthew's Hospital|31,80|c9*Pooll Towers|32,80|c17*Morliere Avenue Railway Station|33,80|c35*Club Chandler|34,80|c27*Foyle Alley|35,80|c0*Softley Row|36,80|c0*Maskell Avenue|37,80|c0*Kearney Alley|38,80|c0*a factory|39,80|c18*wasteland|40,80|c8*a factory|41,80|c18*the Hartland Building|42,80|c2*Harmsworth Bank|43,80|c21*Kemp Walk|44,80|c0*Lambourn Walk Fire Station|45,80|c13*Dirkinson Drive|46,80|c0*Edridge Auto Repair|47,80|c15*Geard Avenue|48,80|c0*Steeds Park|49,80|c4*Merryweather Way Fire Station|50,80|c13*Blackburn Alley|51,80|c0*Pole Mall|52,80|c6*Pole Mall|53,80|c6*Pettman Alley|54,80|c0*the Bellamy Building|55,80|c2*Walrand Square|56,80|c0*Pritchard Boulevard|57,80|c0*the Peddle Monument|58,80|c28*Pitt Park|59,80|c4*Holmyard Auto Repair|60,80|c15*Gutch Park|61,80|c4*a factory|62,80|c18*a warehouse|63,80|c38*Beable Street|64,80|c0*St Hilda's Hospital|65,80|c9*Mayne Alley|66,80|c0*Rudkin Crescent|67,80|c0*a junkyard|68,80|c29*the Tardew Building|69,80|c2*the Mann Monument|70,80|c28*Peppin Way|71,80|c0*the Cari Museum|72,80|c34*Savery Alley School|73,80|c36*the Streets Hotel|74,80|c30*a factory|75,80|c18*Club Stringfellow|76,80|c27*Hannigan Drive|77,80|c0*the Toms Building|78,80|c2*Castlehow Avenue|79,80|c0*the Rolls Building|80,80|c2*Keeffe Library|81,80|c11*Boole Place Fire Station|82,80|c13*the Whitley Building|83,80|c2*Chiswell Square|84,80|c0*Ramsdale Cinema|85,80|c14*Pobjay Square|86,80|c0*Wilkins Row|87,80|c0*Kelly Lane|88,80|c0*a carpark|89,80|c3*Joachim Mall|90,80|c6*Joachim Mall|91,80|c6*Unwin Park|92,80|c4*Barrington Avenue|93,80|c0*Tudge Way Fire Station|94,80|c13*Ginn Alley|95,80|c0*the Osbourne Building|96,80|c2*the Doutch Museum|97,80|c34*a factory|98,80|c18*St Birinus's Church|99,80|c7*the Deny Hotel|0,81|c30*Mockridge Cinema|1,81|c14*a carpark|2,81|c3*Ryse Place|3,81|c0*Raines Grove|4,81|c0*the Potter Monument|5,81|c28*Wimbridge Crescent|6,81|c0*the Dadson Building|7,81|c2*the Fone Arms|8,81|c10*a carpark|9,81|c3*Grabham Square|10,81|c0*wasteland|11,81|c8*Wyke Grove Fire Station|12,81|c13*a junkyard|13,81|c29*Jarman Lane|14,81|c0*Corp Boulevard Railway Station|15,81|c35*the Holmes Arms|16,81|c10*Suter Boulevard Police Dept|17,81|c12*Knapp Boulevard Police Dept|18,81|c12*wasteland|19,81|c8*Tompson Mall|20,81|c6*Tompson Mall|21,81|c6*the Beer Building|22,81|c2*Maney Drive|23,81|c0*a junkyard|24,81|c29*Beel Lane|25,81|c0*Pimm Walk Fire Station|26,81|c13*Pullinger Boulevard|27,81|c0*Newth Lane|28,81|c0*wasteland|29,81|c8*the Highton Building|30,81|c20*Downing Plaza Railway Station|31,81|c35*wasteland|32,81|c8*wasteland|33,81|c8*Oswald General Hospital|34,81|c9*Wigdahl Bank|35,81|c21*Goddard Square|36,81|c0*the Abarrow Monument|37,81|c28*Topham Crescent|38,81|c0*the Lahey Monument|39,81|c28*the Charbonnier Museum|40,81|c34*the Glossop Building|41,81|c2*a carpark|42,81|c3*Newell Avenue|43,81|c0*a carpark|44,81|c3*Shaw Road|45,81|c0*Ravenhill Plaza School|46,81|c36*Glover Library|47,81|c11*Cudworth Square|48,81|c0*Holbrook Drive|49,81|c0*the Sawday Museum|50,81|c34*Clapton Stadium|51,81|c16*Clapton Stadium|52,81|c16*Pole Mall|53,81|c6*a carpark|54,81|c3*Herrick Walk|55,81|c0*Holly Crescent Police Dept|56,81|c12*the Gready Building|57,81|c2*Caunt Lane|58,81|c0*Giles Cinema|59,81|c14*wasteland|60,81|c8*Linthorne Alley|61,81|c0*Yule Boulevard|62,81|c0*Wicks Bank|63,81|c21*Mallett Avenue|64,81|c0*Grice Crescent Railway Station|65,81|c35*Willison Lane|66,81|c0*the Wykes Motel|67,81|c30*a junkyard|68,81|c29*Adalbert General Hospital|69,81|c9*the Showers Building|70,81|c20*a junkyard|71,81|c29*the Rawkins Building|72,81|c2*a carpark|73,81|c3*a carpark|74,81|c3*a warehouse|75,81|c38*Mellish Walk Fire Station|76,81|c13*Broadbelt Alley|77,81|c0*Leave Lane Railway Station|78,81|c35*the Jarrett Building|79,81|c2*Brennan Walk|80,81|c0*Remigius General Hospital|81,81|c9*Club Barling|82,81|c27*Cruwys Auto Repair|83,81|c15*Nuttycombe Way School|84,81|c36*wasteland|85,81|c8*a carpark|86,81|c3*Rich Square Fire Station|87,81|c13*wasteland|88,81|c8*Sibree Plaza|89,81|c0*wasteland|90,81|c8*Bousie Avenue|91,81|c0*Hambling Street|92,81|c0*Ironsides Alley|93,81|c0*Gregg Grove|94,81|c0*Sherriff Towers|95,81|c17*Hanna Row|96,81|c0*Burdett Street|97,81|c0*Tidball Walk|98,81|c0*wasteland|99,81|c8*the Dement Arms|0,82|c10*Ryan Grove|1,82|c0*Finlay Boulevard|2,82|c0*a warehouse|3,82|c38*Fyfhyde Plaza|4,82|c0*St Aelred's Church|5,82|c7*a factory|6,82|c18*the Dwyer Monument|7,82|c28*a junkyard|8,82|c29*Darnell Library|9,82|c11*the McLellan Arms|10,82|c10*Latcham Street|11,82|c0*Clough Way|12,82|c0*Tuckwood Walk|13,82|c0*Pember Grove|14,82|c0*Handley Towers|15,82|c17*the Rabjohns Hotel|16,82|c30*St Emma's Church|17,82|c7*the Baillie Hotel|18,82|c30*the Cheeke Building|19,82|c20*Tompson Mall|20,82|c6*Tompson Mall|21,82|c6*St Irenaeus's Church|22,82|c7*Cookson Drive|23,82|c0*Dinham Row Fire Station|24,82|c13*Layton Row|25,82|c0*Crobrow Way|26,82|c0*the Haywood Building|27,82|c2*Rackman Row|28,82|c0*Pierson Alley|29,82|c0*the Himbury Hotel|30,82|c30*Corless Way|31,82|c0*Longson Square|32,82|c0*Mechel Bank|33,82|c21*Bowerman Grove Railway Station|34,82|c35*Horsford Road|35,82|c0*Crumpler Road|36,82|c0*Mapledoram Avenue|37,82|c0*the Duccan Motel|38,82|c30*Bellhouse Bank|39,82|c21*Canter Towers|40,82|c17*the Luscombe Building|41,82|c20*Burdekin Way|42,82|c0*Malpas Street|43,82|c0*Rather Library|44,82|c11*Burrowes Avenue|45,82|c0*Eadie Drive|46,82|c0*Pavey Street|47,82|c0*Witt Towers|48,82|c17*Gleeson Square Fire Station|49,82|c13*Councell Lane Fire Station|50,82|c13*Clapton Stadium|51,82|c16*Clapton Stadium|52,82|c16*the Younghusband Arms|53,82|c10*Goodenough Boulevard|54,82|c0*MacKie Street|55,82|c0*the Copeland Building|56,82|c20*Marchia Auto Repair|57,82|c15*Lihou Auto Repair|58,82|c15*the Asling Monument|59,82|c28*Budge Walk|60,82|c0*wasteland|61,82|c8*a factory|62,82|c18*Stock Grove|63,82|c0*Shakelton Auto Repair|64,82|c15*the Thyer Arms|65,82|c10*Cousins Towers|66,82|c17|p*Prole Street|67,82|c0*a warehouse|68,82|c38*Witchell Street Police Dept|69,82|c12*Tidcombe Crescent School|70,82|c36*Delaney Square|71,82|c0*a warehouse|72,82|c38*a carpark|73,82|c3*a warehouse|74,82|c38*wasteland|75,82|c8*Bland Auto Repair|76,82|c15*Greenwood Drive|77,82|c0*the Trollope Building|78,82|c2*a junkyard|79,82|c29*Woolven Cinema|80,82|c14*Cummins Alley Police Dept|81,82|c12*wasteland|82,82|c8*Dumphey Square|83,82|c0*the Merson Building|84,82|c2*a warehouse|85,82|c38*Ennitt Alley|86,82|c0*Lane Drive|87,82|c0*the Redmond Museum|88,82|c34*a junkyard|89,82|c29*wasteland|90,82|c8*Atkins Cinema|91,82|c14*Greenland Boulevard Police Dept|92,82|c12*Gelasius General Hospital|93,82|c9*Derryman Crescent Railway Station|94,82|c35*wasteland|95,82|c8*wasteland|96,82|c8*Powlett Road|97,82|c0*a warehouse|98,82|c38*Kingham Drive|99,82|c0*wasteland|0,83|c8*Fuller Drive School|1,83|c36*Syms Auto Repair|2,83|c15*Cyril General Hospital|3,83|c9*a factory|4,83|c18*Paget Auto Repair|5,83|c15*Reakes Grove|6,83|c0*the Ffych Building|7,83|c2*Naisbitt Library|8,83|c11*the Barnefield Monument|9,83|c28*St Maximillian's Church|10,83|c7*Breeze Street|11,83|c0*Carpenter Avenue|12,83|c0*wasteland|13,83|c8*Edward General Hospital|14,83|c9*Ashbee Avenue|15,83|c0*the Coopey Building|16,83|c2*a cemetery|17,83|c37*Major Cinema|18,83|c14*Hinckesman Bank|19,83|c21*Butler Avenue|20,83|c0*wasteland|21,83|c8*Hind Crescent Railway Station|22,83|c35*Gilpin Row|23,83|c0*Thorpe Crescent|24,83|c0*a warehouse|25,83|c38*a junkyard|26,83|c29*the Beacham Museum|27,83|c34*the Browne Museum|28,83|c34*the Danger Building|29,83|c2*Bone Towers|30,83|c17*Swanborough Bank|31,83|c21*wasteland|32,83|c8*Witchell Road|33,83|c0*Wellstead Crescent|34,83|c0*the Schalch Hotel|35,83|c30*the Bagnall Building|36,83|c20*Pollet Street Railway Station|37,83|c35*Beete Bank|38,83|c21*Mist Way|39,83|c0*Haddock Walk|40,83|c0*the Noyce Arms|41,83|c10*the Pouncy Building|42,83|c2*the Burston Monument|43,83|c28*Sanford Crescent|44,83|c0*Urban General Hospital|45,83|c9*Club Steager|46,83|c27*Sanderson Road|47,83|c0*Boshier Walk|48,83|c0*the Lovering Monument|49,83|c28*the Wilson Museum|50,83|c34*St Timothy's Church|51,83|c7*a cemetery|52,83|c37*Woolly Crescent|53,83|c0*Stitch Row|54,83|c0*Barter Road Fire Station|55,83|c13*Bunstone Alley|56,83|c0*London Drive|57,83|c0*Beare Library|58,83|c11*Alloway Street|59,83|c0*St Odile's Hospital|60,83|c9*Coomb Row Railway Station|61,83|c35*Poncione Grove|62,83|c0*Leonard Street|63,83|c0*Wellington Plaza|64,83|c0*a warehouse|65,83|c38*Baynton Street|66,83|c0*Templman Way|67,83|c0*the Cresley Arms|68,83|c10*Mathews Park|69,83|c4*Gerard Crescent Police Dept|70,83|c12*Hewer Drive|71,83|c0*a junkyard|72,83|c29*Lockwood Way|73,83|c0*Cummings Bank|74,83|c21*Horsington Grove School|75,83|c36*Methringham Bank|76,83|c21*Cornillon Avenue|77,83|c0*a factory|78,83|c18*Gayleard Place|79,83|c0*Cridland Towers|80,83|c17*Grinter Cinema|81,83|c14*Bellis Park|82,83|c4*Newport Alley|83,83|c0*Hooper Square Fire Station|84,83|c13*the Rexworthy Arms|85,83|c10*Corless Alley Police Dept|86,83|c12*Harrill Walk|87,83|c0*a carpark|88,83|c3*Howes Drive|89,83|c0*the Blanning Building|90,83|c2*Bastick Auto Repair|91,83|c15*Bulmer Street|92,83|c0*Gendrault Auto Repair|93,83|c15*the Burtenshaw Arms|94,83|c10*wasteland|95,83|c8*wasteland|96,83|c8*Poulter Plaza|97,83|c0*Parr Towers|98,83|c17*the Phipps Building|99,83|c20*a warehouse|0,84|c38*Alsoop Park|1,84|c4*Crew Avenue Police Dept|2,84|c12*the Boon Museum|3,84|c34*a factory|4,84|c18*the Freeguard Building|5,84|c2|p*Davy Drive|6,84|c0*Biffen Lane|7,84|c0*Holdoway Drive|8,84|c0*the Hinckesman Building|9,84|c2*the Rees Building|10,84|c2*the Selway Building|11,84|c20*Delay Way|12,84|c0*Sly Place Police Dept|13,84|c12*Puckard Bank|14,84|c21*Dungey Way|15,84|c0*the Furzer Building|16,84|c2|p*a factory|17,84|c18*Horditch Lane|18,84|c0*the Broadway Monument|19,84|c28*Guppey Place Railway Station|20,84|c35*Boteley Square|21,84|c0*the Craske Building|22,84|c2*Bridgewater Crescent Police Dept|23,84|c12*Grandon Place Police Dept|24,84|c12*Lindsey Towers|25,84|c17|p*Kendall Row|26,84|c0*the Pursey Building|27,84|c20*Ree Alley|28,84|c0*Burrill Park|29,84|c4*Munkton Walk|30,84|c0*the Curley Building|31,84|c2*Trippick Plaza|32,84|c0*the Barstow Arms|33,84|c10*Baker Place|34,84|c0*Dunford Lane Fire Station|35,84|c13*Samborne Towers|36,84|c17|p*wasteland|37,84|c8*a junkyard|38,84|c29*the Harrold Hotel|39,84|c30*Winmill Library|40,84|c11*the Henning Hotel|41,84|c30*McMullen Drive|42,84|c0*Pilcher Avenue|43,84|c0*Samways Walk Railway Station|44,84|c35*Milverton Place Police Dept|45,84|c12*a junkyard|46,84|c29*Crawley Park|47,84|c4*Shaw Park|48,84|c4*Sykes Grove|49,84|c0*Gass Plaza Railway Station|50,84|c35*Club Haidon|51,84|c27*the Paice Museum|52,84|c34*Cullen Way|53,84|c0*wasteland|54,84|c8*the Topleaf Building|55,84|c20*Dampney Grove Police Dept|56,84|c12*Mowlam Bank|57,84|c21*Dimmock Auto Repair|58,84|c15*Wiltshire Towers|59,84|c17*Sparrow Row|60,84|c0*Lilly Walk|61,84|c0*a carpark|62,84|c3*Boden Row|63,84|c0*Gooding Way|64,84|c0*Heeks Row|65,84|c0*Newbould Way|66,84|c0*Webbey Boulevard|67,84|c0*Chetle Park|68,84|c4*Shaughnessy Row|69,84|c0*a warehouse|70,84|c38*St Rosalia's Church|71,84|c7*a cemetery|72,84|c37*Prendergast Place|73,84|c0*wasteland|74,84|c8*Club Cort|75,84|c27*the Stark Building|76,84|c2*Wanstall Road|77,84|c0*a junkyard|78,84|c29*the Tompson Building|79,84|c20*the Whish Building|80,84|c2*Milton Walk Police Dept|81,84|c12*Don Place|82,84|c0*Butcher Walk|83,84|c0*Sears Park|84,84|c4*St Louis's Church|85,84|c7*Sellers Bank|86,84|c21*the Wagland Building|87,84|c2*Scarlett Library|88,84|c11*Fifoot Grove|89,84|c0*wasteland|90,84|c8*Anderson Towers|91,84|c17*St Seraphim's Hospital|92,84|c9*Drave Street|93,84|c0*Cutmore Avenue|94,84|c0*Ewer Street|95,84|c0*Pratley Library|96,84|c11*Wiles Bank|97,84|c21*McCormack Grove|98,84|c0*the Comitty Building|99,84|c2*Whittard Road Fire Station|0,85|c13*wasteland|1,85|c8*Vigar Walk|2,85|c0*Lorgh Walk|3,85|c0*Punnett Cinema|4,85|c14*a junkyard|5,85|c29*Scudamore Road|6,85|c0*Gully Grove|7,85|c0*a warehouse|8,85|c38*the Burdett Building|9,85|c2*the Hobby Building|10,85|c2*Dirkinson Street|11,85|c0*Duport Grove Railway Station|12,85|c35*Combs Lane|13,85|c0*St Piran's Church|14,85|c7*a cemetery|15,85|c37*Dudden Bank|16,85|c21*the Panes Building|17,85|c20*Jerrad Park|18,85|c4*a factory|19,85|c18*Brooks Row Railway Station|20,85|c35*Tompsett Plaza|21,85|c0*Higgin Crescent|22,85|c0*Stowell Towers|23,85|c17*the Jolliffe Building|24,85|c2*a junkyard|25,85|c29*Club Frankland|26,85|c27*Lumb Street|27,85|c0*the Duley Building|28,85|c2*How Walk School|29,85|c36*the Vivian Motel|30,85|c30*a factory|31,85|c18*Woodroffe Grove|32,85|c0*wasteland|33,85|c8*wasteland|34,85|c8*a factory|35,85|c18*Mays Way|36,85|c0*wasteland|37,85|c8*Blakesley Grove Police Dept|38,85|c12*Tikhon General Hospital|39,85|c9*Bugden Avenue|40,85|c0*the Grimley Motel|41,85|c30*St Aloysius's Church|42,85|c7*a cemetery|43,85|c37*Kebby Way School|44,85|c36*the Nevill Building|45,85|c20*Troake Road|46,85|c0*Vile Crescent|47,85|c0*Davies Way|48,85|c0*Club Sroud|49,85|c27*Sprake Cinema|50,85|c14*the Trout Building|51,85|c2*Bickell Way|52,85|c0*a junkyard|53,85|c29*Statham Auto Repair|54,85|c15|p*a carpark|55,85|c3*Hodgkinson Row Fire Station|56,85|c13*the Veysey Building|57,85|c2*Gillen Street|58,85|c0*Ledamun Plaza School|59,85|c36*Babb Boulevard|60,85|c0*the Bingham Monument|61,85|c28*Frederick Bank|62,85|c21*a carpark|63,85|c3*the Wensleydale Building|64,85|c2*Binning Way Police Dept|65,85|c12*Liminton Auto Repair|66,85|c15*Comes Drive|67,85|c0*Easthill Row|68,85|c0*a carpark|69,85|c3*the Burton Building|70,85|c2*the Glessell Building|71,85|c2*the Sealey Building|72,85|c20*Levett Row|73,85|c0*the Bentley Hotel|74,85|c30|p*Scanes Place|75,85|c0*Ledward Park|76,85|c4*wasteland|77,85|c8*a carpark|78,85|c3*Shwalbe Crescent|79,85|c0*the Phillis Building|80,85|c2*Pasker Library|81,85|c11*Whitehead Boulevard|82,85|c0*wasteland|83,85|c8*Dufferin Grove|84,85|c0*St Gall's Church|85,85|c7|p*the Colsworthy Arms|86,85|c10*Durnford Towers|87,85|c17*Cosins Way Police Dept|88,85|c12*Chicke Alley Railway Station|89,85|c35*Pollock Street School|90,85|c36*St Columbanus's Church|91,85|c7*a cemetery|92,85|c37*wasteland|93,85|c8*Pownall Street School|94,85|c36*the Underdown Building|95,85|c2|p*Melville Street|96,85|c0*Club McTier|97,85|c27*the Noonan Building|98,85|c2*Bacon Row|99,85|c0*the Brindle Hotel|0,86|c30*McTier Grove|1,86|c0*Threadgould Road|2,86|c0*the Dudoc Hotel|3,86|c30*the Feaver Monument|4,86|c28*Elsworth Square School|5,86|c36*a carpark|6,86|c3*the Laurence Building|7,86|c2*wasteland|8,86|c8*Woollacott Park|9,86|c4*a carpark|10,86|c3*Biffen Lane|11,86|c0*wasteland|12,86|c8*the Greatorex Building|13,86|c2*Hind Bank|14,86|c21*Green Drive School|15,86|c36*Atwood Row|16,86|c0*Mico Boulevard|17,86|c0*wasteland|18,86|c8*Peppe Park|19,86|c4*Rodford Alley School|20,86|c36*St John's Hospital|21,86|c9*Connolly Park|22,86|c4*Coe Bank|23,86|c21*Garle Grove|24,86|c0*Author Row|25,86|c0*Beddington Walk Fire Station|26,86|c13*St Lucius's Church|27,86|c7*Josaphat General Hospital|28,86|c9*the Wadds Building|29,86|c2*Denham Park|30,86|c4*Alderson Walk|31,86|c0*the Stock Museum|32,86|c34*Knott Drive|33,86|c0*Postlethwaite Boulevard|34,86|c0*wasteland|35,86|c8*the Caplen Building|36,86|c2*a warehouse|37,86|c38*Shapr Boulevard Police Dept|38,86|c12*a carpark|39,86|c3*Taylour Lane|40,86|c0*the Sharman Building|41,86|c20*Hendrich Towers|42,86|c17*the Eden Museum|43,86|c34|p*Tulk Grove|44,86|c0*a carpark|45,86|c3*Vranch Walk|46,86|c0*Whitemore Boulevard|47,86|c0*Gibbes Drive Fire Station|48,86|c13*St Felix's Church|49,86|c7*a cemetery|50,86|c37*a carpark|51,86|c3*the Sendell Arms|52,86|c10*Coxon Auto Repair|53,86|c15*Restrick Road|54,86|c0*the Pyke Building|55,86|c2*the Stroud Building|56,86|c2*Blackmore Cinema|57,86|c14*Gaywood Auto Repair|58,86|c15*Whensley Auto Repair|59,86|c15*Club Lippett|60,86|c27*the Zwanenburg Museum|61,86|c34*Rather Grove|62,86|c0*Rodman Boulevard Police Dept|63,86|c12*Prigg Alley|64,86|c0*Tobit Grove Railway Station|65,86|c35*Duffill Alley|66,86|c0*a junkyard|67,86|c29*Pook Walk|68,86|c0*Ambrose Street|69,86|c0*Quantock Row|70,86|c0*a carpark|71,86|c3*a warehouse|72,86|c38*the Garniss Building|73,86|c2*Humphrey Lane|74,86|c0*the Draper Arms|75,86|c10*the Bondfield Building|76,86|c2*the Barratt Building|77,86|c2*Pryer Drive|78,86|c0*Page Towers|79,86|c17*Mattocke Street|80,86|c0*Beecham Street|81,86|c0*the Currie Museum|82,86|c34*a carpark|83,86|c3*Surtees Cinema|84,86|c14*a cemetery|85,86|c37*a factory|86,86|c18*Delacombe Drive|87,86|c0*a warehouse|88,86|c38*Side Library|89,86|c11*Hedbitch Row Railway Station|90,86|c35*wasteland|91,86|c8*Parkman Alley|92,86|c0*Club MacDonnell|93,86|c27*a warehouse|94,86|c38*a factory|95,86|c18*Hebden Auto Repair|96,86|c15*Canham Bank|97,86|c21*the Lintell Building|98,86|c2*the Warman Building|99,86|c2*Warren Auto Repair|0,87|c15*Ketnor Walk|1,87|c0*Faraker Bank|2,87|c21*the Gullis Museum|3,87|c34*Connery Drive|4,87|c0*Rendall Plaza|5,87|c0*Richings Crescent|6,87|c0*Ayers Cinema|7,87|c14*a carpark|8,87|c3*a carpark|9,87|c3*Ralfe Towers|10,87|c17*Rodeney Bank|11,87|c21*the Bhore Building|12,87|c2*Gover Bank|13,87|c21*Lynham Cinema|14,87|c14*a warehouse|15,87|c38*a warehouse|16,87|c38*Brabner Square|17,87|c0*the Shearn Building|18,87|c2*Argent Place|19,87|c0*Frossard Place Police Dept|20,87|c12*a carpark|21,87|c3*wasteland|22,87|c8*Money Row Fire Station|23,87|c13*Clevely Grove Railway Station|24,87|c35*a junkyard|25,87|c29*Stewart Auto Repair|26,87|c15*Chown Avenue|27,87|c0*a cemetery|28,87|c37*Dorlan Avenue|29,87|c0*Campbell Square|30,87|c0*St Gall's Church|31,87|c7*a cemetery|32,87|c37*Ransom Grove|33,87|c0*St Ferreol's Hospital|34,87|c9*wasteland|35,87|c8*St Jeremy's Hospital|36,87|c9*Lyng Street|37,87|c0*a factory|38,87|c18*wasteland|39,87|c8*Doble Way|40,87|c0*Club Veysey|41,87|c27*Pitman Grove|42,87|c0*St Hubertus's Hospital|43,87|c9*Newbury Street|44,87|c0*Michel Square|45,87|c0*Honeybone Boulevard Fire Station|46,87|c13*St Aidan's Church|47,87|c7*the Lethbridge Museum|48,87|c34*St Pontian's Church|49,87|c7*Club Broadbear|50,87|c27*Shalle Boulevard|51,87|c0*Telfer Cinema|52,87|c14*Clapshaw Alley|53,87|c0*the Stround Building|54,87|c2*the Farrington Building|55,87|c2*Kimmins Row|56,87|c0*Duckworth Row|57,87|c0*wasteland|58,87|c8*Phillipson Park|59,87|c4*a carpark|60,87|c3*Lambourn Library|61,87|c11*Laver Way|62,87|c0*the Bligh Monument|63,87|c28*Pell Walk|64,87|c0*Cooksley Cinema|65,87|c14*wasteland|66,87|c8*Tutchen Walk Police Dept|67,87|c12*Dart Park|68,87|c4*the Dury Museum|69,87|c34*Comitty Drive|70,87|c0*Meetcham Library|71,87|c11*Turnock Drive Railway Station|72,87|c35*Stayner Road|73,87|c0*St Spyridon's Hospital|74,87|c9*a warehouse|75,87|c38*Club Strudwick|76,87|c27*the Ilderton Monument|77,87|c28*a warehouse|78,87|c38*the Mickleroy Building|79,87|c2*wasteland|80,87|c8*Club Marriner|81,87|c27*Mesney Park|82,87|c4*a junkyard|83,87|c29*Blight Lane|84,87|c0*Remfry Bank|85,87|c21*the Neale Hotel|86,87|c30*Hagopian Street|87,87|c0*Burke Bank|88,87|c21*Club Shortt|89,87|c27*the Kind Building|90,87|c2*Elston Square|91,87|c0*the Havercroft Motel|92,87|c30*the Hensler Building|93,87|c2*wasteland|94,87|c8*the Strangemore Building|95,87|c2*a carpark|96,87|c3*Whalen Avenue Railway Station|97,87|c35*the Longstaff Building|98,87|c20*Pickford Park|99,87|c4*a carpark|0,88|c3*Etheldreda General Hospital|1,88|c9*Rollason Row|2,88|c0*the Kirwan Museum|3,88|c34*the Grundy Motel|4,88|c30*Perrye Towers|5,88|c17*Frye Alley Police Dept|6,88|c12*Swonnell Place|7,88|c0*the Henley Building|8,88|c20*Loader Walk Railway Station|9,88|c35*Strange Alley Fire Station|10,88|c13*Greenleaves Alley|11,88|c0*Cosens Auto Repair|12,88|c15*the Honeybone Museum|13,88|c34*Hulin Drive Fire Station|14,88|c13*the Dufty Building|15,88|c2*Baldwin Square|16,88|c0*Hugh General Hospital|17,88|c9*a warehouse|18,88|c38*Haslam Crescent|19,88|c0*Quarles Grove|20,88|c0*Brent Bank|21,88|c21*Pilkington Road|22,88|c0*Bugby Place Fire Station|23,88|c13*St Dismas's Church|24,88|c7*the Arundell Building|25,88|c2*the Linthorne Building|26,88|c2*Rillie Grove|27,88|c0*Hoyle Place Railway Station|28,88|c35*Marke Towers|29,88|c17*Foxwell Auto Repair|30,88|c15*a carpark|31,88|c3*Taplin Crescent|32,88|c0*Hopping Alley|33,88|c0*the Rudd Building|34,88|c2*Hook Avenue|35,88|c0*St Faustina's Hospital|36,88|c9*St Patrick's Hospital|37,88|c9*Brailsford Plaza Police Dept|38,88|c12*Club Bennetts|39,88|c27*the Somers Monument|40,88|c28*Burrows Walk|41,88|c0*McNally Crescent School|42,88|c36*Gane Square|43,88|c0*Haine Auto Repair|44,88|c15*Finlay Cinema|45,88|c14*Giverd Drive Fire Station|46,88|c13*St Christopher's Church|47,88|c7*a cemetery|48,88|c37*a cemetery|49,88|c37*Piran General Hospital|50,88|c9*wasteland|51,88|c8*Kelloway Grove|52,88|c0*Club Garwood|53,88|c27*Glanvile Avenue|54,88|c0*Millar Lane|55,88|c0*Egbert General Hospital|56,88|c9*Colbourne Boulevard|57,88|c0*Creedy Way Police Dept|58,88|c12*wasteland|59,88|c8*Scarman Auto Repair|60,88|c15*Tharratt Library|61,88|c11*the Spear Arms|62,88|c10*Ellard Walk School|63,88|c36*Wilbraham Cinema|64,88|c14*Pinchen Plaza|65,88|c0*Meeker Plaza School|66,88|c36*Ha Auto Repair|67,88|c15*Hallaran Bank|68,88|c21*Chilcot Cinema|69,88|c14*the Nurley Motel|70,88|c30*Lovell Alley|71,88|c0*Karnaus Row Fire Station|72,88|c13*St Telesphorus's Hospital|73,88|c9*the Basson Building|74,88|c2*the Angell Building|75,88|c2*Nelmes Plaza|76,88|c0*the Beech Motel|77,88|c30*Doddimeade Crescent|78,88|c0*Drennan Square|79,88|c0*Neville Alley|80,88|c0*Druce Row School|81,88|c36*Methodius General Hospital|82,88|c9*Mesney Drive Railway Station|83,88|c35*the Buckoke Building|84,88|c2*the Holcombe Building|85,88|c2*the Luff Building|86,88|c2*Membury Crescent School|87,88|c36*Voller Towers|88,88|c17*Empson Grove Police Dept|89,88|c12*Club Vacher|90,88|c27*Godwyn Drive|91,88|c0*Chadwick Square|92,88|c0*Phabayn Way Railway Station|93,88|c35*the Wolfendall Building|94,88|c2*Dohoney Grove Police Dept|95,88|c12*the Haskins Building|96,88|c2*the Owsley Museum|97,88|c34*Clear Cinema|98,88|c14*Knill Towers|99,88|c17*Marton Cinema|0,89|c14*a warehouse|1,89|c38*the Stancomb Arms|2,89|c10*Sansbury Plaza School|3,89|c36*a factory|4,89|c18*the Carr Monument|5,89|c28*Daunt Park|6,89|c4*Quekett Road|7,89|c0*Woolford Boulevard School|8,89|c36*a junkyard|9,89|c29*the Dobson Museum|10,89|c34*Wellington Way|11,89|c0*Tikhon General Hospital|12,89|c9*Club Rodham|13,89|c27*Brocbury Drive|14,89|c0*Marke Avenue|15,89|c0*wasteland|16,89|c8*the Lawson Arms|17,89|c10*the Sainders Building|18,89|c20*Etheldreda General Hospital|19,89|c9*Preston Avenue|20,89|c0*Harrill Avenue|21,89|c0*Buttle Street|22,89|c0*Lewitt Alley|23,89|c0*Revel Plaza|24,89|c0*a cemetery|25,89|c37*Roode Road|26,89|c0*Balle Avenue|27,89|c0*Woolcott Avenue|28,89|c0*Sumsion Crescent|29,89|c0*Higgon Lane|30,89|c0*wasteland|31,89|c8*Kebby Street Fire Station|32,89|c13*a junkyard|33,89|c29*the Sweetman Building|34,89|c2*St Ferreol's Church|35,89|c7*the Carle Building|36,89|c2*a warehouse|37,89|c38*the Lumbard Arms|38,89|c10*Blatch Lane|39,89|c0*Crover Walk|40,89|c0*a carpark|41,89|c3*St Agatho's Hospital|42,89|c9*the Ensor Motel|43,89|c30*Durie Walk|44,89|c0*the Swanborough Museum|45,89|c34*a warehouse|46,89|c38*Nelmes Walk Fire Station|47,89|c13*the Serrell Hotel|48,89|c30*Feldstein Bank|49,89|c21*Ginger Street|50,89|c0*St Etheldreda's Church|51,89|c7*Ambrose Bank|52,89|c21*Shearman Street|53,89|c0*Branagan Way|54,89|c0*Ravson Road|55,89|c0*a factory|56,89|c18*the Bailie Arms|57,89|c10*Whetcombe Park|58,89|c4*Bythesea Auto Repair|59,89|c15*the Wicklen Monument|60,89|c28*Sixtus General Hospital|61,89|c9*Boode Place Fire Station|62,89|c13*the Angerstein Building|63,89|c20*Pearl Street|64,89|c0*Brogan Drive|65,89|c0*the Stribling Building|66,89|c2*Purser Way|67,89|c0*the Summers Museum|68,89|c34*Sparks Library|69,89|c11*Brixey Boulevard School|70,89|c36*the Tryme Building|71,89|c2*Luellin Towers|72,89|c17*Adlam Towers|73,89|c17*Hillard Road Police Dept|74,89|c12*the Sever Building|75,89|c2*Maguire Avenue|76,89|c0*Ponting Alley|77,89|c0*Gillespie Cinema|78,89|c14*the Ottewill Arms|79,89|c10*the Prosser Arms|80,89|c10*a junkyard|81,89|c29*Moncrieffe Road|82,89|c0*Voizey Drive Police Dept|83,89|c12*Fort Perryn Vehicle Depot|84,89|c43*Fort Perryn Exercise Yard|85,89|c43*Fort Perryn Training Ground|86,89|c43*St Faustina's Church|87,89|c7*wasteland|88,89|c8*the Shepstone Building|89,89|c2*the Thicke Monument|90,89|c28*the Quartly Building|91,89|c2*Forbes Grove|92,89|c0*Towne Row Police Dept|93,89|c12*Hobson Place Police Dept|94,89|c12*Lanham Drive|95,89|c0*a warehouse|96,89|c38*the Press Motel|97,89|c30*Applegate Alley|98,89|c0*the Dirkinson Building|99,89|c20*Noake Grove|0,90|c0*Club Bratt|1,90|c27*Sayer Towers|2,90|c17*Denning Bank|3,90|c21*Carrington Park|4,90|c4*Attrill Drive|5,90|c0*the Heard Arms|6,90|c10*a junkyard|7,90|c29*St Hormisdas's Church|8,90|c7*a cemetery|9,90|c37*Church Bank|10,90|c21*wasteland|11,90|c8*Loweth Alley|12,90|c0*a factory|13,90|c18*Gait Bank|14,90|c21*a factory|15,90|c18*Chafy Towers|16,90|c17*Shew Library|17,90|c11*Club Bousfield|18,90|c27*Gyles Bank|19,90|c21*the Vallis Motel|20,90|c30*Helliar Cinema|21,90|c14*Doran Walk|22,90|c0*Tuson Plaza|23,90|c0*the Paul Building|24,90|c2*the Brockliss Building|25,90|c20*St Onuphrius's Church|26,90|c7*Martindale Plaza|27,90|c0*the Musgrove Arms|28,90|c10*Club Barnard|29,90|c27*Kick Alley|30,90|c0*the Browning Museum|31,90|c34*a carpark|32,90|c3*Kerby Lane|33,90|c0*Gell Lane Fire Station|34,90|c13*Silly Grove|35,90|c0*Younger Crescent|36,90|c0*the Luscombe Building|37,90|c2*a junkyard|38,90|c29*Forse Library|39,90|c11*Runciman Towers|40,90|c17*Wheddon Auto Repair|41,90|c15*Howland Walk|42,90|c0*Aulsey Row|43,90|c0*Purt Walk|44,90|c0*the Barret Hotel|45,90|c30*Welsher Square|46,90|c0*the Fort Building|47,90|c20*Cabble Alley Railway Station|48,90|c35*wasteland|49,90|c8*Pook Way|50,90|c0*a cemetery|51,90|c37*a junkyard|52,90|c29*Lamport Drive Railway Station|53,90|c35*Purdue Square|54,90|c0*Atkins Row|55,90|c0*Winsor Alley|56,90|c0*wasteland|57,90|c8*the Cosway Hotel|58,90|c30*the Saffyn Museum|59,90|c34*Collinns Road|60,90|c0*Waterlow Street Police Dept|61,90|c12*the Coopey Monument|62,90|c28*the Lavis Building|63,90|c2*Towne Towers|64,90|c17*the Woodyatt Arms|65,90|c10*the Bigg Building|66,90|c2*Sleeman Alley Fire Station|67,90|c13*a warehouse|68,90|c38*Errington Bank|69,90|c21*Hagger Square|70,90|c0*Healey Crescent|71,90|c0*the Whitmey Building|72,90|c2*Street Plaza|73,90|c0*Vellacott Avenue|74,90|c0*Temple Road|75,90|c0*Sleway Row Police Dept|76,90|c12*wasteland|77,90|c8*Eagles Alley|78,90|c0*wasteland|79,90|c8*Gulliver Street School|80,90|c36*Babb Lane|81,90|c0*Stovin Place|82,90|c0*Udy Boulevard|83,90|c0*Fort Perryn Infirmary|84,90|c43*Fort Perryn Armoury|85,90|c32*Fort Perryn Storehouse|86,90|c43*a cemetery|87,90|c37*the Malcolm Building|88,90|c20*Beamer Drive|89,90|c0*the Bizzell Monument|90,90|c28*Gover Library|91,90|c11*a factory|92,90|c18*the Newborough Museum|93,90|c34*Banbury Street|94,90|c0*Salde Road|95,90|c0*the Loftus Monument|96,90|c28*Mussabini Place|97,90|c0*Travers Walk|98,90|c0*a carpark|99,90|c3*Gervais Bank|0,91|c21*Axe Grove|1,91|c0*Trebley Place|2,91|c0*Zephyrinus General Hospital|3,91|c9*the Franklin Museum|4,91|c34*Club Gellard|5,91|c27*Espin Alley|6,91|c0*the Stickling Building|7,91|c2*wasteland|8,91|c8*Swaine Library|9,91|c11*Cockburn Plaza Railway Station|10,91|c35*St Humphrey's Hospital|11,91|c9*the Baldwin Hotel|12,91|c30*Cobley Walk|13,91|c0*Bagnall Way|14,91|c0*Glanfield Street|15,91|c0*Vines Auto Repair|16,91|c15*Merryweather Row|17,91|c0*Draper Lane School|18,91|c36*Blanchflower Cinema|19,91|c14*the MacVicar Arms|20,91|c10*Tarasius General Hospital|21,91|c9*the Blacker Building|22,91|c2*a warehouse|23,91|c38*Rollings Road|24,91|c0*the Headington Building|25,91|c2*a cemetery|26,91|c37*Sanderson Park|27,91|c4*Keefe Drive|28,91|c0*Woodroffe Crescent|29,91|c0*Broadbent Alley|30,91|c0*Warburton Grove|31,91|c0*Marten Bank|32,91|c21*Wollen Alley|33,91|c0*Dibbings Plaza Police Dept|34,91|c12*Milne Row|35,91|c0*Voke Auto Repair|36,91|c15*the Bugden Building|37,91|c2*Shartman Walk|38,91|c0*Sherstone Walk|39,91|c0*St Soter's Hospital|40,91|c9*Bord Boulevard|41,91|c0*Tinney Bank|42,91|c21*Pothecary Row|43,91|c0*Club Bennett|44,91|c27*Chittenden Row|45,91|c0*the Curtice Arms|46,91|c10*Northup Avenue Railway Station|47,91|c35*the Brazey Building|48,91|c20*a factory|49,91|c18*the Howlett Hotel|50,91|c30*Gautrey Way|51,91|c0*Cockayne Grove Police Dept|52,91|c12*Botting Towers|53,91|c17*Nicholes Grove|54,91|c0*the Pack Building|55,91|c2*Nursey Way|56,91|c0*wasteland|57,91|c8*Marston Auto Repair|58,91|c15*Bignal Drive|59,91|c0*Beck Road Railway Station|60,91|c35*the Flynn Building|61,91|c2*Bilsdon Square|62,91|c0*Boutcher Alley|63,91|c0*the Cleaves Arms|64,91|c10*Mudford Auto Repair|65,91|c15*Warfield Boulevard School|66,91|c36*Sorrell Towers|67,91|c17*Milnerr Walk|68,91|c0*Totterdell Towers|69,91|c17*wasteland|70,91|c8*Howdell Walk|71,91|c0*Gare Square|72,91|c0*the Tyack Building|73,91|c2*Stansfield Drive|74,91|c0*the Kynaston Building|75,91|c20*Jacquet Square|76,91|c0*Hellyer Alley|77,91|c0*wasteland|78,91|c8*Bathurst Drive|79,91|c0*Gillett Way|80,91|c0*the Devine Motel|81,91|c30*Bugg Crescent|82,91|c0*Cowdry Cinema|83,91|c14*Fort Perryn Storehouse|84,91|c43*Fort Perryn Gatehouse|85,91|c43*Fort Perryn Barracks|86,91|c43*wasteland|87,91|c8*Potts Street|88,91|c0*Selley Plaza|89,91|c0*Glyde Bank|90,91|c21*the Cartwright Building|91,91|c20*the Eccleston Building|92,91|c2*Finnerty Auto Repair|93,91|c15*Club Otero|94,91|c27*wasteland|95,91|c8*Cowdrey Grove Railway Station|96,91|c35*the McCullock Building|97,91|c20*Chiles Park|98,91|c4*the Sigel Arms|99,91|c10*Marchetti Bank|0,92|c21*Sly Grove|1,92|c0*Horton Square Fire Station|2,92|c13*Woof Grove Fire Station|3,92|c13*the Orlando Arms|4,92|c10*Tintiney Park|5,92|c4*Farnworth Alley|6,92|c0*Harries Towers|7,92|c17*the Barratt Hotel|8,92|c30*Glessell Avenue|9,92|c0*a warehouse|10,92|c38*Horditch Auto Repair|11,92|c15*Miller Library|12,92|c11*St Neot's Church|13,92|c7*a cemetery|14,92|c37*Hillyer Park|15,92|c4*Rawkins Plaza|16,92|c0*Author Avenue|17,92|c0*a junkyard|18,92|c29*Aris Road|19,92|c0*a junkyard|20,92|c29*Leicester Street|21,92|c0*Dyer Park|22,92|c4*a carpark|23,92|c3*Pring Auto Repair|24,92|c15*Munckton Crescent|25,92|c0*the Padden Museum|26,92|c34*a junkyard|27,92|c29*Rennell Grove Railway Station|28,92|c35*Russe Bank|29,92|c21*Douglass Drive School|30,92|c36*Plumb Avenue Railway Station|31,92|c35*MacLaverty Avenue Fire Station|32,92|c13*Hendrich Road|33,92|c0*a junkyard|34,92|c29*Mooney Street|35,92|c0*Krinks Power Station|36,92|c19*Krinks Power Station|37,92|c19*Woodhouse Grove|38,92|c0*Merryweather Boulevard|39,92|c0*Fey Walk|40,92|c0*Wadman Place School|41,92|c36*Grove Avenue|42,92|c0*Beakes Drive|43,92|c0*St Columbanus's Church|44,92|c7*Rosenhagen Plaza|45,92|c0*Tarring Place|46,92|c0*Ranson Boulevard Police Dept|47,92|c12*Saffyn Place|48,92|c0*the Mechel Museum|49,92|c34*Alner Library|50,92|c11*Riggs Avenue|51,92|c0*Horsnell Lane|52,92|c0*Buskin Drive|53,92|c0*Reed Towers|54,92|c17*a factory|55,92|c18*a carpark|56,92|c3*a junkyard|57,92|c29*Keirl Street|58,92|c0*the Clive Building|59,92|c2*Stagg Crescent|60,92|c0*Wheaton Square|61,92|c0*Cowen Drive|62,92|c0*Minifie Plaza|63,92|c0*the Colbourne Museum|64,92|c34*St Juan's Church|65,92|c7*a cemetery|66,92|c37*the Dark Building|67,92|c2*the Riggs Museum|68,92|c34*Portal Way|69,92|c0*the Gagan Building|70,92|c2*Pine Walk Fire Station|71,92|c13*Servatius General Hospital|72,92|c9*Hanlon Way|73,92|c0*Capper Square|74,92|c0*Angerstein Park|75,92|c4*Phipps Square|76,92|c0*Percival Street Fire Station|77,92|c13*the Dimon Monument|78,92|c28*Burn Towers|79,92|c17*Somerside Drive Police Dept|80,92|c12*Pitt Way|81,92|c0*Clinker Avenue|82,92|c0*Kemmis Walk|83,92|c0*the Leach Motel|84,92|c30*Went Street|85,92|c0*Seymour Bank|86,92|c21*Petherbridge Way|87,92|c0*the Allsop Building|88,92|c2*Wilsdon Park|89,92|c4*Hitchcott Park|90,92|c4*a warehouse|91,92|c38*wasteland|92,92|c8*Old Towers|93,92|c17*the Gough Building|94,92|c2*the Hodson Motel|95,92|c30*the Perriam Museum|96,92|c34*Batts Towers|97,92|c17*Weir Place|98,92|c0*Glode Walk|99,92|c0*McEwan Grove|0,93|c0*Care Bank|1,93|c21*Amory Lane|2,93|c0*Mildon Square|3,93|c0*Wale Place|4,93|c0*Dinovan Alley|5,93|c0*a junkyard|6,93|c29*Gregg Library|7,93|c11*wasteland|8,93|c8*Durling Road|9,93|c0*Smithfield Alley|10,93|c0*Kelley Library|11,93|c11*the Durston Building|12,93|c2*Leman Boulevard|13,93|c0*Newmarch Square Fire Station|14,93|c13*Emma General Hospital|15,93|c9*Tredaway Way|16,93|c0*Langridge Drive|17,93|c0*Crew Walk|18,93|c0*Clavey Walk|19,93|c0*the Fortt Museum|20,93|c34*a junkyard|21,93|c29*Rudd Place|22,93|c0*the Pippard Building|23,93|c2*a factory|24,93|c18*Howse Row|25,93|c0*Dinan Walk|26,93|c0*Heskin Square|27,93|c0*the Sillence Museum|28,93|c34*wasteland|29,93|c8*Chudley Row Fire Station|30,93|c13*the Wiley Building|31,93|c2*Sergeant Library|32,93|c11*Gartell Towers|33,93|c17*a carpark|34,93|c3*the Clayton Building|35,93|c2|p*Krinks Power Station|36,93|c19*Krinks Power Station|37,93|c19*Condon Boulevard Fire Station|38,93|c13*the Eastwood Museum|39,93|c34*Darvall Lane|40,93|c0*wasteland|41,93|c8*a junkyard|42,93|c29*Marshfield Road|43,93|c0*a cemetery|44,93|c37*a carpark|45,93|c3*Bell Lane|46,93|c0*a warehouse|47,93|c38*a factory|48,93|c18*the Bainton Hotel|49,93|c30*Fean Avenue|50,93|c0*Craddock Road|51,93|c0*the Craigie Building|52,93|c20*Bugden Drive|53,93|c0*Sharpe Library|54,93|c11*Hitchens Towers|55,93|c17|p*a warehouse|56,93|c38*Lewance Library|57,93|c11*Ephrem General Hospital|58,93|c9*Gingell Lane|59,93|c0*wasteland|60,93|c8*Fluck Library|61,93|c11*the Pink Museum|62,93|c34*the Elton Museum|63,93|c34*a factory|64,93|c18*" +
        "the Goodwyn Museum|65,93|c34*the Eddington Monument|66,93|c28*Loockyer Cinema|67,93|c14*Trett Plaza|68,93|c0*Hepplethwaite Drive|69,93|c0*the Hodge Building|70,93|c2*Athay Crescent Fire Station|71,93|c13*the Pitts Building|72,93|c2*Ozen Park|73,93|c4*Lea Avenue Fire Station|74,93|c13*a warehouse|75,93|c38*Budmead Way|76,93|c0*Burfield Park|77,93|c4*Kilingback Cinema|78,93|c14*the Denney Arms|79,93|c10*the Wyche Building|80,93|c2*Gatclin Square|81,93|c0*a warehouse|82,93|c38*Garton Place Railway Station|83,93|c35*Collinns Road|84,93|c0*Tikanoff Square Railway Station|85,93|c35*Banton Cinema|86,93|c14*Jepp Way|87,93|c0*Hellings Lane|88,93|c0*Ackermen Way|89,93|c0*Hanham Way|90,93|c0*Postlethwaite Drive|91,93|c0*a carpark|92,93|c3*wasteland|93,93|c8*Wadham Square Police Dept|94,93|c12*Shuffery Bank|95,93|c21*Berrow Bank|96,93|c21*Robinson Crescent|97,93|c0*Stockwell Auto Repair|98,93|c15*the Gill Building|99,93|c2*Shervord Place|0,94|c0*Starkey Row|1,94|c0*Dane Drive|2,94|c0*Lathey Drive|3,94|c0*Halliday Lane|4,94|c0*a carpark|5,94|c3*Lawrence Auto Repair|6,94|c15*the Gulliver Building|7,94|c2*the Vick Arms|8,94|c10*Edgington Way|9,94|c0*Rayfield Bank|10,94|c21*Cary Towers|11,94|c17*St Daniel's Church|12,94|c7*a cemetery|13,94|c37*a factory|14,94|c18*Edgell Road|15,94|c0*Margery Avenue|16,94|c0*Damon Row School|17,94|c36*Wilton Drive|18,94|c0*Kelreher Square|19,94|c0*Mais Park|20,94|c4*Barens Road Fire Station|21,94|c13*Cui Towers|22,94|c17*Club Peerless|23,94|c27*Slocombe Plaza School|24,94|c36*Rock Place|25,94|c0*Matthewson Library|26,94|c11*Sureties Walk|27,94|c0*a warehouse|28,94|c38*Veresmith Street Police Dept|29,94|c12*McIlhargey Way Railway Station|30,94|c35*Haydon Bank|31,94|c21*Waller Crescent|32,94|c0*Voller Road|33,94|c0*Lahey Auto Repair|34,94|c15*Trask Place|35,94|c0*a carpark|36,94|c3*the Reddrop Monument|37,94|c28*the Bullor Arms|38,94|c10*the Jervis Arms|39,94|c10*Milard Lane|40,94|c0*a factory|41,94|c18*Brinson Square|42,94|c0*a carpark|43,94|c3*Bonning Cinema|44,94|c14*Don Avenue|45,94|c0*Griffiths Park|46,94|c4*Houlden Avenue|47,94|c0*Stayne Row|48,94|c0*a junkyard|49,94|c29*McCormack Way|50,94|c0*Ackland Auto Repair|51,94|c15*a junkyard|52,94|c29*the Ryles Building|53,94|c2*the Witt Arms|54,94|c10*Pysing Way|55,94|c0*the Ruxton Museum|56,94|c34*Cowie Library|57,94|c11*Bubcar Avenue|58,94|c0*a warehouse|59,94|c38*Bendall Cinema|60,94|c14*Shearn Alley School|61,94|c36*Earle Way|62,94|c0*Theophan General Hospital|63,94|c9*the Roddoway Building|64,94|c2|p*wasteland|65,94|c8*the Dinan Hotel|66,94|c30*a junkyard|67,94|c29*Spalding Place|68,94|c0*the Chard Building|69,94|c2*Spooner Lane|70,94|c0*the Standfast Arms|71,94|c10*St Lucius's Church|72,94|c7*Twill Alley School|73,94|c36*wasteland|74,94|c8*Hagger Way|75,94|c0*Strawbridge Grove|76,94|c0*wasteland|77,94|c8*a junkyard|78,94|c29*Dickenson Row|79,94|c0*Kean Place|80,94|c0*a factory|81,94|c18*a factory|82,94|c18*the Beagly Hotel|83,94|c30*the Sherwel Building|84,94|c2|p*Anne General Hospital|85,94|c9*Woolley Grove|86,94|c0*the Gullick Building|87,94|c2*Whitemore Library|88,94|c11*a warehouse|89,94|c38*Fricker Crescent Police Dept|90,94|c12*Restrick Crescent|91,94|c0*the Derham Building|92,94|c2*Ketley Lane Railway Station|93,94|c35*the Heward Arms|94,94|c10*Tickle Crescent|95,94|c0*Byers Avenue|96,94|c0*Randle Boulevard|97,94|c0*the Baynes Building|98,94|c2*Birmingham Bank|99,94|c21*Cottingham Drive Fire Station|0,95|c13*the Mitchener Building|1,95|c20*Blunden Walk|2,95|c0*Painter Street School|3,95|c36*the Parr Building|4,95|c2|p*Comitty Row Fire Station|5,95|c13*Hinkes Auto Repair|6,95|c15*Raggett Row|7,95|c0*the Fullaway Building|8,95|c2*Newmarch Avenue School|9,95|c36*Elder Alley|10,95|c0*a carpark|11,95|c3*Haley Street|12,95|c0*a warehouse|13,95|c38*Club Hunn|14,95|c27*Brain Boulevard Railway Station|15,95|c35*the Flambert Motel|16,95|c30|p*Large Row Police Dept|17,95|c12*Bendells Row Fire Station|18,95|c13*a junkyard|19,95|c29*Hopping Road Police Dept|20,95|c12*Grizel Library|21,95|c11*Stockman Walk Police Dept|22,95|c12*the Gyllet Building|23,95|c2*the Piggott Building|24,95|c2*the Waters Building|25,95|c2|p*the Orman Monument|26,95|c28*the Street Building|27,95|c2*Swyer Crescent|28,95|c0*Craze Towers|29,95|c17*Kempster Auto Repair|30,95|c15*Seward Boulevard|31,95|c0*the Poulter Building|32,95|c2*Coutts Alley Railway Station|33,95|c35*wasteland|34,95|c8*Millward Drive|35,95|c0*the Mayer Building|36,95|c20*the Missen Building|37,95|c20*Hurst Square School|38,95|c36*Luttrell Towers|39,95|c17*Beable Drive|40,95|c0*Halliley Cinema|41,95|c14*a warehouse|42,95|c38*Wybrants Plaza|43,95|c0*a warehouse|44,95|c38|p*Hallifax Auto Repair|45,95|c15*Hallson Alley|46,95|c0*wasteland|47,95|c8*Hutchin Bank|48,95|c21*Wadley Bank|49,95|c21*Prentice Road|50,95|c0*the Hetherington Monument|51,95|c28*the Huddy Museum|52,95|c34*Broadbery Lane|53,95|c0*Frith Square|54,95|c0*Knight Square|55,95|c0*Honeybone Walk|56,95|c0*the Wolfendall Arms|57,95|c10*Shepherd Auto Repair|58,95|c15*Wey Row|59,95|c0*Shiel Crescent|60,95|c0*Holden Lane|61,95|c0*the Limbery Hotel|62,95|c30*Avent Crescent Fire Station|63,95|c13*Abbott Road School|64,95|c36*a warehouse|65,95|c38*Baston Street|66,95|c0*Flower Crescent Railway Station|67,95|c35*St Daniel's Church|68,95|c7*Gall General Hospital|69,95|c9*Winslade Road|70,95|c0*Daley Way|71,95|c0*Witherington Boulevard|72,95|c0*the Barrow Building|73,95|c2|p*Carrington Plaza|74,95|c0*Patton Way|75,95|c0*Bramwell Drive|76,95|c0*Milverton Street Railway Station|77,95|c35*Wedlake Grove|78,95|c0*Chancellor Place Railway Station|79,95|c35*Smallwood Walk|80,95|c0*the Phelips Museum|81,95|c34*Stott Cinema|82,95|c14*a warehouse|83,95|c38*a warehouse|84,95|c38*the Colglough Building|85,95|c20*the Mais Motel|86,95|c30*the Beable Arms|87,95|c10*Charteris Bank|88,95|c21*Bisdee Road Fire Station|89,95|c13*a carpark|90,95|c3*Snoad Grove|91,95|c0*Hogyson Place|92,95|c0*Olive Walk|93,95|c0*a factory|94,95|c18|p*the Fliney Building|95,95|c20*the Balle Monument|96,95|c28*a carpark|97,95|c3*Richardson Walk|98,95|c0*Currington Cinema|99,95|c14*Jukes Walk|0,96|c0*Maxwell Avenue|1,96|c0*a warehouse|2,96|c38*Redpath Place|3,96|c0*Tilke Bank|4,96|c21*a carpark|5,96|c3*wasteland|6,96|c8*Tope Alley Railway Station|7,96|c35*the Wagner Building|8,96|c2*the Court Building|9,96|c2*Pridmore Way School|10,96|c36*McKay Lane Police Dept|11,96|c12*St Luke's Hospital|12,96|c9*Pridmore Way School|13,96|c36*Basket Avenue|14,96|c0*Messiter Alley|15,96|c0*St Alda's Church|16,96|c7*Nettleton Towers|17,96|c17*Question Place|18,96|c0*Bulmer Cinema|19,96|c14*Wetton Library|20,96|c11*Coat Avenue|21,96|c0*St Swithun's Church|22,96|c7*Wheelan Grove|23,96|c0*Haydon Auto Repair|24,96|c15*the Wray Building|25,96|c2*Garrett Lane|26,96|c0*Wakerman Cinema|27,96|c14*Valentine Lane|28,96|c0*Learmond Walk Fire Station|29,96|c13*the Forst Building|30,96|c20*Charasse Plaza Railway Station|31,96|c35*the Brookman Building|32,96|c2*Club Fagan|33,96|c27*Vale Road|34,96|c0*Mant Boulevard|35,96|c0*Pincombe Grove|36,96|c0*Club Margesson|37,96|c27*wasteland|38,96|c8*Mansbridge Alley|39,96|c0*the Bound Building|40,96|c2*the Dury Building|41,96|c2*Pound Street|42,96|c0*wasteland|43,96|c8*a junkyard|44,96|c29*Fildes Walk|45,96|c0*Club Hunt|46,96|c27*Patridge Grove|47,96|c0*the Tebbett Building|48,96|c20*Gyllet Street|49,96|c0*Wells Plaza|50,96|c0*a warehouse|51,96|c38*wasteland|52,96|c8*St Celestine's Church|53,96|c7*a carpark|54,96|c3*Wooman Towers|55,96|c17*the Needs Building|56,96|c20*the Cosh Motel|57,96|c30*the Wicksted Building|58,96|c20*the Threadgold Building|59,96|c2*Methringham Alley Railway Station|60,96|c35*Loweth Drive|61,96|c0*Marchia Walk|62,96|c0*a carpark|63,96|c3*Sparke Row|64,96|c0*Holsgrove Boulevard|65,96|c0*St Piran's Church|66,96|c7*Pilbeam Bank|67,96|c21*the Porter Building|68,96|c20*Twitt Place|69,96|c0*the Appelby Building|70,96|c2*the Cowie Building|71,96|c2*Martha General Hospital|72,96|c9*the Coy Museum|73,96|c34*the Poulet Museum|74,96|c34*Voss Lane Police Dept|75,96|c12*Shepherd Place|76,96|c0*the Panter Building|77,96|c2*Ruffer Bank|78,96|c21*Barrell Park|79,96|c4*a warehouse|80,96|c38*Agapitus General Hospital|81,96|c9*Greensill Lane|82,96|c0*a warehouse|83,96|c38*a factory|84,96|c18*the McLaren Motel|85,96|c30*a carpark|86,96|c3*a carpark|87,96|c3*Brymer Drive|88,96|c0*the Bellamy Building|89,96|c2*St Francis's Hospital|90,96|c9*Villar Park|91,96|c4*Tite Way School|92,96|c36*Quarles Library|93,96|c11*Hatwell Library|94,96|c11*Whitefield Way|95,96|c0*Josephine General Hospital|96,96|c9*the Bodd Museum|97,96|c34*a junkyard|98,96|c29*Woodborne Boulevard|99,96|c0*Purchas Towers|0,97|c17*a warehouse|1,97|c38*the Tebbet Building|2,97|c2*wasteland|3,97|c8*Small Street Fire Station|4,97|c13*Payton Square|5,97|c0*Drury Street|6,97|c0*Woollcombe Plaza|7,97|c0*Purvis Library|8,97|c11*St Timothy's Hospital|9,97|c9*Malpas Grove|10,97|c0*Tatler Lane|11,97|c0*the Hardy Building|12,97|c2*Kingman Alley|13,97|c0*St Daniel's Church|14,97|c7*a cemetery|15,97|c37*Cradock Grove Railway Station|16,97|c35*Pillinger Boulevard|17,97|c0*Gwinnall Walk|18,97|c0*the Button Building|19,97|c20*a carpark|20,97|c3*Doone Towers|21,97|c17*a carpark|22,97|c3*wasteland|23,97|c8*Dudman Row Fire Station|24,97|c13*Williamson Place|25,97|c0*Locket Drive|26,97|c0*the Bennett Building|27,97|c2*Rosenhagen Auto Repair|28,97|c15*a factory|29,97|c18*Peach Bank|30,97|c21*Geard Drive School|31,97|c36*Club Pulsford|32,97|c27*St Cyprian's Church|33,97|c7*a cemetery|34,97|c37*the Montgomery Monument|35,97|c28*Club Kempster|36,97|c27*the Spurr Building|37,97|c2*St Servatius's Church|38,97|c7*Shfield Bank|39,97|c21*St Aidan's Church|40,97|c7*Whittem Place Fire Station|41,97|c13*Pargitten Alley School|42,97|c36*Snow Library|43,97|c11*Milligan Street|44,97|c0*Club Dell|45,97|c27*Perriott Grove|46,97|c0*Lyne Cinema|47,97|c14*Rhymes Crescent|48,97|c0*the Knapton Building|49,97|c2*Julie General Hospital|50,97|c9*a carpark|51,97|c3*Homan Drive|52,97|c0*Screech Lane Police Dept|53,97|c12*a cemetery|54,97|c37*Haim Walk Fire Station|55,97|c13*a warehouse|56,97|c38*wasteland|57,97|c8*Cabbell Way|58,97|c0*Owens Park|59,97|c4*Reed Avenue School|60,97|c36*the MacDonald Building|61,97|c2*Pitman Library|62,97|c11*the Hedley Arms|63,97|c10*Carpinter Boulevard|64,97|c0*the Dollis Arms|65,97|c10*a cemetery|66,97|c37*Hayne Street|67,97|c0*Adolphy Drive|68,97|c0*Barnes Cinema|69,97|c14*wasteland|70,97|c8*Ruddle Cinema|71,97|c14*St Simon's Church|72,97|c7*a cemetery|73,97|c37*Teresa General Hospital|74,97|c9*Sidney Plaza|75,97|c0*the Hibbert Museum|76,97|c34*Mohrinck Cinema|77,97|c14*Gleaves Crescent|78,97|c0*Babey Road School|79,97|c36*Stoy Alley|80,97|c0*the Nathan Monument|81,97|c28*the Sleeman Monument|82,97|c28*Bidgood Street|83,97|c0*the Rayment Building|84,97|c2*wasteland|85,97|c8*the Roche Hotel|86,97|c30*Dewfall Cinema|87,97|c14*Sprackling Square Police Dept|88,97|c12*Clough Towers|89,97|c17*Stroude Crescent|90,97|c0*a factory|91,97|c18*Club Yorke|92,97|c27*Callistus General Hospital|93,97|c9*Atyeo Crescent|94,97|c0*Dollery Lane|95,97|c0*a carpark|96,97|c3*the Barns Motel|97,97|c30*the Weymouth Arms|98,97|c10*Cottell Drive|99,97|c0*Ashfield Alley Railway Station|0,98|c35*Gigg Road|1,98|c0*Club Chester|2,98|c27*Allwood Drive|3,98|c0*Weatherhead Lane|4,98|c0*the Wreford Building|5,98|c20*the Woolven Building|6,98|c2*the Curtis Building|7,98|c2*Methringham Grove|8,98|c0*Sartain Road|9,98|c0*Bicknel Way|10,98|c0*Edbrook Walk Fire Station|11,98|c13*Statham Walk Railway Station|12,98|c35*Seaman Boulevard|13,98|c0*the Edbrook Building|14,98|c2*the Woodforde Building|15,98|c2*Gomer Boulevard|16,98|c0*Howes Row|17,98|c0*Androwes Towers|18,98|c17*Dickin Park|19,98|c4*Bowring Way Police Dept|20,98|c12*the Mallett Museum|21,98|c34*a warehouse|22,98|c38*Sealy Road|23,98|c0*a factory|24,98|c18*Maturin Avenue|25,98|c0*Ensor Cinema|26,98|c14*St Mark's Cathedral|27,98|cathedral*St Mark's Cathedral|28,98|cathedral*Ennitt Bank|29,98|c21*Melliar Park|30,98|c4*the Howord Arms|31,98|c10*the Cupper Building|32,98|c2*Buckett Street|33,98|c0*Dalgliesh Street|34,98|c0*Carse Lane|35,98|c0*Grannum Auto Repair|36,98|c15*the Sams Building|37,98|c2*Perceval Grove|38,98|c0*Balch Place|39,98|c0*a cemetery|40,98|c37*the Pryor Building|41,98|c20*the Mallery Building|42,98|c2*Pidgeon Avenue|43,98|c0*the Shickell Arms|44,98|c10*a junkyard|45,98|c29*Rouse Road|46,98|c0*Hanney Auto Repair|47,98|c15*Garlick Square Fire Station|48,98|c13*Buckley Mall|49,98|c6*Buckley Mall|50,98|c6*St Dionysius's Church|51,98|c7*St Emelia's Church|52,98|c7*the Lodder Building|53,98|c20*Cheesman Bank|54,98|c21*the Brookes Arms|55,98|c10*a factory|56,98|c18*St Maximillian's Church|57,98|c7*wasteland|58,98|c8*wasteland|59,98|c8*the Rycroft Building|60,98|c2*Batt Bank|61,98|c21*Eeles Way|62,98|c0*the Meadley Building|63,98|c2*Huggins Avenue Fire Station|64,98|c13*a junkyard|65,98|c29*Stampfordham Cinema|66,98|c14*the Bere Arms|67,98|c10*Cowell Row School|68,98|c36*Parker Square|69,98|c0*Kirkland Cinema|70,98|c14*Knapton Drive|71,98|c0*the Sherston Monument|72,98|c28*Rixon Plaza|73,98|c0*the Davey Hotel|74,98|c30*a junkyard|75,98|c29*McNally Plaza|76,98|c0*a junkyard|77,98|c29*Dinsdale Walk|78,98|c0*Spirod Plaza|79,98|c0*Powers Bank|80,98|c21*St Cunigunde's Church|81,98|c7*a cemetery|82,98|c37*wasteland|83,98|c8*the Hurst Building|84,98|c20*Herridge Way School|85,98|c36*Forst Alley|86,98|c0*Copping Drive|87,98|c0*Skilton Crescent|88,98|c0*Club Adey|89,98|c27*Red Park|90,98|c4*Merryweather Boulevard|91,98|c0*Bradley Walk|92,98|c0*Porter Library|93,98|c11*Whittaker Boulevard|94,98|c0*a warehouse|95,98|c38*Bloom Avenue|96,98|c0*Ferriss Row|97,98|c0*Dawson Way|98,98|c0*McCullack Bank|99,98|c21*Pritchard Grove Railway Station|0,99|c35*the Keyford Museum|1,99|c34*Hersant Avenue|2,99|c0*Judd Cinema|3,99|c14*the Connors Motel|4,99|c30*wasteland|5,99|c8*the Parkhouse Monument|6,99|c28*the Denty Building|7,99|c20*the Harford Building|8,99|c20*wasteland|9,99|c8*the Leggatt Building|10,99|c2*wasteland|11,99|c8*Perryman Park|12,99|c4*Bray Square|13,99|c0*the Paffard Building|14,99|c2*Edgcumbe Drive Fire Station|15,99|c13*Woodbridge Plaza|16,99|c0*Club Yeeles|17,99|c27*the Hawley Motel|18,99|c30*Theobald Library|19,99|c11*St Helena's Hospital|20,99|c9*House Auto Repair|21,99|c15*Club Quier|22,99|c27*Moores Lane|23,99|c0*Ralfe Plaza|24,99|c0*Author Row|25,99|c0*a warehouse|26,99|c38*St Mark's Cathedral|27,99|cathedral*St Mark's Cathedral|28,99|cathedral*wasteland|29,99|c8*a carpark|30,99|c3*Bodmin Avenue|31,99|c0*the Boddy Building|32,99|c2*the Eckersley Building|33,99|c2*Whitty Bank|34,99|c21*the Velvick Building|35,99|c2*Woollacott Row|36,99|c0*Whyppey Place|37,99|c0*Borrer Towers|38,99|c17*Penfold Alley|39,99|c0*Headland Street|40,99|c0*a warehouse|41,99|c38*Frost Square|42,99|c0*Bowle Row|43,99|c0*Jenkins Lane Railway Station|44,99|c35*Alner Place School|45,99|c36*the Lethebe Building|46,99|c2*a factory|47,99|c18*a warehouse|48,99|c38*Buckley Mall|49,99|c6*Buckley Mall|50,99|c6*a cemetery|51,99|c37*Ellard Road|52,99|c0*Club Golding|53,99|c27*Club Morris|54,99|c27*Donoran Alley|55,99|c0*Nurcombe Bank|56,99|c21*Winsley Square|57,99|c0*the Kenefie Building|58,99|c2*the William Arms|59,99|c10*Club Dorvell|60,99|c27*the Starkie Building|61,99|c2*the Bickell Building|62,99|c2*the Western Building|63,99|c20*Tilke Park|64,99|c4*a warehouse|65,99|c38*wasteland|66,99|c8*Whitemore Auto Repair|67,99|c15*a junkyard|68,99|c29*the Lamport Arms|69,99|c10*the Durie Museum|70,99|c34*the Curtice Building|71,99|c2*the Bird Hotel|72,99|c30*the Pettey Building|73,99|c2*Barnwell Alley|74,99|c0*the Kirkaldie Building|75,99|c2*the Buckley Building|76,99|c2*the Tidcombe Building|77,99|c2*Meatyard Crescent|78,99|c0*the Addiscott Building|79,99|c2*Tims Grove|80,99|c0*wasteland|81,99|c8*St Symmachus's Church|82,99|c7*Club Hucker|83,99|c27*Hitchens Street Fire Station|84,99|c13*wasteland|85,99|c8*Creyghton Crescent Railway Station|86,99|c35*Wheddon Square|87,99|c0*St Juan's Church|88,99|c7*Walters Cinema|89,99|c14*Donoghan Walk Fire Station|90,99|c13*a junkyard|91,99|c29*Brancker Bank|92,99|c21*Horsnell Towers|93,99|c17*Maguire Plaza|94,99|c0*a junkyard|95,99|c29*Pickering Alley School|96,99|c36*Strutt Bank|97,99|c21*Perram Square|98,99|c0*Nickells Grove|99,99|c0";
    return mapInfo.split("*");
}

function getCoordinateInfo(mapInfo, x, y) {
    return mapInfo[y * 100 + x].split("|");
}

function pointDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

function UDBlockDistance(x1, y1, x2, y2) {
    var xdif = Math.abs(x1 - x2);
    var ydif = Math.abs(y1 - y2);
    return Math.max(xdif, ydif);
}