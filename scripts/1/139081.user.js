// launchpad-tweaks.user.js
// version 0.1
// 2012-07-04
// Copyright (c) 2012, Michal Hruby
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           	Launchpad tweaks
// @description		Tweaks the merge view on Launchpad
// @namespace		http://launchpad.net/~mhr3
// @match        	https://code.launchpad.net/*/+merge/*
// @match        	https://code.launchpad.net/*/+register-merge
// @version        	0.1
// ==/UserScript==
//
// --------------------------------------------------------------------

if (document.location.href.match("register-merge$") == "register-merge")
{
	var commit_field = document.getElementById("field-commit_message");
	var commit_msg = commit_field.value;
}
else
{
	// tweak the "Add comment" box
	var comment_div = document.getElementById("add-comment").parentNode;
	comment_div.style.position = "fixed";
	comment_div.style.bottom = "10px";
	comment_div.style.right = "10px";
	comment_div.style.width = "540px";
	comment_div.style.zIndex = "15";

	var comment_field = document.getElementById("field.comment");
	comment_field.style.height = "100px";

	var form_node = comment_field.parentNode;
	form_node.style.marginBottom = "0px";
	form_node.style.paddingBottom = "6px";

	// add a warning about missing commit message
	var commit_msg_div = document.getElementById("edit-commit_message");
	var commit_msg_p = evalXPath(".//p", commit_msg_div);
	if (commit_msg_p != null) commit_msg_p = commit_msg_p[0];
	var commit_msg = commit_msg_p != null ? commit_msg_p.innerText : "";
	var warning_box_div = document.createElement("div");
	warning_box_div.style.position = "fixed";
	warning_box_div.style.top = "10px";
	warning_box_div.style.right = "10px";
	warning_box_div.style.zIndex = "14";
	warning_box_div.className = "warning message";
	warning_box_div.innerText = "Warning! No commit message specified!";
	warning_box_div.style.display = trim(commit_msg) == "" ? "" : "none";

	comment_div.parentNode.insertBefore(warning_box_div, comment_div);
}

function trim (str) {
	return str.replace(/^\s*/, "").replace(/\s*$/, "");
}

// 
// The following code has been copied/adapted from some various other GM scripts
//

function debug() {
	if (console) {
		console.log(this, arguments);
	}
}

function getNodesByTagNameAndClass(rootNode, tagName, className) {
	var expression = ".//" + tagName + "[contains(concat(' ', @class, ' '), ' " + className + " ')]";
	return evalXPath(expression, rootNode);
}

function getFirstVisibleNode(nodes) {
	for (var i = 0, node; node = nodes[i]; i++) {
		return node;
	}
	return null;
}

function evalXPath(expression, rootNode) {
	try {
		var xpathIterator = rootNode.ownerDocument.evaluate(
			expression,
			rootNode,
			null,
			XPathResult.ORDERED_NODE_ITERATOR_TYPE,
			null);
	} catch (err) {
		GM_log("Error when evaluating XPath expression '" + expression + "'" + ": " + err);
		return null;
	}
	var results = [];
	for (var xpathNode = xpathIterator.iterateNext(); 
		xpathNode; 
		xpathNode = xpathIterator.iterateNext()) {
		results.push(xpathNode);
	}
	return results;
}
