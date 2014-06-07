// ==UserScript==
// @name           Na secret notes
// @namespace      
// @description    A way to speak and rate
// @include        http://www.naruto-arena.com/*
// ==/UserScript==
//


var BASE_Z_INDEX = 100000;
var STYLE_VERSION = 1;

var STATE_DISPLAY = 0;
var STATE_EDIT    = 1;
var STATE_MOVE    = 2;
var STATE_RESIZE  = 3;
var MIN_SIZE      = 15;

var DEFAULT_STYLESHEET =
"/* sticky note */\n\
.at-ac-tuwien-student-e0427417-sticky-note {\n\
  border-style:     solid;\n\
  background-color: #ffe555;\n\
  padding:          10px;\n\
  border-width:      2px;\n\
  border-color:     #ccaa22;\n\
  cursor:           default;\n\
}\n\
\n\
/* top bar */\n\
.at-ac-tuwien-student-e0427417-sticky-note-top {\n\
  text-align:       right;\n\
  background-color: inherit;\n\
  margin-top:       -4px;\n\
}\n\
\n\
/* close button */\n\
.at-ac-tuwien-student-e0427417-sticky-note-top a {\n\
  font-family:     DejaVu Sans, sans-serif;\n\
  text-decoration: none;\n\
  font-weight:     bold;\n\
  color:           #ccaa22;\n\
  font-size:       13pt;\n\
  cursor:          pointer;\n\
}\n\
\n\
/* close button when hovered */\n\
.at-ac-tuwien-student-e0427417-sticky-note-top a:hover {\n\
  color: #333333;\n\
}\n\
\n\
/* text when displayed / editing */\n\
.at-ac-tuwien-student-e0427417-sticky-note-display-text,\n\
.at-ac-tuwien-student-e0427417-sticky-note-edit-text {\n\
  font-family:      sans-serif;\n\
  font-size:        10pt;\n\
  background-color: inherit;\n\
  color:            #333333;\n\
  text-align:       left;\n\
}\n\
\n\
/* sticky note when editing */\n\
.at-ac-tuwien-student-e0427417-sticky-note-edit-mode {\n\
  opacity: 1;\n\
}\n\
\n\
/* sticky note when displayed / moving / resizing */\n\
.at-ac-tuwien-student-e0427417-sticky-note-display-mode,\n\
.at-ac-tuwien-student-e0427417-sticky-note-move-mode,\n\
.at-ac-tuwien-student-e0427417-sticky-note-resize-mode {\n\
  opacity: 0.85;\n\
}\n\
\n\
/* sticky note when moving */\n\
.at-ac-tuwien-student-e0427417-sticky-note-move-mode {\n\
  cursor: move;\n\
}\n\
\n\
/* resize grabber */\n\
.at-ac-tuwien-student-e0427417-sticky-note-resize-grabber {\n\
  position: absolute;\n\
  right:    -2px;\n\
  bottom:   -2px;\n\
  width:    16px;\n\
  height:   16px;\n\
  cursor:   se-resize;\n\
}\n\
\n\
/* blanket */\n\
#at-ac-tuwien-student-e0427417-sticky-note-blanket {\n\
  background-color: #111111;\n\
  opacity:          0.65;\n\
}\n\
\n\
/* overlay */\n\
#at-ac-tuwien-student-e0427417-sticky-note-overlay {\n\
  text-align:       left;\n\
  padding:          15px;\n\
  color:            #000000;\n\
  background-color: #FFFFFF;\n\
  border:           5px solid #D0D0D0;\n\
  width:            800px;\n\
  height:           600px;\n\
}\n\
\n\
.at-ac-tuwien-student-e0427417-sticky-note-overlay-buttons {\n\
  text-align: right;\n\
}\n\
\n\
.at-ac-tuwien-student-e0427417-sticky-note-overlay-buttons input {\n\
  margin:  2px;\n\
  padding: 2px;\n\
  height: 24px;\n\
}\n\
\n\
/* management interface */\n\
#at-ac-tuwien-student-e0427417-sticky-note-manage {\n\
  overflow:      auto;\n\
  font-size:     12pt;\n\
  padding-right: 10px;\n\
}\n\
\n\
#at-ac-tuwien-student-e0427417-sticky-note-manage ul {\n\
  padding:    0px 0px 0px 30px;\n\
  margin:     0px;\n\
  list-style: square outside;\n\
}\n\
\n\
#at-ac-tuwien-student-e0427417-sticky-note-manage li ul {\n\
  list-style: disc outside;\n\
}\n\
\n\
/* delete icon in management interface */\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-delete {\n\
  float:       right;\n\
  font-weight: bold;\n\
}\n\
\n\
/* site row in management interface */\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-site:hover {\n\
  background-color: #D0D0D0;\n\
}\n\
\n\
/* note row in management interface */\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-note:hover {\n\
  background-color: #D0D0D0;\n\
}\n\
\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-site,\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-note {\n\
  cursor: pointer;\n\
}\n\
\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-site a,\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-note a {\n\
  color:  #000000;\n\
  cursor: pointer;\n\
}\n\
\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-site a:hover,\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-note a:hover {\n\
  color: #FF0000;\n\
}\n\
.at-ac-tuwien-student-e0427417-sticky-note-manage-link {\n\
  float: right;\n\
}\n\
";

