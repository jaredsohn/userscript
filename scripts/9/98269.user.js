// ==UserScript== 
// @name kacper testscript
// @description cut what i want 
// @include http://www.empik.com/* 
// ==/UserScript==


var string = "This was written by <p id=\"auth\">John Doe</p> today!";

var div = document.createElement("div");

div.innerHTML = string; // get the browser to parse the html

var children = div.getElementsByTagName("*");

for (var i = 0; i < children.length; i++)
{
    if (children[i].class == "contentPacketText")
    {
        alert(children[i].textContent);
    }
}