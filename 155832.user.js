// ==UserScript==
// @name        TouchNavigationJs
// @namespace   here
// @include     http://*
// @include     https://*
// @version     0.2
// @grant       none
// ==/UserScript==

document.body.addEventListener("mousedown", mouseDown);
document.body.addEventListener("mousemove", mouseMove)
document.body.addEventListener("mouseup", mouseUp)
var y0=0;
var t1=0;
var y1=0;
var t2=0;
var speed=0;
var time=0;
var mousedown = false;
var id=false;

function mouseDown(event)
{
clearInterval(id)
mousedown = true;
y0=event.clientY;
speed = 0;
time =0;
t0=new Date();
}

function mouseMove(event){
if(mousedown){
y1=event.clientY;
t1=new Date();
speed=-(y1-y0);
time=t1-t0
move_page();
y0=y1;
t0=t1
}
}

function mouseUp(event)
{
mousedown = false;
if (speed > 1 || speed < -1)
id = setInterval(move_page, time);
}

function move_page(){

if (speed < 0.1 && speed > -0.1)
clearInterval(id);
window.scrollBy(0,speed=speed/1.1);
}