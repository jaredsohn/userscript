// ==UserScript==
// @name        Guild Wars Temple Audio Event Notifications
// @namespace   mindsoft
// @include     http://guildwarstemple.com/dragontimer/events.php?serverKey=*&langKey=en
// @version     1
// @grant		none
// ==/UserScript==

/*cookie handling for checkboxes*/
/*cookie for checkbox*/
// This function reads the cookie and checks/unchecks all elements
// that have been stored inside. It will NOT mess with checkboxes 
// whose state has not yet been recorded at all.
unsafeWindow.restorePersistedCheckBoxes = function() {
	var aStatus = getPersistedCheckStatus();
	for(var i = 0; i < aStatus.length; i++) {
		var aPair = aStatus[i].split(':');
		var el = document.getElementById(aPair[0]);
		if(el) {
			el.checked = aPair[1] == '1';
		}
	}
}

// This function takes as input an input type="checkbox" element and
// stores its check state in the persistence cookie. It is smart
// enough to add or replace the state as appropriate, and not affect
// the stored state of other checkboxes.    
unsafeWindow.persistCheckBox = function(el) {
	var found = false;
	var currentStateFragment = el.id + ':' + (el.checked ? '1' : '0');
	var aStatus = getPersistedCheckStatus();
	for(var i = 0; i < aStatus.length; i++) {
		var aPair = aStatus[i].split(':');
		if(aPair[0] == el.id) {
			// State for this checkbox was already present; replace it
			aStatus[i] = currentStateFragment;
			found = true;
			break;
		}
	}
	if(!found) {
		// State for this checkbox wasn't present; add it
		aStatus.push(currentStateFragment);
	}
	// Now that the array has our info stored, persist it
	setPersistedCheckStatus(aStatus);
	check();
}

// This function simply returns the checkbox persistence status as
// an array of strings. "Hides" the fact that the data is stored
// in a cookie.
function getPersistedCheckStatus() {
	var stored = getPersistenceCookie();
	return stored.split(',');
}

// This function stores an array of strings that represents the 
// checkbox persistence status. "Hides" the fact that the data is stored
// in a cookie.
function setPersistedCheckStatus(aStatus) {
	setPersistenceCookie(aStatus.join(','));
}

// Retrieve the value of the persistence cookie.
function getPersistenceCookie()
{
  // cookies are separated by semicolons
  var aCookie = document.cookie.split('; ');
  for (var i=0; i < aCookie.length; i++)
  {
	// a name/value pair (a crumb) is separated by an equal sign
	var aCrumb = aCookie[i].split('=');
	if ('JS_PERSISTENCE_COOKIE' == aCrumb[0]) 
	  return unescape(aCrumb[1]);
  }
  return ''; // cookie does not exist
}

// Sets the value of the persistence cookie.
// Does not affect other cookies that may be present.
function setPersistenceCookie(sValue) {
	document.cookie = 'JS_PERSISTENCE_COOKIE=' + escape(sValue);
}

// Removes the persistence cookie.
unsafeWindow.clearPersistenceCookie = function () {
	document.cookie = 'JS_PERSISTENCE_COOKIE=' +
					  ';expires=Fri, 31 Dec 1999 23:59:59 GMT;';
}

//Global variables for notifications
var notifyAt = 2;

//Initializing arrays that will hold key values for each event
var flags = [];
var messages = [];
var infos = [];
var timers = [];
var audioPlaying = 0;
var siteDivs = new Array('thefrozenmaw', 'shadowbehemoth', 'fireelemental', 'giantjunglewurm', 'megadestroyer', 'golemmark2', 'templeofbalthazar', 'templeoflyssa', 'templeofgrenth', 'shatterer', 'tequatl', 'clawofjormag');
var names = new Array('The Frozen Maw', 'The Shadow Behemoth', 'Fire Elemental', 'Great Jungle Wurm', 'Megadestroyer Event', 'Golem Mark II', 'Temple of Balthazar', 'Temple of Lyssa', 'Temple of Grenth', 'The Shatterer', 'Tequatl the Sunless', 'Claw of Jormag');
var aliases = new Array('maw', 'behemoth', 'fire_elemental', 'wurm', 'destroyer', 'golem', 'balthazar', 'lyssa', 'grenth', 'shatterer', 'tequatl', 'jormag');
var br = document.createElement("br");

for (var i=0; i<12; i++)
{
	var event_watch = document.createElement("div");
	event_watch.innerHTML='<input type="checkbox" name="'+ aliases[i] + '_watch'+ '" id="'+ aliases[i] + '_watch'+ '" style="margin-top: 90px; margin-left:10px;" checked="true" onclick="persistCheckBox(this)">'+ 'Watch '+ names[i] + '<br />';
	document.getElementById(siteDivs[i]).appendChild(event_watch);
}

//initializing info for event: The Frozen Maw
timers['maw']="dragon10timer";
infos['maw']="dragon10info";
messages['maw']="Time Before Possible Activation";
flags['maw']=0;

//initializing info for event: Shadow Behemoth
timers['behemoth']="dragon4timer";
infos['behemoth']="dragon4info";
messages['behemoth']="Time Before 30 Min Window";
flags['behemoth']=0;

