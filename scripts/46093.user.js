var metadata=<> 
// ==UserScript==
// @name           OGame - When Available
// @namespace      http://userscripts.org/scripts/show/46093
// @description    Adds a timer to the details of the Facilities, Researches, Shipyards, ... The timers updates every second.
// @version       Beta 4
// @include        http://uni42.ogame.org/game/index.php?page=resources*
// @include        http://uni42.ogame.org/game/index.php?page=station*
// @include        http://uni42.ogame.org/game/index.php?page=research*
// @include        http://uni42.ogame.org/game/index.php?page=shipyard*
// @include        http://uni42.ogame.org/game/index.php?page=defense*
// @exclude        http://uni42.ogame.org/game/index.php?page=resourceSettings*

// @include        http://uni6.ogame.de/game/index.php?page=resources*
// @include        http://uni6.ogame.de/game/index.php?page=station*
// @include        http://uni6.ogame.de/game/index.php?page=research*
// @include        http://uni6.ogame.de/game/index.php?page=shipyard*
// @include        http://uni6.ogame.de/game/index.php?page=defense*
// @exclude         http://uni6.ogame.de/game/index.php?page=resourceSettings*
// ==/UserScript==
</>.toString();

var SCRIPT_NAME = metadata.match(/@name\s+(.*)/)[1];
var SCRIPT_VERSION = metadata.match(/@version\s+(.*)/)[1];
var SCRIPT_URL = "http://userscripts.org/scripts/source/46093.user.js";

//====================================================================================
//			- Translation Section -
//===============================================================================
// 0 --> English
//===============================================================================
var L_UPDT_1 = new Array();
  L_UPDT_1[0] = "A new version (%newVers%) of the script "+SCRIPT_NAME+"has been found.\r\nWould you like to get it now (Ok -> Yes; Cancel -> No)?";

var L_UPDT_2 = new Array();
  L_UPDT_2[0] = "Would you like to be reminded in 24 hours ?\n(Cancel to be reminded next week only)?";

var L_ItsAvlb = new Array();
  L_ItsAvlb[0] = "It's Available!!!";
  
var L_ReadyAt = new Array();
  L_ReadyAt[0] = "Ready at";

//===============================================================================
//			- Translation Section -
//====================================================================================


var domain = window.location.href.match(/ogame.(.*)\/game/)[1];
switch(domain){
	case "org":
		lang = 0;
	break;
	default:
		lang = 0;
}

function CheckUpdates() {
	var today = new Date();
	var todayT = today.getTime();
	var get_G_update = GM_getValue('GLOBAL_update',todayT);
	
	var NextUpdate = new Date();
	var NextUpdateT;
	
	if (todayT >= get_G_update) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT_URL,
			onload: function(responseDetails) {
				var remoteVers = String(responseDetails.responseText.match(/@version\s+(.*)/)[1]);
				if (remoteVers === null) return;
				
				//alert("remoteVers="+remoteVers+"\nSCRIPT_VERSION="+SCRIPT_VERSION);
				if (remoteVers != SCRIPT_VERSION) {
					L_UPDT_1[lang] = L_UPDT_1[lang].replace(/%newVers%/,remoteVers);
					if (confirm(L_UPDT_1[lang])) {
						location.href = SCRIPT_URL;
					}
					else {
						if (confirm(L_UPDT_2[lang])) {
							NextUpdate.setDate(today.getDate()+1);
							NextUpdateT = String(NextUpdate.getTime());
							GM_setValue('GLOBAL_update',NextUpdateT);
						}
						else {
							NextUpdate.setDate(LastUpdate.getDate()+7);
							NextUpdateT = String(LastUpdate.getTime());
							GM_setValue('GLOBAL_update',NextUpdateT);
						}
					}
				}
				else {
					NextUpdate.setDate(today.getDate()+1);
					NextUpdateT = String(NextUpdate.getTime());
					GM_setValue('GLOBAL_update',NextUpdateT);
				}
			}
		});
	}
}
CheckUpdates();

var MetalStr = document.getElementById('metal_box').title.match(/<B>(.*):<\/B>/)[1];
var CrystStr = document.getElementById('crystal_box').title.match(/<B>(.*):<\/B>/)[1];
var DeutStr = document.getElementById('deuterium_box').title.match(/<B>(.*):<\/B>/)[1];
var EnergStr = document.getElementById('energy_box').title.match(/<B>(.*):<\/B>/)[1];

var MetalRate = document.getElementById('metal_box').title.match(/\(\+(.*)\)/)[1].replace(/\D/g, '');
var CrysRate = document.getElementById('crystal_box').title.match(/\(\+(.*)\)/)[1].replace(/\D/g, '');
var DeutRate = document.getElementById('deuterium_box').title.match(/\(\+(.*)\)/)[1].replace(/\D/g, '');
var rates = Array(MetalRate,CrysRate,DeutRate);

