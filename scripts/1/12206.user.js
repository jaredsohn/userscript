// ==UserScript==
// @name           TexAgs GM - Forum Code Buttons
// @namespace      Texags
// @description    Adds buttons next to post textarea to quickly add forum code tags
// @include        http://www.texags.com/main/forum.posttopic.*
// @include        http://www.texags.com/main/forum.postreply.*
// @include        http://www.texags.com/main/forum.replyedit.*
// @include        http://www.texags.com/main/privatemessage.postmessage.*
// @include        http://texags.com/main/forum.posttopic.*
// @include        http://texags.com/main/forum.postreply.*
// @include        http://texags.com/main/forum.replyedit.*
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

function insertAtCursor(event) {
	event.preventDefault();
	var link, textarea, openTag, closeTag;
	link = event.currentTarget;
	openTag = '['+link.title+']';
	closeTag = '[/'+link.title+']';
	var textareas = document.getElementsByTagName('textarea');
	textarea = textareas[0];
	var scrollX = textarea.scrollLeft;
	var scrollY = textarea.scrollTop;
	if (textarea.selectionStart || textarea.selectionStart == '0') {
		var startPos = textarea.selectionStart;
		var endPos = textarea.selectionEnd;
		textarea.value = textarea.value.substring(0, startPos)
			+ openTag + textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)
			+ closeTag +textarea.value.substring(endPos, textarea.value.length);
		if (startPos == endPos) textarea.selectionStart = endPos + openTag.length;
		else textarea.selectionStart = endPos + openTag.length + closeTag.length;
		textarea.selectionEnd = textarea.selectionStart;	
	} 
	textarea.focus();
	textarea.scrollLeft = scrollX;
	textarea.scrollTop = scrollY;
}

function postButton(imageSource,title,func) {
	var image, button;
	image = document.createElement('img');
	image.src =  imageSource;
	image.style.backgroundColor = '#5a121e';
	image.style.marginTop = 2;
	image.style.marginLeft = 2;
	image.addEventListener('mouseover', function (event) {this.style.backgroundColor = '#000000';}, false);
	image.addEventListener('mouseout', function (event) {this.style.backgroundColor = '#5a121e';}, false);
	button = document.createElement('a');
	button.title = title;
	button.href = title;
	button.addEventListener('click', func, false);
	button.appendChild(image);
	return button;
}

var headings = getElementsByClass("formlabel", null, "td");
var reply = /Your Reply:/;
for (var i = 0; i < headings.length; i++) {
	if (reply.test(headings[i].innerHTML)) {
		var textareas = document.getElementsByTagName('textarea');
		var textarea = textareas[0];
		headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///////////yH5BAEAAAAALAAAAAAoAA8AAAJCjI+pywkPo5y0PmOzrnj73X0iFV7RAQSQqppgu0ptx8avjKc6i3qlfnJhYLDMD5Eaxoi+4uiZhEqj0+ev+mpot40CADs=', 'url', insertAtCursor), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJHjI+pyzkPo5y0PmOzrnj73X0iFV5YAKHDkXYIqUbqica1FMPTvPbOXCvJcpdi0dY7ZoQsJHLlYu2Io6qwOrpiP9otqAEOgwsAOw==', 'img', insertAtCursor), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJGjI+pyzkPo5y0PmOzrnj73X0iFULHZV6dg0jlEKQxOsMpSta4Xcf9DXsFXbLi7pebnFS9UvMl3I0y0emnagXpsqKG9/stAAA7', 'quote', insertAtCursor), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJHjI+pyzkPo5y0PmOzrnj73X0iFV7HEEAp2p2rVaIRRqvXncWnnPYI/uIEZbbba4XU6Fy2I8sXUw1H1ChVZL16slpl4wv+FgAAOw==', 'email', insertAtCursor), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhEwAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAATAA8AAAImjI+Zw+3PDJxOUmovzA1NHnVbMIIR+aCD2rGnubraOY91Ks/KvhcAOw==', 'b', insertAtCursor), headings[i].lastChild.nextSibling);
		headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhEwAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAATAA8AAAIjjI+Zw+3PDJxOUmovzJU3/2EBJpITOBznqG1s28EPqim2XQAAOw==', 'i', insertAtCursor), headings[i].lastChild.nextSibling);
	}
}
