// ==UserScript==
// @name           PortableApps Unread Posts
// @namespace      download
// @description    Shows the number of unread posts at PortableApps forums in the Favicon
// @include        http://portableapps.com/tracker
// ==/UserScript==


function finishDraw()
{
	c.width=img.width;
	c.height=img.height;
	cc.drawImage(img,0,0);
	cc.textBaseline="top";
	cc.font="10pt Helvetica";
	cc.fillStyle=color;
	cc.fillText(unread.toString(),0,(img.height/2)-5);
	fi.parentNode.removeChild(fi);
	var ni=document.createElement("link");
	ni.type="image/x-icon";
	ni.rel="shortcut icon";
	ni.href=c.toDataURL();
	head.appendChild(ni);
}

var color="#000000";
var unread=document.evaluate("//table[@class='views-table']",document.getElementById("maincontent"),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName("tr").length;
var head=document.getElementsByTagName("head")[0];
var c=document.createElement("canvas");
var cc=c.getContext("2d");
var img=new Image();

var fi=document.evaluate("//link[@type='image/x-icon']",head,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
img.addEventListener("load",finishDraw,false);
img.src=fi.href;