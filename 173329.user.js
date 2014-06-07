// ==UserScript==
// @name       ByeBye TheAge Subscription
// @namespace  http:///
// @version    0.1
// @description  This will delete the subscription DIV that The Age uses for subscriptions.
// @match      http://www.theage.com.au/*
// @match      http://theage.drive.com.au/*
// @match      http://theage.domain.com.au/*
// @copyright  2013+, epis0de666
// ==/UserScript==

var node = document.getElementById("subscription-overlay");
if (node.parentNode) {

  node.parentNode.removeChild(node);
    
}
