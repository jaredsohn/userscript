// ==UserScript==
// @name           collectTB-Codes
// @namespace      http://lifesuche.de/
// @description    Collect TB-Codes from TB Listing
// @include        http://www.geocaching.com/track/details.aspx*
// @version        1.00
// ==/UserScript==


var stored;
var tbcodes = new Array();
var codehash = new Array();

function clearCollection() {
  GM_setValue("tbcodeshashed","");
  alert("TB-Codes cleared");
}

// main()

GM_registerMenuCommand( "TB-Codes clear", clearCollection );

try {
	stored = GM_getValue("tbcodeshashed");
	tbcodes = stored.split('|');
//  alert(tbcodes.length);
	for(var i=0 ; i < tbcodes.length ; i++)
	{
		codehash[tbcodes[i]]=i;
	}
}
catch (err){
}

try
{
	var GCElement = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode');
	var GCCode    = GCElement.innerHTML;
	codehash[GCCode]=0;

	stored="";
	var i=0;
	for (var st in codehash) {
     if(i++)
	     stored = stored + '|';
     stored = stored + st;
  }	
	GM_setValue("tbcodeshashed",stored);
	var Element=document.getElementById('Quantcast');
	Element.innerHTML=Element.innerHTML+'<p>'+stored.replace(/\|/gi,"<br />")+'</p>';
}
catch (err){
}
