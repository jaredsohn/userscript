// ==UserScript== 
// @name        Fix Erica Library Homepage
// @author      HJH
// @namespace   thehjh.com
// @version     1.0.0
// @include     http://information.hanyang.ac.kr/ansan/jsp/*
//  
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// 
// ==/UserScript== 

function withjQuery(callback)
{
	var scriptElement = document.createElement("script");
	scriptElement.setAttribute("type", "text/javascript");
	scriptElement.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
	scriptElement.addEventListener("load", function ()
	{ 
		var scriptElement = document.createElement("script");
		scriptElement.textContent = "jQuery.noConflict(); (" + callback.toString() + ")();";
		document.body.appendChild(scriptElement);
	}, false);

	document.body.appendChild(scriptElement);
}

withjQuery(function () { (function ($)
{
	// Fix: toggle menu
	$("table[width^=95]").find("td[width]")
		.removeAttr("onmouseover")
		.removeAttr("onmouseout")
		.each(function ()
		{
			var element = $(this);
			var menu = element.children("div");
			element.mouseover(function () { menu.css( { top: element.offset().top + "px", left: element.offset().left + "px" } ).show(); });
			element.mouseout(function () { menu.hide(); });
		});
	
	// Fix: MainTable -> width 설정, 가로 정렬
	$("table.MainTable")
		.width(890)
		.parent().width("100%").end()
		.css("margin", "0 auto");

	// Fix: SubTable -> width 설정, 가로 정렬
	$("table.SubTable")
		.width(890)
		.parent().width("100%").end()
		.css("margin", "0 auto");
	
})(jQuery); });