// ==UserScript==
// @name           	Town Planner
// @namespace      	ikariamLibrary
// @description    	Move Town Structures without Destruction and Re-Construction [v1.2.3]
// @require        	http://script.betterday.co.uk/modules/game.js
// @require        	http://script.betterday.co.uk/modules/string.js
// @include        	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

/* author: Nick Sewell ( contact: script@betterday.co.uk ) */

/* Released under the GPL license - http://www.gnu.org/copyleft/gpl.html */

var s = (new Date).getTime();

var cityEdit = function () {
	if (arguments.length == 1) {
		if (typeof arguments[0] === "object" && arguments[0] === null) {
			return GM_getValue("cityEdit", false);
		} else if (typeof arguments[0] === "boolean") {
			GM_setValue("cityEdit", arguments[0]);
		}
	} else {
		GM_setValue("cityEdit", !GM_getValue("cityEdit", true));
		window.location.reload();
	}
	return GM_getValue("cityEdit", false);
}; // end of cityEdit

var islandEdit = function () {
	if (arguments.length == 1) {
		if (typeof arguments[0] === "object" && arguments[0] === null) {
			return GM_getValue("islandEdit", false);
		} else if (typeof arguments[0] === "boolean") {
			GM_setValue("islandEdit", arguments[0]);
		}
	} else {
		GM_setValue("islandEdit", !GM_getValue("islandEdit", true));
		window.location.reload();
	}
	return GM_getValue("islandEdit", false);
}; // end of cityEdit

var defaultValues = {
	"city": "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14",
	"island": "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14"
};

var load = function (name, defaultValue) {
var data = GM_getValue(name, defaultValue).split(",");
console.log("Town Planner: Loaded [ "+data+" ]");
	return data;
}; // End of load

var save = function (name, data) {
	var output = "";

	if (data instanceof Array) {
		for (var i = 0; i < data.length; i++) { output += (output==""?"":",")+data[i].toString();	}
console.log("Town Planner: Saving [ "+ output + "]");
//console.log("Town Planner: Saved = [ "+load(name)+"]");
		GM_setValue(name, String(data));
	} else if (typeof data === "string") {
		GM_setValue(name, data);
	}
}; // End of save

var cityHitch = function (e, loc, id, vis) {
	return function() {
		selectCity.apply(e,[ loc, id, vis ]);
		selectGroup.apply(e, ['cities']);
		return false;
	}
}; // End of cityHitch

var game = new game();

