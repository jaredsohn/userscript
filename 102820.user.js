// ==UserScript==
// @name           TestBreeding
// @namespace      Magistream
// @include        http://magistream.com/breed/*
// ==/UserScript==



function getLinks(){
   var allTabs  = document.body.getElementsByClassName('tabbysection');
    for(var i=0; i<allTabs.length; i++ ){
    tabs = allTabs[i];
    var tds =  tabs.getElementsByTagName("td");
    for(var j=0; j<tds.length; j++ ){
        var breedLink = tds[j].getElementsByTagName("a")[0];

        var pfad =  breedLink.href;
        var pos = pfad.lastIndexOf('/');
        pfad = pfad.substring(pos+1,pfad.length);
        var ids = pfad.split("-");

        var linkPfad = "http://magitools.web44.net/related.php?id1="+ids[0]+"&id2="+ids[1];

        var link = document.createElement("a");
        link.appendChild(document.createTextNode("Pedigrees"));
        link.href = linkPfad;
        link.target="_blank"

        tds[j].appendChild(document.createElement("br"));
        tds[j].appendChild(link);
    }
    }
}


getLinks();