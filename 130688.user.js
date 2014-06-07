// ==UserScript==
// @name           Ikariam - Sound alert (Φασουλάδα)2
// @namespace
// @description    Φασουλάδα development team :)
// @include        http://s*.ikariam.*/*
// @exclude	   http://s*.ikariam.*/index.php?view=sendIKMessage*
// @exclude	   http://s*.ikariam.*/index.php?view=sendSpy*
// @exclude	   http://s*.ikariam.*/index.php?view=deployment*
// @exclude	   http://s*.ikariam.*/index.php?view=defend*
// @exclude	   http://s*.ikariam.*/index.php?view=transport*
// @exclude        http://s*.ikariam.*/index.php?view=embassyGeneralAttacksToAlly*
// @exclude	   http://support.ikariam.*/*
// @exclude	   http://board.*.ikariam.*/*
// ==/UserScript==

//-- global variables
// config # sounds, more can be found @ http://simplythebest.net/sounds/WAV/WAV_sounds.html
var sa_SoundNotify 	= 'htt';
var sa_SoundWarning = 'htt';
var sa_SoundAlert 	= 'http://www.wav-sounds.com/various/babycry.wav';
var sa_RandStart = 3; // random value start from X minutes
var sa_RandEnd = 7; // random value end at Y minutes

// !!! no modification needed under this line !!!
var sa_Time = 300; // refresh time in seconds, will be overwritten in sa_init with random value
var sa_Timeout = null; // timeout object
// state variables
var sa_Go = true; // state
var sa_Notify = 0;
var sa_Warning = 0;
var sa_Alert = 0;

//-- functions
// stop countdown
function sa_stop() { clearTimeout(sa_Timeout); sa_Go=false; }
// write notify text
function sa_write(s) { document.getElementById('sa_nlink').innerHTML = s+' &nbsp;'; }
// write time text
function sa_writetime(s) { document.getElementById('sa_slink').innerHTML = s; }
// format given time (seconds) to "Xm Ys" format
function sa_formattedtime() { var sa_min = Math.floor(sa_Time/60); var sa_sec = sa_Time - sa_min*60; return (sa_min>0?sa_min+'m ':'')+sa_sec+'s'; }
// refresh page
function sa_refresh() { sa_writetime('..refresh..'); window.location.reload(); }
// handle notifies
function sa_notify(type) { if(type=='notify') sa_Notify++; else if(type=='warning') sa_Warning++; else if(type=='alert') sa_Alert++; }
// play sound defined in parameter
function sa_sound(snd) { var embed = document.createElement('embed'); embed.setAttribute('hidden','true'); embed.setAttribute('autostart','true'); embed.setAttribute('loop','false'); embed.src = snd; document.getElementById('sa_clink').appendChild(embed); }
// make countdown cycle
function sa_countdown() {
	if(!sa_Go) return false; // check state
	// set actual remaining time
	sa_writetime(sa_formattedtime());
	sa_Time--; // prepare for next cycle
	if(sa_Time>0) {// we can continue countdown
		sa_Timeout = window.setTimeout(sa_countdown,1000);
	} else // out of time -> refresh page
		sa_refresh();
}
// click handler -> stops or restarts countdown
function sa_statechange() {
	if(sa_Go) {
		sa_stop();
		sa_writetime('..stopped..');
	} else {
		sa_Go = true;
		sa_countdown();
	}
}
// check for cities advisor
function sa_checkcities() {
	if(document.getElementById('advCities').getElementsByTagName('a')[0].getAttribute('class').indexOf('normalactive')!=-1)
		sa_notify('notify');
}
// check for military advisor
function sa_checkmilitary() {
	if(document.getElementById('advMilitary').getElementsByTagName('a')[0].getAttribute('class').indexOf('normalalert')!=-1)
		sa_notify('alert');
	else if(document.getElementById('advMilitary').getElementsByTagName('a')[0].getAttribute('class').indexOf('normalactive')!=-1)
		sa_notify('warning');
}
// check for research advisor
function sa_checkresearch() {
	if(document.getElementById('advResearch').getElementsByTagName('a')[0].getAttribute('class').indexOf('normalactive')!=-1)
		sa_notify('notify');
}
// check for diplomacy advisor
function sa_checkdiplomacy() {
	if(document.getElementById('advDiplomacy').getElementsByTagName('a')[0].getAttribute('class').indexOf('normalactive')!=-1)
		sa_notify('notify');
}
// make all checks at initial state
function sa_checkall() {
	// check advisors
	sa_checkcities();
	sa_checkmilitary();
	sa_checkdiplomacy();
	sa_checkresearch();
	// display notify/warning/alert messages and play sound
	if(sa_Alert>0) { // alert is the highest priority for military events
		sa_write('<font color="red" style="font-size:17px;text-decoration: blink;">Alert!!!</font>');
		sa_sound(sa_SoundAlert);
	} else if(sa_Warning>0) { // warning for post military events
		sa_write('<font color="orange" style="font-size:15px;text-decoration: blink;">Warning!</font>');
		sa_sound(sa_SoundWarning);
	} else if(sa_Notify>0) { // notify for other advisors
		sa_write('<font color="yellow" style="font-size:15px;text-decoration: blink;">'+sa_Notify+' Notif'+(sa_Notify>1?'ies':'y')+'</font>');
		sa_sound(sa_SoundNotify);
	}
	return (sa_Alert+sa_Warning+sa_Notify > 0);
}
// initiate script - set variables; create DOM elements, set attributes, make checks, start countdown
function sa_init() {
	// set random refresh time
	sa_Time = Math.floor((sa_RandStart+(Math.random()-0.0000001)*(sa_RandEnd-sa_RandStart))*60);
	
	// create and add custom tag to ikariam toolbar
	var clink = document.createElement('li');
	clink.setAttribute('id','sa_clink');
	clink.innerHTML = '<a id="sa_alink" href="#"><span id="sa_nlink"></span> <span id="sa_slink">..init..</span></a>';
	document.getElementById('GF_toolbar').getElementsByTagName('ul')[0].style.paddingLeft='0px';
	document.getElementById('GF_toolbar').getElementsByTagName('ul')[0].style.width='940px';
	document.getElementById('GF_toolbar').getElementsByTagName('ul')[0].appendChild(clink);
	document.getElementById('sa_clink').addEventListener('click',sa_statechange,false);
	
	// check for changes
	sa_checkall();
	
	// start countdown
	sa_countdown();
}

sa_init();