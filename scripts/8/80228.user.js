// ==UserScript==
// @name           IRCTC UNIVERSAL STATUS WIDGET
// @namespace      IRCTCWIDGET
// @description    Highly intuitive grease monkey based widget for fetching the IRCTC train status for major class of travels
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/*
// @version			0.1
// @author			Ashok Kumar Koyi [Mouse name : Kalinga]
// ==/UserScript==

/* This script is dedicated to my grand mother */

/*
A part of this script is taken from the gm script IRCTC availability written by Nitin Kishen
This script is licenced under GNU General Public License, Free Software Foundation.
For more info, visit http://creativecommons.org/licenses/GPL/2.0/
*/

// Enable this flag only incase of development. Users of this script does not need to change this
var GM_DEBUG = false;

// This function adds a class to the passed-in element
function addClass(obj, className){
	if (!obj.classList.contains(className)) {
		obj.classList.add(className);
	}
}

// This function removes a class to the passed-in element
function removeClass(obj, className){
	if (obj.classList.contains(className)) {
		obj.classList.remove(className);
	}
}

function addStyle(style){
	var getHead = document.getElementsByTagName("head")[0];
	var cssNode = document.createElement( 'style' );
	var elementStyle= getHead.appendChild(cssNode)
	elementStyle.innerHTML = style;
	//return elementStyle;
}

function addScript(path){
	var getHead = document.getElementsByTagName("body")[0];
	var scriptNode = document.createElement( 'script' );
	scriptNode.type = 'text/javascript';
	scriptNode.src = path;
	getHead.appendChild(scriptNode)
}

function createImage(imageSource){
	//Build the loading image.
	var loaderImg = document.createElement('img');
	loaderImg.src= imageSource;
	return loaderImg;
}

function makeAjaxHTTPRequest(url, method, statusCol) {
	GM_log('Entering makeAjaxHTTPRequest(url, method, statusCol)');
	// logging url
	GM_log('requestURL='+url);
	GM_xmlhttpRequest({method: method,
		url: url,
		onload: function(result) {
			var respText;
			try {
				// logging responseText
				GM_log('responseText is '+ result.responseText);
				respText = result.responseText;
			} catch (e) {
				GM_log('Unable to get Availabilty; exception: ' + e);
				respText =  'Try Again!';
			}
			showTheResult(statusCol, getStatusAvailability(respText));
		}
	});
}

function getStatusAvailability(respText) {
	GM_log('Entering getStatusAvailability(respText) ');
	if(respText.match('@Transactions Suspended')){
		statusAvailabilty ='Transactions Suspended';
	}else if(respText.match('Problem')){
		statusAvailabilty ='Unknown Error';
	}else if(respText.length==0 || respText.match('Try Again')){
		statusAvailabilty ='Try Again!';
	}else{
		var arrResp = respText.split('|');					
		statusAvailabilty = arrResp[0].split('&')[1];
	}
	return statusAvailabilty;
}

function showTheResult(statusCol, statusAvailabilty){
	GM_log('Entering showTheResult(tdAvail, statusAvailabilty)');
	if(statusAvailabilty == 'Transactions Suspended' || statusAvailabilty =='Unknown Error' ||
		statusAvailabilty == 'Try Again!' || statusAvailabilty == 'NOT AVAILABL *' || 
		statusAvailabilty == 'NOT AVAILABLE'){
		makeItSmart(statusCol.parentNode);
	}
	// Add the response to the td
	statusCol.innerHTML =statusAvailabilty;
}

function Train(){
	GM_log('Entering Train()');
	this.trNo = 0;
	this.trainName = 'NA';
	this.startStnCode = 'XXX';
	this.destStnCode =  'YYY';
	this.slAvailability = false;
	this.ac3Availablity = false;
	this.ac2Availablity = false;
	this.ac1Availablity = false;
	this.getTrainInfo = function(){
		return 'Train Info is \n\ttrNo='+ this.trNo+'\n'+
					'\t'+'trainName='+this.trainName+'\n'+
					'\t'+'startStnCode='+this.startStnCode+'\n'+
					'\t'+'deststnCode='+this.deststnCode+'\n'+
					'\t'+'slAvailability='+this.slAvailability+'\n'+
					'\t'+'ac3Availablity='+this.ac3Availablity+'\n'+
					'\t'+'ac2Availablity='+this.ac2Availablity+'\n'+
					'\t'+'ac1Availablity='+this.ac1Availablity;
	}
}

