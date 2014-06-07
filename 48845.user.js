// Created by Graziano
// ngx_Graz@hotmail.com
//
/**********************************************************************/
//
// ==UserScript==
// @name           Nexopia No Side Bar
// @description    This script will remove the sidebar from all pages
// @include        http://www.nexopia.com/*
// @include        http://plus.nexopia.com/*
// ==/UserScript==

x=document.getElementById('layout_sidebar');
if (x) {
	a = document.createElement('a');
	a.innerHTML = "Show/Hide sidebar"
	a.setAttribute('href','javascript:void(0)');
	a.addEventListener("click", toggleSidebar, true);
	
	document.body.insertBefore(a,document.body.childNodes[0]);
	
	var show_sidebar = GM_getValue("showSidebar", "false");
	if (show_sidebar != "false")
		x.style.display = "none";
}

function toggleSidebar()
{
	var show_sidebar = GM_getValue("showSidebar", "false");
	if (show_sidebar == "false")
		GM_setValue("showSidebar", "true");
	else
		GM_setValue("showSidebar", "false");
		
	if (x.style.display == "none")
		x.style.display = "";
	else
		x.style.display = "none";
}