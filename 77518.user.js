// ==UserScript==
// @name           OkC Forum Ignore List (compatible with WebKit)
// @namespace      http://estragib.googlepages.com/custom
// @url            http://userscripts.org/scripts/source/77518.user.js
// @description    Hides posts by users on your ignore list. Adjusted to be compatible with WebKit, i.e. Apple Safari and Google Chrome.
// @include        http://www.okcupid.com/forum?*
// @version        1.42.2
// ==/UserScript==

// DEFAULTS
// the preselected radio button for new entries. choose one of:
// 0 - kill; 1 - hide; 2 - dim
const DEFAULT_OPTION =        1;

// remaining visibility of dimmed entries. choose values from 0.1 to 0.9
const DIM_OPACITY =           .2;
const DIM_OPACITY_HOVER =     .5;

// text on the blind
const IGNORE_PREFIX =         "You've chosen to ignore this user. (";
const IGNORE_LINK_TEXT=       "Show";
const IGNORE_SUFFIX =         ")";

// INTERNAL
const ID_LIST =               '_ignoreList';
const ID_BUTTON_OK =          '_btn_ok';
const ID_BUTTON_APPLY =       '_btn_apply';
const CLASS_BLIND =           '_blind';
const CLASS_COL_ENTRY =       'entry';
const CLASS_COL_OPTION =      'option';
const CLASS_COL_ACTION =      'action';
const CLASS_COL_RE =          're';
const CLASS_ROW_NEW =         'add-new';
const ATTR_REL_POST =         '_rel';
const ATTR_HIDDEN =           '_hidden';
const ATTR_VAL_HIDDEN_SOFT =  'soft';
const ATTR_VAL_HIDDEN_HARD =  'hard';
const ATTR_DIMMED =           '_dimmed';
const ATTR_VAL_DIMMED =       'dimmed';
const ATTR_OLD_ENTRY =        '_before';
const INPUT_ADD_ENTRY_VALUE = 'new entry...';
const INPUT_ENTRY_NAME =      'entry';
const INPUT_ENTRY_OPT =       'option';
const INPUT_ENTRY_RE =        're';
const OPT_INDEX_KILL =        0;
const OPT_INDEX_HIDE =        1;
const OPT_INDEX_DIM =         2;
const OPT_INDEX_RE =          3;

// XPATHS
const ID_CONTENT_WRAPPER =    'main_content';
const XPATH_TABLE_BODY =      'id("' + ID_LIST + '")/table/tbody';
const XPATH_TOPICS =          'id("' + ID_CONTENT_WRAPPER + '")//td[@class="topics"]//p[@class="created_by"]/a';
const XPATH_COMMENTERS =      'id("' + ID_CONTENT_WRAPPER + '")//td[@class="post"]//div[@class="info"]/*[1]';
const XPATH_DIMMED_ELEMENTS = 'id("' + ID_CONTENT_WRAPPER + '")//*[@' + ATTR_DIMMED + ']';

// GM VARIABLE
const GM_LIST_VARNAME =       'ignorelist';
const PREFIX_KILL =           '!';
const PREFIX_DIM =            '~';
const PREFIX_RE =             '@';
const LIST_SEPARATOR =        '\t';

// LEGACY (to be removed in 1.5)
const PREFIX_DIM_1_3 =        '-';
const LIST_SEPARATOR_1_3 =    ',';


// Google Chrome compatibility, per http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


// ===========================================================================

// GM menu
//GM_registerMenuCommand( "Migrate List (1.3 -> 1.4)", migrate, "", "", "m" );

// global variables
var ignoreList_ = [];

