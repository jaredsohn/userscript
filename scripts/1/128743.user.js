// ==UserScript==
// @name        EndoWorkoutExportv2
// @namespace   http://localhost
// @description Exports workouts from Endomondo website
// @include     http://www.endomondo.com/workouts/*
// @include     www.endomondo.com/workouts
// @include     www.endomondo.com/workouts/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @version     2
// ==/UserScript==

// Declare global vars
var click,exportButtonElement;
var retryCounter = 0;
var anchorElements = new Array();
var pageCounter = 1;

//The vars below need to be persistent so they are set via GM functions
var status = GM_getValue("GM_status","init");
var currentMode = GM_getValue("GM_currentMode","workout");
var itemInList = GM_getValue("GM_itemInList",0);
var pageBeingRead = GM_getValue("GM_pageBeingRead",1);
var lastTimeUsed = GM_getValue("GM_lastTimeUsed","0")
lastTimeUsed = parseInt(lastTimeUsed);
if (lastTimeUsed == 0) {
  lastTimeUsed = new Date().getTime();
}

// This section is only used in the Workout mode
// *********************************************
function showList() {
  //Activates the history view of the workouts
  var snapLinks = document.evaluate("//span", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i <= snapLinks.snapshotLength - 1; i++) {
    var elm = snapLinks.snapshotItem(i);

    if (elm.innerHTML == "History") {
      createClickEvt();
      GM_setValue("GM_currentMode","history");
      elm.innerHTML = "<b>" + elm.innerHTML + "</b>";
      parElm = elm.parentNode;
      parElm.dispatchEvent(click);
    }
  }
}

function getExportButtonElement() {
  //get the element that activates EXPORT
  var snapLinks = document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i <= snapLinks.snapshotLength - 1; i++) {
    var Elm = snapLinks.snapshotItem(i);
    if (Elm.innerHTML == "Export") {
	exportButtonElement = Elm;
    }
  }
  if (exportButtonElement == null) {
    showList();
  }
}

function launchExport() {
  getExportButtonElement();
  createClickEvt();
  exportButtonElement.dispatchEvent(click);
  setTimeout(handleExporter,1000);
}
   
function handleExporter() {
  createClickEvt();
  var gpxAnch = document.evaluate("//a[contains(@href,'Gpx')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (gpxAnch.snapshotLength == 0) {
    handleRetries('handleExporter');
    return(false);
  } else {
    retryCounter = 0;
    var gpxNode = gpxAnch.snapshotItem(0);
    gpxNode.dispatchEvent(click);
    setTimeout(closeExport,4000)
    
  }   
}

function closeExport() {
  var closeAnch = document.evaluate("//a[contains(@onclick,'closeButton')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (closeAnch.snapshotLength == 0) {
    handleRetries('closeExport');
    return(false);
  } else {
    retryCounter = 0;
    var closeButton = closeAnch.snapshotItem(0);
    closeButton.dispatchEvent(click);
    setTimeout(showList,1000);
  }
}

// This section is only used in the History mode
// *********************************************
function getAnchorElements() {
  //get a list of all workouts
  var snapLinks = document.evaluate("//td[@class='route']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (snapLinks.snapshotLength == 0) {
    handleRetries('getAnchorElements');
    return(false);
  } else {
    retryCounter = 0;
    for (var i = 0; i <= snapLinks.snapshotLength -1 ; i++) {
      //add all workouts to an array
      anchorElements[i] = snapLinks.snapshotItem(i);
    }
  }
  //check if we have already come to the end of the lisif so, get to the next one
  if (itemInList == snapLinks.snapshotLength) {
    itemInList = 0;
    pageBeingRead++;
    GM_setValue("GM_itemInList",itemInList);
    GM_setValue("GM_pageBeingRead",pageBeingRead);
    getAndClickNextButton();
    setTimeout(getAnchorElements,2000);
  }                 
  //get the next item from the array and click it
  t = itemInList+1;
  GM_setValue("GM_itemInList",t);
  GM_setValue("GM_currentMode","workout");
  handleRetries('clickItemInList'); //No idea, but sometimes a click just doesn't seem to get through....
}

function clickItemInList() {
  createClickEvt();
  anchorElements[itemInList].dispatchEvent(click);
}


