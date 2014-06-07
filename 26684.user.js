// gmail-colored-diffs.user.js
// version 0.2
// 2009-08-25
// Copyright (c) 2009, Fabrice Bellingard
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name           	ColoredDiffs for GMail
// @description	ColoredDiffs colors diffs that SVN can send by mail
// @namespace	http://gmail-colored-diffs.devs.bellingard.fr
// @include        	http://mail.google.com/*
// @include        	https://mail.google.com/*
// @version        	0.2
// ==/UserScript==
//
// --------------------------------------------------------------------
// Inspired by "colorediffs" Thunderbird extension developed by Vadim at http://code.google.com/p/colorediffs/
// --------------------------------------------------------------------
//
// History:
//
// 0.2 - 2009-08-25
//	- Changes needed to find the message DIV
//
// 0.1 - 2008/05/16 - First version, needs to be widely tested.
//	This version colors only the mails sent by the default template of Subversion.
//
// --------------------------------------------------------------------

const DEBUG = false;

window.addEventListener(
	'load', 
	function()
	{
		if (unsafeWindow.gmonkey) 
		{
			unsafeWindow.gmonkey.load(
				'1.0', 
				function(gmail) 
				{				
				    gmail.registerViewChangeCallback( viewTypeTrigger );
				    viewTypeTrigger();

				    unsafeWindow.s_gmail = gmail;

				    function viewTypeTrigger(){	      
				      var view = gmail.getActiveViewType();
				      switch( view ){
						case "cv":
							colorDiffs();
							break;
						default:
							break;
				      }
				    }
					
					function colorDiffs () {
						
						unsafeWindow.r_doc = gmail.getActiveViewElement().ownerDocument;

						// find message div
						//var MSG_DIV_CLASS = "ArwC7c ckChnd";
						var MSG_DIV_CLASS = "ii gt";
						var msg_div = getFirstVisibleNode(getNodesByTagNameAndClass(unsafeWindow.r_doc.body, "div", MSG_DIV_CLASS));
						//var msg_div = unsafeWindow.r_doc.getElementById( ":ei" );
						debug(msg_div);

						// if found, try to find patterns to color them
						if (msg_div) {
							// we found the HTML of the message body
							if (msg_div.innerHTML.substr(0,8) == 'Author: ') {
								// we are in a diff mail
								colorDiv(msg_div);
							}							
						}
					}
					
				});
		}
	}, 
	true
);

function colorDiv(div) {
	current_html = div.innerHTML;
	
	oldRevRegExp = /\n(-{3} .*)<br>/g;
	newRevRegExp = /\n(\+{3} .*)<br>/g;
	lineIndexRegExp = /\n(@@.*@@)<br>/g;
	oldRevLineRegExp = /\n(-.*)<br>/g;
	newRevLineRegExp = /\n(\+.*)<br>/g;
	
	new_html = current_html
					.replace(/(Author:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
					.replace(/\n(Date:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
					.replace(/\n(New Revision:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
					.replace(/\n(Modified:)/g, "\n<hr><span style='font-weight:bold;text-decoration: underline'>$1</span>")
					.replace(/\n(Added:)/g, "\n<hr><span style='font-weight:bold;text-decoration: underline'>$1</span>")
					.replace(/\n(Deleted:)/g, "\n<hr><span style='font-weight:bold;text-decoration: underline'>$1</span>")
					.replace(/\n(Log:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
					.replace(/\n(URL:)/g, "\n<span style='font-weight:bold;text-decoration: underline'>$1</span>")
					.replace(/\n(=====.*<br>)/g, "\n<span style='color:lightgrey'>$1</span>")
					.replace(oldRevRegExp, "\n<span style='color:red;font-weight:bold'>$1</span><br>")
					.replace(newRevRegExp, "\n<span style='color:green;font-weight:bold'>$1</span><br>")
					.replace(lineIndexRegExp, "\n<span style='color:blue'>$1</span><br>")
					.replace(oldRevLineRegExp, "\n<span style='color:red'>$1</span><br>")
					.replace(newRevLineRegExp, "\n<span style='color:green'>$1</span><br>");
	
	div.innerHTML = new_html;	
}

function trim (str) {
	return str.replace(/^\s*/, "").replace(/\s*$/, "");
}

// 
// The following code has been copied/adapted from some various other GM scripts
//

function debug() {
	if (DEBUG && console) {
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
