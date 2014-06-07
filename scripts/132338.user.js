// ==UserScript==
// @name           NAB internet banking no fullscreen popup
// @namespace      nabibfix
// @description    Internet banking with no stupid pop-up window. Hey NAB, this isn't the 90's!
// @include        https://www.nab.com.au/?IB*
// @include        https://ib.nab.com.au/nabib/*
// ==/UserScript==


// This code adds the frame to the home page.
// Because its ID is "ib", window.open will target it instead of a new window.

if (document.location.search == "?IB")
{
	var framespan = document.createElement('span');
	framespan.innerHTML = '<iframe id="ib" name="ib" href="about:blank" style="border:4px solid black; position:absolute;margin-left: auto; margin-right: auto; left:0px; top:0px; right:0px; height:98.6%; width:98.8%; background-color:white; z-index:999;"></iframe>';
	document.getElementsByTagName('body')[0].appendChild(framespan); 
}


// This code automatically opens internet banking.
// It's clicking the "login>" button which is now covered by the frame.

if (document.location.search == "?IB")
{
	var script = document.createElement('script');
	script.innerHTML = "jQuery(document).ready(function() { loginGo(); });";
	document.getElementsByTagName('head')[0].appendChild(script);
}


// Finally, let's skip the stupid log out confirmation
// Script by Simon Wright

if (document.location.host == "ib.nab.com.au")
{
	var script = document.createElement('script');
	script.innerHTML = "logoff = function(){ navigateTo('logoutToWCM.ctl?bw=0&bh=0'); };";
	document.getElementsByTagName('head')[0].appendChild(script);
}

