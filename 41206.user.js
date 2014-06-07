// ==UserScript==
// @name           Javascript Anywhere!
// @namespace      http://moishyscripts.googlepages.com
// @include        *
// @description    Runs a line of Javascript on any page. Just press F12 and type in the desired Javascript that should be ran, and press OK.
// ==/UserScript==

txt="";
function disp(){
txt=prompt("Enter the desired Javascript",txt);eval(txt);}
//The following line is under construction... It will be used to allow that mac users should be able to use F10 instead of F12
if (window.navigator.userAgent.toLowerCase().match('mac')){thekey=121;}else{thekey=123;}
window.addEventListener("keydown",function(e){if(e.keyCode==thekey)
{disp();}},false);

   //Begin programing functions

//Help function
function help(){
alert("Pre-Programmed Functions:\n\n1. Change Background Color:\ncolor('red')\n\n2. Display (reveal) all embeded objects\nembed()");}

//Background color change
function color(color){document.bgColor=color;}

//Unplug all EMBED's
function embed(){
var ems = document.getElementsByTagName('embed');
var all = '<blockquote><b>'+location.href+"</b><p>";
for (i=0;i<ems.length;i++)
{all=all+'<b>'+ems[i].src+'</b><br>'+ems[i].width+'<br>'+ems[i].height+'<p>';}
document.getElementsByTagName('html')[0].innerHTML=all;}