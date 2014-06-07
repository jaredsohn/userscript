// ==UserScript==
// @name        Facebook: Stop strangers' items from showing up in your newsfeed
// @namespace   http://userscripts.org/users/115601
// @description   Hides newsfeed items from strangers that show up in your news feed because your friends liked or commented on them. Shows a thick line instead, click on the line to show the item. Shares, comments on your friends' posts, etc. should all still show up ok. 
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @version     1.0
// ==/UserScript==

userScript_removeStrangerItems();

document.addEventListener("DOMNodeInserted", userScript_removeStrangerItems, false);

function userScript_removeStrangerItems()
{
	var cssCode = ".removeStrangerItemsHidden { height:5px;overflow:hidden;cursor:pointer; }";
	cssCode = cssCode + ".removeStrangerItemsNoticed { background-color:#f1f2f6; }";
	
	var style = document.getElementById('userScript_removeStrangerItems_element');
	
	if (!style)
	{
		style = document.createElement('style');
		style.id = 'userScript_removeStrangerItems_element';
		style.innerHTML = cssCode;
		document.head.appendChild(style);
	}
	
	var children = document.getElementsByClassName('uiStreamStory');
	
	for (i=0;i<children.length;i++)
	{
		var child = children[i];

		if (!userScript_hasClass2(child,'removeStrangerItemsChecked'))
		{
			if (child.innerHTML.indexOf('uiStreamEdgeStoryLine') != -1)
			{
				if (child.innerHTML.indexOf('commented on a') != -1 | child.innerHTML.indexOf('likes a') != -1)
				{
					child.className = child.className + " removeStrangerItemsNoticed removeStrangerItemsHidden";
					child.onclick = userScript_removeStrangerClass;
				}
			}

			child.className = child.className + " removeStrangerItemsChecked";
		}
		
	}
}

function userScript_hasClass2(element, cls) {
    var r = new RegExp('\\b' + cls + '\\b');
    return r.test(element.className);
}

function userScript_removeStrangerClass() {

	this.className = this.className.replace('removeStrangerItemsHidden','');
	this.onclick = '';

}


