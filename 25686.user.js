// ==UserScript==
// @name           Facebook Notes++
// @namespace      http://www.kunxi.org
// @description    Add buttons to notes of Facebook.
// @include        http://www.facebook.com/notes.php*
// ==/UserScript==

var edButtons = new Array(); 
var edOpenTags = new Array(); 

function edButton(id, display, tagStart, tagEnd, access, open) { 
	this.id = id;				 
	this.display = display;	 
	this.tagStart = tagStart; 
	this.tagEnd = tagEnd;	 
	this.access = access; 
	this.open = open;	 
} 

edButtons[edButtons.length] = 
new edButton('ed_strong' 
,'b' 
,'<b>' 
,'</b>' 
,'b' 
); 
 
edButtons[edButtons.length] = 
new edButton('ed_em' 
,'i' 
,'<i>' 
,'</i>' 
,'i' 
); 
 
edButtons[edButtons.length] = 
new edButton('ed_underline' 
,'underline' 
,'<u>' 
,'</u>' 
,'n' 
);  
 
edButtons[edButtons.length] = 
new edButton('ed_del' 
,'del' 
,'<s>'  
,'</s>' 
,'d' 
); 

edButtons[edButtons.length] = 
new edButton('ed_bigsize' 
,'big' 
,'<big>'  
,'</big>' 
,'g' 
); 

edButtons[edButtons.length] = 
new edButton('ed_smallsize' 
,'small' 
,'<small>'  
,'</small>' 
,'m' 
); 

edButtons[edButtons.length] = 
new edButton('ed_dash' 
,'--' 
,'&mdash;'  
,'' 
,'-' 
); 

edButtons[edButtons.length] = 
new edButton('ed_link' 
,'link' 
,''  
,'</a>' 
,'a' 
); 

edButtons[edButtons.length] = 
new edButton('ed_ul' 
,'ul' 
,'<ul>\n'  
,'</ul>\n' 
,'u' 
); 

edButtons[edButtons.length] = 
new edButton('ed_ol' 
,'ol' 
,'<ol>\n'  
,'</ol>\n' 
,'o' 
); 

edButtons[edButtons.length] = 
new edButton('ed_li' 
,'li' 
,'\t<li>'  
,'</li>\n' 
,'l' 
); 

edButtons[edButtons.length] = 
new edButton('ed_block' 
,'b-block' 
,'\n<blockquote>'  
,'</blockquote>\n'  
,'q' 
); 

edButtons[edButtons.length] = 
new edButton('ed_h1' 
,'h1' 
,'<h1>'  
,'</h1>\n' 
,'1' 
); 

edButtons[edButtons.length] = 
new edButton('ed_h2' 
,'h2' 
,'<h2>'  
,'</h2>\n' 
,'2' 
); 

edButtons[edButtons.length] = 
new edButton('ed_h3' 
,'h3' 
,'<h3>'  
,'</h3>\n' 
,'3' 
); 

function edAddTag(button) { 
	if (edButtons[button].tagEnd != '') { 
		edOpenTags[edOpenTags.length] = button; 
		document.getElementById(edButtons[button].id).value = '/' + document.getElementById(edButtons[button].id).value; 
	} 
} 
 
function edRemoveTag(button) { 
	for (i = 0; i < edOpenTags.length; i++) { 
		if (edOpenTags[i] == button) { 
			edOpenTags.splice(i, 1); 
			document.getElementById(edButtons[button].id).value = 		document.getElementById(edButtons[button].id).value.replace('/', ''); 
		} 
	} 
} 


function edInsertLink(i, defaultValue) {
	if (!defaultValue) {
		defaultValue = 'http://';
	}
	if (!edCheckOpenTags(i)) {
		var URL = prompt("Enter the URL", defaultValue);
		if (URL) {
			edButtons[i].tagStart = '<a href="' + URL + '">';
			edInsertTag(i);
		}
	}
	else {
		edInsertTag(i);
	}
}

function edCheckOpenTags(button) { 
	var tag = 0; 
	for (i = 0; i < edOpenTags.length; i++) { 
		if (edOpenTags[i] == button) { 
			tag++; 
		} 
	} 
	if (tag > 0) { 
		return true; 
	} 
	else { 
		return false; 
	} 
} 
 
function edCloseAllTags() { 
	var count = edOpenTags.length; 
	for (o = 0; o < count; o++) { 
		edInsertTag(edOpenTags[edOpenTags.length - 1]); 
	} 
} 
 
