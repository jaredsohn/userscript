// ==UserScript==
// @name           Player Notes
// @namespace      Player Notes
// @description    Player Notes
// @include        http://www.teamhb.org/index.php?page=team&subpage=pldetails*
// @include        http://teamhb.org/index.php?page=team&subpage=pldetails*
// @include        http://www.teamhb.org/index.php?page=team&subpage=players*
// @include        http://teamhb.org/index.php?page=team&subpage=players*
// @include	   http://www.teamhb.org/index.php?page=team&subpage=trainin*
// @include	   http://teamhb.org/index.php?page=team&subpage=trainin*
// @include	   http://www.teamhb.org/index.php?page=team&subpage=makeorder*
// @include	   http://teamhb.org/index.php?page=team&subpage=makeorder*
// @include	   http://www.teamhb.org/index.php?page=team&subpage=plcompare*
// @include	   http://teamhb.org/index.php?page=team&subpage=plcompare*
// @include        http://www.teamhb.org/index.php?page=team&subpage=spreadshee*
// @include        http://teamhb.org/index.php?page=team&subpage=spreadshee*
// @version        0.0.1.0
// ==/UserScript==

// initial by Xiong Yoshi
// reviewed, enhanced by pstimpel

// 0.0.1.0 add player description to spreadsheet
//
// 0.0.0.9 add player description to compare select boxes
//

// 0.0.0.8 highlight maxed out stars in traing details of player page
//

// 0.0.0.7 highlight age of player when >= 27 and when <= 29 (possible retiring within a few years)
//

// 0.0.0.6 highlight age of player when >= 30 (plan to retire is possible)
//

// 0.0.0.5 bug fixed (training table)
//

// 0.0.0.4 shows first 10 characters of a notice in training player table, the first 4 characters are displayed in match order table
//
// 0.0.0.3 shows first 10 characters of a notice in player table
//
// 0.0.0.2 use now the real playerid for storing notesbox
//         changed behaviour of link for storing
//         after clicking "SPARA" there is now an acknowledge message that tells the user "KLAR!"

window.setTimeout( function()
{
var url = window.location.href;
var plyrid= url.substring(url.indexOf('playerid=')+9, url.length);

//create save link
     var saveLink = document.createElement('div');
     var style='font-size: 10px; font-family: verdana, arial, sans-serif;text-decoration: underline;';
     var style2='font-size: 10px; font-family: verdana, arial, sans-serif;';
     
     saveLink.innerHTML = '<span style="cursor:pointer;"><font style="'+style+'">SPARA</font></span>';
     saveLink.addEventListener('click',saveNotes, false);

if (url.indexOf('pldetails') > 0) {
	
	var container=document.getElementById('leftmenu_header')
		
	
	if (!container) {
	       container=document.getElementById('profile')    ;
	}
	
	var plyrNotes = document.createElement('div');
	
	plyrNotes.innerHTML = '<div id="player_notes" class="content_container"><font style="'+style2+'">Anteckningar:<br>' +   '<textarea cols=70 rows=17 id="txtNotes"></textarea></font><div id="stored"></div></div>';
	
	plyrNotes.appendChild(saveLink);
	
	container.parentNode.insertBefore(plyrNotes, container.nextSibling);
	
	var currentNotes = GM_getValue(plyrid  + "_notes", null);

	if (currentNotes != null) {
	       var notesbox = document.getElementById('txtNotes');
	       notesbox.value = currentNotes;
	}
	var allPlayers, thisPlayer;
	allPlayers = document.evaluate(
	    '//td[@width="25"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allPlayers.snapshotLength; i++) {
	    thisPlayer = allPlayers.snapshotItem(i);
	    if (thisPlayer.innerHTML.indexOf('progress_maybe.png')>=0){
	    	thisPlayer.style.background="yellow";
	    }
	    if (thisPlayer.innerHTML.indexOf('progress_not.png')>=0){
	    	thisPlayer.style.background="red";
	    }
	}
        allPlayers = document.evaluate(
	    '//option[@value]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    		
	}	
}

 
	
	//age font-size: 12px; font-family: verdana, arial, sans-serif; cursor: pointer;
	allPlayers = document.evaluate(
	    '//td[@width="30"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    
	for (var i = 0; i < allPlayers.snapshotLength; i++) {
	    thisPlayer = allPlayers.snapshotItem(i);
	    char1=thisPlayer.innerHTML.substring(0,1);
	    if((char1 == "1") || (char1 == "2") || (char1 == "3") || (char1 == "4")) {
		if(thisPlayer.innerHTML >= "30") {
			thisPlayer.style.background="red";
			} else {
			
		}
		if((thisPlayer.innerHTML >= "27") && (thisPlayer.innerHTML <= "29")) {
			thisPlayer.style.background="yellow";
			} else {
			
		}
	    }
	    
	    
	}
	
}

function saveNotes(){
       var style2='font-size: 10px; font-family: verdana, arial, sans-serif;';
       var notesbox = document.getElementById('txtNotes');
       GM_setValue(plyrid  + "_notes",notesbox.value);
       document.getElementById('stored').innerHTML='<font color=red style="'+style2+'">KLAR!</font>';


}



},100);