if (game.view === "island") {

	var islandId = document.evaluate("//ul[@id='islandfeatures']/li[contains(@class, 'wood')]/a/@href", document, null, 2, null).stringValue.getArgument("id");

console.log("Town Planner: IslandID = "+islandId);

	var positionData = load(game.server+"_"+game.world+"_"+islandId+"_islandData", defaultValues.island);

	var citySelected = null;

	var resetIsland = function () {
		save(game.server+"_"+game.world+"_"+islandId+"_islandData", defaultValues.island);
		
	}; // End of resetIsland

	var swapCity = function (cityA, cityB) {
		var _cityA = parseInt(cityA.id.replace(/[^0-9]/g,""), 10);
		var _cityB = parseInt(cityB.id.replace(/[^0-9]/g,""), 10);

		var _old = positionData[_cityA];
		positionData[_cityA] = positionData[_cityB];
		positionData[_cityB] = _old;

		cityA.id = "transitionElement";
		cityB.id = "cityLocation"+_cityA;
		cityA.id = "cityLocation"+_cityB;

		cityA.style.opacity = 1;
		cityB.style.opacity = 1;

		save(game.server+"_"+game.world+"_"+islandId+"_islandData", positionData);
	}; // End of swapCity

	var handleEvent = function (e) {
		var _e = e.target;
		while (_e.id.indexOf("cityLocation") == -1) { _e = _e.parentNode; }
		
		var cityId = _e.id.replace(/[^0-9]/g, "");
		
		if (citySelected === null) {
			citySelected = _e;
			_e.style.opacity = 0.35;
		} else {
			if (citySelected.id === _e.id) {
				_e.style.opacity = 1;
				citySelected = null;
			} else {
				swapCity(citySelected, _e);
				citySelected = null;
			}
		}
	}; // End of handleEvent

	var init = function () {
		var oElement, regExpResult;
		for (var i = 0; i < 15; i++) { // change the id so that there is no id conflict when re-assigning the id
			document.getElementById("cityLocation"+positionData[i]).id = "transition"+i.toString()
		}
		for (var i = 0; i < 15; i++) {
			document.getElementById("transition"+i.toString()).innerHTML = document.getElementById("transition"+i.toString()).innerHTML.replace(/selectCity\([0-9]+/g,"selectCity("+i);
			document.getElementById("transition"+i.toString()).id = "cityLocation"+i.toString();
		}

		if (islandEdit(null) === true) {
			console.log("island edit is enabled");
			for (var i = 0; i < 15; i++) {
				var cityLink = document.getElementById("cityLocation"+i.toString()).getElementsByTagName("a")[0];
				cityLink.href = "javascript:void(0);"; // disable link
				cityLink.removeAttribute("onclick");
				document.getElementById("cityLocation"+i.toString()).addEventListener("click", handleEvent, false);
			}
		}
	}; // End of init

	var changeImage = function (isInit) {
		if (isInit === true) {
			if (GM_getValue(game.server+"_"+game.world+"_"+islandId+"_islandImage", null) === null) {
				return;
			} else {
				document.getElementById("mainview").className = GM_getValue(game.server+"_"+game.world+"_"+islandId+"_islandImage").toString();
			}
		} else {
			var islandImage = parseInt(document.getElementById("mainview").className.replace(/[^0-9]/g, ""));
			islandImage++;
			if (islandImage > 5) { islandImage = 1; }
			GM_setValue(game.server+"_"+game.world+"_"+islandId+"_islandImage", "island"+islandImage.toString());
			document.getElementById("mainview").className ="island"+islandImage.toString();
		}
	}; // End of changeImage

	changeImage(true);
	init();
	cityEdit(false);

	// register editMode Menu Command to enable/disable edit mode
	GM_registerMenuCommand("Town Planner: Island Edit Mode ("+(islandEdit(null)==false?"click to enable":"click to disable")+")", islandEdit);
	GM_registerMenuCommand("Town Planner: Cycle Island Image", changeImage);
	GM_registerMenuCommand("Town Planner: Reset Active Island", resetIsland);

} else if (game.view == "city") {

	var cityId = document.getElementById("position0").getElementsByTagName("a")[0].href.getArgument("id");

console.log("Town Planner: CityID = "+cityId);

	var positionData = load(game.server+"_"+game.world+"_"+cityId+"_cityData", defaultValues.city);

	var cityLock = [false, { swapWith: 2 }, { swapWith: 1 }, true, true, true, true, true, true, true, true, true, true, true, false];

	var buildingSelected = null;

	var resetCity = function () {
		save(game.server+"_"+game.world+"_"+cityId+"_cityData", defaultValues.city);
	}; // End of resetIsland

	var swapBuilding = function (buildingA, buildingB) {
		var _buildingA = parseInt(buildingA.id.replace(/[^0-9]/g,""), 10);
		var _buildingB = parseInt(buildingB.id.replace(/[^0-9]/g,""), 10);

		var _old = positionData[_buildingA];
		positionData[_buildingA] = positionData[_buildingB];
		positionData[_buildingB] = _old;

		buildingA.id = "transitionElement";
		buildingB.id = "position"+_buildingA;
		buildingA.id = "position"+_buildingB;
		
		buildingA.style.opacity = 1;
		buildingB.style.opacity = 1;

		save(game.server+"_"+game.world+"_"+cityId+"_cityData", positionData);
	}; // End of swapBuilding

	var init = function () {
		for (var i = 0; i < 15; i++) { // change the id so that there is no id conflict when re-assigning the id
			document.getElementById("position"+positionData[i]).id = "transition"+i.toString()
		}
		for (var i = 0; i < 15; i++) {
			document.getElementById("transition"+i.toString()).id = "position"+i.toString();
		}

		if (cityEdit(null) === true) {
			console.log("city edit is enabled");
			for (var i = 0; i < 15; i++) {
				document.getElementById("position"+i.toString()).getElementsByTagName("a")[0].href = "javascript:void(0);"; // disable building links
				if ((typeof cityLock[positionData[i]] === "boolean" && cityLock[positionData[i]] === true) || (typeof cityLock[positionData[i]] === "object")) {
					document.getElementById("position"+i.toString()).addEventListener("click", handleEvent1, false);
				} 
			}
		}
	}; // End of init

	var handleEvent1 = function (e) {
		var _e = e.target;
		while (_e.id.indexOf("position") == -1) { _e = _e.parentNode; }

		var positionId = parseInt(_e.id.replace(/[^0-9]/g,""), 10);

		if (buildingSelected === null) {
			if (typeof cityLock[positionId] === "object") {
				swapBuilding(_e, document.getElementById("position"+cityLock[positionId].swapWith.toString()));
			} else {
				buildingSelected = _e;
				_e.style.opacity = 0.35;
			}
		} else {
			if (typeof cityLock[positionId] === "boolean") {
				if (buildingSelected.id === _e.id) {
					_e.style.opacity = 1;
					buildingSelected = null;
				} else {
					swapBuilding(buildingSelected, _e);
					buildingSelected = null;
				}
			}
		}
	}; // End of handleEvent

	init();
	islandEdit(false);

	// register editMode Menu Command to enable/disable edit mode
	GM_registerMenuCommand("Town Planner: City Edit Mode ("+(cityEdit(null)==false?"click to enable":"click to disable")+")", cityEdit);
	GM_registerMenuCommand("Town Planner: Reset Active City", resetCity);

} else { cityEdit(false); islandEdit(false); }

var e = (new Date).getTime();

console.log("Town Planner: "+(e-s)/1000+"s Load Time");