function edInsertTag(i) { 
    var myField = document.getElementById('note_content'); 
    if (myField.selectionStart || myField.selectionStart == '0') { 
		var startPos = myField.selectionStart; 
		var endPos = myField.selectionEnd; 
		var cursorPos = endPos; 
		var scrollTop = myField.scrollTop; 
 
		if (startPos != endPos) { 
			myField.value = myField.value.substring(0, startPos) 
			              + edButtons[i].tagStart 
			              + myField.value.substring(startPos, endPos) 
			              + edButtons[i].tagEnd 
			              + myField.value.substring(endPos, myField.value.length); 
			cursorPos += edButtons[i].tagStart.length + edButtons[i].tagEnd.length; 
		} else { 
			if (!edCheckOpenTags(i) || edButtons[i].tagEnd == '') { 
				myField.value = myField.value.substring(0, startPos) 
				              + edButtons[i].tagStart 
				              + myField.value.substring(endPos, myField.value.length); 
				edAddTag(i); 
				cursorPos = startPos + edButtons[i].tagStart.length; 
			} else { 
				myField.value = myField.value.substring(0, startPos) 
				              + edButtons[i].tagEnd 
				              + myField.value.substring(endPos, myField.value.length); 
				edRemoveTag(i); 
				cursorPos = startPos + edButtons[i].tagEnd.length; 
			} 
		} 
		myField.focus(); 
		myField.selectionStart = cursorPos; 
		myField.selectionEnd = cursorPos; 
		myField.scrollTop = scrollTop; 
	} else { 
		if (!edCheckOpenTags(i) || edButtons[i].tagEnd == '') { 
			myField.value += edButtons[i].tagStart; 
			edAddTag(i); 
		} else { 
			myField.value += edButtons[i].tagEnd; 
			edRemoveTag(i); 
		} 
		myField.focus(); 
	} 
} 

var thisElement, toolbar, script;
thisElement = document.getElementById('label_note_content');
toolbar = document.createElement('div');
for(var i = 0; i < edButtons.length; i++) {
    var node = document.createElement('input');
    // Add access key
    node.setAttribute('class', 'inputaux');
    node.setAttribute('id', edButtons[i].id);
    node.setAttribute('type', 'button');
    node.setAttribute('value', edButtons[i].display);
    if (edButtons[i].id == 'ed_link') {
        node.setAttribute('onclick', 'edInsertLink(' + i + ');');
    } else {
        node.setAttribute('onclick', 'edInsertTag(' + i + ');');
    }
    node.setAttribute('accessky', edButtons[i].access);
    toolbar.appendChild(node);
}
thisElement.parentNode.insertBefore(toolbar, thisElement.nextSibling);

var s = "";
// insert edButtons, edOpenTags
s += " \
var edButtons = new Array(); \
var edOpenTags = new Array(); \
 \
function edButton(id, display, tagStart, tagEnd, access, open) { \
	this.id = id;				 \
	this.display = display;	 \
	this.tagStart = tagStart; \
	this.tagEnd = tagEnd;	 \
	this.access = access; \
	this.open = open;	 \
} \
edButtons[edButtons.length] =  \
new edButton('ed_strong'  \
,'b'  \
,'<b>'  \
,'</b>'  \
,'b'  \
);  \
  \
edButtons[edButtons.length] =  \
new edButton('ed_em'  \
,'i'  \
,'<i>'  \
,'</i>'  \
,'i'  \
);  \
  \
edButtons[edButtons.length] =  \
new edButton('ed_underline'  \
,'underline'  \
,'<u>'  \
,'</u>'  \
,'n'  \
);   \
  \
edButtons[edButtons.length] =  \
new edButton('ed_del'  \
,'del'  \
,'<s>'   \
,'</s>'  \
,'d'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_bigsize'  \
,'big'  \
,'<big>'   \
,'</big>'  \
,'g'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_smallsize'  \
,'small'  \
,'<small>'   \
,'</small>'  \
,'m'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_dash'  \
,'--'  \
,'&mdash;'   \
,''  \
,'-'  \
);  \
\
edButtons[edButtons.length] =  \
new edButton('ed_link'  \
,'link'  \
,''   \
,'</a>'  \
,'a'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_ul'  \
,'ul'  \
,'<ul>\\n'   \
,'</ul>\\n'  \
,'u'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_ol'  \
,'ol'  \
,'<ol>\\n'   \
,'</ol>\\n'  \
,'o'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_li'  \
,'li'  \
,'\\t<li>'   \
,'</li>\\n'  \
,'l'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_block'  \
,'b-block'  \
,'\\n<blockquote>'   \
,'</blockquote>\\n'   \
,'b'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_h1'  \
,'h1'  \
,'<h1>'   \
,'</h1>\\n'  \
,'1'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_h2'  \
,'h2'  \
,'<h2>'   \
,'</h2>\\n'  \
,'2'  \
);  \
 \
edButtons[edButtons.length] =  \
new edButton('ed_h3'  \
,'h3'  \
,'<h3>'   \
,'</h3>\\n'  \
,'3'  \
); \
";

// insert edInsertLink, edAddTag, edRemoveTag, edCheckOpenTags, edCloseAllTags, edInsertTag
[edInsertLink, edAddTag, edRemoveTag, edCheckOpenTags, edCloseAllTags, edInsertTag].forEach(function(item) {
    s += item.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
});
document.body.appendChild(document.createElement('script')).innerHTML = s;
