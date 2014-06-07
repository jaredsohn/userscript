// ==UserScript==
// @name           avg's functions
// @namespace      #aVg
// @description    Do not install! This is simply a listing of common functions I use in 99% of my scripts. Versioning changes due to updates in either documentation or code.
// @version        0.1.8
// ==/UserScript==

/*
	Copy-pasta section. This is the basic outline of a script, all ready to go. Upon completing
	a script, I usually erase the functions I did not use (which are usually $ and Element).
	
	Scroll down past this section to find documentation for each function. Please note that you are free to use these
	functions as you will. The license block appearing below does not apply to these functions; it is simply
	to make creating scripts easier for me.
	
	At the very bottom of this file are functions which I rarely use in scripts, if ever. So far, they are:
		function click()
		function XHR(A)
*/

// ==UserScript==
// @name           Name
// @namespace      #aVg
// @description    This script fixes and cleans up 
// @include        http://www.*
// @version        0.1
// @license        Creative Commons (Attribution-Noncommercial-No Derivative Works) 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
if(self!=top) return;
function Element(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0) A.addEventListener(b.substring(2), cur, false);
		else if(b.charAt(0)=="@") A.setAttribute(b.substring(1), B[b]);
		else A[b]=B[b];
	}
	if(C) for each(var c in C) A.appendChild(c);
	return A;
}
function $(A) {return document.getElementById(A)}
function single() {if(arguments.length==2 && !arguments[1]) return;return document.evaluate("." + arguments[0], arguments[1] || document.body, null, 9, null).singleNodeValue}
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
var loc = location.pathname.substring(1);
if(loc=="") alert("Hello World, from the homepage!");


/* 
	PHIlOSOPHY
	
	Basic:
		DRY (Don't Repeat Yourself), YAGNI (You Ain't Gonna Need It), KISS (Keep it Simple, Stupid)

	More specific:
		My functions are intended for reducing the amount of code while
		keeping it simple (stupid). For example, I do not overload functions
		unnecessarily or add argument checking. You need to know what arguments
		are needed yourself.
*/

/*
	Name:
		Element constructor.
	Purpose:
		Provide a way to create DOM elements without storing them into arrays.
	Syntax:
		new Element(string type, *object properties, *array children);
	Notes:
		Specify events with "on", raw HTML attributes with "@" and anything else
		will be interpreted as a JavaScript object property.
	Example:
		new Element("a", {
			href : "http://www.example.com/",
			textContent : "Hello",
			"@style" : "color:white;background-color:black",
			onclick : function(e) {
				e.preventDefault();
				alert(this.innerHTML);
			}
		});
*/

function Element(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0) A.addEventListener(b.substring(2), cur, false);
		else if(b.charAt(0)=="@") A.setAttribute(b.substring(1), B[b]);
		else A[b]=B[b];
	}
	if(C) for each(var c in C) A.appendChild(c);
	return A;
}

/*
	Name:
		Shortcut to document.getElementById.
	Purpose:
		Provide shortcut to the frequently used, popular document.getElementById.
	Syntax:
		$(string id);
	Example:
		$("example");
*/

function $(A) {return document.getElementById(A)}

/*
	XPath philosophy: You're doing one of two things: getting a single node, or
	doing the same thing to a bunch of nodes. So I've made two separate functions,
	"single" and "loop" (rather than super-overloading a function).
	
	Both functions never require "." to indicate starting from a specified
	node. Also, neither function works from <head>, but rather from <body>,
	because I cannot think of a case where this is necessary by XPath.
*/

/*
	Name:
		Single XPath node.
	Purpose:
		The primary XPath necessity: grabbing one element. If the supplied reference
		node  is invalid, a null will be returned. (Helpful when blindly chaining
		with the remove function).
	Syntax:
		single(string expression, *element reference);
	Examples:
		single("//div[@class='leaderboard']");
		single("//li[@class='external']", someMenu);
*/

function single() {if(arguments.length==2 && !arguments[1]) return;return document.evaluate("." + arguments[0], arguments[1] || document.body, null, 9, null).singleNodeValue}

/*
	Name:
		Handle multiple XPath nodes.
	Purpose:
		The other XPath necessity. Note that functions access elements
		via the "this" keyword. Remove the ".apply" if you wish (as I
		often do).
	Syntax:
		loop(string expression, function handler, *element reference);
	Examples:
		loop("//a[@rel='external']", function() {
			this.innerHTML += " (external)";
		});
		loop("//li", function() {
			this.textContent = this.title;
		}, someMenu);
*/

function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}

/*
	Name:
		Element remover
	Purpose:
		To provide a way of deleting elements. In concurrence with the
		other element grabbing functions, there is zero need for
		storing temporary variables. Also makes sure the element exists,
		which keeps the script from breaking on websites which
		update frequently. Also chainable for cool-looking syntax.
	Syntax;
		remove(*element which);
	Example:
		remove(single("//div[@class='links']"))($("example"));

*/
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}

/*
	Supplemental functions, which are rarely used, mainly when being lazy.
*/
function click(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("click", true, true);
	A.dispatchEvent(B);
}
/*
	A layer built on top of GM_xmlhttpRequest, which highly improves
	the usability of this frequently used function.
	
	Two changes.
	
	1) POST requests have the annoying Content-Type header set by default,
	unless you specify one.
	2) "data" can be taken as an object instead of a string.
*/
function XHR(A) {
	if(!("method" in A)) A.method = "GET";
	else if("method"=="POST" && !("Content-Type" in A.headers)) A.headers["Content-Type"] = "application x-www-form-urlencoded";
	if(("data" in A) && typeof A.data == "object") {
		var params = "";
		for(var a in A.data) params +="&"+a + "=" + encodeURIComponent(A.data[a]);
		A.data = params.substring(1);
	}
	GM_xmlhttpRequest(A);
}