function StickyNote(x,y,width,height,text) {
	var stickyNote = this;

	stickyNote._moveX = 0;
	stickyNote._moveY = 0;
	stickyNote._state = STATE_DISPLAY;

	stickyNote.container = document.createElement("div");
	stickyNote.container.style.position = "absolute";
	stickyNote._width  = width  == undefined || width  < MIN_SIZE ? 250 : width;
	stickyNote._height = height == undefined || height < MIN_SIZE ? 250 : height;
	stickyNote._x = x == undefined ? ((window.innerWidth - stickyNote._width) / 2 + window.pageXOffset) : x;
	stickyNote._y = y == undefined ? ((window.innerHeight - stickyNote._height) / 2 + window.pageYOffset) : y;
	stickyNote.container.style.left = stickyNote._x + "px";
	stickyNote.container.style.top  = stickyNote._y + "px";

	stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-display-mode at-ac-tuwien-student-e0427417-sticky-note";

	stickyNote.container.style.width=stickyNote._width + "px";

	// hopefully high enough z-index:
	stickyNote.container.style.zIndex=BASE_Z_INDEX;

	var div = document.createElement("div");
	div.className = "at-ac-tuwien-student-e0427417-sticky-note-top";
	div.style.MozUserSelect = "none";

	var a = document.createElement("a");

	stickyNote.remove = function() {
		stickyNote.container.parentNode.removeChild(stickyNote.container);
	};

	a.addEventListener("click", function() {
		stickyNote.remove();
		removeStickyNote(stickyNote);
	}, true);

	a.title = "remove this sticky note";
	a.appendChild(document.createTextNode("\xD7"));
	div.appendChild(a);
	stickyNote.container.appendChild(div);

	var resizeGrabber = document.createElement("div");
	resizeGrabber.className = "at-ac-tuwien-student-e0427417-sticky-note-resize-grabber";
	resizeGrabber.style.MozUserSelect="none";
	stickyNote.container.appendChild(resizeGrabber);

	stickyNote.displayText = document.createElement("div");
	stickyNote.displayText.className = "at-ac-tuwien-student-e0427417-sticky-note-display-text";
	stickyNote.editText    = document.createElement("textarea");
	stickyNote.editText.className = "at-ac-tuwien-student-e0427417-sticky-note-edit-text";

	stickyNote.displayText.style.width  = stickyNote.editText.style.width  = "100%";
	stickyNote.displayText.style.height = stickyNote.editText.style.height = stickyNote._height + "px";
	stickyNote.displayText.style.overflow  = "auto";
	stickyNote.displayText.style.MozUserSelect = "none";
	stickyNote.editText.style.display = "none";
	stickyNote.editText.style.border  = "none";
	stickyNote.editText.style.margin  = "0px";
	stickyNote.editText.style.padding = "0px";
	stickyNote.displayText.title = "double click to edit sticky note";


	stickyNote.container.appendChild(stickyNote.displayText);
	stickyNote.container.appendChild(stickyNote.editText);

	stickyNote.setText = function(text) {
		stickyNote.displayText.innerHTML = text.replace(/\n/g,"<br/>");
		stickyNote.editText.value        = text;
	};

	stickyNote.getText = function() {
		return stickyNote.editText.value;
	};

	var body = document.getElementsByTagName("body")[0];

	resizeGrabber.addEventListener("mousedown", function(e) {
		if (e.button == 0 && stickyNote._state != STATE_EDIT) {
			stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-resize-mode at-ac-tuwien-student-e0427417-sticky-note";
			body.style.MozUserSelect="none";
			stickyNote._state = STATE_RESIZE;
			stickyNote._moveX = e.pageX;
			stickyNote._moveY = e.pageY;
			return false;
		}
		return true;
	}, true);

	stickyNote.container.addEventListener("mousedown", function(e) {
		moveToTop(stickyNote);
		if (e.button == 0 && stickyNote._state == STATE_DISPLAY) {
			stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-move-mode at-ac-tuwien-student-e0427417-sticky-note";
			body.style.MozUserSelect="none";
			stickyNote._state = STATE_MOVE;
			stickyNote._moveX = e.pageX;
			stickyNote._moveY = e.pageY;
			return false;
		}
		return true;
	}, true);
	
	window.addEventListener("mouseup", function(e) {
		if (e.button == 0 && (stickyNote._state == STATE_MOVE || stickyNote._state == STATE_RESIZE)) {
			stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-display-mode at-ac-tuwien-student-e0427417-sticky-note";
			body.style.MozUserSelect="text";
			stickyNote._state = STATE_DISPLAY;
			saveStickyNotes();
		}
	}, true);
	
	window.addEventListener("mousemove", function(e) {
		switch (stickyNote._state) {
		case STATE_MOVE:
			stickyNote._x += e.pageX - stickyNote._moveX;
			stickyNote._y += e.pageY - stickyNote._moveY;

			stickyNote.container.style.left = stickyNote._x + "px";
			stickyNote.container.style.top  = stickyNote._y + "px";
			
			stickyNote._moveX = e.pageX;
			stickyNote._moveY = e.pageY;
			return false;
		case STATE_RESIZE:
			var newWidth  = stickyNote._width  + e.pageX - stickyNote._moveX;
			var newHeight = stickyNote._height + e.pageY - stickyNote._moveY;

			if (newWidth >= MIN_SIZE) {
				stickyNote._width = newWidth;
				stickyNote._moveX = e.pageX;
				stickyNote.container.style.width = stickyNote._width + "px";
			}

			if (newHeight >= MIN_SIZE) {
				stickyNote._height = newHeight;
				stickyNote._moveY  = e.pageY;
				stickyNote.editText.style.height = stickyNote.displayText.style.height = stickyNote._height + "px";
			}

			return false;
		}
		return true;
	}, true);

	stickyNote.container.addEventListener("dblclick", function() {	
		stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-edit-mode at-ac-tuwien-student-e0427417-sticky-note";
		stickyNote.displayText.style.display="none";
		stickyNote.editText.style.display="block";
		stickyNote._state = STATE_EDIT;
		stickyNote.editText.focus();
	}, true);
	
	function endEdit() {
		stickyNote.container.className = "at-ac-tuwien-student-e0427417-sticky-note-display-mode at-ac-tuwien-student-e0427417-sticky-note";
		stickyNote.displayText.style.display="block";
		stickyNote.editText.style.display="none";
		stickyNote._state = STATE_DISPLAY;
		stickyNote.displayText.innerHTML = stickyNote.editText.value.replace(/\n/g,"<br/>");
		saveStickyNotes();
	};
	
	stickyNote.editText.addEventListener("keyup", function(e) {
		if (e.which == 27) {
			endEdit();
		}
	}, true);

	stickyNote.editText.addEventListener("blur", endEdit, true);

	stickyNote.getX = function() {
		return stickyNote._x;
	}

	stickyNote.getY = function() {
		return stickyNote._y;
	}

	stickyNote.getWidth = function() {
		return stickyNote._width;
	}

	stickyNote.getHeight = function() {
		return stickyNote._height;
	}

	stickyNote.setX = function(x) {
		stickyNote._x = x;
		stickyNote.container.style.left = x + "px";
	}

	stickyNote.setY = function(y) {
		stickyNote._y = y;
		stickyNote.container.style.top = y + "px";
	}


	stickyNote.setWidth = function(width) {
		stickyNote.container.style.width = width + "px";
		stickyNote._width = width;
	}

	stickyNote.setHeight = function(height) {
		stickyNote.editText.style.height = stickyNote.displayText.style.height = height + "px";
		stickyNote._height = height;
	}

	if (text != undefined) {
		stickyNote.setText(text);
	}

	body.appendChild(stickyNote.container);
}

