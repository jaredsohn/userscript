// ==UserScript==
// @name           Pardus Clock
// @namespace      pardus.at
// @author         Rhindon
// @version        4.2
// @description    Displays tick timers for the online game Pardus
// @include        http://*.pardus.at/msgframe.php
// @include        http://*.pardus.at/main.php
// ==/UserScript==

//Set the location of your clock
var showInMsgBar   = true;
var showInRightCol = true;
var showUnderNav   = false;

//Change the "true" to "false" to hide a given counter.
var showLocalTime = true;
var showGMT       = true;
var showAP        = true;
var showBuilding  = true;
var showPlanet    = true;
var showStarbase  = true;
var showEMatter   = true;
var showMonsters  = true;

//Time Offsets (Hours)
//  To add two hours, use '2', to subtract two hours use '-2'
var OffsetAll    = 2;
var localTimeOs  = 0;
var GMTOs        = 0;
var BuildingOs   = 0;
var PlanetOs     = 0;
var StarbaseOs   = 0;

//Number of Seconds between Updates
var resolution = 1;

//
//
//End of user-editable settings
//
//

if(document.URL.indexOf('main.php')     == -1) {
  showInRightCol = false;
  showUnderNav   = false;
}

if(document.URL.indexOf('msgframe.php') == -1) {
  showInMsgBar = false;
}

window.addEventListener("load",init,false);

function setColor(id, yrate, rrate) {
  if(showInMsgBar  ) changeColor("msg_" + id, yrate, rrate);

  if(showInRightCol) changeColor("rc_"  + id, yrate, rrate);

  if(showUnderNav  ) changeColor("un_"  + id, yrate, rrate);
}

function changeColor(id, yrate, rrate) {
	x = document.getElementById(id);
	y = document.getElementById(id + "lbl");

	var timer = Number(document.getElementById(id).innerHTML.replace(':', '').replace(':', ''));
	yrate = Number(yrate);
	rrate = Number(rrate);

	if(timer > yrate) {
		x.style.color = 'white';
		y.style.color = 'white';
	}

	if(timer <= yrate && timer > rrate) {
		x.style.color = 'yellow';
		y.style.color = 'yellow';
	}

	if(timer <= rrate) {
		x.style.color = 'red';
		y.style.color = 'red';
	}
}

//by Spoilerhead 2006
//licenced by GPL v2 (and only v2!)


function showFilled(Value) {
  return (Value > 9) ? "" + Value : "0" + Value;
}

function formatTime(hours, minutes, seconds) {
  return showFilled(hours) + ":" + showFilled(minutes) + ":" + showFilled(seconds);
}

function updateHTML(id, text) {

  if(showInMsgBar   && document.getElementById("msg_" + id)) document.getElementById("msg_" + id).innerHTML = text;

  if(showInRightCol && document.getElementById("rc_"  + id)) document.getElementById("rc_"  + id).innerHTML = text;

  if(showUnderNav   && document.getElementById("un_"  + id)) document.getElementById("un_"  + id).innerHTML = text;
}


