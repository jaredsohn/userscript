// ==UserScript==
// @name           GameFly Queue Sorter
// @namespace      http://userscripts.org/users/gardenninja
// @description    GameFly Queue Sorter
// @include        http://www.gamefly.com/Queue/Default*
// ==/UserScript==

function GameFlyQueueSorter() {
    
    function ItemInfo(tr) {
	var tdOrder = tr.cells[0];
	var txtOrder = tdOrder.getElementsByClassName("q-sequence")[0];

	var tdAvail = tr.cells[4];
	var avail = tdAvail.className.replace("availability ", "");

	this.get_order = function() {
	    return parseInt(txtOrder.value);
	}

	this.set_order = function(i) {
	    txtOrder.value = i;
	}

	this.get_availability_name = function() {
	    return avail;
	}

	this.get_availability = function() {
	    switch(this.get_availability_name()) {
	    case "Future":
	    return 0;
	    break;

	    case "VeryLow":
	    return 1;
	    break;

	    case "Low":
	    return 2;
	    break;

	    case "Medium":
	    return 3;
	    break;

	    case "High":
	    return 4;
	    break;

	    case "VeryHigh":
	    return 5;
	    break;

	    case "Now":
	    return 6;
	    break;
	    }
	}
    }

    function qToArray(q) {
	var arr = [];

	for (var i = 0; 
	     i < q.tBodies[0].rows.length; 
	     i++) {
	    var tr = q.tBodies[0].rows[i];

	    arr.push( new ItemInfo( tr ) );
	}
	return arr;
    }
    // Sort Functions
    function sortQ(q, compfn) {
	var items = qToArray(q);

	items.sort(compfn);

	for(var i = 0; i < items.length; i++) {
	    var item = items[i];

	    item.set_order( i + 1 );
	}
    }

    function makeSorter(q, compfn) {
	return function() {
	    sortQ(q, compfn);
	}
    }

    function makeComparator(property) {
	function getterfn(a) {
	    return a["get_" + property]();
	}

	return function(a, b) {
	    var x = getterfn(a);
	    var y = getterfn(b);

	    if (x < y) return -1;
	    if (x == y) return 0;
	    return 1;
	}
    }

    function compareRandom(a,b) {
	var x = Math.random() * 1000;
	var y = Math.random() * 1000;

	if (x < y) return -1;
	if (x == y) return 0;
	return 1;
    }

    function inverseComparator(compfn) {
	return function(a,b) {
	    return compfn(b,a);
	}
    }

    var compareAvail = makeComparator('availability');	
	

    // GUI - Helpers
    function makeId(id) {
	return "gfqs_" + id;
    }
    function element(nodeName, attributes) {
	var el = document.createElement(nodeName);

	return el;
    }
    function textNode(text) {
	return document.createTextNode(text);
    }

    function fieldset(legendText) {
	var fs = element("fieldset");
	var l = element("legend");
	var t = textNode(legendText);

	l.appendChild(t);
	fs.appendChild(l);
	return fs;
    }
    function label(labelText, assoc) {
	var l = element("label");
	var t = textNode(labelText);

	l.appendChild(t);

	l.htmlFor = assoc.id;

	return l;
    }
    function textbox(id) {
	var t = element("input");
	t.type = "text";

	t.id = makeId(id);
	return t;
    }
    function button(buttonText, onclickfn) {
	var b = element("button");
	b.type = "button";

	var t = textNode(buttonText);

	b.appendChild(t);

	b.addEventListener("click"
			   , function() {
			       onclickfn(b);
			   }
			   , false);

	return b;
    }
    // GUI - Main
    function buildGUI() {
	var q = document.getElementById("theGameQueue");
	
	var fs = fieldset("Sorting Options");

	q.parentNode.insertBefore(fs, q);

	//var tTolerance = textbox();
	//var lTolerance = label("Release Date Tolerance:", tTolerance);

	var bAvailAsc = button("Availability - Low to High"
			       , makeSorter(q
					    , makeComparator('availability')
					    )
			       );
	var bAvailDesc = button("Availability - High to Low"
				, makeSorter(q
					     ,inverseComparator(makeComparator('availability'))
					     )
				);

	var bRandom = button("Randomize"
			     , makeSorter(q, compareRandom)
			     );

	//fs.appendChild(lTolerance);
	//fs.appendChild(tTolerance);
	fs.appendChild(bAvailAsc);
	fs.appendChild(bAvailDesc);
	fs.appendChild(bRandom);
    }

    this.run = function()
    {
	// Only run for the main window
	if (window != window.top) return;

	buildGUI();
    }
}

new GameFlyQueueSorter().run()
