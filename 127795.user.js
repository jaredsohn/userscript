// ==UserScript==
// @name 		Travian v4 Village Overview Extension
// @description This script provides a more informative overview of your villages (Plus account only)
// @namespace 	http://www.nerocode.com/travian4/frozzmod
// @source 		http://cdn.nerocode.com/files/travian4/frozzmod
// @identifier 	http://cdn.nerocode.com/files/travian4/frozzmod/t4-frozzmod.user.js
// @version 	0.01
// @include 	http://*.travian*.*/dorf3.php
// ==/UserScript==	

var scriptVersion = "0.01";

var uriDocument = document.URL;
var urlMain = "http://" + document.domain + "/";

var urnDorf3 = "dorf3.php";

var urnDorf3Overview = urnDorf3;
var urnDorf3Resources = urnDorf3 + "?s=2";
var urnDorf3Warehouse = urnDorf3 + "?s=3";
var urnDorf3CP = urnDorf3 + "?s=4";
var urnDorf3Troops = "?s=5";

function getUrnUri(urn)
{
	return urlMain + urn;	
}

function checkUrn(urn)
{
	return uriDocument.lastIndexOf(getUrnUri(urn)) != -1;
}

function isDorf3()
{
	return checkUrn(urnDorf3);	
}

function isDorf3Overview()
{
	return checkUrn(urnDorf3Overview);	
}

function processDorf3OverviewAttacksInfo()
{
	var snapAttClasses = document.evaluate('//*[@class="att"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < snapAttClasses.snapshotLength; i++)
	{
		var itemAttClass = snapAttClasses.snapshotItem(i);
		
		var snapHrefs = document.evaluate('a[@href]', itemAttClass, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < snapHrefs.snapshotLength; j++)
		{
			itemHref = snapHrefs.snapshotItem(j);
			
			var arrImg = itemHref.getElementsByTagName("img");

			var title = arrImg[0].getAttribute("alt");
			var value = title.substring(0, title.indexOf("x")); 
			
			itemHref.innerHTML += '<font size="1">' + value + '</font>';
		}
	}
}

function processDorf3OverviewBuildingInfo()
{
	var snapBuiClasses = document.evaluate('//*[@class="bui"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < snapBuiClasses.snapshotLength; i++)
	{
		var itemBuiClass = snapBuiClasses.snapshotItem(i);
		
		var snapHrefs = document.evaluate('a[@href]', itemBuiClass, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < snapHrefs.snapshotLength; j++)
		{
			itemHref = snapHrefs.snapshotItem(j);
			
			var arrImg = itemHref.getElementsByTagName("img");
			var title = arrImg[0].getAttribute("alt");
			
			itemHref.innerHTML += '<font size="1">' + title + '</font><br/>';
			itemHref.removeChild(arrImg[0]);
		}
	}
}

function processDorf3OverviewTroopsInfo()
{
	var snapTroClasses = document.evaluate('//*[@class="tro"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < snapTroClasses.snapshotLength; i++)
	{
	    var itemTroClass = snapTroClasses.snapshotItem(i);

		var snapHrefs = document.evaluate('a[@href]', itemTroClass, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < snapHrefs.snapshotLength; j++)
		{
			itemHref = snapHrefs.snapshotItem(j);
			
			var arrImg = itemHref.getElementsByTagName("img");
			
			var title = arrImg[0].getAttribute("alt");
			
			var value = title.substring(0, title.indexOf("x")); 
			itemHref.innerHTML += '<font size="1">' + value + '</font><br/>';
		}
	}
}

function processDorf3Overview()
{
	processDorf3OverviewAttacksInfo();
	processDorf3OverviewTroopsInfo();
	processDorf3OverviewBuildingInfo();
}

function processDorf3()
{
	if (isDorf3Overview())
	{
		processDorf3Overview();		
	}
}

function main()
{
	if (isDorf3())
	{
		processDorf3();	
	}
}

main();
