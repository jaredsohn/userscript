// ==UserScript==
// @name           facebook.com - quiz stories remover
// @namespace      www.reeloo.net
// @description    removes quiz stories from homepage; additional filtering possible
// @include        http://www.facebook.com/*home.php*
// @include        http://www.new.facebook.com/*home.php*
// ==/UserScript==


//stories filtering - adding more rules
//
//you can add more rules by adding:
//forbiden_strings.push("ANY TEXT");
//
//any story containing "ANY TEXT" will be removed
//

var forbiden_strings = new Array();
	//default rule to match quizzes
	forbiden_strings.push("quiz and the result is");
	forbiden_strings.push("Check out this quiz!");
	forbiden_strings.push("took the quiz");

	forbiden_strings.push("completed the quiz");
//here you can add new rules


//removes matching stories
function remove_stories(){
	var messages = document.getElementsByTagName("div");
	var count = messages.length;
	//goes through all h3 headlines (titles)
	for (var i = count - 1; i >= 0; i--){
		msg = messages[i];		
		msg_class = msg.getAttribute("class");
		//is this h3 really some story?
		if (msg_class == "UIIntentionalStory_Body"){
			//cycles through all forbiden strings
			for (var j = 0; j < forbiden_strings.length; j++){
				//if msg guts matches forbiden given string
				if (msg.innerHTML.indexOf(forbiden_strings[j]) >= 0){
					//finds wrapper for given message
					var msg_parparpar = msg.parentNode.parentNode.parentNode;
					//removes wrapper mentioned above
					msg_parparpar.removeChild(msg.parentNode.parentNode);
				}
			}
		}
	}
}


//initiates timer to remove matching stories
//time in ms
function starter(){
	t = setInterval(remove_stories, 1000);
	//to disable timer and execute script only once at pageload, comment line above and uncomment line below, and vice-versa
	//remove_stories();
}


//waits till page is loaded
window.addEventListener("load", starter, false);
