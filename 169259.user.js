// ==UserScript==
// @name          Show Password 
// @namespace     
// @include       *
// @description	  Show password when double clicking  on password field
// @version       1.0
// ==/UserScript==
//
// Created by ProgramAngel


// add a CSS rule (simpler way, using smarter CSS selector)
// To javascript 'was-password' isn't a known type value and so javascriptwill report the value as 'text' but to CSS it is still 'was-password'
GM_addStyle("input[type='was-password'] { border-style:solid!important; border-color:red!important;}");
	
//window.addEventListener("load", function(e) {
	var inputs, input;
	inputs = document.evaluate(
		"//input[@type]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(var i = 0; input = inputs.snapshotItem(i); i++) {
		if(input.type.toLowerCase() == "password")//the browser isn't case sensative but xpath is ~_~ no biggy
		{
			input.addEventListener('dblclick', show, false);
			input.addEventListener('blur', hide, false);
		}
	}
//}, false);

function show(event)
{
	this.type = (this.type=='password')?'was-password':'password';
	this.select();
}
function hide(event)
{
	if(this.type != 'password')
		this.type = 'password';
}