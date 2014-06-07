// ==UserScript==
// @name           prueba 2
// @namespace      prueba 2
// @description    Automate building construction and upgrades to happen as resources become available.
// @include        http://*.ikariam.*
// @exclude        http://*.ikariam.*/index.php?view=militaryAdvisorDetailedReportView*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @version		   0.28
//
// @history        0.28 Reduced the number of redirects when processing the queue
// @history		   0.27 Added "Smart Checking" option (in testing)
// @history		   0.27 Cleaned up and organized code
// @history		   0.27 Made minor performance improvements
// @history		   0.27 Resource requirements in queue now update once every 60 seconds
// @history		   0.26 Fixed script dying when trying to upgrade twice while other building is under construction (thanks Overkill & DannyKWL)
// @history		   0.25 Fixed corruption of current city data when viewing someone else's city with a spy
// @history        0.24 Fixed queue info box not being drawn on museum page
// @history        0.24 Fixed centered allignment of text in info box on some pages
// @history        0.23 New buildings in queue are now drawn as ghost buildings in city view
// @history        0.23 Building ground page now lists which building is queued for that position
// @history        0.22 Improved enable/disable methods in code
// @history        0.22 Improved formatting of timer so that hours display correctly
// @history        0.21 Added check to disable auto build on first load after a long time
// @history        0.20 Attempted to fix duplication of queue requests under certain circumstances
// @history        0.19 Fixed handling of sulfur
// @history        0.18 Added check to make sure nothing is already under construction
// @history        0.18 Added check to make sure there are enough resources to build/upgrade a building
// @history        0.17 Fixed another issue where buildings in auto upgrade might get pushed onto the queueu
// @history        0.16 Buildings in auto upgrade list are now grouped by city like those in the queue
// @history        0.15 Added automatic script update checking
// @history        0.14 Fixed specific instance under which a building would be removed from the queue before being processed
// @history        0.14 Attempted to fix 404 error that people are experiencing with v0.013
// @history        0.13 Buildings in queue are now grouped by city
// @history        0.13 Fixed ordering and deletion bugs in queue when only showing buildings in current city
// @history        0.12 Completely overhauled queue processing
// @history        0.12 Better handling of multiple cities - the first building in the queue for each city will be processed or the first building in auto upgrades for cities with no buildings in queue
// @history        0.12 Ability to filter buildings in Auto Build box by current city
// @history        0.12 Building names that can be built are now in bold
// @history        0.12 Reduced font size a little to save space.
// @history        0.12 Added row highlighting on mouse over in Auto Build box for visibility.
// @history        0.12 Buildings are now removed from queue if they no longer exist.
// @history        0.12 Fixed bug where sort arrows were not always being drawn in the queue.
// @history        0.12 Fixed broken building links to new construction sites
// @history        0.12 Fixed bug where auto upgrade attempts during construction got pushed onto beginning of queue
// @history        0.12 Added "The auto build queue is empty" to Auto Build box when there's nothing queued
//
// ==/UserScript==

ScriptUpdater.check(56817, "0.28");

IkaTools.init();

