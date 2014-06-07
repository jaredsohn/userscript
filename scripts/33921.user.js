// ==UserScript==
// @name           GLB Player Compare
// @namespace      KHMI - Greasemonkey
// @description    Compare other players with your own pinned player.
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @version        09.04.30
// ==/UserScript==

/*
 * 
 * written by peteb@userscripts.org
 * 
 * modified by pabst 10/08/08++
 * 
 */

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
		popUpDiv.innerHTML = '<div><table style="width:100%;background-color:rgb(97,97,97);" cellspacing="5" cellpadding="0">' +
		'<tr><td style="text-align:center; color: white;" colspan="2">'+ ppStats[0] +'</td></tr>' +
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

	for (var i=0; i<ppStats.length; i++) {
		console.log(i+" ---> "+ppStats[i]);
	}
	toggle();
}

function pinplayer(){
	var url = window.location.href;
	var currentId = url.substring(url.indexOf('_id=')+4, url.length);

	var player_name = document.getElementsByClassName("position")[0].previousSibling.innerHTML;
	var playerName = document.getElementsByClassName("large_title_bar")[0].firstChild.innerHTML;
	
	// strip out any commas found in player names, comma = BAD :D
	playerName = playerName.replace(/,/g, "");

	var stats = [];
	// add the player's stats to the array for storage
	stats["playerName"] = playerName;
	stats["playerId"] = currentId;

	var attTable = getElementsByClassName('player_stats_table',document);
	if(attTable.length > 0){
		stats.push(playerName);
		stats.push(currentId);
		// get attributes
		var cont = document.getElementsByClassName("stat_container");
		for (var i=0; i<cont.length; i++) {
			var stat = cont[i].getElementsByClassName("stat_value_tall")[0];
			if (stat == null) {
				stat = cont[i].getElementsByClassName("stat_value_tall_boosted")[0];
			}
			stats.push(stat.innerHTML);
		}

		// get tree data
		var tree = getElementsByClassName('subhead',document);
		stats.push(tree[0].firstChild.innerHTML);
        if (tree[1] != null) {
    		stats.push(tree[1].firstChild.innerHTML);
        }
        else {
            stats.push("");
        }

		// get tree skill levels
		var skillLevel = getElementsByClassName('skill_level',document);
		for(var i=0;i<skillLevel.length;i++) {
            if (skillLevel[i].parentNode.parentNode.getAttribute("id") == "vet_skills_content") break;
			stats.push(skillLevel[i].innerHTML);
		}
        while (stats.length < 28) {
            stats.push(0);
        }

		// get tree skills
		var skillTrees = document.getElementById('skill_trees_content');
		var re2 = /\/images\/game\/skills\/(.+)\.gif/g;
		var skillButtons = skillTrees.innerHTML.match(re2);
		for(var i=0;i<skillButtons.length;i++) {
			stats.push(skillButtons[i].replace(re2, "$1"));
		}
        for (var i=skillButtons.length; i<10; i++) {
            stats.push(0);
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
	var attTable = document.createElement("div");
	attTable.innerHTML = document.getElementById("player_stats").innerHTML;
	while (attTable.innerHTML.indexOf("stat_value_tall_boosted") != -1) {
		attTable.innerHTML = attTable.innerHTML.replace("stat_value_tall_boosted","stat_value_tall");
	}

	for (var i=0; i<attTable.childNodes.length; i++) {
		if (attTable.childNodes[i].className != "player_stats_table") {
			attTable.removeChild(attTable.childNodes[i]);
			i--;
		}
	}
	while (attTable.getElementsByClassName("stat_progress_container").length > 0) {
		var training = attTable.getElementsByClassName("stat_progress_container");
		training[0].parentNode.removeChild(training[0]);
	}

	var s = attTable.getElementsByClassName("stat_value_tall");
	for (var i=0; i<s.length; i++) {
		s[i].innerHTML = stats[2+i];
	}
	return attTable.innerHTML;
}

function createTree(stats){
	var othertree = document.getElementById("skill_trees_box");
    var parent = document.createElement("div");
	var tree = document.createElement("div");
	tree.innerHTML = othertree.innerHTML;

    while (tree.childNodes.length > 0) {
        tree.removeChild(tree.firstChild);
    }
    parent.appendChild(tree);

	var specials = (stats.length - 38) >> 1;

    var sa = document.getElementsByClassName("skill_button")[0];

    for (var i=0; i<2; i++) {
    	var div = document.createElement("div");
        div.appendChild(document.createElement("span"));
        div.firstChild.style.backgroundColor = "rgb(97,97,97)";
		div.setAttribute("class","subhead");
        div.setAttribute("style","height: 17px; font-size: 10px; text-align: center; color: white; clear: left;");
        div.style.backgroundImage = "url(http://goallineblitz.com/images/game/design/skills_hr.gif)";
        div.style.backgroundRepeat = "repeat-x";
        div.style.backgroundAttachment = "scroll";
        div.style.backgroundPosition = "center center";
		div.firstChild.innerHTML = "&nbsp;"+stats[16+i]+"&nbsp;";
        tree.appendChild(div);

        var span = document.createElement("div");
        span.setAttribute("style","clear: left;");
        for (var j=0; j<5; j++) {
			var skill = document.createElement("div");
			skill.innerHTML = sa.innerHTML;
			skill.setAttribute("onmouseover","");
			skill.setAttribute("onmouseout","");
			skill.className = "skill_button";
            skill.style.backgroundRepeat = "no-repeat";
			skill.style.backgroundImage = "url(/images/game/skills/"+stats[28+specials+j+(i*5)]+".gif)";

            var skillChild = skill.childNodes[0];
            skillChild.setAttribute("id","skill_level_"+stats[28+specials+j+(i*5)]);
            skillChild.innerHTML = stats[18+j+(i*5)];
            if (stats[28+specials+j+(i*5)] == "0") {
                skillChild.innerHTML = "&nbsp;";
                skill.removeChild(skill.lastChild);
                var prev = span.lastChild;
                if (prev != null) {
                    if (prev.childNodes.length > 1) {
                        prev.removeChild(prev.lastChild);
                    }
                }
            }
            span.appendChild(skill);
        }
        span.lastChild.removeChild(span.lastChild.lastChild);
        tree.appendChild(span);
    }

	if (specials > 0) {
    	var div = document.createElement("div");
        div.appendChild(document.createElement("span"));
        div.firstChild.style.backgroundColor = "rgb(97,97,97)";
		div.setAttribute("class","subhead");
        div.setAttribute("style","height: 17px; font-size: 10px; text-align: center; color: white; clear: left;");
        div.style.backgroundImage = "url(http://goallineblitz.com/images/game/design/skills_hr.gif)";
        div.style.backgroundRepeat = "repeat-x";
        div.style.backgroundAttachment = "scroll";
        div.style.backgroundPosition = "center center";
        div.firstChild.innerHTML = "&nbsp;Additional Abilities&nbsp;";
        tree.appendChild(div);

        var span = document.createElement("span");
        span.setAttribute("style","clear: left;");
		for (var i=0; i<specials; i++) {
			var skill = document.createElement("div");
			skill.innerHTML = sa.innerHTML;
			skill.setAttribute("onmouseover","");
			skill.setAttribute("onmouseout","");
			skill.className = "skill_button";
            skill.style.backgroundRepeat = "no-repeat";
			skill.style.backgroundImage = "url(/images/game/skills/"+stats[38+specials+i]+".gif)";

			var skillChild = skill.childNodes[0];
			skillChild.setAttribute("id","skill_level_"+stats[38+specials+i]);
			skillChild.innerHTML = stats[28+i];

            skill.removeChild(skill.lastChild);
            span.appendChild(skill);
		}
        tree.appendChild(span);
	}
    return parent.innerHTML;
}

