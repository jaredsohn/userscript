/**
// ==UserScript==
// @id             ikariamnearestcity@narulez
// @name           Ikariam Nearest City
// @namespace      Narulez
// @author         Narulez
// @author         Salmonela
// @description    This Ikariam script calculates and displays the distance between the currently selected Island to the Islands owned by the player. 
// @run-at         document-idle
// @homepageURL    http://userscripts.org/scripts/show/114694
// @supportURL     http://userscripts.org/scripts/discuss/114694
// @downloadURL    https://userscripts.org/scripts/source/114694.user.js
// @updateURL      https://userscripts.org/scripts/source/114694.meta.js
// @include        http://s*.ikariam.*
// @include        http://m*.ikariam.*
// @exclude        http://board*.ikariam.*
// @exclude        http://support*.ikariam.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://userscripts.org/scripts/source/115197.user.js
// @oldrequire     http://www.betawarriors.com/bin/gm/62718user.js
// @version        1.11
// @history        1.11 Added travel time of military ships (hovering the city names).
// @history        1.10 Fixed (hope) a fatal bug from 1.09 with Greasemonkey.
// @history        1.09 Re-added support for drag'n'drop in world view (broken from Ika 0.5).
// @history        1.09 Fixed for better usage with latest Ikariam update.
// @history        1.09 Fixed a lot of small bugs.
// @history        1.09 Reordered code.
// @history        1.08 Fixed for Ikariam v0.5.
// @history        1.08 Added Nearest table in city view.
// @history        1.08 Added time near island name.
// @history        1.08 Clicking on city name in the left panel in island view, if that city can be entered, you'll enter it.
// @history        1.08 Changed: NC tables can be viewed hovering the island name under resources values.
// @history        1.08 Changed options.
// @history        1.08 Other changes and improvements that I don't remember :P
// @history        1.07 Added support for arrows and drag&drop in world view. Also it recognizes if the coordinates indicate an island or ocean.
// @history        1.07 Small underground changes.
// @history        1.06 Added Nearest City in island view.
// @history        1.06 Added Options to show/hide tables.
// @history        1.06 Added links in the city names for changing city from the table.
// @history        1.06 Some changes and improvements.
// @history        1.05 JSLinted (perhaps speeded up).
// @history        1.04 Narulez's Work Begins!
// @history        1.04 Fixed Dependency.
// @history        1.03 Changed display of distance to show travel time instead.
// @history        1.02 Fixed script to work with Ikariam version 0.3.2.
// @history        1.01 Added a script updater.
// @history        1.00 Initial release.
// ==/UserScript==
**/
/*global ScriptUpdater, Config, IkaTools, XPathResult, $, top */
var INC = {ver: "1.11", currCityXcoord: 0, currCityYcoord: 0, Xcoord: 0, Ycoord: 0, newTable: false, citiesData: [], currentID: '', bw: document.body.id === 'worldmap_iso', bi: document.body.id === 'island', bc: document.body.id === 'city'};