function TrainInfo(){
	GM_log('Entering TrainInfo()');
	this.trainList = new Array(arguments.length);
	for(var i=0; i<arguments.length; i++) {
		this.trainList[i] = arguments[i];
	}
	this.addTrain = function(train){
		this.trainList.push(train);
	}
	this.printTrainList = function(){
		for(var i=0; i<this.trainList.length; i++) {
			GM_log(this.trainList[i].getTrainInfo());
		}
	}
}

function createTrainInfo(){
	GM_log('Entering createTrainInfo()');
	var trainInfo = new TrainInfo();
	var listOfTrainsTable = document.getElementById('clscode').parentNode;
	var noOfTrains = document.evaluate('tbody/tr', listOfTrainsTable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;
	// For each of the train, create a train object and add it to the TrainInfo object
	for(var i=0; i<noOfTrains; i++) {
		var currTrain = new Train();
		var trainNoElem = document.getElementById('trainNo'+i);
		var trainNoHtml = trainNoElem.innerHTML;
		// Match the train number
		currTrain.trNo = trainNoHtml.trim().match(/\d+/);
		trainNoElem.parentNode.id = 'train'+currTrain.trNo+'Row';
		var trainNameAnchorTag = document.getElementById('trainName'+i).getElementsByTagName('a');
		
		// set train name
		currTrain.trainName = trainNameAnchorTag[0].textContent.trim();
		
		// fetch the start and end station codes
		// NOTE: We should not fetch these values from the Plan my travel as IRCTC is buggy
		var splits = trainNameAnchorTag[0].getAttribute('onclick').split("'");
		currTrain.startStnCode = splits[splits.length-4].trim();
		currTrain.destStnCode = splits[splits.length-2].trim();
		
		// set all the availabilities of each class
		if(document.getElementById('a1'+i).textContent.trim() != 'X'){
			currTrain.ac1Availablity = true;
		}
		if(document.getElementById('a2'+i).textContent.trim() != 'X'){
			currTrain.ac2Availablity = true;
		}
		if(document.getElementById('a3'+i).textContent.trim() != 'X'){
			currTrain.ac3Availablity = true;
		}
		if(document.getElementById('sl'+i).textContent.trim() != 'X'){
			currTrain.slAvailability = true;
		}
		trainInfo.addTrain(currTrain);
	}
	return trainInfo;
}

function makeTrainNo4Digits(trNo){
	if(trNo/10 < 1) {
		return '000'+trNo.toString();
	} else if(trNo/100 < 1) {
		return '00'+trNo.toString();
	} else if(trNo/1000 < 1) {
		return '0'+trNo.toString();
	}
	return trNo.toString();
}

function createBaseWidget(placeholder){
	GM_log('Entering createBaseWidget()');
	var widgetCode = 
		'<div id="widgetHeader">'+
			'<span class="widgetHeadingNFooter" style="font-style:blod;">IRCTC widget</span>'+
			'<span style="float: right;">'+
				'<img id="widgetHeaderImg"></img>'+
			'</span>'+
			'<span id="smartView" style="float: right;">'+
				'Full'+
			'</span>'+
		'</div>'+
		'<div id="widgetContent" class="widgetDefault">'+
			'<div id="widgetContentHeader">'+
				'<span class="trainNoCol">Train #</span>'+
				'<span class="trainNameCol">Train Name</span>'+
				'<span class="trainStatusCol" id="classSelector">'+
					'Status [<span id="statusClass">SL</span>]'+
					'<ul class="ulStyle" id="classSelectorMenu">'+
						'<li id="classSL">SL</li>'+
						'<li id="class3A">3A</li>'+
						'<li id="class2A">2A</li>'+
						'<li id="class1A">1A</li>'+
					'</ul>'+
				'</span>'+
				'<div style="clear: both;"></div>'+
			'</div>'+
			'<div id="widgetContentBody">'+
			'</div>'+
		'</div>'+
		'<div id="widgetFooter">'+
			'<span class="widgetHeadingNFooter" style="font-size: 14px; font-style:italic;">Dedicated to my grand mother - Kalinga</span>'+
		'</div>';
	placeholder.innerHTML = widgetCode;
}

function toggleWidget(event){
	GM_log('Entering toggleSmartView(event)');
	var src = event.target;
	if(src.id == 'smartView') {
		return;
	}
	if(widgetHeaderImg.alt == 'minimize'){
		// 1. Make the content invisible
		addClass(widgetContent, 'noDisplay');
		addClass(widgetFooter, 'noDisplay');
		// 2. Toggle the class of header and image
		removeClass(widgetHeader, 'headerMaximized');
		addClass(widgetHeader, 'headerMinimized');
		widgetHeaderImg.src = maximizeImgSrc;
		// 3. Change the alt message if the image
		widgetHeaderImg.alt='maximize';
	} else {
		// 1. Make the content and footer visible
		removeClass(widgetContent, 'noDisplay');
		removeClass(widgetFooter, 'noDisplay');
		// 2. Toggle the class of header and image
		removeClass(widgetHeader, 'headerMinimized');
		addClass(widgetHeader, 'headerMaximized');
		widgetHeaderImg.src = minimizeImgSrc;
		// 3. Change the alt message if the image
		widgetHeaderImg.alt='minimize';
	}
}

function toogleClassSelection(){
	// GM_log('Entering toogleClassSelection()');
	// 1. If the list menu have the class noDisplay, remove this class, else add it
	if(classSelectorMenu.classList.contains('noDisplay')){
		removeClass(classSelectorMenu, 'noDisplay');
	} else {
		addClass(classSelectorMenu, 'noDisplay');
	}
}

function classOfServiceChanged(event){
	GM_log('Entering classOfServiceChanged(event)');
	var src = event.target;
	// 1. Reload the statistics only if  the user made a new choice
	if(!src.classList.contains('liSelected')){
		// 2. Set the status coloumn name
		statusClass.innerHTML = src.innerHTML;
		// 3. Modify the class of the currently selected li item and old one
		var currentlySelected = document.evaluate('li[@class="liSelected"]', src.parentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		removeClass(currentlySelected, 'liSelected');
		addClass(src, 'liSelected');
		// 3. Recalculate the avaiability
		recalculateAvaiability(src.innerHTML);
	}
}

function recalculateAvaiability(selectedClassOfService){
	GM_log('Entering recalculateAvaiability() :'+selectedClassOfService);
	// Reset the train rows which have the seatNA class set
	resetTrainRows();
	var trainList = trainInfo.trainList;
	for(var i=0; i<trainList.length; i++) {
		var classAvailability = checkClassAvailability(trainList[i], selectedClassOfService);
		resetStatusCol(trainList[i], selectedClassOfService, classAvailability);
		// Build the url for send Ajax request
		// 5.1. Declare constants
		var ampersand = '&';
		var equals = '=';
		// 5.2. Build the URL
		var requestURL = 
			'https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/PlannerAjaxAction.do?' +
			bv_SessionID + equals + bv_SessionIDValue + ampersand +
			bv_EngineID + equals + bv_EngineIDValue + ampersand +
			'trainTo' + equals + true + ampersand +
			'AVaction' + equals + true + ampersand +
			'hdnDay' + equals + travelDay + ampersand +
			'hdnMonth' + equals + travelMonth + ampersand +
			'hdnYear' + equals + travelYear + ampersand +
			'hdnClasscode' + equals + selectedClassOfService + ampersand +
			'fromStation' + equals + trainList[i].startStnCode + ampersand +
			'toStation' + equals + trainList[i].destStnCode + ampersand +
			'hdnQuota' + equals + selectedQuota + ampersand +
			'hdnTrnNo' + equals + trainList[i].trNo + ampersand +
			'service=avail';
		var statusCol = document.getElementById('train'+trainList[i].trNo+'Status');
		// Make the request only if the class is avaiable
		if(classAvailability){
			makeAjaxHTTPRequest(requestURL, 'GET', statusCol);
		} else {
			makeItSmart(statusCol.parentNode);
			statusCol.innerHTML='Service N/A';
		}
	}
}

/* This removes the seatNA class for the rows that already have this class set.
Call this when the user changes the class of service i.e from recalculateAvaiability(selectedClassOfService)
*/
function resetTrainRows(){
	GM_log('Entering resetTrainRows()');
	var seatNAList = document.getElementsByClassName('seatNA');
	/* FF is dynamically updating the seatNAList as and when you remove the class from 
	any element in the snapshot, So the seatNALength is getting reduced as we remove the 
	class names for the div elements, So we need to access the first element and 
	remove the class from that
	*/
	while(seatNAList.length>0){
		removeClass(seatNAList[0], 'noDisplay');
		removeClass(seatNAList[0], 'seatNA');
	}
	GM_log('Leaving resetTrainRows()');
}

/* This method replaces the contents of the status cloumn td with the loading image
*/
function resetStatusCol(train, selectedClassOfService, classAvailability){
	GM_log('Entering resetStatusCol(train, selectedClassOfService, classAvailability)');
	// 1. Veirfy the specified class of service exists before adding a loading image
	var statusCol = document.getElementById('train'+train.trNo+'Status');
	if(classAvailability){
		statusCol.removeChild(statusCol.firstChild);
		statusCol.appendChild(createImage(loaderImgSrc));
	} else {
		document.getElementById('train'+train.trNo+'Status').innerHTML = 'Service N/A';
	}
	GM_log('Leaving resetStatusCol(train, selectedClassOfService, classAvailability)');
}

function populateTrains(trainList, classOfTravel){
	GM_log('Entering populateTrains()');
	var widgetContentBody = document.getElementById('widgetContentBody');
	for(var i=0; i<trainList.length; i++) {
		// 1. Create the row for each train i.e div
		var trainRow = document.createElement('div');
		// 2. Create the required columns for the div
		var trainNoCol = document.createElement('span');
		addClass(trainNoCol, 'trainNoCol');
		trainNoCol.innerHTML = trainList[i].trNo;
		trainRow.id = 'widgetRow'+trainList[i].trNo;
		var trainNameCol = document.createElement('span');
		addClass(trainNameCol, 'trainNameCol');
		trainNameCol.innerHTML = trainList[i].trainName;
		var statusCol = document.createElement('span');
		addClass(statusCol, 'trainStatusCol');
		var clearDiv = document.createElement('div');
		addClass(clearDiv, 'clear');
		// 2.1 Add a column id, so that we can access this during the period when the user choses to change the class
		statusCol.id = 'train'+trainList[i].trNo+'Status';
		// 2.2. Load the loading Image for the status column if the train has the specified class of service avaiable
		// If it does not, Then show N/A and donot start the processing
		var classAvailability = checkClassAvailability(trainList[i], classOfTravel);
		if(classAvailability){
			statusCol.appendChild(createImage(loaderImgSrc));
		} else {
			makeItSmart(trainRow);
			statusCol.innerHTML='Service N/A';
		}
		// 3. Add all the columns
		trainRow.appendChild(trainNoCol);
		trainRow.appendChild(trainNameCol);
		trainRow.appendChild(statusCol);
		trainRow.appendChild(clearDiv);
		// Add on-click event listener for the event
		trainRow.addEventListener('click', highlightClickedRow, false);
		// 4. Append this row to the table body
		widgetContentBody.appendChild(trainRow);
		// 5. Start the actual process of requesting the server for info, only if the class is available
		if(classAvailability){
			// 5.1. Declare constants
			var ampersand = '&';
			var equals = '=';
			// 5.2. Build the URL
			var requestURL = 
				'https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/PlannerAjaxAction.do?' +
				bv_SessionID + equals + bv_SessionIDValue + ampersand +
				bv_EngineID + equals + bv_EngineIDValue + ampersand +
				'trainTo' + equals + true + ampersand +
				'AVaction' + equals + true + ampersand +
				'hdnDay' + equals + travelDay + ampersand +
				'hdnMonth' + equals + travelMonth + ampersand +
				'hdnYear' + equals + travelYear + ampersand +
				'hdnClasscode' + equals + classOfTravel + ampersand +
				'fromStation' + equals + trainList[i].startStnCode + ampersand +
				'toStation' + equals + trainList[i].destStnCode + ampersand +
				'hdnQuota' + equals + selectedQuota + ampersand +
				'hdnTrnNo' + equals + trainList[i].trNo + ampersand +
				'service=avail';
			// 5.3 Make the HTTP request
			makeAjaxHTTPRequest(requestURL, 'GET', statusCol);
		}
	}
	GM_log('Leavin populateTrains()');
}

/* This function add the seatNA class and adds the noDisplay class 
based on current selection in the smartView.

Call this method when the service is completely not present for a train or the response
from the server is NOT AVAILABL *
*/
function makeItSmart(trainRow){
	GM_log('Entering makeItSmart(trainRow)');
	addClass(trainRow, 'seatNA');
	/* If the text content is Full, it means we are in smart mode */
	if(smartView.innerHTML == 'Full') {
		addClass(trainRow, 'noDisplay');
	}
	GM_log('Leaving makeItSmart(trainRow)');
}

function checkClassAvailability(train, classOfTravel){
	switch(classOfTravel) {
		case 'SL':
			if (train.slAvailability) {
				return true;
			} else {
				return false;
			}
			break;
		case '3A':
			if (train.ac3Availablity) {
				return true;
			} else {
				return false;
			}
			break;
		case '2A':
			if (train.ac2Availablity) {
				return true;
			} else {
				return false;
			}
			break;
		case '1A':
			if (train.ac1Availablity) {
				return true;
			} else {
				return false;
			}
			break;
		default:
			return false;
	}
}

/* This toggles the smart view option avaiable for the user 
*/
function toggleSmartView(event){
	GM_log('Entering toggleSmartView(event)');
	var src = event.target;
	var seatNAList = document.getElementsByClassName('seatNA');
	if(src.innerHTML == 'Full') {
		src.innerHTML = 'Smart';
		for(var i=0; i<seatNAList.length; i++) {
			removeClass(seatNAList[i], 'noDisplay');
		}
	} else {
		src.innerHTML = 'Full';
		for(var i=0; i<seatNAList.length; i++) {
			addClass(seatNAList[i], 'noDisplay');
		}
	}
}

function highlightClickedRow(event){
	// The source of event is going to be the span element that the div row contans
	// So, get its parent and then perform the op
	var src = event.target.parentNode;
	GM_log('src.id = '+src.id);
	var trainNo = src.id.match(/\d+/);
	if(typeof(highlightRow) != 'undefined'){
		highlightRow.style.backgroundColor = '#FFF';
	}
	highlightRow = document.getElementById('train'+trainNo+'Row');
	highlightRow.scrollIntoView();
	highlightRow.style.backgroundColor = '#F9C581';
	if(avaialabilityDivAfterResults && avaialabilityDivAfterResults.style.display != "none"){
		avaialabilityDivAfterResults.scrollIntoView();
	}
}

/* Initializes everything 
*/
function init(){
	GM_log('Entering init()');
	// 1. Add the style
	addStyle('#irctcWidget{position:fixed;right:10px;bottom:10px;min-width:450px;font:16px serif;}#widgetHeader{height:23px;text-align:center;}.widgetHeadingNFooter{font-family:museo-slab-1,museo-slab-2,"Palatino Linotype","Book Antiqua",Palatino,serif;font-size:17px;font-weight:700;}#smartView{background-color:#f5e99e;border-left:1px solid;font-family:Trebuchet MS;padding:0 5px 0 5px;width:10%;}#smartView:hover{background-color:#f1d34e;}#widgetContent{background-color:white;}#widgetContentHeader{text-align:center;z-index:1;border-left:1px solid;border-right:1px solid;}#widgetContentHeader .trainNoCol{width:13%;font-weight:bold;background-color:#f52887;border:none;padding:0;color:white;}#widgetContentHeader .trainNameCol{width:43%;background-color:#0c0;font-weight:bold;border:none;padding:0;color:white;}#widgetContentHeader .trainStatusCol{width:44%;border:none;background-color:#762ca7;font-weight:bold;color:white;padding:0;cursor:pointer;}.trainNoCol{float:left;width:13%;height:20px;border-right:1px solid #c9ba17;border-bottom:1px solid #f52887;padding-right:1px;}.trainNameCol{float:left;width:44%;height:20px;border-right:1px solid #c9ba17;border-bottom:1px solid #0c0;padding-right:3px;}.trainStatusCol{float:left;width:41%;height:20px;border-bottom:1px solid #762ca7;}#widgetContentBody{height:100px;text-align:center;overflow-y:scroll;border-left:1px solid;border-right:1px solid;border-bottom:1px solid;}#widgetContentBody div:hover{cursor:pointer;background-color:#f9c581;}.clear{clear:both;}.headerMinimized{background-color:#f1bfd8;border:1px solid #f52887;}.headerMaximized{background-color:#cce5ed;border:1px solid #39c;}.noDisplay{display:none;}#widgetHeaderImg{border-left:1px solid #000;padding:3px 6px;}#widgetContent img{border:0;}#classSelectorMenu{list-style:none;position:absolute;margin:0 0 0 20px;padding:0;}#classSelectorMenu li{float:left;background-color:gray;display:block;cursor:pointer;margin:0;padding:0 5px;}#classSelectorMenu li:hover{background-color:#90ee90;color:#FFF;}.liSelected{background-color:green!important;color:#FFF!important;}#widgetFooter{background-color:#cce5ed;border:1px solid #39c;height:23px;text-align:center;}#widgetHeader,#classSelector{cursor:pointer;}');
	// 2. Create main div which holds the complete widget
	var widgetDiv = document.createElement('div');
	widgetDiv.id = 'irctcWidget';
	// 3. Create the base widget
	createBaseWidget(widgetDiv);
	// 4. Add the widget to the body
	document.getElementsByTagName('body')[0].appendChild(widgetDiv);
	// 5. Initialize the rquired Id's so that the accesing would be faster
	// 5.1 First initialize div id's and image id's
	widgetHeader = document.getElementById('widgetHeader');
	widgetContent = document.getElementById('widgetContent');
	widgetFooter = document.getElementById('widgetFooter');
	widgetHeaderImg = document.getElementById('widgetHeaderImg');
	classSelectorMenu = document.getElementById('classSelectorMenu');
	classSelector = document.getElementById('classSelector');
	smartView= document.getElementById('smartView');
	classSL = document.getElementById('classSL');
	class3A = document.getElementById('class3A');
	class2A = document.getElementById('class2A');
	class1A = document.getElementById('class1A');
	statusClass = document.getElementById('statusClass');
	// 5.2 Initialize the images so that always we access the same image [the image is built using the firefox Data URL Scheme]
	loaderImgSrc = 'data:image/gif;base64,R0lGODlhEAAQAPUAAP///y2RIfD38HK1ai2RIcLfv/f6993s2+bx5YC8eTOUJ8nixm2yZOLv4ESdOU2iQ+v06oW/fkifPmavXarSpZTHjtPn0KDNmrjZtPz9/Njq1ZvKlXu6dD+aNIrBhM7ly3e3b6XPoLPXr2GsWFKkSVenTq/Uqo/EiTiXLVypU73cugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAGo0CA0IDJAAhIR0YgbDYmhAKggyQIDp/mwYGcADzIEGDT0QgRjyrgQHAYIMiRgAmhII0EDGBUFQ0SCAAGD0YNAiJIAwtHSBUQGQZNCEZNVQQSTZkWEQpIChEWQpQAApYEmRkLgQAZGRpQSAALA0kQTQlCBSQlBZahDEIECotvBgxIwL1ZVYBCBxIEGgadIAAcSB0NWhdjahoEI9qZttexABiRQkEAIfkECQoAAAAsAAAAABAAEAAABmBAgBAgGhGEhJFoyGQQnsjniCk0PY+Aq4eZQACs2OfWcCI+vVbkWEEoXtHCtfR6ZhrYV6p+z9fTCVtDYFdGYgAGQmiEIoZ3SIptACNyUWgMdnhRBF5UJ3lZTwl7bkhKTEEAIfkECQoAAAAsAAAAABAAEAAABp1AgBAAGRGOQoxhKNRoAI8jAaAhjA7DQwcEWBy5HOnSwDh+MuUPQEp4FqQowGFqOA6ez8XgeMogAAgoZwAbXEN+TA0GKg5SChEWTEMgbJUFkgAWCQpsHRhMAggZTEYboxdDBkYEAwsABU8QKQSjIwACbCIZGRVScgSoF0cjAgAZHUcTAB5HAgIOHU9CEBMEl8gECRkf0qkYo1IMEExBADsAAAAAAAAAAAA=';
	maximizeImgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2gYaEiUAOMRwSwAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAeUlEQVQokdXTMQoDMQwEwN2gImdc6BH+gcs83XV+Y64yag6zaVKk9CVFuAWhakAIlpLwbQwAzEwppWU050TvfTMAyDmjlLKMxxggidvZUz/zP2zvfdRan6uotfaQBEiCu++SsDruvkfE/aIPuyimJJA8Xa2I2PhLJV+ZZkgmxKrfgAAAAABJRU5ErkJggg==';
	minimizeImgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2gYaETYJIrE3JAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAJ0lEQVQ4jWP8//8/A7mAiWydo5pHjGZGY2NjspPYEPUzZQE2YFkSAGaGB7JiaHggAAAAAElFTkSuQmCC';
	// 6. Add event listerner for the header div
	widgetHeader.addEventListener('click', toggleWidget, false);
	smartView.addEventListener('click', toggleSmartView, false);
	// 7. Add the classes to all the divs
	// 7.1 First handle the header div
	addClass(widgetHeader, 'widgetDefault');
	addClass(widgetHeader, 'headerMaximized');
	// addClass(widgetHeader, 'roundedCorners');
	// 7.2 Next handle the content div
	addClass(widgetContent, 'widgetDefault');
	// 7.3 Finally handle the footer div
	addClass(widgetFooter, 'widgetDefault');
	// addClass(widgetFooter, 'roundedCorners');
	// 8. Now handle the image
	widgetHeaderImg.src = minimizeImgSrc;
	widgetHeaderImg.alt = 'minimize';
	// 9. Add the dropdown icon to the status column
	classSelector.appendChild(createImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAMAAACEE47CAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMAUExURS4uLkJCQvf393d3d3R0dHBwcOvr63NzczMzM3t7e/b29v///wwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///zmavJgAAAAMdFJOU///////////////ABLfzs4AAAAlSURBVHjaYtCDAgZup+rvr8uduBm4uY1LCpy4QQxuPT0gARBgAJHZBwIzozGkAAAAAElFTkSuQmCC'));
	// 10. Add the liSelected class to the sleeper class item
	addClass(classSL, 'liSelected');
	// 11. Make the display property of the the dropdown to none
	addClass(classSelectorMenu, 'noDisplay');
	// 12. Add the onmouseover listerner to the classSelector
	classSelector.addEventListener('mouseover', toogleClassSelection, false);
	classSelector.addEventListener('mouseout', toogleClassSelection, false);
	// 13. Add the onlick event listener for each of the li items[Each class of service]
	var classesOfService = document.getElementById('classSelector').children.item(1).children;
	for(var i=0; i<classesOfService.length; i++) {
		classesOfService[i].addEventListener('click', classOfServiceChanged, false);
	}
}

if(!GM_DEBUG) {
   var GM_log = function(){};
} else {
	if(unsafeWindow.console){
	   var GM_log = unsafeWindow.console.log;
	}
}

// Start processing only when the node with the ID plannerTrainListResult exists
if ((document.location.href.match('planner.do')) && document.getElementById('plannerTrainListResult')!=null){

	GM_log('Processing is about to start !!!');
	
	var bv_SessionID = 'BV_SessionID';
	var bv_EngineID = 'BV_EngineID';
	var bv_SessionIDValue;
	var bv_EngineIDValue;
	
	//Get the main form and access the hidden fields BV_SessionID and BV_EngineID
	var mainForm = document.forms.namedItem('BookTicketForm');
	bv_SessionIDValue = mainForm.elements.namedItem(bv_SessionID).value;
	bv_EngineIDValue = mainForm.elements.namedItem(bv_EngineID).value;
	
	GM_log(bv_SessionID+':'+bv_SessionIDValue);
	GM_log(bv_EngineID+':'+bv_EngineIDValue);
	
	// These variables will be used by many parts of the program, these vars will be initialized in init() method.
	var widgetHeader;
	var widgetContent;
	var widgetFooter;
	var widgetHeaderImg;
	
	// Images will be initialized in init()
	var loaderImgSrc;
	var maximizeImgSrc;
	var minimizeImgSrc;
	
	// Additional id's which will be referenced in init()
	var classSelectorMenu;
	var classSelector;
	var classSL;
	var class3A;
	var class2A;
	var class1A;
	var statusClass;
	var smartView;
	
	var highlightRow;
	var avaialabilityDivAfterResults = document.getElementById('testdiv');
	
	// Initialize everthing, really everything!!!!
	init();
	
	var trainInfo = createTrainInfo();
	// trainInfo.printTrainList();
	
	// Get the Date
	var date = mainForm.elements.namedItem('JDatee').value;
	
	// Get the day
	var travelDay = date.split('/')[0];
	
	// Get the month
	var travelMonth = date.split('/')[1];
	
	// Get the year
	var travelYear = date.split('/')[2];
	
	// Get the Quota information.
	var Quota = mainForm.elements.namedItem('quota').options[mainForm.elements.namedItem('quota').selectedIndex].text;
	var selectedQuota;
	
	if(Quota == 'Tatkal'){
		selectedQuota ="CK";
	}else if(Quota == 'General'){
		selectedQuota ="GN";
	}else if(Quota == 'Ladies'){
		selectedQuota ="LD";
	}
	
	// Populate Slepper class by default
	populateTrains(trainInfo.trainList, 'SL');
	
}

// Making the clock tick in realtime, based on IRCTC server time (not your system time)
if (document.getElementById('orngnavi')){
	GM_log('About to make the clock a realtime one');
	var window = unsafeWindow || window;
	var anchorHoldingTime = document.evaluate('//a[contains(., "GMT+05:30") or contains(., "IST")]', document.getElementById('orngnavi'), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var dateMatcherRegEx = /(\d{2}-[A][a-z]{2}-\d{4}) \[(\d{2}:\d{2}:\d{2}) ((GMT\+05:30)|(IST))\]/g;
	var matches = dateMatcherRegEx.exec(anchorHoldingTime.text.trim());
	var capturedTime = new Date(anchorHoldingTime.text.trim().replace(/\[|\]|IST|GMT\+05:30/g, '').replace(/-/g, ' '));
	var millisSince1Jan1970 = capturedTime.getTime();
	anchorHoldingTime.innerHTML = matches[1]+' [<span>'+matches[2]+'</span> '+matches[3]+']';
	var tickingSpan = anchorHoldingTime.getElementsByTagName('span')[0];

	window.updateTime = function updateTime(){
		millisSince1Jan1970 += 1000;
		tickingSpan.innerHTML = new Date(millisSince1Jan1970).toLocaleTimeString();
	}

	setInterval("updateTime()",1000);
	GM_log('Now the digital clock should tick');
}