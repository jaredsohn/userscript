// ==UserScript==
// @name        Send to Note Target
// @namespace   127.0.0.1
// @description send a fleet to target specified in note
// @include     http://www.war-facts.com/fleet_navigation.php?fleet=*
// @version     1
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @require     https://gist.github.com/raw/3123124/grant-none-shim.user.js
// ==/UserScript==

Array.prototype.______array = '______array';

var WF_JSON = {
    org: 'http://www.JSON.org',
    copyright: '(c)2005 JSON.org',
    license: 'http://www.crockford.com/JSON/license.html',
    stringify: function(arg) {
        var c, i, l, s = '', v;

        switch (typeof arg) {
            case 'object':
                if (arg) {
                    if (arg.______array == '______array') {
                        for (i = 0; i < arg.length; ++i) {
                            v = this.stringify(arg[i]);
                            if (s) {
                                s += ',';
                            }
                            s += v;
                        }
                        return '[' + s + ']';
                    } else if (typeof arg.toJsonString != 'undefined') {
                        return arg.toJsonString();
                    } else if (typeof arg.toString != 'undefined') {
                        for (i in arg) {
                            v = arg[i];
                            if (typeof v != 'undefined' && typeof v != 'function') {
                                v = this.stringify(v);
                                if (s) {
                                    s += ',';
                                }
                                s += this.stringify(i) + ':' + v;
                            }
                        }
                        return '{' + s + '}';
                    }
                }
                return 'null';
            case 'number':
                return isFinite(arg) ? String(arg) : 'null';
            case 'string':
                l = arg.length;
                s = '"';
                for (i = 0; i < l; i += 1) {
                    c = arg.charAt(i);
                    if (c >= ' ') {
                        if (c == '\\' || c == '"') {
                            s += '\\';
                        }
                        s += c;
                    } else {
                        switch (c) {
                            case '\b':
                                s += '\\b';
                                break;
                            case '\f':
                                s += '\\f';
                                break;
                            case '\n':
                                s += '\\n';
                                break;
                            case '\r':
                                s += '\\r';
                                break;
                            case '\t':
                                s += '\\t';
                                break;
                            default:
                                c = c.charCodeAt();
                                s += '\\u00' + Math.floor(c / 16).toString(16) +
                                        (c % 16).toString(16);
                        }
                    }
                }
                return s + '"';
            case 'boolean':
                return String(arg);
            default:
                return 'null';
        }
    },
    parse: function(text, ctors) {
        var at = 0;
        var ch = ' ';

        function error(m) {
            throw {
                name: 'JSONError',
                message: m,
                at: at - 1,
                text: text
            };
        }

        function next() {
            ch = text.charAt(at);
            at += 1;
            return ch;
        }

        function white() {
            while (ch != '' && ch <= ' ') {
                next();
            }
        }

        function str() {
            var i, s = '', t, u;

            if (ch == '"') {
                outer:          while (next()) {
                    if (ch == '"') {
                        next();
                        return s;
                    } else if (ch == '\\') {
                        switch (next()) {
                            case 'b':
                                s += '\b';
                                break;
                            case 'f':
                                s += '\f';
                                break;
                            case 'n':
                                s += '\n';
                                break;
                            case 'r':
                                s += '\r';
                                break;
                            case 't':
                                s += '\t';
                                break;
                            case 'u':
                                u = 0;
                                for (i = 0; i < 4; i += 1) {
                                    t = parseInt(next(), 16);
                                    if (!isFinite(t)) {
                                        break outer;
                                    }
                                    u = u * 16 + t;
                                }
                                s += String.fromCharCode(u);
                                break;
                            default:
                                s += ch;
                        }
                    } else {
                        s += ch;
                    }
                }
            }
            error("Bad string");
        }

        function arr() {
            var a = [];

            if (ch == '[') {
                next();
                white();
                if (ch == ']') {
                    next();
                    return a;
                }
                while (ch) {
                    a.push(val());
                    white();
                    if (ch == ']') {
                        next();
                        return a;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad array");
        }

        function obj() {
            var k, o = {};

            if (ch == '{') {
                next();
                white();
                if (ch == '}') {
                    next();
                    return o;
                }
                while (ch) {
                    k = str();
                    white();
                    if (ch != ':') {
                        break;
                    }
                    next();
                    o[k] = val();
                    white();
                    if (ch == '}') {
                        next();
                        return o;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad object");
        }

        function num() {
            var n = '', v;
            if (ch == '-') {
                n = '-';
                next();
            }
            while (ch >= '0' && ch <= '9') {
                n += ch;
                next();
            }
            if (ch == '.') {
                n += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    n += ch;
                }
            }
            if (ch == 'e' || ch == 'E') {
                n += 'e';
                next();
                if (ch == '-' || ch == '+') {
                    n += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    n += ch;
                    next();
                }
            }
            v = +n;
            if (!isFinite(v)) {
                error("Bad number");
            } else {
                return v;
            }
        }

        function word() {
            switch (ch) {
                case 't':
                    if (next() == 'r' && next() == 'u' && next() == 'e') {
                        next();
                        return true;
                    }
                    break;
                case 'f':
                    if (next() == 'a' && next() == 'l' && next() == 's' &&
                            next() == 'e') {
                        next();
                        return false;
                    }
                    break;
                case 'n':
                    if (next() == 'u' && next() == 'l' && next() == 'l') {
                        next();
                        return null;
                    }
                    break;
            }
            error("Syntax error");
        }

        function ctor() {
            var name = '';
            if (ch == '@') {
                next();
                while (ch == '.' || (ch.toUpperCase() >= 'A' &&
                        ch.toUpperCase() <= 'Z')) {
                    name += ch;
                    next();
                }
                var arg = val();
                if (name in ctors) {
                    return ctors[name](arg);
                } else {
                    error("Unknown ctor " + name);
                }
            }
            error("Bad ctor");
        }

        function val() {
            white();
            switch (ch) {
                case '@':
                    return ctor();
                case '{':
                    return obj();
                case '[':
                    return arr();
                case '"':
                    return str();
                case '-':
                    return num();
                default:
                    return ch >= '0' && ch <= '9' ? num() : word();
            }
        }

        return val();
    }
};

/********* binary heap def ********************/
function BinaryHeap(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function(element) {
        // Add the new element to the end of the array.
        this.content.push(element);

        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    },
    pop: function() {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    },
    remove: function(node) {
        var i = this.content.indexOf(node);

        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();

        if (i !== this.content.length - 1) {
            this.content[i] = end;

            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i);
            }
            else {
                this.bubbleUp(i);
            }
        }
    },
    size: function() {
        return this.content.length;
    },
    rescoreElement: function(node) {
        this.sinkDown(this.content.indexOf(node));
    },
    sinkDown: function(n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];

        // When at 0, an element can not sink any further.
        while (n > 0) {

            // Compute the parent element's index, and fetch it.
            var parentN = ((n + 1) >> 1) - 1,
                    parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }

            // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    },
    bubbleUp: function(n) {
        // Look up the target element and its score.
        var length = this.content.length,
                element = this.content[n],
                elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) << 1, child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            var swap = null;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N],
                        child1Score = this.scoreFunction(child1);

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore)
                    swap = child1N;
            }

            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N],
                        child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N;
                }
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }

            // Otherwise, we are done.
            else {
                break;
            }
        }
    }
};


