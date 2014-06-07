// ==UserScript==
// @name           ICHC KARMA Wa
// @namespace      no u
// @description    no u
// @include        http://www.icanhazchat.com/*
// @include        https://www.icanhazchat.com/*
// @include        http://icanhazchat.com/*
// @include        https://icanhazchat.com/*
// @version        3.4
// ==/UserScript==

LoadIdler();
var antiidleon = new Boolean();
var int,
    int2,
    thebutton,
    username,
    outputText;
var outputArray = new Array();
var counter = 0;

outputArray[0] = 'http://i.imgur.com/g2dFf.jpg';
outputArray[1] = 'http://i.imgur.com/1EtH2.jpg';
outputArray[2] = 'http://i.imgur.com/27VIp.jpg';
outputArray[3] = 'http://i.imgur.com/j8QXj.jpg';
outputArray[4] = 'http://i.imgur.com/yjXje.jpg';
outputArray[5] = 'http://i.imgur.com/WDRkK.jpg :P';

function ToggleAntiIdle() {
    clearInterval(int);
    if (antiidleon) {
        antiidleon = false;
        thebutton.innerHTML = "Karma: OFF";
        thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:red');
    }
    else { 
        antiidleon = true;
        runIdler();
        thebutton.innerHTML = "Karma: ON";
        thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:green');
    }
}


function SetIdle() {
    clearInterval(int);
    if (antiidleon){
        clearInterval(int2);
        int2 = setInterval(EndIdle, 1000);
        thebutton.innerHTML = "Karma: IDLE";
        thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;text-decoration:underline;color:gray');
    }
}

function EndIdle() {
    clearInterval(int2);
    if (antiidleon) {
        antiidleon = false;
        ToggleAntiIdle();
    }
    else{
        antiidleon = true;
        ToggleAntiIdle();
    }
}

function runIdler() {
    int = setInterval(ping, randomFromTo(10000, 30000));
}

function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function getOutputArray() {
    var myText = outputText.value.replace(/\s+$/g,"")
    var myArr = myText.split("\n")
    return myArr;
}

function ping() { 
    outputArray = getOutputArray();
    if (username.value.replace(/^\s+|\s+$/g,""))
        document.getElementById("txtMsg").value = "/msg " + username.value.replace(/^\s+|\s+$/g,"") + " " + outputArray[counter];
    else
        document.getElementById("txtMsg").value = outputArray[counter];
    counter++;
    if (counter > outputArray.length - 1) counter = 0;
    document.getElementById("btn").click();
}

function LoadIdler() {
    //var myElement = document.createElement('<span id="thespan" style="cursor:pointer;margin-left:10px;font-weight:bold">Karma: ON</span>');
    username = document.createElement('input');
    username.value = 'ripperman';
    outputText = document.createElement('textarea');
    outputText.rows = 7;
    outputText.cols = 50;
    outputText.value = "http://i.imgur.com/g2dFf.jpg\n
http://i.imgur.com/1EtH2.jpg\n
http://i.imgur.com/27VIp.jpg\n
http://i.imgur.com/j8QXj.jpg\n
http://i.imgur.com/yjXje.jpg\n
http://i.imgur.com/WDRkK.jpg :P,";
    thebutton = document.createElement('span');
    document.getElementById("lblDynamicFootLink").appendChild(thebutton);
    document.getElementById("lblDynamicFootLink").appendChild(username);
    document.getElementById("lblDynamicFootLink").appendChild(outputText);
    thebutton.addEventListener("click", ToggleAntiIdle,true); 
    ToggleAntiIdle();
    antiidleidle = false;
    document.getElementById("txtMsg").addEventListener("keydown", SetIdle, true);
    document.getElementById("tabs").addEventListener("keydown", SetIdle, true);
}
