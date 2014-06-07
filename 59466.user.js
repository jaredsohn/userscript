// ==UserScript==
// @name           Clan Activity Log Manager
// @namespace      http://userscripts.org/scripts/show/59466
// @description    Allows sections of the clan log to be hidden
// @include        *127.0.0.1:*clan_log.php*
// @include        *kingdomofloathing.com/clan_log.php*
// @exclude       http://images.kingdomofloathing.com/*
// @exclude       http://forums.kingdomofloathing.com/*
// ==/UserScript==

// VERSION 3.2
// Add "collapse/expand all" button for the character stash tables

// VERSION 3.1.1
// Some more adjustments of the toggling code to be more
// robust, and rearranging of the stash parsing to fit
// more nicely into the flow of the clan log

// VERSION 3.1
// Cleaned up a bunch of the stash parsing code,
// and also the use of "onclick" to be more dynamic
// and programmatically assigned throughout.

// VERSION 3.0
// Add support to show the stash activity on a
//  player-by-player basis. 

// VERSION 2.1
// Faxbot support, thanks to Croft!
// Get rid of all but the most recent Faxbot fax.
// Also remove Faxbot comings and goings.

// VERSION 2.0
// The code is no longer an awful hack-job mess. 
// Fun DOM stuff and the ability to deal with different clans!

// Copied from Dr. Evi1's Raid Log Manager! Rather useful.
// ----Copy----
// ----------------------------------------------------------------
// FUNCTION addScript - Adds scriptText to the current page's header
// ----------------------------------------------------------------
function addScript(scriptText){
		var head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		var addScript = document.createElement("script");
		addScript.innerHTML = scriptText;
		head.appendChild(addScript);    
	}
	
addScript('function toggleRow(theElement) { \n'+
    '    var div = document.getElementById(theElement);\n'+
    '    if (div.style.display=="none")\n'+
    '        div.style.display = "block";\n'+
    '    else\n'+
    '        div.style.display = "none";\n'+
    '}');
    
//---End Copy----

var head = document.getElementsByTagName('head')[0];
var tempStyle = '<style type="text/css">#stashWrap a, .toggleButton {color: white;}' 
	+ '#stashWrap, #hideAll {font-size: x-small; width: 55em; position: relative;  border: 1px solid; margin: auto; }' 
	+ '#stashWrap {-moz-column-count: 2; border-top: none; }'
	+ '#hideAll {text-align: center; border-bottom: none; cursor: pointer;}'
	+ '.stashTable {border: solid 1px blue; font-size: small; margin: 5px auto; width: 95%;}'
	+ '.stashTable th {background-color: blue;}'
	+ '.toggleButton {display: block; float: right; cursor: pointer;}'
	+ '#stashButton {cursor: pointer; padding: 3px; font-weight: bold; font-size: smaller; margin: 5px auto; width: 15em;'
	+ '</style>';
head.innerHTML += tempStyle;

