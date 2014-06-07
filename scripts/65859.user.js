// ==UserScript==
// @name           Show the hotness
// @namespace      com.aimedia.literotica
// @description    Show only hot and editor's choice stories on Literotica
// @include        http://literotica.com/stories/new_submissions.php*
// @include        http://www.literotica.com/stories/new_submissions.php*
// ==/UserScript==

/* perform the actions on the completed document */
function handler () {
    var storyElements = document.evaluate("//body/table/tbody/tr[5]/td",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    
    var storyTable = storyElements.snapshotItem(0);
    
    var i = storyTable.childNodes.length - 1;
    // : checkpoint on <br> tags
    // : initial state:  title line, delete
    var mode = "title_line";
    var action = "delete";
    var ridx = 0;
    var removes = new Array();
    while (i >= 0) {
	cn = storyTable.childNodes[i]; i--;
        // GM_log(" ++ Node " + i + " [ " + cn.localName + " ] -> " + mode + ", " + action);
	
	if (mode == "author_line") {
	    // GM_log("++ At node " + i + ": [" + cn.localName + "] -> " + mode + ", " + action);
	    if (cn.localName && cn.localName.toLowerCase() == "br") { mode = "title_line"; }
	    if (action == "delete") {
		removes[ridx++] = cn;
	    }
	    else {
		// : action is retain
	    }
	}
	else {
	    // GM_log("-- At node " + i + ": [" + cn.localName + "] -> " + mode + ", " + action);
	    // : mode is title line
	    if (cn.localName && cn.localName.toLowerCase() == "br") { 
		mode = "author_line";
		// : check to see if there's an IMG tag coming up, two from here
		if (i > 1) {
		    inode = storyTable.childNodes[i];
		    // GM_log("-- checking node " + (i) + ": " + inode.localName + " to see if it's an image.")
		    if (inode.localName.toLowerCase() == "img") {
			action = "retain";
		    }
		    else {
			action = "delete";
		    }
		}
	    }
	    if (action == "delete") {
		removes[ridx++] = cn;
	    }
	    else {
		// : action is retain
	    }
	}
    };

    for (var i = removes.length - 1; i >= 0; i--){
	storyTable.removeChild(removes[i]);
    };
    
}

window.addEventListener('load',handler,false);
