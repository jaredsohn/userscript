// ==UserScript==
// @name        Better Minethings Server Links
// @namespace   eustache
// @author      Michael Archibald
// @include     http://*.minethings.com/*
// @include     http://*.minethings.com
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant GM_addStyle
// @version     1.2
// ==/UserScript==

var navBar = document.getElementById('nav');
var crntUrl = window.location.href;

var aLink = document.createElement('a');
aLink.href = (crntUrl.substring(0, 10) == "http://aso") ? "" : "http://www.minethings.com/miners/login/1";
aLink.innerHTML = "A";
aLink.setAttribute('id','A');

var bLink = document.createElement('a');
bLink.href = (crntUrl.substring(0, 12) == "http://bromo") ? "" : "http://www.minethings.com/miners/login/2";
bLink.innerHTML = "B";
bLink.setAttribute('id','B');

var cLink = document.createElement('a');
cLink.href = (crntUrl.substring(0, 14) == "http://calbuco") ? "" : "http://www.minethings.com/miners/login/3";
cLink.innerHTML = "C";
cLink.setAttribute('id','C');

var dLink = document.createElement('a');
dLink.href = (crntUrl.substring(0, 12) == "http://dempo") ? "" : "http://www.minethings.com/miners/login/6";
dLink.innerHTML = "D";
dLink.setAttribute('id','D');

var aLi = document.createElement('li');
var bLi = document.createElement('li');
var cLi = document.createElement('li');
var dLi = document.createElement('li');

aLi.appendChild(aLink);
bLi.appendChild(bLink);
cLi.appendChild(cLink);
dLi.appendChild(dLink);

navBar.appendChild(aLi);
navBar.appendChild(bLi);
navBar.appendChild(cLi);
navBar.appendChild(dLi);

GM_addStyle("\
	#left { width: 146px; }\
	#navlist { width: 146px; }\
	#nav { margin: 0px 0px 0px 53px; }\
	#content { margin: 0px 0px 0px 140px; }\
	#right { position:  relative; right:  80px; }\
	#A { width: 40px; outline: medium none; font-size: 0; background-repeat: no-repeat; background-image:url('http://bfc5a463a3fbe104d392-b19b1e45da6ae3c33be1579efd68eaa9.r41.cf1.rackcdn.com/a.jpg'); }\
	#B { width: 40px; outline: medium none; font-size: 0; background-repeat: no-repeat; background-image:url('http://bfc5a463a3fbe104d392-b19b1e45da6ae3c33be1579efd68eaa9.r41.cf1.rackcdn.com/b.jpg'); }\
	#C { width: 40px; outline: medium none; font-size: 0; background-repeat: no-repeat; background-image:url('http://bfc5a463a3fbe104d392-b19b1e45da6ae3c33be1579efd68eaa9.r41.cf1.rackcdn.com/c.jpg'); }\
	#D { width: 40px; outline: medium none; font-size: 0; background-repeat: no-repeat; background-image:url('http://bfc5a463a3fbe104d392-b19b1e45da6ae3c33be1579efd68eaa9.r41.cf1.rackcdn.com/d.jpg'); }\
"
);


