// ==UserScript==
// @name           Slim Heise Newsticker
// @description    removes most of the annoying ad, sidebar content and unbolds the news headlines
// @namespace	   http://www.heise.de/
// @include        http://www.heise.de/*
// @version		   1.0
// ==/UserScript==
// This script is based on:
// • http://userscripts.org/scripts/show/31889 (by André Goerres)
// • http://userscripts.org/scripts/show/23252 (by kriss23)
// By Jens Kohl (jens.kohl+greasemonky AT gmail DOT com)


function leaveClass(className) {
    ellist = document.getElementsByTagName("div");
    
    for (var i = 0; i < ellist.length; i++) {
	    if (ellist[i].className != className) {
            ellist[i].parentNode.removeChild(ellist[i])
	    }
    }
}

function removeClass(tagName, className) {
    ellist = document.getElementsByTagName(tagName);
    
    for (var i = 0; i < ellist.length; i++) {
	    if (ellist[i].className == className) {
            ellist[i].parentNode.removeChild(ellist[i])
	    }
    }
}

function removeID(tagName, className) {
    ellist = document.getElementsByTagName(tagName);
    
    for (var i = 0; i < ellist.length; i++) {
	    if (ellist[i].id == className) {
            ellist[i].parentNode.removeChild(ellist[i])
	    }
    }
}


function change_width(id, width, min) {
    var el = document.getElementById(id);
	if (el) {
        el.style.width = width;
    	el.style.minWidth = min;
    }
}


function change_top(id, pos) {
    var el = document.getElementById(id);
	if (el) {
    	el.style.top = pos;
    }
}


function change_background_by_id(id, new_background) {
    var el = document.getElementById(id);
	if (el) {
        el.style.background = new_background
    }
}


removeClass("div", "adbottom")
removeClass("div", "bcadv ISI_IGNORE")
removeClass("div", "adbottom_itmarkt")
removeClass("div", "col100preisvergleich")
removeClass("div", "col100preisvergleich")
removeClass("div", "online-markt")
removeClass("div", "col100weiss")
removeClass("div", "col100aktion")
removeClass("div", "col50")
removeClass("div", "col50")

removeID("div", "navi_top")
removeID("div", "sitemap")
removeID("ul", "navi_bottom")

/**
removeID("h4", "breadcrumb")
removeID("ul", "navigation")
removeID("div", "logo_bereich")
removeID("div", "navi_top")
removeID("div", "mitte_rechts")
removeID("div", "aus")
removeID("div", "sitemap")
**/
removeID("div", "bannerzone")
change_top("container_content", "15px")

/**
change_width("container", "100%", "95%")
change_width("container_content", "100%", "95%")
change_width("mitte", "100%", "95%")
change_width("mitte_links", "100%", "95%")



change_background_by_id("mitte", "url()")
**/

document.body.bgColor = "#141414"
document.body.Color = "#BBBBBB"
document.body.text = "#BBBBBB"
document.body.vLink = "#9999FF"
document.body.link = "#6666FF"

var head = document.getElementsByTagName('head')[0];
if (head) { 
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.tage a { font-weight: normal; } .tage div { text-indent: -8px; padding-left: 8px; }';
  head.appendChild(style);
}

