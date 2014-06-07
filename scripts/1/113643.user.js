// ==UserScript==
// @name           casinocrap
// @namespace      
// @description    
// @author         Boxed
// @version        1.0.0
// @include        http://www.hobowars.com/fb/game.php?*slots&pay* 
// @exclude	  
// ==/UserScript==

var  contents = document.getElementById("contents");
var link;
if(contents){
	if(contents.textContent.match('only win in active lines')){
		
		link = contents.getElementsByTagName("a")[3].href;
		setTimeout(Pull,40);
	
	    }
}
function Pull()
		{
	location.href = link;
	 	}