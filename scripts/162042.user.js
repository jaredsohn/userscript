// ==UserScript==
// @name          Ikariam Pirate
// @namespace     http://www.userscripts.org/Ikariam Pirate
// @description   AutoPirate for ikariam
// @version       1.0
// ==/UserScript==

function click_townView(){
var townView=document.evaluate("//a[@title='Inspect the selected town']", document.body, null, 9, null).singleNodeValue;   
if ( townView ){ delay = getRandomInt (1000, 2000); townView.click(); }
} //eof

function click_pirateFort(){
var pirateFort=document.evaluate("//a[contains(@title,'Pirate Fortress')]", document.body, null, 9, null).singleNodeValue;   
if ( pirateFort ){ pirateFort.click(); }
else{ delay = getRandomInt (1000, 2000); click_townView(); }
} //eof

/* click_captureSmuglersBtn() is the function that keep clicking "Capture" button
   every 2.5 minutes.
   But if we are thrown out of the pirate fort, we need to get back into Town View,
   and then into the Pirate Fort, so we have click_townView() and click_pirateFort() too
*/

function click_captureSmuglersBtn(){
var captureSmuglersBtn=document.evaluate("//a[contains(@class,'button capture')]", document.body, null, 9, null).singleNodeValue;   
if ( captureSmuglersBtn  ){ captureSmuglersBtn.click();
//setTimeout( clickBtn, 1500 );  // go to next city
window.clearInterval(int1);
setTimeout( myPause, 151000 ); // pause for 2.5 minutes and 1 sec
}
else{ delay = getRandomInt (1000, 2000); click_pirateFort(); }
} //eof

var delay = getRandomInt (1000, 3000);

function myPause(){  int1=setInterval( click_captureSmuglersBtn, delay); }

var int1=setInterval( click_captureSmuglersBtn, delay);

//************  calculate random delays  **************
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}