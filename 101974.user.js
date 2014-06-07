// ==UserScript==
// @name           LtUaE in 3D
// @namespace      LtUaE in 3D
// @description    LtUaE in 3D
// @include        http://www.gamefaqs.com/boards/402-life-the-universe-and-everything/*
// ==/UserScript==

document.getElementsByClassName = function(sClass)
{
	var aData = new Array();
	var oClassRegExp = new RegExp("\\b" + sClass + "\\b");
	var aItems = this.getElementsByTagName("*");
	var sName = "";
	for ( var i = 0; i < aItems.length; i++ )
	{
		sName = aItems[i].className;
		if ( oClassRegExp.test(sName) )
		{
			aData.push(aItems[i]);
		}
	}
	return aData;
};

aStats = document.getElementsByClassName("msg_stats");
aMsgs = document.getElementsByClassName("msg_body");

for ( var i = 0; i < aStats.length; i++ )
{
	aStats[i].style.color = "rgba(0, 255, 255, 0.5)";
	aStats[i].style.textShadow = "rgba(255, 0, 0, 0.5) -4px 0px 0px";
	aStats[i].style.paddingLeft = "4px";
	
	
	aMsgs[i].style.color = "rgba(0, 255, 255, 0.5)";
	aMsgs[i].style.textShadow = "rgba(255, 0, 0, 0.5) -4px 0px 0px";
	aMsgs[i].style.paddingLeft = "4px";
}