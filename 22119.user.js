// Vass Marks
// version 0.1 BETA!
// 2008-02-01
// Copyright (c) 2008, Michael Berg
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Vass Marks", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Vass Marks
// @description	Adds inline bookmarking capabilities to webpages
// @include       *
// ==/UserScript==

function VassMark_LL_Node(nodeVal, sortVal) { this.init(nodeVal, sortVal); }			//LinkedList Node
function VassMarker() {this.init(); }													//The VassMarker Class
function VassMark(name, location) { this.init(name, location); }						//The VassMark Class

VassMark.checkSize = 5;
VassMark.checkColor = "#FF0000";

VassMark_LL_Node.prototype.init = function(nodeVal, sortVal) {
	this.value = nodeVal;
	this.sortVal = sortVal;
	this.nextNode = null;
}

VassMark.prototype.init = function(name, location) {
	if (name == null || location == null) 	
		throw "Error! No Bookmark name or location specified";
		
	this.Name = name;
	this.ScrollLocation = location;
	this.initArrowDivs(location);
}

VassMark.prototype.initArrowDivs = function(location) {
	//Refactor me!
	var arrowTop = document.createElement('div');
	var arrowBottom = document.createElement('div');
	
	arrowTop.style.position = "absolute";
	arrowTop.style.top = location + "px";
	arrowTop.style.left = (window.innerWidth-23)+"px";
	arrowTop.style.borderLeft = VassMark.checkSize + "px solid " + VassMark.checkColor;
	arrowTop.style.borderTop = VassMark.checkSize + "px solid transparent";
	arrowTop.style.height = "0px";
	arrowTop.style.width = "0px";
	
	arrowBottom.style.position = "absolute";
	arrowBottom.style.left = (window.innerWidth-23)+"px";
	arrowBottom.style.top = (location+VassMark.checkSize) + "px";
	arrowBottom.style.borderTop = VassMark.checkSize + "px solid " + VassMark.checkColor;
	arrowBottom.style.borderRight = VassMark.checkSize + "px solid transparent";
	arrowBottom.style.height = "0px";
	arrowBottom.style.width = "0px";
	
	this.arrowElement = [arrowTop, arrowBottom];
	
	document.body.appendChild(arrowTop);
	document.body.appendChild(arrowBottom);
}

VassMarker.prototype.init = function() {
	this.rootNode = null;
	this.lastID=0;
		
	document.addEventListener('keypress',function(event) { __vassmark_system.handleKey(event); },true);
	window.addEventListener('resize',function(event) { __vassmark_system.handleResize(event); },true);
}

VassMarker.prototype.addBookmark = function() {
	var newNode = new VassMark_LL_Node(new VassMark("BookMark"+this.lastID, window.scrollY ? window.scrollY : document.documentElement.scrollTop), window.scrollY ? window.scrollY : document.documentElement.scrollTop);
	
	if (this.rootNode == null) 
		this.rootNode = newNode;
	else if (newNode.sortVal < this.rootNode.sortVal) {
		newNode.nextNode = this.rootNode;
		this.rootNode = newNode;
	}
	else {
		curNode = this.rootNode;
		while (curNode.nextNode != null && !(newNode.sortVal > curNode.sortVal && newNode.sortVal < curNode.nextNode.sortVal))
			curNode=curNode.nextNode;
		
		if (curNode.nextNode != null)
			newNode.nextNode = curNode.nextNode
			
		curNode.nextNode = newNode;
	}
	
	this.lastID++;
}

VassMarker.prototype.moveToBookmark = function (movedown) {
	var curPos = (window.scrollY ? window.scrollY : document.documentElement.scrollTop)+(movedown ? 1 : -1);
	
	if (this.rootNode == null)
		return;
		
	var curNode=this.rootNode;
	
	if (curPos > this.rootNode.sortVal) {
		while (curNode.nextNode != null && 
			   !(curPos > curNode.sortVal && (curPos < curNode.nextNode.sortVal)))
			curNode=curNode.nextNode;
	}
	
	if (curNode.nextNode != null && movedown)
		curNode = curNode.nextNode;
	
	window.scrollTo(window.scrollX, curNode.value.ScrollLocation);
}

VassMarker.prototype.moveNext = function() {
	this.moveToBookmark(true);
}

VassMarker.prototype.movePrev = function() {
	this.moveToBookmark(false);
}

VassMarker.prototype.handleResize =  function(evt) {
	var curNode = this.rootNode;
	
	while (curNode != null) {
		curNode.value.arrowElement[0].style.left = (window.innerWidth-23)+"px";
		curNode.value.arrowElement[1].style.left = (window.innerWidth-23)+"px";
		curNode=curNode.nextNode;
	}
}

VassMarker.prototype.handleKey = function(evt) {
	var e = (window.event) ? window.event : evt;
	
	if (!e.ctrlKey || !e.shiftKey)
		return;
	
	var keyNum = (window.event ? e.keyCode : e.which);
	
	switch (keyNum) {
		case 88:
			this.moveNext();
			break;
		case 90:
			this.movePrev();
			break;
		case 66:
			this.addBookmark();
			break;
	}
}

var __vassmark_system = new VassMarker();

//document.onload = function(event) { var __vassmark_system = new VassMarker(); }
//alert(document.onload);