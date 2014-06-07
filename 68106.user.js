// ==UserScript==
// @name           SABnzbd binsearch
// @namespace      SABnzbd_binsearch
// @description    Adds a send to sabnzbd button.
// @include        *binsearch.info/*
// ==/UserScript==



//All options with default value and descriptions
var settings = new Array();
settings["sabnzbd_url"] = ['http://127.0.0.1:81/sabnzbd/', 'SABnzbd url', 'text'];
settings["sabnzbd_apikey"] = ['', 'SABnzbd API Key', 'text'];
settings["sabnzbd_category"] = ['', 'Select category', 'select'];

var sabnzbd_priority_opts = new Array();
sabnzbd_priority_opts["Default"] = '-100';
sabnzbd_priority_opts["Force"] = '2';
sabnzbd_priority_opts["High"] = '1';
sabnzbd_priority_opts["Normal"] = '0';
sabnzbd_priority_opts["Low"] = '-1';
settings["sabnzbd_priority"] = ['', 'Select priority', 'select', sabnzbd_priority_opts];

settings["clear_on_add"] = [false, 'Clear selections after add', 'checkbox'];
settings["separate_nzbs"] = [false, 'Send selected posts as separate nzbs', 'checkbox'];


//Get all stored settings, use default if not set
for (setting_id in settings) {
	settings[setting_id][0] = GM_getValue(setting_id, settings[setting_id][0]);
}


if (typeof KeyEvent == "undefined") {
	var KeyEvent = {
		DOM_VK_RETURN: 13,
		DOM_VK_ENTER: 14,
		DOM_VK_ESCAPE: 27
	};
}


//Returns the top, left bottom and right distance in px from the top left corner to the supplied element
function GetAbsPos(elem) {
	var pos = new Array();
	pos["top"] = 0;
	pos["left"] = 0;
	pos["bottom"] = elem.offsetHeight;
	pos["right"] = elem.offsetWidth;
	do {
		pos["top"] += elem.offsetTop;
		pos["left"] += elem.offsetLeft;
	} while (elem = elem.offsetParent);
	pos["bottom"] += pos["top"];
	pos["right"] += pos["left"];
	return pos;
}


//Returns all checked checkboxes
function FindChecked() {
	var checked_ids = new Array();
	var NZBcheckboxes = document.evaluate('//input[@type="checkbox" and not(@class="SettingsMenu")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j = 0; j < NZBcheckboxes.snapshotLength; j++) {
		if (NZBcheckboxes.snapshotItem(j).checked == true) {
			checked_ids.push(NZBcheckboxes.snapshotItem(j));
		}
	}
	return checked_ids;
}


//Deselects supplied checkboxes, all if no objects supplied
function DeSelect(checked_ids) {
	if (! checked_ids) {
		checked_ids = FindChecked();
	}
	for (var j = 0; j < checked_ids.length; j++) {
		checked_ids[j].checked = false;
	}
}


//Returns the text in the search box
function FindSearchStr() {
	var SearchStr = "";
	var SearchBox = document.evaluate('//input[@name="q"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j = 0; j < SearchBox.snapshotLength; j++) {
		SearchStr = SearchBox.snapshotItem(j).value;
	}
	return SearchStr;
}


