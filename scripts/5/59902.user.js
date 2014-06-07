// ==UserScript==
// @name           Group LAPL Holds by status
// @namespace      tag:gmail.com,2009-10-15:laplcatalog
// @description    Group LAPL Holds by status
// @include        http://catalog.lapl.org/carlweb/jsp/pipholds.jsp
// @require        http://catalog.lapl.org/carlweb-files/yui/build/yahoo-dom-event/yahoo-dom-event.js
// @require        http://catalog.lapl.org/carlweb-files/yui/build/json/json-min.js
// @require        http://catalog.lapl.org/carlweb-files/yui/build/connection/connection-min.js
// @require	   http://catalog.lapl.org/carlweb-files/yui/build/treeview/treeview-min.js
// ==/UserScript==

String.prototype.trim = function () {
    var	str = this.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
}

var STATUS_READY_FOR_PICKUP = 0;
var STATUS_IN_TRANSIT = 1;
var STATUS_PENDING = 2;

var holdStatuses = {
    "ready for pickup": STATUS_READY_FOR_PICKUP,
    "intransit -  sent ->": STATUS_IN_TRANSIT,
    "request pending": STATUS_PENDING
};

function sortItems(items) {
    //Sort the items by holdStatus type and then date and then title
    items.sort(function(n,m) {
	var nStatus = holdStatuses[n["status"].trim().toLowerCase()];
	var mStatus = holdStatuses[m["status"].trim().toLowerCase()];
	if (nStatus != mStatus)
	    return (nStatus < mStatus ? -1 : 1);

	if (nStatus == STATUS_READY_FOR_PICKUP) {
	    var nDate = new Date(n["holdPickupDate"]);
	    var mDate = new Date(m["holdPickupDate"]);
	    if (nDate < mDate)
		return -1;
	    if (nDate > mDate)
		return 1;
	    
	    if (n["title"] < m["title"])
		return -1;
	    if (n["title"] > m["title"])
		return 1;
	    return 0;
	}

	if (nStatus == STATUS_PENDING) {
	    var availabilityN = parseFloat(n["queuePosition"]) /
		parseFloat(n["available"]);
	    var availabilityM = parseFloat(m["queuePosition"]) /
		parseFloat(m["available"]);
	    if (availabilityN < availabilityM)
		return -1;
	    if (availabilityN > availabilityM)
		return 1;
	}
	if (n["title"] < m["title"])
	    return -1;
	if (n["title"] > m["title"])
	    return 1;
	return 0;
    });
}

function categorizeItems(items) {
    var categorizedItems = [];
    var prevStatus = -1;
    var currentCategory;
    var currentDate;
    var prevPickupDate = -1;
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    //Group the items by hold status
    for (i = 0; i < items.length; i++) {
	var currentItem = items[i];
	var curStatus = holdStatuses[currentItem["status"].trim().toLowerCase()];
	currentItem["statusInt"] = curStatus;

	if (curStatus != prevStatus) {
	    currentCategory = new Object();
	    currentCategory.status = curStatus;
	    currentCategory.items = [];
	    prevStatus = curStatus;

	    categorizedItems.push(currentCategory);
	    prevPickupDate = -1;
	}

	switch (curStatus) {
	case STATUS_READY_FOR_PICKUP:
	    var pickupDate = new Date(currentItem["holdPickupDate"]);
            if (pickupDate.getFullYear() < 1970) 
                pickupDate.setFullYear(pickupDate.getFullYear()+100)

	    if (pickupDate.valueOf() != prevPickupDate.valueOf()) {
		var milliseconds = pickupDate.getTime() - today.getTime();
		var days = parseInt((milliseconds / 1000 / 60 / 60 / 24).toFixed(0));
		var dayStr = " days left, ";
		if (days == 1)
		    dayStr = " day left, ";

		var dateStr = daysOfWeek[pickupDate.getDay()] + " " + 
		    (pickupDate.getMonth()+1).toString() + "/" +
		    pickupDate.getDate() + "/" + 
		    pickupDate.getFullYear();

		dateStr = days.toString() + dayStr + dateStr;

		currentDate = new Object();
		currentDate.pickupDate = pickupDate;
		currentDate.dateStr = dateStr;
		currentDate.items = [];
		currentCategory.items.push(currentDate);

		prevPickupDate = pickupDate;
	    }
	    currentDate.items.push(currentItem);
	    break;

	case STATUS_IN_TRANSIT:
	case STATUS_PENDING: // Pending
	    currentCategory.items.push(currentItem);
	    break;
	}
    }

    return categorizedItems;
}

unsafeWindow.PIP.HOLD.summaryFields = [
    'checkbox',
    'title',
    'author',
    'holdPickupBranch',
    'queuePosition',
    'available'
];

