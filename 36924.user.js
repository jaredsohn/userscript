// ==UserScript==
// @name 			Show Editable Subject
// @description	 Always show editable subject field when replying to a message in Gmail.
// @include			http://mail.google.com/*
// @include			https://mail.google.com/*
// @author			Gina Trapani
// @namespace  http://lifehacker.com/5060791/always-show-the-subject-line-when-composing-a-gmail-reply
// @version			0.1
// ==/UserScript==


// Version 0.1: Released

// Borrowed some keyhandler code from http://bitterpill.org/gmail_tinyurl/
// Repurposed some code from http://userscripts.org/scripts/review/20887
// Based on  mathmike's the Show Details  user script http://userscripts.org/scripts/show/13700
// mathmike: Most of the functions below were borrowed from Gmail Macros (New)


var CLICK_TO_SHOW = "MRoIub";
var INNER_HTML = "Edit Subject"
var KEYCOMBO_ONLY=false;
var THIRD_KEYCODE=69; 

var gmail = null;

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(g) {
      gmail = g;
 
 	if (KEYCOMBO_ONLY) {
	    getDoc().defaultView.addEventListener('keydown', keyHandler, false);
	} else {
		gmail.registerViewChangeCallback(handleView);
		handleView();
	}
    });
  }
}, true);

function getDoc() {
 return gmail.getNavPaneElement().ownerDocument;
}

function keyHandler(event) {
	//GM_log(event.ctrlKey + ' ' + event.shiftKey + ' ' + event.keyCode);
	if (event.ctrlKey == true && event.shiftKey == true && event.keyCode == THIRD_KEYCODE) { 
		 clickSpan();
	}
}

function handleView() {
     //if (gmail.getActiveViewType() == "co") clickSpan();  //Compose view
      if (gmail.getActiveViewType()=="cv") tryToClickSpan();  //Conversation view, user may hit Reply link
}

function clickSpan() {
  var nodes = 
    getNodesByTagNameAndClass(gmail.getActiveViewElement(), "span", CLICK_TO_SHOW);
  if (!nodes) return false;
  for (var i in nodes) {
	  //GM_log("Node " + i + " HTML is " + nodes[i].innerHTML );
	  if (nodes[i].innerHTML == INNER_HTML){
		simulateClick(nodes[i], "click");
		return true;
	  }
	}
}

function simulateClick(node, eventType) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent(eventType,
                       true, // can bubble
                       true, // cancellable
                       node.ownerDocument.defaultView,
                       1, // clicks
                       50, 50, // screen coordinates
                       50, 50, // client coordinates
                       false, false, false, false, // control/alt/shift/meta
                       0, // button,
                       node);

  node.dispatchEvent(event);
}

function getNodesByTagNameAndClass(rootNode, tagName, className) {
  var expression = 
      ".//" + tagName + 
      "[contains(concat(' ', @class, ' '), ' " + className + " ')]";
  
  return evalXPath(expression, rootNode);
}

function evalXPath(expression, rootNode) {
  try {
    var xpathIterator = rootNode.ownerDocument.evaluate(
      expression,
      rootNode,
      null, // no namespace resolver
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null); // no existing results
  } catch (err) {
    GM_log("Error when evaluating XPath expression '" + expression + "'" +
           ": " + err);
    return null;
  }
  var results = [];

  // Convert result to JS array
  for (var xpathNode = xpathIterator.iterateNext();
       xpathNode;
       xpathNode = xpathIterator.iterateNext()) {
    results.push(xpathNode);
  }
    
  return results;
}

function tryToClickSpan()  {
		if (!clickSpan() ) {
			setTimeout(tryToClickSpan, 500);
		}
}


