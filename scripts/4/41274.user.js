// ==UserScript==
// @name           Deviant and Deviation link revealer
// @namespace      http://scripts.namdx1987.net/
// @description    This script will reveal link of any deviation found in the current page
// @include        http://*.deviantart.com/*
// ==/UserScript==

window=unsafeWindow;
document=window.document;

var console={};
function doNothing(){};

if(window.console.log)
	console.log=window.console.log;
else
	console.log=doNothing;




function DeviantArtPage()
{
	var collection=document.getElementsByClassName("tt-a");

	var parentArray=[];
	var i;
	for(i=0;i<collection.length;i++)
	{
		if(parentArray.indexOf(collection[i].parentNode)==-1)
			parentArray.push(collection[i].parentNode);
		try
		{
			DeviantArtPage.processThumbnailBlock(collection[i]);
		}
		catch(e)
		{
			console.log("error found!!!");
			console.log(collection[i]);
			console.log(e);
		}
	}
	for(i=0;i<parentArray.length;i++)
		parentArray[i].addEventListener("DOMNodeInserted", DeviantArtPage.onThumbnailBlockBeingInserted, true);

	var stream=document.getElementById("browse2-stream");
	if(stream)
	{
		var adBlock=document.evaluate("./div[@class!='tt-a']", stream, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		adBlock.style.display="none";
		var iframes=document.getElementsByTagName("iframe");
		for(i=0;i<iframes.length;i++)	
			iframes[i].style.display="none";
	}
	var footer=document.getElementById("footer-pane-channels");
	if(footer)
	{
		footer.addEventListener('DOMNodeInserted', DeviantArtPage.onFooterChange,true);
		var footerThumbnailData=document.getElementById("footerThumbData");
		footerThumbnailData.style.height="auto";
	}
	
};

DeviantArtPage.DATE_SPLIT_PATTERN=/,/i;
DeviantArtPage.DEVIANT_SPLIT_PATTERN=/\s+by\s+/i;
DeviantArtPage.CATEGORY_SPLIT_PATTERN=/\s+in\s+/i;

DeviantArtPage.DATE_JOIN_GLUE=",";
DeviantArtPage.CATEGORY_JOIN_GLUE=" in ";
DeviantArtPage.DEVIATION_THUMBNAIL_PATTERN=/\/150\//;
DeviantArtPage.DEVIATION_SERVER_PATTERN=/http:\/\/th/;

DeviantArtPage.DEVIATION_SERVER_REPLACE="http://fc";
DeviantArtPage.DEVIATION_THUMBNAIL_REPLACE="/";

DeviantArtPage.MAIN_SPAN_PATH="./span[@class='tt-w']";
DeviantArtPage.THUMBNAIL_PATH="./span/a/img";


DeviantArtPage.processThumbnailBlock=function(thumbnailBlock)
{
 	if(thumbnailBlock.tagName.toLowerCase()!="div"&&thumbnailBlock.className.toLowerCase()!="tt-a")
	 	throw new Error("Invalid block");
	
	var mainSpan=document.evaluate(DeviantArtPage.MAIN_SPAN_PATH, thumbnailBlock, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var thumbnail=document.evaluate(DeviantArtPage.THUMBNAIL_PATH, mainSpan, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var thumbnailAnchor=thumbnail.parentNode;
	
	
	var splitArray=thumbnailAnchor.title.split(DeviantArtPage.CATEGORY_SPLIT_PATTERN);
	splitArray.pop();
	var deviationTitle=splitArray.join(DeviantArtPage.CATEGORY_JOIN_GLUE);
	
	splitArray=deviationTitle.split(DeviantArtPage.DATE_SPLIT_PATTERN).shift().split(DeviantArtPage.DEVIANT_SPLIT_PATTERN);
	
	var deviationShortTitle=splitArray.shift();
	var deviantName=splitArray.join(DeviantArtPage.DATE_JOIN_GLUE);
	var deviantSymbol=deviantName[0];
	
	deviantName=deviantName.substring(1, deviantName.length);
	
	if(!deviantName)
		return;
	
	while(thumbnailAnchor.parentNode.nextSibling)
		mainSpan.removeChild(thumbnailAnchor.parentNode.nextSibling);
		
	
	var deviationLink=thumbnail.src.replace(DeviantArtPage.DEVIATION_THUMBNAIL_PATTERN, DeviantArtPage.DEVIATION_THUMBNAIL_REPLACE).replace(DeviantArtPage.DEVIATION_SERVER_PATTERN, DeviantArtPage.DEVIATION_SERVER_REPLACE);
	
	var lowerAnchor=document.createElement("a");
	var newLine=document.createElement("br");
	var infoLine=document.createElement("small");
	var deviantAnchor=document.createElement("a");
	
	lowerAnchor.className="t";
	lowerAnchor.textContent=deviationShortTitle;
	lowerAnchor.title=deviationTitle;
	lowerAnchor.href=thumbnailAnchor.href;
	
	deviantAnchor.textContent=deviantName;
	deviantAnchor.href="http://"+deviantName+".deviantart.com/";
	
	infoLine.textContent="by "+deviantSymbol;
	
	thumbnailAnchor.href=deviationLink;
	
	infoLine.appendChild(deviantAnchor);
	
	mainSpan.appendChild(lowerAnchor);
	mainSpan.appendChild(newLine);
	mainSpan.appendChild(infoLine);
};

DeviantArtPage.onThumbnailBlockBeingInserted=function(evt)
{
	try
	{
		DeviantArtPage.processThumbnailBlock(evt.target);
	}
	catch(e)
	{
		console.log(e);
	}
};

DeviantArtPage.onFooterChange=function(evt)
{
	var node=evt.target;
	if(node.id=="footerThumbData")
	{
		node.style.height="auto";
		for(var i=0;i<node.childNodes.length;i++)
			try
			{
				DeviantArtPage.processThumbnailBlock(node.childNodes[i]);
			}
			catch(e)
			{
				console.log(e);
			}
	}
	
};

new DeviantArtPage();
