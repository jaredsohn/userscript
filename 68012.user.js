// ==UserScript==
// @name		  Find Embeds
// @description   Find embedded files and their number on websites.
// @include	  http://*
// @exclude	   
// @version      0.1
// ==/UserScript==

function findEmbed()
{
	var embed=document.getElementsByTagName("embed");
	if (embed.length == 0) alert("Nothing Found!");
	else {
		var str = "";
		for (var x = 0; x < embed.length; x++)
		{
			str += "Embed#: " + x + "\tMovie: " + embed[x].src + "\n";
		}
		alert("List of Embeds:\n"+str);
	}}

function divAction(uh)
{
uh.addEventListener(
    "click",
    function() {
        findEmbed();
        return false;
    },
    false
);
}
var link = document.createElement("a");
	link.setAttribute("href", "#");
	link.setAttribute("style", "position:fixed; top: 100px; left: 30px; z-index: 1; font-size: 19px; background-color: red; font-color: white;");
	link.innerHTML = "Get Embeds";
	document.body.appendChild(link);
divAction(link);