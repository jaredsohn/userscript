// ==UserScript== 
// @name          Setup Enhancer for Salesforce
// @version       1.2.4
// @date          2010-10-27
// @description   Enhancements to filter, collapse and expand the Salesforce setup tree and collapse the setup sidebar. Salesforce.com does not endorse or supply support for this script. Requires Firefox 3.5 or higher or Chrome. 
// @include       https://*.salesforce.com/*
// ==/UserScript==
// The mTreeSelection div contains the Setup sidebar menu items. If we can't find this
// element, there's nothing for the rest of this script to act upon.
var treeContainer = document.getElementsByClassName("mTreeSelection").length > 0 ? document.getElementsByClassName("mTreeSelection")[0] : null;

/* FIX CHECKOUT NODE */
function initCheckoutFix()
{
	var elm = document.getElementById("AppStoreSummary_font");
	if (elm != null)
	{
		// Move the Checkout Summary node into a setupLeaf wrapper.
		var div = document.createElement("div");
		div.className = "setupLeaf";
		insertAfter(elm, div);
		div.appendChild(elm);
		
		// Remove the empty image used for spacing on the Checkout Summary node (now unnecessary).
		var imgs = treeContainer.getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++)
		{
			if (imgs[i].src.indexOf("empty") > 0)
			{
				imgs[i].parentNode.removeChild(imgs[i]);
			}
		}
	}
}

/* SHOW/HIDE FUNCTIONALITY */
function initShowHide()
{
	// Add styles for sidebar handle.
	addGlobalStyle(".se_handleOpened, .se_handleClosed { background: transparent url(/img/sidebar/LNav_handleBG.gif) repeat-y scroll right center; cursor: url(/img/cursors/col-collapse.cur), pointer; width: 7px; }");
	addGlobalStyle(".se_handleClosed { cursor: url(/img/cursors/col-expand.cur), pointer }");
	addGlobalStyle(".se_pinDivOpened, .se_pinDivClosed { top: 20px; display: block; cursor: url(/img/cursors/col-collapse.cur), pointer; background-image: url(/img/sidebar/LNav_twisty_opened.gif); height: 41px; padding: 0; position: absolute; right: 1; width: 6px; z-index: 6; }");
	addGlobalStyle(".se_pinDivClosed { background-image: url(/img/sidebar/LNav_twisty_closed.gif); }");

	// Set up the table cell that acts as the handle.
	var cell = document.createElement("td");
	cell.className = "se_handleOpened";
	cell.title="Click to Close Sidebar";
	cell.id = "se_handle";
	cell.addEventListener('click', function () { toggleSidebar() }, false );
	
	// Set up the div that displays the open/close arrow, and add
	// it to the handle table cell.
	var pinDiv = document.createElement("div");
	pinDiv.title="Click to Close Sidebar";
	pinDiv.className = "se_pinDivOpened";
	pinDiv.id = "se_pinDiv";
	cell.appendChild(pinDiv);
	
	// Insert the handle table cell between the sidebar and content table cells.
	insertAfter(treeContainer.parentNode, cell);
}

// Hide/show the setup sidebar, and toggle the handle styling and title accordingly.
function toggleSidebar()
{
	var cell = document.getElementById("se_handle");
	var pinDiv = document.getElementById("se_pinDiv");
	if (treeContainer.parentNode.style.display == "none")
	{
		treeContainer.parentNode.style.display = "table-cell";
		cell.title = "Click to Close Sidebar";
		cell.className = "se_handleOpened";
		pinDiv.className = "se_pinDivOpened";
		pinDiv.title = "Click to Close Sidebar";
	}
	else
	{
		treeContainer.parentNode.style.display = "none";
		cell.title = "Click to Open Sidebar";
		cell.className = "se_handleClosed";
		pinDiv.className = "se_pinDivClosed";
		pinDiv.title = "Click to Open Sidebar";
	}
}

/* FILTER FUNCTIONALITY */
function initFilter()
{
	addGlobalStyle(".se_highlight { background: #ff0; }");
	addGlobalStyle("#se_find { background-image:url(/img/func_icons/util/search16.png); background-position:2px 1px; background-repeat:no-repeat; height:16px; padding-left:22px; padding-top:2px;width:175px;margin:2px 10px 4px 10px;}");
	addGlobalStyle("#se_find_label { position:absolute; left:-10000px;}");

	// Set up the HTML elements required to filter the tree.
	var div = document.createElement("div");
	div.style.backgroundColor = "#e6e6e7";
	div.style.paddingBottom = "4px";
	div.style.borderBottom = "1px solid #d9d9d9";
	div.innerHTML = "<label for=\"se_find\" id=\"se_find_label\">Quick Find:</label><input type=\"text\" id=\"se_find\" placeholder=\"Quick Find\" onfocus=\"se_clearPlaceholder();\" onblur=\"se_showPlaceholder();\" onkeyup=\"se_filterTree();\" />";
	
	// Insert the HTML above the setup tree.
	treeContainer.insertBefore(div, treeContainer.firstChild);
	
	// Message to indicate that no items were matched
	var msgDiv = document.createElement("div");
	msgDiv.id = "se_msgDiv";
	msgDiv.style.padding = "5px";
	msgDiv.style.fontSize = "12px";
	msgDiv.style.fontWeight = "bold";
	msgDiv.style.marginBottom = "4px";
	msgDiv.style.display = "none";
	msgDiv.innerHTML = "<p>No matching items found<p>";
	
	// Insert the message div above the setup tree.
	insertAfter(div, msgDiv);
}

