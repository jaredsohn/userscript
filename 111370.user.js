// ==UserScript==
// @name           HC K-H2
// @namespace      test
// @description    test
// @include        http://www.icanhazchat.com/*

// @include        http://icanhazchat.com/*
// @version        1.2
// ==/UserScript==

LoadIdler();
var antiidleon = new Boolean();
var int;
var int2;
var thebutton;


function ToggleAntiIdle() {
clearInterval(int);
if (antiidleon) {
antiidleon = false;
thebutton.innerHTML = "Talk: OFF";
thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:red');
 }
else { 
antiidleon = true;
runIdler();
thebutton.innerHTML = "Talk: ON";
thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:green');
}
}

function SetIdle() {
clearInterval(int);
if (antiidleon){
clearInterval(int2);
int2 = setInterval(EndIdle, 10000);
thebutton.innerHTML = "Talk: TALK";
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
int = setInterval(ping,10000);
}


function ping() {
document.getElementById("txtMsg").value = "/msg ravage idk lol";	
document.getElementById("btn").click();
}

function LoadIdler() {
//var myElement = document.createElement('<span id="thespan" style="cursor:pointer;margin-left:10px;font-weight:bold">Talk: ON</span>');
thebutton = document.createElement('span');
document.getElementById("lblDynamicFootLink").appendChild(thebutton);
thebutton.addEventListener("click", ToggleAntiIdle,true); 
ToggleAntiIdle();
antiidleidle = false;
document.getElementById("txtMsg").addEventListener("keydown", SetIdle, true);
document.getElementById("PMlayer").addEventListener("keydown", SetIdle, true);


}