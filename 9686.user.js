// ==UserScript==
// @name           EBay change reply link
// @namespace      EBay
// @description    Change the reply link into ebay MyMessage
// @include        http://my.ebay.*/ws/eBayISAPI.dll*
// ==/UserScript==

var regexp=new RegExp("\\.ebay\\.(\\w{2,3})");
var replace=".ebay."+regexp.exec(window.location)[1];

var links=document.getElementsByTagName("a");
for(var num1=0;num1<links.length;num1++)
{
	var link=links[num1];
	if (link.href) link.href=link.href.replace(regexp,replace);
	var onclick=link.getAttribute("onclick");
	if (onclick) link.setAttribute("onclick",onclick.replace(regexp,replace));
}

var forms=document.getElementsByTagName("form");
for(var num2=0;num2<forms.length;num2++)
{
	var form=forms[num2];
	if (form.action) form.action=form.action.replace(regexp,replace);
}

var inputs=document.getElementsByTagName("input");
for(var num3=0;num3<inputs.length;num3++)
{
	var input=inputs[num3];
	if (input.type=="button" || input.type=="submit" || input.type=="image")
	{
		var onclick=input.getAttribute("onclick");
		if (onclick) input.setAttribute("onclick",onclick.replace(regexp,replace));
	} 
}