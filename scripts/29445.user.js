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