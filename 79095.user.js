// ==UserScript==
// @name           Tabloid filter
// @namespace      http://code.kjonigsen.net/
// @include        http://www.dagbladet.no/
// @include        http://www.vg.no/
// @include        http://www.aftenposten.no/
// @include        http://www.adressa.no/
// ==/UserScript==

var startTime = new Date().getTime();

/* filters */
var elementTypes = ["a", "p", "h1", "h2", "h3"];
var filters = ["juletriks", "Obama", "Twitter", "Facebook", "al-Qaida", "Vancouver", "\\bOL(-?)\\b", "Northug"];
var blockedUrls = ["/sport/", "/ol/", "http://ol."];

/* glow settings */
var opacity = 0.15; // 1 = 100%
var delay = 50;     // ms
var steps = 0.2; // opacity steps per interval

/* working variables */
var elements = new Array();
var debug = "";

/* setup code */

var blockedUrlRxs = new Array();
for (var e = 0; e < blockedUrls.length; e++) {
    blockedUrlRxs[e] = new RegExp(blockedUrls[e]);
}

var filterRxs = new Array();
for (var e = 0; e < filters.length; e++) {
    filterRxs[e] = new RegExp(filters[e], "mi");
}

/* identify nodes */

foreach(elementTypes, function(elementType) {
    var elementNodes = document.getElementsByTagName(elementType);
    processElements(elementNodes);
});

var links = document.getElementsByTagName("a");
processLinks(links);

/*  process nodes */

var numNodes = elements.length;
detectNodeDepth();
elements.sort(depthFirstSort);
var maxDepth = elements[0].getAttribute("TF_treedepth");
var numEliminated = eliminateChildren();

/* hide nodes */

foreach(elements, function(node) {
    setGlow(node);
});


var endTime = new Date().getTime();
var time = endTime - startTime;
basicDiagnostics();
//outputDebugInfo();

/* done */



/* identification functions */

function processFilter(dataNodes, filterNodes, propertyExtractor) {
    foreach(dataNodes, function(dataNode) {
        var match = false;
        var property = propertyExtractor(dataNode);

        foreach(filterNodes, function(filterNode) {
            match = match || property.match(filterNode) != null;
        });

        if (match != false) {
            debug += property + "\r\n";
            registerElement(dataNode);
        }
    });
}

function processElements(nodes) {
    processFilter(nodes, filterRxs, function(node) { return node.textContent; });
}

function processLinks(nodes) {
    processFilter(nodes, blockedUrlRxs, function(node) { return node.href; });
}

function registerElement(element) {
    // ignore hidden elements
    if (element.style.display != "none") {
        if (element.nodeName != "DIV" && element.nodeName != "UL") {
            var parent = element.parentNode;

            if (parent != NaN) {
                registerElement(parent);
            }
        }
        else {
            // dont add dupes
            if (false == isRegistered(element)) {
                elements[elements.length] = element;
            }
        }
    }
}

function isRegistered(node) {
    for (var i = 0; i < elements.length; i++) {
        var arrayNode = elements[i];
        if (arrayNode == node) {
            return true;
        }
    }

    return false;
}

/* fading/glowing functions */

function setGlow(element) {
    // possible null values from child-elimination
    if (element != null) {
        element.style.MozOpacity = opacity;
        element.addEventListener("mouseover", glowIn, false);
        element.addEventListener("mouseout", glowOut, false);
    }
}

function glowIn(e) {
    doGlowGlide(e, 1);
}

function glowOut(e) {
    doGlowGlide(e, opacity);
}

function doGlowGlide(e, target) {
    var element = e.currentTarget;
    var current = parseFloat(element.style.MozOpacity);
    element.setAttribute("TF_opacity", target);

    registerTimeout(element, current);
}

function registerTimeout(e, current) {
    window.setTimeout(function() { doProcess(e, current); }, delay);
}

function doProcess(e, current) {
    var target = parseFloat(e.getAttribute("TF_opacity"));
    var newValue = target;

    if (current > target) {
        newValue = current - steps;
        newValue = newValue < target ? target : newValue;
    }
    else if (current < target) {
        newValue = current + steps;
        newValue = newValue > target ? target : newValue;
    }

    e.style.MozOpacity = newValue;

    if (newValue != target) {
        registerTimeout(e, newValue);
    }
}

/* node cleanup */

function detectNodeDepth() {
    foreach(elements, function(node) {
        var depth = 0;
        var parentNode = node;

        while (parentNode != null) {
            parentNode = parentNode.parentNode;
            depth++;
        }

        node.setAttribute("TF_treeDepth", depth);
    });
}

function depthFirstSort(an, bn) {
    var a = an.getAttribute("TF_treeDepth");
    var b = bn.getAttribute("TF_treeDepth");
    return b - a;
}

function eliminateChildren() {
    var eliminated = 0;
    var seekDepth = 2;

    for (var i = 0; i < elements.length; i++) {
        var node = elements[i];

        var hasParent = isParentInList(node, seekDepth)
        if (hasParent) {
            elements[i] = null;
            eliminated++;
        }
    }

    return eliminated; // for diagnostic/debugging info
}

function isParentInList(node, seekDepth) { // two levels of recursion
    var parentNode = node.parentNode;

    for (var i = 0; i < elements.length; i++) {
        var otherNode = elements[i];

        if (otherNode == parentNode) {
            return true;
        }
    }

    seekDepth--;
    if (seekDepth != 0) {
        return isParentInList(parentNode, seekDepth);
    }

    return false;
}

/* diagnostic/debugging output */

function basicDiagnostics() {
    var diagnostics = "DIAGNOSTICS:\r\nElements detected: " + numNodes + ", Elements Eliminated: " + numEliminated + ", Runtime: " + time;

    var diagElement = document.createElement("div");
    diagElement.style.display = "none";
    diagElement.style.zindex = "1000";
    diagElement.style.backgroundColor = "white";

    var preElement = document.createElement("pre");
    var diagContent = document.createTextNode(diagnostics);
    preElement.appendChild(diagContent);
    diagElement.appendChild(preElement);
    document.getElementsByTagName("body")[0].appendChild(diagElement);
}

function outputDebugInfo() {
    var debugElement = document.createElement("div");
    debugElement.style.display = "none";
    debugElement.style.zindex = "1000";
    debugElement.style.backgroundColor = "white";

    var preElement = document.createElement("pre");
    var debugContent = document.createTextNode("DEBUG:\r\n" + debug);
    preElement.appendChild(debugContent);
    debugElement.appendChild(preElement);
    document.getElementsByTagName("body")[0].appendChild(debugElement);
}

function foreach(nodes, fn) {
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        fn(node);
    }
}