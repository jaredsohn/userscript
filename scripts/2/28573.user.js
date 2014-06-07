// ==UserScript==
// @name           Private Team Forum Remover
// @namespace      Branden Guess
// @description    This removes the specified private team forum(s) from the main forum page.
// @include        http://goallineblitz.com/game/forum_main.pl
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

//Position of Team Forum (1,2,etc.)
var forum1 = "1"
var forum1num=parseInt(forum1) - 1
var forum1final = 21 - forum1num

var forums=getElementsByClassName('alternating_color2 forum',document)

forums[forum1final].style.display="none"


