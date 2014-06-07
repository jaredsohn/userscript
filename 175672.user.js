// ==UserScript==
// @name       Wing's MAL auto remove watched
// @namespace  http://blog.wingao.me
// @version    0.1
// @description  enter something useful
// @include http://myanimelist.net/anime.php*
// @copyright  2013, wing
// ==/UserScript==


function main()
{
	var srPath = "//*[@id='content']/div[2]/table/tbody/tr[1]/td[1]";
    var sr = document.evaluate(srPath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    
    var btn = document.createElement("button");
	btn.innerHTML = "Remove Viewed";
	btn.onclick = function(){remove();};	
	sr.appendChild(btn);
}
function remove()
{
	var q = "//a[@title='Edit this entry']";
	var xps = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var a = xps.iterateNext();
	var nod = new Array()
	while(a)
	{
		nod.push(a);
		a = xps.iterateNext();
	}
	for(var i=0;i<nod.length;i++)
	{
		nod[i].parentNode.parentNode.remove();
	}
}
main()