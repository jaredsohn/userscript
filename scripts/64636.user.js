// ==UserScript==
// @name           Player Training Notes
// @namespace      KMHI - Greasemonkey
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// ==/UserScript==

var url = window.location.href;
var currentId = url.substring(url.indexOf('_id=')+4, url.length);

var savedNotes = GM_getValue(currentId + "_notes", null);

var special_abilities = getElements("div", "id", "special_abilities");
var div = special_abilities[0];

var notes = document.createElement("div");
notes.id = "player_notes";
notes.innerHTML = "<span style='font-weight:700;'>Training Notes</span>";

var notepad = document.createElement("div");
notepad.id = "note_pad";

var content = document.createElement("div");
content.id = "note_contents";

var empty_notes = document.createElement("p");
empty_notes.id = "notestatic";
if(savedNotes) {
	empty_notes.innerHTML = savedNotes.replace(/([\r\n|\r|\n])/g, "<br />");
} else {
	empty_notes.innerHTML = "Use this area to jot player specific training notes."
}

var textarea = document.createElement("textarea")
textarea.id = "notes"
textarea.className = "noteinput";

var display = document.createElement("div");
display.id = "display";

var edit_note = document.createElement("a");
edit_note.innerHTML = "Edit Note";
edit_note.title = "Click here to edit";
edit_note.className = "n-edit";

var save_note = document.createElement("a");
save_note.innerHTML = "Save Note";
save_note.className = "note_button";

var cancel = document.createElement("a");
cancel.innerHTML = "Cancel";
cancel.className = "note_button";

cancel.addEventListener('click',function (e) {
		  toggle();
		},false);

edit_note.addEventListener('click',function (e) {
		  toggle();
		},false);
		
save_note.addEventListener('click',function (e) {
		  save();
		},false);
		
display.appendChild(edit_note);
display.appendChild(save_note);
display.appendChild(cancel);

content.appendChild(empty_notes);
content.appendChild(textarea);
content.appendChild(display);

notepad.appendChild(content);
notes.appendChild(notepad);

insertAfter(notes, div);

var css = '#player_notes {display:inline; float:left; width:440px; margin-top:10px;}' +
	'#note_pad {margin: 4px 0 0 4px;}' +
	'#note_contents {background: #FFFBBE none repeat scroll 0 0; border: 1px solid #FFE53E; padding:10px 10px 0 10px; min-height: 182px;}' +
	'#note_contents textarea {background: #FEFDDE none repeat scroll 0 0; height:140px; width:90%; display:none; border: 0 none;}' +
	'#note_contents a {color: #0069AA; text-decoration:none; font-family:verdana; font-size: 77%; cursor: pointer; margin-top: 15px;}' +
	'#notestatic {min-height:140px; width:90%;word-wrap: break-word;}' +
	'#display a.note_button {color: #000000; background-color: #D8D9D5; border: 1px solid #A8A8A8; cursor: pointer; margin: 15px 5px 0 0; padding: 2px 3px; display:none; }' +
	'#display a.note_button:hover {color:#ff0000;}';
	
addGlobalStyle(css);

function save() {
	GM_setValue(currentId + "_notes", textarea.value);
	toggle();
}

function toggle() {
	savedNotes = GM_getValue(currentId + "_notes", null);
	if(textarea.style.display == "block") {		
		if(savedNotes) {
			empty_notes.innerHTML = savedNotes.replace(/([\r\n|\r|\n])/g, "<br />");
		} else {
			empty_notes.innerHTML = "Use this area to jot player specific training notes.";
		}
		textarea.style.display = "none";
		empty_notes.style.display = "block";
		edit_note.style.display = "inline";
		save_note.style.display = "none";
		cancel.style.display = "none";
	} else {		
		if(savedNotes) {
			textarea.value = savedNotes;
		} else {
			textarea.value = "";
		}
		textarea.style.display = "block";
		empty_notes.style.display = "none";
		edit_note.style.display = "none";
		save_note.style.display = "inline";
		cancel.style.display = "inline";
		textarea.focus();
	}	
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function getElements(element, classname, value){      
   var elements = [];   
   var xpathExp = "//" + element;   
   
   if(classname != undefined)
      if(value != undefined)
         xpathExp = xpathExp + "[@" + classname + "='" + value + "']";
      else
         xpathExp = xpathExp + "[@" + classname + "]";  
         
   var allElements = document.evaluate(xpathExp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0; i < allElements.snapshotLength; i++)
      elements.push(allElements.snapshotItem(i))
      
   return elements;
}