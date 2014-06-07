// ==UserScript==
// @name           4chan Quicklinks - for /v/ & tripfriends
// @namespace      http://userscripts.org/scripts/show/91553
// @namespace      GENOCIDEGeorge
// @description    Adds quicklinks to 4chan's reply-box. Based off murkloar's script (http://userscripts.org/scripts/show/75955)
// @include        http://boards.4chan.org/*
// @include        http://*.4chan.org/*
// @include        http://www.4chan.org/*
// ==/UserScript==

//Fix unsafeWindow and sessionStorage for other browsers
if (typeof unsafeWindow == "undefined") {
	unsafeWindow = window;
}
if (typeof sessionStorage == "undefined") {
	sessionStorage = localStorage;	
}


nameField = document.getElementsByName("name")[0];
subjectField = document.getElementsByName("sub")[0];
emailField = document.getElementsByName("email")[0];
commentField = document.getElementsByName("com")[0];
passwordField = document.getElementsByName("pwd")[0];

//Namefield
nameField.parentNode.appendChild(document.createTextNode("["));
tripcodeLink = document.createElement("a");
tripcodeLink.href = "javascript:void(document.getElementsByName('name')[0].value='OPEN NOTEPAD AND CHANGE THIS!')";
tripcodeLink.appendChild(document.createTextNode("tripcode"));
nameField.parentNode.appendChild(tripcodeLink);
nameField.parentNode.appendChild(document.createTextNode(" | "));
clearLink = document.createElement("a");
clearLink.href = "javascript:void(document.getElementsByName('name')[0].value='')";
clearLink.appendChild(document.createTextNode("clear"));
nameField.parentNode.appendChild(clearLink);
nameField.parentNode.appendChild(document.createTextNode("]"));

//Emailfield
emailField.parentNode.appendChild(document.createTextNode("["));
nokoLink = document.createElement("a");
nokoLink.href = "javascript:void(document.getElementsByName('email')[0].value='noko')";
nokoLink.appendChild(document.createTextNode("noko"));
emailField.parentNode.appendChild(nokoLink);
emailField.parentNode.appendChild(document.createTextNode(" | "));
sageLink = document.createElement("a");
sageLink.href = "javascript:void(document.getElementsByName('email')[0].value='sage')";
sageLink.appendChild(document.createTextNode("sage"));
emailField.parentNode.appendChild(sageLink);
emailField.parentNode.appendChild(document.createTextNode(" | "));
steamLink = document.createElement("a");
steamLink.href = "javascript:void(document.getElementsByName('email')[0].value='PUT YOUR STEAM ID HERE')";
steamLink.appendChild(document.createTextNode("Steam"));
emailField.parentNode.appendChild(steamLink);
emailField.parentNode.appendChild(document.createTextNode(" | "));
clearLink = document.createElement("a");
clearLink.href = "javascript:void(document.getElementsByName('email')[0].value='')";
clearLink.appendChild(document.createTextNode("clear"));
emailField.parentNode.appendChild(clearLink);
emailField.parentNode.appendChild(document.createTextNode("]"));

//Subjectfield
subjectField.parentNode.appendChild(document.createTextNode("["));
clearLink = document.createElement("a");
clearLink.href = "javascript:void(document.getElementsByName('sub')[0].value='')";
clearLink.appendChild(document.createTextNode("clear"));
subjectField.parentNode.appendChild(clearLink);
subjectField.parentNode.appendChild(document.createTextNode("]"));

//Commentfield
commentField.parentNode.appendChild(document.createTextNode("["));
videogamesLink = document.createElement("a");
videogamesLink.href = "javascript:void(document.getElementsByName('com')[0].value='[spoiler]videogames[/spoiler].')";
videogamesLink.appendChild(document.createTextNode("videogames"));
commentField.parentNode.appendChild(videogamesLink);
commentField.parentNode.appendChild(document.createTextNode(" | "));
bumpLink = document.createElement("a");
bumpLink.href = "javascript:void(document.getElementsByName('com')[0].value='bump')";
bumpLink.appendChild(document.createTextNode("bump"));
commentField.parentNode.appendChild(bumpLink);
commentField.parentNode.appendChild(document.createTextNode(" | "));
clearLink = document.createElement("a");
clearLink.href = "javascript:void(document.getElementsByName('com')[0].value='')";
clearLink.appendChild(document.createTextNode("clear"));
commentField.parentNode.appendChild(clearLink);
commentField.parentNode.appendChild(document.createTextNode("]"));

//Password clear
passwordField.parentNode.appendChild(document.createTextNode(" ["));
clearLink = document.createElement("a");
clearLink.href = "javascript:void(document.getElementsByName('pwd')[0].value='')";
clearLink.appendChild(document.createTextNode("clear"));
passwordField.parentNode.appendChild(clearLink);
passwordField.parentNode.appendChild(document.createTextNode("]"));