/*********** binary heap def end **************/


var noteBtn;
var locIndex;
var ExploreResult;
var tempArray = new Array();
var starArray = new Array();
var fleetSelected = 0;
var fleetSelectedId = 0;
var fleetSelectedTemp = 0;
var tgtX = -1;
var tgtY = -1;
var tgtZ = -1;
var tgtId = -1;

window.vNoteBut = function(e) {

    console.log("Note Started");
    var noteWindow = document.getElementsByTagName("textarea")[0];
    console.log("Note: " + noteWindow.value);
    var noteVal = noteWindow.value;
    console.log("x:" + noteVal.split('\t')[0]);
    console.log("y:" + noteVal.split('\t')[1]);
    console.log("z:" + noteVal.split('\t')[2]);
    tgtX = parseInt(noteVal.split('\t')[0]);
    tgtY = parseInt(noteVal.split('\t')[1]);
    tgtZ = parseInt(noteVal.split('\t')[2]);
    var formIter = document.evaluate("//form[@name='form2']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var formNode = formIter.iterateNext();

    var localLocs, llSelect;
    if (formNode)
    {
        localLocs = document.evaluate("//select[@name='tworld2']", formNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

        llSelect = localLocs.iterateNext();
    } else {
        formNode = document; // suppress error messages due to bad code structuring
    }
    locIndex = 1;

    noteBtn = document.createElement("input");
    noteBtn.setAttribute("type", "button");
    noteBtn.setAttribute("value", "NOTE target");
    noteBtn.setAttribute("class", "warn");
    noteBtn.setAttribute("id", "noteSend");
    noteBtn.onclick = nextHopToTgt;

    llSelect.parentNode.appendChild(noteBtn);



    /*  new part for next system */

    function nextHopToTgt() {

        noteBtn.onclick = null;
        noteBtn.setAttribute('name', 'Processing');
        noteBtn.setAttribute('value', 'Processing');
        noteBtn.style.backgroundColor = '#0000FF';
 
        
        
        var curCoord = document.evaluate("//td[(child::text() = 'Fleet Coordinates:')]/following-sibling::node()/a[contains(text(),'global')]", formNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        var cNode = curCoord.iterateNext();

//console.log ("starting exploreNext");
        var strng = cNode.toString();
        console.log(strng);
        console.log("x:" + strng.split('&')[1].split('=')[1]);
        console.log("y:" + strng.split('&')[2].split('=')[1]);
        console.log("z:" + (strng.split('&')[3].split('=')[1].split('\'')[0] - 500));

//FLEET CENTER

        var mapCenterX = strng.split('&')[1].split('=')[1];
        var mapCenterY = strng.split('&')[2].split('=')[1];
        var mapCenterZ = strng.split('&')[3].split('=')[1].split('\'')[0] - 500;


//ALPHA CENTER 18321, 11528, 4522
        /* var mapCenterX = 18321;
         var mapCenterY = 11528;
         var mapCenterZ = 4522; */


        var mapSize = 70000;
        fleetSelected = parseInt(strng.split('?')[1].split('=')[1]);
        fleetSelectedId = fleetSelected;
        console.log("fleet:" + fleetSelected);

        loadContent("/ajax/jsmap_postload_v2.php?centerX=" + mapCenterX + "&centerY=" + mapCenterY + "&centerZ=" + mapCenterZ + "&displayRange=" + mapSize, noteNextLoaded);

    }
    function noteNextLoaded(starList)

    {

        if ((tgtX == -1) || (tgtY == -1) || (tgtZ == -1))
        {
            alert("wrong note coords");
            return;
        }
        console.log("In");

        for (var kk in starList)
            console.log(kk);
//console.log(starList.responseText);
        //console.log("responded: "+starList);
        var posTemp;
        var missTemp;
        var mColor;

        tempArray.length = 0;

        var fleetSelectedI = 0;

        var stars = starList.responseText.split("\n");
        for (var i in stars)
        {
            var starData = stars[i].split("\t");
            if (starData[2])
            {
                // Yes, I know this sucks. The format was meant for a lot less data, so I had to fill the gaps to keep it lean without rewriting everything. :(
                // 0: ID (stars positive, everything else negative)
                // 1: Star type (>0) or char defining type
                // 2: Icon size (star magnitude)
                // 3: X (for world and fleets: transmitted as xyz combined with \f)
                // 4: Y (for fleets transmitted: position, for worlds transmitted: real local coords)
                // 5: Z (for fleets transmitted: mission local coords)
                // 6: Item Name
                // 7: # planets / habitability / mission x (transmitted x/y/z/objective with \f) / wormhole position
                // 8: owned colonies in system / world: colony IDs seperated by \f / mission y (transmitted: fleet mission target) / bookmark system ID if on top of system
                // 9: sun_age / world: colony names seperated by \f / mission z (for local fleets and wormholes transmitted: real local coords \f)
                // 10: is named / fleet scanner range (positive) / foreign fleets relation (negative)
                // 11: fleet travel range (positive) / foreign fleet numbers (negative) / world system ID ! STAR,BOOKMARK UNUSED
                // 12: World: ID of owned colony / fleet max travel range / foreign fleet tonnate (negative) / Empire bookmark type / ! STAR UNUSED
                // 13: mark for buffered display element
                // 14: mark for label set on display element
                // 15 (transmitted as 13): world class / fleet owner name / Empire rally relation / Star raw temp (transmitted as 1)
                // 16 (transmitted as 14): world image link / fleet owner ID / Empire rally comments / Star raw size (transmitted as 2)
                // 17: mark for "in range" when a fleet is selected.
                // 18: Fleets: position (transmitted as 4) / Worlds and wormholes: real local coords (transmitted as 4 and 9)
                // 19: Fleets: mission target (transmitted as 8)
                // 20: Fleets: local coords separated by \f (transmitted as 9)
                // 21: Controlled Fleets: mission local coords  separated by \f (transmitted as 5)
                // 22: Controlled Fleets: Mission color
                // 23: Controlled Fleets: Mission Objective
                // 24: Controlled Fleets: Speed (transmitted as 15)
                // 25: Fleet world/colony ID if applicable: Speed (transmitted as 16)

                if (parseInt(starData[0]) > 0)
                        // Modify sizes for stars
                        {
                            if ((parseInt(starData[3]) == tgtX) &&
                                    (parseInt(starData[4]) == tgtY) &&
                                    (parseInt(starData[5]) == tgtZ))
                                tgtId = tempArray.length;

                            tempArray.push([parseInt(starData[0]), Math.floor(parseInt(starData[1]) / 1000), Math.round(Math.pow(parseInt(starData[2]), 0.1) * 50),
                                parseInt(starData[3]), parseInt(starData[4]), parseInt(starData[5]), starData[6], parseInt(starData[7]), parseInt(starData[8]), parseInt(starData[9]),
                                parseInt(starData[10]), 0, 0, 0, 0, starData[1], starData[2], 0]);
                        }
                else if (starData[1] == "p") {
                    // Planets (seperate sizes, too)
                    posTemp = starData[3].split("\f");
                    tempArray.push([parseInt(starData[0]), starData[1], Math.round(Math.pow(parseInt(starData[2]), 0.1) * 15),
                        parseInt(posTemp[0]), parseInt(posTemp[1]), parseInt(posTemp[2]), starData[6], parseInt(starData[7]), starData[8].split('\f'), starData[9].split('\f'),
                        parseInt(starData[10]), parseInt(starData[11]), parseInt(starData[12]), 0, 0, starData[13], starData[14], 0, starData[4]]);

                } else if (starData[1] == "f") {
                    // Fleet marked?

                    if (fleetSelected == (-1 * starData[0]))
                        fleetSelectedI = tempArray.length;

                    // Fleets just need way more data, so some fields are subsplit with /f
                    posTemp = starData[3].split("\f");
                    missTemp = starData[7].split("\f");

                    // Get mission color index for controlled fleet
                    if (missTemp[3]) {
                        // 'transfer','explore','assault','conquer','transport','reinforce','colonize','support','jump'
                        if (missTemp[3] == 'transfer' || missTemp[3] == 'jump')
                            mColor = "#999999";
                        else if (missTemp[3] == 'transport' || missTemp[3] == 'colonize' || missTemp[3] == 'explore')
                            mColor = "#00cc00";
                        else if (missTemp[3] == 'reinforce')
                            mColor = "#ff8800";
                        else if (missTemp[3] == 'assault' || missTemp[3] == 'conquer' || missTemp[3] == 'support')
                            mColor = "#990000";
                    } else if (missTemp[0] || missTemp[1] || missTemp[2]) {
                        // Mission color (by relation) for other fleets
                        if (starData[10] <= -10)
                            mColor = "#000066";
                        else if (starData[10] <= -6)
                            mColor = "#666666";
                        else
                            mColor = "#ff2200";
                    }
                    tempArray.push([parseInt(starData[0]), starData[1], parseInt(starData[2]), parseInt(posTemp[0]), parseInt(posTemp[1]), parseInt(posTemp[2]),
                        starData[6], parseInt(missTemp[0]), parseInt(missTemp[1]), parseInt(missTemp[2]), parseInt(starData[10]), parseInt(starData[11]), parseFloat(starData[12]),
                        0, 0, starData[13], starData[14], 0, starData[4], starData[8], starData[9], starData[5], mColor, missTemp[3], parseFloat(starData[15]), parseFloat(starData[16])]);


                } else if (starData[1] == "qc" || starData[1] == "qf") {
                    // Quicklinks
                    /*
                     qlItem = document.createElement('div');
                     qlItem.innerHTML = starData[2];
                     if (parseInt(starData[6]) == 2) qlItem.className = 'inCombat';
                     else if (parseInt(starData[6]) == 1) qlItem.className = 'onMission';
                     else qlItem.className = 'normal';
                     qlItem.oncontextmenu = function(e) { if (!e) var e = window.event; return cancelEvent(e);};
                     qlItem.onselectstart = function(e) { if (!e) var e = window.event; return cancelEvent(e);};
                     (function() {
                     var x = parseInt(starData[3]);
                     var y = parseInt(starData[4]);
                     var z = parseInt(starData[5]);
                     qlItem.onclick = function() {
                     goTo(x, y, z);
                     }
                     })();
                     if (starData[1] == "qc") quickLinksCol.appendChild(qlItem);
                     else quickLinksFleet.appendChild(qlItem);
                     */
                }
                else
                    tempArray.push([parseInt(starData[0]), starData[1], parseInt(starData[2]), parseInt(starData[3]), parseInt(starData[4]), parseInt(starData[5]), starData[6],
                        starData[7], parseInt(starData[8]), 0, 0, 0, starData[12], 0, 0, starData[13], starData[14], 0, starData[9]]);
            }
        }

        // Fleet was selected, select it "again".
        //find correct ID
        console.log("fleetSelectedI: " + fleetSelectedI);
        console.log("targetId: " + tgtId);

        if (tgtId == -1)
        {
            alert("not on map");
            return;
        }
        fleetSelected = fleetSelectedI;
        fleetSelectedTemp = fleetSelectedI;

        console.log("fleetSelected: " + fleetSelected);
        console.log(tempArray[fleetSelected][0]);
        //eliminate already incoming fleets

        console.log("fleetSelected: " + fleetSelected);
        console.log(tempArray[fleetSelected][0]);

        //entityClicked(fleetSelectedI, "0");
        console.log("fleetSelected: " + fleetSelected);
        console.log(tempArray[fleetSelectedTemp][0]);

        var tRange = getDistanceTemp(fleetSelectedTemp, tgtId);

        if (tRange < (tempArray[fleetSelectedTemp][11]-250))
        {
            alert("close enough to send yourself");
            return;
        }

        //var recuJump = experimentalNext(fleetSelectedTemp, 0);
        //var atest = experimentalNext(fleetSelectedTemp, 0);//AalgTest(fleetSelectedTemp);
        var algt = AalgTest(fleetSelectedTemp);
        //console.log("jump mid recu: " + atest + ";" + atest[0]);
        console.log("jump mid aalg: " + algt + ";" + algt[0]);
        tempArray.length = 0;
        starData.length = 0;
        stars.length = 0;

 
        var test = fleetLinkGlobal("launch=1&mtype=transfer&fleet=" + fleetSelectedId + "&tworld=" + algt[0]);

        noteBtn.onclick = null;
        noteBtn.setAttribute('name', 'sent mid');
        noteBtn.setAttribute('value', 'sent mid');
        noteBtn.style.backgroundColor = '#ffff00';
       noteBtn.style.color = "#000000";
        //noteBtn.onclick = openNextExplorer;

        tempArray.length = 0;
        tempArray = [];

    }

    function Anode(index) {
        this.g = 0.0;
        this.h = 0.0;
        this.f = 0.0;
        this.ind = index;
        this.visited = false;
        this.closed = false;
        this.parent = null;

    }

    function UnexpNode(index, dist) {
        this.index = index;
        this.distance = dist;
    }

    function unexHeap() {
        return new BinaryHeap(function(uNode) {
            return uNode.distance;
        });
    }

    function heap() {
        return new BinaryHeap(function(node) {
            return node.f;
        });
    }

    function AalgTest(i) {
        var UnexHeap = unexHeap();

        var tDist = getDistanceTemp(i, tgtId);
        //console.log(tempArray[z]+" : " +tDist);
        UnexHeap.push(new UnexpNode(tgtId, tDist));

        console.log("done with uni");

        //console.log("Unexplored: "+UnexStars.push(z));
        while (UnexHeap.size() > 0)
        {
            var unex = UnexHeap.pop().index;

            var grid = [];
            for (var z in tempArray)
            {
                if (tempArray[z][1] == "p")
                {
                    if (tempArray[z][6].indexOf("#0") == -1)
                        continue;
                    grid.push(new Anode(z));
                }
            }
            //initAlgTest (grid);
            console.log("NEW UNEX: " + unex);

            //A* alghoritm
            var node_start = new Anode(i);
            var node_goal = new Anode(unex);
            //console.log(node_start.ind);

            var openHeap = heap();
            openHeap.push(node_start);
            //console.log(OpenList[0].ind + " " + i);

            while (openHeap.size() > 0)
            {
                //get lowest f(x) to proces

                var currentNode = openHeap.pop();

                if ((getDistanceTemp(currentNode.ind, node_goal.ind) < (tempArray[fleetSelectedTemp][11]-250)))
                {
                    var curr = currentNode;
                    ret = [];
                    nam = [];
                    while (curr.parent) {
                        ret.push((-1 * tempArray[curr.ind][0]));
                        nam.push(tempArray[curr.ind][6]);
                        curr = curr.parent;
                    }
                    nam.reverse();
                    var alerter = ""+nam[0];
                    for (var xx = 1; xx < nam.length; xx++)
                        {
                        alerter += "\n -> " + nam[xx];
                        }
                    alerter += "\nTotal Jumps: "+nam.length;
                    alert (alerter);
                        
                    return (ret.reverse());
                }

                //normal case - remove current node from open to closed
                currentNode.closed = true;
                //console.log("closed: " +currentNode.ind);

                var neighbors = getNeighbors(currentNode.ind, grid);

                for (var k = 0; k < neighbors.length; k++)
                {
                    var neighbor = neighbors[k];

                    if (neighbor.closed == true)
                        continue;

                    var gScore = currentNode.g + 1;
                    var beenVisited = neighbor.visited;

                    if (!beenVisited || gScore < neighbor.g)
                    {
                        neighbor.visited = true;
                        neighbor.parent = currentNode;
                        neighbor.h = neighbor.h || getDistanceTemp(neighbor.ind, node_goal.ind);
                        neighbor.g = gScore;
                        neighbor.f = neighbor.g + neighbor.h;


                        if (!beenVisited) {
                            // Pushing to heap will put it in proper place based on the 'f' value.
                            openHeap.push(neighbor);
                        }
                        else {
                            // Already seen the node, but since it has been rescored we need to reorder it in the heap
                            openHeap.rescoreElement(neighbor);
                        }
                    }

                }

            }


        }
        var rtrn = [];
        rtrn.push(-1);
        console.log("FINISH NOT FOUND");
        return rtrn;
    }

    function getNeighbors(i, grid) {
        //console.log(i);
        var returner = [];

        for (var z = 0; z < grid.length; z++)
        {

            if ((getDistanceTemp(grid[z].ind, i) < tempArray[fleetSelectedTemp][11]))
            {
                returner.push(grid[z]);
            }

        }
        return returner;
    }

    function getDistanceTemp(i, z) {
        // $duration = ceil($distance / (1 + $fleetstats['speed'] * 3600 / 1000) + 1);
        var distance = 0;
        var lCoords2;
        var gCoords2;
        var exitAdd2;

        if (!tempArray[z][0])
            return 0;

        // Coord extraction
        if ((tempArray[i][1] == 'p' || tempArray[i][18] != 'g')) {
            if (tempArray[i][1] == 'p')
                var lCoords = tempArray[i][18].split('\f');
            else
                var lCoords = tempArray[i][20].split('\f');
            // Distance to system exit
            var exitAdd = (Math.sqrt(Math.pow(lCoords[0] - 100, 2) + Math.pow(lCoords[1] - 100, 2) + Math.pow(lCoords[2] - 100, 2)));
            // Backtrack system global coords from local and map coords
            var gCoords = [(tempArray[i][3] - lCoords[0] * 10), (tempArray[i][4] - lCoords[1] * 10), (tempArray[i][5] - lCoords[2] * 10)];
        }
        else {
            var exitAdd = 0;
            var gCoords = [tempArray[i][3], tempArray[i][4], tempArray[i][5]];
        }

        // Global position
        if (tempArray[z][0] > 0 || tempArray[z][1] == 'e' || tempArray[z][1] == 'r' ||
                (tempArray[z][1] == 'f' && tempArray[z][18] == 'g') || (tempArray[z][1] == 'w' && tempArray[z][7] == 'g'))
            distance = exitAdd + (Math.sqrt(Math.pow(gCoords[0] - tempArray[z][3], 2) + Math.pow(gCoords[1] - tempArray[z][4], 2) + Math.pow(gCoords[2] - tempArray[z][5], 2)));
        else if (tempArray[z][1] != 'qc' && tempArray[z][1] != 'qf') {
            // local position
            if (tempArray[z][1] == 'f') {
                lCoords2 = tempArray[z][20].split('\f');
                gCoords2 = [(tempArray[z][3] - lCoords2[0] * 10), (tempArray[z][4] - lCoords2[1] * 10), (tempArray[z][5] - lCoords2[2] * 10)];
            }
            else if (tempArray[z][1] == 'p' || tempArray[z][1] == 'w') {
                lCoords2 = tempArray[z][18].split('\f');
                gCoords2 = [(tempArray[z][3] - lCoords2[0] * 10), (tempArray[z][4] - lCoords2[1] * 10), (tempArray[z][5] - lCoords2[2] * 10)];
            }
            // Rally points cannot be local!
            //
            // Both local with same global coords = same system
            if (gCoords[0] == gCoords2[0] && gCoords[1] == gCoords2[1] && gCoords[2] == gCoords2[2] && (tempArray[i][1] == 'p' || tempArray[i][18] != 'g'))
                distance = (Math.sqrt(Math.pow(lCoords[0] - lCoords2[0], 2) + Math.pow(lCoords[1] - lCoords2[1], 2) + Math.pow(lCoords2[2] - lCoords[2], 2)));
            else {
                exitAdd2 = Math.sqrt(Math.pow(lCoords2[0] - 100, 2) + Math.pow(lCoords2[1] - 100, 2) + Math.pow(lCoords2[2] - 100, 2));
                distance = exitAdd2 + exitAdd + (Math.sqrt(Math.pow(gCoords[0] - gCoords2[0], 2) + Math.pow(gCoords[1] - gCoords2[1], 2) + Math.pow(gCoords[2] - gCoords2[2], 2)));
            }
        }
        return distance;
    }

    function fleetConfigure(string) {
        loadContent('/ajax/fleet.php', fleetConfigureResults, string, "POST");
    }
    fleetLinkGlobal = fleetConfigure;


    function fleetConfigureResults(result) {
        console.log(result.responseText);
        console.log(result.responseXML);
        console.log(result.statusText);
        var status = result.statusText;
        if (!status)
            alert("Communication error. Please try again later.");
        else if (status != "OK")
            alert(status);
        else if (result.responseText == "No such Planet.")
            alert(result.responseText);
        else {
            //loadMapView();
            console.log("success");
        }

    }

    function loadContent(urlIn, returnFunc)
    {
        GM_xmlhttpRequest({
            method: "GET",
            url: urlIn,
            onload: returnFunc,
            synchronous: true
        });
    }

    //loadContent ('/ajax/fleet.php', fleetConfigureResults, string, "POST");
    function loadContent(urlIn, returnFunc, paramsIn, methodIn)
    {
        var newUrl = urlIn;
        if (paramsIn)
            newUrl += "?" + paramsIn;

        GM_xmlhttpRequest({
            method: methodIn,
            url: newUrl,
            onload: returnFunc,
            data: paramsIn
        });
    }

};






if (window.location.href.indexOf('/fleet_navigation') != -1) {
    window.addEventListener("load", window.vNoteBut, false);
}