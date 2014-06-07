// ==UserScript==
// @name           SpeedRacingHelper
// @namespace      http://userscripts.org/users/71206
// @description    Facebook Speed Racing Helper
// @version        0.6
// @date           2009-04-01
// @creator        Paul T. Clegg
// @include        http://apps.facebook.com/speedracer/*
// @exclude		   http://apps.facebook.com/speedracer/index.php
// @exclude		   http://apps.facebook.com/speedracer/cars.php
// @exclude		   http://apps.facebook.com/speedracer/customize.php
// @exclude		   http://apps.facebook.com/speedracer/upgrades.php
// ==/UserScript==

const DEBUG = false; //Enable verbose interactive debugging?
const PATH_FRIENDS = '/speedracer/friends.php';
const PATH_RACE = '/speedracer/race.php';
const KEY_TRIM = 'trim';
const KEY_FRIEND = 'friend';
const KEY_PREV_TRIM = 'prev_trim';
const KEY_RACE_TYPE = 'race_type';
const KEY_MAX_OEM_RACES = 'max_oem_races';
const KEY_FRIENDS = 'friends';
const KEY_TRIMS = 'trims';
const KEY_CURRENT_TRIM = 'current_trim';
const KEY_OEM_RACES = 'oem_races';
const RACE_TYPE_FRIEND = 'friend';
const RACE_TYPE_OEM = 'oem';
const FRIEND_RACES_MAX = 3;
const OEM_RACES_MAX = 3;
const SHORT_INTERVAL = 30000;
const LONG_INTERVAL = 1800000;

var oemTrims = new Array('290196','290193','290194','290197','291858','291860','291862','292874','292878','292875','292879','292880','292877','293471','293472'); //Make these configurable?

var oemRaces;
if (GM_getValue(KEY_OEM_RACES) != null) {
	oemRaces = GM_getValue(KEY_OEM_RACES).split(',');
}
else {
	oemRaces = new Array(oemTrims.length);
	for (var i=0; i < oemRaces.length; i++) oemRaces[i] = 0;
}

