// ==UserScript==
// @name           Exact Online - Invoice notes field
// @namespace      nl.exactonline.start
// @description    Transform the multiline notes field into a text area for each line
// @include        https://start.exactonline.nl/docs/LogEntrySales.aspx*
// ==/UserScript==


// Define size of text area
var notesFieldHeight = 8;
var notesFieldWidth = 80;

// Call functions
transformTableHeader();
transformAllNotesFields();
addTableChangedEventListener();



/**
 * Change table header
 */
function transformTableHeader() {
	var notesHeader = document.getElementById('hcolNotes');
	notesHeader.removeChild(notesHeader.firstChild);
	var txt = document.createTextNode("Omschrijving");
	notesHeader.appendChild(txt); 
}

/**
 * Find all notes fields and call transformNotesField()
 */
function transformAllNotesFields() {
	// Loop trough all rows in table (with ID "grd")
	var table = document.getElementById('grd');
	for (var i = 0, row; row = table.rows[i]; i++) {

		// Check if we have a valid row (starts with "grd_")
		if (row != null &&
			row.id != null &&
			row.id.length > 0 &&
			row.id.substring(0, 4) == 'grd_') {
			
			// Get belonging notes field and transform to text area
			var notesField = document.getElementById(row.id + '_Notes');
			if (isNotesField(notesField)) {
				transformNotesField(notesField);
			}
		}
	}
}


/**
 * Listen to changes of the grid (when rows are added)
 */
function addTableChangedEventListener() {
	var grid = document.getElementById('grd');
	grid.addEventListener('DOMNodeInserted', function(e) {
		if (isNotesField(e.target)) {
			transformNotesField(e.target);
		}
	}, false);
}

/**
 * Check if given field is a notes field: grd_*_Notes
 */
function isNotesField(field) {
	if (field != null &&
		field.id != null && 
		field.id.length > 0 &&
		field.id.substring(0, 4) == 'grd_' &&
		field.id.substring(field.id.length - 6, field.id.length) == '_Notes') {
		return true;
	}
	return false;
}

/**
 * Transform an INPUT notes field into TEXTAREA
 */
function transformNotesField(notesField) {
	// Do nothing if the field is no INPUT field
	if (notesField.nodeName != "INPUT") {
		return;
	}

	// Replace hidden notes field with text area (keep id, name, value)
	var newNotesField = document.createElement('textarea');
	newNotesField.id = notesField.id;
	newNotesField.name = notesField.name;
	newNotesField.value = notesField.value;
	newNotesField.rows = notesFieldHeight;
	newNotesField.cols = notesFieldWidth;
	notesField.parentNode.replaceChild(newNotesField, notesField);

	// Remove notes icon
	var notesIcon = document.getElementById('p' + notesField.id);
	notesIcon.parentNode.removeChild(notesIcon);
}