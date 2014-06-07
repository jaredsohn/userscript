// ==UserScript==

// @name           MMATycoonBars
// @namespace      http://www.mmatycoon.com
// @description    Adds numbers to hype,morale,etc bars
// @include        http://www.mmatycoon.com/*

// ==/UserScript==

window.setTimeout( function() 
{
//	var colors_imgs = ["images/barred.jpg", "images/barorange.jpg", "images/bargreen.jpg", "images/img_redbar.gif"];
	var colors_non = "images/img_graybar.gif";
	var a=[];   
    	
	var els = document.getElementsByTagName("td");

	for(var i=0,j=els.length; i<j; i++) 
	{       
	//console.log(els[i].innerHTML.substring(0,20));
	var bg = els[i].getAttribute("background");
	
	if (bg == null)
	{
		continue;
	}
	console.log(bg);
	if (bg.indexOf("images/",0) > -1 && els[i].innerHTML == "&nbsp;")
	{				
		//console.log(els[i].innerHTML);
		var bgNext = els[i+1].getAttribute("background");
		if (bgNext != null && bgNext == colors_non)
		{ 
			var width = els[i].getAttribute('width');
			//console.log("BAR:" + width);
			if (width != null && width.indexOf('%') > -1)
			{
				var num = width.substring(0,width.indexOf('%'));
				num = roundNumber(num, 0);
				if (num > 90)
				{
					els[i].innerHTML = num;
					els[i].align = "right";
				}
				else
				{
					els[i+1].innerHTML = num;
					els[i+1].align = "right";
				}
			}
		}
	}
}
}
)

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}