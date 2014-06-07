// ==UserScript==

// @name Todoist

// @when Pages Match

// @description Removes days with no tasks.

// @includes http://todoist.com/#start

// ==/UserScript==



var annoying = document.getElementsByClassName('no_appoinments');
for(i = 0; i < annoying.length; i++)
{
annoying[i].style.display = 'none';
}