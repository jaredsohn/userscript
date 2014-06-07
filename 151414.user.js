// ==UserScript==
// @name         	Post copier
// @description		Includes options for copying posts
// @version	 		1.1
// @include			http*://*.bungie.net*createpost.aspx*
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @author	  		dazarobbo
// @copyright		2012, dazarobbo
// @license 		(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
"use strict";

String.prototype.HTMLEncode = function(){
	return this.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;");
}

function _RegexLoop(s, regex, repl){
	while(regex.test(s)) s = s.replace(regex, repl);
	return s;
}

function RemoveTimestamp(html){
	html = html.replace(/\<br><br><span.*?title=".*?".*?>(.*?)<\/span>$/i, "");
	html = html.replace(/\<br><br>\[Edited on (\d{2}\.\d{2}\.\d{4} \d{1,2}:\d{2} [AP]M [A-Z]{3})(?: by (.+?))?\]$/, "");
	return html;
}

function BBCodeToHTML(text){
	text = text.HTMLEncode();
	text = _RegexLoop(text, /\[b\]((\s|\S)*?)\[\/b\]/i, '<b>$1</b>');
	text = _RegexLoop(text, /\[i\]((\s|\S)*?)\[\/i\]/i, '<i>$1</i>');
	text = _RegexLoop(text, /\[u\]((\s|\S)*?)\[\/u\]/i, '<u>$1</u>');
	text = _RegexLoop(text, /\[quote\]((\s|\S)*?)\[\/quote\]/i, '<span style="background-color:#161617; border:1px inset #414547; display:block; margin-bottom:5px; margin-top:5px; padding:2px 2px 2px 4px;">$1</span>');
	text = _RegexLoop(text, /\[url\]((?:http:\/\/|\/)(\s|\S)*?)\[\/url\]/i, '<a href="$1">$1</a>');
	text = _RegexLoop(text, /\[url=(http:\/\/(?:\s|\S)*?|\/(?:\s|\S)*?)\]((?:\s|\S)*?)\[\/url\]/i, '<a href="$1">$2</a>');
	text = _RegexLoop(text, /\[img\]((\s|\S)*?)\[\/img\]/i, '<img src="$1"/>');
	text = text.replace(/\r?\n/g, "<br/>");
	return text;
}

function HTMLToBBCode(html){

	html = _RegexLoop(html, /<b>((\s|\S)*?)<\/b>/, '[b]$1[/b]');
	html = _RegexLoop(html, /<i>((\s|\S)*?)<\/i>/, '[i]$1[/i]');
	html = _RegexLoop(html, /<u>((\s|\S)*?)<\/u>/, '[u]$1[/u]');
	html = _RegexLoop(html, /<a.*?href="((?:\s|\S)*?)".*?>((?:\s|\S)*?)<\/a>/, function(match, href, text, offset, str){
		if(href == text){
			return "[url]" + href + "[/url]";
		}
		else{
			return "[url=" + href + "]" + text + "[/url]";
		}
	});
	html = _RegexLoop(html, /<img.*?src="((?:\s|\S)*?)".*?(?: \/)?>/, '[img]$1[/img]');
	html = _RegexLoop(html, /<span.*?class="IBBquotedtable">((?:\s|\S)*?)<\/span>/, '[quote]$1[/quote]');
	html = _RegexLoop(html, /<br\/?>/, "\n");

	return html;
	
}

function HTMLToText(node){
	var str = "";
	if(node.nodeType == 3){
		str += node.nodeValue;
	}
	else if(node.nodeType == 1){
		if(node.nodeName == "BR"){
			str += "\n";
		}
		else{
			for(var i=0,l=node.childNodes.length; i<l; ++i){
				str += HTMLToText(node.childNodes[i]);
			}
		}
	}
	return str;
}



var menuItems = [];

menuItems.push({
	Text: "Copy post text",
	SelectionAction: false,
	Handler: function(){
		menu.hide();
		var elem = document.createElement("div");
		elem.innerHTML = RemoveTimestamp(post.html());
		GM_setClipboard("[quote][b]Posted by:[/b] " + $("#ctl00_mainContent_postForm_skin_originalPost_skin_usernameLink").text() + "\n" + HTMLToText(elem) + "[/quote]", "text");
	}
});

