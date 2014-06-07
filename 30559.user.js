// ==UserScript==
// @name           SA Goon Notes
// @namespace      http://chillidonut.com/
// @description    it puts notes next to goons so you can stalk them
// @include        http://forums.somethingawful.com/showthread.php*
// @include        http://forums.somethingawful.com/member.php*
// ==/UserScript==

function goooooooooons() {
	GM_addStyle('span.goonNote { background-color: white; color: black; /*padding: 1px 2px 0px 2px;*/ }'
		+'a.goonNoteEdit { cursor: pointer; text-decoration: underline; }'
		+'div.goonNoteLine { display: block; padding: 3px 0px 0px 0px; }');
	GM_registerMenuCommand('Toggle newlined notes', gn_newlined);

	if (window.location.toString().indexOf('member.php') >= 0) {
		gn_profileview();
	} else {
		gn_threadlist();
	}
}

function gn_profileview() {
	var profilerows = document.getElementsByTagName('tbody');

	var uid = window.location.toString().match(/member.php\?.*userid=(\d+)/);
	if (uid) {
		uid = uid[1];
	} else {
		return;
	}

	var goonItem = document.createElement('tr');
	var goonNote = GM_getValue('note_' + uid);
	var td = document.createElement('td');
	td.innerHTML = '<b>Goon Note</b>';
	goonItem.appendChild(td);
	td = document.createElement('td');
	if (goonNote) {
		td.innerHTML = '<span class="goonNote gn_'+ uid + '">' + goonNote 
			+ '</span> <a class="goonNoteEdit" title="'+ uid +'">Edit Note</a>';
	} else {
		td.innerHTML = '<span class="goonNote gn_'+ uid + '">' 
			+ '</span> <a class="goonNoteEdit" title="'+ uid +'">Goon Note</a></td>';
	}
	td.lastChild.addEventListener("click", gn_note, false);
	goonItem.appendChild(td);	
	
	profilerows[0].appendChild(goonItem);
}

function gn_threadlist() {
	// get all instances of <ul class="profilelinks">
	var profilelinks = document.getElementsByTagName('ul');
	var users = new Array();
	
	for (var i = 0, j = 0; i < profilelinks.length; i++) {
		if (profilelinks[i].className == 'profilelinks')
			users[j++] = profilelinks[i];
	}
	
	// look inside and get the uid
	for (i = 0; i < users.length; i++) {
		var user = users[i];
		if (!user.hasChildNodes())
			continue;
			
		for (var j = 0; j < user.childNodes.length; j++) {
			if (user.childNodes[j].firstChild && user.childNodes[j].firstChild.href) {
				var uid = user.childNodes[j].firstChild.href.match(/member.php\?.*userid=(\d+)/);
				if (uid) {
					uid = uid[1];
					break;
				}
			} else {
				// just to be safe we'll iterate through all links to find the profile link
				continue;
			}
		}

		// appendChild "goonette @ 93 jeremiah st nth, 3022"
		var goonItem = document.createElement('li');
		var goonNote = GM_getValue('note_' + uid);
		if (goonNote) {
			goonItem.innerHTML = ' <span class="goonNote gn_'+ uid + '">' + goonNote + '</span> '
				+ '<a class="goonNoteEdit" title="'+ uid +'">Edit Note</a>';
		} else {
			goonItem.innerHTML = ' <span class="goonNote gn_'+ uid + '"></span> '
				+ '<a class="goonNoteEdit" title="'+ uid +'">Goon Note</a>';
		}
		if (GM_getValue('newlined', false) == true) {
			goonItem.innerHTML = '<div class="goonNoteLine">' + goonItem.innerHTML + '</div>';
		}
		goonItem.lastChild.addEventListener("click", gn_note, false);
		user.appendChild(goonItem);
	}
		
	
	// masturbate into a sock
}

function gn_note(e) {
	var uid = e.target.title;
	// ^ fucking scope. if we want to fancy it later, just regex match for \d
	
	var goonNote = prompt('Set goon note for user #'+ uid, GM_getValue('note_' + uid, ''));
	if (goonNote == null) {
		return;
	} else if(goonNote && goonNote.length) {
		GM_setValue('note_'+uid, goonNote);
	} else {
		GM_setValue('note_'+uid, '');
		goonNote = '';
	}
	
	var globalNotes = document.getElementsByTagName('span');
	for (var i = 0; i < globalNotes.length; i++) {
		if (globalNotes[i].className.indexOf('gn_'+uid) > -1) {
			globalNotes[i].innerHTML = goonNote;
		}	
	}
}

function gn_newlined() {
	if (GM_getValue('newlined', false) == false) {
		GM_setValue('newlined', true);
		alert('Goon Notes will now be on their own line.');
	} else {
		GM_setValue('newlined', false);
		alert('Goon Notes will now be inline.');
	}
}

goooooooooons();