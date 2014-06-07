// ==UserScript==
// @name           ICHC KARMA
// @namespace      no u
// @description    no u
// @include        http://www.icanhazchat.com/*
// @include        https://www.icanhazchat.com/*
// @include        http://icanhazchat.com/*
// @include        https://icanhazchat.com/*
// @version        3.4
// ==/UserScript==

var antiidleon = new Boolean();
var int,
    int2,
    thebutton,
    username,
    outputText,
    minTime, maxTime;
var outputArray = new Array();
var counter = 0;
LoadIdler();

outputArray[0] = 'chubbymew is gay for ripperman';
outputArray[1] = 'chubbymew likes ripperman\'s cock in her mouth';
outputArray[2] = 'chubbymew is a loser';
outputArray[3] = 'chubbymew is 10 times worse than one of the bacteria living in ripperman\'s toenail';
outputArray[4] = 'cats are cute';
outputArray[5] = 'but dogs are cuter';

function ToggleAntiIdle() {
    clearInterval(int);
    if (antiidleon) {
        antiidleon = false;
        thebutton.innerHTML = "Karma: OFF";
        thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:red');
    }
    else { 
        antiidleon = true;
        counter = 0;
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
    int = setInterval(ping, randomFromTo(parseInt(minTime.value) * 1000, parseInt(maxTime.value) * 1000));
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
    minTime = document.createElement('input');
    minTime.size = 5; minTime.value = '30';
    maxTime = document.createElement('input');
    maxTime.size = 5; maxTime.value = '50';
    username = document.createElement('input');
    username.value = 'ripperman';
    outputText = document.createElement('textarea');
    outputText.rows = 7;
    outputText.cols = 50;
    outputText.value = "chubbymew is gay for ripperman\nchubbymew likes ripperman's cock in her mouth";
    thebutton = document.createElement('span');
    document.getElementById("lblDynamicFootLink").appendChild(thebutton);
    document.getElementById("lblDynamicFootLink").appendChild(document.createElement('br'));
    document.getElementById("lblDynamicFootLink").appendChild(minTime);
    document.getElementById("lblDynamicFootLink").appendChild(maxTime);
    document.getElementById("lblDynamicFootLink").appendChild(document.createElement('br'));
    document.getElementById("lblDynamicFootLink").appendChild(username);
    document.getElementById("lblDynamicFootLink").appendChild(document.createElement('br'));
    document.getElementById("lblDynamicFootLink").appendChild(outputText);
    thebutton.addEventListener("click", ToggleAntiIdle,true); 
    ToggleAntiIdle();
    antiidleidle = false;
    document.getElementById("txtMsg").addEventListener("keydown", SetIdle, true);
    document.getElementById("tabs").addEventListener("keydown", SetIdle, true);
}