// ==UserScript==
// @name           Clear-Cut
// @version        2.0
// @author         Guardian
// @description    Remove the forest
// @include        http://*.ponychan.net/*
// ==/UserScript==
function removeEF()
{
var barr = [];
var links = document.getElementsByTagName("a");
var arr = new Array ('/rp/','/fic/','/media/','/dis/','/int/','/ooc/');
	for (var i=0, max=links.length; i < max; i++)
		{
			for (x in arr)
			{
				if (links[i].href.indexOf(arr[x]) != -1)
				{
					barr.push(i);
				}
			}
		}
	for (var x=barr.length-1, y=0; x>0; x--)
        {
		  links[barr[x]].parentNode.removeChild(links[barr[x]]);
        }		
}
removeEF();