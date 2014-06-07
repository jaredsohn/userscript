// ==UserScript==
// @name        ReUntil
// @namespace   http://userscripts.org/users/670122
// @description Refresh until the conditional created for UNAPEC matriculation process
// @include     https://web.unapec.edu.do/uvirtual_unapec/Matricula.aspx
// @version     1
// @grant       none
// ==/UserScript==

//Here go the sound file
alert = new Audio("https://dl.dropboxusercontent.com/s/7fqaxr0mmnokw3g/button-2.mp3");

//Looking of the needed text. Recommendation: Use your name or your Student Number
var string =  document.documentElement.innerHTML.indexOf('Text What You Want to find');

//conditional to say if the we found the text or not
var checker = "-1";

//The conditionals
if(string == checker)
{
    //Reload Function
    setTimeout(function(){
    window.location.reload(1);
    }, 5000);    
    
}
else
 {
    //Sound Player
     alert.play();
 }