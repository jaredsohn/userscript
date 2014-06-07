// ==UserScript==
// @name           Filter Facebook Stories
// @author         http://www.angelisagirlsname.com
// @version        0.3
// @namespace      http://userscripts.org/scripts/show/48045
// @description    Filter out Facebook stories that match defined strings
// @include        *facebook.com*
// ==/UserScript==

var filterTheseFFBS=new Array();
//Begin filtered string list
filterTheseFFBS.push('completed the quiz');
filterTheseFFBS.push('quiz and the result is');
//End filtered string list
function Filter_Facebook_Stories() {
	
	var stories = document.getElementsByClassName('UIIntentionalStory_Body');
	var count = stories.length;
	for (var i = count - 1; i >= 0; i--){
		story = stories[i];
		for (var j = 0; j < filterTheseFFBS.length; j++){
			if (story.innerHTML.indexOf(filterTheseFFBS[j]) >= 0){
				var story_container = story.parentNode.parentNode.parentNode;
				story_container.removeChild(story.parentNode.parentNode);
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", Filter_Facebook_Stories(), true);