function StartClock24() {

  var hours = 0;
  var minutes = 0;
  var seconds = 0;

  dst = OffsetAll;

  TheTime = new Date;

  minutes = TheTime.getMinutes();
  seconds = TheTime.getSeconds();

  if(showLocalTime) {
    hours   = (TheTime.getHours() % 24) + localTimeOs;
    updateHTML("tim", formatTime(hours, minutes, seconds));
  }

  if(showGMT) {
    hours = TheTime.getUTCHours() + GMTOs;
    updateHTML("gmt", formatTime(hours, minutes, seconds));
  }

  hours = 0;
  seconds = 59-TheTime.getSeconds();
  
  if(showAP) {
    minutes = 5-TheTime.getMinutes() % 6;
    updateHTML("ap", formatTime(hours, minutes, seconds));
    setColor("ap", "000100", "000010");
  }

  if(showMonsters) {
    minutes = 8 - TheTime.getMinutes() % 9;
    updateHTML("mon", formatTime(hours, minutes, seconds));
    setColor("mon", "000200", "000030");
  }
  
  if(showEMatter) {
    minutes = 59-TheTime.getMinutes() % 60 + 31;
    
    if(minutes > 60) {
      minutes = minutes - 60;
      hours = hours + 1;
    }
    
    updateHTML("em", formatTime(hours, minutes, seconds));
    setColor("em", "000500", "000200");
  }

  x = TheTime.getMinutes();
  x = x - 25;
  if (x < 0)
    {
      x = x + 60;
      TheTime.setHours(TheTime.getHours()-1);
    }
  TheTime.setMinutes(x);
  
  TheTime.setHours(TheTime.getUTCHours() + dst + 3);
  minutes = 59-TheTime.getMinutes();
  seconds = 59-TheTime.getSeconds();
  
  //Building Ticks
  if(showBuilding) {
    hours = 5 - (TheTime.getHours() % 6) + BuildingOs;
    updateHTML("bui", formatTime(hours, minutes, seconds));
    setColor("bui", "001000", "000500");
  }

  //Planet Ticks
  if(showPlanet) {
    hours = 2 - ((TheTime.getHours() + 2) % 3) + PlanetOs;
    updateHTML("pl", formatTime(hours, minutes, seconds));
    setColor("pl", "001000", "000500");
  }

  //Starbase Ticks
  if(showStarbase) {
    hours = 2 - ((TheTime.getHours() + 1) % 3) + StarbaseOs;
    updateHTML("sb", formatTime(hours, minutes, seconds));
    setColor("sb", "001000", "000500");
  }

  var multiplier = seconds % resolution;
  if (multiplier < 1) {
    multiplier = resolution;
  }

  setTimeout(StartClock24,1000 * multiplier);
}

var msg_html = "";

if(showInMsgBar) {

 msg_html = "<thead><tr>";
 
 if(showLocalTime) msg_html = msg_html + "<td nowrap>&nbsp;Time:</td>";
 if(showGMT      ) msg_html = msg_html + "<td nowrap>&nbsp;GMT:</td>";
 if(showAP       ) msg_html = msg_html + "<td nowrap id=\"msg_aplbl\">&nbsp;AP:</td>"; 
 if(showBuilding ) msg_html = msg_html + "<td nowrap id=\"msg_builbl\">&nbsp;Building:</td>";
 if(showPlanet   ) msg_html = msg_html + "<td nowrap id=\"msg_pllbl\">&nbsp;Planet:</td>";
 if(showStarbase ) msg_html = msg_html + "<td nowrap id=\"msg_sblbl\">&nbsp;Starbase:</td>";
 if(showEMatter  ) msg_html = msg_html + "<td nowrap id=\"msg_emlbl\">&nbsp;E-Matter:</td>";
 if(showMonsters ) msg_html = msg_html + "<td nowrap id=\"msg_monlbl\">&nbsp;Monsters:</td>";

 msg_html = msg_html + "</tr></thead><tbody><tr>";

 if(showLocalTime) msg_html = msg_html + "<td>&nbsp;<span id=\"msg_tim\">08:13:55</span></td>";
 if(showGMT      ) msg_html = msg_html + "<td>&nbsp;<span id=\"msg_gmt\">06:13:55</span></td>";
 if(showAP       ) msg_html = msg_html + "<td>&nbsp;<span id=\"msg_ap\">00:04:04</span></td>";
 if(showBuilding ) msg_html = msg_html + "<td>&nbsp;<span id=\"msg_bui\">03:11:04</span></td>";
 if(showPlanet   ) msg_html = msg_html + "<td>&nbsp;<span id=\"msg_pl\">01:11:04</span></td>";
 if(showStarbase ) msg_html = msg_html + "<td>&nbsp;<span id=\"msg_sb\">02:11:04</span></td>";
 if(showEMatter  ) msg_html = msg_html + "<td>&nbsp;<span id=\"msg_em\">00:04:04</span></td>";
 if(showMonsters ) msg_html = msg_html + "<td>&nbsp;<span id=\"msg_mon\">00:04:04</span></td>";

 msg_html = msg_html + "</tr></tbody>";
}