function getAndClickNextButton() {
  var nextAnch = document.evaluate("//a[contains(@href,'navigator:next')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (nextAnch.snapshotLength == 0) {
    endScript();
  } else {
    createClickEvt();
    var nextButton = nextAnch.snapshotItem(0);
    nextButton.dispatchEvent(click); 
  }
}

function configPage() {
  var startTm = document.evaluate("//input[@name='startTime']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var endTm = document.evaluate("//input[@name='endTime']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  startTm.value = GM_getValue("GM_fromDate",'');
  endTm.value = GM_getValue("GM_toDate",'');
  startTm.onkeyup();
  endTm.onkeyup();
  setTimeout(advanceToStartPage,1000);
}

function advanceToStartPage() {
  if (pageCounter < pageBeingRead) {
    getAndClickNextButton();
    pageCounter++;
    setTimeout(advanceToStartPage,1000);
  } else {
    setTimeout(getAnchorElements,1000);
  }
}

function endScript() {
  resetGMVars();
  alert ("The script has finished.\nThe exported files should be in the designated folder.\nYou can close this window.\nHappy exercising! ;)");
  generateAnErrorToExit();
}

// This section  is for common functionality
// *****************************************
function createClickEvt() {
  click = document.createEvent("MouseEvents");
  click.initMouseEvent("click", true, true, window,
  0, 0, 0, 0, 0, false, false, false, false, 0, null);
}

function handleRetries(callingFunction) {
  retryCounter++;
  if (retryCounter > 5) {
    resetGMVars();
    alert ("There seems to be a problem with the EndoMondo site. This script will terminate.\nProblem in " + callingFunction);
  } else {
    setTimeout(eval(callingFunction),2000);
  }
}


function initScript() {
  //creates a click event to simulate clicks and calls the showList function
  //First check if the script was terminated untimely so we need to start all over again
  currentTime = new Date().getTime();
  timeLapsed = (currentTime - lastTimeUsed) / 1000;
  if (timeLapsed > 45) {
    //Let's start all over again
    resetGMVars();
    alert ("The script was terminated incorrectly last time.\nSaved values have been reset.\n\nYou should CLOSE THIS WINDOW and then go to the Endomondo page again.\nSorry for the hassle....");
    return (false);
  }
  if (status == "init") {
    GM_setValue("GM_fromDate",'');
    GM_setValue("GM_toDate",'');
    if (confirm("This script will export all workouts to a local folder.\nIf you have not read the instructions, do NOT proceed.\nRemember this script is provided as is and you run it at your own risk.\n\nPress OK to proceed.")) {
      var fromDate = prompt("OK, the script will be executed.\nYou can set the start date here if you wish to make a selection.\n\nFill out in format yyyy-mm-dd or leave blank to export all","");
      if (fromDate !== "") {
	var toDate = prompt("From date: " + fromDate  + "\n\nSet the end date.\nFill out in format yyyy-mm-dd","");
	GM_setValue("GM_fromDate",fromDate);
	GM_setValue("GM_toDate",toDate);
      }
      createClickEvt();
      status = "running";
      GM_setValue("GM_status",status);
      setTimeout(showList,1000);
    } 
  } else {
    if(currentMode == "history") {
      showRunningMessage();
      setTimeout(configPage,1000);
    } else if (currentMode == "workout") {
      t = new Date().getTime();
      t = String(t);
      GM_setValue("GM_lastTimeUsed",t);
      showRunningMessage();
      setTimeout(launchExport,2000);
    }
  }
}

function resetGMVars() {
    GM_setValue("GM_status","init");
    GM_setValue("GM_currentMode","workout");
    GM_setValue("GM_itemInList",0);
    GM_setValue("GM_pageBeingRead",1);
    GM_setValue("GM_lastTimeUsed","0");
}

function showRunningMessage() {
  var div = document.createElement("div");
  div.style.width = "150px";
  div.style.height = "30px";
  div.style.background = "red";
  div.style.position = "absolute";
  div.style.right = "30px";
  div.style.top = "20px";
  div.style.color = "white";
  div.innerHTML = "Export script running.";
  document.body.appendChild(div);
}

setTimeout(initScript,1500);