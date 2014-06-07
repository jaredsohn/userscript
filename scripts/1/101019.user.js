// ==UserScript==
// @name           ok
// @namespace      asdad
// @description    ok
// @include        http://www.booty-master.com/show_item.php?feed=*
// ==/UserScript==


var thestring;
var otherstring;
var locofequal;
var omg;	

thestring = window.location.search;
locofequal = thestring.indexOf("=");
otherstring = thestring.substring((locofequal + 1),thestring.length); 
omg=++otherstring;

var xpathResult = document.evaluate("(//text()[contains(., 'Breath')])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var node=xpathResult.singleNodeValue;
if (node==null)
// if (node!=null) to look for pages that don't contain the string

{
window.open( "http://www.booty-master.com/show_item.php?feed=" + otherstring,'_self' );
}
else
{
alert("The link is " +document.location.href);
}