// ==UserScript==
// @name           	BW-pie-Locator
// @namespace           http://test.brokenworlds.com
// @description	        Creates list of locations in upper right corner of screen
// @author        	Pietrovich and newWorm (mix MMM+Shenakim)
// @include         http://*.brokenworlds.com/render.php
// @include         http://brokenworlds.com/render.php
// @version             1.0.4
// ==/UserScript==

function onLoad()
{
	if (document.getElementById('mt')) return;

	var allLinks;
	allLinks = document.evaluate('//a[@href="entrance.php?do=moveout"]',unsafeWindow.document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if (0 != allLinks.snapshotLength)return;

	var b = unsafeWindow.document.getElementsByTagName('body')[0];
	var h = "";

	if ('undefined' != b) b.innerHTML+="<div id='pie_Locator'></div>";

	var j = unsafeWindow.document.getElementById("pie_Locator");
	if (!j)
	{
		alert('!j');
		 return;
	}
	var i = 0;
	var thisLink, node;
	node = null;
	allLinks = document.evaluate('//a[@class="obj_link"]/img',unsafeWindow.document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var t = "";
	var t2 = "";
	var entrances =  Array();
	var portals = Array();
	var mobs = Array();
	var flag = false;
	var RE;
	var isrc = "";
	var onmm = "";
	var onmo = "";
	var isrc = "";
	var splitter = "<!--piesplitter-->";

	for (i=0; i<allLinks.snapshotLength;i++)
	{
		RE = new RegExp('_(100|101|104|103|105|110)\.',"gi");
		node = allLinks.snapshotItem(i);
		t = node.getAttribute("onMouseMove");
		onmm = t;
		onmo = node.getAttribute("onMouseOut");
		isrc = node.getAttribute('src');
		flag = RE.test(isrc);
		t = t.split(",");
		t2 = t[0].split("'")[1];
		t = t[1].split("'")[1];
		h = node.parentNode.getAttribute('href');
		isrc = isrc.split("/").pop();
		isrc = isrc.split("_").pop();


		if (flag)
		{
			portals.push(new Array(t2,h,isrc,t,onmm,onmo).join(splitter));//="<a href='"+h+"'>"+t2+"</a></br>";

		}
		else
		{
			entrances.push(new Array(t,h,isrc,t2,onmm,onmo).join(splitter));//+="<a href='"+h+"'>"+t+"</a></br>";
		}
	}
	entrances.sort();
	portals.sort();
	var show_names = GM_getValue('bw_locator_showNames','checked') == 'checked';
	var monsters = false;
	var z;
	var k;
	var tmt;
	for (i=0; i<entrances.length;i++)
	{
		t = entrances[i].split(splitter);
		if (0<i && t2 != t[0]) j.innerHTML+="<div style='height:2px;font-size:1px;border-top: solid 1px #CCCCCC;margin-top:2px;margin-right:10px;'>&nbsp;</div>";
		t2 = t[0];
		try
		{
			monsters = '';
			monsters = t[4].toString().split(",");
			z=monsters[2].toString().slice(1);
			if (z.search("<img ")==-1){
 			 z = z.split("<br>");
			 for (k=0;k<z.length;k++)
			 {tmt=z[k].toString();
			  if (tmt.length>2) mobs.push(tmt);}
			}
			monsters = "''" != monsters[2] ? " class='monsters'" : "";
			
		}
		catch(exc){alert(exc)};
		isrc = "<a href='javascript:parent.GoTo(\""+t[1]+"\");void(0);' title='"+t[3]+"'";

		isrc+= ' onMouseMove="'+t[4]+'"';
		isrc+= ' onMouseOut="'+t[5]+'"';
		isrc+= monsters;
		isrc+= ">"+t[0]+"</a>";
		isrc+="</br>";

		j.innerHTML+= isrc;
	}
	j.innerHTML+= "<hr/>Portals:<br/>";
	for (i=0; i<portals.length;i++)
	{
		t = portals[i].split(splitter);
		isrc = "<a href='javascript:parent.GoTo(\""+t[1]+"\");void(0);' title='"+t[3]+"'";
		isrc+= ' onMouseMove="'+t[4]+'"';
		isrc+= ' onMouseOut="'+t[5]+'"';
		isrc+= ">"+t[0]+"</a></br>";
		j.innerHTML+= isrc;
	}
	j.innerHTML+= "<hr/>Mobs:"+mobs.length+"<br/>";
	mobs=mobs.sort();
	i=1; 
	for (z=1; z<mobs.length;z++)
	{
	 if (mobs[z]!=mobs[z-1]) 
		{ isrc="<b> "+mobs[z-1]+" </b>: "+i+"</br>";
		 j.innerHTML+=isrc;
		 i=0}
	 i+=1;	
	} 
	if (mobs.length>0) {isrc="<b> "+mobs[z-1]+" </b>: "+i+"</br>";
 			     j.innerHTML+=isrc;}
	 
}
window.addEventListener("load", onLoad, false);
GM_addStyle("#pie_Locator {position:absolute;bottom:2px;right:2px;border:solid 1px red;padding:5px; width:170px;background:white;}");GM_addStyle("#pie_Locator a {color: #000000;}");
GM_addStyle("#pie_Locator a.monsters {color: #CE0000;}");
