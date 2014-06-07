// ==UserScript==
// @name          Diggholder
// @description	  Mark the last Digg article read.
// @include       http://www.digg.com/
// @include       http://digg.com/
// @include       http://www.digg.com/index/page*
// @include       http://digg.com/index/page*
// ==/UserScript==
// TODO(mateo): i dunno...make it so you dont need to refresh to get rid of the outline on the reset digg?
//Digg holder type script, by Mateo, the bored programmer.
  window.addEventListener(
    'click',
    function (e) {
	ourDigg = e.target;
	//e.preventDefault();
	if (ourDigg.tagName == 'A' && ourDigg.parentNode.tagName != 'SPAN' && ourDigg.getAttribute("href").indexOf("/users/")==-1 && ourDigg.getAttribute("id")!="jaskdoekafsf423fas")
	{
	if (e.target.firstChild.data == "digg it" || e.target.firstChild.data.indexOf("diggs")!=-1) 
		{
		parentId = e.target.parentNode.getAttribute("id");
		idNum = (parentId.indexOf("diglink")!=-1) ? parentId.split("diglink")[1] : parentId.split("main")[1];
		ourDigg = document.getElementById("title"+idNum);
		}
	if (typeof(ourDigg.getAttribute("class")) == "object"){
	while (ourDigg.getAttribute("class") != "news-body")
	{
	ourDigg = ourDigg.parentNode;
	}
	pageIndex = ourDigg.childNodes[1].getAttribute("id").split("title")[1] ;
	pageNumber = (document.location.toString().indexOf("/page")!=-1)? document.location.toString().split("/page")[1] : 0;
	diggIndex = parseInt(pageIndex) + (pageNumber*15);
	diggRef = ourDigg.childNodes[7].childNodes[1].href;
	if (GM_getValue("diggRef") && GM_getValue("diggIndex"))
	{
		if (GM_getValue("diggIndex")>diggIndex) 
			{
			GM_setValue("diggIndex",diggIndex); 
			GM_setValue("diggRef",diggRef);
			lastDuggLI = document.createElement("SPAN");
			lastDuggLI.setAttribute("class","tool");
			lastDuggLI.appendChild(document.createTextNode("Last Digg Dugg"));
			lastDuggLI.style.color = "red";
			lastDuggLI.style.fontWeight = "bold";
			ourDigg.childNodes[7].appendChild(lastDuggLI);
			ourDigg.style.background = "#F5F7FA url(/img/google-back-99.png) 0 0 no-repeat";
			}
	}
	else 	
		{
		GM_setValue("diggRef",diggRef);
		GM_setValue("diggIndex",diggIndex);
		lastDuggLI = document.createElement("SPAN");
		lastDuggLI.setAttribute("class","tool");
		lastDuggLI.appendChild(document.createTextNode("Last Digg Dugg"));
		lastDuggLI.style.color = "red";
		lastDuggLI.style.fontWeight = "bold";
		ourDigg.childNodes[7].appendChild(lastDuggLI);
		ourDigg.style.background = "#F5F7FA url(/img/google-back-99.png) 0 0 no-repeat";
		}
	}
	}
	
    },
    false
  );
if (!isNaN(parseInt(GM_getValue("diggIndex"))) && GM_getValue("diggRef")!="")
{
for (x=0;x<15;x++) 
	{
	oldRef = GM_getValue("diggRef").split(".com/")[1];
	newRef = document.getElementById("main"+x).firstChild.href.split(".com/")[1];
	if (newRef == oldRef)
		{
		document.getElementById("enclosure"+x).style.background = "#F5F7FA url(/img/google-back-99.png) 0 0 no-repeat";
		lastDuggLI = document.createElement("SPAN");
		lastDuggLI.appendChild(document.createTextNode("Last Digg Dugg"));
		lastDuggLI.setAttribute("class","tool");
		lastDuggLI.style.color = "red";
		lastDuggLI.style.fontWeight = "bold";	
		document.getElementById("title"+x).parentNode.childNodes[7].appendChild(lastDuggLI);
		}
	}
//<li><a href="/tos">Terms of Use</a></li>
resetLI = document.createElement("LI");
resetA = document.createElement("A");
resetA.appendChild(document.createTextNode("Reset Last Digg Dugg"));
resetA.setAttribute("href","javascript:void(0)");
resetA.setAttribute("id","jaskdoekafsf423fas");
resetA.addEventListener(
    'click',
    function (e) {
	GM_setValue("diggIndex",""); 
	GM_setValue("diggRef","");
	resetLinkThing = document.getElementById("jaskdoekafsf423fas");
	resetLinkThing.removeChild(document.getElementById("jaskdoekafsf423fas").firstChild);	
	resetLinkThing.style.fontWeight = "bold";
	resetLinkThing.appendChild(document.createTextNode("SUCCESSFULLY RESET [refresh needed (cuz im lazy)]"));
	},
	false);
resetA.style.color="red";
resetLI.appendChild(resetA);
document.getElementById("footer").firstChild.appendChild(resetLI);
}
