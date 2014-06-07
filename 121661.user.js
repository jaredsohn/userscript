// ==UserScript==

// @name          TeamLiquid StreamFix (reddit edition).

// @namespace     http://pallkarsia.net

// @description   A Greasemonkey script that places livestream icons in front of the names or something. 

// @include       http://*teamliquid.net/*

// @version 1.3.37
// ==/UserScript==

var derp=document.getElementById("streams_content");

var all=derp.getElementsByTagName("*");

var tempp=document.createElement("img");
var thing = document.getElementById("streams_refresh_icon");
thing.onclick=undefined;
thing.style.cursor="default";
thing.style.width="0px";
for(var i=0;i<all.length;i++)
{		
	
	var boks=document.createElement("p");
	boks.style.position="relative";
	boks.style.width="130px";
	boks.style.height="0px";
	boks.style.overflow="visible";
	//boks.style.borderStyle="solid";
	boks.style.margin="0px";
	boks.style.padding="0px";
	boks.id="derp";
	if(i+1<all.length)
		if(all[i].hasAttribute("title"))
		{
			
			//all[i].innerHTML=all[i].getAttribute("title");
			var newthing=document.createElement("span");
			newthing.style.float="left";
			newthing.style.width="11px";

			var node1=all[i].cloneNode(true);
			var info=document.createElement("span");
			var s=all[i].getAttribute("title").split(" ")[1];
			if(s==undefined)s="?";
		
		
			info.innerHTML=s;
			info.style.width="10px";
			info.style.height="5px";
			info.style.position="absolute";
		
			//info.style.marginRight="5px";
			info.style.margin="0px";
			info.style.padding="0px";
			//info.style.right="1px";
			//info.style.display="inline";
			info.style.left="100%";
			info.style.overflow="visible";
			info.style.float="right";
			info.style.fontSize="xx-small";
			newthing.style.fontSize="xx-small";
		
			
			if((all[i+1].tagName)==tempp.tagName){
			
			
				newthing.appendChild(all[i+1].cloneNode(true));
				boks.style.zIndex="1000";
				boks.appendChild(all[i+1].cloneNode(false));
				all[i].style.marginLeft="0px";
				boks.appendChild(all[i].cloneNode(true));
				boks.appendChild(info);
				
				all[i+1].style.display="none";
				all[i].parentNode.replaceChild(boks,all[i]);				
				i+=2;
				
			
			}else
			{
				if(!all[i].hasAttribute("onclick")){
				
						newthing.innerHTML="[?]";
						boks.appendChild(newthing);
						boks.appendChild(all[i].cloneNode(true));
						boks.appendChild(info);
						all[i].parentNode.replaceChild(boks, all[i]);
						i+=3;
					
				}
			}
		}
}