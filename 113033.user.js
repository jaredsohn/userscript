// ==UserScript==
// @name           Texags Forum Code Help
// @namespace      bmc13texagsforumcodehelp
// @description    Version 3.1.1
// @icon		   data:image/png;base64,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
// @include        http://www.texags.com/main/*
// @include        http://texags.com/main/*
// @include        http://*.texags.com/main/*
// @include        https://www.texags.com/main/*
// @include        https://texags.com/main/*
// @include        https://*.texags.com/main/*
// ==/UserScript==


/*      the code is largely based on GigEmAggies06 and/or Brad Lambeth's TexAgs Enchancements        */ 
/*      extensions, and much credit should be given to them                                          */
/*      https://github.com/bradlambeth/TexAgsEnhancements                                            */
/*      http://userscripts.org/scripts/show/11285                                                    */

/*********  FUNCTIONS AND VARIABLES  ***********/

function getElementsByClass(searchClass,node,tag) 
{
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

function findIcons() 
{
	var classElements = new Array();
	var node = document;
	var els = node.getElementsByTagName('img');
	var pattern = new RegExp('forum\/icon');
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].src) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var debugYesNo = true;

function debugLog(debugObject)
{
	if(debugYesNo != null)
	{
		console.log(debugObject);
	}
}

function insertAtCursor(name) 
{
	try
	{
		var textarea, openTag, closeTag;
		openTag = '['+name+']';
		closeTag = '[/'+name+']';
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
	catch(err)
	{
		console.log('forum-code-buttons: error while trying to add code to text area');
		console.log(err);
	}
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

var url = window.location.href;

var testReply = /postreply/;
var testPost = /posttopic/;
var testPM = /privatemessage.postmessage/;
var testEdit = /replyedit/;
var testTopic = /forum.topic/;
var testThread = /forum.reply/;
var testBCSTopic = /Topics/;
var testBCSThread = /Replies/;
var testForumLinks = /forum.main/;

var nameurl = "var name = 'url';";
var nameimg = "var name = 'img';";
var namequote = "var name = 'quote';";
var nameemail = "var name = 'email';";
var nameb = "var name = 'b';";
var namei = "var name = 'i';";
var imgurl = 'data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///////////yH5BAEAAAAALAAAAAAoAA8AAAJCjI+pywkPo5y0PmOzrnj73X0iFV7RAQSQqppgu0ptx8avjKc6i3qlfnJhYLDMD5Eaxoi+4uiZhEqj0+ev+mpot40CADs=';
var imgimg = 'data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJHjI+pyzkPo5y0PmOzrnj73X0iFV5YAKHDkXYIqUbqica1FMPTvPbOXCvJcpdi0dY7ZoQsJHLlYu2Io6qwOrpiP9otqAEOgwsAOw==';
var imgquote = 'data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJGjI+pyzkPo5y0PmOzrnj73X0iFULHZV6dg0jlEKQxOsMpSta4Xcf9DXsFXbLi7pebnFS9UvMl3I0y0emnagXpsqKG9/stAAA7';
var imgemail = 'data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJHjI+pyzkPo5y0PmOzrnj73X0iFV7HEEAp2p2rVaIRRqvXncWnnPYI/uIEZbbba4XU6Fy2I8sXUw1H1ChVZL16slpl4wv+FgAAOw==';
var imgb = 'data:image/gif;base64,R0lGODlhEwAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAATAA8AAAImjI+Zw+3PDJxOUmovzA1NHnVbMIIR+aCD2rGnubraOY91Ks/KvhcAOw==';
var imgi = 'data:image/gif;base64,R0lGODlhEwAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAATAA8AAAIjjI+Zw+3PDJxOUmovzJU3/2EBJpITOBznqG1s28EPqim2XQAAOw==';

var insertatcursorcode = "var textarea, openTag, closeTag;openTag = '['+name+']';closeTag = '[/'+name+']';var textareas = document.getElementsByTagName('textarea');textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos)+ openTag + textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)+ closeTag +textarea.value.substring(endPos, textarea.value.length);if (startPos == endPos) textarea.selectionStart = endPos + openTag.length;else textarea.selectionStart = endPos + openTag.length + closeTag.length;textarea.selectionEnd = textarea.selectionStart;} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;";


/************************************************************************************************************************************************************************************************/


/*******************get the logged in user's name*******************/
	var theFooter = getElementsByClass("footer2");
	//console.log(theFooter[0]);

var currentUser = null;

try
{
	currentUser = theFooter[0].childNodes[1].innerHTML.toUpperCase();
	debugLog('forum-code-buttons: the logged in user: ' + currentUser);
}
catch(err)
{
	debugLog('forum-code-buttons: no user name found');
	currentUser = null;
}
/*******************************************************************/
if(currentUser != null)
{
	debugLog('forum-code-buttons: looking for posting page');
	if (testReply.test(window.location.href) || testPost.test(window.location.href) || testEdit.test(window.location.href) || testPM.test(window.location.href))//
	{
		if(debugYesNo != null)
		{
			if (testReply.test(window.location.href))
			{
				debugLog('forum-code-buttons: found thread reply page');
			}
			else  if (testPost.test(window.location.href))
			{
				debugLog('forum-code-buttons: found post new thread page');
			}
			else if (testEdit.test(window.location.href))
			{
				debugLog('forum-code-buttons: found post edit page');
			}
			else if (testPM.test(window.location.href))
			{
				debugLog('forum-code-buttons: found send PM page');
			}
		}
	
		var allInputs;
		
		/* commenting out duplicate code from other script */
		// if (testReply.test(window.location.href)) 
		// {
			// var url = window.location.href;
			// var findTopicID = /topic_id=(\d+)/;
			// url.match(findTopicID);
			// var topicID = RegExp.$1;
			// var submitSpan = getElementsByClass("inlinewordbuttons",null,"span");
			// submitSpan[0].childNodes[0].childNodes[0].addEventListener('click', function(event) {if(null == localStorage.getItem(topicID))localStorage.setItem(topicID, 'none');}, false);
		// }
		
		debugLog('forum-code-buttons: looking for the area to put the buttons');
		var headings = getElementsByClass("formlabel", null, "td");
		var reply = /Your/;
		if(headings != null && headings.length > 0)
		{
			debugLog('forum-code-buttons: found at least one heading area');
			
			for (var i = 0; i < headings.length; i++) 
			{
				debugLog('forum-code-buttons: heading ' + i + ' ' + headings[i]);
				if (reply.test(headings[i].innerHTML)) /* checks to see if area contains "Your " because this is the area we want to add the buttons to */
				{
					debugLog('forum-code-buttons: found correct area to add buttons');
					try
					{
						headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
						headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
						var tmpimg;
						tmpimg = document.createElement('img');
						tmpimg.src = imgurl;
						tmpimg.style.backgroundColor = '#5a121e';
						tmpimg.title = 'url';
						tmpimg.setAttribute('onmouseover', "this.style.backgroundColor='#000000';");
						tmpimg.setAttribute('onmouseout', "this.style.backgroundColor='#5A121E';");
						tmpimg.setAttribute('onclick', nameurl + insertatcursorcode);
						headings[i].insertBefore( tmpimg, headings[i].lastChild.nextSibling);
						headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
						tmpimg = null;
						tmpimg = document.createElement('img');
						tmpimg.src = imgimg;
						tmpimg.style.backgroundColor = '#5a121e';
						tmpimg.style.marginTop = 2;
						tmpimg.title = 'image';
						tmpimg.setAttribute('onmouseover', "this.style.backgroundColor='#000000';");
						tmpimg.setAttribute('onmouseout', "this.style.backgroundColor='#5A121E';");
						tmpimg.setAttribute('onclick', nameimg + insertatcursorcode);
						headings[i].insertBefore( tmpimg, headings[i].lastChild.nextSibling);
						headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
						tmpimg = null;
						tmpimg = document.createElement('img');
						tmpimg.src = imgquote;
						tmpimg.style.backgroundColor = '#5a121e';
						tmpimg.style.marginTop = 2;
						tmpimg.title = 'quote';
						tmpimg.setAttribute('onmouseover', "this.style.backgroundColor='#000000';");
						tmpimg.setAttribute('onmouseout', "this.style.backgroundColor='#5A121E';");
						tmpimg.setAttribute('onclick', namequote + insertatcursorcode);
						headings[i].insertBefore( tmpimg, headings[i].lastChild.nextSibling);
						headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
						tmpimg = null;
						tmpimg = document.createElement('img');
						tmpimg.src = imgemail;
						tmpimg.style.backgroundColor = '#5a121e';
						tmpimg.style.marginTop = 2;
						tmpimg.title = 'email';
						tmpimg.setAttribute('onmouseover', "this.style.backgroundColor='#000000';");
						tmpimg.setAttribute('onmouseout', "this.style.backgroundColor='#5A121E';");
						tmpimg.setAttribute('onclick', nameemail + insertatcursorcode);
						headings[i].insertBefore( tmpimg, headings[i].lastChild.nextSibling);
						headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
						tmpimg = null;
						tmpimg = document.createElement('img');
						tmpimg.src = imgb;
						tmpimg.style.backgroundColor = '#5a121e';
						tmpimg.style.marginTop = 2;
						tmpimg.style.marginRight = 2;
						tmpimg.title = 'bold';
						tmpimg.setAttribute('onmouseover', "this.style.backgroundColor='#000000';");
						tmpimg.setAttribute('onmouseout', "this.style.backgroundColor='#5A121E';");
						tmpimg.setAttribute('onclick', nameb + insertatcursorcode);
						headings[i].insertBefore( tmpimg, headings[i].lastChild.nextSibling);
						tmpimg = null;
						tmpimg = document.createElement('img');
						tmpimg.src = imgi;
						tmpimg.style.backgroundColor = '#5a121e';
						tmpimg.style.marginTop = 2;
						tmpimg.title = 'italic';
						tmpimg.setAttribute('onmouseover', "this.style.backgroundColor='#000000';");
						tmpimg.setAttribute('onmouseout', "this.style.backgroundColor='#5A121E';");
						tmpimg.setAttribute('onclick', namei + insertatcursorcode);
						headings[i].insertBefore( tmpimg, headings[i].lastChild.nextSibling);
						tmpimg = null;
						debugLog('forum-code-buttons: buttons added');
					}
					catch(err)
					{
						debugLog(err);
					}
				}
			}
		}
		

		try
		{
			debugLog('forum-code-buttons: looking for the radio img elements');
			var emoticons = findIcons();
			var emoRadio = document.getElementsByName('MsgIcon');
			if(emoticons != null && emoRadio != null && emoRadio.length > 0 && emoticons.length > 0)
			{
				var i;
				debugLog('forum-code-buttons: found at least one emoticon');
				try
				{
					for (i = 0; i < emoticons.length; i++) 
					{		
						try
						{
							//debugLog('forum-code-buttons: ' + emoticons[i].value);
							var tempVal = emoRadio[i].value;
							if( tempVal == '1'){				emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon1.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '10'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon10.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '11'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon11.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '12'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon12.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '13'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon13.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '14'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon14.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '38'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon38.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '3'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon3.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '4'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon4.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '5'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon5.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '2'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon2.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '7'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon7.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '8'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon8.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '9'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon9.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '16'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon16.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '17'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon17.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '18'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon18.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '19'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon19.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '20'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon20.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '21'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon21.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '22'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon22.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '23'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon23.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '24'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon24.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '25'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon25.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '26'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon26.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '27'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon27.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '6'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon6.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '30'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon30.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '31'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon31.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '32'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon32.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '33'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon33.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '34'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon34.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '35'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon35.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '36'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon36.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '37'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon37.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '39'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon39.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '40'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon40.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '41'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon41.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '42'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon42.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '43'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon43.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '44'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon44.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else if(tempVal == '28'){		emoticons[i].addEventListener('click', function(event) { var textarea;var textareas = document.getElementsByTagName('textarea');if(textareas != null && textareas.length > 0){textarea = textareas[0];var scrollX = textarea.scrollLeft;var scrollY = textarea.scrollTop;if (textarea.selectionStart || textarea.selectionStart == '0') {var startPos = textarea.selectionStart;var endPos = textarea.selectionEnd;textarea.value = textarea.value.substring(0, startPos) + '[img]http://texags.com/images/forum/icon28.gif[/img]' + textarea.value.substring(startPos, textarea.value.length);} textarea.focus();textarea.scrollLeft = scrollX;textarea.scrollTop = scrollY;}}, false);}
							else{debugLog('forum-code-buttons: nothing added #' + tempVal);}
						}
						catch(err)
						{
							debugLog('forum-code-buttons: error at emoticon # ' + i);
							console.log(err);
						}
					}
				}
				catch(err)
				{
					console.log(err);
				}
			}
		}
		catch(err)
		{
			console.log(err);
		}
	
	
		// fix text area width so icons display properly
		var textareas = document.getElementsByName('body'); /* main text area is named body */
		if(textareas != null && textareas.length > 0)
		{
			var textarea = textareas[0];
			//console.log(textarea.cols);
			textarea.cols = 54;
			debugLog('forum-code-buttons: text area size corrected');
		}

	}
}

