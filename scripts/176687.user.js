/*
// ==UserScript==
// @name					DSmakeBBCoordListOnMap
// @author					Heinzel
// @version 				2.1.0
// @namespace				tribalwars.ae
// @description				With this script you can create a BB Code List of villages on the map after pressing the 'b' key, simply by clicking on them.
// @include				http://ae*.tribalwars.ae/game.php*screen=map*
// @include				http://us*.tribalwars.us/game.php*screen=map*
// ==/UserScript==

function CCoordlist() {
	this.list = new Array();
	this.bbCodes = true;
	this.activationKey = 'b';
	
	var mapEl = document.getElementById('map');
	var dsMap = win.TWMap;
	var busy = false;
	var popup = null;
	
	function inList(coords) {
		for(var x = 0; x < coordList.list.length; x++) {
			if(coords == coordList.list[x]) {
				return x;
			}
		}
		
		return false;
	}
	function addToList(coords) {
		coordList.list.push(coords);
	}
	function removeFromList(coords) {
		coordList.list.splice(inList(coords), 1);
	}
	function markVillage(coords) {
		var coords = coords.split('|');
		var overlay = document.getElementById('DSmakeBBCoordListOnMap_overlay_' + coords[0]+coords[1]);
		overlay.style.outline = '2px solid red';
	}
	function demarkVillage(coords) {
		var coords = coords.split('|');
		var overlay = document.getElementById('DSmakeBBCoordListOnMap_overlay_' + coords[0]+coords[1]);
		if(overlay) {
			overlay.style.outline = '';
		}
	}
	function removeAllVillages() {
		for(var x = 0; x < coordList.list.length; x++) {
			removeFromList(coordList.list[x]);
		}
	}
	function demarkAllVillages() {
		for(var x = 0; x < coordList.list.length; x++) {
			demarkVillage(coordList.list[x]);
		}
	}
	function spawnSectorReplacer(data, sector) {
		dsMap.mapHandler.DSspawnSector(data, sector);
		
		var beginX = sector.x - data.x;
		var endX = beginX + dsMap.mapSubSectorSize;
		
		var beginY = sector.y - data.y;
		var endY = beginY + dsMap.mapSubSectorSize;
		
		for(var x in data.tiles) {
			var x = parseInt(x, 10);
			
			if(x < beginX || x >= endX) {
				continue;
			}
			
			for(var y in data.tiles[x]) {
				var y = parseInt(y, 10);
				
				if(y < beginY || y >= endY) {
					continue;
				}
				
				var xCoord = data.x+x;
				var yCoord = data.y+y;
				var village = dsMap.villages[(xCoord)*1000+yCoord];
				if(village) {
					var overlay = document.createElement('div');
					overlay.style.position = 'absolute';
					overlay.style.zIndex = '50';
					overlay.style.width = (dsMap.map.scale[0]-1).toString() + 'px';
					overlay.style.height = (dsMap.map.scale[1]-1).toString() + 'px';
					overlay.id = 'DSmakeBBCoordListOnMap_overlay_' + ((xCoord)*1000+yCoord).toString();
					if(inList(xCoord + '|' + yCoord) !== false && busy === true) {
						overlay.style.outline = '2px solid red';
					}
					sector.appendElement(overlay, x-beginX, y-beginY);
				} 
			}
		}
	}
	function echoCoordList() {
		if(coordList.list.length > 0) {
			if(!document.getElementById('DSmakeBBCoordListOnMap_listPopup')) {
				listPopup = new CInlinePopup();
				listPopup.init();
			} else {
				listPopup.show();
			}
			
			var outputArea = document.getElementById('outputArea');
			if(coordList.bbCodes !== true) {
				outputArea.innerHTML = coordList.list.join('<br />')
			} else {
				outputArea.innerHTML = '[coord]' + coordList.list.join('[/coord]<br />[coord]') + '[/coord]';
			}
		}
	}
	
	this.init = function() {
		document.addEventListener('keydown', coordList.handlePressedKeys, false);
		
		dsMap.mapHandler.DSspawnSector = dsMap.mapHandler.spawnSector;
		dsMap.mapHandler.spawnSector = spawnSectorReplacer;
	};
	this.handleClicks = function(e) {
		e.preventDefault();
		
		var pos = dsMap.map.coordByEvent(e);
		var village = dsMap.villages[pos[0]*1000+pos[1]];
		
		if(village) {
			var coords = pos.join('|');
			
			if(inList(coords) === false) {
				addToList(coords);
				markVillage(coords);
			} else {
				removeFromList(coords);
				demarkVillage(coords);
			}
		}
	};
	this.handlePressedKeys = function(e) {
		var pressedChar = String.fromCharCode(e.which).toLowerCase();
		if(pressedChar == coordList.activationKey.toLowerCase()) {
			if(busy === false) {
				display.show("DSmakeBBCoordListOnMap: Begin Listing!");
				coordList.startCaption();
			} else {
				display.hide();
				coordList.quitCaption();
			}
		}
	};
	this.startCaption = function() {
		busy = true;
		
		mapEl.addEventListener('click', coordList.handleClicks, false);
	};
	this.quitCaption = function() {
		busy = false;
		
		mapEl.removeEventListener('click', coordList.handleClicks, false);
		
		demarkAllVillages();
		echoCoordList();
		removeAllVillages();
	};
	this.toggleBBCodeUse = function() {
		this.bbCodes = document.getElementById('addBBCodes').checked;
		
		var outputArea = document.getElementById('outputArea');
		if(this.bbCodes === true) {
			outputArea.innerHTML = outputArea.innerHTML.replace(/(\d+\|\d+)/g, "[coord]$1[/coord]");
		} else {
			outputArea.innerHTML = outputArea.innerHTML.replace(/\[coord\](\d+\|\d+)\[\/coord\]/g, "$1");
		}
	};
}

function CInlinePopup() {
	var el = null;
	
	this.init = function(message) {
		var popup = el = document.body.appendChild(document.createElement('div'));
		popup.id = 'DSmakeBBCoordListOnMap_listPopup';
		popup.className = 'popup_style ui-draggable';
		popup.style.width = '400px';
		popup.style.position = 'absolute';
		popup.style.display = 'block';
		popup.style.top = '100px';
		popup.style.left = '300px';
		popup.style.zIndex = '9999';
		
		var head = popup.appendChild(document.createElement('div'));
		head.id = 'DSmakeBBCoordListOnMapPopup_menu';
		head.className = 'popup_menu';
		
		var closer = head.appendChild(document.createElement('a'));
		closer.href = 'javascript:void(0);';
		closer.addEventListener('click', listPopup.hide, false);
		closer.appendChild(document.createTextNode("close"));
		closer.style.paddingRight = '3px';
		
		var content = popup.appendChild(document.createElement('div'));
		content.id = 'DSmakeBBCoordListOnMapPopup_content';
		content.className = 'popup_content';
		content.style.height = '400px';
		content.style.padding = '8px';
		content.style.overflow = 'auto';
		
		var title = content.appendChild(document.createElement('h3'));
		title.innerHTML = "DSmakeBBCoordListOnMap";
		
		var description = content.appendChild(document.createElement('p'));
		description.appendChild(document.createTextNode("See below for the list you just created. To display only the coordinates without BBCodes, simply remove the checkBox check on 'Add BBCodes' . "));
		
		var label = content.appendChild(document.createElement('label'));
		var input = label.appendChild(document.createElement('input'));
		input.type = 'checkbox';
		input.checked = 'checked';
		input.id = 'addBBCodes';
		input.addEventListener('change', coordList.toggleBBCodeUse, false);
		label.appendChild(document.createTextNode("Add BBCodes"));
		
		content.appendChild(document.createElement('br'));
		content.appendChild(document.createElement('br'));
		content.appendChild(document.createElement('br'));
		
		var outputContainer = content.appendChild(document.createElement('div'));
		outputContainer.style.width = '100%';
		var outputArea = outputContainer.appendChild(document.createElement('div'));
		outputArea.id = 'outputArea';
		outputArea.style.width = '60%';
		outputArea.style.height = '220px';
		outputArea.style.marginRight = 'auto';
		outputArea.style.marginLeft = 'auto';
		outputArea.style.backgroundColor = 'white';
		outputArea.style.border = '1px solid rgb(127, 157, 185)';
		outputArea.style.padding = '3px';
		outputArea.style.textAlign = 'center';
		outputArea.style.overflow = 'auto';
		outputArea.innerHTML = message;
	};
	this.hide = function() {
		var popup = document.getElementById('DSmakeBBCoordListOnMap_listPopup');
		if(popup.style.display != 'none') {
			popup.style.display = 'none';
		}
	}
	this.show = function() {
		var popup = document.getElementById('DSmakeBBCoordListOnMap_listPopup');
		if(popup.style.display == 'none') {
			popup.style.display = 'block';
		}
	};
}

function CActivationDisplay() {
	this.el = null;
	this.temp = "";
	
	this.create = function() {
		var title = this.el = document.getElementById('continent_id').parentNode;
		title.id = 'DSmakeBBCoordListOnMap_activationDisplay';
	};
	this.show = function(msg) {
		this.temp = this.el.innerHTML;
		this.el.innerHTML = msg;
		this.el.style.color = 'red';
		this.el.style.textAlign = 'center';
	};
	this.hide = function() {
		this.el.innerHTML = this.temp;
		this.el.style.color = '';
		this.el.style.textAlign = '';
	};
}


(function __construct() {
	// window-Objekt von außerhalb der GM-Sandbox ermitteln
	win = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
	
	// Script regestrieren
	win.ScriptAPI.register('DSmakeBBCoordListOnMap', [8.15, 8.16], 'Heinzelmänchen', 'Heinzelmänchen@scripter.die-staemme.de');
	
	// Aktivierungs-Display erzeugen
	display = new CActivationDisplay();
	display.create();
	
	// Coordliste laden
	coordList = new CCoordlist();
	coordList.init();
})();