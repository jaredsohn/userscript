// Sacrorona LSCU Top Frame Hacker Maded by Timieh
// version 1.0
// 2006-12-17
// Copyright (c) 2006, Harry Marr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Shoutwire Top Frame Remover
// @description   Remove the annoying frame that shoutwire adds to its linked pages.
// @include       http://www.sacracorona.nl/*
// @include       http://www.sacracorona.nl/*
// ==/UserScript==

// ==UserScript==
// @name          Hotmail Iframe Hider
// @namespace     http://by103fd.bay103.hotmail.msn.com/
// @description   Hides Bars on top and right hand side
// @include       http://by*fd.bay*.hotmail.msn.com/* 
// ==/UserScript==

for (i=0; i < document.getElementsByTagName("header").length; i++) 
{
	var body = root.childNodes[1];		
	/// Maak pagina
	var html = "";
	//html += "<input type=\"button\" value=\"Code\" id=\"steal\">";
	html += "&nbsp;<input type=\"button\" value=\"Bot aan\" id=\"aan\">&nbsp;";
	html += "<input type = \"text\" value = 0 id = \"die\" size = 5>&nbsp;";
	html += "<input type = \"button\" value = \"Set\" id = \"set\">";
	html += "&nbsp;<input type=\"checkbox\" id=\"dodrugs\">Drugs";
	html += "<input type=\"checkbox\" id=\"dobooze\">Booze";
	html += "<input type=\"checkbox\" id=\"dojail\">Bust";
	html += "<input type=\"checkbox\" checked id=\"docrime\">Crime&nbsp;";
	html += "<input type=\"checkbox\" checked id=\"docar\">Car";
	html += "<input type=\"checkbox\" id=\"dobf\">Bullets";
	html += "<input checked type=\"checkbox\" id=\"docarsell\">Carsell</a>&nbsp;";
	html += "<input checked type=\"checkbox\" id=\"Train\">Train&nbsp;";

	html += "<br>";
	html += "&nbsp;<div id=\"status\"></div>";
	body.innerHTML = html;
    
}



