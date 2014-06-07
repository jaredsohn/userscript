// ==UserScript==
// @name          Lebron Group Iframe
// @namespace     #Jo\n @ r4wr[dot]com
// @description   places an iframe at the bottom of your homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewcategory&groupID=100506113&adTopicID=26&Mytoken=E4F3B239-8045-42FA-8A87F404096B2899978687859"); 
ifrm.style.width = 830+"px";
ifrm.style.height = 480+"px";
ifrm.style.display="inline";
ifrm.style.position="relative";
ifrm.style.top = 655+"px"; // make this higher to move further down
document.body.style.marginBottom=10+"px";
document.getElementById('body').appendChild(ifrm);