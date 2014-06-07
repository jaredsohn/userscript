// ==UserScript==
// @name        Facebook: Stop "Suggested Pages" from showing up in your newsfeed
// @namespace   http://userscripts.org/users/115601
// @description   Hides "Suggested Pages" from your newsfeed.
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @version     1.0
// ==/UserScript==

userScript_removeSuggestedItems();

document.addEventListener("DOMNodeInserted", userScript_removeSuggestedItems, false);

function userScript_removeSuggestedItems()
{
	var cssCode = ".removeSuggestedItemsHidden { height:5px;overflow:hidden;cursor:pointer; }";
	cssCode = cssCode + ".removeSuggestedItemsNoticed { background-color:#ffffff; }";
	
	var style = document.getElementById('userScript_removeSuggestedItems_element');
	
	if (!style)
	{
		style = document.createElement('style');
		style.id = 'userScript_removeSuggestedItems_element';
		style.innerHTML = cssCode;
		document.head.appendChild(style);
	}
	
	var children = document.getElementsByClassName('uiStreamStory');
	
	for (i=0;i<children.length;i++)
	{
		var child = children[i];

		if (!userScript_hasClass2(child,'removeSuggestedItemsChecked'))
		{
			if (child.innerHTML.indexOf(' · Suggested Page') != -1)
			{
				child.className = child.className + " removeSuggestedItemsNoticed removeSuggestedItemsHidden";
				child.onclick = userScript_removeSuggestedClass;
			}

			child.className = child.className + " removeSuggestedItemsChecked";
		}
		
	}
}

function userScript_hasClass2(element, cls) {
    var r = new RegExp('\\b' + cls + '\\b');
    return r.test(element.className);
}

function userScript_removeSuggestedClass() {

	this.className = this.className.replace('removeSuggestedItemsHidden','');
	this.onclick = '';

}


