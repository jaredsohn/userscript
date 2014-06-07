// ==UserScript==
// @name           Warchaos+
// @namespace      http://warchaos.ru
// @include        http://warchaos.ru/f/a
// ==/UserScript==

var i=0;
var el,str;

var res=new Array();

i=0;str="";
while(el=document.getElementsByTagName("button").item(i))
{
	if(el.parentNode.getAttribute("background") && el.parentNode.getAttribute("background").indexOf("ctrl/slot1.gif")!=-1)
	{
		res[el.firstChild.getAttribute("src").substr(el.firstChild.getAttribute("src").lastIndexOf("/")+1,el.firstChild.getAttribute("src").lastIndexOf(".gif")-el.firstChild.getAttribute("src").lastIndexOf("/")-1)]=parseInt(el.parentNode.innerHTML.substr(el.parentNode.innerHTML.lastIndexOf("<br>")+4,el.parentNode.innerHTML.lastIndexOf("</button>")-el.parentNode.innerHTML.lastIndexOf("<br>")-4));
	}
	i++;
}
if(!res[204]){res[204]=0;}
if(!res[214]){res[214]=0;}
if(!res[224]){res[224]=0;}
if(!res[234]){res[234]=0;}
if(!res[284]){res[284]=0;}

i=0;str="";
while(el=document.getElementsByTagName("input").item(i))
{
	if(el.id.indexOf("buy")!=-1)
	{
		str="<br>";
		str+="<a class='userAnchor' href='javascript:void(0);' onClick='if(parseInt(this.parentNode.firstChild.value)>0){this.parentNode.firstChild.value=parseInt(this.parentNode.firstChild.value)-1;}'>-1</a>";
		str+=" <a class='userAnchor' href='javascript:void(0);' onClick='this.parentNode.firstChild.value=\"0\";'>min</a>";
		var max=el.parentNode.previousSibling.previousSibling.lastChild.innerHTML;
		var cost=new Array();
		var el2=el.parentNode.previousSibling.firstChild;
		while(el2)
		{
			if(el2 && el2.nodeName=="IMG")
			{
				cost[el2.getAttribute("src").substr(el2.getAttribute("src").lastIndexOf("/")+1,el2.getAttribute("src").lastIndexOf(".gif")-el2.getAttribute("src").lastIndexOf("/")-1)]=parseInt(el2.nextSibling.nodeValue);
			}
			el2=el2.nextSibling;
		}
		if(!cost[204]){cost[204]=0;}if(cost[204]==0 && res[204]==0){res[204]=1;}
		if(!cost[214]){cost[214]=0;}if(cost[214]==0 && res[214]==0){res[214]=1;}
		if(!cost[224]){cost[224]=0;}if(cost[224]==0 && res[224]==0){res[224]=1;}
		if(!cost[234]){cost[234]=0;}if(cost[234]==0 && res[234]==0){res[234]=1;}
		if(!cost[284]){cost[284]=0;}if(cost[284]==0 && res[284]==0){res[284]=1;}
		max=Math.min(res[204]/cost[204],res[214]/cost[214],res[224]/cost[224],res[234]/cost[234],res[284]/cost[284],max);
		str+=" <a class='userAnchor' href='javascript:void(0);' onClick='this.parentNode.firstChild.value="+max+";'>max</a>";
		str+=" <a class='userAnchor' href='javascript:void(0);' onClick='if(parseInt(this.parentNode.firstChild.value)<parseInt(this.parentNode.previousSibling.previousSibling.lastChild.innerHTML)){this.parentNode.firstChild.value=parseInt(this.parentNode.firstChild.value)+1;}'>+1</a>";
		str+="<style>.userAnchor{color:rgb(255,145,46);}.userAnchor:hover{color:red;text-decoration:none;}</style>";
		el.parentNode.setAttribute("align","center");
		el.parentNode.innerHTML+=str;
	}
	i++;
}

i=0;str="";
while(el=document.getElementsByTagName("button").item(i))
{
	if(el.innerHTML.length==5)
	{
		var j=0,el2;
		while(el2=document.images[j])
		{
			if(el2.parentNode.parentNode.parentNode.nodeName=="TR" && !el2.getAttribute("rc") && el2.src.indexOf("q.gif")==-1)
			{
				el=document.createElement("img");
				el.setAttribute("src","q.gif");
				el.setAttribute("class","qq");
				el.setAttribute("onClick","hlp("+el2.src.substr(el2.src.lastIndexOf("/")+1,el2.src.lastIndexOf(".")-el2.src.lastIndexOf("/")-2)+");");
				el2.parentNode.insertBefore(el,el2.parentNode.firstChild.nextSibling);
				j++;
			}
			j++;
		}
		break;
	}
	i++;
}