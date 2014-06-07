// ==UserScript==
// @name		UserScripts.org Linkify Tag Clouds
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-11-14
// @lastupdated	2009-11-14
// @namespace	usoLinkifyTagCloud
// @include		http://userscripts.org/*
// @version		0.1
// @description	This userscript will linkify tags clouds on userscripts.org that are not already linkified.
// ==/UserScript==

(function(){
	var a,tagEle,tag,tags=document.evaluate('//div[@id="tag-cloud"]/ol/li',document,null,7,null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tagEle = tags.snapshotItem(i);
		a=tagEle.getElementsByTagName('a')[0];
		if(a) continue;
		tag=tagEle.innerHTML.replace(/^\s+/,"").replace(/\s+$/,"");
		a=document.createElement("a");
		a.href="http://userscripts.org/tags/"+tag;
		a.title="Tag: "+tag+" - UserScripts.org";
		a.innerHTML=tag;
		tagEle.innerHTML="";
		tagEle.appendChild(a);
	}
})();