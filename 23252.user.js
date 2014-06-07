// ==UserScript==
// @name           HeiseEvenMorePure
// @namespace      de.mput.heise
// @description    remove every non-content on heise
// @include        http://www.heise.de/*
// ==/UserScript==


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

removeID("h4", "breadcrumb")
removeID("ul", "navigation")
removeID("div", "logo_bereich")
removeID("div", "navi_top")
removeID("div", "bannerzone")
removeID("div", "mitte_rechts")
removeID("div", "aus")
removeID("div", "sitemap")

change_width("container", "100%", "95%")
change_width("container_content", "100%", "95%")
change_width("mitte", "100%", "95%")
change_width("mitte_links", "100%", "95%")

change_top("container_content", "0")

change_background_by_id("mitte", "url()")

document.body.bgColor = "#141414"
document.body.Color = "#BBBBBB"
document.body.text = "#BBBBBB"
document.body.vLink = "#9999FF"
document.body.link = "#6666FF"

