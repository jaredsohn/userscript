/*
//	Package:	Mozilla Greasemonkey user scripts
//	File:		ThinkBroadband.user.js
//	Version:	0.0.13
//	Date:		2011/06/15
//	
//	Copyright (c) 2005, 2008, 2009, Mick Sharpe
//	
//	Revision History:
//	0.0.1	2005/07/25  Initial beta version.
//	0.0.2	2005/07/25  Remove <br> tags from <pre> blocks.
//	0.0.3	2005/07/27  Convert links to images into in-line images.
//	0.0.4	2005/07/27  Show avatars.
//	0.0.5	2005/07/27  Minor bug fixes, really :|
//	0.0.6	2005/07/28  Revert to max-width due to user complaints.
//	0.0.7	2005/07/29  Make images (but not avatars) clickable.
//                          Handle Post Format = Top.
//	0.0.8		    2005/07/30	Show images in new post preview.
//	0.0.9   2008/01/30  Handle YouTube links.
//      0.0.10  2008/07/26  Change maximum image width from 33% to 200px.
//                          Change image margin from 7px to 5px.
//      0.0.11  2009/01/13  Add forums.thinkbroadband.com to recognised sites
//      0.0.12  2009/02/04  Do not munge <pre> nodes - not required any more.
//      0.0.13  2011/06/15  Add Gary's patch to correct avatar placement.
//                          Rename to ThinkBroadband.
//
//	Mozilla Greasemonkey script to break up long words and URLs
//	in ThinkBroadband forums (was ADLSGuide).
//
*/
// ==UserScript==
// @name          ThinkBroadband
// @namespace     http://www.micksharpe.com/
// @description   Munges ThinkBroadband forums - version 0.0.13
// @include       http://forums.thinkbroadband.com/*
// ==/UserScript==

