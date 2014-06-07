// ==UserScript==
// @name           NSG Cache Checker
// @namespace      http://dosensuche.de
// @description    Link auf NSG Cache Checker
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// @include        http://www.terracaching.com/viewcache.cgi?*
// ==/UserScript==
// Author: guido.wegener@gmx.de angepasst thomas@bornhaupt.de

GM_log("start");

var re=/(N\s*\d+\s*°?\s+\d+\.\d+'?\s*)([eo]\s*\d+\s*°?\s+\d+\.\d+)/gi;

var wp;

if(document.URL.match(/geocaching.com/)) doGC();

else if(document.URL.match(/terracaching.com/)) doTC();



function doGC() {

	var mapSpan=document.getElementById("ctl00_ContentBody_MapLinks_MapLinks");
	var gmUrl=mapSpan.firstChild.firstChild.getAttribute("href");
	var filter=/\?lat=(.*)&lng=(.*)/;
	filter.exec(gmUrl);
	var lng=RegExp.$2;
	var lat=RegExp.$1;

	var span=document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode");
	wp=span.firstChild.data;
	filter=/^\s*(\w+)\s*$/;
	filter.exec(wp);

	wp=RegExp.$1;

	GM_log(wp+": "+lng+" - "+lat+" (= "+d2dm(lng,"%B0")+" - "+d2dm(lat,"%B0")+")");


	var mapSpan=document.getElementById("ctl00_ContentBody_MapLinks_MapLinks");
	var li=document.createElement("li");
	var a=document.createElement("a");
	a.href="http://www.nsg-atlas.de/index.php?lat="+d2dm(lat,"%B0")+"&lon="+d2dm(lng,"%B0")+"&WP="+wp;
	a.target="_blank";
	var txt=document.createTextNode("NSG Cache Checker");
	a.appendChild(txt);
	li.appendChild(a);
	mapSpan.appendChild(li);

	span.style.cssText="display:none";
	var newa=document.createElement("a");
	newa.appendChild(document.createTextNode(wp));
	newa.setAttribute("href","http://www.nsg-atlas.de/index.php?lat="+d2dm(lat,"%B0")+"&lon="+d2dm(lng,"%B0")+"&WP="+wp);
	newa.style.cssText="text-decoration:none";
	newa.target="_blank";

	var p=span.parentNode.parentNode;

	p.insertBefore(newa,p.firstChild);

	var LongDis=document.getElementById("ctl00_ContentBody_LongDescription");
    walkTree(LongDis);
    var Waypoints=document.getElementById("ctl00_ContentBody_Waypoints");
    walkTree(Waypoints);
}



function doTC() {

	GM_log("TC");

	var lat=getElementByClassName("span","latitude");

	var lon=getElementByClassName("span","longitude");

	var wps=document.getElementsByName("waypoint_id");

	if(wps[0]) {

		wp=wps[0].value;

		GM_log(lat.firstChild.data+"/"+lon.firstChild.data+" - "+wp);

		var td=getElementByClassName("div","geo").parentNode;

		var newa=document.createElement("a");

		newa.setAttribute("href","http://www.nsg-atlas.de/index.php?lat="+lat.firstChild.data+"&lon="+lon.firstChild.data+"&WP="+wp);

		newa.style.cssText="text-decoration:none";

		newa.target="_blank";

		var fc=td.firstChild;

		while(fc) {

			td.removeChild(fc);

			newa.appendChild(fc);

			fc=td.firstChild;

		}

		td.appendChild(newa);

	}

	var genmed=getElementByClassName("span","genmed");

	var hint=document.getElementById("encrypted_hint");

	if(hint) {

		GM_log("logged in");

		var tbody=hint.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

		var usertd=tbody.getElementsByTagName("td")[0];

		walkTree(usertd);

	} else {

		GM_log("not logged in");

		var table=genmed.parentNode.getElementsByTagName("TABLE")[2];

		GM_log(table);

		walkTree(table);

	}

}



function getElementByClassName(tagName,className) {

	var nodes=document.getElementsByTagName(tagName);

	for(var i=0;i<nodes.length;i++) {

		if(nodes[i].getAttribute("class")==className) {

			return nodes[i];

		}

	}

	return null;

}



function walkTree(n) {

	if(n.tagName && n.tagName.toLowerCase()=='a') return;

	for(var i=0;i<n.childNodes.length;i++) {

		walkTree(n.childNodes[i]);

	}

	if(n.data) {

//		GM_log(n.data);

		var str=n.data;

		var pos;

		var prefix;

		while((pos=str.search(re))>-1) {

			var rawlat=RegExp.$1;

			var rawlng=RegExp.$2;

			var coords=rawlat+rawlng;

			var len=coords.length;

			prefix=str.slice(0,pos);

			var postfix=str.substr(pos+len);

			str=postfix;

			n.parentNode.insertBefore(document.createTextNode(prefix+coords+" "),n);

			var lat=rawlat.replace(/°/g," ");

			var lng=rawlng.replace(/°/g," ");

			var a=document.createElement("a");

			a.setAttribute("href","http://www.nsg-atlas.de/index.php?lat="+lat+"&lon="+lng+"&WP="+wp);
	        a.target="_blank";

//			a.appendChild(document.createTextNode(coords));

			var img=document.createElement("img");

			img.setAttribute("src","http://www.nsg-atlas.de/mm_20_nsg.png");

			img.setAttribute("alt","NSG");

			img.setAttribute("border","0");

			img.setAttribute("align","absmiddle");

			a.appendChild(img);

			n.parentNode.insertBefore(a,n);

		}

		n.parentNode.insertBefore(document.createTextNode(str),n);

		n.parentNode.removeChild(n);

	}

}



function d2dm(degrees,separator) {

	var sign=degrees<0?"-":"";

	degrees=Math.abs(degrees);

	var d=Math.floor(degrees);

	var m=(degrees-d)*60;

	return sign+d+separator+m.toFixed(3);

}