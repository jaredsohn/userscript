// ==UserScript==
// @name           Pardus Nav Screen Job Display
// @namespace      pardus.at
// @description    Displays running missions on the Nav screen
// @include        http://*.pardus.at/main.php*
// @include        http://*.pardus.at/bulletin_board.php*
// @include        http://*.pardus.at/overview_jobs.php*

// ==/UserScript==

// //////////////////////////////////////////////////////////////////////////
// Constants:
// //////////////////////////////////////////////////////////////////////////

var SECOND = 1000;
var MINUTE = SECOND * 60;
var HOUR   = MINUTE * 60;
var DAY    = HOUR   * 24;

var STORED_VALUE_NAME = 'jobs';

// Available Nav Display References
var RIGHT_COL   = 0;
var LEFT_COL    = 1;

// Available Nav Display Reference Relations
var BEFORE = 0;
var AFTER  = 1;

var IMAGE_URL = 'http://static.pardus.at/images';

// //////////////////////////////////////////////////////////////////////////
// User Editable Values 
// //////////////////////////////////////////////////////////////////////////

var missionsToDisplay = 0;	//Set this value to 0 to display all missions
				//  Otherwise, set to the number of missions 
				//  to display

var showEuropeanDate = false;	//The default date value is MM/DD HH:MM
				//  Set this to true to display as DD/MM HH:MM

var timeThreshold = 0;		//Only display missions that are longer than
				//  this threshold.
				//  Example: (3 * DAY) + (2 * HOUR);

var navDisplayReference = RIGHT_COL;	//Choose a display location
					//  on the Nav screen
					//  See Constants section for
					//  appropriate values.

var navDisplayReferenceRelation = AFTER;	//Choose where in relation to the
						//  navDisplayReference you want to
						//  show the list on the Nav screen

var columnsToDisplay = new Array();
columnsToDisplay[0] = '<tr><td colspan="2" style="border: solid 1px red;" align="center">!VALUE!</td></tr>~faction';
columnsToDisplay[1] = '<tr><td align="center">!VALUE!</td><td align="center">!VALUE!</td></tr>~type~amount';
columnsToDisplay[2] = '<tr><td colspan="2" align="center">';
columnsToDisplay[3] = 'due_date';
columnsToDisplay[4] = '</td></tr>';
columnsToDisplay[5] = '<tr><td colspan="2" align="center">!VALUE!</td></tr>~target_object';
columnsToDisplay[6] = '<tr><td colspan="2" align="center">!VALUE! !VALUE!</td></tr>~target_sector~target_coords';

var defaults = new Array();
defaults['faction'      ] = 'Neutral';
/*
defaults['type'         ]
defaults['amount'       ]
defaults['time'         ]
defaults['start_time'   ]
defaults['due_date'     ]
defaults['target_object']
defaults['target_sector']
defaults['target_coords']
defaults['reward'       ]
defaults['deposit'      ]
*/

// //////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard GreaseMonkey functions
//	       Please give credit if using these functions in your own code.
// //////////////////////////////////////////////////////////////////////////

function writeValue(name,value,days) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	GM_setValue(subdomain + '-' + name,value);

}

function readValue(name) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	try {
		var temp = GM_getValue(subdomain + '-' + name);
		if(temp != '~~~DELETED~~~') return temp;
		return null;
       	} catch(err) {
       		return null;
	}
}

function deleteValue(name) {
	writeValue(name,"~~~DELETED~~~");
}

function addElement(valueName, element) {

	//This is a standard function created by Rhindon.  It assumes that
	//a function exists called "serializeElement" which does just that.

	var serializedElement = serializeElement(element)

	var eArray = getElementArray(valueName);



	if(!eArray) {
		//This is the only element -- Set the index to '0' and write the string
		serializedElement = serializedElement.replace('!INDEX!', 0);
		writeValue(valueName, serializedElement);
		return;
	}

	serializedElement = serializedElement.replace('!INDEX!', eArray.length);

	eArray[eArray.length] = serializedElement;

	var newValue = '';
	for(var i = 0; i < eArray.length; i++) {
		var addVal = eArray[i].replace(/{/g, '').replace(/}/g, '');
		if(addVal.substr(addVal.indexOf('~')) == serializedElement.substr(serializedElement.indexOf('~'))) {
			//This element already exists.  Don't add it again.
			continue;
		}

		newValue += '{' + addVal + '}';
	}

	writeValue(valueName, newValue);
}

function deleteElement(valueName, idx) {
	var cnt = 0;

	var eArray = getElementArray(valueName);

	var newValue = '';

	for(var i = 0; i < eArray.length; i++) {
		//Strip off the Index
		eArray[i] = '!INDEX!' + eArray[i].substr(eArray[i].indexOf('~'));
		alert(eArray[i]);
		if(i != idx) {
			//Set the new index and add the element.
			newValue += '{' + eArray[i].replace('!INDEX!', ++cnt) + '}';
		}
	}

	writeValue(valueName, newValue);

}

