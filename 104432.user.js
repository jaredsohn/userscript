// ==UserScript==
// @name           CS2 Own Ship Distances
// @namespace      CS
// @description    shows on the 'My Ships' page the raw distance to your ships.
// @include        http://*.chosenspace.com/index.php?go=ships*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
function getTile2D(ArrayPosition){
	var X=ArrayPosition%20;
	var Y=((ArrayPosition-X)/20)+1;
	var Coordinate={"x":X,"y":Y};
	return(Coordinate);}
var allTags,thisTag;
allTags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thisTag=allTags.snapshotItem(0);
if(thisTag){
	var current,target,start,end,dist,ttext,hj,ls,gs;
	current=thisTag.getAttribute("onclick").split("system_id=")[1].split("&")[0];
	var startSys=getTile2D(current);
	current=thisTag.getAttribute("onclick").split("sector_id=")[1].split("&")[0];
	var startSec=getTile2D(current);
	current=thisTag.getAttribute("onclick").split("grid_id=")[1].split("'")[0];
	var startGrd=getTile2D(current);
	allTags=document.evaluate("//a[@href[contains(.,'view=sector') and contains(.,'system_id') and contains(.,'sector_id') and contains(.,'grid_id')] and preceding::text()[contains(.,' - ')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	check:for(var i=0;i < allTags.snapshotLength;i++){
		hj=false;ls=false;gs=false;
		thisTag=allTags.snapshotItem(i);
		target=thisTag.getAttribute("href").split("system_id=")[1].split("&")[0];
		end=getTile2D(target);
		if((end.x==startSys.x)&&(end.y==startSys.y)){
			target=thisTag.getAttribute("href").split("sector_id=")[1].split("&")[0];
			end=getTile2D(target);
			if((end.x==startSec.x)&&(end.y==startSec.y)){
				target=thisTag.getAttribute("href").split("grid_id=")[1].split("&")[0];
				end=getTile2D(target);
				start=startGrd;gs=true;
			}else{start=startSec;ls=true;}
		}else{start=startSys;hj=true;}
		dist=Math.max(Math.abs(end.x-start.x),Math.abs(end.y-start.y));
		if((dist!=0)&&(!isNaN(dist))){
			ttext=thisTag.textContent+" {";
			if(hj){ttext+="HJ-"+dist+"}"}
			else if(ls){ttext+="LS.S-"+dist+"}"}
			else if(gs){ttext+="LS.G-"+dist+"}"}
		}else{ttext=thisTag.textContent+' {Here}';}
		thisTag.textContent=ttext;
	}
}
