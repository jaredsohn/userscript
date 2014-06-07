// ==UserScript==
// @name          Zoomii Interface Enhancer
// @namespace	  http://pwp.netcabo.pt/pruano/greasemonkey/zoomii_enhancer
// @description	  Enhances the cool zoomii interface to Amazon by adding a few features, like keyboard shortcuts.
// @include       http*://zoomii.com/*
// ==/UserScript==

// This is a Greasemonkey user script

// Shortcuts:
//
// Up arrow - move up
//  Down arrow - move down
//  Left arrow - move left
//  Right arrow - move right
// c - show/hide category list
// h - show/hide left command bar
// +  - zoom in
// -  - zoom out
// f - search

// --------------------------------------------------------------------
// Changelog
//
// 0.1
//  First Release.
// --------------------------------------------------------------------

(function() {

// Constants
doDebug = false;

// globals
var components = { hoverBox: null, searchBox: null, categories: null, commands: null };
 
const HANDLERS_TABLE = {
    // Up-Arrow  :move up
	38: moveUp,

    // Down-Arrow :move down
	40: moveDown,

    // Left-Arrow :move left
	37: moveLeft,

    // Right-Arrow :move right
	39 :moveRight,
	
    // + :zoom in
	107: zoomIn,

    // - :zoom out
	109: zoomOut,
	
	// 'h' - Shows/hides command box
	72: toggleHoverBoxDisplay,
	
	// 'c' - Opens category list
	67: toggleCategoryListDisplay,
	
    // 'f' - Search
    70: searchCommand,

};

if (isLoaded()) { 
  window.addEventListener('keydown', keyHandler, false);
  myLog("Loading");
}

// Logs given string to the JavaScript Console if in debug mode
function myLog(toLog) {
   if(doDebug){
     GM_log(toLog);
  }
}

// ---XPath helper----
//Run a particular XPath expression _p_ against the context node _context_ (or the document, if not provided).
//Returns the results as an array.
//Note: Use relative xpath if context provided
//Found in GreaseSpot: http://wiki.greasespot.net/Code_snippets#XPath_helper

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}


function getNode(nodeId) {
	return document.getElementById(nodeId);
}

function isLoaded() {
  return getNode("contents");
}

function runCommands(commands) {
  for (var i=0; i < commands.length; i++) {
    var command = commands[i];
 
    // A one second pause between commands seems to be enough for LAN/broadband
    // connections
    setTimeout(commands[i], 100 + 1000 * i);
  }
}

function keyHandler(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey || event.keyCode == 16) {
    return false;
  }
  
  if(getNode("video_div")){
	return false;
  }
  
  if(isBookDetailOpen()){
	return false;
  }
  
  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }
 
  //alert("Event: " + event.keyCode);
  
  if (event.keyCode in HANDLERS_TABLE) {
    runCommands([HANDLERS_TABLE[event.keyCode]]);
    return true;
  }
  
  return false;
}

function getSearchBox(){
	if(components.searchBox != null){
		return components.search;
	}
	myLog("Setting searchBox");
	var hoverBox = getHoverBox();
	if(hoverBox == null){
		return null;
	}
	var searchBoxXPath = "//input[@type='text']";
	var result = $x(searchBoxXPath,hoverBox);
	if(result.length != 1){
		myLog("Failed to find the search box");
		return null;
	}
	components.searchBox = result[0]
	
	return components.searchBox;
}

function getBookDetail(){
	var bookDetailXPath = "//div[@id=\"contents\"]/div/div[2]/div[7]";
	var result = $x(bookDetailXPath);
	if(result.length == 0){
		myLog("Failed to find the book detail div");
		return null;
	}
	return result[0];
}

function isBookDetailOpen(){
	var bookDetail = getBookDetail();
	
	if(bookDetail == null || bookDetail.style.display != "block"){
		return false;
	}
	
	return true;
}

