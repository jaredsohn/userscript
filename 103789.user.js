// ==UserScript==
// @name           Calamity
// @namespace      no u
// @description    no u
// @include        http://www.icanhazchat.com/*

// @include        http://icanhazchat.com/*
// @version        0.1
// ==/UserScript==

LoadIdler();
var Calamityon = new Boolean();
var int;
var int2;
var thebutton;


function ToggleCalamity() {
clearInterval(int);
if (Calamityon) {
Calamityon = false;
thebutton.innerHTML = "Calamity: OFF";
thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:red');
 }
else { 
Calamityon = true;
runIdler();
thebutton.innerHTML = "Calamity: ON";
thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:green');
}
}

function SetIdle() {
clearInterval(int);
if (Calamityon){
clearInterval(int2);
int2 = setInterval(EndIdle, 1000);
thebutton.innerHTML = "Calamity: IDLE";
thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;text-decoration:underline;color:gray');
}
}

function EndIdle() {
clearInterval(int2);
if (Calamityon) {
Calamityon = false;
ToggleCalamity();
}
else{
Calamityon = true;
ToggleCalamity();
}
}

function runIdler() {
int = setInterval(ping,1000);
}


function ping() {
document.getElementById("txtMsg").value = "fuck you";	
document.getElementById("btn").click();
}

function LoadIdler() {
//var myElement = document.createElement('<span id="thespan" style="cursor:pointer;margin-left:10px;font-weight:bold">Calamity: ON</span>');
thebutton = document.createElement('span');
document.getElementById("lblDynamicFootLink").appendChild(thebutton);
thebutton.addEventListener("click", ToggleCalamity,true); 
ToggleCalamity();
Calamityidle = false;
document.getElementById("txtMsg").addEventListener("keydown", SetIdle, true);
document.getElementById("PMlayer").addEventListener("keydown", SetIdle, true);


}
