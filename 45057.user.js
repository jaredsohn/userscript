// ==UserScript==
// @name           facebook.com - Shit Remover
// @namespace      http://harding.mine.nu
// @description    Removes shit from FaceBook - Written By Harding
// @include        http://www.facebook.com/*
// ==/UserScript==


//removes all external stories
function remove_external_stories()
{
	var stories = document.getElementsByClassName("CopyTitle");
	var count = stories.length;
	
	for (var i = count - 1; i >= 0; i--)
	{
		var RegExpQuestions 	= new RegExp("answered '.{0,40}' questions in");
		var RegExpQuiz1 	= new RegExp("quiz and the result");
		var RegExpQuiz2 	= new RegExp("completed the quiz");
		var RegExpQuiz3 	= new RegExp("quiz and got the result");
		var RegExpQuiz4 	= new RegExp("quiz och resultatet �r");
		var RegExpExternalApps 	= new RegExp("facebook.com/apps");
		
		if ((stories[i].innerHTML.match(RegExpQuestions) != null)
		||  (stories[i].innerHTML.match(RegExpQuiz1) != null)
		||  (stories[i].innerHTML.match(RegExpQuiz2) != null)
		||  (stories[i].innerHTML.match(RegExpQuiz3) != null)
		||  (stories[i].innerHTML.match(RegExpQuiz4) != null)
		||  (stories[i].innerHTML.match(RegExpExternalApps) != null)
		)
		{
			//hides the element
			stories[i].parentNode.parentNode.parentNode.style.display = "none";
		}
		
	}
}


//initiates timer to remove matching stories
function starter(){
	//time in ms
	t = setInterval(remove_external_stories, 2000);
	//to disable timer and execute script only once at pageload, comment line above and uncomment line below, and vice-versa
	//remove_external_stories();
}


//waits till page is loaded
window.addEventListener("load", starter, false);
