// ==UserScript==
// @name           RR_Cook_helper
// @namespace      rr_cook_helper
// @description    人人餐厅助手
// @include        http://mapps.renren.com/rr_cook/wap.do?*
// ==/UserScript==
var a=20;
for(i=0;i<document.links.length;i++)
{
	var x=document.links[i];	
	if(x.href.indexOf('updateStam')!=-1)
	{
	start=x.href.indexOf('stam=');
	end=x.href.indexOf('&',start);
	power=x.href.substring(start+5,end);
	level=x.href.substring(end+17,end+18);
	if(power>=100-25*level-a && power<125-25*level-a){window.location=x.href};//55-80,30-55,5-30
	}
}