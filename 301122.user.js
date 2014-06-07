// ==UserScript==
// @name       LDS Music XML
// @version    0.1
// @description  Shows link to download the Music in XML for MuseScore
// @match      http://www.lds.org/music/library/*

// ==/UserScript==
var xmlLoc = location.href.replace('?','/xml.xml?');
var first = $("ul.tools li:first"),
    xmlLink = first.clone(),
    a = xmlLink.find("a.share"),
    title = $("#details h1").text().trim();
xmlLink.find("ul").remove();
a.text("Music XML");
a.attr("href",xmlLoc);
a.attr("download",title + ".xml");
a.attr("class","download");

xmlLink.insertAfter(first);