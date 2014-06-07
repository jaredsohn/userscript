// ==UserScript==
// @name          close ads
// @namespace     appi
// @description   for test porpus

// @include        *18upclub.com*
// ==/UserScript==

//And of course your code!!

function forced_close()
{
alert(1)
document.getElementById("staticbuttons").style.display="none";
document.getElementById("staticbuttons2").style.display="none";
document.getElementById("staticbuttons3").style.display="none"; 
}
var intrvl=self.setInterval(function(){forced_close()},1000);