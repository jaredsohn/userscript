// ==UserScript==
// @name           outlaw yotube trailer
// @namespace      ;)
// @author         jang (xlvxjang)
// @version        0.11b
// @description    Links uz Youtube traileriem
// @include        http://*newoutlaw.org/details.php?id=*
// ==/UserScript==

var titleID = document.getElementsByTagName("title")[0];
title = titleID.innerHTML;
title = title.split('"')[1];
title = title.replace(/\'/g, "");
title = title.replace(/\"/g, '');
title = title.replace(/\./g, ' ');
var url = 'http://www.youtube.com/results?search_query=' + encodeURIComponent( title ) + '+trailer&search_type=&aq=f';
url = url.replace(/\%20/g, '+');

try
  {  
	var row = document.evaluate("//td[@class='rowhead']", document, null, 9, null).singleNodeValue.parentNode;
	row.parentNode.innerHTML += '<tr><td class="heading" valign="top" align="right"><img src="http://bildites.lv/images/7uywy6omlwml7pua5suo.png" border="0"></td><td valign="top" align="left"><a href="' + url + '" target="_BLANK">Youtube</a></td></tr>';
  }
catch(err)
  {		
  }

