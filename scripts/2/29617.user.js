// ==UserScript==
// @name           SharedZilla SFMStudios Embed 2.0
// @namespace      sharedzilla.com
// @description    sharedzilla divx
// @include        http://sharedzilla.com/*
// ==/UserScript==

// ==UserScript==
// @name           SharedZilla SFMStudios Embed 3.0b
// @namespace      www.sharezilla.com
// @description    New SFMStudios Sharedzilla Generator BETA, Automatically embeds Sharedzilla DivX Videos
// @include        http://sharedzilla.com/en/get?id=*
// ==/UserScript==

// get links
title = document.getElementsByTagName("title");

if (title[0].innerHTML.indexOf("Download")>=0) 
{
	filename= document.getElementById("filename_text").innerHTML;
	if (filename.indexOf("avi") || filename.indexOf("divx"))
	{	
		document.forms[2].submit(); 
	}
	
}



a = document.getElementsByTagName("a");
if (document.location.href.indexOf("generatelinkdo")>0)
{
	// iterate through all links
	for(i=0; i<a.length; i++)
	{
	    // find continuation link and go to it
	    if(a[i].href.indexOf("sharedzilla.com/downloads/")>0)
	    {

		  theLink = a[i].href; 
	    }
	        
	
	}
	
	newBody="";
	
	// set up part of new page text
	
	newBody+="<center><body bgcolor='#000000'><font color='#4db4d8' size='+2'><b>SFMStudios Sharedzilla Generators</b> BETA</font><font color='#4db4d8' size='+1'><br><Br><form id='submitMe' method='get' action='http://www.sfmstudios.co.uk/sharedzilla-premium.php'><b>New Beta Generator</b> <input type='hidden' value='" + theLink + "' name='link' id='link'><input type='submit' id='submit' name='submit' value='Watch	'></form><br><form id='submitMe' method='get' action='http://www.sfmstudios.co.uk/divx.php'><B>Original Generator</b> <input type='hidden' value='" + theLink + "' name='link' id='link'><input type='submit' id='submit' name='submit' value='Watch'></form><br><form id='submitMe' method='get' action='http://www.sfmstudios.co.uk/sharedzilla-custom.php'><b>Custom Server (Advanced)</b> Server:<input type='text' size='1' id='s' name='s'> <input type='hidden' value='" + theLink + "' name='link' id='link'><input type='submit' id='submit' name='submit' value='Watch'></form></font></body></center>";
	javascript:document.getElementsByTagName("body")[0].innerHTML=newBody;
	document.forms[5].submit();
}