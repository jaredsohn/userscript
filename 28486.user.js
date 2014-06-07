// ==UserScript==
// @name           PM's In Toolbar
// @namespace      Branden Guess
// @description    This places the number of PM's you have in the toolbar next to Inbox.
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

GM_xmlhttpRequest({