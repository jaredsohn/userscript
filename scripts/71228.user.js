// ==UserScript==
// @name           Pardus NavComp
// @namespace      pardus.at
// @author         Scalene
// @version        1
// @description    Highlights a shortest route to your destination
// @include        http://*.pardus.at/main.php
// ==/UserScript==

/*

Manual
======

This is the Pardus Navigation Computer, designed to aid pilots in traveling to
their destination with a minimum of wasted energy. The Navigation Computer
(NavComp) has a simple interface: enter the X and Y coordinates of the desired
destination, and then instruct the NavComp to chart a course. The NavComp will
download a record of the public chart of the pilot's current galactic sector
and compute all of the lowest-cost routes (in terms of Action Points) from
every navigable location in the pilot's current sector to the desired
destination. Finally, the NavComp will indicate a lowest-cost route from the
pilot's current location to the destination on the ship's navigation display.
A knowledge of several features of the NavComp will allow the pilot to use it
more effectively.

The NavComp automatically caches the results of its calculations, and will
only update them in the event that the pilot inputs a new destination or
navigates to a new sector. This allows for speedier feedback in most
situations, and can prove invaluable when being purused by Space Maggots.

The topology of space is such that, between two given locations, there are
usually several different paths that all have equal, minimal cost. The NavComp
selects one of these paths for display according to a procedure whose origins
have been lost in the shuffling decay of history. The experience of the pilot
is relied upon to recognize areas of the charted course which the pilot is
free to alter without adversely affecting the cost of the route.

The NavComp does not account for the locations of other pilots or creatures in
space when making its calculations. In this case, too, the pilot must be
imposed upon to pilot.

The spatial distortions introduced by wormholes presently make it impossible
to compute routes that terminate at a location in another sector of space. It
is possible that, with further improvements in quantum computation, this will
become a tractable problem in the future. On the other hand, given the
inherently probabilistic nature of quantum computation, on that day the pilot
may opt for manual flight rather than risk a small but finite chance of the
ship navigating them into an enemy starbase.

The NavComp interfaces with the pilot's ship's other subsystems to
automatically determine what type of engine is installed, and all subsequent
computations take this information into account. However, due to the nature of
the NavComp caching system described above, any change to the engine will not
be recognized by the NavComp until the pilot has navigated to a new sector.

Additionally, the NavComp does *not* interface with the pilot's brain, however
desirable this might be, and is therefore unaware of any advanced skills the
pilot may posses which ease navigation through certain field types. The
advanced pilot is assumed to have sufficient experience to compensate for this
feature of the NavComp system.

*/

// TODO Add 'points of interest' feature
// TODO Invent a reasonable way to straighten paths
// FIXME Problem when AP cost is higher than normal; magnetic scoop

var highlightColor   = "green";
var highlightOpacity = 0.7;
var debugathon = false;

// Reassure the user.
if(debugathon) console.log("Things are working.");

// Do everything
var n = new navComp();

// This script only gets patched in to 'main.php', which is the Pardus nav
// screen, so in this script `document` refers only to that frame

// The next few functions are simple utilities for gathering information. They
// are global to this script becuase they are conceptually constants: the
// values they return cannot change while this script is running; they can
// only change if the player reloads the page

// Here we can be sure that the message bar exists, because this script is
// running inside main.php, which only gets loaded with the message bar at the
// top
function universeName() {
    // We need window.parent b/c main.php is a child of game.php and a sibling
    // of the message frame
    var msgDoc = window.parent.frames[1].document;
    var uni    = msgDoc.getElementById('universe');
    return uni.getAttribute('title').split(':')[0].toLowerCase();
}

function sectorName() {
    // Shamelessly stolen from pardus_quick_commands.user.js
    var sec = document.getElementById('sector');
    sec = sec.innerHTML.replace(/(<([^>]+)>)/ig,"");
    // String spaces from sector names
    sec = sec.split(' ').join('');
    return sec;
}

function playerLocation() {
    var c = document.getElementById('coords');
    
    // Some of the other Pardus Greasemonkey hacks wrap the coords in a link
    if(c.children.length > 0) c = c.children[0];
    
    c = c.innerHTML;
    c = c.substring(1,c.length-1).split(',');
    c = c.map(function(x) { return parseInt(x); });
    
    return c;
}

// Here is how communication happens: when the page loads, I create a navComp
// interface object. This object, when created, will hack in the user-visible
// interface somewhere on the Pardus nav screen. Then it peeks at the value
// for the player destination maybe stored by Greasemonkey some time in the
// past and uses that to autofill the interface. If the destination is
// actually a valid pair of integers, the navComp then creates a pardusGrid
// object parametrized on the player's desired destination. The pardusGrid
// object automatically populates its own fields and does all the necessary
// checks to see what should be updated and how to draw and so on.

