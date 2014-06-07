// ==UserScript==
// @name           Notification Eraser
// @namespace      fugiman
// @description    Remove unwanted notes from your Tumblr dashboard. Shamelessly stolen from myluckyseven & my own fork of Missing-E
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/blog/*
// @include        http://www.tumblr.com/show/*
// ==/UserScript==

function fugiman_inject_styles() {
    var css = '#fugiman_note_eraser_list td { padding: 5px; } a.block[href="#fugiman"] { right: 78px !important; } #posts .notification .hide_overflow { max-width: 380px !important; } #posts .notification .block { top: 2px; height: 24px; text-align: center; }';
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
}

function fugiman_inject_header() {
	var blocked = JSON.parse(localStorage.getItem('fugiman_note_eraser')) || {};
	var container = document.getElementById('posts');
	var before = document.getElementById('new_post');
	
	var header = document.createElement('li');
	header.className = 'notification single_notification';
    
    var inner = document.createElement('div');
    inner.className = 'notification_inner clearfix';
    
    var sentence = document.createElement('div');
    sentence.className = 'notification_sentence';
	
	var openlink = document.createElement('a');
    openlink.style.fontWeight = "bold";
	openlink.innerHTML = 'Modify Blocked Notes List';
	openlink.addEventListener('click',fugiman_toggle_header,true);
	sentence.appendChild(openlink);
	
	var blocklist = document.createElement('table');	
	blocklist.id = 'fugiman_note_eraser_list';
	blocklist.style.display = 'none';
	for(var id in blocked) {
		if(blocked.hasOwnProperty(id)) {
			var row = document.createElement('tr');
			
			var title = document.createElement('td');
			var titlelink = document.createElement('a');
			titlelink.setAttribute('href',blocked[id]);
			titlelink.innerHTML = blocked[id];
			title.appendChild(titlelink);
			row.appendChild(title);
			
			var unblock = document.createElement('td');
			var unblocklink = document.createElement('a');
			unblocklink.setAttribute('fugiman_note_eraser_id',id);
			unblocklink.addEventListener('click',fugiman_unblock_note,true);
			unblocklink.innerHTML = 'X';
			unblock.appendChild(unblocklink);
			row.appendChild(unblock);
			
			blocklist.appendChild(row);
		}
	}
	sentence.appendChild(blocklist);
	
	inner.appendChild(sentence);
	header.appendChild(inner);
	container.insertBefore(header, before.nextElementSibling);
}

function fugiman_toggle_header(e) {
	var blocklist = document.getElementById('fugiman_note_eraser_list');
	
	if(blocklist.style.display == 'none')
		blocklist.style.display = 'block';
	else
		blocklist.style.display = 'none';
}

function fugiman_block_note(e) {
	var blocked = JSON.parse(localStorage.getItem('fugiman_note_eraser')) || {};
	
	var parent = e.target.parentNode.parentNode;
	var id = parent.getAttribute('fugiman_note_eraser_id');
	blocked[id] = parent.getAttribute('fugiman_note_eraser_url');
	
	var notes = document.getElementsByClassName('notification');
	for(var i = 0; i < notes.length; i++) {
		if(notes[i].hasAttribute('fugiman_note_eraser_id') && notes[i].getAttribute('fugiman_note_eraser_id') == id)
			fugiman_hide_note(notes[i]);
	}
	
	var blocklist = document.getElementById('fugiman_note_eraser_list');
	var row = document.createElement('tr');
	
	var title = document.createElement('td');
	var titlelink = document.createElement('a');
	titlelink.setAttribute('href',blocked[id]);
	titlelink.innerHTML = blocked[id];
	title.appendChild(titlelink);
	row.appendChild(title);
	
	var unblock = document.createElement('td');
	var unblocklink = document.createElement('a');
	unblocklink.setAttribute('fugiman_note_eraser_id',id);
	unblocklink.addEventListener('click',fugiman_unblock_note,true);
	unblocklink.innerHTML = 'X';
	unblock.appendChild(unblocklink);
	row.appendChild(unblock);
	
	blocklist.appendChild(row);
	
	localStorage.setItem('fugiman_note_eraser', JSON.stringify(blocked));
    
    e.stopPropagation();
}

function fugiman_unblock_note(e) {
	var blocked = JSON.parse(localStorage.getItem('fugiman_note_eraser')) || {};
	
	var id = e.target.getAttribute('fugiman_note_eraser_id');
	
	var notes = document.getElementsByClassName('notification');
	for(var i = 0; i < notes.length; i++) {
		if(notes[i].hasAttribute('fugiman_note_eraser_id') && notes[i].getAttribute('fugiman_note_eraser_id') == id)
			fugiman_show_note(notes[i]);
	}
	
	var blocklist = document.getElementById('fugiman_note_eraser_list');
	var row = e.target.parentNode.parentNode;
	blocklist.removeChild(row);
	
	delete(blocked[id]);
	
	localStorage.setItem('fugiman_note_eraser', JSON.stringify(blocked));
}

function fugiman_hide_note(n) {
	var classes = n.className.split(' ');
	
	if(classes.indexOf('first_notification') >= 0) {
		var e = n.nextElementSibling;
		var eclasses = e.className.split(' ');
		if(eclasses.indexOf('notification') >= 0) {
			if(eclasses.indexOf('last_notification') >= 0) {
				eclasses[eclasses.indexOf('last_notification')] = 'single_notification';
			} else {
				eclasses.push('first_notification');
			}
			e.className = eclasses.join(' ');
		}
	}
	if(classes.indexOf('last_notification') >= 0) {
		var e = n.previousElementSibling;
		while(e.hasAttribute('fugiman_note_eraser_id') && e.getAttribute('fugiman_note_eraser_id') == n.getAttribute('fugiman_note_eraser_id'))
			e = e.previousElementSibling;
		var eclasses = e.className.split(' ');
		if(eclasses.indexOf('notification') >= 0) {
			if(eclasses.indexOf('first_notification') >= 0) {
				eclasses[eclasses.indexOf('first_notification')] = 'single_notification';
			} else {
				eclasses.push('last_notification');
			}
			e.className = eclasses.join(' ');
		}
	}
	
	n.style.display = 'none';
}

function fugiman_show_note(n) {
	n.style.display = 'block';
}

function fugiman_note_eraser() {
	var notes = document.getElementsByClassName('notification');
	var blocked = JSON.parse(localStorage.getItem('fugiman_note_eraser')) || {};
	
	for (var i = 0; i < notes.length; i++) {
		if(notes[i].hasAttribute('fugiman_note_eraser_id'))
			continue; //Already parsed, keep searching
	
		//Locate "block" link
		var links = notes[i].getElementsByTagName('a');
		for(var j = 0; j < links.length; j++) {
			if(links[j].className == "block")
				break;
		}
		if(j == links.length) //Block not found, keep searching
			continue;
		
		var offset = 1;
		var id = links[j-offset].getAttribute('href').split("/")[4];
		links[j].innerHTML = 'Block User'; //More specific
		notes[i].setAttribute('fugiman_note_eraser_id',id);
		notes[i].setAttribute('fugiman_note_eraser_url',links[j-offset].getAttribute('href'));
		
		//Create the "Block Note" link
		var blink = document.createElement('a');
		blink.innerHTML = 'Block Note';
		blink.className = 'block';
		blink.href = '#fugiman';
		blink.addEventListener('click',fugiman_block_note,true);		
		links[j].parentNode.insertBefore(blink,links[j]); //Smack it right in there
		
		if(blocked.hasOwnProperty(id))
			fugiman_hide_note(notes[i]);
	}
	
}

setInterval(fugiman_note_eraser, 200);
fugiman_inject_styles();
fugiman_inject_header();