/*
Geocaching.com modified - 01/09/2009
Copyright (c) 2009, Team Mithrandir2

This script modifies the geocaching.com page to make it better.

Direct Maps on Geocaching.com
Tag: User-Javascript, Greasemonkey, Geocaching.com, Opera, Firefox

*/

// ==UserScript==
// @name          Direct Maps on Geocaching.com
// @include       http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==


(function() {

function isfirefox()
{
   if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) return(true);

   return(false);
}

function adjustbrowser(tag)
{
   if (isfirefox())
   {
      tag=tag.replace("<B>", "<b>");
      tag=tag.replace("</B>", "</b>");

      tag=tag.replace("<SMALL>", "<small>");
      tag=tag.replace("</SMALL>", "</small>");

      tag=tag.replace("<STRONG>", "<strong>");
      tag=tag.replace("</STRONG>", "</strong>");

      tag=tag.replace("<EM>", "<em>");
      tag=tag.replace("</EM>", "</em>");

      tag=tag.replace("<SMALL>", "<small>");
      tag=tag.replace("</SMALL>", "</small>");

      tag=tag.replace("<SPAN", "<span");
      tag=tag.replace("</SPAN>", "</span>");

      tag=tag.replace("<TABLE", "<table");
      tag=tag.replace("</TABLE>", "</table>");

      tag=tag.replace("<DIV", "<div");
      tag=tag.replace("</DIV>", "</div>");

      tag=tag.replace("<INPUT", "<input");
      tag=tag.replace("<FONT", "<font");
      tag=tag.replace("<A ", "<a ");
      tag=tag.replace("</A>", "</a>");

      tag=tag.replace("<BR>", "<br>");
      tag=tag.replace("type=\"submit\" ", "");
   }

   return (tag);
}

function MyRemove(string, tag1)
{
   tag1 = adjustbrowser(tag1);

	pos1 = string.indexOf(tag1, 0);
	if (pos1!=-1)
	{
      string = string.substr(0,pos1) + string.substr(pos1+tag1.length);
	}

	return (string);
}

//Removes tag1, tag2 and everything in between
function MyReplace(string, tag1, tag2)
{
   tag1 = adjustbrowser(tag1);
   tag2 = adjustbrowser(tag2);

	pos1 = string.indexOf(tag1, 0);

	if (pos1!=-1)
	{
		pos2 = string.indexOf(tag2, pos1);
		if (pos2!=-1)
		{
			string = string.substr(0,pos1) + string.substr(pos2+tag2.length);
		}
	}

	return (string);
}

function MyReplaceWithBetween(string, tag1, tag2, replacewith)
{
   tag1 = adjustbrowser(tag1);
   tag2 = adjustbrowser(tag2);

	pos1 = string.indexOf(tag1, 0);

   //alert(tag1+"=>".pos1);

	if (pos1!=-1)
	{
		pos2 = string.indexOf(tag2, pos1);
		if (pos2!=-1)
		{
			string = string.substr(0,pos1) + replacewith + string.substr(pos2+tag2.length);
		}
	}

	return (string);
}

function MyExtract(string, tag1, tag2)
{
   tag1 = adjustbrowser(tag1);
   tag2 = adjustbrowser(tag2);

	pos1 = string.indexOf(tag1, 0);
	if (pos1!=-1)
	{
		pos2 = string.indexOf(tag2, pos1);
		if (pos2!=-1)
		{
			return (string.substr(pos1+tag1.length, pos2-pos1-tag1.length));
		}
	}

	return ("");
}

//window.n=function()
function gcmain()
{
	html = document.body.innerHTML;

   

   jeeeplink = MyExtract(html, "http://www.mapquest.com/maps/map.adp?searchtype=address&", "zoom=10");
   jeeeplinkx = MyExtract(jeeeplink, "latitude=", "&");
   jeeeplinky = MyExtract(jeeeplink, "longitude=", "&");
   idotx=jeeeplinkx.indexOf(".", 0);
   idoty=jeeeplinky.indexOf(".", 0);
   jeeeplinkx = jeeeplinkx+String("000000").substr(0,6-(jeeeplinkx.length-idotx-1));
   jeeeplinky = jeeeplinky+String("000000").substr(0,6-(jeeeplinky.length-idoty-1));
   jeeeplinkx2 = String(jeeeplinkx).replace(".", "");
   jeeeplinky2 = String(jeeeplinky).replace(".", "");

   googlemap = "";
   googlemap = googlemap+"<table border=0 cellspacing=0 cellpadding=0><tr><td><img src=http://maps.google.com/mapdata?Point=b&Point.latitude_e6="+jeeeplinkx2+"&Point.longitude_e6="+jeeeplinky2+"&Point.iconid=15&Point=e&latitude_e6="+jeeeplinkx2+"&longitude_e6="+jeeeplinky2+"&zm=37800&w=280&h=243&cc=us&min_priority=1>"
   googlemap = googlemap+"<img src=http://maps.google.com/mapdata?Point=b&Point.latitude_e6="+jeeeplinkx2+"&Point.longitude_e6="+jeeeplinky2+"&Point.iconid=15&Point=e&latitude_e6="+jeeeplinkx2+"&longitude_e6="+jeeeplinky2+"&zm=7800&w=280&h=243&cc=us&min_priority=1>"
   googlemap = googlemap+"<img src=http://maps.google.com/mapdata?Point=b&Point.latitude_e6="+jeeeplinkx2+"&Point.longitude_e6="+jeeeplinky2+"&Point.iconid=15&Point=e&latitude_e6="+jeeeplinkx2+"&longitude_e6="+jeeeplinky2+"&zm=1300&w=280&h=243&cc=us&min_priority=1></td>"
   googlemap = googlemap+"</tr></table>"
   googlemap = googlemap+"<div><iframe width=0 height=0></iframe><iframe width=840 height=600 src='http://wikimapia.org/#y="+jeeeplinkx2+"&x="+jeeeplinky2+"&z=18&l=5&m=a&v=2'></iframe></div>";

   //alert(googlemap);

	html = MyReplaceWithBetween(html, "<FONT size=\"2\" face=\"Verdana\"><B>Logged Visi", "ts (</B>", googlemap+"<br><FONT face=\"Verdana\" size=\"2\"><B>Logged Visits (</B>") //+"<br><SPAN id=\"LargeMap\"><A")
	html = MyReplaceWithBetween(html, "<FONT face=\"Verdana\" size=\"2\"><B>Logged Visi", "ts (</B>", googlemap+"<br><FONT face=\"Verdana\" size=\"2\"><B>Logged Visits (</B>") //+"<br><SPAN id=\"LargeMap\"><A")

   
   
	document.body.innerHTML = html;
}

//document.addEventListener('load',function(e) {window.n();}, false);   
if (isfirefox()) gcmain();
else             document.addEventListener('load',function(e) {gcmain();}, false);   

})();