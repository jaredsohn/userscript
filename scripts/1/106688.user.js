// ==UserScript==
// @name          Super bars for Spybattle: 2165, and Star Pirates.
// @version       1.2.9
// @author        zeel
// @description	  Calculates recharge times with greater accuracy than any other script, SA or not. And timers are displayed beneeth each stat. The timers count down to full, and the bars will fill up over time. There is also a second active clock added beneeth the time stamp. Another timer tells you how long until you may attack again. Full bars are colored differently so they stand out. You can adjust the colors to whatever you want.
// @include       *.spybattle.*
// @exclude       *.spybattle.*forums*
// @exclude       *.spybattle.*itemguide*
// @include       *.starpirates.*
// @exclude       *.starpirates.*forums*
// @exclude       *.starpirates.*itemguide*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//
//	This script contains functions taken from other userscripts, help forums, etc.
//	Quite a few are made by apt, taken from the "Gismonic lab assistant"
//
//	TO DO:
//		Other cool stuff
//
//	ChangeLog:
//		v1.2.9 : Fixed parseInt issue on numbers with leading 0s.
//
//		v1.2.8 : Fixed some CSS issues in SP when useing FF.
//
//		v1.2.7 : useing Math.ceil for energy.
//
//		v1.2.6 : Hospital, and effect counters dissapear once they expire.
//
//		v1.2.5 : Live clock turns orange at 6 minutes (dead links) red at 10 minutes (log off).
//
//		v1.2.4 : Effect timers.
//
//		v1.2.4 : Hosp time is perfect.
//
//		v1.2.3 : Changes due to SA/noto agents now only needing 20% energy to attack.
//
//		v1.2.2 : More problems with energy.
//
//		v1.2.1 : Fixed some rounding issues on energy.
//
//		v1.2.0 : Lots of little bug fixes.
//				 New timer for time until next attack is possible. 
//				 CSS fixes so SP isn't effected by certain things.
//				 Third public relese.
//				 You can no longer dissable CSS changes, but you can make them look like the original.
//
//		v1.1.0 : Second public relese.
//
//		v1.0.9 : Added Opera support.
//
//		v1.0.8 : Added ability to change non full font color, and boarder radius.
//
//		v1.0.7 : Fixed CSS support for Fire fox
//
//		v1.0.6 : Public relese.
//
//		v1.0.5 : The HP clock for dead players is hospital time.
//				 Fixed problem with time estimation.
//				 - Energy % increase is rounded up (like the server).
//				 - Research time estimation for SAs works properly (odd/even mins). 
//
//		v1.0.4 : Adjusted to work in both SB and SP.
//
//		v1.0.3 : Stealth now works properly.
//
//		v1.0.2 : Stat changes are synchronized whith the server. 
//				 - Stealth updates every 5th server min.
//
//		v1.0.1 : Research works with odd/even mins for SA.
//
//		v1.0.0 : Beta relese. Testers: not V
//
//		v0.0.1 : Said "Helo World"
//

//CSS rules
var fullBarColor = '#AF0';		//Color of a full bar. If you want no color change use 'red'
var fullBarFontColor = 'black';	//Text color on the full bar, in case you need more contrast. For no change use 'white'
var barColor = 'red';			//Color of not full bars
var barFontColor = 'white';		//Font color of not full bars
var bRadius = '8';				//Curvature of the bars ends, in PX
var clockFontColor = 'white';	//Font color for the timers

///////////////////////////////
// And now for all the code: //
///////////////////////////////