var stickyNotes = [];
var siteId = location.href.split('#')[0];

function listSites() {
	return [name for each (name in GM_listValues()) if (name != "stylesheet")];
}

function listStickyNotes(site) {
	var s = GM_getValue(site);
	var notesList = [];

	if (s != undefined) {
		var notes = s.split(" ");

		for (var i = 0; i < notes.length; ++ i) {
			var note = notes[i];

			if (note.length > 0) {
				var data = note.split(":");
				var x = parseInt(data[0]);
				var y = parseInt(data[1]);
				var width;
				var height;
				var text;
				
				if (data.length == 5) {
					width  = parseInt(data[2]);
					height = parseInt(data[3]);
					text   = unescape(data[4]);
				}
				else {
					width  = undefined;
					height = undefined;
					text   = unescape(data[2]);
				}

				notesList.push([x,y,width,height,text]);
			}
		}
	}

	return notesList;
}

function loadStickyNotes() {
	for each ([x,y,width,height,text] in listStickyNotes(siteId)) {
		stickyNotes.push(new StickyNote(x,y,width,height,text));
	}
}

function saveStickyNotesFor(site,notes) {
	if (notes.length == 0) {
		GM_deleteValue(site);
	}
	else {
		GM_setValue(site, [(x+':'+y+':'+w+':'+h+':'+escape(text))
			for each ([x,y,w,h,text] in notes)].join(' '));
	}
}