function getElementArray(valueName) {
	var estring = readValue(valueName);

	if(!estring) {
		return null;
	}

	estring = estring.replace(/}/g, '').substr(1);

	return estring.split('{');

}

function stripTags(str) {

	var done = false;

	while(!done) {
		var ltIdx = str.indexOf('<');
		var gtIdx = str.indexOf('>');

		if(ltIdx < 0 && gtIdx < 0) {
			
			//Strip leading and trailing spaces
			if(str.substr(0, 1) == ' ') {
				str = str.substr(1);
				continue;
			} else if(str.substr(str.length - 1, str.length) == ' ') {
				str = str.substr(0, str.length - 1);
				continue;
			}

			done = true;
			continue;
		}

		if(gtIdx < 0) {
			str = str.substr(0, ltIdx);
		} else if(ltIdx == 0 || gtIdx < ltIdx || ltIdx < 0) {
			str = str.substr(gtIdx + 1);
		} else if(gtIdx == str.length - 1) {
			str = str.substr(0, ltIdx);
		} else {
			str = str.substr(0, ltIdx) + str.substr(gtIdx + 1);
		}
	}

	return str.replace('&nbsp;', '');
}

// //////////////////////////////////////////////////////////////////////////
// End imported code
// //////////////////////////////////////////////////////////////////////////


// //////////////////////////////////////////////////////////////////////////
// Code to Parse Missions
// //////////////////////////////////////////////////////////////////////////

function saveTaken() {

	if(document.URL.indexOf('bulletin_board.php') >= 0) {
		if(unsafeWindow.midesc) { //Compact View
			for (z = 0; z < unsafeWindow.missions.length; z++) {

				if(unsafeWindow.taken[unsafeWindow.missions[z]['id']] == 1) {
					writeCompactMission(unsafeWindow.midesc[z]);
				}
			}
			alert('Missions Saved.');
		} else {	//Normal View
			tables = document.getElementsByTagName('table');

			for(var i = 0; i < tables.length; i++) {
				if(tables[i].className == 'messagestyle' && tables[i].width == '70%') {
					writeNormalMission(tables[i].innerHTML);
				}
			}
			alert('Missions Saved.');
		}	
	} else if(document.URL.indexOf('overview_jobs.php') >= 0) {

		deleteValue(STORED_VALUE_NAME);

		for (z = 0; z < unsafeWindow.midesc.length; z++) {
			writeCompactMission(unsafeWindow.midesc[z]);
		}
	}
}

function writeCompactMission(desc) {

	var m = new Object();

	//Get the items by tokenizing the Table Datas in the string

	desc = desc.substr(desc.indexOf('<td') + 1);
	m['faction'] = '<' + desc.substr(0, desc.indexOf('<td'));
	m['faction'] = m['faction'].substr(m['faction'].indexOf('>') + 1);
	m['faction'] = m['faction'].replace('</td>', '');

	desc = desc.substr(desc.indexOf('<td') + 1);
	m['type'] = '<' + desc.substr(0, desc.indexOf('<td'));
	m['type'] = m['type'].substr(m['type'].indexOf('>') + 1);
	m['type'] = m['type'].replace('</td>', '');

	desc = desc.substr(desc.indexOf('<td') + 1);
	m['amount'] = '<' + desc.substr(0, desc.indexOf('<td'));
	m['amount'] = m['amount'].substr(m['amount'].indexOf('>') + 1);
	m['amount'] = m['amount'].replace('</td>', '');
	m['amount'] = stripTags(m['amount']);

	if(m['amount'].indexOf('free') > 0) {
		 m['amount'] = m['amount'].substr(0, m['amount'].indexOf('free'));
	}

	desc = desc.substr(desc.indexOf('<td') + 1);
	m['time'] = '<' + desc.substr(0, desc.indexOf('<td'));
	m['time'] = stripTags(m['time']);

	desc = desc.substr(desc.indexOf('<td') + 1);
	m['target_object'] = '<' + desc.substr(0, desc.indexOf('<td'));
	m['target_object'] = stripTags(m['target_object']);

	desc = desc.substr(desc.indexOf('<td') + 1);
	m['target_sector'] = '<' + desc.substr(0, desc.indexOf('<td'));
	m['target_sector'] = stripTags(m['target_sector']);

	desc = desc.substr(desc.indexOf('<td') + 1);
	m['target_coords'] = '<' + desc.substr(0, desc.indexOf('<td'));
	m['target_coords'] = stripTags(m['target_coords']);

	desc = desc.substr(desc.indexOf('<td') + 1);
	m['reward'] = '<' + desc.substr(0, desc.indexOf('<td'));
	m['reward'] = stripTags(m['reward']);

	desc = desc.substr(desc.indexOf('<td') + 1);
	m['deposit'] = '<' + desc.substr(0, desc.indexOf('<td'));
	m['deposit'] = stripTags(m['deposit']);


	//Calculate the end time, and store the .valueOf result
	m['time'] = getTimeDifference(m['time']);

	var theDate = new Date();
	m['start_time'] = theDate.valueOf();

	var dueDate = new Date(theDate.valueOf() + m['time']);

	m['due_date'] = dueDate.valueOf();

	addElement(STORED_VALUE_NAME, m);

}