// Clear up Faxbot's mess, code courtesy of Croft
document.body.innerHTML= document.body.innerHTML.replace(/<br>\d\d\/\d\d\/\d\d, \d\d:\d\d.M: <a class=[^>]+>FaxBot \(#2194132\)<\/a> faxed in a [^<]+/g,""); 
document.body.innerHTML= document.body.innerHTML.replace(/\d\d\/\d\d\/\d\d, \d\d:\d\d.M: FaxBot \(#2194132\) joined another clan.<br>/g,""); 
document.body.innerHTML= document.body.innerHTML.replace(/\d\d\/\d\d\/\d\d, \d\d:\d\d.M: FaxBot \(#2194132\) was accepted into the clan \(whitelist\)<br>/g,"");

// Clear up everyone else's whitelisting
document.body.innerHTML= document.body.innerHTML.replace(/\(whitelist\)/g,"");

// Gather up the section titles
var headers = document.getElementsByTagName('b');
var z = 0;

var rawStashData;
var stashButton;

//flag for collapse/expand character tables (better than string matching the html?)
var expand = true;

// Start at the fourth (j=3) <b> tag, the first two are page and clan titles,
// and the "Clan Activity Log" section is different from the rest
for (var j=3;j<headers.length;j++) { 
	//rawStashData += headers[j].innerHTML;
	var ht = headers[j].innerHTML;
	if(ht.indexOf("Stash Activity") > -1){
		//get the data through some table-dissecting DOM jumping
		rawStashData = headers[j].parentNode.nextSibling.firstChild.firstChild.firstChild.firstChild.innerHTML;

		stashButton = document.createElement('div');
			with(stashButton){			
				id = 'stashButton';
				innerHTML = 'Player-by-Player Breakdown:';
				setAttribute('onClick','toggleRow("stashWrap")');

				//a one-time occurance to parse the stash logs
				addEventListener('click',stashButtonClick,false);
				addEventListener('click',toggleCollapseButton,false);
			};

		//insert the stash parsing button
		headers[j].parentNode.nextSibling.nextSibling.appendChild(stashButton);		
	}
	
	//add a collapse toggle on click
	if (headers[j].parentNode.nextSibling.tagName == "TABLE") {
		//var headerText = headers[j].innerHTML;
		with(headers[j]){		
			//innerHTML = headerText;
			style.cursor = 'pointer';
			setAttribute('onClick','toggleRow("shrink' + z + '")');
			parentNode.nextSibling.id = 'shrink' + z;
			parentNode.nextSibling.style.display = 'none';
		}
		z++;			
	}
}

// Account for the "Clan Activity Log" section, if it has content
if (headers[2].nextSibling.firstChild.tagName == "TABLE") {
	with(headers[2]){
		setAttribute('onClick','toggleRow("shrink' + z + '")');
		style.cursor = 'pointer';
		nextSibling.firstChild.id = 'shrink' + z;
		nextSibling.firstChild.style.display = 'none';
	}
	z++;
}

function stashButtonClick(){
	divideStash(rawStashData);
	//only parse the data once, then ignore this function
	stashButton.removeEventListener('click',stashButtonClick);
}

//parse the stash log, and display it by character
function divideStash(stashData){
	//create the container div to hold the detailed data
	var stashWrap = document.createElement('div');
	stashWrap.setAttribute('id', 'stashWrap');
	sButton = document.getElementById('stashButton');
	stashButton.parentNode.appendChild(stashWrap);

	var stashLines = stashData.split("<br>");
	//stashWrap.innerHTML += 'stashLines length:' + stashLines.length;
	var characters = [];

	for ( var i = 0 ; i < stashLines.length; i++ ){
		var charNameStart = stashLines[i].indexOf("M: ") + 3;
		var charNameEnd = stashLines[i].indexOf(")") + 5;
		
		//find the character name
		var tempChar = stashLines[i].substring(charNameStart,charNameEnd);
		
		//and what they did with the stash
		var tempAction = stashLines[i].substr(charNameEnd);
		//stashWrap.innerHTML += tempChar;
		
		//check if the character already exists in the array, and add the
		//stash action to their array of actions (creating one if needed)
		var newCharFlag = true;
		var charLoc = 0;
		for ( var j = 0 ; j < characters.length ; j++ ){
			if(characters[j].indexOf(tempChar) != -1){
				//characters[j][characters[j].length] = tempAction;
				newCharFlag = false;
				charLoc = j;
				//no need to carry on
				break;
			} 
		} // end character looping
		
		if(!newCharFlag && tempAction != ""){
			characters[charLoc][characters[charLoc].length] = tempAction;
		} else if (newCharFlag && tempAction != ""){
			//var newChar = [tempChar];
			characters[characters.length] = [] ;
			var charLoc = characters.length - 1;
			characters[charLoc] = [tempChar];
			characters[charLoc][characters[charLoc].length] = tempAction;		
		}		
	} // end stash data looping
	
	//add a "collapse/expand all" button for the character tables
	hideAll = document.createElement('div');
	with(hideAll){
		id = 'hideAll';
		innerHTML = '[Collapse All]'
		addEventListener('click',collapseCharTables,false);
		//hack to synch up the hide all button with the general stash tables
		style.display = 'none';
	}
	stashWrap.parentNode.insertBefore(hideAll,stashWrap);
	
	//create a table for each character, displaying their actions
	for ( var s = 0 ; s < characters.length ; s++ ){
		createCharTable(characters[s], s);
		//stashWrap.innerHTML += characters[s][0];
	}
}

function collapseCharTables(){
	var tables = document.getElementsByClassName('stashTable');
	for (var i = 0 ; i < tables.length; i++){
		theId = 'char' + i;
		theTable = document.getElementById(theId);
		
		//can't use "toggleRow", as it's part of the HTML, 
		//not a script, so recreate the functionality:
		if (!expand){
			theTable.style.display = 'block';
			this.innerHTML = '[Collapse All]';
			
		} else {
			theTable.style.display = 'none';
			this.innerHTML = '[Expand All]';
			
		}
		clickToggle.call(tables[i].getElementsByClassName('toggleButton')[0]);
	}		
	expand = !expand;
}

function toggleCollapseButton(){
	theButton = document.getElementById('hideAll');
	//can't use "toggleRow", as it's part of the HTML, 
	//not a script, so recreate the functionality:
	if (theButton.style.display == 'none'){
		theButton.style.display = 'block';
	} else {
		theButton.style.display = 'none';
	}	
}

function createCharTable(charArray, charNum){
	//create all the elements of a table...
	var mainWrapDiv = document.getElementById('stashWrap');
	var st = document.createElement('table');
	var sh = document.createElement('thead');
	var sb = document.createElement('tbody');
	var sr = document.createElement('tr');
	var sth = document.createElement('th');
	var sd = document.createElement('td');
	st.setAttribute('class', 'stashTable');
	
	//...and put them together for the header, 
	//including show/hide toggling...
	mainWrapDiv.appendChild(st);
	st.appendChild(sh);
	sh.appendChild(sr);
	sr.appendChild(sth);
	st.appendChild(sb);
	
	var linkedId = 'char' + charNum;
	sb.id = linkedId;
		
	sth.innerHTML = charArray[0];
			
	var toggle = document.createElement('div');
	with(toggle){
		setAttribute('class','toggleButton');
		//style.cursor = 'pointer';
		setAttribute('onClick','toggleRow("' + linkedId + '")');
		innerHTML = '[&#8211;]';
		addEventListener('click',clickToggle,false);
	}
	sth.appendChild(toggle);
		
	//and also the content
	//index 0 is the character name
	for(var r = 1; r < charArray.length ; r++){
		sr = document.createElement('tr');
		sd = document.createElement('td');
		sb.appendChild(sr);
		sr.appendChild(sd);
		sd.innerHTML = charArray[r];
	}
}

function clickToggle(){
	var temp = this.innerHTML;
	var tableBody = this.parentNode.parentNode.parentNode.nextSibling;
	
	//fancy +/- button!	
	if(tableBody.style.display == 'block'){
		temp = temp.replace(/\+/,'&#8211;');
	} else if (tableBody.style.display == 'none') {
		temp = temp.replace(/\[\S\]/,'[+]');
	}
	this.innerHTML = temp;	
}
