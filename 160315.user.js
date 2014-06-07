// ==UserScript==
// @name           collectGC-Codes
// @namespace      http://lifesuche.de/
// @description    Collect GC-Codes from Searchresult Pages
// @include        http://www.geocaching.com/seek/nearest.aspx*
// @version        1.01
// ==/UserScript==


var stored;
var gccodes = new Array();
var codehash = new Array();

function clearCollection() {
  GM_setValue("gccodeshashed","");
  alert("GC-Codes cleared");
}

// main()

GM_registerMenuCommand( "GC-Codes clear", clearCollection );

try {
	stored = GM_getValue("gccodeshashed");
	gccodes = stored.split('|');
//  alert(gccodes.length);
	for(var i=0 ; i < gccodes.length ; i++)
	{
		codehash[gccodes[i]]=i;
	}
}
catch (err){
}

try
{
	var b=document.getElementsByTagName("table")[1].getElementsByTagName("tr");
	var anzahl=b.length;
	for(var i=1 ; i < anzahl ; i++)
	{
		var spans = b[i].getElementsByTagName("span");
		var gc=spans[3].innerHTML.split('|')[1].trim();
//		alert(gc);
		codehash[gc]=0;
	}

	stored="";
	var i=0;
	for (var st in codehash) {
     if(i++)
	     stored = stored + '|';
     stored = stored + st;
  }	
	GM_setValue("gccodeshashed",stored);
	var Element=document.getElementById('Quantcast');
//	Element.innerHTML=Element.innerHTML+'<p>'+stored.replace(/\|/gi,"<br />")+'</p>';
	Element.innerHTML=Element.innerHTML+'<p>'+stored.replace(/\|/gi,"<br />")+'</p>';
}
catch (err){
}
