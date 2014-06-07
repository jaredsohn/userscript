// ==UserScript==
// @name        Cleanstiq
// @description Cleans up Joystiqs's new style
// @include     http://www.joystiq.com/
// @include     http://*.joystiq.*
// @author      James
// @version		0.1
// ==/UserScript==


var init = function(){
	//First up, font and color fixes
	var css = ".console-badge { display: none }";
	css += "#main-content .post { background-color: #F9F9F9 }";
	css += "#main-content .post .post-inner { margin: 0px; width: auto; }";
	css += "#main-content .post .badges { right: 0; top: 45px; left: auto; width: auto; }";
	css += "#main-content .post .badges ul li { float: left }";
	css += "#main-content .post .badges ul li a { margin-left: 5px }";
	css += "#comments { background-color: #F9F9F9 } ";
	css += "#content { background-color: #F9F9F9 } ";
	css += "#main-content { background-color: #F9F9F9 } ";
	css += "#comments .level3 { background-color: #F0FFF0 }";
	css += "#comments .level4 { background-color: #E9FFE9 }";
	css += "#comments .comment .comment-body { color: #3D3D3D } ";
	css += "body { background-color: #F9F9F9 } ";
	css += "#comments .comment { border-left : 1px solid #E4E4E4 } ";
	css += "#comments .child { border-left : 1px solid #E4E4E4 } ";
	
	//Hiding these sections puts the newest stories right up top
	css += "#mc-outer { display: none }";
	css += "#sub-hero { display: none }";

	var heads = document.getElementsByTagName("head");
	if (heads.length > 0)
	{
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
};

init();