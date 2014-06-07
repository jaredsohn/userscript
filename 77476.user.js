// ==UserScript==
// @name           BvS Wiki Price Graphs
// @namespace      Garyzx
// @description    Inserts links into the BvS Wiki to graph the prices of tradable items.
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        1.00
// @history        1.00 Initial version
// @include        http://bvs.wikidot.com/items:*
// ==/UserScript==

try{
	ScriptUpdater.check(77476, "1.00");
} catch(e) {}

var item=document.getElementById("page-title").innerHTML;
while(item.charAt(0)==" " || item.charAt(0)=="\t" || item.charAt(0)=="\n")
	item=item.substring(1);
while(item.charAt(item.length-1)==" " || item.charAt(item.length-1)=="\t")
	item=item.substring(0, item.length-1);

var tradable=false;
if(document.body.innerHTML.indexOf("is tradable")!=-1 ||
		document.body.innerHTML.indexOf("is tradeable")!=-1 ||
		document.body.innerHTML.indexOf("is trade able")!=-1 ||
		document.body.innerHTML.indexOf("Trade able: Yes")!=-1 ||
		item.indexOf("Ash-")!=-1)
	tradable=true;

var ul=document.getElementById("toc2").nextSibling.nextSibling;
if(item.indexOf("Ash-")!=-1){
	var node=document.getElementById("toc2");
	var h2=document.createElement("h2");
	h2.innerHTML="<span>Market Value</span>";
	node.parentNode.insertBefore(h2, node);
	ul=document.createElement("ul");
	node.parentNode.insertBefore(ul, node);
}

function showGraph(name, days){
	name=unescape(name);
	var div = document.getElementById("graphDiv");
	div.innerHTML="";
	var object=document.createElement("object");
	object.type="image/svg+xml";
	d=new Date();
	d.setDate(d.getDate()-days);
	object.data="http://bvs-garyzx.appspot.com/bvs/marketplacegraph.svg?item="+name+"&starttime="+Math.floor(d.getTime()/60000)+"&scale=0.65";
	div.appendChild(object);
}
unsafeWindow.showGraph=showGraph;

if(tradable){
	item=escape(item);
	var div=document.createElement("li");
	div.innerHTML="<a href='javascript:showGraph(\""+item+"\", 31)'>Graph last month</a><br/>";
	div.innerHTML+="<a href='javascript:showGraph(\""+item+"\", 7)'>Graph last week</a><br/>";
	div.innerHTML+="<a href='javascript:showGraph(\""+item+"\", 1)'>Graph last day</a>";
	ul.appendChild(div);
	div=document.createElement("div");
	div.id="graphDiv";
	ul.appendChild(div);
}