function writeNormalMission(desc) {
	
	desc = desc.substr(desc.indexOf('<th') + 1);
	m['faction'] = '<' + desc.substr(0, desc.indexOf('</th>'));
	m['faction'] = m['faction'].substr(m['faction'].indexOf('<'));

	alert('Faction: ' || m['faction']);

}

// //////////////////////////////////////////////////////////////////////////
// Serialize/Deserialize Code
// //////////////////////////////////////////////////////////////////////////

function serializeElement(m) {

	return '{!INDEX!~' + 
		m['faction'      ]  + '~' +
		m['type'         ] + '~' +
		m['amount'       ] + '~' +
		m['time'         ] + '~' +
		m['start_time'   ] + '~' +
		m['due_date'     ] + '~' +
		m['target_object'] + '~' +
		m['target_sector'] + '~' +
		m['target_coords'] + '~' +
		m['reward'       ] + '~' +
		m['deposit'      ] + '}';

}


function deserializeElement(mission) {
	mission = mission.replace(/}/g, '').replace('{', '');

	var mArr = mission.split('~');

	var m = new Object();

	m['index'         ] = mArr[0]
	m['faction'       ] = mArr[1];
	m['type'          ] = mArr[2];
	m['amount'        ] = mArr[3];
	m['time'          ] = mArr[4];
	m['start_time'    ] = mArr[5];
	m['due_date'      ] = mArr[6];
	m['target_object' ] = mArr[7];
	m['target_sector' ] = mArr[8];
	m['target_coords' ] = mArr[9];
	m['reward'        ] = mArr[10];
	m['deposit'       ] = mArr[11];

/*	alert(mission + '\n\n' + m['faction']  + '\n' +
		m['type']  + '\n' +
		m['amount']  + '\n' +
		m['time']  + '\n' +
		m['target_object']  + '\n' +
		m['target_sector']  + '\n' +
		m['target_coords']  + '\n' +
		m['reward']  + '\n' +
		m['deposit']);
*/
	return m;
}

function cleanupElements(valueName) {
	var arr = getElementArray(valueName);

	if(!arr) return;

	var newElementString = '';
	var count = 0;

	for(var i = 0; i < arr.length; i++) {
		var m = deserializeElement(arr[i]);

		var now = new Date();
		if(m['due_date'] > now.valueOf()) {
			var serializedElement = serializeElement(m);
			serializedElement.replace('!INDEX!', count);
			newElementString += serializedElement;
			count++;
		}
	}

	writeValue(valueName, newElementString);
}

// //////////////////////////////////////////////////////////////////////////
// Utility Functions
// //////////////////////////////////////////////////////////////////////////

function getTimeDifference(timeString) {

	var days = '0';
	var hours = '0';
	var minutes = '0';
	
	if(timeString.indexOf('d') > 0) {
		days = timeString.substr(0, timeString.indexOf('d'));
	}
	
	if(timeString.indexOf('h') > 0) {
		hours = ' ' + timeString.substr(0, timeString.indexOf('h'));
		hours = hours.substr(hours.lastIndexOf(' '));
	}
	
	if(timeString.indexOf('m') > 0) {
		minutes = ' ' + timeString.substr(0, timeString.indexOf('m'));
		minutes = minutes.substr(minutes.lastIndexOf(' '));
	}
	
	if(timeString.indexOf('d') < 0 && timeString.indexOf('h') < 0 && timeString.indexOf('m') < 0) {
		minutes = timeString;
	}

	return (days * DAY) + (hours * HOUR) + (minutes * MINUTE);

}


// //////////////////////////////////////////////////////////////////////////
// HTML Generation Code
// //////////////////////////////////////////////////////////////////////////

