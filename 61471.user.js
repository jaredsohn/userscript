// ==UserScript==
// @name           Blue Coat Filter Helper
// @namespace      http://userscripts.org/scripts/show/56591
// @description    CurrentRun.automateModes reloading and page submission for Blue Coat firewall users.
// @include        *
// @version		   0.8.0
//
// @copyright 	   2009+, Arithmomaniac (http://scr.im/2041)
// @license		   MPL 1.1+ / GPL 2.0+ / LGPL 2.1+ / CC BY-SA 3.0+ US
// @license		   GNU Lesser General Public License 2.1+; http://www.gnu.org/licenses/lgpl.html
// @license		   Mozilla Public License 1.1+ ; http://www.mozilla.org/MPL/
// @license		   GNU General Public License 2.0+; http://www.gnu.org/licenses/gpl.html
// @license		   Creative Commons Attribution-ShareAlike 3.0+ United States License; http://creativecommons.org/licenses/by-sa/3.0/us/
// ==/UserScript==

//Roadmap:

// Version History
// 0.3		(11/01/09)	Set up complete autosubmit
// 0.4a		(11/02/09)	Set up debug switch
//						set up seperate default handling
//						Fixed some potential runtime issues
//						Not tested
// 0.5		(11/02/09)	Made submit values shown and editable on blocked page
// 0.6 		(11/05/09)	Default values can be set from GUI
// 0.7 		(11/07/09)	Supports setting filter blocked message value. ALPHA PUBLIC RELEASE.
// 0.7.1	(11/11/09)  Bugfix: Sets default values for fetched nodes
// 0.8a     (11/15/09)  First attempt at object orientation
// 0.8.0	(11/18/09)	Object orientation complete; should work fine. BETA PUBLIC RELEASE.
// 0.8.1	(11/30/09)	Bugfix: Works with non-default value setting.

// --goals
// bug fixes - triggers based on boolean values
// general code cleanup, jslint, and commenting
// --post 1.0
// make reset fucntion
// Make the first page look prettier
// auto-backup to the blocked page (or page before that)
// Make a variable for URL recurstion depth
// remember permanently blocked and previously submitted pages
// make default link setters on non-auto submit
// make default links dynamic

//---- MULTI-SCRIPT FUNCTIONS ------

//This function gets Greasemonkey values and allows for defaults (for first runs and bad input)
function loadGMValue(valueName, defaultValue, booleanFunction){
	GMValue = GM_getValue(valueName)
	if (!(booleanFunction(GMValue))) //if need to use the default value instead 
	{
		GMValue = defaultValue
		GM_setValue(valueName, GMValue)
	}
	return GMValue
}

//These are a few functions you can feed into loadGMValue to test for a valid value
function numTester(testVar) {
	return (!(isNaN(testVar)))
}
function stringTester(testVar) {
	return ("string" == typeof testVar)
}
function boolTester(testVar) {
	return ("boolean" == typeof testVar)
}

