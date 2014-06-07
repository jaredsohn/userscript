// ==UserScript==
// @name           GLB Show Last Edited By
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

window.setTimeout( function() 
{
	main();
}, 100);

function main() {	
	var elPosts = getElementsByClassName("post_content_container",document);
	for(var i=0; i<elPosts.length; i++) {
		var elEdits = getElementsByClassName("last_edit",document);
		if(elEdits.length>1) {
			for(var j=elEdits.length-1; j>0; j--) {
				elEdits[j].parentNode.removeChild(elEdits[j]);
			}
		}
	}
}


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