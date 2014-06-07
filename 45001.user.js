// ==UserScript==
// @name           Facebook - Quiz Remover for New Layout
// @namespace      Feedback - fbqr@ankanbanerjee.com
// @description    Removes quiz stories from homepage; Additional filtering possible by editing code and adding your custom strings; This is a mod of the script from www.reeloo.net
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
	forbiden_strings.push("BrainFall.com quiz");
	forbiden_strings.push("quiz and got the result:");
	forbiden_strings.push("completed the quiz");
	forbiden_strings.push("and the result is");
	forbiden_strings.push("for a score of");
//here you can add new rules


//removes matching stories
function remove_stories(){
	var messages = document.getElementsByClassName("UIStoryAttachment_Copy");
	var count = messages.length;
	for (var i = count - 1; i >= 0; i--){
		var msg = messages[i];
			for (var j = 0; j < forbiden_strings.length; j++){
				//if msg guts matches forbiden given string
				if (msg.innerHTML.indexOf(forbiden_strings[j]) >= 0){
					//finds wrapper for given message
					var msg_feedparent = msg.parentNode.parentNode.parentNode.parentNode;
					//removes wrapper mentioned above
					//msg_parparpar.removeChild(msg.parentNode.parentNode);
					msg_feedparent.style.display='none';
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