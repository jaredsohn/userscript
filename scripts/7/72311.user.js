// ==UserScript==
// @name           Readable Literotica
// @namespace      trBkopD3EO
// @description    Make Literotica.com's stories easier to read by reducing eye strain
// @lastupdated    2011-06-08
// @version        1.4
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.6
// @include        http://*.literotica.com/s/*
// @include        http://literotica.com/s/*
// ==/UserScript==

/*
Version 1.4 2011-06-08
 - Minor fix
 
Version 1.3 2011-01-29
 - Page links in the footer now display correctly
 - HTML is properly stripped before being passed to <title>

Version 1.2 2011-01-28
 - Updated url includes
 - Now compatible with Literotica's new layout

Version 1.1 2010-03-25
 - Previous style is now known as "Seashell"
 - New style "Newspaper" is now the default
 - New style "Inverted"
 - Dynamic style selection

Version 1.0 2010-03-24
   Initial Release
 - Increases font size
 - Changes font style
 - Text is now 'dark grey' instead of black
 - Background is now 'seashell' instead of white
 - Margins are reduced
 - Removes all unnecessary distractions

To-do list
 - Compatibility testing; I only use Firefox so if anyone could help me out on this...
 - Adjustable margins (currently set to '10%')
 - Adjustable font size (currently set to 'large')
*/

// addGlobalStyle borrowed from diveintogreasemonkey.org - Thanks Mark
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

// strip borrowed from is.gd/4W8WY6 - thanks Shog9
function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function useStyle(style) {
	if (style == "newspaper") {
		GM_setValue("style","newspaper");
		addGlobalStyle('body { background-color:#ffffff ! important; color:#000000 ! important; font-family:"Times New Roman",Times ! important; }');
	} else if (style == "seashell") {
		GM_setValue("style","seashell");
		addGlobalStyle('body { background-color:#edebe8 ! important; color:#2c2d32 ! important; font-family:sans-serif,verdana,arial ! important; }');
	} else if (style == "inverted") {
		GM_setValue("style","inverted");
		addGlobalStyle('body { background-color:#191919 ! important; color:#dfdfdf ! important; font-family:sans-serif,verdana,arial ! important; }');
	} else {
		useStyle("newspaper");
	}
}

var titleFind = document.getElementsByClassName('b-story-header')[0];
var title = titleFind.getElementsByTagName('h1')[0].innerHTML;
var author = document.getElementsByClassName('b-story-user-y')[0].innerHTML;
var content = document.getElementsByTagName('p')[0].innerHTML;
var textareas = document.getElementsByClassName('b-pager-pages')[0];
if (textareas != null) {
	var rmCaption = document.getElementsByClassName('b-pager-caption')[0];
	if (rmCaption) {rmCaption.parentNode.removeChild(rmCaption);}
	var rmForm = document.getElementsByTagName('form')[0];
	if (rmForm) {rmForm.parentNode.removeChild(rmForm);}
	var pageNav = document.getElementsByClassName('b-pager-pages')[0].innerHTML;
} else {
	pageNav = " ";
}

// Remove header, then re-populate it
// This will strip all CSS and make things easier
var rmHead = document.getElementsByTagName('head')[0];
if (rmHead) {rmHead.parentNode.removeChild(rmHead);}
var bodyTag = document.getElementsByTagName('body')[0];
var altHead = document.createElement("head");
altHead.innerHTML = '<title>'+title+' by '+strip(author)+'</title>'+
'<style type="text/css">'+
'h1,#author,#footer {text-align:center;}'+
'#selectstyle {padding:0px; text-align:right; font-size:x-small;}'+
'#content {padding:0% 10% 0% 10%; text-align:justify; font-size:large;}'+
'a,a:hover {color:#c00; text-decoration:none;}'+
'a {border-bottom:none;}'+
'a:hover {border-bottom:1px dotted;}'+
'#footer {letter-spacing:5px;}'+
'</style>';
bodyTag.parentNode.insertBefore(altHead,bodyTag.nextSibling);

// What style should we use?
if (GM_getValue("style") == null) {
	useStyle("newspaper");
} else {
	useStyle(GM_getValue("style"));
}

// Remove the body, then re-populate it
var rmBody = document.getElementsByTagName('body')[0];
if (rmBody) {rmBody.parentNode.removeChild(rmBody);}
var headTag = document.getElementsByTagName('head')[0];
var altBody = document.createElement("body");
altBody.innerHTML = '<p id="selectstyle">[<a href="#" id="useNewspaper">Newspaper</a>] [<a href="#" id="useSeashell">Seashell</a>] [<a href="#" id="useInverted">Inverted</a>]</p>'+
'<h1>'+title+'</h1><p id="author">by '+author+'<br/><br/></p>'+
'<p id="content">'+content+'</p>'+
'<p id="footer"><br/>'+pageNav+'</p>';
headTag.parentNode.insertBefore(altBody,headTag.nextSibling);

// Catch user selection
var useNewspaper = document.getElementById('useNewspaper');
var useSeashell = document.getElementById('useSeashell');
var useInverted = document.getElementById('useInverted');
useNewspaper.addEventListener("click", function() { useStyle("newspaper"); }, false);
useSeashell.addEventListener("click", function() { useStyle("seashell"); }, false);
useInverted.addEventListener("click", function() { useStyle("inverted"); }, false);
