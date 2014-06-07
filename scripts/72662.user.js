// ==UserScript==
// @name           Danbooru - Translation Helper
// @description    Modifies the note creation interface for Danbooru.
// @namespace      http://userscripts.org/scripts/show/72662
// @include        http://danbooru.donmai.us/post/show/*
// @include        http://hijiribe.donmai.us/post/show/*
// @include        http://sonohara.donmai.us/post/show/*
// @include        http://memo.donmai.us/post/show/*
// @include        http://donmai.us/post/show/*
// @updated        2012-06-25
// ==/UserScript==

var translationModeColor = "#E1E4FF";
var specialCharacters = '["\u2661", "\u2665", "\u2606", "\u2605", "\u266a", "\u266b", "\u2642", "\u2640", "\u300c", "\u300d"]';

var newScript = document.createElement("script");

newScript.innerHTML += "var id = window.location.pathname.split('/')[3];\n";
newScript.innerHTML += "var original_background_color = document.body.style.backgroundColor;\n";
newScript.innerHTML += "var translationMode = false;\n";
newScript.innerHTML += "var selectRegion = null;\n";
newScript.innerHTML += "var selecting = false;\n";
newScript.innerHTML += "var translationModeColor = \"" + translationModeColor + "\";\n";
newScript.innerHTML += "var specialCharacters = " + specialCharacters + ";\n";

newScript.innerHTML += "var posX = null;\n";
newScript.innerHTML += "var posY = null;\n";

newScript.innerHTML += addButtons + "\n\n" + showPreview + "\n\n" + showSpecialCharacters + "\n\n" + toggleTranslationMode + "\n\n" + saveTranslation + "\n\n" + startSelect + "\n\n" + drag + "\n\n" + endSelect + "\n\n";

document.getElementsByTagName("head")[0].appendChild(newScript);

alterTranslationButton();

function alterTranslationButton() {
	if (document.getElementById("post-view") == null) { return };
	
	for (var i in (linkArray = document.getElementById("post-view").getElementsByTagName("li"))) {
		if (!/^<[Aa].*>Add translation/.test(linkArray[i].innerHTML)) continue;
		id = linkArray[i].innerHTML.match(/Note\.create\(([0-9]+)\)/)[1];
		linkArray[i].innerHTML = '<a href="#" onclick="toggleTranslationMode(); return false;">Toggle translation mode</a>';
	}
	
	var translatePanel = document.createElement("div");
	translatePanel.id = "translation";
	translatePanel.style.setProperty("margin-top", "1em", null);
	translatePanel.style.setProperty("display", "none", null);

	var translateButton = document.createElement("input");
	translateButton.type = "submit";
	translateButton.id = "save_translation";
	translateButton.value = "Save as Translated";
	translatePanel.appendChild(translateButton);
	
	var translateTags = document.createElement("input");
	translateTags.type = "hidden";
	translateTags.id = "translation_tags";
	translateTags.value = document.getElementById("post_tags").value;
	translateTags.name = "post[tags]";
	translatePanel.appendChild(translateTags);

	var translated = document.createElement("input");
	translated.type = "radio";
	translated.value = "Translated";
	translated.name = "translation_status";
	translated.id = "translation_status_translated";
	translated.checked = "checked";
	
	var translatedTextNode = document.createTextNode("Translated");
	var translatedLabel = document.createElement("label");
	translatedLabel.htmlFor = "translation_status_translated";
	translatedLabel.appendChild(translated);
	translatedLabel.appendChild(translatedTextNode);
	translatePanel.appendChild(translatedLabel);

	var partiallyTranslated = document.createElement("input");
	partiallyTranslated.type = "radio";
	partiallyTranslated.value = "Partially Translated";
	partiallyTranslated.name = "translation_status";
	partiallyTranslated.id = "translation_status_partially_translated";
	
	var partiallyTranslatedTextNode = document.createTextNode("Partially Translated");
	var partiallyTranslatedLabel = document.createElement("label");
	partiallyTranslatedLabel.htmlFor = "translation_status_partially_translated";
	partiallyTranslatedLabel.appendChild(partiallyTranslated);
	partiallyTranslatedLabel.appendChild(partiallyTranslatedTextNode);
	translatePanel.appendChild(partiallyTranslatedLabel);

	var checkTranslation = document.createElement("input");
	checkTranslation.type = "checkbox";
	checkTranslation.value = "Check Translation";
	checkTranslation.id = "check_translation";

	var checkTranslationTextNode = document.createTextNode("Check Translation");
	var checkTranslationLabel = document.createElement("label");
	checkTranslationLabel.htmlFor = "check_translation";
	checkTranslationLabel.appendChild(checkTranslation);
	checkTranslationLabel.appendChild(checkTranslationTextNode);
	translatePanel.appendChild(checkTranslationLabel);

	document.getElementById("edit").parentNode.insertBefore(translatePanel, document.getElementById("edit"));
}

