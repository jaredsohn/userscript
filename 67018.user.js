// ==UserScript==
// @name           fixed left panel
// @namespace      http://c.partiot.free.fr/
// @description    keep left panel when position change
// @include        http://*.wikipedia.org/*
// ==/UserScript==
(function(){
	var panel=document.getElementById("panel");
	var logo=document.getElementById("p-logo");
	if(!logo)
		return;
	if(panel)
	{
		panel.style.position="fixed";
		panel.style.top=0;
		panel.style.overflowY="scroll";
		panel.style.height="100%";
		logo.style.position="relative";
		logo.style.top=0;
		return;
	}
	var column=document.getElementById("column-one");
	var personal=document.getElementById("p-personal");
	var cactions=document.getElementById("p-cactions");
	var content=document.getElementById("content");
	if(column && personal && cactions)
	{
		column.style.position="fixed";
		column.style.top=0;
		column.style.overflowY="scroll";
		column.style.height="100%";
		column.style.width="156px";
		column.style.background="white";
		personal.style.position="fixed";
		cactions.style.position="fixed";
		content.style.zIndex=5;
		return;
	}
})();