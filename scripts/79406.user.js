// ==UserScript==
// @name           Ikariam Otomatik Bina Kurma
// @namespace      IkaTools
// @description    İkariam.Forumm.Biz binaları seçiyorsunuz o kendi kursun :)
// @include        http://s*.ikariam.*/*?*
// @include        http://s*.ikariam.*/
// @include        http://s*.ikariam.*/index.php
// @exclude        http://s*.ikariam.*/*militaryAdvisorDetailedReportView*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/62718.user.js
// @version        0.41
//
// @history        0.41 Add to Queue and Auto Upgrade no longer drawn on maxed out buildings
// @history        0.41 Added options dialog and debug setting
// @history        0.40 Fixed but caused by spy & unit training
// @history        0.39 Fixed bug caused when auto build box is collapsed but auto build is not
// @history        0.38 Added Greek translation (thanks mpithulaka!)
// @history        0.38 Fixed a small text issue on options page
// @history        0.38 Fixed auto-demolish (again)
// @history        0.37 Fixed bug in auto-demolish 
// @history        0.36 Fixed line height of buildings in queue on Ikariam Options page
// @history        0.36 Added script updates & history button to Ikariam options page
// @history        0.36 Added translation capabilities
// @history        0.36 Added automatic complete building demolition
// @history        0.36 Removed unnecessary delay when clicking on building name in queue
// @history        0.35 Added 2 to 15 second delay before redirecting to a new page to avoid script detection
// @history        0.34 Excluded Ikariam v0.3.2 detailed battle report screen to avoid conflict
// @history        0.33 Fixed a typo
// @history        0.33 Added support for temple (again)
// @history        0.33 Increased support for new 0.3.2 urls (occasional lack of index.php)
// @history        0.32 Reduced likelyhood of queue getting emptied due to a glitch
// @history        0.31 Fixed Town Hall not being included when clicking "Auto Update All" in town view
// @history        0.30 Fixed problem saving option to turn auto disable on/off
// @history        0.29 Performance improvements and code simplifications
// @history        0.29 Made "auto disable" a selectable option that is off by default
// @history        0.29 Improved "auto disable" feature stability
// @history        0.29 Improved performance when Auto Build info box is collapsed
// @history        0.29 Improved rendering and design of Auto Build info box
// @history        0.29 Added "Auto Upgrade All" button to city view
// @history        0.29 Buildings for which you have enough resources are now listed in green
// @history        0.29 Added row highlighting (can be turned off on Ikariam options page)
// @history        0.29 Auto upgrade list can now be collapsed
// @history        0.29 Fixed processing of auto upgrades even when they weren't enabled
// @history        0.28 Reduced the number of redirects when processing the queue
// @history		   0.27 Added "Smart Checking" option (in testing)
// @history		   0.27 Cleaned up and organized code
// @history		   0.27 Made minor performance improvements
// @history		   0.27 Resource requirements in queue now update once every 60 seconds
// @history		   0.26 Fixed script dying when trying to upgrade twice while other building is under construction (thanks Overkill & DannyKWL)
// @history		   0.25 Fixed corruption of current city data when viewing someone else's city with a spy
// @history        0.24 Fixed queue info box not being drawn on museum page
// @history        0.24 Fixed centered allignment of text in info box on some pages
//
// ==/UserScript==

var startTime = new Date();

ScriptUpdater.check(56817, "0.41");

Config.prefix = document.domain;
Config.scriptName = "Ikariam Empire Overview";
Config.settings = {
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">Ikariam Auto Build v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a>\
				<p>Automate building construction and upgrades to happen as resources become available. </p>\
				<p>Please post all feedback or bug reports <a href="http://userscripts.org/scripts/discuss/' + ScriptUpdater.scriptId + '">here</a>.</p>\
				<p>See the <a href="/index.php?view=options">Ikariam Options</a> page for more settings.</p>',
		fields:{
			debugMode:{
				type:'checkbox',
				label:'Debug Mode',
				text:'show script execution time',
				value:false,
			}
		}
	}
};

IkaTools.init();

