// ==UserScript==
// @name        Remove Ads from News Feed in Facebook
// @namespace   com.rawdust.removefb
// @description Removes sponsered items in the News Feed
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @version     1.1
// ==/UserScript==



userScript_removeSponsored();

document.addEventListener("DOMNodeInserted", userScript_removeSponsored, false);

function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements)
}

function userScript_removeSponsored()
{
	var arStoryContents = getElementsByClassName(document, 'div', 'clearfix.storyContent');	
	for (var i = 0; i< arStoryContents.length; i++)
	{	
	
		var child = arStoryContents[i];
		if (child)
		{
				
			var aruiStreamFooter= getElementsByClassName(child, 'span', 'uiStreamFooter');

			for (var j = 0; j< aruiStreamFooter.length; j++)
			{

			
				var footer_content = aruiStreamFooter[j].innerHTML;

				if (footer_content.length > 0)
				{
			
					if (footer_content.indexOf("Sponsored") != -1) 
					{
						child.style.display = 'none';
					}
				}
			}
		
		}
	}
	

}

