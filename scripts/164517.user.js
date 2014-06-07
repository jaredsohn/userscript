// ==UserScript==
// @name           e-Sim BB Code
// @description    e-Sim BB Code to Shout
// @version        0.2
// @include        http://*.e-sim.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require        http://dl.dropbox.com/u/67548179/esim-bbcode/functionbbcode.js
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// ==/UserScript==

$(document).ready(function() {
	$("#command textarea").attr("id", "esimbbcode");
	edToolbar("esimbbcode");
	$("head").append("<link href=\"http://dl.dropbox.com/u/67548179/esim-bbcode/styles.css\" rel=\"stylesheet\" type=\"text/css\">");
	loadjscssfile("http://dl.dropbox.com/u/67548179/esim-bbcode/functionsbbcode.js", "js") //dynamically load and add this .js file
	//$("head").append("<script href=\"http://dl.dropbox.com/u/67548179/esim-bbcode/functionbbcode.js\" type=\"text/javascript\"></script>");
	
});

var textarea;
var content;


function edToolbar(obj) {

	$("#esimbbcode").before("<div style=\"padding-top:10px; \" class=\"toolbar\"><img class=\"button_bb\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/bold.gif\" name=\"btnBold\" title=\"Bold\" onclick=\"doAddTags('[b]','[/b]','" + obj + "')\"><img class=\"button_bb\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/italic.gif\" name=\"btnItalic\" title=\"Italic\" onclick=\"doAddTags('[i]','[/i]','" + obj + "')\"><img class=\"button_bb\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/underline.gif\" name=\"btnUnderline\" title=\"Underline\" onclick=\"doAddTags('[u]','[/u]','" + obj + "')\"><img class=\"button_bb\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/link.gif\" name=\"btnLink\" title=\"Insert URL Link\" onclick=\"doURL('" + obj + "')\"><img class=\"button_bb\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/center.png\" name=\"btncenter\" title=\"Center\" onclick=\"doAddTags('[center]','[/center]','" + obj + "')\">");
				}


/*function edToolbar(obj) {
    document.write("<div class=\"toolbar\">");
	document.write("<img class=\"button\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/bold.gif\" name=\"btnBold\" title=\"Bold\" onClick=\"doAddTags('[b]','[/b]','" + obj + "')\">");
    document.write("<img class=\"button\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/italic.gif\" name=\"btnItalic\" title=\"Italic\" onClick=\"doAddTags('[i]','[/i]','" + obj + "')\">");
	document.write("<img class=\"button\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/underline.gif\" name=\"btnUnderline\" title=\"Underline\" onClick=\"doAddTags('[u]','[/u]','" + obj + "')\">");
	document.write("<img class=\"button\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/link.gif\" name=\"btnLink\" title=\"Insert URL Link\" onClick=\"doURL('" + obj + "')\">");
	document.write("<img class=\"button\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/picture.gif\" name=\"btnPicture\" title=\"Insert Image\" onClick=\"doImage('" + obj + "')\">");
	document.write("<img class=\"button\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/ordered.gif\" name=\"btnList\" title=\"Ordered List\" onClick=\"doList('[LIST=1]','[/LIST]','" + obj + "')\">");
	document.write("<img class=\"button\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/unordered.gif\" name=\"btnList\" title=\"Unordered List\" onClick=\"doList('[LIST]','[/LIST]','" + obj + "')\">");
	document.write("<img class=\"button\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/quote.gif\" name=\"btnQuote\" title=\"Quote\" onClick=\"doAddTags('[quote]','[/quote]','" + obj + "')\">"); 
  	document.write("<img class=\"button\" src=\"http://dl.dropbox.com/u/67548179/esim-bbcode/images/code.gif\" name=\"btnCode\" title=\"Code\" onClick=\"doAddTags('[code]','[/code]','" + obj + "')\">");
    document.write("</div>");
	//document.write("<textarea id=\""+ obj +"\" name = \"" + obj + "\" cols=\"" + width + "\" rows=\"" + height + "\"></textarea>");
				}*/

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

