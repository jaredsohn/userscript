// ==UserScript==
// @name           Insert Reference
// @namespace      http://wiki.mises.org/
// @description    Inserts a reference at the current cursor position at the edit field of a wiki page. 
// @include        http://wiki.mises.org/*edit*
// ==/UserScript==

// Inserts a reference at the current cursor position at the edit field of a wiki page. 
// Edit the makeref() function to change the reference.


// This DIV holds the button:
finalDiv = document.createElement('div');
finalDiv.setAttribute('style','position:fixed;right:0px;top:0px;');
document.body.appendChild(finalDiv);
outputText = document.getElementById('wpTextbox1');


// doesn't check for duplicates
function createReference( id, author, url, title, note){
  // Creates a complete reference string, like: 
  // <ref name="Rothbard_cartel">Murray Rothbard. [http://mises.org/books/mespm.pdf Man, Economy and State], Chapter 10. Referenced 2010-07-16.</ref>
  //
  // "id" is the (hopefully) unique identifier of the reference; uses underscores instead of spaces
  // "author" is for the authority of origin or an actual author;
  // "url" is the url of the source page and 
  // "title" is the page title
  // "note" is a misc. note to round things out
  // turns parameters into: <ref name="ID">AUTHOR. [URL "TITLE"], NOTE. Referenced DATE.</ref>

  var d = new Date();

  var month = d.getMonth() + 1; if (month < 10) month = "0" + month;
  var day = d.getDate(); if (day < 10) day = "0" + day;
  var year = d.getFullYear();
  var refDate = year + "-" + month + "-" + day;

  var good_id = id.replace(' ', '_');

  reference = '<ref name="' + good_id + '">' + author + '. [' + url + ' "' + title + '"], ' + note + '. Referenced ' + refDate + '.</ref>';

  //GM_log("Reference made: " + reference);
  return reference;
}


// Inserting text at cursor position, from http://pastebin.parentnode.org/78
function insertAtCaret(obj, text) {
		if(document.selection) {
			obj.focus();
			var orig = obj.value.replace(/\r\n/g, "\n");
			var range = document.selection.createRange();

			if(range.parentElement() != obj) {
				return false;
			}

			range.text = text;
			
			var actual = tmp = obj.value.replace(/\r\n/g, "\n");

			for(var diff = 0; diff < orig.length; diff++) {
				if(orig.charAt(diff) != actual.charAt(diff)) break;
			}

			for(var index = 0, start = 0; 
				tmp.match(text) 
					&& (tmp = tmp.replace(text, "")) 
					&& index <= diff; 
				index = start + text.length
			) {
				start = actual.indexOf(text, index);
			}
		} else if(obj.selectionStart) {
			var start = obj.selectionStart;
			var end   = obj.selectionEnd;

			obj.value = obj.value.substr(0, start) 
				+ text 
				+ obj.value.substr(end, obj.value.length);
		}
		
		if(start != null) {
			setCaretTo(obj, start + text.length);
		} else {
			obj.value += text;
		}
}
	
function setCaretTo(obj, pos) {
		if(obj.createTextRange) {
			var range = obj.createTextRange();
			range.move('character', pos);
			range.select();
		} else if(obj.selectionStart) {
			obj.focus();
			obj.setSelectionRange(pos, pos);
		}
}
//


function makeRef(){
  // this build the reference and enters it into the text
  var ref = createReference( "Reinhart_Different", "Carmen M. Reinhart and Kenneth S. Rogoff", "http://press.princeton.edu/titles/8973.html", "This Time is Different", "''Princeton University Press'', ISBN 978-0-691-14216-6");
  if(outputText) insertAtCaret(outputText, ref);
  GM_log(ref);

}

function constructControl(info, label){
  // Constructs the control interface DIV, with info text (can be formatted) and a label for the button.

  finalDiv.innerHTML = info;
  var btn = document.createElement('input');
  btn.setAttribute('type',"button");
  btn.setAttribute('value',label);
  btn.addEventListener("click", makeRef, true); // <- HERE to add
  finalDiv.appendChild(btn);
}


constructControl("", "Create Reference");
