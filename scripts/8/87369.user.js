// ==UserScript==
// @name           Google Notebook Tweak
// @namespace      Notebook
// @description    remove the yellow tip in google notebook
// @include        htt*://www.google.com/notebook/*
// ==/UserScript==
// @author		   xutaozero21
// @blog		   http://blog.csdn.net/xutaozero21

setTimeout(function()
{
	//alert("get tip obj");
	var tip_obj;
	if(tip_obj=document.getElementById("gn0_0"))
	{
		tip_obj.style.display="none";
		//alert("ok");
	}
},1000)