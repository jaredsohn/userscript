// ==UserScript==
// @name           BinusMaya Open in new Tab
// @namespace      http://diveintogreasemonkey.org/download/
// @description    This script is only useful for only who study in university of bina nusantara, this script make the javascript page can open in new tab
// @include        http://binusmaya.binus.ac.id/Default.aspx
// @include        http://binusmaya.binus.ac.id/Default.aspx*
// ==/UserScript==

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

window.addEventListener(
  'load',
 
      function load()
{
	if(window.opener!=null)
	{
		document.location.href=gup('value');	
	}
	
},
  false
);

if(!GM_xmlhttpRequest)
{
	alert("Please Upgrade GreaseMonkey");	
}
else
{	
	var a,links,href;
	var links2 = new Array();
	var j=0;
	var k;
	var count=0;
	a = document.evaluate("//a[@href]",document,null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null
	);
	for (var i = 0; i < a.snapshotLength; i++) 
	{
		links = a.snapshotItem(i);
		href = links.href;
 		if(href.match(/doPostBack/) &&!href.match(/htmlAnchorViewAll/))
		{
			links2[j]=links;
			j++;
		}
	}
	for(k = 0;k<j;k++)
	{
		links2[k].addEventListener('click',
		function(e) {
		
			window.open(document.location.href+"?value="+e.target);
			
			
		},false);
		links2[k].setAttribute("onclick","return false");
	}	
	
}