// Callback to handle checkboxes
function onClick(oArgs) {
    var node = oArgs.node; 
    var target = YAHOO.util.Event.getTarget(oArgs.event);    
    if ( target.type == 'checkbox' ) {
        if ( target.name == 'item' ) {
            // Copy checkbox state to data record
            node.data.rec['checked'] = target.checked;
            // Update select-all checkbox(es)
            if ( target.checked ) {
                unsafeWindow.PIP.adjustallselect();
            } else {
                unsafeWindow.PIP.clearallselect();
            }
            // Don't propagate event
            return false;
        } else if ( target.name == 'allselect' ) {
            return false;
        }
    }
    
//    if ( target.name == 'collapse') {
//        node.tree.collapseAll();
//    } else if ( target.name == 'expand') {
//        node.tree.expandAll();
//    }
//        
//    // Clear focus
//    node.tree.focusChanged( node, null );
}

function displayItems(items, pageModule, labels, root) {
    // add remaining summary nodes
    for (var i=0; i<items.length; i++) {
        var rec = items[i];
        rec['recIndex'] = i;
        var data = {
            rec:   rec,
            label: unsafeWindow.PIP.fmtSummaryLabelHtml(pageModule, 
							pageModule.summaryFields, 
							labels, rec)
        };
        var tempNode = new YAHOO.widget.TextNode( data, root, false );

        // Add detail node below summary node
        unsafeWindow.PIP.addDetailNode( tempNode, pageModule, labels, null );
    }
}

function formatHeading(heading) {
    var s = '<div class="pip_compact"><table><tr>';
    s += '<td style="font-weight:bold; vertical-align:bottom; height:3em;">';
    s = s + '<div>' + heading + '</div></td>';
    s += '</tr></table></div>';

    var obj = new Object();
    obj.label = s;
    obj.expanded = true;
    obj.enableHighlight = false;
    return obj;
}

function buildTree(rootString, 
		   targetDivID, 
		   pageModule, 
		   categories, 
		   labels) {

    //create a new tree:
    var tree = new YAHOO.widget.TreeView(targetDivID);
    var root = tree.getRoot();

    // first child node - collapse and expand link
    var data0 = {
        label: "<div class='pip_compact'><span class='pip_colheads'><a href='#' name='collapse'>"
            + labels['collapse'] + "</a> | <a href='#' name='expand'>"
            + labels['expand'] +"</a></span></div>",
        enableHighlight:false
    };
    //var tempNode0 = new YAHOO.widget.TextNode( data0, root, false );

    // column heads only        
    var data1 = {
        label: unsafeWindow.PIP.fmtColumnHeads( pageModule, labels ),
        enableHighlight:false
    };
    var tempNode1 = new YAHOO.widget.TextNode( data1, root, false );

    // add each hold category
    var currentReadyDate = ""
    for (var i = 0; i < categories.length; i++) {
	var category = categories[i];

	if (category.status == STATUS_READY_FOR_PICKUP) {
	    for (j=0; j<category.items.length; j++) {
		var currentDate = category.items[j];
		var itemsStr = " items Ready For Pickup:";
		if (currentDate.items.length == 1)
		    itemsStr = " item Ready For Pickup:";
		var heading = currentDate.dateStr + ", " + 
		    currentDate.items.length + itemsStr;
		heading = formatHeading(heading);
		var headingNode = new YAHOO.widget.TextNode( heading, root, false );

		displayItems(currentDate.items, pageModule, labels, headingNode);
		var rec = currentDate.items[currentDate.items.length-1];
		headingNode.expand();
	    }
	} else {
	    if (category.status == STATUS_IN_TRANSIT) {
		var itemsStr = " items In Transit:";
		if (category.items.length == 1)
		    itemsStr = " item In Transit:";
	    } else {
		var itemsStr = " items Pending:";
		if (category.items.length == 1)
		itemsStr = " item Pending:";
	    }
	    var heading = category.items.length + itemsStr;
	    heading = formatHeading(heading);
	    var headingNode = new YAHOO.widget.TextNode( heading, root, false );
	    
	    displayItems(category.items, pageModule, labels, headingNode);
	    var rec = category.items[category.items.length-1];
	    headingNode.expand();
	}
    }
    
    // Needed so that we can change the label text
    //tree.subscribe( "collapseComplete", pageModule.onTreeNodeCollapseComplete );
    //tree.subscribe( "expandComplete", pageModule.onTreeNodeExpandComplete );
    tree.subscribe( "clickEvent", onClick );
    
    //render tree
    tree.draw();
    
    // Expand if specified
//    if ( rec['_expandOnStartup'] ) {
//        tree.expandAll();
//    }
};

function createItems() {
    sortItems(unsafeWindow.HOLDS);
    var categories = categorizeItems(unsafeWindow.HOLDS);

    buildTree (
	"These items are on hold for you",
	"holdsDisplay", 
	unsafeWindow.PIP.HOLD, 
	categories, 
	unsafeWindow.LABELS
    );
}

createItems();
