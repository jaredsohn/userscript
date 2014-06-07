// Removes QassamCount status lines.
// version 1.0
// 2009-01-05 by Avner Kashtan
//
// ==UserScript==
// @name           Facebook QassamCount filter
// @description    Removes QassamCount status lines.
// @include        http://*.facebook.com/*
// ==/UserScript==

function qassamCountFilter_getElementsByClassName(classname, node) {

    if (!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for (var i = 0, j = els.length; i < j; i++)
        if (re.test(els[i].className)) a.push(els[i]);
    return a;
}

function filterQassamCount() {
    var statusStories = qassamCountFilter_getElementsByClassName('status_story_wrapper', null);
    for (var i = 0; i < statusStories.length; i++) 
    {
        var story = statusStories[i];
		var storyText = story.innerText 
						? story.innerText 
						: story.textContent;

		if (storyText && storyText.indexOf("http://qassamcount.com/fb") != -1)
		{		
				story.parentElement.removeChild(story);
		}	
    }
}

window.addEventListener(
'load',
function() { filterQassamCount() },
true);