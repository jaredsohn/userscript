// ==UserScript==
// @name Boy/Girl?
// @namespace yayhooray.com
// @description Adds a gender indicator next to YH usernames for Safari and FF 3.5 users.
// @include http://*yayhooray.com/thread/*
// ==/UserScript==

// Written by Sea for Pifman, Aug 29th 2009

var Boygirl = {};

Boygirl.add_dot = function(element) {
var gender, canvas;
var paint_dot = function(canvas, gender){
var context = canvas.getContext('2d');
if (gender === 'boy') {
context.fillStyle = "rgb(100,178,252)";
} else if (gender === 'girl') {
context.fillStyle = "rgb(245,135,198)";
} else {
context.fillStyle = "rgb(223,223,223)";
}
context.arc(10,6,3,0,Math.PI*2,true);
context.fill();
};
var toggle_gender = function(){
if (window.localStorage.getItem(this.previousSibling.innerHTML) === 'boy') {
window.localStorage.setItem(this.previousSibling.innerHTML, "girl");
paint_dot(this, 'girl');
} else if (window.localStorage.getItem(this.previousSibling.innerHTML) === 'girl') {
window.localStorage.removeItem(this.previousSibling.innerHTML);
paint_dot(this, 'nil');
} else {
window.localStorage.setItem(this.previousSibling.innerHTML, "boy");
paint_dot(this, 'boy');
}
};

gender = window.localStorage.getItem(element.firstChild.innerHTML);
canvas = document.createElement('canvas');
canvas.setAttribute('height','10'); canvas.setAttribute('width','15');
paint_dot(canvas,gender);
canvas.addEventListener("click", toggle_gender, false);
element.appendChild(canvas);
};

Boygirl.people = document.getElementsByClassName("postusername");
for ( i = 0; i < Boygirl.people.length; i += 1 ) {
Boygirl.add_dot(Boygirl.people[i]);
}