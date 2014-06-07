// ==UserScript==
// @name           Devin's in-line expansion
// @namespace      http://manu.fun.gg/
// @description    In-line expansion
// @version        1.0
// @name          Google's logo replacer with Kaskus's logo
// @namespace     http://userscripts.org/scripts/show/92702
// @include       http://google.*/*
// @include       http://*.google.*/*
// @include       http://*.google.*/search*
// @description   Replacing Google's logo with Kaskus's logo
// @author        Devin Rhode. Code used from sempaxx and others on userscripts
// ==/UserScript==

//Start LogoCode from Kaskus
var logoku = document.createElement('img');
logoku.title = 'The Largest';
logoku.setAttribute('border', 0);
logoku.src = 'http://devsideaengine.com/devinsmodp.gif';
var elmNewContent = document.createElement('a');
elmNewContent.href = 'http://www.devsideaengine.com/devinsmod.html';
elmNewContent.appendChild(logoku);
var elmLogo = document.getElementById('logo');
elmLogo.parentNode.replaceChild(elmNewContent, elmLogo);
//End LogoCode


var s = document.getElementsByClassName("s");
//s stands for snippit, which is from the black text to the Similar and Cached links

//Start-sBackup snippit html into sBackup array
var sBackup = new Array(8);
var i = 0;
while ( i <  8 ) {
sBackup[i] = s[i].innerHTML;
i++;  
}
//End-sBackup

//All is just everything
function ALL () {

s[0].innerHTML = "playyyyy" ;



}

ALL();

