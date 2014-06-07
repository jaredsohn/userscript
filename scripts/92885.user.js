// ==UserScript==
// @name           DeepRoute
// @namespace      DR
// @description    DR Player Edit Box
// @include        http://deeproute.com/deeproute/?js=oneplayer&lookatplayer=*
// @include        http://deeproute.com/deeproute/default.asp?js=oneplayer&lookatplayer=*
// ==/UserScript==

window.setTimeout( function() 
{
var url = window.location.href;
var plyrid= url.substring(url.indexOf('_lookatplayer=')+5, url.length);

//create save link
      var saveLink = document.createElement('div');
      saveLink.innerHTML = "<span style='cursor:pointer;'><u>Save Player Notes</u></span>";
      saveLink.addEventListener('click',saveNotes, false);

var container=document.getElementById('PlayerTable')

var plyrNotes = document.createElement('div');

plyrNotes.innerHTML = '<div style="clear: both;">&nbsp;</div><div class="medium_head">Player Notes</div>'  + 
	'<div id="player_notes" class="content_container">' +
	'<textarea cols=50 rows=5 id="txtNotes"></textarea>'
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