function navComp() {
    // Hacks the navigation form into the document, returning a reference to
    // the form
    this.interface = createNavCompInterface();
    
    // Set up accessors to easily read and set the value of the two input
    // boxes in the navigation interface
    this.__defineGetter__("x",function() {
        return parseInt(this.interface.elements.
            namedItem("playerDestinationX").value);
    });
    this.__defineGetter__("y",function() {
        return parseInt(this.interface.elements.
            namedItem("playerDestinationY").value);
    });
    this.__defineSetter__("x",function(x) {
        this.interface.elements.namedItem("playerDestinationX").value = x;
    });
    this.__defineSetter__("y",function(y) {
        this.interface.elements.namedItem("playerDestinationY").value = y;
    });
    
    this.peekPlayerDestination = eval(GM_getValue('navCompDestination','[]'));
    
    this.clearCache = function() {
        GM_setValue("navCompDestination","[]");
        GM_setValue("navCompSector","");
        GM_setValue("navCompRoot","[]");
        GM_setValue("navCompCostTable","[]");
        GM_setValue("navCompPredecessors","[]");
    }
    
    this.pokePlayerDestination = function() {
        var f = document.forms.namedItem("navCompInterface");
        var x = parseInt(f.elements.namedItem("playerDestinationX").value);
        var y = parseInt(f.elements.namedItem("playerDestinationY").value);
        
        if( isNaN(x) || isNaN(y) || x < 0 || y < 0) var dest = [];
        else var dest = [x,y];
        
        GM_setValue("navCompDestination",dest.toSource());
    }
    
    // Create a convienent handle
    _this = this;
    
    // Autofill the interface with previous values, if any
    if(this.peekPlayerDestination.length > 0) {
        this.x = this.peekPlayerDestination[0];
        this.y = this.peekPlayerDestination[1];
    }
    
    // Attach the poke function to the submit button
    this.interface.elements.namedItem("navCompSubmit").addEventListener(
        "click",_this.pokePlayerDestination,true);
    // Attach the flush function to the flush button
    this.interface.elements.namedItem("navCompFlush").addEventListener(
        "click",_this.clearCache,true);
    
    // If there was a valid destination in the cache, then we create a
    // pardusGrid, which will automatically determine what sorts of updates
    // need to be done as it populates its members. If there was not a valid
    // destination in the cache, we do nothing else.
    if(this.peekPlayerDestination.length > 0) {
        this.grid = new pardusGrid([this.x,this.y]);
    }
}

function createNavCompInterface() {
    // Select the body of the table used for the Ship box
    var yourshipTableBody = 
        document.getElementById('yourship').children[0];
    // Create a new row
    newRow = document.createElement('tr');
    // And insert it as the second-to-last row of the table
    yourshipTableBody.insertBefore(newRow,yourshipTableBody.children[2]);
    
    newCell = document.createElement('td');
    // Add the nice looking background to the cell
    newCell.setAttribute('style',"background-image: " +
        "url('http://static.pardus.at/images/panel.png'); " +
        "text-align: center;");
    newCell.innerHTML = '<form id=navCompInterface> <p>X: ' +
        '<input type="number" min="0" step="1" size=2 ' +
        'id="playerDestinationX"> Y: <input type="number" min="0" step="1" ' +
        'size=2 id="playerDestinationY"></p> <p><input type="submit" ' +
        'value="Chart a course" id="navCompSubmit"></p> <p><input ' +
        'type="submit" value="Flush cache" id="navCompFlush"></p></form>';
    
    newRow.appendChild(newCell);
    
    var navInterface = document.forms.namedItem("navCompInterface");
    
    return navInterface;
}

