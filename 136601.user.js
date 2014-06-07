/**
// ==UserScript==
// @id             ikariamnearestcity@narulez
// @name           Ikariam Nearest City
// @namespace      Narulez
// @author         Narulez
// @author         Salmonela
// @description    This Ikariam script calculates and displays the distance between the currently selected Island to the Islands owned by the player. 
// @downloadURL    https://userscripts.org/scripts/source/136601.user.js
// @updateURL      https://userscripts.org/scripts/source/136601.meta.js
// @run-at         document-idle
// @include        http://s*.ikariam.*
// @include        http://m*.ikariam.*
// @exclude        http://board*.ikariam.*
// @exclude        http://support*.ikariam.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        https://userscripts.org/scripts/source/136600.user.js
// @require        https://userscripts.org/scripts/source/136599.user.js
// @require        https://userscripts.org/scripts/source/136598.user.js
// @oldrequire     https://userscripts.org/scripts/source/136634.user.js
// @oldrequire     https://userscripts.org/scripts/source/136633.user.js

// ==/UserScript==
**/
/*global ScriptUpdater, Config, IkaTools, XPathResult, $, top */
var currCityXcoord, currCityYcoord, Xcoord, Ycoord, divList, newTable, citiesData = [], currentID = '',
	bw = document.body.id === 'worldmap_iso', bi = document.body.id === 'island', bc = document.body.id === 'city',
	ver = "1.08";
ScriptUpdater.check(136601, ver);

