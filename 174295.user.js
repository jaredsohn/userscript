// ==UserScript==
// @name          Multireddit Slideshow
// @namespace     http://userscripts.org/users/436166/scripts
// @description   Adds a tab to view the subreddits in the current multireddit as a slideshow
// @match       http://*.reddit.com/me/*
// @match       https://*.reddit.com/me/*
// @version       1.0001
// ==/UserScript==

var a = document.querySelector(".subreddits").querySelectorAll("li a")
var b = "http://redditp.com/r/"
for(i=0;i<a.length;i++){ 
	var c = a[i].innerHTML.replace("/r/", "")
	if(i != (a.length - 1)){
		b += c + "+"
	}else {
		b += c
	}
}
var c = document.createElement("a")
	c.innerText = "View Slideshow (" + a.length + ")"
	c.setAttribute("href", b)
	c.setAttribute("target", "_blank")
var d = document.createElement("li")
	d.setAttribute("style", "position: absolute; height: 14px;")
	d.appendChild(c)
var e = document.getElementsByClassName("tabmenu")[0]
	e.appendChild(d)