function saveStickyNotes() {
	saveStickyNotesFor(siteId, [[
		note.getX(), note.getY(),
		note.getWidth(), note.getHeight(),
		note.getText()] for each (note in stickyNotes)]);
}

function removeStickyNote(stickyNote) {
	stickyNotes = [note for each (note in stickyNotes) if (note != stickyNote)];
	saveStickyNotes();
}

function moveToTop(stickyNote) {
	stickyNotes = [note for each (note in stickyNotes) if (note != stickyNote)];
	stickyNotes.push(stickyNote);

	var zIndex = BASE_Z_INDEX;
	for each (note in stickyNotes) {
		note.container.style.zIndex = zIndex;
		++ zIndex;
	}
}

function showOverlay(element, buttons) {
	if (buttons == undefined) {
		buttons = [];
	}

	buttons.push(createButton('Close', hideOverlay));

	var buttonDiv = document.createElement('div');
	buttonDiv.className = 'at-ac-tuwien-student-e0427417-sticky-note-overlay-buttons';

	for (var i = 0; i < buttons.length; ++ i) {
		var button = buttons[i];
		buttonDiv.appendChild(button);
	}

	var overlay = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-overlay");
	var blanket = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-blanket");

	if (blanket == null) {
		blanket = document.createElement("div");
		blanket.id = "at-ac-tuwien-student-e0427417-sticky-note-blanket";
		blanket.style.position = 'absolute';
		blanket.style.left = '0px';
		blanket.style.top = '0px';
		var height = document.body.parentNode.scrollHeight;
		if (window.innerHeight > height) {
			height = window.innerHeight;
		}
		blanket.style.width = '100%';
		blanket.style.height = height + 'px';
		blanket.style.zIndex = '100101';
		document.body.appendChild(blanket);
	}
	else {
		blanket.style.display = 'block';
	}

	if (overlay == null) {
		var overlay = document.createElement("div");
		overlay.id = "at-ac-tuwien-student-e0427417-sticky-note-overlay";
		overlay.style.position = 'fixed';
		overlay.style.margin = 'auto';
		overlay.style.zIndex = '100102';
		document.body.appendChild(overlay);
	}
	else {
		overlay.innerHTML = '';
		overlay.style.display = 'block';
	}
	
	overlay.appendChild(element);
	overlay.appendChild(buttonDiv);

	var compStyle = getComputedStyle(overlay,'');
	var overlayWidth = px(compStyle.width) || overlay.offsetWidth;
	var overlayHeight = px(compStyle.height) || overlay.offsetHeight;

	overlay.style.left = ((window.innerWidth - overlayWidth) / 2) + 'px';
	overlay.style.top  = ((window.innerHeight - overlayHeight) / 2) + 'px';

	compStyle = getComputedStyle(buttonDiv,'');
	var buttonsHeigth = compStyle.height;
	var contentWidth = overlayWidth;
	var contentHeight = (overlayHeight -
		(px(compStyle.height) || buttonDiv.offsetHeight) -
		px(compStyle.marginTop) -
		px(compStyle.marginBottom) -
		px(compStyle.paddingTop) -
		px(compStyle.paddingBottom) -
		px(compStyle.borderTopWidth) -
		px(compStyle.borderBottomWidth));

	compStyle = getComputedStyle(element,'');
	var elementWidth = (contentWidth -
		px(compStyle.marginLeft) -
		px(compStyle.marginRight) -
		px(compStyle.paddingLeft) -
		px(compStyle.paddingRight) -
		px(compStyle.borderLeftWidth) -
		px(compStyle.borderRightWidth));
	var elementHeight = (contentHeight -
		px(compStyle.marginTop) -
		px(compStyle.marginBottom) -
		px(compStyle.paddingTop) -
		px(compStyle.paddingBottom) -
		px(compStyle.borderTopWidth) -
		px(compStyle.borderBottomWidth));

	element.style.width  = elementWidth + 'px';
	element.style.height = elementHeight + 'px';
}