Config.scriptName = "Nearest City v" + ver;
Config.tabs = {
	"Opt": {
		name: "Opcijas",
		fields: {
			otcity: {
				type: 'checkbox',
				label: 'Svešas pilsētas',
				text: 'Noklikšķinot uz pilsētu nosaukumiem tabulā "Nearest City" svešu pilsētu skatā, skripts izmainīs izvēlēto pilsētu, bet ne apskatīto pilsētu.',
				value: true,
			},
			dtime: {
				type: 'checkbox',
				label: 'Salas laiks',
				text: 'Blakus salas nosaukumam tiek attēlots laiks pašreizējai pilsētai (pēc noklusējuma aktivizēts) vai tuvākajai pilsētai (atslēgts).',
				value: true,
			},
			seconds: {
				type: 'checkbox',
				label: 'Sekundes',
				text: 'Tiek attēlotas arī sekundes.',
				value: true,
			},
			// showisl: {
				// type: 'checkbox',
				// label: 'Salas skats',
				// text: 'Pc noklusjuma tabula "Tuvk pilsta" tiek attlota salas skat.',
				// value: false,
			// },
			// showmap: {
				// type: 'checkbox',
				// label: 'Pasaules skats',
				// text: 'Pc noklusjuma tabula "Tuvk pilst" tiek attlota pasaules skat.',
				// value: false,
			// },
		}
	},
	"History": {
        name: "Izmaiņas",
		fields : {},
		log: {
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
	"Par": {
		fields : {},
		html: "<p><a style='font-weight:bold !important;' target='_blank' href='http://userscripts.org/scripts/show/136601'>Ikariam Nearest City v" + ver + "</a>" +
			" by <a target='_blank' href='http://userscripts.org/users/268539'>Narulez</a> (from v1.04) and <a target='_blank' href='http://userscripts.org/users/111606'>Salmonela</a> (until v1.03).</p>" +
			"<p>Šis Ikariam skripts aprēķina un attēlo attālumu no pašlaik izvēlētās salas līdz spēlētāja paša salai.</p>",
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
IkaTools.addOptionsLink(Config.scriptName);
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

function formatTime(time) {
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
}

// Refresh city table div
function refreshTableDiv() {
	var x;
	for (x in citiesData) {
		if (citiesData.hasOwnProperty(x)) {
			newTable.rows[x].style.backgroundColor = (citiesData[x][5] === 'deployedCities') ? '#BAF6A0' : (citiesData[x][5] === 'occupiedCities') ? '#DD5B4D' : '';
			newTable.rows[x].cells[0].innerHTML = "<a id='" + citiesData[x][4] + "' class='INC-link-city' href='#' cityId='" + citiesData[x][4] + "'>" + citiesData[x][1] + "</a>";
			newTable.rows[x].cells[1].innerHTML = formatTime(citiesData[x][0]);
		}
	}
	$('#INC-iTime').remove();
	var newSpan = $('<span id="INC-iTime" class="white"></span>');
	newSpan.appendTo($('#js_islandBreadCoords')[0].parentNode);
	if (Config.get('dtime')) {
		for (x in citiesData) {
			if (citiesData.hasOwnProperty(x)) {
				if (citiesData[x][4] == currentID) {
					newSpan.html(' - ' + formatTime(citiesData[x][0]));
				}
			}
		}
	} else {
		newSpan.html(' - ' + formatTime(citiesData[0][0]));
	}
}

// Fetching the Island coords
function getIslandCoords(txt) {
	var mat = /\[(\d+):(\d+)\]/g.exec(txt);
	return mat;
}
function getCurrIslandCoords() {
	divList = $('#js_islandBreadCoords')[0];
	if (divList != null) {
		var mat = getIslandCoords(divList.innerHTML);
		currCityXcoord = mat[1];
		currCityYcoord = mat[2];
	}
}
function getCurrIslandCoords3() {
	Xcoord = $('#inputXCoord')[0];
	Ycoord = $('#inputYCoord')[0];
	if (Xcoord != null && Ycoord != null) {
		Xcoord = Xcoord.value;
		Ycoord = Ycoord.value;
	}
}
// Calculates the distances
function calculateSingleDistance(x1, y1, x2, y2) {
	var deltaX, deltaY, hops, distanceInMinutes;
	deltaX = parseInt(x1, 10) - parseInt(x2, 10);
	deltaY = parseInt(y1, 10) - parseInt(y2, 10);
	hops = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
	distanceInMinutes = 10;
	if (hops > 0) {
		distanceInMinutes = 20 * hops;
	}
	return distanceInMinutes;
}
function calculateDistance() {
	var city;
	for (city in citiesData) {
		if (citiesData.hasOwnProperty(city)) {
			citiesData[city][0] = calculateSingleDistance(currCityXcoord, currCityYcoord, citiesData[city][2], citiesData[city][3]);
		}
	}
}

// Helper function for sorting the matrix
function sortNum(a, b) {
	// return a.toString().split(",")[0] > b.toString().split(",")[0];
	return a > b;
}

// Clicking on an island will recalculate and redraw the new data
function changeIsland(a) {
	a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	var mat = getIslandCoords(a.title);
	currCityXcoord = mat[1];
	currCityYcoord = mat[2];
	calculateDistance();
	citiesData.sort(sortNum);
	refreshTableDiv();
	$('#js_islandBreadName').text(a.title.replace(/ \[.+$/g, ''));
	$('#js_islandBreadCoords').text(a.title.replace(/^.+ \[/g, ' ['));
	changeWorld(true);
}

// Clicking on arrows will recalculate and redraw the new data
function changeWorld(force) {
	var tes1 = function () {
		var x;
		if (Config.get('dtime')) {
			for (x in citiesData) {
				if (citiesData.hasOwnProperty(x)) {
					if (citiesData[x][4] == currentID) {
						$('#INC-mapCoordOutput').html(formatTime(citiesData[x][0])).addClass('agg');
					}
				}
			}
		} else {
			$('#INC-mapCoordOutput').html(formatTime(citiesData[0][0])).addClass('agg');
		}
	};
	if (force){
		tes1();
		if ($('.islandMarked').size() && $('#INC-mapCoordOutput').hasClass('agg')) {
			$('#INC-mapCoordOutput').html($('.islandMarked')[0].parentNode.title + ' - ' + $('#INC-mapCoordOutput').html()).removeClass('agg');
		}
	} else {
		getCurrIslandCoords3();
		currCityXcoord = Xcoord;
		currCityYcoord = Ycoord;
		calculateDistance();
		citiesData.sort(sortNum);
		tes1();
		loadingMod(function () {
			if ($('.islandMarked').size() && $('#INC-mapCoordOutput').hasClass('agg')) {
				$('#INC-mapCoordOutput').html($('.islandMarked')[0].parentNode.title + ' - ' + $('#INC-mapCoordOutput').html()).removeClass('agg');
				changeIsland({currentTarget: $('.islandMarked')[0].parentNode});
			}
		});
	}
}

function clickArrow(a) {
	a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	var dir = $(a).parent().attr('class'), distance, c1, c2, x1, y1, x2, y2;
	c1 = getIslandCoords(unsafeWindow.dataSetForView.relatedCityData[unsafeWindow.dataSetForView.relatedCityData.selectedCity].coords);
	y1 = c1[2];
	x1 = c1[1];
	console.log(c1, x1, y1);
	c2 = unsafeWindow.ikariam.getMapNavigation();
	x2 = ((undefined != Xcoord && Xcoord != 0) ? Xcoord : unsafeWindow.islandX) + c2.dx;
	y2 = ((undefined != Ycoord && Ycoord != 0) ? Ycoord : unsafeWindow.islandY) + c2.dy;
	console.log(Xcoord, unsafeWindow.islandX, ((undefined != Xcoord && Xcoord != 0) ? Xcoord : unsafeWindow.islandX), c2.dx, x2);
	console.log(Ycoord, unsafeWindow.islandY, ((undefined != Ycoord && Ycoord != 0) ? Ycoord : unsafeWindow.islandY), c2.dy, y2);
	console.log(dir);
	switch (dir) {
		case "nw":
			distance = calculateSingleDistance(x1, y1, x2 - 1, y2);
			break;
		case "n":
			distance = calculateSingleDistance(x1, y1, x2 - 1, y2 - 1);
			break;
		case "ne":
			distance = calculateSingleDistance(x1, y1, x2, y2 - 1);
			break;
		case "w":
			distance = calculateSingleDistance(x1, y1, x2 - 1, y2 + 1);
			break;
		case "e":
			distance = calculateSingleDistance(x1, y1, x2 + 1, y2 - 1);
			break;
		case "sw":
			distance = calculateSingleDistance(x1, y1, x2, y2 + 1);
			break;
		case "s":
			distance = calculateSingleDistance(x1, y1, x2 + 1, y2 + 1);
			break;
		case "se":
			distance = calculateSingleDistance(x1, y1, x2 + 1, y2);
			break;
		default:
			distance = calculateSingleDistance(x1, y1, x2, y2);
			break;
	}
	$('#INC-mapCoordOutput').html(formatTime(distance));
}

var cityFormCall = eval('(' + unsafeWindow.cityFormCall.toString().replace(/ikariam\./g, 'unsafeWindow.ikariam.').replace(/splitUrlQueryString/g, 'unsafeWindow.splitUrlQueryString').replace(/Dom/g, 'unsafeWindow.Dom').replace(/window\.location.href\s*=/, 'return').replace('return false', '') + ')');

// Clicking on a city name will change the city to that one
function tocity(a) {
	a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	if (!a.id) { return; }
	$('#js_cityIdOnChange')[0].value = a.id;
	unsafeWindow.cityFormCall($('#changeCityForm')[0]);
}

function tocityisland(a) {
	a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	if (!a.id) { return; }
	$('#js_cityIdOnChange')[0].value = a.id;
	unsafeWindow.cityFormCall($('#changeCityForm')[0]);
}

function tocitycity(a) {
	try {
	a = (a.explicitOriginalTarget) ? a.explicitOriginalTarget.parentNode : a.currentTarget;
	if (!a.id) { return; }
	$('#js_cityIdOnChange')[0].value = a.id;
	if (Config.get('otcity')) {
		var cityId = location.href.getArgument('cityId'), ret;
		// console.log(a.id, cityId, currentID);
		if (cityId != '' && a.id != '' && a.id != currentID) { //(!citiesData.hasOwnProperty(cityId) || citiesData[cityId][5] != 'ownCity')
			// $('#changeCityForm').append('<input type="hidden" name="selectCity" value="' + cityId + '">');
			ret = GM_xmlhttpRequest({
				method: "GET",
				url: window.location.protocol + '//' + window.location.host + '/' + cityFormCall($('#changeCityForm')[0]),
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
		}
	} else {
		$('#changeCityForm').append('<input type="hidden" name="view" value="city">');
		unsafeWindow.cityFormCall($('#changeCityForm')[0]);
		// $('#changeCityForm')[0].submit();
	}
	} catch (e) {
		alert(e);
	}
}

function loadingMod(func) {
	if (document.getElementById('loadingPreview')) {
		document.getElementById('loadingPreview').addEventListener("DOMAttrModified", function () {
			if (document.getElementById('loadingPreview').style.display == 'none') {func(); }
		}, false);
	}
}

function fetch_cities() {
	try {
		var i, k = -1, mat, cities = unsafeWindow.dataSetForView.relatedCityData; //it gets non-player's cities (occupied, etc.)
		for (i in cities) {
			if (cities.hasOwnProperty(i)) {
				if (i == 'additionalInfo') {continue; }
				if (i == 'selectedCity') {
					currentID = cities[i].replace(/\D/g, '');
					continue;
				}
				if (Number(/city_(\d+)/g.exec(i)[1])) {
					k += 1;
					citiesData[k] = new Array(7);
					citiesData[k][1] = cities[i].name;
					mat = /\[(\d+):(\d+)\]/g.exec(cities[i].coords);
					citiesData[k][2] = mat[1];
					citiesData[k][3] = mat[2];
					citiesData[k][4] = cities[i].id;
					citiesData[k][5] = cities[i].relationship;
					citiesData[k][6] = cities[i].tradegood;
				}
			}
		}
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

function init() {
	try {
		if (bw || bi || bc) {
			// Fetching Current island coords
			getCurrIslandCoords();
			if (!fetch_cities()) {return false; }
			calculateDistance();
			citiesData.sort(sortNum);
			// return false;
			GM_addStyle(String() +
				'#INCsidebar {box-shadow: 0 0 4px #000000; margin: 18px 0 0 0; position: absolute; z-index: 65536; left: ' + (document.getElementById('js_islandBread').offsetLeft || 90) + 'px;}' +
				'#INCsidebar #INCyuiSidebar {background: url("skin/layout/bg_sidebox_footer.png") no-repeat scroll left bottom transparent; padding-bottom: 5px;}' +
				'#INCsidebar .INC-accordionview div.INC-accordion-content { margin: 0; overflow: hidden; padding: 10px 4px;}' +
				'#INCsidebar .INC-accordionview li.INC-accordion-panel a.INC-accordion-toggle {background: url("skin/layout/bg_sidebox_header.jpg") no-repeat scroll 0 0 transparent; display: block; font-weight: 700; height: 24px; line-height: 24px; padding-top: 2px; position: relative; text-decoration: none; text-align: center;}' +
				'#INCsidebar .INC-accordion-content {background: url("skin/layout/bg_sidebox.png") repeat-y scroll 0 0 transparent;}' +
				'#INCsidebar .INC-accordion-content .INC-link-city {color: blue;}' +
			String());
			var newdyDiv = $('<div id="INCsidebar"></div>');
			var newdyUl = $('<ul id="INCyuiSidebar" class="dynamic INC-accordionview" style="width: 228px;"></ul>');
			var newdyLi = $('<li class="INC-accordion-panel"></li>');
			var sidebarDiv = $('div#breadcrumbs')[0];
			newdyLi.append('<a id="INCyuiSidebar-1-label" class="INC-accordion-toggle">Nearest City</a>');
			var newcontDiv = $('<div class="INC-accordion-content" style="height: auto;"></div>');
			newTable = $('<table style="width: 100%; border: 1px dotted;" border="1"></table>')[0];

			var x;
			for (x in citiesData) {
				if (citiesData.hasOwnProperty(x)) {
					var newRow = newTable.insertRow(x);
					var cityCell = newRow.insertCell(0);
					var distCell = newRow.insertCell(1);
					distCell.align = "center";
					cityCell.style.padding = "0px 5px";
					cityCell.style.border = "1px dotted";
					if (Config.get('seconds')) {
						distCell.style.minWidth = "25%";
					} else {
						distCell.style.minWidth = "20%";
					}
					distCell.style.border = "1px dotted";
				}
			}
			refreshTableDiv();
			newcontDiv.append(newTable);
			newdyLi.append(newcontDiv);
			newdyUl.append(newdyLi);
			newdyDiv.hide();
			newdyDiv.append(newdyUl);
			sidebarDiv.parentNode.insertBefore(newdyDiv[0], sidebarDiv);

			$('#js_islandBread').hover(function () { //, #js_cityBread, #js_worldBread, #breadcumbs *
				newdyDiv.show();
			}, function () {
				if ($('#INCsidebar:hover').size() < 1) {newdyDiv.hide(); }
			});
			$('#INCsidebar').hover(function () {
				newdyDiv.show();
			}, function () {
				if ($('#js_islandBread:hover').size() < 1) {newdyDiv.hide(); }
			});
			if (bc) {
				newTable.addEventListener('click', tocitycity, true);
			} else if (bi) {
				newTable.addEventListener('click', tocityisland, true);
				loadingMod(function () {
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
			} else if (bw) {
				var or = jQuery('#mapCoordInput');
				var test = $('<div></div>').addClass('agg').attr('id', 'INC-mapCoordOutput').copyCSS('#mapCoordInput').css({left: (or[0].offsetLeft - or[0].offsetWidth) + 'px', margin: '0 ' + (- or[0].offsetWidth) + 'px 0 0', 'font-size': '11px', 'padding-top': '8px'});
				$('#mapCoordInput').before(test);
				changeWorld(true);
				newTable.addEventListener('click', tocity, true);
				$('#worldmap').on('click', '.islandTile', changeIsland);
				$('#mapCoordInput .submitButton').click(function () {
					changeWorld(false);
				});
				$('#mapControls').on('click', 'a', clickArrow);
			}
		}
	} catch (e) {
		alert(e);
	}
}
init();