function getHoverBox(){
	if(components.hoverBox != null){
		return components.hoverBox;
	}
	myLog("Setting hoverBox");
	var hoverBoxXPath = "//div[@id=\"contents\"]/div/div[2]/div[6]";
	var result = $x(hoverBoxXPath);
	if(result.length == 0){
		myLog("Failed to find the hover box div");
		return null;
	}
	components.hoverBox = result[0]
	
	return components.hoverBox;
}

function hideHoverBox(){
	var hoverBox = getHoverBox();
	if(hoverBox){
		myLog("Hiding");
		hoverBox.style.visibility = "hidden";
	}
}

function showHoverBox(){
	var hoverBox = getHoverBox();
	if(hoverBox){
		myLog("Showing");
		hoverBox.style.visibility = "visible";
	}
}

function isHoverBoxVisible(){
	var hoverBox = getHoverBox();
	if(hoverBox.style.visibility == "hidden"){
		return false;
	}
	return true;
}

function toggleHoverBoxDisplay(){
	var hoverBox = getHoverBox();
	if(hoverBox.style.visibility == "hidden"){
		myLog("Showing");
		hoverBox.style.visibility = "visible";
	}
	else{
		myLog("Hiding");
		hoverBox.style.visibility = "hidden";
	}
}

function zoomIn(){
	var command = getCommandButtons().zoomIn;
	myLog(command.src);
	myLog("Zoomming in");
	var mouseDownEvt = createMouseEvt("mousedown");
	var mouseUpEvt = createMouseEvt("mouseup");
	command.dispatchEvent(mouseDownEvt);
	command.dispatchEvent(mouseUpEvt);
}

function zoomOut(){
	var command = getCommandButtons().zoomOut;
	myLog(command.src);
	myLog("Zoomming out");
	clickCommandButton(command);
}

function moveUp(){
	var command = getCommandButtons().up;
	myLog(command.src);
	myLog("MoveUp");
	clickCommandButton(command);
}

function moveDown(){
	var command = getCommandButtons().down;
	myLog(command.src);
	myLog("MoveDown");
	clickCommandButton(command);
}

function moveLeft(){
	var command = getCommandButtons().left;
	myLog(command.src);
	myLog("MoveLeft");
	clickCommandButton(command);
}

function moveRight(){
	var command = getCommandButtons().right;
	myLog(command.src);
	myLog("MoveRight");
	clickCommandButton(command);
}

function searchCommand(){
	if(!isHoverBoxVisible()){
		toggleHoverBoxDisplay();
	}	
	var searchfield = getSearchBox();
	searchfield.focus();
}

function toggleCategoryListDisplay(){
	var command = getCommandButtons().category
	
	myLog("toggleCategoryListDisplay");
	clickCommandButton(command);
}

function clickCommandButton(command){
	var mouseDownEvt = createMouseEvt("mousedown");
	var mouseUpEvt = createMouseEvt("mouseup");
	command.dispatchEvent(mouseDownEvt);
	command.dispatchEvent(mouseUpEvt);
}

function createMouseEvt(evtType){
	var event = document.createEvent("MouseEvents");
	event.initEvent( evtType, true, true );

	return event;
}

function getCommandButtons(){
	if(components.commands != null){
		return components.commands;
	}
	myLog("Setting commands");
	
	var commands = {};
	var hoverBox = getHoverBox();
	var buttonsXPath = "div[5]/table/tr/td/div/img";
	var buttons = $x(buttonsXPath,hoverBox);
	
	if(buttons.length == 0){
		return null;
	}
	
	commands.up = buttons[0];
	commands.down = buttons[1];
	commands.left = buttons[2];
	commands.right = buttons[3];
	commands.zoomIn = buttons[4];
	commands.zoomOut = buttons[5];

	for(i=0;i<6;i++){
		myLog(buttons[i].src);
	}
	
	var categoryXPath = "div[5]/table/tr/td/div[2]/div";
	var result = $x(categoryXPath,hoverBox);
	
	if(result.length == 0){
		return null;
	}
	commands.category = result[0]

	components.commands = commands;
	
	return components.commands;
}

})();