// env
var context = /[?&]([st])id=[^&#]+/i.exec(window.location.href);

// main
if(context) {
	var mode = context[1].toLowerCase(); // either 's' or 't' for section or topic page
	
	insertStyles();       // define styles
	refreshIgnoreList();  // get current list
	check();              // do the hiding
	appendStatusLine();   // add status and control line
}

// ===========================================================================

// CSS preparation
function insertStyles() {
	var styles = [];

	styles.push('tr[' + ATTR_HIDDEN + '="' + ATTR_VAL_HIDDEN_HARD + '"] { display: none !important; }');
	styles.push('tr[' + ATTR_HIDDEN + '="' + ATTR_VAL_HIDDEN_SOFT + '"] td { display: none; }');
	styles.push('td.' + CLASS_BLIND + ' { text-align: center; font-size: smaller; font-style: italic; opacity: .7; display: table-cell !important; width: 728px; }');
	styles.push('#' + ID_BUTTON_OK + ', #' + ID_BUTTON_APPLY + ' { float: left; margin-right: 10px; }');
	styles.push('#' + ID_LIST + ' { clear: both; margin: 20px; }');
	styles.push('#' + ID_LIST + ' table { border-spacing: 0; border-collapse: collapse; }');
	styles.push('#' + ID_LIST + ' tr { border: 0 none !important; background-color: transparent !important; }');
	styles.push('#' + ID_LIST + ' tbody tr:hover { background-color: #DDDDDD !important; }');
	styles.push('#' + ID_LIST + ' th { font-weight: normal; padding: 3px; }');
	styles.push('#' + ID_LIST + ' td { padding: 3px !important; border: 0 none !important; }');
	styles.push('#' + ID_LIST + ' *.' + CLASS_COL_OPTION + ', #' + ID_LIST + ' *.re { padding: 3px 10px !important; text-align: center; }');
	styles.push('#' + ID_LIST + ' *.' + CLASS_COL_ACTION + ' { padding-left: 20px !important; }');
	styles.push('#' + ID_LIST + ' tbody tr.' + CLASS_ROW_NEW + ' td.' + CLASS_COL_ENTRY + ' input[type="text"] { border: 1px solid #CCCCCC; color: gray; background-color: #F6F6F6; }');
	styles.push('#' + ID_LIST + ' tbody tr.' + CLASS_ROW_NEW + ' td.' + CLASS_COL_ENTRY + ' input[type="text"]:focus { color: black; background-color: white; }');
	styles.push('#' + ID_LIST + ' tbody td.' + CLASS_COL_ENTRY + ' input[type="text"] { border: 0 none; color: black; background-color: transparent; }');
	styles.push('#' + ID_LIST + ' thead a[href], #' + ID_LIST + ' tbody td.' + CLASS_COL_ENTRY + ' a[href] { color: #777777; }');

	if(mode == 's') {
		styles.push('tr[' + ATTR_DIMMED + '] td.topics { opacity: ' + DIM_OPACITY + '; }');
		styles.push('tr[' + ATTR_DIMMED + ']:hover td.topics { opacity: ' + DIM_OPACITY_HOVER + '; }');
	}
	else if(mode == 't') {
		styles.push('tr[' + ATTR_DIMMED + '] td.post, tr[' + ATTR_DIMMED + '] td.user_info .image img { opacity: ' + DIM_OPACITY + '; }');
		styles.push('tr[' + ATTR_DIMMED + '] td.post:hover { opacity: ' + DIM_OPACITY_HOVER + '; }');
		styles.push('tr[' + ATTR_DIMMED + '] td.user_info:hover .image img { opacity: ' + DIM_OPACITY_HOVER + '; }');
	}

	GM_addStyle(styles.join('\n'));
}

// ===========================================================================

// find relevant posts
function check() {
	var userLinks = [];
	var re;
	
	if(mode == 's')      userLinks = $x(XPATH_TOPICS);
	else if(mode == 't') userLinks = $x(XPATH_COMMENTERS);

   for (var i=0; i < userLinks.length; i++) {
      var link = userLinks[i];
      for (var j=0; j < ignoreList_.length; j++) {
         var entry = ignoreList_[j];
			var opacity = 1;
			
			if(entry.substr(0, 1) == PREFIX_DIM) {
				opacity = DIM_OPACITY;
				entry = entry.substr(1);
			}
			else if(entry.substr(0, 1) == PREFIX_KILL) {
				opacity = 0;
				entry = entry.substr(1);
			}
			
			if(entry.substr(0, 1) == PREFIX_RE) {
				re = new RegExp(entry.substr(1).replace('\\', '\\\\'), 'i');
				if(link.textContent.match(re)) hide(link, opacity);
			}
			else {
				if(link.textContent.toLowerCase() == entry.toLowerCase()) hide(link, opacity);
			}
		}
	}
}

// hide a single post
// 	kill:	 opacity is 0
// 	dim:   opacity between 0 and 1
// 	blind: opacity is 1
function hide(userLink, opacity) {
	var row = userLink.parentNode.parentNode.parentNode; // a -> p/div -> td -> tr
	
	if(opacity == 0) {
		// hide completely
		row.setAttribute(ATTR_HIDDEN, ATTR_VAL_HIDDEN_HARD);
	}
	else {
		if(opacity != 1)
			// dim
			row.setAttribute(ATTR_DIMMED, ATTR_VAL_DIMMED);
		else {
			// hide
			row.setAttribute(ATTR_HIDDEN, ATTR_VAL_HIDDEN_SOFT);

			// check for previous blinds
			var blind = $x('td[@class="' + CLASS_BLIND + '"]', row)[0];
			if(!blind) {
				blind = document.createElement("td");
				blind.setAttribute('class', CLASS_BLIND);
				
				var rel;

				if(mode == 's') {
					blind.colSpan = '4'; // 4 cells per row in sections
					rel = userLink.textContent.toLowerCase() + '_' + Math.floor(Math.random() * 100000).toString();
					row.id = rel; // rows don't have unique ids in sections; generate one so we can restore the row from the blind
				}
				else if(mode == 't') {
					blind.colSpan = '2'; // 2 cells per row in topics
					rel = row.id; // rows do have unique ids in topics
				}
				
				blind.appendChild(document.createTextNode(IGNORE_PREFIX));
				var link = addAction(blind, 'show', IGNORE_LINK_TEXT, 
														 function (event) {
															event.preventDefault();
															// use row id to restore
															restore(document.getElementById(event.target.getAttribute(ATTR_REL_POST)));
														 } );
				link.setAttribute(ATTR_REL_POST, rel); // remember row id
				blind.appendChild(document.createTextNode(IGNORE_SUFFIX));
				row.appendChild(blind);
			}
		}
	}
}

// restore a post
function restore(row) {
	if(row.hasAttribute(ATTR_HIDDEN)) {
		if(row.getAttribute(ATTR_HIDDEN) == ATTR_VAL_HIDDEN_SOFT) {
			var blind = $x('td[@class="' + CLASS_BLIND + '"]', row)[0];
			if(blind) row.removeChild(blind);
		}

		if(mode == 's') row.removeAttribute('id');
		row.removeAttribute(ATTR_HIDDEN);
	}
	else if(row.hasAttribute(ATTR_DIMMED)) {
		row.removeAttribute(ATTR_DIMMED);
	}
}

// restore them all
function restoreAll() {
	var userLinks = [];
	
	if(mode == 's')      userLinks = $x(XPATH_TOPICS);
	else if(mode == 't') userLinks = $x(XPATH_COMMENTERS);

   for (var i=0; i < userLinks.length; i++) {
      var userLink = userLinks[i];
		var row = userLink.parentNode.parentNode.parentNode; // a -> p/div -> td -> tr
		if(row.hasAttribute(ATTR_HIDDEN)) restore(row); // can be both, so each has to be restored individually
		if(row.hasAttribute(ATTR_DIMMED)) restore(row); // also keep the order: hidden is restored before dimmed.
	}
}

// read from GM variable
function refreshIgnoreList() {
	var storedEntries = GM_getValue(GM_LIST_VARNAME, '');
	
	if(storedEntries && storedEntries.length) ignoreList_ = storedEntries.split(LIST_SEPARATOR);
	else                     ignoreList_ = [];
}


// ===========================================================================

// add status line
function appendStatusLine() {
	var contentWrapper = document.getElementById(ID_CONTENT_WRAPPER);
	if(!contentWrapper)	return; // hack
	var div = document.createElement('div');
	div.id = ID_LIST;
	var p = document.createElement('p');
	div.appendChild(p);
	var foldCount = document.getElementsByClassName(CLASS_BLIND).length;
	var dimCount = $x(XPATH_DIMMED_ELEMENTS).length;
	var text = '';
	if(foldCount) text += foldCount + ' hidden, ';
	if(dimCount)  text += dimCount  + ' dimmed, ';
	text += ignoreList_.length + ' entr' + (ignoreList_.length == 1 ? 'y' : 'ies') + ' on your ';
	p.appendChild(document.createTextNode(text));
	addAction(p, 'manage', 'ignore list', function (event) { event.preventDefault(); editIgnoreList(div); });
	p.appendChild(document.createTextNode('.'));
	contentWrapper.appendChild(div);
}

// unfold the list manager
function editIgnoreList(wrapper) {
	// clear out
	while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
	
	// add table and thead, then the row for adding new entries
	var table = document.createElement('table');
	table.innerHTML = '<col class="' + CLASS_COL_ENTRY + '" />' +
	                  '<colgroup class="' + CLASS_COL_OPTION + '"><col /><col /><col /></colgroup>' + 
	                  '<col class="re" />' + 
	                  '<col class="' + CLASS_COL_ACTION + '" />' + 
	                  '<thead>' + 
	                  '<tr>' +
	                  '<th class="' + CLASS_COL_ENTRY + '">Name</th>' +
	                  '<th class="' + CLASS_COL_OPTION + '">Kill</th><th class="' + CLASS_COL_OPTION + '">Hide</th><th class="' + CLASS_COL_OPTION + '">Dim</th>' +
	                  '<th class="' + CLASS_COL_RE + '"><a href="http://www.wdvl.com/Authoring/Languages/Perl/PerlfortheWeb/perlintro2_table1.html" title="Basic Regular Expression Syntax">Pattern</a></th>' +
	                  '<th class="' + CLASS_COL_ACTION + '" />' +
	                  '</tr>' +
	                  '</thead>';
	
	// get current list in case it's been modified in another tab
	refreshIgnoreList();
	
	// build the table
	var body = document.createElement('tbody');
	for (var i=0; i < ignoreList_.length; i++) {
	  var entry = ignoreList_[i];
	  addRow(body, entry);
	};
	addRowNewEntry(body);
	table.appendChild(body);
	wrapper.appendChild(table);

	// "OK" button
	var button = document.createElement('p');
	button.id = ID_BUTTON_OK;
	button.setAttribute('class', 'btn small green small_white'); // okc css
	addAction(button, 'ok', 'OK', function (event) { event.preventDefault(); acceptChanges(true); });
	wrapper.appendChild(button);
	
	// "Apply" button
	button = document.createElement('p');
	button.id = ID_BUTTON_APPLY;
	button.setAttribute('class', 'btn small white small_white'); // okc css
	addAction(button, 'apply', 'Apply', function (event) { event.preventDefault(); acceptChanges(); });
	wrapper.appendChild(button);
}

// append a row for adding new entries
function addRowNewEntry(body) {
	var cell, input;
	var row = document.createElement('tr');
	row.setAttribute('class', CLASS_ROW_NEW);

	// name textbox
	cell = document.createElement('td')
	cell.setAttribute('class', CLASS_COL_ENTRY);
	input = document.createElement('input');
	input.type = 'text';
	input.name = INPUT_ENTRY_NAME;
	input.value = INPUT_ADD_ENTRY_VALUE;
	input.addEventListener('focus', gotFocusAdd, false);
	input.addEventListener('blur', lostFocusAdd, false);
	input.addEventListener('dragenter', gotFocusAdd, false);
	cell.appendChild(input)
	row.appendChild(cell);

	// hide options
	for(var i = 0; i <= 2; i++)
		addInputCell(row, 'radio', CLASS_COL_OPTION, INPUT_ENTRY_OPT, i, (i == DEFAULT_OPTION));
	
	// regexp checkbox
	addInputCell(row, 'checkbox', CLASS_COL_RE, INPUT_ENTRY_RE, OPT_INDEX_RE, false);

	// add/remove action
	cell = document.createElement('td');
	cell.setAttribute('class', CLASS_COL_ACTION);
	addAction(cell, 'add', 'add', function (event) { event.preventDefault(); saveEntry(row); });
	row.appendChild(cell);

	// append to table
	body.appendChild(row);
}

// add a table row
function addRow(body, entry, before) {
	var row = document.createElement('tr');
	var opt = OPT_INDEX_HIDE;
	var isRegExp = false;
	
	if(entry.substr(0, 1) == PREFIX_KILL) {
		opt = OPT_INDEX_KILL;
		entry = entry.substr(1);
	}
	else if(entry.substr(0, 1) == PREFIX_DIM) {
		opt = OPT_INDEX_DIM;
		entry = entry.substr(1);
	}

	if(entry.substr(0, 1) == PREFIX_RE) {
		isRegExp = true;
		entry = entry.substr(1);
	}
	
	row.id = entry;
	
	// entry string
	var cell = document.createElement('td');
	cell.setAttribute('class', CLASS_COL_ENTRY);
	addAction(cell, 'edit', entry, function (event) { event.preventDefault(); editEntry(row); });
	row.appendChild(cell);

	// hide option
	for(var i = 0; i <= 2; i++)
		addInputCell(row, 'radio', CLASS_COL_OPTION, entry, i, (i == opt));
	
	// regexp checkbox
	addInputCell(row, 'checkbox', CLASS_COL_RE, INPUT_ENTRY_RE, OPT_INDEX_RE, isRegExp);

	// actions cell
	cell = document.createElement('td');
	cell.setAttribute('class', CLASS_COL_ACTION);
	addAction(cell, 'remove', 'remove', function (event) { event.preventDefault(); removeEntry(row); });
	cell.appendChild(document.createTextNode(", "));
	addAction(cell, 'edit', 'edit', function (event) { event.preventDefault(); editEntry(row); });

	// append to table
	row.appendChild(cell);
	body.insertBefore(row, before);
}

// remove a row
function removeEntry(row) {
	row.parentNode.removeChild(row);
}

// handle editing and adding of rows
function saveEntry(row) {
	var input = $x('td/input[@type="text"]', row)[0];
	var entry = input.value;
	entry = entry.replace(/^\s+|\s+$/g, ''); // trim spaces

	if(entry.length && entry != INPUT_ADD_ENTRY_VALUE) {
		var old = input.getAttribute(ATTR_OLD_ENTRY);
		if(!old) old = '';
				
		if(old.toLowerCase() != entry.toLowerCase()) {
			// remove duplicates
			var duplicate = $x(XPATH_TABLE_BODY + '/tr[@id="' + entry.toLowerCase() + '"]')[0];
			if(duplicate) removeEntry(duplicate);
			
			row.id = entry;

			// set hide option
			var buttons = $x('td/input[@type="radio"]', row);
			for (var i=0; i < buttons.length; i++) {
			   var button = buttons[i];
			   button.name = entry;
			};

			cell = $x('td[@class="' + CLASS_COL_ACTION + '"]', row)[0];
			while(cell.firstChild) cell.removeChild(cell.firstChild);
			addAction(cell, 'remove', 'remove', function (event) { event.preventDefault(); removeEntry(row); });
			cell.appendChild(document.createTextNode(", "));
			addAction(cell, 'edit', 'edit', function (event) { event.preventDefault(); editEntry(row); });

			if(row.getAttribute('class') == CLASS_ROW_NEW) {
				row.removeAttribute('class');
				addRowNewEntry($x(XPATH_TABLE_BODY)[0]);
			}
		}

		var cell = input.parentNode;
		cell.removeChild(input);
		addAction(cell, 'edit', entry, function (event) { event.preventDefault(); editEntry(cell.parentNode); });
	}
}

// aux functions
function addInputCell(row, type, cssClass, name, value, checked) {
		cell = document.createElement('td');
		cell.setAttribute('class', cssClass);
		input = document.createElement('input');
		input.type = type;
		input.name = name;
		input.value = value;
		input.checked = checked;
		cell.appendChild(input);
		row.appendChild(cell);
}

function addAction(parent, name, content, func) {
	var link = document.createElement('a');
	link.href = '#' + name;
	link.innerHTML = content;
	link.addEventListener('click', func, false);
	parent.appendChild(link);
	return link;
}

function gotFocusAdd(event) {
	if(event.target.value == INPUT_ADD_ENTRY_VALUE) {
		event.target.value = '';
	}
}

function lostFocusAdd(event) {
	if(event.target.value.length == 0)
		event.target.value = INPUT_ADD_ENTRY_VALUE;
	else if(event.target != INPUT_ADD_ENTRY_VALUE) {
		saveEntry($x(XPATH_TABLE_BODY + '/tr[@class="' + CLASS_ROW_NEW + '"]')[0]);
	}
}

function editEntry(row) {
	var cell = $x('td[@class="' + CLASS_COL_ENTRY + '"]', row)[0];
	var input = document.createElement('input');
	input.type = 'text';
	input.value = cell.textContent;
	input.setAttribute(ATTR_OLD_ENTRY, input.value);
	cell.replaceChild(input, cell.firstChild);
	input.addEventListener('blur', function (event) { saveEntry(row); }, false);
	input.focus();
}

// write the list to the GM variable
function acceptChanges(close) {
	ignoreList_ = [];
	var rows = $x(XPATH_TABLE_BODY + '/tr');

   for (var i=0; i < rows.length; i++) {
      var row = rows[i];
		if(row.getAttribute('class') != CLASS_ROW_NEW) {
			var entry = $x('td[1]', row)[0].textContent;
			var prefix = '';
			
			// hide options
			var buttons = $x('td/input[@name="' + entry + '"]', row);
			
			for (var j=0; j < buttons.length; j++) {
			   var button = buttons[j];
				if(button.checked) {
					if(button.value == OPT_INDEX_DIM) {
						prefix = PREFIX_DIM;
						break;
					}
					else if(button.value == OPT_INDEX_KILL) {
						prefix = PREFIX_KILL;
						break;
					}
				}
			}

			// regular expression?
			var button = $x('td/input[@name="' + INPUT_ENTRY_RE + '"]', row)[0];
			if(button && button.checked) prefix += PREFIX_RE;
			
			entry = prefix + entry;
			
			// add to list
			ignoreList_.push(entry);
			ignoreList_.sort( function(a, b) {
																				if(a.toLowerCase() > b.toLowerCase())      return  1;
																				else if(a.toLowerCase() < b.toLowerCase()) return -1;
																				else                                       return  0;
																			} );
		}
	}
	
	// store
	GM_setValue(GM_LIST_VARNAME, ignoreList_.join(LIST_SEPARATOR));
	
	if(close) {
		// clear out to start afresh
		var wrapper = document.getElementById(ID_LIST);
		wrapper.parentNode.removeChild(wrapper);
	}

	// re-init
	restoreAll();
	check();

	// if closed, restore status line
	if(close)	appendStatusLine();
}

function discardChanges() {
	var wrapper = document.getElementById(ID_LIST);
	wrapper.parentNode.removeChild(wrapper);
	appendStatusLine();
}

// ===========================================================================

function migrate() {
	var storedEntries = GM_getValue(GM_LIST_VARNAME, '');
	var list = [];

	if(storedEntries.length) {
		var list = storedEntries.split(LIST_SEPARATOR_1_3);
		ignoreList_ = [];
		
		for (var i=0; i < list.length; i++) {
		   var entry = list[i];
			if(entry.substr(0, 1) == PREFIX_DIM_1_3) entry = PREFIX_DIM + entry.substr(1);
			ignoreList_.push(entry);
		};
		GM_setValue(GM_LIST_VARNAME, ignoreList_.join(LIST_SEPARATOR));
		alert('Found ' + list.length + ', migrated ' + ignoreList_.length + ' entries.');
		var wrapper = document.getElementById(ID_LIST);
		if(wrapper) wrapper.parentNode.removeChild(wrapper);
		appendStatusLine();
	}
}

// ===========================================================================

// DOM access by XPath
function $x(xpath, root) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document;
	var got = doc.evaluate(xpath, root || doc, null, 0, null), next, result = [];

	switch(got.resultType) {
		case got.STRING_TYPE:  return got.stringValue;
		case got.NUMBER_TYPE:  return got.numberValue;
		case got.BOOLEAN_TYPE: return got.booleanValue;

		default:
			while(next = got.iterateNext()) result.push(next);
			return result;
	}
}