menuItems.push({
	Text: "Copy post BBCode",
	SelectionAction: false,
	Handler: function(){
		menu.hide();
		var text = "[quote][b]Posted by:[/b] " + $("#ctl00_mainContent_postForm_skin_originalPost_skin_usernameLink").text() + "\n";
		text += HTMLToBBCode(RemoveTimestamp(post.html())) + "[/quote]";
		GM_setClipboard(text, "text");
	}
});

menuItems.push({
	Text: "Copy selected text",
	SelectionAction: true,
	Handler: function(){
		menu.hide();
		var sel = window.getSelection();
		GM_setClipboard("[quote][b]Posted by:[/b] " + $("#ctl00_mainContent_postForm_skin_originalPost_skin_usernameLink").text() + "\n" + sel.toString() + "[/quote]", "text");
	}
});

menuItems.push({
	Text: "Smart BBCode copy",
	SelectionAction: true,
	Handler: function(){

		menu.hide();
		var bbcode;
		var range = window.getSelection().getRangeAt(0);
		
		if(range.commonAncestorContainer.nodeType == 3){
			switch(range.commonAncestorContainer.parentNode.nodeName){
				case "U": bbcode = "[u]" + HTMLToBBCode(RemoveTimestamp(range.commonAncestorContainer.parentNode.innerHTML)) + "[/u]";
				break;
				
				case "I": bbcode = "[i]" + HTMLToBBCode(RemoveTimestamp(range.commonAncestorContainer.parentNode.innerHTML)) + "[/i]";
				break;
				
				case "B": bbcode = "[b]" + HTMLToBBCode(RemoveTimestamp(range.commonAncestorContainer.parentNode.innerHTML)) + "[/b]";
				break;
				
				default:
				alert("No handling for " + range.commonAncestorContainer.parentNode.nodeName);
			}
		}
		else{
			var container = document.createElement("div");
			container.appendChild(range.cloneContents());
			bbcode = HTMLToBBCode(RemoveTimestamp(container.innerHTML));
		}

		GM_setClipboard("[quote][b]Posted by:[/b] " + $("#ctl00_mainContent_postForm_skin_originalPost_skin_usernameLink").text() + "\n" + bbcode + "[/quote]", "text");
		
	}
});


var post = $("#ctl00_mainContent_postForm_skin_originalPost_skin_PostBlock");
var menu = $("<ul></ul>")
	.css({
		width:"200px",
		margin:"0",
		padding:"3px",
		backgroundColor:"#D4D9DE",
		position:"fixed",
		listStyleType:"none",
		boxShadow:"2px 2px 2px #8593A1"
	})
	.hide()
	.appendTo(document.body);
	
var tempElem;
for(var i=0,l=menuItems.length; i<l; ++i){

	tempElem = $("<li></li>")
		.css({
			cursor:"pointer",
			padding:"5px",
			color:"#000",
			paddingLeft:"25px",
		})
		.mousedown(menuItems[i].Handler)
		.hover(function(){
			$(this).css("backgroundColor", "rgba(161,215,251,0.7)");
		},
		function(){
			$(this).css("backgroundColor", "inherit");
		})
		.text(menuItems[i].Text)
		.data("SelectionAction", menuItems[i].SelectionAction);
	
	$(menu).append(tempElem);
	
}
	
post.on("contextmenu", function(e){

	if(e.target.nodeName == "A" || e.target.nodeName == "IMG") return;

	if(window.getSelection().rangeCount > 0 && !window.getSelection().getRangeAt(0).collapsed){
		$(menu).find("li").show();
	}
	else{
		$(menu).find("li").filter(function(){ return $(this).data("SelectionAction"); }).hide();
	}

	$(menu).css({
		"top":e.pageY - $(window).scrollTop(),
		"left":e.pageX
	})
	.show();

	$(document.body).bind("click", function(e){
		if($(e.target) != menu){
			menu.hide();
			$(this).unbind("click");
		}
	});

	e.preventDefault();
	return false;
});

