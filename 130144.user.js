// ==UserScript==
// @author         Thideras
// @version        1.0
// @name           Highlight foreign images
// @namespace      http://overclockers.com
// @description    Images that are not part of the Overclockers.com website are highlighted in red
// @include        http://www.overclockers.com/forums/*
// @include        https://www.overclockers.com/forums/*
// @include	   http://overclockers.com/forums/*
// @include	   https://overclockers.com/forums/*
// ==/UserScript==

const border_width = 3;
const border_style = "solid";
const border_color = "red";

function border_img(target_img)
{
	target_img.style.borderWidth = border_width + "px";
	target_img.style.borderStyle = border_style;
	target_img.style.borderColor = border_color;
}

//Process each image
var imgs = document.getElementsByTagName("img");
for (var i = 0; i < imgs.length; i++)
{	
	if (!/overclockers.com/.test(imgs[i].src) && !/imog.us/.test(imgs[i].src) && !/hwbot.org/.test(imgs[i].src) &&!/xtremeoverclocking.com/.test(imgs[i].src))
		border_img(imgs[i]);
	//Else, do nothing
}