// ==UserScript==
// @author      Jan Bunschoten
// @version     1.0.2
// @name        dudesnude_MessageLoader
// @namespace   http://www.dudesnude.com/userscripts
// @description Sends a request to check for new messages every 10 seconds and highlights the number of new messages.
// @include     http://www.dudesnude.com/*
/* StartHistory

v1.0.2 - 08 Nov 2008
 - clean up code

v1.0.1 - 06 Nov 2008
 - first release

EndHistory */
// ==/UserScript==

/**
 * Returns one DOM element matching the given XPath expression
 * @param  XPath       XPath expression to find that element
 * @param  contextNode context node (default = current document)
 * @return the element if found, null otherwise
 */
document.getElementByXPath = function(XPath, contextNode) {
	var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	return (a.shapshotLength ? a.snapshotItem(0) : null);
}

/**
 * Returns all DOM elements matching the given XPath expression
 * @param  XPath       XPath expression to find the elements
 * @param  contextNode context node (default = current document)
 * @return an array of all matching elements
 */
document.getElementsByXPath = function(XPath, contextNode) {
	var elements = [], i = 0;
	var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	while (a.snapshotItem(i)) {
		elements.push(a.snapshotItem(i++));
	}
	return elements;
}

/**
 * Binds that given object to the function
 * @param  object object to bind
 * @return the function
 */
Function.prototype.bind = function(object) {
	var __method = this;
	return function() {
		__method.apply(object, arguments);
	}
}

/**
 * Repeats the current string 'n' times
 * @param  n number of repetations
 * @return repeated string
 */
String.prototype.repeat = function(n) {
	return new Array(n + 1).join(this);
}

/**
 * Returns the current string as a number
 * @return the current string as number or 0, if it is not a number
 */
String.prototype.retNum = function() {
	return (isNaN(this) ? 0 : (+this));
}

/** Processing of the current page. */
var UIL = {
	scriptName : "dudesnude_MessageLoader",
	scriptVersion : "1.0.2",
	scriptId : "38208",
	
	/**
	 * Processes the current page
	 */
	init : function() {
		this.checkInterval = 10000;  //TODO: make configurable
		
		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			if (links[i].innerHTML == 'messages') {
				this.targetUri = links[i].href;
				this.messageIndicator = links[i];
				break;
			}
		}
		
		setInterval(this.checkMessages, this.checkInterval);
		this.checkMessages();
	},
	
	/**
	 * Highlights the number of new unread messages
	 * @param  n number of new messages (default = 0)
	 */
	setMessageHighlight : function(n) {
		if (this.messageIndicator) {
			if (n) {
				this.messageIndicator.style['backgroundColor'] = '#d00000';
				this.messageIndicator.style['color'] = 'white';
				if (n == 1)
					this.messageIndicator.innerHTML = '1&nbsp;message';
				else
					this.messageIndicator.innerHTML = n + '&nbsp;messages';
			} else {
				this.messageIndicator.style['backgroundColor'] = 'auto';
				this.messageIndicator.style['color'] = 'auto';
				this.messageIndicator.innerHTML = '0&nbsp;messages';
			}
		}
	},
	
	/**
	 * Checks for new unread messages
	 */
	checkMessages : function() {
		if (!this.targetUri || !this.messageIndicator) return;
		
		// send AJAX-like request to query for new messages:
		var request = new XMLHttpRequest();
		var url = this.targetUri;
		request.open('GET', url, true);
		request.onreadystatechange = function(event) {
			if (request.readyState == 4 && request.status == 200) {
				var body = document.createElement('body');
				var response = request.responseText;
				if (response && response.length > 0) {
					
					// extract HTML body from the response:
					var x = 0, y = 0;
					x = response.indexOf('<body');
					x = response.indexOf('>', x);
					y = response.lastIndexOf('</body>');
					body.innerHTML = response.slice(x + 1, y);
					
					// count number of new messages:
					var messages = 0;
					var list = document.getElementsByXPath("//span[@class='hlight']", body);
					for (var i = 0; i < list.length; i++)
						if (list[i].innerHTML.substring(0, 3) == 'New')
							messages++;
					
					// highlight new messages:
					this.setMessageHighlight(messages);
				}
			}
		}.bind(this);
		request.send(null);
	}
};

UIL.init();
