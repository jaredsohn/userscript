// ==UserScript==
// @name        Hide Low Rep Questions
// @description Hides all questions on the new questions list where the asker has < 20 rep
// @namespace   http://stackoverflow.com/users/1563422/danny-beckett
// @version     1.0
// @grant
// @include     http://*.stackexchange.com/questions
// @include     http://answers.onstartups.com/questions
// @include     http://askubuntu.com/questions
// @include     http://meta.askubuntu.com/questions
// @include     http://meta.serverfault.com/questions
// @include     http://meta.stackoverflow.com/questions
// @include     http://serverfault.com/questions
// @include     http://stackapps.com/questions
// @include     http://stackoverflow.com/questions
// @include     http://superuser.com/questions
// ==/UserScript==

var questions = document.getElementsByClassName('question-summary');

for(var i = 0; i < questions.length; i++)
{
	var rep = questions[i].getElementsByClassName('reputation-score')[0].innerText.replace(/,/g, '');
	if(rep.indexOf('k') === -1 && parseInt(rep) < 20)
		questions[i].style.display = 'none';
}