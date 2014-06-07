// ==UserScript==
// @name           Note Eraser
// @namespace      myluckyseven
// @version        2.0
// @description    Remove unwanted notes from your Tumblr dashboard. Inspired by Tumblr Savior by bjornstar.
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/blog/*
// @include        http://www.tumblr.com/show/*
// @grant	   none
// @require        https://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js
// ==/UserScript==

function check_lists(notesHtml){
//These lists are where you put your block/unblocked items.
	var blackList = new Array();
	var whiteList = new Array('you have an unsaved post');

//Do not edit anything beyond this point unless you know what you're doing
	var blacklisted = false;
	var whitelisted = false;
  
	for(var i=0;i<=whiteList.length;i++) {
		if(notesHtml.toLowerCase().indexOf(whiteList[i])>=0) {
			whitelisted = true;
		}
	}

	if (!whitelisted) {
		for(var i=0;i<=blackList.length;i++) {
      		if(notesHtml.toLowerCase().indexOf(blackList[i])>=0) {
        		blacklisted = true;
      		}
    	}
	}
	return blacklisted;
}


var last_check = 0;
var firstNoteBlocked = false;
var unblockedNotes = 0;
var onlyNote, lastUnblocked, noteText, noteType, savedfrom;

function text_check(notesHtml){
	if (notesHtml.indexOf('with_blockquote') >= 0) { return 't'; }
	else { return 'n'; }
}

function erase_notes() {
	var notes = $A($$('.notification'));		
	var savedfrom;

	for (var i=0, notesLength=notes.length; i<notesLength; i++) {
		savedfrom = check_lists(notes[i].innerHTML);
		noteText = text_check(notes[i].className);

		//Single note
		if ($(notes[i]).hasClassName('single_notification')) {
			if(savedfrom) {
				$(notes[i]).remove();
			}
		}
		
		//First note
        else if ($(notes[i]).hasClassName('first_notification')) {
			if (savedfrom) {
				firstNoteBlocked = true;
				$(notes[i]).remove();
			}
			
			else {
				unblockedNotes++;
				onlyNote = i;
				lastUnblocked = i;
			}
		}
		
		//Last note
        else if ($(notes[i]).hasClassName('last_notification')) {                
			if (savedfrom) {
				$(notes[i]).remove();
								
				if (onlyNote > 0) {
					var e =	text_check(notes[onlyNote].className);
					
					if (e == 't') {
						notes[onlyNote].className = 'notification  single_notification with_blockquote';
					}
					
					else {
						notes[onlyNote].className = 'notification  single_notification';
					}
				}
				
				else if (lastUnblocked >=0) {;
					notes[lastUnblocked].className = 'notification  last_notification';	
				}
			}
			
			else if (unblockedNotes == 0) {
				if (noteText == 't') {
					notes[i].className = 'notification  single_notification with_blockquote';
				}
				
				else {
					notes[i].className = 'notification  single_notification';
				}
			}
			
			else {}
			
			//Reset for next loop
			onlyNote = 0;
			firstNoteBlocked = false;
			unblockedNotes = 0;
			lastUnblocked = -1;
		}
		
		//Middle notes
		else {
			if (savedfrom) {
				$(notes[i]).remove();
			}
			
			else if (firstNoteBlocked) {
				$(notes[i]).addClass('first_notification');
				
				onlyNote = i;
				unblockedNotes++;
				lastUnblocked = i;
				firstNoteBlocked = false;
			}
			
			else {
				unblockedNotes++;
				lastUnblocked = i;
				onlyNote = -1;
			}
		}
	}
	last_check = notes.length;
}

setInterval(erase_notes, 200);