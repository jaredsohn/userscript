// ==UserScript==
// @name           BetaSeries NZB
// @namespace      tageus
// @description    Add NZB links to episodes
// @include        http://www.betaseries.com/membre/*/episodes
// @include        https://www.betaseries.com/membre/*/episodes
// ==/UserScript==



function checkContent()
{
	if (document.getElementById("episodes_container"))
	{
		var div = document.getElementById("episodes_container");
		if (div.getElementsByClassName("item") && div.getElementsByClassName("item").length > 0)
		{
			//console.log(div.getElementsByClassName("item"));
			clearInterval(checkInt);			
			parseNodes(div.getElementsByClassName("item"));
		}
	}
}

function parseNodes(nodes)
{
	for (var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		var titleNode = node.childNodes[0];
		var show = "";
		var ep = "";
		var epNode;
		
		for (var j = 0; j < titleNode.childNodes.length; j++)
		{
			var child = titleNode.childNodes[j];
			if (child && child.nodeName.toLowerCase() == "a")
			{
				if (child.getAttribute("class") == "ep") show = child.firstChild.nodeValue;
				else
				{
					ep = child.firstChild.nodeValue;
					epNode = child;
					break;
				}
			}
		}
		
		var query = escape(show + ' ' + ep);
		var links = [
			'<a href="http://binsearch.info/?max=250&q='+ query +'" border="0" target="_blank" alt="BinSearch" title="BinSearch">BS</a>',
			'<a href="http://binsearch.info/?max=250&server=2&q='+ query +'" border="0" target="_blank" alt="BinSearch Other Groups" title="BinSearch Other Groups">BSO</a>',
			'<a href="http://www.nzbindex.nl/search/?q='+ query +'&max=50&sort=agedesc&hidespam=1" border="0" target="_blank" alt="NZB Index" title="NZB Index">NZBI</a>',
			'<a href="http://www.nzbclub.com/search.aspx?q='+ query +'" border="0" target="_blank" alt="NZB Club" title="NZB Club">NZBC</a>'
		];
		
		var div = document.createElement("span");
		div.innerHTML = '&nbsp;(NZB&nbsp;' + links[0] + '&nbsp;' + links[1] + '&nbsp;' + links[2] + '&nbsp;' + links[3] + ')&nbsp;';
		titleNode.insertBefore(div, epNode);
	}
}

var checkInt = setInterval(checkContent, 250);