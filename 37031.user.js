// ==UserScript==
// @name           JavaScript Performance Tester (by operations)
// @namespace      http://userscripts.org/users/23652
// @description    Measures and compares 2 functions that you define in the script
// @include        http://*.*/*
// @include        https://*.*/*
// @include        file://*
// @copyright      JoeSimmons
// @version        1.0.5
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @run-at         document-start
// @require    http://usocheckup.dune.net/37031.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

(function(){ // anonymous function wrapper

// Quit if not Greasemonkey
if(typeof GM_info === "undefined" || typeof GM_registerMenuCommand === "undefined" || typeof window.opera !== "undefined" || typeof window.chrome !== "undefined") throw "Not running Greasemonkey. Now exiting.";

// Add user script command
GM_registerMenuCommand("Run Performance Test", main);


////////////////////////////////////////////////////////////////////////////////////////////////


// (user settings)
var auto_test_on_page_load = false; // automatically test when the page is done loading?
var gMaxTime = 5; // max time in seconds (total) to test for




// Preparation code goes here
function preparationCode() {

	// code here
	// use global variable syntax because the other perf testing funcs need access

}




// DEFINE FUNCTION 1 HERE
function function1() {

	// testing concatenation
	return "Hello" + " World";

}

// DEFINE FUNCTION 2 HERE
function function2() {

	// testing Array.join("")
	return ["Hello", " World"].join("");

}


////////////////////////////////////////////////////////////////////////////////////////////////




/* CHANGELOG ////////////////////////////////

1.0.5
	- graphical improvements once again
	- added a user script command
	- script quits if it's not run in Greasemonkey
	- added option to automatically run the test when the page loads (any page)
	- added option to specify the total testing time of both functions combined (default 5)
	- added feature so that if the script is run on a local perf.html (on your pc), it will automatically run the test regardless of the new auto setting

1.0.4
	- changed the judgement system from # of loops to # of operations over time, requiring no user input besides the changing of the functions
	- lots of graphical improvements

*/ //////////////////////////////////////////



///////// NO EDITING BELOW HERE /////////////////////////////////////

// Make sure the page is not in a frame
if(window.self !== window.top) return;

function hide() {
	var me = document.getElementById("measure-exec");
	if(me !== null) me.style.display = "none";
}

// Define GM_addStyle if it's undefined
var GM_addStyle = (typeof GM_addStyle !== "undefined" ? GM_addStyle : function(css) {
    var head = document.getElementsByTagName('head'), style = document.createElement('style');
    if(head.length !== 0 && (head=head[0])) {
		style.setAttribute("type",  "text/css");
		if(typeof style.innerHTML !== "undefined") style.innerHTML = css;
			else if(style.textContent !== "undefined") style.textContent = css;
			else if(style.innerText !== "undefined") style.innerText = css;
		head.appendChild(style);
		return true;
	} else return false;
});

function addCommas(nStr) {
	nStr += "";
	var x = nStr.split("."),
	x1 = x[0],
	x2 = x.length > 1 ? "." + x[1] : "",
	rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, "$1" + "," + "$2");
	}
	return x1 + x2;
}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,type,target".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0, l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

function measure1() {
	var time=new Date().getTime(), maxTime = ((gMaxTime / 2) * 1000), o = 0;
	do {
		function1();
		o++;
	} while((new Date().getTime() - time) < maxTime);
	return o;
}

function measure2() {
	var time=new Date().getTime(), maxTime = ((gMaxTime / 2) * 1000), o = 0;
	do {
		function2();
		o++;
	} while((new Date().getTime() - time) < maxTime);
	return o;
}

