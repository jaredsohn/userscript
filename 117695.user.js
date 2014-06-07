// ==UserScript==
// @name           Go Markup for StackExchange
// @namespace      CodesInChaos:
// @description    Replaces board markup with images and displays go-stone "smilies" on go.stackexchange.com
// @include        http://go.stackexchange.com/*
// @include        http://meta.go.stackexchange.com/*
// @version        0.8
// ==/UserScript==

(function go_markup_exit_sandbox() {

var smileyUrl = "http://www.lifein19x19.com/forum/images/smilies/%name%.gif";
var goboardServerUrl = "http://www.lifein19x19.com/forum/example4.php";

function tidyBoard(text)
{
	var result = text;
	result = result.replace("<code>","");
	result = result.replace("</code>","");
	result = result.replace(/<br>/g,"\n");
	result = result.replace(/\s*(\n)+/g,"\n");
	result = result.trim();
	return result;
}

function isBoardMarkup(text)
{
	var lines = tidyBoard(text).split("\n");
	var dollarCount = 0;
	for (var lineIndex = 0; lineIndex<lines.length; lineIndex++)
	{
		var line = lines[lineIndex];
		if(line.indexOf("$$") === 0)
			dollarCount++;
		else if(line !== "")
			return false;
	}
	return dollarCount>0;
}

function encodeBoard(text)
{
	result = escape(tidyBoard(text));
	//L19 does a bit more here, so perhaps we need to add something
	return result;
}

function replaceBoard(text)
{
	var urlText = encodeBoard(text);
	//var displayText = "";//ToDo
	var result =
		"<div class=\"goboard\">" +
			"<a href=\""+goboardServerUrl+"?request=SGF&msg="+urlText+"\">" +
				"<img id=\"imgval\" alt=\"Go Diagram\" src=\""+goboardServerUrl+"?request=PNG&msg="+urlText+"\">" +
			"</a>" +
	//		"<br>" + displayText +
		"</div>";
	return result;
}

function transformAllBoards($, selector)
{
	var elements = $(selector).filter(function(index) {return isBoardMarkup(this.innerHTML)});
	elements.replaceWith(function(){return replaceBoard(this.innerHTML)});
}

function replaceSmiley(text)
{
	var result = text;
	result = result.replace(/\(([BW][\d]{0,2})\)/ig,
		function(text,name){
			return "<img src=\""+smileyUrl.replace("%name%",name.toLowerCase())+"\" alt=\""+name+"\">"
		}
	);
	return result;
}

function transformAllSmilies($,selector)
{
	$(selector).html(
		function(){
			return replaceSmiley($(this).html())
		}
	);
}

function transformAll()
{
	StackExchange.ready(function () {transformAllBoards($, ".post-text p, .post-text pre,.wmd-preview p, .wmd-preview pre")});
	StackExchange.ready(function () {transformAllSmilies($, ".post-text, .wmd-preview")});
}

function init()
{
	if($(".wmd-preview").length>0)
		setInterval(transformAll, 500);
}

//Exit sandbox stuff
//https://github.com/johan/github-improved/blob/1.9.1/unfold_commit_history.user.js#L937..L959
if ('object' === typeof opera) {
	init();
	//this.__proto__ = window; // bleed the web page's js into our execution scope
	//document.addEventListener('DOMContentLoaded', init, false); // GM-style init
}
else { // for Chrome or Firefox+Greasemonkey
	if ('undefined' == typeof __UNFOLD_IN_PAGE_SCOPE__) { // unsandbox, please!
		var src = go_markup_exit_sandbox + '',
		script = document.createElement('script');
		script.setAttribute('type', 'application/javascript');
		script.innerHTML = 'const __UNFOLD_IN_PAGE_SCOPE__ = true;\n('+ src +')();';
		document.documentElement.appendChild(script);
		document.documentElement.removeChild(script);
	} else { // unsandboxed -- here we go!
		init();
	}
}
})();