var rc_html = "";
if(showInRightCol) {

  rc_html = rc_html + "<table width=\"210\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
  rc_html = rc_html + "	<tr>";
  rc_html = rc_html + "		<td style=\"background-image:url('http://static.pardus.at/images/cargo.png');background-repeat:repeat-y;background-position: 0px 0px; height: 28px; overflow: hidden;\">";
  rc_html = rc_html + "			<table align=\"center\" style=\"width: 150px; background-image:url('http://static.pardus.at/images/bgmedium.gif');\"><tr><td align=\"center\" style=\"font-family: arial; text-size: 12pt;\"><b>Clock</b></td></tr></table> ";
  rc_html = rc_html + "		</td>";
  rc_html = rc_html + "	</tr>";
  rc_html = rc_html + "	<tr>";
  rc_html = rc_html + "		<td style=\"background-image:url('http://static.pardus.at/images/panel.png');background-repeat:repeat-y\">";
 
  rc_html = rc_html + "	<table width=\"80%\" align=\"center\">";

  if(showLocalTime) rc_html = rc_html + "<tr><td nowrap>&nbsp;Time:</td>                          <td>&nbsp;<span id=\"rc_tim\">08:13:55</span></td></tr>";      
  if(showGMT      ) rc_html = rc_html + "<tr><td nowrap>&nbsp;GMT:</td>  						 <td>&nbsp;<span id=\"rc_gmt\">06:13:55</span></td></tr>";
  if(showAP       ) rc_html = rc_html + "<tr><td nowrap id=\"rc_aplbl\" >&nbsp;AP:</td>   		 <td>&nbsp;<span id=\"rc_ap\" >00:04:04</span></td></tr>";
  if(showBuilding ) rc_html = rc_html + "<tr><td nowrap id=\"rc_builbl\">&nbsp;Building:</td>  	 <td>&nbsp;<span id=\"rc_bui\">03:11:04</span></td></tr>";
  if(showPlanet   ) rc_html = rc_html + "<tr><td nowrap id=\"rc_pllbl\" >&nbsp;Planet:</td>  	 <td>&nbsp;<span id=\"rc_pl\" >01:11:04</span></td></tr>";
  if(showStarbase ) rc_html = rc_html + "<tr><td nowrap id=\"rc_sblbl\" >&nbsp;Starbase:</td>  	 <td>&nbsp;<span id=\"rc_sb\" >02:11:04</span></td></tr>";
  if(showEMatter  ) rc_html = rc_html + "<tr><td nowrap id=\"rc_emlbl\" >&nbsp;E-Matter:</td>  	 <td>&nbsp;<span id=\"rc_em\" >00:04:04</span></td></tr>";
  if(showMonsters ) rc_html = rc_html + "<tr><td nowrap id=\"rc_monlbl\">&nbsp;Monsters:</td>  	 <td>&nbsp;<span id=\"rc_mon\">00:04:04</span></td></tr>";

  rc_html = rc_html + "	</table>";

  rc_html = rc_html + "		</td>";
  rc_html = rc_html + "	</tr>";
  rc_html = rc_html + "	<tr>";
  rc_html = rc_html + "		<td>";
  rc_html = rc_html + "			<img src=\"http://static.pardus.at/images/panelbottom.png\" width=\"210\" height=\"22\">";
  rc_html = rc_html + "		</td>";
  rc_html = rc_html + "	</tr>";
  rc_html = rc_html + "</table><br /><br />";

}

