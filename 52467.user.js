// ==UserScript==
// @name           Facebook instant quiz results
// @namespace      http://mike.thedt.net
// @description    Goes you directly to the results of a Facebook quiz without having to invite any friends.
// @include        http://apps.facebook.com/*
// ==/UserScript==

function GoToResults()
{
	setTimeout("location.href = location.href.match('.+/') + '?target=result';",500); //Note: You may fave do decrease this number if you've got a fast connection or increase it if you've got a slow connection!
}

var questions = document.getElementsByClassName('q_div');

if (questions[0]) //make sure it's actually a quiz
{
	var submitButton = document.getElementsByClassName('inputsubmit');
	submitButton[0].addEventListener("click", GoToResults, true); 
}