(function() {
	const minWordLength      = 20;
	const splitLength        = 10;
	const wordBreak          = "<wbr>";
	const hairSpace          = "\u200A";
	const zeroWidthNonJoiner = "\u200C";
	
	const revealBreaks       = false;
		
	window.addEventListener ("load", eventListener, false);
	
	function eventListener (e) {
		var startTime   = new Date();
		
		addGlobalStyle (
			'img.greasemonkey { '
			+ ' float: right;'
			+ ' clear: right;'
			+ ' margin: 5px;'
			+ ' max-width: 200px;'
			+ ' border-width: 1px;'
			+ ' border-style: solid;'
			+ ' }'
			);
	
		addGlobalStyle (
			'object.youtube { '
			+ ' display: block;'
			+ ' margin: 0px auto;'
			+ ' }'
			);
	
		addGlobalStyle (
			'a.greasemonkey:link, a.greasemonkey:visited  { '
			+ ' color: black;'
			+ ' }'
			);
	
		addGlobalStyle (
			'img.sideavatar { '
			+ ' max-width: 90%;'
			+ ' margin-left: 5%;'
			+ ' margin-right: 5%;'
			+ ' margin-top: 5px;'
			+ ' margin-bottom: 5px;'
			+ ' }'
			);
	
		addGlobalStyle (
			'img.topavatar { '
			+ ' max-height: 60px;'
			+ ' }'
			);
	
		addGlobalStyle (
			'p.post, p.small { '
			+ ' clear: both;'
			+ ' }'
			);
			
		var rootNode = getNode (document,
			"/html[1]/body[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/table[1]" +
			"/tbody[1]/tr[1]/td[1]/center[1]/table[1]/tbody[1]/tr[1]/td[1]/p[1]");
			
		if (rootNode) {
			rootNode.setAttribute("id", "rootNode");
		}
	
		processTextNodes (rootNode);
		//  processPreNodes (rootNode);
		processAnchors (rootNode);
		
		// Calculate and display the elapsed time in the status bar
		var endTime = new Date();
		var elapsedTime = endTime.getTime() - startTime.getTime();
		setStatus ("Elapsed time: " + elapsedTime + " milliseconds");
	}
	
	function processTextNodes (rootNode) {
		var urlPattern  = /([\.\,\+\/\&\=\?]|%..)(?=.)/g;
//		var wordPattern = /([\.\,\:]|.{10})(?=.)/g;
		var wordPattern = /(\W|\w{10})(?=.)/g;

		// Collect all text nodes belonging to paragraphs having class="post"
		// Version 0.0.12 - collect only text nodes that are immediate descendants
		// of p.post nodes
		var textNodes = getNodeSet (document,
			"//p[@class='post']/text() | " +
			"//tr[@class='lighttable' or @class='darktable']/td[1]/a/text()");
	
		for ( var i = 0; i < textNodes.snapshotLength; i++ ) {
			var textNode = textNodes.snapshotItem(i);
			
//			consoleMessage ("Analysing element: " + textNode.nodeValue);
			
			var words = textNode.nodeValue.split(/\s+/);
			
			var modified = false;
		
			for ( var j = 0; j < words.length; j++ ) {
				var word = words[j];
				
				if ( word.length >= minWordLength ) {
					if ( isURL (word) ) {
						words[j] = word.replace (urlPattern, "$1" + wordBreak);
					} else {
						words[j] = word.replace (wordPattern, "$1" + wordBreak);
					}
					
					modified = true;
				}
			}
			
			if ( modified ) {
				var parts = words.join (" ").split (wordBreak);
				
				var newNode = document.createElement ("span");
				
				for ( j = 0; j < parts.length - 1; j++ ) {
					newNode.appendChild (document.createTextNode (parts[j] +
						(revealBreaks ? zeroWidthNonJoiner : "")));
					newNode.appendChild (document.createElement ("wbr"));
				}
				
				// Since adding <wbr> tags does not cause the document to be
				// re-rendered, we append a hair space to force this action
				newNode.appendChild (document.createTextNode (parts[j] + hairSpace));
				
				// replaceNode is not implemented, so we must use relaceChild
				textNode.parentNode.replaceChild (newNode, textNode);
			}
		}
	}
	
	function processPreNodes (rootNode) {
		var preNodes = getNodeSet (document,
			"//td[@class='readpost' or @class='readpost-new']//pre//br");
	
//		consoleMessage ("Found " + preNodes.snapshotLength + " breaks in <pre> node");

		for ( var i = 0; i < preNodes.snapshotLength; i++ ) {
			var preNode = preNodes.snapshotItem(i);
			preNode.parentNode.removeChild (preNode);
		}
	}
	
	function processAnchors (rootNode) {
		var anchors = getNodeSet (document,
			"//td[@class='readpost' or @class='readpost-new']//a"
			+ " | "
//			+ "//td[@class='tableborders' and position()=1]"
//			+ "//tr[@class='lighttable' and position()=2]"
//			+ "//td[@class='tableborders' and position()=1]"
//			+ "//tr[@class='lighttable' and position()=2]"
//			+ "//tr[2]//a"
			+ "//tr[@class='lighttable']/td/a"
			);
	
		consoleMessage ("Found " + anchors.snapshotLength +	" anchors");

		for ( var i = anchors.snapshotLength - 1; i >= 0 ; i-- ) {
			var thisNode = anchors.snapshotItem(i);
			var href = thisNode.getAttribute("href");
			thisNode.setAttribute("class", "thisnode");
			
			try {
				if ( isYouTubeURL (href) ) {
				    var obj = document.createElement ("object");
				    obj.setAttribute ("class", "youtube");
				    obj.setAttribute ("width", "360");
				    obj.setAttribute ("height", "300");
				    obj.setAttribute ("data", href.replace(/watch\?v=/i, "/v/"));
				    var param = document.createElement ("param");
				    param.setAttribute ("name", "wmode");
				    param.setAttribute ("value", "transparent");
				    obj.appendChild (param);
				    // replaceNode is not implemented, so we must use relaceChild
				    thisNode.parentNode.replaceChild (obj, thisNode);
				 } else if ( isImage (href) ) {
					var newImage = document.createElement ("img");
					newImage.setAttribute ("src", href);
			
					if ( isAvatar (href) ) {
						consoleMessage ("avatar: " + href);
						var headerNode = getNode (thisNode,
							"ancestor::tr[1]/preceding-sibling::tr[1]/td[1]");
							
						switch ( getPostFormat (headerNode) ) {
						case "Side":
							newImage.setAttribute ("class", "sideavatar");
							var newDiv = document.createElement ("tr");
							newDiv.setAttribute ("align", "center");
							newDiv.appendChild (newImage);
							var intraNode = getNode (headerNode, "table//tr[2]");
							intraNode.parentNode.insertBefore (newDiv, intraNode);
							break;
							
						case "Top":
							newImage.setAttribute ("class", "topavatar");
							var newCell = document.createElement("td");
							newCell.setAttribute ("rowspan", "3");
							newCell.appendChild (newImage);
							var intraNode = getNode (headerNode,
								"table//tr[1]//td[3]");
							intraNode.parentNode.insertBefore (newCell, intraNode);
							break;
						}
					} else {
						consoleMessage ("inline: " + href);
						newImage.setAttribute ("class", "greasemonkey");
						var newLink = document.createElement ("a");
						newLink.setAttribute ("class", "greasemonkey");
						newLink.setAttribute ("target", "_blank");
						newLink.setAttribute ("href", href);
						newLink.appendChild (newImage);
//						var superNode = getNode (thisNode, "ancestor::td[1]");
						var superNode = thisNode.parentNode;
						superNode.insertBefore (newLink, superNode.firstChild);
					}
				}
			} catch (error) {
				consoleMessage ("thisNode.href = <" + href + ">");
				thisNode.setAttribute ("class", "badnode");	// mark node for DOM inspector lookup
				consoleMessage (error.message);
			}
		}
	}
	
	function getNode (context, xpath) {
		var nodeset = document.evaluate (xpath, context, null,
			XPathResult.ANY_UNORDERED_NODE_TYPE, null);
		var target  = nodeset.singleNodeValue;
//		consoleMessage ("getNode (" + context.tagName + ", " + xpath + ") = " + target.tagName);
		return target;
	}
	
	function getNodeSet (context, xpath) {
		return document.evaluate (xpath, context, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	
	function findNode (path, context) {
		var pathList = path.split(/\//g);
		
		for (var i = 0; i < pathList.length; i++) {
			var matchList = pathList[i].match(/(\w+)(\[(.+)\])?/);
			var tagName   = matchList[1];
			var predicate = matchList[2];
			var newContext = context.getElementsByTagName (tagName);
		}
	}
	
	function getPostFormat (node) {
		var klass   = node.getAttribute ("class");
		var rowspan = node.getAttribute ("rowspan");
		var format;
		
		if ( klass !== undefined && klass == "subjecttable" ) {
			format = "Preview";
		} else if ( rowspan !== undefined && rowspan == "2" ) {
			format = "Side";
		} else {
			format = "Top";
		}
		
		consoleMessage ("Post format = " + format);
		
		return format;
	}
	
	function isImage (href) {
		return /\.(gif|jpeg|jpg|png)(\?.*)?$/i.test (href);
	}
	
	function isAvatar (href) {
		return /\.(gif|jpeg|jpg|png)\?avatar$/i.test (href);
	}
	
	function isURL (word) {
		return /\//.test (word);          // ****** KLUDGE ******
	}
	
	function isYouTubeURL (href) {
	   return /http:\/\/(www.)?youtube.com\/watch\?v=\w+/i.test (href);
	}
	
	function setStatus (message) {
		window.status = message;
	}
	
	function consoleMessage (message) {
		if ( GM_log ) {
			GM_log (message);
		} else {
			// Use this kludge if GM_log is unavailable
 			setTimeout (function(){throw(message)}, 0);
		}
	}
	
	function addGlobalStyle (css) {
    	var head, style;
    	head = document.getElementsByTagName('head')[0];
    	if ( !head ) { return; }
    	style = document.createElement ('style');
    	style.type = 'text/css';
    	style.innerHTML = css;
    	head.appendChild (style);
	}
})();


