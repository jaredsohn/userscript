// ==UserScript==
// @name          sharepoint fix expand
// @namespace     
// @description   fix expanf functionality for sharepoint pages
// @include       *intranet*
// ==/UserScript==

myExpGroupBy = function (formObj)
{
	docElts = document.getElementsByTagName('*');
	numElts = docElts.length;
	img = formObj.wrappedJSObject.target
	srcPath = img.src;
	index = srcPath.lastIndexOf("/");
	imgName = srcPath.slice(index+1);
	if (imgName =='plus.gif')
	{
		fOpen = true;
		displayStr = "block";
		img.src = '/_layouts/images/minus.gif';
	}
	else
	{
		fOpen = false;
		displayStr = "none";
		img.src = '/_layouts/images/plus.gif';
	}
	oldName = img.name;
	img.name = img.alt;
	img.alt = oldName;
	spanNode = img;
	while(spanNode != null)
	{
		spanNode = spanNode.parentNode;
		if (spanNode != null &&
			spanNode.id != null &&
			spanNode.id.length > 5 &&
			spanNode.id.substr(0, 5) == "group")
			break;
	}
	parentNode = spanNode;
	while(parentNode != null)
	{
		parentNode = parentNode.parentNode;
		if (parentNode != null &&
			parentNode.tagName == "TABLE")
			break;
	}
	lastNode = null;
	if (parentNode != null)
	{
		lastNode = parentNode.lastChild;
		if (lastNode != null && lastNode.tagName == "TBODY")
			lastNode = lastNode.lastChild;
		if (lastNode != null && lastNode.tagName == "TR" && lastNode.lastChild != null)
			lastNode = lastNode.lastChild;
	}
	for(var i=0;i<numElts;i++)
	{
		var childObj = docElts[i];
		if (childObj == spanNode)
			break;
	}
	ID = spanNode.id.slice(5);
	for(var j=i + 1; j<numElts; j++)
	{
		var childObj = docElts[j];        
		if (childObj.id.length > 5 &&
			childObj.id.substr(0, 5) == "group")
		{
			curID = childObj.id.slice(5);
			if (curID <= ID)
				return;
		}
		if (childObj != img && 
			childObj.tagName=="IMG" &&
			childObj.src && 
			childObj.src.slice(childObj.src.length - 25) == '/_layouts/images/plus.gif')
		{
			childObj.src = '/_layouts/images/minus.gif';
			oldName = childObj.name;
			childObj.name = childObj.alt;
			childObj.alt = oldName;
		}
		if (childObj.tagName == spanNode.tagName &&
			childObj.id != "footer")
		{
			childObj.style.display = displayStr;
		}
		if ((childObj.tagName == "TABLE" && lastNode == null) || childObj == lastNode)
			break;
	}
}

window.fixpage = function()
{
	docElts = document.getElementsByTagName('a');
	numElts = docElts.length;
	for(var i=0;i<numElts;i++)
	{
		var aElmnt = docElts[i];
		if (aElmnt.attributes[0].nodeValue == "javascript:ExpGroupBy(this);return false;")
		{
			aElmnt.addEventListener("click", myExpGroupBy, true);
		}
	}
}

window.addEventListener(
    'load', 
    window.fixpage(),
    true);
	