ScriptUpdater.check(114694, INC.ver);
Config.scriptName = "Ikariam Nearest City";
Config.tabs = {
	"Opt": {
		name: "Options",
		fields: {
			otcity: {
				type: 'checkbox',
				label: 'Foreign Cities',
				text: 'Clicking on city names in "Nearest City" table in foreign cities view, the script will change the selected city but not the city viewed.',
				value: true,
			},
			dtime: {
				type: 'checkbox',
				label: 'Island Time',
				text: 'Time near island name displays the current city (default, activated) or the nearest city (deactivated).',
				value: true,
			},
			seconds: {
				type: 'checkbox',
				label: 'Seconds',
				text: 'Seconds are also displayed.',
				value: true,
			},
		}
	},
	"History": {
		fields : {},
		log: {
			'1.11': ["Added travel time of military ships (hovering the city names)."],
			'1.10': "Fixed (hope) a fatal bug from 1.09 with Greasemonkey.",
			'1.09': ["Reordered code.", "Fixed a lot of small bugs.", "Fixed for better usage with latest Ikariam update.", "Re-added support for drag'n'drop in world view (broken from Ika 0.5)."],
			'1.08': ["Other changes and improvements that I don't remember :P", "Changed options.", "Changed: NC tables can be viewed hovering the island name under resources values.", "Clicking on city name in the left panel in island view, if that city can be entered, you'll enter it.", "Added time near island name.", "Added Nearest table in city view.", "Fixed for Ikariam v0.5."],
			'1.07': ["Small underground changes.", "Added support for arrows and drag&drop in world view. Also it recognizes if the coordinates indicate an island or ocean."],
			'1.06': ["Some changes and improvements.", "Added links in the city names for changing city from the table.", "Added Options to show/hide tables.", "Added Nearest City in island view."],
			'1.05': "JSLinted (perhaps speeded up).",
			'1.04': ["Fixed Dependency.", "Narulez's Work Begins!"],
			'1.03': "Changed display of distance to show travel time instead.",
			'1.02': "Fixed script to work with Ikariam version 0.3.2.",
			'1.01': "Added a script updater.",
			'1.00': "Initial Release.",
		},
		history: function (c) {
			var r = "<ul style='margin-left: 1.95em !important; margin-top: -0.5em !important;'>", i = c.length;
			if (typeof (c) === 'string') { return r + "<li>" + c + "</li></ul>"; }
			while (i--) { r += "<li>" + c[i] + "</li>"; }
			return r + "</ul>";
		},
	},
	"About": {
		fields : {},
		html: "<p><a style='font-weight:bold !important;' target='_blank' href='http://userscripts.org/scripts/show/114431'>Ikariam Nearest City v" + INC.ver + "</a>" +
			" by <a target='_blank' href='http://userscripts.org/users/268539'>Narulez</a> (from v1.04) and <a target='_blank' href='http://userscripts.org/users/111606'>Salmonela</a> (until v1.03).</p>" +
			"<p>This Ikariam script calculates and displays the distance between the currently selected Island to the Islands owned by the player.</p>",
	},
};
(function () {
	var vers;
	for (vers in Config.tabs.History.log) {
		if (Config.tabs.History.log.hasOwnProperty(vers)) {
			Config.tabs.History.fields[vers] = {type: 'html', value: "<span style='font-weight: bold !important;'>" + vers + "</span>", };
			Config.tabs.History.fields[vers + 'a'] = {type: 'html', value: Config.tabs.History.history(Config.tabs.History.log[vers]), };
		}
	}
	delete Config.tabs.History.log;
	delete Config.tabs.History.history;
}());
String.prototype.getArgument = function (s) {
	var regExp = (new RegExp("[\\?&]" + s + "=([^&#]*)")).exec(this);
	return (regExp === null ? "" : regExp[1]);
};
$.fn.copyCSS = function(source){ // by http://upshots.org/javascript/jquery-copy-style-copycss
    var i, l, prop, dom = $(source).get(0);
    var style;
    var dest = {};
    if(window.getComputedStyle){
        var camelize = function(a,b){
            return b.toUpperCase();
        };
        style = window.getComputedStyle(dom, null);
        for(i = 0, l = style.length; i < l; i++){
            prop = style[i];
            var camel = prop.replace(/\-([a-z])/g, camelize);
            var val = style.getPropertyValue(prop);
            dest[camel] = val;
        }
        return this.css(dest);
    }
    if(style = dom.currentStyle){
        for(prop in style){
            dest[prop] = style[prop];
        }
        return this.css(dest);
   }
   if(style = dom.style){
      for(prop in style){
        if(typeof style[prop] != 'function'){
          dest[prop] = style[prop];
        }
      }
    }
    return this.css(dest);
};

