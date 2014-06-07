// ==UserScript==
 
// @name          ICHC Kicker
 
// @description   Kicks idle users
 
// @include       http*://icanhazchat.com/*
 
// @include       http*://www.icanhazchat.com/*
 
// @version       69
 
// ==/UserScript==
 
 
//fappyhour remix
 
 
LoadKicker();
 
 var button;
 
 var arrpos = 0;
 
var timer;
 
var array;
 
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
 
button.setAttribute('style', 'cursor:pointer;margin-left:10px;text-decoration:underline;font-weight:bold;color: #006388');
 
button.innerHTML = "<br><hr>kick the faggots silently";
 
document.getElementById("lblDynamicFootLink").appendChild(button);
 
button.addEventListener("click", RunKicker,true);
 
myname = document.getElementById('hdnUserName').value;
 
}
 
 
 
function RunKicker(){
 
myname = document.getElementById('hdnUserName').value;
 
clearInterval(timer);
 
document.getElementById("txtMsg").value = "ping";
 
document.getElementById("btn").click();
 
pausecomp(1000); //fuck 1200
 
refresh();
 
setTimeout(Run2,2000);
 
}
 
 
 
function Run2(){
 
array = document.getElementById("activeUserList").getElementsByTagName('a');
 
amimod = count(myname) == 2;
 
array = document.getElementById("activeUserList").getElementsByTagName('strike');
 
if (amimod ==false) {
 
document.getElementById("txtMsg").value = "/modme ";
 
document.getElementById("btn").click();
 
}
 
else{
 
if (array.length > 0) {
 
//document.getElementById("txtMsg").value = "/me looks and finds " + array.length + " chronic masturbators." ;
 
//document.getElementById("btn").click();
 
timer = setInterval(KickNext , 1200);
 
}
 
else
 
{
 
document.getElementById("txtMsg").value = "";
 
document.getElementById("btn").click();
 
}
 
}
 
}
 
 
 
function count(name) {
 
var c=0;
 
for (var i = 0;i<array.length; i++) {
 
if (array[i].innerHTML == name) { c++;}
 
}
 
return c;
 
}
 
 
 
 function match(name) {
 
var c = false;
 
for (var i = 0;i<array.length; i++) {
 
if (whitelist[i] == name) { c=true;}
 
}
 
return c;
 
}
 
 
 
var whitelist = new Array();
 
 
 
function KickNext() {
 
try {
 
if (match(array[arrpos].innerHTML)) { arrpos++; return;}
 
if (array[arrpos].innerHTML==white) { arrpos++; return;}
 
if (array[arrpos].parentNode.parentNode.tagName == "B" ) {
 
if (count(array[arrpos].innerHTML) == 2) {
 
//document.getElementById("txtMsg").value = "/me didn't kick " + array[arrpos].innerHTML + "... I would if I could!";
 
//document.getElementById("btn").click();
 
whitelist.push(array[arrpos].innerHTML);
 
}
 
else
 
{
 
//document.getElementById("txtMsg").value = "/me didn't kick " + array[arrpos].innerHTML + "... " + array[arrpos].innerHTML + " he pays to lurk, look at his <3";
 
//document.getElementById("btn").click();
 
}
 
}
 
else if (array[arrpos].innerHTML == myname ) {
 
//document.getElementById("txtMsg").value = "/me is a bad ass. " + myname + " is getting his dick sucked.";
 
//document.getElementById("btn").click();
 
}
 
else{
 
document.getElementById("txtMsg").value = "/silentkick " + array[arrpos].innerHTML + "";       
 
document.getElementById("btn").click();
 
}
 
}
 
catch (err){
 
//alert(err + " " + arrpos + " " + array.length);
 
}
 
 
 
arrpos++;
 
if ( arrpos >= array.length ) { clearInterval(timer); arrpos = 0; whitelist = new Array(); array=new Array();
 
 refresh();
 
pausecomp(1200);
 
//document.getElementById("txtMsg").value = "obvious, troll is obvious";
 
//document.getElementById("btn").click();
 
}
 
 
 
}
 
var white = "lithium"
 
function refresh() {
 
document.getElementById("activeUserList").innerHTML="";
 
location.assign( "javascript:updateMembers(true);void(0)" );
 
}