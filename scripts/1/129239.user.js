// ==UserScript==
// @name           event lister
// @namespace    verpeilt2007
// @include        *
// ==/UserScript==
//
// show alerts: input, click and select events
//
// Right click: shows the current element
// Left click: normal click
// TAB: shows the dom object and gives information about inputed value
 
Zaehler=0;
 
if (Zaehler == 0) {
try {
Zaehler++;
var show= "STEP "+Zaehler+": GOTO "+window.location;
alert(show);
} catch (e) {}
}
 
document.addEventListener('change', function(event) {
 
for (var i = 0; i < document.getElementsByTagName(event.target.tagName).length; i++){
 
if (document.getElementsByTagName(event.target.tagName)[i] == event.target) {
 
Zaehler++;
var show= "STEP "+Zaehler+": document.getElementsByTagName('"+event.target.tagName+"')["+i+"].value"+" = '"+event.target.value+"';";
alert(show);
document.getElementsByTagName(event.target.tagName)[i].value= event.target.value;
event.preventDefault();
}
}
}, true);
 
document.addEventListener('contextmenu', function(event) {
if (event.target.tagName == "INPUT" || event.target.tagName == "SELECT") { }
else{
for (var i = 0; i < document.getElementsByTagName(event.target.tagName).length; i++){
if (document.getElementsByTagName(event.target.tagName)[i] == event.target) {
Zaehler++;
showx= "STEP "+Zaehler+": document.getElementsByTagName('"+event.target.tagName+"')["+i+"]";
alert(showx);
event.preventDefault();
var evt = document.createEvent("MouseEvents");
evt.initMouseEvent("click", true, true, window,0, 0, 0, 0,0, false, false, false, false, 0, null);
var cb = document.getElementsByTagName(event.target.tagName)[i];
var canceled = !cb.dispatchEvent(evt);