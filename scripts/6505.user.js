// ==UserScript==
// @name           Track AR links
// @description    Display track AR links on a release page
// @include        http://musicbrainz.org/release/*
// @include        http://musicbrainz.org/album/*
// @include        http://musicbrainz.org/show/release/*
// ==/UserScript==

/*
    Written by Jonathan Snook, http://www.snook.ca/jonathan
    Add-ons by Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

var relbox = getElementsByClassName(document, "div", "RelationshipBox")[0];
var links = relbox.getElementsByTagName("a");
var entity = undefined;
for (var i in links) {
    if (links[i].href) {
        if (links[i].href.match(/http:\/\/musicbrainz.org\/edit\/relationship\/add.html/)) {
            entity = links[i].href.match(/link1=([a-z]+=[0-9]+)/)[1];
        }
    }
}

var tracks = getElementsByClassName(document, "tr", "track");
for (var i in tracks) {
    var links = getElementsByClassName(tracks[i], "td", "links")[0];
    var trackid = links.getElementsByTagName("a")[0].href.match(/trackid=(\d+)/)[1];
    var link = document.createElement("span");
    link.innerHTML = '<a href="/show/track/?trackid=' + trackid + '&addrel=1">Use in rel.</a> | ';
    if (entity) {
        var url = "http://musicbrainz.org/edit/relationship/add.html?link0=";
        if (entity.split("=")[0] < "track")
            url += entity + "&link1=track=" + trackid;
        else
            url += "track=" + trackid + "&link1=" + entity;
        link.innerHTML += '<a href="' + url +'">Create rel.</a> | ';
    }
    links.insertBefore(link, links.firstChild);
}
