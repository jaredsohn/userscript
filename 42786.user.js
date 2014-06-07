// ==UserScript==
// @name           Join Tribalwars
// @namespace      http://www.tribalwars.net/
// @include        *
// ==/UserScript==
	
	function getDave()
	{
	a=document.getElementsByTagName("a");
	for (i=0;i<a.length;i++)
		{
		a[i].href="http://www.tribalwars.net/register.php";
		}
	}
	getDave();