document.getElementByXPath = 
	function(sValue, contextNode) { 
		if (contextNode == null) contextNode = this;
		var a = this.evaluate(sValue, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
		if (a.snapshotLength > 0) { 
			return a.snapshotItem(0); 
		} 
	};
	
document.getElementsByXPath = 
	function(sValue, contextNode) {
		if (contextNode == null) contextNode = this;
		var aResult = new Array();
		var a = this.evaluate(sValue, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for ( var i = 0 ; i < a.snapshotLength ; i++ ) { 
			aResult.push(a.snapshotItem(i));
		}
		return aResult;
	};

function getHref(path) { //key,value,key,value...
	var result = location.protocol + "//" + location.host + path;
	if (arguments.length > 1) {
		result += '?';
		var i=1;
		while (i < arguments.length) {
			result += arguments[i];
			if (++i < arguments.length) {
				result += '=' + arguments[i];
			}
			if (++i < arguments.length) {
				result += '&';
			}
		}
	}
	return result;
}

function getQSValue(key) {
	var result = null;
	var i = location.search.indexOf(key);
	if (i != -1) {
		i += key.length + 1;
		var j = location.search.indexOf('&',i);
		if (j != -1) {
			result = location.search.substr(i,j-i);
		}
		else { 
			result = location.search.substr(i);
		}
	}
	return result;
}
	
function friend(id, name, hp, canRace) {
	this.id = id;
	this.name = name;
	this.hp = hp;
	this.canRace = canRace;
	this.timesRaced = 0;
}

//This toString impl is to facilitate low to high hp sorting
friend.prototype.toString = function() {
   var paddedHP = (this.hp < 100) ? '99' + this.hp.toString() : this.hp.toString(); //Pad "beater" cars with "99" so they are raced after more lucrative player friend cars
   while (paddedHP.length < 4) {
      paddedHP = '0' + paddedHP; //Pad typical three-digit HP so they string sort ahead of 1000+hp cars
   } 
   return paddedHP;
}

friend.prototype.desc = function() {
	return 'id=' + this.id + ';name=' + this.name + ';hp=' + this.hp + ';canRace=' + this.canRace;
}

function getNextTrim(currentTrim) {
	if (currentTrim == null || currentTrim == 0) return oemTrims[0];
	for (var i=0; i < oemTrims.length; i++) {
		if (currentTrim == oemTrims[i]) {
			if (i < oemTrims.length - 1) {
				return oemTrims[i+1];
			}
			else {
				return null;
			}
		}
	}
	return null;
}

//Main
switch (window.location.pathname) {
	case PATH_FRIENDS :
		//Build friends array from DOM info
		var friends = new Array();
		var friendsDOM = document.getElementsByXPath("//tr[@class='friend']");
		var friendsExhausted;
		for (var i=0; i < friendsDOM.length; i++) {
			var details = document.getElementByXPath("td[@class='details']", friendsDOM[i]);
			var nameLink = document.getElementByXPath("div[@class='name']/h2/a", details);
			var id = nameLink.href.substr(nameLink.href.indexOf('id=')+3);
			var name = nameLink.textContent;
			var hp = 0;
			try {
				//Users that haven't picked a car don't have HP
				hp = parseInt(document.getElementByXPath("div[@class='stats']/span[@class='key' and contains(text(), 'Horsepower')]",details).nextSibling.textContent.replace('HP','').replace(/^\s+|\s+$/g,""));
			}
			catch(ex) {}
			var canRace = 
			   document.getElementByXPath("div[@class='racebutton']/a[@class='inputsubmit']",details) != null 
			   && hp > 0;
			friends.push(new friend(id, name, hp, canRace));
			//If any friend is showing the "No more races against users available today" message,
			//don't try to race "unranked" friends (who still have a race button as of 1/27/2009
			if (!friendsExhausted && document.getElementByXPath("div[@class='racebutton']/span[@class='exhausted_races' and contains(text(), 'No more races against users available today')]",details)) {
			   if (DEBUG) alert('No more races against users available today');
			   friendsExhausted = true;			   
			}
		}
		//Find the next lowest hp friend to race, if possible
		friends.sort();
		if (DEBUG) {
			var friendsStr;
			var canRaceAnyFriends = false;			
			for (var k=0; k < friends.length; k++) {
				if (friends[k].canRace) {
					canRaceAnyFriends = true;
					friendsStr += '\t' + friends[k].name + ' ' + friends[k].hp + 'HP\n';
				}
			}
			if (canRaceAnyFriends && !friendsExhausted) {
				alert('Friends will be raced in this order:\n' + friendsStr);
			}
			else {
				alert('No more friends to race');
			}
		}
		var foundRace = false;
		if (!friendsExhausted) {
		   for (var j=0; j < friends.length; j++) {
		   	   if (friends[j].canRace) {
				   //Found a friend to race
				   foundRace = true;
				   if (!DEBUG || confirm('Race friend ' + friends[j].name + ' with ' + friends[j].hp + 'HP?')) {
					  GM_setValue(KEY_RACE_TYPE,RACE_TYPE_FRIEND);
					  location.href = getHref(PATH_RACE, KEY_FRIEND, friends[j].id);
				   }
				   break;
			   }
		   }
		}
		if (!foundRace) {
			//Do we have OEM races?
			var maxOEMRaces = GM_getValue(KEY_MAX_OEM_RACES);
			var canRaceOEM = (maxOEMRaces == null) ? true : !maxOEMRaces;
			if (canRaceOEM) {
				//Get the next trim to race
				var trim = getNextTrim(GM_getValue(KEY_CURRENT_TRIM));
				
				//If we get back here (due to user intervention) before we're finished with max races against the trim, 
				//we'll skip ahead prematurely. oemTrims is padded with some extra values to compensate.
				
				//Race selected trim
				if (!DEBUG || confirm('Race trim ' + trim + '?')) {
					GM_setValue(KEY_RACE_TYPE,RACE_TYPE_OEM);
					location.href = getHref(PATH_RACE, KEY_TRIM, trim);
				}
			}
			else {
				//Wait, then check to see if we can race again
				if (DEBUG) {
					alert('Waiting ' + LONG_INTERVAL + ' to check for more races.');
				}
				//Reset state
				GM_setValue(KEY_RACE_TYPE, '');
				GM_setValue(KEY_CURRENT_TRIM, 0);
				GM_setValue(KEY_MAX_OEM_RACES, false);
				window.setTimeout(function() { location.href = getHref(PATH_FRIENDS); }, LONG_INTERVAL);
			}
		}
		break
	case PATH_RACE :
		var raceType = GM_getValue(KEY_RACE_TYPE);
		var submit;
		if (raceType == RACE_TYPE_FRIEND) {
		    submit = document.getElementByXPath("//input[@class='inputsubmit' and @value='Click to Race! (Text)']");
			if (submit != null) {
				//Race friend
				if (!DEBUG || confirm('Race this friend?')) {
					submit.click();
				}
			}
			else {
				//Can't race this friend anymore today
				if (!DEBUG || confirm('No more races against this friend today.')) {
					location.href = getHref(PATH_FRIENDS);
				}
			}
		}
		else if (raceType == RACE_TYPE_OEM) {
		    submit = document.getElementByXPath("//input[@class='inputsubmit']");
			//Determine current trim
			if (getQSValue(KEY_TRIM) != null) {
				GM_setValue(KEY_CURRENT_TRIM,getQSValue(KEY_TRIM));
			}
			var currentTrim = GM_getValue(KEY_CURRENT_TRIM);
			if (submit != null) {
				//Race trim
				if (!DEBUG || confirm('Race this trim?')) {
					submit.click();
				}
			}
			else {
				var maxOEMRaces = document.getElementByXPath("//div[@class='status']/h2[contains(text(),'maximum') and not(contains(text(),'trim'))]");
				if (maxOEMRaces == null) {
					//Look for the "Race a XYZ again" link
					var resultsBox = document.getElementByXPath("//div[@class='results_box']");
					var raceAgainLink = document.getElementByXPath("//a[contains(text(),'Race') and contains(text(),'again')]");
					if (raceAgainLink != null) {
						//Race currentTrim again
						if (!DEBUG || confirm('Race ' + currentTrim + ' again?')) {
							location.href = raceAgainLink.href;
						}
					}
					else {
						//Return to friends, indicating the trim used
						if (!DEBUG || confirm('No more races against this trim today.')) {
							
							//TODO: Inspect page to see if we can race the same trim or need to select the next trim
							var nextTrim = getNextTrim(currentTrim);
							GM_setValue(KEY_CURRENT_TRIM,0);
							if (nextTrim != null) {
								if (!DEBUG || confirm('Race next trim ' + nextTrim + '?')) {
									location.href = getHref(PATH_RACE, KEY_TRIM, nextTrim);
								}
							}
							else {
								//Not at max OEM races, but we ran out of known trims due to weirdness
								alert('Out of known trims for today');
							}
						}
					}
				}
				else {
					//Return to friends, indicating that we're out of OEM races
					if (!DEBUG || confirm('No more OEM races today.')) {
						GM_setValue(KEY_CURRENT_TRIM,0);
						GM_setValue(KEY_MAX_OEM_RACES, true);
						location.href = getHref(PATH_FRIENDS);
					}
				}
			}
		}
		else {
			//Bounce to friends to determine appropriate action
			if (!DEBUG || confirm('Returning to Friends to determine action...')) {
				location.href = getHref(PATH_FRIENDS);
			}
		}
		break
	default:
		//TODO: Include and recover from FB error pages
		break
}


