// ==UserScript==
// @name          Mad Money
// @namespace     http://www.karpach.com
// @description   Clear Mad Money
// @include       http://www.madmoneyrecap.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
function Swap (width)
{
	var content = $("td[width='" + width + "']>p").clone();
	if (content.length>0)
	{
		var styles = "<style>p { text-align:left;} #pager a { padding:5px;background-color:gray; } #pager { width:200px;height:20px;position:fixed;top:50%;left:100px;background-color:white;padding:20px 10px;} #content {width:800px;background-color:white;margin:0 auto;padding:10px;}</style>";
		var numbers = '';
		var signature = /_(\d*)_/.exec(window.location);
		if (signature != null)
		{
			signature = signature[1];
			for (i=1;i<=6;i++)
			{
				numbers+="<a href='" + ((window.location)+'').replace(/_\d*_\d/g,'_' + signature + '_' + i) + "'>" + i + "</a> ";
			}
		}			
		$('body').html(styles + "<div id='pager'>Pages:&nbsp;&nbsp;&nbsp;" + numbers + "</div><div id='content'></div>");
		$('#content').html(content);
	}
}
$('title').html('Recap');
Swap(348);
Swap(550);
Swap(551);
