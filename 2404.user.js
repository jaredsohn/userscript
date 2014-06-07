// ==UserScript==
// @name          Embed-O-Matic
// @namespace     http://www.devever.net/akx/
// @description   Download those videos.
// @include       *
// ==/UserScript==

eomStyleDef="<style>"+
"#embedomatic{opacity:0.7;position:fixed;text-align:right;right:0px;top:0px;z-index:50;border:2px ridge #484;background:#6a6;font-size:9pt;font-family:arial,sans-serif;padding:2px;color:#fff}"+
"#embedomatic a{color:#fff;textt-decoration:none}"+
"#embedomatic ul{display:none;padding:0;margin:0}"+
"#embedomatic li{padding:0;margin:0;list-style-type:none}"+
"#embedomatic:hover>ul{display:block !important}"+
"#embedomatic:hover{opacity:1}"+
"</style>";

eomHtml1=eomStyleDef+"<div id='embedomatic'><b>Embed-O-Matic</b><ul>";
eomItemHtml="<li><a href='%url%'>%urlf%</a></li>";
eomHtml2="</ul></div>";

function EmbedOMatic()
{
  var goodTags=new Array("object","embed","bgsound");
  var links=new Array();

  var objs=new Array();

  for(i=0;i<goodTags.length;i++)
  {
	  o1=document.getElementsByTagName(goodTags[i]);

	  for(a=0;a<o1.length;a++)
	  {
	   objs.push(o1[a]);
	  }
  }

  for(i=0;i<objs.length;i++)
  {
  	if(objs[i].src) links.push(objs[i].src);
  	if(objs[i].href) links.push(objs[i].href);
  }
  //alert("lnks: "+links.length);

  if(links.length>0)
  {
    eom = document.createElement("div");
    h=eomHtml1;
    for(i=0;i<links.length;i++)
    {
     url=links[i];
     urlf=links[i].split("/");
     urlf=urlf[urlf.length-1];
     h+=eomItemHtml.replace("%url%",url).replace("%urlf%",urlf);
    }
    h+=eomHtml2;
    eom.innerHTML=h;
    document.body.insertBefore(eom, document.body.firstChild);
  }
}

EmbedOMatic();