// ==UserScript==
// @name           X-MS-DivX
// @namespace      kerframil@gmail.com
// @description    Allow Windows Media Player plug-in to handle embedded DivX/Xvid content
// @version        0.1
// ==/UserScript==

// NOTE: Tested in Windows 7 (which has DivX support out of the box)
	
var xpr = document.evaluate("//object", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	

for (var i = 0; i < xpr.snapshotLength; i++) {
	var node = xpr.snapshotItem(i);	
	var clsid = node.getAttribute("classid");
	var mimetype = node.getAttribute("type");
	
	// Skip unless there is a reference to the DivX Web Player classid
	if (! (mimetype === "video/divx" || mimetype === "video/x-xvid" || clsid.match(/67DABFBF-D0AB-41FA-9C46-CC0F21721616$/i)))
		continue;

	// Strip attributes that potentially interfere
	node.removeAttribute("classid");
	node.removeAttribute("codebase");

	// Force the object to be handled via the Windows Media Player plug-in
	node.setAttribute("type", "application/x-ms-wmp");
	node.setAttribute("pluginspage", "http://go.microsoft.com/fwlink/?LinkId=205166");	

	// Add a data attribute as per the video URL
	addDataAttribute(node);
	
	// Strip all nested <embed> and <param> tags
	removeNodesByQuery(node, "//embed");
	removeNodesByQuery(node, "//param");
	
	// Allows for full screen upon double-click
	node.appendChild(createParamNode("SendMouseClickEvents", "true"));
}

// Accept XPath queries and remove any matching nodes

function removeNodesByQuery(documentNode, query) {
	var xpr = document.evaluate(query, documentNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
	
	for (var i = 0; i < xpr.snapshotLength; i++) {
		var node = xpr.snapshotItem(i);
		node.parentNode.removeChild(node);
	}
}

// Set the 'data' attribute of the <object> based on the appropriate nested <param>

function addDataAttribute(documentNode) {
	var xpr = document.evaluate("//param[@name='src']", documentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	
	var node = xpr.singleNodeValue;
	
	if (node)
		node.parentNode.setAttribute("data", node.getAttribute("value"));
}

// Helper function for creating new <param> elements

function createParamNode(name, value) {	
	var param = document.createElement("param");
	param.setAttribute("name", name);
	param.setAttribute("value", value);
	return param;
}