//initializing info for event: Fire Elemental
timers['fire_elemental']="dragon5timer";
infos['fire_elemental']="dragon5info";
messages['fire_elemental']="Time Before Possible Activation";
flags['fire_elemental']=0;

//initializing info for event: Great Jungle Wurm
timers['wurm']="dragon11timer";
infos['wurm']="dragon11info";
messages['wurm']="Time Before 30 Min Window";
flags['wurm']=0;

//initializing info for event: Megadestroyer Event
timers['destroyer']="dragon6timer";
infos['destroyer']="dragon6info";
messages['destroyer']="Time Before 30 Min Window";
flags['destroyer']=0;

//initializing info for event: Golem Mark II
timers['golem']="dragon12timer";
infos['golem']="dragon12info";
messages['golem']="Time Before Pre-Event";
flags['golem']=0;

//initializing info for event: Temple of Balthazar
timers['balthazar']="dragon7timer";
infos['balthazar']="dragon7info";
messages['balthazar']="2 Hour Testing Time";
flags['balthazar']=0;

//initializing info for event: Temple of Grenth
timers['grenth']="dragon8timer";
infos['grenth']="dragon8info";
messages['grenth']="2 Hour Testing Time";
flags['grenth']=0;

//initializing info for event: Temple of Lyssa
timers['lyssa']="dragon9timer";
infos['lyssa']="dragon9info";
messages['lyssa']="2 Hour Testing Time";
flags['lyssa']=0;

//initializing info for event: The Shatterer
timers['shatterer']="dragon1timer";
infos['shatterer']="dragon1info";
messages['shatterer']="Time Before Pre-Event";
flags['shatterer']=0;

//initializing info for event: Tequatl the Sunless
timers['tequatl']="dragon2timer";
infos['tequatl']="dragon2info";
messages['tequatl']="Time Before 30 Min Window";
flags['tequatl']=0;

//initializing info for event: Claw of Jormag 
timers['jormag']="dragon3timer";
infos['jormag']="dragon3info";
messages['jormag']="Time Before 1 Hour 15 Minute Window";
flags['jormag']=0;

for (i in timers)
{
	var event_audio = document.createElement("div");
	//alert(timers[i]);
	event_audio.innerHTML='<audio id="'+timers[i]+'success" preload="auto"><source src="http://www.mindsoft.gr/media/audio/events/success-'+ i +'.ogg" type="audio/ogg" /> Your browser does not support the audio element. </audio>';
	document.body.appendChild(event_audio);
}



//Declaring global functions that will be used in the script

//Function beep
//Action: will playbaack a notification for each event
//Parameter: soundObj -> audio object that will be played

function beep(soundObj, time) {
  var sound = document.getElementById(soundObj);
  setTimeout(play, time, sound);//sound.play();
}
function play(soundObj)
{
	soundObj.play();
}

//Function isTimerEnding
//Action: will check if the timer is about to end 
//Parameter: eventAlias -> the alias of the event we wish to check the timer
//Parameter: minutes -> the minutes before the timer hits zero that we wish to be notified | e.g. if we use 2 if the timer is below 2:00 the beep function will be executed
//Parameter: timerName -> Not currently used in the function but it's the full name of the Event
function isTimerEnding(eventAlias, minutes, timerName){
	var timerid=document.getElementById(timers[eventAlias]);
	var time=timerid.innerHTML;
	if((time.length<=5 && time.substring(0,2)<minutes) && document.getElementById(eventAlias+'_watch').checked)
	{
		//alert('Event is about to start:' + timerName);
		//alert(infos[timerName]);
		isCounting = document.getElementById(infos[eventAlias]).innerHTML;
		//alert(isCounting);
		if(isCounting==messages[eventAlias])
		{
			flags[eventAlias]=1;
			beep(timers[eventAlias]+'success', 3000*audioPlaying);
			audioPlaying+=1;
		}
	}
}


//Function hastimerRestarted
//Action: After the user is notified the timer is reset. This function checks if the timer has been reset so it can trigger the countdown check again.
//Parameter: eventAlias -> the alias of the event we wish to check the timer
//Parameter: minutes -> the minutes after the timer has been reset | e.g. if we use 24, if the timer is above 24:00 the countdown check will start again.
//Parameter: timerName -> Not currently used in the function but it's the full name of the Event
function hasTimerRestarted(eventAlias, minutes, timerName){
	var timerid=document.getElementById(timers[eventAlias]);
	var time=timerid.innerHTML;
	if((time.length<=5 && time.substring(0,2)>minutes))
	{
		//alert('reverse timer is working');
		flags[eventAlias]=0;
	}
}


//Function check
//Action: This function will check all timers
function check()
{
	for (var i=0; i<aliases.length; i++)
	{
		if (flags[aliases[i]]==0)
		{
//			alert('checking'+aliases[i]);
			isTimerEnding(aliases[i], notifyAt, names[i]);
		}
		else
		{
			hasTimerRestarted(aliases[i], 15, names[i]);	
		}
	}
	audioPlaying=0;
}


//Initializing checks every second
window.onload = function(){ 
   restorePersistedCheckBoxes()
   intervalhandler=window.setInterval(check,1000);
}
