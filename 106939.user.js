// ==UserScript==
// @name          ICHC Social Cleanser
// @description	  Kicks undesirables
// @include       http://icanhazchat.com/*
// @include       http://www.icanhazchat.com/*
// @version       0.1
// ==/UserScript==

LoadKicker();
 var button;
 var arrpos = 0;
var timer;
var myname = "";
var amimod = false;

function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 
 
 function LoadKicker(){
button = document.createElement('span');
button.setAttribute('style', 'cursor:pointer;margin-left:10px;text-decoration:underline;font-weight:bold;color:black');
button.innerHTML = "Kick Undesirables";
document.getElementById("lblDynamicFootLink").appendChild(button);
button.addEventListener("click", RunKicker,true); 
myname = document.getElementById('hdnUserName').value;
}

function RunKicker(){
myname = document.getElementById('hdnUserName').value;
clearInterval(timer);
document.getElementById("txtMsg").value = "ping";
document.getElementById("btn").click();
pausecomp(1000);
document.getElementById("txtMsg").value = "/me prepares to perform social cleansing. Locating undesirables..." ;
document.getElementById("btn").click();
refresh();
setTimeout(Run2,2000);
}

function Run2(){
amimod = count(myname) == 2;
if (amimod ==false) {
document.getElementById("txtMsg").value = "/me dun goofed.";
document.getElementById("btn").click();
}
else{


// UNDESIRABLES BEGIN

document.getElementById("txtMsg").value = "/roomban an0nym0u5 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban anon0987 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban anon1811 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban anotherrobbie 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban argin_arpus 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban bearmode 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban buckifan 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban commisarfrank 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban csd 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban defaultuser 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban desired 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban doberman75 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban folet 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban gumle 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban ioiwut 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban lolwuttt 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban mr_bryce 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban partyboy08 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban pepillos 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban porklol 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban priatefree 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban randyk 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban ryan11 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban showem2me 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban spiderbig2011 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban thricetwice 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban tossedsalad 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

document.getElementById("txtMsg").value = "/roomban wearinoneshoe 24 Get 'outta here scallywag! (perma-ban)";
document.getElementById("btn").click();

// UNDESIRABLES END

}
pausecomp(1200);
document.getElementById("txtMsg").value = "/me is guilty of dicktard genocide.";
document.getElementById("btn").click();
}

var white = "lithium"
function refresh() {
document.getElementById("activeUserList").innerHTML="";
location.assign( "javascript:updateMembers(true);void(0)" );
}