// ==UserScript==
// @name           Healer
// @namespace      FCE
// @description    Heals
// @exclude        http://facebook.com
// ==/UserScript==

window.onload = setTimeout(heal, 1000);

function heal(){

var divs = document.body.getElementsByTagName("div");
var i;
var count =0;
var scint;
var scinte;
for (i=0; i < divs.length; i++) 
{

var classn = divs[i].className;

if (classn == 'healer-box-name-txt3')
{
if (divs[i+1].innerHTML == "")
{

var sc = divs[i+2].innerHTML;

if (sc)
{

sc = sc.split(">");

scint = sc[1].split("<");
scinte = scint[0].split(' ').join('');

if (scinte)
{

simulateClick(divs[i]);

}


}





}
}
}

//reload();
setTimeout(heal, 500);


}




function simulateClick(button) {
var evt = document.createEvent("MouseEvents");
evt.initMouseEvent("click", true, true, window,
0, 0, 0, 0, 0, false, false, false, false, 0, null);
var cb = button; 
var canceled = !cb.dispatchEvent(evt);
if(canceled) {
// A handler called preventDefault
alert("canceled");
}

}