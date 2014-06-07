// ==UserScript==
// @name          Newgrounds Download Link
// @namespace     http://xt-8147.tripod.com
// @description	  Puts a download link onto all Newgrounds content pages
// @include       http://newgrounds.com/portal/view/*
// @include       http://www.newgrounds.com/portal/view/*
// ==/UserScript==

var url="",as,hitheretomfulp,hsixes,i,instertarea="notfound";

//new code to get the download link
as=document.getElementsByTagName("a");
for(i=0;i<as.length;i++)
{if(as[i].getAttribute("href")=="#")
 {hitheretomfulp=as[i].getAttribute("onclick");
  if(hitheretomfulp.substring(0,19)=="movie_viewer.Launch")
  {hitheretomfulp=hitheretomfulp.split(",");
   hitheretomfulp=hitheretomfulp[1];
   url=hitheretomfulp.substring(1,hitheretomfulp.length-1);
   break;
  }
 }
}

//insert the download link right below the link to view the flash
hsixes=unsafeWindow.document.getElementsByTagName("h6");
for(i=0;i<hsixes.length;i++)
{if(hsixes[i].className="download")
 {insertarea=hsixes[i];
  break;
 }
}

if(insertarea=="notfound")
 alert("Newgrounds Download Link Error!  Insert point not found.  Newgrounds probably changed their layout AGAIN.");
else
 insertarea.innerHTML+=" | <a href=\""+url+"\" title=\"Right click, Save Link As, Enjoy\">Download</a>";