IkaAutoBuild = {
	init:function() {
		unsafeWindow.IkaAutoBuild = IkaAutoBuild;
		// make sure expanded has been set
		if(IkaTools.getVal('autoBuildExpanded') != 'yes' && IkaTools.getVal('autoBuildExpanded') != 'no') {
			IkaTools.setVal('autoBuildExpanded', 'yes');	
		}
		// make sure  enabled has been set
		if(IkaTools.getVal('autoUpgradeEnabled') != 'yes' && IkaTools.getVal('autoUpgradeEnabled') != 'no') {
			IkaTools.setVal('autoUpgradeEnabled', 'yes');	
		}
		// make sure buildings are loaded for current city
		if(typeof(IkaTools.getCurrentCity().buildings) == 'undefined' && typeof(IkaTools.getCurrentCityId()) != 'undefined') {
			IkaTools.goTo('/index.php?view=city&id=' + IkaTools.getCurrentCityId());
		}
		IkaAutoBuild.loadData();
		// check for building
		if(upgradeBox = document.getElementById('buildingUpgrade')) {
			// get the content div
			var elems = upgradeBox.getElementsByTagName('div');
			contentDiv = elems[0];
			var buttonAddToQueue = document.createElement('input');
				buttonAddToQueue.type = "button";
				buttonAddToQueue.className = "button";
				buttonAddToQueue.title = "Agrega este edificio a la cola de construcción automática";
				buttonAddToQueue.value = "Añadir a la cola";
				buttonAddToQueue.addEventListener("click", function() { IkaAutoBuild.addToQueue(); buttonAddToQueue.blur(); } , true);
			contentDiv.appendChild(buttonAddToQueue);
			var p = document.createElement('p');
				p.innerHTML = 'Construcción automática <input type="checkbox" style="display:inline; position:relative; top:2px; margin-left:.5em;" id="autoUpgradeCheckbox" />';
			contentDiv.appendChild(p);
			if(IkaAutoBuild.getCurrentBuilding()) {
				document.getElementById('autoUpgradeCheckbox').checked = IkaAutoBuild.buildingIsInUpgrades(IkaAutoBuild.getCurrentBuilding());
			}
			document.getElementById('autoUpgradeCheckbox').addEventListener('click', function() {
				if(this.checked) {																			  
					IkaAutoBuild.addToAutoUpgrades(IkaAutoBuild.getCurrentBuilding());
				} else {
					IkaAutoBuild.removeFromAutoUpgrades(IkaAutoBuild.getCurrentBuilding());		
				}
			}, true);
		}
		if(typeof(IkaAutoBuild.views[IkaTools.getView()]) == "function") {
			IkaAutoBuild.views[IkaTools.getView()]();	
		}
		// auto disable if it's been a while since you've used the current computer
		var d = new Date();
		var now = d.getTime();
		var lastSeen = IkaTools.getVal('lastSeen');
		lastSeen = (typeof(lastSeen) == 'undefined' || !lastSeen.toString().match(/^\d+$/)) ? d.getDate() : parseInt(lastSeen);
		if(now - lastSeen > IkaAutoBuild.getMaxDelay() + 20000) {
			IkaTools.setVal('autoBuildEnabled', 'no');
		} else if(IkaAutoBuild.isEnabled()) {
			// load data and process build stack
			IkaAutoBuild.processBuildStack();
			IkaAutoBuild.checkQueue();
		}
		IkaAutoBuild.saveData();
		IkaAutoBuild.drawQueue();
		// add listeners for smart checking
		if(IkaAutoBuild.useSmartChecking()) {
			setTimeout(IkaAutoBuild.smartCheck,30000);
		}
	},
	addFutureBuildingToQueue:function(type, name, resources) {
		var building = new IkaTools.building();
		building.cityId = IkaTools.getCurrentCityId();
		building.position = IkaTools.getCurrentPosition();
		building.type = type;
		building.name = name;
		building.resources = typeof(resources) == 'object' ? resources : {wood:0, wine:0, marble:0, glass:0, sulfur:0, time:''};
		IkaAutoBuild.getQueue().push(building);
		IkaAutoBuild.saveData();
		IkaAutoBuild.drawQueue();
		IkaAutoBuild.checkQueue();
	},
	addToAutoUpgrades:function(building) {
		building.isAutoUpgrade = true;
		IkaAutoBuild.sortUpgrades();
		IkaAutoBuild.getAutoUpgrades().push(building);
		IkaAutoBuild.saveData();
		IkaAutoBuild.drawQueue();
	},
	addToQueue:function() {
		var queue = IkaAutoBuild.getQueue();
		var building = IkaAutoBuild.getCurrentBuilding();
		building.isAutoUpgrade = false;
		queue.push(building);
		IkaAutoBuild.groupQueueByCity();
		IkaAutoBuild.saveData();
		IkaAutoBuild.drawQueue();
		IkaAutoBuild.checkQueue();
	},
	buildingIsInUpgrades:function(building) {
		try {
			var upgrades = IkaAutoBuild.getAutoUpgrades();
			for(var i = 0; i < upgrades.length; i++) {
				if(building.cityId.toString() == upgrades[i].cityId.toString() && building.position.toString() == upgrades[i].position.toString()) {
					return true;	
				}
			}
			return false;
		} catch(e) {
			return false;
		}
	},
	checkQueue:function() {
		// update last seen
		var d = new Date();
		IkaTools.setVal('lastSeen', d.getTime());
		if(IkaAutoBuild.isEnabled()) {
			// check for items in queue
			var d = new Date();
			if(d.getTime() >= IkaAutoBuild.getProcessTime()) {
				IkaAutoBuild.processQueue();
			} else {
				IkaAutoBuild.updateTimer();
			}
		}
	},
	clearQueue:function() {
		var newQueue = new Array();
		if(IkaTools.getVal('autoBuildFilterByCity') == 'yes') {
			for(var i = 0; i < IkaAutoBuild.queue.length; i++) {
				if(IkaAutoBuild.queue[i].cityId != IkaTools.getCurrentCityId()) {
					newQueue.push(IkaAutoBuild.queue[i]);	
				}
			}
		}
		IkaAutoBuild.queue = newQueue;
		IkaAutoBuild.saveData();
		IkaAutoBuild.drawQueue();
	},
	drawQueue:function() {
		var buildings = IkaAutoBuild.getQueue();
		var queueBox = null;
		if(queueBox = document.getElementById('IkaAutoBuildQueue')) {
			queueBox.innerHTML = "";
		} else {
			queueBox = document.createElement('div');
			queueBox.id = "IkaAutoBuildQueue";
			IkaTools.addInfoBox(
				'<div style="cursor:pointer; width:65px; float:left; font-size:.85em; font-weight:normal; margin-left:10px; text-align:left;" id="autoBuildCountdown" title="Time until next auto build check (click to recheck now)">&nbsp;</div>' + 
				'<span style="padding-left:0; ">Auto Build ' +
				'<input type="checkbox" style="position:relative; top:.2em; margin-left:.5em; cursor:pointer;" id="autoBuildEnabledCheckbox" ' +
				' title="Enable auto build" ' + (IkaAutoBuild.isEnabled() ? 'checked ' : '') + '/></span>' +
				'<a id="autoBuildExpanded" style="background:red;">' +
				'<img style="float:right; cursor:pointer; padding:5px 5px 0 4em;" title="Expandir o contraer Auto Build" id="autoBuildExpandImg" src="' + 
					(IkaTools.getVal('autoBuildExpanded') == 'yes' ? 
						IkaAutoBuild.icons.collapse : 
						IkaAutoBuild.icons.expand
					) + 
				'"/></a>'
			, queueBox);
			$('#autoBuildCountdown')[0].addEventListener('click', function() {
				IkaTools.setVal('autoBuildProcessTime', "0");
				IkaAutoBuild.checkQueue();
			}, true);
			$('#autoBuildExpanded')[0].addEventListener('click', function() {
				var expanded = IkaTools.getVal('autoBuildExpanded') == 'yes';
				IkaTools.setVal('autoBuildExpanded', expanded ? 'no' : 'yes');
				document.getElementById('autoBuildExpandImg').src = expanded ? 
					IkaAutoBuild.icons.expand : 
					IkaAutoBuild.icons.collapse;
				document.getElementById('IkaAutoBuildQueue').style.display = expanded ? 'none' : 'block';
			}, true);
		}	
		queueBox.style.display = IkaTools.getVal('autoBuildExpanded') == 'yes' ? 'block' : 'none';
		queueBox.style.textAlign = "left";
		// add buildings in queue
		if(buildings.length > 0) {
			queueBox.innerHTML += "<p><strong>Cola</strong></p>";
			var buttonClear = document.createElement('a');
				buttonClear.innerHTML = "[Limpiar todo]";
				buttonClear.style.textAlign = "right";
				buttonClear.style.margin = "-2.1em .5em 0 0";
				buttonClear.style.paddingBottom = ".5em";
				buttonClear.style.display = "block";
				buttonClear.style.cursor = "pointer";
				buttonClear.style.fontSize = ".8em";
				buttonClear.title = "Quitar todos los edificios de la cola de construcción";
				buttonClear.addEventListener("click", IkaAutoBuild.clearQueue, true);
			queueBox.appendChild(buttonClear);	
		}
		IkaAutoBuild.drawQueueBuildings(buildings, queueBox);
		try {
			document.getElementById('autoBuildEnabledCheckbox').addEventListener('click', function() {
				IkaAutoBuild.isEnabled(this.checked);
				if(this.checked) {
					IkaAutoBuild.updateProcessTime();
					unsafeWindow.document.location = unsafeWindow.document.location;
				}
			}, true);
		} catch(e) {}
		// auto upgrade
		var upgrades = IkaAutoBuild.getAutoUpgrades();
		if(upgrades.length > 0) {
			var p = document.createElement('p');
				var margin = IkaAutoBuild.getQueue().length > 0 ? ' margin-top:1.3em;' : '0';
				p.setAttribute("style", "font-weight:bold;" + margin);
				p.innerHTML = 'Construcción automática ';
				var check = document.createElement('input');
					check.type = "checkbox";
					check.setAttribute("style", "display:inline; position:relative; top:2px; margin-left:.5em;");
					check.checked = IkaTools.getVal('autoUpgradeEnabled') == 'yes';
					check.title = "Enable / disable auto updates for all cities";
					check.addEventListener('click', function() {
						IkaTools.setVal('autoUpgradeEnabled', (this.checked ? 'yes' : 'no'));
					}, true);
				p.appendChild(check);
			queueBox.appendChild(p); 
			IkaAutoBuild.drawQueueBuildings(upgrades, queueBox, true);
		}
		if(buildings.length == 0 && upgrades.length == 0) {
			queueBox.innerHTML += '<p style="text-align:center; margin-top:1.5em;">La cola de construcción esta vacía</p>';	
		}
		var pFilter = document.createElement('p');
		pFilter.setAttribute('style', 'margin-top:1.5em; text-align:center; font-size:.8em;');
		if(IkaTools.getVal('autoBuildFilterByCity') == 'yes') {
			pFilter.innerHTML = 'Mostrar la ciudad'
		} else {
			pFilter.innerHTML = 'Mostrar todas las ciudades';
		}
		var change = document.createElement('a');
		change.innerHTML = "[cambiar]";
		change.setAttribute('style', 'cursor:pointer; padding-left:.5em;'); 
		change.addEventListener('click', function() {
			IkaTools.setVal('autoBuildFilterByCity', (IkaTools.getVal('autoBuildFilterByCity') == 'yes' ? 'no' : 'yes')); 
			IkaAutoBuild.drawQueue();
		}, true);
		pFilter.appendChild(change);
		queueBox.appendChild(pFilter);
	},
	drawQueueBuildings:function(buildings, queueBox, isUpgrades) {
		for(var i = 0; i < buildings.length; i++) {
			if(IkaTools.getVal('autoBuildFilterByCity').toString() != 'yes' || buildings[i].cityId == IkaTools.getCurrentCityId()) {
				var buildingP = document.createElement('p');
					buildingP.addEventListener('mouseover', function() { this.style.backgroundColor = "#FDF7DD"; }, true);
					buildingP.addEventListener('mouseout', function() { this.style.backgroundColor = "inherit"; }, true);
					var buildingLink = document.createElement('a');
						buildingLink.setAttribute("style", "cursor:pointer; font-size:.8em;");
						buildingLink.style.fontWeight = IkaTools.buildingGetResourceMissingTotal(buildings[i]) == 0 ? 'bold' : 'normal';
						buildingLink.title = IkaTools.getCityById(buildings[i].cityId).name + ' - ' + buildings[i].name;
						buildingLink.innerHTML = buildings[i].name.length > 14 ? buildings[i].name.replace(/[^\s]+\s*$/, '') + '...' : buildings[i].name;
						if(IkaTools.cityGetBuildingByPosition(buildings[i].position, IkaTools.getCityById(buildings[i].cityId))) {
							buildingLink.rev = '/index.php?view=' + buildings[i].type + '&id=' + buildings[i].cityId + '&position=' + buildings[i].position;
						} else {
							buildingLink.rev = '/index.php?view=buildingGround&id=' + buildings[i].cityId + '&position=' + buildings[i].position;
						}
						buildingLink.name = buildings[i].cityId;
						buildingLink.addEventListener('click', function() {											
							IkaTools.goTo(this.rev, this.name);			
							return false;
						}, true);
					buildingP.appendChild(buildingLink);
					var buildingResources = document.createElement('span');
						buildingResources.innerHTML = ' &nbsp;&nbsp;';
						buildingResources.style.fontSize = '.75em';
						var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];								 
						var resources = buildings[i].resources;
						for(var x = 0; x < resourceNames.length; x++) {
							var missing = IkaTools.buildingGetResourceMissing(resourceNames[x], buildings[i]);
							if(missing > 0) {
								buildingResources.innerHTML += '<img src="/skin/resources/icon_' + resourceNames[x] + '.gif" style = "display:inline; height:9px; position:relative; top:-1px; margin-right:2px;" align="absmiddle"/>';
								buildingResources.innerHTML += missing + '&nbsp; ';
							}
						}
						buildingResources.innerHTML += '';
					buildingP.appendChild(buildingResources);
					var deleteButton = document.createElement('img');
						deleteButton.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC";
						deleteButton.setAttribute('style', 'display:inline; margin-top:2px; height:12px; cursor:pointer; float:right;');					
						if(typeof(isUpgrades) == 'undefined') {
							deleteButton.title = "Quitar " + buildings[i].name + " de la cola";
							deleteButton.name = i;
							deleteButton.addEventListener('click', function() {
								IkaAutoBuild.removeFromQue(this.name);		
							}, true);
						} else {
							deleteButton.title = "Quitar " + buildings[i].name + " de la cola";
							deleteButton.id = 'upgrade' + buildings[i].position + '_' + buildings[i].cityId;
							deleteButton.addEventListener('click', function() {
								var tmp = this.id.replace(/upgrade/, '').toString().split('_');											
								IkaAutoBuild.removeFromAutoUpgrades(IkaTools.cityGetBuildingByPosition(IkaTools.getCityById(tmp[1]), tmp[0]));
								//unsafeWindow.document.location = unsafeWindow.document.location;
								IkaAutoBuild.checkQueue();
							}, true);						
						}
					buildingP.appendChild(deleteButton);
					buildingP.style.borderTop = (i > 0 && buildings[i-1].cityId != buildings[i].cityId && IkaTools.getVal('autoBuildFilterByCity').toString() != 'yes') ? "1px dashed #DDBF8B" : '';
					if(!isUpgrades) {
						var down = document.createElement('img');
							down.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdWSRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC';
							down.setAttribute('style', 'float:right; display:inline; margin-left:-4px; cursor:pointer;');
							down.style.visibility = (i == buildings.length - 1 || (typeof(buildings[i+1]) == 'undefined' || buildings[i+1].cityId != buildings[i].cityId)) ? 'hidden' : 'visible';
							down.id = 'downAutoBuild' + i;
							down.addEventListener('click', function() {
								var queue = IkaAutoBuild.getQueue();
								var newQueue = new Array();
								var buildingToMove = false;
								for(var i = 0; i < queue.length; i++) {
									if(this.id == 'downAutoBuild' + i) {
										buildingToMove = queue[i];	
										moved = true;
									} else {
										newQueue.push(queue[i]);	
										if(buildingToMove) { 
											newQueue.push(buildingToMove);	
											buildingToMove = false;
										}
									}
								}
								if(buildingToMove) { 
									newQueue.push(buildingToMove);	
								}
								IkaAutoBuild.queue = newQueue;
								IkaAutoBuild.saveData();
								IkaAutoBuild.drawQueue();
							}, true);
						buildingP.appendChild(down);
						var up = document.createElement('img');
							up.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDDkFmyVWv14kh1PBeoll31f/n/ytUw6rgtUSi76s+L/x/8z/Vd8KFbEomPt16f/1/1f+X/S/7X/qeSwK+v63/K/6X/g/83/S/5hvQywkAdMGCdCoabZeAAAAAElFTkSuQmCC';
							up.setAttribute('style', 'float:right; display:inline; cursor:pointer;');
							up.style.visibility = (i == 0 || buildings[i-1].cityId != buildings[i].cityId) ? 'hidden' : 'visible';
							up.id = 'upAutoBuild' + i;
							up.addEventListener('click', function() {
								var queue = IkaAutoBuild.getQueue();
								var newQueue = new Array();
								var buildingToMove = false;
								var moved = false;
								for(var i = queue.length - 1; i >=0; i--) {
									if(this.id == 'upAutoBuild' + i) {
										buildingToMove = queue[i];	
										moved = true;
									} else {
										newQueue.push(queue[i]);	
										if(buildingToMove) { 
											newQueue.push(buildingToMove);	
											buildingToMove = false;
										}
									}
								}
								if(buildingToMove) { 
									newQueue.push(buildingToMove);	
								}
								newQueue.reverse();
								IkaAutoBuild.queue = newQueue;
								IkaAutoBuild.saveData();
								IkaAutoBuild.drawQueue();
							}, true);
						buildingP.appendChild(up);
					}
				queueBox.appendChild(buildingP);
			}
		}
	},
	getAutoUpgrades:function() { 
		return IkaAutoBuild.upgrades; 	
	},
	getBuildingInQueueByPosition:function(position) {
		var queue = IkaAutoBuild.getQueue();
		for(var i = 0; i < queue.length; i++)
			if(queue[i].cityId == IkaTools.getCurrentCityId() && queue[i].position == position)
				return queue[i];
		return false
	},
	getCurrentBuilding:function() {
		return IkaTools.cityGetBuildingByPosition(IkaTools.getCurrentCity(), IkaTools.getCurrentPosition());	
	},
	getMaxDelay:function() {
		var maxDelay = parseInt((typeof(IkaTools.getVal('autoBuildMaxDelay')) != 'undefined' &&	IkaTools.getVal('autoBuildMaxDelay').toString().match(/^\d+$/)) ? parseInt(IkaTools.getVal('autoBuildMaxDelay')) : 900000);
		return maxDelay < IkaAutoBuild.getMinDelay() ? IkaAutoBuild.getMinDelay : maxDelay;
	},
	getMinDelay:function() {
		return parseInt((typeof(IkaTools.getVal('autoBuildMinDelay')) != 'undefined' &&	IkaTools.getVal('autoBuildMinDelay').toString().match(/^\d+$/)) ? parseInt(IkaTools.getVal('autoBuildMinDelay')) : 300000);
	},
	getProcessTime:function() {
		return IkaTools.getVal('autoBuildProcessTime').toString().match(/^\d+$/) ? IkaTools.getVal('autoBuildProcessTime') : 0;
	},
	getQueue:function() { 
		return IkaAutoBuild.queue; 
	},
	groupQueueByCity:function() {
		// group queue by city
		var newQueue = new Array();
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			for(var x = 0; x < IkaAutoBuild.queue.length; x++) {
				if(IkaAutoBuild.queue[x].cityId == cities[i].id) {
					newQueue.push(IkaAutoBuild.queue[x])	;
				}
			}
		}
		IkaAutoBuild.queue = newQueue;
		// group queue by city
		var newUpgrades = new Array();
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			for(var x = 0; x < IkaAutoBuild.upgrades.length; x++) {
				if(IkaAutoBuild.upgrades[x].cityId == cities[i].id) {
					newUpgrades.push(IkaAutoBuild.upgrades[x])	;
				}
			}
		}
		IkaAutoBuild.upgrades = newUpgrades;
	},
	icons:{
		collapse:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1oLhof8TsClYA5SAgEP/27EpWIxkQj02BbOQ3FCGTcGEdV3/W4B6K/+X/M9fNzAhSbYCAMiTH3pTNa+FAAAAAElFTkSuQmCC',
		expand:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1v7/D8SH/k/ApmANUAICDv1vx6ZgMZIJ9dgUzEJyQxk2BRPWdf1vAeqt/F/yP3/dwIQk2QoAfUogHsamBmcAAAAASUVORK5CYII%3D',
		help:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAB3RJTUUH1AgIEBkAN5md3wAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAALZSURBVHjaPVJdSFNhGP6+b2fHbc5tzn9N0WSWM8hyKkIgJEhZIP3IAqPAy6CybrqICIJKu+kHSm9EEsoLwZu6KIKSRCgVtIbltOb0TM/cr2fnbDvbvu98naH53r3v8zy8vO/zQEop+F+erbiUJJQqUG0goBTptbjMqs3Ly9vnwF1BVMxsBpL5RqasUIc0aBdTMOGCyVhSyVHCB6srGYbZE4TFTCCcqK82YwDmJLARoDsxJZXWlOaCbjvIgWTJGxf8y47jjSzLZgVLa7GGGtNCAIx9ByUkfKkJFJloSGKHp7RLft2987C5RnF5xGTI7XA4wConRYXEaoCefkIvP/ZQGiFYef2RpzStpMQTt73N/VsRkXp5aXjkjdfrRakMsZj0TycT63+4fCbgC6KLD9xX7/y6P/IXssb68vQaFxwY56qKDYePtMzNzTHqhXwEf/u5pUfyJxd6f8MtY2CpYE45ctUTV3wJYw75uhgiSnlBUeHE2BRCEPqC8o4QowrOYZFBp2FhZviaqe1o5d2R9VUumcsCQZJjiZTK5HkeUQCNLMUZGQCKIEikQdcxxdnV+GJy++Wkr8CsJVRBgDBQgRBhjJFqg+0AW2gEUgIjtSAFGp3XL49/9hdaWEYDRUm2lTNGg3YnEs0SFEIUgK50FvAhMZOhrBb92ICD4+uCmDbokCzjuJS4fq4sKCjzs9NWqxVZjdjDyzed1WeaDR4uEoiketuSQ7cOdTrMG/74hj/af6HoZEtpRMQzX961trZqBgce+Ta3MdT3nS3OyPL8cpgPqUvJ6Ac+V5sa6Kvs761b4cjQ84f5ZqPT6cw6LQjC7KKnqrautoTh/aGphaCU1toq9M0NZoQMvgh+O/oqGuS6u7vb29v3wqf+a3pmtsrWZMm3ZD+tJo9mkRX37/HRZyXFRR0dHSrbZDLB/XhHo1GXyzUxMcFxHCFkd6imzW639/T02Gw2vV6vTv4Bgr2EayJLdbcAAAAASUVORK5CYII%3D',
	},
	isEnabled:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoBuildEnabled', (bool ? 'yes' : 'no'));
		else
			return (typeof(IkaTools.getVal('autoBuildEnabled')) != 'undefined' && IkaTools.getVal('autoBuildEnabled') != 'no');
	},
	loadData:function() {
		IkaAutoBuild.queue = IkaAutoBuild.updateBuildings((typeof(IkaTools.getVal('autoBuildQueue')) == 'undefined' || typeof(IkaTools.getVal('autoBuildQueue').length) == 'undefined') ? new Array() : IkaTools.getVal('autoBuildQueue'));	
		IkaAutoBuild.upgrades = IkaAutoBuild.updateBuildings((typeof(IkaTools.getVal('autoUpgrades') || IkaTools.getVal('autoUpgrades').push) == 'undefined') ? new Array() : IkaTools.getVal('autoUpgrades'));
		IkaAutoBuild.buildStack = (typeof(IkaTools.getVal('buildStack') || IkaTools.getVal('buildStack').push) == 'undefined') ? new Array() : IkaTools.getVal('buildStack');
		IkaAutoBuild.sortUpgrades();
		IkaAutoBuild.groupQueueByCity();
	},
	processBuildStack:function() {
		// update last seen
		var d = new Date();
		IkaTools.setVal('lastSeen', d.getTime());
		if(IkaAutoBuild.isEnabled() && IkaAutoBuild.buildStack.length > 0) {
			var building = IkaAutoBuild.buildStack.pop();	// get the last building on the stack
			var view = IkaTools.cityGetBuildingByPosition(building.position, IkaTools.getCityById(building.cityId)) ? building.type : 'buildingGround';
			if(IkaTools.getCurrentCityId() == building.cityId && IkaTools.getCurrentPosition() == building.position) {
				if(typeof(building.isAutoUpgrade) == 'undefined' || !building.isAutoUpgrade) {
					// back up building in case of error
					IkaTools.setVal('autoBuildLastBuilt', building);
				} else {
					// building is an auto upgrade, so clear all backups
					IkaTools.setVal('autoBuildLastBuilt', false);
				}
				IkaAutoBuild.saveData();
				// perform construction, making sure nothing else is already building and there are enough resources
				var canBuild =  (!IkaTools.cityGetBuildBuilding() && IkaTools.buildingGetResourceMissingTotal(building) == 0);
				if(canBuild) {				
					if(view == 'buildingGround') { 	// new construction
						var elems = $('#buildings li.building');
						for(var i = 0; i < elems.size(); i++) {
							var type = elems[i].className.replace(/building\s/, '');
							if(type == building.type) {
								if($('.centerButton a', elems[i]).size() == 1) {
									var loc = '/index.php' + ($('.centerButton a', elems[i]).attr('href'));
									if(!loc.match(/undefined/)) {
										IkaTools.goTo(loc);
									}
								}
							}
						}
					} else {	// upgrade building	
						var loc = '/index.php' + $('#buildingUpgrade ul.actions li.upgrade a').attr('href');
						if($('#buildingUpgrade ul.actions li.upgrade a').size() > 0 && !loc.match(/undefined/)) {
							IkaTools.setVal('autoBuildLastBuildType', 'queue');
							IkaTools.goTo(loc);
						}
					}			
				} else {
					IkaAutoBuild.restoreLastBuildingToQueue();
					IkaAutoBuild.processBuildStack();
				}
			} else {
				// put the building back on the stack and go to the building's page
				IkaAutoBuild.buildStack.push(building);
				IkaAutoBuild.saveData();
				IkaTools.goTo('/index.php?view=' + view + '&id=' + building.cityId + '&position=' + building.position, building.cityId);	
			}
		} else {
			IkaAutoBuild.buildStack = [];
			IkaAutoBuild.saveData();
		}
	},
	processQueue:function() {
		if(IkaAutoBuild.isEnabled()) {
			IkaAutoBuild.updateProcessTime();
			IkaAutoBuild.buildStack = new Array();
			var queue = IkaAutoBuild.getQueue();
			var cities = IkaTools.getCities();
			// check for first build request in each city
			for(var i = 0; i < cities.length; i++) {			//	check queue
				var foundInQueue = false;
				for(var x = 0; x < IkaAutoBuild.queue.length; x++) {
					if(IkaAutoBuild.queue[x].cityId.toString() == cities[i].id.toString()) {
						var building = IkaAutoBuild.queue[x];
						building.requestOrigin = 'queue';
						IkaAutoBuild.buildStack.push(building);
						IkaAutoBuild.removeFromQue(x);
						foundInQueue = true;
						x = IkaAutoBuild.queue.length;	// continue
					}
				}
				if(!foundInQueue && IkaTools.getVal('autoUpgradeEnabled') == 'yes') { // check auto build requests
					for(var x = 0; x < IkaAutoBuild.upgrades.length; x++) {
						if(IkaAutoBuild.upgrades[x].cityId.toString() == cities[i].id.toString()) {
							var building = IkaAutoBuild.upgrades[x];
							building.requestOrigin = 'upgrades';
							IkaAutoBuild.buildStack.push(building);
							x = IkaAutoBuild.upgrades.length;
						}
					}
				}
			}
			IkaAutoBuild.saveData();
			IkaAutoBuild.processBuildStack();
		}
	},
	removeFromAutoUpgrades:function(building) {
		var newUpgrades = new Array();
		var upgrades = IkaAutoBuild.getAutoUpgrades();
		for(var i = 0; i < upgrades.length; i++) {
			if(building.cityId.toString() != upgrades[i].cityId.toString() || building.position.toString() != upgrades[i].position.toString()) {
				newUpgrades.push(upgrades[i]);
			}
		}
		IkaAutoBuild.upgrades = newUpgrades;
		IkaAutoBuild.saveData();
		IkaAutoBuild.drawQueue();
		if(document.getElementById('autoUpgradeCheckbox')) {
			document.getElementById('autoUpgradeCheckbox').checked = false;	
		}
	},
	removeFromQue:function(index) {
		var queue = IkaAutoBuild.getQueue();
		var newQueue = new Array();
		for(var i = 0; i < queue.length; i++) {
			if(i != index) {
				newQueue.push(queue[i]);	
			}
		}
		IkaAutoBuild.queue = newQueue;
		IkaAutoBuild.saveData();
		IkaAutoBuild.drawQueue();
	},
	restoreLastBuildingToQueue:function() {
		var building = IkaTools.getVal('autoBuildLastBuilt');
		if(typeof(building) != 'undefined' && typeof(building.name) != 'undefined' && building.requestOrigin == 'queue') {
			// put building back on queue
			var newQueue = new Array();
			newQueue.push(building);
			for(var i = 0; i < IkaAutoBuild.queue.length; i++) {
				newQueue.push(IkaAutoBuild.queue[i]);	
			}			
			IkaAutoBuild.queue = newQueue;
		}
		IkaTools.setVal('autoBuildLastBuilt', false);
		IkaAutoBuild.groupQueueByCity();
		IkaAutoBuild.saveData();
	},
	saveData:function() {
		IkaTools.setVal('autoBuildQueue', IkaAutoBuild.queue);
		IkaTools.setVal('autoUpgrades', IkaAutoBuild.upgrades);
		IkaTools.setVal('buildStack', IkaAutoBuild.buildStack);
		IkaAutoBuild.loadData();
	},
	saveOptions:function() {
		IkaTools.setVal('autoBuildMinDelay', $('#autoBuildOptionMinDelay')[0].value);
		IkaTools.setVal('autoBuildMaxDelay', $('#autoBuildOptionMaxDelay')[0].value);
		IkaTools.setVal('autoBuildFilterByCity', $('#autoBuildFilterByCity')[0].value);
		IkaTools.setVal('autoBuildSmartChecking', $('#autoBuildSmartChecking')[0].checked ? 'yes' : 'no');
		IkaAutoBuild.updateProcessTime();
		IkaAutoBuild.drawQueue();
	},
	smartCheck:function() {
		if(IkaAutoBuild.isEnabled()) {
			// generate smart check stack			
			IkaAutoBuild.smartCheckStack = [];				
			// check for first build request in each city
			var cities = IkaTools.getCities();
			for(var i = 0; i < cities.length; i++) {			//	check queue
				var foundInQueue = false;
				for(var x = 0; x < IkaAutoBuild.queue.length; x++) {
					if(IkaAutoBuild.queue[x].cityId.toString() == cities[i].id.toString()) {
						var building = IkaAutoBuild.queue[x];
						building.requestOrigin = 'queue';
						IkaAutoBuild.smartCheckStack.push(building);
						foundInQueue = true;
						x = IkaAutoBuild.queue.length;	// continue
					}
				}
				if(!foundInQueue && IkaTools.getVal('autoUpgradeEnabled') == 'yes') { // check auto build requests
					for(var x = 0; x < IkaAutoBuild.upgrades.length; x++) {
						if(IkaAutoBuild.upgrades[x].cityId.toString() == cities[i].id.toString()) {
							var building = IkaAutoBuild.upgrades[x];
							building.requestOrigin = 'upgrades';
							IkaAutoBuild.smartCheckStack.push(building);
							x = IkaAutoBuild.upgrades.length;
						}
					}
				}
			}				
			// check smart check stack
			for(var i = 0; i < IkaAutoBuild.smartCheckStack.length; i++) {
				var building = IkaAutoBuild.smartCheckStack[i];
				var city = IkaTools.getCityById(building.cityId);
				if(!IkaTools.cityGetBuildBuilding(city) && IkaTools.buildingGetResourceMissingTotal(building) == 0) {
					IkaTools.setVal('autoBuildProcessTime', "0");
				}
			}
			setTimeout(IkaAutoBuild.smartCheck,30000);
		}
	},
	sortUpgrades:function() {
		var upgrades = IkaAutoBuild.getAutoUpgrades();
		var sortArray = new Array();
		for(var i = 0; i < upgrades.length; i++) {
			var amount = parseInt(IkaTools.buildingGetResourceMissingTotal(upgrades[i]));
			var empty = false;
			while(!empty) {
				if(typeof(sortArray[amount]) == 'undefined') {
					sortArray[amount] = upgrades[i];
					empty = true;
				}
				amount += 1;
			}
		}
		array = sortArray;
		var duplicateKeys = new Array();
		var keys = new Array();
		for(k in array) {
			keys.push(parseInt(k));
		}
		keys.sort(function(a,b){return a - b});
		var newUpgrades = new Array();
		for(var i = 0; i < keys.length; i++) {
			// check duplicate keys
			for(var x = 0; x < duplicateKeys.length; x++) {
					
			}
			newUpgrades.push(array[keys[i]]);
		}
		IkaAutoBuild.upgrades = newUpgrades;
	},
	updateBuildings:function(buildings) {	// takes a list of buildings stored in auto build and makes sure they are still valid in IkaTools
		var newArray = new Array();
		for(var i = 0; i < buildings.length; i++) {
			var building = IkaTools.cityGetBuildingByPosition(buildings[i].position, IkaTools.getCityById(buildings[i].cityId));
			if(building && building.type == buildings[i].type) {
				if(typeof(buildings[i].isUpgrade) != 'undefined') { building.isUpgrade = buildings[i].isUpgrade; }
				if(typeof(buildings[i].isAutoUpgrade) != 'undefined') { building.isAutoUpgrade = buildings[i].isAutoUpgrade; }	
				if(typeof(buildings[i].missingResources) != 'undefined') { building.missingResources = buildings[i].missingResources; }	
				newArray.push(building);
			} else if(!IkaTools.cityGetBuildingByPosition(IkaTools.getCityById(building.cityId), building.position)) {
				newArray.push(buildings[i]);
			}
		}
		buildings = newArray;
		return buildings;
	},
	updateProcessTime:function() {
		var d = new Date();
		var nextProcess =  d.getTime() + parseInt(IkaAutoBuild.getMinDelay() + (Math.random() * (IkaAutoBuild.getMaxDelay() - IkaAutoBuild.getMinDelay())));
		IkaTools.setVal('autoBuildProcessTime', nextProcess);
	},
	updateTimer:function() {
		try {
			if(IkaAutoBuild.isEnabled()) {
				var d = new Date();
				var delay = parseInt(IkaAutoBuild.getProcessTime() - d.getTime());
				if(delay >= 0) {
					if(Math.floor(delay / 1000) % 60 == 0)
						IkaAutoBuild.drawQueue();												
					$('#autoBuildCountdown').text(IkaTools.formatMilliseconds(delay));
					setTimeout(IkaAutoBuild.updateTimer, 1000);	
				} else {
					IkaAutoBuild.checkQueue();
					$('#autoBuildCountdown')[0].innerHTML = '&nbsp;';	
				}
			} else {
				$('#autoBuildCountdown')[0].innerHTML = '&nbsp;';
			}
		} catch(e) {}
	},
	useSmartChecking:function() {
		return (typeof(IkaTools.getVal('autoBuildSmartChecking')) == 'undefined' || IkaTools.getVal('autoBuildSmartChecking').toString() != 'yes') ? false : true;
	},
	views:{
		buildingGround:function() {
			// make sure there isn't already something queued
			var queue = IkaAutoBuild.getQueue();
			var buildingQueued = false;
			for(var i = 0; i < queue.length; i++) {
				buildingQueued = (queue[i].cityId == IkaTools.getCurrentCityId() && queue[i].position == IkaTools.getCurrentPosition()) ? true : buildingQueued;
			}
			if(!buildingQueued) {
				var buildings = $('#buildings li.building');
				for(var i = 0; i < buildings.size(); i++) {
					var type = buildings[i].className.replace(/building\s/, '');
					var buttonAddToQueue = document.createElement('input');
					buttonAddToQueue.type = "button";
					buttonAddToQueue.className = "button autoBuildAddToQueue";
					buttonAddToQueue.value = "Añadir a la cola";
					buttonAddToQueue.name = type;
					buttonAddToQueue.title = $('h4', buildings[i]).text();
					buttonAddToQueue.addEventListener('click', function() {
						this.blur();
						// get resources
						var resources = {wood:0, wine:0, marble:0, glass:0, sulfur:0, time:''};
						var elems = $('#buildings .building');
						for(var i = 0; i < elems.size(); i++) {
							var type = elems[i].className.replace(/building\s/, '');	
							if(type == this.name) {
								var costs = $('.costs .resources li', elems[i]);
								for(var x = 0; x < costs.size(); x++) {
									var resource = costs[x].className.replace(/\s.*$/, '');
									var cost = costs[x].innerHTML.toString().replace(/<span.*?<\/span>\s*/, '');
									resources[resource] = cost;
								}
							}
						}
						IkaAutoBuild.addFutureBuildingToQueue(this.name, this.title, resources);
						// hide add to queue buttons
						$('.autoBuildAddToQueue').each(function() {
							this.style.visibility = "hidden";									
						});
					}, true);
					var p = $('.cannotbuild', buildings[i])
					if(p.size() == 1) {
						p[0].appendChild(buttonAddToQueue);
					} else {
						buttonAddToQueue.setAttribute('style', 'padding-left:3px; padding-right:3px; display:block; left:550px; position:absolute; top:75px; width:111px;');
						var elem = $('.centerButton', buildings[i]);
						elem[0].appendChild(buttonAddToQueue);
					}	
				}
			} else {
				var queuedBuilding = IkaAutoBuild.getBuildingInQueueByPosition(IkaTools.getCurrentPosition());
				var buildings = $('#buildings li.building');
				for(var i = 0; i < buildings.size(); i++) {
					var type = buildings[i].className.replace(/building\s/, '');
					if(type == queuedBuilding.type) {
						var notice = document.createElement('div');
						notice.innerHTML = "Edificio en cola de construcción";
						notice.setAttribute('style', 'font-weight:bold; ');
						var p = $('.cannotbuild', buildings[i])
						if(p.size() == 1) {
							p[0].appendChild(notice);
							notice.setAttribute('style', 'text-align:center; font-weight:bold;');
						} else {
							notice.setAttribute('style', 'text-align:center; font-weight:bold; padding-left:3px; padding-right:3px; display:block; left:370px; position:absolute; top:85px; width:111px;');
							var elem = $('.centerButton', buildings[i])[0];
							elem.appendChild(notice);
							$('.centerButton a').attr('style', 'visibility:hidden');
						}	
					}
				}
			}
		},
		city:function() {
			// draw ghost building images for queued buildings
			var building;
			for(var i = 1; i < 15; i++) {
				if($('#position' + i).attr('class').match(/buildingGround/)) {
					if(building = IkaAutoBuild.getBuildingInQueueByPosition(i)) {
						$('#position' + i).attr('class', $('#position' + i).attr('class').replace(/buildingGround/, building.type));
						$('#position' + i + ' .flag').attr('class', 'buildingimg');
						$('#position' + i + ' .buildingimg').attr('style', 'opacity:.5;');
						$('#position' + i + ' a').attr('title', building.name + ' en cola de construcción');
					}
				}
			}
		},
		options:function() {	
			var content = document.createElement('div');
			var delayOptions = '<option value="300000">5 minutes<options>\
								<option value="600000">10 minutes<options>\
								<option value="900000">15 minutes<options>\
								<option value="1200000">20 minutes<options>\
								<option value="1800000">30 minutes<options>\
								<option value="3600000">1 hour<options>\
								<option value="7200000">2 hours<options>\
								<option value="14400000">4 hours<options>';
			content.innerHTML = '<a name="autoBuild"></a><h3><a href="http://userscripts.org/scripts/show/56817" target="_blank">Auto Build v' + ScriptUpdater.scriptCurrentVersion + 
								' </a> <span style="font-weight:normal;"> by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a></span></h3>' + 
								'<table cellspacing="0" cellpadding="0">\
									<tbody><tr>\
											  <th>Show</th>\
											  <td><select id="autoBuildFilterByCity"><option value="no">All buildings in all cities</option>\
													<option value="yes"' + (IkaTools.getVal('autoBuildFilterByCity') == 'yes' ? ' selected' : '') + '>Only buildings in current city</option>\
												</select></td></tr><tr>\
									  <th>Re-check auto build every</th>\
									  <td><select id="autoBuildOptionMinDelay"><option value="60000">1 minute</option>' + delayOptions + '</select>\
									  to <select id="autoBuildOptionMaxDelay">' + delayOptions + '<option value="21600000">6 hours</option></select></td>\
									</tr>\
									<tr><th>Smart Checking</th><td>\
										<input id="autoBuildSmartChecking" type="checkbox" ' + (IkaAutoBuild.useSmartChecking() ? 'checked' : '') + 
											'/> use smart checking (currently in testing) <img src="' + IkaAutoBuild.icons.help + '" style="cursor:help;" onclick="alert(\'Smart checking will automatically check every 30 seconds to see if something in the queue or auto build list can be built. This happens without hitting the game servers.\');" />\
									</td></tr>\
								  </tbody></table>';
			IkaTools.addOptionBlock(content);
			$('#autoBuildOptionMinDelay')[0].addEventListener('change', function() {
				var maxSelect = document.getElementById('autoBuildOptionMaxDelay');
				maxSelect.selectedIndex = maxSelect.selectedIndex <= this.selectedIndex ? this.selectedIndex : maxSelect.selectedIndex;
			}, true);
			$('#autoBuildOptionMaxDelay')[0].addEventListener('change', function() {
				var minSelect = document.getElementById('autoBuildOptionMinDelay');
				minSelect.selectedIndex = minSelect.selectedIndex >= this.selectedIndex ? this.selectedIndex : minSelect.selectedIndex;
			}, true);
			// set min value
			$('#autoBuildOptionMinDelay option').each(function(i) {
				if(this.value == IkaAutoBuild.getMinDelay()) {
					this.parentNode.selectedIndex = i;	
					this.parentNode.value = this.value;
				}
			});
			$('#autoBuildOptionMaxDelay option').each(function(i) {
				if(this.value == IkaAutoBuild.getMaxDelay()) {
					this.parentNode.selectedIndex = i;	
					this.parentNode.value = this.value;
				}
			});
			$('#autoBuildOptionMinDelay')[0].addEventListener('change', IkaAutoBuild.saveOptions, true);
			$('#autoBuildOptionMaxDelay')[0].addEventListener('change', IkaAutoBuild.saveOptions, true);
			$('#autoBuildFilterByCity')[0].addEventListener('change', IkaAutoBuild.saveOptions, true);
			$('#autoBuildSmartChecking')[0].addEventListener('change', IkaAutoBuild.saveOptions, true);
			//--------------------- show all buildings or just current city ----------------------------------------
			var contentBuildings = document.createElement('div');
			contentBuildings.innerHTML = '<h3>Auto Build</h3>' + 
										'<table cellspacing="0" cellpadding="0">\
											<tbody> </tbody></table>';
		},
		unitdescription:function() {
			GM_addStyle("#mainview { position:relative; }");
			GM_addStyle("#unitdescription div.contentBox01h { width:680px; float:left; top:40px; position:absolute; }");
			GM_addStyle("#unitdescription #container #unitRes { padding-top:0; }");
		}
	}
}

IkaAutoBuild.init();