IAB = {
	tools:IkaTools,
	init:function() {
		IkaTools.addOptionsLink('Otomatik Bina Kur');
		unsafeWindow.IAB = IAB;
		// make sure buildings are loaded for current city
		if(typeof(IkaTools.getCurrentCity().buildings) == 'undefined')
			this.goToWithDelay('/index.php?view=city&id=' + IkaTools.getCurrentCityId());
		this.loadData();
		// check for building and insert add to queue button
		try { var upgradeBox = $('#buildingUpgrade')[0]; } catch(e) { upgradeBox = false; }
		if(upgradeBox && parseInt($('#buildingUpgrade .buildingLevel').text().match(/\d+/)[0]) < IkaTools.maxBuildingLevel) {		
			var html = ['<input type="button" class="button" id="autoBuildAddToQueue" title="Add this building to the automatic build queue." value="' + IAB.getText('addToQueue') + '" />'];
			html.push('<p>auto upgrade <input type="checkbox" style="display:inline; position:relative; top:2px; margin-left:.5em;" id="autoUpgradeCheckbox" /></p>');
			upgradeBox.getElementsByTagName('div')[0].innerHTML += html.join('');
			$('#autoBuildAddToQueue')[0].addEventListener("click", function() { IAB.addToQueue(); this.blur(); } , false);
			if(IAB.getCurrentBuilding())
				$('#autoUpgradeCheckbox')[0].checked = IAB.buildingIsInUpgrades(IAB.getCurrentBuilding());
			$('#autoUpgradeCheckbox')[0].addEventListener('click', function() {
				if(this.checked) {
					IAB.addToAutoUpgrades(IAB.getCurrentBuilding());
					IAB.drawQueue();
				} else
					IAB.removeFromAutoUpgrades(IAB.getCurrentBuilding());		
			}, false);
			// add demolish function
			$('#buildingUpgrade li.downgrade a')[0].addEventListener('click', function() {
				var c = confirm(IAB.getText('demolishConfirm'));
				IkaTools.setVal('demolish', c ? IAB.getCurrentBuilding() : false);
			}, true);
			var demolish = IkaTools.getVal('demolish');
			if(typeof(demolish.position) != 'undefined') {
				if(demolish.position == IkaTools.getCurrentPosition() && demolish.cityId == IkaTools.getCurrentCityId() && demolish.type == IkaTools.getView()) {
					IkaTools.setVal('demolish', IAB.getCurrentBuilding());
					IkaTools.goTo($('#buildingUpgrade li.downgrade a')[0].href);
				} else
					IkaTools.setVal('demolish', false);	
			}
		}
		if(typeof(this.views[IkaTools.getView()]) == "function") {
			this.views[IkaTools.getView()]();	
		}
		if(this.autoDisable()) {								// auto disable if it's been a while since the script has run
			var lastSeen = IkaTools.getVal('lastSeen');
			var d = new Date();
			lastSeen = lastSeen.toString().match(/^\d+$/) ? parseInt(lastSeen) : d.getTime();
			if(d.getTime() - lastSeen > IAB.getMaxDelay() + 60000)
				this.isEnabled(false);
			this.updateLastSeen();
		}
		if(this.isEnabled()) {									// load data and process build stack
			IAB.processBuildStack();
			IAB.checkQueue();
			if(IAB.useSmartChecking())
				setTimeout(IAB.smartCheck,30000);				// add listeners for smart checking
		}
		//IAB.saveData();
		this.drawQueue();
	},
	addFutureBuildingToQueue:function(type, name, resources) {
		var building = new IkaTools.building();
		building.cityId = IkaTools.getCurrentCityId();
		building.position = IkaTools.getCurrentPosition();
		building.type = type;
		building.name = name;
		building.resources = typeof(resources) == 'object' ? resources : {wood:0, wine:0, marble:0, glass:0, sulfur:0, time:''};
		IAB.getQueue().push(building);
		IAB.saveData();
		IAB.drawQueue();
	},
	addToAutoUpgrades:function(building) {
		building.isAutoUpgrade = true;
		IAB.sortUpgrades();
		var upgrades = IAB.getAutoUpgrades();
		upgrades.push(building)
		IAB.upgrades = upgrades;
		IAB.saveData();
	},
	addToQueue:function() {
		var queue = IAB.getQueue();
		var building = IAB.getCurrentBuilding();
		building.isAutoUpgrade = false;
		queue.push(building);
		IAB.groupQueueByCity();
		IAB.saveData();
		IAB.drawQueue();
		IAB.checkQueue();
	},
	isExpanded:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoBuildExpanded', bool)
		else 
			return IkaTools.getVal('autoBuildExpanded').toString() == 'no' ? false : true;
	},
	autoDisable:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoDisable', bool ? 'yes' : 'no')
		else 
			return IkaTools.getVal('autoDisable').toString() == 'yes' ? true : false;
	},
	autoUpgradeIsEnabled:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoUpgradeEnabled', bool ? 'yes' : 'no')
		else 
			return IkaTools.getVal('autoUpgradeEnabled').toString() == 'yes' ? true : false;
	},
	autoUpgradeIsExpanded:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoUpgradeExpanded', bool ? 'yes' : 'no')
		else 
			return IkaTools.getVal('autoUpgradeExpanded').toString() == 'no' ? false : true;
	},
	buildingIsInUpgrades:function(building) {
		try {
			var upgrades = IAB.getAutoUpgrades();
			for(var i = 0; i < upgrades.length; i++)
				if(building.cityId.toString() == upgrades[i].cityId.toString() && building.position.toString() == upgrades[i].position.toString())
					return true;	
			return false;
		} catch(e) {
			return false;
		}
	},
	checkQueue:function() {
		IAB.updateLastSeen();
		if(IAB.isEnabled()) {							// check for items in queue
			var d = new Date();
			if(d.getTime() >= IAB.getProcessTime())
				IAB.processQueue();
			else
				IAB.updateTimer();
		}
	},
	clearQueue:function() {
		var newQueue = new Array();
		if(IkaTools.getVal('autoBuildFilterByCity') == 'yes')
			for(var i = 0; i < IAB.queue.length; i++)
				if(IAB.queue[i].cityId != IkaTools.getCurrentCityId())
					newQueue.push(IAB.queue[i]);	
		IAB.queue = newQueue;
		IAB.saveData();
		IAB.drawQueue();
	},
	drawQueue:function() {
		var buildings = IAB.getQueue();
		var queueBox = null;
		if(queueBox = document.getElementById('IkaAutoBuildQueue'))
			queueBox.innerHTML = "";
		else {
			queueBox = document.createElement('div');
			queueBox.id = "IkaAutoBuildQueue";
			IkaTools.addInfoBox(
				'<div style="cursor:pointer; width:65px; float:left; font-size:.85em; font-weight:normal; margin-left:10px; text-align:left;" id="autoBuildCountdown" title="' + IAB.getText('queue.timeUntilNextDesc') + '">&nbsp;</div>' + 
				'<span style="padding-left:0; ">' + IAB.getText('autoBuild') + ' ' +
				'<input type="checkbox" style="position:relative; top:.2em; margin-left:.5em; cursor:pointer;" id="autoBuildEnabledCheckbox" ' +
				' title="' + IAB.getText('queue.enableAutoBuild') + '" ' + (IAB.isEnabled() ? 'checked ' : '') + '/></span>' +
				'<a id="isExpanded" style="background:red;">' +
				'<img style="float:right; cursor:pointer; padding:5px 5px 0 4em;" title="' + IAB.getText('queue.expandOrCollapse.autoBuild') + '" id="autoBuildExpandImg" src="' + 
					(IAB.isExpanded() ? IAB.icons.collapse : IAB.icons.expand) + 
				'"/></a>'
			, queueBox);
			$('#autoBuildCountdown')[0].addEventListener('click', function() {
				IkaTools.setVal('autoBuildProcessTime', "0");
				IAB.checkQueue();
			}, false);
			$('#autoBuildExpandImg')[0].addEventListener('click', function() {
				$('#autoBuildExpandImg').attr('src', IAB.isExpanded() ? IAB.icons.collapse : IAB.icons.expand );
				IAB.isExpanded(IAB.isExpanded() ? 'no' : 'yes');
				IAB.drawQueue();
			}, false);
		}	
		if(IAB.isExpanded()) {
			queueBox.style.textAlign = "left";
			// add buildings in queue
			if(buildings.length > 0) {
				queueBox.innerHTML += '<p style="margin-left:7px; !important;"><strong>' + IAB.getText('queue.queue') + '</strong></p>';
				var buttonClear = document.createElement('a');
					buttonClear.innerHTML = '[' + IAB.getText('queue.clearAll') + ']';
					buttonClear.id = "autoBuildClearAll";
					buttonClear.style.textAlign = "right";
					buttonClear.style.margin = "-2.1em .5em 0 0";
					buttonClear.style.paddingBottom = ".5em";
					buttonClear.style.display = "block";
					buttonClear.style.cursor = "pointer";
					buttonClear.style.fontSize = ".8em";
					buttonClear.title = IAB.getText('clearAllDesc');
				queueBox.appendChild(buttonClear);	
			}
			IAB.drawQueueBuildings(buildings, queueBox);
			try {
				$('#autoBuildEnabledCheckbox')[0].addEventListener('click', function() {
					IAB.isEnabled(this.checked);
					if(this.checked) {
						IAB.updateProcessTime();
						unsafeWindow.document.location = unsafeWindow.document.location;
					}
				}, false);
			} catch(e) {}
			// auto upgrade
			var upgrades = IAB.getAutoUpgrades();
			if(upgrades.length > 0) {
				var p = document.createElement('p');
					var margin = IAB.getQueue().length > 0 ? ' margin-top:1.3em;' : '0';
					p.setAttribute("style", "margin-left:7px; !important; font-weight:bold;" + margin);
					p.innerHTML = '<img id="autoBuildExpandImage" src="'+(IAB.autoUpgradeIsExpanded() ? IAB.icons.collapse : IAB.icons.expand)+'" style="float:right; position:relative; left:7px; cursor:pointer;" align="absmiddle"/>Auto Upgrade \
						<input type="checkbox" id="autoBuildUpgradeEnabled" '+(IAB.autoUpgradeIsEnabled() ? 'checked' : '')+' title="' + IAB.getText('queue.enableDisableAutoUpgrades') + '"/>';
				queueBox.appendChild(p);
				if(IAB.autoUpgradeIsExpanded()) {
					IAB.drawQueueBuildings(upgrades, queueBox, true);
				}
				$('#autoBuildExpandImage')[0].addEventListener('click', function() {
					var expanded = IAB.autoUpgradeIsExpanded();															 
					IAB.autoUpgradeIsExpanded(!expanded);
					IAB.drawQueue();
					
				}, false);
			}
			if(buildings.length == 0 && upgrades.length == 0) {
				queueBox.innerHTML += '<p style="text-align:center; margin-top:1.5em;">' + IAB.getText('queue.emptyNotice') + '</p>';	
			}
			var pFilter = document.createElement('p');
			pFilter.setAttribute('style', 'margin-top:1.5em; text-align:center; font-size:.8em;');
			if(IkaTools.getVal('autoBuildFilterByCity') == 'yes') {
				pFilter.innerHTML = 'Showing current city'
			} else {
				pFilter.innerHTML = 'Showing all cities';
			}
			var change = document.createElement('a');
			change.innerHTML = '[' + IAB.getText('queue.change') + ']';
			change.setAttribute('style', 'cursor:pointer; padding-left:.5em;'); 
			change.addEventListener('click', function() {
				IkaTools.setVal('autoBuildFilterByCity', (IkaTools.getVal('autoBuildFilterByCity') == 'yes' ? 'no' : 'yes')); 
				IAB.drawQueue();
			}, false);
			pFilter.appendChild(change);
			queueBox.appendChild(pFilter);
		}
		$('#IkaAutoBuildQueue')[0].style.display = IAB.isExpanded() ? 'block' : 'none';
		$('#IkaAutoBuildQueue + div.footer')[0].style.display = IAB.isExpanded() ? 'block' : 'none';
		// add button event listeners
		if(IAB.isExpanded() && IAB.autoUpgradeIsExpanded()) {
			for(var i = 0; i < upgrades.length; i++) {									// add event listeners to buttons
				try {
					$('#autoBuildAutoUpgradeDelete'+i)[0].addEventListener('click', function() { 
						var tmp = this.name.toString().split('_');											
						IAB.removeFromAutoUpgrades(IkaTools.cityGetBuildingByPosition(IkaTools.getCityById(tmp[1]), tmp[0]));
					}, false);	
					$('#autoBuildUpgradeLink'+i)[0].addEventListener('click', function() { 
						var tmp = this.name.split('_');
						IkaTools.goTo('/index.php?view='+tmp[0]+'&id='+tmp[1]+'&position='+tmp[2], tmp[1]);
					}, false);	
				} catch(e) {}
			}
		}
		for(var i = 0; i < buildings.length; i++) {									// add event listeners to buttons
			try {
				$('#autoBuildDown'+i)[0].addEventListener('click', function() { 
					var queue = IAB.getQueue();
					var newQueue = new Array();
					var buildingToMove = false;
					for(var i = 0; i < queue.length; i++) {
						if(this.id == 'autoBuildDown' + i) {
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
					IAB.queue = newQueue;
					IAB.saveData();
					IAB.drawQueue();
				}, false);
				$('#autoBuildUp'+i)[0].addEventListener('click', function() { 											  
					var queue = IAB.getQueue();
					var newQueue = new Array();
					var buildingToMove = false;
					var moved = false;
					for(var i = queue.length - 1; i >=0; i--) {
						if(this.id == 'autoBuildUp' + i) {
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
					IAB.queue = newQueue;
					IAB.saveData();
					IAB.drawQueue();
				}, false);
				$('#autoBuildDeleteButton'+i)[0].addEventListener('click', function() { 						  
					IAB.removeFromQue(this.name);		
				}, false);
				$('#autoBuildLink'+i)[0].addEventListener('click', function() { 
					var tmp = this.name.split('_');
					IkaTools.goTo('/index.php?view='+tmp[0]+'&id='+tmp[1]+'&position='+tmp[2], tmp[1]);
				}, false);	
			} catch(e) {}
		}
		try { $('#autoBuildClearAll')[0].addEventListener("click", IAB.clearQueue, true); } catch(e) {}
		try { $('#autoBuildUpgradeEnabled')[0].addEventListener('click', function() { IAB.autoUpgradeIsEnabled(this.checked); }, false); } catch(e) {}
	},
	drawQueueBuildings:function(buildings, queueBox, isUpgrades) {
		isUpgrades = typeof(isUpgrades) != 'undefined' ? isUpgrades : false;
		GM_addStyle('div.autoUpgradeBuilding { font-size:.8em; width:205px; float:left; padding:0 5px 0 7px !important; min-height:2.3em; line-height:2.3em; text-align:left !important; }\
					div.autoUpgradeBuilding:hover { background-color:#fff; }'+
					(IAB.highlightRows() ? 'div.autoUpgradeBuildingEven { background-color:#faf2d1; }' : '') +
					'img.autoBuildDelete { float:right; height:13px; opacity:.6; cursor:pointer; margin:0 1px 0 2px; position:relative; top:5px; }\
					img.autoBuildDelete:hover { opacity:1; }\
					img.autoBuildResourceIcon { height:9px; position:relative; top:-1px; margin-right:2px !important; display:inline !important; }\
					img.autoBuildDownArrow { float:right; width:13px; opacity:.5; cursor:pointer; position:relative; top:11px; }\
					img.autoBuildDownArrow:hover { opacity:1; }\
					img.autoBuildUpArrow { float:right; width:13px; opacity:.5; cursor:pointer; position:relative; top:4px; left:13px; }\
					img.autoBuildUpArrow:hover { opacity:1; }\
					img.autoBuildHidden { visibility:hidden; }');
		var html = [];
		var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];								 		
		for(var i = 0; i < buildings.length; i++) {
			if(IkaTools.getVal('autoBuildFilterByCity').toString() != 'yes' || buildings[i].cityId == IkaTools.getCurrentCityId()) {
				var b = buildings[i];
				var borderStyle = (i > 0 && buildings[i-1].cityId != b.cityId && IkaTools.getVal('autoBuildFilterByCity').toString() != 'yes') ? "border-top:1px dashed #DDBF8B" : '';
				var truncatedName = b.name.length > 14 ? b.name.replace(/\s*[^\s]+\s*$/, '')+'...' : b.name;
				var deleteTitle = isUpgrades ? "Remove " + b.name + " from auto upgrades" : 'Remove ' + IAB.getText('queue.remove') + ' ' + b.name + ' ' + IAB.getText('queue.fromQueue');		
				var deleteName = isUpgrades ? b.position + '_' + b.cityId : i;
				var deleteId = isUpgrades ? 'autoBuildAutoUpgradeDelete' : 'autoBuildDeleteButton';
				var linkId = isUpgrades ? 'autoBuildUpgradeLink' : 'autoBuildLink';
				html.push('<div class="autoUpgradeBuilding '+(i % 2 == 0 ? 'autoUpgradeBuildingEven' : '')+'" style="margin:0; '+borderStyle+'">');
				html.push('<img id="'+deleteId+i+'" name="'+deleteName+'" src="'+IAB.icons.trash+'" class="autoBuildDelete" title="'+deleteTitle+'"/>');
				if(!isUpgrades) {
					var downHidden = (i == buildings.length - 1 || (typeof(buildings[i+1]) == 'undefined' || buildings[i+1].cityId != buildings[i].cityId)) ? 'autoBuildHidden' : '';
					html.push('<img id="autoBuildDown'+i+'" src="'+IAB.icons.down+'" class="autoBuildDownArrow '+downHidden+'" title="' + IAB.getText('queue.move') + ' '+b.name+' ' + IAB.getText('queue.downInQueue') + '"/>');
					var upHidden = (i == 0 || buildings[i-1].cityId != buildings[i].cityId) ? 'autoBuildHidden' : '';
					html.push('<img id="autoBuildUp'+i+'" src="'+IAB.icons.up+'" class="autoBuildUpArrow '+upHidden+'" title="' + IAB.getText('queue.move') + ' '+b.name+' ' + IAB.getText('queue.upInQueue') + '"/>');
				}
				html.push('<table cellspacing="0" border="0" cellpadding="0" style="width:auto; margin:0; border-collapse:none !important;"><tr >\
						  <td style="vertical-align:top; padding:0 .5em 0 0;" valign="top">\
						  	<a id="'+linkId+i+'" href="javascript:void(0);" name="'+b.type+'_'+b.cityId+'_'+b.position+'" title="'+IkaTools.getCityById(b.cityId).name+' - '+b.name+' ('+(parseInt(b.level)+1)+')"'+
							' style="color:'+(IkaTools.buildingGetResourceMissingTotal(b) == 0 ? '#006600' : '')+'; ">'+truncatedName+'</a>\
						   </td><td style="vertical-align:top; font-size:.9em; padding:0 .5em 0 0;">');
				var resources = buildings[i].resources;
				for(var x = 0; x < resourceNames.length; x++) {
					var missing = IkaTools.buildingGetResourceMissing(resourceNames[x], b);
					if(missing > 0) {
						html.push('<div style="float:left; margin-right:.7em;"><img src="/skin/resources/icon_' + resourceNames[x] + '.gif" class="autoBuildResourceIcon" align="absmiddle"/>');
						html.push(IkaTools.addCommas(missing) + '</div>');
					}
				}
				html.push('</td></tr></table></div>');
			}
		}
		html.push('<div style="height:.5em; width:100%; float:left;">&nbsp;</div>');
		queueBox.innerHTML += html.join('');
	},
	getAutoUpgrades:function() { 
		return IAB.upgrades; 	
	},
	getBuildingInQueueByPosition:function(position) {
		var queue = IAB.getQueue();
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
		return maxDelay < IAB.getMinDelay() ? IAB.getMinDelay : maxDelay;
	},
	getMinDelay:function() {
		return parseInt((typeof(IkaTools.getVal('autoBuildMinDelay')) != 'undefined' &&	IkaTools.getVal('autoBuildMinDelay').toString().match(/^\d+$/)) ? parseInt(IkaTools.getVal('autoBuildMinDelay')) : 300000);
	},
	getProcessTime:function() {
		return IkaTools.getVal('autoBuildProcessTime').toString().match(/^\d+$/) ? IkaTools.getVal('autoBuildProcessTime') : 0;
	},
	getQueue:function() { 
		return IAB.queue; 
	},
	getText:function(param, lang) {
		var lang = typeof(lang) == 'undefined' ? IkaTools.getLanguage() : 'en';
		var langObj = typeof(IAB.text[lang]) == 'undefined' ? IAB.text['en'] : IAB.text[lang];
		var tokenContainers = {};
		var tokens = param.split('.');
		for(var i = 0; i < tokens.length; i++) {
			if(typeof(langObj[tokens[i]]) != 'undefined')
				langObj = langObj[tokens[i]];
			else 
				return lang == 'en' ? '?' : IAB.getText(param, 'en');
		}
		return langObj;
	},
	groupQueueByCity:function() {
		// group queue by city
		var newQueue = new Array();
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			for(var x = 0; x < IAB.queue.length; x++) {
				if(IAB.queue[x].cityId == cities[i].id) {
					newQueue.push(IAB.queue[x])	;
				}
			}
		}
		IAB.queue = newQueue;
		// group queue by city
		var newUpgrades = new Array();
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			for(var x = 0; x < IAB.upgrades.length; x++) {
				if(IAB.upgrades[x].cityId == cities[i].id) {
					newUpgrades.push(IAB.upgrades[x])	;
				}
			}
		}
		IAB.upgrades = newUpgrades;
	},
	goToWithDelay:function(url, cityId) {
		var d = new Date();
		setTimeout(function() { IkaTools.goTo(url, cityId); }, parseInt(1000 + (Math.random() * 2000 - 1000)));
	},
	highlightRows:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('highlightRows', bool ? 'yes' : 'no')
		else 
			return IkaTools.getVal('highlightRows').toString() == 'no' ? false : true;
	},
	icons:{
		collapse:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1oLhof8TsClYA5SAgEP/27EpWIxkQj02BbOQ3FCGTcGEdV3/W4B6K/+X/M9fNzAhSbYCAMiTH3pTNa+FAAAAAElFTkSuQmCC',
		down:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAQAAAB5eQ+RAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABhSURBVHjaYvjPgAtCqQP/d/3f/H/1/0X/Z/zv+4Yitf3rrv/7/+/8v/n/nP/151GkVkss+rLi/8b/M/9XfStURJH6zzBZovP7lP9l33Ll0Oz6z/CfoUqi8HWmHIYzsEHAAF29Zj3gEdbgAAAAAElFTkSuQmCC",
		trash:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVBgZBcFLLkNRAADQc1/fU6qkhFRMMNIQn8TUQCJWYBE2YBkWYQWMJIZmNuAXCSoGFUGIInJf33VOSAAAAIAcgLOFt3079flaEdTS50M6nT7YeggJwPFle6nhAoVhc370rnaXcwBSp62GTdxoGdPrkAPQD5OSbRFr6oLvjByA53CqY9YUvjy68YQcgELTuTd/khENbQk5ANGqFUSFnq6WW2QA5Op4VuhreJVEZACUAKiJkogMgIEKANFARAZAKQKolColMgA+f7vVkBkRSeYjvf6QAfB1cnnXNWTUhHHrXuLoESEBYO/aYjNUSqX3snk/2DjshwQAAAD4B9GUWR0G4scKAAAAAElFTkSuQmCC",
		expand:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1v7/D8SH/k/ApmANUAICDv1vx6ZgMZIJ9dgUzEJyQxk2BRPWdf1vAeqt/F/yP3/dwIQk2QoAfUogHsamBmcAAAAASUVORK5CYII%3D',
		help:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAB3RJTUUH1AgIEBkAN5md3wAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAALZSURBVHjaPVJdSFNhGP6+b2fHbc5tzn9N0WSWM8hyKkIgJEhZIP3IAqPAy6CybrqICIJKu+kHSm9EEsoLwZu6KIKSRCgVtIbltOb0TM/cr2fnbDvbvu98naH53r3v8zy8vO/zQEop+F+erbiUJJQqUG0goBTptbjMqs3Ly9vnwF1BVMxsBpL5RqasUIc0aBdTMOGCyVhSyVHCB6srGYbZE4TFTCCcqK82YwDmJLARoDsxJZXWlOaCbjvIgWTJGxf8y47jjSzLZgVLa7GGGtNCAIx9ByUkfKkJFJloSGKHp7RLft2987C5RnF5xGTI7XA4wConRYXEaoCefkIvP/ZQGiFYef2RpzStpMQTt73N/VsRkXp5aXjkjdfrRakMsZj0TycT63+4fCbgC6KLD9xX7/y6P/IXssb68vQaFxwY56qKDYePtMzNzTHqhXwEf/u5pUfyJxd6f8MtY2CpYE45ctUTV3wJYw75uhgiSnlBUeHE2BRCEPqC8o4QowrOYZFBp2FhZviaqe1o5d2R9VUumcsCQZJjiZTK5HkeUQCNLMUZGQCKIEikQdcxxdnV+GJy++Wkr8CsJVRBgDBQgRBhjJFqg+0AW2gEUgIjtSAFGp3XL49/9hdaWEYDRUm2lTNGg3YnEs0SFEIUgK50FvAhMZOhrBb92ICD4+uCmDbokCzjuJS4fq4sKCjzs9NWqxVZjdjDyzed1WeaDR4uEoiketuSQ7cOdTrMG/74hj/af6HoZEtpRMQzX961trZqBgce+Ta3MdT3nS3OyPL8cpgPqUvJ6Ac+V5sa6Kvs761b4cjQ84f5ZqPT6cw6LQjC7KKnqrautoTh/aGphaCU1toq9M0NZoQMvgh+O/oqGuS6u7vb29v3wqf+a3pmtsrWZMm3ZD+tJo9mkRX37/HRZyXFRR0dHSrbZDLB/XhHo1GXyzUxMcFxHCFkd6imzW639/T02Gw2vV6vTv4Bgr2EayJLdbcAAAAASUVORK5CYII%3D',
		up:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAYAAADTcMcaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJhJREFUeNpi/P//PwOpgAWb4JYtWyR+/Phx+fv378axsbGP0OWZ0AU2bNgg8fnz5/tApsjHjx9vdHV1yeHVtGbNGpCGO0xMTBxsbGwMQMwJ0lhUVKSIU9OnT5/uMjMzc7OzszMAncfAycnJwMPDw/nly5d1OP0ENJXr+fPnDN++fWMA+ges8efPnwy/fv1SR1bHSE7oAQQYAPdBRmvj5+y9AAAAAElFTkSuQmCC",
	},
	isEnabled:function(bool) {
		if(typeof(bool) != 'undefined')
			IkaTools.setVal('autoBuildEnabled', (bool ? 'yes' : 'no'));
		else
			return (typeof(IkaTools.getVal('autoBuildEnabled')) != 'undefined' && IkaTools.getVal('autoBuildEnabled') != 'no');
	},
	loadData:function() {
		IAB.queue = IAB.updateBuildings((typeof(IkaTools.getVal('autoBuildQueue')) == 'undefined' || typeof(IkaTools.getVal('autoBuildQueue').length) == 'undefined') ? new Array() : IkaTools.getVal('autoBuildQueue'));	
		IAB.upgrades = IAB.updateBuildings((typeof(IkaTools.getVal('autoUpgrades') || IkaTools.getVal('autoUpgrades').push) == 'undefined') ? new Array() : IkaTools.getVal('autoUpgrades'));
		IAB.buildStack = (typeof(IkaTools.getVal('buildStack') || IkaTools.getVal('buildStack').push) == 'undefined') ? new Array() : IkaTools.getVal('buildStack');
		IAB.sortUpgrades();
		IAB.groupQueueByCity();
	},
	processBuildStack:function() {
		// update last seen
		var d = new Date();
		IkaTools.setVal('lastSeen', d.getTime());
		if(IAB.isEnabled() && IAB.buildStack.length > 0) {
			var building = IAB.buildStack.pop();	// get the last building on the stack
			var view = IkaTools.cityGetBuildingByPosition(building.position, IkaTools.getCityById(building.cityId)) ? building.type : 'buildingGround';
			if(IkaTools.getCurrentCityId() == building.cityId && IkaTools.getCurrentPosition() == building.position) {
				if(typeof(building.isAutoUpgrade) == 'undefined' || !building.isAutoUpgrade) {
					// back up building in case of error
					IkaTools.setVal('autoBuildLastBuilt', building);
				} else {
					// building is an auto upgrade, so clear all backups
					IkaTools.setVal('autoBuildLastBuilt', false);
				}
				IAB.saveData();
				// perform construction, making sure nothing else is already building and there are enough resources
				var canBuild =  (!IkaTools.cityGetBuildBuilding() && IkaTools.buildingGetResourceMissingTotal(building) == 0 && $('.progressbar').size() == 0);
				if(canBuild) {				
					if(view == 'buildingGround') { 	// new construction
						var elems = $('#buildings li.building');
						for(var i = 0; i < elems.size(); i++) {
							var type = elems[i].className.replace(/building\s/, '');
							if(type == building.type) {
								if($('.centerButton a', elems[i]).size() == 1) {
									var loc = '/index.php' + ($('.centerButton a', elems[i]).attr('href'));
									if(!loc.match(/undefined/)) {
										IAB.goToWithDelay(loc);
									}
								}
							}
						}
					} else {	// upgrade building	
						var loc = '/index.php' + $('#buildingUpgrade ul.actions li.upgrade a').attr('href');
						if($('#buildingUpgrade ul.actions li.upgrade a').size() > 0 && !loc.match(/undefined/)) {
							IkaTools.setVal('autoBuildLastBuildType', 'queue');
							IAB.goToWithDelay(loc);
						}
					}			
				} else {
					IAB.restoreLastBuildingToQueue();
					IAB.processBuildStack();
				}
			} else {
				// put the building back on the stack and go to the building's page
				IAB.buildStack.push(building);
				IAB.saveData();
				IAB.goToWithDelay('/index.php?view=' + view + '&id=' + building.cityId + '&position=' + building.position, building.cityId);	
			}
		} else {
			IAB.buildStack = [];
			IAB.saveData();
		}
	},
	processQueue:function() {
		IAB.updateLastSeen();
		if(IAB.isEnabled()) {
			IAB.updateProcessTime();
			IAB.buildStack = new Array();
			var queue = IAB.getQueue();
			var cities = IkaTools.getCities();
			// check for first build request in each city
			for(var i = 0; i < cities.length; i++) {			//	check queue
				var foundInQueue = false;
				for(var x = 0; x < IAB.queue.length; x++) {
					if(IAB.queue[x].cityId.toString() == cities[i].id.toString()) {
						var building = IAB.queue[x];
						building.requestOrigin = 'queue';
						IAB.buildStack.push(building);
						IAB.removeFromQue(x);
						foundInQueue = true;
						x = IAB.queue.length;	// continue
					}
				}
				if(!foundInQueue && IAB.autoUpgradeIsEnabled()) { // check auto build requests
					for(var x = 0; x < IAB.upgrades.length; x++) {
						if(IAB.upgrades[x].cityId.toString() == cities[i].id.toString()) {
							var building = IAB.upgrades[x];
							building.requestOrigin = 'upgrades';
							IAB.buildStack.push(building);
							x = IAB.upgrades.length;
						}
					}
				}
			}
			IAB.saveData();
			IAB.processBuildStack();
		}
	},
	removeFromAutoUpgrades:function(building) {
		var newUpgrades = new Array();
		var upgrades = IAB.getAutoUpgrades();
		for(var i = 0; i < upgrades.length; i++) {
			if(building.cityId.toString() != upgrades[i].cityId.toString() || building.position.toString() != upgrades[i].position.toString()) {
				newUpgrades.push(upgrades[i]);
			}
		}
		IAB.upgrades = newUpgrades;
		IAB.saveData();
		IAB.drawQueue();
		if(document.getElementById('autoUpgradeCheckbox')) {
			document.getElementById('autoUpgradeCheckbox').checked = false;	
		}
	},
	removeFromQue:function(index) {
		var queue = IAB.getQueue();
		var newQueue = new Array();
		for(var i = 0; i < queue.length; i++) {
			if(i != index) {
				newQueue.push(queue[i]);	
			}
		}
		IAB.queue = newQueue;
		IAB.saveData();
		IAB.drawQueue();
	},
	restoreLastBuildingToQueue:function() {
		var building = IkaTools.getVal('autoBuildLastBuilt');
		if(typeof(building) != 'undefined' && typeof(building.name) != 'undefined' && building.requestOrigin == 'queue') {
			// put building back on queue
			var newQueue = new Array();
			newQueue.push(building);
			for(var i = 0; i < IAB.queue.length; i++) {
				newQueue.push(IAB.queue[i]);	
			}			
			IAB.queue = newQueue;
		}
		IkaTools.setVal('autoBuildLastBuilt', false);
		IAB.groupQueueByCity();
		IAB.saveData();
		IAB.drawQueue();
	},
	saveData:function() {
		IkaTools.setVal('autoBuildQueue', IAB.queue);
		IkaTools.setVal('autoUpgrades', IAB.upgrades);
		IkaTools.setVal('buildStack', IAB.buildStack);
		IAB.loadData();
	},
	saveOptions:function() {
		IkaTools.setVal('autoBuildMinDelay', $('#autoBuildOptionMinDelay')[0].value);
		IkaTools.setVal('autoBuildMaxDelay', $('#autoBuildOptionMaxDelay')[0].value);
		IkaTools.setVal('autoBuildFilterByCity', $('#autoBuildFilterByCity')[0].value);
		IkaTools.setVal('autoBuildSmartChecking', $('#autoBuildSmartChecking')[0].checked ? 'yes' : 'no');
		IAB.autoDisable($('#autoBuildAutoDisable')[0].checked);
		IAB.highlightRows($('#autoBuildHighlightRows')[0].checked);
		IAB.updateProcessTime();
		IAB.drawQueue();
	},
	smartCheck:function() {
		if(IAB.isEnabled()) {
			// generate smart check stack			
			IAB.smartCheckStack = [];				
			// check for first build request in each city
			var cities = IkaTools.getCities();
			for(var i = 0; i < cities.length; i++) {			//	check queue
				var foundInQueue = false;
				for(var x = 0; x < IAB.queue.length; x++) {
					if(IAB.queue[x].cityId.toString() == cities[i].id.toString()) {
						var building = IAB.queue[x];
						building.requestOrigin = 'queue';
						IAB.smartCheckStack.push(building);
						foundInQueue = true;
						x = IAB.queue.length;	// continue
					}
				}
				if(!foundInQueue &&  IAB.autoUpgradeIsEnabled()) { // check auto build requests
					for(var x = 0; x < IAB.upgrades.length; x++) {
						if(IAB.upgrades[x].cityId.toString() == cities[i].id.toString()) {
							var building = IAB.upgrades[x];
							building.requestOrigin = 'upgrades';
							IAB.smartCheckStack.push(building);
							x = IAB.upgrades.length;
						}
					}
				}
			}				
			// check smart check stack
			for(var i = 0; i < IAB.smartCheckStack.length; i++) {
				var building = IAB.smartCheckStack[i];
				var city = IkaTools.getCityById(building.cityId);
				if(!IkaTools.cityGetBuildBuilding(city) && IkaTools.buildingGetResourceMissingTotal(building) == 0) {
					IkaTools.setVal('autoBuildProcessTime', "0");
				}
			}
			setTimeout(IAB.smartCheck,30000);
		}
	},
	sortUpgrades:function() {
		var upgrades = IAB.getAutoUpgrades();
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
		IAB.upgrades = newUpgrades;
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
	updateLastSeen:function() {
		var d = new Date();
		IkaTools.setVal('lastSeen', d.getTime());
	},
	updateProcessTime:function() {
		var d = new Date();
		var nextProcess =  d.getTime() + parseInt(IAB.getMinDelay() + (Math.random() * (IAB.getMaxDelay() - IAB.getMinDelay())));
		IkaTools.setVal('autoBuildProcessTime', nextProcess);
	},
	updateTimer:function() {
		try {
			if(IAB.isEnabled()) {
				var d = new Date();
				var delay = parseInt(IAB.getProcessTime() - d.getTime());
				if(delay >= 0) {
					if(Math.floor(delay / 1000) % 60 == 0)
						IAB.drawQueue();												
					$('#autoBuildCountdown').text(IkaTools.formatMilliseconds(delay));
					setTimeout(IAB.updateTimer, 1000);	
				} else {
					IAB.checkQueue();
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
		buildings_demolition:function() {
			var demolish = IkaTools.getVal('demolish');
			if(typeof(demolish.position) != 'undefined' && IkaTools.getCurrentPosition() == demolish.position && demolish.cityId == IkaTools.getCurrentCityId()) {
				if(demolish.level.toString() == '1')
					IkaTools.setVal('demolish', false);
				IkaTools.goTo($('#demolition .content a')[0].href);
			}
		},
		buildingGround:function() {
			// make sure there isn't already something queued
			var queue = IAB.getQueue();
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
					buttonAddToQueue.value = "Add to Queue";
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
						IAB.addFutureBuildingToQueue(this.name, this.title, resources);
						// hide add to queue buttons
						$('.autoBuildAddToQueue').each(function() {
							this.style.visibility = "hidden";									
						});
					}, false);
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
				var queuedBuilding = IAB.getBuildingInQueueByPosition(IkaTools.getCurrentPosition());
				var buildings = $('#buildings li.building');
				for(var i = 0; i < buildings.size(); i++) {
					var type = buildings[i].className.replace(/building\s/, '');
					if(type == queuedBuilding.type) {
						var notice = document.createElement('div');
						notice.innerHTML = "Building in queue";
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
					if(building = IAB.getBuildingInQueueByPosition(i)) {
						$('#position' + i).attr('class', $('#position' + i).attr('class').replace(/buildingGround/, building.type));
						$('#position' + i + ' .flag').attr('class', 'buildingimg');
						$('#position' + i + ' .buildingimg').attr('style', 'opacity:.5;');
						$('#position' + i + ' a').attr('title', building.name + ' in auto build queue');
					}
				}
			}
			// insert add all buildings to auto upgrade button
			var cityViewId = document.location.toString().match(/id=(\d+)/);
			if(!cityViewId || cityViewId[1] == IkaTools.getCurrentCity().id) {
				$('#information .content')[0].innerHTML += '<div style="text-align:center"><input id="autoBuildUpgradeAllButton" type="button" class="button" value="Auto Upgrade All" title="Add all buildings in this city to the auto upgrade list"/></div>';
				$('#autoBuildUpgradeAllButton')[0].addEventListener('click', function() {
					this.blur();
					var upgrades = IAB.getAutoUpgrades();
					for(var i = 0; i < 15; i++) {
						if(building = IkaTools.cityGetBuildingByPosition(i)) {
							var inUpgrades = false;
							for(var x = 0; x < upgrades.length; x++)
								if(building.position == upgrades[x].position && building.cityId == upgrades[x].cityId)
									inUpgrades = true;
							if(!inUpgrades)
								IAB.addToAutoUpgrades(building)
						}
					}
					IAB.drawQueue();
				}, false);
			}
		},
		options:function() {	
			var content = document.createElement('div');
			var delayOptions = '<option value="300000">5 ' + IAB.getText('options.minutes') + '<options>\
								<option value="600000">10 ' + IAB.getText('options.minutes') + '<options>\
								<option value="900000">15 ' + IAB.getText('options.minutes') + '<options>\
								<option value="1200000">20 ' + IAB.getText('options.minutes') + '<options>\
								<option value="1800000">30 ' + IAB.getText('options.minutes') + '<options>\
								<option value="3600000">1 ' + IAB.getText('options.hour') + '<options>\
								<option value="7200000">2 ' + IAB.getText('options.hours') + '<options>\
								<option value="14400000">4 ' + IAB.getText('options.hours') + '<options>';
			content.innerHTML = '<a name="autoBuild"></a><h3><a href="http://userscripts.org/scripts/show/56817" target="_blank">' + IAB.getText('autoBuild') + ' ' + IAB.getText('options.v') + ScriptUpdater.scriptCurrentVersion + 
								' </a> <span style="font-weight:normal;"> ' + IAB.getText('options.by') + ' <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a></span></h3>' + 
								'<table cellspacing="0" cellpadding="0">\
									<tbody><tr>\
											  <th>' + IAB.getText('options.labels.show') + '</th>\
											  <td><select id="autoBuildFilterByCity"><option value="no">' + IAB.getText('options.show.allCities') + '</option>\
													<option value="yes"' + (IkaTools.getVal('autoBuildFilterByCity') == 'yes' ? ' selected' : '') + '>' + IAB.getText('options.show.currentCity') + '</option>\
												</select></td></tr><tr>\
									  <th>' + IAB.getText('options.labels.reCheckEvery') + '</th>\
									  <td><select id="autoBuildOptionMinDelay"><option value="60000">1 ' + IAB.getText('options.minute') + '</option>' + delayOptions + '</select>\
									  to <select id="autoBuildOptionMaxDelay">' + delayOptions + '<option value="21600000">6 ' + IAB.getText('options.hours') + '</option></select></td>\
									</tr>\
									<tr><th>' + IAB.getText('options.labels.smartChecking') + '</th><td>\
										<input id="autoBuildSmartChecking" type="checkbox" ' + (IAB.useSmartChecking() ? 'checked' : '') + 
											'/> ' + IAB.getText('options.descriptions.smartChecking') + ' <img src="' + IAB.icons.help + '" style="cursor:help;" onclick="alert(\''+ IAB.getText('options.help.smartChecking') + '\');" />\
									</td></tr>\
									<tr><th>' + IAB.getText('options.labels.autoDisable') + '</th><td>\
										<input id="autoBuildAutoDisable" type="checkbox" ' + (IAB.autoDisable() ? 'checked' : '') + 
											'/> ' + IAB.getText('options.descriptions.autoDisable') + ' <img src="' + IAB.icons.help + '" style="cursor:help;" onclick="alert(\'' + IAB.getText('options.help.autoDisable') + '\');" />\
									</td></tr>\
									<tr><th>' + IAB.getText('options.labels.highlightRows') + '</th><td>\
										<input id="autoBuildHighlightRows" type="checkbox" ' + (IAB.highlightRows() ? 'checked' : '') +
											'/> ' + IAB.getText('options.descriptions.highlightRows') + '\
									</td></tr>\
									<tr><th>&nbsp;</th><td>\
										<input type="button" class="button" id="autoBuildScriptUpdates" value="' + IAB.getText('options.updatesAndHistory') + '"/>\
									</td></tr>\
								  </tbody></table>';
			IkaTools.addOptionBlock(content);
			$('#autoBuildOptionMinDelay')[0].addEventListener('change', function() {
				var maxSelect = document.getElementById('autoBuildOptionMaxDelay');
				maxSelect.selectedIndex = maxSelect.selectedIndex <= this.selectedIndex ? this.selectedIndex : maxSelect.selectedIndex;
			}, false);
			$('#autoBuildOptionMaxDelay')[0].addEventListener('change', function() {
				var minSelect = document.getElementById('autoBuildOptionMinDelay');
				minSelect.selectedIndex = minSelect.selectedIndex >= this.selectedIndex ? this.selectedIndex : minSelect.selectedIndex;
			}, false);
			// set min value
			$('#autoBuildOptionMinDelay option').each(function(i) {
				if(this.value == IAB.getMinDelay()) {
					this.parentNode.selectedIndex = i;	
					this.parentNode.value = this.value;
				}
			});
			$('#autoBuildOptionMaxDelay option').each(function(i) {
				if(this.value == IAB.getMaxDelay()) {
					this.parentNode.selectedIndex = i;	
					this.parentNode.value = this.value;
				}
			});
			$('#autoBuildScriptUpdates')[0].addEventListener('click', function() {
				this.blur();
				ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion);
			}, false);
			var saveChanges = ["autoBuildOptionMinDelay", "autoBuildOptionMaxDelay", "autoBuildFilterByCity", "autoBuildSmartChecking", "autoBuildAutoDisable", "autoBuildHighlightRows"];
			for(var i = 0; i < saveChanges.length; i++) {
				$('#' + saveChanges[i])[0].addEventListener('change', IAB.saveOptions, false);
			}
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
	},
	text:{
		en:{
			addToQueue:'Add To Queue',
			autoBuild:'Auto Build',	// name of script
			demolishConfirm:'Do you want to completely demolish this building?',
			options:{
				by:'by',	// used in "Auto Build by PhasmaExMachina"
				descriptions:{
					smartChecking:'use smart checking',
					autoDisable:'disable if script is off for a long time',
					highlightRows:'highlight alternate rows in Auto Build info box',
				},
				help:{
					smartChecking:'Smart checking will automatically check every 30 seconds to see if something in the queue or auto build list can be built. This happens without hitting the game servers.',
					autoDisable:'This feature will attempt to disable auto build in case the script has not been run in a long time which can be useful if you play on multiple computers. For example, if you play on one computer all day, then come back to another computer, the queue on the second computer may not be what you want anymore, so you don\\\'t want it to process before having a chance to update it.',
				},
				hour:'hour',
				hours:'hours',
				labels:{
					show:'Show',
					reCheckEvery:'Re-check auto build every',
					smartChecking:'Smart Checking',
					autoDisable:'Auto Disable',
					highlightRows:'Highlight Rows',
				},
				minute:'minute',
				minutes:'minutes',
				show:{
					allCities:'All buildings in all cities',
					currentCity:'Only buildings in current city',
				},
				updatesAndHistory:'Script Updates &amp; History',
				v:'v',	// used to label version number (e.g. "v0.36")
			},
			queue:{			
				autoUpgrade:'Auto Upgrade',
				change:'change',
				clearAll:'clear all',
				clearAllDesc:'Remove all buildings from auto build queue',
				downInQueue:'up in queue', // used in "Move [building name] down in queue"
				emptyNotice:'The auto build queue is empty.',
				enableAutoBuild:'Enable auto build',
				enableDisableAutoUpgrades:'Enable / disable auto upgrades for all cities',
				expandOrCollapse:{
					autoBuild:'Expand or collapse auto build',
					autoUpgrades:'Expand or collapse auto upgrades',
				},
				fromAutoUpgrades:'from auto upgrades',	// used in "Remobe [building name] from auto upgrades"
				fromQueue:'from queue',	// used in "Remove [building name] from queue"
				move:'Move', // used in "Move [building name] up/down in queue"
				queue:'Queue',
				showing:{
					allCities:'Showing all cities',
					currentCity:'',
				},
				upInQueue:'up in queue', // used in "Move [building name] up in queue"
				remove:'Remove', // used in "Remove [building name] from ..."
				timeUntilNextDesc:'Time until next auto build check (click to recheck now)',
			},
		},
		el:{	// Greek
			addToQueue:'Πρόσθεσε στην ουρά',
			autoBuild:'Αυτόματο χτίσιμο', // name of script
			demolishConfirm:'Προσοχή! Πρόκειται να κατεδαφίσεις ΟΛΟΚΛΗΡΩΤΙΚΑ αυτό το κτίριο. Είσαι σίγουρος;',
			options:{
				by:'by', // used in "Auto Build by PhasmaExMachina"
				descriptions:{
				smartChecking:'Χρησιμοποίσε τον έξυπνο έλεγχο',
				autoDisable:'Απενεργοποίησε το script αν είναι ανενεργό για πολύ ώρα',
				highlightRows:'highlight alternate rows in Auto Build info box',
				},
				help:{
					smartChecking:'Ο έξυπνος έλεγχος θα τσεκάρει αυτόματα κάθε 30 δευτερόλεπτα αν κάτι στην ουρά ή στην λίστα αυτόματου χτισίματος μπορεί να χτιστεί. Αυτό γίνεται χωρίς επικοινωνία με τους server του παιχνιδιού.',
					autoDisable:'Αυτή η επιλογή θα απενεργοποιεί το αυτόματο χτίσιμο στην περίπτωση που το script δεν έχει τρέξει για αρκετό χρόνο, πράγμα το οποίο μπορεί να είναι χρήσιμο αν παίζεις σε πολλούς διαφορετικούς υπολογιστές. Για παράδειγμα αν παίζεις σε έναν υπολογιστή μέρα και μετά πας σε έναν άλλο η σειρά που είχες αφήσει στον πρώτο μπορεί να μη σε εξυπηρετεί πια, και να μη θέλεις να συνεχίσει να ισχύει.',
				},
				hour:'Ώρα',
				hours:'Ώρες',
				labels:{
					show:'Εμφάνισε',
					reCheckEvery:'Επανέλεγξε για αυτόματο χτίσιμο κάθε',
					smartChecking:'Έξυπνος έλεγχος',
					autoDisable:'Αυτόματη απενεργοποίηση',
					highlightRows:'Highlight Rows',
				},
				minute:'Λεπτό',
				minutes:'Λεπτά',
				show:{
					allCities:'Όλα τα κτίρια σε όλες τις πόλεις',
					currentCity:'Μόνο τα κτίρια σε αυτή την πόλη',
				},
				updatesAndHistory:'Script Updates & History',
				v:'v', // used to label version number (e.g. "v0.36")
			},
			queue:{
				autoUpgrade:'Αυτόματη αναβάθμιση',
				change:'αλλαγή',
				clearAll:'διαγραφή όλων',
				clearAllDesc:'Αφαίρεσε όλα τα χτισίματα από την αυτόματη λίστα χτισίματος',
				downInQueue:'up in queue', // used in "Μετακίνησε [building name] μια θέση κάτω στη λίστα"
				emptyNotice:'Η λίστα αυτόματου χτισίματος είναι άδεια.',
				enableAutoBuild:'Ενεργοποίησε το αυτόματο χτίσιμο',
				enableDisableAutoUpgrades:'Ενεργοποίησε / Απενεργοποίησε το αυτόματο χτίσιμο για όλες τις πόλεις',
				expandOrCollapse:{
					autoBuild:'Μεγιστοποίησε ή ελαχιστοποίσε τη λίστα αυτόματου χτισίματος',
					autoUpgrades:'Μεγιστοποίησε ή ελαχιστοποίσε τις αυτόματες αναβαθμίσεις',
				},
				fromAutoUpgrades:'από τις αυτόματες αναβαθμίσεις', // used in "Αφαίρεσε [building name] από τις αυτόματες αναβαθμίσεις"
				fromQueue:'από τη λίστα', // used in "Αφαίρεσε [building name] από την λίστα"
				move:'Μετακίνησε', // used in "Μετακίνησε [building name] πάνω/κάτω στη λίστα"
				queue:'Βάλε στη λίστα',
				showing:{
					allCities:'Όλες οι πόλεις',
					currentCity:'Τρέχουσα πόλη',
				},
				upInQueue:'Πάνω στη λίστα', // used in "Μετακίνησε [building name] μια θέση πάνω στη λίστα"
				remove:'Αφαίρεσε', // used in "Αφαίρεσε [building name] από ..."
				timeUntilNextDesc:'Υπολοιπόμενος χρόνος μέχρι τον επόμενο έλεγχο για αυτόματο χτίσιμο (Κάνε κλικ για να επανελέγξεις τώρα)',
			},			
		},
	},
}

IAB.init();

if(Config.get('debugMode')) {
	var endTime = new Date();
	IkaTools.config.debugMode = true;
	IkaTools.debug('Auto Build: ' + (endTime.getTime() - startTime.getTime()) + 'ms');
}
