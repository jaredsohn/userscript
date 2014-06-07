// ==UserScript==
// @name           Osem-fixer
// @namespace      http://shmulik.zekar.co.cc
// @include        http://*.osem.co.il/*
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @version        0.91
// @description    fix Osem for Firefox
// ==/UserScript==



GM_addStyle(".dont_print{  display: table-row !important; }");
GM_addStyle("table.main{  margin:auto !important; }");
chgw("http://www.osem.co.il/_pics/header.jpg","640px");
chgw("http://www.osem.co.il/_pics/staticFooter2.gif","800px");

GM_addStyle("div.navigation{  height:auto !important; }");
GM_addStyle(".menuRowRightOver{cursor:pointer; }");

unsafeWindow.showFirstNodeV = function(oDiv){
	if (oDiv.children[1]) {
		oDiv.children[0].style.position="absolute";
		oDiv.children[1].style.top = 150;//140//160
		
		oDiv.parentNode.vAlign = "top";
		oDiv.parentNode.style.backgroundColor = "#E10920";
		oDiv.children[0].children[0].height = "auto";
		
		oDiv.children[1].style.left = oDiv.children[0].offsetLeft - (oDiv.children[1].offsetWidth-oDiv.children[0].offsetWidth);
		oDiv.children[1].style.visibility = "visible";
	}
}

function chgw(source,neww)
{
  var imgs = document.getElementsByTagName("img");
  for (i=0; i<imgs.length; i++) {
    if (imgs[i].src==source)
      imgs[i].style.width=neww;
  }
}