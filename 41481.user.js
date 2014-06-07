// Created by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// transform latex equation between '$$' in LaTeX pics by using http://www.codecogs.com/gif.latex?
// This script works thanks the excellent site: http://www.forkosh.com

// Jan-30-2009: Undo added by Mathman (http://lifeandmath.blogspot.com/)
// mimeTeX server forkosh.com has closed its hosting to the public. As of this
// editing time, codecogs.com has been generous enough to offer this service.
// We blogger-ers without private mimeTeX servers are in debt to you, codecogs.

// ==UserScript==
// @name           LaTeX for Blogger
// @namespace      http://wolverinex02.blogspot.com
// @description    You can use LaTeX in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


	
function setlatex(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = emoticonButton("Latex", "http://wolverinex02.googlepages.com/latex.gif");
    buttons += separator();
    buttons += emoticonButton2("Unlatex", "http://www.codecogs.com/gif.latex?Un%5CLaTeX");
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}

//rich_body[0].innerHTML+= \"<img src=\\\"http://www.codecogs.com/gif.latex?\"+latex_eq+\"\\\" border=0 align=middle>\";

function emoticonButton(name, url) {
	return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function latex_compilator() { var rich_edit = document.getElementById(\"richeditorframe\"); var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\"); var contenu = rich_body[0].innerHTML; while(contenu.indexOf(\"$$\")!=-1) { var debut = contenu.indexOf(\"$$\"); contenu = contenu.substring(0,debut) + contenu.substring(debut+2,contenu.length); var fin = contenu.indexOf(\"$$\"); contenu = contenu.substring(0,fin) + contenu.substring(fin+2,contenu.length); var latex_eq = contenu.substring(debut,fin); rich_body[0].innerHTML = contenu.substring(0,debut);rich_body[0].innerHTML+=\"<img src=\\\"http://www.codecogs.com/gif.latex?\"+latex_eq+\"\\\" border=0 align=middle />\";  rich_body[0].innerHTML+= contenu.substring(fin,contenu.length); contenu = rich_body[0].innerHTML; } })();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function emoticonButton2(name, url) {
	return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function latex_decompilator() { var rich_edit = document.getElementById(\"richeditorframe\"); var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\"); var contentu = rich_body[0].innerHTML; var beginurl = \"&lt;img src=\\\"http://www.codecogs.com/gif.latex?\"; var endurl = \"\\\" align=\\\"middle\\\"\"; var bi; while((bi = contentu.indexOf(beginurl))!=-1) { var debut = contentu.indexOf(endurl); contentu = contentu.replace(contentu.substring(bi,debut+endurl.length+\" border=\\\"0\\\" /&gt;\".length-2), \"$$$$\" + unescape(contentu.substring(bi+beginurl.length,debut)) + \"$$$$\"); } rich_body[0].innerHTML= contentu; })();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setlatex("formatbar");

}, false);