function toggleTranslationMode() {
	if (!translationMode) {
		$('note-container').show();
		$('edit').hide();
		$('comments').hide();
		$('translation').show();
		$('save_translation').observe('click', saveTranslation);
		
		$('image').onclick="";
		$('image').observe('mousedown', startSelect);
		$('note-container').observe('DOMNodeInserted', addButtons);
		document.body.style.backgroundColor = translationModeColor;
		translationMode = true;
	} else {
		$('translation').hide();
		$('comments').hide();
		$('edit').show();
		$('save_translation').stopObserving('click', saveTranslation);
	
		$('image').stopObserving('mousedown', startSelect);
		$('note-container').stopObserving('DOMNodeInserted', addButtons);
		$('image').onclick = "Note.toggle();";
		document.body.style.backgroundColor = original_background_color;
		translationMode = false;
	}
}

function saveTranslation() {
	var fetchParameters = {post_id: id};
	new Ajax.Request('/post_tag_history/index.json', {
		method: 'post',
		parameters: fetchParameters,
		onComplete: function(transport) {
			var response = eval(transport.responseJSON);
			
			if (response.success == "false") {
				alert("Failed to retrieve tags: " + response.reason);
			} else {
				var tags = response[0].tags;
							
				if ($('translation_status_translated').checked) {
					tags = tags.replace(/(^| )(translation_request|partially_translated)( |$)/gi, " ") + " translated";
				} else {
					tags = tags.replace(/(^| )(hard_translated|translated)( |$)/gi, " ") + " partially_translated translation_request";
				}
				
				if ($('check_translation').checked) {
					tags += " check_translation";
				} else {
					tags = tags.replace(/(^| )check_translation( |$)/gi, " ");
				}			
				
				var saveParameters = {id: id, "post[tags]": tags};
				new Ajax.Request('/post/update.json', {
					method: 'post',
					parameters: saveParameters,
					onComplete: function(transport) {
							var response = eval(transport.responseJSON);
							if (response.success == "false") {
								alert("Failed to save tags: " + response.reason);
							}
							window.location.reload();
					}
				});
			}
		}
	});
}

function addButtons(event) {
	if (event.element().id != 'edit-box') { return; }
	
	var id = $('note-container').getElementsByTagName("input")[0].id.match(/note-save-(.*)/)[1];
	
	var preview = document.createElement("input");
	preview.type = "submit";
	preview.name = "preview";	
	preview.id = "note-preview-" + id;
	$('edit-box').getElementsByTagName("form")[0].appendChild(preview);
	preview.value = "Preview";
	preview.observe('click', showPreview);
	
	var special = document.createElement("input");
	special.type = "submit";
	special.name = "special";
	special.id = "note-special-" + id;
	$('edit-box').getElementsByTagName("form")[0].appendChild(special);
	special.value = "Special Characters";
	special.observe('click', showSpecialCharacters);
}

function showPreview() {
	var id = this.parentNode.getElementsByTagName("input")[0].id.match(/note-save-(.*)/)[1];
	var note = Note.find(id);
	note.old.raw_body = this.parentNode.getElementsByTagName("textarea")[0].value;
	note.old.formatted_body = note.old.raw_body.strip();
	note.elements.body.update(note.old.formatted_body);
	this.stopObserving('click', showPreview);
	note.hideEditBox(null);
}