function se_showPlaceholder()
{
}

function se_clearPlaceholder()
{
}

/* ESCAPE IN PREPARATION FOR REGEX MATCHING */
function se_escapeForRegexp(str) 
{
	return str.replace(/([\/.*+?|()[\]{}\\^$])/g, "\\$1");
}

// Set the visible state of nodes in the tree based on the filter value.
function se_filterTree()
{
	// Get the contents of the filter field, trimmed of any white space.
	var filterValue = document.getElementById('se_find').value.trim();

	// We can't rely on the tree's parent container ID to be constant, so use
	// the DOM to get that node and all its immediate children.
	var nodes = se_treeContainer.getElementsByClassName("setupNavtree")[0].parentNode.childNodes;
	
	// Reset the globals used to determine whether or not to display headings.
	se_childCount = 0;
	se_foundCount = 0;
	se_lastCategory = null;
	
	// Iterate through all the top-level nodes and check whether they match
	// the filter. Any child nodes will get checked with the parent, thanks to 
	// the beauty of recursion.
	for (var i = 0; i < nodes.length; i++)
	{
		if (nodes[i].nodeName.toLowerCase() == "div")
		{
			se_filterNode(nodes[i], filterValue);
		}
	}
	
	document.getElementById("se_msgDiv").style.display = (se_foundCount == 0 && filterValue.length > 0) ? "block" : "none";
	if (se_lastCategory != null && filterValue.length > 0 && (se_foundCount == 0 || se_childCount == 0))
	{
		se_lastCategory.style.display = "none";
	} 
}

function se_filterNode(node, filterValue, parentMatches)
{
	parentMatches = (parentMatches == undefined) ? false : parentMatches;
	se_clearHighlight(node);
	
	var showNode = false;
	var nodeClass = node.className.toLowerCase();
	
	if (nodeClass == "setupnavtree")
	{
		showNode = true;
		if (filterValue.length != 0 && (se_lastCategory != null && se_childCount == 0))
		{
			se_lastCategory.style.display = "none";
		}
		
		se_lastCategory = node;
		se_childCount = 0;
	}
	else
	{
		var topic = node.id;
		var toFindEsc = se_escapeForRegexp(filterValue);
		var re = filterValue.charAt(0).match(/^\w/) ? new RegExp("\\b" + toFindEsc + "\\w*\\b", "gi") : new RegExp(toFindEsc, 'i');

		if ((filterValue.length == 0 || se_getNodeLabel(node).search(re) >= 0 || parentMatches) 
			&& !se_arrayContains(se_excludeNodes, topic))
		{
			showNode = true;
			if (filterValue.length > 0)
			{
				se_highlight(node, filterValue.charAt(0).match(/^\w/) ? new RegExp(">([^<]*)?(\\b" + toFindEsc + ")([^>]*)?<","gi") : new RegExp(">([^<]*)?(" + toFindEsc + ")([^>]*)?<", "gi"));
			}
			se_childCount++;		
		}
		
		if (nodeClass == "parent")
		{
			var obj = HTMLTreeNode.prototype.getNodeChild(topic);
			var foundChild = false;
			var childNodes = obj.childNodes;
			parentMatches = showNode;
			
			for (var i = 0; i < childNodes.length; i++)
			{
				if (se_filterNode(childNodes[i], filterValue, parentMatches))
				{
					foundChild = true;
				}
			}			
			
			showNode = showNode || foundChild;
			
			if (showNode && filterValue.length != 0)
			{
				HTMLTreeNode.prototype.open(obj, topic);
				SetupTreeNode.prototype.addToOpenSetup(topic);
			}
			else
			{
				HTMLTreeNode.prototype.close(obj,topic);
				SetupTreeNode.prototype.removeFromOpenSetup(topic);
			}
		}
		
		if (showNode && filterValue.length != 0)
		{
			se_foundCount++;
		}
	}

	node.style.display = showNode ? "block" : "none";

	return showNode;
}

