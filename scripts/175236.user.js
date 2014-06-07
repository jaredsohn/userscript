// ==UserScript==
// @name          Andrey totah
// @namespace     http://www.userscripts.org/a2324
// @description   OKOKOKOK
// @version       1.7
// ==/UserScript==




/* click_captureSmuglersBtn() is the function that keep clicking "Capture" button
   every 2.5 minutes.
   But if we are thrown out of the pirate fort, we need to get back into Town View,
   and then into the Pirate Fort, so we have click_townView() and click_pirateFortress() too
*/

function click_captureSmuglersBtn(){
var captureSmuglersBtn=document.evaluate("//a[contains(@class,'button capture')]", document.body, null, 9, null).singleNodeValue;   
if ( captureSmuglersBtn  ){ captureSmuglersBtn.click();
//setTimeout( clickBtn, 1500 );  // go to next city
window.clearInterval(int1);
setTimeout( myPause, 151000 ); // pause for 2.5 minutes and 1 sec
}
else{ 2000 ; click_pirateFortress(); }
} //eof

var delay = 2000;

function myPause(){  int1=setInterval( click_captureSmuglersBtn, 2000); }

var int1=setInterval( click_captureSmuglersBtn, 2000 );


}