function px(x) {
	return parseFloat(x.split('px')[0]);
}

function hideOverlay() {
	var overlay = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-overlay");
	var blanket = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-blanket");

	if (overlay != null) {
		overlay.style.display = 'none';
	}

	if (blanket != null) {
		blanket.style.display = 'none';
	}
}

function createButton(label,callback) {
	var btn = document.createElement('input');
	btn.type = 'button';
	btn.value = label;
	btn.addEventListener('click', callback, true);
	return btn;
}

function createTextarea(text) {
	var textarea = document.createElement("textarea");
	if (text != undefined) {
		textarea.value = text;
	}
	return textarea;
}

function deleteNote(list, li) {
	return function () {
		var origNotes = list.stickyNotes;
		var delIndex = li.stickyNoteIndex;
		var notes = [];

		for (var i = 0; i < origNotes.length; ++ i) {
			if (i != delIndex) {
				notes.push(origNotes[i]);
			}
		}

		var sibling = li.nextSibling();

		while (sibling != null) {
			if (sibling.stickyNoteIndex != undefined) {
				-- stickyNoteIndex.stickyNoteIndex;
			}
			sibling = sibling.nextSibling();
		}

		list.stickyNotes = notes;
		list.removeChild(li);
		saveStickyNotesFor(list.stickyNoteSite, notes);
	};
}

