// ==UserScript==
// @name           Toggle Google SideBar
// @namespace      http://jacky.seezone.net/ToggleGoogleSideBar
// @description    Toggle Google SideBar
// @include        http://www.google.com*/search*
// ==/UserScript==

var expandText = "[+]", 
	collapseText = "[-]",
	nav = document.getElementById("leftnav"),
	center = document.getElementById("center_col"),
	a = document.createElement("a");

function expand(){
	var expanded = a.innerHTML == collapseText;
	nav.style.display = expanded? "none":"block";
	a.innerHTML = expanded? expandText:collapseText;
	center.style.marginLeft = expanded? "0":"159px";
	return false;
}

console.log('init link');
a.innerHTML = collapseText;
a.href = "#";
a.style.display = "block";
a.style.position = "absolute";
a.style.top = "-20px";
a.style.left = "3px";
a.style.fontFamily = "Courier New";
a.style.textDecoration = "none";
a.addEventListener('click', expand, false);
nav.parentNode.insertBefore(a, nav);
expand();



