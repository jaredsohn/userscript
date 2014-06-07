// ==UserScript==
// @name            UltraEdit Documentation
// @namespace       http://www.rpyron.com/greasemonkey/
// @description     Remove the cruft (header image and sidebars) from UltraEdit documentation pages -- basically, anything that can be reached from the PowerTips page.
// @include         http://www.ultraedit.com/index.php?name=Powertips*
// @include         http://www.ultraedit.com/index.php?name=Content*
// @include         http://www.ultraedit.com/index.php?name=Download*
// @include         http://www.ultraedit.com/index.php?name=SSH_Telnet*
// @include         http://www.ultraedit.com/index.php?name=UML_Scripting_Diagram*
// @include         http://www.ultraedit.com/index.php?name=Word_Compare*
// ==/UserScript==

function do_platypus_script() {
    isolate(window.document,
            document.evaluate('/HTML[1]/BODY[1]/DIV[3]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/DIV[1]', 
                                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,
            null,null,null);
    html_insert_it(window.document,
            document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]', 
                                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,
            '<p><a href="http://www.ultraedit.com/">Home</a></p>',
            true,false);
}; // Ends do_platypus_script

window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");

function isolate(doc, node) {
	if (!node.parentNode) 
		return;
	node.parentNode.removeChild(node);
	while (doc.body.childNodes.length > 0) {
		doc.body.removeChild(doc.body.childNodes[0]);
	};
	var replacement_div = doc.createElement ("DIV");
	replacement_div.setAttribute('style', "margin: 0 2%; text-align: left");
	replacement_div.appendChild(node);
	doc.body.appendChild(replacement_div);
};

function set_style_script(doc, element, new_style) {
	element.setAttribute('style', new_style);
};

function html_insert_it(doc, element, new_html, before, insert_as_block) {
	var new_element;
	if (insert_as_block) {
		new_element = doc.createElement ("DIV");
	}
	else {
		new_element = doc.createElement ("SPAN");
	};
	new_element.innerHTML = new_html;
	if (before) {
		element.parentNode.insertBefore(new_element, element);
	}
	else {
		insertAfter(new_element, element);
	};
};

function insertAfter(newNode, target) {
	var parent = target.parentNode;
	var refChild = target.nextSibling;
	if(refChild != null)
		parent.insertBefore(newNode, refChild);
	else
		parent.appendChild(newNode);
};

//.user.js