// ==UserScript==
// @name           Speed Racing Autopilot
// @namespace      SRAP
// @description    Provides the capablity of racing all your friends in your racing friend list automatically.
// @include        http://apps.facebook.com/speedracer/*
// ==/UserScript==

const VERSION 			= "2.2";
const DEBUG 			= false; 	//Enable tracing to Firebug console window
const PATH_RACE 		= '/speedracer/race.php';
const KEY_FRIEND 		= 'friend';
const SHORT_INTERVAL 	= 15000; 	// 15 secs for reinitializing if any errors 
const LONG_INTERVAL 	= 1800000; 	// 30 mins for auto-racing again
const INFO  			= 1;
const WARN  			= 2;
const ERROR 			= 3;

GLBTimeout = null;

function initialize()
{
	if (typeof(console) == "undefined") { window.console = { trace:function(){}, info:function(){}, error:function(){}, warn:function(){} }; }
	window.diagnostics = {};
	window.diagnostics.trace = function(msg, cat)
	{
		if (!DEBUG) return;
		
		if (!cat) cat = INFO;
		switch (cat)
		{
			case INFO:
				console.info(msg);
				break;
			case WARN:
				console.warn(msg);
				break;
			case ERROR:
				console.error(msg);
				break;
		}
	};

	diagnostics.trace("*** *** *** *** *** *** *** *** *** *** * ***");
	diagnostics.trace("*** Speed Racing - Auto Pilot (SRAP) 2009 ***");
	diagnostics.trace("*** Version "+VERSION);
	diagnostics.trace("*** *** *** *** *** *** *** *** *** *** * ***");
	
	diagnostics.trace("SRAP: Initializing ***");
}

friend = function(id, name, hp, canRace) 
{
	this.id = id;
	this.name = name;
	this.hp = hp;
	this.canRace = canRace;
	this.timesRaced = 0;
};

//This toString impl is to facilitate low to high hp sorting
friend.prototype.toString = function() 
{
   var paddedHP = (this.hp < 100) ? '99' + this.hp.toString() : this.hp.toString(); //Pad "beater" cars with "99" so they are raced after more lucrative player friend cars
   while (paddedHP.length < 4) {
	  paddedHP = '0' + paddedHP; //Pad typical three-digit HP so they string sort ahead of 1000+hp cars
   } 
   return paddedHP;
};

friend.prototype.desc = function() 
{
	return 'id=' + this.id + ';name=' + this.name + ';hp=' + this.hp + ';canRace=' + this.canRace;
};