INC.addOptionsLink = function (scriptName) {
	if (typeof(Config) == 'undefined') {
		var c = confirm("addOptionsLink() method requires Script Options Dialogue (originally) coded by PhasmaExMachina.\n\nWould you like to go to this tool's page?");
		if (c) {document.location = "http://userscripts.org/scripts/show/115197"; }
	} else {
		if ($('#IkaOptionsDropdown').size() == 0) {
			GM_addStyle('\
				#IkaOptionsDropdown { position:absolute; }\
				#IkaOptionsDropdown:hover { padding-bottom:20px; }\
				#IkaOptionsDropdown #IkaOptionsDropdownLinks { display:none !important; }\
				#IkaOptionsDropdown:hover #IkaOptionsDropdownLinks { display:block !important;  }\
				#IkaOptionsDropdownLinks { background-color:#FFF5E1; padding:.5em; padding-bottom:0; border:1px solid #666; position:absolute; right:-80px; margin-top:2px; width:170px; }\
				#IkaOptionsDropdownLinks a { color:#666; cursor:pointer; margin-left:0; padding-left:.2em; display:block; margin-bottom:.5em; }\
			');
			var li = document.createElement('li');
			li.innerHTML = '<a href="javascript:void(0);" id="IkaOptionsDropdownMenuItem" style="position:relative;">Scripts <img src="' + Config.icons.config + '" align="absmiddle"/></a> <div id="IkaOptionsDropdownLinks"></div>';
			li.id = 'IkaOptionsDropdown';
			$('#GF_toolbar ul').append(li);
		}
		// add link
		var a = document.createElement('a');
		a.innerHTML = scriptName;
		var id = 'IkaScriptSettings_' + scriptName.replace(/\s/g, '_');
		a.id = id;
		a.addEventListener('click', function () {
			Config.show();
		}, false);
		$('#IkaOptionsDropdownLinks').append(a);
		// make link gold if script is outdated
		if (typeof(ScriptUpdater) != 'undefined' && typeof(ScriptUpdater.checkStored) == 'function' && ScriptUpdater.checkStored()) {
			$('#IkaOptionsDropdown a')[0].setAttribute('style', 'color:gold;');
			a.style.color = '#CC0000';
			var img = document.createElement('img');
			img.src = ScriptUpdater.icons.install;
			img.setAttribute('style', 'vertical-align:middle; height:14px; float:right; cursor:pointer; margin-left:1em;');
			img.title = "Install updates or view version history";
			img.addEventListener('click', function () {
				ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion);
			}, false);
			$(a).before(img);
		}
	}
};
INC.addOptionsLink(Config.scriptName);
INC.formatTime = function (time) {
	time = Number(time);
	var hours = '', minutes = '', seconds = '';
	hours = Math.floor(time / 60);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = Math.floor(time % 60);
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	if (Config.get('seconds')) {
		seconds = Math.floor((time * 60) % 60);
		seconds = ':' + ((seconds < 10) ? "0" : "") + seconds;
	}
	return hours + ':' + minutes + seconds;
};

// Fetching the Island coords
INC.getIslandCoords = function (txt) {
	var mat = /\[(\d+):(\d+)\]/g.exec(txt);
	return mat;
};
INC.getCurrIslandCoords = function () {
	var divList = $('#js_islandBreadCoords')[0];
	if (divList != null) {
		var mat = INC.getIslandCoords(divList.innerHTML);
		INC.currCityXcoord = mat[1];
		INC.currCityYcoord = mat[2];
	}
};
INC.getCurrIslandCoords3 = function () {
	INC.Xcoord = $('#inputXCoord')[0];
	INC.Ycoord = $('#inputYCoord')[0];
	if (INC.Xcoord != null && INC.Ycoord != null) {
		INC.Xcoord = INC.Xcoord.value;
		INC.Ycoord = INC.Ycoord.value;
	}
};
// Calculates the distances
INC.calculateSingleDistance = function (x1, y1, x2, y2) {
	var deltaX, deltaY, hops, distanceInMinutes;
	deltaX = parseInt(x1, 10) - parseInt(x2, 10);
	deltaY = parseInt(y1, 10) - parseInt(y2, 10);
	hops = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	distanceInMinutes = 20 * hops;
	return distanceInMinutes || 10;
};
INC.calculateDistance = function () {
	var city;
	for (city in INC.citiesData) {
		if (INC.citiesData.hasOwnProperty(city)) {
			INC.citiesData[city][0] = INC.calculateSingleDistance(INC.currCityXcoord, INC.currCityYcoord, INC.citiesData[city][2], INC.citiesData[city][3]);
		}
	}
};

INC.units = {
	"transport": [60, 10],
	"spy": [240, 5, 'data:image/gif;base64,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'],
	"ram": [40, 15],
	"ballista": [40, 15],
	"flamethrower": [40, 15],
	"catapult": [40, 15],
	"mortar": [30, 20],
	"steamboat": [40, 15],
	"rocketship": [30, 20],
	"submarine": [40, 15],
	"paddlespeedship": [60, 10],
	"ballooncarrier": [20, 30],
	"tender": [30, 20],
};
INC.unitorder = ["ram", "spy", "flamethrower", "transport", "steamboat", "paddlespeedship", "mortar", "ballista", "rocketship", "catapult", "tender", "submarine", "ballooncarrier", ""];

// Helper function for sorting the matrix
INC.sortNum = function (a, b) {
	return a[0] > b[0];
};

