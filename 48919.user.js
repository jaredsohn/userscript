// ==UserScript==
// @name           Sticky Notes
// @namespace      http://twoday.tuwien.ac.at/pub/
// @description    add sticky notes to websites
// @resource       style https://web.student.tuwien.ac.at/~e0427417/downloads/sticky-note/default_style.v2.css
// @include        *
// ==/UserScript==
//
// contributors:
//   Mathias Panzenböck (panzi)
//   Mihai Ghete (Viper)

const BASE_Z_INDEX = 100000;
const VERSION      = 110;

const STATE_DISPLAY = 0;
const STATE_EDIT    = 1;
const STATE_MOVE    = 2;
const STATE_RESIZE  = 3;
const MIN_SIZE      = 15;

function StickyNote(x,y,width,height,text) {
	var stickyNote = this;

	stickyNote._moveX = 0;
	stickyNote._moveY = 0;
	stickyNote._state = STATE_DISPLAY;

	stickyNote.container = document.createElement("div");
	stickyNote.container.style.position = "absolute";
	stickyNote._width  = width  === undefined || width  < MIN_SIZE ? 250 : width;
	stickyNote._height = height === undefined || height < MIN_SIZE ? 250 : height;
	stickyNote._x = x === undefined ? ((window.innerWidth - stickyNote._width) / 2 + window.pageXOffset) : x;
	stickyNote._y = y === undefined ? ((window.innerHeight - stickyNote._height) / 2 + window.pageYOffset) : y;
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
const siteId = location.href.split('#')[0];

function listSites() {
	return [name for each (name in GM_listValues()) if (!/^stickynote:/.test(name))];
}

function GM_getObject(name,defaultValue) {
	var s = GM_getValue(name);

	if (s === undefined) {
		return defaultValue;
	}
	else {
		return JSON.parse(s);
	}
}

function GM_setObject(name,value) {
	GM_setValue(name, JSON.stringify(value));
}

function arrayEquals(a1, a2) {
	if (a1.length != a2.length) {
		return false;
	}
	
	for (var i = 0; i < a1.length; ++ i) {
		if (a1[i] !== a2[i]) {
			return false;
		}
	}

	return true;
}

function listStickyNotes(site) {
	var notes = GM_getObject(site);

	if (notes === undefined) {
		return [];
	}
	else {
		return notes;
	}
}

function reloadStickyNotes() {
	for each (note in stickyNotes) {
		note.remove();
	}
	stickyNotes = [];
	loadStickyNotes();
}

function loadStickyNotes() {
	var version = GM_getValue('stickynote:version');

	if (version !== VERSION) {
		GM_setValue('stickynote:version', VERSION);
	}

	if (version < 110) {
		var style = getStylesheet();
		style += '\n\n.at-ac-tuwien-student-e0427417-sticky-note-overlay-extra-buttons {\n  float: left;\n}';
		setStylesheet(style);
		saveStylesheet(style);
	}

	for each ([x,y,width,height,text] in listStickyNotes(siteId)) {
		stickyNotes.push(new StickyNote(x,y,width,height,text));
	}
}

function saveStickyNotesFor(site,notes) {
	if (notes.length == 0) {
		GM_deleteValue(site);
	}
	else {
		GM_setObject(site, notes);
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

var onOverlayClosed = null;

function showOverlay(element, opts) {
	if (!opts || !opts.buttons) {
		buttons = [];
	}
	else {
		buttons = opts.buttons;
	}

	buttons.push(createButton('Close', function () {
		hideOverlay('close');
	}));

	var buttonDiv = document.createElement('div');
	buttonDiv.className = 'at-ac-tuwien-student-e0427417-sticky-note-overlay-buttons';

	for (var i = 0; i < buttons.length; ++ i) {
		var button = buttons[i];
		buttonDiv.appendChild(button);
	}

	var overlay = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-overlay");
	var blanket = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-blanket");

	if (!blanket) {
		blanket = document.createElement("div");
		blanket.id = "at-ac-tuwien-student-e0427417-sticky-note-blanket";
		blanket.style.position = 'fixed';
		blanket.style.left   = '0px';
		blanket.style.top    = '0px';
		blanket.style.width  = '100%';
		blanket.style.height = '100%';
		blanket.style.zIndex = '100101';
		document.body.appendChild(blanket);
	}
	else {
		blanket.style.display = 'block';
	}

	if (!overlay) {
		var overlay = document.createElement("div");
		overlay.id = "at-ac-tuwien-student-e0427417-sticky-note-overlay";
		overlay.style.position = 'fixed';
		overlay.style.margin = 'auto';
		overlay.style.zIndex = '100102';
		document.body.appendChild(overlay);

		window.addEventListener('resize', function () {
			if (overlay.style.display != 'none') {
				overlay.style.left = ((window.innerWidth - overlay.offsetWidth) / 2) + 'px';
				overlay.style.top  = ((window.innerHeight - overlay.offsetHeight) / 2) + 'px';
			}
		}, true);
	}
	else {
		overlay.innerHTML = '';
		overlay.style.display = 'block';
	}

	onOverlayClosed = opts && opts.onClose ? opts.onClose : null;
	overlay.appendChild(element);

	if (opts && opts.extraButtons) {
		var extraButtonDiv = document.createElement('div');
		extraButtonDiv.className = 'at-ac-tuwien-student-e0427417-sticky-note-overlay-extra-buttons';

		for each (button in opts.extraButtons) {
			extraButtonDiv.appendChild(button);
		}
		overlay.appendChild(extraButtonDiv);
	}

	overlay.appendChild(buttonDiv);

	var compStyle = getComputedStyle(overlay,'');
	var overlayWidth  = px(compStyle.width) || overlay.offsetWidth;
	var overlayHeight = px(compStyle.height) || overlay.offsetHeight;

	overlay.style.left = ((window.innerWidth - overlayWidth) / 2) + 'px';
	overlay.style.top  = ((window.innerHeight - overlayHeight) / 2) + 'px';

	compStyle = getComputedStyle(buttonDiv,'');
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
		px(compStyle.paddingLeft) -
		px(compStyle.paddingRight) -
		px(compStyle.marginLeft) -
		px(compStyle.marginRight) -
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

function hideOverlay(reason) {
	var overlay = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-overlay");
	var blanket = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-blanket");

	if (overlay) {
		if (onOverlayClosed) {
			onOverlayClosed(reason);
			onOverlayClosed = null;
		}

		overlay.style.display = 'none';
		overlay.innerHTML = '';
	}

	if (blanket) {
		blanket.style.display = 'none';
	}
}

function createButton(label,callback) {
	var btn = document.createElement('input');
	btn.type = 'button';
	btn.value = label;
	if (callback) {
		btn.addEventListener('click', callback, true);
	}
	return btn;
}

function createCheckbox(id,label,callback) {
	id = 'at-ac-tuwien-student-e0427417-sticky-note-overlay-'+id;
	var chk  = document.createElement('input');
	var lbl  = document.createElement('label');
	var span = document.createElement('span');
	chk.type = 'checkbox';
	chk.id = id;
	lbl.htmlFor = id;
	lbl.appendChild(document.createTextNode(label));
	if (callback) {
		chk.addEventListener('change', callback, true);
	}
	span.appendChild(chk);
	span.appendChild(lbl);
	return span;
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

		var sibling = li.nextSibling;

		while (sibling != null) {
			if (sibling.stickyNoteIndex != undefined) {
				-- stickyNoteIndex.stickyNoteIndex;
			}
			sibling = sibling.nextSibling;
		}

		list.stickyNotes = notes;
		list.removeChild(li);
		saveStickyNotesFor(list.stickyNoteSite, notes);

		if (siteId == list.stickyNoteSite) {
			reloadStickyNotes();
		}
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
		(JSON.stringify(name) + ':' + GM_getValue(name))
		for each (name in GM_listValues())
		if (!/^stickynote:/.test(name))].join(',');
	showOverlay(createTextarea('{'+text+'}'));
}

function importStickyNotes() {
	var textarea = createTextarea();
	var importButton = createButton('Import', function() {
		var newNotes = JSON.parse(textarea.value);

		for (url in newNotes) {
			if (/^stickynote:/.test(url)) {
				continue;
			}

			// ignore invalid notes:
			var notes = [note for each (note in newNotes[url]) if (
				note instanceof Array && note.length == 5 &&
				typeof(note[0]) == 'number' && typeof(note[1]) == 'number' &&
				typeof(note[2]) == 'number' && typeof(note[3]) == 'number' &&
				typeof(note[4]) == 'string')];

			var existingNotes = GM_getObject(url);

			if (existingNotes !== undefined) {
				var merged = [note for each (note in existingNotes)];
				for each (note in notes) {
					var exists = false;
					for each (existingNote in existingNotes) {
						if (arrayEquals(note, existingNote)) {
							exists = true;
							break;
						}
					}
					if (!exists) {
						merged.push(note);
					}
				}
				newNotes[url] = merged;
				GM_setObject(url, merged);
			}
			else {
				newNotes[url] = notes;
				GM_setObject(url, notes);
			}
		}

		for each (note in stickyNotes) {
			note.remove();
		}
		stickyNotes = [];
		for each ([x,y,width,height,text] in newNotes[siteId]) {
			stickyNotes.push(new StickyNote(x,y,width,height,text));
		}
		hideOverlay();
	});
	showOverlay(textarea, { buttons: [importButton] });
}

function saveStylesheet(style) {
	GM_setValue("stickynote:stylesheet", style);
}

function loadStylesheet() {
	var style = GM_getValue("stickynote:stylesheet");

	if (style === undefined) {
		style = GM_getResourceText('style');
	}

	setStylesheet(style);
}

function setStylesheet(style) {
	var styleElem = document.getElementById("at-ac-tuwien-student-e0427417-sticky-note-style");

	if (!styleElem) {
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

	if (!styleElem) {
		return GM_getResourceText('style');
	}
	else {
		return styleElem.innerHTML;
	}
}

function editStylesheet() {
	var unchangedStyle = getStylesheet();
	var textarea = createTextarea(unchangedStyle);
	var resetButton = createButton("Reset", function () {
		textarea.value = GM_getResourceText('style');
	});
	var saveButton = createButton("Save", function () {
		saveStylesheet(textarea.value);
		setStylesheet(textarea.value);
		hideOverlay('save');
	});
	var onStyleEdited = function () {
		setStylesheet(textarea.value);
	};
	var previewCheckbox = createCheckbox('live-preview', 'Live Preview', function (event) {
		if (event.originalTarget.checked) {
			setStylesheet(textarea.value);
			textarea.addEventListener('keyup', onStyleEdited, true);
		}
		else {
			textarea.removeEventListener('keyup', onStyleEdited, true);
			setStylesheet(unchangedStyle);
		}
	});
	
	textarea.style.fontFamily = 'monospace';
	textarea.addEventListener("keydown", function(e) {
		if (e.ctrlKey && e.which == 13) {
			saveStylesheet(textarea.value);
			setStylesheet(textarea.value);
			hideOverlay('save');
		}
	}, true);

	showOverlay(textarea, {
		buttons: [resetButton, saveButton],
		extraButtons: [previewCheckbox],
		onClose: function (reason) {
			if (reason == 'close') {
				setStylesheet(unchangedStyle);
			}
		}
	});
}

function addStickyNote() {
	stickyNotes.push(new StickyNote());
}

unsafeWindow.addStickyNote = addStickyNote;

// HACK: This should be done by greasemonkey.
window.addEventListener('keydown', function(e) {
	if (e.altKey && e.which == 78) {
		addStickyNote();
	}
}, true);

GM_registerMenuCommand("Add Sticky Note", addStickyNote, "n", "alt", "N");
GM_registerMenuCommand("Manage Sticky Notes...", manageStickyNotes, undefined, undefined, "M");
GM_registerMenuCommand("Export Sticky Notes...", exportStickyNotes, undefined, undefined, "E");
GM_registerMenuCommand("Import Sticky Notes...", importStickyNotes, undefined, undefined, "I");
GM_registerMenuCommand("Edit Sticky Note Stylesheet...", editStylesheet, undefined, undefined, "S");

loadStylesheet();
loadStickyNotes();