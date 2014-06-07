// ==UserScript==
// @name          Cheat Earth Science
// @description	  automatically gives you the same questions every time you take a quiz
// @include       http://www.learnearthscience.com/users/place/webquiz/quizzes/*
// ==/UserScript==


var qn = window.document.getElementsByName("QuestionsShown")
qn[0].value = "1,2,3,4,5,6,7,8,9,10"

