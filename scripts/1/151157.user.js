// ==UserScript==
// @name        Squadron Count
// @namespace   pardus.at
// @description Notifies of an absence of squadrons.
// @author      Wes R (Artemis)
// @include     http://*.pardus.at/hire_squadrons.php
// @version     3
// ==/UserScript==


var imgCount = document.getElementsByTagName("img");

//these can be changed to match an image location of your choosing
var fighterSrc = "file:///c:/pardus/images/squadrons/fighter_squad_1.png";
var fighterStatic = "http://static.pardus.at/img/std/squadrons/fighter_squad_1.png";
var bomberSrc = "file:///c:/pardus/images/squadrons/bomber_squad_1.png";
var bomberStatic = "http://static.pardus.at/img/std/squadrons/bomber_squad_1.png";

var x = 5; //we want to start looking at this spot in the imgCount
var fighterCount = 0;
var bomberCount = 0;

while(x<imgCount.length){

   if(imgCount[x].src == fighterSrc || imgCount[x].src == fighterStatic){
	  ++fighterCount;
   }
   else if(imgCount[x].src == bomberSrc || imgCount[x].src == bomberStatic){
	  ++bomberCount;
   }
   //next squad is 3 images away
   x += 3;
}

var outputText = fighterCount + bomberCount;

var printLabel = document.createElement("h5");
printLabel.innerHTML = 'Starbase has ' + (fighterCount + bomberCount) + ' squadrons.<BR>' + fighterCount + ' Fighter Squads.<BR>' + bomberCount + ' Bomber Squads.';
printLabel.style.color = 'yellow';

var printLocation = document.getElementsByTagName("h3");

printLocation[0].appendChild(printLabel);