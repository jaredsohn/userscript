// ==UserScript==
// @name           emergency-mittens
// @namespace      DQN
// @description    ( ﾟ ヮﾟ)　ＭＩＴＯＮ ＧＡ ＳＵＫＩ！！！！ 
// @include        http://boards.4chan.org/*
// @include        http://wakachan.org/*
// @include        http://*.iichan.net/*
// @include        http://img.secretareaofvipquality.net/*
// @include        http://whatever.board.you.go.to.here/*
// ==/UserScript==

const d = document;

mittens = d.createElement("DIV");
d.forms[0].appendChild(mittens);

var pictureWidth = 40;
var pictureHeight = 46;
var numFlakes = 10;
var downSpeed = 0.01;
var lrFlakes = 10;
var EmergencyMittens = false;
var xcoords = new Array();
var ycoords = new Array();
var snFlkTemp;

for(var i = 0; i < numFlakes; i++ ) {
    image = d.createElement("IMG");
    image.setAttribute("id", "snFlkDiv" + i);
    image.setAttribute("style", "position: absolute;");
    image.setAttribute("src", "data:image/gif;base64,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");
    mittens.appendChild(image);
    
    xcoords[i] = (i + 1) / (numFlakes + 1);
    do {
        snFlkTemp = Math.round((numFlakes - 1 ) * Math.random());
    } while(typeof(ycoords[snFlkTemp]) == "number");
    ycoords[snFlkTemp] = i / numFlakes;
}

dispense = d.createElement("BUTTON");
dispense.setAttribute("onclick", "dispenseMittens()");
dispense.setAttribute("type", "button");
dispense.textContent = "Release Emergency Mittens";
mittens.appendChild(dispense);

unsafeWindow.mittensFall = function() {
    if(!d.getElementById("snFlkDiv0")) return;
    
    var scrWidth = d.body.clientWidth;
    var scrHeight = d.body.clientHeight;
    var scrollHeight = d.body.scrollTop;
    var scrollWidth = d.body.scrollLeft;
    
    for(var i = 0; i < numFlakes; i++) {
        if(ycoords[i] * scrHeight > scrHeight - pictureHeight) { ycoords[i] = 0; }
        var divRef = d.getElementById("snFlkDiv" + i);
        if(!divRef) return;
        if(divRef.style) divRef = divRef.style;
        divRef.top = (Math.round(ycoords[i] * scrHeight) + scrollHeight) + "px";
        divRef.left = (Math.round(((xcoords[i] * scrWidth) - (pictureWidth / 2)) + ((scrWidth / ((numFlakes + 1) * 4)) * (Math.sin(lrFlakes * ycoords[i] ) - Math.sin( 3 * lrFlakes * ycoords[i])))) + scrollWidth) + "px";
        ycoords[i] += downSpeed;
    }
}

unsafeWindow.dispenseMittens = function() {
    if(EmergencyMittens) {
        window.clearInterval(EmergencyMittens);
        EmergencyMittens = false;
    } else {
        EmergencyMittens = window.setInterval("mittensFall();", 100);
    }
}