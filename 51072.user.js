// ==UserScript==
// @name           Video Copilot downloader
// @namespace      http://userstyles.org
// @description    "Download" link in video copilot tutorials
// @author		 loige
// @version	 	 1.2
// @include        http://www.videocopilot.net/tutorial/*
// ==/UserScript==

(function() {
//detect the link
var flashvars = document.getElementsByTagName("embed")[0].getAttribute("flashvars");
var params = flashvars.split("&");
var link = params[1].split("=")[1];

//old version link
//var link = document.getElementsByTagName("param")[0].value;
//link = link.substring(0,link.lastIndexOf("/")) + "/data/tutorial.flv";


//adds the link to the menu
var menu = document.getElementsByClassName("tutorial_description")[1];
var textNode = document.createElement("span");
textNode.style.background = "transparent url(http://www.iouppo.com/life/pic1/1103cc474024c2675490480d8d16637e.png) no-repeat scroll 25px 2px";

textNode.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var linkNode = document.createElement("a");
linkNode.href = link;
linkNode.title = link;
linkNode.appendChild(document.createTextNode("Download"));
textNode.appendChild(linkNode);
menu.appendChild(textNode);
})();