// ==UserScript==
// @name           Clear-Cut / Customized
// @version        2.5
// @author         Guardian / Lyra
// @description    Remove unwanted boards from ponychan!
// @include        http://*.ponychan.net/*
// ==/UserScript==
function CutOut()
{
var barr = [];
var links = document.getElementsByTagName("a");
var arr = new Array ('/rp/','/fic/','/media/','/dis/','/ooc/','/pic/','/chat/','/phoenix/','/vinyl/','/all/','/news/','/arch/','/show/','/merch/','/oat/');
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
CutOut();