function expandNote(div) {
	return function () {
		if (div.style.display == 'none') {
			div.style.display = 'block';
		}
		else {
			div.style.display = 'none';
		}
	};
}

function expandSite(site, list) {
	return function () {
		if (list.style.display == 'none') {
			var notes = listStickyNotes(site);
			for (var index = 0; index < notes.length; ++ index) {
				var [x, y, w, h, text] = notes[index];
				var li = document.createElement('li');
				var titleDiv = document.createElement('div');
				var titleA = document.createElement('a');
				var delA = document.createElement('a');
				var noteDiv = document.createElement('div');
				
				li.stickyNoteIndex = index;

				titleDiv.className = 'at-ac-tuwien-student-e0427417-sticky-note-manage-note';
				titleA.appendChild(document.createTextNode('x: ' + x + ', y: ' + y));

				delA.style.MozUserSelect = 'none';
				
				delA.className = 'at-ac-tuwien-student-e0427417-sticky-note-manage-delete';
				delA.appendChild(document.createTextNode("\xD7"));
				noteDiv.style.display = 'none';
				noteDiv.innerHTML = text;

				titleDiv.addEventListener('click', expandNote(noteDiv), true);
				delA.addEventListener('click', deleteNote(list, li), true);

				titleDiv.appendChild(titleA);
				titleDiv.appendChild(delA);
				li.appendChild(titleDiv);
				li.appendChild(noteDiv);
				list.appendChild(li);
			}

			list.stickyNotes = notes;
			list.style.display = 'block';
		}
		else {
			list.innerHTML = '';
			list.style.display = 'none';
		}
	};
}

function manageStickyNotes() {
	var div = document.createElement('div');
	var list = document.createElement('ul');
	var sites = listSites();
	sites.sort();
	div.id = 'at-ac-tuwien-student-e0427417-sticky-note-manage';

	for each (site in sites) {
		var li = document.createElement('li');
		var siteDiv = document.createElement('div');
		var titleA = document.createElement('a');
		var gotoA = document.createElement('a');
		var siteList = document.createElement('ul');

		siteDiv.className = 'at-ac-tuwien-student-e0427417-sticky-note-manage-site';
		siteList.stickyNoteSite = site;

		titleA.appendChild(document.createTextNode(site));
		siteList.style.display = 'none';

		siteDiv.addEventListener('click', expandSite(site, siteList), true);

		gotoA.className = 'at-ac-tuwien-student-e0427417-sticky-note-manage-link';
		gotoA.href = site;
		gotoA.appendChild(document.createTextNode('[link]'));

		siteDiv.appendChild(titleA);
		siteDiv.appendChild(document.createTextNode(' '));
		siteDiv.appendChild(gotoA);
		li.appendChild(siteDiv);
		li.appendChild(siteList);
		list.appendChild(li);
	}

	div.appendChild(list);
	showOverlay(div);
}

function exportStickyNotes() {
	var text = [
		(name + '\n' + GM_getValue(name))
		for each (name in GM_listValues())
		if (name != "stylesheet")].join('\n');
	showOverlay(createTextarea(text));
}

