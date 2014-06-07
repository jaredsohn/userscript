// ==UserScript==
// @name       Mantis Attachment Killer
// @version    0.75
// @include     http://*mantis*/view.php?id=*
// @include     https:/*mantis*/view.php?id=*
// @description  Open picture on click in mantisbt
// @copyright  2014+, Łukasz 'PerSOft' Malicki
// ==/UserScript==

var items = document.body.getElementsByTagName('a');
for (item in items)
{
	if(item < items.length && items[item] != null)
	{ 
		if(items[item].getElementsByTagName('img').length == 1)
		{ 
			if(items[item].getElementsByTagName('img')[0].src.indexOf("file_show_inline_token=") != -1)
			{ 
				items[item].href = items[item].getElementsByTagName('img')[0].src;
			}
		}
	}
}