// ==UserScript==
// @name           The (MASSIVE) Megaladon of Scripts (The Collection), Part One - by DaRealest
// @namespace      GLB
// @description    This is a collection of some of my favorite scripts, all rolled into one, and will be VERY helpful to Team Owners and GM's.
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @include        http://goallineblitz.com/game/*
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @include        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// @include        http://goallineblitz.com/game/team_player_stats.pl?team_id=*
// @include        http://goallineblitz.com/game/stadium.pl?team_id=*
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp&hide=1
// @include        http://goallineblitz.com/game/login.pl
// @include        http://goallineblitz.com/game/replay*
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp&quarter=*
// @include        http://216.245.193.2/game/game.pl?game_id=*&mode=pbp
// @include        http://216.245.193.2/game/game.pl?game_id=*&mode=pbp&quarter=*
// @include        http://216.245.193.2/game/team.pl?team_id=*
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp*
// @include        http://goallineblitz.com/game/stats.pl?*
// @include        http://goallineblitz.com/game/team.pl?*
// ==/UserScript==

// ==UserScript==

// @name           Add Agent to Roster

// @namespace      GLB

// @description    Show agent on roster page

// @include        http://goallineblitz.com/game/roster.pl?team_id=*

// ==/UserScript==

window.setTimeout( function() 
{

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var buseshort = true;
var loaded = false;

//create loadAgent link
      var loadLink = document.createElement('a');
      loadLink.setAttribute('href', '#');
      loadLink.innerHTML = "Load Agent Names";
      loadLink.addEventListener('click',loadAgents, false);

   // subhead_link_bar
   var subhead_link_bar = getElementsByClassName("subhead_link_bar", document);
   subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " | ";
   subhead_link_bar[0].appendChild(loadLink);

function getAgentName(playerId, i)
{
   GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
   headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(agntname) {
      var response1=agntname.responseText
      var agntname=response1.split('user_id=');
      var name1=agntname[1].split('">');
      var name2=name1[1].split('</');
      var container=document.getElementById('content')
      if (buseshort) {
	      var playerbox=getElementsByClassName('player_name_short',document)
      } else {
 		var playerbox=getElementsByClassName('player_name',document)
	}
      playerbox[i].innerHTML = playerbox[i].innerHTML + "<br><span style='font: 10pt black bold'>" + 

name2[0] + "</span>";
      }
   });
};



function loadAgents() {
if (!loaded) {
loaded = true;
var playernames=getElementsByClassName('player_name_short',document);
if (playernames.length == 0) {
	buseshort=false;
	var playernames=getElementsByClassName('player_name',document);
}

for (var i = 0; i < playernames.length; i++) {
   var playerInfo = playernames[i].innerHTML;
   var idlong = playerInfo.split('player_id=');
   var id = idlong[1].split('">');
   getAgentName(id, i);
}
}
};

},100);

// ==UserScript==
// @name           Alerts in Toolbar
// @namespace      GLB
// @description    Places the number of Alerts you have in the toolbar at the top of the page.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

GM_xmlhttpRequest({
method: 'GET',
url: 'http://goallineblitz.com/game/home.pl',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(inbox) {
var response1=inbox.responseText
var newmsg=response1.split('<td colspan="2" class="inbox_messages"><a href="/game/inbox.pl?alerts=1">Alerts</a>')
var newmsg1=newmsg[1].split('</td>')
var newmsgfinal=newmsg1[0]
var container=getElementsByClassName('toolbar_item',document)[6]
container.innerHTML = container.innerHTML + newmsgfinal 
}
});

// ==UserScript==
// @name           Cash To HomePage Part II
// @namespace      KMHI - Greasemonkey(props to Branden Guess)
// @description    modification of http://userscripts.org/scripts/show/27967, Adds player's cash to the home page dynamically
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==
 
var displayLocation = { BelowEnergy:false, RightOfEnergy:false, BelowXP:true};
var timeout = 0;
var displayTraining = true;
 
window.setTimeout( function() {
   var playernames=getElementsByClassName('player_name',document)
   var playertrain=getElementsByClassName('player_vitals',document)
 
   for (var i = 0; i < playernames.length; i++) {
      var playerInfo = playernames[i].innerHTML
      var playertrainInfo = playertrain[i].innerHTML
      var playerinfotrainItems = playertrainInfo.split('<td>');  
 
      var re = /\d{1,7}/;
      var playerId = playerInfo.match(re);
      if(displayLocation.BelowEnergy) {
      getCash(playerId, i, playerinfotrainItems[2]);
      }
      if(displayLocation.RightOfEnergy) {
      getCash2(playerId, i, playerinfotrainItems[2]);
      }
      if(displayLocation.BelowXP){
      getCash3(playerId, i, playerinfotrainItems[2]);
      }
   }
},timeout);
 
function getCash(playerId, i, playertrainid){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(cash) {
         var response1=cash.responseText
         var cash=response1.split('<td class="stat_head">');
         var cash1=cash[18].split('<td class="stat_value">');
         var cash2=cash1[1].split('</td>');
 
         // add cash to the page
         var playerbox=getElementsByClassName('player_vitals',document)
         playerbox[i].innerHTML = playerbox[i].innerHTML +
         "<tr><td class='player_vital_head'>Cash:</td><td>" + cash2[0] + "</td>" +
         "</tr>"
 
         // display training stat
         if(displayTraining){
            addTraining(playertrainid, cash, i);
         }
      }
   });
};
 
function getCash2(playerId, i, playertrainid){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(cash) {
         var response1=cash.responseText
         var cash=response1.split('<td class="stat_head">');
         var cash1=cash[18].split('<td class="stat_value">');
         var cash2=cash1[1].split('</td>');
 
         // add cash to the page
         var ratingbar=getElementsByClassName('rating_bar',document)
         var theCash = document.createElement('div');
         theCash.setAttribute("style","padding:5px;");
         theCash.innerHTML = "<span style='font-weight:700; padding-left:10px;'>Cash:</span><span style='padding-left:10px;'>" + cash2[0] + "</span>"
         ratingbar[i].parentNode.insertBefore(theCash, ratingbar[i].nextSibling);      
 
         // display training stat
         if(displayTraining){
            addTraining(playertrainid, cash, i);
         };
      }
   });
};
 
function getCash3(playerId, i, playertrainid){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(cash) {
         var response1=cash.responseText
         var cash=response1.split('<td class="stat_head">');
         var cash1=cash[18].split('<td class="stat_value">');
         var cash2=cash1[1].split('</td>');
 
         // add cash to the page
         var playerbox=getElementsByClassName('player_left_side',document)
         playerbox[i].innerHTML = playerbox[i].innerHTML + "<div style='font-weight:700;text-align:center'>" + cash2[0] +"</div>";
 
         // display training stat
         if(displayTraining){
            addTraining(playertrainid, cash, i);
         }
      }
   });
}
 
function addTraining(playertrainid, cash, i){
   var skillname = playertrainid.substring(0,playertrainid.indexOf(" "));   
   // determine the skill to display
   switch (skillname) {
      case "agility":
      var skill1=cash[5].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "blocking":
      var skill1=cash[2].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "carrying":
      var skill1=cash[10].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "catching":
      var skill1=cash[8].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "confidence":
      var skill1=cash[13].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "jumping":
      var skill1=cash[7].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "kicking":
      var skill1=cash[12].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "punting":
      var skill1=cash[14].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "speed":
      var skill1=cash[3].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "stamina":
      var skill1=cash[9].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "strength":
      var skill1=cash[1].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "tackling":
      var skill1=cash[4].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "throwing":
      var skill1=cash[6].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "vision":
      var skill1=cash[11].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      default:
      var skill1=cash[1].split('">');
      var skill2=skill1[1].split('</td>');
      break;
   }
   var skillratingbar=getElementsByClassName('player_vital_head',document)
   skillratingbar[1+(i*5)].parentNode.innerHTML = skillratingbar[1+(i*5)].parentNode.innerHTML.replace(skillname, skillname + " - " + skill2[0])
}
 
function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){      
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

// ==UserScript==
// @name           Contract Expiration Date
// @namespace      GLB
// @description    Contract Exp Date to homepage
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

window.setTimeout( function() 
{

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

function getExpDate(playerId, i)
{
   GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
   headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(expdate) {
      var response1=expdate.responseText
      var expdate=response1.split('/yr - Exp. ');
      var expdate1=expdate[1].split('</td>');
      var container=document.getElementById('content')
      var playerbox=getElementsByClassName('player_name',document)
      playerbox[i].innerHTML = playerbox[i].innerHTML + "&nbsp;<span class='player_xp'>" + expdate1[0] + "</span>";
      }
   });
};

var playernames=getElementsByClassName('player_name',document)

for (var i = 0; i < playernames.length; i++) {
   var playerInfo = playernames[i].innerHTML
   var re = /\d{1,7}/;
   var playerId = playerInfo.match(re);
   getExpDate(playerId, i);
};

},1000);

// ==UserScript==
// @name           Gametime Countdown
// @description    Change "next sim" times to countdowns
// @namespace      pbr
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// ==/UserScript==

var leeway = 5;

var clocks = [];
var gameTime = [];

function findChildren(parent, childClassName) {
    var children = null;
    for each(var c in parent.childNodes) {
        if (c != null) {
            if (c.className == childClassName) {
	        if (children == null) {
		    children = [];
		}
		children.push(c);
	    }
	}
    }
    return children;
}

function findChild(parent, childClassName) {
    for each(var c in parent.childNodes) {
        if (c.className == childClassName) {
	    return c;
	}
    }
    return null;
}

function getClocks() {
    var playersTable = document.getElementById("players");
    if (playersTable == null) return null;

    var player_box = findChildren(playersTable,"content_container player_box");
    if (player_box == null) return null;

    for each(var p in player_box) {
        if (p == null) continue;

	var player_content = findChild(p,"player_content");
	if (player_content == null) return null;
	
	var player_vitals = findChild(player_content,"player_vitals");
	if (player_vitals == null) return null;
	
	for each (var r in player_vitals.rows) {
	    for each (var c in r.cells) {
		if (c.innerHTML.indexOf("Next Game:") == 0) {
		    try {
			var timeLocation = c.nextSibling.nextSibling;
			clocks.push(timeLocation.lastChild);
		    }
		    catch (err) {
			console.log("BUG: Time locations has changed?");
		    }
		}
	    }
	}
    }
}

function parseClocks() {
    for each (var clock in clocks) {
        var clockString = clock.data;
	if (clockString == null) continue;

	clockString = clockString.slice(4,clockString.length-1);
	clockString = clockString.split(":");

	var hours = parseFloat(clockString[0]);
	var minutes = parseFloat(clockString[1]);
	var seconds = parseFloat(clockString[2]);
	
	var currentDate = new Date();
	var game = new Date();
	game.setHours(currentDate.getHours()+hours);
	game.setMinutes(currentDate.getMinutes()+minutes);
	game.setSeconds(currentDate.getSeconds()+seconds+leeway);
	gameTime.push(game);
    }
}

function updateClocks() {
    for (var i=0; i<clocks.length; i++) {
	var difference = gameTime[i].getTime() - new Date().getTime();
	if (difference < 0) {
	    window.location.reload();
	    return;
	}

	var hours = Math.floor(difference/1000/60/60);
	difference -= hours*1000*60*60;
	var minutes = Math.floor(difference/1000/60);
	difference -= minutes*1000*60;
	var seconds = Math.floor(difference/1000);

	if (minutes < 10) minutes = "0"+minutes;
	if (seconds < 10) seconds = "0"+seconds;

	var inetAddress = window.location+"";
	if (inetAddress.match("home.pl") != null) {
	    clocks[i].data = " (in "+hours+":"+minutes+":"+seconds+")";
	}
	else if (inetAddress.match("league.pl") != null) {
	    clocks[i].innerHTML = "Today's Games - Next sim in: "+
                                  hours+":"+minutes+":"+seconds;
	}
	else {
	    clocks[i].innerHTML = "Schedule and Scores (Next Sim: "+
		                  hours+":"+minutes+":"+seconds+")";
	}
    }
    if (clocks.length > 0) {
	var updateThread = setTimeout(updateClocks,1000);
    }
}

function getGenericClocks(str) {
    var e = document.getElementById(str);
    if (e == null) return;

    var clock = findChild(e,"medium_head");
    if (clock == null) return;

    var clockString = clock.innerHTML;
    clockString = clockString.split(":");

    var hours = parseFloat(clockString[1]);
    var minutes = parseFloat(clockString[2]);
    var seconds = parseFloat(clockString[3]);
    
    var currentDate = new Date();
    var game = new Date();
    game.setHours(currentDate.getHours()+hours);
    game.setMinutes(currentDate.getMinutes()+minutes);
    game.setSeconds(currentDate.getSeconds()+seconds+leeway);

    clocks.push(clock);
    gameTime.push(game);    
}

function getTeamClocks() {
    getGenericClocks("schedule");
}

function getLeagueClocks() {
    getGenericClocks("upcoming_games");
}

var inetAddress = window.location+"";

if (inetAddress.match("home.pl") != null) {
    getClocks();
    parseClocks();
}
else if (inetAddress.match("league.pl") != null) {
    getLeagueClocks();
}
else {
    getTeamClocks();
}

updateClocks();

// ==UserScript==
// @name           GLB Boosted Stats on Skill Points Page
// @namespace      KHMI - Greasemonkey
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// ==/UserScript==

var url = window.location.href;
var currentId = url.substring(url.indexOf('_id=')+4, url.length);

var timeout = 0;

window.setTimeout( function() {
   // get the player names from the homepage
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + currentId,
      headers: {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
           'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(playerpage) {
         addBoostedValues(playerpage.responseText);
      }
   });
},timeout); 

