// ==UserScript==
// @name          Cheap Book Finder Script
// @description	  Greasemonkey and UW Bookstore = Cheaper Books
// @homepage      http://userscripts.org/
// @include       *.bookstore.washington.edu*
// ==/UserScript==



function getVal(input)
{
	switch (input)
	{
		case 'R0lGODlhCQALALMAAAAAAFFgp////6fj///jp+P/////46dgUf/GhYXG/wAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAJAAsAAAQiUMhJBTkgjGlOEkhQSIQodJtlouR6pOXInh5okphWyVUvRAA7':
			return 0;
		case 'R0lGODlhCQALALMJAP///6fj////46dgYAAAAOOnYOP//zNgpzMzYP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAJAAsAAAQiMIFJQZJAjDAvKAjCWZg2etnWlSo5mevbemB4GKigr1ffRwA7':
			return 1;
		case 'R0lGODlhCQALALMAAP///wAAAOP//zNgp///xv/GhcaFM+OnYIVgpzOFxqfj/2AzM4XG///jpzMzYAAAACH5BAAAAAAALAAAAAAJAAsAAAQiEMhJgXHLqUmQEMUgVEA3VkdChud0iJWhVk2GOUxFtOQUAQA7':
			return 2;
		case 'R0lGODlhCQALALMAAP/ZnFFQm5zZ/wAAAK9zW///////48b//+P//wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAJAAsAAAQisMhJCwkjiGkIMkBwVEWIUEB2kuFYdVsZSK3UYRplGDZZRQA7':
			return 3;
		case 'R0lGODlhCQALALMIAP//4///xmCn4+OnYMaFM4XG/wAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAJAAsAQAQiEJ1JD5KUFCuHOBqXGds1GCgqXGx7UUH4goWMeJNd6dWERAA7':
			return 4;
		case 'R0lGODlhCQALALMAAJbV/wAAAJxsc////8aFM8b////jp2Azhf//4///xgAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAJAAsAAAQicMhJBznhHDAJRwjlVdKVcVRoHAWZCOgrre2ACNiWhmQfAQA7':
			return 5;
		case 'R0lGODlhCQALALMAAOOnYIUzYGBgp4XG/+P////jp///xgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAJAAsAAAQiEMlJJQhHUCBINYFXFRg2TEWHgCeSikCLBCc7gQdd7bwUAQA7':
			return 6;
		case 'R0lGODlhCQALALMIAP//xsaFM4Uzhf/jp8b//2Cn4wAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAJAAsAAAQiEJ1JD0JDGC3KrYBAfFRQWNIUEmh5tkfGwib1ZRVZoVffRwA7':
			return 7;
		case 'R0lGODlhCQALALMAAIUzhYUzYIXG////xsb//6fj///jpwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAJAAsAAAQiEMlJkQkniDlCsQAhDSFCitKVfVNplNYmaaln2nUmV3wfAQA7':
			return 8;
		case 'R0lGODlhCQALALMAAP/Sk1Gc2VU8jAAAAKdgUf///8b//6fj////3OOnYAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAJAAsAAAQisMhJCxBDmHn35QFSIMQhdVI5JZggmBMiaxUZUEl2VyPvRwA7':
			return 9;
		return null;
	}
}
var hasDrawn = false;
function draw(isbns)
{
	if (hasDrawn)
		return;
	else
		hasDrawn = true;
	var i = 0;
	var w = document.createTreeWalker(document.body, unsafeWindow.NodeFilter.SHOW_ELEMENT, null, false);
	while (w.nextNode())
	{
		if (w.currentNode.nodeName == "TD" &&
			w.currentNode.getAttribute("class") == "smallbodytext" &&
			w.currentNode.getAttribute("colspan") == "2" &&
			w.currentNode.getAttribute("align") == "left" &&
			w.currentNode.getAttribute("valign") == "bottom"
		)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			tr.appendChild(td);
			td.setAttribute("colspan", 3);
			var iframe = document.createElement('iframe');
			iframe.setAttribute("width", 580);
			iframe.setAttribute("height", 175);
			iframe.setAttribute("frameborder", "1");
			var isbn = "";
			for (var j = 0; j < isbns[i].length; j++) 
			{
				isbn += isbns[i][j];
			}
			i++;
			iframe.src = 'http://www.walkingtextbook.com/book/getbestprices_f/?isbn=' + isbn;
			
			td.appendChild(iframe);
			w.currentNode.parentNode.parentNode.insertBefore(td, w.currentNode.parentNode);
		
		}
	}
}

var urls = new Array(); // 2d array of urls. [i] is book # [i][j] is url # in order.
var isbns = new Array();
var walker = document.createTreeWalker(document.body, unsafeWindow.NodeFilter.SHOW_ELEMENT, null, false);

function getInfo(data, response, urls, isbns) {

	var isbn_digit = getVal(data);
	for (var i = 0; i < urls.length; i++)
	{
		for (var j = 0; j < urls[i].length; j++)
		{
			if (urls[i][j] == response.finalUrl)
				isbns[i][j] = isbn_digit;
		}
		
	}
	var s = "";
	var hasUndef = false;
	for (var i = 0; i < isbns.length; i++)
	{
		for (var j = 0; j < isbns[i].length; j++)
		{
			if (isbns[i][j] == null)
				hasUndef = true;
			s += isbns[i][j];
		}
		s += ",";		
	}
	if (!hasUndef)
		draw(isbns);
}
// it is looking like we will need two traversals. one to calculate and one to replace.
while (walker.nextNode())
{
	if (walker.currentNode.nodeName == "TD" &&
		walker.currentNode.getAttribute("class") == "smallbodytext" &&
		walker.currentNode.getAttribute("colspan") == "2" &&
		walker.currentNode.getAttribute("align") == "left" &&
		walker.currentNode.getAttribute("valign") == "bottom"
	)
	{
		var sub_walker = document.createTreeWalker(walker.currentNode, unsafeWindow.NodeFilter.SHOW_ELEMENT, null, false);
		var isbn = "";
		var ul = new Array();
		var is = new Array();
		is.length = 13;
		isbns.push(is);
		urls.push(ul);
		while (sub_walker.nextNode())
		{
			if (sub_walker.currentNode.nodeName == "IMG")
			{
				var src = sub_walker.currentNode.getAttribute("src");
				ul.push(src);
			}
		}		
	}
}
// fetch data:
for (var i = 0; i < urls.length; i++)
for (var j = 0; j < urls[i].length; j++) 
{
{
	GM_xmlhttpRequest({method: 'GET',
	  url: urls[i][j],
	  overrideMimeType: 'text/plain; charset=x-user-defined',
	  onload: function(response) { 
		var data = "";
		for ( var j = 0, jl = response.responseText.length; j < jl; j++ )
		      data += String.fromCharCode( ( response.responseText[ j ].charCodeAt(0) & 0xff ) );
		    // Convert raw data to base64.
		    data = btoa( data );
			GM_log(data);
		    getInfo(data, response, urls, isbns);
	  }
	});
}
}