// ==UserScript==
// @name         		 GreasemonkCC
// @namespace     	http://www.litzke.com
// @description   		Add configurable Creative Commons license information to a specific part of the page. Version .8
// @include       		*

/*Configuration:
cssOpt is the css option you want to use. Leave this at 0 for a bold appearance. Set it to 1 to make the appearance more subtle. Add your own if you'd like, it's easy enough to see where the data goes (pretty much directly below this).

There are also a series of variables for configuring strings... you can replace these if you'd like, but it's probably best to leave them default
*/

/*
Changelog:
* ... before changes were logged
* .51 - fixed minor css problem making width of page of 100%
* .52 - added checks for CC images not in the first rel= tag
* .7 - Detects RDF data (finally)!!!
* .71 - Rewrite, code cleanup, more efficient now
* .75 - Supports Public Domain detection
* .8  - Versioning numbers now included in bar; supports sampling licenses

Program Methodology
	People are inclined to add their own random tags instead of using the nice preformatted ones. As a result we need to catch all the options. First we search for <a rel="license" tags
	since these should be common. If they aren't found, then we look for RDF metadata (which we're unlikely to find). If that is also missing then we do an intensive (slow) search for the
	CC Licensed image. A pure link search remains unimplemented, since we can't guarantee that the link is found as an example on the page as opposed to copyrighting the page.
*/

// ==/UserScript==


//--------------------------------------- // Configuration //-----------------------------------//
var cssOpt=0; //select the css style for the bar: 0=bold, attention getting  1=subtle. Add your own below

//If you'd like to configure the strings, do it here
var start=/*<div id="ccLicenseData">*/'<center><a href="';
var cc="<b>Creative Commons License"
var c2="</b> Requires <i>";
var c3="</b><i>";
var by="Attribution";
var sa="Share Alike";
var nc="Non-Commercial";
var nd="No Derivative Works";
var end="</i></a></center>";//</div>";
var inr=": ";
var pd="Public Domain";
var ncp="Noncommercial Sampling Plus";
var sp="Sampling Plus";
var sm="Sampling";

var mainDiv=document.createElement('div');
mainDiv.id="ccLicenseData";

var hi=20; //hi is used for moving the rest of the page down. thus if the height of the bar is to be 35, set hi=35 and then set csStyle as seen below. Or leave it at the default of a thin 20.
//Add extra styles if you'd like...
if(cssOpt==0)
{
	hi=35;
	var csStyle='#ccLicenseData { background:#fa6604 ! important; border:1px solid black ! important; width:99% ! important; height:'+hi+'px ! important; position:absolute ! important; top:0px ! important; font-size:15pt ! important; margin-bottom:40px ! important;} #ccLicenseData a { color:black ! important; text-decoration:none ! important;}';
}
else if(cssOpt==1)
{
	hi=20;
	var csStyle='#ccLicenseData { background:#F3F3F3 ! important; border-bottom:1px solid black ! important; width:99% ! important; height:'+hi+'px ! important; position:absolute ! important; top:0px ! important; important; margin-left:auto ! important; important; margin-right:auto ! important;}#ccLicenseData a { color:black ! important; text-decoration:none ! important;}';
}


//-----------------------------------------//  Functions  //-----------------------------------//
//query is a valid xpath string; it returns a 
	function xpath(query) {
		return document.evaluate(query, document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

//Given a URL and a string, extract the license data
	function textOut(licText) {
		var licOut=start+licText+'">';
		licOut+=cc;
		var reg=/\d\.\d/;
		var match=reg.exec(licText);
		if(match!=null)
		{
			licOut+=" "+match;
		}
		if(licText.indexOf("publicdomain")>0)
		{
			licOut+=c3+inr+pd;
		}
		else if(licText.indexOf("nc-sampling+")>0)
		{
			licOut+=c3+inr+ncp;
		}
		else if(licText.indexOf("sampling+")>0)
		{
			licOut+=c3+inr+sp;
		}
		else if(licText.indexOf("sampling")>0)
		{
			licOut+=c3+inr+sm;
		}
		else
		{
			licOut+=c2;
			if(licText.indexOf("by")>0)
			{
				licOut+=by+" ";
			}
			if(licText.indexOf("nc")>0)
			{
				licOut+=nc+" ";
			}
			if(licText.indexOf("sa")>0)
			{	
				licOut+=sa+" ";
			}
			if(licText.indexOf("nd")>0)
			{
				licOut+=nd+" ";
			}
		}
		licOut+=end
	
		return licOut;
	}
	
	function insertion(urlData) {
		var licOut=textOut(urlData);
		var bd='<div id="notCClicenseData">'+document.body.innerHTML;
		document.body.innerHTML=bd+"</div";		
		mainDiv.innerHTML+=licOut;
		document.body.appendChild(mainDiv);
		return true;
	}
		
	
//Add CSS styles, takes in a css string
	function addGlobalStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}
	
//---------------------------- // Pages including rel="license" //-----------------------------//	
var lic = xpath('//a[@rel="license"]');
var licA = lic.snapshotItem(0);
if(lic.snapshotLength>0)
{
	if(licA.getAttribute("href").length) //Hopefully, we can find the data via the <a rel="license"> tag that people should be using.
	{		
		var licText=licA.getAttribute("href");
		insertion(licText);			
	}
}

//-------------------------------// Pages omitting rel="license" //--------------------------------//


//If they've stupidly omitted the <a rel="license"> tag, then we need to try a manual search
if(document.body.innerHTML.indexOf('rel="license"')<0&&lic.snapshotLength==0)
{
	var licOut="";
	
	
	if(document.getElementsByTagName("html")[0].innerHTML.indexOf('<License rdf:about')>=0) //WE HAVE RDF DATA AVAILABLE
	{
		var bod=document.getElementsByTagName("html")[0].innerHTML;//.body.innerHTML;
		var j=bod.indexOf('<License rdf:about="')+20; //we use this to link to the commons license description
		var link=bod.substring(j,bod.indexOf('"',j));	
		insertion(link);
	}
	
	
	else		//NO RDF DATA
	{
		lic = xpath('//img[@src]');
		var licText="";
		for(var i=lic.snapshotLength-1;i>=0;i--)
		{
			var licSrc=lic.snapshotItem(i).getAttribute("src");
			if(((licSrc.indexOf("creativecommons")>=0)&&(lic.snapshotItem(i).parentNode.getAttribute("href").indexOf("refer")<0))||(licSrc.indexOf("somerights")>=0))
			{
				licText=lic.snapshotItem(i).parentNode.getAttribute("href");
				insertion(licText);
				break;
			}
		}
	}
}

//-------------------------------------------// CSS //--------------------------------//

//Insert two styles, configuring the bar and shifting the main content area

addGlobalStyle(csStyle);
addGlobalStyle('#notCClicenseData { margin-top:'+hi+'px ! important;}');
