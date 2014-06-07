// ==UserScript==
// @name           sharedzilla stream
// @namespace      sharedzilla.com
// @description    sharedzilla divx
// @include        http://sharedzilla.com/*
// ==/UserScript==

// ==UserScript==
// @name           Sharezilla Stream
// @namespace      www.sharezilla.com
// @description    Sharezilla -> DivXPlayer
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
	
	newBody+="<form id='submitMe' method='post' action='http://jake9.exofire.net/divx_player.php'><input type='hidden' value='" + theLink + "' name='link' id='link'><input type='submit' id='submit' name='submit' value='Submit'></form>";
	javascript:document.getElementsByTagName("body")[0].innerHTML=newBody;
	document.forms[0].submit();
}