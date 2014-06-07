// ==UserScript==
// @name           GLB Hide Forum Signatures
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread.pl*
// ==/UserScript==

window.setTimeout( function() 
{
	main();
}, 100);

function main() {
	var sigs = getElementsByClassName("signature",document);
	for(var i=sigs.length-1; i>=0; i--) {
		sigs[i].setAttribute("style","visibility: hidden; display: none;");
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