// ==UserScript==
// @name        Facebook: Stop "Personalized Game Suggestions" from showing up in your newsfeed
// @namespace   http://userscripts.org/users/115601
// @description   Hides "Personalized Game Suggestions" from your newsfeed.
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @version     1.0
// ==/UserScript==

userScript_removeGameRecommendations();

document.addEventListener("DOMNodeInserted", userScript_removeGameRecommendations, false);

function userScript_removeGameRecommendations()
{
	var cssCode = ".removeGameRecommendationsHidden { height:5px;overflow:hidden;cursor:pointer; }";
	cssCode = cssCode + ".removeGameRecommendationsNoticed { background-color:#ffffff; }";
	
	var style = document.getElementById('userScript_removeGameRecommendations_element');
	
	if (!style)
	{
		style = document.createElement('style');
		style.id = 'userScript_removeGameRecommendations_element';
		style.innerHTML = cssCode;
		document.head.appendChild(style);
	}
	
	var children = document.getElementsByClassName('uiStreamStory');
	
	for (i=0;i<children.length;i++)
	{
		var child = children[i];

		if (!userScript_hasClass2(child,'removeGameRecommendationsChecked'))
		{
			if (child.innerHTML.indexOf('>Personalized games suggestions for you.</span>') != -1)
			{
				child.className = child.className + " removeGameRecommendationsNoticed removeGameRecommendationsHidden";
				child.onclick = userScript_removeSuggestedClass;
			}

			child.className = child.className + " removeGameRecommendationsChecked";
		}
		
	}
}

function userScript_hasClass2(element, cls) {
    var r = new RegExp('\\b' + cls + '\\b');
    return r.test(element.className);
}

function userScript_removeSuggestedClass() {

	this.className = this.className.replace('removeGameRecommendationsHidden','');
	this.onclick = '';

}


