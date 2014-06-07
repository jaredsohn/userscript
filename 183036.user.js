// ==UserScript==
// @name        Unicreatures Accomplishment Checker
// @namespace   http://trueidiocy.us
// @description Marks off completed accomplishments
// @include     http://unicreatures.com/accomplishments.php
// @include     http://www.unicreatures.com/accomplishments.php
// @include     http://unicreatures.com/accomplishments.php?
// @include     http://www.unicreatures.com/accomplishments.php?
// @version     1
// @copyright	© krazykat1980
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var mytable = document.getElementById('right').getElementsByTagName('table')[4];
var links=mytable.getElementsByTagName('a');
var i;
var linksToOpen     = [];
var mywin2          = null;





var zNode       = document.createElement ('div');


zNode.innerHTML = '<div style="text-align: center;"><button id="checkButton" type="button">'
                + 'Check Accomplishments</button>'
                ;


if (GM_getValue("done") == 1){ 
zNode.innerHTML = '<div style="text-align: center;"><button id="checkButton" type="button">'
                + 'It&apos;s done!</button>'
                ;

GM_setValue("done",0)

}

zNode.setAttribute ('id', 'myCheckButton');
var j=0
var b=0
var showit=[]

mytable.parentNode.insertBefore(zNode, mytable);



function checkAccomplishments (zEvent) {



for(i=0;i < links.length;i++) {
  if (links[i].href.indexOf('family') > -1) {

showit[b]=links[i]
b++

    linksToOpen.push (links[i].href);

 //   links[i].innerHTML="*";

}
}


openLinksInSequence ();
};


function openLinksInSequence () {


    if (mywin2) {
        mywin2.close ();
        mywin2      = null;
showit[j].innerHTML="*";
j++

if (linksToOpen.length==0){
GM_setValue("done",1)
window.location=window.location

}
    }

    if (linksToOpen.length) {
        var link    = linksToOpen.shift ();
        mywin2      = window.open (link, "my_win2");




        mywin2.addEventListener ('load', openLinksInSequence, false);
    }

}

var checkButton = document.getElementById("checkButton");
checkButton.addEventListener ("click", checkAccomplishments, true);