function addGlobalStyle(css) { //Implants the style elemet:
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Define all the stlys seperately so it's isn't a super long string:
if (/starpirates/.test(window.location.href)) {
	var fullBar = '.fullbar { background-color: ' + fullBarColor + ' !important; color: ' + fullBarFontColor + ' !important; position: absolute; height: 14px; } ';
	var empty_bar = '.horiz_empty_bar { position: relative; height: 14px; } ';
	var nav_percbar = '.horiz_nav_percbar { background-color: ' + barColor + ' !important; color: ' + barFontColor + ' !important; position: absolute; height: 14px; } ';
	var attklbl = '.attklbl { margin-top: 3px; font-family: verdana; } ';
	var timeTillAttack = '#timeTillAttack { color: ' + clockFontColor + '; font-weight: bold; font-size: 11px; margin-top: 9px; } ';
	var mainBox = '.mainbox { position: absolute; top: 120px; left: 167px; } .left_hintbox { position: absolute; top: 120px; } .header_hg { width: 770px !important; } ';
}
else {
	var fullBar = '.fullbar { background-color: ' + fullBarColor + ' !important; color: ' + fullBarFontColor + ' !important; position: absolute; height: 14px; -webkit-border-radius: ' + bRadius + 'px; -moz-border-radius: ' + bRadius + 'px; border-radius: ' + bRadius + 'px; } ';
	var empty_bar = '.horiz_empty_bar { position: relative; height: 14px; -webkit-border-radius: ' + bRadius + 'px; -moz-border-radius: ' + bRadius + 'px; border-radius: ' + bRadius + 'px; } ';
	var nav_percbar = '.horiz_nav_percbar { background-color: ' + barColor + ' !important; color: ' + barFontColor + ' !important; position: absolute; height: 14px; -webkit-border-radius: ' + bRadius + 'px; -moz-border-radius: ' + bRadius + 'px; border-radius: ' + bRadius + 'px; } ';
	var attklbl = '.attklbl { margin-top: 8px; font-size: 11px; } ';
	var timeTillAttack = '#timeTillAttack { color: ' + clockFontColor + '; font-weight: bold; font-size: 11px; margin-top: 1px; } ';
	var mainBox = '.mainbox { top: 180px; } .left_hintbox { position: absolute; top: 172px; } ';
}
var percbarDotcenter = '.horiz_nav_percbar .center { position: absolute; width: 71px; font-weight: bold; font-size: 11px; } ';
var clockStlye = '.clock { color: ' + clockFontColor + '; font-weight: bold; font-size: 11px; margin-left: 10px; } ';
	
addGlobalStyle(empty_bar + nav_percbar + percbarDotcenter + fullBar + clockStlye + attklbl + timeTillAttack + mainBox) //Concatinate the strings and pass them to that style function

String.prototype.sectoTime = function () { //Lets me convert numbers of seconds into readable time format

    sec_numb    = parseInt(this, 10);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}
function isMultiple(value, mul){
	if (value % mul == 0) {
		return true;
	}
	else {
		return false;
	}
}

var age = 0; //how old is the page, in seconds

headerg = document.getElementsByClassName('header_general');
clock = headerg[0].firstChild.nextSibling; 
clock.id = 'timestamp'; 

var parseClock = new RegExp('([0-9]+)-([0-9]+)-([0-9]+).([0-9]+):([0-9]+):([0-9]+)')
var timeStamp = parseClock.exec(clock.innerHTML);

//Now we get the time from the clock:
var secs = parseInt(timeStamp[6], 10); 
var mins = parseInt(timeStamp[5], 10);
var hours = parseInt(timeStamp[4], 10);
var date = timeStamp[1] + '-' + timeStamp[2] + '-' + timeStamp[3];
//alert(date + ' ' + hours + ':' + mins + ':' + secs);

var seconds = secs; 
secs = (hours * 60 * 60) + (mins * 60) + secs +'' //Calculate total seconds, for later
//Create the new live clock:
liveClock = document.createElement('div'); 
liveClock.id = 'liveClock';
liveClock.appendChild(document.createTextNode(date + ' ' + secs.sectoTime()));
clock.appendChild(liveClock);

var headers = document.getElementsByClassName('contenthead');
var contents = document.getElementsByClassName('contentcontent')
var hospCheck = new RegExp('Regenabots are working');
var effectCheck = new RegExp('(.+): ([0-9]+) minute[s]? remaining')	
for (var i in contents) {
	if (contents[i].innerHTML) {
		var checkStr = contents[i].innerHTML.substr(0, 100);
	}
	else {
		var checkStr = 'Random text #' + i;
	}
	if (hospCheck.test(checkStr)) {
		var isInHosp = true;
		var hospText = contents[i].innerHTML;

		var getStime = new RegExp('in.([0-9]+).more.minute[s]?');
		var Stime = getStime.exec(hospText);
		var hospTime = parseInt(Stime[1], 10);
		var newMsg = hospText.replace(getStime, 'in: \<span id="hospMsgTime"\>' + makeTime(hospTime) + '\</span\>');
		contents[i].innerHTML = newMsg;
		HPcontent = i;
		
		break;
	}
	else {
		var isInHosp = false;
		var hospTime = 0;
	}
}

for (var i in contents) {
	if (contents[i].innerHTML) {
		var checkStr = contents[i].innerHTML.substr(0, 100);
	}
	else {
		var checkStr = 'Random text #' + i;
	}
	if (effectCheck.test(checkStr)) {
		var isUnderEffect = true;
		EFcontent = i;
		var effects = contents[i].innerHTML.split('\<br\>');
		var newEfctMsg = '';
		for (var t in effects) {
			var effect = effectCheck.exec(effects[t]);
			effects[t] = new Object();
			effects[t].Ename = effect[1];
			effects[t].Etime = parseInt(effect[2]);
			effects[t].isUnder = true;
			
			newEfctMsg = newEfctMsg + '\<span id="effect_' + effects[t].Ename + '"\>' + effects[t].Ename + ': \<span id="effect_' + effects[t].Ename + '_timer"\>' + makeTime(effects[t].Etime) + '\</span\>\<br\>\</span\>';  
		}
		contents[i].innerHTML = newEfctMsg;
		EFcontent = i;
		EFnum = effects.length;
		
		break;
	}
	else {
		var isUnderEffect = false;
	}
}

//mainbox = document.getElementsByClassName('mainbox')
//mainbox[0].style.top = '180px'; //This will make the main body area of the page lower, so that it dose not overlap the statbox

function xpath(query) { //something apt made, I don't know what it dose
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function apt_res_get_energyHG() { //Gets the energy levels
   var tables=xpath("//table[@width='100%']");
   if(tables.snapshotLength > 0) {
     var stattable=tables.snapshotItem(1).innerHTML;
     var Rstat=new RegExp("([0-9]+).*/([0-9]+)");
     allstats=tables.snapshotItem(1).getElementsByTagName('td');
     stat=allstats[5].getElementsByTagName('div');
     energy=Rstat.exec(stat[2].innerHTML);
     apt_ene_current=parseInt(energy[1]);
     apt_ene_total=parseInt(energy[2]);
//     alert(energy[1]+"/"+energy[2]);
     return true;
   }
   return false;
}
function apt_res_get_researchHG() { //Gets the research levels
   var tables=xpath("//table[@width='100%']");
   if(tables.snapshotLength > 0) {
     var stattable=tables.snapshotItem(1).innerHTML;
     var Rstat=new RegExp("([0-9]+).*/([0-9]+)");
     allstats=tables.snapshotItem(1).getElementsByTagName('td');
     stat=allstats[4].getElementsByTagName('div');
     research=Rstat.exec(stat[2].innerHTML);
     apt_res_current=parseInt(research[1]);
     apt_res_total=parseInt(research[2]);
//     alert(research[1]+"/"+research[2]);
     return true;
   } else {
     return false;
   }
}
function apt_res_get_fuelHG() { //Gets the stealth levels
   var tables=xpath("//table[@width='100%']");
   if(tables.snapshotLength > 0) {
     var stattable=tables.snapshotItem(1).innerHTML;
     var Rstat=new RegExp("([0-9]+).*/([0-9]+)");
     allstats=tables.snapshotItem(1).getElementsByTagName('td');
     stat=allstats[3].getElementsByTagName('div');
     fuel=Rstat.exec(stat[2].innerHTML);
     apt_ful_current=parseInt(fuel[1]);
     apt_ful_total=parseInt(fuel[2]);
//     alert(fule[1]+"/"+fule[2]);
     return true;
   }
   return false;
}
function res_get_healthHG() { //Gets the health levels
   var tables=xpath("//table[@width='100%']");
   if(tables.snapshotLength > 0) {
     var stattable=tables.snapshotItem(1).innerHTML;
     var Rstat=new RegExp("([0-9]+).*/([0-9]+)");
     allstats=tables.snapshotItem(1).getElementsByTagName('td');
     stat=allstats[2].getElementsByTagName('div');
     health=Rstat.exec(stat[2].innerHTML);
     hth_current=parseInt(health[1]);
     hth_total=parseInt(health[2]);
//     alert(health[1]+"/"+health[2]);
     return true;
   }
   return false;
}
function apt_res_isNotoriousHG() { //Checks for noto/SA
        aTags=xpath("//td[@class='playerheading']");
//        alert(aTags.snapshotItem(0).innerHTML);
        var info=aTags.snapshotItem(0).getElementsByTagName('a');;
//        alert(info[1].innerHTML);
	if(info[1].getAttribute("href").substring(0,15) == 'profiles.php?id' && info[1].getAttribute("class") == "eliteplayer") {
		return true;
	} else {
        	return false;
	}
}

//Run the checks:
apt_res_get_energyHG();
apt_res_get_researchHG();
apt_res_get_fuelHG();
res_get_healthHG();

if(apt_res_isNotoriousHG() == true) {
	mult = 1.5;
	enTA = .20;		
}	
else {
	mult = 1;
	enTA = .23;
}

function makeTime(time) { //For calculateing time
	var min = Math.ceil(time);
	var sec = (min * 60) - (age + seconds);
	if (sec < 0) {
		sec = 0 + '';
	}
	else {
		sec += '';
	}
	var time = sec.sectoTime();
//	alert(time);
	return time;
}	
function makeStats(current, total, column, difx, startTime) { //Creates stat objects
	this.cur = current; //Holds what the stats level is now
	this.tot = total; //Holds what it could be
	this.col = column; //What collumn (in the <table>) the stat is in
	this.sTime = null; //Time needed to recharge when the page loads
	this.dif = difx; //How much the stat increases each time

	this.lev = curLev; //Methode defined later
	this.time = startTime; //One oth the mothodes to. . .
}
//. . .calculate initial full charge times:
function HPTime() { //Simple health formula
	if (isInHosp == true) {
		this.sTime = hospTime;
	}
	else {
		this.sTime = (this.tot - this.cur) / ((mult * 10) - 5);
	}
	return this.sTime;
}
function STHTime() { //Stealth is special, and hard to calculate charge times
	var timeEstimate = Math.ceil(((this.tot - this.cur) * 5 / (2 * mult)) / 5) * 5; //First estimate the time, based on current levels. Then increase that to a multiple of 5 min
	var X = 5 - ((Math.ceil(mins / 5) * 5) - mins); //Now we check against the clock, and find out how long it is untill the next 5 min update
	if (isMultiple(mins, 5) == true) { //If the current time is a multiple of 5 it will throw things off, so check that and if so subtract 5 from X
		X -= 5;
	}
	this.sTime = timeEstimate - X; //Now subtract X from the estimated time, to get the actual time untill full
	return this.sTime;
}
function RESTime() { //Simulates research over time. SAs update +1 on even mins, and +2 on odd mins
	if (mult == 1.5) { //Special
		var isNow = this.cur; //What the level is
		var pos = this.tot; //Max level
		var mins = document.getElementById('liveClock').innerHTML.substr(14, 2); //Grabs whether the current min iss odd or even
		mins = parseInt(mins, 10) + 1; //Adding one so that we are estimateing the coming min, not the one we are in.
		var Z = mins; //Save mins value for later
		while (isNow < pos) { //As long as research is not full
			var key = isMultiple(mins, 2); //Check if mins is even
			//Now add the apropriate number of researchpoints:
			if (key == true) { //Even mins
				isNow += 1; 
			}
			else { //Odd mins
				isNow += 2;
			}
			mins += 1; //Now add one to coun how long this takes, and so the next iteration has the opposite 'key' value from last time.
		}
		this.sTime = mins - Z; //Subtract the value Z (the original mins) from the new mins, to get elapsed time
	}
	else {
		this.sTime = this.tot - this.cur; //For non secret agents, it is just one research per min
	}
	return this.sTime; //Return that value
}
function ENTime() { //Slightly more complicated energy formula
	this.sTime = (this.tot - this.cur) / Math.ceil((this.tot * ((mult * 5) / 100)));
	return this.sTime;
}

function curLev() { //Calculats the current levels for any stat
	if (this.cur <= (this.tot - this.dif)) {
		this.cur = this.cur + this.dif;
	}
	else if (this.cur < this.tot) {
		this.cur = this.cur + (this.tot - this.cur);
	}
	else {
		this.cur = this.tot;
	}
	return this.cur;
}

var stats = new Array(); //Creates an array to hold all the stats
	//Define them:
	stats['health'] = new makeStats(hth_current, hth_total, 2, ((mult * 10) - 5), HPTime);
	stats['stealth'] = new makeStats(apt_ful_current, apt_ful_total, 3, (2 * mult), STHTime);
	stats['research'] = new makeStats(apt_res_current, apt_res_total, 4, 1, RESTime);
	stats['energy'] = new makeStats(apt_ene_current, apt_ene_total, 5, Math.ceil(apt_ene_total * ((mult * 5) / 100)), ENTime);

function addInfo(typ) { //This puts the new information in place, for each stat
	var tables=xpath("//table[@width='100%']");
	if(tables.snapshotLength > 0) {
		allstats = tables.snapshotItem(1).getElementsByTagName('td');
		stat = allstats[stats[typ].col]; //Get the propper stat
	
		stats[typ].time() //Check the initial charge time
	
		//Create the timer:
		thisStat = document.createElement('div');
		thisStat.appendChild(document.createTextNode(makeTime(stats[typ].sTime)));
		thisStat.id = typ;
		thisStat.className = 'clock';
		stat.appendChild(thisStat);
		
		//Convert the stat bar width to a %, and give it an id to use later:
		stat = allstats[stats[typ].col].getElementsByClassName('horiz_nav_percbar');
		per = Math.floor((stats[typ].cur / stats[typ].tot) * 100);
		var bar = stat[0];
		if (per == 100) {
			bar.className = 'fullbar';
		}
		bar.style.width = per + '%';
		bar.id = typ + '_bar';
		
		//And grab the % that is on there, give it an id for future use
		percent = allstats[stats[typ].col].getElementsByClassName('horiz_perc_display');
		percent[0].innerHTML = per + '%';
		percent[0].id = typ +'_per';
	}
}

//Add the stuff:
addInfo('health');
addInfo('stealth');
addInfo('research');
addInfo('energy');

tables = xpath("//table[@width='100%']");
allstats = tables.snapshotItem(1).getElementsByTagName('td');
td = allstats[6];
tXX = allstats[7];
lable = document.createElement('div');
lable.className = 'attklbl';
lable.appendChild(document.createTextNode('Attack viable:'));
timer = document.createElement('div');
timer.id = 'timeTillAttack';

var eGTime = ((stats['energy'].tot * enTA) - stats['energy'].cur) / Math.ceil((stats['energy'].tot * ((mult * 5) / 100)));
var hGTime = ((stats['health'].tot * .25) - stats['health'].cur) / ((mult * 10) - 5);

function AttackTimer(energyGoodTime, healthGoodTime, htime) { //Figures out what the maximum time is untill you can attak again. Super complicated.
	if (stats['energy'].cur >= (stats['energy'].tot * enTA)) { 			//Energy is good.
		if (isInHosp == false) { 										//Energy is good. Not dead.
			if (stats['health'].cur >= (stats['health'].tot * .25)) {	//Energy is good. Not dead. Health is Good.
				var text = 'YES';
				return text;											//YES, you can attack.
			}
			else {														//Energy is good. Not dead. Health is bad.
				return healthGoodTime;									//Return how long health needs to be ready.
			}
		}
		else {															//Energy is good. Dead.
			return htime;												//Return how long before we leave the hospital.
		}
	}
	else {																//Energy is bad.
		if (isInHosp == false) {										//Energy is bad. Not dead.
			if (stats['health'].cur >= (stats['health'].tot * .25)) {	//Energy is bad. Not dead. Health is good.
				return energyGoodTime;									//Return how long energy needs to be ready.
			}
			else {														//Energy is bad. Not dead. Health is bad.
				if (healthGoodTime > energyGoodTime) {					//Energy is bad. Not dead. Health is bad. Health will take longer to be ready.
					return healthGoodTime;								//Return how long health needs to be ready.
				}
				else {													//Energy is bad. Not dead. Health is bad. Energy will take longer to be ready.
					return energyGoodTime;								//Return how long energy needs to be ready.
				}
			}
		}
		else {															//Energy is bad. Dead.
			if (healthGoodTime > energyGoodTime) {						//Energy is bad. Dead. Helath will take longer to be ready.
				return htime;
			}															//Return how long before we leave the hospital.
			else {
				if (htime > energyGoodTime) {							//Energy is bad. Dead. Hospital will take longer to be ready.
					return htime;										//Return how long before we leave the hospital.
				}
				else {													//Energy is bad. Dead. Energy will take longer to be ready.
					return energyGoodTime;								//Return how long energy needs to be ready.
				}
			}
		}
	}
}

var attackViableTime = AttackTimer(eGTime, hGTime, hospTime)

if (attackViableTime == 'YES') {
	timer.appendChild(document.createTextNode(attackViableTime));
	timer.style.color = fullBarColor;
}
else {
	timer.appendChild(document.createTextNode('ETA: ' + makeTime(attackViableTime)));
}

td.appendChild(lable);
td.style.width = '90px';
tXX.appendChild(timer);

function fresh_bar(typ) { //Updates the stat bars/lables/%
	var per = Math.floor((stats[typ].lev() / stats[typ].tot) * 100);
	var bar = document.getElementById(typ + '_bar');
	if (per == 100) {
		bar.className = 'fullbar';
	}
	bar.style.width = per + '%';
	bar.firstChild.innerHTML = stats[typ].cur + '&nbsp;/' + stats[typ].tot;
	document.getElementById(typ + '_per').innerHTML = per + '%';
}
function fresh_time(typ) { //Updates the timers
	document.getElementById(typ).innerHTML = makeTime(stats[typ].sTime)
}
function up() { //Iterates the timers+clock once
	age += 1; //Add one second to the page age
	curTime = parseInt(secs, 10) + age +''; //Calculate what time it is basd on how long it since the page was loaded
	document.getElementById('liveClock').innerHTML = date + ' ' + curTime.sectoTime() //Update the clock
	
	//Refresh all the timers:
	fresh_time('health'); 
	if (isInHosp == true && makeTime(stats['health'].sTime) == '00:00:00') { //Check if we are still in the hospital
		stats['health'].cur = stats['health'].tot;
		fresh_bar('health');
		isInHosp = false; //We arent in there any more, so set this to false
		var hospHeader = new RegExp('(Hospital|Ship Yard)');
		for (var i in headers) {
			if (hospHeader.test(headers[i].innerHTML)){
				headers[i].style.display = 'none';
				
				break;
			}
		}
		contents[HPcontent].style.display = 'none';
	}
	if (isInHosp == true) {
		var hospMsgTime = document.getElementById('hospMsgTime');
		hospMsgTime.innerHTML = makeTime(hospTime);
	}
	fresh_time('stealth');
	fresh_time('research');
	fresh_time('energy');
	if (isUnderEffect == true) {
		for (var t in effects) {
			if (makeTime(effects[t].Etime) != '00:00:00') {
				var efctTmr = document.getElementById('effect_' + effects[t].Ename + '_timer');
				efctTmr.innerHTML = makeTime(effects[t].Etime);
			}
			else {
				document.getElementById('effect_' + effects[t].Ename).style.display = 'none';
				effects[t].idUnder = false;
				EFnum = EFnum - 1;
			}
		}
		if (EFnum == 0) { 
			var efctHeader = new RegExp('Current Effects');
			for (var i in headers) {
				if (efctHeader.test(headers[i].innerHTML)){
					headers[i].style.display = 'none';
					
					break;
				}
			}
			contents[EFcontent].style.display = 'none';
		}
	}
	var timeTillAttackClock = document.getElementById('timeTillAttack');
	if (attackViableTime == 'YES' || makeTime(attackViableTime) == '00:00:00') {
		timeTillAttackClock.innerHTML = 'YES';
		timeTillAttackClock.style.color = fullBarColor;
	}
	else {
		timeTillAttackClock.innerHTML = 'ETA: ' + makeTime(attackViableTime);
	}
	
}

//functions to submit each stat to the fresh_bar(), GM dosn't do setInterval with peramiters
function oneMin() { //HP and EN update every min
	fresh_bar('health');
	fresh_bar('energy');
	sth();
	res();
}
function sth() { //Stealth updates every 5 min
	var mins = document.getElementById('liveClock').innerHTML.substr(14, 2);
	mins = parseInt(mins, 10) + 1;
	var key = isMultiple(mins, 5);
	if (key == true) {
		fresh_bar('stealth');
	}
}
function res() { //Research updates in a funny way
	if (mult == 1.5) { //Special
		var mins = document.getElementById('liveClock').innerHTML.substr(14, 2);
		mins = parseInt(mins, 10) + 1;
		var key = isMultiple(mins, 2);
		if (key == true) { //Even mins
			fresh_bar('research');
		}
		else { //Odd mins
			fresh_bar('research');
			fresh_bar('research');
		}
	}
	else { //Not Special
		fresh_bar('research');
	}
}

window.setInterval(up, 1000); //For clocks, updates every second

function doIt() { //Will update stuff once, when the first min clears. then do everything once per min
	oneMin();
	window.setInterval(oneMin, 60000);
}

function sixMin() {
	document.getElementById('liveClock').style.color = 'orange';
}
function tenMin() {
	document.getElementById('liveClock').style.color = 'red';
}

var start = (60 - seconds) * 1000
setTimeout(doIt, start);
setTimeout(sixMin, 360000);
setTimeout(tenMin, 600000);