//Returns the post description test of the supplied id
function FindPostStr(curr_id) {
	var PostStr = "";
	var PostObj = document.evaluate('//input[@type="checkbox" and @name="' + curr_id + '"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	PostStr = PostObj.snapshotItem(0).parentNode.nextSibling.childNodes[0].childNodes[0].nodeValue;
//	alert(PostStr);
//	var PostPattern = /\[\d+\/\d+\]/;
//	PostStr = PostStr.replace(PostPattern,'');
//	alert(PostStr);
	return PostStr;
}


//Get the SABnzbd version from the API and update local variable
function GetSABnzbdVer() {
	SABnzbdVer.nodeValue = '?';
	GM_xmlhttpRequest({
	    method: "GET",
	    url: settings["sabnzbd_url"][0] + '/api?mode=version&output=json',
	    onload: function(response) {
	    	if (response.status == 200) {
	    		SABnzbdVer.nodeValue = eval('(' + response.responseText + ')')["version"];
	    	}
	    }
	});
}


//Returns an integer from the supplied version string of type 'x.y.z'
function ParseVer(ver_string) {
	var ver_int = 0;
	var ver_parts = ver_string.split('.');
	ver_int += (parseInt(ver_parts[0]) || 0) * 10000;
	ver_int += (parseInt(ver_parts[1]) || 0) * 100;
	ver_int += (parseInt(ver_parts[2]) || 0) * 1;
	return(ver_int);
}


//Remove all childnodes from the supplied element
function ClearChildNodes(elem) {
	while ( elem.hasChildNodes() ) {
		elem.removeChild(elem.firstChild);
	}
}


//Get sabnzbd categories from API and send it to the update dropdown function
function UpdateDropDown(dd_elem) {
	if (dd_elem.name == "sabnzbd_category") {
		var getcats_url = settings["sabnzbd_url"][0] + '/api?mode=get_cats&output=json';
		getcats_url += (settings["sabnzbd_apikey"][0] != "") ? '&apikey=' + settings["sabnzbd_apikey"][0] :'';
		GM_xmlhttpRequest({
		    method: "GET",
		    url: getcats_url,
		    onload: function(response) {
		    	if (response.status == 200) {
						var sabnzbd_cats;
			      sabnzbd_cats = eval('(' + response.responseText + ')');
			      sabnzbd_cats["categories"].unshift('');
			      FillDropDown(dd_elem,sabnzbd_cats["categories"]);
			    }
		    }
		});
	}
}


//Update the dropdown element with the values in the supplied array
function FillDropDown(dd_elem, new_values) {
	ClearChildNodes(dd_elem);
	for (var j=0; j<new_values.length; j++) {
		var option_obj = document.createElement('option');
		option_obj.text = new_values[j];
		option_obj.value = new_values[j];
		if (new_values[j] == settings[dd_elem.name][0]) {
			option_obj.selected = true;
		}
		dd_elem.appendChild(option_obj);
	}
}


//Retruns the binsearch url to use when sending requests
function GetBinsearchUrl() {
	var URL_tmp = window.location.protocol + '//' + window.location.host + '/?';// + window.location.pathname;
	var URL_search = window.location.search.substring(1).split('&');
	var URL_options = new Array();
	for (var i = 0; i < URL_search.length; i++) {
		var tmp_opt = URL_search[i].split('=');
		URL_options[tmp_opt[0]] = tmp_opt[1];
	}
	URL_tmp += (URL_options["server"]) ? 'server=' + URL_options["server"] : 'server=';
	return(URL_tmp);
}


//Delete the add by removing all iframes
function DeleteAd() {
	var iframes = document.evaluate('//iframe', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j = 0; j < iframes.snapshotLength; j++) {
		var iframe_obj = iframes.snapshotItem(j);
		iframe_obj.parentNode.removeChild(iframe_obj);
	}
}


//Create room for status indicators and create them on all rows with checkboxes
function GenerateStatusIndicators() {
	StatusIndicators = new Array();
	var table_rows = document.evaluate('//table[@id="r2"]/tbody/*', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j = 0; j < table_rows.snapshotLength; j++) {
		var row_obj = table_rows.snapshotItem(j);
		var cell_obj = row_obj.insertBefore(document.createElement(row_obj.firstChild.nodeName),row_obj.firstChild);
		cell_obj.style.width = "16px";
		cell_obj.style.textAlign = "center"

		for (var i=0; i<row_obj.childNodes.length; i++) {
			var checkbox_obj = row_obj.childNodes[i].firstChild;
			if (checkbox_obj && checkbox_obj.type == 'checkbox') {
				var status_obj = cell_obj.appendChild(document.createElement('div'));
				status_obj.style.display = 'inline';
				status_obj.style.position = 'absolute';
				status_obj.className = "StatusInd";
				status_obj.id = checkbox_obj.name;
				status_obj.style.background = 'lightgrey';
				status_obj.style.width = "10px";
				status_obj.style.height = "10px";
				status_obj.style.marginTop = "-" + status_obj.offsetHeight/2;
				status_obj.style.marginLeft = "-" + status_obj.offsetWidth/2;
	
				var status_descr_obj = cell_obj.appendChild(document.createElement('div'));
				status_descr_obj.style.display = 'none';
				status_descr_obj.style.position = 'absolute';
				status_descr_obj.style.background = 'white';
				status_descr_obj.style.border = '1px solid black';
				status_descr_obj.className = "StatusIndDescr";
				status_descr_obj.id = checkbox_obj.name;
				//status_descr_obj.appendChild(document.createTextNode("No action"));
				status_descr_obj.innerHTML = "No action";
	
				StatusIndicators[checkbox_obj.name] = new Array();
				StatusIndicators[checkbox_obj.name][0] = status_obj;
				StatusIndicators[checkbox_obj.name][1] = status_descr_obj;
	
				status_obj.addEventListener('mouseover', function(evt) {
					var tmp_obj = StatusIndicators[evt.currentTarget.id][1];
					tmp_obj.style.left = evt.clientX + document.body.scrollLeft + 10;
					tmp_obj.style.top = evt.clientY + document.body.scrollTop - 20;
					tmp_obj.style.display = 'inline';
				}	, false );
				status_obj.addEventListener('mousemove', function(evt) {
					var tmp_obj = StatusIndicators[evt.currentTarget.id][1];
					tmp_obj.style.left = evt.clientX + document.body.scrollLeft + 10;
					tmp_obj.style.top = evt.clientY + document.body.scrollTop - 20;
					tmp_obj.style.display = 'inline';
				}	, false );
				status_obj.addEventListener('mouseout', function(evt) {
					var tmp_obj = StatusIndicators[evt.currentTarget.id][1];
					tmp_obj.style.display = 'none';
				}	, false );
				
				break;
			}
		}
	}
}


//Update the status indicators color and description for the supplied elements
function UpdateStatusIndicators(elem_array, color, descr) {
	for (var j = 0; j < elem_array.length; j++) {
		StatusIndicators[elem_array[j].name][0].style.background = color;
		//StatusIndicators[elem_array[j].name][1].firstChild.nodeValue = descr;
		StatusIndicators[elem_array[j].name][1].innerHTML = descr;
	}
}


//Add nzb to SABnzbd for the supplied checkboxes with the specified name
function SendNZB(checked_ids, nzb_name) {

	//Create url to get the nzb from binsearch
	var nzb_url = binsearch_url + '&action=nzb';
	for (var j = 0; j < checked_ids.length; j++) {
		nzb_url += '&' + checked_ids[j].name + '=1';
	}

	//Create url for SABnzbd api with the nzb url
	var get_url = settings["sabnzbd_url"][0] + '/api?mode=addurl'
	get_url += (settings["sabnzbd_apikey"][0] != "") ? '&apikey=' + settings["sabnzbd_apikey"][0] :'';
	get_url += (settings["sabnzbd_category"][0] != "") ? '&cat=' + escape(settings["sabnzbd_category"][0]) :'';
	//Only set parameters if supported by SABnzbd api version
	if (ParseVer(SABnzbdVer.nodeValue) >= ParseVer('0.5.0')) {
	  get_url += (settings["sabnzbd_priority"][0] != "") ? '&priority=' + escape(settings["sabnzbd_priority"][0]) :'';
	  get_url += '&nzbname=' + escape(nzb_name);
	}
	get_url += '&name=' + escape(nzb_url);

	GM_xmlhttpRequest({
		method: "GET",
		url: get_url,
		onload: function(response) {
			if (response.responseText == "ok\n") {
				if (settings["clear_on_add"][0]) {
					DeSelect(checked_ids);
				}
				UpdateStatusIndicators(checked_ids, 'rgb(0,255,0)', 'NZB successfully added.');
			} else {
				//alert('Error: SABnzbd reported this:\n\n' + response.responseText);
				UpdateStatusIndicators(checked_ids, 'red', 'Error adding NZB. SABnzbd reported:<br>' + response.responseText);
			}
		},
		onerror: function(response) {
			//alert('Error: Could not contact SABnzbd.');
			UpdateStatusIndicators(checked_ids, 'red', 'Error adding NZB. Could not contact SABnzbd.');
		}
	});
	
	UpdateStatusIndicators(checked_ids, 'rgb(240,230,10)', 'Trying to contact server...');
}


//Send the nzb for all checked rows to SABnzbd
function SendNZBStd() {
	//Find all selected ids
	var checked_ids = FindChecked();
	
	if (checked_ids.length > 0) {
		
		var nzb_name;
//		//Get name for nzb
		nzb_name = FindSearchStr();
//		var nzb_name;
//		if (checked_ids.length == 1) {
//			//Get filename from selected post
//			nzb_name = FindPostStr(checked_ids[0]);
//			//alert(checked_ids.join());
//		} else {
//			//Get filename from search field
//			nzb_name = FindSearchStr();
//		}

		//Send one nzb per row if set
		if (checked_ids.length > 1 && settings["separate_nzbs"][0]) {
			for (var j = 0; j < checked_ids.length; j++) {
				SendNZB(new Array(checked_ids[j]), nzb_name + '_' + j);
			}
		} else {
			SendNZB(checked_ids, nzb_name);
		}
		
	} else {
		alert('Select at least one file or collection');
	}
}



/////////////////////////////////
// Settings Menu
/////////////////////////////////

//Display the menu and populate it with current settings
function ShowSettingsMenu(elem) {

	var fields = document.evaluate('//*[@class="SettingsMenu"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j = 0; j < fields.snapshotLength; j++) {
		if (fields.snapshotItem(j).type == 'text') {
			fields.snapshotItem(j).value = settings[fields.snapshotItem(j).name][0];
		} else if (fields.snapshotItem(j).type == 'select-one') {
			UpdateDropDown(fields.snapshotItem(j));
		} else if (fields.snapshotItem(j).type == 'checkbox') {
			fields.snapshotItem(j).checked = settings[fields.snapshotItem(j).name][0];
		}
	}

	var elem_pos = GetAbsPos(elem.parentNode);
	SettingsMenu.style.display = "inline";
	SettingsMenu.style.left = '50%';
	SettingsMenu.style.marginLeft = '-' + SettingsMenu.offsetWidth/2 + 'px'
	SettingsMenu.style.top = elem_pos["bottom"] + 5 + 'px';
	fields.snapshotItem(0).focus();
}

//Hide the menu
function HideSettingsMenu() {
	SettingsMenu.style.display = "none";
}

//Call the hide funcion if visible and the the render function if hidden
function toggleSettingsMenu(elem) {
	if(SettingsMenu.style.display == "none") {
		ShowSettingsMenu(elem);
	} else {
		HideSettingsMenu();
	}
}

//Save all settings and hide menu
function SaveSettings() {
	var fields = document.evaluate('//*[@class="SettingsMenu"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j = 0; j < fields.snapshotLength; j++) {
		if (fields.snapshotItem(j).type == 'text') {
			GM_setValue(fields.snapshotItem(j).name, fields.snapshotItem(j).value);
			settings[fields.snapshotItem(j).name][0] = fields.snapshotItem(j).value;
		} else if (fields.snapshotItem(j).type == 'select-one') {
			GM_setValue(fields.snapshotItem(j).name, fields.snapshotItem(j).value);
			settings[fields.snapshotItem(j).name][0] = fields.snapshotItem(j).value;
		} else if (fields.snapshotItem(j).type == 'checkbox') {
			GM_setValue(fields.snapshotItem(j).name, fields.snapshotItem(j).checked);
			settings[fields.snapshotItem(j).name][0] = fields.snapshotItem(j).checked;
		}
	}
	HideSettingsMenu();
	GetSABnzbdVer();
}

//Capture keypress in the menu
function SettingsMenuKeypress(evt) {
	switch (evt.which) {
		case (KeyEvent.DOM_VK_RETURN):
		case (KeyEvent.DOM_VK_ENTER):
		SaveSettings();
		break;
		case (KeyEvent.DOM_VK_ESCAPE):
		HideSettingsMenu();
		break;
	}
}

//Create settings menu and add it to the page
function CreateSettingsMenu() {
	SettingsMenu = document.createElement('div');
	SettingsMenu.style.display = 'none';
	SettingsMenu.style.background = 'white';
	SettingsMenu.style.border = '2px solid black';
	SettingsMenu.style.position = 'absolute';
	document.body.appendChild(SettingsMenu);
	
	//Add event listener to capture key press in menu
	SettingsMenu.addEventListener('keyup', SettingsMenuKeypress, false);
	
	//Heading
	var SettingsMenuHeading = document.createElement('h4');
	SettingsMenuHeading.appendChild(document.createTextNode("SABnzbd Settings"));
	SettingsMenuHeading.style.textAlign = 'center';
	SettingsMenu.appendChild(SettingsMenuHeading);
	
	//Table with all settings
	var SettingsMenuTable = document.createElement('table');
	SettingsMenu.appendChild(SettingsMenuTable);
	for (curr_setting in settings) {
		var table_row = document.createElement('tr');
		var descr_cell = document.createElement('td');
		var input_cell = document.createElement('td');
	
		if (settings[curr_setting][2] == 'text') {
			var input_obj = document.createElement('input');
			input_obj.size = 40;
			input_obj.type = 'text';
			input_obj.name = curr_setting;
			input_obj.className = 'SettingsMenu';
			input_cell.appendChild(input_obj);
		} else if (settings[curr_setting][2] == 'select') {
			var input_obj = document.createElement('select');
			input_obj.name = curr_setting;
			input_obj.className = 'SettingsMenu';
            // Fill select with options if defined in settings
			if (settings[curr_setting][3]) {
                for (curr_opt in settings[curr_setting][3]) {
                    var option_obj = document.createElement("option");
                    option_obj.text = curr_opt;
                    option_obj.value = settings[curr_setting][3][curr_opt];
                    if (settings[curr_setting][3][curr_opt] == settings[curr_setting][0]) {
                        option_obj.selected = true;
                    }
                    input_obj.appendChild(option_obj);
                }
			}
			input_cell.appendChild(input_obj);
		} else if (settings[curr_setting][2] == 'checkbox') {
			var input_obj = document.createElement('input');
			input_obj.type = 'checkbox';
			input_obj.name = curr_setting;
			input_obj.className = 'SettingsMenu';
			input_cell.appendChild(input_obj);
		}
	
		descr_cell.appendChild(document.createTextNode(settings[curr_setting][1]));
		table_row.appendChild(descr_cell);
		table_row.appendChild(input_cell);
		SettingsMenuTable.appendChild(table_row);
	}
	
	//Add a table row to display the current SABnzbd version
	var SABnzbdVer_row = SettingsMenuTable.appendChild(document.createElement('tr'));
	SABnzbdVer_descr_cell = SABnzbdVer_row.appendChild(document.createElement('td'));
	SABnzbdVer_descr_cell.appendChild(document.createTextNode('SABnzbd Ver'));
	SABnzbdVer_value_cell = SABnzbdVer_row.appendChild(document.createElement('td'));
	SABnzbdVer = SABnzbdVer_value_cell.appendChild(document.createTextNode('?'));
	
	//Settings menu buttons
	var SettingsMenuButtons = document.createElement('div');
	SettingsMenuButtons.align = 'center';
	SettingsMenu.appendChild(SettingsMenuButtons);
	//Save
	var SettingsMenuSave = document.createElement('button');
	SettingsMenuSave.addEventListener('click', function(){ SaveSettings();}, false );
	SettingsMenuSave.innerHTML = 'Save Settings';
	SettingsMenuButtons.appendChild(SettingsMenuSave);
	//Cancel
	var SettingsMenuCancel = document.createElement('button');
	SettingsMenuCancel.addEventListener('click', function(){ HideSettingsMenu(this);}, false );
	SettingsMenuCancel.innerHTML = 'Cancel';
	SettingsMenuButtons.appendChild(SettingsMenuCancel);
}




/////////////////////////////////
// Buttons and links
/////////////////////////////////

//Add a link to the settings menu after the RSS link
var link_elements = document.evaluate('//a[@href and text()="RSS"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < link_elements.snapshotLength; i++) {
	var current_link = link_elements.snapshotItem(i);
	var settings_button = document.createElement('a');
	settings_button.href = 'javascript:void(0);';
	settings_button.addEventListener('click', function(){ toggleSettingsMenu(this);}, false );
	settings_button.innerHTML = 'SABnzbd';
	current_link.parentNode.insertBefore(settings_button, current_link.nextSibling);
	current_link.parentNode.insertBefore(document.createTextNode(' - '), current_link.nextSibling);
}

//Add generate NZB buttons after the create NZB buttons
var GenNZBbuttons = document.evaluate('//input[@value="Create NZB"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < GenNZBbuttons.snapshotLength; i++) {
	var thisElement = GenNZBbuttons.snapshotItem(i);
	var newElement = thisElement.cloneNode(false);
	newElement.addEventListener('click', function(){ SendNZBStd();}, false );
	newElement.setAttribute('type', 'button');
	newElement.setAttribute('value', 'Send to SABnzbd');
	thisElement.parentNode.insertBefore(newElement, thisElement.nextSibling);
	thisElement.parentNode.insertBefore(document.createTextNode(' '), newElement);
}


DeleteAd();

var SettingsMenu;
var SABnzbdVer;
var StatusIndicators;
CreateSettingsMenu();
GetSABnzbdVer();
GenerateStatusIndicators();
var binsearch_url = GetBinsearchUrl();
