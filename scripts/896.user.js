// ==UserScript==
// @name		Slashdot Live Comment Tree
// @namespace		http://www.allpeers.com/blog/greasemonkey
// @description		Adds expand/collapse buttons to Slashdot comment trees
// @include		http://*slashdot.org/article.pl*
// @include		http://*slashdot.org/*.shtml*
// @include 		http://*slashdot.org/comments.pl*
// @include		http://*slashdot.org/pollBooth.pl*

// ==/UserScript==

(function() {
	var options = "<select>";
	options += "<option value=''></option>";
	options += "<option value='collapseAll'>Collapse All</option><option value='expandAll'>Expand All</option>";
	options += "<option value='collapse5'>Collapse < 5</option><option value='collapse4'>Collapse < 4</option>";
	options += "<option value='collapse3'>Collapse < 3</option><option value='collapse2'>Collapse < 2</option>";
	options += "<option value='collapseNested'>Collapse Nested</option>";
	options += "</select>";
	
	var treeWalker;

	function injectCSS(css)
	{
		head = document.getElementsByTagName("head")[0];
		style = document.createElement("style");
		style.setAttribute("type", 'text/css');
		style.innerHTML = css;
		head.appendChild(style);
	}

	function createAnchor(text)
	{
		var anchor = document.createElement("a");
		anchor.innerHTML = text;
		anchor.className = "treewidget";
		return anchor;
	}

	function toggleElementState(element, show)
	{
		if (show)
			element.style.removeProperty("display");
		else
			element.style["display"] = "none";
	}

	function toggleCommentState(td, show)
	{
		// Toggle the comment header (except the first line)
		toggleElementState(td, show);
		
		// Toggle the children of the selected comment
		treeWalker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_ELEMENT, null, false);
		treeWalker.currentNode = td;
		do
		{
			var node = treeWalker.nextNode();
			if (node != null)
			{
				var tagName = node.tagName;
				if (tagName == "TR" || tagName == "UL")
					toggleElementState(node, show);
			}
		}while (node != null && treeWalker.currentNode.tagName != "UL");
	}
	
	function getFirstCommentNode()
	{
		return document.evaluate("//table/tbody/tr/td[font[@size='3' and @color='#000000']]", 
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	
	var firstCommentNode = getFirstCommentNode();
	var bgcolor = firstCommentNode.getAttribute("bgcolor");

	function expandNode(td)
	{
		var oldTd = td.parentNode.nextSibling.firstChild;
		toggleCommentState(oldTd, true);
		td.parentNode.removeChild(td);
	}
	
	function collapseNode(td)
	{
		var fontChild = document.evaluate("font", td, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (fontChild)
		{
			fontChild = fontChild.cloneNode(true);
			
			toggleCommentState(td, false);
				
			// Add a visible copy of the first line
			var newTr = document.createElement("tr");
			var newTd = document.createElement("td");
			newTd.setAttribute("bgcolor", bgcolor);
			newTd.setAttribute("collapsed", "true");
			newTr.insertBefore(newTd, newTr.firstChild);
			newTd.insertBefore(fontChild, newTd.firstChild);
			anchor = createAnchor("[+]");
			anchor.onclick = function(event) { expandNode(event.target.parentNode); return false; }
			newTd.insertBefore(anchor, fontChild);
			td.parentNode.parentNode.insertBefore(newTr, td.parentNode);
		}
	}
	
	function expandAll()
	{
		var snapshot = document.evaluate("//td[@collapsed='true']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0; i<snapshot.snapshotLength; i++)
			expandNode(snapshot.snapshotItem(i));
	}
	
	function collapseAll(filter)
	{
		treeWalker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_ELEMENT, null, false);	
		treeWalker.currentNode = getFirstCommentNode();
		var node = treeWalker.currentNode;
		var toExpand = null;
		while (node != null)
		{
			if (node.tagName == "TD" && node.getAttribute("bgcolor") == bgcolor)
			{
				if (toExpand)
					expandNode(toExpand);
				toExpand = null;
				if (filter == undefined || filter(node))
				{
					if (node.getAttribute("collapsed") != "true" && node.style["display"] != "none")
						collapseNode(node);
				}
				else if (filter != undefined && node.getAttribute("collapsed") == "true")
					toExpand = node;
			}
			node = treeWalker.nextNode();
		}
		if (toExpand)
			expandNode(toExpand);
	}
	
	function performAction(value)
	{
		var regexp = null;
		if (value == "collapseAll")
			collapseAll();
		else if (value == "expandAll")
			expandAll();
		else if (value == "collapse5")
			regexp = /\(Score:5/;
		else if (value == "collapse4")
			regexp = /\(Score:[45]/;
		else if (value == "collapse3")
			regexp = /\(Score:[345]/;
		else if (value == "collapse2")
			regexp = /\(Score:[2345]/;
		else if (value == "collapseNested")
			collapseAll(function(node) { 
				return document.evaluate("count(ancestor::table)", node, null, XPathResult.NUMBER_TYPE, null).numberValue > 3;
			});
		if (regexp)
		{
			collapseAll(function(node) { return node.innerHTML.search(regexp) == -1; });
		}
	}
	
	if (GM_registerMenuCommand)
	{
		GM_registerMenuCommand("Collapse All", collapseAll);
		GM_registerMenuCommand("Expand All", expandAll);
	}
	
	injectCSS("a.treewidget { text-decoration: none; } a.treewidget:hover { color: white; cursor: default; }");
	
	treeWalker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_ELEMENT, null, false);
	treeWalker.currentNode = firstCommentNode;

	var commentNode = firstCommentNode;
	var count = 0;
	while (commentNode != null)
	{
		do
		{
			var node = treeWalker.nextNode();
		}while (node != null && node.tagName != "UL");
		if (node == null)
			break;

		anchor = createAnchor("[-]");
		anchor.onclick = function(event)
		{
			var td = event.target.parentNode;
			collapseNode(td);
			return false;
		}

		commentNode.insertBefore(anchor, commentNode.firstChild);
		commentNode.setAttribute("childId", node.id);
		do
		{
			commentNode = treeWalker.nextNode();
		}while (commentNode != null && (commentNode.tagName != "TD" || commentNode.getAttribute("bgcolor") != bgcolor));
	}
	
	var form = document.evaluate("//form/font", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var optionList = document.createElement("span");
	optionList.innerHTML = options;
	form.insertBefore(optionList, form.firstChild);
	form.insertBefore(document.createTextNode("Live Comment Tree: "), optionList);
	var select = optionList.firstChild;
	select.onchange = function() 
	{ 
		var value = this.options[this.selectedIndex].value;
		performAction(value) 
		if (GM_setValue)
			GM_setValue("slashdotLiveCommentTree.lastAction", value);
	};
		
	if (GM_getValue)
	{
		var value = GM_getValue("slashdotLiveCommentTree.lastAction", "");
		if (value.length > 0)
		{
			performAction(value);
			var childNodes = select.childNodes;
			for (var i=0; i<childNodes.length; i++)
			{
				if (childNodes.item(i).value == value)
					select.selectedIndex = i;
			}
		}
	}
})();