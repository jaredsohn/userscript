01	// ==UserScript==
02	 
03	// @name          Test
04	 
05	
06	 
07	// @description   Testing out something.
08	 
09	// @include       *
10	 
11	// ==/UserScript==
12	 
13	 
14	 
15	var div id="pagecontent"
 = document.getElementsByTagName('div id="pagecontent"
');
16	 
17	for (i=0; i<div id="pagecontent"
.length; i++)
18	 
19	{
20	 
21	  div id="pagecontent"
[i].style.visibility = 'hidden';
22	 
23	}