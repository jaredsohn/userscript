// ==UserScript==

// @name           Thanks wrestlingbay.com

// @namespace      tgk00

// @include        http://www.wrestlingbay.com/showthread.php?t=*

// @include        http://wrestlingbay.com/showthread.php?t=*

// @include        http://www.wrestlingbay.com/showthread.php?p=*

// @include        http://wrestlingbay.com/showthread.php?p=* 
  
// @include        http://www.wrestle-zone.net/showthread.php?t=*

// @include        http://wrestle-zone.net/showthread.php?t=*

// @include        http://www.wrestle-zone.net/showthread.php?p=*

// @include        http://wrestle-zone.net/showthread.php?p=*      

// ==/UserScript==

const btns = [
	["Two Wordz 4 Ya'... Thanks Dude"],
	
	
];

GM_addStyle(".qr-text-btn { padding: 2px 4px; margin: 2px; border: 1px solid #000000; color: #000000; background: #E0E0E0; cursor: pointer; width: 11em; text-align: center }");

/* ************************ */
function xpath1(xpath, root)
{
	var nodes = document.evaluate(xpath, root || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return nodes.singleNodeValue;
}

function createNode(type, attributes, properties)
{
	var node = document.createElement(type);

	if (attributes) {
		for (var attribute in attributes) {
			node.setAttribute(attribute, attributes[attribute]);
		}
	}

	if (properties) {
		for (var property in properties) {
			if (property in node) node[property] = properties[property];
		}
	}

	return node;
}

var qr_controls = xpath1("id('vB_Editor_QR_controls')//td[@width='100%']");
if (!qr_controls) return;

function insertText_internal(id)
{
	var qr_submit = xpath1("id('qr_submit')");
	if (!qr_submit) return;
	var QR_EditorID = unsafeWindow.QR_EditorID;
	if (!QR_EditorID) return;
	var vB_Editor = unsafeWindow.vB_Editor;
	if (!vB_Editor) return;

	vB_Editor['vB_Editor_QR'].insert_text(btns[id][2] || btns[id][0], false);

 	if (!btns[id][1]) qr_submit.click();
}

function insertText(id)
{
	return function(){ insertText_internal(id)};
}

for (var i = 0; i < btns.length; i++) {
	var td = createNode("td");
	var btn = createNode("div", {"class": "qr-text-btn", "title": btns[i][2] || btns[i][0]}, {"textContent": btns[i][0]});
	td.appendChild(btn);
	btn.addEventListener("click", insertText(i), false);
	qr_controls.parentNode.insertBefore(td, qr_controls);
}