// ==UserScript==
// @name           DeviantNotes
// @namespace      arszt
// @description    Adds a link to take you directly to your notes
// @include        http://*.deviantart.com*
// @exclude        http://chat.deviantart.com*
// ==/UserScript==
(function()
	{
		var rockdock = document.getElementById('rockdock')
		if(rockdock) {
		var span = document.createElement("span");
			span.style.position = "absolute";
			span.style.right = "625px";
	
sep_text = document.createTextNode(" | ");
			span.appendChild(sep_text);
	
		var note_link = document.createElement("a");
			note_link.setAttribute("id","noteslink");

note_link.setAttribute("href","http://my.deviantart.com/notes");
			note_link.setAttribute("title","Go to my notes");
			link_text = document.createTextNode("Notes");
			note_link.appendChild(link_text);
			
			span.appendChild(note_link);
			rockdock.appendChild(span);
		}
	})();