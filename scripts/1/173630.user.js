// ==UserScript==
// @name       Hackforums Quick Image and Scale
// @namespace  http://www.hackforums.net/member.php?action=profile&uid=140915
// @version    1.0
// @description  This is an addon that helps you rasize images on hackforums or any other forum that has IMG tags. Without this user http://hackforums.net/showthread.php?tid=3629778 and his post this would not be possible as I have forgotten about it.
// @match *://*.hackforums.net/showthread.php*
// Copyright 2013 Macronus
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// ==/UserScript==

 
regex = /here.*?>/;
revised = "here.<br /><input style='width: 113px; height: 22px; float: right; margin-top:100px;' id='button1' type='button' value='Insert image(%)' /><input style='width: 133px; height: 22px; float: right; margin-top:100px;' id='button2' type='button' value='Insert image(Spoiler)' /></div>";
document.getElementById('quickreply_e').innerHTML= document.getElementById('quickreply_e').innerHTML.replace(regex,revised);
addButtonListener();
addButtonListener2();
 
function addButtonListener(){
  var button = document.getElementById("button1");
  button.addEventListener('click',percent,true);
}

function addButtonListener2(){
  var button = document.getElementById("button2");
  button.addEventListener('click',spoiler,true);
}
 
function percent(){
	var x;
    var img = new Image();
    var imglink=prompt("Please enter the Image link:","");
    var imgper=prompt("How much do you want to scale it down by percent(%)","");
    if ( imgper == null){
     imgper = 50;   
    }
    if ( imgper == 0){
     imgper = 50;   
    }
    if ( imgper == ""){
     imgper = 50;   
    }
    img.src = imglink;
    var imgw = img.width;
    var imgh = img.height; 
    imgper = 100 - imgper;
    var widths = imgw * imgper / 100;
    var heights = imgh * imgper / 100;
    var test = "[img=" + widths  + "x" + heights  + "]" + imglink + "[/img]";
    document.getElementById("message").value += test;
    addButtonListener();
}

function spoiler(){
	var x;
    var img = new Image();
    var imglink=prompt("Please enter the Image link:","");
    var test = "[spoiler][img]" + imglink + "[/img][/spoiler]";
    document.getElementById("message").value += test;
    addButtonListener2();
}
