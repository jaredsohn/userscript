// ==UserScript==
// @name          Conquer Club - Clickable Maps
// @namespace     conquerClubClickableMaps
// @description   Makes the map in conquerclub clickable, creating an easier way of making moves.
// @version	  4.17
// @match 				*://*.conquerclub.com/*game.php?game=*
// @match				http://userscripts.org/scripts/source/186652.meta.js
// @include				*://*.conquerclub.com/*game.php?game=*
// @grant GM_xmlhttpRequest

// ==/UserScript==
var versionString = "4.17";

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	var namespace = "ClickableMaps.";
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};

	GM_deleteValue = function(name) {
		localStorage.removeItem(namespace + name);
	};

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(namespace + name), type;
		if (!value)
			return defaultValue;
		type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	};

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(namespace + name, value);
	};

	GM_listValues = function() {
		var i,result = [],name;
		for (i = 0; i < localStorage.length; i++) {
			name = localStorage.get(i);
			if (name.indexOf(namespace) == 0) {
				result.push(name);
			}
		}
		return result;
	};

	if (!GM_xmlhttpRequest) { //chrome supports this function now
		GM_xmlhttpRequest = function(obj) {
			var request=new XMLHttpRequest();
			request.onreadystatechange=function() {
				if(obj.onreadystatechange) {
					obj.onreadystatechange(request);
				};
				if(request.readyState==4 && obj.onload) {
					obj.onload(request);
				}
			};
			request.onerror=function() {
				if(obj.onerror) {
					obj.onerror(request);
				}
			};
			try {
				request.open(obj.method,obj.url,true);
			} catch(e) {
				if(obj.onerror) {
					obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} );
				}
				return request;
			}
			if (obj.headers) {
				for(var name in obj.headers) {
					request.setRequestHeader(name,obj.headers[name]);
				}
			}
			request.send(obj.data);
			return request;
		};
	}
}

var baseLink = window.location.toString();
baseLink = baseLink.substring(0,baseLink.lastIndexOf('/'));

