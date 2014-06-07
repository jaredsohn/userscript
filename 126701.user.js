// ==UserScript==
// @name           echo.msk.ru unclutter
// @namespace      echo.msk.ru
// @include        http://echo.msk.ru/*
// ==/UserScript==

function removeChildrenIf(parent, pred)
{
	var child = parent.firstChild;
	while(child != null)
	{
		next = child.nextSibling;
				
		if(pred(child))
		{
			parent.removeChild(child);
		}
		
		child = next;
	}
}

function isAComment(node)
{
	if(node.tagName != undefined)
	{
		if(node.hasAttribute("class"))
		{
			var clss = node.getAttribute("class");
			if(-1 != clss.indexOf("omment") || -1 != clss.indexOf("advt"))
			{
				return true;
			}
		}
	}
	
	return false;
}

var container = document.getElementById("container");
container.style.width = "100%";
removeChildrenIf(container.parentNode, function(n) { return n != container; });

var mainWrap = document.getElementById("mainWrap");
for(var i = 0; i < mainWrap.childNodes.length; ++i)
{
	var child = mainWrap.childNodes[i];
	if(child.tagName != undefined)
	{	
		if(child.getAttribute("class") == "block1")
		{
			child.style.width = "100%";
			removeChildrenIf(child, isAComment);
		}
		else if(child.getAttribute("class") == "block2")
		{
			mainWrap.removeChild(child);
			break;
		}
	}
}
