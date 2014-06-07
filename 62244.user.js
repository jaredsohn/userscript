// ==UserScript==
// @name           Fix Caps
// @namespace      hwttdz
// @description    Fix Caps
// @include http://*.craigslist.org/*
// ==/UserScript==

(
	function() 
	{
		var replacements, regex, key, textnodes, node, s;
		textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 1; i < textnodes.snapshotLength; i++)
		{
			node = textnodes.snapshotItem(i);
			if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
			{
				s = node.data;
				s = removeAnnoying(s);
				s = toProperCase(s);
				s = addCaps(s);
				node.data = s;
			}
		}
	}
)

();

function addCaps(s)
{
	s = s.replace(/ i /g," I ");
	return s;
}

function toProperCase(s)
{
	s = s.toLowerCase();
	s = s.replace(/^\s*\w|[\.!?]\s+\w/g, function($1){ return $1.toUpperCase(); });
	return s;
}


function removeAnnoying(s)
{
	s = s.replace(/\{/g,"("); // replace curly braces with parens
	s = s.replace(/\}/g,")"); // replace curly braces with parens

	s = s.replace(/([\/~\@=\+!\-\$\(\)])+/g,"$1"); // collapse to one

	s = s.replace(/([&\+])/g," $1 "); // wrap in spaces
	s = s.replace(/[❧★ഃ✣⚒♥►❦♦▲█∾♚◉≈※₪~◆❖✾◄⚭⚶⚛^\*]/g," "); // remove weird characters
	s = s.replace(/\_+/g," "); // underscores to spaces

	s = s.replace(/\s*\)/g,") "); // remove spaces before closing paren, add space after
	s = s.replace(/\(\s*/g," ("); // remove spaces after opening paren, add space before

	s = s.replace(/\(\s*\)/g,""); // remove empty braces, with possible whitespace in the middle

	s = s.replace(/[,?!\.]\s*[,?!\.]/g,"."); // remove empty sentences
	s = s.replace(/[,?!\.]\s*[,?!\.]/g,"."); // remove empty sentences

	s = s.replace(/\s+([\.])/g,"$1 "); // remove excess space before punctuation, add space after, for dots
	s = s.replace(/\s*([!?,])/g,"$1 "); // remove excess space before punctuation, add space after, for all other punctuation

	s = s.replace(/ +/g," "); // collapse spaces to single space
	return s;
}