function measure() {

	var before_time = new Date().getTime(),
		op1 = measure1(),
		op2 = measure2(),
		diff = (new Date().getTime()) - before_time,
		ta = document.getElementById("measure-exec"),
		header = document.getElementById("measure-header"),
		info = document.getElementById("measure-info"),
		c1 = document.getElementById("measure-code-1"),
		c2 = document.getElementById("measure-code-2"),
		m1 = document.getElementById("margin-1"),
		m2 = document.getElementById("margin-2"),
		speed = (op1 > op2 ? "faster" : "slower"),
		speed2 = (op2 > op1 ? "faster" : "slower"),
		percent = Math.round(((speed == "faster" ? (op1 / op2) : (op2 / op1)) * 100) - 100),
		result = "Function 1 is " + percent + "% " + speed;
	
	result += " than Function 2<br>" +
			  gMaxTime.toFixed(2) + " seconds were elapsed in total.<br>" +
			  "Function 1 # of Operations: " + addCommas(op1) + "<br>" +
			  "Function 2 # of Operations: " + addCommas(op2);
	
	header.innerHTML = "~ Test Results ~";
	
	info.innerHTML = result;
	
	// add the code to the functions' textareas
	c1.value = function1.toString();
	c2.value = function2.toString();
	
	// make the faster function's textarea green and the slower red
	c1.style.borderColor = (speed === "faster" ? "#00CC00" : "#D20000");
	c2.style.borderColor = (speed === "slower" ? "#00CC00" : "#D20000");
	
	// add a tooltip to the functions' textareas noting the speed margin
	// then add the same text right above the textareas
	var title1 = speed.charAt(0).toUpperCase() + speed.substring(1) + " by " + percent + "%",
		title2 = speed2.charAt(0).toUpperCase() + speed2.substring(1) + " by " + percent + "%";
	c1.setAttribute("title", title1);
	c2.setAttribute("title", title2);
	m1.textContent = title1;
	m2.textContent = title2;

	info.innerHTML = result;

}

function main() {

	preparationCode();

	GM_addStyle(
		"#measure-exec * {" +
			"\n\tdisplay: inline-block;" +
			"\n\tfont-family: sans-serif, arial;" +
		"\n}\n\n" +
		"#measure-exec *:not(textarea):not(#measure-header):not(#measure-info) {\n\t" +
			"font-size: 13px;" +
		"\n}\n\n" +
		"#measure-exec *:not(textarea) {\n\t" +
			"text-align: center;" +
		"\n}\n\n" +
		"#measure-exec #measure-header {\n\t" +
			"font-size: 22px;" +
		"\n}" +
		"#measure-exec textarea {\n\t" +
			"font-size: 11px;" +
		"\n}"
	);

	document.body.appendChild(
		create("div", {id: "measure-exec", style: "width: 80%; height: 60%; padding: 14px; position: fixed; bottom: 20%; left: 10%; border: 3px ridge #007BB7; z-index: 999999; background-color: #E8F8FF; color: #000000; border-radius: 14px;"}, [
			create("div", {style: "width: 100%; height: 2%; display: block;"}),
			create("div", {id: "measure-header", style: "width: 100%; height: 10%; font-size: 22px; font-weight: bold;"}, [
				create("text", "Testing, please wait...")
			]),
			create("div", {style: "width: 100%; height: 16%;"}, [
				create("button", {onclick: hide, style: "font-size: 14px;"}, [
					create("text", "Close")
				])
			]),
			create("div", {id: "measure-info", style: "width: 100%; height: 18%; text-shadow: 0 0 6px #C0C0C0; font-size: 14px;"}),
			create("div", {id: "margin-holder", style: "width: 100%; height: 10%;"}, [
				create("div", {style: "width: 100%; height: 50%;"}, [
					create("text", " ")
				]),
				create("div", {id: "margin-1", style: "width: 50%; font-size: 13px;"}),
				create("div", {id: "margin-2", style: "width: 50%; font-size: 13px;"})
			]),
			create("div", {style: "height: 44%; display: block;"}, [
				create("div", {style: "height: 80%; width: 48%; text-align: right; padding-right: 2%;"}, [
					create("textarea", {id: "measure-code-1", style: "width: 100%; height: 100%; border: 2px ridge #BBBBBB; border-radius: 8px; padding: 8px;"})
				]),
				create("div", {style: "height: 80%; width: 48%; text-align: left; padding-left: 2%;"}, [
					create("textarea", {id: "measure-code-2", style: "width: 100%; height: 100%; border: 2px ridge #BBBBBB; border-radius: 8px; padding: 8px;"})
				])
			])
		])
	);

	window.setTimeout(measure, 250);

}

// auto run if setting is enabled or on the page "perf.html"
if(auto_test_on_page_load === true || (window.location.protocol === "file:" && /\/perf\.html?$/i.test(window.location.href))) window.addEventListener("load", main, false);

})(); // anonymous end