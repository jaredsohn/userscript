// ==UserScript==
// @name			Google Sidebar Toggler
// @author			Anthony Myre
// @namespace		http://tonyfox.ws/
// @description		Allows you to toggle the Google Search Sidebar
// @version			1.0
// @include			http://*google.com/search*
// ==/UserScript==

autoHide = true;	// Hide the sidebar by default?

ia = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABESURBVChTYzh7/3/HCgIIqIYBqAg/uPvyX0z7LXR1goJnIAiumabq4NZhMlDspbY6uO/o6V+gj/AjUHwA4w5I4UdANQCK32lJLoaMIQAAAABJRU5ErkJggg==";
ib = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABQSURBVChTYzx7///ukwz4gas5A0PHiv/4wd2X/2LabzERMAomTW11LBCDhYTO4nLAmRtGQClq2zuQ4XLv1X88CBIOjMD47V9xG3+sFEaoAgCJdXIeJ8dy7QAAAABJRU5ErkJggg==";

function showOpt()
{
	document.getElementById("leftnav").style.display = "block";
	document.getElementById("sidebar2").style.left = "0px";
	document.getElementById("hideopt").style.display = "inline";
	document.getElementById("showopt").style.display = "none";
}

function hideOpt()
{
	document.getElementById("leftnav").style.display = "none";
	document.getElementById("sidebar2").style.left = "-160px";
	document.getElementById("hideopt").style.display = "none";
	document.getElementById("showopt").style.display = "inline";
}

document.addEventListener('DOMContentLoaded',function()
{
	document.body.innerHTML = document.body.innerHTML.replace(/<div class="rshdr">/gi,"<div class=\"rshdr\" id=\"rshdrid\">");	
	
	if (autoHide)
	{
		document.body.innerHTML = document.body.innerHTML.replace(/<div style="position:relative">/gi,"<div id=\"sidebar2\" style=\"position:relative;left:-160px;top:-15px;\">");
		document.getElementById("leftnav").style.display = "none";
		document.getElementById("rshdrid").innerHTML = document.getElementById("rshdrid").innerHTML + "<div style='color:blue;padding:3px;padding-left:20px;position:relative;top:-20px;'><span id='hideopt' style='display:none;cursor:pointer;' onclick='hideOpt();'><img src='"+ib+"' alt='Hide' style='margin-right:2px;'/>Hide Options</span> <span id='showopt' onclick='showOpt();' style='cursor:pointer;'><img src='"+ia+"' alt='Show' style='margin-right:2px;'/>Show Options</span></div>";
	}
	else
	{
		document.body.innerHTML = document.body.innerHTML.replace(/<div style="position:relative">/gi,"<div id=\"sidebar2\" style=\"position:relative;top:-15px;\">");
		document.getElementById("rshdrid").innerHTML = document.getElementById("rshdrid").innerHTML + "<div style='color:blue;padding:3px;padding-left:20px;position:relative;top:-20px;'><span id='hideopt' style='cursor:pointer;' onclick='hideOpt();'><img src='"+ib+"' alt='Hide' style='margin-right:2px;'/>Hide Options</span> <span id='showopt' onclick='showOpt();' style='display:none;cursor:pointer;'><img src='"+ia+"' alt='Show' style='margin-right:2px;'/>Show Options</span></div>";
	}
},false);