// ==UserScript==
// @name          Quora Answer Deblur
// @description	  Lets you read the blurred answers without logging in.
// @author        TurplePurtle
// @version       1
// @include       *.quora.com/*
// ==/UserScript==

function getEl (s, a) { return document["querySelector"+(a?"All":"")](s) }
function removeNode (n) { n.parentNode.removeChild(n) }
var forEach = Array.prototype.forEach;

removeNode(getEl(".signup_cta_on_answer"));
forEach.call(getEl(".text_hider", true), removeNode);
forEach.call(getEl(".blurred_answer", true), function(el) {
	el.className = el.className.replace("blurred_answer", "");
});
