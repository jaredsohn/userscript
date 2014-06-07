// ==UserScript==
// @name           KARMAKARMAKARMA
// @namespace      KARMA
// @description    KARMA
// @include        http://www.icanhazchat.com/*

// @include        http://icanhazchat.com/*
// @version        9002
// ==/UserScript==

var nick;
GetUser();
LoadIdler();
var antiidleon = new Boolean();
var int;
var int2;
var thebutton;

function GetUser(){
nick = document.getElementById("hdnUserName").value;
}


function ToggleAntiIdle() {
clearInterval(int);
if (antiidleon) {
antiidleon = false;
thebutton.innerHTML = "Can Haz Karma? NO";
thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:red');
 }
else { 
antiidleon = true;
runIdler();
thebutton.innerHTML = "Can Haz Karma? YES";
thebutton.setAttribute('style', 'cursor:pointer;margin-left:10px;font-weight:bold;text-decoration:underline;color:green');
}
}

function SetIdle() {
clearInterval(int);
if (antiidleon){
clearInterval(int2);
int2 = setInterval(EndIdle, 10000);
thebutton.innerHTML = "Karma? KARMA";
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
int = setInterval(karma,50000);
}


function karma() {
document.getElementById("txtMsg").value = "/msg" + " " + nick + " " + "karma get" ;
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
document.getElementById("tabs").addEventListener("keydown", SetIdle, true);


}