var userGuideHTML = '<div id="ug-top" style="padding:15px;padding-top:5px;"><h4>Clickable Maps User Guide</h4><p><hr/><b>Please feel free to post suggestions, complaints, praise, and/or any bugs you may encounter to the<a href="http://www.conquerclub.com/forum/viewtopic.php?t=33227">Clickable Maps thread</a>. Thank you.</b>' +
'<hr/></p><br/><fieldset><legend><b>CONTENTS</b></legend><a href="#ug-menus" style="color:#115511;">MENU OPTIONS</a>::<a href="#ug-appearance" style="color:#115511;">Appearance</a>|' +
'<a href="#ug-confirmations" style="color:#115511;">Confirmations</a>|<a href="#ug-controls" style="color:#115511;">Controls</a><hr/><a href="#ug-gameplay" style="color:#333399;">GAMEPLAY</a>::<a href="#ug-deploy-phase" style="color:#333399;">Deploy Phase</a>|<a href="#ug-attack-phase" style="color:#333399;">Assault Phase</a>|' +
'<a href="#ug-advance-phase" style="color:#333399;">Advance Phase</a>|<a href="#ug-fortify-phase" style="color:#333399;">Reinforcment Phase</a></fieldset><br/><br/><fieldset id="ug-menus" style="color:#115511;">' +
'<legend><b>MENU OPTIONS</b></legend>Menu items with configurable options can be changed by clicking on that item.  NOTE: Cookies are no longer required.<br/><br/><fieldset><legend id="ug-appearance"><b>Appearance</b></legend>' +
'<i><b>Note to BOB users:</b>Do not set the Action Menu option of Clickable Maps to<b>floating</b>if you have the<b>HUD</b>option for BOB enabled. Having both options enabled may cause strange behavior...</i>' +
'<ul><li><i><b>Action Menu:</b></i>[<b>floating</b>or<b>normal</b>]<br/>If set to \'floating\', then the action menu will always be along the bottom of the screen, and will never scroll out of view.</li>' +
'<li><i><b>Map Border:</b></i>[<b>thin</b>,<b>thick</b>or<b>off</b>]<br/>If set to \'thin\' or \'thick\', then the map border will change color with each phase, matching the color of	the From-Marker. Colors for the map border are blue (deploy), red (assault), yellow (advance), and green (reinforce).</li>' +
'<li><i><b>Show Enemy Crosshairs:</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then during the Assault phase crosshairs will appear when the mouse is moved over an enemy territory--but only if that territory is assaultable from your own currently selected territory.</li>' +
'<li><i><b>Show From-Territory Marker:</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then a pulsing circle will appear over your currently selected territory during assault, advance, and reinforcement phases.</li>' +
'<li><i><b>Show Advance-To Marker:</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then after conquering a territory, a small, flashing yellow circle will appear over that territory until troops have been advanced.</li>' +
'<li><i><b>Show Floating Army Counter Over Map:</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then during the deploy, advance, and reinforcement phases, a small gray box will appear next to the territory that is under the mouse pointer indicating how many troops are currently selected to deploy, advance, or reinforce.  The army counter updates when the increase/decrease troops hotkeys are pressed, or the mouse wheel is scrolled (see<a href="#ug-controls">Controls</a>).</li>' +
'<li><i><b>Show Help Tool-Tips:</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then a tool-tip will appear just below the mouse cursor when the mouse is moved over a' +
'territory to show what will happen when the mouse is clicked (if no tool-tip appears, then it is' +
'probably because the territory being moused over cannot be acted upon, or because the mouse was not held still long enough (it takes about a full second) for the tool-tip to appear).  The tool-tip will also' +
'show what click will perform what action, for example, "Left-click: Deploy 1. Right-click: Deploy 10" or "Left-click: Set Alaska as From-Territory. Right-click: reinforce 5 troops from Kamchatka to Alaska".</li>' +
'</ul></fieldset><!-- end Appearance --><p style="width:100%;text-align:right;"><a href="#ug-top">[back to top]</a></p><fieldset><legend id="ug-confirmations"><b>Confirmations</b></legend>' +
'<i><b>Note to BOB users:</b>Only use the confirmations from one script at a time for any given action. In other words, don\'t turn on the "Confirm Auto-Assault" option for Clickable Maps if you already have the same option' +
'enabled for BOB.<b>When Clickable Maps is first installed, all confirmations are turned<u>on</u>by default!</b></i><ul><li><i><b>Confirm Deploy?</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then every time you attempt to deploy troops on a territory, a confirmation message will' +
' appear with the number of troops that will be deployed. This gives you a chance to cancel a deployment move and try again.</li><li><i><b>Confirm Assault?</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then every time you attempt to assault an enemy territory, a confirmation message will' +
'appear with the assaulting territory and the target territory. This gives you a chance to cancel an assault move and try again.</li><li><i><b>Confirm Auto-Assault?</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then every time you attempt to auto-assault an enemy territory, a confirmation message will' +
' appear with the assaulting territory and the target territory. This gives you a chance to cancel an auto-assault move try again.</li><li><i><b>Confirm Advance?</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then every time you attempt advance troops to a conquered territory, a confirmation' +
'message will appear with the number of troops that will be advanced. This gives you a chance to cancel an advancement move and try again.</li><li><i><b>Confirm Reinforcement?</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then every time you attempt to reinforce troops from one territory to another, a confirmation message will appear with the number of troops to be reinfoced, the source territory and the' +
' destination territory. This gives you a chance to cancel a reinforcement move and try again.</li><li><i><b>Confirm Phase End?</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', then when \'End Assaults\' or \'End Reinforcement\' is clicked, a ' +
'confirmation message will appear offering you a chance to cancel. A confirmation will also appear when attempting to reinforce (unless reinforcements are set to \'unlimited\').</li></ul></fieldset><!-- end confirmations -->' +
'<p style="width:100%;text-align:right;"><a href="#ug-top">[back to top]</a></p><fieldset><legend id="ug-controls"><b>Controls</b></legend>To change a hotkey to a key of your choosing: Expand the \'Controls\' menu, click the menu item of the hotkey you want to change, and then enter your new hotkey in the box that appears.<b>Hotkeys are ignored while typing in the chat box, so if hotkeys don\'t appear to be working, make sure the cursor is not blinking in the chat box.</b><br/><br/>' +
'<i><b>Note: The right arrow key is reserved for increasing the number of troops to be deployed, advanced or reinforced, and the left arrow key is reserved for decreasing troops. Pressing a number key sets the number of troops to that of the key that was pressed.</b></i><ul>' +
'<li><i><b>Phase End Hotkey:</b></i>[ (default:<b>e</b>) ]<br/>Pressing this hotkey is equivalent to clicking \'End Assaults\' during the assault phase or \'End Reinforcement\' during the reinforement phase.</li>' +
'<li><i><b>Next Game Hotkey:</b></i>[ (default:<b>n</b>) ]<br/>Pressing this hotkey is equivalent to clicking the \'<u>jump to your next playable game</u>\' link.</li><li><i><b>Jump to Map Hotkey:</b></i>[ (default:<b>m</b>) ]<br/>Pressing this hotkey will scroll the browser window to the top of the map.</li>' +
'<li><i><b>Refresh Map Hotkey:</b></i>[ (default:<b>r</b>) ]<br/>Pressing this hotkey is equivalent to clicking the [<u>refresh map</u>] link.</li><li><i><b>Begin Turn Hotkey:</b></i>[ (default:<b>b</b>) ]<br/>Pressing this hotkey is equivalent to clicking the \'Begin Turn\' button.</li><li><i><b>Increase Troops:</b></i>[ (default:<b>w</b>) or<b>right-arrow</b>]<br/>Pressing this hotkey increases the number of troops to be deployed, advanced, or reinforced by one.</li>' +
'<li><i><b>Decrease Troops:</b></i>[ (default:<b>s</b>) or<b>left-arrow</b>]<br/>Pressing this hotkey decreases the number of troops to be deployed, advanced or reinforced by one.</li><li><i><b>Use Mouse Wheel to Increase/Decrease Troops:</b></i>[<b>Y</b>or<b>N</b>]<br/>If set to \'Y\', scrolling the mouse wheel up will increase the number of troops to be deployed, advanced,' +
' or reinforced, and scrolling it down will decrease the number of troops.</li><li><i><b>Deployment Clicks:</b></i>[<b>Left-1 Right-Selected</b>or<b>Right-1 Left-Selected</b>]<br/>Changes which mouse buttons are used to deploy troops; either left-click deploys one army and' +
' right-click deploys the number of troops currently selected in the action menu (or floating army counter), or vice-versa.</li></ul></fieldset><!-- end confirmations -->' +
'</fieldset><!-- end MENUS --><p style="width:100%;text-align:right;"><a href="#ug-top">[back to top]</a></p><fieldset id="ug-gameplay" style="color:#333399;"><legend><b>GAMEPLAY</b></legend><fieldset>' +
'<legend id="ug-deploy-phase"><b>Deploy Phase</b></legend><ul><li>Mouse over the territory you want to deploy troops on. If the<a href="#ug-appearance">Show Army Counter</a>option is enabled, then a small box will appear next to your cursor letting you know how many' +
' troops are selected for deployment (if not, then you can see the number of troops in the action menu as usual). The counter will remain visible until you move your mouse away from the territory. The counter' +
' (and action menu) will update when you press the<a href="#ug-controls">increase/decrease troops hotkeys</a>or<a href="#ug-controls">use the mouse wheel</a>.</li><li>If you only want to deploy one army at a time, then click on the desired territory with the mouse button' +
' that is configured to deploy only 1 army. Otherwise, once the desired number of troops is selected, click the territory to deploy on using the mouse button that is configured to deploy the selected number of troops. (You can choose which click deploys 1 army and which click deploys the selected number of troops with the<a href="#ug-controls">Deployment Clicks</a>option.)</li>' +
'<li>If the<a href="#ug-confirmations">Confirm Deploy</a>option is enabled, then you will be asked to confirm each deployment click.</li></ul></fieldset><!-- end deploy phase --><p style="width:100%;text-align:right;"><a href="#ug-top">[back to top]</a></p>' +
'<fieldset><legend id="ug-attack-phase"><b>Assault Phase</b></legend><ul><li>First select the territory that you want to assault from by clicking on it (either right- or left-click). If' +
' the<a href="#ug-appearance">Show From-Territory Marker</a>option is enabled, then a pulsing, red circle will appear around the territory, showing that it is now selected as the assaulting territory. If not, then you can see which territory is selected as the assaulting territory by looking in the action menu, as usual.' +
'If the territory clicked does not become the assaulting territory (i.e. the from-territory marker and/or action menu does not update), it is probably because that territory is unable to make assaults.</li><li>Once the assaulting territory is selected, click an enemy territory to assault it.<b>Left-clicking</b>will execute a normal assault,<b>right-clicking</b>(or holding<b>SHIFT</b>while clicking) will execute an auto-assault.</li>' +
'<li>If the<a href="#ug-confirmations">Confirm Assault or Confirm Auto-Assault</a>options are enabled, then you will be asked to confirm the move, and given a chance to cancel it.</li><h5>Special Assaults</h5><li><b>Auto-Assault[x]</b>. If the<b>CTRL</b>key is held while auto-assaulting, then a prompt will appear allowing you to' +
' enter the minimum number of troops to leave on the assaulting territory (to be sure that the number of troops does not go below the number entered, assaults will stop if the remaining troops reaches the number entered plus one). This assault is slower than a regular auto-assault because each assault	must be executed' +
'indivdually--but it is faster than doing it manually. Works in conjunction with Auto-Advance.</li><li><b>Auto-Advance</b>. If the<b>ALT</b>key is held while auto-assaulting, then all remaining troops on the assaulting territory will be automatically advanced to the conquered territory.  Works in conjunction with Auto-Assault[x].</li>' +
'</ul></fieldset><!-- end attack phase --><p style="width:100%;text-align:right;"><a href="#ug-top">[back to top]</a></p><fieldset><legend id="ug-advance-phase"><b>Advance Phase</b></legend><ul>' +
'<li>After conquering an enemy territory, moving the mouse cursor over either the assaulting territory or the conquered territory will cause the<a href="#ug-army-counter">floating army counter</a>to appear (if enabled). Use the<a href="#ug-controls">mouse wheel or configured hotkeys</a>to select the number of troops to advance, then	click on the territory just conquered to advance those troops.</li>' +
'<li>Clicking on the territory that was just assaulted<i>from</i>will always advance zero troops.</li><li>It does not matter whether right-click or left-click is used during the advance phase.</li><li>If the<a href="#ug-appearance">Show Advance-To Marker</a>option is enabled, then a small, flashing yellow circle will	appear on the territory that was just conquered.</li>' +
'<li>If the<a href="#ug-confirmations">Confirm Advance</a>option is enabled, then you will be asked to confirm the advancement move, and given a chance to cancel it.</li></ul></fieldset><!-- end advance phase -->' +
'<p style="width:100%;text-align:right;"><a href="#ug-top">[back to top]</a></p><fieldset><legend id="ug-fortify-phase"><b>Reinforcement Phase</b></legend><ul>' +
'<li>Select the territory that you want to reinforce troops from by<b>left-clicking</b>on it. If the<a href="#ug-appearance">Show From-Territory Marker</a>option is enabled, then a pulsing, green circle will appear around the territory, showing that it is now selected as the source territory. If not, then you can see which territory is selected as the source territory by looking in the action menu, as usual.' +
'If the territory clicked does not become the source territory (i.e. the from-territory marker and/or action menu does not update), it is probably because that territory is unable to be reinforced from.</li><li>Mouse over the territory you want to reinforce troops to. If the<a href="#ug-appearance">Show Army Counter</a>option is enabled, then a small box will appear next to your cursor letting you know how many' +
' troops are selected to be reinforced (if not, then you can see the number of troops in the action menu as usual). The counter will remain visible until you move your mouse away from the territory. The counter (and action menu) will update when you press the<a href="#ug-controls">increase/decrease troops hotkeys</a>or<a href="#ug-controls">use the mouse wheel</a>.</li>' +
'<li>Once the source territory and the desired number of troops are selected,<b>right-click</b>(or hold<b>SHIFT</b>while left-clicking) the territory you want to reinforce troops to.</li><li>If the<a href="#ug-confirmations">Confirm Phase End</a>option is enabled and reinforcements for the current' +
' game are set to either<b>adjacent</b>or<b>chained</b>, then you will be warned that the reinforcement move will end your turn, and you will have a chance to cancel the move if desired.</li></ul></fieldset><!-- end fortification phase -->' +
'</fieldset><!-- end GAMEPLAY --><div style="position:fixed;top:55px;text-align:right;width:570px;"><strong><a href="javascript:void(0)" id="close-user-guide" style="background:#eeffee;">[x]</a></strong></div></div>';

	function findPos(obj) {
		var curleft = 0,
			curtop = 0;
		while (obj) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return [curleft,curtop];
	}
	function setCursor(state) {
		try {
			document.body.style.cursor = state;
		}catch(err){}
		try {
			sprites.advanceFromMarker.style.cursor = state;
		}catch(err){}
		try {
			sprites.attackFromMarker.style.cursor = state;
		}catch(err){}
		try {
			sprites.fortifyFromMarker.style.cursor = state;
		}catch(err){}
		try {
			sprites.advanceToMarker.style.cursor = state;
		}catch(err){}
		try {
			sprites.crosshair.style.cursor = state;
		}catch(err){}
		try {
			document.getElementById('magicmap').style.cursor = state;
		}catch(err){
			innerMap.style.cursor = state;
		}
	}
	function createMenuItem(parentElem, id, listener, method, displayText, value) {
		var li, link, submenu, bold;
		li = document.createElement('li');
		link = document.createElement('a');
		li.id = id;
		link.href = 'javascript:void(0);';
		link.innerHTML = displayText+' ';
		li.appendChild(link);
		if (listener == 'mouseover') {
			submenu = document.createElement('ul');
			submenu.style.position = 'absolute';
			submenu.style.display = 'inline';
			submenu.style.zIndex = 5;
			submenu.style.left = '20px';
			submenu.style.textAlign='right';
			submenu.style.width = '85%';

			submenu.style.borderLeft = 'medium solid #667766';
			submenu.style.borderBottom = 'thick solid #667766';
			li.addEventListener('mouseout', function(){
				submenu.style.display = 'none';
			}, false);
			li.addEventListener(listener, function(){
				submenu.style.display='inline';
				submenu.style.top=this.offsetTop + this.offsetHeight;
			}, false);
			li.addEventListener('click', function(){
				if (submenu.style.display == 'none') {
					submenu.style.display = 'inline';
				} else {
					submenu.style.display = 'none';
				}
			}, false);
			submenu.style.display = 'none';
			li.appendChild(submenu);
			parentElem.appendChild(li);
			return submenu;
		} else {
			bold = document.createElement('b');
			bold.style.textAlign = 'right';
			bold.style.fontWeight = 'bold';
			bold.innerHTML = value;
			link.appendChild(bold);
			parentElem.appendChild(li);
			li.addEventListener(listener, method, false);
			return li;
		}
	}
	function findMapSize() {
		var isLarge = document.getElementById('outer-map').style.width.indexOf("" + mapInfo.widthL) >= 0;
		return isLarge? "L": "S";
	}

	function getArmiesForIndex(i) {
		return armiesArray[i];
	}

	function getText(node) {
		var result = "", length = node.childNodes.length;
		for (var i = 0; i < length; i++) {
			if (node.childNodes[i].nodeType == 3) {
				result += node.childNodes[i].textContent;
			} else if (node.nodeName == "DIV" || node.nodeName == "SPAN") {
				result += getText(node.childNodes[i]);
			}
		}
		return result;
	}

	function updateAction() {
		try{
			actionString = getText(document.getElementById('action'));
		} catch(err) {
			return;
		}
		if (actionString) {
			if (actionString.match('loading...')) {
				debug('actionForm is loading... trying again in .15 sec...');
				setTimeout(updateAction, 150);
			}
		}
		try{
			sprites.floatingQuantity.innerHTML = document.getElementById('quantity').value;
		}catch(err) {}
		// refresh the map and reload all territories
		// set fromTerritory and toTerritory
		try {
			fromTerritoryNum = document.getElementById('from_country').value;
			fromTerritory = mapInfo.countries[parseInt(fromTerritoryNum)].name;
		} catch(err){
			fromTerritory = '';
		}
		try{
			toTerritoryNum = document.getElementById('to_country').value;
			toTerritory = mapInfo.countries[parseInt(toTerritoryNum)].name;
		} catch(err){
			toTerritory = '';
		}

		sprites.crosshair.style.visibility = 'hidden';
		sprites.floatingQuantity.style.visibility = 'hidden';
		sprites.attackFromMarker.style.visibility = 'hidden';
		sprites.advanceFromMarker.style.visibility = 'hidden';
		sprites.advanceToMarker.style.visibility = 'hidden';
		sprites.fortifyFromMarker.style.visibility = 'hidden';

		deployDeferred = false;
		// parse the text of the action menu (actionString) to determine what phase
		// we are in. if there is no action element, then we must be viewing someone
		// else's game.
		if (actionString.match('Waiting for your next turn') || actionString.match('You have won...')) {
			outerMap.style.borderColor = '#eeeeee';
			doAction = 'Waiting';
        } else if (actionString.match('You may take your turn now')) {
            outerMap.style.borderColor = '#eeeeee';
            doAction = 'Begin';            
        }else if (actionString.match('troops left to deploy')) {
			outerMap.style.borderColor = '#0000ff';
			doAction = 'Deploy';
		} else if (actionString.match('deferred troops to deploy')) {
			outerMap.style.borderColor = '#0000ff';
			deployDeferred = true;
			doAction = 'Deploy';
			selectedQuantity = actionString.split(' ')[2];
		} else if (actionString.match('Assault') || actionString.match('You cannot make any assaults.')) {
			outerMap.style.borderColor = '#ff0000';
			doAction = 'Assault';
		} else if (actionString.match('Advance')) {
			outerMap.style.borderColor = '#ffff00';
			doAction = 'Advance';
			var parsed = /\sfrom\s(.+)\sto\s(.+)\s+/.exec(actionString);
			attackedFromTerritory = parsed[1];
			fromTerritory = attackedFromTerritory;
			attackedToTerritory = parsed[2];
			if (userPrefs['showFloatingQuantity'] == 'Y') {
				sprites.floatingQuantity.style.visibility = 'visible';
			}
			// debug("fromTerritory == '"+fromTerritory+"' && toTerritory ==
			// '"+attackedToTerritory+"'");
		} else if (actionString.match('Reinforce') || actionString.match('You cannot make any reinforcements.')) {
			outerMap.style.borderColor = '#00ff00';
			doAction = 'Reinforce';
		}
		// debug('new action: '+doAction);

		debug("fromTerritory == '"+fromTerritory+"' && toTerritory == '"+toTerritory+"'");
		if (fromTerritory == '' && toTerritory == '') {
			if (doAction == 'Advance') {
				sprites.advanceFromMarker.style.visibility = 'visible';
			}
			// debug('no from or toTerritory. returning');
			return;
		}
		for (var i in mapInfo.countries) {
			var country = mapInfo.countries[i];
			if (country.name == fromTerritory) {
				setCursor('pointer');
				var fromTerritory_armies = getArmiesForIndex(i).quantity;
				if (selectedQuantity >= parseInt(fromTerritory_armies.quantity)) {
					updateSelectedQuantity(parseInt(fromTerritory_getStartingLength.quantity)-1);
				}
				remainingArmies = fromTerritory_armies.quantity;
				if (userPrefs['showFromMarker'] == 'Y') {
					switch (doAction) {
						case 'Assault':
							if (country.name == fromTerritory) {
								showMarker(sprites.attackFromMarker, getCoordinates(country));
							}
							break;
						case 'Advance':
							if (country.name == fromTerritory) {
								showMarker(sprites.advanceFromMarker, getCoordinates(country));
							}
							break;
						case 'Reinforce':
							if (country.name == fromTerritory) {
								showMarker(sprites.fortifyFromMarker, getCoordinates(country));
							}
							break;
					}
				}
			}
			if (country.name == toTerritory) {
				remainingArmiesD = getArmiesForIndex(i).quantity;
			}
			if (country.name == attackedToTerritory) {
				if (userPrefs['showAdvanceToMarker'] == 'Y') {
					if (doAction == 'Advance') {
						try{
							sprites.floatingQuantity.innerHTML = selectQuantity.value;
						}catch(err){}
						showMarker(sprites.advanceToMarker, getCoordinates(country));
					}
				}
			}
		}
		actionUpdated = true;
		return;
	}

	function showMarker(marker, coordinates) {
		if (marker == sprites.floatingQuantity) {
			coordinates[0] = 8 + coordinates[0];
			coordinates[1] = coordinates[1] - 47;
		} else if (marker == sprites.advanceToMarker) {
			coordinates[0] = -5 + coordinates[0];
			coordinates[1] = -32 + coordinates[1];
		} else if (marker == sprites.crosshair) {
			coordinates[0] = -18.5 + coordinates[0];
			coordinates[1] = -45.5 + coordinates[1];
		} else {
			coordinates[0] = -18 + coordinates[0];
			coordinates[1] = -44 + coordinates[1];
		}
		marker.style.visibility = 'visible';
		marker.style.left = coordinates[0] + 'px';
		marker.style.top = coordinates[1] + 'px';
	}

	function getCoordinates(country) {
		if (findMapSize() == "S") {
			return [parseInt(country.xS), parseInt(country.yS)];
		}
		return [parseInt(country.xL), parseInt(country.yL)];
	}

	function setHotkey(el) {
		var pref = el.id;
		if (pref.match('Hotkey')) {
			if (userPrefs[pref] != '-1') {
				n = prompt('Enter new hotkey:', String.fromCharCode(userPrefs[pref]));
				if (n == null) {
					return;
				}
			} else {
				n = prompt('Enter new hotkey:');
			}
			if (n != '') {
				// something was entered--make sure it is not already assigned to
				// something else, and that is it not 0-9 since those are reserved for
				// changing army quantities
				if (n.match(/[0-9]/)) {
					alert('Number keys are reserved for changing the number of troops. Please choose another hotkey.');
					return;
				}
				for (_pref in userPrefs) {
					if (_pref.match('Hotkey') && _pref != pref && n == String.fromCharCode(userPrefs[_pref])) {
						alert('"'+n+'" is already being used for '+_pref);
						return;
					}
				}
				userPrefs[pref] = n.charCodeAt(0);
			} else {
				userPrefs[pref] = '-1';
			}
			// update the menu item to display the new preference
			n = String.fromCharCode(userPrefs[pref]);
			if (n != String.fromCharCode('-1')) {
				el.getElementsByTagName('b')[0].innerHTML = n;
			} else {
				el.getElementsByTagName('b')[0].innerHTML = '(none)';
			}
			// store the updated preferences
			storeUserPrefs();
		}
	}
	function setPref(el) {
		var pref = el.id;
		switch(pref) {
			case 'actionMenu':
				if (actionForm) {
					switch(userPrefs[pref]) {
						case 'normal':
							actionForm.style.position = 'fixed';
							actionForm.style.bottom = 0;
							actionForm.style.width='100%';
							actionForm.style.left='0px';
							actionForm.style.zIndex = 1;
							userPrefs[pref] = 'floating';
							break;
						case 'floating':
							actionForm.style.position = '';
							actionForm.style.bottom = '';
							actionForm.style.zIndex = 1;
							userPrefs[pref] = 'normal';
							break;
					}
				}
				break;
			case 'mapBorder':
				var thin = '2px';
				var thick = '4px';
				outerMap.style.borderStyle = 'none';
				switch(userPrefs[pref]) {
					case 'off':
						outerMap.style.borderWidth = thin;
						outerMap.style.borderStyle = 'solid';
						//outerMap.style.borderLeftStyle = 'none';
						//outerMap.style.top = '-'+thin;
						userPrefs[pref] = 'thin';
						break;
					case 'thin':
						outerMap.style.borderWidth = thick;
						outerMap.style.borderStyle = 'solid';
						//outerMap.style.borderLeftStyle = 'none';
						//outerMap.style.left = '-'+thick;
						//outerMap.style.top = '-'+thick;
						userPrefs[pref] = 'thick';
						break;
					case 'thick':
						outerMap.style.borderStyle = 'none';
						//outerMap.style.left = '0px';
						//outerMap.style.top = '0px';
						userPrefs[pref] = 'off';
						break;
				}
				break;
			case 'deploymentClicks':
				switch(userPrefs[pref]) {
					case 'Left-1 Right-Selected':
						userPrefs[pref] = 'Right-1 Left-Selected';
						break;
					case 'Right-1 Left-Selected':
						userPrefs[pref] = 'Left-1 Right-Selected';
						break;
				}
				break;
			default:
				switch(userPrefs[pref]) {
					case 'Y':
						userPrefs[pref] = 'N';
						break;
					case 'N':
						userPrefs[pref] = 'Y';
						break;
				}
				updateAction();
				break;
		}
		// update the menu item to display the new preference
		el.getElementsByTagName('b')[0].innerHTML = userPrefs[pref];
		// store the updated preferences
		storeUserPrefs();
	}
	function updateMap(territoryNumber, playerNumber, quantity) {
		// debug('running updateMap. doAction: '+doAction);
		if (sendingRequest) {
			// debug('returning from updateMap because
			// sendingReqeust='+sendingRequest);
			return;
		}
		try{
			document.getElementById('magicmap').title = '';
		}catch(err){}
		innerMap.title = '';
		sprites.attackFromMarker.title = '';
		sprites.advanceFromMarker.title = '';
		sprites.fortifyFromMarker.title = '';
		sprites.crosshair.title = '';
		setCursor('default');
		sprites.crosshair.style.visibility = 'hidden';
		sprites.floatingQuantity.style.visibility = 'hidden';

		switch (doAction) {
			case 'Deploy':
				if (!changeValue('#to_country', territoryNumber)) {
					return;
				}
				setCursor('pointer');
				armiesLeftToDeploy = actionString.split(' ')[2];
				if (userPrefs['showToolTips'] == 'Y') {
					switch(userPrefs['deploymentClicks']) {
						case 'Left-1 Right-Selected':
							L='Deploy 1';
							R='Deploy '+selectedQuantity+' of '+armiesLeftToDeploy;
							break;
						case 'Right-1 Left-Selected':
							R='Deploy 1';
							L='Deploy '+selectedQuantity+' of '+armiesLeftToDeploy;
							break;
					}
					t = 'Left-click: '+L+'. Right-click: '+R+'. Shift-click: Deploy all available troops.';
					try{
						document.getElementById('magicmap').title = t;
					}catch(err){}
					innerMap.title = t;
				}
				if (userPrefs['showFloatingQuantity'] == 'Y') {
					showMarker(sprites.floatingQuantity, getCoordinates(overTerritory));
					sprites.floatingQuantity.innerHTML = selectedQuantity;
				}
				break;
			case 'Advance':
				setCursor('pointer');
				if (userPrefs['showToolTips'] == 'Y') {
					sprites.advanceFromMarker.title = 'Any click: Advance 0';
				}
				if (mapInfo.countries[territoryNumber].name == attackedFromTerritory) {
					q = 0;
					if (userPrefs['showToolTips'] == 'Y') {
						try {
							document.getElementById('magicmap').title = 'Any click: Advance '+q;
						}catch(err){}
						innerMap.title = 'Any click: Advance '+ q;
					}
					if (userPrefs['showFloatingQuantity'] == 'Y') {
						sprites.floatingQuantity.innerHTML = q;
						showMarker(sprites.floatingQuantity, getCoordinates(overTerritory));
					}
				} else if (mapInfo.countries[territoryNumber].name == attackedToTerritory) {
					q = selectedQuantity;
					if (userPrefs['showToolTips'] == 'Y') {
						try{
							document.getElementById('magicmap').title = 'Any click: Advance '+selectedQuantity;
						}catch(err){}
						innerMap.title = 'Any click: Advance '+selectedQuantity;
					}
					if (userPrefs['showFloatingQuantity'] == 'Y') {
						sprites.floatingQuantity.innerHTML = q;
						showMarker(sprites.floatingQuantity, getCoordinates(overTerritory));
					}
				} else {
					setCursor('default');
					try{
						document.getElementById('magicmap').title = '';
					}catch(err){}
					innerMap.title = '';
				}
				break;
			case 'Assault':
				if (playerNumber == currentPlayerNumber) {
					if (quantity == 1) {
						return;
					}
					setCursor('pointer');
					if (userPrefs['showToolTips'] == 'Y' && title != fromTerritory) {
						t = 'Left-click: Set '+title+' as From-Territory.';
						try{
							document.getElementById('magicmap').title = t;
						}catch(err){}
						sprites.crosshair.title = t;
						innerMap.title = t;
					}
					return;
				}

				if (!changeValue('#to_country', territoryNumber)) {
					return;
				}
				setCursor('pointer');
				if (userPrefs['showCrosshairs'] == 'Y') {
					showMarker(sprites.crosshair, getCoordinates(overTerritory));
				}
				if (userPrefs['showToolTips'] == 'Y') {
					t = 'Left-click: Attack from '+fromTerritory+' to '+title+'. Right-click/Shift-click: Auto-attack.';
					try{
						document.getElementById('magicmap').title = t;
					}catch(err){}
					sprites.crosshair.title = t;
					innerMap.title = t;
				}
				break;
			case 'Reinforce':
				try {
					changeValue('#to_country', territoryNumber);
				} catch (err) {
					return;
				}
				if (playerNumber == currentPlayerNumber && quantity != 1) {
					setCursor('pointer');
				}
				if (document.getElementById('to_country').value != territoryNumber) {
					return;
				}
				if (playerNumber == currentPlayerNumber) {
					setCursor('pointer');
					if (userPrefs['showToolTips'] == 'Y') {
						t = 'Right-click/Shift-click: Reinforce '+selectQuantity.value +' troops from '+fromTerritory+' to '+title;
						try{
							document.getElementById('magicmap').title = t;
						}catch(err){}
						innerMap.title = t;
					}
				}
				if (userPrefs['showFloatingQuantity'] == 'Y') {
					sprites.floatingQuantity.innerHTML = selectedQuantity;
					showMarker(sprites.floatingQuantity, getCoordinates(overTerritory));
				}
				break;
		}
	}
	function onMapMouseMove(e) {
		if (!document.getElementById('action')) {
			// debug('spectator game. returning');
			return;
		}
		if (sendingRequest) {
			// debug('returning because sendingRequest='+sendingRequest);
			return;
		}

		mouseOverX = e.pageX -  outerMapPos[0] - 19;
		mouseOverY = e.pageY - outerMapPos[1] + 4;
		try{
			document.getElementById('magicmap').title = '';
		}catch(err){}
		innerMap.title = '';
		sprites.attackFromMarker.title = '';
		sprites.advanceFromMarker.title = '';
		sprites.fortifyFromMarker.title = '';
		sprites.crosshair.title = '';
		try{
			selectedQuantity = document.getElementById('quantity').value;
		}catch(err){}

		sprites.crosshair.style.visibility = 'hidden';
		sprites.floatingQuantity.style.visibility = 'hidden';
		setCursor('default');
		for (var i in mapInfo.countries) {
			var country = mapInfo.countries[i];
			var coordinates = getCoordinates(country);
			if (coordinates[0] > mouseOverX && coordinates[0] < mouseOverX + 30 && coordinates[1] > mouseOverY && coordinates[1] < mouseOverY + 30) {
				// if we're over any territory...
				overTerritory = country;
				tIndex = i;
				tArmies = getArmiesForIndex(i);
				playerNumber = tArmies.player;
				updateMap(i, playerNumber, tArmies.quantity);
				break;
			}
		}
		if (!overTerritory) {
			return;
		}
		tName = overTerritory.name;
	}
	function clickButton(text) {
		var button = findButton(text);
		if (button) {
			button.click();
		}
	}
	function findButton(text) {
		var inputs = document.querySelectorAll("#action-form input"), i, input;
		for (i = 0; i < inputs.length; i++) {
			input = inputs[i];
			if (input.type=="submit" && input.value == text) {
				return input;
			}
		}
		return null;
	}
	function getScriptConfig() {
								var nodes = document.querySelectorAll("#middleColumn script");
				if (nodes[nodes.length - 1].innerHTML=="") {
						return nodes[nodes.length - 3].innerHTML;
				}
				else
				{
						return nodes[nodes.length - 1].innerHTML;
				}
	}
	function getMap() {
		return JSON.parse(/map = (.+);/.exec(getScriptConfig())[1]);
	}
	function getArmies() {
		var toParse = document.getElementById('armies').innerHTML || /armies = (.+);/.exec(getScriptConfig())[1];
		return JSON.parse(toParse);
	}

	function onMapClick(e) {
		e.preventDefault();
		e.returnValue = false;
		if (sendingRequest) {
			return;
		}
		wait('on');
		sprites.floatingQuantity.style.visibility = 'hidden';
		var clickedTerritory;
		clickX = e.pageX - outerMapPos[0] - 4;
		clickY = e.pageY - outerMapPos[1] + 19;
		// see if a territory was clicked

		for (var i in mapInfo.countries) {
			var country = mapInfo.countries[i];
			title = country.name;
			var coordinates = getCoordinates(country);
			if (coordinates[0] > clickX - 15 && coordinates[0] < clickX + 15 && coordinates[1] > clickY - 15 && coordinates[1] < clickY + 15) {
				clickedTerritory = country;
				tIndex = i;
				tArmies = getArmiesForIndex(i);
				playerNumber = tArmies.player;
				break;
			}
		}
		if (!clickedTerritory) {
			// debug('no territory clicked. x:'+clickX+' y:'+clickY);
			wait('off');
			return;
		}

		if (e.button == 0 && ! e.shiftKey) {
			changeValue('#from_country', tIndex);
		}

		updateAction();
		if (doAction == 'Waiting'||doAction == 'Begin') {
			// debug('not your turn. exiting');
			wait('off');
			return;
		}

		tName = clickedTerritory.name;
		try {
			fromTerritory = mapInfo.countries[document.getElementById('from_country').value].name;
		}catch(err){
			fromTerritory = '';
		}

		try {
			toTerritory = mapInfo.countries[document.getElementById('to_country').value].name;
		}catch(err){
			toTerritory = '';
		}

		try{
			selectFromCountry = document.getElementById('from_country');
		}catch(err){}
		try{
			selectToCountry = document.getElementById('to_country');
		}catch(err){}
		try{
			selectQuantity = document.getElementById('quantity');
		}catch(err){}
		console.log(doAction);
		switch(doAction) {
			case 'Deploy':
				if (changeValue(selectToCountry, tIndex)) {
					toTerritory = tName;
				} else { // an enemy territory was clicked during deployment
					wait('off');
					return;
				}
				if (deployDeferred) {
					armiesLeftToDeploy = actionString.split(' ')[2];
					clickButton('Deploy');
					return;
				} else {
					if (!document.getElementById('quantity')) {
						wait('off');
						return;
					}
				}
				var setValue;
				if (e.button == 2) { // right click
					if (!userPrefs['deploymentClicks'] == 'Left-1 Right-Selected') {
						setValue = "1";
					}
				} else if (e.shiftKey) {
					armiesLeftToDeploy = actionString.split(' ')[2];
					setValue = armiesLeftToDeploy;
				} else {
					if (userPrefs['deploymentClicks'] == 'Left-1 Right-Selected') {
						setValue = "1";
					}
				}
				changeValue(selectQuantity, setValue);
				break;
			case 'Assault':
				if (fromTerritory == '' || toTerritory == '') {
					wait('off');
					return;
				}

				// if freindly, then set from_country and return
				if (playerNumber == currentPlayerNumber) {
					if (tArmies.quantity == 1) {
						wait('off');
						return;
					}
					// try to set from_country, but if there is an error (which would
					// happen if a freindly country was clicked with no attackable enemies
					// around it), then return
					if (!changeValue(selectFromCountry, tIndex)) {
						wait('off');
						return;
					}
					if (selectFromCountry.value != tIndex) {
						wait('off');
						return;
					}
					fromTerritory = tName;
					wait('off');
					return;
				// if enemy, set as to_country and continue to attack
				} else {
					changeValue(selectToCountry, tIndex);
					if (selectToCountry.value != tIndex) {
						wait('off');
						return;
					}
					if (e.button == 2 || e.shiftKey) {
						doAction = 'Auto-Assault';
						autoAttackX = false;
						if (e.ctrlKey) {
							// this is an Auto-Attack[x] (doAction will remain 'Attack')
							var input = prompt('Enter the minimum number of troops to remain on the assaulting[/assaulted] territory:');
							if (!input) {
								wait('off');
								return;
							}
							var amounts = input.split('/');
							autoAttackData = {
								assaultingIndex:selectFromCountry.value,
								assaultingRemaining:amounts[0],
								assaultedIndex:selectToCountry.value,
								assaultedRemaining:amounts[1]
							};
							doAction = 'Assault';
							autoAttackX	= true;
						}
						if (e.altKey) {
							// this is an auto-attack/advance
							// debug('executing auto-attack/auto-advance');
							autoAdvance = true;
						} else {
							autoAdvance = false;
						}
					}
					toTerritory = tName;
				}
				attackedFromTerritory = fromTerritory;
				break;
			case 'Advance':
				if (!document.getElementById('quantity')) {
					wait('off');
					return;
				}
				debug('attackedFromTerritory: '+attackedFromTerritory);
				toTerritory = tName;
				if (toTerritory == '') {
					wait('off');
					return;
				}
				if (toTerritory != attackedToTerritory && toTerritory != attackedFromTerritory) {
					wait('off');
					return;
				}
				if (toTerritory == attackedFromTerritory) {
					changeValue(selectQuantity, '0');
				}
				break;
			case 'Reinforce':
				if (! document.getElementById('quantity')) {
					wait('off');
					return;
				}
				if (e.button == 2 || e.shiftKey) {
					changeValue(selectToCountry, tIndex);
					if (selectToCountry.value != tIndex) {
						wait('off');
						return;
					}
					toTerritory = tName;
				} else {
					if (changeValue(selectFromCountry, tIndex)) {
						fromTerritory = tName;
						toTerritory = '';
					}
					wait('off');
					return;
				}
				if (fromTerritory == '' || toTerritory == '') {
					wait('off');
					return;
				}
				break;
		}
		clickButton(doAction);
	}

	function getCurrentPlayer() {
		var allPlayers = [], playerElements, i, playerNumber, expression;
		debug('getting player number for '+currentPlayerName);
		playerElements = document.querySelectorAll('#players span[id^=player_]');
		for (i = 0; i < playerElements.length; i++) {
			if (playerElements[i].id.match(/player_\d/)) {
				allPlayers.push(playerElements[i]);
			}
		}
		expression = toExpression(currentPlayerName);
		for (i = 0; i < allPlayers.length; i++) {
			if (allPlayers[i].textContent.match(expression)) {
                if(allPlayers[i].parentElement.parentElement.parentElement.className!="status_red") {
                    playerNumber = i+1;
                    break;
                }
			}
		}
        debug(playerNumber);
		return playerNumber;
	}

	function toExpression(text) {
		var toReturn = "",
			toReplace = "\^$*+?.()[]{}",
			i, toAdd;
		for (i = 0; i < text.length; i++) {
			toAdd = text[i];
			if (toReplace.indexOf(toAdd) > -1) {
				toReturn += "\\";
			}
			toReturn += toAdd;
		}
		return toReturn;
	}

	function onKeyPress(e) {
		if (sendingRequest) {
			return;
		}
		if (chatHasFocus) {
			return;
		}
		switch (e.which) {
			case parseInt(userPrefs['phaseEndHotkey']) :
				if (doAction == 'Assault') {
					clickButton('End Assaults');
				}
				if (doAction == 'Reinforce') {
					clickButton('End Reinforcement');
				}
				return stop(e);
			case parseInt(userPrefs['nextGameHotkey']) :
				try {
					if (document.getElementById('action').innerHTML.indexOf("skip this game") > -1) {
						var gameNumber = /game=(\d+)/.exec(window.location)[1];
						window.location='http://www.conquerclub.com/player.php?mode=mygames1&skip=' + gameNumber;
						return;
					}
				} catch (e) {}
				window.location='http://www.conquerclub.com/player.php?mode=mygames1&next=Y';
				return;
			case parseInt(userPrefs['jumpToMapHotkey']) :
				window.location.replace('#map-cell');
				return stop(e);
			case parseInt(userPrefs['refreshMapHotkey']) :
				refreshMap();
				return stop(e);
			case parseInt(userPrefs['beginTurnHotkey']) :
				var button = findButton('Begin Turn');
				if (button) {
					button.click();
				} else {
					beginTurn = true;
					refreshMap();
				}
				return stop(e);
		}

		// update the selected army quantity
		selectQuantity = document.getElementById('quantity');
		if (!selectQuantity) {
			return;
		}
		switch (parseInt(e.keyCode)+parseInt(e.which)) {
			case 37: // left arrow
			case parseInt(userPrefs['decreaseArmiesHotkey']): // custom hotkey
				updateSelectedQuantity(parseInt(selectQuantity.value) - 1);
				break;
			case 39: // right arrow
			case parseInt(userPrefs['increaseArmiesHotkey']): // custom hotkey
				updateSelectedQuantity(parseInt(selectQuantity.value) + 1);
				break;
		}
		if (e.which > 47 && e.which < 58) {
			updateSelectedQuantity(e.which - 48);
		} // set army quantity to the value of the number pressed
		selectedQuantity = selectQuantity.value;
		return;
	}

	function stop(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue= false;
		}
		return false;
	}
   function refreshMap() {
        var x = document.getElementById('console_header_nav');
        if (x==null) {
            x = document.getElementById('right_hand_side').getElementsByTagName("a");         
        }
        else {
            x = document.getElementById('console_header_nav').getElementsByTagName("a");
        }
         for (var i = 0; i < x.length; i++) {
            if (x[i].textContent.toLowerCase().indexOf("refresh") > -1) {
               if (document.createEvent) {
                    // dispatch for firefox + others
               var evt = document.createEvent("HTMLEvents");
                    evt.initEvent('click', true, true );
               x[i].dispatchEvent(evt);
            } else {
               x[i].fireEvent('onclick',document.createEventObject());
            }
            }
      }
   }
   function updateSelectedQuantity(q) {
		if (changeValue("#quantity", q)) {
			selectedQuantity = q;
			sprites.floatingQuantity.innerHTML = q;
		}
	}
	function changeValue(input, value) {
		var optionToSelect = typeof input == "string"? document.querySelector(input + " option[value='" + value + "']"):
				input? input.querySelector("option[value='" + value + "']"): false;
		if (optionToSelect) {
			optionToSelect.selected = true;
			createChangeEvent(optionToSelect);
			return true;
		}
		return false;
	}
	function createChangeEvent(element) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", true, true);
		element.dispatchEvent(evt);
	}

	function onMouseWheel(e) {
		selectQuantity = document.getElementById('quantity');
		if (!selectQuantity || sendingRequest || userPrefs['useMouseWheel'] != 'Y') {
			return true;
		}
		var delta = e.detail || -e.wheelDeltaY;
		if (delta) {
			delta = -delta/3;
			if (delta > 0) {
				updateSelectedQuantity((parseInt(selectQuantity.value) + 1));
			}
			if (delta < 0) {
				updateSelectedQuantity((parseInt(selectQuantity.value) - 1));
			}
			e.preventDefault();
			e.returnValue = false;
		}
		return false;
	}

	function checkForUpdateVersion() {
		 var lastupdate = GM_getValue('lastupdate', 0);
		 if (lastupdate < new Date().getTime() - 60*60*1000) {
				GM_setValue('lastupdate', new Date().getTime() + "");
				var scriptURL = 'http://userscripts.org/scripts/source/186652.meta.js';// ?nocache='
																																							// +
																																							// Math.random();
				GM_xmlhttpRequest({
					 method: 'GET',
					 url: scriptURL,
					 onload: updateServerNumber
				});
		 }
		 toggleUpdateAvailable();
		}

	function updateServerNumber(response) {
		try {
		 var serverVersion = /@version\s+(\d+.\d+)/.exec(response.responseText)[1];
		 GM_setValue('updateavailable', serverVersion);
		 toggleUpdateAvailable();
		}catch(e){}
	}

	function toggleUpdateAvailable() {
		var newVersionAvailable = isNewVersion();
		var link = document.getElementById('checkForUpdates').getElementsByTagName("a")[0];
		if (link) {
			link.innerHTML = (newVersionAvailable?"<span class='attention'>Update Available</span>":"Latest version installed");
		}
	}
	function isNewVersion() {
		var serverVersion = GM_getValue('updateavailable', false);
		if (serverVersion) {
			var newVersion = serverVersion.split('.').map(function(string) {
					return parseInt(string,10);
			 });
			 var thisVersion = versionString.split('.').map(function(string) {
					return parseInt(string,10);
			 });
			 return (newVersion[0]>thisVersion[0] || (newVersion[0]==thisVersion[0] && (newVersion[1]>thisVersion[1])));
		}
		return false;
	}

	function doUpgrade() {
		GM_setValue('lastupdate', new Date().getTime() + "");
		var link = this.getElementsByTagName("a")[0];
		link.href = "http://userscripts.org/scripts/source/186652.user.js";
	}

	function debug(text) {
		if (true && console) {
			console.log("CM:" + debug.caller.toString().split(/{/)[0].split('function')[1]+': '+text);
		}
	}
	function showUserGuide(state) {
		switch(state) {
			case 0:
				backScreen.style.display = 'none';
				userGuide.style.display = 'none';
				break;
			case 1:
				userGuide.style.left = (document.width/2)-(parseInt(userGuide.style.width)/2)+'px';
				backScreen.style.opacity='.7';
				backScreen.style.display = 'inline';
				setTimeout(function(){
					userGuide.style.display = 'inline';
				}, 300);
				break;
		}
	}
	function storeUserPrefs() {
		GM_setValue('USER_PREFS2', JSON.stringify(userPrefs));
	}
	function loadUserPrefs(def) {
		var toReturn = JSON.parse(GM_getValue('USER_PREFS2', (def || '{}')));
		if (typeof(toReturn.length) != "undefined") { // old config: array in stead
																									// of object
			var array = toReturn;
			toReturn = new Object();
			for (var i = 0; i<array.length;i++) {
				var temp = array[i].split(':');
				toReturn[temp[0]] = temp[1];
			}
		}
		if (toReturn.confirmAttack) {
			delete toReturn['confirmAuto-Attack'];
			delete toReturn.confirmAttack;
		}
		return toReturn;
	}
	function gameRefresh() {
		armiesArray = getArmies();
		wait('off');
		updateAction();
		var inputs = document.getElementById('action').getElementsByTagName("input");
		for(var i = 0;i<inputs.length;i++) {
			if (inputs[i].type == "submit") {
				addConfirmation(inputs[i]);
			}
		}
		debug('doAction: '+doAction);
        if(doAction="Begin") {
            currentPlayerNumber = getCurrentPlayer();
        }
		if (autoAttackX) {
			var indicesRight = autoAttackData.assaultingIndex == document.getElementById('from_country').value && autoAttackData.assaultedIndex == document.getElementById('to_country').value;
			var armiesRight = (!autoAttackData.assaultingRemaining || (+remainingArmies) > (+autoAttackData.assaultingRemaining + 1)) && (!autoAttackData.assaultedRemaining || (+remainingArmiesD) > (+autoAttackData.assaultedRemaining + 1));
			if (!indicesRight || !indicesRight || doAction == 'Advance') {
				autoAttackX = false;
			} else {
				clickButton('Assault');
				return;
			}
		}
		if (beginTurn) {
			if (!action.textContent.match('Waiting for your next turn')) {                
				beginTurn = false;
			}            
			clickButton('Begin Turn');
		}
		if (autoAdvance) {
			// no way to get here by auto attack or autoAttackX without failing,
			// falsify
			autoAdvance = false;
			if (doAction == 'Advance') {
				clickButton('Advance');
				return;
			}
		}
		outerMapPos = findPos(outerMap);
	}

	function checkForUpdate() {
		var action = document.getElementById('action');
		if (action) {
			var element = document.getElementById('updateCM');
			if (!element) {
					wait('off');
					var toAdd = document.createElement('div');
					toAdd.id = "updateCM";
					action.appendChild(toAdd);
					updateAction();
					var inputs = document.getElementById('action').getElementsByTagName("input");
					for(var i = 0;i<inputs.length;i++) {
						if (inputs[i].type == "submit") {
							addConfirmation(inputs[i]);
						}
					}
					// debug('doAction: '+doAction);
					if (autoAttackX) {
						var indicesRight = autoAttackData.assaultingIndex == document.getElementById('from_country').value && autoAttackData.assaultedIndex == document.getElementById('to_country').value;
						var armiesRight = (!autoAttackData.assaultingRemaining || (+remainingArmies) > (+autoAttackData.assaultingRemaining + 1)) && (!autoAttackData.assaultedRemaining || (+remainingArmiesD) > (+autoAttackData.assaultedRemaining + 1));
						if (!indicesRight || !indicesRight || doAction == 'Advance') {
							autoAttackX = false;
						} else {
							clickButton('Assault');
							return;
						}
					}
					if (beginTurn) {
						if (!action.textContent.match('Waiting for your next turn')) {
							beginTurn = false;
						}
						clickButton('Begin Turn');
					}
					if (autoAdvance) {
						// no way to get here by auto attack or autoAttackX without failing,
						// falsify
						autoAdvance = false;
						if (doAction == 'Advance') {
							clickButton('Advance');
							return;
						}
					}
					outerMapPos = findPos(outerMap);
			}
		}
	}
	function addConfirmation(button) {
		button.addEventListener('click', function (evt) {
			var command = this.value, shouldContinue = true, confirmMessage;
			if (userPrefs['confirm'+command] == 'Y') {
				if (command == "Deploy") {
					confirmMessage = 'Deploy '+selectQuantity.value+' troop(s) on '+toTerritory+'?';
				} else if (command == "Assault" || command =="Auto-Assault") {
					confirmMessage = command + ' from '+fromTerritory+' to '+toTerritory+'?';
				} else if (command == "Advance") {
					confirmMessage = 'Advance '+selectQuantity.value+' troop(s)?';
				} else if (command == "Reinforce") {
					confirmMessage = 'Reinforce '+selectQuantity.value+' troop(s) from '+fromTerritory+' to '+toTerritory+'?';
				}
				shouldContinue = confirm(confirmMessage);
			}
			if (userPrefs['confirmPhaseEnd'] == 'Y') {
				if (command == 'Reinforce' && fortificationType != 'Unlimited') {
					shouldContinue = confirm('This will end your turn. Are you sure?');
				} else if (command == 'End Assaults' || command == 'End Reinforcement') {
					shouldContinue = confirm('Are you sure you want to '+command.toLowerCase()+'?');
				}
			}
			if (!shouldContinue) {
				evt.preventDefault();
				return false;
			}
			return true;
		}, false);
	}

	function wait(state) {
		// debug('wait '+state);
		if (state == 'on') {
			sendingRequest = true;
			setCursor('wait');
		} else {
			sendingRequest = false;
			setCursor('default');
		}
	}
	function initialize() {
		outerMap = document.getElementById('outer-map');
		innerMap = document.getElementById('inner-map');
		mapInfo = getMap();
		outerMapPos = findPos(outerMap);
		currentPlayerName = document.getElementById('this_username').innerHTML;
		currentPlayerNumber = getCurrentPlayer();
		actionForm = document.getElementById('action-form');
		images = {
			enemyGif:"data:image/gif,GIF89a-%00-%00%B3%00%00%FF%15%15%FF%FF%FF%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15!%F9%04%01%00%00%01%00%2C%00%00%00%00-%00-%00%00%04i0%C8I%AB%BD8%EB%CD%BB%FF%60(%8Ed%09%02%A6%89%A6%23%E0%B2%A2%BB%C2'%1D%DB%E1%8Cw%FA%BE%F5%3E%8An%18%94%F4%8EA%A0r%07%0C4%9B%C5%A8t%FAy%D1%AC%1A%99v%0Bur%B9%1C%2CKL-K%BB%16t%2B%CD%F6!%85Q%E2D%8D%A3%17%EDIs%5B%3F%E7%C3%FD%5Exudf%82L%80%88%89%8A%8B6%11%00%00%3B",
			enemyGifSmall:"data:image/gif,GIF89a%0D%00%0D%00%B3%00%00%FF%15%15%FF%FF%FF%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15%FF%15%15!%F9%04%01%00%00%01%00%2C%00%00%00%00%0D%00%0D%00%00%04!0%C8%09%A6%B5%20%DF%5D7%0DUwu%24%E6Ia%A6%A1jx%82%26%2C%8F%B0%E8%D9%F7%FA%E2A%04%00%3B",
			attackFromGif:"data:image/gif,GIF89a(%00(%00%A2%05%00%00%00%00%08%94%10%7B%00%00%AD%00%00%FF%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%84X%BA%AC%F40J%D2%AA%5D3%EB%CB%8B%FEY%D7%7C%17)n%A23ua%3AJ%DC%EAV%F2%0B%CDld%3F%F8%A9%AB%B7%9E%8F%07%A4%08%87%3C%D8%11%E9%09.%91%BFgN)%9DF%AB1*%B6%A4%DD%D2%AE%DE%AF3l%01%931%E6s3M%AE%A9%8B%C47%DC(_%B3%B7%A8%B7%E9%FC%BBK%FB~GW%5D%7F%60%813%84vtK%89%8A%8B%3D%8Ds%8FP%93en%5C%91b(%20%95%94%9Cc%82%9F%A0%16%09%00%00!%F9%04%09%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%8EX%BA%DC%FE0%C6A%AB%A52%B3%CB%B9%96%5Dx%7D%8Dh%8E%A4%E9%A8Z%D8v%19L%16%F2S%CF%F7%86%CE%8B%B7%EE%BC%1EP1%0C%12%81E%E3%B1%A2c*%7F%96%25%E6%09u%26%A9%A8%EB%D3%A3Ur%9D%D4*%26%1A%B6E%C9%E5%D2%19%9C%96%8E%D1%ED%2F%3B-%9F%B6i%E4n%D0%87%9Fcwz)%7C%7Dv%7Fp%84%85F9%88%03%5B%83B%81b%89M%871%8B%94%5D%2C%20'n.%1F'%A0%93%96%A1%97%2F%A4~%7B%A4w%9D%A8%10%09%00%00!%F9%04%09%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%8AX%BA%DC%FE0%CAI%2B%138k%5B%B5%FF%02%F7%80%A4'.e%9A%89%A9SZ%24%05v%26%FCM%F7%99%8F%F5Y%F4%AE%8D%0F%25l%00%87%3B%E2jx)*%8E%CC%234%EA%9C%22%ABN%E6%13%8B%D1%06%97%DB%AE%D7%08%FE%95%C7fq8%84V%B2%D7%ED%F5%3B%AD%1E%03%AD%3E%60%20K%3D%D3%E7%7DurvSx4~r%80%1C%86I6%7Cd%86M%91%89%82%90%93n3%7F%8D2*-W%9D%8F%2C%A0%95Z%9Eq%A7%A8%14%09%00%00!%F9%04%05%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03)X%BA%DC%FE0%CAI%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%40F%02%00!%F9%04%09%0C%00%05%00%2C%02%00%02%00%24%00%24%00%00%03rX%BA%AC%F20%8AFk%93X%DA%5D%B2%D7%1C%F3%8DP%D8%7D%14%BAyf%B6%82%A6%03%8Bs%7CFWm%DFO%5E%EE)%9C%EC%07%F4%FDtE%DE%04%99%D40%9B%AAd%90%25%9Db%AA%95(%96v%DD%1A%85%DE%055%AC%7C%16Gd%25%8F%0C2%DB%DA%E0%EA%CC%1D%9A%D3-%BA.P%CF%8Ds%5Cx%80%81%7CYhew%24%24%7B%89wV%89%5E%86!%09%00%00!%F9%04%05%0C%00%05%00%2C%00%00%00%00(%00(%00%00%03%86X%BA%BC%F40%C2Fk%958%DB%ED%B2%C7%DC%F5%11%CAH%86%A5%16%AA%1C%8B%16n%03%BE%B2%B4%D9%B48Qx%AE%3F%B5%9D%EFw%EA%08%87%BC%88%11%88%BC%09%95%CD%D6%0E%1A%B5(%A9%D5%1F%EC%98M%CE%BAD.x)%1E%A7z%E6%60%D9%ECI%AB%B1%EE%B6%9B%BC%06%CB%E7P%F88_%AF%F2%FBHXhYh%83Q%86%86%81z%5B%8B%2F_%5E%80aR%89N%8Do%7Dw(%26g%994%26%1F%84%9F%919%239%09%00%00%3B",
			advanceFromGif:"data:image/gif,GIF89a(%00(%00%A2%06%00%00%00%00%08%94%10%8C%8C%00%C6%C6%00%F7%F7%00%FF%FF%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%84h%BA%AC%F50%CA%D2%AA%5D3%EB%CB%8D%FEY%D7%7C%17)n%A23ua%3AJ%DC%EAV%F2%0B%CDld%3F%F8%A9%AB%B7%9E%8F%07%A4%08%87%3C%D8%11%E9%09.%91%BFgN)%9DF%AB1*%B6%A4%DD%D2%AE%DE%AF3l%01%931%E6s3M%AE%A9%8B%C47%DC(_%B3%B7%A8%B7%E9%FC%BBK%FB~GW%5D%7F%60%813%84vtK%89%8A%8B%3D%8Ds%8FP%93en%5C%91b(%20%95%94%9Cc%82%9F%A0%16%09%00%00!%F9%04%09%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%8Eh%BA%DC%FE0%C6A%AB%A52%B3%CB%B9%96%5Dx%7D%8Dh%8E%A4%E9%A8Z%D8v%19L%1A%F2S%CF%F7%86%CE%8B%B7%EE%BC%1EP1%0C%12%81E%E3%B1%A2c*%7F%96%25%E6%09u%26%A9%A8%EB%D3%A3Ur%9D%D4*%26%1A%B6E%C9%E5%D2%19%9C%96%8E%D1%ED%2F%3B-%9F%B6i%E4n%D0%87%9Fcwz)%7C%7Dv%7Fp%84%85F9%88%03%5B%83B%81b%89M%871%8B%94%5D%2C%20'n.%1F'%A0%93%96%A1%97%2F%A4~%7B%A4w%9D%A8%10%09%00%00!%F9%04%09%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%8Ah%BA%DC%FE0%CAI%2B%138k%5B%B5%FF%02%F7%80%A4'.e%9A%89%A9SZ%24%05v%26%FCM%F7%99%8F%F5i%F4%AE%8D%0F%25l%00%87%3B%E2jx)*%8E%CC%234%EA%9C%22%ABN%E6%13%8B%D1%06%97%DB%AE%D7%08%FE%95%C7fq8%84V%B2%D7%ED%F5%3B%AD%1E%03%AD%3E%60%20K%3D%D3%E7%7DurvSx4~r%80%1C%86I6%7Cd%86M%91%89%82%90%93n3%7F%8D2*-W%9D%8F%2C%A0%95Z%9Eq%A7%A8%14%09%00%00!%F9%04%05%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03)h%BA%DC%FE0%CAI%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%40F%02%00!%F9%04%09%0C%00%06%00%2C%02%00%02%00%24%00%24%00%00%03rh%BA%AC%F20%8AFk%93X%DAm%B2%D7%1C%F3%8DP%D8%7D%14%BAyf%B6%82%A6%03%8Bs%7CFWm%DFO%5E%EE)%9C%EC%07%F4%FDtE%DE%04%99%D40%9B%AAd%90%25%9Db%AA%95(%96v%DD%1A%85%DE%055%AC%7C%16Gd%25%8F%0C2%DB%DA%E0%EA%CC%1D%9A%D3-%BA.P%CF%8Ds%5Cx%80%81%7CYhew%24%24%7B%89wV%89%5E%86!%09%00%00!%F9%04%05%0C%00%06%00%2C%00%00%00%00(%00(%00%00%03%86h%BA%BC%F40%C2Fk%958%DB%ED%B2%C7%DC%F5%11%CAH%86%A5%16%AA%1C%8B%1An%03%BE%B2%B4%D9%B48Qx%AE%3F%B5%9D%EFw%EA%08%87%BC%88%11%88%BC%09%95%CD%D6%0E%1A%B5(%A9%D5%1F%EC%98M%CE%BAD.x)%1E%A7z%E6%60%D9%ECI%AB%B1%EE%B6%9B%BC%06%CB%E7P%F88_%AF%F2%FBHXhYh%83Q%86%86%81z%5B%8B%2F_%5E%80aR%89N%8Do%7Dw(%26g%994%26%1F%84%9F%919%239%09%00%00%3B",
			advanceToGif:"data:image/gif,GIF89a%14%00%14%00%91%00%00%00%00%00RR%00%D6%D6%18%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%02'%84%0F%A2%8B%7D%0B%99K%B1%AAf%B3%40%DA%BE%EEQ%60%24%8E%E6%89%A6%EA%0A%1A%AB%AB~'7c%E3%04g8%0DM%05%00!%F9%04%09%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%025%84%0F%A2%8B%7D%0B%99K%B1%AAV%8D%A0%10u%17%3D%D2%C4m%1C)%5E%1FZ%AE%A8%C5zY%0C%C7%ED%F8%5E'%FB%85%E4%EAJ%E94%B0%99%CC%12%3C%D6hI%40%01%00!%F9%04%09%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%025%84%0F%A1%8B%7D%1B%12t%86Q%FB%22%CDMm%E4U%DA%C7%25%A4%13%85g%A6%AER%BBb%AE8%BA%D3l%E6%B3%06%7Fj%8F%AA%01A5%DAe%F8%82%C86%CAM%01%00!%F9%04%05d%00%00%00%2C%00%00%00%00%14%00%14%00%00%02%11%84%8F%A9%CB%ED%0F%A3%9C%B4%DA%8B%B3%DE%BC%FB%AF%15%00!%F9%04%05%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%024%84%0F%A1%8B%7D%1B%12t%86Q%FB%22%CDMm%E4U%DA%C7%25%A4%13%85g%A6%AER%BBb%EE%3B%BA%D3l%E6%B6%06%7Fj%8F%AA%C9%82%97%1A%CB%07I%C6n%8E%02%00!%F9%04%05%0C%00%00%00%2C%00%00%00%00%14%00%14%00%00%024%84%0F%A2%8B%7D%0B%99K1Q%F90%AAY%CC%0E~%A1%22n%A4VF%5E%D9%91l%EB%BE%EAk%9C1%EB%DE%A2%84NX%DF2%A1%3C%3D%95qg%D4%7D%20%9F%02%00%3B",
			// green one: advanceToGif =
			// "data:image/gif,GIF89a%14%00%14%00%F7%04%00%00%00%00%00%B5%18%08k%08B%FFJ%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08C%00%09%08%1CH%60%80%C1%83%04%13%0E%3C%C8%10%A1%C2%82%0D%23%1AL(%B1%E2%00%82%16%25.%CC%A8%11%22%C7%86%1E%3F%8A%1CI%B2%A4%C9%93%1C%05%9ETir%E3H%8C%2F)~%7C%C8%B2%22M%98%0C%1F%06%04%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08U%00%09%08%1CH%20%80%C1%83%04%13%0E%3C%C8%10%A1%C2%82%0D%23%1AL%18Q%60%00%88%0C%09fT%D8p%A1%C3%87%18%2Fb%04%E9q%E2F%92!O%92%94%88Rc%C5%96%2C%5B%A6%FC%B8r%E2H%94%1B%3B%82%3C%A9%B2%A4M%8B%2C_%BA%94%D8shL%98E%09%04%04%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08U%00%09%08%1CH%40%80%C1%83%04%13%0E%3C(%A0%20C%85%02%11B%94%B8%B0!%C4%8A%09%0D%5E%24%A81%A2%C5%8D%18%0B%82T%D8%B0%E3%C8%8A%26O%3ALy%92%A2J%8F%1FU%3E%7C)%B2%E6K%8B%2C7%9A%CCI2%26O%8E1aN%FC%B9%92%A1%CB%8BF%2F%06%04%00!%F9%04%05d%00%04%00%2C%00%00%00%00%14%00%14%00%00%08%22%00%09%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%23J%9CH%B1%A2%C5%8B%183j%DCh1%20%00!%F9%04%09%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08T%00%09%08%1CH%40%80%C1%83%04%13%0E%3C(%A0%20C%85%02%11B%94%B8%B0!%C4%8A%09%0D%5E%24%A81%A2%C5%8D%18%0B%82T%D8%B0%E3%C8%8A%26O%3ALy%92%A2%CA%95%1FU%3E%7C)%B2%A6L%8B%2C7%9A%CCI2%A6%CB%9E%13c%A2%D4%C9%B0h%CB%99%0A%03%02%00!%F9%04%05%0C%00%04%00%2C%00%00%00%00%14%00%14%00%00%08T%00%09%08%1CH%20%80%C1%83%04%13%0E%3C%C8%10%A1%C2%82%0D%0BBt%B8%90%22%C1%88%15%03%3C%CC%C8qcG%83%1E%2F%82%B4%18%B2%A1%C6%90%19A%A2L%A9r%A5%C9%95%02G%B6D%A9r%A6G%87%24%1FR%CC%99R%24I%8D9M%0A%BD)%D4%E6F%86%1B%03%02%00%3B",
			fortifyFromGif:"data:image/gif,GIF89a(%00(%00%F7%5C%00%00%00%00%00%18%08%00!%08%00)%08%001%08%001%10%009%08%009%10%00B%08%00B%10%00J%10%00R%10%00Z%08%00Z%10%00c%10%00c%18%00k%10%00k%18%00s%10%00s%18%00%7B%08%00%7B%10%00%7B%18%00%84%10%00%84%18%00%8C%00%00%8C%10%00%8C%18%00%94%10%00%94%18%00%9C%08%00%9C%10%00%9C%18%00%A5%10%00%A5%18%00%A5!%00%AD%18%00%B5%10%00%B5%18%00%BD%18%00%C6%18%00%C6!%00%CE%18%00%CE!%08c%18%08k%18%08s%18%08%7B%10%08%7B%18%08%84%10%08%84%18%08%94%10%18%84B!%7B9!%84J!%8CJ!%8CR!%94R!%9CJ)%94J)%94R)%9CR)%9CZ)%A5R)%A5Z)%ADZ)%ADc)%B5c1%ADc1%B5c1%BDc1%BDk1%C6k1%C6s1%CEk1%CEs1%D6s1%DE%7B9%ADR9%CEk9%D6s9%D6%7B9%DE%7B9%E7%7B9%E7%849%EF%849%F7%849%F7%8CB%EF%84B%F7%84B%F7%8CB%FF%8C%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%FE%00%B9%08%1CHP%E0%0D%22K%A8hY%C8p!%95%25%40l%14%9CHq%A0%0D%1EG%B04%DC%B8%91J%91%1B%15Cr%B9%81%24%0B%C7%93%1B%B1%14%91(%92%20%0F)'%2B.4%C9p%09%C8%965%80h%D4%B2%B3%E5%C0%8DSx%88%B4Q%84%A1I%9F%13y.%C4%02%24d%D1%99Z%90R%D4B%13%8B%0F%8A%40%96F%95%1A%92!%15%A1.5b%C9%C2%B5%A5B-RXr%A9%B1d%E1%94%B2%3E%A7%2C%2420%2BZ%B8%3E%B1%88%DD%C1%05%07L%2CT%F0%FA%84%B2%10%09%17%22%0B%A1%08F%FA%B7%07a%2CK%16%FBL%B20%E3%5D%C9-%99h%24%AC%E5%09f%9FQ%94b1%F2%B9%E5%11%86X%E8%96%0Ey%DA%E1j%91BvJy-%B2%CA%C2%D9%B4)%EA8%8B%3BwA%22%3BS%FB.%F8%94%A7%90%E1%04%5B%2F%2C%82%7C%20%E5%9D%86%9Bs%81I%C56%95%A6%C8%9FF%09%AD%E5H%F3%C7K%A2%84h%A4%E2d%F8%10%8DQ%04r%F6%EE%9B%3B%7B%26%0AU%E6F%B20%FD%40%24%E3%8F%AF.b%92Jt%E7%89%AD%26D%7CIP%C4Y%14%FA-%26%04LZ%FCW%D0%13%0Cb%C1%1E%5EG%9C%15YHO%B4u%9BjR%0D%C1%5D%16%17%B6%84%DFRP0%D7%12B%C1M%E8%D3%10%1A%3A%84D%11D%E8%17c%11H%C8%C5%10%14C%E0U%04w%A8%01%26%85%5E%1BEa%E2bD%20%F1%23JXH%91%04%87!%05%04%00!%F9%04%09%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%F7%00%B9%08%1CH%B0%A0%C1%83%08%13%26%EC%00B%84%89%13%10O%98%20!%02%84%C2%8B%047%800%91%A2%A3%C7%8F%1DO%88%C0%A8%10%C4%09%90(A%8A%24YP%03%89%940U%92%60%C9e%C3I%94%2B%0C%AE%80i%82%24%88%94%18S%F6T%D8%01%25M.(%87%1E%D4p%B3c%CE%A3H%8D%1E%14%01%12%EA%40%95%07%8B~%B4JP*%C1%A6O%B9%5E%AD%3A%F0%A7G%B1%06%C9%0A%E4x%16mW%B2%1B%B6%BA%7D%2B%97j%DB%B9cC%0Al%9A%02%2F%DD%B3%7C%FD%E6%3D%2BWp%D4%AD%1E%C3%1A%AEZx1%E2%BB%82%8D%06v%BCur%E4%AA%2F!%E3%25k%B7%23%E5%BB%96%E7z%CD%ECy3%DF%BE%83Q%BB%F5%BAV-W%95%AA%07%9E%16%0B%D4%20i%CD%24k%1Fd%DB8%A8%EE%DD0%15%C6%8C%8D%F0%B4%D4%E1%B8%11%A60%8E%9Cu%EE%E61_Cw-%1D%BA%E1%C3%CE%15%06%04%00!%F9%04%09%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%FE%00%B9%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0!%C1%04%10%15%2CX%A0%00%E2%01%87%0D!6h%E1%A2%A3%C7%8E-%16%24%B8%88%D1%60%01%05%1C%3F%AA%FC%C8BA%81%92%03%0F%B0P%09C%86M%9B0V.%20P2%40%82%94.j%DA4%18%C3%26K%92%0C%0B%2C%F8X%93%A1%8C%9C%20%13d%F4%D8%D4a%05%A8.Z%F0Th%20e%D5%92O%3B%B2%18%90p%C0%CC%A00%60%0E%C4%AA%20%E1%D2%8Ei%D5%AE%F5(%D5%E0O%8Fr%09%B24%60%F0m%C7%BCz%E9%16%1C%00%14p%E0%8E%0D%0A*%F8h%F8%B0%0B%BE%03%CF%FEm%2C%F0%E3%02%82%0E%18S%E6%F21%F1%C0%C2%9B9%7Bt%E08te%90%A5M%7B%84%90%3A%F4%EA%D6%94%3F%92%1E%98%19%EF%E6%CE%04_%60u%0D7%06%C1%19P%5B%DC%F6j0%B8%0B%CA%92%E3%12%94%E1%91E%E3%16%5E%2F%1C%C4%EA%1C%B0d%19%085P%CF%9B%5C!s%B1%97aJ%A2%84%8B%DD%BB%C7%90%D5%19%B2%D8%E8%B1%FC%C2%EF%E0%DB%26%94(%D9%85%7B%A7X%B3%8A%84(%F0%00%C4%05%40%05u_CF%AD%B4%5E%03%2C%04H%5E%5Ea%AD%E4%E0WyY%D0%E0%835a%60%DAM%18%DEd%DA%86%1C.%14%10%00%00!%F9%04%05%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08C%00%B9%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%23J%9CH%B1%A2%C5%8B%183j%DC%C8%B1%A3%C7%8F%20C%8A%1CI%B2%A4%C9%93(S%AA%5C%C9%B2%A5%CB%970c%CA%9CI%B3%A6%CD%9B8%09%06%04%00!%F9%04%09%0C%00%5C%00%2C%02%00%02%00%24%00%24%00%00%08%F6%00%B9%08%1CHP%E0%84%09.%5C%C0X%08%C3%C5%84%08%05%23J%2C%18Aa%C3%84%18%13.%7C8%B1%23%97%08%0B3%8A%14%B9%D0%81%C7%82%13.%8E%5C%89%11%06%C4%93%08Uf%8C%B8%12%C6%04%8F)G%9E%E4B%F2%E6D%9D%3B%07ft)Q%E1%CC%A0%04%87%9A%24%D8B%26R%9A-%0B%3A%7D%0AU%A1O%9E*%A9%16m%09A%E0T%AD%053%DE%04%99%B0%05%D8%AD%1A%B9%20%C4x%16%ADK%91m%ABj%3C%1AW%E8P%B6u%93%DEM%987%AC%C6%AC%7D%EDZ%C4%1B%98g%C2%B5%7C%0B%8BD%ECB%B1F%08d%13%F7m%F9%80%0B%E0%BCC%0D%D2%8D%DB%F2e%E4%C6u3%0F%FCz%B6%E5U.%0EHS%15M%F03%E8%D5%5C%252%96%7C%92%E4%CB%A22i%CB%D5xZ%A2k%B8%86k%BE%F6%98%3A7%CB%A1f%9F%E6%3C~%F7%2C%84%94%C6%FFr%AC%DB%C2%E1%E2%AE%3B%03%02%00!%F9%04%05%0C%00%5C%00%2C%00%00%00%00(%00(%00%00%08%FE%00%B9%08%1CHp%A0%07%11%24L%A4X%B8%F0%84%09%12%22%0AJ%9C8Q%84B%86%183%A601%82%A2%C7%81%165%8A%CC%C8%F1%E3D%12%1A!%8A%88%C8ee%C8%8C%2CMr%C9pq%A1%89%98%1E_.%24!S%C4%09%86'p%F6%C4x%22%83%C7%0C%18M%C8%9CH%93%A1R%8A5y.%A5%88r%E7I%86R%A7Be%D8%91%20R%9BZ%3F~%DDX%F0b%D1%B0%1FE0%8C%A9v%A1P%B4%12%AB%A6%18x%F1)%DC%8F%3FSH%5D%7B%D7dU%A5mO%F45%E9%81!%97%8BY%07S%CC%EB%D3%AD%E2%8FUI%E4%0D%F18%A7M%C3%95)%06%C6%9Cy%A2%C6%CE%155%BE%ED%5C%F5%04c%D0%05%FF%5E%1C%9Dy%F5_%D4%04%19%B7%9D%0B%BB%25f%BE%B0%EB%0A4%5B%1B%F7%08%DC%9Dy%D3eh4%F3l%9C%BF%C1VNN%B6%E0%EC%C4%7D%F3%A6(%9E%DA)u%B4M%1D%2F%C6%C8%3A%ADt%E8%05%B31%5B%D5*%B7%B9_%A2%24%3C%7C%F4%20%19%23x%8F%23j%DAT)0%04B%F9)%82%C2m%3Cr%E4%7B%F2%F8%89t%C2%7Fw%DDg%DA%81%10i%15%10%00%00%3B"
		};
		if (document.getElementById('dashboard').innerHTML.match('Fortifications: <b>Unlimited</b>')) {
			fortificationType = 'Unlimited';
		} else {
			fortificationType = '';
		}
		outerMap.style.position = 'relative';

		armiesArray = getArmies();

		innerMap.style.cursor = 'default';
		setCursor('default');

		userGuide = document.createElement('div');
		userGuide.id = 'user-guide';
		userGuide.style.position = 'fixed';
		userGuide.style.overflow = 'auto';
		userGuide.style.background = '#eeffee';
		userGuide.style.width = '600px';
		userGuide.style.height = screen.height - 300+'px'; // '600px'
		userGuide.style.top = '50px';
		userGuide.style.zIndex = 101;
		userGuide.style.border = 'thick double #000000';
		userGuide.style.display = 'none';
		userGuide.innerHTML = userGuideHTML;
		document.body.appendChild(userGuide);

		document.getElementById('close-user-guide').addEventListener('click', function(){
			showUserGuide(0);
		}, false);

		backScreen = document.createElement('div');
		backScreen.style.position = 'fixed';
		backScreen.style.top = '0px';
		backScreen.style.left = '0px';
		backScreen.style.width = '100%';
		backScreen.style.height = '100%';
		backScreen.style.background = '#000000';
		backScreen.style.opacity = '.7';
		backScreen.style.zIndex = 100;
		backScreen.style.display = 'none';
		document.body.appendChild(backScreen);

		// set default preferences, then update userPrefs if necessary
		defaultPrefs = {
			actionMenu:'normal',
			mapBorder:'thin',
			showCrosshairs:'Y',
			showFromMarker:'Y',
			showAdvanceToMarker:'Y',
			showFloatingQuantity:'Y',
			showToolTips:'Y',
			confirmDeploy:'Y',
			confirmAssault:'N',
			'confirmAuto-Assault':'N',
			confirmAdvance:'Y',
			confirmFortify:'Y',
			confirmPhaseEnd:'Y',
			phaseEndHotkey:'e'.charCodeAt(0),
			nextGameHotkey:'n'.charCodeAt(0),
			jumpToMapHotkey:'m'.charCodeAt(0),
			refreshMapHotkey:'r'.charCodeAt(0),
			beginTurnHotkey:'b'.charCodeAt(0),
			increaseArmiesHotkey:'w'.charCodeAt(0),
			decreaseArmiesHotkey:'s'.charCodeAt(0),
			useMouseWheel:'Y',
			deploymentClicks:'Left-1 Right-Selected'
		};

		// replace any missing values in userPrefs with the default
		userPrefs = loadUserPrefs();
		for (var pref in defaultPrefs) {
			if (userPrefs[pref] == 'undefined' || !userPrefs[pref]) {
				userPrefs[pref] = defaultPrefs[pref];
			}
		}
		storeUserPrefs();

		var temp = document.createElement('img');
		temp.id = 'cm-crosshairs';
		temp.src = images.enemyGif;
		temp.style.width = '47px';
		temp.style.height = '47px';
		temp.style.zIndex = 2;
		temp.style.position = 'absolute';
		temp.style.visibility = 'hidden';
		temp.title = 'test';
		outerMap.appendChild(sprites.crosshair = temp);


		temp = document.createElement('img');
		temp.id = 'cm-attack-from-marker';
		temp.src = images.attackFromGif;
		temp.style.width = '45px';
		temp.style.height = '45px';
		temp.style.zIndex = 2;
		temp.style.left = '-1000px';
		temp.style.position = 'absolute';
		temp.style.visibility = 'hidden';
		outerMap.appendChild(sprites.attackFromMarker = temp);

		temp = document.createElement('img');
		temp.id = 'cm-fortify-from-marker';
		temp.src = images.fortifyFromGif;
		temp.style.width = '45px';
		temp.style.height = '45px';
		temp.style.zIndex = 2;
		temp.style.left = '-1000px';
		temp.style.position = 'absolute';
		temp.style.visibility = 'hidden';
		outerMap.appendChild(sprites.fortifyFromMarker = temp);

		temp = document.createElement('img');
		temp.id = 'cm-advance-from-marker';
		temp.src = images.advanceFromGif;
		temp.style.width = '45px';
		temp.style.height = '45px';
		temp.style.zIndex = 2;
		temp.style.left = '-1000px';
		temp.style.position = 'absolute';
		temp.style.visibility = 'hidden';
		outerMap.appendChild(sprites.advanceFromMarker = temp);

		temp = document.createElement('img');
		temp.id = 'cm-advance-to-marker';
		temp.src = images.advanceToGif;
		temp.style.width = '20px';
		temp.style.height = '20px';
		temp.style.zIndex = 2;
		temp.style.left = '-1000px';
		temp.style.position = 'absolute';
		temp.style.visibility = 'hidden';

		outerMap.appendChild(sprites.advanceToMarker = temp);

		temp = document.createElement('div');
		temp.id = 'cm-floating-quantity';
		temp.style.paddingTop = '0px';
		temp.style.paddingLeft = '1px';
		temp.style.paddingRight = '1px';
		temp.style.paddingBottom = '0px';
		temp.style.zIndex = 6;
		temp.style.left = '-1000px';
		temp.style.position = 'absolute';
		temp.style.visibility = 'hidden';
		temp.style.border = 'thin solid #ffffff';
		temp.style.color = '#ffffff';
		temp.style.background = '#556655';
		outerMap.appendChild(sprites.floatingQuantity = temp);

		// insert menu container
		var menuDiv = document.getElementById('leftnav');
		var clickableMapMenuDiv = document.createElement('div');
		var clickableMapMenuHeading = document.createElement('h3');
		clickableMapMenu = document.createElement('ul');
		clickableMapMenuDiv.id = 'clickable_map_menu';
		clickableMapMenuHeading.innerHTML = '<b>Clickable Maps v'+versionString+'</b>';
		menuDiv.appendChild(clickableMapMenuDiv);
		clickableMapMenuDiv.appendChild(clickableMapMenuHeading);
		clickableMapMenuDiv.appendChild(clickableMapMenu);

		// CREATE MENU ITEMS- [ createMenuItem( parent, id, listener, method,
		// displayText, value )]
		// appearance
		var sm = createMenuItem(clickableMapMenu, 'appearanceSubMenu', 'mouseover', function(){
		}, 'Appearance...');
		createMenuItem(sm, 'actionMenu', 'click', function(){
			setPref(this);
		}, 'Action Menu:', userPrefs['actionMenu']);
		createMenuItem(sm, 'mapBorder', 'click', function(){
			setPref(this);
		}, 'Map Border:', userPrefs['mapBorder']);
		createMenuItem(sm, 'showCrosshairs', 'click', function(){
			setPref(this);
		}, 'Show Enemy Crosshairs (Attack Phase)?<br><img border=0 height="13px" width="13px" src="'+images.enemyGifSmall+'" />', userPrefs['showCrosshairs']);
		createMenuItem(sm, 'showFromMarker', 'click', function(){
			setPref(this);
		}, 'Show From-Territory Marker (Attack/Advance/Fortify Phases)?<br><img border=0 height="15px" width="15px" src="'+images.advanceFromGif+'" />', userPrefs['showFromMarker']);
		createMenuItem(sm, 'showAdvanceToMarker', 'click', function(){
			setPref(this);
		}, 'Show Advance-To Marker (Advance Phase)?<br><img border=0 height="10px" width="10px" src="'+images.advanceToGif+'" />', userPrefs['showAdvanceToMarker']);
		createMenuItem(sm, 'showFloatingQuantity', 'click', function(){
			setPref(this);
		}, 'Show Floating Army Counter Over Map?', userPrefs['showFloatingQuantity']);
		createMenuItem(sm, 'showToolTips', 'click', function(){
			setPref(this);
		}, 'Show Help Tool-Tips?', userPrefs['showToolTips']);
		// confirmations
		sm= createMenuItem(clickableMapMenu, 'confirmationSubMenu', 'mouseover', function(){
		}, 'Confirmations...');
		createMenuItem(sm, 'confirmDeploy', 'click', function(){
			setPref(this);
		}, 'Confirm Deploy?', userPrefs['confirmDeploy']);
		createMenuItem(sm, 'confirmAssault', 'click', function(){
			setPref(this);
		}, 'Confirm Assault?', userPrefs['confirmAttack']);
		createMenuItem(sm, 'confirmAuto-Assault', 'click', function(){
			setPref(this);
		}, 'Confirm Auto-Assault?', userPrefs['confirmAuto-Attack']);
		createMenuItem(sm, 'confirmAdvance',	 'click', function(){
			setPref(this);
		}, 'Confirm Advance?', userPrefs['confirmAdvance']);
		createMenuItem(sm, 'confirmFortify',	 'click', function(){
			setPref(this);
		}, 'Confirm Reinforce?', userPrefs['confirmFortify']);
		createMenuItem(sm, 'confirmPhaseEnd', 'click', function(){
			setPref(this);
		}, 'Confirm Phase End?',	userPrefs['confirmPhaseEnd']);

		// controls
		sm= createMenuItem(clickableMapMenu, 'controlSubMenu', 'mouseover', function(){
		}, 'Controls...');
		createMenuItem(sm, 'phaseEndHotkey', 'click', function(){
			setHotkey(this);
		}, 'Phase End Hotkey:', String.fromCharCode(userPrefs['phaseEndHotkey']));
		createMenuItem(sm, 'nextGameHotkey', 'click', function(){
			setHotkey(this);
		}, 'Next Game Hotkey:', String.fromCharCode(userPrefs['nextGameHotkey']));
		createMenuItem(sm, 'jumpToMapHotkey', 'click', function(){
			setHotkey(this);
		}, 'Jump to Map Hotkey:', String.fromCharCode(userPrefs['jumpToMapHotkey']));
		createMenuItem(sm, 'refreshMapHotkey', 'click', function(){
			setHotkey(this);
		}, 'Refresh Map Hotkey:', String.fromCharCode(userPrefs['refreshMapHotkey']));
		createMenuItem(sm, 'beginTurnHotkey', 'click', function(){
			setHotkey(this);
		}, 'Begin Turn Hotkey:', String.fromCharCode(userPrefs['beginTurnHotkey']));
		createMenuItem(sm, 'increaseArmiesHotkey', 'click', function(){
			setHotkey(this);
		}, 'Increase Troops: <font style="font-weight:bold;">right-arrow</font> or ', String.fromCharCode(userPrefs['increaseArmiesHotkey']));
		createMenuItem(sm, 'decreaseArmiesHotkey', 'click', function(){
			setHotkey(this);
		}, 'Decrease Troops: <font style="font-weight:bold;">left-arrow </font> or ', String.fromCharCode(userPrefs['decreaseArmiesHotkey']));
		createMenuItem(sm, 'useMouseWheel', 'click',	function(){
			setPref(this);
		}, 'Use Mouse Wheel to Increase/Decrease Troops? ',	userPrefs['useMouseWheel']);
		createMenuItem(sm, 'deploymentClicks', 'click',	function(){
			setPref(this);
		}, 'Deployment Clicks: ',	userPrefs['deploymentClicks']);
		// help
		createMenuItem(clickableMapMenu, 'userGuide', 'click', function(){
			showUserGuide(1);
		}, 'User Guide', '');
		// update
		createMenuItem(clickableMapMenu, 'checkForUpdates', 'click', doUpgrade, 'Latest version installed', '');

		// load user prefs into menus
		for (pref in userPrefs) {
			var el = document.getElementById(pref);
			switch(pref) {
				case 'actionMenu':
					// if BOB is running, remove the action menu option to prevent
					// conflicts with BOB's HUD
					if (bob) {
						el.parentNode.removeChild(el);
						break;
					}
					switch(userPrefs[pref]) {
						case 'normal': // DO NOTHING because on initial load, it will
														// already be normal, unless someone is using
														// another script to do the same thing, in which
														// case we don't want ot undo it :)
							break;
						case 'floating':
							if (actionForm) {
								actionForm.style.width='100%';
								actionForm.style.left='0px';
								actionForm.style.position='fixed';
								actionForm.style.bottom=0;
								actionForm.style.zIndex=1;
							}
							break;
					}
					break;
				case 'mapBorder':
					// color will be set by updateAction
					var thin = '2px';
					var thick = '4px';
					switch(userPrefs[pref]) {
						case 'off':
							// do nothing
							break;
						case 'thin':
							outerMap.style.border = thin + ' solid #eeeeee';
							//outerMap.style.left = '-'+thin;
							//outerMap.style.top = '-'+thin;
							break;
						case 'thick':
							outerMap.style.border = thick + ' solid #eeeeee';
							//outerMap.style.left = '-'+thick;
							//outerMap.style.top = '-'+thick;
							break;
					}
					break;
				default:
					if (el.id.match('Hotkey')) {
						n = String.fromCharCode(userPrefs[pref]);
						if (n != String.fromCharCode('-1')) {
							el.getElementsByTagName('b')[0].innerHTML = n;
						} else {
							el.getElementsByTagName('b')[0].innerHTML = '(none)';
						}
					} else {
						if (el.id.match('confirm')) {
							// if BOB is running, then remove the confirmations that BOB also
							// has to prevent conflicts
							if (bob && ( el.id == 'confirmDeploy' || el.id == 'confirmAuto-Attack' || el.id == 'confirmPhaseEnd' )) {
								el.parentNode.removeChild(el);
								userPrefs[pref] = 'N';
							} else {
								el.getElementsByTagName('b')[0].innerHTML = userPrefs[pref];
							}
						}
					}
					break;
			}
		}
		setTimeout(checkForUpdateVersion, 1000);

		if (document.createEvent) {
						var clickablesEvent = document.createEvent("MutationEvents");
						clickablesEvent.initEvent('GMClickables', true, false);
			outerMap.dispatchEvent(clickablesEvent);
		} else if(document.createEventObject) {
			outerMap.fireEvent('GMClickables');
		}

		outerMap.addEventListener('click', onMapClick, false);
		outerMap.addEventListener('contextmenu', onMapClick, false);
		outerMap.addEventListener('mousemove', onMapMouseMove, false);
		outerMap.addEventListener('mouseout', function(){
			sprites.crosshair.style.visibility = 'hidden';
			sprites.floatingQuantity.style.visibility = 'hidden', setCursor('default');
		}, false);
		outerMap.addEventListener('DOMMouseScroll', onMouseWheel,	false);
		outerMap.addEventListener('mousewheel', onMouseWheel,	false);
		document.addEventListener('keypress', onKeyPress, false);

		document.getElementsByTagName('body')[0].addEventListener('CCGameRefresh', gameRefresh, false);

		setInterval(checkForUpdate, 250);
} // END initialize()

document.getElementById('message').addEventListener('focus', function(){
	chatHasFocus = 1;
}, false);
document.getElementById('message').addEventListener('blur', function(){
	chatHasFocus = 0;
}, false);

// DECLARATIONS
var outerMap,innerMap,mapInfo,outerMapPos,currentPlayerName,currentPlayerNumber, fortificationType,actionForm,images,fromTerritory,toTerritory,attackedFromTerritory,
attackedToTerritory,selectQuantity,selectedQuantity,actionString,doAction,chatHasFocus,userGuide,backScreen,clickableMapMenu,autoAttackData,remainingArmies,remainingArmiesD,overTerritory,armiesArray,
userPrefs,defaultPrefs = [],autoAdvance = false,autoAttackX = false,deployDeferred = false,sendingRequest = false,actionUpdated = false,
bob = false,beginTurn = false,sprites = {};


// see if bob's running, and wait for it to load before initializing
var bobCheck = setInterval(function(){
	if (document.getElementById('bobmenu')) {
		// bob is running
		bob = true;
		if (document.getElementById('magicmap') || document.getElementById('startBobLink')) {
			clearInterval(bobCheck);
			initialize();
		}
	} else {
		// bob is not running
		clearInterval(bobCheck);
		initialize();
	}
}, 250);
// the end :0)