// ==UserScript==
// @name           Echo Downloader
// @namespace      robert.palmer
// @description    Offer direct link for downloading lectures
// @include	http://lecturecontent.georgetown.edu:8080/ess/echo/presentation/*
// ==/UserScript==
var d = document.createElement('div');
var main = document.getElementById("mainFrame");
d.style.position = "absolute";
d.style.zIndex = main.style.zIndex + 1;
d.style.opacity = 0.5;
d.style.width = "100%";
d.style.height = "50px";
d.style.left = "0px";
d.style.top = "0px";
d.style.textAlign = "center";
d.style.background = "white";

d.innerHTML = "<a href=" + document.URL + "/mediacontent.m4v" + ">Download this lecture</a>";

main.appendChild(d);

