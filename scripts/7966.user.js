// Created by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// transform latex equation between '$$' in LaTeX pics by using http://www.forkosh.dreamhost.com/mimetex.cgi?
// This script works thanks the excellent site: http://www.forkosh.com

// TODO
// modify the script to undo the transformation

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

    editbar.innerHTML += buttons;
  }
}

//rich_body[0].innerHTML+= \"<img src=\\\"http://www.forkosh.com/mimetex.cgi?\"+latex_eq+\"\\\" border=0 align=middle>\";

function emoticonButton(name, url) {
	return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function latex_compilator() { var rich_edit = document.getElementById(\"richeditorframe\"); var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\"); var contenu = rich_body[0].innerHTML; while(contenu.indexOf(\"$$\")!=-1) { var debut = contenu.indexOf(\"$$\"); contenu = contenu.substring(0,debut) + contenu.substring(debut+2,contenu.length); var fin = contenu.indexOf(\"$$\"); contenu = contenu.substring(0,fin) + contenu.substring(fin+2,contenu.length); var latex_eq = contenu.substring(debut,fin); rich_body[0].innerHTML = contenu.substring(0,debut);rich_body[0].innerHTML+=\"<img src=\\\"http://www.forkosh.dreamhost.com/mimetex.cgi?\"+latex_eq+\"\\\" border=0 align=middle />\";  rich_body[0].innerHTML+= contenu.substring(fin,contenu.length); contenu = rich_body[0].innerHTML; } })();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

// function latexcompilator() {
// 	var rich_edit = document.getElementById('richeditorframe');
// 	var rich_body = rich_edit.contentDocument.getElementsByTagName('body');
// 	while (rich_body[0].innerHTML.indexOf('$$')!=-1) {
// 		var debut = rich_body[0].innerHTML.indexOf('$$');
// 		var tail = rich_body[0].substring(debut+2,rich_body[0].length);
// 		rich_body[0] = rich_body[0].substring(0,debut-1);
// 		
// 		var fin = rich_body[0].innerHTML.indexOf('$$');
// 		var tail = rich_body[0].substring(fin+2,rich_body[0].length);
// 		rich_body[0] = rich_body[0].substring(0,fin-1)+tail;
// 		
// 		var latex_eq = rich_body[0].substring(debut,fin);
// 		rich_body[0] = rich_body[0].substring(0,debut) + \"<img class='latex_math' src='http://www.forkosh.com/mimetex.cgi?\" + latex_eq + \"' alt='' align='middle' border='0' />\" + tail;
// 	}
// }

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setlatex("formatbar");

}, false);