function addBoostedValues(responseText){
   var stats = [];
   var re = /<td class="(stat_value|stat_value_boosted)">(.+)<\/td>/g;
   var matches = responseText.match(re);
   for(var i=0;i<14;i++) {
      if(matches[i].replace(re, "$1") == "stat_value_boosted"){
         stats[i] = matches[i].replace(re, "$2")
      }else{
         stats[i] = "";
      }
   }
   
   // get the attributes
   var attribute_name = getElementsByClassName("attribute_name", document);
   var attribute_value = getElementsByClassName("attribute_value", document);
   //<td class="attribute_value" id="strength">39</td>
   for(var i = 0;i<attribute_value.length;i++){
      switch(attribute_name[i].innerHTML){
         case "Strength":
            if(stats[0] != ""){
               attribute_value[i].setAttribute("title",stats[0]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Blocking":
            if(stats[1] != ""){
               attribute_value[i].setAttribute("title",stats[1]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Speed":
            if(stats[2] != ""){
               attribute_value[i].setAttribute("title",stats[2]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Tackling":
            if(stats[3] != ""){
               attribute_value[i].setAttribute("title",stats[3]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Agility":
            if(stats[4] != ""){
               attribute_value[i].setAttribute("title",stats[4]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Throwing":
            if(stats[5] != ""){
               attribute_value[i].setAttribute("title",stats[5]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Jumping":
            if(stats[6] != ""){
               attribute_value[i].setAttribute("title",stats[6]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Catching":
            if(stats[7] != ""){
               attribute_value[i].setAttribute("title",stats[7]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Stamina":
            if(stats[8] != ""){
               attribute_value[i].setAttribute("title",stats[8]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Carrying":
            if(stats[9] != ""){
               attribute_value[i].setAttribute("title",stats[9]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Vision":
            if(stats[10] != ""){
               attribute_value[i].setAttribute("title",stats[10]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Kicking":
            if(stats[11] != ""){
               attribute_value[i].setAttribute("title",stats[11]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Confidence":
            if(stats[12] != ""){
               attribute_value[i].setAttribute("title",stats[12]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Punting":
            if(stats[13] != ""){
               attribute_value[i].setAttribute("title",stats[13]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
      }      
   }
}

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

// ==UserScript==
// @name           GLB Player Compare
// @namespace      KHMI - Greasemonkey
// @description    Compare other players with your own pinned player.
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==
 
var timeout = 0;
 
window.setTimeout( function() {
   // see if a pinned player exists
   var pinnedPlayer = GM_getValue("pinnedPlayer", null);

   // find the info for the current player page
   var url = window.location.href;
   var currentId = url.substring(url.indexOf('_id=')+4, url.length);

   // create the various HTML parts and add them to the subhead_link_bar
   var subhead = getElementsByClassName('subhead_link_bar',document);

   // create the pin
   var pin = document.createElement('span');
   pin.setAttribute("class","pin");
   pin.setAttribute("title","click here to pin this player");
   pin.innerHTML = "&nbsp;";
   pin.addEventListener('click', pinplayer, false);
   subhead[0].appendChild(pin);

   // create the pin field
   var pinField = document.createElement('span');
   pinField.setAttribute("id","ppin");
   pinField.addEventListener('click', pinplayer, false);
   subhead[0].appendChild(pinField);  

   // create the compare link
   var compareLink = document.createElement('span');
   compareLink.setAttribute("id","cplayer");
   compareLink.setAttribute("title","click to compare to your pinned player");
   compareLink.innerHTML = "&nbsp;";
   compareLink.addEventListener('click', createComparisons, false);

   // create the unpin field
   var unpinField = document.createElement('span');
   unpinField.setAttribute("title","click to un-pin this player");
   unpinField.setAttribute("id","unpin");
   unpinField.innerHTML = "&nbsp;";
   unpinField.addEventListener('click', unpinplayer, false);
   subhead[0].appendChild(unpinField);

   // modify the parts according to the pinned player state
   if(pinnedPlayer == undefined || pinnedPlayer == ""){
      pinField.setAttribute("class","playerpin");
      pinField.innerHTML = "click here to pin this player";
      unpinField.setAttribute("class","hide");
      compareLink.setAttribute("class","hide");
   }else{
      var stats = pinnedPlayer.split(",");
      pinField.setAttribute("class","playerpinned");
      pinField.innerHTML = stats[0];
      unpinField.setAttribute("class","unpin");
      // don't show compare link if on pinned player's page
      if(currentId != stats[1]) compareLink.setAttribute("class","comparePlayers");
   }

   // create the popup
   var popUpDiv = document.createElement('div');
   popUpDiv.setAttribute("id","popUpDiv");
   popUpDiv.setAttribute("style","display:none;background-color:#FBFBF8;");
   popUpDiv.addEventListener('click', toggle, false);

   // add compare link and popup only if stats are present
   var attTable = getElementsByClassName('player_stats_table',document);
   if(attTable.length > 0){
      var medhead = getElementsByClassName('medium_head',document);
      // must insert compare element before "Player Attributes" for float to work correctly
      medhead[1].childNodes[0].parentNode.insertBefore(compareLink, medhead[1].childNodes[0]);
      medhead[1].childNodes[0].parentNode.insertBefore(popUpDiv, medhead[1].childNodes[0]);
   }
    
   // wall of CSS
   var css = 'span.playerpin {cursor:pointer;padding:3px;font-weight:700;line-height:2em;height:25px;background-color:#D' +
      'CDCDC;color:white;float:right;text-align:center;border:1px solid #A0A0A0;}' + 
      'span.playerpinned {cursor:pointer;padding:3px;font-weight:700;line-height:2em;height:25px;background-color:#DCDCD' +
      'C;color:blue;float:right;text-align:center;border:1px solid #A0A0A0;}' + 
      'span.unpin{border:1px solid #A0A0A0;cursor:pointer;background-color:#DCDCDC;float:right;width:12px;height:12px;ba' +
      'ckground-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAK3RFWHRDcmVhdGlvbiBUaW1l' +
      'AEZyaSA0IE5vdiAyMDA1IDEyOjE2OjIzIC0wNTAwfRDJhgAAAAd0SU1FB9ULBBE1NZ/zTqgAAAAJcEhZcwAACvAAAArwAUKsNJgAAAAEZ0FNQQAAs' +
      'Y8L/GEFAAABfUlEQVR42mM8cPIkw5M7gldPvzdxs/f0ZICBg9u3MxzZxaBtyqCiwpzg6Sh1eJXE+wu/L169wc6loKoJUrFuHcO8aSqnV31/+viPpC' +
      'pzoY6cxPuTQq62rI9ufL548w678MM7d4AqdD+cZuVg57z14AmvNOOBbdsEV82U4XggpK3w7uilO9/FGX4wqHy8LMTO8PTDrzsSTgz5+Yz///8/uH0' +
      'd56pZKj9uCUnwvTv/mOHnT6gKASeGvDT7oCCG/2AANO+kv8Vbe6H/EVL/7bmf6LMesLAACkJkmeDeAdoCNIPh+Ucgk/P1bwZkADJm7doD/u5vLbgh' +
      'ZryVYvgvxfCEgeGAuztQCqiA2dHcHOSXl0eg7uA0fsUvw3fnifg/ht93737++PGhsDBzgrwoMDzEeZihfikvZ7C3f/XqDVCFKgNI3UtRURZgmD69a' +
      'vzt0tlnek4McWmQQD/IwPAM6MSDO5/Zu3OZmjKCouXOk2+nD3O5oUfLt127uExtGVRkANofwzYUjV/0AAAAAElFTkSuQmCC)}' +
      'span.comparePlayers {width:25px;height:18px;cursor:pointer;float:right;background-image:url(data:image/gif;base64' +
      ',R0lGODlhGQASAIcAAAAAAACE/+/WQv//////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////yH5BAAAAP8ALAAAAAAZABIAAAhsAAcIHAhgoMGDCA8CKJiwIUIAARg6nAgx4sKLGC82rBigo8ePHiUa5AiyZEeRA' +
      'kmaLLnw4cqVAASgHMAxo82FAmS6jJizp8+fOhXyBEo050ycRYseTUp0Js2bGXs6nUjQKFWKQa9unKo1JcKAADs=);}' +
      'span.hide {display:none;}' +
      'span.pin:hover { background-position: 0 -24px; }' +
      '#popUpDiv {padding:5px;border:1px solid #A0A0A0;position:absolute;top:100px;background-color:#eeeeee;width:800px;' +
      'height:235px;z-index: 9002;}' +
      'span.pin{cursor:pointer;position:relative;top:-15px;left:-7px;float:right;width:18px;height:24px;background-image' +
      ':url(data:image/gif;base64,R0lGODlhEgAwAIcAAEoQCFoxIWMAAGMICGMQEGMhEGMpIWsAAGsACGs5KWtjWnMAAHMIAHMICHMxOXNKSnNjY3' +
      'sAAHsACHsIAHsICHsYEHs5KXtCEHtSOYQAAIQICIRCQoRaQowACIwIAIwICIwYGIwpIYxaUpQACJQIAJQICJQIEJRKOZRjGJRjSpSUlJwICJwQEJw' +
      'YGJwhGJwhIZwxKZw5MZxSQqUICKUQCKUYIaUhEKUhGKUpKaVCOaVSQq0QEK0YCK0YEK0hEK0hGK1CMa1KOa1SOa1SQq1aQq1jSrUYGLUhGLUhIbUp' +
      'IbU5KbVCObVSQrVaQrVaSrVjSrV7Wr0hKb0pEL0pGL0xMb1SQr1aSr1jSr1rWr2EY8YhGMYpGMYpIcYxGMZKOcZrUsZzWsZ7Y84xIc45Ic6Ma9YxI' +
      'dY5IdZCIdZaUv//9/////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '/////////////////////////////////////////////////////////////////////////////////////////////////////////////////' +
      '////////////////////////////////////////////////v7+CH5BAMAAP8ALAAAAAASADAAAAj/AP8JHEiwoEGCAQ5QANHiRYiDBBsI0HDkx4s' +
      'gMSAKrNCAixkzRn4sYaKRwAGPH42wqOJE44EpZs6cEdPjxpUiBlGQOPDjTJcpU7j0AALGYAEBJpBQUWJjRQ8WGp4MtLDggAYJU1hE8ZLkBoEGFL4I' +
      'FCFAwIcIP8Z8KMECDZkvOoaEEUghgpgxLLiM+VEiggMoWchkGfih5xkuiH98OCDjIAgfMqf0UPkBxBWIdsec6dFipJOWBzd8qJgVx+cmGgc8LbFiR' +
      'IYDMDT+U5DjhYYIBxaIhahCoIETQ4pg0AhBgezjyJMrX868+cA0yxMubPhQtkSKFjHK5ogy5MiSJz+Ch1wJ2uCFlzFn1rxC5ODOnj+DDi1aEABSpU' +
      'ydQpUqsEDVq1ltlUQNAxzQwG4PlHVWWmu1BUURJ+iABV2Z5bVXXwZggEEKHBBmGGJcKHbACY5BdoZklFmG2V2bdcbEZxA5MNoPpZ2mkQCrtfZabBo' +
      'pEINtuC1wGW8CAWCBDEUk4NySTDbp5HIBAQA7);}';
    
   // add wall of CSS to the page
   addGlobalStyle(css);
},timeout);
 
function createComparisons(){
   var popUpDiv = document.getElementById("popUpDiv");
   if ( popUpDiv.style.display == 'none' ){   
      // get the pinned player stats
      var pinnedPlayer = GM_getValue("pinnedPlayer", null);
      var ppStats = pinnedPlayer.split(",");
      
      // build the comparison table   
      popUpDiv.innerHTML = '<div><table style="width:100%;background-color:white;" cellspacing="5" cellpadding="0">' +
         '<tr><td style="text-align:center;" colspan="2">'+ ppStats[0] +'</td></tr>' +
         '<tr>' + 
         '<td style="width:40%;" valign="top">'+ createStatsTable(ppStats) +'</td>' +
         '<td style="width:60%;" valign="top">'+ createTree(ppStats) +'</td>' +
         '</tr>' +
         '</table></div>';       
      
      // create the close popup link
      var closePopup = document.createElement('a');
      closePopup.setAttribute("href","#");
      closePopup.setAttribute("style","float:right;");
      closePopup.innerHTML = "click anywhere on this pop up to close";
      closePopup.addEventListener('click', toggle, false);
      var div = document.createElement('div');
      div.appendChild(closePopup);
      popUpDiv.appendChild(div);
   }
   
   toggle();
}
 
function pinplayer(){
   var url = window.location.href;
   var currentId = url.substring(url.indexOf('_id=')+4, url.length);
   
   var player_name = document.getElementById("player_name");
   var re = /\((.+)\)\s(.+)/;
   var matches = player_name.innerHTML.match(re);
   var playerName = matches[0].replace(re, "$2");
   
   // strip out any commas found in player names, comma = BAD :D
   playerName = playerName.replace(/,/g, "");
   
   var stats = [];
   // add the player's stats to the array for storage
   stats["playerName"] = playerName;
   stats["playerId"] = currentId;
   var attTable = getElementsByClassName('player_stats_table',document);
   if(attTable.length > 0){
      // get attributes
      var re = /<td class="(stat_value|stat_value_boosted)">(.+)<\/td>/g;
      var statValue = attTable[0].innerHTML.match(re);   
      stats.push(playerName);
      stats.push(currentId);
      for(var i=0;i<statValue.length;i++) {
         stats.push(statValue[i].replace(re, "$2"));
      }
      
      // get tree data
      var tree = getElementsByClassName('subhead',document);
      stats.push(tree[0].innerHTML);
      stats.push(tree[1].innerHTML);
      
      // get tree skill levels
      var skillLevel = getElementsByClassName('skill_level',document);
      for(var i=0;i<skillLevel.length;i++) {
         stats.push(skillLevel[i].innerHTML);
      }
      
      // get tree skills
      var skillTrees = document.getElementById('skill_trees_content');
      var re2 = /\/images\/game\/skills\/(.+)\.gif/g;
      var skillButtons = skillTrees.innerHTML.match(re2);
      for(var i=0;i<skillButtons.length;i++) {
         stats.push(skillButtons[i].replace(re2, "$1"));
      }

      GM_setValue("pinnedPlayer", stats.join());
    
      // change the player pin
      var ppin = document.getElementById("ppin");
      ppin.className = "playerpinned";
      ppin.innerHTML = playerName;
    
      var unpin = document.getElementById("unpin");
      unpin.className = "unpin";
   }else{
      alert("Cannot pin a player whose stats you cannot see.");
   }
}

function unpinplayer(){
   // clear the pinned player
   GM_setValue("pinnedPlayer", "");
 
   // change the player pin
   var ppin = document.getElementById("ppin");
   ppin.className = "playerpin";
   ppin.innerHTML = "click here to pin this player";
 
   var unpin = document.getElementById("unpin");
   unpin.className = "hide";
      
   var cplayer = document.getElementById("cplayer");
   cplayer.className = "hide";
}

function toggle() {   
	var popUpDiv = document.getElementById("popUpDiv");
	if ( popUpDiv.style.display == 'none' ){
      popUpDiv.style.display = 'block';
   }else{
      popUpDiv.innerHTML = '&nbsp;';
      popUpDiv.style.display = 'none';
   }
}

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};
 
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function createStatsTable(stats){
      var attTable = '<table cellspacing="0" cellpadding="0">' +
      '<tr class="nonalternating_color">' +
      '	<td colspan="2">Physical Attributes</td>' +
      '	<td>&nbsp;</td>' +
      '	<td colspan="2">Football Skills</td>' +
      '</tr>' +
      '<tr class="alternating_color1">' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Strength:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[2]+'</td>' +
      '	<td class="stat_divider">&nbsp;</td>' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Blocking:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[3]+'</td>' +
      '</tr>' +
      '<tr class="alternating_color2">' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Speed:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[4]+'</td>' +
      '	<td class="stat_divider">&nbsp;</td>' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Tackling:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[5]+'</td>' +
      '</tr>' +
      '<tr class="alternating_color1">' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Agility:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[6]+'</td>' +
      '	<td class="stat_divider">&nbsp;</td>' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Throwing:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[7]+'</td>' +
      '</tr>' +
      '<tr class="alternating_color2">' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Jumping:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[8]+'</td>' +
      '	<td class="stat_divider">&nbsp;</td>' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Catching:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[9]+'</td>' +
      '</tr>' +
      '<tr class="alternating_color1">' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Stamina:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[10]+'</td>' +
      '	<td class="stat_divider">&nbsp;</td>' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Carrying:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[11]+'</td>' +
      '</tr>' +
      '<tr class="alternating_color2">' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Vision:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[12]+'</td>' +
      '	<td class="stat_divider">&nbsp;</td>' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Kicking:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[13]+'</td>' +
      '</tr>' +
      '<tr class="alternating_color1">' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Confidence:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[14]+'</td>' +
      '	<td class="stat_divider">&nbsp;</td>' +
      '	<td class="stat_head" style="color:black;font-weight:400;">Punting:</td>' +
      '	<td class="stat_value" style="color:black;font-weight:700;">'+stats[15]+'</td>' +
      '</tr>' +
	'</table>';
   
   return attTable;
}

function createTree(stats){
   var tree = '<div id="skill_trees_box" class="content_container">' +
      '<div id="skill_trees_content">' +
      '<div class="subhead">'+ stats[16] +'</div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[28] +'.gif);"><div class="skill_level">'+ stats[18] +'</div></div>' +
         '<div class="skill_arrow"><img src="/images/game/skill_arrow.gif"></div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[29] +'.gif);"><div class="skill_level">'+ stats[19] +'</div></div>' +
         '<div class="skill_arrow"><img src="/images/game/skill_arrow.gif"></div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[30] +'.gif);"><div class="skill_level">'+ stats[20] +'</div></div>' +
         '<div class="skill_arrow"><img src="/images/game/skill_arrow.gif"></div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[31] +'.gif);"><div class="skill_level">'+ stats[21] +'</div></div>' +
         '<div class="skill_arrow"><img src="/images/game/skill_arrow.gif"></div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[32] +'.gif);"><div class="skill_level">'+ stats[22] +'</div></div>' +
      '<div style="clear: both;"></div>' +
      '<div class="subhead">'+ stats[17] +'</div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[33] +'.gif);"><div class="skill_level">'+ stats[23] +'</div></div>' +
         '<div class="skill_arrow"><img src="/images/game/skill_arrow.gif"></div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[34] +'.gif);"><div class="skill_level">'+ stats[24] +'</div></div>' +
         '<div class="skill_arrow"><img src="/images/game/skill_arrow.gif"></div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[35] +'.gif);"><div class="skill_level">'+ stats[25] +'</div></div>' +
         '<div class="skill_arrow"><img src="/images/game/skill_arrow.gif"></div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[36] +'.gif);"><div class="skill_level">'+ stats[26] +'</div></div>' +
         '<div class="skill_arrow"><img src="/images/game/skill_arrow.gif"></div>' +
         '<div class="skill_button" style="background-image: url(/images/game/skills/'+ stats[37] +'.gif);"><div class="skill_level">'+ stats[27] +'</div></div>' +
      '<div style="clear: both;"></div>' +
   '</div></div>';
   
   return tree;
}

// ==UserScript==
// @name           GLB Player Notes
// @namespace      GLB
// @description    GLB Player Notes
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==


window.setTimeout( function() 
{
var url = window.location.href;
var plyrid= url.substring(url.indexOf('_id=')+4, url.length);

//create save link
      var saveLink = document.createElement('div');
      saveLink.innerHTML = "<span style='cursor:pointer;'><u>Save Player Notes</u></span>";
      saveLink.addEventListener('click',saveNotes, false);

var container=document.getElementById('player_training_tactics')
if (!container) {
	container=document.getElementById('career_stats')	;
}

var plyrNotes = document.createElement('div');

plyrNotes.innerHTML = '<div style="clear: both;">&nbsp;</div><div class="medium_head">Player Notes</div>'  + 
	'<div id="player_notes" class="content_container">' +
	'<textarea cols=75 rows=35 id="txtNotes"></textarea>'
	'</div>'

plyrNotes.appendChild(saveLink);

container.parentNode.insertBefore(plyrNotes, container.nextSibling);

var currentNotes = GM_getValue(plyrid  + "_notes", null);

if (currentNotes != null) {
	var notesbox = document.getElementById('txtNotes');
	notesbox.value = currentNotes;	
}

function saveNotes(){
	var notesbox = document.getElementById('txtNotes');
	GM_setValue(plyrid  + "_notes",notesbox.value);
	alert ("Player note saved.");
}


},100);

// ==UserScript==
// @name           GLB Team Page Forum Link
// @namespace      KHMI - Greasemonkey
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @include        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// @include        http://goallineblitz.com/game/team_player_stats.pl?team_id=*
// @include        http://goallineblitz.com/game/stadium.pl?team_id=*
// ==/UserScript==

var timeout = 0;

window.setTimeout( function() {
   var url = window.location.href;
   var re = /team_id=(\d{1,7})/;
   var matches = url.match(re);
   var teamId = matches[1];

   // add pop up link
   var link = document.createElement('a');
   link.setAttribute('href', 'http://goallineblitz.com/game/forum_thread_list.pl?team_id=' + teamId);
   link.innerHTML = "Team Forum";

   // subhead_link_bar
   var subhead_link_bar = getElementsByClassName("subhead_link_bar", document);
   subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " | ";
   subhead_link_bar[0].appendChild(link);
},timeout);

function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){      
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

// ==UserScript==
// @name           GLB Ticker by karma99
// @namespace      www.goallineblitz.com
// @description    Shows a customized game result ticker
// @include        http://goallineblitz.com/game/*
// @exclude        http://goallineblitz.com/game/home.pl
// @exclude        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp&hide=1
// @exclude        http://goallineblitz.com/game/replay.pl?pbp_id=*
// @exclude        http://goallineblitz.com/game/login.pl
// ==/UserScript==

/*
Goal Line Blitz Score Ticker, by karma99 v0.91
Displays a running ticker of league scores on all pages EXCEPT your home page, the 1 by 1 revealing play by 
play page and the replay page. Obviously you don't want a ticker to spoil those hidden results!
If you don't care about such things, just highlight each entry in the "Excluded Pages" in the "Manage User Scripts"
window and click "Remove" for each one and it will show on all GLB pages.

Limitations: when you start the ticker for the first time if a page doesn't have any games
listed or they are shown but the score says "Matchup" they will be listed in the ticker as 
"No scores available" or "Games will sim soon" respectively.
The ticker stores the game data on your local machine and only gets updates when the games are due to play.
This is to vastly speed up loading and to stop Bort crying when the server gets killed with lots of unrequired
hits to pages that haven't changed.
The results will be rechecked at the time they are due to sim. If they are simmed early
(as most games are) they will still NOT show until the due time. If the games are late the script will check
every 10 minutes after the due time until they sim.
The ticker is designed as a nice football website style add on, if you need to know a result the very second
the game is simmed... go to the page and look  :P

Ok, so now you know what it does, how do you set it up?
On every league details page and conference details page you will see a link under the conference name
"Add to Score Ticker". Click this and the conference will be added, and "Remove from Score Ticker" does exactly
what you'd expect!

So that's it. This is currently a late Beta as I need to see how to deal with playoffs and the off season, but
I can't do that until I can see the pages, so keep an eye out for updates soon!
Enjoy  :D

Updates
v0.1-0.8 Developer testing phase (thanks to mw54finest)
v0.9     2nd July 08 - Public release
v0.91    3rd July 08 - Ticker will now pause when mouse is hovered over the top selection bar above the ticker (thanks to cretin for the idea)
*/

// Check for add/rem query strings
if(GetQueryString('tickeradd'))
{
  var lf=GetQueryString('tickeradd').replace(/-/,',');
  var existing=ArrayFromCsv(GM_getValue('tickerlflist',''));
  // Already exists?
  var index = existing.indexOf(lf);
  if(index == -1)
    {
      existing.push(lf);
      GM_setValue('tickerlflist',ArrayToCsv(existing));
    }  
}
if(GetQueryString('tickerrem'))
{
  var lf=GetQueryString('tickerrem').replace(/-/,',');
  var existing=ArrayFromCsv(GM_getValue('tickerlflist',''));
  var index = existing.indexOf(lf);
  if(index != -1)
    {existing.splice(index, 1);}
  GM_setValue('tickerlflist',ArrayToCsv(existing));
}

// Add/Remove links on conference/league pages
if (window.location.href.split('p://goallineblitz.com/game/league.pl').length > 1 && document.getElementById('conferences'))
{
  var conferences=getElementsByClassName('conference',document.getElementById('conferences'));
  if(conferences.length>0)
  {
    for(i=0;i<conferences.length;i++)
    {
      var league=conferences[i].innerHTML.split('<a href="/game/league.pl?league_id=')[1].split('&amp;conference_id')[0];
      var conference=conferences[i].innerHTML.split('conference_id=')[1].split('&amp;playoffs')[0];
      var headDiv=getElementsByClassName('medium_head',conferences[i])[0];
      
      var addrem='add';
      var addremText='Add to';
      // Link to add or remove?
      if(ArrayFromCsv(GM_getValue('tickerlflist','')).indexOf(league+','+conference)>-1)
      {
        addrem='rem';
        addremText='Remove from';
      }
      headDiv.innerHTML+='<div><a href='+window.location.href.split('&ticker')[0]+'&amp;ticker'+addrem+'='+league+'-'+conference+'>'+addremText+' Score Ticker</a></div>';
    }
  }
}

function ArrayToCsv(lfArray) // Array to csv for storing
{
  var csv='';
  for(a=0;a<lfArray.length;a++)
    {csv+=lfArray[a]+((a==lfArray.length-1) ? '' : ':');}
  return csv;
}

function ArrayFromCsv(lfCsv) // Array from csv for retrievel
{
  var arr = new Array();
  if (lfCsv!='')
  {
    for(b=0;b<lfCsv.split(':').length;b++)
      {arr.push(lfCsv.split(':')[b]);}
  }
  return arr;
}

var leagueConferences=ArrayFromCsv(GM_getValue('tickerlflist',''));

window.setTimeout(function(){

// Add new div for ticker
var tickerDiv=document.createElement('div');
tickerDiv.id='scoreTicker';
tickerDiv.style.backgroundImage='url(/images/game/design/toolbar.gif)';
tickerDiv.style.backgroundRepeat='repeat-x';
tickerDiv.style.position='absolute';
tickerDiv.style.top='110px';
tickerDiv.style.width='96%';
tickerDiv.style.height='16px';
tickerDiv.style.color='white';
tickerDiv.style.fontSize='12px';
tickerDiv.style.paddingLeft='2%';
tickerDiv.style.paddingRight='2%';
tickerDiv.style.overflow='hidden';
var bContainer = document.getElementById('body_container');
var contentDiv = document.getElementById('content');
bContainer.insertBefore(tickerDiv,contentDiv);

// Add new div for message
var msgDiv=document.createElement('div');
msgDiv.id='msgdiv';
msgDiv.style.display='none';
msgDiv.innerHTML='';
var contentDiv = document.getElementById('content');
contentDiv.insertBefore(msgDiv,null);

// Add new div for counter
var counterVar=document.createElement('div');
counterVar.id='countervar';
counterVar.style.display='none';
counterVar.innerHTML='';
contentDiv.insertBefore(counterVar,null);

// Add new div for position
var positionDiv=document.createElement('div');
positionDiv.id='positiondiv';
positionDiv.style.display='none';
positionDiv.innerHTML=GM_getValue('tickerposition',0);
contentDiv.insertBefore(positionDiv,null);

// Add new div for pause
var pauseDiv=document.createElement('div');
pauseDiv.id='pausediv';
pauseDiv.style.display='none';
contentDiv.insertBefore(pauseDiv,null);

// Add pause events to toolbar
var toolbar=document.getElementById('toolbar');
toolbar.setAttribute("onMouseOver","SetPause('P');");
toolbar.setAttribute("onMouseOut","SetPause('');");

// Update ticker position on unload
window.addEventListener("unload", function(){GM_setValue('tickerposition', parseInt(document.getElementById('positiondiv').innerHTML));}, false);

var lcText='var leagueConferences=new Array(';
if (leagueConferences.length>0)
{
  for (var a in leagueConferences){lcText+='"'+leagueConferences[a]+'",';}
  lcText=lcText.substring(0,lcText.length-2);
  lcText+='");';
}
else
{lcText+=');';}

// Pause function
var pauseScript="function SetPause(p){document.getElementById('pausediv').innerHTML=p;};";
// Add ticker script
var tickerScript=document.createElement('script');
tickerScript.type='text/javascript';
tickerScript.innerHTML=pauseScript+lcText+'function GetMessage(){if(leagueConferences.length==0){return "You must select at least 1 conference..."} else if(document.getElementById("countervar").innerHTML.length==leagueConferences.length){return document.getElementById("msgdiv").innerHTML}else{var loadmsg="Loading...";while(loadmsg.length<180){loadmsg=loadmsg+" "+loadmsg;};return loadmsg;}};var position=parseInt(document.getElementById("positiondiv").innerHTML);function ticker(){var msg=GetMessage();while(msg.length<170){msg+=" "+GetMessage();};msg+=" "+GetMessage();document.getElementById("scoreTicker").innerHTML=msg.substring(position,position+170);if(document.getElementById("pausediv").innerHTML==""){position++;};if(position>(msg.length-1)/2 && msg.split("Loading...").length==1){position=0;};document.getElementById("positiondiv").innerHTML=position;}ticker();setInterval("ticker()",100);';
document.getElementsByTagName('head')[0].appendChild(tickerScript);

if(leagueConferences.length>0)
{
  for(lc=0;lc<leagueConferences.length;lc++)
  {GetScores(leagueConferences[lc].split(',')[0],leagueConferences[lc].split(',')[1]);}
}

function GetScores(l,c){

// Check cache
var cached = false;
var firstTime = true;
if (GM_getValue(l+':'+c, '')!='')
{
	// Check cache time
	if (new Date() < new Date().setTime(Date.parse(GM_getValue(l+':'+c+':updatetime',0)))){
		document.getElementById('msgdiv').innerHTML=document.getElementById('msgdiv').innerHTML+GM_getValue(l+':'+c);
		document.getElementById('countervar').innerHTML+='G';
		cached=true;
    }
    firstTime=false;
}

if (!cached)
{
GM_xmlhttpRequest
(
{
	method: 'GET',
	url: 'http://goallineblitz.com/game/league.pl?league_id='+l+'&conference_id='+c,
	headers: 
	{
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(replayPage)
	{
		var resp=replayPage.responseText;
		var headDetails=resp.split('<div class="big_head subhead_head">')[1];
		var league=headDetails.split('">')[1].split('</a>')[0];
		var conf=headDetails.split('</a> - ')[1].split('</div>')[0];
		var gamestable=resp.split('<table class="games_table"')[1].split('</table>')[0];
		var gameTime=resp.split('Next sim in:')[1].split('</div>')[0];
		var hms=gameTime.split(':');
		var gameSimTime=new Date(new Date().getTime()+(hms[0]*3600000)+(hms[1]*60000)+(hms[2]*1000));
		
		var msg='FAILED!';
		if (gamestable.split('_color1">').length < 2)
		{
        msg=league+' '+conf+' : No scores available... ';
		}
		else
		{
			if (gamestable.split('Matchup').length > 1)
			{
        if (firstTime)
          {msg=league+' '+conf+' : Games will sim soon... ';}
        else
          {
            msg=GM_getValue(l+':'+c); //Keep existing value
            gameSimTime=new Date(new Date().getTime()+(10*60000)); // Add 10 mins and check again
          }
      }
			else
			{
				msg=league+' '+conf+' : ';
				// Get all game results
				var gamesrough=gamestable.split('<a href="');
				for(i=1;i<gamesrough.length;i++)
				{
					// First column is team 1
					var team1=gamesrough[i].split('">')[1].split('</a>')[0];
					i++;
				
					// Second column is team 2
					var team2=gamesrough[i].split('">')[1].split('</a>')[0];
					i++;
				
					// Third column is score, ignore 4th column
					var score=gamesrough[i].split('">')[1].split('</a>')[0];
					i++;

					msg=msg+team1+' '+score.split('-')[0]+' : '+team2+' '+score.split('-')[1]+' .... ';
				}
			}		
		}
		// Cache time
		GM_setValue(l+':'+c+':updatetime',gameSimTime.toString());
		// Cache data
		GM_setValue(l+':'+c,msg);
		document.getElementById('msgdiv').innerHTML=document.getElementById('msgdiv').innerHTML+msg;
		document.getElementById('countervar').innerHTML+='G';
	}
});
// Recaching so reset ticker position
GM_setValue('tickerposition',0);
}
}

});

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
	return a;
};

function GetQueryString(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)"; 
  var regex = new RegExp( regexS ); 
  var results = regex.exec(window.location.href); 
  if( results == null )    
    return null;
  else    
    return results[1];
}

// ==UserScript==
// @name           GLB YAC
// @namespace      GLB
// @description    Adds a YAC (yards after catch) stat to replays
// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*
// ==/UserScript==

window.setTimeout( function() 
{

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var playerids = new Array();
var players = unsafeWindow.players;
var play_data = unsafeWindow.play_data;

for (var i = 1; i < play_data[0].length; i++) 
{
	var data = play_data[0][i];
	if (data.id != 'ball')
	 {
		playerids.push (data.id);
	}
}

var playText = getPlayText();
var receiver = getReceiverName(playText);
var wrid = 0;

for (var i = 0; i < playerids.length; i++) 
{
	var plyr = players[playerids[i]];
	if (plyr.name == receiver) {
		wrid = playerids[i];
	}
}

var catchY = 0;

for (var j = 0; j < play_data.length; j++) {
	var balldata = getSnap(j, 'ball');
	var snapdata = getSnap(j, wrid);
	if (balldata.x == snapdata.x && balldata.y == snapdata.y && catchY == 0) {
		catchY = balldata.y
	}	
}

var endY = play_data[play_data.length-1][0].y;

if (catchY == 0) {catchY = endY;}

var yac = Math.round(((Math.abs(endY - catchY))/3)*2)/2

addYAC(roundNumber(yac,1));

function getReceiverName(playText) {
	var sn = playText.indexOf('pass to ')+8;
	var en = 0;	

	if (playText.indexOf(', hurried by')!=-1) {
		en = playText.indexOf(', hurried by');
	} else if (playText.indexOf(' up the')!=-1) {
		en = playText.indexOf(' up the');
	} else {
		en = playText.indexOf(' over the');
	}

	var name = playText.slice(sn,en);
	return name;
}

function getPlayText() {
	var plays = getElementsByClassName('small_head play', document);
	for (var i=0; i < plays.length; i++) {
		if (plays[i].innerHTML.indexOf('pass to')!=-1){
			return plays[i].innerHTML;
		}
	}
}

function addYAC(yacnum) {
	var plays = getElementsByClassName('small_head play', document);
	for (var i=0; i < plays.length; i++) {
		if (plays[i].innerHTML.indexOf('pass to')!=-1){
			plays[i].innerHTML = plays[i].innerHTML + " [YAC: " + yacnum + "]"
		}
	}
}

function getSnap(frame, id) {
	for (var i = 0; i < play_data[frame].length; i++) {
		var data = play_data[frame][i];
		if (data.id == id) {
			return data;
		}
	}
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

}
)

// ==UserScript==
// @name           Overall Stat Number on team page
// @namespace      DDCUnderground - Greasemonkey
// @description    From the team page will pull overal numerical ranking of each team on schedule
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// ==/UserScript==
 
var timeout = 0;
function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){      
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};
function getStat(teampath, i, hoa)
{
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://goallineblitz.com' + teampath,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(opteam) {
         var response1=opteam.responseText
         var stat=response1.split('px">');
         var stat1=stat[1].split('</div></div>')
         var stat2=stat[9].split('</div></div>')
         var spread = stat1[0] - stat2[0]
         if (spread > 0) {
             spread = '+' + spread
         }
         var opponententry=getElementsByClassName('alternating_color'+hoa,document)
         var portion1end = opponententry[i].innerHTML.indexOf('</a>')
         portion1end = portion1end + 4 
         var portion1str = opponententry[i].innerHTML.substr(0,portion1end)
         var portion2end = opponententry[i].innerHTML.length
         var portion2str = opponententry[i].innerHTML.substring(portion1end,portion2end)
         opponententry[i].innerHTML = portion1str + '(' + stat2[0] + ') ' + '(' + spread + ')' + portion2str
 		}
	});
};




window.setTimeout( function() {
   var opponentheader=getElementsByClassName('schedule_opponent',document)
   opponentheader[0].innerHTML = opponentheader[0].innerHTML + ' (Overall)(Spread)'
   var teamheader=getElementsByClassName('content_container',document)
   teamsplit = teamheader[0].innerHTML.split('team_pic.pl?team_id=')
   teamsplit2 = teamsplit[1].split('" height')
   localteamid = teamsplit2[0].substring(0,teamsplit2[0].indexOf('"',0))
   var opponentaway=getElementsByClassName('alternating_color1',document)    
   for (var i = 0; i < 8; i++) {
        rowdata = opponentaway[i].innerHTML.split('<td>')
        var startpos = rowdata[2].indexOf("/game/compare")
        if (startpos!=(-1)) {
            var stoppos = rowdata[2].indexOf('"',(startpos+1))
            var teampath = rowdata[2].slice(startpos,stoppos)
            getStat(teampath, i, '1')
        }else {
            startpos = (rowdata[1].indexOf('team.pl?team_id=') + 16)
            var stoppos = rowdata[1].indexOf('"',(startpos+1))
            var teampath = rowdata[1].slice(startpos,stoppos)
            getStat('/game/compare_teams.pl?team1=' + localteamid + '&team2=' + teampath, i,'1')
        }

   }
   var opponenthome=getElementsByClassName('alternating_color2',document)    
   for (var i = 0; i < 8; i++) {
       rowdata = opponenthome[i].innerHTML.split('<td>')
        var startpos = rowdata[2].indexOf("/game/compare")
        if (startpos!=(-1)) {
            var stoppos = rowdata[2].indexOf('"',(startpos+1))
            var teampath = rowdata[2].slice(startpos,stoppos)
            getStat(teampath, i, '2')
        }else {
            startpos = (rowdata[1].indexOf('team.pl?team_id=') + 16)
            var stoppos = rowdata[1].indexOf('"',(startpos+1))
            var teampath = rowdata[1].slice(startpos,stoppos)
            getStat('/game/compare_teams.pl?team1=' + localteamid + '&team2=' + teampath, i,'2')
        }
   }
},timeout);

// ==UserScript==
// @name           Pancakes
// @namespace      GLB
// @description    Pancakes
// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*
// ==/UserScript==

window.setTimeout( function() 
{
var playerids = new Array();
var players = unsafeWindow.players;
var play_data = unsafeWindow.play_data;
var pancakes = new Array();

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var preX = 0;
var preY = 0;
var panCount = 0;

for (var i = 1; i < play_data[0].length; i++) 
{
	var data = play_data[0][i];
	if (data.id != 'ball')
	 {
		playerids.push (data.id);
	}
}

for (var i = 0; i < playerids.length; i++) 
{
	var plyr = players[playerids[i]];
	panCount = 0;

	for (var j = 0; j < play_data.length; j++) {
		var snapdata = getSnap(j, playerids[i]);

		if (preX == snapdata.x && preY == snapdata.y) {
			panCount++;
			
			if (panCount==17) {
				addPancake(i, plyr.name, j-17, snapdata.x, snapdata.y, panCount);
				panCount = 0;
			}
		} else {
			preX = snapdata.x;
			preY = snapdata.y;
			panCount = 0;			
		}
	}
}

var pancaketext = "";

for (var i = 0; i < pancakes.length; i++) {
	pancaketext = pancaketext + pancakes[i] + "<br>";
}

var buttons = getElementsByClassName('prev_next', document);

if (pancaketext != "") {
	if (buttons[0]) {
    		newElement = document.createElement('div'); 
		newElement.className = "small_head";
		newElement.innerHTML = "<font color='black'>The Pancake Stack</font><br>" + pancaketext;
		buttons[0].parentNode.insertBefore(newElement, buttons[0]);
	}	
}

function getSnap(frame, id) {
	for (var i = 0; i < play_data[frame].length; i++) {
		var data = play_data[frame][i];
		if (data.id == id) {
			return data;
		}
	}
}

function addPancake(index, name, frame, x, y, freezecount) 
{
	var closestDistance = 10000;
	var newDist;
	var closestName;
	var distancetext="";
	var closesti = 0;

 	if (index < 11) {
		for (var i = 11; i < playerids.length; i++) {
			var snapdata = getSnap(frame, playerids[i]);
			newDist = Math.sqrt(Math.abs(snapdata.x - x) * Math.abs(snapdata.x - x) + Math.abs(snapdata.y - y) * Math.abs(snapdata.y - y));
			if (newDist < closestDistance && newDist > 0) {
				closestDistance = newDist;
				closestName =players[playerids[i]].name;
			}	
		}
	} else {
		for (var i = 0; i < 11; i++) {
			var snapdata = getSnap(frame, playerids[i]);
			newDist = Math.sqrt(Math.abs(snapdata.x - x) * Math.abs(snapdata.x - x) + Math.abs(snapdata.y - y) * Math.abs(snapdata.y - y));
			if (newDist < closestDistance && newDist > 0) {
				closestDistance = newDist;
				closestName =players[playerids[i]].name;
			}	
		}	
	}		
	
	if (closestDistance < 8) {
		pancakes.push (name + " got pancaked by " + closestName);
	}
}

}
)


// ==UserScript==
// @name           pbr Game Scout
// @description    modification of tciss(?)'s game scout script for GoalLineBlitz.com
// @namespace      http://goallinebliz.com
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp&quarter=*
// @include        http://216.245.193.2/game/game.pl?game_id=*&mode=pbp
// @include        http://216.245.193.2/game/game.pl?game_id=*&mode=pbp&quarter=*
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @include        http://216.245.193.2/game/team.pl?team_id=*
// @version        08.08.03

/*
 *
 * based on code by tciss from www.goallineblitz.com
 * pabst modified it 6/22/08+
 *
 */


var showEverything = false;
var longPass = 15;
var mediumPass = 7.5;
var shortPass = 0;

var links = [];
var checkBoxes = [];
var storageStats;
var storageArr;

window.setTimeout( function() {

//--------------------------start -------------------------------

if ((window.location+"").match("&mode=pbp") == null) {
	runTeamScout();
}
else {
	//runGameScout();
	runTeamScout();
}

function runGameScout() { 
	storageArr = [];
	storageStats = [];

	var data = document.body.innerHTML;	
	var scoutTable = getEmptyTables();

	var storage = document.createElement('div');
	storage.setAttribute("id","storage:"+(window.location.toString()));
	storage.setAttribute("style","visibility: collapse;");
	storage.innerHTML = data;
	
	document.getElementById("footer").appendChild(storage);
	storageArr.push(storage);

	storageStats[0] = gameScout(window.location+"",storage, new Stats());
	storage.parentNode.removeChild(storage);

	//console.log(storageStats[0].driveList);
	document.getElementById("scoreboard").appendChild(scoutTable);
	fillTables(storageStats[0]);
	changeVisibility(0,2);

    console.log("boxscore fetch start");
    var e = document.getElementsByClassName("subhead_link_bar");
    var t = e[0].innerHTML;
    var i = t.indexOf('"');
    t = t.slice(i+1);
    var i = t.indexOf('"');
    t = t.slice(0,i);
    getBoxScore("http://goallineblitz.com/"+t);
    console.log("boxscore fetch done");
}

function runTeamScout() {
	storageArr = [];
	storageStats = [];

	console.log("start");

	var scoutTable = getEmptyTables();
	scoutTable.addEventListener("game loaded",fillScoutTable,true);
	scoutTable.addEventListener("table sort",sortTable,true);

	var location = document.getElementById("pbp");
	if (location != null) {
		location.parentNode.insertBefore(scoutTable,location);
		var checkBox = document.createElement("input");
		checkBox.checked = true;
		checkBox.setAttribute("name","GS checkbox");
		checkBox.setAttribute("id",window.location+"");
		checkBoxes.push(checkBox);
		links.push(window.location+"");
		showEverything = true;
		
		var div = document.createElement('div');
		div.setAttribute("id","storage:"+window.location.toString());
		div.setAttribute("style","visibility:collapse;");
		div.innerHTML = document.getElementsByTagName("body")[0].innerHTML; 
		document.getElementById("footer").appendChild(div);
		storageArr.push(div);
		links.push(window.location.toString());
	}
	else {
		location = document.getElementById("footer");
		location.parentNode.insertBefore(scoutTable,location);
	}

	var scheduleContent = document.getElementsByClassName("schedule_content");
	for each (var schedules in scheduleContent) {
		var rows = schedules.rows;
		rows[0].cells[1].innerHTML = "[GS] Opponent";
		for (var i=1; i<rows.length; i++) {
			var link = rows[i].cells[2].firstChild.href+"&mode=pbp";
			links.push(link);

			var oldCell = rows[i].cells[1];
			rows[i].deleteCell(1);

			var checkBox = document.createElement("input");
			checkBox.setAttribute("type","checkbox");
			checkBox.setAttribute("id",link);
			checkBox.setAttribute("name","GS checkbox");
			checkBoxes.push(checkBox);

			var div = document.createElement("span");
			div.appendChild(checkBox);
			for each (var c in oldCell.childNodes) {
				if (c == null) continue;
				var c2 = c.nextSibling;
				div.appendChild(c);
				if (c2 != null) {
					div.appendChild(c2);
				}
			}
			var newCell = rows[i].insertCell(1);
			newCell.appendChild(div);
		}
	}

	//storageArr = new Array(links.length);
	//storageStats = new Array(links.length);

	var button = document.createElement("input");
	button.setAttribute("value","Run Game Scout:");
	button.setAttribute("type","button");
	button.setAttribute("id","gsbutton");
	button.addEventListener("click",input,true);

	var counter = document.createElement("div");
	counter.setAttribute("class","medium_head");
	counter.setAttribute("id","gspagecounter");
	counter.innerHTML = "0 of 0";

	var spn = document.createElement("span");
	spn.appendChild(button);
	spn.appendChild(counter);
	scoutTable.insertBefore(spn,scoutTable.firstChild);
}
//---------------------- end --------------------------------

function getEmptyTables() {
	var tableParent = document.createElement('span');
	var bar = document.createElement('span');
	bar.setAttribute("id","gsbar");

	var t1 = document.createElement('div');
	//t1.appendChild(document.createTextNode("Game Scout: "));
	t1.setAttribute("class","medium_head");

	var b1 = document.createElement('a');
	b1.appendChild(document.createTextNode("Total"));
	b1.setAttribute("class","subhead_link_bar");
	b1.setAttribute("id","gsbar0");
	b1.addEventListener('click', function() { changeVisibility(0,2); }, true);

	b2 = document.createElement('span');
	b2.appendChild(document.createTextNode(" | "));

	var b3 = document.createElement('a');
	b3.appendChild(document.createTextNode("Rushing"));
	b3.setAttribute("class","subhead_link_bar");
	b3.setAttribute("id","gsbar3");
	b3.addEventListener('click', function() { changeVisibility(3,5); }, true);

	b4 = document.createElement('span');
	b4.appendChild(document.createTextNode(" | "));

	var b5 = document.createElement('a');
	b5.appendChild(document.createTextNode("Passing"));
	b5.setAttribute("class","subhead_link_bar");
	b5.setAttribute("id","gsbar6");
	b5.addEventListener('click', function() { changeVisibility(6,10); }, true);

	b6 = document.createElement('span');
	b6.appendChild(document.createTextNode(" | "));

	var b7 = document.createElement('a');
	b7.appendChild(document.createTextNode("Special Teams"));
	b7.setAttribute("class","subhead_link_bar");
	b7.setAttribute("id","gsbar11");
	b7.addEventListener('click', function() { changeVisibility(11,15); }, true);

	b8 = document.createElement('span');
	b8.appendChild(document.createTextNode(" | "));


	var b9 = document.createElement('a');
	b9.appendChild(document.createTextNode("Defense"));
	b9.setAttribute("class","subhead_link_bar");
	b9.setAttribute("id","gsbar16");
	b9.addEventListener('click', function() { changeVisibility(16,17); }, true);

	b10 = document.createElement('span');
	b10.appendChild(document.createTextNode(" | "));


	var b11 = document.createElement('a');
	b11.appendChild(document.createTextNode("Everything"));
	b11.setAttribute("class","subhead_link_bar");
	b11.setAttribute("id","gsbar-1");
	b11.addEventListener('click', function() { changeVisibility(-1); }, true);

	bar.appendChild(t1);

	bar.appendChild(b1);
	bar.appendChild(b2);
	bar.appendChild(b3);
	bar.appendChild(b4);
	bar.appendChild(b5);
	bar.appendChild(b6);
	bar.appendChild(b7);
	bar.appendChild(b8);
	bar.appendChild(b9);
	bar.appendChild(b10);
	bar.appendChild(b11);
	tableParent.appendChild(bar);

	var arr = new Array();
	arr.push(getQuarterTable(0,5));
	arr.push(getQuarterTable(1,5));
	arr.push(getPenaltyTable(0,[]));
	arr.push(getPenaltyTable(1,[]));
	arr.push(getDriveTable(0,[]));
	arr.push(getDriveTable(1,[]));
	arr.push(getRushingTable(0));
	arr.push(getRushingTable(1));
	arr.push(getRushingByDownTable(0));
	arr.push(getRushingByDownTable(1));
	arr.push(getRushingTargetTable(0,[]));
	arr.push(getRushingTargetTable(1,[]));
	arr.push(getPassingTable(0));
	arr.push(getPassingTable(1));
	arr.push(getPassingDistanceTable(0));
	arr.push(getPassingDistanceTable(1));
	arr.push(getPassingByDownTable(0));
	arr.push(getPassingByDownTable(1));
	arr.push(getQuarterbacksTable(0,[]));
	arr.push(getQuarterbacksTable(1,[]));
	arr.push(getPassingTargetTable(0,[]));
	arr.push(getPassingTargetTable(1,[]));
	arr.push(getKickingTable(0,[]));
	arr.push(getKickingTable(1,[]));
	arr.push(getKickReturnTable(0,[]));
	arr.push(getKickReturnTable(1,[]));
	arr.push(getPuntingTable(0,[]));
	arr.push(getPuntingTable(1,[]));
	arr.push(getPuntReturnTable(0,[]));
	arr.push(getPuntReturnTable(1,[]));
	arr.push(getSTDefenseTable(0,[]));
	arr.push(getSTDefenseTable(1,[]));
	arr.push(getRushDefenseTable(0,[]));
	arr.push(getRushDefenseTable(1,[]));
	arr.push(getPassDefenseTable(0,[]));
	arr.push(getPassDefenseTable(1,[]));

	var tables = document.createElement("table");
	tables.setAttribute("id","gamescout");
	tables.setAttribute("style","visibility: collapse;");
	for (var i=0; i<arr.length/2; i++) {
		var qrow = document.createElement("tr");
		qrow.setAttribute('id','row'+i);
		qrow.setAttribute('valign','top');
		var qd1 = document.createElement("td");
		var qd2 = document.createElement("td");
		qd1.appendChild(arr[i*2]);
		qd2.appendChild(arr[i*2+1]);
		qrow.appendChild(qd1);
		qrow.appendChild(qd2);
		tables.appendChild(qrow);
	}
	tableParent.appendChild(tables);
	return tableParent;
}

function getPBP(address) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: address,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
		'Accept': 'text/xml'
	},
	onload: function(page) { 
		if (page.status != 200) {
			console.log("Error "+page.status+" loading "+address);;
		}
		else {
			handlePageLoad(address,page);
		}
	}
	});
};

function handlePageLoad(address,page) {
	var storage = document.getElementById('storage:'+address);
	storage.innerHTML = page.responseText;

	var index = links.indexOf(address);
	storageStats[index] = gameScout(address,storage, new Stats());
	storage.parentNode.removeChild(storage);

	var tscout = document.getElementById("gamescout");
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("game loaded",true,true);
	tscout.dispatchEvent(evt);
}

function fillScoutTable() {
	var finished = true;
	clearPageCount();
	for (var i=0; i<storageStats.length; i++) {
		if (checkBoxes[i].checked == true) {
			if (storageStats[i] == null) {
				finished = false;
			}
			else {
				incrementPageCount();
			}
		}
	}
	if (finished == false) {
		return;
	}

	var stats = [];
	for (var i=0; i<storageStats.length; i++) {
		var tmp;
		if (storageStats[i] == null) tmp = null;  

		else tmp = eval(uneval(storageStats[i]));
		stats.push(tmp);
	}

	var total = new Stats();
	var teamHeading = document.getElementsByClassName("big_head subhead_head")[0];
	console.log(teamHeading);
	console.log(teamHeading.length);
	if (teamHeading.childNodes.length == 1) { //on a team page
		total.team_name[0] = teamHeading.innerHTML;
		total.team_name[1] = "Opponents";
	}
	else {
		if (teamHeading.firstChild.innerHTML == null) {
			//on a team page with rename link
			var str = teamHeading.innerHTML;
			str = str.slice(0,str.indexOf(" (<a href="));
			total.team_name[0] = str;
			total.team_name[1] = "Opponents";
		}
		else {
			// on a play-by-play page
			total.team_name[0] = teamHeading.firstChild.innerHTML;
			total.team_name[1] = teamHeading.lastChild.innerHTML;
		}
	}

	for (var i=0; i<stats.length; i++) {
		if (checkBoxes[i].checked == false) continue;
		if (stats[i] == null) continue;
		total = addition(total,stats[i]);
	}
	fillTables(total);    

	var tables = document.getElementById("gamescout");
	changeVisibility(0,2);
	tables.setAttribute("style","visibility: visible;");
	
	if (window.location.toString().match("team.pl")) {
		var addr = (window.location+"").replace("team.pl","roster.pl");
		getRoster(addr);
	}
	else {
		var addr = window.location.toString();
		addr = addr.slice(0,addr.indexOf("&mode=pbp"));
		getBoxScore(addr);
	}
}

function clearPageCount() {
	var text = document.getElementById("gspagecounter");
	text.innerHTML = "0 of ";
	var inc = 0;
	for each (var c in checkBoxes) {
		if (c.checked == true) {
			inc++;
		}
	}
	text.innerHTML += inc;
}
function incrementPageCount() {
	var text = document.getElementById("gspagecounter");
	var num = parseInt(text.innerHTML.slice(0,2));
	num += 1;
	text.innerHTML = num+" "+text.innerHTML.slice(text.innerHTML.indexOf("of"));
}

function input() {
	var updating = false;
	clearPageCount();
	for (var i=0; i<checkBoxes.length; i++) {
		if (checkBoxes[i] == null) continue;

		if (checkBoxes[i].checked == true) {
			var storage = storageArr[i];
			if (storage == null) {
				//haven't downloaded this game yet
				var div = document.createElement('div');
				div.setAttribute("id","storage:"+links[i]);
				div.setAttribute("style","visibility:collapse;");
				storageArr.push(div);
				document.getElementById("footer").appendChild(div);

				console.log("downloading this one: "+links[i]);
				updating = true;
				getPBP(links[i]);
			}
			else {
				//downloaded this one already
				//hold off on updating the tables for now
				console.log("already downloaded this one: "+links[i]);
				getPBP(links[i]);
			}
		}
	}
	if (updating == false) {
		//make sure tables have updated at least once
		fillScoutTable();
	}
}


function addition(left,right) {
	var stats = new Stats();
	var aligned;

	//console.log("addition start");

	if ((left.team_name[0] == right.team_name[0]) ||
			(left.team_name[1] == right.team_name[1])) {
		aligned = true;
	}
	else {
		aligned = false;
	}

	var len = left.team_possession.length
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_possession[i] = left.team_possession[i] +
			right.team_possession[idx];
	}
	len = left.team_penalty.length
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_penalty[i] = left.team_penalty[i] +
			right.team_penalty[idx];
	}
	len = left.team_att.length;
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_att[i] = left.team_att[i] +
			right.team_att[idx];
		stats.team_yards[i] = left.team_yards[i] +
			right.team_yards[idx];
		stats.team_success[i] = left.team_success[i] +
			right.team_success[idx];
		stats.team_firsts[i] = left.team_firsts[i] +
			right.team_firsts[idx];
	}
	len = left.team_pass_comp.length;
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_pass_comp[i] = left.team_pass_comp[i] +
			right.team_pass_comp[idx];
		stats.team_pass_att[i] = left.team_pass_att[i] +
			right.team_pass_att[idx];
		stats.team_pass_yards[i] = left.team_pass_yards[i] +
			right.team_pass_yards[idx];
		stats.team_pass_firsts[i] = left.team_pass_firsts[i] +
			right.team_pass_firsts[idx];
	}
	len = left.team_att_down.length;
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_att_down[i] = left.team_att_down[i] +
			right.team_att_down[idx];
		stats.team_yards_down[i] = left.team_yards_down[i] +
			right.team_yards_down[idx];
		stats.team_success_down[i] = left.team_success_down[i] +
			right.team_success_down[idx];
		stats.team_firsts_down[i] = left.team_firsts_down[i] +
			right.team_firsts_down[idx];
	}
	len = left.team_pass_comp_down.length;
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_pass_comp_down[i] = left.team_pass_comp_down[i] +
			right.team_pass_comp_down[idx];
		stats.team_pass_att_down[i] = left.team_pass_att_down[i] +
			right.team_pass_att_down[idx];
		stats.team_pass_yards_down[i] = left.team_pass_yards_down[i] +
			right.team_pass_yards_down[idx];
		stats.team_pass_firsts_down[i] = left.team_pass_firsts_down[i] +
			right.team_pass_firsts_down[idx];
	}
	for (var i=0; i<6; i++) {
		len = left.team_quarter_totals[i].length;
		for (var j=0; j<len; j++) {
			if (aligned == true) idx = j;
			else idx = (j+len/2)%len;
			stats.team_quarter_totals[i][j] = left.team_quarter_totals[i][j] +
				right.team_quarter_totals[i][idx];
		}
	}
	for (var i=0; i<4; i++) {
		len = left.distanceStats[i].length;
		for (var j=0; j<len; j++) {
			if (aligned == true) idx = j;
			else idx = (j+len/2)%len;
			stats.distanceStats[i][j] = left.distanceStats[i][j] +
				right.distanceStats[i][idx];
		}
	}

	stats.team_name[0] = left.team_name[0];
	stats.team_name[1] = left.team_name[1];

	stats.driveList[0] = right.driveList[0];
	stats.driveList[1] = right.driveList[1];
	
	stats.playerRushingName = [[],[]];
	stats.playerRushingStats = [[],[]];
	combineRushing(stats,left,right,aligned);

	stats.playerReceivingName = [[],[]];
	stats.playerReceivingStats = [[],[]];
	combineReceiving(stats,left,right,aligned);

	stats.playerPassingName = [[],[]];
	stats.playerPassingStats = [[],[]];
	combinePassing(stats,left,right,aligned);

	stats.playerDefensiveName = [[],[]];
	stats.playerDefensiveStats = [[],[]];
	combineDefensive(stats,left,right,aligned);

	stats.playerKickingName = [[],[]];
	stats.playerKickingStats = [[],[]];
	combineKicking(stats,left,right,aligned);

	stats.playerPuntingName = [[],[]];
	stats.playerPuntingStats = [[],[]];
	combinePunting(stats,left,right,aligned);

	stats.playerKickReturnName = [[],[]];
	stats.playerKickReturnStats = [[],[]];
	combineKickReturn(stats,left,right,aligned);

	stats.playerPuntReturnName = [[],[]];
	stats.playerPuntReturnStats = [[],[]];
	combinePuntReturn(stats,left,right,aligned);

	stats.playerPenaltyName = [[],[]];
	stats.playerPenaltyStats = [[],[]];
	combinePenalty(stats,left,right,aligned);

	//console.log("addition end");
	return stats;
}

function combineRushing(total, left, right, align) {
	combineArrays(total.playerRushingName,total.playerRushingStats,
			left.playerRushingName, left.playerRushingStats,
			right.playerRushingName,right.playerRushingStats,
			align,total.playerRushingStatsCombine);
}

function combineReceiving(total, left, right, align) {
	combineArrays(total.playerReceivingName,total.playerReceivingStats,
			left.playerReceivingName, left.playerReceivingStats,
			right.playerReceivingName,right.playerReceivingStats,
			align,total.playerReceivingStatsCombine);
}

function combinePassing(total, left, right, align) {
	combineArrays(total.playerPassingName,total.playerPassingStats,
			left.playerPassingName, left.playerPassingStats,
			right.playerPassingName,right.playerPassingStats,
			align,total.playerPassingStatsCombine);
}

function combineDefensive(total, left, right, align) {
	combineArrays(total.playerDefensiveRushName,total.playerDefensiveRushStats,
			left.playerDefensiveRushName, left.playerDefensiveRushStats,
			right.playerDefensiveRushName,right.playerDefensiveRushStats,
			align,total.playerDefensiveStatsCombine);
	combineArrays(total.playerDefensivePassName,total.playerDefensivePassStats,
			left.playerDefensivePassName, left.playerDefensivePassStats,
			right.playerDefensivePassName,right.playerDefensivePassStats,
			align,total.playerDefensiveStatsCombine);
	combineArrays(total.playerDefensiveSTName,total.playerDefensiveSTStats,
			left.playerDefensiveSTName, left.playerDefensiveSTStats,
			right.playerDefensiveSTName,right.playerDefensiveSTStats,
			align,total.playerDefensiveStatsCombine);
}

function combineKicking(total, left, right, align) {
	combineArrays(total.playerKickingName,total.playerKickingStats,
			left.playerKickingName, left.playerKickingStats,
			right.playerKickingName,right.playerKickingStats,
			align,total.playerKickingStatsCombine);
}

function combinePunting(total, left, right, align) {
	combineArrays(total.playerPuntingName,total.playerPuntingStats,
			left.playerPuntingName, left.playerPuntingStats,
			right.playerPuntingName,right.playerPuntingStats,
			align,total.playerPuntingStatsCombine);
}

function combineKickReturn(total, left, right, align) {
	combineArrays(total.playerKickReturnName,total.playerKickReturnStats,
			left.playerKickReturnName, left.playerKickReturnStats,
			right.playerKickReturnName,right.playerKickReturnStats,
			align,total.playerKickReturnStatsCombine);
}

function combinePuntReturn(total, left, right, align) {
	combineArrays(total.playerPuntReturnName,total.playerPuntReturnStats,
			left.playerPuntReturnName, left.playerPuntReturnStats,
			right.playerPuntReturnName,right.playerPuntReturnStats,
			align,total.playerPuntReturnStatsCombine);
}

function combinePenalty(total, left, right, align) {
	combineArrays(total.playerPenaltyName,total.playerPenaltyStats,
			left.playerPenaltyName, left.playerPenaltyStats,
			right.playerPenaltyName,right.playerPenaltyStats,
			align, total.playerPenaltyStatsCombine);
}

function combineArrays(totalName, totalStats, leftName, leftStats, 
		rightName, rightStats, align, combine) {
	for (var t=0; t<leftName.length; t++) {
		for (var i=0; i<leftName[t].length; i++) {
			totalName[t].push(leftName[t][i]);
			totalStats[t].push(leftStats[t][i]);
		}
	}

	for (var t=0; t<2; t++) {
		if (align == true) tidx = t;
		else tidx = (t+1)%2;

		if (rightName[tidx] == null) continue;
		for (var i=0; i<rightName[tidx].length; i++) {
			var idx = totalName[t].indexOf(rightName[tidx][i]);
			if (idx == -1) {
				totalName[t].push(rightName[tidx][i]);
				totalStats[t].push(rightStats[tidx][i]);
			}
			else {
				for (var j=0; j<rightStats[tidx][i].length; j++) {
					if (combine[j] == true) {
						totalStats[t][idx][j] += rightStats[tidx][i][j];
					}
					else {
						totalStats[t][idx][j] = Math.max(totalStats[t][idx][j],
								rightStats[tidx][i][j]);
					}
				}
			}
		}
		if (showEverything == false) return;
	}
}


function addRowToTable(t,data) {
	var tr = document.createElement("tr");
	tr.setAttribute("class","alternating_color"+((t.rows.length%2)+1)+" pbp_pbr_title_row");
	for (var i=0; i<data.length; i++) {
		var td = document.createElement("td");
		if (i != 0) td.setAttribute("align","center");
		td.innerHTML = data[i]+"";
		tr.appendChild(td);
	}
	t.appendChild(tr);
}



//------------ start box score loading ------------------------
function getBoxScore(address) {
    console.log("getBoxScore: "+address);
	GM_xmlhttpRequest({
		method: 'GET',
		url: address,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
		'Accept': 'text/xml'
	},
	onload: function(page) { 
		if (page.status != 200) {
			console.log("Error "+page.status+" loading "+address);;
		}
		else {
			parsePlayerFromBoxScore(page.responseText);
		}
	}
	});
};

function parsePlayerFromBoxScore(text) {
	var playerLinks = [];
	var header = "<td class=\"box_score_player_stat_name\">";

	var t = text;
	var i=-1;
	while ( (i=t.indexOf(header)) != -1) {
		t = t.slice(i+header.length);
		if (t.indexOf("<span") != 0) {
			continue;
		}
		var end = t.indexOf("</td");
		playerLinks.push(t.slice(0,end));
		t = t.slice(end+1);
	}

	addPositionsToTables(playerLinks);
}

function getRoster(address) {
    console.log("getRoster: "+address);
	var page = document.getElementById("storage:"+address);
	if (page == null) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: address,
			headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
			'Accept': 'text/xml'
		},
		onload: function(page) { 
			if (page.status != 200) {
				console.log("Error "+page.status+" loading "+address);;
			}
			else {
				var footer = document.getElementById("footer");
				var div = document.createElement("div");
				div.setAttribute("id","storage:"+address);
				div.setAttribute("style","visibility: collapse;");
				div.innerHTML = page.responseText;
				footer.appendChild(div);
				parsePlayerFromRoster(address);
			}
		}
		});
	}
	else {
		parsePlayerFromRoster(address);
	}
};

function parsePlayerFromRoster(address) {
    console.log("parsePlayerFromRoster("+address+")");
	var playerLinks = [];
	var s = document.getElementById("storage:"+address);
	var l = s.getElementsByClassName("player_name");
	for each (var p in l) {
		if (p.parentNode == null) continue;
		
		var name = p.firstChild.innerHTML;
		var pos = p.parentNode.getElementsByClassName("player_position")[0].innerHTML;
		
		while (pos.length < 4) { pos += "&nbsp;"; }
		var html = "<span class=\"position\">"+pos+"</span>"+name;
		playerLinks.push(html);
	}
	addPositionsToTables(playerLinks);
}

function addPositionsToTables(playerLinks) {
	console.log("addPositionsToTables()");//playerLinks);
	var nodes = document.getElementsByClassName("pbp_pbr_title_row");
	for (var i=0;i<nodes.length; i++) {
		var rowName = nodes[i].firstChild.innerHTML;
		for each (var p in playerLinks) {
			if (trim(rowName).length == 0) continue;

			if ((p.indexOf(">"+rowName+"<") != -1) ||
    			(p.indexOf("> "+rowName+"<") != -1) ||
			    (p.indexOf(">"+rowName+" <") != -1)) {
				nodes[i].firstChild.innerHTML = p;
			}			
			else if (p.indexOf(">"+fixEscapedText(rowName)+"<") != -1) {
				nodes[i].firstChild.innerHTML = p;
			}			
		}
	}
}

function fixEscapedText(str) {
	var s = str;
	while (s.indexOf('"') != -1) {
		s = s.replace('"',"&quot;");
	}
	while (s.indexOf("'") != -1) {
		s = s.replace("'","&#39;");
	}
	return s;
}

function trim(str) {
	var s = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	return s.replace(/\n/," ");
}
//------------ end box score loading ------------------------



//------------ game scout start -----------------------------
function Stats() {
	this.team_name = [];
	this.team_possession = [0,0,0,0,0,0,0,0,0,0,0,0];
	this.team_penalty    = [0,0,0,0,0,0,0,0,0,0,0,0];
	
	this.team_att     = [0,0,0,0,0,0,0,0,0,0];
	this.team_yards   = [0,0,0,0,0,0,0,0,0,0];
	this.team_success = [0,0,0,0,0,0,0,0,0,0];
	this.team_firsts  = [0,0,0,0,0,0,0,0,0,0];

	this.team_pass_att    = [0,0,0,0,0,0];
	this.team_pass_comp   = [0,0,0,0,0,0];
	this.team_pass_yards  = [0,0,0,0,0,0];
	this.team_pass_firsts = [0,0,0,0,0,0];

	this.team_att_down     = [0,0,0,0,0,0,0,0];
	this.team_yards_down   = [0,0,0,0,0,0,0,0];
	this.team_success_down = [0,0,0,0,0,0,0,0];
	this.team_firsts_down  = [0,0,0,0,0,0,0,0];

	this.team_pass_att_down    = [0,0,0,0,0,0,0,0];
	this.team_pass_comp_down   = [0,0,0,0,0,0,0,0];
	this.team_pass_yards_down  = [0,0,0,0,0,0,0,0];
	this.team_pass_firsts_down = [0,0,0,0,0,0,0,0];

	this.team_quarter_totals = new Array(6);
	for (var i=0; i<6; i++) {
		this.team_quarter_totals[i] = [0,0,0,0,0,0,0,0,0,0,0,0];
	}

	this.playerRushingName = [[],[]];
	this.playerRushingStats = [[],[]];   //[att,yard,long,succ,fd]
	this.playerRushingStatsCombine = [true,true,false,true,true];

	this.playerPassingName = [[],[]];
	this.playerPassingStats = [[],[]];   //[comp,att,yard,td,int,pd,drop]
	this.playerPassingStatsCombine = [true,true,true,true,true,true,true];

	this.playerReceivingName = [[],[]];
	this.playerReceivingStats = [[],[]]; //[comp,att,drop,yard,long,yac,pd,fd]
	this.playerReceivingStatsCombine = [true,true,true,true,false,true,true,true];

	this.playerDefensiveName = [[],[]];
	this.playerDefensiveStats = [[],[]]; //[tot,rtack,rmiss,ptack,pmiss,sttack,stmiss]
	this.playerDefensiveStatsCombine = [true,true,true,true,true,true,true];

	this.playerDefensiveRushName = [[],[]];
	this.playerDefensiveRushStats = [[],[]]; //tack,miss,yards,ff,stop,defeat
	this.playerDefensivePassName = [[],[]];
	this.playerDefensivePassStats = [[],[]]; //tack,miss,yards,ff,stop,defeat,int,pd
	this.playerDefensiveSTName = [[],[]];
	this.playerDefensiveSTStats = [[],[]];   //tack,miss,yards,ff
	
	this.playerKickingName = [[],[]];
	this.playerKickingStats = [[],[]];   //[ko,yards,long,tb]
	this.playerKickingStatsCombine = [true,true,false,true];

	this.playerPuntingName = [[],[]];
	this.playerPuntingStats = [[],[]];   //[p,yards,long,tb,in20]
	this.playerPuntingStatsCombine = [true,true,false,true,true];

	this.playerKickReturnStats = [[],[]];
	this.playerKickReturnName = [[],[]]; //[kr,yards,long,td]
	this.playerKickReturnStatsCombine = [true,true,false,true];

	this.playerPuntReturnStats = [[],[]]; 
	this.playerPuntReturnName = [[],[]]; //[pr,yards,long,td]
	this.playerPuntReturnStatsCombine = [true,true,false,true];

	this.playerPenaltyName = [[],[]];
	this.playerPenaltyStats = [[],[]];   //[false start, offsides, encroachment]
	this.playerPenaltyStatsCombine = [true,true,true];
	
	this.distanceStats = new Array(4);
	for (var i=0; i<4; i++) {
		this.distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
		//>0cay - >5cay - >15cay
	}

	this.driveList = [[],[]];
}


//---------------------------------------------------------------------

function arraySum(arr,start) {
	var total = 0;
	for (var i=start; i<arr.length; i++) {
		total += arr[i];
	}
	return total;
}

function arrayPush(ct, arr1, data1, arr2, data2) {
	if (arr1 == null) console.log("arr1 is null");
	if (arr1[ct] == null) console.log("arr["+ct+"] is null");
	//console.log("ap arr1["+ct+"]--> "+arr1[ct]);
    var d = trim(data1);
	var index = arr1[ct].indexOf(d);
	if (index == -1) {
		index = arr1[ct].length;
		arr1[ct].push(d);
		arr2[ct].push(data2);
	}
	return index;
}

function getQuarterTable(index, length) {
	var title = "Quarter";
	var columns = ["","Total","1st","2nd","3rd","4th","OT"];
	var rows = ["Time of Poss.", "Plays", "Yards", "Yards / Play", "Penalties",
	            " ", 
	            "Rush Att","Rush Yards","Yards / Att","Success Rate",
	            " ",
	            "Pass Comp","Pass Att", "Comp. Pct","Pass Yards"];

	var c;
	if (length == 1) c = new Array(length+1);
	else c = new Array(length+2);

	for (var i=0; i<c.length; i++) {
		c[i] = columns[i];
	}
	return getTable(title,rows,c,index,"q");	
}

function getRushingTable(index) {
	var title = "Team Rushing";
	var columns = ["","Far Left","Left","Middle","Right","Far Right"];
	var rows = ["Attempts","Yards","Yards / Att","Success Rate"];

	return getTable(title,rows,columns,index,"r");	
}

function getPassingTable(index) {
	var title = "Team Passing";
	var columns = ["","Left","Middle","Right"];
	var rows = ["Completions","Attempts","Comp. Pct","Yards"];

	return getTable(title,rows, columns,index,"p");	
}

function getRushingByDownTable(index) {
	var title = "Rushing By Down";
	var columns = ["","First","Second","Third","Fourth"];
	var rows = ["Attempts","Yards","Yards / Att","Success Rate","First Downs"];

	return getTable(title,rows,columns,index,"rbd");	
}

function getPassingByDownTable(index) {
	var title = "Passing By Down";
	var columns = ["","First","Second","Third","Fourth"];
	var rows = ["Completions","Attempts","Comp. Pct","Yards","First Downs"];

	return getTable(title,rows,columns,index,"pbd");	
}

function getPassingDistanceTable(index) {
	var title = "Passing Distance";
	var columns = ["","Left","Middle","Right","Total"];
	var rows = ["Long","Medium","Short","Backfield","Total"];

	return getTable(title,rows,columns,index,"pd");	
}

function getQuarterbacksTable(index, rows) {
	var title = "Quarterbacks";
	var columns = ["Name","Att","Cmp","Yards","TD","Int","Drop","PD"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"tq",true);	
}

function getPassingTargetTable(index, rows) {
	var title = "Receivers";
	var columns = ["Name","Att","Cmp","Drop","PD","Pct.","Yards","Long","FD"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"tp",true);	
}

function getRushingTargetTable(index, rows) {
	var title = "Runners";
	var columns = ["Name","Att","Yards","YPC","Long","Success","FD"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"tr",true);	
}

function getRushDefenseTable(index, rows) {
	var columns = ["Name","Tkl","Miss","YPT","Stop","Defeat"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable("Run Defenders",r,columns,index,"defr",true);	
}
function getPassDefenseTable(index, rows) {
	var columns = ["Name","Tkl","Miss","YPT","Stop","Defeat","PD"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable("Pass Defenders",r,columns,index,"defp",true);	
}
function getSTDefenseTable(index, rows) {
	var title = " Defenders";
	var columns = ["Name","Tackles","Missed","YPT"];
	
	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"defst",true);	
}

function getKickingTable(index, rows) {
	var title = "Kicking";
	var columns = ["Name","Kickoffs","Yards","Avg","Long","Touchbacks"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"k",true);	
}

function getPuntingTable(index, rows) {
	var title = "Punting";
	var columns = ["Name","Punts","Yards","Avg","Long","TB","In 20"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"pu",true);	
}

function getPuntReturnTable(index, rows) {
	var title = "Punt Returns";
	var columns = ["Name","Returns","Yards","Avg","Long","TD"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"pr",true);	
}

function getKickReturnTable(index, rows) {
	var title = "Kick Returns";
	var columns = ["Name","Returns","Yards","Avg","Long","TD"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"kr",true);	
}

function getPenaltyTable(index, rows) {
	var title = "Penalties";
	var columns = ["Name","Total", "False Start","Offsides","Encroachment"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"pn",true);	
}

function getDriveTable(idx,arr) {
	var columns = ["Start Time","Time Poss","Drive Began",
	               "# of Plays","Net Yards","Result"];
	var rows = [];
	for each(var d in arr) {
		rows.push(d.quarter);
	}
	return getTable("Drives",rows,columns,idx,"dr");
}

function getTable(title, rows, columns, index, prefix, sortable) {
	var t = document.createElement("table");
	t.setAttribute("border","1");
	t.setAttribute("cellspacing","0");
	t.setAttribute("style","width: 485px;visibility: visible;");
	t.setAttribute('id','scout-'+prefix+""+index+'-table');

	var tr = document.createElement("tr");
	tr.setAttribute('class','nonalternating_color pbp_pbr_title');

	var td = document.createElement("td");
	td.setAttribute('id','team'+index+""+prefix);
	td.setAttribute('colspan',columns.length+1);
	td.setAttribute('align','center');
	td.appendChild(document.createTextNode(title));
	tr.appendChild(td);
	t.appendChild(tr);

	var tr2 = document.createElement("tr");
	tr2.setAttribute('class','nonalternating_color2 pbp_pbr_title');
	var first = document.createElement("td");
	first.setAttribute("align","left");
	first.appendChild(document.createTextNode(columns[0]));
	tr2.appendChild(first);
	if (sortable == true) {
		tr2.addEventListener("click",sortEvent,true);
	}
	for (var x=1; x<columns.length; x++) {
		var colname = document.createElement("td");
		var colname = document.createElement("td");
		colname.setAttribute('align','center');
		var tn = document.createTextNode(columns[x]);
		colname.appendChild(tn);
		tr2.appendChild(colname);
	}
	t.appendChild(tr2);

	for (var y=0; y<rows.length; y++) {
		var tr3 = document.createElement("tr");
		tr3.setAttribute('class','alternating_color'+(y%2+1)+' pbp_pbr_title_row');
		var rowname = document.createElement("td");
		rowname.appendChild(document.createTextNode(rows[y]));
		tr3.appendChild(rowname);
		for (var x=1; x<columns.length; x++) {
			var stat = document.createElement("td");
			stat.setAttribute('id',prefix+'-'+(x-1)+'-'+y+'-'+index);
			stat.setAttribute('align','center');
			stat.appendChild(document.createTextNode('('+(x-1)+','+y+')'));
			tr3.appendChild(stat);
		}
		t.appendChild(tr3);
	}
	return t;
}


function sortEvent(evt) {
	sortTable(evt.target.parentNode.parentNode,evt.target.cellIndex);
	return true;
}

function sortTable(table, column) {
	var rows = table.rows;
	var viz = table.getAttribute("style");
	table.setAttribute("style","visibility: hidden;");
	for (var i=2; i<rows.length-1; i++) {
		var idx = i;
		for (var j=i; j<rows.length-1; j++) {
			var lrow = rows.item(idx);
			var lcell = lrow.cells.item(column);
			var rrow = rows.item(j+1);
			var rcell = rrow.cells.item(column);
			var left = parseFloat(lcell.innerHTML);
			var right = parseFloat(rcell.innerHTML);
			if (isNaN(left) || isNaN(right)) {
				left = lcell.innerHTML.toLowerCase();
				right = rcell.innerHTML.toLowerCase();
				if (left > right) {
					idx = j+1;
				}
			}
			else {
				if (left < right) {
					idx = j+1;
				}
			}
		}
		if (idx != -1) {
			var r = table.rows.item(idx);
			table.deleteRow(idx);
			var newRow = table.insertRow(i);
			newRow.setAttribute("class","alternating_color"+(i%2+1)+" pbp_pbr_title_row");
			for (var x=0; x<r.cells.length; x++) {
				var cell = newRow.insertCell(x);		
				cell.setAttribute("align",r.cells.item(x).getAttribute("align"));
				cell.setAttribute("id",r.cells.item(x).getAttribute("id"));
				cell.innerHTML = r.cells.item(x).innerHTML;
			}
		}
	}
	if (rows.length != 2) {
		var lastRow = table.rows.item(rows.length-1);
		lastRow.setAttribute("class","alternating_color"+((rows.length-1)%2+1)+" pbp_pbr_title_row");
	}
	table.setAttribute("style",viz);
}

function changeVisibility(start,end) {
	var gs=document.getElementById("gamescout");
	gs.setAttribute("style","visibility: visible;");
	for (var i=-1; i<17; i++) {
		var t=document.getElementById("gsbar"+i);
		if (t != null) {
			t.setAttribute("style","visibility: visible;");
			t.setAttribute("class","subhead_link_bar");
		}
	}
	var t=document.getElementById("gsbar"+start);
	t.setAttribute("class","medium_head");

	if (start == "-1") {
		start = 0;
		end = 17;
	}
	
	var idx=0;
	var t=document.getElementById("row"+idx);
	while (t != null) {
		t.setAttribute("style","visibility: collapse;");
		idx++;
		t=document.getElementById("row"+idx);
	}
	for (var idx=start; idx<=end; idx++) {
		var t = document.getElementById("row"+idx);
		t.setAttribute("style","visibility: visible;");
	}

	/*
	for (var idx=0; true; idx++) {
		var t = document.getElementById("row"+idx);
		if (t == null) break;
		else t.setAttribute("style","visibility: visible;");
	}
	*/
}

function fillTables(stats) {

	for (var i=0; i<2; i++) {

		//quarter table assignment
		document.getElementById('team'+i+'q').innerHTML = stats.team_name[i] +" Totals By Quarter";

		var q=quarter;
		if (quarter != 1) {
			q++;
		}
		q=6; //fix me
		for (var x=0; x<q; x++) {
			var idx = i*6;
			var secs = "" + (stats.team_possession[x+idx] % 60);
			while (secs.length < 2) secs = "0" + secs;
			document.getElementById("q-"+x+"-0-"+i).innerHTML = 
				Math.floor(stats.team_possession[x+idx] / 60) + ":" + secs;
			var p = stats.team_quarter_totals[x][0+idx] + stats.team_quarter_totals[x][4+idx]
			                                                                           document.getElementById("q-"+x+"-1-"+i).innerHTML = p;
			var y = stats.team_quarter_totals[x][1+idx] + stats.team_quarter_totals[x][5+idx];
			document.getElementById("q-"+x+"-2-"+i).innerHTML = y.toFixed(0);
			var num = (y/p).toFixed(2);
			if (isNaN(num) == true) {
				num = 0.00;
			}
			document.getElementById("q-"+x+"-3-"+i).innerHTML = num;
			document.getElementById("q-"+x+"-4-"+i).innerHTML = stats.team_penalty[x+idx];

			document.getElementById("q-"+x+"-5-"+i).innerHTML = "";

			document.getElementById("q-"+x+"-6-"+i).innerHTML = stats.team_quarter_totals[x][0+idx];
			document.getElementById("q-"+x+"-7-"+i).innerHTML = stats.team_quarter_totals[x][1+idx].toFixed(0);
			var num = (stats.team_quarter_totals[x][1+idx] / stats.team_quarter_totals[x][0+idx]).toFixed(2);
			if (isNaN(num) == true) {
				num = 0.00;
			}
			document.getElementById("q-"+x+"-8-"+i).innerHTML = num;
			num = (100*stats.team_quarter_totals[x][2+idx] / stats.team_quarter_totals[x][0+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("q-"+x+"-9-"+i).innerHTML = num + "%";

			document.getElementById("q-"+x+"-10-"+i).innerHTML = "";

			document.getElementById("q-"+x+"-11-"+i).innerHTML = stats.team_quarter_totals[x][3+idx];
			document.getElementById("q-"+x+"-12-"+i).innerHTML = stats.team_quarter_totals[x][4+idx];
			num = (100*stats.team_quarter_totals[x][3+idx] / stats.team_quarter_totals[x][4+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("q-"+x+"-13-"+i).innerHTML = num + "%";
			document.getElementById("q-"+x+"-14-"+i).innerHTML = stats.team_quarter_totals[x][5+idx].toFixed(0);
		}
		//end quarter table assignment

		//rushing table assignment	
		document.getElementById('team'+i+'r').innerHTML = stats.team_name[i] +" Rushing Direction";
		for (x=0; x<5; x++) {
			var idx = i*5;
			document.getElementById("r-"+x+"-0-"+i).innerHTML = stats.team_att[x+idx];
			document.getElementById("r-"+x+"-1-"+i).innerHTML = stats.team_yards[x+idx].toFixed(0);
			num = (stats.team_yards[x+idx] / stats.team_att[x+idx]).toFixed(2);   
			if (isNaN(num) == true) {
				num = 0.00;
			}
			document.getElementById("r-"+x+"-2-"+i).innerHTML = num;
			num = (100*stats.team_success[x+idx] / stats.team_att[x+idx]).toFixed(0);   
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("r-"+x+"-3-"+i).innerHTML = num + "%";
			//document.getElementById("r-"+x+"-4-"+i).innerHTML = stats.team_firsts[x+idx];;
		}
		//end rushing table assignment

		//rushing by down table assignment	
		document.getElementById('team'+i+'rbd').innerHTML = stats.team_name[i] +" Rushing By Down";
		for (x=0; x<4; x++) {
			var idx = i*4;
			document.getElementById("rbd-"+x+"-0-"+i).innerHTML = stats.team_att_down[x+idx];
			document.getElementById("rbd-"+x+"-1-"+i).innerHTML = stats.team_yards_down[x+idx].toFixed(0);
			num = (stats.team_yards_down[x+idx] / stats.team_att_down[x+idx]).toFixed(2);   
			if (isNaN(num) == true) {
				num = 0.00;
			}
			document.getElementById("rbd-"+x+"-2-"+i).innerHTML = num;
			num = (100*stats.team_success_down[x+idx] / stats.team_att_down[x+idx]).toFixed(0);   
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("rbd-"+x+"-3-"+i).innerHTML = num + "%";
			document.getElementById("rbd-"+x+"-4-"+i).innerHTML = stats.team_firsts_down[x+idx];
		}
		//end rushing by down table assignment

		//passing table assignment	
		document.getElementById('team'+i+'p').innerHTML = stats.team_name[i] +" Passing Direction";
		for (x=0; x<3; x++) {
			var idx = i*3;
			document.getElementById("p-"+x+"-0-"+i).innerHTML = stats.team_pass_comp[x+idx];
			document.getElementById("p-"+x+"-1-"+i).innerHTML = stats.team_pass_att[x+idx];
			num = (100*stats.team_pass_comp[x+idx] / stats.team_pass_att[x+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("p-"+x+"-2-"+i).innerHTML = num + "%";
			document.getElementById("p-"+x+"-3-"+i).innerHTML = stats.team_pass_yards[x+idx].toFixed(0);
		}
		//end passing table assignment


		//passing by down table assignment	
		document.getElementById('team'+i+'pbd').innerHTML = stats.team_name[i] +" Passing By Down";
		for (x=0; x<4; x++) {
			var idx = i*4;
			document.getElementById("pbd-"+x+"-0-"+i).innerHTML = stats.team_pass_comp_down[x+idx];
			document.getElementById("pbd-"+x+"-1-"+i).innerHTML = stats.team_pass_att_down[x+idx];
			num = (100*stats.team_pass_comp_down[x+idx] / stats.team_pass_att_down[x+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("pbd-"+x+"-2-"+i).innerHTML = num + "%";
			document.getElementById("pbd-"+x+"-3-"+i).innerHTML = stats.team_pass_yards_down[x+idx].toFixed(0);
			document.getElementById("pbd-"+x+"-4-"+i).innerHTML = stats.team_pass_firsts_down[x+idx];
		}
		//end passing by down table assignment

		//distance table assignment
		document.getElementById("team"+i+"pd").innerHTML = stats.team_name[i] +" Passing Distance";
		for (x=0; x<3; x++) {
			var idx = x*3 + i*9;
			document.getElementById("pd-"+x+"-0-"+i).innerHTML = stats.distanceStats[0][idx]+" for "+stats.distanceStats[0][idx+2].toFixed(0);
			document.getElementById("pd-"+x+"-1-"+i).innerHTML = stats.distanceStats[1][idx]+" for "+stats.distanceStats[1][idx+2].toFixed(0);
			document.getElementById("pd-"+x+"-2-"+i).innerHTML = stats.distanceStats[2][idx]+" for "+stats.distanceStats[2][idx+2].toFixed(0);
			document.getElementById("pd-"+x+"-3-"+i).innerHTML = stats.distanceStats[3][idx]+" for "+stats.distanceStats[3][idx+2].toFixed(0);
		}

		for (var x=0; x<4; x++) {
			var idx = i*9;
			var n = (stats.distanceStats[x][idx] + stats.distanceStats[x][idx+3]   +stats.distanceStats[x][idx+6]) 
			+ " for " +
			(stats.distanceStats[x][idx+2]+stats.distanceStats[x][idx+5]+stats.distanceStats[x][idx+8]).toFixed(0);

			document.getElementById("pd-3-"+x+"-"+i).innerHTML = n;
		}

		for (var x=0; x<3; x++) {
			var idx = i*9;
			var n = (stats.distanceStats[0][x*3+idx] + stats.distanceStats[1][x*3+idx] +
					stats.distanceStats[2][x*3+idx] + stats.distanceStats[3][x*3+idx]) +
					" for " +
					(stats.distanceStats[0][x*3+idx+2] + stats.distanceStats[1][x*3+idx+2] +
							stats.distanceStats[2][x*3+idx+2] + stats.distanceStats[3][x*3+idx+2]).toFixed(0);
			document.getElementById("pd-"+x+"-4-"+i).innerHTML = n;
		}
		document.getElementById("pd-3-4-"+i).innerHTML = "";
		//distance table assignment

		document.getElementById("team"+i+"tq").innerHTML = stats.team_name[i] +" Passers";
		if (stats.playerPassingName[i] != null) {
			var t = document.getElementById("scout-tq"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerPassingName[i].length; x++) {
				var data = [];
				data.push(stats.playerPassingName[i][x]);
				data.push(stats.playerPassingStats[i][x][1]);
				data.push(stats.playerPassingStats[i][x][0]);
				data.push(stats.playerPassingStats[i][x][2].toFixed(0));
				data.push(stats.playerPassingStats[i][x][3]);
				data.push(stats.playerPassingStats[i][x][4]);
				data.push(stats.playerPassingStats[i][x][5]);
				data.push(stats.playerPassingStats[i][x][6]);
				addRowToTable(t,data);
			}
			sortTable(t,3);
		}

		document.getElementById("team"+i+"tr").innerHTML = stats.team_name[i] +" Runners";
		if (stats.playerRushingName[i] != null) {
			var t = document.getElementById("scout-tr"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerRushingName[i].length; x++) {
				var data = [];
				data.push(stats.playerRushingName[i][x]);
				data.push(stats.playerRushingStats[i][x][0]);
				data.push(stats.playerRushingStats[i][x][1].toFixed(0));

				num = (stats.playerRushingStats[i][x][1] / stats.playerRushingStats[i][x][0]).toFixed(2);
				if (isNaN(num) == true) {
					num = 0.00;
				}
				data.push(num);
				data.push(stats.playerRushingStats[i][x][2].toFixed(0));

				num = (100*stats.playerRushingStats[i][x][3] / stats.playerRushingStats[i][x][0]).toFixed(0);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num + "%");

				data.push(stats.playerRushingStats[i][x][4]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"tp").innerHTML = stats.team_name[i] +" Receivers";
		if (stats.playerReceivingName[i] != null) {
			var t = document.getElementById("scout-tp"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerReceivingName[i].length; x++) {
				var data = [];
				data.push(stats.playerReceivingName[i][x]);
				data.push(stats.playerReceivingStats[i][x][1]);
				data.push(stats.playerReceivingStats[i][x][0]);
				data.push(stats.playerReceivingStats[i][x][2].toFixed(0));
				data.push(stats.playerReceivingStats[i][x][6]);

				num = (100*stats.playerReceivingStats[i][x][0] / stats.playerReceivingStats[i][x][1]).toFixed(0);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num + "%");

				data.push(stats.playerReceivingStats[i][x][3].toFixed(0));
				data.push(stats.playerReceivingStats[i][x][4].toFixed(0));
				data.push(stats.playerReceivingStats[i][x][7]);
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"k").innerHTML = stats.team_name[i] +" Kickers";
		if (stats.playerKickingName[i] != null) {
			var t = document.getElementById("scout-k"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerKickingName[i].length; x++) {
				var data = [];
				data.push(stats.playerKickingName[i][x]);
				data.push(stats.playerKickingStats[i][x][0]);
				data.push(stats.playerKickingStats[i][x][1].toFixed(0));
				num = (stats.playerKickingStats[i][x][1] / stats.playerKickingStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				data.push(stats.playerKickingStats[i][x][2].toFixed(0));
				data.push(stats.playerKickingStats[i][x][3]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"pu").innerHTML = stats.team_name[i] +" Punters";
		if (stats.playerPuntingName[i] != null) {
			var t = document.getElementById("scout-pu"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerPuntingName[i].length; x++) {
				var data = [];
				data.push(stats.playerPuntingName[i][x]);
				data.push(stats.playerPuntingStats[i][x][0]);
				data.push(stats.playerPuntingStats[i][x][1].toFixed(0));
				num = (stats.playerPuntingStats[i][x][1] / stats.playerPuntingStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				data.push(stats.playerPuntingStats[i][x][2].toFixed(0));
				data.push(stats.playerPuntingStats[i][x][3]);
				data.push(stats.playerPuntingStats[i][x][4]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"kr").innerHTML = stats.team_name[i] +" Kick Returns";
		if (stats.playerKickReturnName[i] != null) {
			var t = document.getElementById("scout-kr"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerKickReturnName[i].length; x++) {
				var data = [];
				data.push(stats.playerKickReturnName[i][x]);
				data.push(stats.playerKickReturnStats[i][x][0]);
				data.push(stats.playerKickReturnStats[i][x][1].toFixed(0));
				num = (stats.playerKickReturnStats[i][x][1] / stats.playerKickReturnStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				data.push(stats.playerKickReturnStats[i][x][2].toFixed(0));
				data.push(stats.playerKickReturnStats[i][x][3]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"pr").innerHTML = stats.team_name[i] +" Punt Returns";
		if (stats.playerPuntReturnName[i] != null) {
			var t = document.getElementById("scout-pr"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerPuntReturnName[i].length; x++) {
				var data = [];
				data.push(stats.playerPuntReturnName[i][x]);
				data.push(stats.playerPuntReturnStats[i][x][0]);
				data.push(stats.playerPuntReturnStats[i][x][1].toFixed(0));
				num = (stats.playerPuntReturnStats[i][x][1] / stats.playerPuntReturnStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				data.push(stats.playerPuntReturnStats[i][x][2].toFixed(0));
				data.push(stats.playerPuntReturnStats[i][x][3]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"pn").innerHTML = stats.team_name[i] +" Penalties";
		if (stats.playerPuntReturnName[i] != null) {
			var t = document.getElementById("scout-pn"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerPenaltyName[i].length; x++) {
				var data = [];
				data.push(stats.playerPenaltyName[i][x]);

				num = arraySum(stats.playerPenaltyStats[i][x],0);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);

				data.push(stats.playerPenaltyStats[i][x][0]);
				data.push(stats.playerPenaltyStats[i][x][1]);
				data.push(stats.playerPenaltyStats[i][x][2]);
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}
		
		document.getElementById("team"+i+"defr").innerHTML = stats.team_name[i] +" Run Defenders";
		if (stats.playerDefensiveRushName[i] != null) {
			var t = document.getElementById("scout-defr"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerDefensiveRushName[i].length; x++) {
				var data = [];
				data.push(stats.playerDefensiveRushName[i][x]);
				data.push(stats.playerDefensiveRushStats[i][x][0]);
				data.push(stats.playerDefensiveRushStats[i][x][1]);

				var num = (stats.playerDefensiveRushStats[i][x][2] / 
						stats.playerDefensiveRushStats[i][x][0]).toFixed(2);
				if (isNaN(num) == true) num = 0.00;
				data.push(num);

				data.push(stats.playerDefensiveRushStats[i][x][3]);
				data.push(stats.playerDefensiveRushStats[i][x][4]);
				//data.push(stats.playerDefensiveRushStats[i][x][5]);//FF
				if (arraySum(data,1) == 0) continue;
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}
		
		document.getElementById("team"+i+"defp").innerHTML = stats.team_name[i] +" Pass Defenders";
		if (stats.playerDefensivePassName[i] != null) {
			var t = document.getElementById("scout-defp"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerDefensivePassName[i].length; x++) {
				var data = [];
				data.push(stats.playerDefensivePassName[i][x]);
				data.push(stats.playerDefensivePassStats[i][x][0]);
				data.push(stats.playerDefensivePassStats[i][x][1]);

				var num = (stats.playerDefensivePassStats[i][x][2] / 
						stats.playerDefensivePassStats[i][x][0]).toFixed(2);
				if (isNaN(num) == true) num = 0.00;
				data.push(num);
				
				data.push(stats.playerDefensivePassStats[i][x][3]);
				data.push(stats.playerDefensivePassStats[i][x][4]);
				//data.push(stats.playerDefensivePassStats[i][x][5]); //FF
				//data.push(stats.playerDefensivePassStats[i][x][6]); //INT
				data.push(stats.playerDefensivePassStats[i][x][7]);
				if (arraySum(data,1) == 0) continue;
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}
		
		document.getElementById("team"+i+"defst").innerHTML = stats.team_name[i] +" Defenders";
		if (stats.playerDefensiveSTName[i] != null) {
			var t = document.getElementById("scout-defst"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerDefensiveSTName[i].length; x++) {
				var data = [];
				data.push(stats.playerDefensiveSTName[i][x]);
				data.push(stats.playerDefensiveSTStats[i][x][0]);
				data.push(stats.playerDefensiveSTStats[i][x][1]);

				var num = (stats.playerDefensiveSTStats[i][x][2] / 
						stats.playerDefensiveSTStats[i][x][0]).toFixed(2);
				if (isNaN(num) == true) num = 0.00;
				data.push(num);

				//data.push(stats.playerDefensiveSTStats[i][x][3]);
				if (arraySum(data,1) == 0) continue;
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}
		
		if ((window.location+"").match("&mode=pbp") != null) {
			//drive table start
			document.getElementById('team'+i+"dr").innerHTML = stats.team_name[i] +" Drive Chart (not 100% correct)";
			if (stats.driveList[i] != null) {
				var t = document.getElementById("scout-dr"+i+"-table");
				while (t.rows.length > 2) {
					t.deleteRow(2);
				}
				for (x=0; x<stats.driveList[i].length; x++) {
					var drive = stats.driveList[i][x];
					var data = [];
					
					data.push(drive.startTime);
					var start = convertTime(drive.startTime);
					var end = convertTime(drive.endTime);
					if (start < end) start += 900;
					var time = start - end;
					var timestr = time%60 + "";
					while (timestr.length < 2) timestr = "0"+timestr;
					timestr = parseInt(time/60)+":"+timestr;
					data.push(timestr);
					
					data.push(drive.driveBegan);
					data.push(drive.numOfPlays);
					data.push(yardDiff(drive.driveBegan,drive.driveEnded));
					data.push(drive.result);
					addRowToTable(t,data);
				}
			}
			//drive table end
		}
		else {
			var t = document.getElementById("scout-dr"+i+"-table");
			t.setAttribute("style","visibility: collapse;");
		}
	}
}

function convertTime(s) {
	if (s == null) {
		console.log("convertTime == null");
		return 0;
	}
	var v = s.split(':');
	return parseFloat(v[0])*60 + parseFloat(v[1]);
}

function yardReverse(marker) {
	var y = parseFloat(marker.slice(4));
	if (marker.indexOf("OWN") == 0) return "OPP "+y;
	else return "OWN "+y;
}

function kickDistance(start, add) {
	if ((start == null) || (add == null)) return 0;
	var y = parseFloat(start.slice(4));
	if (start.slice(0,3) == "OPP") {
		y = 100-y;
	}
	y += add;
	if (y < 50) {
		y = "OWN "+y;
	}
	else {
		y = 100 - y;
		y = "OPP "+y;
	}
	return y;
}

function yardAddition(start, add) {
	if ((start == null) || (add == null)) return 0;
	var y = parseFloat(start.slice(4));
	if (start.slice(0,3) == "OPP") {
		y += 50;
	}
	y += add;
	if (y < 50) {
		y = "OWN "+y;
	}
	else {
		y = 100 - y;
		y = "OPP "+y;
	}
	//console.log(start+" - "+add+" : "+y);
	return y;
}

function yardDiff(start, end) {
	if ((start == null) || (end == null)) return 0;
	var starty = parseFloat(start.slice(4));
	var endy = parseFloat(end.slice(4));
	//console.log(starty+"--"+endy);
	var yards = -1000;
	if (start.slice(0,3) == "OWN") {
		if (end.slice(0,3) == "OWN") {
			yards = endy - starty;
		}
		else {
			yards = 100-endy-starty;
		}
	}
	else if (start.slice(0,3) == "OPP") {
		if (end.slice(0,3) == "OPP") {
			yards = starty - endy;
		}
		else {
			yards = starty+endy-100;
		}
	}
	return yards;
}

function Drive() {
	this.quarter;
	this.startTime;
	this.endTime;
	this.driveBegan;
	this.driveEnded;
	this.numOfPlays = 0;
	this.netYards = 0;
	this.result;

	this.toString = function() {
		return this.quarter+" : "+this.startTime+" : "+this.endTime+" : " +
		this.timePoss+" : "+this.driveBegan+" : " +
		this.driveEnded+" : "+this.numOfPlays+" : " +
		yardDiff(this.driveBegan,this.driveEnded) +
		" : "+this.result;
	}
}

function Play() {
	this.quarter;
	this.team;
	this.timeRemaining;
	this.marker;
	this.down;
	this.togo;
	this.play;
	this.replay;
	this.yards;
	
	this.toString = function() {
		return this.quarter+" : "+this.team+" - "+this.timeRemaining+" - "+
		this.marker+" - "+this.down+"&"+this.togo;
	}
}

function penaltyHandler(stats, p) {
	var playText = p.play;

	var s1 = playText.indexOf(" penalty committed by ")
	var s2 = s1 + (" penalty committed by ").length;
	
	var penalty = playText.slice(0,s1);
	var player = playText.slice(s2);
	
	if (penalty == "False start") {
		var ct = current_team;
		var playerIndex = arrayPush(ct,stats.playerPenaltyName,player,
				stats.playerPenaltyStats,[0,0,0]);
		stats.playerPenaltyStats[ct][playerIndex][0] += 1;
		stats.team_penalty[ct*6+0] += 1;
		stats.team_penalty[ct*6+(parseFloat(p.quarter))] += 1;
	}
	else if (penalty == "Offside") {
		var ct = (current_team+1)%2;
		var playerIndex = arrayPush(ct,stats.playerPenaltyName,player,
				stats.playerPenaltyStats,[0,0,0]);
		stats.playerPenaltyStats[ct][playerIndex][1] += 1;
		stats.team_penalty[ct*6+0] += 1;
		stats.team_penalty[ct*6+(parseFloat(p.quarter))] += 1;
	}
	else if (penalty == "Encroachment") {
		var ct = (current_team+1)%2;
		var playerIndex = arrayPush(ct,stats.playerPenaltyName,player,
				stats.playerPenaltyStats,[0,0,0]);
		stats.playerPenaltyStats[ct][playerIndex][2] += 1;
		stats.team_penalty[ct*6+0] += 1;
		stats.team_penalty[ct*6+(parseFloat(p.quarter))] += 1;
	}
	else {
		console.log("report this!!! ==>> unknown penalty : "+penalty);
	}	
	
	return stats;
}

function defenseHandler(stats, shift, p, playType) { //playText, playType) {
	//defenders
	var playText = p.play;
	var ct = (current_team+1)%2;
	var dt = false;
	var s1 = playText.indexOf("[tackle: ");		
	if (s1 == -1) {
		s1 = playText.indexOf("[diving tackle: ");
		dt = true;
	}
	if (s1 != -1) {
		if (dt == false) s1 += "[tackle: ".length;
		else s1 += "[diving tackle: ".length;

		var s2 = playText.slice(s1).indexOf("]");
		s = playText.slice(s1,s1+s2);
		//s = trim(s); //am I necessary?
		//console.log(s);
		
		var defeat = false;
		var stop = 0.45;
		if (p.down == 2) stop = 0.6;
		if (p.down > 2) {
			stop = 1.0;
			defeat = true;
		}
		if (playType == "rush") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveRushName,s,
					stats.playerDefensiveRushStats,[0,0,0,0,0,0]);
			stats.playerDefensiveRushStats[ct][playerIndex][0] += 1;
			stats.playerDefensiveRushStats[ct][playerIndex][2] += p.yards;
			if (p.yards < (p.togo*stop)) {
				stats.playerDefensiveRushStats[ct][playerIndex][3] += 1;
				if ((defeat == true) || (p.yards < 0)) {
					stats.playerDefensiveRushStats[ct][playerIndex][4] += 1;
				}
			}
			//console.log(stats.playerDefensiveRushName[ct][playerIndex]+" -- "+stats.playerDefensiveRushStats[ct][playerIndex]+" : "+p.play);		
		}
		else if (playType == "pass") {
			var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
					stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
			stats.playerDefensivePassStats[ct][playerIndex][0] += 1;
			stats.playerDefensivePassStats[ct][playerIndex][2] += p.yards;
			if (p.yards < (p.togo*stop)) {
				stats.playerDefensivePassStats[ct][playerIndex][3] += 1;
				if ((defeat == true) || (p.yards < 0)) {
					stats.playerDefensivePassStats[ct][playerIndex][4] += 1;
				}
			}
		}
		else if (playType == "st") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveSTName,s,
					stats.playerDefensiveSTStats,[0,0,0,0]);
			stats.playerDefensiveSTStats[ct][playerIndex][0] += 1;
			stats.playerDefensiveSTStats[ct][playerIndex][2] += p.yards;
		}
		else console.log("defenseHandler says WTF?!?!");
	}

	var string = p.play+"";
	while ( (s1 = string.indexOf("[missed tackle: ")) != -1) {
		string = string.slice(s1+"[missed tackle: ".length);
		s2 = string.indexOf("]");
		s = string.slice(0,s2); 
		//s = trim(s); // am I necessary?

		if (playType == "rush") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveRushName,s,
					stats.playerDefensiveRushStats,[0,0,0,0,0,0]);
			stats.playerDefensiveRushStats[ct][playerIndex][1] += 1;
		}
		else if (playType == "pass") {
			var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
					stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
			stats.playerDefensivePassStats[ct][playerIndex][1] += 1;
		}
		else if (playType == "st") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveSTName,s,
					stats.playerDefensiveSTStats,[0,0,0,0]);
			stats.playerDefensiveSTStats[ct][playerIndex][1] += 1;
		}
		else console.log("defenseHandler says WTF?!?!");
		
		string = string.slice(s2);
	}
	
	//forced fumble
	string = p.play+"";
	if ( (s1 = string.indexOf("[forced fumble: ")) != -1) {
		string = string.slice(s1+"[forced fumble: ".length);
		s2 = string.indexOf("]");
		s = string.slice(0,s2); 
		
		if (playType == "rush") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveRushName,s,
					stats.playerDefensiveRushStats,[0,0,0,0,0,0]);
			stats.playerDefensiveRushStats[ct][playerIndex][5] += 1;
		}
		else if (playType == "pass") {
			var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
					stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
			stats.playerDefensivePassStats[ct][playerIndex][5] += 1;
		}
		else if (playType == "st") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveSTName,s,
					stats.playerDefensiveSTStats,[0,0,0,0]);
			stats.playerDefensiveSTStats[ct][playerIndex][3] += 1;
		}
		else console.log("defenseHandler says WTF?!?!");
	}
	if (playType == "pass") {
		/*
		//intercepted by
		string = p.play+"";
		if ( (s1 = string.indexOf(" intercepted by ")) != -1) {
			string = string.slice(s1+" intercepted by ".length);
			//s2 = string.indexOf("(");
			s2 = Math.min(string.indexOf("("),string.indexOf("["));
			if (string.indexOf(", PAT m") != -1) {
				s2 = Math.min(s2,string.indexOf(", PAT m"));
			}
			s = string.slice(0,s2); 
			s = trim(s);
			
			if (string.indexOf("yd return") != -1) {
				var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
						stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
				stats.playerDefensivePassStats[ct][playerIndex][6] += 1;
			}
		}
		*/
		
		//deflected by
		string = p.play+"";
		while ( (s1 = string.indexOf("[deflected by ")) != -1) {
			string = string.slice(s1+"[deflected by ".length);
			s2 = string.indexOf("]");
			s = string.slice(0,s2); 
			//s = trim(s); // am I necessary?
	
			if (string.indexOf("(incomplete)") != -1) {
				var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
						stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
				stats.playerDefensivePassStats[ct][playerIndex][7] += 1;
			}
			string = string.slice(s2);
		}
		
		string = p.play+"";
		if ( (s1 = string.indexOf(" sacked by ")) != -1) {
			string = string.slice(s1+" sacked by ".length);
			s2 = string.indexOf(" (");
			s = string.slice(0,s2); 
			
			console.log(p.yards+" -- "+p.play);
			if (p.yards < 0) {
				var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
						stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
				stats.playerDefensivePassStats[ct][playerIndex][0] += 1;
				stats.playerDefensivePassStats[ct][playerIndex][2] += p.yards;
				stats.playerDefensivePassStats[ct][playerIndex][3] += 1;
				stats.playerDefensivePassStats[ct][playerIndex][4] += 1;
			}
			else console.log("DH: fuckup?");
		}		
	}
	return stats;
}


function playHandler(stats, drive,p) {
	//console.log("playHandler loop: "+pages+" - "+p.replay);
	//console.log(p);
	//console.log(p.play);
	var playText = p.play;
	playText = trim(playText);
	var quarter = parseFloat(p.quarter);
	var down = parseFloat(p.down);
	var togo = -1;
	var minGain = -1;

	if (p.team == stats.team_name[0]) current_team = 0;
	else current_team = 1;

	try {
		try {
			if (p.togo ==  null) {
				p.togo = -1;
			}
			else if (p.togo == "G") {
				togo = parseFloat(p.marker.slice(4));
			}
			else if (p.togo.indexOf("inches") != -1) {
				togo = 0.5;
			}
			else {
				togo = parseFloat(p.togo);
			}
		}
		catch (err) {
			console.log(err);
			togo = 0.5;
		}
		if (down == 1) {
			minGain = togo*0.40;
		}
		else if (down == 2) {
			minGain = togo*0.60;
		}
		else {
			minGain = togo;
		}
		var sp = -1;
		var ep = -1;
		var y = NaN;
		var yt;

		var line = playText;
		do {
			//unfortunately, some people have parentheses in their names
			sp = line.indexOf('(')+1;
			ep = line.indexOf(')');
			if ((sp == -1) || (ep == -1)) {
				//no parentheses left in this line
				y = NaN;
				break;
			}
			else {
				//one complete set of parentheses found
				yt = line.slice(sp,ep);
				if (yt.indexOf("incomplete") != -1) {
					y = 0;
				}
				else if (yt.indexOf("no gain") != -1) {
					y = 0;
				}
				else {
					y = parseFloat(yt);
				}
				line = line.slice(ep+1);

				if(yt.indexOf(" yd gain") != -1) {
					//y = y;
				}
				else if(yt.indexOf(" yd loss") != -1) {
					y = -y;
				}
			}
		} while (isNaN(y) == true);
	}
	catch (error) {
		console.log(error);
	}
	p.yards = y;

	if (drive.numOfPlays == 0) {
		drive.driveBegan = null;
		drive.quarter = quarter;
		lastDrive.endTime = p.timeRemaining;
	}
	if (drive.startTime == null) {
		drive.startTime = p.timeRemaining;
	}
	if (drive.driveBegan == null) {
		drive.driveBegan = p.marker;
	}
	drive.endTime = p.timeRemaining;
	drive.driveEnded = p.marker; // fix me?
	drive.numOfPlays++;
	//console.log(drive+" -- "+playText.slice(0,30));


	if ((playText.match(" rush") != null) || (playText.match(" pitch to ") != null)) {
		//console.log("rush "+playText.slice(0,20));

		var inside = true;
		if (playText.match(" pitch to ") != null) {
			inside = false;
		}

		if ((yt.indexOf(" yd return") != -1) || (playText.indexOf("(touchback)") != -1)) {
			//must have been a fumble here
			//can't include without calculating the position
			//and still won't know the direction of the run
			if (drive.numOfPlays == 1) {
				lastDrive.result = "Fumble";
				lastDrive.numOfPlays += 1;
				if (lastDrive.driveBegan == null) {
					lastDrive.driveBegan = p.marker;
				}
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				if (playText.indexOf("[TD]") != -1) {
					drive.result = "Touchdown";
					drive.driveEnded = "OPP 0";
					drive.driveStarted = p.marker;
				}
			}
			// can't display this stuff as I don't know
			// which team recovered if the play was the
			// first play of a drive
			// stats = defenseHandler(stats,0,p,"rush");
		}	
		else if(playText.indexOf("[SAFETY]") != -1) {
			//must have been a safety here
			//and, of course, it's a possession for the wrong team
			//ignoring it for now as we don't know where the runner was tackled
			if (drive.numOfPlays == 1) {
				lastDrive.result = "Safety";
			}
			stats = defenseHandler(stats,0,p,"rush");
		}	
		else {
			// 0 - 1 - 2 - 3 - 4
			var index = current_team * 5;
			var r1 = -1;
			var r2 = -1;
			var s;
			if (inside == false) {
				if ( (r2 = playText.indexOf(" to the left")) != -1) {
					//index += 0;
				}
				else if( (r2 = playText.indexOf(" up the middle")) != -1) {
					// sometimes outside runs get stuffed immediately, so
					// I'm just calling it a middle run regardless
					index += 2; 
				}
				else if ( (r2 = playText.indexOf(" to the right")) != -1) {
					index += 4;
				}
				r3 = playText.indexOf("[missed");
				if (r3 != -1) {
					if (playText[r3-1] == ' ') r3--;
					r2 = Math.min(r2,r3);
				}
				r3 = playText.indexOf(", out of bounds ");
				if (r3 != -1) {
					if (playText[r3-1] == ' ') r3--;
					r2 = Math.min(r2,r3);
				}
				r1 = playText.slice(0,r2).indexOf(" pitch to ")+" pitch to ".length;
				s = playText.slice(r1,r2);
				if ( (r2 = s.indexOf(", PAT m")) != -1) {
					s = s.slice(0,r2);
				}
			}
			else {
				if ( (r2=playText.indexOf(" to the left")) != -1) {
					index += 1;
				}
				else if ( (r2=playText.indexOf(" up the middle")) != -1) {
					index += 2;
				}
				else if ( (r2=playText.indexOf(" to the right")) != -1) {
					index += 3;
				}
				r1 = 0;
				r2 = playText.indexOf(" rush");
				r3 = playText.indexOf("[missed");
				if (r3 != -1) r2 = Math.min(r2,r3);
				s = playText.slice(r1,r2);
			}

			var playerIndex = arrayPush(current_team,stats.playerRushingName,s,
					stats.playerRushingStats,[0,0,0,0,0]);
			stats.team_att[index] += 1;
			stats.team_yards[index] += y;

			stats.team_quarter_totals[0][0+current_team*6] += 1;
			stats.team_quarter_totals[0][1+current_team*6] += y;
			stats.team_quarter_totals[quarter][0+current_team*6] += 1;
			stats.team_quarter_totals[quarter][1+current_team*6] += y;

			stats.team_att_down[(down-1)+(current_team*4)] += 1;
			stats.team_yards_down[(down-1)+(current_team*4)] += y;

			stats.playerRushingStats[current_team][playerIndex][0] += 1;
			stats.playerRushingStats[current_team][playerIndex][1] += y;
			stats.playerRushingStats[current_team][playerIndex][2] =
				Math.max(stats.playerRushingStats[current_team][playerIndex][2],y);		
			if (y >= minGain) {
				stats.team_success[index] += 1;
				stats.team_success_down[(down-1)+(current_team*4)] += 1;

				stats.team_quarter_totals[0][2+current_team*6] += 1;
				stats.team_quarter_totals[quarter][2+current_team*6] += 1;

				stats.playerRushingStats[current_team][playerIndex][3] += 1;
			}
			if (y >= togo) {
				stats.team_firsts[index] += 1;
				stats.team_firsts_down[(down-1)+(current_team*4)] += 1;
				stats.playerRushingStats[current_team][playerIndex][4] += 1;
			}

			stats = defenseHandler(stats,0,p,"rush");

			if (playText.indexOf("[TD]") != -1) {
				drive.result = "Touchdown";
				drive.driveEnded = "OPP 0";
			}
		}
		//console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
	}
	else if (playText.indexOf(" pass to ") != -1) {		
		var index = current_team * 3;
		var dindex;

		var p1 = playText.indexOf(" pass to ")+" pass to ".length;
		var p2;
		if (playText.indexOf(" up the left side") != -1) {
			//index += 0;
			dindex = 0;
			p2 = playText.indexOf(" up the left side");
		}
		else if(playText.indexOf(" over the middle") != -1) {
			index += 1;
			dindex = 1;
			p2 = playText.indexOf(" over the middle");
		}
		else if (playText.indexOf(" up the right side") != -1) {
			index += 2;
			dindex = 2;
			p2 = playText.indexOf(" up the right side");
		}

		var d = current_team*9 + dindex*3;

		var s = playText.slice(p1,p2);
		var h = s.indexOf(", hurried by");
		if (h != -1) {
			s = s.slice(0,h);
		}

		var qbn = playText.slice(0,playText.indexOf(" pass to"));
		var qbIndex = arrayPush(current_team,stats.playerPassingName,qbn,
				stats.playerPassingStats,[0,0,0,0,0,0,0]);

		var playerIndex = arrayPush(current_team,stats.playerReceivingName,s,
				stats.playerReceivingStats,[0,0,0,0,0,0,0,0]);
		
		if ((yt.indexOf(" yd return") != -1) || (playText.indexOf("(touchback)") != -1)) {
			// some sort of turnover
			if ((playText.indexOf(" intercepted by ") != -1) &&
					(playText.indexOf("fumbled , recovered by") == -1)) {
				//intercepted & not fumbled

				stats.team_pass_att[(index+3)%6] += 1;
				stats.team_pass_att_down[((down-1)+(current_team*4)+4)%8] += 1;

				stats.team_quarter_totals[0][4+((current_team*6)+6)%12] += 1;
				stats.team_quarter_totals[quarter][4+((current_team*6)+6)%12] += 1;

				stats.playerPassingName[current_team].pop();
				stats.playerPassingStats[current_team].pop();
				stats.playerReceivingName[current_team].pop();
				stats.playerReceivingStats[current_team].pop();
				current_team = (current_team+1)%2;                

				var qbIndex = arrayPush(current_team,stats.playerPassingName,qbn,
						stats.playerPassingStats,[0,0,0,0,0,0,0]);
				var playerIndex = arrayPush(current_team,stats.playerReceivingName,s,
						stats.playerReceivingStats,[0,0,0,0,0,0,0,0]);
				stats.playerPassingStats[current_team][qbIndex][1] += 1;   //att
				stats.playerReceivingStats[current_team][playerIndex][1] += 1;
				stats.playerPassingStats[current_team][qbIndex][4] += 1;   //int
				if (playText.indexOf("[deflected by ") != -1) {
					stats.playerReceivingStats[current_team][playerIndex][6] += 1; //pd
					stats.playerPassingStats[current_team][qbIndex][6] += 1;
				}
				
				//can't do it yet
				//stats = defenseHandler(stats,2,p,"pass");
				current_team = (current_team+1)%2;
				if (drive.numOfPlays == 1) {
					lastDrive.result = "Interception";
					//console.log(lastDrive.endTime+" -- "+drive.startTime+" -- "+p.timeRemaining);
					lastDrive.numOfPlays += 1;
					lastDrive.endTime = p.timeRemaining;
					if (lastDrive.driveBegan == null) {
						lastDrive.driveBegan = p.marker;
					}
					//console.log(lastDrive+"\n\n"+drive);
					lastDrive.driveEnded = p.marker;

					drive.numOfPlays = 0;
					if (playText.indexOf("[TD]") != -1) {
						drive.result = "Touchdown";
						drive.driveEnded = "OPP 0";
						drive.driveStarted = p.marker;
					}
				}
			}
			else if ((playText.indexOf(" intercepted by ") != -1) &&
					(playText.indexOf("fumbled , recovered by") != -1)) { 
				// intercepted and fumbled
				// can't display this stuff as I don't know
				// which team recovered if the play was the
				// first play of a drive
				//stats = defenseHandler(stats,2,p,"pass");
			}
			else if ((playText.indexOf(" intercepted by ") == -1) &&
					(playText.indexOf(" recovered by") != -1)) {
				stats.playerPassingName[current_team].pop();
				stats.playerPassingStats[current_team].pop();
				stats.playerReceivingName[current_team].pop();
				stats.playerReceivingStats[current_team].pop();
				// not intercepted, but fumbled reception
				// can't display this stuff as I don't know
				// which team recovered if the play was the
				// first play of a drive
				//stats = defenseHandler(stats,2,p,"pass");
			}
		}	
		else if (yt.indexOf("incomplete") != -1) {
			stats.team_pass_att[index] += 1;
			stats.team_pass_att_down[(down-1)+(current_team*4)] += 1;

			stats.team_quarter_totals[0][4+current_team*6] += 1;
			stats.team_quarter_totals[quarter][4+current_team*6] += 1;

			stats.playerPassingStats[current_team][qbIndex][1] += 1;
			stats.playerReceivingStats[current_team][playerIndex][1] += 1;
			if (yt.indexOf("dropped - incomplete") != -1) {
				stats.playerPassingStats[current_team][qbIndex][5] += 1;
				stats.playerReceivingStats[current_team][playerIndex][2] += 1;
			}
			if (playText.indexOf("[deflected by ") != -1) {
				stats.playerPassingStats[current_team][qbIndex][6] += 1;
				stats.playerReceivingStats[current_team][playerIndex][6] += 1;
				
				stats = defenseHandler(stats,2,p,"pass");
			}
		}
		else {
			stats.team_pass_comp[index] += 1;
			stats.team_pass_att[index] += 1;
			stats.team_pass_yards[index] += y;

			stats.team_quarter_totals[0][3+current_team*6] += 1;
			stats.team_quarter_totals[0][4+current_team*6] += 1;
			stats.team_quarter_totals[0][5+current_team*6] += y;
			stats.team_quarter_totals[quarter][3+current_team*6] += 1;
			stats.team_quarter_totals[quarter][4+current_team*6] += 1;
			stats.team_quarter_totals[quarter][5+current_team*6] += y;

			stats.team_pass_att_down[(down-1)+(current_team*4)] += 1;
			stats.team_pass_comp_down[(down-1)+(current_team*4)] += 1;
			stats.team_pass_yards_down[(down-1)+(current_team*4)] += y;

			stats.playerPassingStats[current_team][qbIndex][0] += 1;
			stats.playerPassingStats[current_team][qbIndex][1] += 1;
			stats.playerPassingStats[current_team][qbIndex][2] += y;

			stats.playerReceivingStats[current_team][playerIndex][0] += 1;
			stats.playerReceivingStats[current_team][playerIndex][1] += 1;
			stats.playerReceivingStats[current_team][playerIndex][3] += y;
			stats.playerReceivingStats[current_team][playerIndex][4] =
				Math.max(stats.playerReceivingStats[current_team][playerIndex][4],y);
			if (playText.indexOf("[deflected by ") != -1) {
				stats.playerPassingStats[current_team][qbIndex][6] += 1;
				stats.playerReceivingStats[current_team][playerIndex][6] += 1;
			}
			if (y >= togo) {
				stats.team_pass_firsts[index] += 1;
				stats.team_pass_firsts_down[(down-1)+(current_team*4)] += 1;
				stats.playerReceivingStats[current_team][playerIndex][7] += 1;
			}

			if (y >= longPass) {
				stats.distanceStats[0][d] += 1;
				stats.distanceStats[0][d+1] += 1;
				stats.distanceStats[0][d+2] += y;
			}
			else if (y >= mediumPass) {
				stats.distanceStats[1][d] += 1;
				stats.distanceStats[1][d+1] += 1;
				stats.distanceStats[1][d+2] += y;
			}
			else if (y >= shortPass) {
				stats.distanceStats[2][d] += 1;
				stats.distanceStats[2][d+1] += 1;
				stats.distanceStats[2][d+2] += y;
			}
			else {
				stats.distanceStats[3][d] += 1;
				stats.distanceStats[3][d+1] += 1;
				stats.distanceStats[3][d+2] += y;
			}

			//stats = defenseHandler(stats,2,playText,"pass");
			stats = defenseHandler(stats,2,p,"pass");

			if (playText.indexOf("[TD]") != -1) {
				drive.result = "Touchdown";
				drive.driveEnded = "OPP 0";
				stats.playerPassingStats[current_team][qbIndex][3] += 1;
			}
		}
		//console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
	}
	else if (playText.indexOf("Kickoff by ") == 0) {
		var ct = (current_team+1)%2;
		var s1 = "Kickoff by ".length;

		var s2 = playText.slice(s1).indexOf(', ');
		var s = playText.slice(s1,s1+s2);
		var playerIndex = arrayPush(ct,stats.playerKickingName,s,
				stats.playerKickingStats,[0,0,0,0]);

		var s3 = playText.slice(s1+s2).indexOf(" yd");
		var len = parseInt(playText.slice(s1+s2+s3-3,s1+s2+s3),10);
		if (playText.indexOf(", fumbled") == -1) {
			stats.playerKickingStats[ct][playerIndex][0] += 1;
			stats.playerKickingStats[ct][playerIndex][1] += len;
			if (len > stats.playerKickingStats[ct][playerIndex][2]) {
				stats.playerKickingStats[ct][playerIndex][2] = len;
			}
			if (playText.indexOf("(touchback)") != -1) {
				stats.playerKickingStats[ct][playerIndex][3] += 1;
			}
			else if (playText.indexOf(" yd return)") != -1) {
				var ct = current_team;
				var namestr = playText.slice(playText.indexOf(" fielded by ")+" fielded by ".length);

				var yidx = namestr.indexOf(" yd return)")-6;
				yidx = yidx+namestr.slice(yidx).indexOf(" (");
				var y = parseFloat(namestr.slice(yidx+2));

				var namestr = namestr.slice(0,yidx);
				if (namestr.indexOf(" [missed tackle:") != -1) {
					namestr = namestr.slice(0,namestr.indexOf(" [missed tackle:"));
				}

				if (namestr.indexOf(", PAT m") != -1) {
					namestr = namestr.slice(0,namestr.indexOf(", PAT m"));
				}
				var playerIndex = arrayPush(ct, stats.playerKickReturnName,namestr,
						stats.playerKickReturnStats,[0,0,0,0]);
				stats.playerKickReturnName[ct][playerIndex] = namestr;
				stats.playerKickReturnStats[ct][playerIndex][0] += 1; 
				stats.playerKickReturnStats[ct][playerIndex][1] += y;
				if (y > stats.playerKickReturnStats[ct][playerIndex][2]) {
					stats.playerKickReturnStats[ct][playerIndex][2] = y;
				}
			}

			stats = defenseHandler(stats,4,p,"st");

			drive.startTime = p.timeRemaining;
			if (playText.indexOf("[TD]") != -1) {
				drive.driveBegan = kickDistance("OPP 30",-len);
				drive.driveEnded = "OPP 0";
				drive.result = "Touchdown";
				stats.playerKickReturnStats[ct][playerIndex][3] += 1;
			}
			else if (playText.indexOf("(touchback)") != -1) {
				drive.driveBegan = "OWN 20";
			}
			else {
				drive.driveBegan = kickDistance("OPP 30",-len+y);

			}
		}
		else {
			//a damn fumble
			if (drive.numOfPlays != 1) {
				stats.playerKickingName[ct].pop();
				stats.playerKickingStats[ct].pop();
				playerIndex = arrayPush(current_team,stats.playerKickingName,s,
						stats.playerKickingStats,[0,0,0,0]);
				stats.playerKickingStats[current_team][playerIndex][0] += 1;
				stats.playerKickingStats[current_team][playerIndex][1] += len;
				if (len > stats.playerKickingStats[current_team][playerIndex][2]) {
					stats.playerKickingStats[current_team][playerIndex][2] = len;
				}
			}
			else {
				//kicking team recovered
				stats.playerKickingStats[ct][playerIndex][0] += 1;
				stats.playerKickingStats[ct][playerIndex][1] += len;
				if (len > stats.playerKickingStats[ct][playerIndex][2]) {
					stats.playerKickingStats[ct][playerIndex][2] = len;
				}
			}
			// can't display this stuff as I don't know
			// which team recovered if the play was the
			// first play of a drive
			//stats = defenseHandler(stats,4,p,"st");
		}
	}
	else if (playText.indexOf("Punt by ") == 0) {
		var ct = (current_team+1)%2;
		var s1 = "Punt by ".length;

		var s2 = playText.slice(s1).indexOf(', ');
		var s = playText.slice(s1,s1+s2);
		var playerIndex = arrayPush(ct,stats.playerPuntingName,s,
				stats.playerPuntingStats,[0,0,0,0,0]);

		var lenstr = playText.slice(s1+s2+2);
		var len = parseFloat(lenstr);
		stats.playerPuntingStats[ct][playerIndex][0] += 1;
		stats.playerPuntingStats[ct][playerIndex][1] += len;
		if (len > stats.playerPuntingStats[ct][playerIndex][2]) {
			stats.playerPuntingStats[ct][playerIndex][2] = len;
		}
		var kd = kickDistance(p.marker,len);
		if (parseFloat(kd.slice(4)) < 20) {//inside 20?
				stats.playerPuntingStats[ct][playerIndex][4] += 1;
		}
		if (playText.indexOf(", fumbled") == -1) {
			//was a return, no fumbles
			if (playText.indexOf("(touchback)") != -1) {
				stats.playerPuntingStats[ct][playerIndex][3] += 1;
			}
			else if (playText.indexOf(" yd return)") != -1) {
				var ct = current_team;
				var namestr = playText.slice(playText.indexOf(" fielded by ")+" fielded by ".length);

				var yidx = namestr.indexOf(" yd return)")-6;
				yidx = yidx+namestr.slice(yidx).indexOf(" (");
				var y = parseFloat(namestr.slice(yidx+2));

				var namestr = namestr.slice(0,yidx);
				if (namestr.indexOf(" [missed tackle:") != -1) {
					namestr = namestr.slice(0,namestr.indexOf(" [missed tackle:"));
				}

				if (namestr.indexOf(", PAT m") != -1) {
					namestr = namestr.slice(0,namestr.indexOf(", PAT m"));
				}
				var playerIndex = arrayPush(ct, stats.playerPuntReturnName,namestr,
						stats.playerPuntReturnStats,[0,0,0,0]);
				stats.playerPuntReturnName[ct][playerIndex] = namestr;
				stats.playerPuntReturnStats[ct][playerIndex][0] += 1; 
				stats.playerPuntReturnStats[ct][playerIndex][1] += y;
				if (y > stats.playerPuntReturnStats[ct][playerIndex][2]) {
					stats.playerPuntReturnStats[ct][playerIndex][2] = y;
				}
			}
			stats = defenseHandler(stats,4,p,"st");

			lastDrive.result = "Punt";
			lastDrive.numOfPlays += 1;
			lastDrive.driveEnded = p.marker;

			drive.numOfPlays = 0;
			drive.startTime = p.timeRemaining;
			if (playText.indexOf("[TD]") != -1) {
				drive.driveBegan = kickDistance(p.marker,len);
				drive.driveBegan = yardReverse(drive.driveBegan);
				drive.driveEnded = "OPP 0";
				drive.result = "Touchdown";
				stats.playerPuntReturnStats[ct][playerIndex][3] += 1;
			}
			else if (playText.indexOf("(touchback)") != -1) {
				drive.driveBegan = "OWN 20";
			}
			else {
				drive.driveBegan = kickDistance(p.marker,-len+y);
			}
		}
		else {
			if (drive.numOfPlays == 1) {
				//punt was fumbled & return team recovered
				lastDrive.result = "Punt";
				lastDrive.numOfPlays += 1;
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				drive.startTime = p.timeRemaining;
			}
			else {
				//punt was fumbled & kickoff team recovered
				stats.playerPuntingName[ct].pop();
				stats.playerPuntingStats[ct].pop();
				ct = (ct+1)%2;
				var playerIndex = arrayPush(ct,stats.playerPuntingName,s,
						stats.playerPuntingStats,[0,0,0,0,0]);
				stats.playerPuntingStats[ct][playerIndex][0] += 1;
				stats.playerPuntingStats[ct][playerIndex][1] += len;
				if (len > stats.playerPuntingStats[ct][playerIndex][2]) {
					stats.playerPuntingStats[ct][playerIndex][2] = len;
				}
			}
			// can't display this stuff as I don't know
			// which team recovered if the play was the
			// first play of a drive
			//stats = defenseHandler(stats,4,p,"st");
		}
	}
	else if (playText.indexOf(" yd field goal attempted by ") != -1) {
		if (playText.indexOf(", missed") == playText.length - ", missed".length) {
			lastDrive.result = "Missed FG";
			lastDrive.endTime = p.timeRemaining;
			lastDrive.driveEnded = p.marker;
			lastDrive.numOfPlays++;
			drive.numOfPlays = 0;
		}
		else {
			drive.result = "FG";
		}
	}
	else if (playText.indexOf("[forced fumble:") == 0) {
		//sack with fumble
		//can't handle this right now since we don't know
		//which team has the ball
	}
	else if ((playText.match(" sacked by ") != null) ||
			(playText.indexOf("[tackle:") == 0) || 
			(playText.indexOf("[diving tackle:") == 0))  {		
		//sack without fumble
		//console.log("sack "+playText.slice(0,40));
		stats = defenseHandler(stats,2,p,"pass");
		
		if (drive.numOfPlays == 1) {
			//lost fumble on a sack
			if (playText.indexOf("[SAFETY]") != -1) {
				lastDrive.result = "Safety";
				lastDrive.numOfPlays += 1;
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				drive.startTime = p.timeRemaining;
			}
			else if (playText.indexOf("[forced fumble:") != -1) {
				lastDrive.result = "Fumble";
				lastDrive.numOfPlays += 1;
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				drive.startTime = p.timeRemaining;
				if (playText.indexOf("[TD]") != -1) {
					drive.driveEnded = "Opp 0";
					drive.result = "Touchdown";
				}
			}
		}
	}
	else if (playText.indexOf("penalty committed by") != -1) {
		//console.log("Penalty: "+playText.slice(0,40));
		stats = penaltyHandler(stats, p);
	}
	else {
		//something really wierd
		console.log("You shouldn't see me, so I'm probably a bug: '"+playText+"'");
	}

	if (playText.indexOf("turnover on downs") != -1) {
		drive.result = "Downs";
		//drive.driveEnded = p.marker;
	}

	if (lastTime == null) {
	}
	else {
		if (lastTime < convertTime(p.timeRemaining)) {
			stats.team_possession[current_team*6] += lastTime;
			stats.team_possession[current_team*6+quarter-1] += lastTime;
		}
		else {
			stats.team_possession[current_team*6] += lastTime - convertTime(p.timeRemaining);
			stats.team_possession[current_team*6+quarter] += lastTime - convertTime(p.timeRemaining);
		}
	}
	lastTime = convertTime(p.timeRemaining);

	//console.log(stats.playerRushingName);
	//console.log(stats.playerReceivingName);
	//console.log(stats.playerDefensiveName);
	return stats;
}

function findChild(id,node) {
	if (node.id != null) {
		//console.log(node.id);
	}
	if (node.id+"" == id+"") {
		return node;
	}
	for each (var c in node.childNodes) {
		var r = findChild(id,c);
		if (r != null) {
			return r;
		}
	}    
	return null;
}

var current_team = 0;
var lastTime = 900;
var quarter = 0;
var team;
var lastDrive = new Drive();


function gameScout(inetAddress,page,stats) {

	current_team = 0;
	lastTime = 900;
	quarter = 0;
	team;
	lastDrive = new Drive();
	var d = null;
	var p = null;
	var pbpTable = findChild("play_by_play_table",page);
	if (pbpTable == null) {
		console.log("pbpTable is null. exiting.");
		return stats;
	}
	   
	console.log("start");

	pages = pbpTable.rows.length;
	for each (htmlTableRowElement in pbpTable.rows) {
		var className = htmlTableRowElement.className;
		if (className == null) {
			continue;
		}
		if (className.match("pbp_quarter") != null) {
			quarter++;
			if (quarter == 3) {
				if (d != null) {
					if (d.result == null) {
						d.result = "End of Half";
					}
					d.endTime = "0:00";
					//console.log(d);
					lastDrive = d;
					stats.driveList[current_team].push(d);
					d = new Drive();
				}
			}
		}
		else if (className.match("pbp_team") != null) {
			var coll = htmlTableRowElement.cells;
			var node = coll.item(0);
			var idx = 0;
			do {
				var s = node.innerHTML.slice(idx,node.innerHTML.length);
				var i = s.indexOf(" ");
				if (i != -1) idx += i + 1;
			} 
			while (i != -1);
			team = node.innerHTML.slice(0,idx-1);

			var found = false;
			for each (t in stats.team_name) {
				if (t == team) {
					found = true;
					break;
				}
			}
			if (found == false) {
				stats.team_name.push(team);
			}
			if (d != null) {
				if (d.quarter != null) {
					//console.log(d);
					lastDrive = d;		
					stats.driveList[current_team].push(lastDrive);
				}
			}
			d = new Drive();
		}
		else if (className.match("pbp_play_row") != null) {
			p = new Play();
			p.quarter = quarter;
			p.team = team;

			var coll = htmlTableRowElement.cells;
			for each (node in coll) {
				var cName = node.className;
				if (cName.match("pbp_time_remaining") != null) {
					p.timeRemaining = node.innerHTML;
				}
				else if (cName.match("pbp_marker") != null) {
					p.marker = node.innerHTML;
				}
				else if (cName.match("pbp_down") != null) {
					p.down = node.innerHTML.slice(0,1);
					p.togo = node.innerHTML.slice(node.innerHTML.indexOf("amp; ")+5);
				}
				else if (cName.match("pbp_replay") != null) {
					p.replay = node.firstChild;
					//if (p.playText != null) {
					stats = playHandler(stats,d,p);
					//}
				}
				else if (cName.match("pbp_play") != null) {
					p.play = node.firstChild.data;
				}
			}
		}
		else {
//			console.log("main loop removal : "+pages+" / "+pbpTable.rows.length);
		}

	}
	console.log("game over");

	d.endTime = "00:00";
	d.result = "End of Game";
	stats.driveList[current_team].push(d);

	//time of possession for last play
	if ((p.quarter != 5) && ((window.location.toString()).indexOf("quarter=5") == -1)) {
		stats.team_possession[current_team*6] += lastTime;
		stats.team_possession[current_team*6+p.quarter] += lastTime;
	}
	if (p.quarter == 1) {
		d.result = "End of Quarter";
	}
	console.log("main loop done");

	var pbp = findChild("pbp",page);
	if (pbp != null) {
		pbp.parentNode.removeChild(pbp);
	}

	var index = links.indexOf(inetAddress);
	storageArr[index] = stats;

	console.log("exiting gs run");

	return stats;
}

} , 1000);

// ==UserScript==
// @name           pbr Highlight
// @description    Provides automatic highlighting of players in replays, play-by-plays, & on the league leaders lists.
// @namespace      http://goallinebliz.com
// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp*
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @include        http://goallineblitz.com/game/stats.pl?*
// @include        http://goallineblitz.com/game/team.pl?*

/* 
 * 
 * pabst did this 08/06/26+
 * 
 */

window.setTimeout( function() {
    //console.log("current host is = "+window.location);

    /*
    for (var i=0; i<8; i++) {
	console.log(i+") "+getColor(i));
    }
    for (var i=0; i<document.links.length; i++) {
	document.links[i].setAttribute("style","color:"+getColor(i));
    }
    */

    var cookieName = "glb-greasemonkey: player list";

    function getColor(idx) {			
	var color;
	var b = "00"+(idx%8).toString(2);
	b = b.slice(b.length-3);
	
	var color = "#";
	for each (ch in b) {
	    if (ch == "0") {
		color += "00";
	    }
	    else {
		color += "D0";
	    }
	}
	return color;
    }

    function Player() {
	this.id = -1;
	this.name = "unnamed";

	this.toString = function() {
	    return this.id+" - '"+this.name+"'";
	};
    }

    function setCookie(c_name, value) {
        var expDate = new Date();
        expDate.setDate(expDate.getDate() + 1000*60*60*24*7);
        document.cookie = c_name + "=" + value + ";expires=" + expDate;
        console.log("create cookie :"+name+" ==> "+value);
    }

    function getCookie(c_name) {
	var start = document.cookie.indexOf(cookieName+"=");
	if (start != -1) {
	    var c = document.cookie.slice(start,document.cookie.length);
	    var end = c.indexOf(";");
	    if (end != -1) {
		var data = c.slice(cookieName.length+1,end);
		return data;
	    }
	}
	else {
	    console.log("cookie not set");
	}
	return null;
    }

    function getPage(address) {
	//console.log("loading "+address);
        GM_xmlhttpRequest({
            method: 'GET',
            url: address,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
                'Accept': 'text/xml'
            },
    	    onload: function(page) { 
		    if (page.status != 200) {
			console.log("Error "+page.status+" loading "+address);;
                    }
		    else {
			//console.log("done loading "+address);
			//console.log(page.responseText.slice(0,20));
			parsePlayers(page.responseText);
		    }
            }
        });
    };


    function readCookieDate() {
	var data = getCookie(cookieName);
	if (data == null) {
	    return null;
	}

	var str = data.slice(0,data.indexOf("\t"));
	var date = new Date(str);
	return date;
    }

    function readCookieData() {
	var data = getCookie(cookieName);
	if (data == null) {
	    return null;
	}

	var str = data.split("\t");
	var arr = new Array();
	for (var i=1; i<str.length; i+=2) {
	    var p = new Player();
	    p.id = parseFloat(str[i]);
	    p.name = str[i+1];
	    arr.push(p);
	}
	return arr;
    }

    function writeCookie(arr) {
	var d = new Date();
	var data = d;
	for each (p in arr) {
	    data += "\t" + p;
	}
	data += ";";
	setCookie(cookieName,data);
    }

    function parsePlayers(text) {
	var searchString = "/game/player.pl?player_id=";
	var sslen = searchString.length;
	var playerArray = [];

	while (text.indexOf(searchString) != -1) {
	    var start = text.indexOf(searchString)+sslen;
	    text = text.slice(start);

	    var end = text.indexOf('"');
	    var t = text.slice(0,end);

	    text = text.slice(end+2);
	    end = text.indexOf("</a>");
	    var name = text.slice(0,end);

      	    playerArray.push(parseInt(t));
	    playerArray.push(name);

	    text = text.slice(end);
	}

	//console.log("writing cookie : "+playerArray);
	writeCookie(playerArray);
    }


    //console.log("start");



    var myPlayers = null;
    var currentDate = new Date();
    var cookieDate = readCookieDate(cookieName);
    var cookieData = readCookieData(cookieName);

    var inetAddress = window.location+"";

    if ((cookieData == null) || (currentDate > cookieDate + 1000*60*60*6)) {
	console.log("trying to update cookie");	    
	getPage("http://goallineblitz.com/game/home.pl");
	myPlayers = [];
    }
    else {
	/*
	var s = "My players ==> ";
	for each (p in cookieData) {
		s += p + " ";
	    }
	console.log(s);
	*/
	myPlayers = cookieData;
    }

    if (inetAddress.match("replay.pl") != null) {
	// ----- on a replay page --------	
	for (var i=0; i<myPlayers.length; i++) {
	    var p = myPlayers[i].id;
	    if (document.getElementById(p+"")) {
		var color = getColor(i);
		document.getElementById(p+"").style.backgroundColor = color;

		for each (var l in document.links) {
		    if (l.href.match("player_id="+p) != null) {
		        l.setAttribute("style","color:"+color);
		    }
		}
	    }
	}
    }
    else if (inetAddress.match("game.pl") != null) {
	// ------- on a pbp page ----------
	var pbpTable = document.getElementById("play_by_play_table");
	var pages = pbpTable.rows.length;
	for each (htmlTableRowElement in pbpTable.rows) {
	    var className = htmlTableRowElement.className;
	    if (className == null) continue;
	    
	    if (className.match("pbp_play_row") != null) {
		var coll = htmlTableRowElement.cells;
		for each (node in coll) {
	  	    var cName = node.className;
		    if (cName.match("pbp_play") != null) {
		        var playText = node.firstChild.data;
			if (playText.match("penalty committed by") != null) {
                            node.parentNode.setAttribute("style","color:orange;font-weight:bold");
			}
			for each (p in cookieData) {
			    var name = p.name;
			    if ((playText.match(p.name) != null) &&
			       	(playText.indexOf(p.name+" pitch to") != 0)) {
				node.parentNode.setAttribute("style","color:green;font-weight:bold");
			    }
		      	}
		    }
		}
	    }
	}
    }
    else if ((inetAddress.match("league.pl") != null) ||
	     (inetAddress.match("stats.pl") != null) ||
	     (inetAddress.match("team.pl") != null)) {
	// ------- on a stats page or team home page--------
	for each (var l in document.links) {
  	    for each (var p in myPlayers) {
		if (l.href.match("player_id="+p.id) != null) {
		    l.setAttribute("style","color:green;font-weight:bold");
		}
	    }
	}
    }
    else {
	// -------- on the home page ---------
	parsePlayers(document.getElementById("players").innerHTML);
    }
}

, 100);

// ==UserScript==
// @name           Player Build Summary
// @namespace      pbr
// @description    Show total points in attributes and special abilities.
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @version        08.07.17
// ==/UserScript==

var attributes = 0;
var attributes = [0,0];
var abilities = [0,0];
var tables = [];

function floatString(f,dec) {
    var r = f + "";
    if (r.indexOf(".") != -1) {
	r = r.slice(0,r.indexOf(".")+1+dec);
    }
    else {
	r += ".0";
    }
    return r;
}

function getAbilitiesCost(level,min) {
    var cost = 0;
    if (level == 0) return cost;
    for (var i=0; i<level; i++) {
	cost += min + (Math.round((i-1)/2.0));
    }
    return cost;
}

tables = document.getElementsByClassName("player_stats_table");
if (tables.length == 0) return;

var att = tables[0].getElementsByClassName("stat_head");

var abi = document.getElementsByClassName("skill_button");

for (var s=0; s<att.length; s+=2) {
    attributes[0] += parseFloat(att[s].nextSibling.nextSibling.innerHTML);
    attributes[1] += parseFloat(att[s+1].nextSibling.nextSibling.innerHTML);
}
for (var s=0; s<abi.length; s++) {
    abilities[0] += parseFloat(abi[s].firstChild.innerHTML);
    if ((s+1)%5 != 0) {
	abilities[1] += getAbilitiesCost(parseFloat(abi[s].firstChild.innerHTML),1);
    }
    else {
	abilities[1] += getAbilitiesCost(parseFloat(abi[s].firstChild.innerHTML),2);
    }
}

var attributesHeading = document.getElementsByClassName("medium_head");
for each (var h in attributesHeading) {
    if (h.innerHTML == "Player Attributes") {
	h.innerHTML += " ("+floatString(attributes[0],1)+
               	       "/" +floatString(attributes[1],1)+")";
	break;
    }
}

for each (var h in attributesHeading) {
    if (h.innerHTML == "Special Abilities") {
	h.innerHTML += " ("+abilities[0]+"/" +abilities[1]+")";
	break;
    }
}

// ==UserScript==
// @name           Replay
// @namespace      http://userscripts.org/users/useridnumbe
// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*
// ==/UserScript==




window.scroll(0,100);
var play_container = document.getElementById("replay_area");
var dirt = getElementsByClassName("play",document);
var dir = dirt[0];
var dirText = dir.innerHTML;
if(dirText.indexOf(" field goal ")!=-1)
{
var Buttons = getElementsByClassName("tab",document);
var ButtonsCount = Buttons.length;
for(var i=0; i<ButtonsCount; i++)
{
var Button = Buttons[i];
var ButtonText = Button.innerHTML;
if(ButtonText.indexOf("Next Play")!=-1)
{
setTimeout("window.location.href = '" + Buttons[i].firstChild.href + "';",3000);
}
}
}
var ytg = "";
if(dirText.indexOf(" inches ")!=-1)
{var ytg = '.3';}
else
{   if(dirText.indexOf(" G on ")!=-1)
    {//later
    }
    else
    {       var p2 = dirText.indexOf(" &amp; ")+7;
            var p1 = dirText.indexOf(" on ");
            var ytg = dirText.substring(p2,p1);
    }
}
var dy = parseFloat(ytg)*9;
if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y))
{
    var fp = parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) * 3+12;
    if(dirText.indexOf(" G on ")!=-1)
    {//later
    }
        else
        {
            var ltg = (parseFloat(fp) + parseFloat(dy));
            var div = unsafeWindow.document.createElement('div');
		    div.id = 'ds';
		    div.className = 'player_icon';
		    play_container.appendChild(div);
		    div.style.top  = (ltg) + 'px'; 
		    div.style.width = '520px';
		    div.style.height = '2px';
		    div.style.backgroundColor = 'red';
			div.style.zIndex = 0;
        }
    }
    else
    {
        var fp = parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) * 3-18;
        if(dirText.indexOf("G on ")!=-1)
        {//later
        }
        else
        {
            var ltg = (parseFloat(fp) - parseFloat(dy));
            var div = unsafeWindow.document.createElement('div');
		    div.id = 'ds';
		    div.className = 'player_icon';
		    play_container.appendChild(div);
		    div.style.top  = (ltg) + 'px';
		    div.style.width = '520px';
		    div.style.height = '2px';
		    div.style.backgroundColor = 'red';
			div.style.zIndex = 0;
        }
    }

unsafeWindow.nextFrame = function (){	
unsafeWindow.currentFrame++;
	if (unsafeWindow.currentFrame < unsafeWindow.play_data.length) 
	    {
		unsafeWindow.updateFrame();
	    }
    else
        {
        unsafeWindow.pause();
        var Buttons = getElementsByClassName("tab",document);
        var ButtonsCount = Buttons.length;
        for(var i=0; i<ButtonsCount; i++)
            {
	        var Button = Buttons[i];
	        var ButtonText = Button.innerHTML;
            if(ButtonText.indexOf("Next Play")!=-1)
	            {
		        setTimeout("window.location.href = '" + Buttons[ i ].firstChild.href + "';",2000);
	            }


            }
        }
    }



function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{a.push(els[i]);}
	}
	return a;
};

// ==UserScript==
// @name          Roster Summary
// @description   Summarizes the information found on the roster page
// @namespace 	  http://www.goallinebliz.com
// @include 	  http://goallineblitz.com/game/roster.pl?team_id=*
// @version 	  08.07.20

/*
 *
 * pabst did this 07/18/08+
 *
 */
   
// ------- remove following loop to disable the version warning ---------
try {
    var browser = navigator.userAgent;
    if ((browser.indexOf("Firefox\/3") == -1) &&
        (browser.indexOf("Iceweasel\/3") == -1) &&
        (browser.indexOf("Minefield\/3") == -1) &&   
        (browser.indexOf("Minefield\/4") == -1)) {   
	throw new Error("Firefox version error");
    }
}
catch (err) {
      alert("You are using "+browser+"\n\nFirefox3 required.");
}
// ------- remove the previous code to disable the version warning --------

window.setTimeout( function() {

var currentOff = "pro";
var currentDef = "4-3";

var offFormations = ["pro","big","ace","doubles","spread","trips","heavy"];
//qb hb fb c g t te wr k p
var starters = new Array();
starters["pro"]      = [1,1,1,1,2,2,1,2];
starters["big"]      = [1,1,1,1,2,2,2,1];
starters["ace"]      = [1,1,0,1,2,2,2,2];
starters["doubles"]  = [1,1,0,1,2,2,1,3];
starters["spread"]   = [1,1,0,1,2,2,0,4];
starters["trips"]    = [1,0,0,1,2,2,0,5];
starters["heavy"]    = [1,1,1,1,2,2,3,0];

var defFormations = ["4-3","3-4","nickel","dime","quarter","goalline"];
//dt de lb cb ss fs
starters["4-3"]      = [2,2,3,2,1,1];
starters["3-4"]      = [1,2,4,2,1,1];
starters["nickel"]   = [1,2,3,3,1,1];
starters["dime"]     = [1,2,2,4,1,1];
starters["quarter"]  = [1,2,1,5,1,1];
starters["goalline"] = [3,2,4,2,0,0];

var players = new Array();
var positions = new Array();

function descendingSort(left,right) {
    return parseInt(left) < parseInt(right);
}

function addCommas(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
	x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function barEvent(evt) {
    if (offFormations.indexOf(evt) != -1) {
	var e = document.getElementById(currentOff);
	e.setAttribute("class","subhead_link_bar");
	currentOff = evt;
	var e = document.getElementById(currentOff);
	e.setAttribute("class","medium_head");
    }
    else if (defFormations.indexOf(evt) != -1) {
	var e = document.getElementById(currentDef);
	e.setAttribute("class","subhead_link_bar");
	currentDef = evt;
	var e = document.getElementById(currentDef);
	e.setAttribute("class","medium_head");
    }
    else {
	return;
    }
    fillTables(starters[currentOff],starters[currentDef],[1,1]);
}

function mouseEvent(evt) {
    barEvent(evt.target.id);
}

function getDefenseBar() {
    return getBar(defFormations);
}

function getOffenseBar() {
    return getBar(offFormations);
}

function getBar(formations) {
    var bar = document.createElement('div');

    var t = document.createElement('span');
    t.setAttribute("class","big_head subhead_head");
    t.appendChild(document.createTextNode("Formations: "));

    var row = document.createElement('span');
    row.setAttribute("class","subhead_link_bar");
    for each (var f in formations) {
        var b = document.createElement('a');
	b.appendChild(document.createTextNode(f));
	b.setAttribute("class","subhead_link_bar");
	b.setAttribute("id",f);
	b.addEventListener('click', mouseEvent, true);
	
	var s = document.createElement('span');
	s.appendChild(document.createTextNode(" | "));
	
	row.appendChild(b);
        row.appendChild(s);
    }
    row.removeChild(row.lastChild);
    bar.appendChild(t);
    bar.appendChild(row);

    return bar;
}

function getRosterTable(title, index, rows, prefix) {
    var columns = ["Players","Total Salary","Avg Salary","Top Level",
		   "Starting Level","Backup Level","Next Contract"];
    
    var r = rows;
    if (rows == null) r = [];
    else if (rows.length == 0) r = []; 
    return getTable(title,r,columns,index,prefix);
}

function getTable(title,rows, columns, index, prefix) {
    var t = document.createElement("table");
    t.setAttribute("border","1");
    t.setAttribute("cellspacing","0");
    t.setAttribute('style','width: 800px');
    t.setAttribute('id','scout-'+prefix+""+index+'-table');
    
    var tr = document.createElement("tr");
    tr.setAttribute('class','nonalternating_color rsum_pbr_title');
    
    var td = document.createElement("td");
    td.setAttribute('id','team'+index+""+prefix);
    td.setAttribute('colspan','9');
    td.setAttribute('align','center');
    td.appendChild(document.createTextNode(title));
    tr.appendChild(td);
    t.appendChild(tr);
    
    var tr2 = document.createElement("tr");
    tr2.setAttribute('class','nonalternating_color2 rsum_pbr_title');
    tr2.appendChild(document.createElement("td"));
    for (var x=0; x<columns.length; x++) {
	var colname = document.createElement("td");
	colname.setAttribute('align','center');
	colname.appendChild(document.createTextNode(columns[x]));
	tr2.appendChild(colname);
    }
    t.appendChild(tr2);
    
    for (var y=0; y<rows.length; y++) {
	var tr3 = document.createElement("tr");
	tr3.setAttribute('class','alternating_color'+(y%2+1)+' rsum_pbr_title_row');
	var rowname = document.createElement("td");
	rowname.appendChild(document.createTextNode(rows[y]));
	tr3.appendChild(rowname);
	for (var x=0; x<columns.length; x++) {
	    var stat = document.createElement("td");
	    stat.setAttribute('id',prefix+'-'+x+'-'+y+'-'+index);
	    stat.setAttribute('align','center');
	    stat.appendChild(document.createTextNode('('+x+','+y+')'));
	    tr3.appendChild(stat);
	}
	t.appendChild(tr3);
    }
    return t;
}

function avg(arr) {
    var c = 0;
    var avg = 0;
    for (var i=0; i<arr.length; i++) {
	if (arr[i] == null) return 0;
	c += parseFloat(arr[i]);
	avg = c / arr.length;
    }    
    return avg;
}

//var positions = new Array();

function Player() {
    this.name = "name";
    this.position = "   ";
    this.level = -1;
    this.contract = "";
    this.salary = "$0";

    this.toString = function() {
	return this.position+") "+this.name+" ("+this.level+") - "+this.salary+
	       " : "+this.contract;
    }
}

function getPlayers() {
    /*
    var ns = "player_name_short";
    var p = document.getElementsByClassName("player_name_short");
    if (p.length == 0) {
        p = document.getElementsByClassName("player_name");
	ns = "player_name";
    }
    */
    var p = document.getElementsByClassName("player_position");

    for each (var el in p) {
        var parent = el.parentNode;
	var player = new Player();
	//var n = parent.getElementsByClassName("player_name")[0];
	//n.firstChild.firstChild.innerHTML
	//player.name = parent.getElementsByClassName(ns)[0].firstChild.firstChild.innerHTML;
	player.position = parent.getElementsByClassName("player_position")[0].innerHTML;
	player.level = parent.getElementsByClassName("player_level")[0].innerHTML;
	player.level = parseInt(player.level);

	player.salary = parent.getElementsByClassName("player_salary")[0].innerHTML;
	player.salary = player.salary.replace(" ","");
	player.salary = player.salary.replace("$","");
	player.salary = player.salary.replace(",","");
	player.salary = parseFloat(player.salary);

	player.contract = parent.getElementsByClassName("player_contract")[0].innerHTML;

	if (players[player.position] == null) {
	    players[player.position] = new Array();
	}
	players[player.position].push(player);

	if (positions.indexOf(player.position) == -1) {
	    positions.push(player.position);
	}
    }

}

function buildPosition(idx) {
    var data = [0,0,[],null]; //num,salary,lvls,contract
    for each (var p in players[idx]) {
	data[0]++;
	data[1] += parseFloat(p.salary);
	data[2].push(p.level);
	var currentMin = data[3];
	if (currentMin == null) {
	    data[3] = p.contract;
	}
	else if (parseInt(currentMin) > parseInt(p.contract)) {
	    data[3] = p.contract;
	}
	else if (parseInt(currentMin) == parseInt(p.contract)) {
	    var mindays = parseInt(currentMin.slice(currentMin.indexOf(" day ")+5));
	    var testdays = parseInt(p.contract.slice(p.contract.indexOf(" day ")+5));
	    if (testdays < mindays) {
		data[3] = p.contract;
	    }
	}
    }    
    return data;
}

function fillTables(off,def,k) {
    var start = [];
    start[0] = off;
    start[1] = def;
    start[2] = [1,1];
    var totalPlayers = [0,0,0];
    var totalSalary = [0,0,0];
    var totalLevel = [0,0,0];
    var totalStart = [0,0,0];
    var totalSPlayers = [0,0,0];
    var totalBack = [0,0,0];
    var totalBPlayers = [0,0,0];
    
    var titles = ["ros","rds","rks"];
    for (var type=0; type<titles.length; type++) {
	for (i=0; i<tableRows[type].length-1; i++) {
	    var num;
	    
	    document.getElementById(titles[type]+"-0-"+i+"-0").innerHTML = tableData[type][i][0];
	    
	    if (tableData[type][i][1] == 0) num = "-";
	    else num = "$ " + addCommas(tableData[type][i][1]);
	    document.getElementById(titles[type]+"-1-"+i+"-0").innerHTML = num;
	    
	    if (tableData[type][i][1] == 0) num = "-";
	    else num = "$ " + addCommas((tableData[type][i][1]/tableData[type][i][0]).toFixed(0));
	    document.getElementById(titles[type]+"-2-"+i+"-0").innerHTML = num;
	    
	    tableData[type][i][2] = tableData[type][i][2].sort(descendingSort);
	    
	    var maxLevel = tableData[type][i][2][0];
	    if (maxLevel == null) {
		maxLevel = 0; 
	    }
	    document.getElementById(titles[type]+"-3-"+i+"-0").innerHTML = maxLevel;

	    var splayers = tableData[type][i][2].slice(0,start[type][i]);
	    var slvl = avg(tableData[type][i][2].slice(0,start[type][i]));
	    if (slvl != 0) document.getElementById(titles[type]+"-4-"+i+"-0").innerHTML = slvl.toFixed(1);
	    else document.getElementById(titles[type]+"-4-"+i+"-0").innerHTML = "-";
	    if (splayers.length < start[type][i]) {
		document.getElementById(titles[type]+"-4-"+i+"-0").innerHTML +="*";
	    }
	    
	    var blvl = avg(tableData[type][i][2].slice(start[type][i]));
	    if (blvl != 0) document.getElementById(titles[type]+"-5-"+i+"-0").innerHTML = blvl.toFixed(1);
	    else document.getElementById(titles[type]+"-5-"+i+"-0").innerHTML = "-";
	    
	    document.getElementById(titles[type]+"-6-"+i+"-0").innerHTML = tableData[type][i][3];
	    
	    totalPlayers[type] += tableData[type][i][0];
	    totalSalary[type] += tableData[type][i][1];
	    if (totalLevel[type] < maxLevel) totalLevel[type] = maxLevel;
	    totalStart[type] += slvl;
	    if (slvl > 0) totalSPlayers[type]++;
	    totalBack[type] += blvl;
	    if (blvl > 0) totalBPlayers[type]++;
	}
	
	// fill totals row
	document.getElementById(titles[type]+"-0-"+i+"-0").innerHTML = totalPlayers[type];
	document.getElementById(titles[type]+"-1-"+i+"-0").innerHTML = "$ " + addCommas(totalSalary[type]);
	document.getElementById(titles[type]+"-2-"+i+"-0").innerHTML = "$ " + addCommas((totalSalary[type]/totalPlayers[type]).toFixed(0));
	document.getElementById(titles[type]+"-3-"+i+"-0").innerHTML = totalLevel[type];
	var num = (totalStart[type]/totalSPlayers[type]).toFixed(1);
	if (isNaN(num) == true) num = "-";
	document.getElementById(titles[type]+"-4-"+i+"-0").innerHTML = num;
	num = (totalBack[type]/totalBPlayers[type]).toFixed(1);
	if (isNaN(num) == true) num = "-";
	document.getElementById(titles[type]+"-5-"+i+"-0").innerHTML = num;
	document.getElementById(titles[type]+"-6-"+i+"-0").innerHTML = "-";
    }
    
}





getPlayers();
//positions.push("Total");

var tableData = [[],[],[]];
var tableRows = [];
tableRows[0] = ["QB","HB","FB","C","G","OT","TE","WR","Total"];
tableRows[1] = ["DT","DE","LB","CB","SS","FS","Total"];
tableRows[2] = ["K","P","Total"];

for (var i=0; i<3; i++) {
    for (var j=0; j<tableRows[i].length-1; j++) {
        var a = buildPosition(tableRows[i][j]);
	tableData[i].push(a);
	//console.log(tableRows[i][j]+") "+a);
    }
}

var el = document.getElementsByClassName("medium_head")[0];
var obar = getOffenseBar();
var dbar = getDefenseBar();
var rosterTableO = getRosterTable("Offense Summary",0,tableRows[0],"ros");//positions);
var rosterTableD = getRosterTable("Defense Summary",0,tableRows[1],"rds");//positions);
var rosterTableK = getRosterTable("Kicking Summary",0,tableRows[2],"rks");//positions);

(el.parentNode).insertBefore(obar,el);
(el.parentNode).insertBefore(rosterTableO,obar.nextSibling);
var span = document.createElement("span");
span.innerHTML = "&nbsp;";
(el.parentNode).insertBefore(span,rosterTableO.nextSibling);
var span2 = document.createElement("span");
span2.innerHTML = "&nbsp;";
(el.parentNode).insertBefore(dbar,span.nextSibling);
(el.parentNode).insertBefore(rosterTableD,dbar.nextSibling);
(el.parentNode).insertBefore(span2,rosterTableD.nextSibling);
var span3 = document.createElement("span");
span3.innerHTML = "&nbsp;";
(el.parentNode).insertBefore(rosterTableK,span2.nextSibling);
(el.parentNode).insertBefore(span3,rosterTableK.nextSibling);

fillTables(starters["pro"],starters["4-3"],[1,1]);

barEvent("pro");
barEvent("4-3");

}, 300);

// ==UserScript==
// @name           teamleaders
// @namespace      http://www.goallinebliz.com
// @description    Add player positions to the team leaders pages.
// @include        http://goallineblitz.com/game/team_player_stats.pl?team_id=*
// ==/UserScript==

var names = new Array();
var positions = [];

function getPage(address) {
    GM_xmlhttpRequest({
        method: 'GET',
	url: address,
	headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
	    'Accept': 'text/xml'
	},
	onload: function(page) { 
	    if (page.status != 200) {
	        console.log("Error "+page.status+" loading "+address);
	    }
	    else {
            console.log("finished");
	        handleRoster(page.responseText);
	    }
        }
    });
}

function handleRoster(html) {
    var t = html;

    var nstr = '<td class="player_name';
    var pstr = '<td class="player_position">';

    var s = html.split(nstr);
    for (var i=1; i<s.length; i++) {
	s[i] = s[i].slice(s[i].indexOf("player_id="));
	s[i] = s[i].slice(s[i].indexOf('">')+2);
	while (s[i].indexOf("&quot;") != -1) {
	    s[i] = s[i].replace("&quot;",'"');
	}
	while (s[i].indexOf("&#39;") != -1) {
	    s[i] = s[i].replace("&#39;","'");
	}
	var nend = s[i].indexOf("</a>");
	var playerName = s[i].slice(0,nend);

	var p = s[i].indexOf(pstr);
	s[i] = s[i].slice(p+pstr.length);
	var pend = s[i].indexOf("</td>");
	var playerPosition = s[i].slice(0,pend);

	names[playerName] = playerPosition;
    }
    modifyPlayers();
}

function modifyPlayers() {
    var players = document.getElementsByClassName("stat_column_player");
    for (var i=1; i < players.length; i++) {
	var p = players[i];
        if (p == null) continue;
	var span = '<span class="position">';
	span += names[p.firstChild.innerHTML];
	span += '</span>';

	var y = document.createElement("span");
	y.className = "cpu";
	y.innerHTML = names[p.firstChild.innerHTML];
	while (y.innerHTML.length < 3) {
	    y.innerHTML += " ";
	}

	var children = new Array();
	children.push(y);
	while (p.hasChildNodes() == true) {
	    children.push(p.removeChild(p.firstChild));
	}
	for each (var c in children) {
    	    p.appendChild(c);
	}
    }
}

var inetAddress = "http://goallineblitz.com/game/roster.pl?team_id=";

var id = (window.location+"").indexOf("team_id=")+"team_id=".length;
id = (window.location+"").slice(id);

if (id.indexOf("&") != -1) {
    id = id.slice(0,id.indexOf("&"));
}
inetAddress += id;

console.log("Downloading "+inetAddress);
getPage(inetAddress);

// ==UserScript==

// @name           Sort Players

// @namespace      http://goallinebliz.com

// @include        http://goallineblitz.com/game/home.pl
// @include	   http://goallineblitz.com/game/home.pl?user_id=*
// ==/UserScript==

window.setTimeout( function() 
{

function compare(a, b)
{
  var item1 = a[0];
  var item2 = b[0];
  if (item1 < item2) return 1;
  if (item1 > item2) return -1;
  return 0;
}


function player(info,num)
{
this.id= num
this.name = getElementsByClassName("player_name",info)[0].firstChild.innerHTML;

if(document.location.href=="http://goallineblitz.com")
	var stringXp = getElementsByClassName("player_xp",info)[0].innerHTML.substring(0,getElementsByClassName("player_xp",info)[0].innerHTML.indexOf("/"));
else
	var stringXp = "0";
this.xp = parseInt(stringXp);

var text;
var levelText = getElementsByClassName("player_level",info)[0].innerHTML;
this.level = parseFloat(levelText.substring(levelText.indexOf(".")+2));

var posText = getElementsByClassName("player_name",info)[0].innerHTML;
this.position = posText.substring(posText.indexOf("(")+1,posText.indexOf(")"));

var links = info.getElementsByTagName("a");

for(var i=0; i<links.length;i++)
{
	var link = links[i];
	if(link.href.indexOf("/game/player.pl?player_id=")!=-1)
	{
		this.date = parseFloat(link.href.substring(link.href.indexOf("player_id=")+10));
	}
	if(link.href.indexOf("/game/team.pl?team_id=")!=-1)
	{
		this.team = link.innerHTML;
	}
	if(link.href.indexOf("compare_teams.pl?")!=-1)
	{
		text = link.parentNode.innerHTML;
		var gameText = text.substring(text.indexOf("(in")+4,text.indexOf(")"));
		gameText = gameText.replace(/:/g,'');
		this.game = parseFloat(gameText);
	}
}
if(!this.game)
{
	this.game=999999;
}

}

function testFunc(testing)
{
	var testElement = document.createElement("p");
	testElement.innerHTML = testing;
	var testContainer = getElementsByClassName("medium_head subhead_head",document)[0]
	testContainer.appendChild(testElement);
}

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var playerInfo = getElementsByClassName("content_container player_box",document);
playerInfo = playerInfo.concat(getElementsByClassName("content_container_sp player_box",document));
var players = new Array();
for(var i=0; i<playerInfo.length; i++)
{
	players[i] = new player(playerInfo[i],i);
}

var container = getElementsByClassName("medium_head subhead_head",document)[0];
var options = "<option value=''> Sort Players </option>";
var sortTypes = new Array();
sortTypes[0]="Alphabetical";
sortTypes[1]="Next Game";
sortTypes[2]="Team";
sortTypes[3]="Position"
sortTypes[4]="Level";
sortTypes[5]="XP";
sortTypes[6]="Date Created";

var saved = GM_getValue("type","0");
for(var i=0; i<sortTypes.length; i++)
{
	if(sortTypes[i]==saved)
	options+="<option value='"+sortTypes[i]+"' selected='selected'>"+sortTypes[i]+"</option>";	
	else
	options+="<option value='"+sortTypes[i]+"'>"+sortTypes[i]+"</option>";	
}

container.innerHTML = container.innerHTML +" | <select id='sortPlayers'>"+options+"</select> ";

var oSelect = document.getElementById("sortPlayers");
/*if(saved!="0")
{
	for(var i=0; i<oSelect.options; i++)
	{
		if(saved == oSelect.options[i].value)
			oSelect.options[i].innerHTML = "LOLLLERS";
	}
}*/
oSelect.addEventListener("change",sortList,true);

var adOptions = "<option value='Descending'>Descending</option><option value='Ascending'>Ascending</option>";
var adSE = document.createElement("select");
adSE.id="adSelect";
adSE.innerHTML=adOptions;
var savedOrder = GM_getValue("sortOrder","0");
if(savedOrder!="0")
{
	if(savedOrder=="Ascending")
	{
		adSE.options[1].selected = true;
	}
	else{
		adSE.options[0].selected = true;
	}
}
container.appendChild(adSE);

var adSelectElement = document.getElementById("adSelect");
adSelectElement.addEventListener("change",sortList,true);

if(saved!="0")
{
	sortList();	
}
function sortList()
{
var oSelect = document.getElementById("sortPlayers");
var type = oSelect.options[oSelect.selectedIndex].value;

var newOrder = new Array();

if(type=="Alphabetical")
{
	newOrder = sortKey("name","text");
}
else if(type=="Next Game")
{
	newOrder = sortKey("game","num");
}
else if(type=="Team")
{
	newOrder = sortKey("team","text");
}
else if(type=="Position")
{
	newOrder = sortKey("position","text");
}
else if(type=="Level")
{
	newOrder = sortKey("level","num");
}
else if(type=="XP")
{
	newOrder = sortKey("xp","num");
}
else if(type=="Date Created")
{
	newOrder = sortKey("date","num");
}
if(type!="")
{
	var box = document.getElementById("players");

	for(var i=0; i<newOrder.length; i++)
	{
		var side = i+1;
		if(side%2!=0)
		{
			newOrder[i].style.marginRight = "10px";
		}
		else
		{
			newOrder[i].style.marginRight= "0px";
		}
		box.appendChild(newOrder[i]); 
	}
	GM_setValue("type",type);
}

}

function sortKey(k,sortVar)
{
	
	var key = new Array(players.length);
	var sortedArray	= new Array();


	for(var i=0; i<players.length; i++)
	{
		var toAdd;
		if(k=="position")
			toAdd = players[i].position;
		else if (k=="team")
			toAdd = players[i].team;
		else if (k=="name")
			toAdd = players[i].name;
		else if (k=="level")
			toAdd = players[i].level;
		else if (k=="xp")
			toAdd = players[i].xp;
		else if (k=="game")
			toAdd = players[i].game;
		else if (k=="date")
			toAdd = players[i].date;
		
		key[i] = new Array(2);
		key[i][0] = toAdd;
		key[i][1] = players[i].id;
	}
	
	if(sortVar=="text")
		key.sort();
	else if(sortVar == "num")
		key.sort(compare);

	var sortSelect = document.getElementById("adSelect");
	var sortOrder = sortSelect.options[sortSelect.selectedIndex].value;
	
	if(sortOrder=="Ascending")
	{
		key.reverse();
	}
	GM_setValue("sortOrder",sortOrder);
	
	for(var i=0; i<players.length; i++)
	{
		sortedArray[i] = playerInfo[key[i][1]]; 
	}

	
	return sortedArray;
}

},100);