document.getElementByXPath = function(sValue, contextNode) 
{ 
	if (contextNode == null) contextNode = this;
	var a = this.evaluate(sValue, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
	if (a.snapshotLength > 0) 
	{ 
		return a.snapshotItem(0); 
	} 
};

document.getElementsByXPath = function(sValue, contextNode) 
{
	if (contextNode == null) contextNode = this;
	var aResult = new Array();
	var a = this.evaluate(sValue, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i = 0 ; i < a.snapshotLength ; i++ ) 
	{ 
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

function processRace()
{	
	diagnostics.trace("SRAP: processRace()");
		
	if (raceFriend()) 
	{		
		return;
	}
	
	diagnostics.trace("SRAP: building friend list..");

	//Build friends array from DOM info
	var friends = new Array();
	var friendsDOM = document.getElementsByXPath("//tr[@class='friend']");
	var friendsExhausted = false;
	var frd = null;
	
	diagnostics.trace("SRAP: there are "+friendsDOM.length+" friends");
	
	for (var i=0; i < friendsDOM.length; i++) 
	{
		var details = document.getElementByXPath("td[@class='details']", friendsDOM[i]);
		var nameLink = document.getElementByXPath("div[@class='name']/h2/a", details);
		var id = nameLink.href.substr(nameLink.href.indexOf('id=')+3);
		var name = nameLink.textContent;
		
		//console.info("SRAP: checking friend "+name+ " ; id "+id);

		//If any friend is showing the "No more races against users available today" message,
		//don't try to race "unranked" friends (who still have a race button as of 1/27/2009			
		if (document.getElementByXPath("div[@class='racebutton']/span[@class='exhausted_races' and contains(text(), 'No more races')]",details)) 
		{
		   //diagnostics.trace("SRAP: you raced this friend already "+name);
		   continue; // next friend
		}

		if (document.getElementByXPath("div[@class='racebutton']/form/input[@class='inputsubmit' and contains(@value, 'Race')]",details) == null) 
		{
			friendsExhausted = friends.length==0;
			if (friendsExhausted) 
			{	
				diagnostics.trace("SRAP: list exhausted or you have run out of fuel", ERROR);
				break;
			}
		}
		
		var hp = 0;
		try 
		{
			//Users that haven't picked a car don't have HP
			hp = parseInt(document.getElementByXPath("div[@class='stats']/span[@class='key' and contains(text(), 'Horsepower')]",details).nextSibling.textContent.replace('HP','').replace(/^\s+|\s+$/g,""));
		}
		catch(ex) {}
		
		var canRace = 
		   (document.getElementByXPath("div[@class='racebutton']/form/input[@class='inputsubmit']",details) != null) 
		   && hp > 0;
		   
		//diagnostics.trace("SRAP: friend "+name+" can race: "+(canRace?"Yes":"No"));
		   
		frd = new friend(id, name, hp, canRace);
		
		//diagnostics.trace("SRAP: added friend: "+frd.desc());
		
		friends.push(frd);
	}
	
	if (!friendsExhausted) diagnostics.trace("SRAP: total friends that can race: "+friends.length);
	
	//Find the next lowest hp friend to race, if possible
	friends.sort();
	
	if (DEBUG) 
	{
		/*
		var friendsStr;
		var canRaceAnyFriends = false;			
		for (var k=0; k < friends.length; k++) {
			if (friends[k].canRace) {
				canRaceAnyFriends = true;
				friendsStr += friends[k].name + ' ' + friends[k].hp + 'HP\n';
			}
		}
		
		if (canRaceAnyFriends && !friendsExhausted) 
		{
			diagnostics.trace('SRAP: Friends will be raced in this order:\n' + friendsStr);
		}
		/**/
	}
		
	if (!friendsExhausted) 
	{
	   diagnostics.trace('SRAP: picking a friend to race..');
	   var foundRace = false;
	   for (var j=0; j < friends.length; j++) 
	   {
		   if (friends[j].canRace) 
		   {
				//Found a friend to race
				foundRace = true;
				var href = getHref(PATH_RACE, KEY_FRIEND, friends[j].id);
				var msg = friends[j].name + ' with ' + friends[j].hp + 'HP\n'+href;
				diagnostics.trace('SRAP: racing this friend '+msg);
				location.href = href;
				return;
		   }
	   }
		if (!foundRace) 
		{
			diagnostics.trace('SRAP: no more friends to race', WARN);
		}
	}
	
	diagnostics.trace('SRAP: waiting ' + LONG_INTERVAL + ' to check for more races.', WARN);
	// clear watchdog timer
	if (GLBTimeout) clearTimeout(GLBTimeout);
	// wait, then check to see if we can race again
	window.setTimeout(function() { location.href = getHref(PATH_RACE); }, LONG_INTERVAL);
}

function raceFriend()
{
	diagnostics.trace("SRAP: raceFriend()");
	
	var submit;
	submit = document.getElementByXPath("//input[@class='inputsubmit' and @value='Click to Race! (Text)']");
	if (submit != null)
	{
		diagnostics.trace("SRAP: start to race...");
		submit.click();
		diagnostics.trace("SRAP: racing in progress...");
		return true;
	}
	
	var reg = /Race .* again/gi;
	submit = document.getElementByXPath("//input[@class='inputsubmit' and contains(@value, 'Race')]");	
	if (submit != null)
	{		
		if (reg.test(submit.value))
		{		
			diagnostics.trace("SRAP: start to race this friend again...");
			submit.click();
			diagnostics.trace("SRAP: racing in progress...");
			return true;
		}
	}
	
	var resultBox = document.getElementByXPath("//div[@class='results_box']");
	if (resultBox)
	{
		diagnostics.trace("SRAP: reloading...");
		location.href = getHref(PATH_RACE);
		return true;
	}

	diagnostics.trace("SRAP: not racing now; checking friend list first...", WARN);
	return false;
}

//Main
(function main()
{
	initialize();
		
	// to avoid any error that might block the script
	GLBTimeout = setTimeout(function(){ location.href = getHref(PATH_RACE); }, SHORT_INTERVAL);
	
	var path = window.location.pathname;
	var fullHref = window.location.href;
	diagnostics.trace("SRAP: path="+path);
	
	if (path == PATH_RACE)
	{ 
		processRace(); 	
	} 
})();