// ==UserScript==
// @name           Torrent Hash Linker
// @namespace      torrenthash
// @description    Makes torrent hashes into magnet links
// @include        *.reddit.com/r/narwhalbits/comments/*
// ==/UserScript==

var replacements = {
	"(Hash:\\s*([0-9A-F]{40}))": '<a href="magnet:?xt=urn:btih:$2">$1</a>',
}

var regex = {};
for (key in replacements)
{
    regex[key] = new RegExp(key, 'ig');
}

var textnodes = document.evaluate(
	"descendant-or-self::text()",
	document.body,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < textnodes.snapshotLength; i++)
{
	node = textnodes.snapshotItem(i);
	
	for (key in replacements)
	{
		if(node.data.match(regex[key]))
		{
			var parents = document.evaluate(
				"parent::*",
				node,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			// parents.snapshotLength should equal 1
			for (var j = 0; j < parents.snapshotLength; j++)
			{
				pnode = parents.snapshotItem(j);

				/* Only linkify if the parent is not itself a link */
				if(typeof(pnode.href) == 'undefined')
				{
					pnode.innerHTML = pnode.innerHTML.replace(regex[key], replacements[key]);
				}
			}
		}
	}
}
