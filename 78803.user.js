// ==UserScript==
// @name           kourie Threads
// @namespace      hide_kourie Threads
// @include        http://www.tagz.com/forum_room.asp*
// ==/UserScript==

allB = document.getElementsByTagName("b");

for ( var i in allB)
{
    b=allB[i];
    if (b.innerHTML=="The_wolfman"){
        console.log("ok");
        
	if (b.parentNode
         .parentNode
         .parentNode
	 .childNodes[2])
	{
		// Skip 
	}
	else
	{
	  b.parentNode
         .parentNode
         .parentNode
         .parentNode
         .parentNode
         .parentNode
         .parentNode
         .parentNode
         .style.display= "none";
	}
    }

if (b.innerHTML=="kourie"){
        console.log("ok");
        
	if (b.parentNode
         .parentNode
         .parentNode
	 .childNodes[2])
	{
		// Skip 
	}
	else
	{
	  b.parentNode
         .parentNode
         .parentNode
         .parentNode
         .parentNode
         .parentNode
         .parentNode
         .parentNode
         .style.display= "none";
	}
    }
}
