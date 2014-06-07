// ==UserScript==
// @name        youtube headline changer
// @namespace   https://www.youtube.com/*
// @include     *
// @version     1.0
// @author 		Gerry
// ==/UserScript==


var sp1 = document.createElement('span');

var text = document.getElementById('watch-headline-title').getElementsByTagName('span');

var span = text[0].getAttribute('title');

sp1.innerHTML = span;

sp1.style.fontSize = "19px";
sp1.style.fontWeight = "bold";
sp1.style.textDecoration = "none";
sp1.style.cursor = "text";
sp1.style.color = "black";

var playlist = document.getElementById("watch7-playlist-data");

if (playlist == null) {
    document.getElementById('watch7-player').style.marginTop = "20px";

    var sp2 = document.getElementById('watch7-video');

    var parentDiv = sp2.parentNode;

    parentDiv.insertBefore(sp1, sp2);
    
} else {    
    var bar = document.getElementById('watch7-playlist-data').getElementsByTagName('div');
    
    bar[0].style.marginTop = "10px";
      
    var sp2 = document.getElementById('watch7-playlist-data').firstChild;   
    
    var parentDiv = sp2.parentNode;
    
    parentDiv.insertBefore(sp1, sp2);
}

var sp = document.getElementById('watch-headline-title');

sp.parentNode.removeChild(sp);