function showSpecialCharacters(event) {
	var button = event.element();
	
	var characters = document.createElement("div");
	characters.id = "special-characters";
	
	characters.setStyle({
		left: (button.positionedOffset().left + 10) + 'px',
		top: (button.positionedOffset().top + 10) + 'px',
		position: 'absolute',
		background: 'white',
		border: '1px solid black',
		padding: '4px',
		'font-size': '150%',
		'z-index': 150
	});
	
	specialCharacters.each(function(name, index) {
		var specialTextNode = document.createTextNode(name);
		var specialLabel = document.createElement("label");
		specialLabel.appendChild(specialTextNode);
		characters.appendChild(specialLabel);
		specialLabel.observe('mouseover', function(e) { e.element().setStyle('background-color:lightgray');});
		specialLabel.observe('mouseout', function(e) {e.element().setStyle('background-color:white');}); 
		specialLabel.observe('click', function(e) {
			$('edit-box-text').innerHTML += e.element().innerHTML;
			e.element().up().remove();
		});
	});
	
	$('edit-box').appendChild(characters);
}

function startSelect(event) {
	event.preventDefault();
	posX = event.pointerX() - $('image').offsetLeft;
	posY = event.pointerY() - $('image').offsetTop;
	
	selectRegion = document.createElement('div');
	selectRegion.addClassName('note-box unsaved');
	selectRegion.setStyle('cursor:default;opacity:0.2;left:' + posX + 'px;top:' + posY + 'px;width:0;height:0');
	selectRegion.id = 'temp-note-box';
	
	$('note-container').appendChild(selectRegion);
	
	$('image').observe('mousemove', drag);
	$('image').observe('mouseup', endSelect);
	$$('div#note-container .note-box').each(
		function(box) {
			box.observe('mousemove', drag);
			box.observe('mouseup', endSelect);
		}
	);
	selecting = true;
}

function drag(event) {
	var newX = event.pointerX() - $('image').offsetLeft;
	var newY = event.pointerY() - $('image').offsetTop
	
	var top;
	var left;
	var width;
	var height;
	
	if (newX < posX) {
		left = newX;
		width = posX - newX;
	} else {
		left = posX;
		width = newX - posX;
	}
	if (newY < posY) {
		top = newY;
		height = posY - newY;
	} else {
		top = posY;
		height = newY - posY;
	}
	
	selectRegion.setStyle('top:' + top + 'px;left:' + left + 'px;width:' + width + 'px;height:' + height + 'px');
}

function endSelect(event) {
	if (!selecting) { return; }

	$('image').stopObserving('mousemove', drag);
	$('image').stopObserving('mouseup', endSelect);
	$$('div#note-container .note-box').each(
		function(box) {
			box.stopObserving('mousemove', drag);
			box.stopObserving('mouseup', endSelect);
		}
	);
	selectRegion.remove();
	
	var x = event.pointerX() - $('image').offsetLeft;
	var y = event.pointerY() - $('image').offsetTop;
	
	var width;
	var height;
	if (posX < x) {
		width = x - posX;
	} else {
		width = posX - x;
		posX = x;
	}
	if (posY < y) {
		height = y - posY;
	} else {
		height = posY - y;
		posY = y;
	}
	
	var ratio = $('image').width / $('image').getAttribute('data-orig_width');
	
	var noteId = Note.counter;
	Note.create(Note.post_id);
	var note = Note.find(noteId);
	note.fullsize = {
		left: posX / ratio,
		top: posY / ratio,
		width: width / ratio,
		height: height / ratio
	};
	for (var p in note.fullsize) {
		note.old[p] = note.fullsize[p];
	}
	note.adjustScale();
	note.showEditBox(null);
	note.elements.box.style.zIndex = 11;
	
	posX = null;
	posY = null;
	
	selecting = false;
}