// ==UserScript==

// @name           User Notes

// @namespace      GLB
// @description    Adds a User Note to the user page.

// @include        http://goallineblitz.com/game/home.pl

// @include http://goallineblitz.com/game/home.pl?user_id=*
// ==/UserScript==



window.setTimeout( function() 
{
var uid;
var url = window.location.href;
if (url.indexOf("?user_id=")!= -1) {
	uid= url.substring(url.indexOf('_id=')+4, url.length);
} else {
	var ava = document.getElementById("user_avatar");
	var ids = ava.innerHTML.split("?user_id=");
	var id = ids[1].split('" ');
	uid = id[0];
}

//create save link
      var saveLink = document.createElement('div');
      saveLink.innerHTML = "<span style='cursor:pointer;'><u>Save User Notes</u></span><div style='clear: both;'>&nbsp;</div>";
      saveLink.addEventListener('click',saveNotes, false);

var container=document.getElementById('my_account')

var userNotes = document.createElement('div');

userNotes.innerHTML = '<div style="clear: both;">&nbsp;</div><div class="medium_head">User Notes</div>'  + 
	'<div id="player_notes" class="content_container">' +
	'<textarea style="width:99%;" rows=5 id="txtNotes"></textarea>'
	'</div>'

userNotes.appendChild(saveLink);

container.parentNode.insertBefore(userNotes, container.nextSibling);

var currentNotes = GM_getValue(uid  + "_notes", null);

if (currentNotes != null) {
	var notesbox = document.getElementById('txtNotes');
	notesbox.value = currentNotes;	
}

function saveNotes(){
	var notesbox = document.getElementById('txtNotes');
	GM_setValue(uid  + "_notes",notesbox.value);
	alert ("User note saved.");
}


},100);
