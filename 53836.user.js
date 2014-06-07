// ==UserScript==
	// @name		workwork for Minute7
	// @description		Allows loading time spent on projects using workwork into Minute7
	// @version		0.1
	// @date		2009-07-15
	// @author		Ary Borenszweig <ary@esperanto.org.ar>
	// @namespace		http://code.google.com/p/workwork/for/minute7
	// @include		https://www.minute7.com/timesheets
// ==/UserScript==

(function() {
    
var containerTable = $("containerTable");
if (!containerTable) return error("container table not found");

var target = containerTable.childNodes[1];
target.innerHTML += 
	'<div style="border:1px solid #CCCCCC;background-color:#FFFFC8;padding:8px;margin:8px;">' +
		'<div>workwork:</div>' +
		'<div><textarea id="workwork_data" rows="2" cols="50">Past here you workwork exported data. ;-)</textarea></div>' +
		'<div><button id="workwork_ok">Do it!</button></div>' +
	'</div>'
;

var submitButton = $("workwork_ok");
if (!submitButton)  return error("workwork DoIt! button not found");

submitButton.addEventListener('click', processNextEntry, false);

function processNextEntry() {
	// Make sure the save button is there... ;-)
	if (!getSaveButton()) {
		setTimeout(processNextEntry, 1000);
		return false;
	}
	
	var workworkControl = $("workwork_data");
	if (!workworkControl) {
		error("workwork input not found");
		return false;
	}
	
	var text = workworkControl.value;
	var entry = parseNextEntry(text);
	if (!entry) {
		alert('Format is invalid, must be something like 2009-07-15 6:00:00 "Project" "Task"');
		return false;
	}
	
	submitEntry(entry);
	
	text = text.substring(entry.lastIndex);
	while(text.length > 0 && (text[0] == ' ' || text[0] == '\n' || text[0] == '\t')) {
		text = text.substring(1);
	}
	
	workworkControl.value = text;
	
	if (text.length > 0) {
		setTimeout(processNextEntry, 1000);
	}
}

function submitEntry(entry) {
	var dateInput = document.getElementsByName("data[TimeEntry][date]")[0];
	if (!dateInput) return error("date input not found");
	
	var timeInput = document.getElementsByName("data[TimeEntry][duration]")[0];
	if (!timeInput) return error("time input not found");
	
	var projectInput = $("customer_id_text_input");
	if (!projectInput) return error("project input not found");
	
	var taskInput = $("inventory_item_id_text_input");
	if (!taskInput) return error("task input not found");
	
	var saveButton = getSaveButton();
	if (!saveButton) return error("save button not found");
	
	dateInput.value = entry.date;
	timeInput.value = entry.time;
	projectInput.value = entry.project;
	taskInput.value = entry.task;
	
	saveButton.click();
}

function getSaveButton() {
	var saveContainer = $("billTimeEntrySubmitContainer");
	if (!saveContainer) return false;
	
	// Look for the submit button...
	for(var i = 0; i < saveContainer.childNodes.length; i++) {
		var saveButton = saveContainer.childNodes[i];
		if (saveButton.name == "submit") {
			return saveButton;
		}
	}
	
	return false;
}

function parseNextEntry(text) {
	var space = text.indexOf(' ');
	if (space == -1) return false;
	
	var date = text.substring(0, space);
	if (!validDate(date)) return false;
	
	var space2 = text.indexOf(' ', space + 1);
	if (space2 == -1) return false;
	
	var time = text.substring(space + 1, space2);
	if (!validTime(time)) return false;
	
	var firstQuote = text.indexOf('"', space2 + 1);
	var secondQuote = text.indexOf('"', firstQuote + 1);
	
	var project = text.substring(firstQuote + 1, secondQuote);
	
	var thirdQuote = text.indexOf('"', secondQuote + 1);
	var fourthQuote = text.indexOf('"', thirdQuote + 1);
	
	var task = text.substring(thirdQuote + 1, fourthQuote);
	
	return {
		date: date,
		time: time,
		project: project,
		task: task,
		lastIndex: fourthQuote + 1, // to skip the next space
	};
}

function validDate(text) {
	var pieces = text.split('-');
	if (pieces.length != 3) {
		return false;
	}
	
	var year = goodParseInt(pieces[0]);
	if (!year) return false;
	
	var month = goodParseInt(pieces[1]);
	if (!( 1 <= month && month <= 12)) return false;
	
	var day = goodParseInt(pieces[2]);
	if (!( 1 <= day && day <= 31)) return false;
	
	return true;
}

function validTime(text) {
	var pieces = text.split(':');
	if (pieces.length != 3) {
		return false;
	}
	
	var hour = goodParseInt(pieces[0]);
	if (!(0 <= hour && hour <= 24)) return false;
	
	var minute = goodParseInt(pieces[1]);
	if (!(0 <= minute && minute <= 60)) return false;
	
	var second = goodParseInt(pieces[2]);
	if (!(0 <= second && second <= 60)) return false;
	
	return true;
}

function goodParseInt(val) {
    if (val.length > 0 && val[0] == '0') {
        return parseInt("" + val[1]);
    }
    return parseInt(val);
}

function $(id) {
	return document.getElementById(id);
}

function error(msg) {
	// alert("workwork for Minute7: " + msg + ", exiting");
}

})();