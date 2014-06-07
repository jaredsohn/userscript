// ==UserScript==
// @name       WF - For the Blind
// @namespace  http://war-facts.com
// @version    0.0
// @description  This will make the "Switch Fleet" link a little larger for those who are blind.
// @match      http://*.war-facts.com/fleet.php*
// @copyright  2012+, Me
// ==/UserScript==

var linkNode = document.evaluate("//a[text()[contains(.,'Switch Fleet')]]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var linkText = linkNode.iterateNext();
linkText.style.fontSize = "15px";