// ==UserScript==
// @name           Group LAPL Checked Out Items by due date
// @namespace      tag:gmail.com,2009-10-13:laplcatalog
// @description    Group LAPL checked out items by due date
// @include        http://catalog.lapl.org/carlweb/jsp/pipcharges.jsp
// @require        http://catalog.lapl.org/carlweb-files/yui/build/yahoo-dom-event/yahoo-dom-event.js
// @require        http://catalog.lapl.org/carlweb-files/yui/build/json/json-min.js
// @require        http://catalog.lapl.org/carlweb-files/yui/build/connection/connection-min.js
// @require	   http://catalog.lapl.org/carlweb-files/yui/build/treeview/treeview-min.js
// ==/UserScript==

function sortItems(items) {
    //Sort the items by holdStatus type and then date and then title
    items.sort(function(n,m) {
	var nDuedate = new Date(n["dueDate"]);
	var mDuedate = new Date(m["dueDate"]);
	if (nDuedate < mDuedate)
	    return -1;
	if (nDuedate > mDuedate)
	    return 1;
	return 0;
    });
}

function categorizeItems(items) {
    var categorizedItems = [];
    var currentDate;
    var prevDueDate = -1;
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    //Group the items by date
    for (i = 0; i < items.length; i++) {
	var currentItem = items[i];
	var dueDate = new Date(currentItem["dueDate"]);
        if (dueDate.getFullYear() < 1970) 
            dueDate.setFullYear(dueDate.getFullYear()+100)

	if (dueDate.valueOf() != prevDueDate.valueOf()) {
	    var milliseconds = dueDate.getTime() - today.getTime();
	    var days = parseInt((milliseconds / 1000 / 60 / 60 / 24).toFixed(0));
	    var dayStr = " days left, ";
	    if (days == 1)
		dayStr = " day left, ";

	    var dateStr = daysOfWeek[dueDate.getDay()] + " " + 
		(dueDate.getMonth()+1).toString() + "/" +
		dueDate.getDate() + "/" + 
		dueDate.getFullYear();

	    dateStr = days.toString() + dayStr + dateStr;

	    currentDate = new Object();
	    currentDate.dueDate = dueDate;
	    currentDate.dateStr = dateStr;
	    currentDate.items = [];
	    categorizedItems.push(currentDate);

	    prevDueDate = dueDate;
	}

	currentDate.items.push(currentItem);
    }

    return categorizedItems;
}

unsafeWindow.PIP.CHARGE.summaryFields = [
    'checkbox',
    'title',
    'author',
    'branchName'
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

    // add each due date
    for (var i = 0; i < categories.length; i++) {
	var category = categories[i];

	var itemsStr = " items due:";
	if (category.items.length == 1)
	    itemsStr = " item due:";
	
	var heading = category.dateStr + ", " + category.items.length + itemsStr;
	heading = formatHeading(heading);
	var headingNode = new YAHOO.widget.TextNode( heading, root, false );

	displayItems(category.items, pageModule, labels, headingNode);
	var rec = category.items[category.items.length-1];
	headingNode.expand();
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
    sortItems(unsafeWindow.CHARGES);
    var categories = categorizeItems(unsafeWindow.CHARGES);

    buildTree (
	"These items are checked out to you",
	"chargesDisplay",
	unsafeWindow.PIP.CHARGE, 
	categories, 
	unsafeWindow.LABELS
    );
}

createItems();
