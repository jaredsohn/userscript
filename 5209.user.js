// ==UserScript==
// @name          divspace topics on homepage
// @namespace     wha?
// @description   places a iframe with divspace topics at the bottom of your homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=101740343&adTopicID=6"); 
ifrm.style.width = 830+"px";
ifrm.style.height = 580+"px";
ifrm.style.display="inline";
ifrm.style.position="relative";
ifrm.style.top = -717+"px"; // make this higher to move further down
document.body.style.marginBottom=10+"px";
document.getElementById('body').appendChild(ifrm);