var done = false;
function Main() {
	var currMetal = new Number(document.getElementById('resources_metal').innerHTML.replace(/\D/g, ''));
	var currCrys = new Number(document.getElementById('resources_crystal').innerHTML.replace(/\D/g, ''));
	var currDeut = new Number(document.getElementById('resources_deuterium').innerHTML.replace(/\D/g, ''));
	var currs = Array(currMetal,currCrys,currDeut);


	var builds = document.getElementsByClassName("detail_screen");
	for (i in builds) {
		var miss = new Array(0,0,0);
		var missTs = new Array();
		
		missRs = builds[i].getElementsByClassName('missing_resource');
		if (missRs.length > 0) {
			for (var j=0; j < missRs.length; j++) {
				switch (missRs[j].parentNode.title.replace(/\|[\d+\.?]*\d+ /g, '')) {
					case MetalStr: k = 0; break;
					case CrystStr: k = 1; break;
					case DeutStr: k = 2; break;
					case EnergStr: k = 3; break;
				}
				
				missRhtml = missRs[j].innerHTML;
				if (missRhtml.indexOf('M') == -1) {
					miss[k] = parseInt(missRhtml.replace(/\D/g, ''));
				}
				else {
					miss[k] = parseInt(missRhtml.replace(/\D/g, '')*1000000);
				}
			}
			//alert("miss[0]="+miss[0]+"\nmiss[1]="+miss[1]+"\nmiss[2]="+miss[2]+"\nmiss.length="+miss.length);
			
			var times = Array(0,0,0);
			for (j in miss) {
				if (miss[j] > 0) times[j] = (miss[j] - currs[j]) / rates[j];
			}
			
			var timeT = Math.max(Math.max(times[0],times[1]),times[2]);
			
			if (timeT > 0) {
				var time = timeT / 24;
				var days = Math.floor(time);
				time = (time - days) * 24;
				var hours = Math.floor(time);
				time = (time - hours) * 60;
				var mins = Math.floor(time);
				time = (time - mins) * 60;
				var secs = Math.floor(time);
				
				var timeText = "";
				
				if (days >= 1) {
					timeText += days+"d ";
					timeText += hours+"h ";
					timeText += mins+"m ";
					timeText += secs+"s";
				}
				else if (hours >= 1) {
					timeText += hours+"h ";
					timeText += mins+"m ";
					timeText += secs+"s";
				}
				else if (mins >= 1) {
					timeText += mins+"m ";
					timeText += secs+"s";
				}
				else {
					timeText += secs+"s";
				}
				
				timeT = Math.floor(timeT * 60 * 60 * 1000);
				
				var readyAt = new Date(new Date().setTime(new Date().getTime() + timeT)).toLocaleString();
				
				var TimeLeftText = "Time Left: <span title=\""+L_ReadyAt+": "+readyAt+"\" class=\"time\">"+timeText+"</span>";
				var timers = document.getElementsByClassName("script_timer");
				if (!done) { 
					var x = document.createElement('li');
					x.className = "script_timer";
					x.innerHTML = TimeLeftText;
					builds[i].getElementsByTagName('ul')[1].appendChild(x);
				}
				else {
					builds[i].getElementsByTagName('ul')[1].getElementsByClassName("script_timer")[0].innerHTML = TimeLeftText;
				}
				
			}
		}
	}
	done = true;
}
Main();

function updateTime() {
	var timers = document.getElementsByClassName("script_timer");
	for (i in timers) {
		var timeText = timers[i].getElementsByClassName("time")[0].innerHTML;
		
		var tTdays = timeText.match(/(\d+)d/);
		var tThours = timeText.match(/(\d+)h/);
		var tTmins = timeText.match(/(\d+)m/);
		var tTsecs = timeText.match(/(\d+)s/);
		
		var time = -1;
		if (tTsecs != null) time += parseInt(tTsecs[1]);
		if (tTmins != null) time += tTmins[1] * 60;
		if (tThours != null) time += tThours[1] * 3600;
		if (tTdays != null) time += tTdays[1] * 86400;
		
		if (time >= 0) {
			var days = Math.floor(time/86400);
			time = time - days * 86400;
			var hours = Math.floor(time/3600);
			time = time - hours * 3600;
			var mins = Math.floor(time/60);
			time = time - mins * 60;
			var secs = Math.floor(time);
			
			timeText = "";
			if (days > 0) timeText += days+"d ";
			if (hours > 0) timeText += hours+"h ";
			if (mins > 0) timeText += mins+"m ";
			if (secs > 0) timeText += secs+"s";
			
			timers[i].getElementsByClassName("time")[0].innerHTML = timeText;
		}
		else {
			timers[i].innerHTML = L_ItsAvlb;
		}
	}
}
setInterval(updateTime, 1000);
setInterval(Main, 60010);