// a pardusGrid is made up of a table of costs that says how many AP the
// player has to expend to navigate off the various tiles in the current
// sector; a table of predecessors that is used to build the shortest path
// from the player's current location to the root of the predecessor table; a
// sector string that says what sector the cost/predecessor tables were
// calculated for; and a root location that says what the root (destination)
// of the predecessor table is.
//   
// The costTable only depends on the sector. If pardusGrid.sector does not
// match the current sector this table must be updated (by calling out to
// Butterfat).
//  
// The predecessors table depends on the costTable and the root. If
// pardusGrid.root does not match the player's desired destination, the
// predecessors table must be updated (by running dijkstra on the cost table
// with the new destination).
function pardusGrid(dest) {
    this.sector       = GM_getValue("navCompSector","");
    this.root         = eval(GM_getValue("navCompRoot","[]"));
    this.costTable    = eval(GM_getValue("navCompCostTable","[]"));
    this.predecessors = eval(GM_getValue("navCompPredecessors","[]"));
    this.destination  = dest;
    
    this.updateCache = function() {
        GM_setValue("navCompSector",      this.sector);
        GM_setValue("navCompRoot",        this.root.toSource());
        GM_setValue("navCompCostTable",   this.costTable.toSource());
        GM_setValue("navCompPredecessors",this.predecessors.toSource());
    }
    
    this.updatePredecessors = function(dest2) {
        this.root = dest2;
        this.predecessors = dijkstra(this.costTable,this.root);
    }
    
    this.pathTo = function(location) {
        var u = location;
        var p = new Array(u);
        while(this.predecessors[u[1]][u[0]]) {
            p.push(this.predecessors[u[1]][u[0]]);
            u = this.predecessors[u[1]][u[0]];
        }
        return new path(p);
    }
    
    // This is the function that pulls information out of Butterfat. It's
    // necessary for this function to update both the costs and predecessor
    // tables, because the GM_xmlhttpRequest runs asynchronously
    this.updateEverythingAndDraw = function(theObject) {
        // TODO Clear destination values when new sector
        GM_xmlhttpRequest({
            method: "GET",
            url:    "http://pardus.butterfat.net/pardusmapper/maps/" 
                    + universeName() + "/" + sectorName() + ".html",
            onload: function(response) {
                if(debugathon) console.log(
                    "Calling out to Butterfat. Old sector name: " + 
                    theObject.sector + 
                    "; new sector name: " + sectorName());
                
                theObject.sector    = sectorName();
                theObject.costTable = parseMap(response);
                theObject.updatePredecessors(theObject.destination);
                
                theObject.updateCache();
                
                theObject.pathTo(playerLocation()).draw();
            }
        });
    }
    
    /*
    3 cases:
    1. sector names match, root and destination match: just draw
    2. sector names match, root and destination differ: recompute predecessors
        and update the cache and draw a path
    3. sector names don't match: update everything
    */
    if(debugathon) {
        console.log("Current sector name: " + sectorName());
        console.log("Cached sector name: " + this.sector);
        console.log(sectorName() == this.sector);
    }
    if(sectorName() == this.sector) {
        if( this.destination[0] == this.root[0] &&
            this.destination[1] == this.root[1]    ) 
                this.pathTo(playerLocation()).draw();
        else {
            this.updatePredecessors(this.destination);
            this.updateCache();
            this.pathTo(playerLocation()).draw();
        }
    }
    else this.updateEverythingAndDraw(this);
}

function path(tileList) {
    this.tiles = tileList;
    this.draw = function() {
        // We want to only draw the part of p that appears on the nav screen
        // Get boundaries for the nav screen
        var nav    = document.getElementById('navarea');
        var N      = nav.rows.length;
        var delta  = (N-1) / 2;
        var center = playerLocation();
        
        var xMin = center[0] - delta;
        var xMax = center[0] + delta;
        var yMin = center[1] - delta;
        var yMax = center[1] + delta;
        
        // Filter the tile list to remove tiles outside the nav screen area
        var p = this.tiles.filter(function(c) {
            return xMin <= c[0] && c[0] <= xMax && yMin <= c[1] && c[1] <= yMax;
        });
        
        // Now we want to transform the [x,y] coordinate pairs into [i,j] pairs
        // that index into the navarea table
        p = p.map(function(x) { return [x[0]-xMin, x[1]-yMin]; });
        p = p.map(function(x) { return x.reverse(); });
        
        // Finally we highlight all of the squares in the navarea
        p.map(function(x) {
            var cell = nav.rows[x[0]].children[x[1]];
            var oldStyle = cell.getAttribute('style');
            // var newStyle = "border:solid red 1px";
            var newStyle = "background: " + highlightColor + ";";
            
            if(oldStyle) newStyle = oldStyle + newStyle;
            
            cell.setAttribute('style',newStyle);
            
            cell.getElementsByTagName('img')[0].setAttribute(
                'style','opacity: ' + highlightOpacity + ';');
        });
    }
}

