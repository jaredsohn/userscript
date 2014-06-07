// ==UserScript==
// @name           my FFXI Wikia cleanifier
// @namespace      http://userscripts.org/users/289062
// @include        http://wiki.ffxiclopedia.org/*
// ==/UserScript==
////////////////////////// START OF HELPER FUNCTIONS //////////////////////////

// Shortcut to document.getElementById
function $(id) {
	return document.getElementById(id);
}

// Returns a node from its id or a reference to it
function $ref(idRef) {
	return (typeof idRef === "string") ? $(idRef) : idRef;
}

// Runs a particular XPath expression p against the context node context (or the document, if not provided)
// If a document (docObj) is provided, its evaluate method is used instead of document.evaluate (and it's also the default context)
// Returns the results as an array
function $x(p, context, docObj) {
	if (!docObj) docObj = document;
	if (!context) context = docObj;
	var arr = [], xpr = docObj.evaluate(p, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, l = xpr.snapshotLength; i < l; i++) arr.push(xpr.snapshotItem(i));
	return arr;
}

// Returns only the first element of the array returned by $x (or null if the array was empty)
function $x1(p, context, docObj) {
	var nodeArray = $x(p, context, docObj);
	return (nodeArray.length > 0) ? nodeArray[0] : null;
}

// Creates a new node with the given attributes, properties and event listeners
function createNode(type, attributes, props, evls) {

	var node = document.createElement(type);

	if (attributes) {
		for (var attr in attributes) {
			if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
		}
	}

	if (props) {
		for (var prop in props) {
			if ((props.hasOwnProperty(prop)) && (prop in node)) node[prop] = props[prop];
		}
	}

	if (Array.isArray(evls)) {
		evls.forEach(function(evl) {
			if (Array.isArray(evl)) node.addEventListener.apply(node, evl);
		});
	}

	return node;

}

// Deletes a node from its id or a reference to it
function delNode(targetNode) {
	var iNode = $ref(targetNode);
	if ((iNode) && (iNode.parentNode)) return iNode.parentNode.removeChild(iNode);
	return null;
}

// Deletes all the nodes in the passed array by calling delNode for each of them
// If the passed parameter isn't an array, it does nothing
function delNodeArray(nodeArray) {
	nodeArray.forEach(function(iNode) {
		delNode(iNode);
	});
}

// Inserts the specified node as a sibling AFTER the reference node, returning the inserted node
// If any of the passed nodes isn't found or the reference node doesn't have a parent, it does nothing and returns null
function insertAfter(newNode, refNode) {
	return ((newNode) && (refNode) && (refNode.parentNode)) ? refNode.parentNode.insertBefore(newNode, refNode.nextSibling) : null;
}


////////////////////////////////////////////////////////////////////////////////


$('WikiaFooter').style.display = 'none';
$('WikiaArticleBottomAd').style.display = 'none';

//$('WikiaRail').style.display = 'none';
delNodeArray($x("//div[@id='WikiaRail']/section"))
$('WikiaRail').style.float = 'auto';
$('WikiaMainContent').style.float = 'auto';
$('WikiaMainContent').style.width = '80%';

$('WikiaPage').style.width = 'auto';
	
$x1("//nav[@class='RelatedPagesModule']").style.display = 'none';

// alert("did't fail");
