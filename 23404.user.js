// ==UserScript==
// @name           Flyupload Link Get
// @namespace      www.flyupload.com
// @description    get flyupload direct link
// @include        http://*.flyupload.com/get?fid=*
// ==/UserScript==

// get links


a = document.getElementsByTagName("a");
t = document.getElementsByTagName("td");

theLink = "";

var filenameposition;
var filename;

for (i=0;i<t.length;i++)
{
   if (t[i].innerHTML=="Filename:")
	filenameposition = i+1;

   if (i == filenameposition)
	filename = t[i].innerHTML;
}
	


if (   (filename.indexOf(".divx") > 0) || (filename.indexOf(".avi") >0)     ) { 
	
	// iterate through all links
	for(i=0; i<a.length; i++)
	{
	    // find continuation link and go to it
	    if(a[i].innerHTML=="Continue to Download")
	    {
	        b=a[i].href;
		  c = b.split("URL=");
		  d = c[1].split("&c=");
		  theLink = d[0]; 
	    }
	        
	
	}
	
	newBody="";
	
	// set up part of new page text
	
	newBody+="<form id='submitMe' method='post' action='http://jake9.exofire.net/divx_player.php'><input type='hidden' value='" + theLink + "' name='link' id='link'><input type='submit' id='submit' name='submit' value='Submit'></form>";
	javascript:document.getElementsByTagName("body")[0].innerHTML=newBody;
	document.forms[0].submit();
}