//My custom xpath function. I don't like DOM traversal
function getElementsByXPath(obj, xPathString){
	if (obj.ownerDocument) //emulates look-below behavior for subnodes
	{
		xPathString = xPathString.replace(/^\/\//, '/descendant::')
	}
	var xPathSnapshot = (obj.ownerDocument || obj).evaluate(xPathString, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var xPathArray = [];
	for (var i = 0; i < xPathSnapshot.snapshotLength; i++)
	{
		xPathArray[i] = xPathSnapshot.snapshotItem(i); //convert snapshot to node
	}
	return (xPathArray || ['']);
}

function nodeToText(obj, objName){
	return ('<' + obj.tagName +' name="' + objName + '">' + obj.innerHTML + '</' + obj.tagName +'>')
}
	
function backslash(str){
	x = str
	x = x.replace(/(?=[\W.])/gm, "\\")
	return x
}	

function stringsToRegEx(stringArray, terms){
	return new RegExp(stringArray.join(''), terms)
}

String.prototype.toProperCase = function() { //http://www.codeproject.com/KB/scripting/propercase.aspx
  return this.toLowerCase().replace(  /^(.)|\s(.)/g,  function($1) { return $1.toUpperCase(); }  );
}

//------VARIABLE SETUP-------

var Constants = {
	defaultLinkHTML : '<a href="javascript:setAsDefault">Set as default<\a>',
	testURL		:	'http://userscripts.org/'
}

var Settings = 	{	
	debugMode 		:	loadGMValue('Settings.debugMode', '', boolTester)								,
	defaultURL		:	this.debugMode ? Constants.testURL : ''											,
	automateMode	:	this.debugMode ? 2 : 0															,
	filterText		:	stringsToRegEx(
		[backslash(loadGMValue('Settings.filterText', 'This site is PTI blocked.', stringTester)), ' \((.*)\)\s*$'], 'm'
									)	/*regex to match an error message*/ 							,
	maxReloadTime	:	loadGMValue('Settings.reloadTime', 2000, numTester)				
}
			
var CurrentRun ={
	filterURL 		:	loadGMValue('CurrentRun.filterURL', Settings.defaultURL, stringTester) ,//The URL of the previous non-filter page
	automateMode	:	loadGMValue('CurrentRun.automateMode', Settings.automateMode, numTester) //whether to automate the site submission with default values
}
			
function useSelectedText() {
	GM_setValue('Settings.filterText', window.getSelection().toString().trim())
	window.location.reload(false)
}

GM_registerMenuCommand('Blue Coat: Use selected text as filter string', useSelectedText)

var firstPar = getElementsByXPath(document, '//p')[0]
var firstParText = firstPar ? firstPar.textContent : ''

function Field(name, hasNodeHTML) {
	this.name = name
	this.GMstring = function (GMValue) {return ['Fields.',this.name,'.', GMValue].join('') }
	if (hasNodeHTML) { this.nodeHTML = GM_getValue(this.GMstring('nodeHTML'))}
	this.defaultValue = loadGMValue(this.GMstring('defaultValue'), '', stringTester)
	this.value = GM_getValue(this.GMstring('value')) || this.defaultValue
}

var Fields 	= {	
	email   : new Field('email', null),
	category: new Field('category', true),
	service : new Field('service', true)
}

function fieldReset()
{
	GM_setValue('CurrentRun.filterURL', Settings.defaultURL) //sets the filterURL value.
	GM_setValue('CurrentRun.automateMode', Settings.automateMode) //turns off CurrentRun.automateMode.
	for each (i in Fields)	{
		GM_setValue(i.GMstring('value'), '')  //will set back to defaults on next load.
	}
	GM_log('Reset fields')
}

GM_log('Up and running')

if (window.location.hostname != 'sitereview.cwfservice.net') {
	GM_log('not on filter page')
	fieldReset()
	if (!(Fields.category.nodeHTML)) /*we need to fetch these values*/ {
		GM_setValue('CurrentRun.filterURL', Constants.testURL)
		GM_setValue('CurrentRun.automateMode', 1)
		window.open('http://sitereview.cwfservice.net/sitereview.jsp')
		alert('The Blue Coat Filter Helper needs a one-time initialization run.\n' +
		'PLEASE OPEN THE POPUP AND DO NOT CLOSE IT; IT WILL CLOSE ITSELF.\n' +
		'Sorry for the inconvenience.')
	}
}

//-----HANDLING A PAGE BLOCKED BY THE FILTER--------

if (Settings.filterText.test(firstParText)) /*if the site is blocked */ {
	imgFix = getElementsByXPath(document, '//img')[0]
	if (imgFix && 'http://192.168.1.1/images/ContentControl.gif' == imgFix.src) { //if image showing normal filtering displayed
		GM_log('Normal Filter page')
		//We then code in links for submitting and auto-submitting sutes
		firstPar.innerHTML += '<br><table><tbody>' +
		'<tr><td colspan="2"> AutoFill Values</td></tr>' +
		'<tr><td>URL</td><td><input name= "GM_url" value="http://' + window.location.hostname + '/"></td></tr>' +
		'<tr><td>Email</td><td><input name = "GM_email" value="' + Fields.email.value + '">  ' + Constants.defaultLinkHTML + '</td></tr>' +
		'<tr><td>Category</td><td>' + Fields.category.nodeHTML + '  ' + Constants.defaultLinkHTML + '</td></tr>' +
		'<tr><td>Service</td><td>' + Fields.service.nodeHTML + '  ' + Constants.defaultLinkHTML + '</td></tr>' +
		'<tr><td><input name = "GM_Auto1" type="submit" value="AutoSubmit URL Only"></td>' +
		    '<td><input name = "GM_Auto2" type="submit" value="AutoSubmit All Values"></td></tr>' +
		'</tbody></table>'

for each (i in Fields) {
	if (i == Fields.email || i.nodeHTML) {//either email, or fetched the other nodes already
		i.nodeDOM = getElementsByXPath(firstPar, '//*[@name="GM_' + i.name + '"]')[0]
		i.nodeDOM.value = i.value //sets values to default
	}
}		

var urlField = getElementsByXPath(firstPar, '//input[@name="GM_url"]')[0] //url not a standard Field, so outside framework.

		function saveAsDefault(evt)	{
			evt.stopPropagation()
			evt.preventDefault()
			var nodeToSet = getElementsByXPath(evt.target, 'preceding-sibling::*')[0]
			for each (i in Fields) { /*if link next to this node */
				if (nodeToSet == i.nodeDOM) { 
					GM_setValue(i.GMstring('defaultValue'), nodeToSet.value)
					GM_log(i.name + ' was set to ' + nodeToSet.value)
				}
			}
		}
		
		var defaultSetLinks = getElementsByXPath(document, '//a[text()="Set as default"]')
		for(i=0; i < defaultSetLinks.length; i++) {
			defaultSetLinks[i].addEventListener("click", saveAsDefault, false)
		}
				
		//if clicked Auto-submit, set up auto-submit trigger
		function valueGmWriter(evt)	{
			if (evt.target.name =='GM_Auto2' && 
			(!(Fields.email.nodeDOM.value) || (Fields.category.nodeDOM.value == "0") || !(Fields.service.nodeDOM.value))
				) {
				evt.stopPropagation()
				evt.preventDefault()
				alert('Sorry, you need to fill out all of the fields to do this')
			}
			else {
				GM_setValue('CurrentRun.filterURL', urlField.value)
				GM_setValue('CurrentRun.automateMode', (evt.target.name =='GM_Auto2') ? 2 : 1)
				for each (i in Fields) {
					GM_setValue(i.GMstring('value'), i.nodeDOM.value)	//send current value
				}
				window.location = 'http://sitereview.cwfservice.net/sitereview.jsp'
			}			
		}

		var SubmitButtons = getElementsByXPath(firstPar, '//input[@type="submit"]') //grab the links we just created
		for (i = 0; i < SubmitButtons.length; i++)	{
			SubmitButtons[i].addEventListener("click", valueGmWriter, false)
		}
		
	}
	else //Must be a technical, non-filtering error
	{
		GM_log('Technical Filter page')
		firstPar.textContent = "Will reload. Please wait..."
		window.setTimeout(function(){window.location.reload(false)}, Math.random() * Settings.maxReloadTime)
	}
}
//------------------------------------------------------------
if (window.location.href.indexOf("http://sitereview.cwfservice.net/sitereview.jsp") == 0)
{
	GM_log("on a filter page")
	GM_log("CurrentRun.automateMode: " + CurrentRun.automateMode)

	CheckRatingButton = getElementsByXPath(document, '//input[@value="Check Rating"]')[0]
	
	if (CheckRatingButton) { //on the "submit a site" page
		GM_log("on URL page")
		getElementsByXPath(document, '//*[@name="url"]')[0].value = CurrentRun.filterURL
		 //put in the last URL
		if (CurrentRun.automateMode && CurrentRun.filterURL)	
			{ CheckRatingButton.click()	}
	}
	
	else if (getElementsByXPath(document, '//*[@class="bodytext"]')[0]) { //on the "submit details" page
		GM_log("on options page")
		CurrentRun.automateReason = ( CurrentRun.automateMode == 2 ) ? 2 : 0
		
		//Resets current operation to defaults
		fieldReset()

		Fields.service.nodeDOM  = getElementsByXPath(document, '//select[@name="type"]')[0]
		Fields.category.nodeDOM = getElementsByXPath(document, '//select[@name="suggestedcat"]')[0]
		
		if (Fields.service.nodeDOM && Fields.category.nodeDOM) //not on an "impossible to change" page
		{
			GM_log('can submit from this page')
			if (!(Fields.category.nodeHTML)){ 
				CurrentRun.automateReason = 1 
			}
			getElementsByXPath(document, '//*[@id="emailCheck"]')[0].checked = true //noe we know this should exist
			Fields.email.nodeDOM = getElementsByXPath(document, '//*[@name="email"]')[0]
			
			GM_setValue('Fields.service.nodeHTML' , nodeToText(Fields.service.nodeDOM, 'GM_service'))
			GM_setValue('Fields.category.nodeHTML', nodeToText(Fields.category.nodeDOM, 'GM_category'))
			if (CurrentRun.automateReason == 1) { //only happens if making a test run to grab user values
				GM_log('Just fetching values')
				GM_setValue('Fields.category.defaultValue', Fields.category.nodeDOM.value)
				GM_setValue('Fields.service.defaultValue', Fields.service.nodeDOM.value)
				window.close()
			}
				
			for each (i in Fields){
				if (i.value && !(i == Fields.category && i.value == "0")){
					i.nodeDOM.value = i.value
				}
				else{
					CurrentRun.automateReason = 0 //don't auto-submit
					GM_log('Missing values killed the auto-submit')
				}
			}
			
			if (CurrentRun.automateReason) { //if was 1, would have cleared already
				GM_log('Ready to auto-submit')
				if (Settings.debugMode)		{ 
					alert ('would submit now!') 
				}
				else	{ 
					getElementsByXPath(document, '//input[@value="Submit for Review"]')[0].click()
				}
			}	
		}	
	}
}