function importStickyNotes() {
	var textarea = createTextarea();
	var importButton = createButton('Import', function() {
		var notes = textarea.value.split("\n");

		for (var i = 0; i < notes.length; i += 2) {
			var href = notes[i];

			while (href.length == 0 && (++i) < notes.length) {
				href = notes[i];
			}

			if (href.length == 0) {
				break;
			}

			var siteNotes = GM_getValue(href);

			if ((i+1) >= notes.length || notes[i+1].length == 0) {
				break;
			}

			var newNotes = notes[i+1];
			
			if (siteNotes != undefined) {
				var s = siteNotes;
				var siteNotes = siteNotes.split(" ");
				var newNotes  = newNotes.split(" ");
				
				for (var inn = 0; inn < newNotes.length; ++ inn) {
					var newNote = newNotes[inn];
					var exists = false;
					for (var isn = 0; isn < siteNotes.length; ++ isn) {
						if (newNote == siteNotes[isn]) {
							exists = true;
							break;
						}
					}

					if (!exists && newNote.length > 0) {
						s += newNote + " ";
					}
				}
				GM_setValue(href,s);
			}
			else {
				GM_setValue(href,newNotes);
			}
		}

		for (var i = 0; i < stickyNotes.length; ++ i) {
			stickyNotes[i].remove();
		}
		stickyNotes = [];
		loadStickyNotes();
		hideOverlay();
	});
	showOverlay(textarea, [importButton]);
}

function saveStylesheet(style) {
	GM_setValue("stylesheet", '/*vers' + STYLE_VERSION + '*/\n' + style);
}

function loadStylesheet() {
	var style = GM_getValue("stylesheet");

	if (style == undefined) {
		style = DEFAULT_STYLESHEET;
	}
	else {
		// reset style if its to old
		var match = /\/\*vers(\d+)\*\/\n/.exec(style);
		var vers = 0;

		if (match == null) {
			GM_deleteValue("stylesheet");
			style = DEFAULT_STYLESHEET;
		}
		else {
			vers = parseInt(match[1]);

			if (vers < STYLE_VERSION) {
				GM_deleteValue("stylesheet");
				style = DEFAULT_STYLESHEET;
			}
			else {
				style = style.substring(match[0].length);
			}
		}
	}

	setStylesheet(style);
}

function setStylesheet(style) {
	var styleElem = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-style");

	if (styleElem == undefined) {
		styleElem = document.createElement("style");
		styleElem.id = "at-ac-tuwien-student-e0427417-sticky-note-style";
		styleElem.type = "text/css";
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(styleElem);
	}
	else {
		styleElem.innerHTML = '';
	}

	styleElem.appendChild(document.createTextNode(style));
}

function getStylesheet() {
	var styleElem = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-style");

	if (styleElem == undefined) {
		return DEFAULT_STYLESHEET;
	}
	else {
		return styleElem.innerHTML;
	}
}

function editStylesheet() {
	var textarea = createTextarea(getStylesheet());
	var resetButton = createButton("Reset", function() {
		textarea.value = DEFAULT_STYLESHEET;
	});
	var saveButton = createButton("Save", function() {
		saveStylesheet(textarea.value);
		setStylesheet(textarea.value);
		hideOverlay();
	});
	
	textarea.style.fontFamily = 'monospace';
	textarea.addEventListener("keydown", function(e) {
		if (e.ctrlKey && e.which == 13) {
			saveStylesheet(textarea.value);
			setStylesheet(textarea.value);
			hideOverlay();
		}
	}, true);

	showOverlay(textarea, [resetButton, saveButton]);
}

function addStickyNote() {
	stickyNotes.push(new StickyNote());
}

unsafeWindow.addStickyNote = addStickyNote;

GM_registerMenuCommand("Add Sticky Note", addStickyNote, "n", "alt", "N");
GM_registerMenuCommand("Manage Sticky Notes...", manageStickyNotes, undefined, undefined, "M");
GM_registerMenuCommand("Export Sticky Notes...", exportStickyNotes, undefined, undefined, "E");
GM_registerMenuCommand("Import Sticky Notes...", importStickyNotes, undefined, undefined, "I");
GM_registerMenuCommand("Edit Sticky Note Stylesheet...", editStylesheet, undefined, undefined, "S");

loadStylesheet();
loadStickyNotes();