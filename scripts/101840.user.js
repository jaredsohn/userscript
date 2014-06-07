// ==UserScript==
// @name          DS Moral im Profil
// @version       1.3
// @author        Samuel Essig (http://c1b1.de)
// @description   Fügt die Anzeige der Moral zum Spielerprofil hinzu
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009-2011, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*ae.tribalwars.ae/game.php*screen=info_player*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==

/*

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################


####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en

*/


const url = document.location.href;
const world = parseInt(url.match(/(\d+)/)[1]);

// Get own points
var own_points = unsafeWindow.game_data.player.points;
  
 
var moral = 'المعنويات';  
  
if(world > 4 && !!~url.indexOf('info_player'))
  { 
  // Get player points
  var player_points = parseInt(document.getElementById('content_value').getElementsByTagName('td')[2].textContent.replace('.','')); 

  // Calculate
  var value = Math.ceil(((player_points / own_points) * 3 + 0.3)*100);
  value = value<30?30:value>100?100:value;

  // Create table row
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  td1.appendChild(document.createTextNode(moral));
  var td2 = document.createElement('td');
  if(value != 100)
    td2.setAttribute('style','font-weight:bold;');
  td2.appendChild(document.createTextNode(value+'%'));
  tr.appendChild(td1);
  tr.appendChild(td2);

  // Insert into table
  var table = document.getElementById('content_value').getElementsByClassName('vis')[0];
  table.appendChild(tr);
  }
/*
else if(world > 4 && !!~url.indexOf('map')) {
  document.getElementById('info_owner').addEventListener('DOMSubtreeModified',function() {
	// Get player points
    var str = this.innerHTML.match(/\((.+)\)/)[1];
	if(str) {
	  str = str.replace('.','');
      var player_points = parseInt(str); 
      
	  // Calculate
      var value = Math.ceil(((player_points / own_points) * 3 + 0.3)*100);
      value = value<30?30:value>100?100:value;	
	  
      if(document.getElementById('info_moral_info_row'))  {
	    // Insert		
	    document.getElementById('info_moral_info').replaceChild(document.createTextNode(value+'%'),document.getElementById('info_moral_info').firstChild);
        document.getElementById('info_moral_info_row').style.display = 'table-row';	
	    }
	  else {
	    // Create table row
	    var tr = document.createElement('tr');
		tr.setAttribute('id','info_moral_info_row');
	    var td1 = document.createElement('td');
	    td1.appendChild(document.createTextNode(moral));
	    var td2 = document.createElement('td');
		td2.setAttribute('id','info_moral_info');
	    if(value != 100)
	      td2.setAttribute('style','font-weight:bold;');
	    td2.appendChild(document.createTextNode(value+'%'));
	    tr.appendChild(td1);
	    tr.appendChild(td2);
		document.getElementById('info_content').appendChild(tr);
        document.getElementById('info_moral_info_row').style.display = 'table-row';		
	    }
	
	  }  
  
    },false);
  }
*/