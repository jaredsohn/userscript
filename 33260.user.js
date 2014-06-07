// ==UserScript==
// @name           FOK!Forum - Topictitels bugfix (dark layout)
// @namespace      http://fotoboek.fok.nl/mcDavid
// @description    Verhelpt de bug in de fokforum_dark-layout dat de topictitel niet boven het topic staat als deze in een subcategorie gepost is.
// @include        http://forum.fok.nl/topic/*
// ==/UserScript==

var y=document.title.indexOf("/",6);
var tt=document.title.slice(y);
var tn=document.getElementsByName("topic")[0].value;
var sid=document.getElementsByName("sid")[0].value;
var titel="<span class=\"topictitle\">"+tt+"</span>";
var print= " <a href=\"rde/printtopic/"+tn+"\"><img src=\"http://i.fok.nl/templates/fokforum_light/i/printer.gif\" class=\"nob\" alt=\"\" title=\"Print dit topic.\" /></a>";
var report= " <a href=\"rde/report_topic/"+tn+"\"><img src=\"http://i.fok.nl/templates/fokforum_light/i/mod.gif\" class=\"nob\" alt=\"\" title=\"Plaats een topicreport\" /></a>";
var bookmark=" <form onsubmit=\"return add_bookmark(this)\" name=\"bookmark\" action=\"rde/add_bookmark\" method=\"post\"><input type=\"hidden\" name=\"topic\" value=\""+tn+"\" /><input type=\"hidden\" name=\"titel\" value=\""+tt+"\" /><input type=\"image\" style=\"border: 0px;\" src=\"http://i.fok.nl/templates/fokforum_light/i/bookmark.gif\" title=\"Voeg dit topic toe aan mijn bookmarks\" accesskey=\"b\" /><div style=\"display:none;\"><input type=\"hidden\" name=\"sid\" value=\""+sid+"\" /></div></form>";

if (document.getElementsByClassName("nav")[0].innerHTML.indexOf(sid) == -1 ) {
	document.getElementsByClassName("nav")[0].innerHTML+=titel;
	document.getElementsByClassName("nav")[0].innerHTML+=print;
	document.getElementsByClassName("nav")[0].innerHTML+=report;
	document.getElementsByClassName("nav")[0].innerHTML+=bookmark;
}