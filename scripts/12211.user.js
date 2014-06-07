// ==UserScript==
// @name           TexAgs GM - Quick Smileys
// @namespace      Texags
// @description    Turns emoticons on post topic/reply pages into clickable links to add the image into the text of your post
// @include        http://www.texags.com/main/forum.posttopic.*
// @include        http://texags.com/main/forum.posttopic.*
// @include        http://www.texags.com/main/forum.postreply.*
// @include        http://texags.com/main/forum.postreply.*
// @include        http://www.texags.com/main/privatemessage.postmessage.*
// @include        http://texags.com/main/privatemessage.postmessage.*
// ==/UserScript==


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function insertSmiley(event) {
	event.preventDefault();
	var link, textarea, openTag, closeTag;
	link = event.currentTarget;
	forumCode = '[img]'+link.href+'[/img]';
	var textareas = document.getElementsByTagName('textarea');
	textarea = textareas[0];
	var scrollX = textarea.scrollLeft;
	var scrollY = textarea.scrollTop;
	if (textarea.selectionStart || textarea.selectionStart == '0') {
		var startPos = textarea.selectionStart;
		var endPos = textarea.selectionEnd;
		textarea.value = textarea.value.substring(0, startPos)
			+ forumCode + textarea.value.substring(endPos, textarea.value.length);
		textarea.selectionStart = startPos + forumCode.length;
		textarea.selectionEnd = textarea.selectionStart;	
	} 
	textarea.focus();
	textarea.scrollLeft = scrollX;
	textarea.scrollTop = scrollY;
}

var headings = getElementsByClass("formlabel", null, "td");
var reply = /Message Icon:/;
for (var i = 0; i < headings.length; i++) {
	if (reply.test(headings[i].innerHTML)) {
		var iconBox = headings[i].nextSibling;
		var emoticons = iconBox.getElementsByTagName('img');
		for (var j = 0; j < emoticons.length; j++) {
			var link = document.createElement('a');
			var emoticon = emoticons[j].cloneNode(true);
			link.href = emoticons[j].src;
			link.addEventListener('click', insertSmiley, false);
			link.appendChild(emoticon);
			emoticons[j].parentNode.replaceChild(link, emoticons[j]);
		}	
	}
}