// ==UserScript==
// @name           GLB Training Notes
// @namespace      GLB
// @description    GLB Training Notes // Modified version of Player Notes to work in Training page.
// @include        http://goallineblitz.com/game/training.pl?player_id=*
// ==/UserScript==


window.setTimeout( function() 
{
var url = window.location.href;
var plyrid= url.substring(url.indexOf('_id=')+4, url.length);

//create save link
      var saveLink = document.createElement('div');
      saveLink.innerHTML = "<span style='cursor:pointer;'><u>Save Training Notes</u></span>";
      saveLink.addEventListener('click',saveNotes, false);

//var container=document.getElementById('player_training_tactics')
var container=document.getElementById('footer')
var plyrNotes = document.createElement('div');

plyrNotes.innerHTML = '<div style="clear: both;">&nbsp;</div><div class="medium_head">Training Notes</div>'  + 
	'<div id="player_notes" class="content_container">' +
	'<textarea style="width:99%;" rows=5 id="txtNotes"></textarea>'
	'</div>'

plyrNotes.appendChild(saveLink);

container.parentNode.insertBefore(plyrNotes, container.nextSibling);

var currentNotes = GM_getValue(plyrid  + "_trnotes", null);

if (currentNotes != null) {
	var notesbox = document.getElementById('txtNotes');
	notesbox.value = currentNotes;	
}

function saveNotes(){
	var notesbox = document.getElementById('txtNotes');
	GM_setValue(plyrid  + "_trnotes",notesbox.value);
	alert ("Training note saved.");
}


},100);