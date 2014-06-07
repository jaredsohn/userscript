// ==UserScript==
// @name           BeggingScript
// @namespace      
// @description    BegScript
// @author         Boxed
// @version        1.0.0
// @include        http://www.hobowars.com/fb/game.php?*=arcade&do=beg* 
// @exclude	  
// ==/UserScript==

var  contents = document.getElementById("contents");
var link;
if(contents){
	if(contents.textContent.match('sit out the front of the arcade')){
		
		link = contents.getElementsByTagName("a")[0].href;
		setTimeout(beg,40);
		
	    }
}
function beg()
		{
	location.href = link;
	 	}