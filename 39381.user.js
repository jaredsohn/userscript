// ==UserScript==
// @name           IPSF New Messages Row Highlighter
// @namespace      http://www.inforall.net
// @description    This little script will change the background for the second, fourth, sixth row and so on for the New Messages section at the bottom of the page.
// @include        http://www.ipsf.co.il/forum/*
// ==/UserScript==

function alternateNewsRows()
{
	GM_log('entered function');
	var newsTable = document.getElementById('cybnp');
	var i;
	var Trows = newsTable.rows;
	GM_log('defined variables');
	
	for (i in Trows)
	{
		GM_log('entered first for');
		if (i != 0)
		{
			if((i % 2) == 0)
			{
				GM_log('entered if');
				var Tcells = Trows[i].cells;
				var j = 0;
				GM_log('defined second variables');
				for (j in Tcells)
				{
					GM_log('entered second for');
					Tcells[j].setAttribute('style', 'background: #c7d1da !important;');
					GM_log('changed style');
				}
			}
		}
	}
}

alternateNewsRows();