// ==UserScript==
// @name        10gen Next lesson
// @namespace   VitalyB
// @include     https://education.10gen.com/courses/10gen/*
// @version     1
// ==/UserScript==

function nextLessonButtonClickAction (zEvent)
{
	var elements = document.getElementsByClassName("active");

	var activeLessonLi
	for(var i = 0; i < elements.length; i++)
	{
		if(elements[i].parentNode.className.indexOf("ui-accordion-content") > -1 )
			activeLessonLi = elements[i]
	}

	var nextLessonLi = activeLessonLi.nextSibling.nextSibling
	window.location.href = nextLessonLi.children[0].href
}

// Create new button
var nextLessonDiv       = document.createElement ('div');
nextLessonDiv.innerHTML = '<button id="nextLessonButton" type="button">Next lesson</button>';
nextLessonDiv.setAttribute ('id', 'nextLessonDiv');

// Append the button to the document
var contentNode = document.getElementsByClassName("course-content")[0];
contentNode.appendChild(nextLessonDiv);

// Add an event handler to the button
document.getElementById ("nextLessonButton").addEventListener ("click", nextLessonButtonClickAction, false);