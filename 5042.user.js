// ==UserScript==
// @name          Yahoo Mail Macros
// @namespace	  http://pwp.netcabo.pt/pruano/greasemonkey/yahoo_macros
// @description	  Keyboard shortcuts and macros.
// @include       http*://*.mail.yahoo.com/ym/*
// ==/UserScript==

// This is a Greasemonkey user script

// Shortcuts:
//
// ! - report spam
// c - Compose
// d - delete
// f - forward
// j - cursor down
// k - cursor up
// o/Enter - open
// r - reply (in message) / mark read (in message list)
// u - back to folder (in message) / inbox (in message list)
// x - select
// '/' - search
// g - go to folder (opens quicksilver-like interface)
// l - move to folder (opens quicksilver-like interface)

// --------------------------------------------------------------------
// Changelog
//
// 0.3
// Corrected "back to folder" in a message from a yahoo user (appears extra links, Call and IM, in navigation bar)
// Added "move to folder" from an open message
//
// 0.2
// Added debug code
// Corrected QuickSilver interface that had stopped working due to change in yahoo code
//
// 0.1
//  First Release.
// --------------------------------------------------------------------

(function() {

// Constants

const MOVE_UP = -1;
const MOVE_DOWN = 1;
const OPEN_FOLDER = 71; 
const MOVE_TO_FOLDER = 76;
 
const HANDLERS_TABLE = {
    // ! - report spam
    49 : spamCommand,

    // c - Compose
    67 : composeCommand,

    // d - delete
    68 : deleteCommand,

    // f - forward
    70 : forwardCommand,

    // j - cursor down
    74 : cursorDownCommand,

    // k - cursor up
    75 : cursorUpCommand,

    // o/Enter - open
    13 : openCommand,
    79 : openCommand,

    // r - reply/read
    82 : rCommand,

    // u - back to folder/inbox
    85 : uCommand,

    // x - select
    88 : selectCommand,

    // '/' - Search
    191 : searchCommand,

};

const FOLDER_ACTIONS = {
  // g - go to folder
  71 : function(folderName) {
    var link = getFolderAction(folderName);	
    if(link)
    {
    	window.location.href = link;
    }
  },
  // l - move to folder
  76 : function (folderName) {
    
	 if(selector){
	    moveMessagesCommand(folderName);
     }
     else{
	    moveOpenMessageCommand(folderName);
     }
   }	 
};

// This is the class that defines the selector 
function SelectorSingleton(){

	//Private method that adds cells to the message table for the selector
	function adjustMessageTable() {
		if ( ! that.messageTable ) {
       			throw new Error("There is no message table to adjust.");
   		}
		for(var i=0;i < that.messageTable.rows.length;i++){
      			var cell = that.messageTable.rows[i].insertCell(0);
			cell.width="1%";
    		}
	}
	//Private method that updates the visual cursor on the message table
	function updateMessageTable(){
		if(that.lastRow){
			that.lastRow.cells[0].innerHTML=null;
		}
		if(that.rowRef){
		  	that.rowRef.cells[0].innerHTML="&gt;"
		}
	}

	function Init(){
		adjustMessageTable();
		that.moveTo(1);
	}

	//Stops calls from new,
	// since its a singleton, only getInstance has access to constructor
	if (SelectorSingleton.caller != SelectorSingleton.getInstance) {
       		throw new Error("There is no public constructor for SelectorSingleton.");
   	}

	// Protected methods

	this.update = function () {
		updateMessageTable();
	}

	this.moveTo = function(newPos){
			if(newPos <= 0 || newPos > that.messageTable.rows.length){
				return null;
			}

			var newRow = that.messageTable.rows[newPos];
			if(newRow){
				that.lastRow = that.rowRef;
				that.rowRef = newRow
				that.nrow = newPos;
				that.update();
			}
			return newRow
		      }

	
	this.lastRow = null;
	this.rowRef = null;
	this.nrow = 0;
	this.messageTable = SelectorSingleton.__table__;

	//By convention, we make a private that parameter. This is used to make the object available to the private methods. This is a workaround for an error in the ECMAScript Language Specification which causes this to be set incorrectly for inner functions.
	var that = this;	

	Init();
}

// Defines the static properties of the class
SelectorSingleton.__instance__ = null;  
SelectorSingleton.__table__ = null;

SelectorSingleton.getInstance = function () {
					//only give a selector object if a message table was found
					this.__table__ = getNode("datatable");
					if(! this.__table__) {
						return null;
					}

    					if (! this.__instance__) {
        					this.__instance__ = new SelectorSingleton();
    					}
    					return this.__instance__;
			   	}

SelectorSingleton.prototype.moveToNext = function () {
					var nMessages = this.messageTable.rows.length;
					var nNext = this.nrow+1;

					//alert("Current Pos: " + this.nrow + "\nMove to:" + nNext);

					if(nNext <= nMessages){
						this.moveTo(nNext);
					}
				       }

SelectorSingleton.prototype.moveToPrevious = function () {
					var nNext = this.nrow-1;

					//alert("Current Pos: " + this.nrow + "\nMove to:" + nNext);
					
					if(nNext > 0){
						this.moveTo(nNext);
					}
				       }

SelectorSingleton.prototype.moveToFirst = function () {
					this.moveTo(1);
				       }

SelectorSingleton.prototype.moveToLast = function () {
					var nLast = this.messageTable.rows.length;
					this.moveTo(nLast);
				       }


// Utility functions
function getObjectMethodClosure1(object, method) {
  return function(arg) {
    return object[method](arg); 
  }
}

// Shorthand
var newNode = getObjectMethodClosure1(unsafeWindow.document, "createElement");
var getNode = getObjectMethodClosure1(unsafeWindow.document, "getElementById");

// Globals

var doDebug = false;

var banner;
var folderList;

var dispatchedActionTimeout = null;
var activeLabelAction = null;
var folders = new Array();
var selectedLabels = new Array();
var labelInput = null;
var selector = null;

if (isLoaded()) { 
  banner = new Banner();
  selector = SelectorSingleton.getInstance();
  window.addEventListener('keydown', keyHandler, false);
}

// Logs given string to the JavaScript Console if in debug mode
function myLog(toLog) {
   if(doDebug){
     GM_log(toLog);
  }
}

function isLoaded() {
  // folder list is present
  return getNode("folderlist");
}

function keyHandler(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey || event.keyCode == 16) {
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
 
//   alert("Event: " + event.keyCode);

  if (event.keyCode in FOLDER_ACTIONS) {
    if (activeLabelAction) {
      endLabelAction();
      return false
    } else {
      activeLabelAction = FOLDER_ACTIONS[event.keyCode];
      beginLabelAction(event);
      return true;
    }
  }
    
  if (event.keyCode in HANDLERS_TABLE) {
    runCommands([HANDLERS_TABLE[event.keyCode]]);
    return true;
  }
  
  return false;
}

function beginLabelAction(event) {

  folderList = getFolderList(event.keyCode);
  folders = new Array();

  for (var folder in folderList) {
    folders.push(folder);
  }

  myLog("beginLabelAction: found folders < " + folders.join(",") + ">");

  banner.show();
  
  labelInput = newNode("input");
  labelInput.type = "text";
  with (labelInput.style) {
    position = "fixed"; // We need to use fixed positioning since we have ensure
                        // that the input is not scrolled out of view (since
                        // Gecko will scroll for us if it is).
    top = "0";
    left = "-300px";
    width = "200px";
    height = "20px";
    zIndex = "1000";
  }

  dispatchedActionTimeout = null;
  
  unsafeWindow.document.body.appendChild(labelInput);
  labelInput.focus();
  labelInput.value = "";
  labelInput.addEventListener("keyup", updateLabelAction, false);
  // we want escape, clicks, etc. to cancel, which seems to be equivalent to the
  // field losing focus
  labelInput.addEventListener("blur", endLabelAction, false);
}

function endLabelAction() {

  banner.hide();

  if (labelInput) {
    labelInput.parentNode.removeChild(labelInput);
    labelInput = null;
  }
  activeLabelAction = null;
}

function updateLabelAction(event) {
  // We've already dispatched the action, the user is just typing away
  if (dispatchedActionTimeout) {
    return;
  }
  
  selectedLabels = new Array();
  
  // We need to skip the label shortcut that got us here
  var labelPrefix = labelInput.value.substring(1).toLowerCase();

  banner.update(labelPrefix);
  
  if (labelPrefix.length == 0) {
    return;
  }
  
  for (var i=0; i < folders.length; i++) {
    if (folders[i].toLowerCase().indexOf(labelPrefix) == 0) {
      selectedLabels.push(folders[i]);
    }
  }
   
  myLog("beginLabelAction: labelPrefix < " + labelPrefix + " >");
  myLog("beginLabelAction: folder list < " + folders.join(",") + " >");   
  myLog("updateLabelAction: selected folders < " + selectedLabels.join(",") + " >");
  
  if (selectedLabels.length == 1) {
    // Tell the user what we picked
    banner.update(selectedLabels[0]);

    // We don't invoke the action straight away, if the user wants to keep 
    // typing and/or admire the banner
    dispatchedActionTimeout = window.setTimeout(
      function () {
        activeLabelAction(selectedLabels[0]);
        endLabelAction();
      }, 400);
  }
}
function getFolderList(listType)
{
	switch(listType){
		case OPEN_FOLDER:
			return getCompleteFolderList();
			break;
		case MOVE_TO_FOLDER:
			return getMoveToFolderList();
			break;
		default:
			return new Object();
	}
}

function getCompleteFolderList()
{
  var folderList = new Object();

  var lis = getNode("defaultfolders").getElementsByTagName("li");

  for (var i=0; i < lis.length; i++) {
    var link = lis[i].getElementsByTagName("a")[0];
    var link_href = link.href;
	
	if(link.childNodes[1].nodeType != document.TEXT_NODE){
	  myLog("getCompleteFolderList: error getting folder name");
	  myLog("getCompleteFolderList: node type=" + link.childNodes[1].nodeType);
	}
	else{
      var folderName = link.childNodes[1].nodeValue;
	  folderList[folderName]=link_href;
	}
    
  }

  var lis = getNode("customfolders").getElementsByTagName("li");

  for (var i=0; i < lis.length; i++) {
    var link = lis[i].getElementsByTagName("a")[0];
    var link_href = link.href;
	
	if(link.childNodes[1].nodeType != document.TEXT_NODE){
	  myLog("getCompleteFolderList: error getting folder name");
	  myLog("getCompleteFolderList: node type=" + link.childNodes[1].nodeType);
	}
	else{
      var folderName = link.childNodes[1].nodeValue;
	  folderList[folderName]=link_href;
	}
  }
	
  return folderList;
}

function getMoveToFolderList()
{
  var folderList = new Object();

  var lis = getNode("movemenu").getElementsByTagName("li");

  for (var i=0; i < lis.length; i++) {
    var folderButton = lis[i];
    var folderName = folderButton.innerHTML.trim();
    folderList[folderName]=folderButton;
  }

  return folderList;
}

function getFolderAction(folderName) 
{
  if (folderName in folderList) {
    return folderList[folderName];
  }
  return null;
}

function spamCommand()
{
    // ! - report spam
    var spamButton = getNode("spamtop");
    if(spamButton){
      spamButton.click();
    }
}

function searchCommand()
{
    // '/' - Search
    getNode("searchquery0").focus();
}

function composeCommand()
{
    // c - Compose
    document.getElementsByTagName("button")[1].click();
}

function deleteCommand()
{
    // d - delete
    var deleteButton = getNode("deletetop");
    if(deleteButton){
      deleteButton.click();
    }
}

function forwardCommand()
{
    // f - forward
    var forwardButton = getNode("forwardbottom");
    if(forwardButton){
      forwardButton.click();
    }
}

function openCommand()
{
   if(selector){
	var curRow = selector.rowRef;

	var url = curRow.cells[curRow.cells.length-3].getElementsByTagName("a")[0].href;

	window.location.href = url;
   }
}

function selectCommand()
{
   if(selector){
	document.getElementsByName("Mid")[selector.nrow-1].click();
   }
}

function cursorDownCommand()
{
    if(selector){
	selector.moveToNext();
	refocus(MOVE_DOWN);
    }
}

function cursorUpCommand()
{
    if(selector){
	selector.moveToPrevious();
	refocus(MOVE_UP);
    }
}

function rCommand()
{
    if(selector){
	markReadCommand();
    }
    else{
	replyCommand();
    }
}

function replyCommand()
{
    var replyButton = getNode("replybottom");

    if(replyButton){
	replyButton.click();
    }
}

function markReadCommand()
{
    var markReadButton = getNode("markmenu").getElementsByTagName("li")[1];

    if(! markReadButton){
    	return;
    }

    var event = unsafeWindow.document.createEvent("MouseEvents");
    
    event.initMouseEvent("click",
                         true, // can bubble
                         true, // cancellable
                         window,
                         1, // clicks
                         50, 50, // screen coordinates
                         50, 50, // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         markReadButton);
    event.srcElement = markReadButton;
    markReadButton.dispatchEvent(event);


}

function uCommand()
{
    if(selector){
	checkMailCommand();
    }
    else{
	backToMessagesCommand();
    }	
}

function checkMailCommand()
{
   getNode("globalbuttonbartop").getElementsByTagName("button")[0].click();
}

function backToMessagesCommand()
{
   //Is folder view already, stop processing
   if(selector){
	return;
   }

   var divs = document.getElementsByTagName("div");

   var classRegEx = /\bcontentnav\b/;

   var navDiv = null;

   // find the content navigation div
   for(var i=0;i<divs.length;i++){
	if(divs[i].className.match(classRegEx)){
		navDiv = divs[i];
		break;
	}
   }

   // no div found, stop processing
   if(!navDiv){
    myLog("backToMessagesCommand: Couldnt find the navigation bar");
	return;
   }
   
   var navSpan = null;
   
   var spanRegEx = /\bfirst\b/;
   
   var navSpanList = navDiv.getElementsByTagName("span");
   
   // find the content navigation div
   for(var i=0;i<navSpanList.length;i++){
	if(navSpanList[i].className.match(spanRegEx)){
		navSpan = navSpanList[i];
		break;
	}
   }
   // no span found, stop processing
   if(!navSpan){
    myLog("backToMessagesCommand: Couldnt find the first span in the navigation bar");
	return;
   }
     
   var navLinks = navSpan.getElementsByTagName("a");

  // no links to follow, stop processing
  if(!navLinks || navLinks.length == 0){
    myLog("backToMessagesCommand: Couldnt find links in the navigation bar");
	return;
  }
  
  // We are interested in the last one, "Back to Messages"
  var url = navLinks[navLinks.length-1].href;
  
  window.location.href = url;
}

function moveMessagesCommand(folderName)
{
    var moveButton = getNode("contentbuttonbartop").getElementsByTagName("button")[3];
    var folderButton = getFolderAction(folderName);
    if(moveButton && folderButton)
    {
	  moveMessages(moveButton,folderButton);
    }
}

function moveOpenMessageCommand(folderName)
{
    var moveButton = getNode("contentbuttonbartop").getElementsByTagName("button")[4];
    var folderButton = getFolderAction(folderName);
    if(moveButton && folderButton)
    {
	  moveMessages(moveButton,folderButton);
    }
}


function moveMessages(moveButton,folderButton){

	var event = unsafeWindow.document.createEvent("MouseEvents");
    
    event.initMouseEvent("click",
                         true, // can bubble
                         true, // cancellable
                         window,
                         1, // clicks
                         50, 50, // screen coordinates
                         50, 50, // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         moveButton);
    event.srcElement = moveButton;
    moveButton.dispatchEvent(event);

	event = unsafeWindow.document.createEvent("MouseEvents");
    
    event.initMouseEvent("click",
                         true, // can bubble
                         true, // cancellable
                         window,
                         1, // clicks
                         50, 50, // screen coordinates
                         50, 50, // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         folderButton);
    event.srcElement = folderButton;
    folderButton.dispatchEvent(event);
}

function runCommands(commands) {
  for (var i=0; i < commands.length; i++) {
    var command = commands[i];
 
    // A one second pause between commands seems to be enough for LAN/broadband
    // connections
    setTimeout(commands[i], 100 + 1000 * i);
  }
}

function refocus(move)
{
  if(!selector || !selector.rowRef){
	return;
  } 

  var screenHight=window.screen.availHeight-150;
  var pos=getPosition(selector.rowRef);
  var rpos=getPosition(selector.rowRef)-window.scrollY;

  if ( move>0 && rpos > screenHight/6*5 ) {window.scrollTo(0, pos - screenHight/2);}
  if ( move<0 && rpos < screenHight/6 )   {window.scrollTo(0, pos - screenHight/2);}
  if ( rpos > screenHight-50 || rpos < 0 )  {window.scrollTo(0, pos - screenHight/2);}
}

function getPosition(obj){
  var curtop=0;
  while (obj.offsetParent){curtop += obj.offsetTop;obj = obj.offsetParent;}
  curtop += obj.offsetTop;
  return curtop;
}

String.prototype.trim = function() {
  a = this.replace(/^\s+/,'');
  return a.replace(/\s+$/,'');
};	

function Banner() {
  this.backgroundNode = getNodeSet();
  this.backgroundNode.style.background = "#000";
  this.backgroundNode.style.MozOpacity = "0.5";
  this.backgroundNode.style.zIndex = 100;
  for (var child = this.backgroundNode.firstChild; 
       child; 
       child = child.nextSibling) {
    child.style.visibility = "hidden";
  }
  
  this.foregroundNode = getNodeSet();
  this.foregroundNode.style.zIndex = 101;
}

function getNodeSet() {
  var boxNode = newNode("div");
  with (boxNode.style) {
    display = "none";
    position = "fixed";
    top = "50%";
    left = "10%";
    margin = "0 10% 0 10%";
    width = "60%";
    textAlign = "center";
    MozBorderRadius = "10px";
    padding = "10px";
    color = "#fff";
  }
  
  var messageNode = newNode("div");
  with (messageNode.style) {
    fontSize = "24px";
    fontWeight = "bold";
    fontFamily = "Lucida Grande, Trebuchet MS, sans-serif";
    margin = "0 0 10px 0";
  }
  boxNode.appendChild(messageNode);

  var taglineNode = newNode("div");
  with (taglineNode.style) {
    fontSize = "13px";
    margin = "0";
  }
  taglineNode.innerHTML = 'FolderSelector<span style="color:red">9000</span>';
  boxNode.appendChild(taglineNode);
  
  return boxNode;
}

Banner.prototype.hide = function() {
  this.backgroundNode.style.display = 
    this.foregroundNode.style.display = "none";
}

Banner.prototype.show = function() {
  this.update("");
  document.body.appendChild(this.backgroundNode);
  document.body.appendChild(this.foregroundNode);
  this.backgroundNode.style.display = 
    this.foregroundNode.style.display = "block";
}

Banner.prototype.update = function(message) {
  if (message.length) {
    this.backgroundNode.firstChild.style.display = 
      this.foregroundNode.firstChild.style.display = "inline";
  } else {
    this.backgroundNode.firstChild.style.display = 
      this.foregroundNode.firstChild.style.display = "none";
  }
    this.backgroundNode.firstChild.innerHTML = 
      this.foregroundNode.firstChild.innerHTML = message;
}

})();


