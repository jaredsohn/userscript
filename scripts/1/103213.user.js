// ==UserScript==
// @name          frosch95 GC Menu Addon
// @version       0.2.2
// @build		  1
// @namespace     http://www.frosch95.de
// @description   Extends the geocaching.com menu with a configurable drop down submenu
// @include       http://*.geocaching.com/*
// @match         http://*.geocaching.com/*
// @license       BSD
// @author        frosch95
// @downloadURL   http://userscripts.org/scripts/source/103213.user.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @require       http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js
// ==/UserScript==

/**
 * Copyright (c) 2011, Andreas Billmann (frosch95@frosch95.de)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of frosch95 nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


jQuery(document).ready(function(){

	// constants
	var GC_SEARCH_LINK = "http://www.geocaching.com/seek/nearest.aspx?f=1";
	var MILES_FACTOR = 0.62;

	// get the stored values
	var menuName = GM_getValue("menuName", "Custom Menu");
	var language = GM_getValue("language", "en");
	 
	
	///////////////////////////////////////////////////////////////////////////////////////////
	//                                                                                       //
	// translations for i18n                                                                 //
	//                                                                                       //
	///////////////////////////////////////////////////////////////////////////////////////////
	var text = {
	
		en : {
			"frosch95_gc_menu_home_location" : "Home Zone Query",
			"frosch95_gc_menu_pocket_queries" : "Build Pocket Queries",
			"frosch95_gc_menu_lists" : "Lists",
			"frosch95_gc_menu_geocaches" : "Found Caches",
			"frosch95_gc_menu_owned" : "Owned Caches",
			"frosch95_gc_menu_statistics" : "Statistics",
			"frosch95_gc_menu_friends" : "Friends",
			"frosch95_gc_menu_travelbugs" : "TravelBugs",
			"frosch95_gc_menu_config" : "Configuration",
			"save" : "Save",
			"show" : "Show",
			"lon"  : "Longitude",
			"lat"  : "Latitude",
			"distance"  : "Distance",
			"distanceUnit" : "km",
			"queries" : "Custom Queries",
			"name" : "Name",
			"remove" : "Remove",
			"add" : "Add",
			"newEntry" : "New Entry",
			"emptyName" : "Name should not be empty",
			"latNotNumber": "Latitude has to be a number like 48.12345",
			"lonNotNumber": "Longitude has to be a number like 9.123345",
			"distNotNumber": "Distance has to be number like 10",
			"german" : "German",
			"english" : "English"
		},
		de : {
			"frosch95_gc_menu_home_location" : "Home Zone Query",
			"frosch95_gc_menu_pocket_queries" : "Pocket Queries",
			"frosch95_gc_menu_lists" : "Listen",
			"frosch95_gc_menu_geocaches" : "gefundene Caches",
			"frosch95_gc_menu_owned" : "eigene Caches",
			"frosch95_gc_menu_statistics" : "Statistiken",
			"frosch95_gc_menu_friends" : "Freunde",
			"frosch95_gc_menu_travelbugs" : "TravelBugs",
			"frosch95_gc_menu_config" : "Konfiguration",
			"save" : "Speichern",
			"show" : "Anzeigen",
			"lon"  : "Längengrad",
			"lat"  : "Breitengrad",
			"distance"  : "Radius",
			"distanceUnit" : "km",
			"queries" : "Eigene Abfragen",
			"name" : "Name",
			"remove" : "Entfernen",
			"add" : "Hinzufügen",
			"newEntry" : "Neuer Eintrag",
			"emptyName" : "Name darf nicht leer sein",
			"latNotNumber": "Breitengrad muss eine Dezimalzahl sein in der Form 48.12345",
			"lonNotNumber": "Längengrad muss eine Dezimalzahl sein in der Form  9.123345",
			"distNotNumber": "Radius muss eine Zahl sein",
			"german" : "Deutsch",
			"english" : "Englisch"
		}
	
	};
	
	
	///////////////////////////////////////////////////////////////////////////////////////////
	//                                                                                       //
	// creating the menu                                                                     //
	//                                                                                       //
	///////////////////////////////////////////////////////////////////////////////////////////
	
	// load the menu
	var menuArray = GM_getValue("menu");
	if (menuArray === undefined || menuArray.length == 0) {
		// menu array
		menuArray = [
			{ id : "frosch95_gc_menu_pocket_queries", link : "/pocket/default.aspx", name : text[language]["frosch95_gc_menu_pocket_queries"], visible : true, search : false },
			{ id : "frosch95_gc_menu_lists", link : "/my/lists.aspx", name : text[language]["frosch95_gc_menu_lists"], visible : true, search : false },
			{ id : "frosch95_gc_menu_geocaches", link : "/my/geocaches.aspx", name : text[language]["frosch95_gc_menu_geocaches"], visible : true, search : false },
			{ id : "frosch95_gc_menu_owned", link : "/my/owned.aspx", name : text[language]["frosch95_gc_menu_owned"], visible : true, search : false },
			{ id : "frosch95_gc_menu_statistics", link : "/my/statistics.aspx", name : text[language]["frosch95_gc_menu_statistics"], visible : true, search : false},
			{ id : "frosch95_gc_menu_friends", link : "/my/myfriends.aspx", name : text[language]["frosch95_gc_menu_friends"], visible : true, search : false },
			{ id : "frosch95_gc_menu_travelbugs", link : "/my/travelbugs.aspx", name : text[language]["frosch95_gc_menu_travelbugs"], visible : true, search : false },
			{ id : "frosch95_gc_menu_config", link : "#", name : text[language]["frosch95_gc_menu_config"], visible : true, search : false, configuration : true },
			{ id : "frosch95_gc_menu_query_list" },
			{ id : "frosch95_gc_menu_home_location", link : "http://www.geocaching.com/seek/nearest.aspx?f=1&lat=00.0000000&lng=00.0000000&dist=0", name : text[language]["frosch95_gc_menu_home_location"], visible : true, search : true, lat: "00.0000000", lon: "00.0000000", dist: "0" }
		];
		
		GM_setValue("menu", uneval(menuArray));
	} else {
		menuArray = eval(menuArray);
	}
	

	// find the menu in the page
	var navigationUL = jQuery("#Navigation ul.Menu");
	
	// create the menu html
	
	var createAndReplaceMenu = function() {
		var menu = "<li id='frosch95_gc_menu_extension'>";
		menu += "<a id='ctl00_hlNavExtension' accesskey='7' title='Menu Extension' href='#' class='hover'>";
		menu += menuName;
		menu += " ▼</a><ul class='SubMenu' style='visibility: hidden; '>";
		
		for (var i=0, len=menuArray.length; i<len; ++i) {
		
			menu += '<li id="';
			menu += menuArray[i].id;
			menu += '_li"><a href="';
			menu += menuArray[i].link;
			menu += '">';
			menu += menuArray[i].name;
			menu += '</a>';
			if (menuArray[i].id == "frosch95_gc_menu_query_list") {
				menu += "<li>&nbsp;</li><li style='font-weight: bold; color: #EEE; padding: 0 1em 1em;'>";
				menu += text[language]["queries"];
				menu += "</li>";
				menu += "<li><hr /></li>";
			}
		}
		menu += "</ul></li>";
		
		// if there is an existing menu remove it and add it again
		var customMenu = jQuery("#frosch95_gc_menu_extension");
		if (customMenu) {
			customMenu.remove();
		}
		
		// append the new menu item to the main menu
		navigationUL.append(menu);
		
		// add the hover funtionality
		jQuery('#frosch95_gc_menu_extension').hover(function () {
			jQuery(this).addClass('hover');
			jQuery('ul:first', this).css('visibility', 'visible');
		}, function () {
			jQuery(this).removeClass('hover');
			jQuery('ul:first', this).css('visibility', 'hidden'); 
		});
		
	}

	// create the menu
	createAndReplaceMenu();
	
	/**
	 * show or hide the menu items
	 */
	var showHideMenuItems = function() {
		for (var i=0, len=menuArray.length; i<len; ++i) {
			if (menuArray[i].visible) {
				jQuery("#"+menuArray[i].id+"_li").show();
			} else {
				jQuery("#"+menuArray[i].id+"_li").hide();
			}
		}
	}
	
	// call the function
	showHideMenuItems();
	
	
	

	///////////////////////////////////////////////////////////////////////////////////////////
	//                                                                                       //
	// methods for creating the location search entries                                      //
	//                                                                                       //
	///////////////////////////////////////////////////////////////////////////////////////////
	
	// templates
	var locationForm = "<tr id='##id##_row'><td><input type='text' name='##id##_name' value='##name##' id='##id##_name' size='20' maxlength='20'></td>";
		locationForm += "<td><input type='text' name='##id##_lat' value='##lat##' id='##id##_lat' size='11' maxlength='10'></td>";
		locationForm += "<td><input type='text' name='##id##_lon' value='##lon##' id='##id##_lon' size='11' maxlength='10'></td>";
		locationForm += "<td><input type='text' name='##id##_dist' value='##dist##' id='##id##_dist' size='4' maxlength='3'>&nbsp;";
		locationForm += text[language]["distanceUnit"];
		locationForm += "</td>";
		locationForm += "<td><button class='frosch95_gc_menu_remove_button' id='##id##_remove'>";
		locationForm += text[language]["remove"];
		locationForm += "</button></td></tr>";
	
	/**
	 * replaces the placeholder in the template and returns the html
	 * @id the id of the location
	 * @name the name of the location
	 * @lat the katitude of the location
	 * @lon the logitude of the location
	 * @dist the distance of search
	 */
	var getLocationHTML = function(id, name, lat, lon, dist) {
		var tempform = locationForm.replace(/##id##/g, id);
		tempform = tempform.replace(/##name##/g, name);
		tempform = tempform.replace(/##lat##/g, lat);
		tempform = tempform.replace(/##lon##/g, lon);
		tempform = tempform.replace(/##dist##/g, dist);
		return tempform;
	}
	
	var getNextId = function() {
		return "frosch95_gc_menu" + new Date().getTime();
	}
	
	
	///////////////////////////////////////////////////////////////////////////////////////////
	//                                                                                       //
	// create the configuration                                                              //
	//                                                                                       //
	///////////////////////////////////////////////////////////////////////////////////////////
	
	var getConfigHTML = function() {

		// create the config html 
		var config  = "<div style='overflow:auto;'><table id='frosch95_gc_menu_config' border='0'>"
		config += "<tr><td><label for='frosch95_gc_menu_name' >Menu Name</label></td>";
		config += "<td colspan='4'><input style='width: 100%;' type='text' name='frosch95_gc_menu_name' value='";
		config += menuName;
		config += "' id='frosch95_gc_menu_name'></td></tr>";
		config += "<tr><td><label for='frosch95_gc_menu_language' >Language</label></td>";
		config += "<td><input type='radio' name='frosch95_gc_menu_language' value='de'";

		if (language == "de") { config +=" checked='checked' "; }
		config += "> ";
		config += text[language]["german"];
		config += "</td><td colspan='3'>";
		config += "<input type='radio' name='frosch95_gc_menu_language' value='en'";
		if (language == "en") { config +=" checked='checked' "; }

		config += "> ";
		config += text[language]["english"];
		config += "</td></tr>";

		
		for (var i=0, len=menuArray.length; i<len; ++i) {
			if (!menuArray[i].configuration) {		
				if (menuArray[i].id == "frosch95_gc_menu_query_list") {
					config += "<tr>";
					config += "<td colspan='5'>&nbsp;</td></tr><tr>";
					config += "<td style='font-weight: bold;'>";
					config += text[language]["name"];
					config += "</td><td style='font-weight: bold;'>";
					config += text[language]["lat"];
					config += "</td><td style='font-weight: bold;'>";
					config += text[language]["lon"];
					config += "</td><td style='font-weight: bold;'>";
					config += text[language]["distance"];
					config += "</td>";
					config += "</tr><tr><td colspan='5'><hr /></td></tr><tr>";
				} else if (menuArray[i].search) {
					config += getLocationHTML(menuArray[i].id, 
											  menuArray[i].name, 
											  menuArray[i].lat, 
											  menuArray[i].lon, 
											  menuArray[i].dist);
				} else {
					config += "<tr>";
					config += "<td><label for='";
					config += menuArray[i].id;
					config += "' >";
					config += menuArray[i].name;
					config += "</label></td><td colspan='4'><input type='checkbox' name='";
					config += menuArray[i].id;
					config += "' value='1' id='";
					config += menuArray[i].id;
					config += "'";
					if (menuArray[i].visible) {
						config += " checked='checked' ";
					}
					config += "></td>";
					config += "</tr>";
				}
			}
		}	
		config += "<tr id='frosch95_gc_men_last_row'><td colspan='5'><button class='frosch95_gc_menu_add_button'>";
		config += text[language]["add"];
		config += "</button></td></tr>";
		config += "</table></div>";
		return config;
	}
	
	/**
	 * add a new location search line
	 **/
	var addLocationSearch = function() {
			
		var length = menuArray.length;
		menuArray[length]         = new Object();
		menuArray[length].id 	  = getNextId();
		menuArray[length].name    = text[language]["newEntry"];
		menuArray[length].lat     = "00.0000000";
		menuArray[length].lon     = "00.0000000";
		menuArray[length].dist    = "0";
		menuArray[length].visible = true;
		menuArray[length].search  = true;
	
		jQuery("#frosch95_gc_men_last_row").before(
			getLocationHTML(menuArray[length].id, 
							menuArray[length].name, 
							menuArray[length].lat, 
							menuArray[length].lon, 
							menuArray[length].dist));
	}
	
	var removeLocationSearch = function() {
		var id = this.id.substring(0, this.id.length - 7);
		jQuery("#"+id+"_row").remove();
		
		var idx = -1;
		for (var i=0, len=menuArray.length; i<len; ++i) {
			if (menuArray[i].id == id) {
				idx = i;
				break;
			}
		}
		
		if(idx!=-1) menuArray.splice(idx, 1); // Remove it if 
		
	}

	
	// build a dialog with ok handling
	var configDialog = jQuery(getConfigHTML()).dialog(
		{ title: text[language]["frosch95_gc_menu_config"], 
		  width: '700', 
		  height: '500', 
		  maxHeight: '500', 
		  draggable: false, 
		  autoOpen: false,
		  resizable: false,
		  create: function(event, ui) {
		  
			// bind the add button
			jQuery(".frosch95_gc_menu_add_button").bind("click", addLocationSearch);
			
			// bind the delete buttons
			jQuery(".frosch95_gc_menu_remove_button").bind("click", removeLocationSearch);
			
		  },
		  buttons: [{ 
			text: text[language]["save"],
			click: function() { 
	
				// flag if the form is valid
				var validForm = true;
				var validationErrors = [];
				
				// get the other values
				for (var i=0, len=menuArray.length; i<len; ++i) {
					if (menuArray[i].search) {
						menuArray[i].name = jQuery("#"+menuArray[i].id+"_name").val();
						menuArray[i].lat  = jQuery("#"+menuArray[i].id+"_lat").val();
						menuArray[i].lon  = jQuery("#"+menuArray[i].id+"_lon").val();
						menuArray[i].dist = jQuery("#"+menuArray[i].id+"_dist").val();
						menuArray[i].link = GC_SEARCH_LINK + "&lat=" + menuArray[i].lat + "&lng=" + menuArray[i].lon + "&dist=" + (menuArray[i].dist*MILES_FACTOR);
						menuArray[i].visible = true;
						
						var currentLine = i + 1;
						
						if (!menuArray[i].name) {
							validForm = false;
							validationErrors[validationErrors.length] = { reason: text[language]["emptyName"], elementId: menuArray[i].id, line: currentLine };
						}

						if (!menuArray[i].lat || isNaN(menuArray[i].lat)) {
							validForm = false;
							validationErrors[validationErrors.length] = { reason: text[language]["latNotNumber"], elementId: menuArray[i].id, line: currentLine };
						}

						if (!menuArray[i].lon ||isNaN(menuArray[i].lon)) {
							validForm = false;
							validationErrors[validationErrors.length] = { reason: text[language]["lonNotNumber"], elementId: menuArray[i].id, line: currentLine };
						}

						if (!menuArray[i].dist ||isNaN(menuArray[i].dist)) {
							validForm = false;
							validationErrors[validationErrors.length] = { reason: text[language]["distNotNumber"], elementId: menuArray[i].id, line: currentLine };
						}
					}
				}


				if (validForm) {
					// read the menu name
					var newMenuName = jQuery("#frosch95_gc_menu_name").val();
					
					// store the name in the browser
					GM_setValue("menuName", newMenuName);
					
					// reset the name variable
					menuName = newMenuName;
					
					// read the language
					var language = jQuery("input[name=frosch95_gc_menu_language]:checked").val();
					
					// store the name in the browser
					GM_setValue("language", language);
					
					// change the menu point
					jQuery("#ctl00_hlNavExtension").html(newMenuName+" ▼");
					
					// close the dialog
					jQuery(this).dialog("close"); 
					
					for (var i=0, len=menuArray.length; i<len; ++i) {
						if (!menuArray[i].configuration && !menuArray[i].search) {		
							var visibility = jQuery("#"+menuArray[i].id).is(':checked');
							menuArray[i].visible = visibility;
							menuArray[i].name = text[language][menuArray[i].id];
						} else if (menuArray[i].configuration) {		
							menuArray[i].name = text[language][menuArray[i].id];
						}
					}					
					
					// save the menu
					GM_setValue("menu", uneval(menuArray));
					createAndReplaceMenu();
					showHideMenuItems();
					bindConfig();
				} else {
					jQuery(".frosch95_gc_menu_error").remove();
					for (var i=0, len=validationErrors.length; i<len; ++i) {
						var id = validationErrors[i].elementId;
						var row = jQuery("#"+id+"_row");
						row.css("background-color","#ee6666");
						jQuery("<tr style='background-color: #ee6666;' class='frosch95_gc_menu_error' ><td colspan='5' style='font-weight: bold;'>"+validationErrors[i].reason+"</td></tr>").insertBefore(row);
					}
				}
			}
		}] 
	});
	
	var bindConfig = function() {
		// add on click handler to the config link
		jQuery('#frosch95_gc_menu_config_li').click(function() {
			configDialog.dialog("open");
		});
	}		
	
	bindConfig();
	
});