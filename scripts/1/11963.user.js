// ==UserScript==
// @name           SnipIt
// @include        http*allegro.pl/item*
// @include        http*allegro.pl/show_item.php?*
// ==/UserScript==

var url;
var i;
var znak;
var j;
var znakid;
var id = "";
var aLst;
var spnLst;
var snip = document.createElement("div");



url = window.location.href;
for (i=16; i < url.length; i++)
 {
  znak = url.substring(i, i+1);
  if (znak = "m")
   {
    for (j=i+6; j < url.length; j++)
	 {
	  znakid = url.substring(j, j+1);
	  if (znakid != "_")
	   {
	    id = id + znakid;
	   }
	  else
	   {
	    break
	   }
	 }
   }
  if (znakid = "_")
   {
    break
   } 
 }

aLst = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (i=0; i < aLst.snapshotLength; i++)
{
  if (aLst.snapshotItem(i).href.match(/add_to_watchlist\.php\?item/))
  {
   snip.innerHTML = '<div class="li2"><a class="spec" href="https://ssl.snip.pl/snip-it.php?ref=' + id + '" target="_blank"><span><b>Ustrzel to!</b></span></a></div>'
   aLst.snapshotItem(i).parentNode.insertBefore(snip, aLst.snapshotItem(i).nextSibling);
   break
  }
} 
 

	   
	   
		 
    
  