// This one is for taking the response of the GM_xmlhttpRequest and
// constructing an array from it; the array gives the cost of moving off the
// squares in the current sector
function parseMap(response) {
    var fieldCost = {
        nod:    Infinity,
        emax:   Infinity,
        energy: 20,
        spa:    11,
        ast:    25,
        neb:    16,
        em:     36
    };
    
    // TODO Can I get this into a frame?
    // Does that get rid of the strange error message?
    // What's going on here? We need to get the retrieved HTML into the
    // current page so that it's part of the DOM so that I can work with it
    // most easily. The best way I can figure out how to do that is by adding
    // the retrieved text string to a created, invisible element. First set
    // up a new div
    var wanker = document.createElement("div");
    wanker.innerHTML = response.responseText;
    wanker.setAttribute('id', "butterfatContent");
    wanker.setAttribute('style','display:none');
    
    // Next splice it into `main.php` after the Ship box
    var wankersParent = document.getElementById('yourship');
    wankersParent.appendChild(wanker);
    
    // Now that it exists in the DOM, pull out the table containing the
    // Butterfat map of the current sector
    var map = wanker.getElementsByTagName("table")[0];
    
    // And because we are tidy and considerate, clean up our crumbs
    wankersParent.removeChild(wanker);
    
    // Now we want to figure out how to adjust the base field costs for the
    // player's engine. The strategy is: pull the movement cost out of the
    // status box and subtract this from the base cost for the field type of
    // the player's current location.
    // We have to do some index juju to make things line up; hopefully nothing
    // will ever change.
    var currLoc = playerLocation();
    var engineAdjust = 
        fieldCost[map.rows[currLoc[1]+1].children[currLoc[0]+1].className]
        - parseInt(
            document.getElementById('status').rows[1].children[0].children[0].
            children[0].rows[1].children[2].innerHTML);
    
    // Now we can parse it into a useful array
    // Butterfat adds a row of coordinate markers at the top and bottom, plus
    // an empty row at the bottom for some reason
    var sectorHeight = map.rows.length - 3;
    var sectorWidth = map.rows[0].childElementCount - 2;
    
    var cost = new Array(sectorHeight);
    for(var i=0;i<sectorHeight;i++){ cost[i] = new Array(sectorWidth); };
    
    for(var i=0;i<sectorHeight;i++){
        var currentRow = map.rows[i+1];
        for(var j=0;j<sectorWidth;j++) {
            cost[i][j] =
                fieldCost[currentRow.children[j+1].className]
                -engineAdjust;
    }};
    
    return cost;
}

// Here it is! The centerpiece, crux of the entire operation, whoo!, dance.
function dijkstra(costTable,destination) {
    // First we discover important facts
    var Ny = costTable.length;
    var Nx = costTable[0].length;
    
    // Next define some machinery that makes things slightly more pleasant.
    // This is a p(ardus)Loc(ation); it provides a generator for iterating
    // over all of the neighbors of this location that can be navigated to by
    // the player
    function pLoc(a) {
        this.x = a[0];
        this.y = a[1];
        this.i = a[1];
        this.j = a[0];
        this.neighborhood = function() {
            var coordMods=[[-1,-1], [0,-1], [1,-1], [-1,0],
                           [1,0], [-1,1], [0,1], [1,1]];
            
            for(var ii = 0; ii < coordMods.length; ii++) {
                var l = new pLoc([ this.x + coordMods[ii][0],
                                   this.y + coordMods[ii][1] ]);
                
                if(
                    0 <= l.x && l.x < Nx &&
                    0 <= l.y && l.y < Ny &&
                    isFinite(costTable[l.i][l.j])) yield l;
            }
        }
    };
    
    var dest = new pLoc(destination);
    
    // Intialize the predecessor array, which is rightly undefined
    var predecessor = new Array(Ny);
    for(var i=0; i<Ny; i++) predecessor[i] = new Array(Nx);
    
    // The distances array, which is infinite except for the destination
    var distances = new Array(Ny);
    for (var i=0; i<Ny; i++) {
        distances[i] = new Array(Nx);
        for (var j=0; j<Nx; j++) {
            distances[i][j] = Infinity;
        }
    }
    distances[dest.i][dest.j] = 0;
    
    // Initialize Q to contain all locations that a ship could be on
    var Q = new Array();
    for(var x=0; x<Nx; x++){ for(var y=0;y<Ny;y++){
        var l = new pLoc([x,y]);
        if(isFinite(costTable[l.i][l.j])) Q.push(l);
    }}
    
    while(Q.length > 0) {
        // find the smallest-distance location
        // Best way I know of is to dumbly step through the array, so...
        var dMin = Infinity; // Current shortest distances
        var c, ci; // Location with shortest distance and index of location
        for(var i=0, tempL; tempL = Q[i]; i++) {
            if(distances[tempL.i][tempL.j] <= dMin){
                dMin = distances[tempL.i][tempL.j];
                c    = tempL;
                ci   = i;
            }
        }
        
        // If the smallest distance to any node is Infinity, we can't do any
        // better, so stop
        if(!isFinite(dMin)) break;
        
        Q.splice(ci,1);
        
        for(var v in c.neighborhood()){
            var alt = distances[c.i][c.j] + costTable[c.i][c.j];
            if(alt < distances[v.i][v.j]){
                distances[v.i][v.j] = alt;
                predecessor[v.i][v.j] = [c.x,c.y];
            }
        }
    }
    
    return predecessor;
}
