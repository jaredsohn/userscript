// ==UserScript==
// @name           Cleanup Toolbar
// @version        1.0.0
// @namespace      chris465glb
// @description    Remove Radio and Shop
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};


var container=getElementsByClassName('toolbar_item',document)[4]
container.innerHTML = "Market";

var container=getElementsByClassName('toolbar_item',document)[8]
container.innerHTML = "Flex";

var container=getElementsByClassName('toolbar_item',document)[11]
container.innerHTML = "Radio";

var container=getElementsByClassName('toolbar_item',document)[12]
container.innerHTML = "$";