// Clicking on an island will recalculate and redraw the new data
INC.changeIsland = function (a) {
	a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	var mat = INC.getIslandCoords(a.title);
	INC.currCityXcoord = mat[1];
	INC.currCityYcoord = mat[2];
	INC.calculateDistance();
	INC.citiesData.sort(INC.sortNum);
	INC.add_table();
	$('#js_islandBreadName').text(a.title.replace(/ \[.+$/g, ''));
	$('#js_islandBreadCoords').text(a.title.replace(/^.+ \[/g, ' ['));
	INC.changeWorld(true);
};

// Clicking on arrows will recalculate and redraw the new data
INC.changeWorld = function (force) {
	var tes1 = function () {
		var x;
		if (Config.get('dtime')) {
			for (x in INC.citiesData) {
				if (INC.citiesData.hasOwnProperty(x)) {
					if (INC.citiesData[x][4] == INC.currentID) {
						$('#INC-mapCoordOutput').html(INC.formatTime(INC.citiesData[x][0])).addClass('agg');
					}
				}
			}
		} else {
			$('#INC-mapCoordOutput').html(INC.formatTime(INC.citiesData[0][0])).addClass('agg');
		}
	};
	if (force){
		tes1();
		if ($('.islandMarked').size() && $('#INC-mapCoordOutput').hasClass('agg')) {
			$('#INC-mapCoordOutput').html($('.islandMarked')[0].parentNode.title + ' - ' + $('#INC-mapCoordOutput').html()).removeClass('agg');
		}
	} else {
		INC.getCurrIslandCoords3();
		INC.currCityXcoord = INC.Xcoord;
		INC.currCityYcoord = INC.Ycoord;
		INC.calculateDistance();
		// INC.citiesData.sort(INC.sortNum);
		tes1();
	}
};
INC.clickArrow = function (a) {
	a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	var dir = $(a).parent().attr('class'), distance, c1, c2, x1, y1, x2, y2;
	c1 = INC.getIslandCoords(unsafeWindow.ikariam.model.relatedCityData[unsafeWindow.ikariam.model.relatedCityData.selectedCity].coords);
	y1 = c1[2];
	x1 = c1[1];
	c2 = unsafeWindow.ikariam.getMapNavigation();
	x2 = Number(((undefined != INC.Xcoord && INC.Xcoord != 0) ? INC.Xcoord : unsafeWindow.islandX)) + Number(c2.dx);
	y2 = Number(((undefined != INC.Ycoord && INC.Ycoord != 0) ? INC.Ycoord : unsafeWindow.islandY)) + Number(c2.dy);
	switch (dir) {
		case "nw":
			distance = INC.calculateSingleDistance(x1, y1, x2 - 1, y2);
			break;
		case "n":
			distance = INC.calculateSingleDistance(x1, y1, x2 - 1, y2 - 1);
			break;
		case "ne":
			distance = INC.calculateSingleDistance(x1, y1, x2, y2 - 1);
			break;
		case "w":
			distance = INC.calculateSingleDistance(x1, y1, x2 - 1, y2 + 1);
			break;
		case "e":
			distance = INC.calculateSingleDistance(x1, y1, x2 + 1, y2 - 1);
			break;
		case "sw":
			distance = INC.calculateSingleDistance(x1, y1, x2, y2 + 1);
			break;
		case "s":
			distance = INC.calculateSingleDistance(x1, y1, x2 + 1, y2 + 1);
			break;
		case "se":
			distance = INC.calculateSingleDistance(x1, y1, x2 + 1, y2);
			break;
		default:
			distance = INC.calculateSingleDistance(x1, y1, x2, y2);
			break;
	}
	$('#INC-mapCoordOutput').html(INC.formatTime(distance));
};
INC.movedWorld = function () {
	// a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	var distance, c1, c2, x1, y1, x2, y2;
	c1 = INC.getIslandCoords(unsafeWindow.dataSetForView.relatedCityData[unsafeWindow.dataSetForView.relatedCityData.selectedCity].coords);
	y1 = c1[2];
	x1 = c1[1];
	c2 = unsafeWindow.ikariam.getMapNavigation();
	x2 = Number(((undefined != INC.Xcoord && INC.Xcoord != 0) ? INC.Xcoord : unsafeWindow.islandX)) + Number(c2.dx);
	y2 = Number(((undefined != INC.Ycoord && INC.Ycoord != 0) ? INC.Ycoord : unsafeWindow.islandY)) + Number(c2.dy);
	distance = INC.calculateSingleDistance(x1, y1, x2, y2);
	$('#INC-mapCoordOutput').html(INC.formatTime(distance));
};
// Clicking on a city name will change the city to that one
INC.cityFormCall = eval('(' + unsafeWindow.cityFormCall.toString().replace(/ikariam\./g, 'unsafeWindow.ikariam.').replace(/splitUrlQueryString/g, 'unsafeWindow.splitUrlQueryString').replace(/Dom/g, 'unsafeWindow.Dom').replace(/window\.location.href\s*=/, 'return').replace('return false', '') + ')');
INC.tocity = function (a) {
	a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	if (!a.id) { return; }
	$('#js_cityIdOnChange')[0].value = a.id;
	unsafeWindow.ajaxHandlerCallFromForm($('#changeCityForm')[0]);
};
INC.tocityisland = INC.tocity;
INC.tocitycity = function (a) {
	try {
	a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	if (!a.id) { return; }
	$('#js_cityIdOnChange')[0].value = a.id;
	if (Config.get('otcity')) {
		var cityId = location.href.getArgument('cityId'), ret;
		if (cityId != '' && a.id != '' && a.id != INC.currentID && (!INC.citiesData.hasOwnProperty(cityId) || INC.citiesData[cityId][5] != 'ownCity')) {
			ret = GM_xmlhttpRequest({
				method: "GET",
				// url: window.location.protocol + '//' + window.location.host + '/' + INC.cityFormCall($('#changeCityForm')[0]),
				url: window.location.protocol + '//' + window.location.host + '/' + '?view=city&cityId=' + a.id,
				onreadystatechange: function(res) {
					if (res.readyState > 1) {
						ret.abort();
						window.location.href = window.location.href.replace(/\#.*/g, '');
					}
				},
				onload: function(res) {
					window.location.href = window.location.href.replace(/\#.*/g, '');
				}
			});
		} else {
			unsafeWindow.ajaxHandlerCallFromForm($('#changeCityForm')[0]);
		}
	} else {
		unsafeWindow.ajaxHandlerCallFromForm($('#changeCityForm')[0]);
	}
	} catch (e) {
		alert(e);
	}
};

INC.loadingMod = function (func) {
	if (document.getElementById('loadingPreview')) {
		document.getElementById('loadingPreview').addEventListener("DOMAttrModified", function () {
			if (document.getElementById('loadingPreview').style.display == 'none') {func(); }
		}, false);
	}
};

INC.getInfos = function () {
	INC.getCurrIslandCoords();
	var relatedCityData = unsafeWindow.ikariam.model.relatedCityData;
	INC.currentID = relatedCityData[relatedCityData.selectedCity]['id'];
	if (!INC.fetch_cities()) {return false; }
	INC.calculateDistance();
	INC.citiesData.sort(INC.sortNum);
	return true;
};
INC.fetch_cities = function () {
	try {
		var i, k = -1, mat, cities = unsafeWindow.ikariam.model.relatedCityData; //it gets non-player's cities (occupied, etc.)
		for (i in cities) {
			if (cities.hasOwnProperty(i)) {
				if (i == 'additionalInfo') {continue; }
				if (i == 'selectedCity') {
					// INC.currentID = cities[i].replace(/\D/g, '');
					continue;
				}
				if (Number(/city_(\d+)/g.exec(i)[1])) {
					k += 1;
					INC.citiesData[k] = new Array(7);
					INC.citiesData[k][1] = cities[i].name;
					mat = /\[(\d+):(\d+)\]/g.exec(cities[i].coords);
					INC.citiesData[k][2] = mat[1];
					INC.citiesData[k][3] = mat[2];
					INC.citiesData[k][4] = cities[i].id;
					INC.citiesData[k][5] = cities[i].relationship;
					INC.citiesData[k][6] = cities[i].tradegood;
				}
			}
		}
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};
INC.add_table = function () {
	var x, i, newRow, cityCell, distCell,
		table = INC.newTable;
	if (table) {
		i = table.rows.length;
		while (i--) {
			$(table.rows[i]).unbind();
			table.deleteRow(i);
		}
	}
	for (x in INC.citiesData) {
		if (INC.citiesData.hasOwnProperty(x)) {
			newRow = table.insertRow(x);
			cityCell = newRow.insertCell(0);
			distCell = newRow.insertCell(1);
			distCell.align = "center";
			cityCell.className = "INC-cityCell";
			distCell.className = "INC-distCell";
			if (Config.get('seconds')) {
				distCell.style.minWidth = "25%";
			} else {
				distCell.style.minWidth = "20%";
			}
			newRow.style.backgroundColor = (INC.citiesData[x][5] === 'deployedCities') ? '#BAF6A0' : (INC.citiesData[x][5] === 'occupiedCities') ? '#DD5B4D' : '';
			newRow.cells[0].innerHTML = "<a id='" + INC.citiesData[x][4] + "' class='INC-link-city' href='#' cityId='" + INC.citiesData[x][4] + "'>" + INC.citiesData[x][1] + "</a>";
			newRow.cells[1].innerHTML = INC.formatTime(INC.citiesData[x][0]);
			$(newRow).hover(function () {
				INC.addMilitaryTable(this.rowIndex);
				$('#INCsidebar').show();
				$('#INCmilitarybar').show();
			}, function () {
				$('#INCmilitarybar').hide();
			});
		}
	}
	$('#INC-iTime').remove();
	var newSpan = $('<span id="INC-iTime" class="white"></span>');
	newSpan.appendTo($('#js_islandBreadCoords')[0].parentNode);
	if (Config.get('dtime')) {
		for (x in INC.citiesData) {
			if (INC.citiesData.hasOwnProperty(x)) {
				if (INC.citiesData[x][4] == INC.currentID) {
					newSpan.html(' - ' + INC.formatTime(INC.citiesData[x][0]));
				}
			}
		}
	} else {
		newSpan.html(' - ' + INC.formatTime(INC.citiesData[0][0]));
	}
};
INC.addMilitaryTable = function (x) {
	try {
	var table = $('#INCmilitarybar .INC-Table')[0], newRow, c1, c2, c3, c4, i, k, c;
	$('#INCmilitarybar #INCyuiMilitarybar-1-label').html(INC.citiesData[x][1] + ' [' + INC.citiesData[x][2] + ':' + INC.citiesData[x][3] + '] <=> [' + INC.currCityXcoord + ':' + INC.currCityYcoord + ']');
	i = table.rows.length;
	while (i--) {
		table.deleteRow(i);
	}
	i = INC.unitorder.length;
	while (i--) {
		newRow = table.insertRow(0);
		c = 0;
		if (INC.units.hasOwnProperty(INC.unitorder[i])) {
			c1 = newRow.insertCell(c);
			c1.innerHTML = '<div class="button_seaunits ship_' + INC.unitorder[i] + '"> </div>';
			if (INC.unitorder[i] == 'spy') {c1.innerHTML = '<img style="width: 35px;" src="' + INC.units['spy'][2] + '" />'; }
			c2 = newRow.insertCell(c + 1);
			if (INC.units.hasOwnProperty(INC.unitorder[i + 2]) && INC.units[INC.unitorder[i + 2]][0] == INC.units[INC.unitorder[i]][0]) {
				c2.innerHTML = table.rows[1].cells[1].innerHTML;
				if (table.rows[1].cells[1].getAttribute('rowspan')) {
					c2.setAttribute('rowspan', Number(table.rows[1].cells[1].rowSpan) + 1);
				} else {
					c2.setAttribute('rowspan', 2);
				}
				table.rows[1].deleteCell(1);
			} else {
				c2.innerHTML = INC.formatTime(Math.max(INC.units[INC.unitorder[i]][1], INC.citiesData[x][0]*60/INC.units[INC.unitorder[i]][0]));
			}
			c += 2;
		} else if (INC.unitorder[i] == ''){
			c1 = newRow.insertCell(c);
			c1.colSpan = 2;
			c1.innerHTML = ' ';
			c += 1;
		}
		i -= 1;
		if (INC.units.hasOwnProperty(INC.unitorder[i])) {
			c3 = newRow.insertCell(c);
			c3.innerHTML = '<div class="button_seaunits ship_' + INC.unitorder[i] + '"> </div>';
			if (INC.unitorder[i] == 'spy') {c3.innerHTML = '<img style="width: 35px;" src="' + INC.units['spy'][2] + '" />'; }
			c4 = newRow.insertCell(c + 1);
			if (INC.units.hasOwnProperty(INC.unitorder[i + 2]) && INC.units[INC.unitorder[i + 2]][0] == INC.units[INC.unitorder[i]][0]) {
				k = (table.rows[1].cells.length == 4) ? 3 : 2;
				c4.innerHTML = table.rows[1].cells[k].innerHTML;
				if (table.rows[1].cells[k].getAttribute('rowspan')) {
					c4.setAttribute('rowspan', Number(table.rows[1].cells[k].rowSpan) + 1);
				} else {
					c4.setAttribute('rowspan', 2);
				}
				table.rows[1].deleteCell(k);
			} else {
				c4.innerHTML = INC.formatTime(Math.max(INC.units[INC.unitorder[i]][1], INC.citiesData[x][0]*60/INC.units[INC.unitorder[i]][0]));
			}
		}
	}
	} catch (e) {console.log(e); }
};
INC.init = function () {
	try {
		if (unsafeWindow.ikariam.hasOwnProperty('model') && unsafeWindow.ikariam.model != null && (INC.bw || INC.bi || INC.bc)) {
			if (!INC.getInfos()) {return false; }
			INC.addStyle();
			var newdyDiv = $('<div id="INCsidebar"></div>');
			var newdyUl = $('<ul id="INCyuiSidebar" class="dynamic INC-accordionview"></ul>');
			var newdyLi = $('<li class="INC-accordion-panel"></li>');
			var sidebarDiv = $('#breadcrumbs')[0];
			newdyLi.append('<a id="INCyuiSidebar-1-label" class="INC-accordion-toggle" href="http://userscripts.org/scripts/show/114694" target="_blank">Nearest City v' + INC.ver + '</a>');
			var newcontDiv = $('<div class="INC-accordion-content" style="height: auto;"></div>');
			INC.newTable = $('<table class="INC-Table"></table>')[0];

			newcontDiv.append(INC.newTable);
			newdyLi.append(newcontDiv);
			newdyUl.append(newdyLi);
			newdyDiv.hide();
			newdyDiv.append(newdyUl);
			var milit = newdyDiv.clone().attr('id', 'INCmilitarybar');
			$('#INCyuiSidebar', milit).attr('id', 'INCyuiMilitarybar');
			$('#INCyuiSidebar-1-label', milit).attr('id', 'INCyuiMilitarybar-1-label');
			INC.add_table();
			sidebarDiv.parentNode.insertBefore(newdyDiv[0], sidebarDiv);
			sidebarDiv.parentNode.insertBefore(milit[0], sidebarDiv);

			$('#js_islandBread').hover(function () { //, #js_cityBread, #js_worldBread, #breadcumbs *
				$('#INCsidebar').show();
			}, function () {
				if ($('#INCsidebar:hover').size() < 1) {
					$('#INCsidebar').hide();
					$('#INCmilitarybar').hide();
				}
			});
			$('#INCsidebar').hover(function () {
				$('#INCsidebar').show();
			}, function () {
				if ($('#js_islandBread:hover').size() < 1) {
					$('#INCsidebar').hide();
					$('#INCmilitarybar').hide();
				}
			});
			if (INC.bc) {
				INC.newTable.addEventListener('click', INC.tocitycity, true);
			} else if (INC.bi) {
				INC.newTable.addEventListener('click', INC.tocityisland, true);
				INC.loadingMod(function () {
					if ($('#js_selectedCityName').size() == 0) {return false; }
					$('#js_selectedCityName').css('cursor', 'pointer').hover(function () {
						$(this).css('text-decoration', 'underline');
					}, function () {
						$(this).css('text-decoration', 'none');
					}).click(function () {
						var locations = $('.cityLocation.can_be_entered'), i;
						i = locations.size();
						while (i--) {
							if ($(locations[i]).html().indexOf($('#js_selectedCityName').html()) != -1 && $('.link_img', locations[i]).attr('href').getArgument('cityId') == $('#js_selectedCityReportPlayer').attr('href').getArgument('target')) {
								$(locations[i]).click();
							}
						}
					});
				});
			} else if (INC.bw) {
				var or = jQuery('#mapCoordInput');
				var test = $('<div></div>').addClass('agg').attr('id', 'INC-mapCoordOutput').copyCSS('#mapCoordInput').css({left: (or[0].offsetLeft - or[0].offsetWidth) + 'px', margin: '0 ' + (- or[0].offsetWidth) + 'px 0 0', 'font-size': '11px', 'padding-top': '8px'});
				$('#mapCoordInput').before(test);
				INC.changeWorld(true);
				INC.newTable.addEventListener('click', INC.tocity, true);
				$('#worldmap').on('click', '.islandTile', INC.changeIsland).mousedown(function(){
					clicking = true;
				}).mousemove(function(){
					if(clicking == false) {return; }

					// Mouse click + moving logic here
					INC.movedWorld();
				});
				$(document).mouseup(function(){
					clicking = false;
				});
				$('#mapCoordInput .submitButton').click(function () {
					INC.changeWorld(false);
				});
				$('#mapControls').on('click', 'a', INC.clickArrow);
				INC.loadingMod(function () {
					if ($('.islandMarked').size() && $('#INC-mapCoordOutput').hasClass('agg')) {
						$('#INC-mapCoordOutput').html($('.islandMarked')[0].parentNode.title + ' - ' + $('#INC-mapCoordOutput').html()).removeClass('agg');
						INC.changeIsland({currentTarget: $('.islandMarked')[0].parentNode});
					}
				});
			}
			INC.loadingMod(function () {
				var relatedCityData = unsafeWindow.ikariam.model.relatedCityData;
				if (relatedCityData[relatedCityData.selectedCity]['id'] != INC.currentID || INC.citiesData.length != (relatedCityData.length-2)) {
					if (!INC.getInfos()) {return false; }
					INC.add_table();
					if (INC.bw) {
						INC.changeWorld(true);
					}
				}
			});
		} else {
			INC.timeout = setTimeout(function () {INC.init(); }, 1000);
			console.log(unsafeWindow.ikariam.hasOwnProperty('model'));
		}
	} catch (e) {
		console.log(e);
	}
};
INC.addStyle = function () {
	GM_addStyle(String() +
		'#INCsidebar {box-shadow: 0 0 4px #000000; margin: 18px 0 0 0; position: absolute; z-index: 1000000; left: ' + (document.getElementById('js_islandBread').offsetLeft || 85) + 'px;}' +
		'#INCmilitarybar {box-shadow: 0 0 4px #000000; margin: 18px 0 0 0; position: absolute; z-index: 1000000; left: ' + ((document.getElementById('js_islandBread').offsetLeft || 85) + 258) + 'px;}' +
	(<![CDATA[
	#INCsidebar #INCyuiSidebar {
		padding-bottom: 5px;
		width: 228px;
		background: url("skin/layout/bg_sidebox_footer.png") no-repeat scroll left bottom transparent;
	}
	#INCmilitarybar #INCyuiSidebar {
		width: 218px;
	}
	#INCsidebar .INC-accordionview div.INC-accordion-content, #INCmilitarybar .INC-accordionview div.INC-accordion-content {
		margin: 0;
		overflow: hidden;
		padding: 10px 4px;
	}
	#INCsidebar .INC-accordionview li.INC-accordion-panel a.INC-accordion-toggle, #INCmilitarybar .INC-accordionview li.INC-accordion-panel a.INC-accordion-toggle {
		display: block;
		font-weight: 700;
		position: relative;
		text-decoration: none;
		text-align: center;
	}
	#INCsidebar .INC-accordionview li.INC-accordion-panel a.INC-accordion-toggle {
		background: url("skin/layout/bg_sidebox_header.jpg") no-repeat scroll 0 0 transparent;
		height: 24px;
		line-height: 24px;
		padding-top: 2px;
	}
	#INCmilitarybar .INC-accordionview li.INC-accordion-panel a.INC-accordion-toggle {
		background: url("skin/layout/bg_sidebox_header.jpg") no-repeat scroll -5px -5px transparent;
		height: 18px;
		line-height: 18px;
		padding-top: 0;
	}
	#INCsidebar .INC-accordion-content {
		background: url("skin/layout/bg_sidebox.png") repeat-y scroll 0 0 transparent;
	}
	#INCmilitarybar .INC-accordion-content {
		background: url("skin/layout/bg_sidebox.png") repeat-y scroll -5px 0 transparent;
	}
	.INC-Table {
		width: 100%;
		border: 1px dotted;
	}
	#INCsidebar .INC-distCell {
		border: 1px dotted;
	}
	#INCsidebar .INC-cityCell, #INCmilitarybar td {
		border: 1px dotted;
		padding: 0px 5px;
	}
	#INCsidebar .INC-accordion-content .INC-link-city {
		color: blue;
	}
	#INCmilitarybar .button_seaunits {
		background-image: url("skin/premium/unitfleets_x34_y34.png");
		height: 35px;
		width: 35px;
	}
	#INCmilitarybar .ship_transport {
		background-position: 0 -36px;
	}
	#INCmilitarybar .ship_ram {
		background-position: -36px -36px;
	}
	#INCmilitarybar .ship_ballista {
		background-position: -72px -36px;
	}
	#INCmilitarybar .ship_flamethrower {
		background-position: -108px -36px;
	}
	#INCmilitarybar .ship_catapult {
		background-position: -144px -36px;
	}
	#INCmilitarybar .ship_steamboat {
		background-position: -180px -36px;
	}
	#INCmilitarybar .ship_mortar {
		background-position: -216px -36px;
	}
	#INCmilitarybar .ship_submarine {
		background-position: -251px -36px;
	}
	#INCmilitarybar .ship_rocketship {
		background-position: -395px -36px;
	}
	#INCmilitarybar .ship_paddlespeedship {
		background-position: -359px -36px;
	}
	#INCmilitarybar .ship_ballooncarrier {
		background-position: -323px -36px;
	}
	#INCmilitarybar .ship_tender {
		background-position: -287px -36px;
	}]]>).toString());
};
INC.init();