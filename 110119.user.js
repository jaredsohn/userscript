// ==UserScript==
// @name           smallGC
// @namespace      GC
// @include        http://www.geocaching.com/seek/*
// ==/UserScript==

// Get single element using xpath
$=function(expr,node){
	if (node===undefined) node=document;
	var res=document.evaluate(expr,node,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null);
	if (res.singleNodeValue===null) return null; // throw(new Error("Error: no result '"+expr+"'"));
	return res.singleNodeValue;
}

// Get list of elements using xpath
$$=function(expr,node){
	if (node===undefined) node=document;
	var res=document.evaluate(expr,node,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var a=new Array();
	for(var i=0;i<res.snapshotLength;i++)a[i]=res.snapshotItem(i);
	return a;
}

// Create and append a new element
add=function(nodetype,node,pars){
	var e=document.createElement(nodetype);
	if (nodetype=="a" && pars.href===undefined) pars.href="javascript:;";
	for (p in pars) {
		if(p=="html")e.innerHTML=pars[p];
		if(p=="class")e.className=pars[p];
		else if (p=="click") e.addEventListener("click",pars[p],false);
		else e[p]=pars[p];
	}
	node.appendChild(e);
	return e;
}

// Remove an element
remove=function(e){
	e.parentNode.removeChild(e);
}

grab=function(el){
	if (el) return el.innerHTML.replace(/\s+/gm," ");
	else return "";
}

// Collect data

// Code of the cache, for example: GC123GH.
var code = grab($("id('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode')"));
GM_log("code:"+code);
if (code.substring(0,2)=="GC")  {

// Name of the cache.
var name = grab($("id('cacheDetails')"));
GM_log("name:"+name);

// Generic information of the cache.
var diff = grab($("id('ctl00_ContentBody_uxLegendScale')"));
var terr = grab($("id('ctl00_ContentBody_Localize6')"));
var img = grab($("//span[@class='minorCacheDetails']/img/.."));
var fav = grab($("//*[@class='favorite-value']"));
details1 = "Difficulty: " + diff + " Terrain: " + terr + " Size: " + img + " Popularity: " + fav + "<br/>";
GM_log("details1:"+details1);

// Location of the cache.
var details2 = grab($("id('ctl00_ContentBody_LatLon')/.."));
GM_log("details2:"+details2);

// The description texts.
var short = grab($("id('ctl00_ContentBody_ShortDescription')"));
GM_log("short:"+short);
var long = grab($("id('ctl00_ContentBody_LongDescription')"));
GM_log("long:"+long);

// The hint, if any.
var hint = grab($("id('div_hint')"));
if (hint) hint = "<tt>HINT: "+hint+"</tt>";
GM_log("hint:"+hint);

// Attributes (such as 'can take dog with you')
// Remove the empty ones first.
var noattr=$$("//div[@id='ctl00_ContentBody_detailWidget']/div[@class='WidgetBody']/img[@title='blank']");
for (i in noattr) { remove(noattr[i]); }
//remove($("//div[@class='CacheDetailNavigationWidget BottomSpacing']/div[@class='WidgetBody']/p[@class='NoBottomSpacing']"));

var attr = $$("//div[@id='ctl00_ContentBody_detailWidget']/div[@class='WidgetBody']");
for (i in attr) { attr[i] = grab(attr[i]); }
var attr = attr.join("");
GM_log("attr:"+attr);

// Get the waypoint table
var wp = grab($("id('ctl00_ContentBody_Waypoints')"));
if (wp) wp = '<table id="ctl00_ContentBody_Waypoints" class="Table">'+wp+'</table>';
GM_log("wp :"+wp);

// How often was it found.
var find_cnt = grab($("id('ctl00_ContentBody_lblFindCounts')"));
GM_log("find_cnt :"+find_cnt);

// merge data into single line.
var line = '<div id="cacheDetails" class="span-17 last BottomSpacing">'+name+' ID: <a href="'+document.location+'">'+code+'</a></div>'+details1+details2+find_cnt+
	"<div class=\"CacheDetailNavigationWidget Spacing\">"+attr+"</div>"+short+long+wp+hint+"\n";

GM_setValue(code,line);
document.body.innerHTML = line;

GM_registerMenuCommand("Remove", function() {
	GM_deleteValue(code);
});
//var q = $("id('ctl00_ContentBody_CacheName')");
//q.innerHTML="<textarea>"+html+"</textarea>";

}

GM_registerMenuCommand("View List", function() {
	list = [];
	var keys = GM_listValues()
	for (var i in keys) {
		var val = keys[i];
		var rm = ''; //'<a href="javascript:" id="rm_'+val+'" class="noprint" style="border: 1px solid black;">remove</a>';
		list.push('<div id="ent_'+val+'">' + rm + GM_getValue(val) + '</div>');
	}
	document.body.innerHTML = list.join("<hr/>");
	/*GM_addStyle("@media print {\
		.noprint {display:none !important;}\
	}");*/
	function addRemoveAction(val) {
		var el = document.getElementById("rm_"+val); 
		el.addEventListener("click", function() {
			GM_deleteValue(val);
			var ent = document.getElementById("ent_"+val);
			remove(ent.nextSibling); 
			remove(ent); 
		}, false);
	}
	
	for (var i in keys) {
		var val = keys[i];
		addRemoveAction(val);
	}
});
