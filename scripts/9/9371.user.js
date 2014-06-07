//
// ==UserScript==
// @name          StayFresh
// @namespace     http://codebox.no-ip.net/StayFresh
// @description   Automatically refresh pages
// @include       *

// ==/UserScript==

if (CODEBOX===undefined){
	var CODEBOX={};
}
CODEBOX.stayFresh = {
	name     : 'StayFresh',
	msgBoxId : 'CODEBOX.stayFresh.msgBox',
	 
	process  : function(){
		var refreshTimer, timeUntilRefresh, msgTimer;
		var prefsForThisPage, persistenceManager, refreshRequestSent;
		
		function makePersistenceManager(){
			persistManager = {};
			
			persistManager.havePrefs = function(){
				return !(GM_getValue(window.location) === undefined || GM_getValue(window.location) === '');
			}
			persistManager.getPrefsText = function(){
				return GM_getValue(window.location);
			}
			persistManager.savePrefsText = function(text){
				return GM_setValue(window.location, text);
			}
			persistManager.deletePrefs = function(){
			 // This won't really delete the value, but its as close as we can get
				return GM_setValue(window.location, '');
			}
			return persistManager;
		}
		
		function makePrefsObject(text, fnDoPositioning, fnSavePrefs){
			var MAX_INTERVAL = 2048;
			var MIN_INTERVAL = 1;
			var prefsObject = {};
			
		 // Default initial values
			var boxTop  = true;
			var boxLeft = true;
			var refreshInterval = 16;
			
			if (text){
			 // Some data was passed in, so try to set properties using it
			 // Should be in format: <Refresh Interval>,<Box Top>,<Box Left>
				var textParts = text.split(',');
				if (textParts.length === 3){
					var tmpInterval = Number(textParts[0]);
					if (! isNaN(tmpInterval) ){
						refreshInterval = tmpInterval;
					}
					boxTop  = (textParts[1] == 'true');
					boxLeft = (textParts[2] == 'true');
				}
			}
			
			function savePrefs(){
				if (fnSavePrefs){
					fnSavePrefs(prefsObject.toString());
				}
			}
			function moveBox(){
				if (fnDoPositioning){
					fnDoPositioning();
				}
			}
			
			prefsObject.setRefreshInterval = function(interval){
				var newInterval = Number(interval);
				if (! isNaN(newInterval) ){
					newInterval = Math.round(newInterval);
					if (newInterval > MAX_INTERVAL){
						newInterval = MAX_INTERVAL;
					}
					if (newInterval < MIN_INTERVAL){
						newInterval = MIN_INTERVAL;
					}
					if (newInterval !== refreshInterval){
						refreshInterval = newInterval;
						savePrefs();
					}
				}
			}
			prefsObject.getRefreshInterval = function(){
				return refreshInterval;
			}
			
			prefsObject.setBoxTop = function(){
				if (!boxTop){
					boxTop = true;
					moveBox();
					savePrefs();
				}
			}
			prefsObject.setBoxDown = function(){
				if (boxTop){
					boxTop = false;	
					moveBox();
					savePrefs();
				}
			}
			prefsObject.getBoxTop = function(){
				return boxTop;	
			}
			
			prefsObject.setBoxLeft = function(){
				if (!boxLeft){
					boxLeft = true;	
					moveBox();
					savePrefs();
				}
			}	
			prefsObject.setBoxRight = function(){
				if (boxLeft){
					boxLeft = false;
					moveBox();
					savePrefs();
				}
			}	
			prefsObject.getBoxLeft = function(){
				return boxLeft;	
			}
			
			prefsObject.toString = function(){
				return refreshInterval + ',' + boxTop + ',' + boxLeft;
			}
			
			savePrefs();
			
			return prefsObject;
		}
		
		function handleKeyPress(event){
			if (event.ctrlKey && event.altKey) {
				var key = String.fromCharCode(event.which);
				
				if (persistenceManager.havePrefs()){
				 // Auto-Refresh is currently active
					if (event.keyCode==32) {
					 // Space bar
					 	if (prefsForThisPage.getBoxTop()){
					 		if (prefsForThisPage.getBoxLeft()){
					 			prefsForThisPage.setBoxRight();
						 	} else {
						 		prefsForThisPage.setBoxDown();	
						 	}
						 	
					 	} else {
							if (prefsForThisPage.getBoxLeft()){
						 		prefsForThisPage.setBoxTop();
						 	} else {
						 		prefsForThisPage.setBoxLeft();
						 	}					 		
					 	}
					 	
					} else if (event.keyCode==33) {
					 // Page Up
						var interval = prefsForThisPage.getRefreshInterval();
						prefsForThisPage.setRefreshInterval(interval * 2);
						timeUntilRefresh = prefsForThisPage.getRefreshInterval();
						showTimeLeftMsg(timeUntilRefresh);
							
					} else if (event.keyCode==34) {
					 // Page Down
						var interval = prefsForThisPage.getRefreshInterval();
						prefsForThisPage.setRefreshInterval(interval / 2);
						timeUntilRefresh = prefsForThisPage.getRefreshInterval();
						showTimeLeftMsg(timeUntilRefresh);
					 
					} else if (key=='s' || key=='S'){
					 // Ctrl-Alt-S - turns Auto-Refresh OFF
						if(refreshTimer){
							window.clearInterval(refreshTimer);
							refreshTimer = null;
						}
						persistenceManager.deletePrefs();
						showTempMsg(CODEBOX.stayFresh.name + ' has been deactivated', 1000);
					}
					
				} else {
				 // Auto-Refresh is not currently active				
					if (key=='s' || key=='S') {
					 // Ctrl-Alt-S - turns Auto-Refresh ON
						activateForCurrentPage();
					} 
				}
			}
			return false;
		}
		
		function initialCheck(){
			persistenceManager = makePersistenceManager();
			if (persistenceManager.havePrefs()){
				activateForCurrentPage(persistenceManager.getPrefsText());
			}
		}
		
		function activateForCurrentPage(prefsText){
			prefsForThisPage = makePrefsObject(prefsText, positionBox, persistenceManager.savePrefsText);
			timeUntilRefresh = prefsForThisPage.getRefreshInterval();
			refreshTimer = window.setInterval(onTick, 1000);
			showMsg(CODEBOX.stayFresh.name + ' is active');
		}
		
		function onTick(){
		 // This gets called every second for pages that auto-refresh
			timeUntilRefresh--;
			if (timeUntilRefresh <= 0){
				if (!refreshRequestSent){
					showMsg('Refreshing now...');
					refreshNow();
					refreshRequestSent = true;
				}
				
			} else {
				showTimeLeftMsg(timeUntilRefresh);
			}
		}
		
		function refreshNow(){
			window.location.reload();
		}		
		
		function showTempMsg(msg, duration){
			showMsg(msg);
			window.setTimeout(clearMsg, duration);
		}		
		
		function showTimeLeftMsg(timeLeft){
			showMsg(timeLeft + ' second' + (timeLeft===1 ? '' : 's') + ' until next refresh');
		}		
		
		function showMsg(msg){
			var boxDiv = document.getElementById(CODEBOX.stayFresh.msgBoxId);			
			if (!boxDiv){
				boxDiv = document.createElement('div');
				boxDiv.setAttribute('id', CODEBOX.stayFresh.msgBoxId);
				boxDiv.style.color           = 'blue';
				boxDiv.style.border          = '1px solid blue';
				boxDiv.style.backgroundColor = '#DDDDFF'; 
				boxDiv.style.fontFamily      = 'sans-serif';
				boxDiv.style.fontSize        = '0.8em';
				boxDiv.style.position        = 'fixed';
				boxDiv.style.zIndex          = '5';
				boxDiv.style.padding         = '0.2em';
				
				positionBox(boxDiv);
				
				window.document.documentElement.appendChild(boxDiv);
			}
			boxDiv.innerHTML = msg;
		}		
		
		function positionBox(box){
			if (!box){
				box = document.getElementById(CODEBOX.stayFresh.msgBoxId);
			}
			if (box){
				box.style.top    = prefsForThisPage.getBoxTop()  ? '0.5em' : '';
				box.style.bottom = prefsForThisPage.getBoxTop()  ? ''      : '0.5em';
				box.style.left   = prefsForThisPage.getBoxLeft() ? '0.5em' : '';
				box.style.right  = prefsForThisPage.getBoxLeft() ? ''      : '0.5em';
			}
		}
		
		
		function clearMsg(){
			var boxDiv = document.getElementById(CODEBOX.stayFresh.msgBoxId);
			if (boxDiv){
				try{
					window.document.documentElement.removeChild(boxDiv);
				} catch (e){
					//ignore - the box is gone already
				}
			}
		}

		document.addEventListener('keydown', handleKeyPress, false);
		initialCheck();	
	}
	
};

CODEBOX.stayFresh.process();
