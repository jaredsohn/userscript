// ==UserScript==
// @name           Instantaneous Redirect
// @namespace      Instantaneous Redirect
// @description    Remove the delay of the meta refresh by redirecting the page to the new url
// @include        *
// ==/UserScript==

instantaneousRedirect();

function instantaneousRedirect()
{
	var metas=document.getElementsByTagName("meta");
	for (var num1=0;num1<metas.length;num1++)
	{
		var meta1=metas[num1];
		var text1=meta1.getAttribute("http-equiv");
		if (text1!=null && text1.toLowerCase()=="refresh")
		{
			var array1=meta1.getAttribute("content").split(/;/g);
			var text1=array1[array1.length-1];
			var match1=/url=(.+)/gmi.exec(text1);
			if (match1!=null && document.location.href.indexOf(match1[1])==-1) 
			{
				GM_log("Instantaneous redirect to "+match1[1]);
				document.location.replace(match1[1]); 
				break;
			}
		}
	}
}