// Get the user-readable label of a node.
function se_getNodeLabel(node)
{
	// A node is made up of a div containing one or more A tags and,
	// optionally, child nodes.
	var childNodes = node.childNodes;
	
	for (var i = 0; i < childNodes.length; i++)
	{
		// We only care about the A tag with no child tags. The innerHTML will
		// contain the user-readable string.
		if (childNodes[i].nodeName == "A" && childNodes[i].innerHTML.indexOf("<") != 0)
		{
			return childNodes[i].innerHTML;
		}
		else if (childNodes[i].nodeName == "SPAN")
		{
			var spanNodes = childNodes[i].childNodes;
			
			// New nodes have a surrounding span tag.
			for (var j = 0; j < spanNodes.length; j++)
			{
				if (spanNodes[j].nodeName == "A" && spanNodes[j].innerHTML.indexOf("<") != 0)
				{
					return spanNodes[j].innerHTML;
				}			
			}	
		}
	}
	
	// If we got this far, it's probably not really a node.
	return "";
}

function se_highlight(elm, regex) 
{
	elm.innerHTML = elm.innerHTML.replace(/\&amp;/gi, '&').replace(regex,'>$1<span class="se_highlight">$2</span>$3<');
}

function se_clearHighlight(elm)
{
	// Clear any highlighting already in place
	var highlights = elm.getElementsByClassName("se_highlight");
	for (var i = 0; i < highlights.length; i++)
	{
		highlights[i].parentNode.innerHTML = highlights[i].parentNode.innerHTML.replace("<span class=\"se_highlight\">" + highlights[i].innerHTML + "</span>", highlights[i].innerHTML);
	}	
}

/* EXPAND/COLLAPSE FUNCTIONALITY */
function initExpandCollapse()
{
	// Set up the HTML elements required to expand/collapse the tree.
	var div = document.createElement("div");
	div.style.textAlign = "right";
	div.style.fontSize = "10px";
	div.style.paddingRight = "10px";
	div.style.paddingTop = "4px";
	div.style.paddingBottom = "4px";
	div.style.backgroundColor = "#e6e6e7";
	div.innerHTML = "<a href=\"#\" onclick=\"se_expandAll(); return false;\">Expand All</a> | <a href=\"#\" onclick=\"se_collapseAll(); return false;\">Collapse All</a>";
		
	// Insert the HTML above the setup tree.
	treeContainer.insertBefore(div, treeContainer.firstChild);
}

// Expand all nodes in the tree.
function se_expandAll()
{
	var parentNodes = se_treeContainer.getElementsByClassName("parent");
	
	for (var i = 0; i < parentNodes.length; i++)
	{
		// Use the SFDC HTMLTreeNode and SetupTreeNode objects already in the document 
		// because it persists the expanded state of the tree when the page reloads.
		var topic = parentNodes[i].id;
		var obj = HTMLTreeNode.prototype.getNodeChild(topic);
		
		HTMLTreeNode.prototype.open(obj,topic);
		SetupTreeNode.prototype.addToOpenSetup(topic);
	}
}

// Collapse all nodes in the tree.
function se_collapseAll()
{
	var parentNodes = se_treeContainer.getElementsByClassName("parent");
	
	for (var i = 0; i < parentNodes.length; i++)
	{
		// Use the SFDC HTMLTreeNode and SetupTreeNode objects already in the document 
		// because it persists the expanded state of the tree when the page reloads.
		var topic = parentNodes[i].id;
		var obj = HTMLTreeNode.prototype.getNodeChild(topic);
		
		HTMLTreeNode.prototype.close(obj,topic);
		SetupTreeNode.prototype.removeFromOpenSetup(topic);
	}
}


/* HELPER FUNCTIONS */
// There's no native HTML element insertAfter() method, so fake it.
function insertAfter(referenceNode, newNode)
{
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Add style tags to be used by elements this script will create in the document.
function addGlobalStyle(css) 
{
    var head = document.getElementsByTagName('head')[0];
    if (!head) 
    { 
    	return; 
    }
    
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Check whether an array contains a given value.
function se_arrayContains(array, value)
{
	for (var i = 0; i < array.length; i++)
	{
		if (array[i].search(new RegExp("^" + value + "$", "i")) >= 0)
		{
			return true;
		}
	}
	
	return false;
}

function injectScript(s)
{
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = s;
    
    document.body.appendChild(script);
}

// Set up the elements, code and styles required for the various enhancements.
if (treeContainer != null)
{
    injectScript("var se_treeContainer = document.getElementsByClassName(\"mTreeSelection\").length > 0 ? document.getElementsByClassName(\"mTreeSelection\")[0] : null; var se_excludeNodes = new Array( \"Customize\", \"DevTools\", \"DevToolsIntegrate\", \"Deploy\" ); var se_childCount = 0; var se_lastCategory = null; var se_foundCount = 0;");
    injectScript(se_escapeForRegexp);
    injectScript(se_filterTree);
    injectScript(se_filterNode);
    injectScript(se_getNodeLabel);
    injectScript(se_highlight);
    injectScript(se_clearHighlight);
    injectScript(se_expandAll);
    injectScript(se_collapseAll);
    injectScript(se_arrayContains);

	initCheckoutFix(); // The Checkout node doesn't have the same wrapper as all other nodes in the tree, so add one.
	initShowHide(); // Show or hide the setup sidebar
	initFilter(); // Filter implementation for the setup tree
	initExpandCollapse(); // Expand/collapse links for the setup tree
}