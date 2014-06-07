// ==UserScript==
// @name		No More Facebook Quizzes
// @description	Removes quizzes from your Facebook Feed
// @include		http://www.facebook.com/*home.php*
// @include		http://www.new.facebook.com/*home.php*
// ==/UserScript==

function cleanUpPage() {
	var stories = document.getElementsByClassName("UIIntentionalStory_Body");
	
	for ( var i = 0; i < stories.length; i++ ) {
		if ( stories[i].innerHTML.match("quiz") ) {
			stories[i].parentNode.style.display = "none";
		}
	}
}

window.addEventListener("load", 
	function() {
		t = setInterval(cleanUpPage, 1000);
	}
	, false);