var un_html = "";
if(showUnderNav) {
  un_html = "<table width=\"100%\">";
  un_html = un_html + "<tr><td style=\"width: 225px;\">&nbsp;</td><td align=\"center\">";
  un_html = un_html + "<div style=\"border: #0F0F0F ridge 4px;\">"
  un_html = un_html + "   <table border=\"0\" width=\"100%\"><thead>"

  if(showLocalTime) un_html = un_html + "<td nowrap>&nbsp;Time:</td>";
  if(showGMT      ) un_html = un_html + "<td nowrap>&nbsp;GMT:</td>";
  if(showAP       ) un_html = un_html + "<td nowrap id=\"un_aplbl\">&nbsp;AP:</td>"; 
  if(showBuilding ) un_html = un_html + "<td nowrap id=\"un_builbl\">&nbsp;Building:</td>";
  if(showPlanet   ) un_html = un_html + "<td nowrap id=\"un_pllbl\">&nbsp;Planet:</td>";
  if(showStarbase ) un_html = un_html + "<td nowrap id=\"un_sblbl\">&nbsp;Starbase:</td>";
  if(showEMatter  ) un_html = un_html + "<td nowrap id=\"un_emlbl\">&nbsp;E-Matter:</td>";
  if(showMonsters ) un_html = un_html + "<td nowrap id=\"un_monlbl\">&nbsp;Monsters:</td>";

  un_html = un_html + "</tr></thead><tbody><tr>";

  if(showLocalTime) un_html = un_html + "<td>&nbsp;<span id=\"un_tim\">08:13:55</span></td>";
  if(showGMT      ) un_html = un_html + "<td>&nbsp;<span id=\"un_gmt\">06:13:55</span></td>";
  if(showAP       ) un_html = un_html + "<td>&nbsp;<span id=\"un_ap\">00:04:04</span></td>";
  if(showBuilding ) un_html = un_html + "<td>&nbsp;<span id=\"un_bui\">03:11:04</span></td>";
  if(showPlanet   ) un_html = un_html + "<td>&nbsp;<span id=\"un_pl\">01:11:04</span></td>";
  if(showStarbase ) un_html = un_html + "<td>&nbsp;<span id=\"un_sb\">02:11:04</span></td>";
  if(showEMatter  ) un_html = un_html + "<td>&nbsp;<span id=\"un_em\">00:04:04</span></td>";
  if(showMonsters ) un_html = un_html + "<td>&nbsp;<span id=\"un_mon\">00:04:04</span></td>";

  un_html = un_html + "</tr>";
  un_html = un_html + "</table>";
  un_html = un_html + "</div><td><td style=\"width: 225px;\">&nbsp;</td></tr></table>";
}



function init() {

  if(showInMsgBar && document.URL.indexOf('msgframe.php') >= 0) {
  
    var table = document.getElementsByTagName('table');
    if(table[0].firstChild.firstChild.childNodes[2].innerHTML.replace(/^\s+|\s+$/g, '') == '')
    {
      var e = table[0].firstChild.firstChild.childNodes[2];
      var child = document.createElement('table');
      child.setAttribute('align', 'center');
      child.setAttribute('style', "background-image:url('http://static.pardus.at/images/bgmedium.gif'); border-style:ridge; border-color:#2b2b51; border-width:2px; font-weight:bold; font-size:11px; color:#CCCCCC; font-family: arial, verdana, sans-serif");
      child.setAttribute('cellpadding', '1');
      child.setAttribute('cellspacing', '0');
      child.innerHTML = msg_html;
      e.appendChild(child);
    }
  }







  if(showInRightCol && document.URL.indexOf('main.php') >= 0) {
    var div = document.getElementsByTagName('div');

    //search for the parent table of the cargo section
    var table = document.getElementsByTagName('table');

    for(i = 0; i < table.length; i++)
    {
        if(table[i].innerHTML.indexOf('cargo.png') != -1)
        var e = table[i].parentNode;
    }

    var temp = e.innerHTML;
    
    temp = rc_html + temp;
    
    e.innerHTML = temp;

  }

  if(showUnderNav && document.URL.indexOf('main.php') >= 0) {

    var child = document.createElement("div")
    child.setAttribute("class", "pardusclock");
    child.setAttribute("style", "position: absolute; top: 500px;");

    child.innerHTML = un_html

    document.body.insertBefore(child, document.body.lastChild);

  }
  
  StartClock24();
}