function getAllMissionHTML(valueName) {
	var missions = getElementArray(valueName);

	if(missions) {

		var count = 0;
		var html = '<table width="80%">';
	
		var cap = missions.length;
		if(missionsToDisplay > 0 && missionsToDisplay < missions.length) cap = missionsToDisplay;

		for(var i = 0; count < cap && i < cap; i++) {

			var m = deserializeElement(missions[i]);

			if(parseInt(m['time']) < timeThreshold) continue;

			count++;
			html += getMissionHTML(m, columnsToDisplay);
		}

		if(count > 0) return html + '</table>';
	}

	return '<table><tr><td>No missions to display.</td></tr></table>';

}

//Returns <tr> element with the columns passed
function getMissionHTML(m, columnsArr) {

	var html = '<tr>';
	html += '<td>';
	html += '<table width="100%">';


	for(var i = 0; i < columnsArr.length; i++) {

		var cname = columnsArr[i];

		if(!cname) continue;

//		html += '<tr><td>';

		if(cname == 'due_date') {
			//Calculate the Due Date & Time for this mission
			var d = new Date(parseInt(m[cname]));
			var dateString = d.getMonth() + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
			if(showEuropeanDate) {
				dateString = d.getDate() + '/' + d.getMonth() + ' ' + d.getHours() + ':' + d.getMinutes();
			}

			html += dateString;
		} else if(m[cname]) {
			html += m[cname];
		} else {
			if(cname.indexOf('~')) {
				var spl = cname.split('~');
				var writeStr = spl[0];
				for(var j = 1; j < spl.length; j++) {
					var val = m[spl[j]];

					if(val == '-' && defaults[spl[j]]) {
						val = defaults[spl[j]];
					}

					writeStr = writeStr.replace('!VALUE!', val);
				}

				html += writeStr;
			} else {
				html += cname;
			}
		}

//		html += '</td></tr>';

	}

	html += '</table></td></tr>';

	return html;

}


// //////////////////////////////////////////////////////////////////////////
// Bulletin Board Page Code
// //////////////////////////////////////////////////////////////////////////
if(document.URL.indexOf('bulletin_board.php') >= 0) {
	var buttonHTML = '<button id="saveTakenButton">Save Accepted Missions</button><br>';
	document.getElementById('missions').innerHTML = buttonHTML + document.getElementById('missions').innerHTML;
	document.getElementById('saveTakenButton').addEventListener('click',saveTaken,true);
}

// //////////////////////////////////////////////////////////////////////////
// Nav Screen Code
// //////////////////////////////////////////////////////////////////////////

if(document.URL.indexOf('main.php') >= 0) {

	cleanupElements(STORED_VALUE_NAME);
	
	var nav_box_html = '<br>';
	
	//Nav Box Top
	nav_box_html += "<table width=\"210\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	nav_box_html += "	<tr>";
	nav_box_html += "		<td style=\"background-image:url('" + IMAGE_URL + "/cargo.png');background-repeat:repeat-y;background-position: 0px 0px; height: 28px; overflow: hidden;\">";
	nav_box_html += "			<table align=\"center\" style=\"width: 150px; background-image:url('" + IMAGE_URL + "/bgmedium.gif');\"><tr><td align=\"center\" style=\"font-family: arial; text-size: 12pt;\"><b>Running Missions</b></td></tr></table> ";
	nav_box_html += "		</td>";
	nav_box_html += "	</tr>";
	nav_box_html += "	<tr>";
	nav_box_html += "		<td style=\"background-image:url('" + IMAGE_URL + "/panel.png');background-repeat:repeat-y\" align=\"center\">";
	
	//Nav Box Content
	nav_box_html += getAllMissionHTML(STORED_VALUE_NAME);
	
	//Nav Box Bottom
	nav_box_html += "		</td>";
	nav_box_html += "	</tr>";
	nav_box_html += "	<tr>";
	nav_box_html += "		<td>";
	nav_box_html += "			<img src=\"" + IMAGE_URL + "/panelbottom.png\" width=\"210\" height=\"22\">";
	nav_box_html += "		</td>";
	nav_box_html += "	</tr>";
	nav_box_html += "</table><br /><br />";
	
	
	var div = document.getElementsByTagName('div');
	
	//search for the parent table of the cargo section
	var table = document.getElementsByTagName('table');
	
	//Get the picture name to search for based on the Display Location Reference
	var searchStr;
	if(navDisplayReference == RIGHT_COL) {
		searchStr = 'cargo.png';
	} else if (navDisplayReference == LEFT_COL) {
		searchStr = 'status.png';
	}

	for(i = 0; i < table.length; i++)
	{
		if(table[i].innerHTML.indexOf(searchStr) != -1)
		var e = table[i].parentNode;
	}
	
	var temp = e.innerHTML;

	if(navDisplayReferenceRelation == AFTER) {	
		temp += nav_box_html;
	} else {
		temp = nav_box_html + temp;
	}
	
	e.innerHTML = temp;
}

if(document.URL.indexOf('overview_jobs.php') >= 0) {
  saveTaken();
}