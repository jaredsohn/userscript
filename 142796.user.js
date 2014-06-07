// ==UserScript==
// @name           asanusta tumblr Notification bırakma
// @namespace      asanusta
// @description    asanusta tumblr Notification bırakma-Remove unwanted notes from your Tumblr dashboard. 
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/blog/*
// @include        http://www.tumblr.com/show/*
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

var $j = jQuery.noConflict(); //Tumblr uses Prototype; Jquery and Prototype don't play well together. 

function check_lists(notesHtml){	
	var blackList = new Array('Insert post url here', 'or a username!');
	var whiteList = new Array('Same goes for this array', 'delete these sample entries before using!');
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
var onlyNote, lastUnblocked, noteText, savedfrom;

function text_check(notesHtml){
	if (notesHtml.indexOf('with_blockquote') >= 0) { return 't'; }
	else { return 'n'; }
}

function erase_notes() {
	var notes = $j('li.notification');
	
	for (var i=last_check, notesLength=notes.length; i<notesLength; i++) {
    	savedfrom = check_lists(notes[i].innerHTML);
		noteText = text_check(notes[i].className);
		
		//Single note
		if ($j(notes[i]).hasClass('single_notification')) {
			if(savedfrom) {
				$j(notes[i]).empty().remove();
			}
		}
		
		//First note
        else if ($j(notes[i]).hasClass('first_notification')) {
			if (savedfrom) {
				firstNoteBlocked = true;
				$j(notes[i]).empty().remove();
			}
			
			else {
				unblockedNotes++;
				onlyNote = i;
				lastUnblocked = i;
			}
		}
		
		//Last note
        else if ($j(notes[i]).hasClass('last_notification')) {                
			if (savedfrom) {
				$j(notes[i]).empty().remove();
								
				if (onlyNote > 0) {
					e =	text_check(notes[onlyNote].className);
					
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
				$j(notes[i]).empty().remove();
			}
			
			else if (firstNoteBlocked) {
				$j(notes[i]).addClass('first_notification');
				
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

