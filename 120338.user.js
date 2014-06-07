// ==UserScript==
// @match http://highered.mcgraw-hill.com/*
// @include http://highered.mcgraw-hill.com/*
// @name Mcgraw-Hill Embed Fixer
// @run-at document-end
// ==/UserScript==
var embeds = document.getElementsByTagName('embed');
//alert("Running"); 
for (i=0; i<embeds.length; i++)
//for (i=0; embed=null; embed=embeds[i]; i++)
        
{
  var url =  embeds[i].src; 
  embeds[i].type="application/x-shockwave-flash";
  var flashvars="mp3=" + url;
  embeds[i].width="200"; 
  embeds[i].height="25";
  embeds[i].src="http://prac-gadget.googlecode.com/svn/branches/dewplayer.swf" + "?" + flashvars;

}

