// ==UserScript==
// @name       Better PTS for Cook/Douglass
// @namespace  
// @version    0.13.6
// @description  Made by abburn and ajs433. So simply, very good....
// @include https://sc-apps.rutgers.edu/pts/*
// @match https://sc-apps.rutgers.edu/pts/*
// @copyright  2014+, Andrew Blackburn and Andrew Scheurich
// @downloadURL http://userscripts.org/scripts/source/443954.user.js
// @updateURL http://userscripts.org/scripts/source/443954.user.js
// ==/UserScript== 
// MORE TOPPINGS!

// Keep this function, it works!
// function clickme(var1) {window.open(var1)};

// Okay, button version 1 isn't working, trying another version
// myButton = document.createElement("input"); 
// myButton.type = "button";
// myButton.value = "my button";
// placeHolder = document.getElementsByClassName("nav")[0];
// placeHolder.appendChild(myButton);
// myButton.onclick = clickme("http://www.google.com");

// Code borrowed from http://stackoverflow.com/questions/6480082/add-a-javascript-button-using-greasemonkey
// var zNode       = document.createElement ('div');
// zNode.innerHTML = '<button id="myButton" type="button" onClick="clickme("http://www.google.com")">Click me!</button>';
// zNode.setAttribute ('id', 'myContainer');
// Removing original append, adding our own which worked
// document.body.appendChild (zNode);
// placeHolder = document.getElementsByClassName("nav")[0];
// placeHolder.appendChild(zNode);


//--- Activate the newly added button.
//document.getElementById("myButton").addEventListener("click",clickme("http://www.google.com", false);

// SCREW IT ALL! This is a block comment
/*

// From here down is the function that makes more buttons
var zNode       = document.createElement ('div');
zNode.innerHTML = "<script>
function makebutton () {
var zNode2       = document.createElement ('div');
zNode2.innerHTML = '<button id="myButton" type="button" onClick="makebutton()">Click me!</button>';
zNode2.setAttribute ('id', 'myContainer2');
placeHolder = document.getElementsByClassName("nav")[0];
placeHolder.appendChild(zNode2);
};</script>";
zNode.setAttribute ('id', 'myContainer');
placeHolder = document.getElementsByClassName("nav")[0];
placeHolder.appendChild(zNode);


// This part creates GENESIS BUTTON!
var zNode2       = document.createElement ('div');
zNode2.innerHTML = '<button id="myButton" type="button" onClick="makebutton()">Click me!</button>';
zNode2.setAttribute ('id', 'myContainer2');
placeHolder = document.getElementsByClassName("nav")[0];
placeHolder.appendChild(zNode2);

*/
// End Block Comment

// Trial 3 starts here
var zNode       = document.createElement ('div');
zNode.innerHTML = "<script>function clickme(var1) {window.location(var1)};</script><button id=\"myButton\" type=\"button\" onClick=\"window.location='http://www.google.com';\">Click me!</button>";
zNode.setAttribute ('id', 'myContainer');
placeHolder = document.getElementsByClassName("nav")[0];
placeHolder.appendChild(zNode);