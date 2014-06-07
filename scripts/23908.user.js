// ==UserScript==
// @name           Photo's of Last 5 Viewer
// @author	http://www.orkut.com/Profile.aspx?uid=3557419226107758391
// @namespace      http://orkutsharing.blogspot.com/
// @description    Shows the photo of the last 5 persons who saw your (UP-TO-DATE) profile
// @include        http://www.orkut.com/Home.aspx*
// ==/UserScript==


function photopoker()
{
d=document.body.innerHTML;
var uid=[];
var photo=[];
var nick=[];
var nlink=[];
var p=0;
var yy=0;
	for(var i=0;i<document.links.length;i++)
 {
  if(String(document.links[i]).match(/Profile.aspx.uid=\d+/) && document.links[i].innerHTML.match(/\n/))
  {
  nlink[p]=i;
  uid[p]=String(document.links[i]).match(/\d+/)
  nick[p]=document.links[i].innerHTML.replace(/\n/gi,'');
  p++;
  yy=1;
}
}

if(yy==0){return;}
var dln=document.links[nlink[0]].parentNode;
var u=0;
function getphoto()
{
 	GM_xmlhttpRequest
 	(
		{
      		method: 'GET',
      		url: 'http://www.orkut.com/AlbumView.aspx? uid='+uid[u],
       		onload: function(responseDetails)
   		{
		xml=responseDetails.responseText
   		photo[u]=new String(xml.match(/.+medium.+/gi));
   		photo[u]=photo[u].replace(/medium/,'small').replace(/.+(Images3.orkut.com.+jpg).+/,'$1');
    		if(photo[u]=='null')
    		{
    		photo[u]="http://images3.orkut.com/img/pt-BR/i_nopicsmall.gif"
		}
    		else
    		{
    		photo[u]="http://"+photo[u]
		}

		rep='<div style="float:left;width:85px;"><a href=\"Profile.aspx?uid='+uid[u]+'"><img src='+photo[u]+' border=0><br>'+nick[u]+'</a></div>'
   	if(u==0)
   	{
   	rep='<table width="100%"><tr><td><font size="1">'+rep
	}
   	if(u==4)
   	{
   	rep=rep+'</font></tr></td></table>'
	}
    	if(photo[u]!=null)
    	{
    	dln.innerHTML=dln.innerHTML.replace(/\<a href="\/Profile.aspx.uid=\d+.+\n.+\n.+/,rep)
	}
   	u++;
	if(u<5)
    	{
    	getphoto();
	}
       }
     }
   );
}
getphoto();
};

photopoker();