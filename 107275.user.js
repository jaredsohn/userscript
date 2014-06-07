// ==UserScript==
// @name           ICHC Anti-Idle
// @namespace      no u
// @description    no u
// @include        http://www.icanhazchat.com/*

// @include        http://icanhazchat.com/*
// @version        3.3
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
thebutton.innerHTML = "Anti Idle: OFF";
thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:red');
 }
else { 
antiidleon = true;
runIdler();
thebutton.innerHTML = "Anti Idle: ON";
thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:green');
}
}

function SetIdle() {
clearInterval(int);
if (antiidleon){
clearInterval(int2);
int2 = setInterval(EndIdle, 5000);
thebutton.innerHTML = "Anti Idle: IDLE";
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
int = setInterval(ping,150000);
}


function ping() {
document.getElementById("txtMsg").value = "/cam refuse khrome";	
document.getElementById("btn").click();
}

function LoadIdler() {
//var myElement = document.createElement('<span id="thespan" style="cursor:pointer;margin-left:10px;font-weight:bold">Anti Idle: ON</span>');
thebutton = document.createElement('span');
document.getElementById("lblDynamicFootLink").appendChild(thebutton);
thebutton.addEventListener("click", ToggleAntiIdle,true); 
ToggleAntiIdle();
antiidleidle = false;
document.getElementById("txtMsg").addEventListener("keydown", SetIdle, true);
document.getElementById("PMlayer").addEventListener("keydown", SetIdle, true);


}