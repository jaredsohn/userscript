// ==UserScript==
// @name          Hover Links
// @namespace     http://www.userscripts.org
// @description   A tooltip pops up when hovering over links.
// @include       *
// ==/UserScript==

var bg_color = "#EAEAEA";
var border_color = "#D5D5D5";
var font_color = "#000000";
var font_face = "tahoma";
var font_size = "11px";

(function() {
	function locate(event)
	{
		var posx, posy;
		var d = find_window();
		posx = event.clientX + window.pageXOffset;
		posy = event.clientY + window.pageYOffset;
		d.style.top = (posy - 23) + "px";
		d.style.left = (posx + 5) + "px";
	}
	
	function find_window()
	{
		return document.getElementById("link_tt");
	}
	
	function create_window(id)
	{
		var tt_div = document.createElement("div");
		tt_div.setAttribute("id", "link_tt");
		tt_div.setAttribute("style", "background:" + bg_color + ";border:1px solid " + border_color + ";padding:2px;color:" + font_color + ";font-family:" + font_face + ";font-size:" + font_size + ";position:absolute;z-index:1000;");
		var tt_url = document.createTextNode(id.href);
		tt_div.appendChild(tt_url);
		document.body.appendChild(tt_div);
	}
	
	function kill_window()
	{
		if (find_window()) find_window().parentNode.removeChild(find_window());
	}
	
	function create_event(id)
	{	
		id.addEventListener("mouseover", function() { create_window(id); }, false);
		id.addEventListener("mouseout", function() { kill_window(); }, false);
		id.addEventListener("mousemove", function(event) { locate(event); }, true);
	}
	
	var link = document.getElementsByTagName("a");
	for (i = 0; i < link.length; i++)
	{
		create_event(link[i]);
	}
})()