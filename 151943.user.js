// ==UserScript==
// @name        Minimal myCourses
// @namespace   Minimal myCourses
// @description	Changes the preview pane split in myCourse from horizontal to vertical
// @include     https://mycourses2.mcgill.ca/*
// @version     1.7
// ==/UserScript==

// Vertical split
var locpath     = window.location.pathname;
var panepath    = "/d2l/lms/discussions/messageLists/frame_right.d2l";
var homepath    = "/d2l/lp/homepage/home.d2l"; 

if (locpath == panepath){
	document.body.setAttribute("rows","100%");
	document.body.setAttribute("cols","50%,50%");
}

if (typeof(d_content) != "undefined") d_content.classList.remove('d2l-max-width');

item = document.getElementsByClassName('d_nb_cGlobal');
if (item.length) item[0].style.backgroundPosition = "0% 50%";

item = document.getElementsByClassName('d_nb_cFull');
if (item.length){
    item[0].style.backgroundImage = "none";
    item[0].style.border = "0px";
}

item = document.getElementsByClassName('d2l-menuflyout-link-hover');
if (item.length) item[0].style.maxWidth = "430px";

item = document.getElementsByClassName('d2l-menuflyout-link-link');
if (item.length) item[0].style.maxWidth = "400px";

item = document.getElementsByClassName('d_nb_cMiddle');
if (item.length) item[0].style.display = "none";

item = document.getElementsByClassName('d_nb_i');
if (item.length) item[0].style.minHeight = "30px";

if (typeof(ctl_2) != "undefined") ctl_2.style.height = (window.innerHeight-72)+"px";

setInterval(function(){
    try{ D2L.PT.Auth.SessionTimeout.Renew(); } catch(e){}
}, 1000 * 60 * 5);